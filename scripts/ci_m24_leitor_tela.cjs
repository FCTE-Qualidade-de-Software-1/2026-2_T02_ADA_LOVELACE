// CI-M24 · Elementos do desenho anunciados por leitor de tela (NVDA).
//
// Controla o NVDA real pelo Guidepup e registra tudo o que ele fala sobre o
// Excalidraw em dois cenários:
//   - "vazia": o app recém-aberto, sem nenhum elemento (controle);
//   - "cena":  o app com a cena de teste (9 elementos, um de cada tipo),
//              carregada soltando o arquivo .excalidraw sobre o canvas.
// Em cada cenário percorre os quatro caminhos fixados antes da medição:
//   P1. leitura contínua (NVDA+Seta para baixo, do topo da página);
//   P2. navegação sequencial: próximo item (Seta para baixo no modo de
//       navegação) do topo até o fim e, como o NVDA não passa do canvas
//       indo para a frente, item anterior de Ctrl+End até o topo;
//   P3. navegação por Tab: 5 Tabs no estado em que o app abre (o foco fica
//       preso no contêiner) e, depois de o script tirar o foco do contêiner
//       (blur), Tab até o foco sair da página, dar a volta ou prender de novo;
//   P4. seleção pelo teclado no canvas (cursor virtual no fim da página e
//       modo foco, com o foco no contêiner do editor; Ctrl+A, setas, Tab,
//       Shift+Tab, Esc; depois Ctrl+A e leitura contínua com a seleção ativa).
// Um elemento conta como anunciado num caminho se alguma fala do cenário
// "cena" contiver o identificador dele (tipo, rótulo ou texto) e não existir,
// igual, no cenário "vazia" no mesmo caminho. Assim, os nomes das ferramentas
// da barra ("Retângulo", "Elipse"...), que existem nos dois cenários, não
// contam. Falas do painel de propriedades que não identificam o elemento ficam
// na lista EXCLUSOES, com o motivo.
//
// A fala é ouvida por uma conexão própria ao NVDA Remote local (a mesma que o
// Guidepup usa, 127.0.0.1:6837, canal "guidepup"), para guardar cada frase com
// a hora, sem o corte de 1 s de silêncio da captura do Guidepup. O NVDA usa a
// voz OneCore com volume 0: a leitura contínua precisa de uma voz real (ela
// avança quando a voz termina cada trecho), mas o computador fica em silêncio.
//
// Segurança: o Guidepup manda as teclas para a janela ativa. Antes de cada
// caminho, e a cada poucas teclas, o script traz a janela do teste para a
// frente (título exclusivo "CI-M24 NVDA ...") e confere document.hasFocus();
// se o foco não estiver na página do teste, para tudo.
//
// Cada caminho roda num contexto novo do navegador, com a janela maximizada
// (o Excalidraw só põe no DOM o nome dos frames visíveis na tela).
//
// Uso (na raiz do repositório; não use o teclado nem o mouse durante a
// execução, alguns minutos):
//   (cd scripts && npm ci && npx @guidepup/setup@0.29.3 install nvda)
//   node scripts/ci_m24_leitor_tela.cjs --saida evidencias/capacidade-interacao/CI-M24
// Se http://localhost:5000/ não responder, o script sobe o build de produção
// com `npx vite preview --port 5000` (o build precisa existir em
// aplicacao/excalidraw-app/build).
//
// Requer: Playwright de aplicacao/node_modules, @guidepup/guidepup de
// scripts/node_modules, o NVDA portátil do Guidepup e o Microsoft Edge.

const path = require("path");
const fs = require("fs");
const os = require("os");
const tls = require("tls");
const http = require("http");
const { execFileSync, spawn } = require("child_process");

const RAIZ = path.resolve(__dirname, "..");
const NM = path.join(RAIZ, "aplicacao/node_modules");
const { chromium } = require(path.join(NM, "playwright"));
const PLAYWRIGHT_VERSAO = require(path.join(NM, "playwright/package.json")).version;
const GP = path.join(__dirname, "node_modules/@guidepup/guidepup");
const { nvda } = require(GP);
const GUIDEPUP_VERSAO = require(path.join(GP, "package.json")).version;
const { getGuidepupNVDAInstallationPath } = require(
  path.join(GP, "lib/windows/NVDA/getGuidepupNVDAInstallationPath"),
);

const args = process.argv.slice(2);
const opc = (n, d) => (args.includes(`--${n}`) ? args[args.indexOf(`--${n}`) + 1] : d);
const URL_APP = opc("url", "http://localhost:5000/");
const SAIDA = path.resolve(opc("saida", "evidencias/capacidade-interacao/CI-M24"));
const DATA = opc("data", new Date().toISOString().slice(0, 10));
const CENA = path.resolve(opc("cena", path.join(SAIDA, "CI-M24_cena-teste_2026-11-14.excalidraw")));
// depuração: --so-cenario vazia|cena e --so-caminho P1..P4 rodam só uma parte e
// não gravam evidência
const SO_CENARIO = opc("so-cenario", null);
const SO_CAMINHO = opc("so-caminho", null);
const NOME = (desc, ext) => path.join(SAIDA, `CI-M24_${desc}_${DATA}.${ext}`);
fs.mkdirSync(SAIDA, { recursive: true });

const espera = (ms) => new Promise((r) => setTimeout(r, ms));
const registro = { vazia: {}, cena: {} };
const saida = [];
const log = (...partes) => {
  const linha = partes.join(" ");
  saida.push(linha);
  console.log(linha);
};

// ------------------------------------------------------------ elementos
// Denominador fixado antes da medição: os 9 elementos da cena. O padrão
// (texto sem acentos e em minúsculas) é o que identifica o elemento na fala:
// o tipo em pt-BR e em inglês (os nomes de packages/excalidraw/locales/pt-BR.json,
// chaves "element" e "toolBar") ou o texto/nome do próprio elemento.
const ELEMENTOS = [
  { id: "ci-m24-retangulo", nome: "Retângulo", padrao: /\bretangulo\b|\brectangle\b/ },
  { id: "ci-m24-elipse", nome: "Elipse", padrao: /\belipse\b|\bellipse\b/ },
  { id: "ci-m24-losango", nome: "Losango", padrao: /\blosango\b|\bdiamante\b|\bdiamond\b/ },
  { id: "ci-m24-seta", nome: "Seta", padrao: /\bseta\b|\bflecha\b|\barrow\b/ },
  { id: "ci-m24-linha", nome: "Linha", padrao: /\blinha\b|\bline\b/ },
  { id: "ci-m24-texto", nome: "Texto (\"Texto de teste\")", padrao: /texto de teste|\btexto\b|\btext\b/ },
  {
    id: "ci-m24-desenho-livre",
    nome: "Desenho livre",
    padrao: /\bdesenho livre\b|\bdesenhar\b|\bfreedraw\b|\bfree ?draw\b/,
  },
  { id: "ci-m24-imagem", nome: "Imagem", padrao: /\bimagem\b|\bimage\b/ },
  {
    id: "ci-m24-frame",
    nome: "Frame (\"Quadro de teste\")",
    padrao: /quadro de teste|\bmoldura\b|\bquadro\b|\bframe\b/,
  },
];
// Falas que contêm um identificador, mas não contam pelos critérios fixados
// antes da medição. Foram listadas depois de ler o registro, aplicando a regra
// combinada: fala do painel de propriedades que não diz qual é o elemento não
// conta.
const EXCLUSOES = [
  {
    padrao: /tipo de seta/,
    motivo: "botão \"Tipo de seta\" do painel de propriedades (aparece com a seleção; não identifica o elemento)",
  },
  {
    padrao: /alinhamento do texto/,
    motivo: "grupo \"Alinhamento do texto\" do painel de propriedades (aparece com a seleção; não identifica o elemento)",
  },
];
const excluida = (f) => EXCLUSOES.find((e) => e.padrao.test(normal(f)));

const CAMINHOS = {
  P1: "leitura contínua",
  P2: "navegação sequencial (próximo e anterior item)",
  P3: "navegação por Tab",
  P4: "seleção pelo teclado no canvas",
};
const normal = (s) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

// ------------------------------------------------------------ ouvinte NVDA
// Segunda conexão ao NVDA Remote local, só para ouvir. As mensagens chegam
// como JSON, uma por linha; um mesmo pacote pode trazer várias.
class Ouvinte {
  falas = [];
  ultima = Date.now();
  #socket = null;
  #resto = "";
  async conectar() {
    const exe = getGuidepupNVDAInstallationPath();
    const ca = fs.readFileSync(
      path.join(path.dirname(exe), "userConfig/remoteAccess/localRelay/NvdaRemoteRelay.pem"),
    );
    await new Promise((ok, falha) => {
      const s = tls.connect(6837, "127.0.0.1", { ca: [ca], checkServerIdentity: () => null }, () => {
        s.write(`${JSON.stringify({ type: "join", connection_type: "master", channel: "guidepup" })}\n`);
        s.write(`${JSON.stringify({ type: "protocol_version", version: 2 })}\n`);
      });
      s.setEncoding("utf8");
      s.on("error", falha);
      s.on("data", (dados) => {
        this.#resto += dados;
        const linhas = this.#resto.split("\n");
        this.#resto = linhas.pop();
        for (const linha of linhas) {
          if (!linha.trim()) continue;
          let m;
          try {
            m = JSON.parse(linha);
          } catch {
            continue;
          }
          if (m.type === "channel_joined") ok();
          if (m.type !== "speak") continue;
          const texto = (m.sequence || [])
            .filter((p) => typeof p === "string")
            .map((p) => p.trim().replace(/\s\s+/g, " "))
            .filter(Boolean)
            .join(", ");
          this.ultima = Date.now();
          if (texto) this.falas.push({ t: this.ultima, texto });
        }
      });
      this.#socket = s;
    });
  }
  marca() {
    return this.falas.length;
  }
  desde(i) {
    return this.falas.slice(i);
  }
  // espera até passar `quieto` ms sem fala (no mínimo `quieto` ms depois da
  // chamada) ou até `max` ms
  async silencio(quieto = 700, max = 8000) {
    const inicio = Date.now();
    this.ultima = Math.max(this.ultima, inicio);
    while (Date.now() - inicio < max) {
      await espera(100);
      if (Date.now() - this.ultima >= quieto) return;
    }
  }
  fechar() {
    this.#socket?.destroy();
  }
}

// ------------------------------------------------------------ janela e foco
function trazerParaFrente(titulo) {
  const ps = `$w = New-Object -ComObject WScript.Shell; $null = $w.AppActivate('${titulo}');
Add-Type -Name U -Namespace W -MemberDefinition '[DllImport("user32.dll")] public static extern bool SetForegroundWindow(IntPtr h); [DllImport("user32.dll")] public static extern bool ShowWindow(IntPtr h, int c);';
$p = Get-Process msedge -ErrorAction SilentlyContinue | Where-Object { $_.MainWindowTitle -like '${titulo}*' } | Select-Object -First 1;
if ($p) { [W.U]::ShowWindow($p.MainWindowHandle, 3) | Out-Null; [W.U]::SetForegroundWindow($p.MainWindowHandle) | Out-Null; $p.MainWindowTitle }`;
  return execFileSync("powershell", ["-NoProfile", "-Command", ps], { encoding: "utf8" }).trim();
}

async function temFoco(page) {
  try {
    return await page.evaluate(() => document.hasFocus());
  } catch {
    return false;
  }
}

async function garantirFoco(page, titulo) {
  for (let i = 0; i < 4; i++) {
    if (await temFoco(page)) return;
    trazerParaFrente(titulo);
    await espera(800);
  }
  throw new Error(`a janela "${titulo}" não está com o foco; parando para não mandar teclas a outra janela`);
}

// ------------------------------------------------------------ app
function responde(url) {
  return new Promise((ok) => {
    http.get(url, (r) => ok(r.statusCode === 200)).on("error", () => ok(false));
  });
}

async function subirApp() {
  if (await responde(URL_APP)) return null;
  log(`${URL_APP} não responde; subindo o vite preview`);
  const proc = spawn("npx", ["vite", "preview", "--port", "5000", "--strictPort", "--host", "localhost"], {
    cwd: path.join(RAIZ, "aplicacao/excalidraw-app"),
    shell: true,
    stdio: "ignore",
  });
  for (let i = 0; i < 60; i++) {
    await espera(500);
    if (await responde(URL_APP)) return proc;
  }
  throw new Error("o vite preview não subiu");
}

async function carregarCena(page) {
  const conteudo = fs.readFileSync(CENA, "utf8");
  const total = JSON.parse(conteudo).elements.length;
  await page.evaluate(async (txt) => {
    const arquivo = new File([txt], "cena.excalidraw", { type: "application/vnd.excalidraw+json" });
    const dt = new DataTransfer();
    dt.items.add(arquivo);
    const alvo = document.querySelector(".excalidraw-container") || document.querySelector(".excalidraw");
    for (const tipo of ["dragenter", "dragover", "drop"]) {
      alvo.dispatchEvent(
        new DragEvent(tipo, { bubbles: true, cancelable: true, dataTransfer: dt, clientX: 700, clientY: 400 }),
      );
    }
  }, conteudo);
  // o app grava a cena no localStorage logo depois de carregar
  await page.waitForFunction(
    (n) => {
      try {
        const els = JSON.parse(localStorage.getItem("excalidraw") || "[]").filter((e) => !e.isDeleted);
        return els.length === n;
      } catch {
        return false;
      }
    },
    total,
    { timeout: 20000 },
  );
  return total;
}

async function tiposNaCena(page) {
  return page.evaluate(() =>
    JSON.parse(localStorage.getItem("excalidraw") || "[]")
      .filter((e) => !e.isDeleted)
      .map((e) => `${e.id}:${e.type}`),
  );
}

async function abrir(browser, cenario, caminho) {
  const titulo = `CI-M24 NVDA ${cenario} ${caminho}`;
  const context = await browser.newContext({ viewport: null, locale: "pt-BR" });
  const page = await context.newPage();
  const preparar = async () => {
    await page.waitForSelector("canvas.interactive", { timeout: 30000 });
    await page.evaluate((t) => {
      document.title = t;
    }, titulo);
    await espera(1500);
  };
  await page.goto(URL_APP);
  await preparar();
  let total = 0;
  if (cenario === "cena") {
    total = await carregarCena(page);
    await espera(1500);
  }
  return {
    page,
    context,
    titulo,
    total,
    // recarrega para cada caminho começar do mesmo estado (topo da página,
    // modo de navegação, nada selecionado); a cena fica no localStorage e a
    // imagem no IndexedDB do contexto
    recarregar: async () => {
      await page.reload();
      await preparar();
    },
  };
}

// ------------------------------------------------------------ árvore de acessibilidade
async function arvoreAcessibilidade(page) {
  const cdp = await page.context().newCDPSession(page);
  await cdp.send("Accessibility.enable");
  const { nodes } = await cdp.send("Accessibility.getFullAXTree");
  const nos = nodes
    .filter((n) => !n.ignored)
    .map((n) => ({
      role: n.role?.value ?? "",
      name: n.name?.value ?? "",
      ...(n.description?.value ? { description: n.description.value } : {}),
    }));
  const { root } = await cdp.send("DOM.getDocument", { depth: -1 });
  const { nodeIds } = await cdp.send("DOM.querySelectorAll", { nodeId: root.nodeId, selector: "canvas" });
  const canvas = [];
  for (const nodeId of nodeIds) {
    const { node } = await cdp.send("DOM.describeNode", { nodeId });
    const attrs = {};
    for (let i = 0; i < (node.attributes || []).length; i += 2) {
      if (node.attributes[i] !== "style") attrs[node.attributes[i]] = node.attributes[i + 1];
    }
    const ax = (await cdp.send("Accessibility.getPartialAXTree", { nodeId, fetchRelatives: false })).nodes[0];
    canvas.push({
      atributos: attrs,
      filhos: node.childNodeCount ?? 0,
      ax: {
        role: ax?.role?.value ?? null,
        name: ax?.name?.value ?? "",
        ignored: ax?.ignored ?? null,
        ignoredReasons: (ax?.ignoredReasons || []).map((r) => r.name),
      },
    });
  }
  await cdp.detach();
  const aria = await page.locator("body").ariaSnapshot();
  const porElemento = ELEMENTOS.map((e) => ({
    elemento: e.nome,
    nos: nos.filter((n) => e.padrao.test(normal(`${n.name} ${n.description ?? ""}`))).map((n) => `${n.role}: ${n.name}`),
  }));
  return { total: nodes.length, naoIgnorados: nos.length, nos, canvas, porElemento, aria };
}

// ------------------------------------------------------------ caminhos
// Cada caminho devolve uma lista de passos: { passo, falas: [texto] }.
async function passo(ouvinte, nome, acao, quieto = 700, max = 8000) {
  const i = ouvinte.marca();
  await acao();
  await ouvinte.silencio(quieto, max);
  return { passo: nome, falas: ouvinte.desde(i).map((f) => f.texto) };
}

async function P1(j, ouvinte) {
  await j.recarregar();
  await garantirFoco(j.page, j.titulo);
  await nvda.press("Control+Home");
  await ouvinte.silencio(1000);
  await garantirFoco(j.page, j.titulo);
  const r = await passo(ouvinte, "NVDA+Seta para baixo (ler tudo)", () => nvda.perform(nvda.keyboardCommands.sayAll), 5000, 240000);
  await nvda.perform(nvda.keyboardCommands.stopSpeech);
  return [r];
}

// Anda item a item numa direção até o fim: 4 passos sem fala ou 5 falas
// iguais seguidas (o NVDA repete a mesma linha quando não consegue avançar).
async function andar(j, ouvinte, rotulo, acao, max) {
  const passos = [];
  let semFala = 0;
  let iguais = 0;
  let anterior = null;
  for (let i = 1; i <= max && semFala < 4 && iguais < 5; i++) {
    if (i % 10 === 0) await garantirFoco(j.page, j.titulo);
    const r = await passo(ouvinte, `${rotulo} ${i}`, acao, 600, 5000);
    passos.push(r);
    const atual = r.falas.join(" | ");
    semFala = r.falas.length ? 0 : semFala + 1;
    iguais = r.falas.length && atual === anterior ? iguais + 1 : 0;
    anterior = atual;
  }
  return passos;
}

async function P2(j, ouvinte) {
  await j.recarregar();
  await garantirFoco(j.page, j.titulo);
  // para trás, do fim (indo para a frente o NVDA não passa do canvas; e,
  // depois de o cursor entrar no canvas, o Ctrl+End para nele), logo depois
  // de recarregar
  const estado = await j.page.evaluate(() => ({
    janela: `${innerWidth}x${innerHeight}`,
    nomesDeFrameNoDOM: [...document.querySelectorAll(".frame-name")].map((e) => e.textContent),
  }));
  const passos = [{ passo: "estado da página (DOM)", falas: [], estado }];
  passos.push(await passo(ouvinte, "Ctrl+End (fim)", () => nvda.press("Control+End"), 800));
  passos.push(...(await andar(j, ouvinte, "item anterior", () => nvda.previous(), 200)));
  // para a frente, do topo
  await garantirFoco(j.page, j.titulo);
  passos.push(await passo(ouvinte, "Ctrl+Home (topo)", () => nvda.press("Control+Home"), 800));
  passos.push(...(await andar(j, ouvinte, "próximo item", () => nvda.next(), 200)));
  return passos;
}

const descreverFoco = (page) =>
  page
    .evaluate(() => {
      const a = document.activeElement;
      if (!a || a === document.body) return "body";
      const rotulo = a.getAttribute("aria-label") || a.getAttribute("title") || a.textContent.trim().slice(0, 40);
      return `${a.tagName.toLowerCase()}${a.className ? `.${String(a.className).split(" ")[0]}` : ""} "${rotulo}"`;
    })
    .catch(() => "?");

async function P3(j, ouvinte) {
  await j.recarregar();
  await garantirFoco(j.page, j.titulo);
  const passos = [];
  // parte A: Tab a partir do estado em que o app abre (foco no contêiner
  // div.excalidraw, por causa do autoFocus)
  for (let i = 1; i <= 5; i++) {
    const r = await passo(ouvinte, `Tab ${i} (estado inicial)`, () => nvda.press("Tab"), 700, 5000);
    r.foco = await descreverFoco(j.page);
    passos.push(r);
  }
  // parte B: o Tab fica preso no contêiner (App.tsx:5192 chama
  // preventDefault); o script tira o foco dele (blur, como um clique fora) e
  // percorre a página até o foco sair dela, dar a volta ou prender de novo
  await j.page.evaluate(() => document.activeElement?.blur());
  passos.push({ passo: "blur() no contêiner (feito pelo script)", falas: [], foco: await descreverFoco(j.page) });
  const vistos = [];
  let repetido = 0;
  for (let i = 1; i <= 200; i++) {
    // o fim do caminho é o foco sair da página (barra do navegador)
    if (!(await temFoco(j.page))) break;
    const r = await passo(ouvinte, `Tab ${i}`, () => nvda.press("Tab"), 700, 5000);
    r.foco = await descreverFoco(j.page);
    passos.push(r);
    repetido = r.foco === vistos.at(-1) ? repetido + 1 : 0;
    // para quando o foco volta ao primeiro controle (deu a volta) ou fica
    // parado no mesmo lugar por 3 Tabs (preso)
    if ((vistos.length > 2 && r.foco === vistos[0]) || repetido >= 2) break;
    vistos.push(r.foco);
  }
  return passos;
}

async function P4(j, ouvinte) {
  await j.recarregar();
  await garantirFoco(j.page, j.titulo);
  // as teclas só chegam ao canvas com o foco no contêiner do Excalidraw (é
  // onde o app põe o foco ao abrir)
  const noConteiner = await j.page.evaluate(() =>
    document.activeElement?.classList.contains("excalidraw-container"),
  );
  if (!noConteiner) throw new Error(`P4: o foco não está no contêiner do Excalidraw (${await descreverFoco(j.page)})`);
  const passos = [];
  // Ao entrar no modo foco, o NVDA põe o foco no item sob o cursor virtual, se
  // ele for focável. No topo da página esse item é o botão do menu; por isso
  // o cursor vai antes para o fim (o canvas ou o nome do frame, que não são
  // focáveis) e o foco continua no contêiner, que é onde o editor ouve as
  // teclas do canvas.
  passos.push(await passo(ouvinte, "Ctrl+End (cursor virtual no fim, sobre o canvas)", () => nvda.press("Control+End"), 1000));
  await garantirFoco(j.page, j.titulo);
  passos.push(
    await passo(ouvinte, "NVDA+Espaço (modo foco)", () =>
      nvda.perform(nvda.keyboardCommands.toggleBetweenBrowseAndFocusMode), 1200),
  );
  passos[passos.length - 1].foco = await descreverFoco(j.page);
  const aindaNoConteiner = await j.page.evaluate(() =>
    document.activeElement?.classList.contains("excalidraw-container"),
  );
  if (!aindaNoConteiner) throw new Error(`P4: o modo foco tirou o foco do contêiner (${await descreverFoco(j.page)})`);
  const teclas = [
    ["Ctrl+A (selecionar tudo)", () => nvda.press("Control+a")],
    ["Seta para a direita", () => nvda.press("ArrowRight")],
    ["Seta para baixo", () => nvda.press("ArrowDown")],
    ["Tab", () => nvda.press("Tab")],
    ["Shift+Tab", () => nvda.press("Shift+Tab")],
    ["Esc", () => nvda.press("Escape")],
    ["Ctrl+A (selecionar tudo)", () => nvda.press("Control+a")],
  ];
  const selecionados = () =>
    j.page.evaluate(() => {
      const st = JSON.parse(localStorage.getItem("excalidraw-state") || "{}");
      return Object.keys(st.selectedElementIds || {}).length;
    });
  for (const [nome, acao] of teclas) {
    await garantirFoco(j.page, j.titulo);
    const r = await passo(ouvinte, nome, acao, 1200, 8000);
    r.foco = await descreverFoco(j.page);
    if (nome.startsWith("Ctrl+A")) r.selecionados = await selecionados();
    passos.push(r);
  }
  // com a seleção ativa, volta ao modo de navegação e lê a página toda
  await garantirFoco(j.page, j.titulo);
  passos.push(
    await passo(ouvinte, "NVDA+Espaço (modo de navegação)", () =>
      nvda.perform(nvda.keyboardCommands.toggleBetweenBrowseAndFocusMode), 1200),
  );
  await garantirFoco(j.page, j.titulo);
  await nvda.press("Control+Home");
  await ouvinte.silencio(1000);
  await garantirFoco(j.page, j.titulo);
  passos.push(
    await passo(ouvinte, "NVDA+Seta para baixo (ler tudo, com a seleção ativa)", () =>
      nvda.perform(nvda.keyboardCommands.sayAll), 5000, 240000),
  );
  await nvda.perform(nvda.keyboardCommands.stopSpeech);
  return passos;
}

// ------------------------------------------------------------ classificação
function classificar(registro) {
  const linhas = [];
  for (const el of ELEMENTOS) {
    const linha = { elemento: el.nome, id: el.id, caminhos: {} };
    for (const c of Object.keys(CAMINHOS)) {
      const todas = (cen) => registro[cen][c].flatMap((p) => p.falas);
      const contem = (f) => el.padrao.test(normal(f));
      const excluidas = [...new Set(todas("cena").filter((f) => contem(f) && excluida(f)))];
      const falas = (cen) => todas(cen).filter((f) => !excluida(f));
      const conta = (lista) => lista.reduce((n, f) => n + (normal(f).match(new RegExp(el.padrao, "g")) || []).length, 0);
      const naCena = falas("cena");
      const naVazia = falas("vazia");
      const nCena = conta(naCena);
      const nVazia = conta(naVazia);
      const vazias = new Set(naVazia.map(normal));
      const novas = [...new Set(naCena.filter((f) => contem(f) && !vazias.has(normal(f))))];
      const iguais = [...new Set(naCena.filter((f) => contem(f) && vazias.has(normal(f))))];
      linha.caminhos[c] = {
        // decide pelas falas que só existem com a cena: uma contagem maior no
        // controle (tela de boas-vindas, por exemplo) não esconde fala nova
        anunciado: novas.length > 0,
        ocorrenciasCena: nCena,
        ocorrenciasVazia: nVazia,
        trechos: novas.length ? novas : iguais.slice(0, 2),
        trechosTambemNaVazia: !novas.length && iguais.length > 0,
        excluidas: excluidas.map((f) => ({ fala: f, motivo: excluida(f).motivo })),
      };
    }
    linha.anunciado = Object.values(linha.caminhos).some((x) => x.anunciado);
    linhas.push(linha);
  }
  return linhas;
}

const cela = (s) => String(s).replace(/\|/g, "\\|").replace(/\n/g, " ");
const corta = (s, n = 140) => (s.length > n ? `${s.slice(0, n - 1)}…` : s);

function tabelaMarkdown(linhas, total) {
  const anunciados = linhas.filter((l) => l.anunciado).length;
  const out = [
    `# CI-M24 · Classificação automática (elemento × caminho), ${DATA}`,
    "",
    "Gerada por `scripts/ci_m24_leitor_tela.cjs` a partir de",
    `\`CI-M24_registro-fala-nvda_${DATA}.json\`. "Sim" quando alguma fala com a`,
    "cena contém o identificador do elemento e não existe, igual, na fala com o",
    "app vazio (controle), no mesmo caminho. \"Cena / controle\" é o número de",
    "ocorrências do identificador em cada um. O trecho é a fala da cena que contém o",
    "identificador; \"(também no controle)\" marca fala idêntica à do app vazio,",
    "isto é, a barra de ferramentas, e não o elemento. \"Excluída\" marca fala que",
    "contém o identificador, mas não conta pelos critérios (lista `EXCLUSOES` do",
    "script).",
    "",
    "| Elemento | Caminho | Cena / controle | Anunciado? | Trecho de fala |",
    "| --- | --- | --- | --- | --- |",
  ];
  for (const l of linhas) {
    for (const [c, nome] of Object.entries(CAMINHOS)) {
      const x = l.caminhos[c];
      let trecho = x.trechos.length
        ? x.trechos.slice(0, 2).map((t) => `"${corta(t)}"`).join("; ") + (x.trechosTambemNaVazia ? " (também no controle)" : "")
        : "—";
      if (x.excluidas.length) {
        trecho += `; excluída: ${x.excluidas.map((e) => `"${corta(e.fala)}" (${e.motivo})`).join("; ")}`;
      }
      out.push(
        `| ${cela(l.elemento)} | ${c}. ${nome} | ${x.ocorrenciasCena} / ${x.ocorrenciasVazia} | ${x.anunciado ? "sim" : "não"} | ${cela(trecho)} |`,
      );
    }
  }
  out.push("", `**Resultado automático:** ${anunciados} de ${total} elementos anunciados em pelo menos um caminho.`, "");
  return out.join("\n");
}

function registroTexto(registro) {
  const out = [];
  for (const cen of ["vazia", "cena"]) {
    for (const [c, nome] of Object.entries(CAMINHOS)) {
      if (!registro[cen][c]) continue;
      out.push(`=== cenário ${cen} · ${c}. ${nome}`);
      for (const p of registro[cen][c]) {
        const extra = [
          p.foco ? `foco: ${p.foco}` : "",
          p.selecionados !== undefined ? `selecionados: ${p.selecionados}` : "",
          p.estado ? `janela ${p.estado.janela}; nomes de frame no DOM: ${JSON.stringify(p.estado.nomesDeFrameNoDOM)}` : "",
        ]
          .filter(Boolean)
          .join("; ");
        out.push(`--- ${p.passo}${extra ? ` (${extra})` : ""}`);
        for (const f of p.falas) out.push(`  ${f}`);
        if (!p.falas.length) out.push("  (sem fala)");
      }
      out.push("");
    }
  }
  return out.join("\n");
}

// ------------------------------------------------------------ principal
(async () => {
  const preview = await subirApp();
  const exe = getGuidepupNVDAInstallationPath();
  if (!exe) throw new Error("NVDA do Guidepup não instalado (npx @guidepup/setup install nvda)");
  const nvdaVersao = execFileSync(
    "powershell",
    ["-NoProfile", "-Command", `(Get-Item '${exe}').VersionInfo.ProductVersion`],
    { encoding: "utf8" },
  ).trim();
  const windows = execFileSync(
    "powershell",
    ["-NoProfile", "-Command", "$o = Get-CimInstance Win32_OperatingSystem; \"$($o.Caption) $($o.Version)\""],
    { encoding: "utf8" },
  ).trim();

  const ouvinte = new Ouvinte();
  let browser = null;
  let concluido = false;
  const ambiente = {};
  const arvores = {};
  try {
    await nvda.start({
      capture: false,
      settings: {
        speech: {
          synth: "oneCore",
          autoLanguageSwitching: "False",
          oneCore: { volume: "0", rate: "100", rateBoost: "True" },
        },
        speechViewer: { showSpeechViewerAtStartup: "False" },
      },
    });
    await ouvinte.conectar();
    browser = await chromium.launch({
      channel: "msedge",
      headless: false,
      args: ["--force-renderer-accessibility", "--start-maximized", "--no-first-run"],
    });
    Object.assign(ambiente, {
      data: DATA,
      sistema: `${windows} (${os.arch()})`,
      node: process.version,
      nvda: `${nvdaVersao} (portátil do Guidepup, pacote ${nvda.version})`,
      guidepup: GUIDEPUP_VERSAO,
      playwright: PLAYWRIGHT_VERSAO,
      navegador: `Microsoft Edge ${browser.version()}`,
      voz: "OneCore, volume 0, velocidade 100 com aumento",
      url: URL_APP,
      cena: path.relative(RAIZ, CENA).replace(/\\/g, "/"),
    });
    for (const [k, v] of Object.entries(ambiente)) log(`${k}: ${v}`);

    // Cada caminho roda num contexto novo do navegador (perfil limpo, cena
    // solta de novo a partir do arquivo), para um caminho não herdar o estado
    // do outro: o Tab do P4 troca o tipo das formas selecionadas, a seleção
    // fica gravada no localStorage, e o P3 termina com o foco fora da página.
    for (const cenario of ["vazia", "cena"].filter((x) => !SO_CENARIO || x === SO_CENARIO)) {
      log(`\n== cenário ${cenario}`);
      for (const [c, fn] of Object.entries({ P1, P2, P3, P4 }).filter(([x]) => !SO_CAMINHO || x === SO_CAMINHO)) {
        const j = await abrir(browser, cenario, c);
        if (!arvores[cenario]) {
          if (cenario === "cena") {
            log(`cena carregada: ${j.total} elementos`);
            await j.page.screenshot({ path: NOME("cena-carregada", "png") });
          }
          arvores[cenario] = await arvoreAcessibilidade(j.page);
          log(`árvore de acessibilidade: ${arvores[cenario].naoIgnorados} nós expostos; canvas: ${arvores[cenario].canvas.length}`);
        }
        // maximiza (SW_MAXIMIZE): o Excalidraw só põe no DOM o nome dos frames
        // que estão dentro da área visível, então o tamanho da janela importa
        log(`janela: ${trazerParaFrente(j.titulo)}`);
        await espera(1000);
        await garantirFoco(j.page, j.titulo);
        const tela = await j.page.evaluate(() => ({ w: innerWidth, h: innerHeight, sw: screen.availWidth }));
        log(`área visível: ${tela.w}x${tela.h}`);
        if (tela.w < tela.sw - 40) throw new Error(`a janela não está maximizada (${tela.w}x${tela.h})`);
        registro[cenario][c] = await fn(j, ouvinte);
        const n = registro[cenario][c].reduce((s, p) => s + p.falas.length, 0);
        log(`${c}. ${CAMINHOS[c]}: ${registro[cenario][c].length} passo(s), ${n} fala(s)`);
        if (cenario === "cena" && c === "P4") log(`elementos depois do P4: ${(await tiposNaCena(j.page)).join(", ")}`);
        await j.context.close();
      }
    }
    concluido = true;
  } finally {
    if (!concluido) {
      // guarda o que já foi ouvido, para diagnóstico (fora da evidência)
      const parcial = path.join(os.tmpdir(), `CI-M24_registro-parcial_${Date.now()}.json`);
      fs.writeFileSync(parcial, JSON.stringify({ registro, falas: ouvinte.falas }, null, 2));
      console.error(`registro parcial: ${parcial}`);
    }
    await browser?.close().catch(() => {});
    ouvinte.fechar();
    await nvda.stop().catch(() => {});
    if (preview) spawn("taskkill", ["/pid", String(preview.pid), "/T", "/F"], { stdio: "ignore" });
  }

  if (SO_CENARIO || SO_CAMINHO) {
    // execução parcial, só para depurar: mostra o registro e não grava nada
    console.log(registroTexto(registro));
    return;
  }
  const linhas = classificar(registro);
  const total = ELEMENTOS.length;
  const anunciados = linhas.filter((l) => l.anunciado).length;
  log(`\nclassificação automática: ${anunciados} de ${total} elementos anunciados`);
  for (const l of linhas) {
    const onde = Object.entries(l.caminhos).filter(([, x]) => x.anunciado).map(([c]) => c);
    log(`  ${l.elemento}: ${l.anunciado ? `sim (${onde.join(", ")})` : "não"}`);
  }

  fs.writeFileSync(
    NOME("registro-fala-nvda", "json"),
    `${JSON.stringify({ ambiente, caminhos: CAMINHOS, registro }, null, 2)}\n`,
  );
  fs.writeFileSync(NOME("registro-fala-nvda", "txt"), `${registroTexto(registro)}\n`);
  fs.writeFileSync(NOME("classificacao", "md"), tabelaMarkdown(linhas, total));
  fs.writeFileSync(NOME("classificacao", "json"), `${JSON.stringify(linhas, null, 2)}\n`);
  const { cena: a, vazia: b } = arvores;
  fs.writeFileSync(
    NOME("arvore-acessibilidade", "json"),
    `${JSON.stringify({ cena: { ...a, aria: undefined }, vazia: { ...b, aria: undefined, nos: undefined } }, null, 2)}\n`,
  );
  fs.writeFileSync(NOME("arvore-acessibilidade", "yml"), `# ariaSnapshot do <body> com a cena carregada\n${a.aria}\n`);
  fs.writeFileSync(NOME("saida-script", "txt"), `${saida.join("\n")}\n`);
})().catch(async (e) => {
  console.error("ERRO:", e);
  try {
    await nvda.stop();
  } catch {}
  process.exit(1);
});
