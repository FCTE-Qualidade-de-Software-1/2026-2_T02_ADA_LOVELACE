// Coleta observacional: não escreve diretamente em localStorage/IndexedDB.
// Uso: node este-arquivo.cjs <checkout-oficial> [diretorio-de-saida]
const fs = require('node:fs');
const path = require('node:path');
const { createRequire } = require('node:module');
const source = path.resolve(process.argv[2]);
const out = path.resolve(process.argv[3] || __dirname);
const { chromium } = createRequire(path.join(source, 'package.json'))('playwright');
const report = { commit: 'e7b534668a60add7f725531f3c9abf32508c7b4e', started: new Date().toISOString(), steps: [], snapshots: [], blockedRequests: [], errors: [] };
const save = () => fs.writeFileSync(path.join(out, 'S-M4_inspecao_2026-11-12.json'), JSON.stringify(report, null, 2));
async function inspect(page, stage) {
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
(async () => {
  fs.mkdirSync(out, { recursive: true });
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
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
  let page = await context.newPage();
  page.on('pageerror', e => report.errors.push(String(e)));
  try {
    await page.goto('http://127.0.0.1:3013/', { waitUntil: 'networkidle', timeout: 120000 });
    await page.locator('canvas').first().waitFor();
    await inspect(page, 'initial');
    report.steps.push('Clean nonpersistent browser context; initial application storage inspected.');
    await page.keyboard.press('r');
    await page.mouse.move(420, 280); await page.mouse.down(); await page.mouse.move(720, 430); await page.mouse.up();
    await page.keyboard.press('Escape');
    await page.keyboard.press('t'); await page.mouse.click(450, 330);
    await page.keyboard.insertText('CENA-FICTICIA-SM4-20261112');
    await page.keyboard.press('Escape');
    await page.waitForTimeout(2500);
    await inspect(page, 'scene');
    await page.screenshot({ path: path.join(out, 'S-M4_cena_2026-11-12.png') });
    report.steps.push('Rectangle and marker text created through keyboard and mouse.');
    await page.reload({ waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    await inspect(page, 'scene-reload');
    await page.close(); page = await context.newPage();
    await page.goto('http://127.0.0.1:3013/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    await inspect(page, 'scene-reopen-tab');
    report.steps.push('Reloaded and reopened tab within the same test context.');
    try {
      await page.keyboard.press('Control+a');
      await page.mouse.click(500, 350, { button: 'right' });
      await page.getByText('Add to library', { exact: true }).click();
      await page.waitForTimeout(2500);
      await inspect(page, 'library');
      report.steps.push('Selected scene and used context menu Add to library.');
    } catch (e) { report.errors.push('library: ' + String(e)); await page.keyboard.press('Escape'); }
    try {
      const image = path.join(out, 'S-M4_imagem-ficticia_2026-11-12.svg');
      fs.writeFileSync(image, '<svg xmlns="http://www.w3.org/2000/svg" width="240" height="80"><rect width="240" height="80" fill="#ffeeaa"/><text x="10" y="45" font-size="18">IMAGEM-FICTICIA-SM4</text></svg>');
      await page.keyboard.press('Escape');
      const chooser = page.waitForEvent('filechooser', { timeout: 10000 });
      await page.keyboard.press('9');
      await (await chooser).setFiles(image);
      await page.mouse.click(850, 550);
      await page.keyboard.press('Escape');
      await page.waitForTimeout(2500);
      await inspect(page, 'image');
      report.steps.push('Inserted synthetic SVG using image tool and file chooser.');
    } catch (e) { report.errors.push('image: ' + String(e)); await page.keyboard.press('Escape'); }
    try {
      await page.keyboard.press('Control+Shift+p');
      await page.locator('.command-palette-dialog input').fill('Text to diagram');
      await page.keyboard.press('Enter');
      await page.locator('textarea.chat-interface__input').fill('PROMPT-FICTICIO-SM4: pedido de teste sem dados pessoais');
      await page.locator('button.chat-interface__send-button').click();
      await page.waitForTimeout(6000);
      await inspect(page, 'ttd');
      await page.screenshot({ path: path.join(out, 'S-M4_ia-falsa_2026-11-12.png') });
      report.steps.push('Submitted synthetic prompt to local fake AI backend.');
    } catch (e) { report.errors.push('ttd: ' + String(e)); }
    await page.reload({ waitUntil: 'networkidle' });
    await page.waitForTimeout(2500);
    await inspect(page, 'all-reload');
    await page.screenshot({ path: path.join(out, 'S-M4_apos-recarregar_2026-11-12.png') });
    // Inspeção dos controles disponíveis para orientar as etapas complementares.
    fs.writeFileSync(path.join(out, 'S-M4_controles_2026-11-12.txt'), await page.locator('body').innerText());
    console.log(await page.locator('body').innerText());
  } catch (e) {
    report.errors.push(String(e));
    await page.screenshot({ path: path.join(out, 'S-M4_limite_2026-11-12.png') }).catch(() => {});
    throw e;
  } finally {
    report.finished = new Date().toISOString(); save(); await browser.close();
  }
})().catch(e => { console.error(e); process.exitCode = 1; });
