// F-M4 · Cobertura funcional em dispositivos móveis.
//
// Roda a mesma lista de funções em dois modos:
//   --modo desktop   Chrome 1366 × 768, só mouse (o controle: define quais
//                    funções são operáveis com mouse, o denominador).
//   --modo celular   Chrome emulando um Pixel 7 (412 × 839, tela de toque,
//                    user agent de Android), só toque: toque, arraste, toque
//                    duplo, toque longo e pinça, enviados como eventos de
//                    toque pelo protocolo do DevTools.
//   --modo tablet    o mesmo, emulando um iPad (gen 7) em retrato (810 × 1080).
//
// Em nenhum modo o script usa atalho de teclado para operar uma função. O
// teclado só digita texto (no celular, faz o papel do teclado virtual) e,
// entre uma função e outra, aperta Esc para limpar o estado; essa limpeza não
// conta para o resultado.
//
// Uso (na raiz do repositório, com o build servido em http://localhost:5000):
//   node scripts/fm4_toque.cjs --modo desktop --saida evidencias/flexibilidade/F-M4
//   node scripts/fm4_toque.cjs --modo celular --saida evidencias/flexibilidade/F-M4
//   node scripts/fm4_toque.cjs --modo tablet  --saida evidencias/flexibilidade/F-M4
//
// Requer o Playwright de aplicacao/node_modules e o Google Chrome instalado.

const path = require("path");
const fs = require("fs");

const RAIZ = path.resolve(__dirname, "..");
const { chromium, devices } = require(path.join(RAIZ, "aplicacao/node_modules/playwright"));

const args = Object.fromEntries(
  process.argv.slice(2).reduce((acc, a, i, arr) => {
    if (a.startsWith("--")) acc.push([a.slice(2), arr[i + 1]]);
    return acc;
  }, []),
);
const URL_APP = args.url || "http://localhost:5000/";
const MODO = args.modo || "celular";
const SAIDA = path.resolve(args.saida || "fm4-saida");
const DATA = new Date().toISOString().slice(0, 10);
const PRINTS = path.join(SAIDA, `prints-${MODO}`);
fs.mkdirSync(PRINTS, { recursive: true });

const TOQUE = MODO !== "desktop";
const espera = (ms) => new Promise((r) => setTimeout(r, ms));

const AMBIENTES = {
  desktop: { viewport: { width: 1366, height: 768 } },
  celular: devices["Pixel 7"],
  tablet: devices["iPad (gen 7)"],
};
if (!AMBIENTES[MODO]) throw new Error(`modo desconhecido: ${MODO}`);

// Funções testadas, com o gesto usado em cada modo.
const FUNCOES = [
  ["M01", "Desenhar formas (retângulo, losango, elipse)", "arrastar", "arrastar"],
  ["M02", "Seta ligada a duas formas", "arrastar", "arrastar"],
  ["M03", "Texto dentro de uma forma", "clique duplo + digitar", "toque duplo + teclado virtual"],
  ["M04", "Desenho livre", "arrastar", "arrastar"],
  ["M05", "Mudar cor do traço e do fundo", "clique no painel", "toque no seletor de cor"],
  ["M06", "Selecionar e mover um elemento", "clicar e arrastar", "tocar e arrastar"],
  ["M07", "Redimensionar pela alça", "arrastar a alça", "arrastar a alça"],
  ["M08", "Selecionar vários com caixa de seleção", "arrastar em área vazia", "arrastar em área vazia"],
  ["M09", "Agrupar a seleção", "botão do painel", "botão do painel (Ações)"],
  ["M10", "Desfazer e refazer", "botões", "botões"],
  ["M11", "Duplicar e excluir", "botões do painel", "botões do painel"],
  ["M12", "Menu de contexto (copiar e colar estilo)", "botão direito", "toque longo"],
  ["M13", "Apagar com a borracha", "arrastar", "arrastar"],
  ["M14", "Zoom", "botões de zoom", "pinça com dois dedos"],
  ["M15", "Mover a tela (ferramenta mão)", "arrastar", "arrastar"],
  ["M16", "Salvar em arquivo .excalidraw", "menu principal", "menu principal"],
  ["M17", "Abrir arquivo .excalidraw", "menu principal", "menu principal"],
  ["M18", "Exportar imagem PNG", "menu principal", "menu principal"],
  ["M19", "Inserir imagem do aparelho", "ferramenta de imagem", "ferramenta de imagem"],
  ["M20", "Adicionar à biblioteca e reutilizar", "menu de contexto + painel", "toque longo + painel"],
  ["M21", "Alternar tema escuro", "menu principal", "menu principal"],
  ["M22", "Trocar o idioma", "menu principal", "menu principal"],
  ["M23", "Converter Mermaid em diagrama", "menu de ferramentas", "menu de ferramentas"],
  ["M24", "Trocar a fonte do texto", "painel de texto", "painel de texto"],
  ["M25", "Manter a ferramenta ativa (trava)", "botão da barra ou menu", "botão da barra ou menu"],
];

// Posições (em pixels da tela) usadas para desenhar a cena em cada modo. As
// funções seguintes acham os elementos pela cena salva, não por estas posições.
const LAYOUTS = {
  desktop: {
    ret: [250, 230, 420, 330],
    los: [560, 440, 720, 560],
    eli: [850, 230, 1020, 330],
    seta: [400, 300, 880, 300],
    livre: [150, 610, 350],
    vazio: [700, 700],
    caixa: [200, 180, 1100, 600],
    novo: [1150, 450, 1250, 520],
  },
  celular: {
    ret: [30, 130, 170, 210],
    los: [230, 110, 380, 240],
    eli: [100, 380, 290, 470],
    seta: [150, 195, 200, 400],
    livre: [40, 580, 220],
    vazio: [370, 660],
    caixa: [12, 95, 400, 500],
    novo: [260, 520, 360, 560],
  },
  tablet: {
    ret: [80, 200, 300, 320],
    los: [450, 180, 700, 380],
    eli: [200, 560, 500, 700],
    seta: [270, 300, 330, 580],
    livre: [80, 820, 380],
    vazio: [700, 860],
    caixa: [40, 140, 780, 760],
    novo: [560, 760, 700, 820],
  },
};
const L = LAYOUTS[MODO];

process.on("unhandledRejection", (e) => console.log("  [aviso]", String(e).split("\n")[0]));

(async () => {
  const browser = await chromium.launch({ channel: "chrome", headless: true });
  const ctx = await browser.newContext({
    ...AMBIENTES[MODO],
    locale: "en-US",
    acceptDownloads: true,
  });
  // Sem os seletores nativos de arquivo (que o Playwright não controla), o
  // Excalidraw usa o caminho alternativo do browser-fs-access: download e
  // <input type="file">. É o mesmo caminho dos navegadores de celular, que
  // não têm essas APIs.
  await ctx.addInitScript(() => {
    delete window.showSaveFilePicker;
    delete window.showOpenFilePicker;
    delete window.showDirectoryPicker;
    // conta o tipo de ponteiro de cada toque ou clique que chega à página,
    // para mostrar no relatório que o modo de toque não usou mouse
    window.__ponteiros = {};
    addEventListener(
      "pointerdown",
      (e) => (window.__ponteiros[e.pointerType] = (window.__ponteiros[e.pointerType] || 0) + 1),
      true,
    );
  });
  const page = await ctx.newPage();
  const cdp = await ctx.newCDPSession(page);
  const versao = (await browser.version()) + " (headless), " + process.platform;

  // ------------------------------------------------------------ gestos
  // Toque: eventos de toque do protocolo do DevTools (Input.dispatchTouchEvent),
  // que o Chrome converte em pointer events com pointerType "touch".
  const toqueSeq = async (quadros, pausa = 16) => {
    await cdp.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: quadros[0] });
    for (const q of quadros.slice(1)) {
      await espera(pausa);
      await cdp.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: q });
    }
    await espera(pausa);
    await cdp.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
  };
  const linha = (x1, y1, x2, y2, n) =>
    Array.from({ length: n + 1 }, (_, i) => [{ x: x1 + ((x2 - x1) * i) / n, y: y1 + ((y2 - y1) * i) / n }]);

  const g = {
    tocar: async (x, y) => (TOQUE ? page.touchscreen.tap(x, y) : page.mouse.click(x, y)),
    arrastar: async (x1, y1, x2, y2, n = 12) => {
      if (TOQUE) return toqueSeq(linha(x1, y1, x2, y2, n));
      await page.mouse.move(x1, y1);
      await page.mouse.down();
      await page.mouse.move(x2, y2, { steps: n });
      await page.mouse.up();
    },
    caminho: async (pts) => {
      if (TOQUE) return toqueSeq(pts.map((p) => [p]));
      await page.mouse.move(pts[0].x, pts[0].y);
      await page.mouse.down();
      for (const p of pts.slice(1)) await page.mouse.move(p.x, p.y);
      await page.mouse.up();
    },
    duplo: async (x, y) => {
      if (!TOQUE) return page.mouse.dblclick(x, y);
      await page.touchscreen.tap(x, y);
      await espera(80);
      await page.touchscreen.tap(x, y);
    },
    // menu de contexto: botão direito no desktop, toque longo (> 500 ms) no toque
    contexto: async (x, y) => {
      if (!TOQUE) return page.mouse.click(x, y, { button: "right" });
      await cdp.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x, y }] });
      await espera(900);
      await cdp.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
    },
    pinca: async (cx, cy, de, ate, n = 12) => {
      const q = [];
      for (let i = 0; i <= n; i++) {
        const d = de + ((ate - de) * i) / n;
        q.push([{ x: cx - d, y: cy, id: 0 }, { x: cx + d, y: cy, id: 1 }]);
      }
      await toqueSeq(q, 30);
    },
    botao: async (loc) => (TOQUE ? loc.tap() : loc.click()),
  };

  // ------------------------------------------------------------ cena
  const elementos = () =>
    page.evaluate(() =>
      JSON.parse(localStorage.getItem("excalidraw") || "[]").filter((e) => !e.isDeleted),
    );
  const estado = () =>
    page.evaluate(() => JSON.parse(localStorage.getItem("excalidraw-state") || "{}"));
  // ponto da tela numa fração (fx, fy) da caixa de um elemento
  const naTela = async (el, fx = 0.5, fy = 0.5) => {
    const st = await estado();
    const z = st.zoom?.value || 1;
    const { width: W, height: H } = page.viewportSize();
    const dentro = (v, max) => Math.min(Math.max(v, 4), max - 4);
    return {
      x: dentro((el.x + el.width * fx + st.scrollX) * z, W),
      y: dentro((el.y + el.height * fy + st.scrollY) * z, H),
    };
  };
  const doTipo = async (tipo) => (await elementos()).find((e) => e.type === tipo);
  const visivel = (sel) => page.locator(`${sel} >> visible=true`);

  // Escolhe uma ferramenta pela barra. No celular, losango, elipse e linha
  // ficam no menu do botão do retângulo ou da seta, e texto e imagem podem
  // ficar no menu "More tools", conforme a largura.
  // Tocar na seleção quando ela já está ativa troca para o laço (e vice-versa),
  // por isso a ferramenta só é tocada se ainda não estiver ativa.
  const PAI = { diamond: "rectangle", ellipse: "rectangle", line: "arrow" };
  const ativa = async () => {
    await espera(400); // o Excalidraw grava o estado com atraso
    return (await estado()).activeTool?.type;
  };
  const ferramenta = async (tipo) => {
    for (let i = 0; i < 2 && (await ativa()) !== tipo; i++) await tocarFerramenta(tipo);
  };
  const tocarFerramenta = async (tipo) => {
    const alvo = visivel(`[data-testid="toolbar-${tipo}"]`).last();
    if (await alvo.isVisible().catch(() => false)) {
      await g.botao(alvo);
    } else if (PAI[tipo]) {
      await g.botao(visivel(`[data-testid="toolbar-${PAI[tipo]}"]`).first());
      await espera(300);
      await g.botao(visivel(`[data-testid="toolbar-${tipo}"]`).last());
    } else {
      await g.botao(visivel('[data-testid="dropdown-menu-button"]').first());
      await espera(300);
      await g.botao(visivel(`[data-testid="toolbar-${tipo}"]`).last());
    }
    await espera(300);
  };

  // Botão de uma ação do painel de propriedades pelo título. Se não estiver à
  // vista, abre o grupo "Actions" (painel compacto do celular e do tablet).
  const acaoDoPainel = async (titulo) => {
    const re = new RegExp(`^${titulo}`);
    const b = page.locator("button[title], button[aria-label], label[title]").filter({ visible: true });
    const achar = async () => {
      for (const x of await b.all()) {
        const t = (await x.getAttribute("title")) || (await x.getAttribute("aria-label")) || "";
        if (re.test(t)) return x;
      }
      return null;
    };
    let alvo = await achar();
    if (!alvo) {
      const acoes = visivel('button[title="Actions"]').first();
      if (await acoes.isVisible().catch(() => false)) {
        await g.botao(acoes);
        await espera(400);
        alvo = await achar();
      }
    }
    if (!alvo) throw new Error(`botão "${titulo}" não encontrado`);
    await g.botao(alvo);
  };

  const menuPrincipal = async () => {
    await g.botao(page.locator('[data-testid="main-menu-trigger"]'));
    await espera(500);
  };
  const vazio = () => g.tocar(L.vazio[0], L.vazio[1]);
  const limpar = async () => {
    await page.keyboard.press("Escape");
    await page.keyboard.press("Escape");
    await espera(200);
  };
  const selecionar = async (el, fx = 0.5, fy = 0.5) => {
    await ferramenta("selection");
    const p = await naTela(el, fx, fy);
    await g.tocar(p.x, p.y);
    await espera(400);
  };
  const selecionados = async () => Object.keys((await estado()).selectedElementIds || {}).length;

  // ------------------------------------------------------------ execução
  const resultados = [];
  const testar = async (id, fn) => {
    const [, nome, gestoDesk, gestoToque] = FUNCOES.find((f) => f[0] === id);
    let ok = false;
    let detalhe = "";
    let gestoUsado = null;
    try {
      const r = await Promise.race([
        fn(),
        espera(45000).then(() => ({ ok: false, detalhe: "tempo esgotado (45 s)" })),
      ]);
      ok = r.ok;
      detalhe = r.detalhe;
      gestoUsado = r.gesto || null;
    } catch (e) {
      ok = false;
      detalhe = "erro: " + e.message.split("\n")[0];
    }
    const print = `${id}_${MODO}_${DATA}.png`;
    await page.screenshot({ path: path.join(PRINTS, print) }).catch(() => {});
    const gesto = gestoUsado || (TOQUE ? gestoToque : gestoDesk);
    resultados.push({ id, nome, gesto, ok, detalhe, print });
    console.log(`${id} ${ok ? "OK   " : "FALHA"} ${nome} [${gesto}] | ${detalhe}`);
    await limpar();
  };

  await page.goto(URL_APP, { waitUntil: "networkidle" });
  await page.locator("canvas.excalidraw__canvas.interactive").waitFor({ timeout: 15000 });
  await espera(1000);
  const layout = await page.evaluate(() => {
    // "excalidraw--mobile" marca o layout de celular (App.tsx:2390)
    const c = document.querySelector(".excalidraw")?.className || "";
    return c.split(/\s+/).filter((x) => x.startsWith("excalidraw--")).join(" ") || "(sem modificadores)";
  });
  const toqueNoNavegador = await page.evaluate(() => ({
    maxTouchPoints: navigator.maxTouchPoints,
    pointerCoarse: matchMedia("(pointer: coarse)").matches,
    hoverNone: matchMedia("(hover: none)").matches,
  }));

  // ---------------------------------------------------------------- M01
  await testar("M01", async () => {
    await ferramenta("rectangle");
    await g.arrastar(...L.ret);
    await ferramenta("diamond");
    await g.arrastar(...L.los);
    await ferramenta("ellipse");
    await g.arrastar(...L.eli);
    await espera(1200);
    const tipos = (await elementos()).map((e) => e.type);
    const ok = ["rectangle", "diamond", "ellipse"].every((t) => tipos.includes(t));
    return { ok, detalhe: `elementos na cena: ${tipos.join(", ") || "nenhum"}` };
  });

  // ---------------------------------------------------------------- M02
  await testar("M02", async () => {
    await ferramenta("arrow");
    await g.arrastar(...L.seta, 20);
    await espera(1200);
    const seta = await doTipo("arrow");
    const ok = !!(seta && seta.startBinding && seta.endBinding);
    return {
      ok,
      detalhe: seta
        ? `seta criada; ligada no início: ${!!seta.startBinding}, no fim: ${!!seta.endBinding}`
        : "nenhuma seta criada",
    };
  });

  // ---------------------------------------------------------------- M03
  await testar("M03", async () => {
    await ferramenta("selection");
    const ret = await doTipo("rectangle");
    // na borda esquerda: sem fundo, o interior do retângulo não conta como clique nele
    const p = await naTela(ret, 0, 0.3);
    await g.duplo(p.x, p.y);
    await espera(600);
    const editor = page.locator("textarea.excalidraw-wysiwyg");
    if (!(await editor.isVisible().catch(() => false))) {
      return { ok: false, detalhe: "o editor de texto não abriu" };
    }
    await page.keyboard.type("Login");
    await espera(300);
    await vazio(); // confirma o texto tocando fora
    await espera(1200);
    const txt = (await elementos()).find((e) => e.type === "text");
    const ok = !!(txt && txt.containerId === ret.id && txt.text === "Login");
    return {
      ok,
      detalhe: txt ? `texto "${txt.text}", dentro do retângulo: ${txt.containerId === ret.id}` : "nenhum texto criado",
    };
  });

  // ---------------------------------------------------------------- M04
  await testar("M04", async () => {
    await ferramenta("freedraw");
    const [x0, y0, x1] = L.livre;
    const pts = [];
    for (let i = 0; i <= 20; i++) pts.push({ x: x0 + ((x1 - x0) * i) / 20, y: y0 + Math.sin(i / 3) * 25 });
    await g.caminho(pts);
    await espera(1200);
    const fd = await doTipo("freedraw");
    return { ok: !!fd, detalhe: fd ? `traço com ${fd.points.length} pontos` : "nenhum traço criado" };
  });

  // ---------------------------------------------------------------- M05
  await testar("M05", async () => {
    const ret = await doTipo("rectangle");
    await selecionar(ret, 0, 0.5); // borda esquerda (o retângulo ainda não tem fundo)
    if ((await selecionados()) === 0) return { ok: false, detalhe: "não foi possível selecionar o retângulo" };
    // No desktop as cores ficam à vista no painel; no celular e no tablet
    // abrem num seletor a partir do botão da cor.
    const escolher = async (qual) => {
      const gatilho = visivel(`button[title="Show ${qual} color picker"]`).first();
      if (await gatilho.isVisible().catch(() => false)) {
        await g.botao(gatilho);
        await espera(400);
        const opcoes = visivel('.color-picker-content [data-testid^="color-top-pick-"], .color-picker-content [data-testid^="color-"]');
        await g.botao(opcoes.nth(2));
        await espera(300);
        await limpar();
        await selecionar(ret, 0, 0.5);
        return;
      }
      throw new Error(`seletor de cor de ${qual} não encontrado`);
    };
    if (TOQUE || (await visivel('button[title="Show stroke color picker"]').count())) {
      await escolher("stroke");
      await escolher("background");
    } else {
      const picks = visivel('[data-testid^="color-top-pick-"]');
      const n = await picks.count();
      await g.botao(picks.nth(1));
      await g.botao(picks.nth(Math.min(n - 1, 6)));
    }
    await espera(1200);
    const r = await doTipo("rectangle");
    const ok = r.strokeColor !== "#1e1e1e" && r.backgroundColor !== "transparent";
    return { ok, detalhe: `traço ${r.strokeColor}, fundo ${r.backgroundColor}` };
  });

  // ---------------------------------------------------------------- M06
  await testar("M06", async () => {
    const antes = await doTipo("rectangle");
    await ferramenta("selection");
    const p = await naTela(antes, 0.75, 0.75); // interior, já com fundo
    await g.arrastar(p.x, p.y, p.x + 30, p.y + 25);
    await espera(1200);
    const depois = (await elementos()).find((e) => e.id === antes.id);
    const dx = Math.round(depois.x - antes.x);
    const dy = Math.round(depois.y - antes.y);
    return { ok: dx !== 0 || dy !== 0, detalhe: `retângulo movido em (${dx}, ${dy})` };
  });

  // ---------------------------------------------------------------- M07
  await testar("M07", async () => {
    const antes = await doTipo("ellipse");
    await selecionar(antes, 1, 0.5); // borda direita (a ponta da seta fica na de cima)
    if ((await selecionados()) === 0) return { ok: false, detalhe: "não foi possível selecionar a elipse" };
    // alça do canto inferior direito, um pouco para fora da caixa
    const st = await estado();
    const z = st.zoom?.value || 1;
    const c = await naTela(antes, 1, 1);
    const off = TOQUE ? 10 : 6;
    await g.arrastar(c.x + off, c.y + off, c.x + off + 40, c.y + off + 30);
    await espera(1200);
    const depois = (await elementos()).find((e) => e.id === antes.id);
    const dw = Math.round(depois.width - antes.width);
    const dh = Math.round(depois.height - antes.height);
    return { ok: dw > 0 && dh > 0, detalhe: `elipse redimensionada: largura +${dw}, altura +${dh} (zoom ${z})` };
  });

  // ---------------------------------------------------------------- M08
  await testar("M08", async () => {
    await ferramenta("selection");
    await g.tocar(L.vazio[0], L.vazio[1]);
    await g.arrastar(...L.caixa, 15);
    await espera(1000);
    const n = await selecionados();
    return { ok: n >= 3, detalhe: `${n} elementos selecionados pela caixa` };
  });

  // ---------------------------------------------------------------- M09
  await testar("M09", async () => {
    // a limpeza entre as funções desfaz a seleção de M08: seleciona de novo
    await ferramenta("selection");
    await g.arrastar(...L.caixa, 15);
    await espera(1000);
    const n = await selecionados();
    await acaoDoPainel("Group selection");
    await espera(1200);
    const els = await elementos();
    const agrupados = els.filter((e) => e.groupIds.length > 0).length;
    // desfaz o grupo para não atrapalhar os passos seguintes
    await g.botao(visivel('[data-testid="button-undo"]').first());
    await espera(800);
    return { ok: agrupados >= 2, detalhe: `${n} selecionados; ${agrupados} elementos ficaram num grupo (desfeito depois)` };
  });

  // ---------------------------------------------------------------- M10
  await testar("M10", async () => {
    await ferramenta("rectangle");
    await g.arrastar(...L.novo);
    await espera(1000);
    const n1 = (await elementos()).length;
    await g.botao(visivel('[data-testid="button-undo"]').first());
    await espera(1000);
    const n2 = (await elementos()).length;
    await g.botao(visivel('[data-testid="button-redo"]').first());
    await espera(1000);
    const n3 = (await elementos()).length;
    const ok = n2 === n1 - 1 && n3 === n1;
    return { ok, detalhe: `elementos: ${n1} → desfazer ${n2} → refazer ${n3}` };
  });

  // ---------------------------------------------------------------- M11
  await testar("M11", async () => {
    // usa o retângulo novo de M10, ainda selecionado depois do refazer
    const els = await elementos();
    const novo = els.filter((e) => e.type === "rectangle").pop();
    await selecionar(novo, 0, 0.5);
    const n1 = (await elementos()).length;
    await acaoDoPainel("Duplicate");
    await espera(1000);
    const n2 = (await elementos()).length;
    // apaga a cópia (selecionada) e depois o original
    await acaoDoPainel("Delete");
    await espera(800);
    await selecionar(novo, 0, 0.5);
    await acaoDoPainel("Delete");
    await espera(1000);
    const n3 = (await elementos()).length;
    const ok = n2 === n1 + 1 && n3 === n1 - 1;
    return { ok, detalhe: `elementos ${n1} → duplicar ${n2} → excluir cópia e original ${n3}` };
  });

  // ---------------------------------------------------------------- M12
  await testar("M12", async () => {
    const ret = await doTipo("rectangle");
    const los = await doTipo("diamond");
    await selecionar(ret, 0.75, 0.75);
    let p = await naTela(ret, 0.75, 0.75);
    await g.contexto(p.x, p.y);
    await espera(600);
    const menu = page.locator(".context-menu");
    if (!(await menu.isVisible().catch(() => false))) return { ok: false, detalhe: "o menu de contexto não abriu" };
    await g.botao(menu.getByText("Copy styles", { exact: true }));
    await espera(500);
    await selecionar(los, 0.5, 0);
    p = await naTela(los, 0.5, 0.05);
    await g.contexto(p.x, p.y);
    await espera(600);
    if (!(await menu.isVisible().catch(() => false))) return { ok: false, detalhe: "o menu de contexto não abriu na segunda vez" };
    await g.botao(menu.getByText("Paste styles", { exact: true }));
    await espera(1200);
    const l2 = (await elementos()).find((e) => e.id === los.id);
    const ok = l2.backgroundColor === ret.backgroundColor && l2.strokeColor === ret.strokeColor;
    return { ok, detalhe: `losango ficou com traço ${l2.strokeColor} e fundo ${l2.backgroundColor} (retângulo: ${ret.strokeColor}, ${ret.backgroundColor})` };
  });

  // ---------------------------------------------------------------- M13
  await testar("M13", async () => {
    const fd = await doTipo("freedraw");
    if (!fd) return { ok: false, detalhe: "sem desenho livre de M04 para apagar" };
    const a = await naTela(fd, 0, 0.5);
    const b = await naTela(fd, 1, 0.5);
    await ferramenta("eraser");
    // passa a borracha várias vezes na altura do traço
    const pts = [];
    for (let i = 0; i <= 30; i++) pts.push({ x: a.x + ((b.x - a.x) * i) / 30, y: a.y + Math.sin(i) * 20 });
    await g.caminho(pts);
    await espera(1200);
    await ferramenta("selection");
    const sobrou = (await elementos()).find((e) => e.id === fd.id);
    return { ok: !sobrou, detalhe: sobrou ? "o traço continua na cena" : "traço apagado" };
  });

  // ---------------------------------------------------------------- M14
  await testar("M14", async () => {
    const z1 = (await estado()).zoom?.value || 1;
    if (TOQUE) {
      await ferramenta("selection");
      await g.pinca(L.vazio[0] - 150, L.vazio[1] - 100, 30, 110);
    } else {
      await g.botao(visivel('button[aria-label="Zoom in"]').first());
      await g.botao(visivel('button[aria-label="Zoom in"]').first());
    }
    await espera(1200);
    const z2 = (await estado()).zoom?.value || 1;
    // volta ao zoom de 100% para os próximos passos
    if (TOQUE) await g.pinca(L.vazio[0] - 150, L.vazio[1] - 100, 110, 30);
    else await g.botao(visivel('button[aria-label="Reset zoom"]').first());
    await espera(800);
    return { ok: z2 > z1 * 1.05, detalhe: `zoom ${Math.round(z1 * 100)}% → ${Math.round(z2 * 100)}%` };
  });

  // ---------------------------------------------------------------- M15
  await testar("M15", async () => {
    const s1 = await estado();
    await ferramenta("hand");
    await g.arrastar(L.vazio[0], L.vazio[1], L.vazio[0] - 80, L.vazio[1] - 60);
    await espera(1200);
    const s2 = await estado();
    await ferramenta("selection");
    const dx = Math.round(s2.scrollX - s1.scrollX);
    const dy = Math.round(s2.scrollY - s1.scrollY);
    return { ok: dx !== 0 || dy !== 0, detalhe: `tela deslocada em (${dx}, ${dy})` };
  });

  // ---------------------------------------------------------------- M16
  const arqCena = path.join(SAIDA, `F-M4_cena-${MODO}_${DATA}.excalidraw`);
  await testar("M16", async () => {
    await menuPrincipal();
    await g.botao(page.locator('[data-testid="json-export-button"]'));
    await espera(800);
    const dl = page.waitForEvent("download", { timeout: 15000 });
    await g.botao(visivel('[role="dialog"] button:has-text("Save to file")').first());
    const d = await dl;
    await d.saveAs(arqCena);
    const json = JSON.parse(fs.readFileSync(arqCena, "utf8"));
    const ativos = json.elements.filter((e) => !e.isDeleted).length;
    return {
      ok: ativos > 0 && ativos === (await elementos()).length,
      detalhe: `arquivo ${d.suggestedFilename()} com ${ativos} elementos da cena (e ${json.elements.length - ativos} apagados, que o Excalidraw também guarda)`,
    };
  });

  // ---------------------------------------------------------------- M17
  await testar("M17", async () => {
    if (!fs.existsSync(arqCena)) return { ok: false, detalhe: "sem arquivo de M16 para abrir" };
    const antes = (await elementos()).length;
    // apaga a cena pelo menu (Reset the canvas) para ver o arquivo voltar
    await menuPrincipal();
    await g.botao(page.locator('[data-testid="clear-canvas-button"]'));
    await espera(500);
    await g.botao(visivel('[role="dialog"] button:has-text("Confirm")').first());
    await espera(1000);
    const limpa = (await elementos()).length;
    const fc = page.waitForEvent("filechooser", { timeout: 10000 });
    fc.catch(() => {});
    await menuPrincipal();
    await g.botao(page.locator('[data-testid="load-button"]'));
    await (await fc).setFiles(arqCena);
    await espera(2000);
    const depois = (await elementos()).length;
    return { ok: limpa === 0 && depois === antes, detalhe: `${antes} elementos → cena limpa (${limpa}) → depois de abrir: ${depois}` };
  });

  // ---------------------------------------------------------------- M18
  let pngExportado = null;
  await testar("M18", async () => {
    await menuPrincipal();
    await g.botao(page.locator('[data-testid="image-export-button"]'));
    await espera(1000);
    const botao = visivel('button[aria-label="Export to PNG"], button:has-text("PNG")').first();
    await botao.waitFor({ timeout: 10000 });
    const dl = page.waitForEvent("download", { timeout: 20000 });
    await g.botao(botao);
    const d = await dl;
    pngExportado = path.join(SAIDA, `F-M4_exportado-${MODO}_${DATA}.png`);
    await d.saveAs(pngExportado);
    const tam = fs.statSync(pngExportado).size;
    return { ok: tam > 0, detalhe: `${d.suggestedFilename()}, ${tam} bytes` };
  });

  // ---------------------------------------------------------------- M19
  await testar("M19", async () => {
    if (!pngExportado) return { ok: false, detalhe: "sem PNG de M18 para inserir" };
    const fc = page.waitForEvent("filechooser", { timeout: 10000 });
    fc.catch(() => {});
    await ferramenta("image");
    await (await fc).setFiles(pngExportado);
    await espera(2000);
    // no desktop a imagem fica presa ao cursor até um clique; no toque, até um toque
    if (!(await doTipo("image"))) await g.tocar(L.vazio[0] - 100, L.vazio[1] - 150);
    await espera(1500);
    const img = await doTipo("image");
    if (img) {
      await acaoDoPainel("Delete").catch(() => {});
      await espera(800);
    }
    return { ok: !!img, detalhe: img ? `imagem inserida (status ${img.status})` : "nenhuma imagem inserida" };
  });

  // ---------------------------------------------------------------- M20
  await testar("M20", async () => {
    const ret = await doTipo("rectangle");
    await selecionar(ret, 0.75, 0.75);
    const p = await naTela(ret, 0.75, 0.75);
    await g.contexto(p.x, p.y);
    await espera(600);
    await g.botao(page.locator(".context-menu").getByText("Add to library", { exact: true }));
    await espera(1500);
    await limpar();
    const item = visivel(".library-unit.library-unit__active .library-unit__dragger").first();
    if (!(await item.isVisible().catch(() => false))) {
      await g.botao(visivel('button[title="Library"], .sidebar-trigger').first());
      await espera(800);
    }
    await item.waitFor({ timeout: 10000 });
    const n1 = (await elementos()).length;
    await g.botao(item);
    await espera(1500);
    const n2 = (await elementos()).length;
    // fecha o painel da biblioteca
    await limpar();
    const fechar = visivel('.sidebar__header button[aria-label="Close"], .sidebar__close-btn').first();
    if (await fechar.isVisible().catch(() => false)) await g.botao(fechar);
    return { ok: n2 > n1, detalhe: `item salvo na biblioteca; elementos ${n1} → ${n2} ao reutilizar` };
  });

  // ---------------------------------------------------------------- M21
  await testar("M21", async () => {
    await menuPrincipal();
    const escuro = visivel('input[aria-label^="Dark mode"]').first();
    await g.botao(escuro);
    await espera(1000);
    const n = await page.locator(".excalidraw.theme--dark").count();
    await limpar();
    await menuPrincipal();
    const claro = visivel('input[aria-label^="Light mode"]').first();
    await g.botao(claro);
    await espera(800);
    return { ok: n > 0, detalhe: `tema escuro aplicado: ${n > 0} (voltou ao claro depois)` };
  });

  // ---------------------------------------------------------------- M22
  await testar("M22", async () => {
    await menuPrincipal();
    // o seletor de idioma é um <select> nativo; no celular abre a lista do sistema
    const sel = page.locator("select.dropdown-select__language");
    await g.botao(sel);
    await sel.selectOption("pt-BR");
    await espera(4000);
    const lang = await page.evaluate(() => document.documentElement.lang);
    const titulo = await visivel('[data-testid="toolbar-rectangle"]').first().getAttribute("title");
    const ok = lang === "pt-BR" && /Retângulo/i.test(titulo || "");
    await limpar();
    await menuPrincipal();
    await page.locator("select.dropdown-select__language").selectOption("en");
    await espera(1500);
    return { ok, detalhe: `lang=${lang}; título do botão de retângulo: "${titulo}"` };
  });

  // ---------------------------------------------------------------- M23
  await testar("M23", async () => {
    await limpar();
    await g.botao(visivel('[data-testid="dropdown-menu-button"]').first());
    await espera(500);
    await g.botao(visivel("text=Mermaid to Excalidraw").first());
    await espera(6000);
    const erro = await page.locator('[data-testid="ttd-dialog-output-error"], [data-testid="ttd-dialog-output-load-error"]').count();
    const n1 = (await elementos()).length;
    const inserir = visivel('[role="dialog"] button:has-text("Insert")').last();
    if (!erro && (await inserir.isEnabled().catch(() => false))) await g.botao(inserir);
    await espera(1500);
    const n2 = (await elementos()).length;
    if (n2 > n1) await acaoDoPainel("Delete").catch(() => {});
    return { ok: !erro && n2 > n1, detalhe: erro ? "erro no diálogo do Mermaid" : `elementos ${n1} → ${n2} ao inserir` };
  });

  // ---------------------------------------------------------------- M24
  await testar("M24", async () => {
    await ferramenta("text");
    await g.tocar(L.vazio[0] - 120, L.vazio[1] - 40);
    await espera(500);
    await page.keyboard.type("Fonte");
    await espera(300);
    await vazio();
    await espera(1000);
    const txt = (await elementos()).filter((e) => e.type === "text" && e.text === "Fonte").pop();
    if (!txt) return { ok: false, detalhe: "não foi possível criar o texto" };
    await selecionar(txt);
    const antes = txt.fontFamily;
    let abrir = visivel('[data-testid="font-family-show-fonts"]').first();
    if (!(await abrir.isVisible().catch(() => false))) {
      // painel compacto: a fonte fica num botão próprio
      const b = visivel('button[title^="Font family"], button[title^="Font"]').first();
      if (await b.isVisible().catch(() => false)) await g.botao(b);
      await espera(400);
      abrir = visivel('[data-testid="font-family-show-fonts"]').first();
      if (await abrir.isVisible().catch(() => false)) await g.botao(abrir);
    } else {
      await g.botao(abrir);
    }
    await espera(500);
    await g.botao(visivel("text=Nunito").first());
    await espera(1500);
    const depois = (await elementos()).find((e) => e.id === txt.id);
    return { ok: depois.fontFamily !== antes, detalhe: `fontFamily ${antes} → ${depois.fontFamily}` };
  });

  // ---------------------------------------------------------------- M25
  // A F-M6 mostrou que o botão de trava some no celular (360 px). Aqui se
  // testa se a função continua alcançável por toque: usa o botão da barra se
  // ele estiver à vista; senão, o item "Tool lock" do menu de preferências.
  let caminhoTrava = "";
  const alternarTrava = async () => {
    const botao = visivel('[data-testid="toolbar-lock"]').first();
    if (await botao.isVisible().catch(() => false)) {
      caminhoTrava = "botão da barra";
      return g.botao(botao);
    }
    caminhoTrava = "menu principal > Preferences > Tool lock";
    await menuPrincipal();
    await g.botao(visivel("text=Preferences").first());
    await espera(400);
    await g.botao(visivel("text=Tool lock").first());
    await espera(300);
    await limpar();
  };
  await testar("M25", async () => {
    await alternarTrava();
    await espera(500);
    const travada = !!(await estado()).activeTool?.locked;
    const n1 = (await elementos()).filter((e) => e.type === "rectangle").length;
    await ferramenta("rectangle");
    const [x1, y1, x2, y2] = L.novo;
    await g.arrastar(x1, y1, x2, y2);
    await espera(600);
    // segundo retângulo sem escolher a ferramenta de novo
    await g.arrastar(x1, y2 + 30, x2, y2 + 30 + (y2 - y1));
    await espera(1200);
    const n2 = (await elementos()).filter((e) => e.type === "rectangle").length;
    const ainda = (await estado()).activeTool?.type;
    await alternarTrava(); // destrava
    return {
      ok: travada && n2 === n1 + 2,
      gesto: caminhoTrava,
      detalhe: `trava ligada por ${caminhoTrava}: ${travada}; retângulos ${n1} → ${n2} com uma só escolha de ferramenta; ferramenta ativa no fim: ${ainda}`,
    };
  });

  const ponteiros = await page.evaluate(() => window.__ponteiros).catch(() => ({}));
  await browser.close();

  // ------------------------------------------------------------ relatório
  const ok = resultados.filter((r) => r.ok).length;
  const amb = AMBIENTES[MODO];
  const linhas = [
    `# F-M4 · modo ${MODO} · ${DATA}`,
    `URL: ${URL_APP}`,
    `Navegador: Chrome ${versao}`,
    `Janela: ${amb.viewport.width} × ${amb.viewport.height}; toque: ${TOQUE ? "sim" : "não"}; classes do Excalidraw: ${layout}`,
    `Detectado pela página: maxTouchPoints=${toqueNoNavegador.maxTouchPoints}, pointer:coarse=${toqueNoNavegador.pointerCoarse}, hover:none=${toqueNoNavegador.hoverNone}`,
    amb.userAgent ? `User agent: ${amb.userAgent}` : "User agent: padrão do Chrome",
    `Eventos pointerdown recebidos pela página, por tipo: ${Object.entries(ponteiros || {}).map(([k, v]) => `${k}=${v}`).join(", ") || "nenhum"}`,
    "",
    "| ID | Função | Gesto | Funcionou | Detalhe |",
    "| --- | --- | --- | :-: | --- |",
    ...resultados.map(
      (r) => `| ${r.id} | ${r.nome} | ${r.gesto} | ${r.ok ? "Sim" : "Não"} | ${r.detalhe.replace(/\|/g, "/")} |`,
    ),
    "",
    `Funcionaram: ${ok} de ${resultados.length} (${((100 * ok) / resultados.length).toFixed(1)}%)`,
  ];
  const rel = path.join(SAIDA, `F-M4_resultado-${MODO}_${DATA}.md`);
  fs.writeFileSync(rel, linhas.join("\n") + "\n");
  console.log(`\n${linhas.at(-1)}\nRelatório: ${path.relative(RAIZ, rel)}`);
})();
