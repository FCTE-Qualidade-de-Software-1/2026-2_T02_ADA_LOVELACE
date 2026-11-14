// S-M6 (issue #58): script de console para as 3 JANELAS (A, B e C) da mesma sala.
// Uso só na instância local (localhost:3001 + excalidraw-room em localhost:3002).
//
// __sm6.rodar(n) espera o próximo múltiplo de 30 s do relógio (com pelo menos 8 s
// de folga), para as 3 janelas começarem juntas. Durante 30 s, a cada 100 ms, move o
// retângulo-alvo como o app faz numa edição: version + 1, versionNonce novo
// (bumpVersion, packages/element/src/mutateElement.ts:188-197). updateScene dispara o
// onChange, que envia a mudança aos outros (excalidraw-app/App.tsx:715-721).
// Depois tira três assinaturas da cena: "fim" (logo ao terminar), "final" (30 s depois,
// após a ressincronização completa de 20 s, Collab.tsx:987-999) e "2min" (2 min depois,
// sem novas edições, para ver se a divergência persiste).
// A assinatura é a lista ordenada id:version:versionNonce:x:y dos elementos não
// apagados e o SHA-256 dela. Janelas com o mesmo hash têm a mesma cena.
(() => {
  const api = window.collab.excalidrawAPI;
  const DURACAO_MS = 30000;
  const PASSO_MS = 100;
  const ESPERA_FINAL_MS = 30000;
  const ESPERA_PERSISTENCIA_MS = 120000;
  const sm6 = (window.__sm6 = { assinaturas: {}, edicoes: {}, ocupado: false });

  const elementos = () => api.getSceneElements();

  sm6.alvoId = () => {
    const els = elementos();
    if (els.length !== 1) throw new Error(`a cena deve ter exatamente 1 elemento (tem ${els.length})`);
    return els[0].id;
  };

  sm6.assinatura = async (nome) => {
    const linhas = elementos()
      .map((e) => `${e.id}:${e.version}:${e.versionNonce}:${Math.round(e.x)}:${Math.round(e.y)}`)
      .sort()
      .join("\n");
    const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(linhas));
    const hash = [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("");
    sm6.assinaturas[nome] = { hora: new Date().toISOString(), hash: hash.slice(0, 16), linhas };
    console.log(`%c${nome}: ${hash.slice(0, 16)}`, "font-weight:bold", `\n${linhas}`);
    return hash.slice(0, 16);
  };

  sm6.rodar = (n) => {
    if (sm6.ocupado) throw new Error("ainda há uma rodada em andamento nesta janela; espere o r<n>-2min");
    if (sm6.assinaturas[`r${n}-fim`]) throw new Error(`a rodada ${n} já foi feita; use outro número`);
    const id = sm6.alvoId();
    sm6.ocupado = true;
    const agora = Date.now();
    let inicio = Math.ceil(agora / 30000) * 30000;
    if (inicio - agora < 8000) inicio += 30000;
    console.log(`rodada ${n}: começa às ${new Date(inicio).toLocaleTimeString()} (alvo ${id})`);

    setTimeout(() => {
      const base = elementos().find((e) => e.id === id);
      let edicoes = 0;
      const timer = setInterval(() => {
        if (Date.now() - inicio >= DURACAO_MS) {
          clearInterval(timer);
          sm6.edicoes[n] = edicoes;
          console.log(`rodada ${n}: ${edicoes} edições locais; aguardando ${ESPERA_FINAL_MS / 1000} s`);
          sm6.assinatura(`r${n}-fim`);
          setTimeout(() => sm6.assinatura(`r${n}-final`), ESPERA_FINAL_MS);
          setTimeout(async () => {
            await sm6.assinatura(`r${n}-2min`);
            sm6.ocupado = false;
            console.log(`rodada ${n}: concluída`);
          }, ESPERA_PERSISTENCIA_MS);
          return;
        }
        const atual = elementos().find((e) => e.id === id);
        const novo = {
          ...atual,
          x: base.x + Math.round(Math.random() * 120 - 60),
          y: base.y + Math.round(Math.random() * 120 - 60),
          version: atual.version + 1,
          versionNonce: Math.floor(Math.random() * 2 ** 31),
          updated: Date.now(),
        };
        api.updateScene({
          elements: api.getSceneElementsIncludingDeleted().map((e) => (e.id === id ? novo : e)),
          captureUpdate: "IMMEDIATELY",
        });
        edicoes++;
      }, PASSO_MS);
    }, inicio - agora);
  };

  sm6.relatorio = () =>
    JSON.stringify(
      Object.fromEntries(
        Object.entries(sm6.assinaturas).map(([k, v]) => [k, { hora: v.hora, hash: v.hash, linhas: v.linhas }]),
      ),
      null,
      2,
    ) + `\nedições locais por rodada: ${JSON.stringify(sm6.edicoes)}`;

  console.log("S-M6 pronta.");
})();
