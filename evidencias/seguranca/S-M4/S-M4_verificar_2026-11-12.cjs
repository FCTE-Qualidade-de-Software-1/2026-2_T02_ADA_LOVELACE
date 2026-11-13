// Validação posterior à coleta original; somente leitura.
// Uso: node este-arquivo.cjs [arquivo-de-inspecao.json]
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const REQUIRED_COMMIT = 'e7b534668a60add7f725531f3c9abf32508c7b4e';
const EXPECTED_STAGES = ['initial', 'scene', 'scene-reload', 'scene-reopen-tab', 'library', 'image', 'ttd', 'all-reload'];
const SCENE_TEXT = 'CENA-FICTICIA-SM4-20261112';
const PROMPT = 'PROMPT-FICTICIO-SM4: pedido de teste sem dados pessoais';
const RESPONSE = 'flowchart TD\n  A[Pedido recebido pelo servidor de IA falso] --> B{Resposta fixa}\n  B --> C[Nenhum conteúdo foi enviado a terceiros]\n  B --> D[Ambiente local da avaliação]';
const STORES = { 'excalidraw-library-db': 'excalidraw-library-store', 'excalidraw-ttd-chats-db': 'excalidraw-ttd-chats-store', 'files-db': 'files-store' };
const nonempty = (value, label) => assert.ok(typeof value === 'string' && value.length > 0, label);
const time = (value, label) => { assert.ok(typeof value === 'string' && Number.isFinite(Date.parse(value)), label); return Date.parse(value); };
const uniqueIds = (items, label) => {
  for (const item of items) nonempty(item.id, `${label}: ID ausente`);
  assert.equal(new Set(items.map(item => item.id)).size, items.length, `${label}: IDs duplicados`);
};
// A restauração normaliza boundElements; os demais campos devem persistir.
const canonical = elements => elements.map(({ boundElements, ...element }) => element);
function verifyReport(report) {
  assert.ok(report && typeof report === 'object', 'Relatório inválido');
  assert.equal(report.commit, REQUIRED_COMMIT, 'Commit declarado incorreto');
  assert.match(report.browser, /^\d+\.\d+\.\d+\.\d+$/, 'Versão do navegador inválida');
  assert.deepEqual(report.blockedRequests, [], 'Destinos externos registrados');
  if (report.schemaVersion === undefined) {
    assert.deepEqual(report.errors, [], 'Erros registrados pela instrumentação original');
  } else {
    assert.equal(report.schemaVersion, 2, 'Schema desconhecido');
    assert.equal(report.checkoutVersion.commit, REQUIRED_COMMIT, 'Versão detectada incorreta');
    nonempty(report.checkoutVersion.path, 'Caminho do checkout ausente');
    assert.equal(report.checkoutVersion.servedAssociation, 'not-verified', 'Associação ao Vite não demonstrada por este coletor');
    assert.deepEqual(report.capturedErrors, [], 'Erros de página capturados');
    assert.deepEqual(report.fatalFailures, [], 'Falhas obrigatórias registradas');
    assert.ok(Array.isArray(report.optionalFailures), 'Falhas opcionais ausentes');
    assert.equal(report.status, report.optionalFailures.length ? 'complete-with-warnings' : 'complete', 'Execução incompleta/falha');
  }
  const start = time(report.started, 'Início inválido');
  const end = time(report.finished, 'Fim inválido');
  assert.ok(start <= end, 'Ordem temporal inválida');
  assert.ok(Array.isArray(report.snapshots), 'Snapshots ausentes');
  assert.deepEqual(report.snapshots.map(item => item.stage), EXPECTED_STAGES, 'Exigir oito snapshots únicos na ordem esperada');
  let previous = start;
  const snapshots = new Map();
  const records = (snapshot, db) => snapshot.databases.find(item => item.name === db).stores[STORES[db]];
  for (const snapshot of report.snapshots) {
    const at = time(snapshot.at, `${snapshot.stage}: horário inválido`);
    assert.ok(previous <= at && at <= end, `${snapshot.stage}: horário fora de ordem`);
    previous = at;
    assert.equal(snapshot.url, 'http://127.0.0.1:3013/', `${snapshot.stage}: origem incorreta`);
    assert.match(snapshot.userAgent, new RegExp(`HeadlessChrome/${report.browser.split('.')[0]}\\.`), 'User-Agent incompatível');
    assert.deepEqual(snapshot.sessionStorage, {}, 'sessionStorage inesperado');
    const state = JSON.parse(snapshot.localStorage['excalidraw-state']);
    assert.ok(state && typeof state === 'object' && !Array.isArray(state), 'Estado inválido');
    assert.ok(Array.isArray(snapshot.databases), 'Bancos ausentes');
    assert.deepEqual(snapshot.databases.map(db => db.name).sort(), Object.keys(STORES).sort(), 'Bancos incorretos/duplicados');
    for (const db of snapshot.databases) {
      assert.equal(db.version, 1, `${db.name}: versão inesperada`);
      assert.deepEqual(Object.keys(db.stores), [STORES[db.name]], `${db.name}: store incorreto`);
      assert.ok(Array.isArray(db.stores[STORES[db.name]]), 'Registros inválidos');
    }
    const elements = JSON.parse(snapshot.localStorage.excalidraw);
    assert.ok(Array.isArray(elements), 'Cena não é array');
    const index = EXPECTED_STAGES.indexOf(snapshot.stage);
    assert.deepEqual(elements.map(el => el.type), index === 0 ? [] : index < 5 ? ['rectangle', 'text'] : ['rectangle', 'text', 'image'], `${snapshot.stage}: contagem/tipos de elementos`);
    uniqueIds(elements, snapshot.stage);
    for (const element of elements) assert.equal(element.isDeleted, false, 'Elemento excluído');
    if (index > 0) {
      assert.equal(elements[1].text, SCENE_TEXT, 'Texto fictício ausente/alterado');
      assert.equal(elements[1].originalText, SCENE_TEXT, 'originalText inconsistente');
    }
    snapshots.set(snapshot.stage, { ...snapshot, elements });
  }
  const original = snapshots.get('scene').elements;
  for (const snapshot of snapshots.values()) {
    if (snapshot.stage !== 'initial') assert.deepEqual(canonical(snapshot.elements.slice(0, 2)), canonical(original), `${snapshot.stage}: elementos/IDs da cena não persistiram`);
    const index = EXPECTED_STAGES.indexOf(snapshot.stage);
    const library = records(snapshot, 'excalidraw-library-db');
    assert.equal(library.length, index < 4 ? 0 : 1, `${snapshot.stage}: registros da biblioteca`);
    if (index >= 4) {
      assert.equal(library[0].key, 'libraryData', 'Chave da biblioteca incorreta');
      const items = library[0].value.libraryItems;
      assert.equal(items.length, 1, 'Exigir um item da biblioteca');
      uniqueIds(items, 'biblioteca');
      assert.equal(items[0].status, 'unpublished', 'Status da biblioteca');
      assert.ok(Number.isFinite(items[0].created), 'Timestamp da biblioteca');
      assert.deepEqual(canonical(items[0].elements), canonical(original), 'Conteúdo/IDs da biblioteca');
      assert.deepEqual(library, records(snapshots.get('library'), 'excalidraw-library-db'), 'Biblioteca não persistiu');
    }
    const files = records(snapshot, 'files-db');
    assert.equal(files.length, index < 5 ? 0 : 1, `${snapshot.stage}: registros de imagem`);
    if (index >= 5) {
      const { key, value } = files[0];
      nonempty(key, 'Chave da imagem');
      assert.equal(value.id, key, 'ID do arquivo incompatível com chave');
      assert.equal(snapshot.elements[2].fileId, key, 'fileId sem arquivo correspondente');
      assert.equal(snapshot.elements[2].status, 'saved', 'Imagem não salva');
      assert.equal(value.mimeType, 'image/svg+xml', 'Formato da imagem');
      assert.match(value.dataURL, /^data:image\/svg\+xml;base64,[A-Za-z0-9+/]+={0,2}$/, 'URL de dados inválida');
      const encoded = value.dataURL.split(',')[1];
      const decoded = Buffer.from(encoded, 'base64');
      assert.equal(decoded.toString('base64'), encoded, 'Base64 inválida');
      assert.match(decoded.toString('utf8'), /^<svg\b[^>]*>.*<text\b[^>]*>IMAGEM-FICTICIA-SM4<\/text><\/svg>$/, 'Conteúdo SVG esperado ausente');
      assert.ok(Number.isFinite(value.created) && value.lastRetrieved >= value.created, 'Timestamps da imagem');
      const first = records(snapshots.get('image'), 'files-db')[0];
      assert.equal(key, first.key, 'Chave da imagem alterada');
      assert.equal(value.dataURL, first.value.dataURL, 'Conteúdo da imagem não persistiu');
      assert.deepEqual(canonical([snapshot.elements[2]]), canonical([snapshots.get('image').elements[2]]), 'Elemento imagem não persistiu');
    }
    const chats = records(snapshot, 'excalidraw-ttd-chats-db');
    assert.equal(chats.length, index < 6 ? 0 : 1, `${snapshot.stage}: registros de histórico`);
    if (index >= 6) {
      assert.equal(chats[0].key, 'ttdChats', 'Chave do histórico');
      const saved = chats[0].value;
      assert.equal(saved.length, 1, 'Exigir um chat');
      uniqueIds(saved, 'chat');
      const messages = saved[0].messages;
      assert.equal(messages.length, 2, 'Exigir duas mensagens');
      uniqueIds(messages, 'mensagens');
      assert.deepEqual(messages.map(message => message.type), ['user', 'assistant'], 'Tipos de mensagens');
      assert.equal(messages[0].content, PROMPT, 'Prompt incorreto');
      assert.equal(messages[1].content, RESPONSE, 'Resposta fixa do simulador incorreta');
      assert.equal(messages[1].isGenerating, false, 'Geração incompleta');
      for (const message of messages) {
        const at = time(message.timestamp, 'Timestamp da mensagem');
        assert.ok(start <= at && at <= end, 'Mensagem fora da coleta');
      }
      assert.ok(saved[0].title.startsWith('PROMPT-FICTICIO-SM4:'), 'Título do chat');
      assert.deepEqual(chats, records(snapshots.get('ttd'), 'excalidraw-ttd-chats-db'), 'Histórico/IDs não persistiram');
    }
  }
  return { snapshots: 8, commit: report.commit, versionEvidence: report.schemaVersion === 2 ? 'checkout detectado; associação ao Vite não verificada' : 'declaração legada; não é detecção dinâmica', result: 'Sim', score: 0 };
}
if (require.main === module) {
  try {
    const file = process.argv[2] || path.join(__dirname, 'S-M4_inspecao_2026-11-12.json');
    console.log(JSON.stringify(verifyReport(JSON.parse(fs.readFileSync(file, 'utf8'))), null, 2));
  } catch (error) { console.error(`Verificação S-M4 falhou: ${error.message}`); process.exitCode = 1; }
}
module.exports = { verifyReport, REQUIRED_COMMIT, EXPECTED_STAGES };
