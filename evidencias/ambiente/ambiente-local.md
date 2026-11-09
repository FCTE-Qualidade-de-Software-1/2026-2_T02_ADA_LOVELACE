# Ambiente de teste e instância local do Excalidraw

Instância local usada nas medições que não podem ser feitas no
excalidraw.com, como a adulteração (S-M5) e a edição simultânea (S-M6).
Preparada em 2026-11-09 (issue #36).

## Versões

| Item | Versão |
| --- | --- |
| Excalidraw (`aplicacao/`) | commit `e7b5346` do repositório oficial |
| Servidor de colaboração ([excalidraw-room](https://github.com/excalidraw/excalidraw-room)) | commit `03ff435` (2023-12-15) |
| Sistema operacional | Windows 11 Home 10.0.26200 |
| Node / Yarn | 24.12.0 / 1.22.22 |
| Docker | 29.6.1 |
| Vite (servidor de desenvolvimento) | 5.0.12 |
| Navegador | Helium 157.0.8103.38 (baseado no Chromium) |
| Firebase | projeto de teste do grupo `excalidraw-ada-lovelace`, só Firestore (`southamerica-east1`) |

## Como subir

O `excalidraw-room` não faz parte deste repositório: é clonado em uma pasta
ao lado dele e roda em Docker na porta 3002, a mesma de
`VITE_APP_WS_SERVER_URL` em `aplicacao/.env.development`.

```shell
# servidor de colaboração (fora deste repositório)
git clone https://github.com/excalidraw/excalidraw-room.git
cd excalidraw-room
git checkout 03ff435
docker build -t excalidraw-room:03ff435 .
docker run -d --name excalidraw-room -p 3002:80 excalidraw-room:03ff435

# aplicação
cd aplicacao
yarn install --frozen-lockfile
cd excalidraw-app
yarn vite
```

Antes de `yarn vite`, crie `aplicacao/.env.development.local` (não
versionado), que sobrescreve o `.env.development`:

```shell
VITE_APP_FIREBASE_CONFIG='<firebaseConfig do projeto do grupo, em JSON>'
VITE_APP_BACKEND_V2_GET_URL=http://localhost:9999/
VITE_APP_BACKEND_V2_POST_URL=http://localhost:9999/post/
VITE_APP_AI_BACKEND=http://localhost:3016
VITE_APP_WS_SERVER_URL=http://localhost:3002
VITE_APP_DISABLE_PREVENT_UNLOAD=true
```

O Firestore usa as regras de `aplicacao/firebase-project/firestore.rules`.
O Storage não foi criado, porque exige o plano pago: imagens não são
sincronizadas na sala. Os backends do link `#json` e da IA apontam para
portas sem serviço, então as requisições falham, mas o corpo fica visível no
DevTools.

A aplicação abre em `http://localhost:3001`.

### IA (opcional)

O backend de IA do Excalidraw (`oss-ai.excalidraw.com`) é fechado. Para que
"Texto para diagrama" e "Diagrama para código" funcionem localmente, há um
servidor falso, sem dependências, que devolve sempre o mesmo diagrama Mermaid
e o mesmo HTML na porta 3016 (`VITE_APP_AI_BACKEND`):

```shell
node evidencias/ambiente/servidor-ia-falso.mjs
LOG_BODY=1 node evidencias/ambiente/servidor-ia-falso.mjs  # mostra o corpo recebido
```

O terminal registra cada pedido recebido (rota, tamanho, número de mensagens
e de imagens). Para avaliar a qualidade das respostas da IA real, use o
excalidraw.com, que envia o conteúdo ao serviço do Excalidraw e tem limite
diário de pedidos. O `yarn install` termina com o
erro `.git can't be found` do `husky install`, que só instala ganchos de git
e não afeta a aplicação. Como `yarn start` repete a instalação e para nesse
erro, o servidor é iniciado com `yarn vite`.

## Verificação

* `http://localhost:3001` responde 200, e o módulo de colaboração usa
  `VITE_APP_WS_SERVER_URL = http://localhost:3002`.
* Dois clientes Socket.IO na mesma sala: o segundo é anunciado ao primeiro
  (`new-user`) e recebe o `server-broadcast` dele (`client-broadcast`).
* Firestore pela API REST: gravar e ler um documento em `scenes/` é
  permitido, e listar a coleção é negado (`PERMISSION_DENIED`).
* Ao iniciar uma sessão colaborativa, a cena é salva em `scenes/<id da sala>`
  com os campos `ciphertext`, `iv` e `sceneVersion`.
* Servidor de IA falso: as duas rotas respondem em SSE, com os cabeçalhos
  `X-Ratelimit-*` e a liberação de CORS exigidos pela aplicação.
* Sessão colaborativa em duas janelas do Helium (uma anônima): o desenho de
  uma janela aparece na outra, com o WebSocket para `localhost:3002`.

## Restrições

Os testes de adulteração atingem somente o servidor local
(`localhost:3002`) e o Firebase do grupo. O `.env.development` original
aponta para serviços de teste do Excalidraw (`json-dev.excalidraw.com` e o
Firebase `excalidraw-oss-dev`), por isso o `.env.development.local` acima é
obrigatório. As regras do Firestore permitem gravação sem login, como no
Excalidraw: o projeto do grupo deve ser excluído ao fim da avaliação.
