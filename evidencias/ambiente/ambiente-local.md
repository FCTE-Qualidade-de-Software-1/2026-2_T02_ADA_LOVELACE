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

A aplicação abre em `http://localhost:3001`. O `yarn install` termina com o
erro `.git can't be found` do `husky install`, que só instala ganchos de git
e não afeta a aplicação. Como `yarn start` repete a instalação e para nesse
erro, o servidor é iniciado com `yarn vite`.

## Verificação

* `http://localhost:3001` responde 200, e o módulo de colaboração usa
  `VITE_APP_WS_SERVER_URL = http://localhost:3002`.
* Dois clientes Socket.IO na mesma sala: o segundo é anunciado ao primeiro
  (`new-user`) e recebe o `server-broadcast` dele (`client-broadcast`).
* Sessão colaborativa em duas janelas do Helium (uma anônima): o desenho de
  uma janela aparece na outra, com o WebSocket para `localhost:3002`.

## Restrições

Os testes de adulteração atingem somente o servidor local
(`localhost:3002`). Mesmo em desenvolvimento, a aplicação usa serviços de
teste do Excalidraw (`json-dev.excalidraw.com` e o Firebase
`excalidraw-oss-dev`), que não devem ser alvo de alterações ou de carga.
