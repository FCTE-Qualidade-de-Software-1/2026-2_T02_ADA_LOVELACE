# Conferência manual de Renato — pendente

Nenhuma validação humana foi confirmada. Os resultados automatizados estão em `tentativa-04/dados.json`; a tabela final das evidências identifica o que o Codex observou. Revisão por outro integrante também pendente.

## Iniciar a versão avaliada

Na raiz do repositório, em PowerShell, conferir:

```powershell
git -C .venv/ci-m13-m14-source rev-parse HEAD
git -C .venv/ci-m13-m14-source status --short
```

Exigir SHA `e7b534668a60add7f725531f3c9abf32508c7b4e` e nenhuma alteração rastreada. Dependências já instaladas no checkout isolado; não depende de PR aberto.

```powershell
Set-Location .venv/ci-m13-m14-source/excalidraw-app
node ../node_modules/vite/bin/vite.js --host 127.0.0.1 --port 3020 --strictPort
```

Abrir `http://127.0.0.1:3020/` no Edge em janela InPrivate, sem desenhos pessoais. Interface inglesa, tema claro, zoom 100%. O coletor fecha seu servidor ao terminar; se a porta estiver ocupada, conferir o processo antes de reutilizá-la. Em outra máquina, clonar o repositório oficial, checkout do SHA acima e `corepack.cmd yarn install --frozen-lockfile --ignore-scripts --non-interactive` na raiz dele. Ajustar apenas o caminho local dos comandos.

## Seis verificações

Usar uma nova janela InPrivate com cena vazia para cada verificação. Fotografar os quatro estados: antes, depois, Ctrl+Z, Ctrl+Shift+Z. Registrar separadamente feedback visual, desfazer e refazer.

| Caso | O que fazer | Visual esperado | Após Ctrl+Z / Ctrl+Shift+Z |
| --- | --- | --- | --- |
| 1 — Criar (A01) | Pressionar R e arrastar no centro da tela | Retângulo com contorno e alças | Vazio / mesmo retângulo |
| 2 — Selecionar (A02) | Criar retângulo, V, clicar no vazio e depois na borda | Alças de seleção aparecem | Retângulo sem seleção / selecionado; conteúdo preservado |
| 3 — Cor (A05) | Criar e selecionar retângulo; clicar na segunda amostra de Stroke, vermelha, no painel esquerdo | Contorno vermelho | Cor preta / vermelha |
| 4 — Texto (A06/A07) | T, clicar no centro, digitar `Cena ficticia CI70`, Escape; duplo clique no texto, substituir por `Texto editado CI70`, Escape | Novo texto visível | Texto inicial / editado; verificar criação também: vazio / texto inicial |
| 5 — Grupo (A10/A11) | Criar dois retângulos separados; V, Ctrl+A, Ctrl+G; depois Ctrl+Shift+G | Seleção em grupo, depois sem agrupamento | Para agrupar: sem grupo / com grupo. Para desagrupar: com grupo / sem grupo |
| 6 — Tema (A12) | Criar retângulo, pressionar Alt+Shift+D | Canvas e controles em tema escuro | Na automação, Ctrl+Z manteve o tema escuro e removeu o retângulo; Ctrl+Shift+Z repôs o retângulo, mantendo escuro. Conferir e registrar divergências |

## Registrar divergências e confirmação

Criar um arquivo novo `CI-M13-M14_revisao-renato_AAAA-MM-DD.md` neste diretório, sem sobrescrever os dados da automação. Informar data/hora e fuso, SHA, navegador/versão, caso, passos exatos, resultado esperado, observado e nomes das capturas. Distinguir problema de reprodução de divergência do aplicativo. Para confirmar, informar explicitamente quais casos passaram e eventuais exceções. A aprovação deste roteiro ou leitura das capturas não equivale à execução manual. Aguardar confirmação antes de preparar PR; não fazer push ou merge.
