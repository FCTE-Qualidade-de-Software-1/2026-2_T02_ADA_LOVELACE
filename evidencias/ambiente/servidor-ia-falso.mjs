// Servidor de IA falso para a instância local do Excalidraw.
// Substitui o backend fechado (oss-ai.excalidraw.com) com respostas fixas,
// para que os fluxos de IA funcionem sem enviar conteúdo a terceiros.
//
// Uso: node evidencias/ambiente/servidor-ia-falso.mjs
//      LOG_BODY=1 node evidencias/ambiente/servidor-ia-falso.mjs  (mostra o corpo recebido)
//      PORT=3016 por padrão, o mesmo de VITE_APP_AI_BACKEND.

import { createServer } from "node:http";

const PORT = Number(process.env.PORT) || 3016;
const LOG_BODY = process.env.LOG_BODY === "1";

const MERMAID = `flowchart TD
  A[Pedido recebido pelo servidor de IA falso] --> B{Resposta fixa}
  B --> C[Nenhum conteúdo foi enviado a terceiros]
  B --> D[Ambiente local da avaliação]`;

const HTML = `<!doctype html>
<html><body style="font-family: sans-serif; padding: 24px">
  <h1>Servidor de IA falso</h1>
  <p>Resposta fixa do diagrama para código. Nenhum conteúdo foi enviado a terceiros.</p>
  <button>Botão de exemplo</button>
</body></html>`;

const ROUTES = {
  "/v1/ai/text-to-diagram/chat-streaming": MERMAID,
  "/v1/ai/diagram-to-code/generate-streaming": HTML,
};

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Accept",
  "Access-Control-Expose-Headers": "X-Ratelimit-Limit, X-Ratelimit-Remaining",
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function summarize(path, raw) {
  let info = `${raw.length} bytes`;
  try {
    const body = JSON.parse(raw);
    if (Array.isArray(body.messages)) info += `, ${body.messages.length} mensagem(ns)`;
    if (typeof body.image === "string") info += `, imagem de ${body.image.length} caracteres`;
    if (Array.isArray(body.texts)) info += `, ${body.texts.length} texto(s)`;
  } catch {
    info += ", corpo não é JSON";
  }
  console.log(`${new Date().toISOString()} POST ${path} (${info})`);
  if (LOG_BODY) console.log(raw);
}

async function stream(res, text) {
  res.writeHead(200, {
    ...CORS,
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    "X-Ratelimit-Limit": "100",
    "X-Ratelimit-Remaining": "99",
  });
  for (const delta of text.match(/[\s\S]{1,40}/g)) {
    res.write(`data: ${JSON.stringify({ type: "content", delta })}\n\n`);
    await sleep(50);
  }
  res.write(`data: ${JSON.stringify({ type: "done", finishReason: "stop" })}\n\n`);
  res.end("data: [DONE]\n\n");
}

createServer((req, res) => {
  if (req.method === "OPTIONS") {
    res.writeHead(204, CORS).end();
    return;
  }
  const text = ROUTES[req.url];
  if (req.method !== "POST" || !text) {
    res.writeHead(404, { ...CORS, "Content-Type": "application/json" })
      .end(JSON.stringify({ statusCode: 404, message: "Rota inexistente no servidor falso" }));
    return;
  }
  let raw = "";
  req.setEncoding("utf8");
  req.on("data", (chunk) => (raw += chunk));
  req.on("end", () => {
    summarize(req.url, raw);
    stream(res, text).catch((error) => console.error(error));
  });
}).listen(PORT, () => {
  console.log(`Servidor de IA falso em http://localhost:${PORT}`);
});
