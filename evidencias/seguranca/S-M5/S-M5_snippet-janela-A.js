// S-M5 (issue #58): script de console da JANELA A (quem injeta).
// Uso só na instância local (localhost:3001 + excalidraw-room em localhost:3002).
//
// 1. Guarda cópias das mensagens cifradas reais que o app envia
//    (evento "server-broadcast", cifrado em Portal.tsx:85-102).
// 2. __sm5.injetar(modo, n) reenvia n cópias adulteradas da última mensagem válida.
// 3. __sm5.reenviar(i) reenvia, sem alteração, a i-ésima mensagem válida guardada (replay).
// 4. __sm5.relatorio() devolve o registro em JSON (não inclui o ID da sala nem a chave).
(() => {
  const socket = window.collab.portal.socket;
  const emitOriginal = socket.emit.bind(socket);
  const TAG = 16;
  const sm5 = (window.__sm5 = { validas: [], registro: [], adulteradas: 0 });

  socket.emit = (evento, ...args) => {
    if (evento === "server-broadcast") {
      const [sala, buf, iv] = args;
      sm5.validas.push({
        sala,
        buf: new Uint8Array(buf.slice(0)),
        iv: new Uint8Array(iv),
        hora: new Date().toISOString(),
      });
      if (sm5.validas.length > 50) sm5.validas.shift();
    }
    return emitOriginal(evento, ...args);
  };

  const sortear = (min, max) => min + Math.floor(Math.random() * (max - min));
  const inverterBit = (bytes, inicio, fim) => {
    const copia = new Uint8Array(bytes);
    const byte = sortear(inicio, fim);
    const bit = sortear(0, 8);
    copia[byte] ^= 1 << bit;
    return { copia, detalhe: `byte ${byte}, bit ${bit}` };
  };

  const MODOS = {
    "bit-cifrado": (m) => {
      const r = inverterBit(m.buf, 0, m.buf.length - TAG);
      return { buf: r.copia, iv: m.iv, detalhe: r.detalhe };
    },
    "bit-tag": (m) => {
      const r = inverterBit(m.buf, m.buf.length - TAG, m.buf.length);
      return { buf: r.copia, iv: m.iv, detalhe: r.detalhe };
    },
    "bit-iv": (m) => {
      const r = inverterBit(m.iv, 0, m.iv.length);
      return { buf: m.buf, iv: r.copia, detalhe: `IV ${r.detalhe}` };
    },
    truncar: (m) => {
      const k = sortear(1, 17);
      return { buf: m.buf.slice(0, m.buf.length - k), iv: m.iv, detalhe: `-${k} bytes` };
    },
    "iv-de-outra-msg": (m) => {
      const outra = [...sm5.validas].reverse().find((v) => v.iv.some((b, i) => b !== m.iv[i]));
      if (!outra) throw new Error("preciso de 2 mensagens válidas com IVs diferentes: desenhe mais um elemento");
      return { buf: m.buf, iv: new Uint8Array(outra.iv), detalhe: `IV de ${outra.hora}` };
    },
  };

  sm5.injetar = (modo, n = 1) => {
    if (!MODOS[modo]) throw new Error(`modo inválido; use: ${Object.keys(MODOS).join(", ")}`);
    const base = sm5.validas[sm5.validas.length - 1];
    if (!base) throw new Error("nenhuma mensagem válida guardada: desenhe algo antes");
    for (let i = 0; i < n; i++) {
      const { buf, iv, detalhe } = MODOS[modo](base);
      emitOriginal("server-broadcast", base.sala, new Uint8Array(buf).buffer, new Uint8Array(iv));
      sm5.adulteradas++;
      sm5.registro.push({ n: sm5.adulteradas, hora: new Date().toISOString(), modo, detalhe });
    }
    console.log(`injetadas ${n} (${modo}); total adulteradas: ${sm5.adulteradas}`);
  };

  sm5.reenviar = (indice = 0) => {
    const m = sm5.validas[indice];
    if (!m) throw new Error(`não há mensagem válida no índice ${indice}`);
    emitOriginal("server-broadcast", m.sala, new Uint8Array(m.buf).buffer, new Uint8Array(m.iv));
    sm5.registro.push({ n: "-", hora: new Date().toISOString(), modo: "replay", detalhe: `mensagem de ${m.hora}` });
    console.log(`replay da mensagem válida de ${m.hora} (fora da taxa)`);
  };

  sm5.relatorio = () =>
    JSON.stringify(
      { janela: "A", adulteradas: sm5.adulteradas, validasGuardadas: sm5.validas.length, registro: sm5.registro },
      null,
      2,
    );

  console.log("S-M5 janela A pronta. Desenhe 2 elementos para guardar mensagens válidas.");
})();
