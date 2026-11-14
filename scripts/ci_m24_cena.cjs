#!/usr/bin/env node
// CI-M24: gera a cena de teste com um elemento de cada tipo (denominador = 9).
// Uso: node scripts/ci_m24_cena.cjs <saida.excalidraw>
// A cena é carregada no app (o scripts/ci_m24_leitor_tela.cjs a solta sobre o
// canvas); o app completa os campos omitidos
// ao restaurar (restoreElements).

const fs = require("fs");
const zlib = require("zlib");

const saida = process.argv[2];
if (!saida) {
  console.error("uso: node scripts/ci_m24_cena.cjs <saida.excalidraw>");
  process.exit(1);
}

// PNG 64x64 (quadrado azul com borda escura), gerado sem dependências.
function png64() {
  const w = 64;
  const h = 64;
  const raw = Buffer.alloc((w * 3 + 1) * h);
  for (let y = 0; y < h; y++) {
    raw[y * (w * 3 + 1)] = 0;
    for (let x = 0; x < w; x++) {
      const borda = x < 4 || y < 4 || x >= w - 4 || y >= h - 4;
      const [r, g, b] = borda ? [30, 30, 30] : [74, 144, 226];
      const o = y * (w * 3 + 1) + 1 + x * 3;
      raw[o] = r;
      raw[o + 1] = g;
      raw[o + 2] = b;
    }
  }
  const crcTable = Array.from({ length: 256 }, (_, n) => {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    return c >>> 0;
  });
  const crc = (buf) => {
    let c = 0xffffffff;
    for (const byte of buf) c = crcTable[(c ^ byte) & 0xff] ^ (c >>> 8);
    return (c ^ 0xffffffff) >>> 0;
  };
  const chunk = (tipo, dados) => {
    const len = Buffer.alloc(4);
    len.writeUInt32BE(dados.length);
    const corpo = Buffer.concat([Buffer.from(tipo, "ascii"), dados]);
    const c = Buffer.alloc(4);
    c.writeUInt32BE(crc(corpo));
    return Buffer.concat([len, corpo, c]);
  };
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w, 0);
  ihdr.writeUInt32BE(h, 4);
  ihdr[8] = 8; // profundidade
  ihdr[9] = 2; // RGB
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk("IHDR", ihdr),
    chunk("IDAT", zlib.deflateSync(raw)),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

const T = 1794700800000; // 2026-11-14T00:00:00Z, fixo para a cena ser estável
let n = 0;
function base(tipo, id, x, y, width, height, extra = {}) {
  n += 1;
  return {
    id,
    type: tipo,
    x,
    y,
    width,
    height,
    angle: 0,
    strokeColor: "#1e1e1e",
    backgroundColor: "transparent",
    fillStyle: "solid",
    strokeWidth: 2,
    strokeStyle: "solid",
    roughness: 1,
    opacity: 100,
    groupIds: [],
    frameId: null,
    index: `a${n - 1}`,
    roundness: null,
    seed: 2400 + n,
    version: 2,
    versionNonce: 2400 + n,
    isDeleted: false,
    boundElements: [],
    updated: T,
    created: T,
    link: null,
    locked: false,
    ...extra,
  };
}

const linear = (pontos) => ({
  points: pontos,
  startBinding: null,
  endBinding: null,
  lastCommittedPoint: null,
});

const fileId = "ci-m24-imagem-png";
const elements = [
  // Linha 1: formas básicas
  base("rectangle", "ci-m24-retangulo", 100, 160, 150, 100),
  base("ellipse", "ci-m24-elipse", 320, 160, 150, 100),
  base("diamond", "ci-m24-losango", 540, 160, 150, 100),
  // Linha 2: seta, linha e texto
  base("arrow", "ci-m24-seta", 100, 360, 150, 0, {
    ...linear([
      [0, 0],
      [150, 0],
    ]),
    startArrowhead: null,
    endArrowhead: "arrow",
    elbowed: false,
  }),
  base("line", "ci-m24-linha", 320, 360, 150, 0, {
    ...linear([
      [0, 0],
      [150, 0],
    ]),
    startArrowhead: null,
    endArrowhead: null,
    polygon: false,
  }),
  base("text", "ci-m24-texto", 540, 345, 150, 25, {
    text: "Texto de teste",
    originalText: "Texto de teste",
    fontSize: 20,
    fontFamily: 5,
    textAlign: "left",
    verticalAlign: "top",
    containerId: null,
    autoResize: true,
    lineHeight: 1.25,
  }),
  // Linha 3: desenho livre, imagem e frame
  base("freedraw", "ci-m24-desenho-livre", 100, 470, 150, 80, {
    points: [
      [0, 40],
      [20, 10],
      [45, 0],
      [70, 25],
      [90, 60],
      [115, 80],
      [135, 55],
      [150, 20],
    ],
    pressures: [],
    simulatePressure: true,
    lastCommittedPoint: null,
  }),
  base("image", "ci-m24-imagem", 345, 460, 100, 100, {
    fileId,
    status: "saved",
    scale: [1, 1],
    crop: null,
  }),
  base("frame", "ci-m24-frame", 540, 460, 150, 100, {
    name: "Quadro de teste",
  }),
];

const cena = {
  type: "excalidraw",
  version: 2,
  source: "ci-m24-cena (scripts/ci_m24_cena.cjs)",
  elements,
  appState: {
    gridSize: 20,
    gridStep: 5,
    gridModeEnabled: false,
    viewBackgroundColor: "#ffffff",
    theme: "light",
  },
  files: {
    [fileId]: {
      mimeType: "image/png",
      id: fileId,
      dataURL: `data:image/png;base64,${png64().toString("base64")}`,
      created: T,
    },
  },
};

fs.writeFileSync(saida, `${JSON.stringify(cena, null, 2)}\n`);
console.log(
  `${elements.length} elementos: ${elements.map((e) => e.type).join(", ")}`,
);
