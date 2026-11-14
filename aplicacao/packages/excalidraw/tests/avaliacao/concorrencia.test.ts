/* eslint-disable no-console -- a saída no console é o registro da medição */
// Avaliação de qualidade (equipe Ada Lovelace), issue #58, métrica S-M6.
// Conta inconsistências entre participantes depois de edições simultâneas,
// usando a reconciliação real da colaboração (reconcile.ts:23-118).

import { reseed } from "@excalidraw/common";
import { syncInvalidIndices } from "@excalidraw/element";

import type { OrderedExcalidrawElement } from "@excalidraw/element/types";

import { reconcileElements } from "../../data/reconcile";
import { bumpElementVersions } from "../../data/restore";

import { criarPrng } from "./prng";

import type { RemoteExcalidrawElement } from "../../data/reconcile";
import type { AppState } from "../../types";

const SEMENTE = 58;
const RODADAS = 500;
const EDICOES_POR_REPLICA = 10;
const PROB_ALVO = 0.5;
const PROB_EDITANDO = 0.2;
const IDS = ["alvo", "e1", "e2", "e3", "e4"];

type Elemento = OrderedExcalidrawElement & { x: number };
type Replica = { nome: string; elementos: Elemento[] };
type Rng = () => number;
type Receptor = (
  replica: Replica,
  remotos: readonly Elemento[],
  appState: AppState,
) => void;

const SEM_EDICAO = {
  editingTextElement: null,
  resizingElement: null,
  newElement: null,
} as unknown as AppState;

const sortearInt = (rng: Rng, max: number) => Math.floor(rng() * max);
// mesmo intervalo de randomInteger() de @excalidraw/common
const sortearNonce = (rng: Rng) => sortearInt(rng, 2 ** 31);

const cenaBase = (rng: Rng): Elemento[] =>
  syncInvalidIndices(
    IDS.map(
      (id) =>
        ({
          id,
          version: 1,
          versionNonce: sortearNonce(rng),
          x: 0,
        } as unknown as Elemento),
    ),
  ) as Elemento[];

const clonar = (els: readonly Elemento[]) => els.map((el) => ({ ...el }));

// como bumpVersion (packages/element/src/mutateElement.ts:188-193)
const editar = (replica: Replica, rng: Rng): Elemento => {
  const id =
    rng() < PROB_ALVO ? "alvo" : IDS[1 + sortearInt(rng, IDS.length - 1)];
  const atual = replica.elementos.find((el) => el.id === id)!;
  const novo: Elemento = {
    ...atual,
    version: atual.version + 1,
    versionNonce: sortearNonce(rng),
    x: atual.x + 1 + sortearInt(rng, 10),
  };
  replica.elementos = replica.elementos.map((el) => (el.id === id ? novo : el));
  return { ...novo };
};

const receber = (
  replica: Replica,
  remotos: readonly Elemento[],
  appState: AppState,
) => {
  replica.elementos = reconcileElements(
    replica.elementos,
    clonar(remotos) as unknown as RemoteExcalidrawElement[],
    appState,
  ) as unknown as Elemento[];
};

// como Collab._reconcileElements (excalidraw-app/collab/Collab.tsx:772-803):
// reconcilia e depois aplica bumpElementVersions contra a cena local anterior.
// O restoreElements da linha 782 não altera versões destes elementos.
const receberApp: Receptor = (replica, remotos, appState) => {
  const locais = replica.elementos;
  const reconciliados = reconcileElements(
    locais,
    clonar(remotos) as unknown as RemoteExcalidrawElement[],
    appState,
  );
  replica.elementos = bumpElementVersions(
    reconciliados,
    locais,
  ) as unknown as Elemento[];
};

const assinatura = (replica: Replica) =>
  [...replica.elementos]
    .sort((a, b) => a.id.localeCompare(b.id))
    .map((el) => `${el.id}:${el.version}:${el.versionNonce}:${el.x}`)
    .join("|");

const convergiram = (replicas: Replica[]) =>
  new Set(replicas.map(assinatura)).size === 1;

// cada réplica envia a cena inteira às outras, sem elemento em edição,
// como a sincronização completa periódica (Portal.tsx:151-153)
const ressincronizar = (replicas: Replica[], receptor: Receptor) => {
  for (const origem of replicas) {
    for (const destino of replicas) {
      if (destino !== origem) {
        receptor(destino, origem.elementos, SEM_EDICAO);
      }
    }
  }
};

const rodada = (
  rng: Rng,
  probEditando = PROB_EDITANDO,
  receptor: Receptor = receber,
) => {
  const base = cenaBase(rng);
  const replicas: Replica[] = ["A", "B", "C"].map((nome) => ({
    nome,
    elementos: clonar(base),
  }));
  const restantes = new Map(replicas.map((r) => [r, EDICOES_POR_REPLICA]));
  const pendentes = new Map<Replica, Elemento[]>(replicas.map((r) => [r, []]));
  let descartesPorEdicao = 0;

  const totalPendentes = () =>
    [...pendentes.values()].reduce((s, fila) => s + fila.length, 0);
  const totalRestantes = () =>
    [...restantes.values()].reduce((s, n) => s + n, 0);

  while (totalRestantes() + totalPendentes() > 0) {
    const editarAgora =
      totalRestantes() > 0 && (totalPendentes() === 0 || rng() < 0.5);
    if (editarAgora) {
      const autores = replicas.filter((r) => restantes.get(r)! > 0);
      const autor = autores[sortearInt(rng, autores.length)];
      restantes.set(autor, restantes.get(autor)! - 1);
      const msg = editar(autor, rng);
      for (const outra of replicas) {
        if (outra !== autor) {
          pendentes.get(outra)!.push(msg);
        }
      }
    } else {
      // entrega fora de ordem: destinatário e mensagem sorteados
      const destinos = replicas.filter((r) => pendentes.get(r)!.length > 0);
      const destino = destinos[sortearInt(rng, destinos.length)];
      const fila = pendentes.get(destino)!;
      const [msg] = fila.splice(sortearInt(rng, fila.length), 1);
      let appState = SEM_EDICAO;
      if (rng() < probEditando) {
        // o destinatário está redimensionando o alvo (reconcile.ts:28-31)
        const alvoLocal = destino.elementos.find((el) => el.id === "alvo")!;
        appState = { ...SEM_EDICAO, resizingElement: alvoLocal } as AppState;
        if (msg.id === "alvo") {
          descartesPorEdicao++;
        }
      }
      receptor(destino, [msg], appState);
    }
  }

  const antes = convergiram(replicas);
  ressincronizar(replicas, receptor);
  const final = convergiram(replicas);
  return { antes, final, descartesPorEdicao };
};

describe("S-M6: inconsistências após edições simultâneas", () => {
  it("controle: sem concorrência, uma edição de A chega igual a B e C", () => {
    const rng = criarPrng(SEMENTE);
    const base = cenaBase(rng);
    const [A, B, C]: Replica[] = ["A", "B", "C"].map((nome) => ({
      nome,
      elementos: clonar(base),
    }));
    const msg = editar(A, rng);
    receber(B, [msg], SEM_EDICAO);
    receber(C, [msg], SEM_EDICAO);
    expect(assinatura(B)).toEqual(assinatura(A));
    expect(assinatura(C)).toEqual(assinatura(A));
    expect(assinatura(A)).not.toEqual(
      assinatura({ nome: "base", elementos: base }),
    );
  });

  it("S-M6: 500 rodadas com 3 réplicas e entrega fora de ordem", () => {
    const rng = criarPrng(SEMENTE);
    let divergentesAntesResync = 0;
    let divergentesFinal = 0;
    let descartesPorEdicao = 0;
    for (let i = 0; i < RODADAS; i++) {
      const r = rodada(rng);
      if (!r.antes) {
        divergentesAntesResync++;
      }
      if (!r.final) {
        divergentesFinal++;
      }
      descartesPorEdicao += r.descartesPorEdicao;
    }

    console.log(`semente: ${SEMENTE}`);
    console.log(
      `réplicas: 3, edições por rodada: ${3 * EDICOES_POR_REPLICA}, ` +
        `P(alvo): ${PROB_ALVO}, P(destinatário editando o alvo): ${PROB_EDITANDO}`,
    );
    console.table({
      rodadas: RODADAS,
      divergentesAntesResync,
      divergentesFinal,
      descartesPorEdicao,
    });
    console.log(`S-M6 = ${divergentesFinal} inconsistências finais`);

    // a simulação exercita a exceção do elemento em edição
    expect(descartesPorEdicao).toBeGreaterThan(0);
    // hipótese da S-Q3: nenhuma inconsistência depois da ressincronização
    expect(divergentesFinal).toBe(0);
  });

  it("sem elemento em edição, as réplicas já convergem antes da ressincronização", () => {
    const rng = criarPrng(SEMENTE);
    let divergentesAntesResync = 0;
    for (let i = 0; i < RODADAS; i++) {
      if (!rodada(rng, 0).antes) {
        divergentesAntesResync++;
      }
    }
    console.log(
      `P(destinatário editando o alvo) = 0: ${divergentesAntesResync} de ${RODADAS} rodadas divergentes antes da ressincronização`,
    );
    expect(divergentesAntesResync).toBe(0);
  });
});

// No app, o recebimento não usa só reconcileElements: Collab._reconcileElements
// (excalidraw-app/collab/Collab.tsx:772-803) chama em seguida bumpElementVersions,
// e a versão criada ali não é retransmitida (Collab.tsx:795-801).
describe("S-M6: caminho do app (reconcileElements + bumpElementVersions)", () => {
  it("reprodução: quem perde o desempate sobe a versão sozinho e diverge", () => {
    reseed(SEMENTE);
    const base = cenaBase(criarPrng(SEMENTE));
    const comVersao = (versionNonce: number) =>
      base.map((el) =>
        el.id === "alvo" ? { ...el, version: 10, versionNonce, x: 5 } : el,
      );
    // A e B terminam a edição do alvo empatados na versão 10
    const A: Replica = { nome: "A", elementos: comVersao(100) };
    const B: Replica = { nome: "B", elementos: comVersao(200) };
    const ultimaDeA = A.elementos.find((el) => el.id === "alvo")!;
    const ultimaDeB = B.elementos.find((el) => el.id === "alvo")!;

    receberApp(A, [ultimaDeB], SEM_EDICAO);
    receberApp(B, [ultimaDeA], SEM_EDICAO);

    const alvoA = A.elementos.find((el) => el.id === "alvo")!;
    const alvoB = B.elementos.find((el) => el.id === "alvo")!;
    console.log(
      `reprodução: A ${alvoA.version}:${alvoA.versionNonce} | B ${alvoB.version}:${alvoB.versionNonce}`,
    );
    // A tem o menor versionNonce e mantém a sua versão
    expect([alvoA.version, alvoA.versionNonce]).toEqual([10, 100]);
    // B adota o elemento de A, mas bumpElementVersions sobe a versão
    expect(alvoB.version).toBe(11);
    expect(alvoB.versionNonce).not.toBe(100);
    expect(assinatura(B)).not.toEqual(assinatura(A));
  });

  it("depois da divergência, uma edição posterior e não concorrente de A se perde em B ou divide a versão de novo", () => {
    const dividir = () => {
      reseed(SEMENTE);
      const base = cenaBase(criarPrng(SEMENTE));
      const comVersao = (versionNonce: number) =>
        base.map((el) =>
          el.id === "alvo" ? { ...el, version: 10, versionNonce, x: 5 } : el,
        );
      const A: Replica = { nome: "A", elementos: comVersao(100) };
      const B: Replica = { nome: "B", elementos: comVersao(200) };
      const ultimaDeA = A.elementos.find((el) => el.id === "alvo")!;
      const ultimaDeB = B.elementos.find((el) => el.id === "alvo")!;
      receberApp(A, [ultimaDeB], SEM_EDICAO);
      receberApp(B, [ultimaDeA], SEM_EDICAO);
      // A em 10:100 e B em 11:<nonce novo>, mesmo conteúdo (x = 5)
      return {
        A,
        B,
        nonceB: B.elementos.find((e) => e.id === "alvo")!.versionNonce,
      };
    };
    // A move o alvo sozinho, sem nenhuma edição concorrente: versão 11
    const editarA = (A: Replica, versionNonce: number) => {
      const atual = A.elementos.find((el) => el.id === "alvo")!;
      const novo = {
        ...atual,
        version: atual.version + 1,
        versionNonce,
        x: 50,
      };
      A.elementos = A.elementos.map((el) => (el.id === "alvo" ? novo : el));
      return novo;
    };
    const alvo = (r: Replica) => r.elementos.find((el) => el.id === "alvo")!;

    // caso 1: versionNonce da edição de A maior que o de B (empate em 11, B mantém o seu)
    const c1 = dividir();
    receberApp(c1.B, [editarA(c1.A, c1.nonceB + 1)], SEM_EDICAO);
    console.log(
      `edição posterior, caso 1: A x=${alvo(c1.A).x} v${
        alvo(c1.A).version
      } | B x=${alvo(c1.B).x} v${alvo(c1.B).version}`,
    );
    expect(alvo(c1.A).x).toBe(50);
    expect(alvo(c1.B).x).toBe(5); // a edição de A se perdeu em B

    // caso 2: versionNonce da edição de A menor (B aceita o conteúdo, mas sobe a versão de novo)
    const c2 = dividir();
    receberApp(c2.B, [editarA(c2.A, c2.nonceB - 1)], SEM_EDICAO);
    console.log(
      `edição posterior, caso 2: A x=${alvo(c2.A).x} v${
        alvo(c2.A).version
      } | B x=${alvo(c2.B).x} v${alvo(c2.B).version}`,
    );
    expect(alvo(c2.B).x).toBe(50);
    expect(alvo(c2.B).version).toBe(12);
    expect(assinatura(c2.B)).not.toEqual(assinatura(c2.A));
  });

  it("S-M6 (caminho do app): 500 rodadas com 3 réplicas", () => {
    reseed(SEMENTE);
    const rng = criarPrng(SEMENTE);
    let divergentesAntesResync = 0;
    let divergentesFinal = 0;
    for (let i = 0; i < RODADAS; i++) {
      const r = rodada(rng, PROB_EDITANDO, receberApp);
      if (!r.antes) {
        divergentesAntesResync++;
      }
      if (!r.final) {
        divergentesFinal++;
      }
    }
    console.table({
      rodadas: RODADAS,
      divergentesAntesResync,
      divergentesFinal,
    });
    console.log(
      `S-M6 (caminho do app) = ${divergentesFinal} de ${RODADAS} rodadas inconsistentes ` +
        `(${((100 * divergentesFinal) / RODADAS).toFixed(1)}%)`,
    );
    // registra o achado: o caminho do app deixa réplicas divergentes
    expect(divergentesFinal).toBeGreaterThan(0);
  });
});
