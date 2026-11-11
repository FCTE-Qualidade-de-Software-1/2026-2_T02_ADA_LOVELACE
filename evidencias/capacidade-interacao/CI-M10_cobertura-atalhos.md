# Evidência CI-M10 : Cobertura de atalhos de teclado

## 1. Identificação

| Campo | Valor |
| --- | --- |
| Métrica | CI-M10 : Cobertura de atalhos de teclado |
| Questão | CI-Q4 : Operabilidade (tarefas comuns são eficientes?) |
| Versão | Excalidraw, commit `e7b5346` (pasta `aplicacao/`) |
| Responsável | Zayra Moraes |
| Data da coleta | 2026-11-11 |
| Ambiente | Inspeção de código-fonte (sem execução) |
| Revisado por | _pendente_ |

## 2. O que foi medido

Funções frequentes com atalho de teclado ÷ total de funções frequentes. Por escopo reduzido (trabalho escolar), a lista de **funções frequentes** foi definida pela equipe a partir das tarefas de usabilidade (CI-M9 e roteiro dos testes): criar forma, seta, texto, cor de traço, cor de fundo, agrupar, exportar PNG e as operações básicas de edição e arquivo. São **17 funções**.

## 3. Procedimento

1. Fixar a lista de 17 funções (tabela 5.1).
2. Para cada uma, procurar no código o tratamento da tecla (`keyTest` em `actions/`, `findShapeByKey`/`TOOLS`, manipuladores de teclado em `components/App.tsx`, eventos de cópia e colagem).
3. Marcar "com atalho" quando houver tecla que **acione a função** (abrir o seletor ou o diálogo conta, como no caso de cor e exportação).

### 3.1 Comandos executados

```bash
# 2026-11-11
grep -n "keyTest" -A3 aplicacao/packages/excalidraw/actions/actionExport.tsx
grep -n "event.key === KEYS.G || event.key === KEYS.S" aplicacao/packages/excalidraw/components/App.tsx
grep -n "EVENT.COPY\|EVENT.PASTE" aplicacao/packages/excalidraw/components/App.tsx
```

## 4. Evidências

| # | Arquivo:linha | O que mostra |
| --- | --- | --- |
| C1 | `packages/excalidraw/components/Tools.tsx:60-85` | Cada ferramenta tem `letterKey` (R, A, T...) e `numericKey` |
| C2 | `packages/excalidraw/components/App.tsx:5541-5563` | `S` abre o seletor de cor do traço e `G`, o de fundo |
| C3 | `packages/excalidraw/components/App.tsx:5271-5279` | `Ctrl/Cmd+Shift+E` abre o diálogo de exportar imagem (PNG) |
| C4 | `actions/actionGroup.tsx:203` | Agrupar: `Ctrl/Cmd+G` |
| C5 | `actions/actionHistory.tsx:83,126` | Desfazer `Ctrl/Cmd+Z`; refazer `Ctrl/Cmd+Y` ou `Ctrl/Cmd+Shift+Z` |
| C6 | `components/App.tsx:4174,4224` | Copiar e colar tratados pelos eventos nativos `copy` e `paste` (`Ctrl/Cmd+C/V`); `keyTest` é `undefined` nas ações porque a tecla é do navegador |
| C7 | `actions/actionDeleteSelected.tsx:319` | Excluir: `Delete` ou `Backspace` |
| C8 | `actions/actionDuplicateSelection.tsx:118` | Duplicar: `Ctrl/Cmd+D` |
| C9 | `actions/actionSelectAll.ts:69` | Selecionar tudo: `Ctrl/Cmd+A` |
| C10 | `actions/actionCanvas.tsx:178` | Zoom: `Ctrl/Cmd +` e `-`, `Ctrl/Cmd 0` |
| C11 | `actions/actionExport.tsx:324,428` | Salvar `Ctrl/Cmd+S`; abrir `Ctrl/Cmd+O` |

### 4.3 Buscas sem resultado

| O que se procurou | Onde / comando | Resultado |
| --- | --- | --- |
| Atalho **direto** que exporte PNG sem abrir diálogo | `grep -n "keyTest" actions/actionExport.tsx` | Nenhum: o atalho abre o diálogo de exportação, e a exportação exige um clique |

## 5. Resultado

### 5.1 Dados brutos

| # | Função frequente | Atalho | Evidência |
| --: | --- | --- | --- |
| 1 | Criar forma (retângulo) | R ou 2 | C1 |
| 2 | Seta | A ou 5 | C1 |
| 3 | Texto | T ou 8 | C1 |
| 4 | Cor do traço | S | C2 |
| 5 | Cor de fundo | G | C2 |
| 6 | Agrupar | Ctrl+G | C4 |
| 7 | Exportar PNG | Ctrl+Shift+E (abre o diálogo) | C3 |
| 8 | Desfazer | Ctrl+Z | C5 |
| 9 | Refazer | Ctrl+Y / Ctrl+Shift+Z | C5 |
| 10 | Copiar | Ctrl+C | C6 |
| 11 | Colar | Ctrl+V | C6 |
| 12 | Excluir | Delete | C7 |
| 13 | Duplicar | Ctrl+D | C8 |
| 14 | Selecionar tudo | Ctrl+A | C9 |
| 15 | Zoom | Ctrl +/- | C10 |
| 16 | Salvar | Ctrl+S | C11 |
| 17 | Abrir | Ctrl+O | C11 |

### 5.2 Cálculo

17 com atalho ÷ 17 funções = **100%**.

### 5.3 Pontuação

| Valor medido | Regra da métrica | Pontuação (0–2) |
| --- | --- | --- |
| 100% | 2 = ≥ 80%; 1 = 50% a 79%; 0 = < 50% | **2** |

**Justificativa:** todas as funções frequentes escolhidas têm atalho.

## 6. Observações e limitações

- O resultado depende da lista: ela foi escolhida entre funções comuns de edição, que tendem a ter atalho. Com uma lista maior (por exemplo, todas as 101 ações de `ActionName`), a cobertura seria menor.
- Só foi verificado que o atalho existe **no código**; não foi testado em navegador, e alguns atalhos mudam entre Windows e macOS.
- Exportar PNG: o atalho só abre o diálogo.
- Atalhos de cor (S e G) só funcionam com elemento selecionado ou ferramenta ativa que aceite a propriedade (`App.tsx:5541-5556`).

## 7. Achado (só se a pontuação for 0)

Não se aplica.

## 8. Contribuição para a questão

| Questão | Esta métrica indica que a hipótese foi | Por quê |
| --- | --- | --- |
| CI-Q4 | confirmada | A hipótese esperava atalhos de uma tecla para as ferramentas; as funções frequentes têm todas atalho |
