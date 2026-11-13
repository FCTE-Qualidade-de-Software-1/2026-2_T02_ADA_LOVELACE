// CI-M22 · Violações da WCAG 2.2 (níveis A e AA) e
// CI-M25 · Contraste mínimo de 4,5:1.
//
// Abre a tela principal do Excalidraw no Chrome (1366 × 768), nos modos claro
// e escuro, em três estados:
//   1. inicial (tela de boas-vindas);
//   2. com um retângulo e um texto selecionados (painel de propriedades aberto);
//   3. com o menu principal aberto.
//
// Em cada estado:
//   - CI-M22: roda o axe-core (o motor do axe DevTools) só com as regras dos
//     níveis A e AA da WCAG 2.0, 2.1 e 2.2 e guarda as violações;
//   - CI-M25: coleta todo texto visível da interface, calcula a cor do texto e
//     a cor efetiva do fundo (somando as camadas semitransparentes) e agrupa
//     os pares iguais. Cada par é uma "combinação"; a razão de contraste segue
//     a fórmula da WCAG (luminância relativa).
// Por fim, roda o Lighthouse (categoria acessibilidade) na tela inicial, nos
// dois modos, no mesmo Chrome, para ter uma segunda ferramenta.
//
// Uso (na raiz do repositório, com o build servido em http://localhost:5000):
//   node scripts/ci_m22_m25_acessibilidade.cjs --saida evidencias/capacidade-interacao/CI-M22-M25
//   (acrescente --sem-lighthouse para pular o Lighthouse)
//
// Requer o Playwright e o axe-core de aplicacao/node_modules, o Google Chrome
// instalado e, para o Lighthouse, acesso ao npm (npx).

const path = require("path");
const fs = require("fs");
const os = require("os");
const { execFileSync, spawn } = require("child_process");

const RAIZ = path.resolve(__dirname, "..");
const NM = path.join(RAIZ, "aplicacao/node_modules");
const { chromium } = require(path.join(NM, "playwright"));
const AXE = fs.readFileSync(path.join(NM, "axe-core/axe.min.js"), "utf8");
const AXE_VERSAO = require(path.join(NM, "axe-core/package.json")).version;
const LIGHTHOUSE = "lighthouse@12.6.1";

const args = process.argv.slice(2);
const opc = (n, d) => (args.includes(`--${n}`) ? args[args.indexOf(`--${n}`) + 1] : d);
const URL_APP = opc("url", "http://localhost:5000/");
const SAIDA = path.resolve(opc("saida", "ci-m22-m25-saida"));
const COM_LIGHTHOUSE = !args.includes("--sem-lighthouse");
const DATA = new Date().toISOString().slice(0, 10);
const PORTA = 9333;
const CHROME = opc("chrome", "C:/Program Files/Google/Chrome/Application/chrome.exe");
fs.mkdirSync(SAIDA, { recursive: true });

const espera = (ms) => new Promise((r) => setTimeout(r, ms));
const TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22a", "wcag22aa"];
// regras com tag WCAG A/AA que o axe marca como experimentais e deixa
// desligadas por padrão; são ligadas à parte para cobrir os três estados
// (o Lighthouse só avalia a tela inicial)
const EXTRAS = ["label-content-name-mismatch"];
const ESTADOS = ["inicial", "selecao", "menu"];
const MODOS = ["claro", "escuro"];

// ------------------------------------------------------------ contraste
// Roda dentro da página: devolve um item por elemento com texto visível.
function coletarTextos() {
  const parse = (c) => {
    const m = c.match(/rgba?\(([^)]+)\)/);
    if (!m) return null;
    const p = m[1].split(/[ ,/]+/).filter(Boolean).map(Number);
    return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 };
  };
  const sobre = (f, b) => ({
    r: f.r * f.a + b.r * (1 - f.a),
    g: f.g * f.a + b.g * (1 - f.a),
    b: f.b * f.a + b.b * (1 - f.a),
    a: 1,
  });
  // fundo efetivo: junta as cores de fundo dos ancestrais, de cima para baixo,
  // até achar uma opaca (ou o branco da página)
  const fundoDe = (el) => {
    const camadas = [];
    let imagem = false;
    for (let n = el; n && n.nodeType === 1; n = n.parentElement) {
      const cs = getComputedStyle(n);
      if (cs.backgroundImage && cs.backgroundImage !== "none") imagem = true;
      const c = parse(cs.backgroundColor);
      if (c && c.a > 0) {
        camadas.push(c);
        if (c.a >= 1) break;
      }
    }
    let base = { r: 255, g: 255, b: 255, a: 1 };
    for (let i = camadas.length - 1; i >= 0; i--) base = sobre(camadas[i], base);
    return { cor: base, imagem };
  };
  const opacidade = (el) => {
    let o = 1;
    for (let n = el; n && n.nodeType === 1; n = n.parentElement) o *= Number(getComputedStyle(n).opacity);
    return o;
  };
  // fica de fora o texto que ninguém vê na tela, como os rótulos só para
  // leitor de tela (classe visually-hidden: 1 × 1 px e recortados)
  const visivel = (el) => {
    const r = el.getBoundingClientRect();
    if (r.width <= 1 || r.height <= 1) return false;
    if (r.bottom < 0 || r.right < 0 || r.top > innerHeight || r.left > innerWidth) return false;
    for (let n = el; n && n.nodeType === 1; n = n.parentElement) {
      const cs = getComputedStyle(n);
      if (cs.visibility === "hidden" || cs.display === "none" || Number(cs.opacity) === 0) return false;
      // recortado em 1 px (o caso do visually-hidden: 1 × 1 px com overflow
      // hidden e clip); um contêiner de tamanho zero sem recorte não esconde nada
      const rn = n.getBoundingClientRect();
      const recorta = cs.overflow === "hidden" || (cs.clip && cs.clip !== "auto");
      if (recorta && (rn.width <= 1 || rn.height <= 1)) return false;
    }
    return true;
  };
  const hex = (c) =>
    "#" + [c.r, c.g, c.b].map((v) => Math.round(v).toString(16).padStart(2, "0")).join("");
  const itens = [];
  const andar = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const vistos = new Set();
  while (andar.nextNode()) {
    const t = andar.currentNode;
    const texto = t.textContent.replace(/\s+/g, " ").trim();
    if (!texto) continue;
    const el = t.parentElement;
    if (!el || vistos.has(el) || !visivel(el)) continue;
    if (el.closest("script, style, noscript, svg, canvas, textarea")) continue;
    vistos.add(el);
    const cs = getComputedStyle(el);
    const cor = parse(cs.color);
    if (!cor) continue;
    const { cor: fundo, imagem } = fundoDe(el);
    const op = opacidade(el);
    const frente = sobre({ ...cor, a: cor.a * op }, fundo);
    const tam = parseFloat(cs.fontSize);
    const negrito = Number(cs.fontWeight) >= 700;
    itens.push({
      texto: texto.slice(0, 40),
      cor: hex(frente),
      fundo: hex(fundo),
      grande: tam >= 24 || (negrito && tam >= 18.66),
      fundoComImagem: imagem,
      onde: el.closest("[class]")?.className?.toString().split(" ")[0] || el.tagName.toLowerCase(),
    });
  }
  return itens;
}

const lum = (hex) => {
  const c = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  const l = c.map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * l[0] + 0.7152 * l[1] + 0.0722 * l[2];
};
const razao = (a, b) => {
  const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
};

// ------------------------------------------------------------ execução
(async () => {
  const perfil = fs.mkdtempSync(path.join(os.tmpdir(), "ci-m22-"));
  const ctx = await chromium.launchPersistentContext(perfil, {
    channel: "chrome",
    headless: true,
    viewport: { width: 1366, height: 768 },
    locale: "en-US",
  });
  const page = ctx.pages()[0] || (await ctx.newPage());
  // o user agent traz a versão reduzida (157.0.0.0); o DevTools dá a completa
  const versao = (await (await ctx.newCDPSession(page)).send("Browser.getVersion")).product.replace("Chrome/", "");

  const abrir = async (modo) => {
    await page.goto(URL_APP, { waitUntil: "networkidle" });
    await page.evaluate((m) => {
      localStorage.clear();
      localStorage.setItem("excalidraw-theme", m === "escuro" ? "dark" : "light");
    }, modo);
    await page.reload({ waitUntil: "networkidle" });
    await page.locator("canvas.excalidraw__canvas.interactive").waitFor();
    await espera(1500);
  };
  const preparar = async (estado) => {
    if (estado === "selecao") {
      await page.locator('[data-testid="toolbar-rectangle"]').click();
      await page.mouse.move(500, 250);
      await page.mouse.down();
      await page.mouse.move(700, 380, { steps: 8 });
      await page.mouse.up();
      await page.locator('[data-testid="toolbar-text"]').click();
      await page.mouse.click(800, 450);
      await page.keyboard.type("Texto");
      await page.keyboard.press("Escape");
      await page.keyboard.press("Control+a"); // seleciona os dois
      await espera(800);
    }
    if (estado === "menu") {
      await page.locator('[data-testid="main-menu-trigger"]').click();
      await espera(600);
    }
  };

  const axe = [];
  const incompletos = [];
  const textos = [];
  for (const modo of MODOS) {
    for (const estado of ESTADOS) {
      await abrir(modo);
      await preparar(estado);
      const tema = await page.evaluate(() =>
        document.querySelector(".excalidraw")?.classList.contains("theme--dark") ? "escuro" : "claro",
      );
      if (tema !== modo) throw new Error(`tema esperado ${modo}, obtido ${tema}`);
      await page.screenshot({ path: path.join(SAIDA, `CI-M22_${modo}-${estado}_${DATA}.png`) });
      await page.addScriptTag({ content: AXE });
      const r = await page.evaluate(
        ([tags, extras]) =>
          window.axe.run(document, {
            runOnly: { type: "tag", values: tags },
            rules: Object.fromEntries(extras.map((id) => [id, { enabled: true }])),
          }),
        [TAGS, EXTRAS],
      );
      // checagens de contraste que o axe não conseguiu decidir sozinho
      const cc = r.incomplete.find((v) => v.id === "color-contrast");
      incompletos.push({
        modo,
        estado,
        nos: cc ? cc.nodes.length : 0,
        motivos: cc ? [...new Set(cc.nodes.flatMap((n) => n.any.map((a) => a.message.split(".")[0])))] : [],
      });
      for (const v of r.violations) {
        axe.push({
          modo,
          estado,
          regra: v.id,
          impacto: v.impact,
          criterios: v.tags.filter((t) => /^wcag\d{3,}$/.test(t)).join(" "),
          nivel: v.tags.filter((t) => /^wcag2\d?a+$/.test(t)).join(" "),
          descricao: v.help,
          nos: v.nodes.length,
          exemplos: v.nodes.slice(0, 3).map((n) => n.target.join(" ")),
          elementos: v.nodes.map((n) => ({ alvo: n.target.join(" "), html: n.html.slice(0, 160) })),
        });
      }
      for (const t of await page.evaluate(coletarTextos)) textos.push({ modo, estado, ...t });
      console.log(`${modo}/${estado}: ${r.violations.length} regra(s) violada(s) no axe; ${r.passes.length} aprovadas; contraste incompleto em ${incompletos.at(-1).nos} elemento(s)`);
    }
  }

  await ctx.close();

  // ------------------------------------------------------------ Lighthouse
  // O Lighthouse não deixa escolher o tema antes de carregar a página. Por
  // isso, para cada modo: o Playwright grava o tema num perfil novo do Chrome,
  // o script abre o Chrome com esse perfil e uma porta de depuração, e o
  // Lighthouse se conecta a ele (--port) sem limpar o armazenamento.
  const lighthouse = [];
  if (COM_LIGHTHOUSE) {
    for (const modo of MODOS) {
      const perfilLh = fs.mkdtempSync(path.join(os.tmpdir(), "ci-m22-lh-"));
      const prep = await chromium.launchPersistentContext(perfilLh, { channel: "chrome", headless: true, locale: "en-US" });
      const pp = prep.pages()[0] || (await prep.newPage());
      await pp.goto(URL_APP);
      await pp.evaluate((m) => localStorage.setItem("excalidraw-theme", m === "escuro" ? "dark" : "light"), modo);
      await espera(500);
      await prep.close();
      const chrome = spawn(
        CHROME,
        ["--headless=new", `--remote-debugging-port=${PORTA}`, `--user-data-dir=${perfilLh}`, "--lang=en-US",
          "--no-first-run", "--no-default-browser-check", "about:blank"],
        { stdio: "ignore" },
      );
      for (let i = 0; i < 40; i++) {
        try {
          if ((await fetch(`http://127.0.0.1:${PORTA}/json/version`)).ok) break;
        } catch {}
        await espera(500);
      }
      const saida = path.join(SAIDA, `CI-M22_lighthouse-${modo}_${DATA}.json`);
      try {
        execFileSync(
          process.platform === "win32" ? "npx.cmd" : "npx",
          ["-y", LIGHTHOUSE, URL_APP, `--port=${PORTA}`, "--disable-storage-reset", "--preset=desktop",
            "--only-categories=accessibility", "--output=json", `--output-path=${saida}`, "--quiet"],
          { stdio: "inherit", shell: process.platform === "win32", timeout: 180000 },
        );
        const j = JSON.parse(fs.readFileSync(saida, "utf8"));
        const falhas = Object.values(j.audits).filter((a) => a.score === 0 && a.scoreDisplayMode === "binary");
        const shot = j.fullPageScreenshot?.screenshot?.data;
        if (shot) fs.writeFileSync(path.join(SAIDA, `CI-M22_lighthouse-${modo}_${DATA}.jpg`), Buffer.from(shot.split(",")[1], "base64"));
        lighthouse.push({
          modo,
          nota: Math.round(j.categories.accessibility.score * 100),
          falhas: falhas.map((a) => ({ id: a.id, titulo: a.title, nos: a.details?.items?.length ?? 0, exemplo: a.details?.items?.[0]?.node?.snippet?.slice(0, 120) || "" })),
          versao: j.lighthouseVersion,
          janela: `${j.configSettings.screenEmulation.width} × ${j.configSettings.screenEmulation.height}`,
        });
        console.log(`Lighthouse ${modo}: ${lighthouse.at(-1).nota}/100; reprovadas: ${lighthouse.at(-1).falhas.map((f) => f.id).join(", ") || "nenhuma"}`);
      } catch (e) {
        lighthouse.push({ modo, erro: e.message.split("\n")[0] });
        console.log(`Lighthouse ${modo}: erro ${e.message.split("\n")[0]}`);
      }
      chrome.kill();
      await espera(1000);
      fs.rmSync(perfilLh, { recursive: true, force: true, maxRetries: 5, retryDelay: 500 });
    }
  }


  // ------------------------------------------------------------ relatório CI-M22
  const regras = [...new Set(axe.map((v) => v.regra))];
  const l22 = [
    `# CI-M22 · axe-core ${AXE_VERSAO} e Lighthouse · ${DATA}`,
    `URL: ${URL_APP}`,
    `Navegador: Chrome ${versao} (headless), janela 1366 × 768, ${process.platform}`,
    `Regras do axe usadas: tags ${TAGS.join(", ")}, mais as experimentais ${EXTRAS.join(", ")}`,
    "",
    "## axe-core: violações por modo e estado",
    "",
    "| Modo | Estado | Regra | Critério WCAG | Nível | Impacto | Elementos | Descrição | Exemplos |",
    "| --- | --- | --- | --- | --- | --- | :-: | --- | --- |",
    ...axe.map(
      (v) =>
        `| ${v.modo} | ${v.estado} | \`${v.regra}\` | ${v.criterios} | ${v.nivel} | ${v.impacto} | ${v.nos} | ${v.descricao} | ${v.exemplos.map((x) => `\`${x}\``).join("<br>").replace(/\|/g, "/")} |`,
    ),
    "",
    "## axe-core: resumo",
    "",
    "| Modo | Estado | Regras violadas | Elementos afetados |",
    "| --- | --- | :-: | :-: |",
    ...MODOS.flatMap((m) =>
      ESTADOS.map((e) => {
        const vs = axe.filter((v) => v.modo === m && v.estado === e);
        return `| ${m} | ${e} | ${vs.length} | ${vs.reduce((s, v) => s + v.nos, 0)} |`;
      }),
    ),
    "",
    `Regras distintas violadas (todos os modos e estados): ${regras.length}${regras.length ? " — " + regras.join(", ") : ""}`,
    "",
    "## axe-core: todos os elementos reprovados, por regra (sem repetir entre modos e estados)",
    "",
    "| Regra | Elemento | HTML | Modos e estados |",
    "| --- | --- | --- | --- |",
    ...(() => {
      const m = new Map();
      for (const v of axe)
        for (const e of v.elementos) {
          const k = `${v.regra}|${e.alvo}`;
          if (!m.has(k)) m.set(k, { regra: v.regra, ...e, onde: [] });
          m.get(k).onde.push(`${v.modo}/${v.estado}`);
        }
      const esc = (x) => x.replace(/\|/g, "/").replace(/\s+/g, " ");
      return [...m.values()].map((e) => `| \`${e.regra}\` | \`${esc(e.alvo)}\` | \`${esc(e.html)}\` | ${e.onde.join(", ")} |`);
    })(),
    "",
    "## Lighthouse (categoria acessibilidade, tela inicial, preset desktop)",
    "",
    ...(COM_LIGHTHOUSE
      ? lighthouse.flatMap((l) =>
          l.erro
            ? [`- ${l.modo}: erro (${l.erro})`]
            : [
                `- ${l.modo}: nota ${l.nota}/100 (Lighthouse ${l.versao}, janela ${l.janela}); auditorias reprovadas: ${l.falhas.length}`,
                ...l.falhas.map((f) => `    - \`${f.id}\` (${f.titulo}): ${f.nos} elemento(s); ex.: \`${f.exemplo.replace(/\|/g, "/")}\``),
              ],
        )
      : ["- não executado"]),
    "",
    "## axe-core: contraste não decidido (incomplete) por estado",
    "",
    "| Modo | Estado | Elementos | Motivos informados pelo axe |",
    "| --- | --- | :-: | --- |",
    ...incompletos.map((i) => `| ${i.modo} | ${i.estado} | ${i.nos} | ${i.motivos.join("; ").replace(/\|/g, "/") || "—"} |`),
    "",
    (() => {
      const todas = new Set([...regras, ...lighthouse.flatMap((l) => (l.falhas || []).map((f) => f.id))]);
      return `Violações distintas somando axe-core e Lighthouse: ${todas.size} — ${[...todas].join(", ")}`;
    })(),
  ];
  fs.writeFileSync(path.join(SAIDA, `CI-M22_resultado_${DATA}.md`), l22.join("\n") + "\n");

  // ------------------------------------------------------------ relatório CI-M25
  // combinação = par (cor do texto, cor do fundo) num modo
  const combos = new Map();
  for (const t of textos) {
    const k = `${t.modo}|${t.cor}|${t.fundo}`;
    if (!combos.has(k)) combos.set(k, { modo: t.modo, cor: t.cor, fundo: t.fundo, exemplos: new Set(), estados: new Set(), grande: true, imagem: false });
    const c = combos.get(k);
    c.exemplos.add(`"${t.texto}" (${t.onde})`);
    c.estados.add(t.estado);
    c.grande = c.grande && t.grande;
    c.imagem = c.imagem || t.fundoComImagem;
  }
  const lista = [...combos.values()].map((c) => ({ ...c, razao: razao(c.cor, c.fundo) }));
  lista.sort((a, b) => (a.modo === b.modo ? a.razao - b.razao : a.modo.localeCompare(b.modo)));
  const l25 = [
    `# CI-M25 · contraste do texto da interface · ${DATA}`,
    `URL: ${URL_APP}`,
    `Navegador: Chrome ${versao} (headless), janela 1366 × 768`,
    `Estados: ${ESTADOS.join(", ")}; modos: ${MODOS.join(", ")}`,
    "Combinação = par (cor do texto, cor efetiva do fundo) num modo. Limite da métrica: 4,5:1.",
    "",
    "| Modo | Texto | Fundo | Razão | ≥ 4,5:1 | Só texto grande | Fundo com imagem | Estados | Exemplos |",
    "| --- | --- | --- | :-: | :-: | :-: | :-: | --- | --- |",
    ...lista.map(
      (c) =>
        `| ${c.modo} | \`${c.cor}\` | \`${c.fundo}\` | ${c.razao.toFixed(2)} | ${c.razao >= 4.5 ? "Sim" : "**Não**"} | ${c.grande ? "sim" : "não"} | ${c.imagem ? "sim" : "não"} | ${[...c.estados].join(", ")} | ${[...c.exemplos].slice(0, 4).join("; ").replace(/\|/g, "/")} |`,
    ),
    "",
    ...MODOS.map((m) => {
      const cs = lista.filter((c) => c.modo === m);
      const ok = cs.filter((c) => c.razao >= 4.5).length;
      return `${m}: ${ok} de ${cs.length} combinações com contraste ≥ 4,5:1 (${((100 * ok) / cs.length).toFixed(1)}%)`;
    }),
    (() => {
      const ok = lista.filter((c) => c.razao >= 4.5).length;
      return `Total: ${ok} de ${lista.length} combinações (${((100 * ok) / lista.length).toFixed(1)}%)`;
    })(),
  ];
  fs.writeFileSync(path.join(SAIDA, `CI-M25_resultado_${DATA}.md`), l25.join("\n") + "\n");
  fs.writeFileSync(path.join(SAIDA, `CI-M25_textos_${DATA}.json`), JSON.stringify(textos, null, 2) + "\n");

  console.log(`\nCI-M22: ${regras.length} regra(s) distinta(s) violada(s): ${regras.join(", ") || "nenhuma"}`);
  console.log(l25.slice(-3).join("\n"));
  fs.rmSync(perfil, { recursive: true, force: true });
})();
