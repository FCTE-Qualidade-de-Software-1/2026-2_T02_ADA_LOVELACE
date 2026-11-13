// Testes posteriores: fixtures temporárias, sem navegador e sem nova medição.
// Uso: node este-arquivo.cjs <checkout-oficial>
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const { EventEmitter } = require('node:events');
const { verifyReport } = require('./S-M4_verificar_2026-11-12.cjs');
const { validateCheckout, reserveOutput, attachPageListeners, runStep } = require('./S-M4_coleta_2026-11-12.cjs');
const originalFile = path.join(__dirname, 'S-M4_inspecao_2026-11-12.json');
const originalBytes = fs.readFileSync(originalFile);
const original = JSON.parse(originalBytes);
const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'sm4-testes-'));
const verifier = path.join(__dirname, 'S-M4_verificar_2026-11-12.cjs');
const collector = path.join(__dirname, 'S-M4_coleta_2026-11-12.cjs');
let count = 0;
const pass = name => { count++; console.log(`PASS ${name}`); };
const snapshot = (data, stage = 'all-reload') => data.snapshots.find(item => item.stage === stage);
const records = (data, db, stage = 'all-reload') => Object.values(snapshot(data, stage).databases.find(item => item.name === db).stores)[0];
const mutateScene = (data, edit, stage = 'all-reload') => {
  const current = snapshot(data, stage);
  const elements = JSON.parse(current.localStorage.excalidraw);
  edit(elements);
  current.localStorage.excalidraw = JSON.stringify(elements);
};
function cli(file, args) {
  const result = spawnSync(process.execPath, [file, ...args], { encoding: 'utf8' });
  assert.ifError(result.error);
  assert.equal(result.signal, null);
  return result;
}
function invalid(name, edit, expected, schema) {
  const data = structuredClone(schema || original);
  edit(data);
  const file = path.join(temp, `${count}.json`);
  fs.writeFileSync(file, JSON.stringify(data));
  const result = cli(verifier, [file]);
  assert.equal(result.status, 1, `${name}: CLI deveria falhar`);
  assert.match(result.stderr, expected, `${name}: motivo da falha`);
  pass(name);
}
(async () => {
  const result = cli(verifier, [originalFile]);
  assert.equal(result.status, 0, result.stderr);
  assert.equal(JSON.parse(result.stdout).score, 0);
  assert.match(JSON.parse(result.stdout).versionEvidence, /legada/);
  pass('JSON original válido; versão tratada como declaração legada');
  for (const stage of original.snapshots.map(item => item.stage)) {
    invalid(`snapshot obrigatório ausente: ${stage}`, data => data.snapshots.splice(data.snapshots.findIndex(item => item.stage === stage), 1), /oito snapshots/);
  }
  invalid('snapshot duplicado', data => data.snapshots[1] = data.snapshots[0], /oito snapshots/);
  invalid('ordem dos snapshots', data => data.snapshots.reverse(), /oito snapshots/);
  invalid('commit declarado errado', data => data.commit = '0'.repeat(40), /Commit declarado/);
  invalid('versão de navegador ausente', data => delete data.browser, /Versão do navegador|must be of type string/);
  invalid('User-Agent incompatível', data => snapshot(data).userAgent = 'HeadlessChrome/1.0', /User-Agent/);
  invalid('versão de IndexedDB', data => snapshot(data).databases[0].version = 2, /versão inesperada/);
  invalid('origem diferente', data => snapshot(data).url = 'http://localhost:3001/', /origem incorreta/);
  invalid('horário fora da coleta', data => snapshot(data).at = '2000-01-01T00:00:00Z', /horário fora/);
  invalid('retângulo removido', data => mutateScene(data, elements => elements.shift()), /contagem\/tipos/);
  invalid('texto não persistiu', data => mutateScene(data, elements => elements[1].text = 'alterado'), /Texto fictício/);
  invalid('ID de cena alterado', data => mutateScene(data, elements => elements[0].id = 'outro'), /elementos\/IDs/);
  invalid('IDs de cena duplicados', data => mutateScene(data, elements => elements[1].id = elements[0].id), /IDs duplicados/);
  invalid('fileId sem vínculo', data => mutateScene(data, elements => elements[2].fileId = 'inexistente'), /fileId/);
  invalid('ID do arquivo sem vínculo', data => records(data, 'files-db')[0].value.id = 'outro', /ID do arquivo/);
  invalid('conteúdo da imagem inválido', data => records(data, 'files-db')[0].value.dataURL = 'data:image/svg+xml;base64,' + Buffer.from('<svg/>').toString('base64'), /Conteúdo SVG/);
  invalid('biblioteca ausente', data => records(data, 'excalidraw-library-db').pop(), /registros da biblioteca/);
  invalid('conteúdo da biblioteca alterado', data => records(data, 'excalidraw-library-db')[0].value.libraryItems[0].elements[1].text = 'outro', /Conteúdo\/IDs da biblioteca/);
  invalid('chat ausente', data => records(data, 'excalidraw-ttd-chats-db').pop(), /registros de histórico/);
  invalid('prompt alterado', data => records(data, 'excalidraw-ttd-chats-db')[0].value[0].messages[0].content = 'outro', /Prompt incorreto/);
  invalid('resposta do simulador alterada', data => records(data, 'excalidraw-ttd-chats-db')[0].value[0].messages[1].content = 'outra', /Resposta fixa/);
  invalid('IDs de mensagem duplicados', data => { const messages = records(data, 'excalidraw-ttd-chats-db')[0].value[0].messages; messages[1].id = messages[0].id; }, /IDs duplicados/);
  invalid('erro legado registrado', data => data.errors.push('erro de teste'), /Erros registrados/);
  const malformed = path.join(temp, 'malformed.json');
  fs.writeFileSync(malformed, '{');
  assert.equal(cli(verifier, [malformed]).status, 1);
  pass('JSON malformado rejeitado pela CLI');

  const detected = validateCheckout(process.argv[2]);
  const version = cli(collector, [process.argv[2], '--check-version']);
  assert.equal(version.status, 0, version.stderr);
  assert.deepEqual(JSON.parse(version.stdout), detected);
  assert.equal(detected.servedAssociation, 'not-verified');
  pass('SHA correto detectado no Git real; sem alegação sobre Vite');
  // O repositório da disciplina tem SHA diferente: lê-lo não modifica o checkout oficial.
  const wrong = path.resolve(__dirname, '../../..');
  const badVersion = cli(collector, [wrong, '--check-version']);
  assert.equal(badVersion.status, 1);
  assert.match(badVersion.stderr, /SHA incorreto/);
  const unused = path.join(temp, 'must-not-exist');
  assert.equal(cli(collector, [wrong, unused]).status, 1);
  assert.equal(fs.existsSync(unused), false);
  pass('SHA incorreto rejeitado antes de criar saída/importar Playwright');

  // Fixtures sintéticas do schema novo são testes, não novos resultados observados.
  const modern = { ...structuredClone(original), schemaVersion: 2, checkoutVersion: detected, capturedErrors: [], fatalFailures: [], optionalFailures: [], status: 'complete' };
  delete modern.errors;
  verifyReport(modern);
  pass('fixture válida do schema 2');
  invalid('schema desconhecido', data => data.schemaVersion = 3, /Schema desconhecido/, modern);
  invalid('versão detectada incorreta', data => data.checkoutVersion.commit = '0'.repeat(40), /Versão detectada/, modern);
  invalid('associação ao Vite não demonstrada', data => data.checkoutVersion.servedAssociation = 'verified', /Associação ao Vite/, modern);
  invalid('erro capturado impede sucesso', data => data.capturedErrors.push({ kind: 'pageerror', message: 'teste' }), /Erros de página/, modern);
  invalid('falha obrigatória impede sucesso', data => data.fatalFailures.push({ stage: 'scene', message: 'teste' }), /Falhas obrigatórias/, modern);
  invalid('status incompleto impede sucesso', data => data.status = 'collecting', /Execução incompleta/, modern);
  modern.optionalFailures.push({ stage: 'screenshot', message: 'teste' });
  modern.status = 'complete-with-warnings';
  verifyReport(modern);
  pass('falha apenas de artefato opcional permite conclusão com aviso');

  const diagnostic = { capturedErrors: [], optionalFailures: [], fatalFailures: [], activeStage: 'teste' };
  const existing = new EventEmitter(); existing.url = () => 'http://127.0.0.1:3013/';
  const reopened = new EventEmitter(); reopened.url = existing.url;
  const context = new EventEmitter(); context.pages = () => [existing];
  attachPageListeners(context, diagnostic);
  context.emit('page', reopened); context.emit('page', reopened);
  existing.emit('pageerror', new Error('primeira página'));
  reopened.emit('pageerror', new Error('aba reaberta'));
  reopened.emit('crash');
  assert.equal(diagnostic.capturedErrors.length, 3);
  assert.equal(reopened.listenerCount('pageerror'), 1);
  pass('listeners nas páginas existente e reaberta, sem duplicação');
  await runStep(diagnostic, 'captura opcional', false, async () => { throw new Error('opcional'); });
  assert.equal(diagnostic.optionalFailures.length, 1);
  assert.equal(diagnostic.fatalFailures.length, 0);
  await assert.rejects(runStep(diagnostic, 'cena obrigatória', true, async () => { throw new Error('obrigatória'); }), /obrigatória/);
  assert.equal(diagnostic.fatalFailures.length, 1);
  pass('etapa opcional diferenciada; etapa obrigatória propaga falha');
  const existingOutput = reserveOutput(path.join(temp, 'existing'));
  const sentinel = path.join(existingOutput, 'original.txt'); fs.writeFileSync(sentinel, 'preservado');
  assert.throws(() => reserveOutput(existingOutput), /EEXIST/);
  assert.equal(fs.readFileSync(sentinel, 'utf8'), 'preservado');
  pass('diretório existente recusado; conteúdo preservado');
  assert.deepEqual(fs.readFileSync(originalFile), originalBytes);
  pass('JSON original permanece byte a byte intacto');
  console.log(`${count} testes passaram. Nenhum navegador iniciado; nenhuma coleta repetida.`);
  console.log(`Fixtures temporárias em ${temp}`);
})().catch(error => { console.error(error); process.exitCode = 1; });
