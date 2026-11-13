// Instrumentação reforçada após a coleta original. Não escreve diretamente nos stores.
// Uso: node este-arquivo.cjs <checkout-oficial> [diretorio-NOVO-de-saida]
// Somente verificar o checkout: node este-arquivo.cjs <checkout> --check-version
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const { execFileSync } = require('node:child_process');
const { createRequire } = require('node:module');
const { verifyReport, REQUIRED_COMMIT } = require('./S-M4_verificar_2026-11-12.cjs');

function validateCheckout(directory) {
  if (!directory) throw new Error('Informe o checkout oficial do Excalidraw');
  const source = fs.realpathSync(directory);
  const git = (...args) => execFileSync('git', ['--no-optional-locks', '-C', source, ...args], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
  const top = fs.realpathSync(git('rev-parse', '--show-toplevel'));
  if (source !== top) throw new Error('Informe a raiz do checkout, não um subdiretório');
  const commit = git('rev-parse', '--verify', 'HEAD^{commit}');
  if (commit !== REQUIRED_COMMIT) throw new Error(`SHA incorreto: detectado ${commit}; exigido ${REQUIRED_COMMIT}`);
  if (git('status', '--porcelain', '--untracked-files=no')) throw new Error('Checkout possui alterações rastreadas');
  // Isso verifica o Git do diretório, não o processo que atende a porta 3013.
  return { path: source, commit, servedAssociation: 'not-verified' };
}
function reserveOutput(directory) {
  if (!directory) return fs.mkdtempSync(path.join(os.tmpdir(), 'sm4-coleta-'));
  const out = path.resolve(directory);
  // mkdir sem recursive recusa qualquer diretório existente, mesmo vazio.
  fs.mkdirSync(out);
  return out;
}
function attachPageListeners(context, report) {
  const attached = new WeakSet();
  const attach = page => {
    if (attached.has(page)) return;
    attached.add(page);
    const record = (kind, message) => report.capturedErrors.push({ kind, message, url: page.url(), stage: report.activeStage, at: new Date().toISOString() });
    page.on('pageerror', error => record('pageerror', String(error)));
    page.on('crash', () => record('crash', 'Página encerrou inesperadamente'));
  };
  context.on('page', attach);
  for (const page of context.pages()) attach(page);
}
async function runStep(report, name, required, action) {
  try { return await action(); }
  catch (error) {
    const failure = { stage: name, message: String(error), at: new Date().toISOString() };
    (required ? report.fatalFailures : report.optionalFailures).push(failure);
    if (required) throw error;
    return undefined;
  }
}
async function inspect(page, stage, report, save) {
  const storage = await page.evaluate(async () => {
    const databases = [];
    // Apenas bancos já existentes: não cria banco vazio ao inspecionar.
    for (const info of await indexedDB.databases()) {
      const db = await new Promise((resolve, reject) => {
        const request = indexedDB.open(info.name);
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
      const stores = {};
      for (const name of db.objectStoreNames) {
        stores[name] = await new Promise((resolve, reject) => {
          const tx = db.transaction(name, 'readonly');
          const store = tx.objectStore(name);
          const keys = store.getAllKeys();
          const values = store.getAll();
          tx.oncomplete = () => resolve(keys.result.map((key, i) => ({ key, value: values.result[i] })));
          tx.onerror = () => reject(tx.error);
        });
      }
      databases.push({ name: db.name, version: db.version, stores });
      db.close();
    }
    return { url: location.href, userAgent: navigator.userAgent, localStorage: { ...localStorage }, sessionStorage: { ...sessionStorage }, databases };
  });
  report.snapshots.push({ stage, at: new Date().toISOString(), ...storage });
  save();
}
async function collect(directory, outputDirectory) {
  // Validar antes de criar saída, importar Playwright ou abrir o navegador.
  const checkoutVersion = validateCheckout(directory);
  const source = checkoutVersion.path;
  const out = reserveOutput(outputDirectory);
  const report = { schemaVersion: 2, commit: checkoutVersion.commit, checkoutVersion, status: 'collecting', started: new Date().toISOString(), steps: [], snapshots: [], blockedRequests: [], capturedErrors: [], optionalFailures: [], fatalFailures: [], activeStage: 'startup' };
  const save = () => fs.writeFileSync(path.join(out, 'S-M4_inspecao_2026-11-12.json'), JSON.stringify(report, null, 2));
  let browser;
  try {
    const { chromium } = createRequire(path.join(source, 'package.json'))('playwright');
    browser = await chromium.launch({ channel: 'chrome', headless: true });
    report.browser = browser.version();
    const context = await browser.newContext({ viewport: { width: 1366, height: 900 }, locale: 'en-US' });
    context.setDefaultTimeout(15000);
    // Usa o seletor HTML de arquivos, automatizável no Chrome headless.
    // Não muda a implementação de persistência da aplicação.
    await context.addInitScript(() => { delete window.showOpenFilePicker; });
    await context.route('**/*', route => {
      const url = new URL(route.request().url());
      if (['127.0.0.1', 'localhost', '[::1]'].includes(url.hostname) || ['data:', 'blob:'].includes(url.protocol)) return route.continue();
      report.blockedRequests.push(route.request().url());
      return route.abort();
    });
    attachPageListeners(context, report);
    let page = await context.newPage();
    report.activeStage = 'initial';
    await page.goto('http://127.0.0.1:3013/', { waitUntil: 'networkidle', timeout: 120000 });
    await page.locator('canvas').first().waitFor();
    await inspect(page, 'initial', report, save);
    report.steps.push('Clean nonpersistent browser context; initial application storage inspected.');
    report.activeStage = 'scene';
    await page.keyboard.press('r');
    await page.mouse.move(420, 280); await page.mouse.down(); await page.mouse.move(720, 430); await page.mouse.up();
    await page.keyboard.press('Escape');
    await page.keyboard.press('t'); await page.mouse.click(450, 330);
    await page.keyboard.insertText('CENA-FICTICIA-SM4-20261112');
    await page.keyboard.press('Escape');
    await page.waitForTimeout(2500);
    await inspect(page, 'scene', report, save);
    await runStep(report, 'S-M4_cena_2026-11-12.png', false, () => page.screenshot({ path: path.join(out, 'S-M4_cena_2026-11-12.png') }));
    report.steps.push('Rectangle and marker text created through keyboard and mouse.');
    report.activeStage = 'scene-reload';
    await page.reload({ waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    await inspect(page, 'scene-reload', report, save);
    report.activeStage = 'scene-reopen-tab';
    await page.close(); page = await context.newPage();
    await page.goto('http://127.0.0.1:3013/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    await inspect(page, 'scene-reopen-tab', report, save);
    report.steps.push('Reloaded and reopened tab within the same test context.');
    report.activeStage = 'library';
    await runStep(report, 'library', true, async () => {
      await page.keyboard.press('Control+a');
      await page.mouse.click(500, 350, { button: 'right' });
      await page.getByText('Add to library', { exact: true }).click();
      await page.waitForTimeout(2500);
      await inspect(page, 'library', report, save);
      report.steps.push('Selected scene and used context menu Add to library.');
    });
    report.activeStage = 'image';
    await runStep(report, 'image', true, async () => {
      const image = path.join(out, 'S-M4_imagem-ficticia_2026-11-12.svg');
      fs.writeFileSync(image, '<svg xmlns="http://www.w3.org/2000/svg" width="240" height="80"><rect width="240" height="80" fill="#ffeeaa"/><text x="10" y="45" font-size="18">IMAGEM-FICTICIA-SM4</text></svg>');
      await page.keyboard.press('Escape');
      const chooser = page.waitForEvent('filechooser', { timeout: 10000 });
      await page.keyboard.press('9');
      await (await chooser).setFiles(image);
      await page.mouse.click(850, 550);
      await page.keyboard.press('Escape');
      await page.waitForTimeout(2500);
      await inspect(page, 'image', report, save);
      report.steps.push('Inserted synthetic SVG using image tool and file chooser.');
    });
    report.activeStage = 'ttd';
    await runStep(report, 'ttd', true, async () => {
      await page.keyboard.press('Control+Shift+p');
      await page.locator('.command-palette-dialog input').fill('Text to diagram');
      await page.keyboard.press('Enter');
      await page.locator('textarea.chat-interface__input').fill('PROMPT-FICTICIO-SM4: pedido de teste sem dados pessoais');
      await page.locator('button.chat-interface__send-button').click();
      await page.waitForTimeout(6000);
      await inspect(page, 'ttd', report, save);
      await runStep(report, 'S-M4_ia-falsa_2026-11-12.png', false, () => page.screenshot({ path: path.join(out, 'S-M4_ia-falsa_2026-11-12.png') }));
      report.steps.push('Submitted synthetic prompt to local fake AI backend.');
    });
    report.activeStage = 'all-reload';
    await page.reload({ waitUntil: 'networkidle' });
    await page.waitForTimeout(2500);
    await inspect(page, 'all-reload', report, save);
    await runStep(report, 'S-M4_apos-recarregar_2026-11-12.png', false, () => page.screenshot({ path: path.join(out, 'S-M4_apos-recarregar_2026-11-12.png') }));
    // Inspeção dos controles disponíveis para orientar as etapas complementares.
    await runStep(report, 'controls', false, async () => {
      fs.writeFileSync(path.join(out, 'S-M4_controles_2026-11-12.txt'), await page.locator('body').innerText());
    });
    report.finished = new Date().toISOString();
    report.status = report.optionalFailures.length ? 'complete-with-warnings' : 'complete';
    // A presença de snapshots não basta: validar conteúdo e erros antes de sucesso.
    verifyReport(report);
  } catch (error) {
    report.status = 'failed';
    if (!report.fatalFailures.some(failure => failure.message === String(error))) {
      report.fatalFailures.push({ stage: report.activeStage, message: String(error), at: new Date().toISOString() });
    }
    throw error;
  } finally {
    if (browser) {
      try { await browser.close(); }
      catch (error) { report.status = 'failed'; report.fatalFailures.push({ stage: 'shutdown', message: String(error), at: new Date().toISOString() }); }
    }
    report.finished = new Date().toISOString();
    if (report.capturedErrors.length || report.fatalFailures.length) report.status = 'failed';
    save();
  }
  if (report.status === 'failed') throw new Error('Coleta falhou; consulte o relatório em ' + out);
  return { output: out, status: report.status, checkoutVersion };
}
if (require.main === module) {
  (async () => {
    if (process.argv[3] === '--check-version') return validateCheckout(process.argv[2]);
    return collect(process.argv[2], process.argv[3]);
  })().then(result => console.log(JSON.stringify(result, null, 2))).catch(error => { console.error(error.message); process.exitCode = 1; });
}
module.exports = { validateCheckout, reserveOutput, attachPageListeners, runStep, collect };
