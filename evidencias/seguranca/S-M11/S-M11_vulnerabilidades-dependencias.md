# Evidência S-M11 — Vulnerabilidades nas dependências

## 1. Identificação

| Campo | Valor |
| --- | --- |
| Métrica | S-M11 — Vulnerabilidades altas ou críticas nas dependências |
| Objetivo e questão | O2 — Identificação, responsabilização e riscos de segurança. S-Q6 — Resistência |
| Tarefa do plano | [Issue #61](https://github.com/FCTE-Qualidade-de-Software-1/2026-2_T02_ADA_LOVELACE/issues/61) |
| Responsável | Renato Araújo Gameiro |
| Data da preparação | 2026-11-08 |
| Data da coleta | Pendente |
| Revisado por | Pendente |
| Versão | [`e7b534668a60add7f725531f3c9abf32508c7b4e`](https://github.com/excalidraw/excalidraw/commit/e7b534668a60add7f725531f3c9abf32508c7b4e) |
| Ambiente da preparação | Windows x64, PowerShell 7.6.9, Git 2.56.0.windows.2, Node.js 22.23.3, npm 10.9.9, Corepack 0.36.0 e Yarn Classic 1.22.22 |

## 2. O que foi medido

Coleta pendente. A métrica conta vulnerabilidades altas ou críticas nas dependências. O recorte de produção parte da aplicação web gratuita e dos pacotes internos que ela incorpora. A auditoria terá como entrada o monorepo com o lockfile da raiz. Os avisos exclusivos de desenvolvimento ou de exemplos serão separados quando os caminhos disponíveis permitirem.

## 3. Procedimento

1. Na raiz do checkout oficial separado, confirmar o SHA, a versão do Yarn e a integridade dos manifestos e do `yarn.lock` original. O lockfile da raiz cobre os workspaces `excalidraw-app`, `packages/*` e `examples/*`. Os lockfiles de `dev-docs` e dos exemplos ficam fora da entrada desta auditoria.
2. Após autorização para a coleta, tentar `corepack yarn audit --json --groups "dependencies optionalDependencies"` na raiz. Preservar stdout, stderr e código de saída, inclusive se a requisição falhar. O Yarn Classic calcula o grafo a partir dos manifestos e do lockfile e usa uma máscara de bits para indicar as severidades encontradas em uma resposta de auditoria válida.
3. Se houver resposta válida, registrar todas as severidades e os caminhos. Usar os manifestos e os aliases do Vite para conferir os vínculos com o app. Tratar dependências usadas somente para build, testes, lint ou exemplos separadamente, mesmo quando um manifesto declara a ferramenta em `dependencies`. Se a auditoria completa estiver disponível, usá-la para discriminar os avisos de desenvolvimento com base nos caminhos e nas marcações da ferramenta.
4. Contar cada aviso uma vez pelo identificador do registro e manter seus pacotes, versões e caminhos como evidência. Quando a base fornecer aliases para o mesmo aviso, consolidá-los e manter a correspondência. Documentar avisos com escopo ou severidade indeterminados.
5. Se o endpoint legado falhar, registrar a falha. Uma alternativa a validar é o OSV-Scanner em modo de leitura do `yarn.lock` da raiz. A saída alternativa deverá indicar a base usada, a cobertura e como os caminhos e as severidades foram conferidos antes de aplicar o critério do GQM.

### 3.1 Comandos executados

Inspeção na raiz do checkout oficial em 2026-11-08.

```powershell
git rev-parse HEAD
git ls-files
node --version
npm.cmd --version
corepack.cmd --version
corepack.cmd yarn --version
```

O SHA completo e as versões conferidas estão na seção 1. O cache do Corepack foi configurado fora dos dois checkouts. A auditoria e a instalação das dependências do Excalidraw aguardam a coleta.

## 4. Evidências

### 4.1 Trechos de código

| # | Arquivo e linha no commit fixado | O que mostra |
| --- | --- | --- |
| C1 | [`package.json`, linha 4](https://github.com/excalidraw/excalidraw/blob/e7b534668a60add7f725531f3c9abf32508c7b4e/package.json#L4-L10) | Versão do Yarn, workspaces e início das dependências de desenvolvimento da raiz |
| C2 | [`yarn.lock`, linha 2](https://github.com/excalidraw/excalidraw/blob/e7b534668a60add7f725531f3c9abf32508c7b4e/yarn.lock#L2) | Formato do lockfile v1 |
| C3 | [`excalidraw-app/package.json`, linha 28](https://github.com/excalidraw/excalidraw/blob/e7b534668a60add7f725531f3c9abf32508c7b4e/excalidraw-app/package.json#L28-L56) | Dependências e ferramentas de build do app |
| C4 | [`excalidraw-app/vite.config.mts`, linha 117](https://github.com/excalidraw/excalidraw/blob/e7b534668a60add7f725531f3c9abf32508c7b4e/excalidraw-app/vite.config.mts#L117-L186) | Aliases que ligam o app ao código em `packages/` |
| C5 | [`packages/excalidraw/package.json`, linha 76](https://github.com/excalidraw/excalidraw/blob/e7b534668a60add7f725531f3c9abf32508c7b4e/packages/excalidraw/package.json#L76-L118) | Dependências do editor, incluindo as declaradas como `peerDependencies` |

### 4.2 Arquivos de apoio

Saída bruta da auditoria pendente. Usar o padrão `S-M11_descricao_AAAA-MM-DD.ext` para arquivos de coleta.

### 4.3 Buscas sem resultado

A listagem de arquivos versionados no checkout fixado não contém `package-lock.json`, `npm-shrinkwrap.json` nem `pnpm-lock.yaml`.

## 5. Resultado

### 5.1 Dados brutos

Pendentes de coleta.

### 5.2 Cálculo

S-M11 = número de avisos de severidade alta + número de avisos de severidade crítica no escopo, com contagens separadas por severidade.

### 5.3 Pontuação

| Pontuação | Critério do [roteiro GQM](../../../docs/analise/roteiro.md) |
| --- | --- |
| 2 | Zero vulnerabilidades altas ou críticas |
| 1 | Uma a três altas, sem crítica |
| 0 | Qualquer crítica ou quatro ou mais altas |

**Pontuação atribuída** — Pendente de coleta.

## 6. Observações e limitações

- O [código do Yarn Classic 1.22.22](https://github.com/yarnpkg/yarn/blob/v1.22.22/src/cli/commands/audit.js#L224-L249) chama o endpoint legado `/-/npm/v1/security/audits`. O [registro público da retirada do endpoint](https://github.com/npm/api-documentation/issues/46) informa a desativação após 15/07/2026. O retorno para esta coleta ainda não foi verificado.
- O lockfile registra resoluções do monorepo. O agrupamento da ferramenta e os manifestos ajudam a classificar os avisos, mas a presença de um pacote nesse grafo, por si só, é insuficiente para inferir inclusão no bundle publicado ou explorabilidade.
- O [OSV-Scanner](https://google.github.io/osv-scanner/supported-languages-and-lockfiles/) lê `yarn.lock`. Uma varredura pelo arquivo isolado tem cobertura do lockfile e exige classificação adicional para isolar o app e aplicar os limiares por severidade.

## 7. Achado

Pendente de pontuação.

## 8. Contribuição para a questão

A contribuição de S-M11 para S-Q6 será avaliada após a coleta.
