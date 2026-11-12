# Evidência S-M4 — Dados persistidos localmente sem criptografia

## 1. Identificação

| Campo | Valor |
| --- | --- |
| Métrica | S-M4 — Dados persistidos localmente sem criptografia |
| Objetivo | O1 — Proteção das informações e controle de acesso |
| Questão (S-Q) | S-Q2 — É possível controlar quem acessa um desenho compartilhado? Confidencialidade |
| Tarefa do plano | [Issue #57](https://github.com/FCTE-Qualidade-de-Software-1/2026-2_T02_ADA_LOVELACE/issues/57); Tabela 6 do [roteiro GQM](../../../docs/analise/roteiro.md) |
| Responsável | Renato Araújo Gameiro (`renatoyx`), coleta assistida por agente |
| Data(s) da coleta | 2026-11-12; coleta final entre 14:30:37 e 14:31:21, America/Sao_Paulo (UTC−03:00) |
| Revisado por | Pendente de revisão por outro integrante |
| Versão | Excalidraw oficial [`e7b534668a60add7f725531f3c9abf32508c7b4e`](https://github.com/excalidraw/excalidraw/commit/e7b534668a60add7f725531f3c9abf32508c7b4e), detached HEAD, arquivos rastreados sem alterações |
| Ambiente | Windows 11 Home Single Language 10.0.26200; Node.js 22.22.3; Corepack 0.34.6; Yarn 1.22.22; Vite 5.0.12; Playwright 1.58.2; Google Chrome 157.0.8103.51 headless, inglês, 1366 × 900 |
| Origem examinada | `http://127.0.0.1:3013/`; sem sala compartilhada ou login; contexto de teste novo, sem perfil pessoal |
| IA | Servidor falso do grupo em `http://localhost:3016`; resposta fixa, sem uso do serviço real |

## 2. O que foi medido

Se dados pertinentes ao desenho e aos recursos associados permanecem no `localStorage` ou no IndexedDB em formato recuperável sem decifragem da aplicação. A medição é binária, e não uma proporção: basta comprovar persistência pertinente sem cifra para responder **Sim**.

Foram examinados separadamente cena, estado da interface, biblioteca, imagem e histórico de Texto para diagrama. Preferências, idioma e timestamps não foram contados como se fossem conteúdo de cena. O resultado não mede acesso remoto, compartilhamento efetivo, segurança do sistema operacional ou proteção física do dispositivo.

## 3. Procedimento

1. Executar `git fetch origin` antes de modificar arquivos. A primeira tentativa falhou com `curl 56`/`early EOF`; repetir com HTTP/1.1 funcionou. A árvore estava limpa em `main` (`3dbefce`), 43 commits atrás de `origin/main` (`da62b70ff0237079ab774dd1ab3e0e16edd77fe0`). Criar `feat/seguranca-sm4-armazenamento-local` dessa referência remota, preservando `main`. A identidade configurada era `renatoyx`; o e-mail coincide com os commits de Renato Araújo Gameiro na S-M3. Não alterar a configuração nem alegar nova verificação de e-mail no GitHub.
2. Ler a issue #57 completa e o [comentário de João Pedro](https://github.com/FCTE-Qualidade-de-Software-1/2026-2_T02_ADA_LOVELACE/issues/57#issuecomment-6747876882), o roteiro, o template, as evidências [S-M1](../S-M1/S-M1_mensagens-cifradas.md) e [S-M2](../S-M2/S-M2_chave-enviada-servidor.md), e a S-M3 na branch remota do [PR #91](https://github.com/FCTE-Qualidade-de-Software-1/2026-2_T02_ADA_LOVELACE/pull/91). Reaproveitar o isolamento local e as configurações de endpoints, sem reutilizar resultados como observações novas. Consultar o [ambiente do grupo](../../ambiente/ambiente-local.md) e o [simulador de IA](../../ambiente/servidor-ia-falso.mjs).
3. Conferir arquivos dos PRs abertos #87, #88, #89, #90 e #91 pelo conector GitHub: nenhum altera esta pasta. O #89 altera navegação; os demais adicionam evidências/planos de outras métricas. Não alterar GitPage, consolidação, planos ou outras issues.
4. Os caminhos temporários e o checkout da S-M3 não existiam neste ambiente. Clonar o repositório oficial, fixar o SHA completo acima e instalar pelo lockfile original. Desabilitar scripts de instalação; após falha de rede, repetir com IPv4 e quatro conexões. Confirmar SHA256 do lockfile e `git diff --exit-code` sem alterações. Criar somente `.env.development.local`, ignorado pelo Git, com endpoints locais e tracking desligado.
5. Iniciar Vite e o servidor falso do grupo. Executar E1. O coletor usa um contexto limpo do Chrome, sem credenciais; bloqueia destinos HTTP externos e faz a inspeção por APIs do navegador, equivalentes à leitura de Application no DevTools. Não escreve diretamente em `localStorage`/IndexedDB. A inspeção abre apenas bancos existentes e usa transações `readonly`.
6. Registrar `initial` após carregar o app: `excalidraw=[]`; três bancos existem, todos com stores vazios. As seis chaves iniciais de `localStorage` já foram criadas pelo próprio carregamento. Não se trata de conteúdo preexistente de usuário.
7. Pela interface: tecla **R**, arrastar de (420,280) a (720,430); Escape; **T**, clicar em (450,330), digitar `CENA-FICTICIA-SM4-20261112`, Escape. Aguardar 2,5 s e registrar `scene` e E3. Reconhecer os dois elementos e o texto no JSON de `excalidraw`, sem chave ou decifragem.
8. Recarregar e registrar `scene-reload`. Fechar a aba, abrir a mesma origem no mesmo contexto e registrar `scene-reopen-tab`. Confirmar texto e IDs dos dois elementos; não exigir igualdade byte a byte, pois a restauração normaliza `boundElements`.
9. **Ctrl+A**, botão direito em (500,350), **Add to library**. Registrar `library`: um item com dois elementos em `libraryData`. Esse objeto é uma cópia da seleção para biblioteca, não a cena corrente completa.
10. Escape; **9**, selecionar o SVG fictício E5 pelo seletor HTML de arquivos e clicar em (850,550). Registrar `image`: terceiro elemento na cena, com `fileId`, e um arquivo no `files-db`. O Chrome headless usa o fallback de `<input type=file>`: o coletor remove `showOpenFilePicker` antes do carregamento, sem mudar o código de persistência. O SVG é sanitizado pelo app; sua URL base64 pode ser decodificada sem chave, conforme E7.
11. **Ctrl+Shift+P**, pesquisar **Text to diagram**, Enter; preencher `PROMPT-FICTICIO-SM4: pedido de teste sem dados pessoais` e clicar em enviar. Aguardar 6 s. Registrar `ttd` e E4: um chat com mensagem de usuário e resposta Mermaid fixa do servidor falso. O log E6 confirma um POST local. Não clicar em **Insert**: o histórico não foi confundido com elementos da cena.
12. Recarregar, aguardar 2,5 s e registrar `all-reload` e E8. Verificar biblioteca, imagem e chat, além da cena. E7 verifica os dados coletados sem repetir a coleta. Os horários do JSON estão em UTC (`Z`); subtrair três horas para o horário local.

### 3.1 Comandos executados

Na raiz do repositório da disciplina:

```powershell
git fetch origin
git -c http.version=HTTP/1.1 fetch origin
git status -sb
git branch -avv
git rev-list --left-right --count main...origin/main
git config --show-origin user.name
git config user.email
git switch -c feat/seguranca-sm4-armazenamento-local origin/main
git clone --filter=blob:none --no-checkout https://github.com/excalidraw/excalidraw.git "$env:TEMP/sm4-e7b5346-20261112"
```

No checkout oficial temporário:

```powershell
git checkout --detach e7b534668a60add7f725531f3c9abf32508c7b4e
corepack.cmd yarn install --frozen-lockfile --ignore-scripts --non-interactive
$env:NODE_OPTIONS='--dns-result-order=ipv4first --no-network-family-autoselection'
corepack.cmd yarn install --frozen-lockfile --ignore-scripts --non-interactive --network-concurrency 4 --network-timeout 30000
git rev-parse HEAD
git status --short
git diff --exit-code
Get-FileHash yarn.lock
```

Conteúdo do `.env.development.local` na raiz do checkout oficial:

```dotenv
VITE_APP_FIREBASE_CONFIG={}
VITE_APP_BACKEND_V2_GET_URL=http://127.0.0.1:9999/
VITE_APP_BACKEND_V2_POST_URL=http://127.0.0.1:9999/post/
VITE_APP_AI_BACKEND=http://localhost:3016
VITE_APP_WS_SERVER_URL=http://127.0.0.1:3014
VITE_APP_ENABLE_TRACKING=false
VITE_APP_DISABLE_SENTRY=true
VITE_APP_ENABLE_ESLINT=false
VITE_APP_DISABLE_PREVENT_UNLOAD=true
VITE_APP_PORT=3013
```

Em terminais separados, no `excalidraw-app/` do checkout oficial e na raiz da disciplina, respectivamente:

```powershell
node ../node_modules/vite/bin/vite.js --host 127.0.0.1 --port 3013 --strictPort
node evidencias/ambiente/servidor-ia-falso.mjs
```

Coleta, inspeção do código e validação, na raiz da disciplina:

```powershell
node evidencias/seguranca/S-M4/S-M4_coleta_2026-11-12.cjs "$env:TEMP/sm4-e7b5346-20261112"
node evidencias/seguranca/S-M4/S-M4_verificar_2026-11-12.cjs
git -C "$env:TEMP/sm4-e7b5346-20261112" grep -n -E 'localStorage\.(setItem|getItem)|createStore\(' -- excalidraw-app ':!*test*'
git diff --check
& "$env:TEMP/sm4-mkdocs-20261112/Scripts/python.exe" -m mkdocs build --strict --site-dir "$env:TEMP/sm4-site-20261112"
```

Saída relevante (mais detalhes e falhas de preparação em E10):

```text
HEAD e7b534668a60add7f725531f3c9abf32508c7b4e
yarn.lock SHA256 3a40118db6c7a8d9038957d2437a7c0c52e7d882586b79739ce49660d6352196
Yarn: Done in 215.48s. Ignored scripts due to flag.
git status --short / git diff --exit-code: sem alterações / exit 0
VITE v5.0.12; http://127.0.0.1:3013/
Biblioteca: 1 registro, 1 item, 2 elementos legíveis; igual após reload
TTD: 1 chat, 2 mensagens legíveis; iguais após reload; resposta de servidor falso
Resultado S-M4: Sim. Tabela 6: 0/2; nível 1 não se aplica.
MkDocs: Documentation built in 13.07 seconds (primeira validação).
```

## 4. Evidências

### 4.1 Trechos de código

Caminhos relativos à raiz do checkout oficial no SHA fixado. E9 conserva os arquivos abaixo com numeração de linhas; a busca E11 distingue armazenamento e outras ocorrências de `createStore` (por exemplo, Jotai não é IndexedDB).

| # | Arquivo:linhas | O que mostra |
| --- | --- | --- |
| C1 | `excalidraw-app/app_constants.ts:39-53` | Nomes das chaves, prefixos de bancos e chave legada da biblioteca |
| C2 | `excalidraw-app/data/LocalData.ts:73-98` | Serializa elementos não excluídos e estado filtrado em JSON, diretamente em `localStorage` |
| C3 | `excalidraw-app/data/localStorage.ts:37-75` | Recupera cena e estado por `getItem` e `JSON.parse` |
| C4 | `excalidraw-app/data/LocalData.ts:49`, `:176-205`, `:212-231` | Imagens: `files-db/files-store`, leitura por `getMany`, gravação direta de `fileData`, atualização de `lastRetrieved` |
| C5 | `excalidraw-app/data/LocalData.ts:236-262` | Biblioteca: `excalidraw-library-db/excalidraw-library-store`, chave `libraryData`, objeto passado a `set` |
| C6 | `excalidraw-app/data/TTDStorage.ts:13-20`, `:26-48` | Histórico: `excalidraw-ttd-chats-db/excalidraw-ttd-chats-store`, chave `ttdChats`, leitura/escrita de objetos por idb-keyval |
| C7 | `excalidraw-app/data/localStorage.ts:11-34` | Nome de colaboração em JSON sob `excalidraw-collab`; apenas inferência pelo código, fluxo não exercitado |
| C8 | `excalidraw-app/data/tabSync.ts:12-25` | `version-dataState` e `version-files` são timestamps de sincronização, não conteúdo do desenho |
| C9 | `excalidraw-app/components/AI.tsx:154-171` | Endpoint de Texto para diagrama e uso de `TTDIndexedDBAdapter` |
| C10 | `excalidraw-app/data/LocalData.ts:266-284` | `excalidraw-library` no localStorage é legado para migração, não o armazenamento atual observado |

```ts
// C2: excalidraw-app/data/LocalData.ts:90-97
localStorage.setItem(
  STORAGE_KEYS.LOCAL_STORAGE_ELEMENTS,
  JSON.stringify(getNonDeletedElements(elements)),
);
localStorage.setItem(
  STORAGE_KEYS.LOCAL_STORAGE_APP_STATE,
  JSON.stringify(_appState),
);
```

```ts
// C4: excalidraw-app/data/LocalData.ts:223-224
await set(id, fileData, filesStore);
savedFiles.set(id, fileData);

// C6: excalidraw-app/data/TTDStorage.ts:43-45
static async saveChats(chats: SavedChats): Promise<void> {
  try {
    await set(TTDIndexedDBAdapter.key, chats, TTDIndexedDBAdapter.store);
```

Os trechos sustentam a interpretação das observações; a conclusão não depende apenas de uma busca por palavras como `encrypt`. A cifra de colaboração e de arquivos remotos analisada na S-M1 não foi transferida por suposição para os caminhos locais.

### 4.2 Arquivos de apoio

Todos os arquivos abaixo estão nesta pasta. As três capturas pertencem à coleta final, no mesmo SHA/origem/contexto identificado na seção 1. Prints mostram a interface; a comprovação do armazenamento está no JSON E2, não apenas na aparência do canvas.

| # | Arquivo | Tipo | O que mostra |
| --- | --- | --- | --- |
| E1 | [S-M4_coleta_2026-11-12.cjs](S-M4_coleta_2026-11-12.cjs) | Coletor | Ações reais da interface, isolamento e inspeção somente de leitura |
| E2 | [S-M4_inspecao_2026-11-12.json](S-M4_inspecao_2026-11-12.json) | Inspeção bruta | Oito snapshots com chaves, valores, bancos/stores e horários; coleta final sem erros |
| E3 | [S-M4_cena_2026-11-12.png](S-M4_cena_2026-11-12.png) | Captura | Retângulo e texto fictício antes de recarregar |
| E4 | [S-M4_ia-falsa_2026-11-12.png](S-M4_ia-falsa_2026-11-12.png) | Captura | Prompt fictício, resposta fixa e prévia; não prova geração pela IA real |
| E5 | [S-M4_imagem-ficticia_2026-11-12.svg](S-M4_imagem-ficticia_2026-11-12.svg) | Fixture | SVG de entrada criado por código, sem conteúdo externo |
| E6 | [S-M4_servidor-ia-falso_2026-11-12.txt](S-M4_servidor-ia-falso_2026-11-12.txt) | Log transcrito | POST local observado, 98 bytes, uma mensagem |
| E7 | [S-M4_verificacao_2026-11-12.txt](S-M4_verificacao_2026-11-12.txt) e [verificador](S-M4_verificar_2026-11-12.cjs) | Verificação | Marcador/IDs, igualdade de biblioteca/chat, imagem decodificada sem chave |
| E8 | [S-M4_apos-recarregar_2026-11-12.png](S-M4_apos-recarregar_2026-11-12.png) | Captura | Cena e imagem restauradas após reload; o modal TTD não precisa ficar aberto para o histórico persistir |
| E9 | [S-M4_codigo_2026-11-12.txt](S-M4_codigo_2026-11-12.txt) | Fonte numerada | Seis arquivos oficiais relevantes para C1–C10 |
| E10 | [S-M4_ambiente_2026-11-12.txt](S-M4_ambiente_2026-11-12.txt) | Registro de execução | Versões, comandos, lockfile, preparação e falhas corrigidas |
| E11 | [S-M4_inventario-codigo_2026-11-12.txt](S-M4_inventario-codigo_2026-11-12.txt) | Busca | Ocorrências de acesso ao localStorage e criação de stores no cliente |
| E12 | [S-M4_inspecao-preliminar_2026-11-12.json](S-M4_inspecao-preliminar_2026-11-12.json) e [segunda tentativa](S-M4_inspecao-preliminar2_2026-11-12.json) | Inspeções preliminares | Limites da automação: seletor nativo e localizadores de TTD; não são contados como execuções finais bem-sucedidas |
| E13 | [S-M4_controles_2026-11-12.txt](S-M4_controles_2026-11-12.txt) | Texto DOM | Controles presentes após o reload final; não descreve conteúdo do canvas |

### 4.3 Buscas sem resultado

| O que se procurou | Onde / procedimento | Resultado e limite |
| --- | --- | --- |
| Dados anteriores de cena, imagem, biblioteca ou chat | Snapshot `initial` de E2, `localStorage.excalidraw` e todos os stores dos três bancos existentes | Cena vazia e zero registros; preferências/estado iniciais existem |
| Chave `excalidraw-collab`, `excalidraw-debug` e biblioteca legada no localStorage | Todas as chaves de todos os snapshots de E2 | Ausentes no ensaio; os fluxos correspondentes não foram exercitados |
| Requisições HTTP externas durante a coleta final | Interceptação de requests no contexto de E1; `blockedRequests` de E2 | Lista vazia; nenhum destino externo interceptado. Não é captura de todo o tráfego do SO ou do navegador |
| Checkout anterior da S-M3 | Caminhos exatos documentados no PR #91 | Não existiam; ambiente recriado no SHA exigido, sem usar versão recente como substituta |

## 5. Resultado

### 5.1 Dados brutos

| Armazenamento / origem | Finalidade e dados efetivamente encontrados | Persistência observada | Classificação |
| --- | --- | --- | --- |
| localStorage `excalidraw`, origem `127.0.0.1:3013` | JSON com retângulo e texto; depois três elementos, incluindo imagem com `fileId`. Texto exato `CENA-FICTICIA-SM4-20261112`, IDs, coordenadas, estilos e propriedades | Dois elementos após reload e reabertura de aba; três após reload final | Dados da cena legíveis sem decifragem |
| localStorage `excalidraw-state`, mesma origem | JSON com preferências/estado filtrado, nome fictício automático `Untitled-2026-11-12-1430`, zoom, cores e IDs selecionados | Existe desde `initial` e após reload | Estado do app, não corpo da cena; sem cifra nesse caminho |
| IndexedDB `excalidraw-library-db` / `excalidraw-library-store` / `libraryData` | Um objeto com `libraryItems`: um item `unpublished`, dois elementos e o marcador da seleção | Igual entre `library` e `all-reload` | Conteúdo de biblioteca legível; cópia independente da cena |
| IndexedDB `files-db` / `files-store` / `6c6b5408f59187a7c6db92cb60101053f0a62483` | Um objeto: `mimeType=image/svg+xml`, `id`, `dataURL`, `created`, `lastRetrieved`; `fileId` da imagem na cena referencia essa chave | Mesmo `dataURL` após reload; `lastRetrieved` atualizado | Base64 é codificação. E7 recupera `<text ...>IMAGEM-FICTICIA-SM4</text>` sem chave; não é cifra |
| IndexedDB `excalidraw-ttd-chats-db` / `excalidraw-ttd-chats-store` / `ttdChats` | Um array com um chat: título, IDs, timestamps, prompt fictício e resposta Mermaid fixa do simulador, duas mensagens | Igual entre `ttd` e `all-reload` | Histórico de IA legível; não é a cena corrente e não foi inserido no canvas |
| localStorage `i18nextLng`, `excalidraw-theme`, `version-files`, `version-dataState` | Idioma, tema e timestamps | Presentes desde `initial` e após reload | Metadados/preferências; não usados como prova de conteúdo de cena |
| `excalidraw-collab` (código C7), `excalidraw-debug`, biblioteca legada (C10) | Nenhum valor observado | Não avaliada | Somente inventário estático; não inventar coleta |
| sessionStorage | Nenhum registro em todos os snapshots | Vazio | Não fundamenta a pontuação |

O comentário da issue cita o prefixo `excalidraw-ttd-chats`; o banco efetivo é **`excalidraw-ttd-chats-db`**, como demonstram C6 e E2. IndexedDB armazena objetos estruturados, não necessariamente strings JSON: a serialização no arquivo de evidência é feita pelo coletor, após ler objetos diretamente pela API.

### 5.2 Cálculo

`S-M4 = existe dado pertinente persistido sem criptografia da aplicação? = Sim`.

Cena em JSON e biblioteca já demonstram o resultado de forma independente; imagem e histórico complementam. Não se calcula percentual de registros cifrados. Pela Tabela 6, `Sim → 0 pontos`; normalização individual, se necessária: `0 ÷ 2 × 100 = 0%`.

### 5.3 Pontuação

| Valor medido | Regra da métrica | Pontuação (0–2) |
| --- | --- | --- |
| **Sim** | 2 = Não; 1 = Não se aplica; 0 = Sim | **0 — Insatisfatório** |

**Justificativa:** o texto e as propriedades da cena foram recuperados diretamente de `localStorage`, antes e depois de recarregar/reabrir a aba. Biblioteca e histórico foram recuperados do IndexedDB como objetos legíveis; o conteúdo da imagem foi recuperado por simples decodificação base64, sem decifragem. Os critérios da equipe não foram alterados.

## 6. Observações e limitações

- **Observação:** E2 contém os dados lidos no navegador. **Inferência pelo código:** C2–C6 explicam escrita e recuperação sem camada de cifra da aplicação nesses caminhos. **Limite:** o ensaio não é auditoria de todos os armazenamentos, modos ou serviços do Excalidraw.
- Foi utilizado somente o Chrome de teste, sem perfis pessoais, um contexto isolado por execução, sem contextos simultâneos. Duas tentativas preliminares foram encerradas e repetidas com contexto limpo, preservadas em E12. A primeira falhou no seletor nativo de imagem e em localizar o TTD; a segunda confirmou a imagem, mas usou seletor incorreto da paleta. A terceira, final, não registrou erros. Nenhum conteúdo de execução anterior foi introduzido na final.
- O contexto é não persistente do Playwright. Comprovou-se persistência entre reloads e entre fechamento/reabertura de **aba no mesmo contexto**; não foi testado encerramento/reinício completo do navegador, reinício do SO ou leitura forense dos arquivos no disco. Não se infere retenção indefinida.
- A origem é local e sem colaboração. Não foi observado o ciclo de cópias locais de uma cena compartilhada; o comportamento de pausa de salvamento durante colaboração não foi usado como resultado. A aplicação pública e backends de produção não foram testados.
- O servidor de IA é **falso**, conforme o grupo: resposta fixa independente do prompt. Testou-se persistência do histórico; não qualidade, privacidade ou segurança do serviço real. O texto “Nenhum conteúdo foi enviado a terceiros” aparece na resposta fixa e não é, por si só, comprovação de rede; o isolamento da coleta é documentado separadamente em E1/E2.
- JSON, objetos estruturados, SVG e base64 foram identificados pelos formatos e conteúdo. O ensaio não encontrou um payload opaco que precisasse ser classificado por aparência; não se presumiu que dado binário/comprimido é cifrado.
- Isolamento por origem/perfil do navegador restringe acesso normal entre sites, mas não constitui criptografia da aplicação. Não foi testado acesso por outro site, extensão ou usuário do SO. A criptografia de disco/sistema operacional pode proteger dados em repouso sob suas próprias condições; seu estado não foi inspecionado. Texto legível na API do navegador não prova que bytes estejam sem criptografia física no disco.
- Recomendações de criptografia dependem de gestão de chaves: guardar automaticamente a chave junto aos dados no mesmo armazenamento não resolve o cenário de acesso à origem/perfil. Não se demonstrou exploração, vazamento remoto, quebra de AES-GCM ou ausência de controle do dispositivo.
- Os arquivos de evidência ficam fora de `docs/`; o build MkDocs verifica o site existente, sem integrar automaticamente esta medição à GitPage. Revisão por outro integrante permanece pendente.

## 7. Achado (preencher só se a pontuação for 0)

| ID | Métrica | Evidência reproduzível | Pontuação | Impacto (Baixo/Médio/Alto) | Recomendação |
| --- | --- | --- | --- | --- | --- |
| A-S-M4 | S-M4 | E2/E7, C2–C6; repetir passos 6–12 para reconhecer o marcador da cena, cópia da biblioteca, SVG e prompt após reload | 0 | **Médio**, condicionado a acesso à origem/perfil de navegador já desbloqueado; conteúdo potencialmente sensível permanece recuperável localmente | Informar claramente o salvamento local e oferecer controle para não persistir/limpar cena, arquivos, biblioteca e histórico. Para um modo de proteção local por criptografia, adotar cifra autenticada e chave desbloqueada pelo usuário, com recuperação e limites documentados; avaliar separadamente isolamento do perfil e criptografia do dispositivo |

## 8. Contribuição para a questão

| Questão | Esta métrica indica que a hipótese foi | Por quê |
| --- | --- | --- |
| S-Q2 — É possível controlar quem acessa um desenho compartilhado? | **Parcialmente confirmada**, na dimensão de persistência local da hipótese negativa | A cena local e dados associados ficam recuperáveis sem decifragem da aplicação. Isso confirma a parcela sobre cópias locais, mas não demonstra acesso remoto indevido nem responde sozinho sobre senha, expiração ou revogação, que pertencem à S-M3 |

A S-M4 contribui com **0/2** para a composição futura de S-Q2. A conclusão sobre a questão deve considerar a S-M3 e suas limitações, após revisão; nenhuma consolidação ou nota global foi alterada nesta entrega.
