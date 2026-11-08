# Evidência S-M11 — Vulnerabilidades nas dependências

## 1. Identificação

| Campo | Valor |
| --- | --- |
| Métrica | S-M11 — Vulnerabilidades altas ou críticas nas dependências |
| Objetivo e questão | O2 — Identificação, responsabilização e riscos de segurança. S-Q6 — Resistência |
| Tarefa do plano | [Issue #61](https://github.com/FCTE-Qualidade-de-Software-1/2026-2_T02_ADA_LOVELACE/issues/61) |
| Responsável | Renato Araújo Gameiro |
| Data da coleta | 2026-11-08, fuso UTC−03:00 |
| Revisado por | Pendente de revisão por outro integrante |
| Versão | [`e7b534668a60add7f725531f3c9abf32508c7b4e`](https://github.com/excalidraw/excalidraw/commit/e7b534668a60add7f725531f3c9abf32508c7b4e) |
| Ambiente | Windows x64, PowerShell 7.6.9, Git 2.56.0.windows.2, Node.js 22.23.3, npm 10.9.9, Corepack 0.36.0, Yarn Classic 1.22.22 e Python 3.12.10 para a recontagem |

## 2. O que foi medido

Contagem de avisos de vulnerabilidades conhecidas em dependências da aplicação web gratuita. A auditoria usou o grafo do monorepo resolvido a partir do `yarn.lock` v1 original. Para pontuar a S-M11, o recorte é o das dependências ligadas ao cliente web por meio dos manifestos e do código do app e do editor. A análise também registra o grafo declarado e a consulta completa do monorepo.

A seção 2 do [roteiro GQM](../../../docs/analise/roteiro.md#2-produto-contexto-e-escopo) define o objeto como a aplicação web colaborativa e inclui seu uso no navegador. Como O2/S-Q6 pergunta pela resistência dessa aplicação, a pontuação usa as dependências ligadas ao cliente web no commit fixado. A consulta completa é a base para verificar a cobertura do levantamento, e a contagem do grafo declarado mostra o efeito das exclusões. Os dois recortes complementares estão na seção 5.1.

## 3. Procedimento

1. Na raiz do checkout oficial, conferir o SHA e o `yarn.lock`. Usar o Yarn 1.22.22 declarado no manifesto raiz via Corepack. A auditoria resolve o grafo com o lockfile existente e os manifestos, sem etapa de instalação nem geração de lockfile.
2. Executar a consulta com os grupos `dependencies optionalDependencies`. Executar também a consulta sem filtro para observar o grafo do monorepo, incluindo ferramentas e exemplos. Preservar stdout, stderr e código de saída.
3. Contar cada GHSA uma vez por recorte, usando a severidade do campo `advisory.severity`. O CVE é um identificador complementar do mesmo aviso. Repetições por caminho, versão ou pacote não somam novos avisos. Quando faltar GHSA, o script admite o ID numérico do registro. Nesta coleta todos os avisos tinham GHSA.
4. Classificar os caminhos de `advisory.findings` na consulta filtrada. Para o cliente web, partir de `excalidraw-app` e do editor vinculado pelos aliases do Vite. Excluir as cadeias do build, as dos exemplos, o aviso sobre o próprio editor e as cadeias do SDK identificadas fora das entradas usadas pelo cliente web.
5. Conferir os caminhos com os manifestos e o código. Para Firestore e Engine.IO, ler as entradas publicadas nos tarballs das versões resolvidas, verificando o SHA-512 de cada tarball com o campo `integrity` do lockfile. A seção 4 lista as evidências.

### 3.1 Comandos executados

Na raiz do checkout oficial, com o cache do Corepack em pasta separada. No trecho, `$dir` aponta para a pasta onde são gravadas as saídas.

```powershell
git rev-parse HEAD
Get-FileHash yarn.lock -Algorithm SHA256
node --version
npm.cmd --version
corepack.cmd --version
corepack.cmd yarn --version

corepack.cmd yarn audit --json --groups 'dependencies optionalDependencies' 1> "$dir/yarn.stdout.jsonl" 2> "$dir/yarn.stderr.txt"
$LASTEXITCODE

corepack.cmd yarn audit --json 1> "$dir/yarn-full.stdout.jsonl" 2> "$dir/yarn-full.stderr.txt"
$LASTEXITCODE
```

| Consulta | Horário local | Código de saída | Resumo do Yarn |
| --- | --- | ---: | --- |
| Grupos de dependências | 19:18:36–19:18:45 | 30 | 368 dependências, 150 ocorrências de avisos |
| Monorepo completo | 19:19:25–19:19:29 | 30 | 1.209 dependências, 444 ocorrências de avisos |

As duas consultas retornaram `auditSummary` válido. O código 30 corresponde à presença de severidades baixa, moderada, alta e crítica (2 + 4 + 8 + 16). O stderr foi idêntico nas duas consultas, com três avisos sobre a resolução forçada de `strip-ansi@6.0.1` diante do intervalo `^7.0.1`. A rota legada respondeu nesta execução, então a condição para usar o OSV-Scanner não ocorreu. [Documentação do Yarn](https://classic.yarnpkg.com/lang/en/docs/cli/audit/) · [Implementação da consulta](https://github.com/yarnpkg/yarn/blob/v1.22.22/src/cli/commands/audit.js#L224-L249)

O SHA-256 do `yarn.lock` no checkout foi `3A40118DB6C7A8D9038957D2437A7C0C52E7D882586B79739CE49660D6352196` antes e depois da medição. Para repetir a classificação a partir das respostas gravadas, executar `python S-M11_recontagem.py` na pasta desta evidência.

## 4. Evidências

### 4.1 Trechos de código

| # | Arquivo no commit fixado | O que mostra |
| --- | --- | --- |
| C1 | [`package.json:4`](https://github.com/excalidraw/excalidraw/blob/e7b534668a60add7f725531f3c9abf32508c7b4e/package.json#L4-L10) e [`yarn.lock:2`](https://github.com/excalidraw/excalidraw/blob/e7b534668a60add7f725531f3c9abf32508c7b4e/yarn.lock#L2) | Yarn Classic, workspaces e formato do lockfile |
| C2 | [`excalidraw-app/package.json:28`](https://github.com/excalidraw/excalidraw/blob/e7b534668a60add7f725531f3c9abf32508c7b4e/excalidraw-app/package.json#L28-L56) e [`excalidraw-app/vite.config.mts:8`](https://github.com/excalidraw/excalidraw/blob/e7b534668a60add7f725531f3c9abf32508c7b4e/excalidraw-app/vite.config.mts#L8-L9) | Dependências diretas do app e plugins usados pelo Vite. `vite-plugin-html` aparece em `dependencies`, embora o uso observado seja de build |
| C3 | [`excalidraw-app/vite.config.mts:142`](https://github.com/excalidraw/excalidraw/blob/e7b534668a60add7f725531f3c9abf32508c7b4e/excalidraw-app/vite.config.mts#L142-L150) e [`packages/excalidraw/package.json:80`](https://github.com/excalidraw/excalidraw/blob/e7b534668a60add7f725531f3c9abf32508c7b4e/packages/excalidraw/package.json#L80-L118) | Alias para o editor local e dependências declaradas, incluindo `nanoid`, o conversor Mermaid e Sass |
| C4 | [`excalidraw-app/collab/Collab.tsx:529`](https://github.com/excalidraw/excalidraw/blob/e7b534668a60add7f725531f3c9abf32508c7b4e/excalidraw-app/collab/Collab.tsx#L529-L545) e [`yarn.lock:8610`](https://github.com/excalidraw/excalidraw/blob/e7b534668a60add7f725531f3c9abf32508c7b4e/yarn.lock#L8610-L8625) | Importação do cliente Socket.IO na colaboração e resolução de `socket.io-parser@4.2.4` |
| C5 | [`packages/excalidraw/components/App.tsx:886`](https://github.com/excalidraw/excalidraw/blob/e7b534668a60add7f725531f3c9abf32508c7b4e/packages/excalidraw/components/App.tsx#L886) e [`packages/excalidraw/components/App.clipboard.ts:211`](https://github.com/excalidraw/excalidraw/blob/e7b534668a60add7f725531f3c9abf32508c7b4e/packages/excalidraw/components/App.clipboard.ts#L211) | Chamada a `nanoid()` e importação do conversor Mermaid, que traz outra versão de `nanoid` |
| C6 | [`excalidraw-app/data/firebaseSDK.ts:7`](https://github.com/excalidraw/excalidraw/blob/e7b534668a60add7f725531f3c9abf32508c7b4e/excalidraw-app/data/firebaseSDK.ts#L7-L15) e E5 | O app importa `firebase/app`, `firebase/firestore` e `firebase/storage`. A entrada ESM de navegador do Firestore usa WebChannel, enquanto a entrada Node.js importa gRPC e `proto-loader` |
| C7 | [`excalidraw-app/app-language/language-detector.ts:2`](https://github.com/excalidraw/excalidraw/blob/e7b534668a60add7f725531f3c9abf32508c7b4e/excalidraw-app/app-language/language-detector.ts#L2) | Importação da dependência que traz `@babel/runtime` |

### 4.2 Arquivos de apoio

| # | Arquivo | Conteúdo |
| --- | --- | --- |
| E1 | [S-M11_yarn-grupos_2026-11-08.jsonl.gz](S-M11_yarn-grupos_2026-11-08.jsonl.gz) | Stdout original, compactado sem perda, da consulta com grupos |
| E2 | [S-M11_yarn-completo_2026-11-08.jsonl.gz](S-M11_yarn-completo_2026-11-08.jsonl.gz) | Stdout original, compactado sem perda, da consulta completa |
| E3 | [S-M11_yarn-stderr_2026-11-08.txt](S-M11_yarn-stderr_2026-11-08.txt) | Stderr original, idêntico nas duas consultas |
| E4 | [S-M11_recontagem.py](S-M11_recontagem.py) | Valida os resumos, conta os avisos por GHSA e imprime os caminhos do recorte web |
| E5 | [S-M11_entradas-browser_2026-11-08.txt](S-M11_entradas-browser_2026-11-08.txt) | Entradas ESM conferidas em tarballs com a integridade do lockfile |

Para reproduzir E5, obter os tarballs pelos URLs do campo `resolved` no lockfile, removendo o fragmento do URL, conferir o campo `integrity` e inspecionar `package/package.json` e os arquivos enumerados no registro. Foram usadas as versões `firebase@11.3.1`, `@firebase/firestore@4.7.8`, `engine.io-client@6.5.4` e `socket.io-client@4.7.2`.

### 4.3 Buscas sem resultado

A listagem de arquivos versionados no checkout fixado não contém `package-lock.json`, `npm-shrinkwrap.json` nem `pnpm-lock.yaml`. A busca por `firebase/(database|compat)` e `@firebase/(database|firestore-compat)` em `excalidraw-app` e `packages` não encontrou referências.

## 5. Resultado

### 5.1 Dados brutos e contagens por recorte

| Conjunto | Info | Baixa | Moderada | Alta | Crítica | Total |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Monorepo completo, ocorrências do Yarn | 0 | 36 | 161 | 234 | 13 | 444 |
| Monorepo completo, avisos únicos | 0 | 16 | 65 | 66 | 10 | 157 |
| Consulta com grupos, ocorrências do Yarn | 0 | 8 | 52 | 81 | 9 | 150 |
| Consulta com grupos, avisos únicos | 0 | 6 | 30 | 42 | 6 | 84 |
| Avisos únicos presentes apenas na consulta completa | 0 | 10 | 35 | 24 | 4 | 73 |
| Exemplos, avisos com caminhos exclusivos a esses workspaces | 0 | 4 | 17 | 15 | 4 | 40 |
| Build do app ou do editor, avisos com pelo menos um caminho de build | 0 | 1 | 3 | 13 | 0 | 17 |
| Grafo declarado de dependências do app e editor, excluído o build | 0 | 1 | 9 | 14 | 2 | 26 |
| Cadeias de SDK fora das entradas do cliente web | 0 | 1 | 7 | 9 | 2 | 19 |
| **Dependências no recorte do cliente web** | **0** | **0** | **2** | **5** | **0** | **7** |

Os recortes não são aditivos. Um aviso pode atingir versões em mais de um caminho. A linha do monorepo completo usa o grafo que o Yarn montou com o lockfile raiz. A unidade de análise é o grafo resolvido, e os lockfiles próprios de `dev-docs` e `examples/with-nextjs` ficaram fora da consulta. O aviso sobre `@excalidraw/excalidraw` como pacote publicado foi registrado na saída bruta e excluído da pontuação de dependências.

O recorte do cliente web reteve os caminhos para `@babel/runtime@7.26.9`, `nanoid@3.3.3`, `nanoid@4.0.2` e `socket.io-parser@4.2.4`. A análise estática manteve no recorte as entradas do Firebase importadas pelo app. O Firestore para navegador usa WebChannel. O caminho Node.js do Firestore, que traz gRPC, `proto-loader` e `protobufjs`, ficou fora da pontuação do cliente web. A busca no código também deixou fora os caminhos do Realtime Database e dos módulos de compatibilidade, incluindo `faye-websocket` e `websocket-driver`. O Engine.IO mapeia o construtor baseado em `ws` para o WebSocket do navegador. Os dois críticos excluídos vieram de `protobufjs` e `websocket-driver`. Essas exclusões descrevem as entradas e os caminhos resolvidos no código, conforme C6 e E5. A composição do bundle implantado exigiria evidência do artefato de produção.

| Severidade Yarn | Pacote e versões no recorte | Aviso |
| --- | --- | --- |
| Alta | `nanoid` 3.3.3 e 4.0.2 | [GHSA-28wg-ghj8-5hjv](https://github.com/advisories/GHSA-28wg-ghj8-5hjv) |
| Alta | `nanoid` 3.3.3 e 4.0.2 | [GHSA-2v37-7h3g-55p8](https://github.com/advisories/GHSA-2v37-7h3g-55p8) |
| Alta | `nanoid` 3.3.3 e 4.0.2 | [GHSA-xwg4-73v4-xw9w](https://github.com/advisories/GHSA-xwg4-73v4-xw9w) |
| Alta | `socket.io-parser` 4.2.4 | [GHSA-677m-j7p3-52f9](https://github.com/advisories/GHSA-677m-j7p3-52f9) |
| Alta | `socket.io-parser` 4.2.4 | [GHSA-2m8v-j782-fhvr](https://github.com/advisories/GHSA-2m8v-j782-fhvr) |
| Moderada | `@babel/runtime` 7.26.9 | [GHSA-968p-4wvh-cqc8](https://github.com/advisories/GHSA-968p-4wvh-cqc8) |
| Moderada | `nanoid` 3.3.3 e 4.0.2 | [GHSA-mwcw-c2x4-8c55](https://github.com/advisories/GHSA-mwcw-c2x4-8c55) |

### 5.2 Cálculo

S-M11 = avisos altos + avisos críticos no recorte do cliente web = 5 + 0 = **5 avisos**.

### 5.3 Pontuação

| Valor medido | Critério do [roteiro GQM](../../../docs/analise/roteiro.md) | Pontuação |
| --- | --- | ---: |
| 5 altas, nenhuma crítica | 2 para nenhuma alta ou crítica. 1 para uma a três altas e nenhuma crítica. 0 para qualquer crítica ou quatro ou mais altas. | **0** |

**Justificativa** — A contagem de cinco altas alcança o limiar de quatro. Mesmo no recorte mais amplo do grafo declarado da aplicação e do editor, o resultado também seria 0, com 14 altas e 2 críticas.

## 6. Observações e limitações

- O registro de auditoria é uma fotografia de 08/11/2026. Os resultados podem mudar com inclusão, atualização, reclassificação ou remoção de avisos. O teste do endpoint não estabelece disponibilidade futura.
- As duas respostas retornaram `dev=false` em todos os registros de ocorrência, inclusive em caminhos de ferramentas de teste na consulta completa. A classificação depende dos caminhos, dos manifestos e das entradas do código. A consulta com grupos preservou o caminho explícito do Socket.IO do app, enquanto a completa relatou os avisos dessa cadeia sob `@types/socket.io-client` na árvore agregada. Por isso, os caminhos para o recorte web foram extraídos da consulta com grupos.
- O escopo identifica vínculos a pacotes no código e dependências resolvidas. O conteúdo efetivo do bundle, as funções afetadas que chegam a ele e as condições de exploração no serviço público ficaram fora da medição. Os avisos sobre variantes ou usos específicos de `nanoid`, por exemplo, indicam uma versão afetada no grafo e não confirmam que o app chama a variante vulnerável.

## 7. Achado

| ID | Métrica | Evidência reproduzível | Pontuação | Impacto | Recomendação |
| --- | --- | --- | ---: | --- | --- |
| A-S-M11 | S-M11 | E1, E4 e tabela da seção 5.1 | 0 | Alto pelo critério de dependências do GQM | Atualizar as versões afetadas de `nanoid` e `socket.io-parser` nas respectivas cadeias, validar o build e repetir a auditoria no lockfile atualizado |

## 8. Contribuição para a questão

| Questão | Esta métrica indica que a hipótese foi | Por quê |
| --- | --- | --- |
| S-Q6 — Resistência | Parcial no recorte desta métrica | O cliente web teve cinco avisos altos nas dependências relacionadas ao seu grafo. O julgamento geral da questão depende também das demais métricas de resistência. |
