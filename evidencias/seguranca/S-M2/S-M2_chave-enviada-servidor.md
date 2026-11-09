# Evidência S-M2 : A chave é enviada ao servidor?

## 1. Identificação

| Campo | Valor |
| --- | --- |
| Métrica | S-M2 : A chave é enviada ao servidor? |
| Questão (S-Q) | S-Q1 : Confidencialidade |
| Tarefa do plano | T1.2 (ver `tarefas-seguranca-excalidraw.md`) |
| Versão | Excalidraw `e7b5346` (pasta `aplicacao/`); `@sentry/browser` 9.0.1 instalado |
| Ambiente | Instância local descrita em `evidencias/ambiente/ambiente-local.md`; navegador Helium 157.0.8103.38 (Chromium) |
| Responsável | João Pedro Lopes da Cruz |
| Data(s) da coleta | 2026-11-09 |
| Revisado por | <nome da outra pessoa> em <AAAA-MM-DD> |

## 2. O que foi medido

A pergunta é se a chave da sala (o trecho depois da vírgula em `#room=<id>,<chave>`) aparece em alguma requisição, frame de socket ou relatório de erro. O recorte é a sessão de colaboração da S-M1 (sala `1c620bd005c86aa4145f`, chave de teste descartável `4PEvIf6AAXyLIDijom8zMw`), mais a análise de código do link `#json` e do Sentry.

## 3. Procedimento

1. Buscar no código toda leitura de `location.hash` ou `location.href` e seguir cada uma até o destino (fetch, emit, Firebase, analytics, Sentry). Seguir também todos os usos de `roomKey`.
2. Usar a mesma sessão da S-M1 (passos 2 a 5 daquela evidência), com "Preserve log" ligado, por cerca de 20 minutos, e exportar o HAR da janela A.
3. Procurar a chave no HAR inteiro: no texto, nos frames binários decodificados, nos corpos, nos cabeçalhos (inclusive o `Referer`) e na forma base64.
4. Verificar no `sentry.ts` e no `@sentry/browser` instalado se algum dado enviado pelo Sentry guarda a URL com o `#`.

### 3.1 Comandos executados

```bash
# 2026-11-09, pasta aplicacao/
git grep -n "location\.hash\|location\.href" -- .
git grep -n "roomKey" -- excalidraw-app ':!*test*'
# 2026-11-09 16:09, HAR completo da janela A (26 MB, 864 entradas)
grep -c '4PEvIf6AAXyLIDijom8zMw' localhost.har
node <script de E2> localhost.har
```

```text
grep -c -> 0
frames binários decodificados: 4720 | chave em binário/postData/cabeçalhos: 0
chave em base64 no arquivo: false
Referer distintos: [ 'http://localhost:3001/' ]
```

Saídas completas: E1 e E2.

## 4. Evidências

### 4.1 Trechos de código

| # | Arquivo:linha | O que mostra |
| --- | --- | --- |
| C1 | `excalidraw-app/data/index.ts:131-164` | A chave nasce no navegador e só existe no `#` do link |
| C2 | `excalidraw-app/data/index.ts:282-285` | No `#json`, a chave vai para o `#`, com o comentário dos autores: "in order to never send it to the server" |
| C3 | `excalidraw-app/data/index.ts:207` | Para abrir um `#json`, o app pede ao backend só o ID |
| C4 | `excalidraw-app/collab/Collab.tsx:544-550` | O socket conecta só com a URL do servidor. A chave fica guardada no `Portal`. |
| C5 | `excalidraw-app/collab/Portal.tsx:93` e `data/firebase.ts:181`, `:213` | A `roomKey` só é usada para cifrar e decifrar, nunca como argumento de `emit` ou de `fetch` |
| C6 | `excalidraw-app/collab/Collab.tsx:720` e `:1050-1053` | O link completo fica no estado da tela (diálogo de compartilhamento, QR code, `navigator.share`) |
| C7 | `excalidraw-app/sentry.ts:5-18` | O Sentry só liga em `excalidraw.com`, `staging.excalidraw.com` ou `vercel.app`. Em localhost fica desligado. |
| C8 | `excalidraw-app/sentry.ts:39-42` | O `beforeSend` remove o `#` só de `event.request.url`. Não há `beforeBreadcrumb`. |
| C9 | `excalidraw-app/collab/Collab.tsx:512-516` | Ao criar a sala, o app faz `pushState` para `/#room=<id>,<chave>` |
| C10 | `node_modules/@sentry/browser/build/npm/esm/integrations/breadcrumbs.js:19`, `:295-328` e `@sentry/core/build/esm/utils-hoist/url.js:28` | O breadcrumb de navegação vem ligado por padrão e grava `to = relative`, que **inclui o fragmento `#`** |

```ts
// C8: excalidraw-app/sentry.ts:39-42
beforeSend(event) {
  if (event.request?.url) {
    event.request.url = event.request.url.replace(/#.*$/, "");
  }
```

```js
// C10: @sentry/core/build/esm/utils-hoist/url.js:28
relative: match[5] + query + fragment, // everything minus origin
```

### 4.2 Arquivos de apoio

| # | Arquivo | Tipo | O que mostra |
| --- | --- | --- | --- |
| E1 | `S-M2_buscas-chave-codigo_2026-11-09.txt` | saída de comando | As 21 ocorrências de `location.hash`/`href`, os usos de `roomKey` e os trechos do Sentry |
| E2 | `S-M2_busca-chave-har_2026-11-09.txt` | saída de comando | Busca da chave no HAR completo, com o script usado |
| E3 | `../S-M1/S-M1_S-M2_captura-reduzida_2026-11-09.har` | HAR | Socket, Firestore, IA e `#json` da mesma sessão. A chave também tem 0 ocorrências aqui. O HAR completo não foi versionado porque traz a API key do Firebase do grupo. |

### 4.3 Buscas sem resultado

| O que se procurou | Onde / comando | Resultado |
| --- | --- | --- |
| Chave em requisição, frame ou cabeçalho | HAR completo: texto, 4.720 frames binários decodificados, corpos, cabeçalhos e base64 (E2) | Nenhuma ocorrência |
| `#` no `Referer` | Cabeçalhos do HAR | Só `http://localhost:3001/` |
| URL lida e enviada por outra via | `git grep -n "document\.URL\|location\.toString\|String(window\.location"` | Nenhuma ocorrência |
| Limpeza de breadcrumbs | `git grep -n "beforeBreadcrumb" -- excalidraw-app/sentry.ts` | Nenhuma ocorrência |

## 5. Resultado

### 5.1 Dados brutos

| Leitura de `location.hash`/`href` | Destino | Sai do navegador? |
| --- | --- | --- |
| `excalidraw-app/App.tsx:195` | Compara a origem com a do `iframe` pai | Não |
| `App.tsx:228`, `:231`, `:250`, `:411`, `:576` | Interpretar `#json`, `#url` e `#room`. Só o ID vai ao backend (C3). | Não |
| `collab/Collab.tsx:720` | Estado da tela (C6) | Não |
| `data/index.ts:282` | Montar o link `#json` para o usuário (C2) | Não |
| `index.html:111`, `:116` | Redirecionar para o Excalidraw+ só quando **não** há `#` | Não |
| `packages/element/src/elementLink.ts:17` | Link de elemento copiado pelo usuário | Não |
| `packages/excalidraw/components/App.tsx:3717-3719` | Rolar a tela até o elemento do link | Não |
| `packages/excalidraw/data/library.ts:533`, `:539`, `:769-770` | Ler `#addLibrary` e o token da biblioteca | Não leva a chave da sala |
| `packages/excalidraw/subset/woff2/woff2-bindings.ts:162` | Caminho do script de fontes | Não |
| Sentry, breadcrumb de navegação (C9, C10) | Relatório de erro em produção | **Em tese, sim**. Desligado em localhost, não confirmado. |

### 5.2 Cálculo

Ocorrências da chave nas requisições e frames capturados: **0**. No código, nenhum caminho leva a chave a `fetch`, `emit`, Firebase ou analytics. O único caminho possível é o breadcrumb do Sentry, que é um risco teórico.

### 5.3 Pontuação

| Valor medido | Regra da métrica | Pontuação (0–2) |
| --- | --- | --- |
| Não (0 ocorrências; Sentry só como risco teórico) | 2 = Não; 0 = Sim | **2** |

**Justificativa:** a chave não aparece em nenhuma requisição capturada nem em nenhum envio do código. Pelo critério de T1.2, o risco do Sentry, sem confirmação por execução, mantém a nota 2 com observação.

## 6. Observações e limitações

- **Risco potencial (Sentry):** em produção, depois que o app cria uma sala (C9), um erro enviado ao Sentry pode levar no breadcrumb `navigation` o campo `to: "/#room=<id>,<chave>"` (C10), porque o `beforeSend` só limpa `event.request.url` (C8). Não foi confirmado em execução: o Sentry fica desligado em localhost (C7), e não se fez teste contra o Sentry real (restrição 1 do contexto). Recomendação: um `beforeBreadcrumb` que remova o `#` de `data.from` e `data.to`.
- O `Referer` não leva o `#`, como confirma o HAR. Em produção, o `vercel.json:19-20` ainda define `Referrer-Policy: origin`.
- A chave registrada nesta evidência é de uma sala de teste local, sem conteúdo real.

## 7. Achado (preencher só se a pontuação for 0)

Não se aplica (pontuação 2).

## 8. Contribuição para a questão

| Questão | Esta métrica indica que a hipótese foi | Por quê |
| --- | --- | --- |
| S-Q1 | confirmada nesta parte | A chave fica no `#` e não chega ao servidor de sala, ao Firebase, ao backend `#json` nem à IA. Vale a ressalva teórica do Sentry. |
