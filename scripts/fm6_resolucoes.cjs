// F-M6 · Resoluções suportadas sem perda de elementos da interface.
//
// Abre o Excalidraw em quatro larguras (360, 768, 1366 e 2560 px) no Chrome,
// em três estados (tela inicial, forma selecionada com o painel de estilo e
// menu principal aberto). Em cada estado tira um print e verifica:
//   - se algum controle visível (botão, campo, seletor) fica cortado ou fora
//     da janela;
//   - se aparece barra de rolagem horizontal na página;
//   - se as funções básicas continuam alcançáveis (ferramentas, desfazer,
//     refazer, menu, ajuda, biblioteca), direto na tela ou pelo menu de
//     ferramentas extras.
//
// Uso (na raiz do repositório, com o build servido em http://localhost:5000):
//   node scripts/fm6_resolucoes.cjs --saida evidencias/flexibilidade/F-M6

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
const SAIDA = path.resolve(args.saida || "fm6-saida");
const DATA = new Date().toISOString().slice(0, 10);
fs.mkdirSync(SAIDA, { recursive: true });

// Larguras do roteiro, com alturas usuais de cada classe de tela.
const TELAS = [
  { largura: 360, altura: 800, classe: "celular" },
  { largura: 768, altura: 1024, classe: "tablet" },
  { largura: 1366, altura: 768, classe: "notebook" },
  { largura: 2560, altura: 1440, classe: "monitor QHD" },
];

// Ferramentas que precisam estar alcançáveis (barra ou menu de extras).
const FERRAMENTAS = [
  "selection", "rectangle", "diamond", "ellipse", "arrow",
  "line", "freedraw", "text", "image", "eraser",
];

const espera = (ms) => new Promise((r) => setTimeout(r, ms));

// Controles visíveis cortados ou fora da janela.
const cortados = (page) =>
  page.evaluate(() => {
    const W = window.innerWidth;
    const H = window.innerHeight;
    const sel = "button, input, select, textarea, [role=button], [role=menuitem], [role=radio], label.ToolIcon";
    const out = [];
    for (const el of document.querySelectorAll(sel)) {
      const r = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      if (r.width === 0 || r.height === 0 || cs.visibility === "hidden" || cs.display === "none") continue;
      if (el.closest(".visually-hidden") || cs.opacity === "0") continue;
      const fora = r.left < -1 || r.top < -1 || r.right > W + 1 || r.bottom > H + 1;
      if (fora) {
        const nome =
          el.getAttribute("aria-label") || el.getAttribute("title") || el.getAttribute("data-testid") ||
          (el.innerText || "").trim().slice(0, 30) || el.className.toString().slice(0, 40);
        out.push(`${nome} [${Math.round(r.left)},${Math.round(r.top)} ${Math.round(r.width)}×${Math.round(r.height)}]`);
      }
    }
    return {
      out,
      rolagemHorizontal: document.documentElement.scrollWidth > document.documentElement.clientWidth,
    };
  });

(async () => {
  const browser = await chromium.launch({ channel: "chrome", headless: true });
  const versao = await browser.version();
  const linhas = [];
  const resumo = [];
  const detalhes = [];

  for (const t of TELAS) {
    const ctx = await browser.newContext({
      viewport: { width: t.largura, height: t.altura },
      locale: "en-US",
    });
    const page = await ctx.newPage();
    await page.goto(URL_APP, { waitUntil: "networkidle" });
    await page.locator("canvas.excalidraw__canvas.interactive").waitFor();
    await espera(1500);

    const nomeBase = `F-M6_${t.largura}px_${DATA}`;
    const problemas = [];

    // Estado 1: tela inicial
    await page.screenshot({ path: path.join(SAIDA, `${nomeBase}_1-inicial.png`) });
    const c1 = await cortados(page);

    // Funções alcançáveis
    const alcance = {};
    for (const f of FERRAMENTAS) {
      alcance[f] = (await page.locator(`[data-testid="toolbar-${f}"]`).first().isVisible().catch(() => false))
        ? "barra"
        : null;
    }
    const extras = page.locator(".App-toolbar .dropdown-menu-button, [data-testid='dropdown-menu-button']").first();
    if (FERRAMENTAS.some((f) => !alcance[f]) && (await extras.isVisible().catch(() => false))) {
      await extras.click();
      await espera(500);
      for (const f of FERRAMENTAS) {
        if (alcance[f]) continue;
        const item = page.locator(`[data-testid="toolbar-${f}"]`).first();
        if (await item.isVisible().catch(() => false)) alcance[f] = "menu de extras";
      }
      await page.screenshot({ path: path.join(SAIDA, `${nomeBase}_1b-extras.png`) });
      await page.keyboard.press("Escape");
      await espera(300);
    }
    // No celular, losango e elipse ficam no menu do botão do retângulo, e a
    // linha no da seta (components/ToolPopover.tsx).
    for (const gatilho of ["rectangle", "arrow"]) {
      if (FERRAMENTAS.every((f) => alcance[f])) break;
      const btn = page.locator(`[data-testid="toolbar-${gatilho}"]`).first();
      if (!(await btn.isVisible().catch(() => false))) continue;
      await btn.click();
      await espera(500);
      let abriu = false;
      for (const f of FERRAMENTAS) {
        if (alcance[f]) continue;
        if (await page.locator(`.tool-popover-content [data-testid="toolbar-${f}"]`).isVisible().catch(() => false)) {
          alcance[f] = `menu do botão ${gatilho}`;
          abriu = true;
        }
      }
      if (abriu) await page.screenshot({ path: path.join(SAIDA, `${nomeBase}_1c-menu-${gatilho}.png`) });
      await page.keyboard.press("Escape");
      await page.locator('[data-testid="toolbar-selection"]').first().click().catch(() => {});
      await espera(300);
    }
    const outros = {
      "menu principal": '[data-testid="main-menu-trigger"]',
      desfazer: '[aria-label="Undo"]',
      refazer: '[aria-label="Redo"]',
      ajuda: '.help-icon, [data-testid="help-menu-item"], button[title*="Help"]',
      biblioteca: ".default-sidebar-trigger, .sidebar-trigger",
      "zoom (+, − e redefinir)": '[aria-label="Zoom in"]',
      "trava de ferramenta": '[data-testid="toolbar-lock"], [aria-label="Keep selected tool active after drawing"]',
      "selo de criptografia": '[title*="end-to-end encryption"], [aria-label*="end-to-end encryption"]',
    };
    for (const [nome, sel] of Object.entries(outros)) {
      alcance[nome] = (await page.locator(sel).first().isVisible().catch(() => false)) ? "tela" : null;
    }
    // ajuda pode ficar dentro do menu principal
    if (!alcance.ajuda) {
      await page.locator('[data-testid="main-menu-trigger"]').click().catch(() => {});
      await espera(400);
      if (await page.locator('[data-testid="help-menu-item"]').isVisible().catch(() => false)) alcance.ajuda = "menu principal";
      await page.keyboard.press("Escape");
      await espera(300);
    }

    // Para cada controle ausente, testa se a função continua por outro caminho.
    const mantidaPor = {};
    const estado = () => page.evaluate(() => JSON.parse(localStorage.getItem("excalidraw-state") || "{}"));
    if (!alcance["zoom (+, − e redefinir)"]) {
      const z0 = (await estado()).zoom?.value;
      await page.keyboard.press("Control+Equal");
      await espera(1200);
      const z1 = (await estado()).zoom?.value;
      await page.keyboard.press("Control+0");
      await espera(800);
      mantidaPor["zoom (+, − e redefinir)"] = z1 > z0
        ? `teclado (Ctrl + = levou o zoom de ${z0} a ${z1}; Ctrl + 0 redefine)`
        : null;
    }
    if (!alcance["trava de ferramenta"]) {
      const contar = async () => (JSON.parse(await page.evaluate(() => localStorage.getItem("excalidraw") || "[]"))).filter((e) => e.type === "rectangle" && !e.isDeleted).length;
      const n0 = await contar();
      await page.keyboard.press("q");
      await page.keyboard.press("r");
      for (const dy of [-150, 150]) {
        await page.mouse.move(40, Math.round(t.altura / 2) + dy);
        await page.mouse.down();
        await page.mouse.move(100, Math.round(t.altura / 2) + dy + 40, { steps: 5 });
        await page.mouse.up();
      }
      await espera(1200);
      const n1 = await contar();
      await page.keyboard.press("q");
      await page.keyboard.press("Escape");
      await page.keyboard.press("Control+a");
      await page.keyboard.press("Delete");
      await espera(800);
      mantidaPor["trava de ferramenta"] = n1 - n0 === 2
        ? "tecla Q (com a trava, dois retângulos seguidos sem escolher a ferramenta de novo)"
        : null;
    }
    if (!alcance["selo de criptografia"]) {
      mantidaPor["selo de criptografia"] = "não se aplica: é só um link informativo, sem função de edição";
    }

    // Estado 2: retângulo selecionado (painel de estilo)
    await page.keyboard.press("r");
    const cx = Math.round(t.largura / 2);
    const cy = Math.round(t.altura / 2);
    await page.mouse.move(cx - 60, cy - 40);
    await page.mouse.down();
    await page.mouse.move(cx + 60, cy + 40, { steps: 8 });
    await page.mouse.up();
    await espera(800);
    await page.screenshot({ path: path.join(SAIDA, `${nomeBase}_2-selecao.png`) });
    const c2 = await cortados(page);
    await page.keyboard.press("Escape");

    // Estado 3: menu principal aberto
    await page.locator('[data-testid="main-menu-trigger"]').click();
    await espera(600);
    await page.screenshot({ path: path.join(SAIDA, `${nomeBase}_3-menu.png`) });
    const c3 = await cortados(page);
    await page.keyboard.press("Escape");

    const faltando = Object.entries(alcance).filter(([, v]) => !v).map(([k]) => k);
    const todosCortados = [
      ...c1.out.map((x) => `inicial: ${x}`),
      ...c2.out.map((x) => `seleção: ${x}`),
      ...c3.out.map((x) => `menu: ${x}`),
    ];
    const rolagem = c1.rolagemHorizontal || c2.rolagemHorizontal || c3.rolagemHorizontal;
    if (faltando.length) problemas.push(`controles ausentes: ${faltando.join(", ")}`);
    const semFuncao = faltando.filter((f) => !mantidaPor[f]);
    if (todosCortados.length) problemas.push(`cortados: ${todosCortados.join("; ")}`);
    if (rolagem) problemas.push("rolagem horizontal na página");
    const ok = problemas.length === 0;

    const forma = await page.evaluate(() => {
      const root = document.querySelector(".excalidraw");
      return root ? [...root.classList].filter((c) => /mobile|tablet|phone|compact/.test(c)).join(" ") : "";
    });
    resumo.push({ ...t, ok, problemas, alcance, forma });
    linhas.push(
      `| ${t.largura} × ${t.altura} | ${t.classe} | ${forma || "—"} | ${ok ? "Sim" : "Não"} | ${
        faltando.join(", ") || "nenhum"
      } | ${faltando.map((f) => `${f}: ${mantidaPor[f] || "função perdida"}`).join("; ") || "—"} | ${
        semFuncao.length ? "Sim: " + semFuncao.join(", ") : "Não"
      } | ${todosCortados.join("; ").replace(/\|/g, "/") || "nenhum"}${rolagem ? "; rolagem horizontal" : ""} |`,
    );
    detalhes.push(`- ${t.largura} px: ${Object.entries(alcance).map(([k, v]) => `${k}: ${v || "ausente"}`).join("; ")}`);
    console.log(`${t.largura}px ${ok ? "Sim" : "Não"} ${problemas.join(" ; ")}`);
    await ctx.close();
  }
  await browser.close();

  const sim = resumo.filter((r) => r.ok).length;
  const rel = [
    `# F-M6 · resoluções · ${DATA}`,
    `URL: ${URL_APP}`,
    `Navegador: Chrome ${versao} (headless), ${process.platform}`,
    "",
    "| Janela (px) | Classe | Classes de layout no Excalidraw | Sem perda de elementos? | Controles ausentes | Função mantida por | Perda de função? | Controles cortados |",
    "| --- | --- | --- | :-: | --- | --- | :-: | --- |",
    ...linhas,
    "",
    "Onde cada controle foi encontrado:",
    "",
    ...detalhes,
    "",
    `Resoluções sem perda: ${sim} de ${TELAS.length}`,
  ];
  const arq = path.join(SAIDA, `F-M6_resultado_${DATA}.md`);
  fs.writeFileSync(arq, rel.join("\n") + "\n");
  console.log(`\n${rel.at(-1)}\nRelatório: ${path.relative(RAIZ, arq)}`);
})();
