/* eslint-disable no-console -- a saída no console é o registro da medição */
// Avaliação de qualidade (equipe Ada Lovelace), issue #58, métrica S-M5.
// Mede a taxa de detecção de adulteração: quantos payloads cifrados e depois
// adulterados são rejeitados pela decifragem AES-GCM usada na colaboração
// (Portal.tsx:85-102 cifra; Collab.tsx:469-489 decifra e descarta).

import {
  decryptData,
  encryptData,
  generateEncryptionKey,
} from "../../data/encryption";

import cena from "./fixtures/cena-s-m5.json";
import { criarPrng } from "./prng";

if (!window.crypto?.subtle) {
  Object.defineProperty(window, "crypto", {
    value: (await import("node:crypto")).webcrypto,
  });
}

const SEMENTE = 58;
const POR_GRUPO = 40;
const TAG_BYTES = 16;

const MODOS = [
  "bit-cifrado",
  "bit-tag",
  "bit-iv",
  "tamanho",
  "chave-ou-iv-trocado",
] as const;
type Modo = typeof MODOS[number];

type Mensagem = { iv: Uint8Array<ArrayBuffer>; buf: Uint8Array<ArrayBuffer> };
type Contexto = { outraChave: string; outroIv: Uint8Array<ArrayBuffer> };

// mesmo formato que Portal._broadcastSocketData cifra
const PAYLOAD = JSON.stringify({
  type: "SCENE_INIT",
  payload: { elements: cena.elements },
});

const sortear = (rng: () => number, min: number, max: number) =>
  min + Math.floor(rng() * (max - min));

const inverterBit = (
  bytes: Uint8Array<ArrayBuffer>,
  inicio: number,
  fim: number,
  rng: () => number,
) => {
  const copia = new Uint8Array(bytes);
  copia[sortear(rng, inicio, fim)] ^= 1 << sortear(rng, 0, 8);
  return copia;
};

const adulterar = (
  modo: Modo,
  msg: Mensagem,
  i: number,
  rng: () => number,
  ctx: Contexto,
): Mensagem & { chave?: string } => {
  const n = msg.buf.length;
  switch (modo) {
    case "bit-cifrado":
      return { ...msg, buf: inverterBit(msg.buf, 0, n - TAG_BYTES, rng) };
    case "bit-tag":
      return { ...msg, buf: inverterBit(msg.buf, n - TAG_BYTES, n, rng) };
    case "bit-iv":
      return { ...msg, iv: inverterBit(msg.iv, 0, msg.iv.length, rng) };
    case "tamanho": {
      const k = sortear(rng, 1, 17);
      if (i % 2 === 0) {
        return { ...msg, buf: msg.buf.slice(0, n - k) };
      }
      const maior = new Uint8Array(n + k);
      maior.set(msg.buf);
      maior.set(window.crypto.getRandomValues(new Uint8Array(k)), n);
      return { ...msg, buf: maior };
    }
    case "chave-ou-iv-trocado":
      return i % 2 === 0
        ? { ...msg, chave: ctx.outraChave }
        : { ...msg, iv: ctx.outroIv };
  }
};

const cifrar = async (chave: string): Promise<Mensagem> => {
  const { encryptedBuffer, iv } = await encryptData(chave, PAYLOAD);
  return { iv, buf: new Uint8Array(encryptedBuffer) };
};

const decifrar = async (msg: Mensagem, chave: string) =>
  new TextDecoder().decode(await decryptData(msg.iv, msg.buf, chave));

const foiRejeitada = async (msg: Mensagem, chave: string) => {
  try {
    await decifrar(msg, chave);
    return false;
  } catch {
    return true;
  }
};

describe("S-M5: detecção de adulteração (AES-GCM)", () => {
  it("controle: 40 mensagens sem adulteração são decifradas e idênticas ao original", async () => {
    const chave = await generateEncryptionKey();
    let rejeitadasControle = 0;
    for (let i = 0; i < POR_GRUPO; i++) {
      const msg = await cifrar(chave);
      if (await foiRejeitada(msg, chave)) {
        rejeitadasControle++;
      } else {
        expect(await decifrar(msg, chave)).toBe(PAYLOAD);
      }
    }
    console.log(
      `controle: ${POR_GRUPO} enviadas, ${rejeitadasControle} rejeitadas`,
    );
    expect(rejeitadasControle).toBe(0);
  });

  it("S-M5: 200 adulterações (5 grupos × 40)", async () => {
    const rng = criarPrng(SEMENTE);
    const chave = await generateEncryptionKey();
    const ctx: Contexto = {
      outraChave: await generateEncryptionKey(),
      outroIv: (await cifrar(chave)).iv,
    };

    const linhas: { grupo: string; injetadas: number; rejeitadas: number }[] =
      [];
    for (const modo of MODOS) {
      let rejeitadas = 0;
      for (let i = 0; i < POR_GRUPO; i++) {
        const original = await cifrar(chave);
        const adulterada = adulterar(modo, original, i, rng, ctx);
        if (await foiRejeitada(adulterada, adulterada.chave ?? chave)) {
          rejeitadas++;
        }
      }
      linhas.push({ grupo: modo, injetadas: POR_GRUPO, rejeitadas });
    }

    const injetadas = linhas.reduce((s, l) => s + l.injetadas, 0);
    const rejeitadas = linhas.reduce((s, l) => s + l.rejeitadas, 0);
    linhas.push({ grupo: "TOTAL", injetadas, rejeitadas });
    console.log(`semente: ${SEMENTE}`);
    console.table(linhas);
    console.log(
      `S-M5 = ${rejeitadas} ÷ ${injetadas} = ${(
        (100 * rejeitadas) /
        injetadas
      ).toFixed(1)}%`,
    );

    expect(injetadas).toBe(200);
    // hipótese da S-Q3: toda adulteração é rejeitada
    expect(rejeitadas).toBe(injetadas);
  });

  it("observação de replay: a mesma mensagem válida é aceita duas vezes", async () => {
    const chave = await generateEncryptionKey();
    const msg = await cifrar(chave);
    const primeira = await foiRejeitada(msg, chave);
    const reenvio = await foiRejeitada(msg, chave);
    console.log(
      `replay: 1ª entrega ${primeira ? "rejeitada" : "aceita"}, reenvio ${
        reenvio ? "rejeitado" : "aceito"
      }`,
    );
    // não entra na taxa: AES-GCM sem AAD nem contador não detecta replay
    expect(primeira).toBe(false);
    expect(reenvio).toBe(false);
  });
});
