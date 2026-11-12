// F-M5 · Cobertura funcional offline do Excalidraw.
//
// Abre o build de produção com rede (como um visitante novo), espera o
// service worker assumir a página, liga o modo offline do Chrome (o mesmo do
// DevTools, via Playwright) e testa uma lista fixa de funções. Cada função
// vira uma linha no relatório, com um print.
//
// Uso (na raiz do repositório, com o build servido em http://localhost:5000):
//   node scripts/fm5_teste_offline.cjs --modo offline --saida evidencias/flexibilidade/F-M5
//   node scripts/fm5_teste_offline.cjs --modo online  --saida <pasta>   (controle, com rede)
//
// Requer o Playwright de aplicacao/node_modules e o Google Chrome instalado.

const path = require("path");
const fs = require("fs");

const RAIZ = path.resolve(__dirname, "..");
const { chromium } = require(path.join(RAIZ, "aplicacao/node_modules/playwright"));

const args = Object.fromEntries(
  process.argv.slice(2).reduce((acc, a, i, arr) => {
    if (a.startsWith("--")) acc.push([a.slice(2), arr[i + 1]]);
    return acc;
  }, []),
);
const URL_APP = args.url || "http://localhost:5000/";
const MODO = args.modo || "offline";
const SAIDA = path.resolve(args.saida || "fm5-saida");
const DATA = new Date().toISOString().slice(0, 10);
const PRINTS = path.join(SAIDA, `prints-${MODO}`);
fs.mkdirSync(PRINTS, { recursive: true });

const OFFLINE = MODO === "offline";
const espera = (ms) => new Promise((r) => setTimeout(r, ms));

// Funções testadas. "rede" marca as que dependem de servidor por natureza.
const FUNCOES = [
  ["F01", "Reabrir o app (recarregar a página)", false],
  ["F02", "Desenhar formas (retângulo, losango, elipse)", false],
  ["F03", "Seta ligada a duas formas", false],
  ["F04", "Texto dentro de uma forma", false],
  ["F05", "Desenho livre", false],
  ["F06", "Mudar cor do traço e do fundo", false],
  ["F07", "Desfazer e refazer", false],
  ["F08", "Agrupar e duplicar", false],
  ["F09", "Cena preservada ao recarregar", false],
  ["F10", "Salvar em arquivo .excalidraw", false],
  ["F11", "Abrir arquivo .excalidraw", false],
  ["F12", "Exportar imagem PNG", false],
  ["F13", "Exportar imagem SVG", false],
  ["F14", "Inserir imagem do computador", false],
  ["F15", "Adicionar à biblioteca e reutilizar", false],
  ["F16", "Alternar modo escuro", false],
  ["F17", "Trocar o idioma para português", false],
  ["F18", "Converter Mermaid em diagrama", false],
  ["F19", "Trocar a fonte do texto", false],
  ["F20", "Colaboração ao vivo", true],
  ["F21", "Exportar link compartilhável", true],
  ["F22", "Texto para diagrama (IA)", true],
  ["F23", "Navegar bibliotecas públicas", true],
];

process.on("unhandledRejection", (e) => console.log("  [aviso]", String(e).split("\n")[0]));

(async () => {
  const browser = await chromium.launch({ channel: "chrome", headless: true });
  const ctx = await browser.newContext({
    viewport: { width: 1366, height: 768 },
    locale: "en-US",
    acceptDownloads: true,
  });
  // Sem os seletores nativos de arquivo (que o Playwright não controla), o
  // Excalidraw usa o caminho alternativo do browser-fs-access: download e
  // <input type="file">.
  await ctx.addInitScript(() => {
    delete window.showSaveFilePicker;
    delete window.showOpenFilePicker;
    delete window.showDirectoryPicker;
  });
  const page = await ctx.newPage();
  const falhasRede = [];
  page.on("requestfailed", (r) =>
    falhasRede.push(`${r.failure()?.errorText} ${r.url()}`),
  );

  const versao = (await browser.version()) + " (headless), " + process.platform;

  // 1. Primeiro acesso, com rede.
  await page.goto(URL_APP, { waitUntil: "networkidle" });
  await page.evaluate(() => navigator.serviceWorker.ready);
  await page.waitForFunction(() => !!navigator.serviceWorker.controller, null, {
    timeout: 30000,
  }).catch(() => {});
  const precache = await page.evaluate(async () => {
    const o = {};
    for (const k of await caches.keys()) {
      o[k] = (await (await caches.open(k)).keys()).map((r) => new URL(r.url).pathname);
    }
    return o;
  });

  // 2. Rede desligada.
  if (OFFLINE) await ctx.setOffline(true);

  const canvas = () => page.locator("canvas.excalidraw__canvas.interactive");
  const elementos = () =>
    page.evaluate(() =>
      JSON.parse(localStorage.getItem("excalidraw") || "[]").filter((e) => !e.isDeleted),
    );
  const arrastar = async (x1, y1, x2, y2, passos = 10) => {
    await page.mouse.move(x1, y1);
    await page.mouse.down();
    await page.mouse.move(x2, y2, { steps: passos });
    await page.mouse.up();
  };
  const esc = async () => {
    await page.keyboard.press("Escape");
    await page.keyboard.press("Escape");
  };
  // ponto da tela sobre a borda esquerda de um elemento, a partir da rolagem
  // e do zoom guardados pelo Excalidraw
  const bordaEsquerda = async (tipo) => {
    const el = (await elementos()).find((e) => e.type === tipo);
    const st = await page.evaluate(() => JSON.parse(localStorage.getItem("excalidraw-state") || "{}"));
    const z = st.zoom?.value || 1;
    return { x: (el.x + st.scrollX) * z, y: (el.y + el.height / 2 + st.scrollY) * z };
  };
  const textoVisivel = (t) => page.getByText(t, { exact: false }).first();

  const resultados = [];
  const testar = async (id, fn) => {
    const [, nome, rede] = FUNCOES.find((f) => f[0] === id);
    const inicioFalhas = falhasRede.length;
    let ok = false;
    let detalhe = "";
    try {
      const r = await Promise.race([
        fn(),
        espera(45000).then(() => ({ ok: false, detalhe: "tempo esgotado (45 s)" })),
      ]);
      ok = r.ok;
      detalhe = r.detalhe;
    } catch (e) {
      ok = false;
      detalhe = "erro: " + e.message.split("\n")[0];
    }
    const print = `${id}_${MODO}_${DATA}.png`;
    await page.screenshot({ path: path.join(PRINTS, print) }).catch(() => {});
    const rede_falhas = falhasRede
      .slice(inicioFalhas)
      .map((l) => l.replace(URL_APP, "/").replace(/\?.*$/, "?…"))
      .filter((l, i, a) => a.indexOf(l) === i)
      .slice(0, 5);
    resultados.push({ id, nome, rede, ok, detalhe, print, rede_falhas });
    console.log(`${id} ${ok === null ? "N/T  " : ok ? "OK   " : "FALHA"} ${nome} | ${detalhe}`);
    await esc();
  };

  // ---------------------------------------------------------------- F01
  await testar("F01", async () => {
    await page.reload({ waitUntil: "load" });
    await canvas().waitFor({ timeout: 15000 });
    const sw = await page.evaluate(() => !!navigator.serviceWorker.controller);
    const ferramentas = await page.locator('[data-testid="toolbar-rectangle"]').isVisible();
    return {
      ok: ferramentas,
      detalhe: `canvas e barra de ferramentas carregados; página servida pelo service worker: ${sw ? "sim" : "não"}`,
    };
  });

  // ---------------------------------------------------------------- F02
  await testar("F02", async () => {
    await page.keyboard.press("r");
    await arrastar(250, 250, 420, 330);
    await page.keyboard.press("d");
    await arrastar(560, 450, 720, 560);
    await page.keyboard.press("o");
    await arrastar(850, 250, 1020, 330);
    await espera(1200);
    const tipos = (await elementos()).map((e) => e.type);
    const ok = ["rectangle", "diamond", "ellipse"].every((t) => tipos.includes(t));
    return { ok, detalhe: `elementos na cena: ${tipos.join(", ")}` };
  });

  // ---------------------------------------------------------------- F03
  await testar("F03", async () => {
    await page.keyboard.press("a");
    await arrastar(335, 290, 935, 290, 20);
    await espera(1200);
    const seta = (await elementos()).find((e) => e.type === "arrow");
    const ok = !!(seta && seta.startBinding && seta.endBinding);
    return {
      ok,
      detalhe: seta
        ? `seta criada; ligada no início: ${!!seta.startBinding}, no fim: ${!!seta.endBinding}`
        : "nenhuma seta criada",
    };
  });

  // ---------------------------------------------------------------- F04
  await testar("F04", async () => {
    await page.keyboard.press("v");
    await page.mouse.click(250, 290); // borda esquerda do retângulo
    await page.keyboard.press("Enter");
    await page.keyboard.type("Login");
    await page.keyboard.press("Escape");
    await espera(1200);
    const txt = (await elementos()).find((e) => e.type === "text");
    const ok = !!(txt && txt.containerId && txt.text === "Login");
    return {
      ok,
      detalhe: txt ? `texto "${txt.text}", dentro de forma: ${!!txt.containerId}` : "nenhum texto criado",
    };
  });

  // ---------------------------------------------------------------- F05
  await testar("F05", async () => {
    await page.keyboard.press("p");
    await page.mouse.move(150, 600);
    await page.mouse.down();
    for (let i = 0; i <= 20; i++) await page.mouse.move(150 + i * 10, 600 + Math.sin(i / 3) * 30);
    await page.mouse.up();
    await espera(1200);
    const fd = (await elementos()).find((e) => e.type === "freedraw");
    return { ok: !!fd, detalhe: fd ? `traço com ${fd.points.length} pontos` : "nenhum traço criado" };
  });

  // ---------------------------------------------------------------- F06
  await testar("F06", async () => {
    await page.keyboard.press("v");
    await page.mouse.click(250, 290);
    const picks = page.locator('[data-testid^="color-top-pick-"]');
    const n = await picks.count();
    // as cinco primeiras são do traço; as seguintes, do fundo
    await picks.nth(1).click();
    await picks.nth(Math.min(n - 1, 6)).click();
    await espera(1200);
    const ret = (await elementos()).find((e) => e.type === "rectangle");
    const ok = ret.strokeColor !== "#1e1e1e" && ret.backgroundColor !== "transparent";
    return { ok, detalhe: `traço ${ret.strokeColor}, fundo ${ret.backgroundColor}` };
  });

  // ---------------------------------------------------------------- F07
  await testar("F07", async () => {
    // O histórico do Excalidraw também guarda mudanças de seleção; por isso o
    // teste usa um elemento novo: desfazer o remove e refazer o traz de volta.
    await page.keyboard.press("r");
    await arrastar(1150, 450, 1250, 520);
    await espera(1000);
    const n1 = (await elementos()).length;
    await page.locator(".undo-button-container button").click();
    await espera(1000);
    const n2 = (await elementos()).length;
    await page.locator(".redo-button-container button").click();
    await espera(1000);
    const n3 = (await elementos()).length;
    await page.keyboard.press("Delete");
    await espera(800);
    const ok = n2 === n1 - 1 && n3 === n1;
    return { ok, detalhe: `elementos: ${n1} → desfazer ${n2} → refazer ${n3}` };
  });

  // ---------------------------------------------------------------- F08
  await testar("F08", async () => {
    await page.mouse.click(683, 700); // área vazia
    await page.keyboard.press("Control+a");
    await page.keyboard.press("Control+g");
    await espera(800);
    const agrupados = (await elementos()).every((e) => e.groupIds.length > 0);
    const n1 = (await elementos()).length;
    await page.keyboard.press("Control+d");
    await espera(1200);
    const n2 = (await elementos()).length;
    await page.keyboard.press("Control+z");
    await page.keyboard.press("Control+z");
    await espera(1200);
    const ok = agrupados && n2 === n1 * 2;
    return { ok, detalhe: `agrupados: ${agrupados}; elementos ${n1} → ${n2} após duplicar (desfeito depois)` };
  });

  // ---------------------------------------------------------------- F09
  let cenaAntes = 0;
  await testar("F09", async () => {
    cenaAntes = (await elementos()).length;
    await page.reload({ waitUntil: "load" });
    await canvas().waitFor({ timeout: 15000 });
    await espera(1500);
    const depois = (await elementos()).length;
    return { ok: depois === cenaAntes && depois > 0, detalhe: `${cenaAntes} elementos antes, ${depois} depois de recarregar` };
  });

  // ---------------------------------------------------------------- F10
  const arqCena = path.join(SAIDA, `F-M5_cena-${MODO}_${DATA}.excalidraw`);
  await testar("F10", async () => {
    const dl = page.waitForEvent("download", { timeout: 15000 });
    await page.keyboard.press("Control+s");
    const d = await dl;
    await d.saveAs(arqCena);
    const json = JSON.parse(fs.readFileSync(arqCena, "utf8"));
    return { ok: json.elements.length > 0, detalhe: `arquivo ${d.suggestedFilename()} com ${json.elements.length} elementos` };
  });

  // ---------------------------------------------------------------- F11
  await testar("F11", async () => {
    if (!fs.existsSync(arqCena)) return { ok: false, detalhe: "sem arquivo de F10 para abrir" };
    await page.mouse.click(683, 700);
    await page.keyboard.press("Control+a");
    await page.keyboard.press("Delete");
    await espera(1000);
    const vazio = (await elementos()).length;
    const fc = page.waitForEvent("filechooser", { timeout: 10000 });
    fc.catch(() => {});
    await page.locator('[data-testid="main-menu-trigger"]').click();
    await page.locator('[data-testid="load-button"]').click();
    await (await fc).setFiles(arqCena);
    const confirmar = page.getByRole("button", { name: /confirm/i });
    if (await confirmar.isVisible({ timeout: 2000 }).catch(() => false)) await confirmar.click();
    await espera(2000);
    const depois = (await elementos()).length;
    return { ok: vazio === 0 && depois > 0, detalhe: `cena limpa (${vazio}); depois de abrir: ${depois} elementos` };
  });

  // ---------------------------------------------------------------- F12 e F13
  const exportar = async (formato) => {
    await page.keyboard.press("Control+Shift+e");
    const botao = page.getByRole("button", { name: `Export to ${formato}`, exact: true });
    await botao.waitFor({ timeout: 10000 });
    const dl = page.waitForEvent("download", { timeout: 20000 });
    await botao.click();
    const d = await dl;
    const destino = path.join(SAIDA, `F-M5_exportado-${MODO}_${DATA}.${formato.toLowerCase()}`);
    await d.saveAs(destino);
    return { tam: fs.statSync(destino).size, nome: d.suggestedFilename(), destino };
  };
  let pngExportado = null;
  await testar("F12", async () => {
    const r = await exportar("PNG");
    pngExportado = r.destino;
    return { ok: r.tam > 0, detalhe: `${r.nome}, ${r.tam} bytes` };
  });
  await testar("F13", async () => {
    const r = await exportar("SVG");
    const svg = fs.readFileSync(r.destino, "utf8");
    // Com rede, o Excalidraw embute as fontes no SVG (data:font/woff2). Se a
    // fonte ficar só como link externo, o texto perde a fonte quando o SVG é
    // aberto sem internet: conta como falha.
    const srcs = [...svg.matchAll(/@font-face\s*\{[^}]*?src:\s*url\(([^)]{0,40})/g)].map((m) => m[1]);
    const externas = srcs.filter((u) => !u.startsWith("data:"));
    const ok = r.tam > 0 && svg.includes("<svg") && externas.length === 0;
    return {
      ok,
      detalhe: `${r.nome}, ${r.tam} bytes; fontes no SVG: ${srcs.length - externas.length} embutida(s), ${externas.length} só como link externo`,
    };
  });

  // ---------------------------------------------------------------- F14
  await testar("F14", async () => {
    if (!pngExportado) return { ok: false, detalhe: "sem PNG de F12 para inserir" };
    const fc = page.waitForEvent("filechooser", { timeout: 10000 });
    fc.catch(() => {});
    await page.mouse.click(683, 700);
    await page.keyboard.press("9"); // ferramenta de imagem
    await (await fc).setFiles(pngExportado);
    await espera(3000);
    const img = (await elementos()).find((e) => e.type === "image");
    // a imagem entra selecionada no centro da tela; é removida para não
    // cobrir as formas usadas nos passos seguintes
    if (img) {
      await page.keyboard.press("Delete");
      await espera(800);
    }
    return { ok: !!img, detalhe: img ? `imagem inserida (status ${img.status})` : "nenhuma imagem inserida" };
  });

  // ---------------------------------------------------------------- F15
  await testar("F15", async () => {
    await esc();
    await page.keyboard.press("v");
    const pt = await bordaEsquerda("rectangle");
    await page.mouse.click(pt.x, pt.y);
    await page.mouse.click(pt.x, pt.y, { button: "right" });
    await page.getByText("Add to library", { exact: true }).click();
    await espera(1500);
    // sem seleção, o painel não mostra o quadro de "adicionar a seleção", e o
    // primeiro item passa a ser o que acabou de ser salvo
    await esc();
    const item = page.locator(".library-unit.library-unit__active .library-unit__dragger").first();
    if (!(await item.isVisible().catch(() => false))) {
      await page.locator(".default-sidebar-trigger").first().click();
    }
    await item.waitFor({ timeout: 10000 });
    const n1 = (await elementos()).length;
    await item.click();
    await espera(1500);
    const n2 = (await elementos()).length;
    await page.keyboard.press("Delete");
    await esc();
    await page.locator(".default-sidebar-trigger").first().click().catch(() => {});
    return { ok: n2 > n1, detalhe: `item salvo na biblioteca; elementos ${n1} → ${n2} ao reutilizar` };
  });

  // ---------------------------------------------------------------- F16
  await testar("F16", async () => {
    await page.mouse.click(683, 700);
    await page.keyboard.press("Alt+Shift+d");
    await espera(1000);
    const escuro = await page.locator(".excalidraw.theme--dark").count();
    await page.keyboard.press("Alt+Shift+d");
    await espera(800);
    return { ok: escuro > 0, detalhe: `tema escuro aplicado: ${escuro > 0}` };
  });

  // ---------------------------------------------------------------- F17
  await testar("F17", async () => {
    await page.locator('[data-testid="main-menu-trigger"]').click();
    const sel = page.locator("select.dropdown-select__language");
    await sel.selectOption("pt-BR");
    await espera(4000);
    const lang = await page.evaluate(() => document.documentElement.lang);
    const titulo = await page.locator('[data-testid="toolbar-rectangle"]').getAttribute("title");
    const ok = lang === "pt-BR" && /Retângulo/i.test(titulo || "");
    // volta ao inglês para os próximos passos
    await esc();
    await page.locator('[data-testid="main-menu-trigger"]').click();
    await page.locator("select.dropdown-select__language").selectOption("en");
    await espera(1500);
    return { ok, detalhe: `lang=${lang}; título do botão de retângulo: "${titulo}"` };
  });

  // ---------------------------------------------------------------- F18
  await testar("F18", async () => {
    await page.locator(".App-toolbar .dropdown-menu-button, [data-testid='dropdown-menu-button']").first().click();
    await page.getByText("Mermaid to Excalidraw", { exact: true }).click();
    await espera(6000);
    const erro = await page.locator('[data-testid="ttd-dialog-output-error"], [data-testid="ttd-dialog-output-load-error"]').count();
    const erroTxt = erro ? (await page.locator('[data-testid="ttd-dialog-output-error"], [data-testid="ttd-dialog-output-load-error"]').first().innerText()).slice(0, 120) : "";
    const n1 = (await elementos()).length;
    const inserir = page.getByRole("button", { name: /insert/i });
    if (!erro && (await inserir.isEnabled().catch(() => false))) await inserir.click();
    await espera(1500);
    const n2 = (await elementos()).length;
    if (n2 > n1) {
      await page.keyboard.press("Delete");
    }
    return { ok: !erro && n2 > n1, detalhe: erro ? `erro no diálogo: ${erroTxt.replace(/\s+/g, " ")}` : `elementos ${n1} → ${n2} ao inserir` };
  });

  // ---------------------------------------------------------------- F19
  await testar("F19", async () => {
    await page.keyboard.press("v");
    await page.mouse.click(683, 700);
    await page.keyboard.press("t");
    await page.mouse.click(700, 660);
    await page.keyboard.type("Fonte");
    await page.keyboard.press("Escape");
    await espera(800);
    await page.locator('[data-testid="font-family-show-fonts"]').click();
    await page.getByText("Nunito", { exact: true }).first().click();
    await espera(3000);
    const fam = await page.evaluate(async () => {
      const r = await document.fonts.load('20px "Nunito"').catch((e) => "erro " + e.message);
      return Array.isArray(r) ? r.map((f) => f.status).join(",") || "nenhuma" : r;
    });
    const txt = (await elementos()).filter((e) => e.type === "text").pop();
    const ok = fam.includes("loaded");
    return { ok, detalhe: `fontFamily do texto: ${txt?.fontFamily}; fonte Nunito no navegador: ${fam}` };
  });

  // ---------------------------------------------------------------- F20
  await testar("F20", async () => {
    if (!OFFLINE) return { ok: null, detalhe: "não testado com rede (usaria o servidor oficial)" };
    await espera(1500);
    if (!(await page.locator('[data-testid="collab-button"]').isVisible())) {
      return { ok: false, detalhe: "o botão de compartilhar não aparece sem rede (excalidraw-app/App.tsx:824-826)" };
    }
    await page.locator('[data-testid="collab-button"]').click();
    await page.getByRole("button", { name: /start session/i }).click();
    await espera(8000);
    const corpo = await page.locator(".Modal, .ShareDialog, .Toast, .collab-errors-button, [role=dialog]").allInnerTexts();
    const erro = await page.locator(".collab-errors-button, .Toast").count();
    const txt = corpo.join(" | ").replace(/\s+/g, " ").slice(0, 200);
    return { ok: erro === 0, detalhe: `aviso de erro na tela: ${erro > 0}; ${txt}` };
  });

  // ---------------------------------------------------------------- F21
  await testar("F21", async () => {
    if (!OFFLINE) return { ok: null, detalhe: "não testado com rede (usaria o servidor oficial)" };
    await esc();
    await page.reload({ waitUntil: "load" });
    await canvas().waitFor({ timeout: 15000 });
    await espera(1500);
    if (!(await page.locator('[data-testid="collab-button"]').isVisible())) {
      return { ok: false, detalhe: "o botão de compartilhar, onde fica a opção, não aparece sem rede (excalidraw-app/App.tsx:824-826)" };
    }
    await page.locator('[data-testid="collab-button"]').click();
    await page.getByRole("button", { name: /export to link/i }).click();
    await espera(6000);
    const erro = await textoVisivel("Couldn't create shareable link").isVisible().catch(() => false);
    const link = await page.locator("input[value*='#json=']").count();
    return { ok: !erro && link > 0, detalhe: `link gerado: ${link > 0}; mensagem de erro: ${erro}` };
  });

  // ---------------------------------------------------------------- F22
  await testar("F22", async () => {
    await esc();
    await page.locator(".App-toolbar .dropdown-menu-button, [data-testid='dropdown-menu-button']").first().click();
    await page.getByText("Text to diagram", { exact: true }).click();
    await espera(1500);
    const area = page.locator(".ttd-dialog textarea, .ttd-dialog [contenteditable=true]").first();
    await area.click();
    await page.keyboard.type("A login flow with a decision");
    await page.keyboard.press("Control+Enter");
    await espera(10000);
    const erro = await page.locator('[data-testid="ttd-dialog-output-error"], .ttd-dialog-output-error').count();
    const erroTxt = erro ? (await page.locator('[data-testid="ttd-dialog-output-error"], .ttd-dialog-output-error').first().innerText()).replace(/\s+/g, " ").slice(0, 150) : "";
    const n1 = (await elementos()).length;
    const inserir = page.getByRole("button", { name: /^Insert/ }).last();
    if (!erro && (await inserir.isEnabled().catch(() => false))) await inserir.click();
    await espera(1500);
    const n2 = (await elementos()).length;
    if (n2 > n1) await page.keyboard.press("Delete");
    return { ok: !erro && n2 > n1, detalhe: erro ? `erro: ${erroTxt}` : `elementos ${n1} → ${n2} ao inserir o diagrama gerado` };
  });

  // ---------------------------------------------------------------- F23
  await testar("F23", async () => {
    await esc();
    await page.keyboard.press("Alt+l").catch(() => {});
    await page.locator(".layer-ui__wrapper__top-right .sidebar-trigger, .default-sidebar-trigger").first().click().catch(() => {});
    const link = page.getByText(/browse libraries/i).first();
    await link.waitFor({ timeout: 10000 });
    const popup = page.waitForEvent("popup", { timeout: 10000 });
    await link.click();
    const p = await popup;
    let carregou = false;
    let erro = "";
    try {
      const resp = await p.waitForNavigation({ timeout: 15000 }).catch(() => null);
      await p.waitForLoadState("load", { timeout: 15000 });
      const t = await p.title();
      carregou = !/is not available|ERR_|não está disponível/i.test(await p.content()) && t.length > 0;
      erro = `título "${t}"`;
    } catch (e) {
      erro = e.message.split("\n")[0];
    }
    await p.screenshot({ path: path.join(PRINTS, `F23-popup_${MODO}_${DATA}.png`) }).catch(() => {});
    await p.close();
    return { ok: carregou, detalhe: `site de bibliotecas: ${erro}` };
  });

  await browser.close();

  // ------------------------------------------------------------ relatório
  const testadas = resultados.filter((r) => r.ok !== null);
  const ok = testadas.filter((r) => r.ok).length;
  const linhas = [
    `# F-M5 · teste ${MODO} · ${DATA}`,
    `URL: ${URL_APP}`,
    `Navegador: Chrome ${versao}`,
    `Precache do service worker: ${Object.values(precache).flat().length} arquivos`,
    "",
    "| ID | Função | Depende de servidor | Funcionou | Detalhe | Pedidos que falharam |",
    "| --- | --- | :-: | :-: | --- | --- |",
    ...resultados.map(
      (r) =>
        `| ${r.id} | ${r.nome} | ${r.rede ? "sim" : "não"} | ${r.ok === null ? "não testado" : r.ok ? "Sim" : "Não"} | ${r.detalhe.replace(/\|/g, "/")} | ${r.rede_falhas.join("<br>").replace(/\|/g, "/") || "—"} |`,
    ),
    "",
    `Funcionaram: ${ok} de ${testadas.length} (${((100 * ok) / testadas.length).toFixed(1)}%)`,
  ];
  const rel = path.join(SAIDA, `F-M5_resultado-${MODO}_${DATA}.md`);
  fs.writeFileSync(rel, linhas.join("\n") + "\n");
  fs.writeFileSync(
    path.join(SAIDA, `F-M5_precache_${DATA}.json`),
    JSON.stringify(precache, null, 2) + "\n",
  );
  console.log(`\n${linhas.at(-1)}\nRelatório: ${path.relative(RAIZ, rel)}`);
})();
