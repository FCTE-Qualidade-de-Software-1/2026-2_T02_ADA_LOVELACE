# Evidência F-M7 : Inclusão funcional

> Status: **coleta de código e documentação** (feito com apoio do Claude, ver `docs/uso-ia.md`).

## 1. Identificação

| Campo | Valor |
| --- | --- |
| Métrica | F-M7 : Inclusão funcional |
| Questão | F-Q3 : Substituibilidade (o Excalidraw pode substituir uma ferramenta equivalente sem perda de funcionalidade?) |
| Tarefa do plano | [Issue #65](https://github.com/FCTE-Qualidade-de-Software-1/2026-2_T02_ADA_LOVELACE/issues/65) (ver `tarefas-flexibilidade.md`) |
| Responsável | Giovanna Felipe |
| Data da coleta | 2026-11-09 |
| Revisado por | André Henrique em 2026-11-12 |
| Versão | [`e7b534668a60add7f725531f3c9abf32508c7b4e`](https://github.com/excalidraw/excalidraw/commit/e7b534668a60add7f725531f3c9abf32508c7b4e) |

## 2. O que foi medido

Funções da ferramenta de referência que também existem no Excalidraw, divididas pelo total de funções da ferramenta de referência ([roteiro](../../docs/analise/roteiro.md), F-M7).

**Ferramenta de referência: draw.io.** A avaliação foi feita com o draw.io, que é gratuito e de código aberto, como o Excalidraw, e publica uma lista oficial de funções com um link de documentação para cada uma. Assim, a lista vem da ferramenta e não da equipe.

**Recorte da lista:** o recorte foi feito com as funções das seções da página [Features overview](https://www.drawio.com/docs/features/) do draw.io que tratam do uso do editor:

- incluídas: colaboração em tempo real, editor de diagramas, personalização do editor, importação e exportação, modo escuro e ferramentas avançadas;
- excluídas: segurança de dados, locais de armazenamento e integrações com outros produtos (Confluence, Google Drive etc.), porque não são funções de edição, e a seção de tipos de diagrama, porque ela lista bibliotecas de formas por assunto, e não funções;
- "Gliffy mass import for Confluence" ficou fora porque só existe na integração com o Confluence;
- "Palettes" e "Editor configuration" apontam para a mesma página da documentação e contam como uma função só.

## 3. Procedimento

1. Abrir a página [Features overview](https://www.drawio.com/docs/features/) do draw.io e copiar cada função das seções incluídas, com o link da documentação.
2. Nos itens de sentido ambíguo, ler a página da documentação: propriedades da forma, configuração do editor, formas personalizadas e temas do editor (ver seção 6).
3. Para cada função, procurar no código do Excalidraw (`aplicacao/`) a ação, o componente ou o tipo de elemento correspondente, acessível pela interface.
4. Quando não houver correspondente, registrar a busca sem resultado (4.3).
5. Conferir se os arquivos citados são idênticos aos do commit `e7b5346`.

Regra de classificação: **Sim** quando o Excalidraw oferece, pela interface, uma função que cumpre o mesmo propósito descrito na documentação do draw.io, mesmo que de forma mais simples. **Não** quando não existe nada equivalente ou quando só existe pela API da biblioteca.

### 3.1 Comandos executados

```bash
# 2026-11-09, pasta aplicacao/
git grep -n -I -i -E "swimlane|autoLayout|auto-layout|dagre|elkjs|layoutGraph|elementTags|tagsPanel|katex|mathjax|text/csv|\.csv\b|CREATE TABLE|templatesDialog|TemplateGallery|presetColors|defaultColorSchemes|defaultLibraries|drawio|mxfile|mxGraph|\.vsdx|gliffy|lucid" -- packages excalidraw-app ':!*test*' ':!*.snap' ':!*locales/*' ':!*.md'
git grep -n -I -E 'type: "table"|insertTable|"layer"' -- packages excalidraw-app ':!*test*' ':!*.snap' ':!*locales/*' ':!*.md'
```

```text
swimlane: só em packages/excalidraw/mermaid.ts:25, na lista de tipos de
          gráfico Mermaid que o importador reconhece; não há elemento swimlane
"layer":  só em packages/excalidraw/actions/actionZindex.tsx (26, 56, 86, 123),
          como palavra-chave das ações de trazer para frente e enviar para trás
demais termos: nenhuma ocorrência
```

Conferência com o commit avaliado:

```bash
# para cada arquivo citado em 4.1
gh api "repos/excalidraw/excalidraw/contents/<arquivo>?ref=e7b534668a60add7f725531f3c9abf32508c7b4e" --jq .sha
git hash-object <arquivo>
```

```text
25 arquivos comparados: todos idênticos
```

## 4. Evidências

### 4.1 Trechos de código

Caminhos relativos a `aplicacao/`.

| # | Arquivo:linha | O que mostra |
| --- | --- | --- |
| C1 | `packages/element/src/binding.ts:153` | `bindOrUnbindBindingElement`: liga a seta às formas nas pontas |
| C2 | `packages/element/src/linearElementEditor.ts:142` e `packages/element/src/elbowArrow.ts:895` | Edição dos pontos de uma seta e segmentos fixos da seta em cotovelo |
| C3 | `packages/excalidraw/actions/actionBoundText.tsx:148` | `actionBindText`: texto dentro de uma forma ou como rótulo de seta |
| C4 | `packages/excalidraw/actions/actionProperties.tsx:366`, `:445` e `:614` | Cor do traço, cor de fundo e estilo de preenchimento (inclusive hachura) |
| C5 | `packages/excalidraw/actions/actionProperties.tsx:1960` e `:2077` | Pontas da seta e tipo de seta (reta, curva, cotovelo) |
| C6 | `packages/excalidraw/actions/actionProperties.tsx:1168` e `:1561` | Família da fonte e alinhamento do texto |
| C7 | `packages/excalidraw/components/LibraryMenuItems.tsx:99-117` | Busca por nome entre os itens da biblioteca |
| C8 | `excalidraw-app/App.tsx:1072` e `packages/excalidraw/components/TTDDialog/TTDDialog.tsx:29` | Diálogo de texto para diagrama (IA e Mermaid) |
| C9 | `packages/excalidraw/components/HelpDialog.tsx:128` | Diálogo com a lista de atalhos de teclado |
| C10 | `excalidraw-app/app-language/LanguageList.tsx:8` e `packages/excalidraw/i18n.ts:21` | Troca do idioma da interface |
| C11 | `packages/excalidraw/components/DefaultSidebar.tsx:56` | Barra lateral (biblioteca e busca) |
| C12 | `packages/excalidraw/data/blob.ts:200` e `packages/excalidraw/data/index.ts:99` | Importação de arquivos e exportação de imagem (ver F-M10 e F-M12) |
| C13 | `packages/excalidraw/actions/actionCanvas.tsx:432` | Alternância entre tema claro e escuro |
| C14 | `packages/common/src/constants.ts:207` e `packages/common/src/colors.ts:86` | Filtro que adapta as cores do desenho ao modo escuro |
| C15 | `packages/excalidraw/actions/actionToggleGridMode.tsx:9` | Liga e desliga a grade |
| C16 | `packages/excalidraw/actions/actionLink.tsx:19` e `packages/excalidraw/actions/actionElementLink.ts:73` | Link em um elemento, para URL ou para outro elemento da cena |
| C17 | `packages/common/src/constants.ts:560` | Ferramenta de desenho livre (`freedraw`) |
| C18 | `packages/excalidraw/actions/actionGroup.tsx:87` e `packages/excalidraw/actions/actionAddToLibrary.ts:10` | Agrupar formas e salvar o grupo na biblioteca |
| C19 | `packages/excalidraw/data/json.ts:147` | Exportar a biblioteca em `.excalidrawlib` |
| C20 | `packages/excalidraw/components/TTDDialog/MermaidToExcalidraw.tsx` | Conversão de Mermaid em diagrama editável |
| C21 | `excalidraw-app/collab/Collab.tsx:140` | Colaboração em tempo real |

### 4.2 Arquivos de apoio

| # | Fonte | O que mostra |
| --- | --- | --- |
| D1 | [draw.io · Features overview](https://www.drawio.com/docs/features/), consultada em 2026-11-09 | Lista de funções usada como denominador |
| D2 | [Shape properties](https://www.drawio.com/docs/manual/shapes/shape-properties/) | Propriedades avançadas na seção "Properties" da aba Style (ex.: Arc Size, Perimeter) |
| D3 | [Configure the editor](https://www.drawio.com/docs/reference/configure-diagram-editor/) | Diálogo de configuração com JSON (`presetColors`, `defaultLibraries`) |
| D4 | [Custom shapes](https://www.drawio.com/docs/tutorials/custom-shapes/) | Forma personalizada por XML, desenho livre ou agrupamento de formas |
| D5 | [Editor appearance](https://www.drawio.com/docs/manual/editor/appearance/) | Cinco temas do editor: Classic, Atlas, Simple, Minimal e Sketch |

### 4.3 Buscas sem resultado

| O que se procurou | Onde / comando | Resultado |
| --- | --- | --- |
| Tabelas | `git grep 'type: "table"\|insertTable'` | Nenhum elemento de tabela |
| Swimlanes | `git grep -i swimlane` | Só na lista de tipos Mermaid (`mermaid.ts:25`) |
| Layout automático | `git grep -i "autoLayout\|dagre\|elkjs"` | Nenhuma ocorrência |
| Camadas | `git grep '"layer"'` | Só como palavra-chave de ordem de empilhamento (`actionZindex.tsx`) |
| Tags e metadados | `git grep "elementTags\|tagsPanel"` | Nenhuma ocorrência; `customData` existe só na API |
| Fórmulas matemáticas | `git grep -i "katex\|mathjax"` | Nenhuma ocorrência |
| Importação de CSV e SQL | `git grep "text/csv\|CREATE TABLE"` | Nenhuma ocorrência |
| Modelos (templates) | `git grep "templatesDialog\|TemplateGallery"` | Nenhuma ocorrência |
| Configuração de paletas e bibliotecas padrão | `git grep "presetColors\|defaultLibraries"` | Nenhuma ocorrência |
| Formatos de outras ferramentas | `git grep -i "drawio\|mxfile\|vsdx\|gliffy\|lucid"` | Nenhuma ocorrência (igual à F-M12) |

## 5. Resultado

### 5.1 Dados brutos

| # | Função do draw.io (D1) | No Excalidraw? | Evidência |
| --- | --- | :-: | --- |
| 1 | Real-time collaboration | Sim | C21 |
| 2 | Connect shapes | Sim | C1 |
| 3 | Manual connector paths (waypoints) | Sim | C2 |
| 4 | Labels | Sim | C3 |
| 5 | Tables | Não | 4.3 |
| 6 | Swimlanes | Não | 4.3 |
| 7 | Shape styles | Sim | C4 |
| 8 | Connector styles | Sim | C5 |
| 9 | Fill styles (rough style) | Sim | C4 |
| 10 | Text styles | Sim | C6 |
| 11 | Shape search | Sim (limitada) | C7 |
| 12 | Templates | Não | 4.3 |
| 13 | AI diagram generation | Sim | C8 |
| 14 | Keyboard shortcuts | Sim | C9 |
| 15 | Editor themes | Não | D5 |
| 16 | Online whiteboard | Sim | o próprio editor |
| 17 | Tool panels | Sim | C11 |
| 18 | Editor language | Sim | C10 |
| 19 | Import | Sim | C12 |
| 20 | Import formats (de outras ferramentas) | Não | 4.3 |
| 21 | Export | Sim | C12 |
| 22 | Dark mode | Sim | C13 |
| 23 | Adaptive colours | Sim | C14 |
| 24 | Grid | Sim | C15 |
| 25 | Auto-layouts | Não | 4.3 |
| 26 | Layers | Não | 4.3 |
| 27 | Tags | Não | 4.3 |
| 28 | Shape properties | Não | D2 |
| 29 | Shape metadata | Não | 4.3 |
| 30 | Placeholders | Não | 4.3 |
| 31 | Translations | Não | 4.3 |
| 32 | Tooltips | Não | 4.3 |
| 33 | Links | Sim | C16 |
| 34 | Freehand drawing | Sim | C17 |
| 35 | Custom shapes | Sim | C18, D4 |
| 36 | Custom shape libraries | Sim | C18, C19 |
| 37 | HTML text | Não | 4.3 |
| 38 | Math typesetting | Não | 4.3 |
| 39 | Mermaid | Sim | C20 |
| 40 | CSV import | Não | 4.3 |
| 41 | SQL | Não | 4.3 |
| 42 | Palettes e editor configuration | Não | D3, 4.3 |

### 5.2 Cálculo

Funções presentes ÷ funções do draw.io = 24 ÷ 42 = **57,1%**.

**Sensibilidade:** os itens 11, 15, 28 e 35 admitem outra leitura (ver seção 6). Mudando cada um deles para o lado menos favorável e depois para o mais favorável, o resultado varia de 22 ÷ 42 = 52,4% a 26 ÷ 42 = 61,9%. Nos dois extremos fica abaixo de 70%, então a pontuação não muda.

### 5.3 Pontuação

| Valor medido | Regra da métrica | Pontuação |
| --- | --- | --- |
| 57,1% | 2 = ≥ 90%; 1 = 70% a 89%; 0 = < 70% | **0** |

**Justificativa:** o Excalidraw cobre as funções básicas de diagramação (formas, conectores, texto, estilos, exportação), mas não tem as funções avançadas do draw.io: tabelas, swimlanes, camadas, layout automático, modelos, metadados e importação de formatos de outras ferramentas.

## 6. Observações e limitações

- **Ferramenta de referência:** a avaliação foi feita com o draw.io.
- **Recorte:** a lista segue a página oficial do draw.io, com as seções de uso do editor descritas na seção 2.
- **Itens de leitura ambígua:**
  - 11 · *Shape search*: no draw.io a busca cobre todas as bibliotecas de formas; no Excalidraw cobre só os itens da biblioteca do usuário. Marcado como Sim (limitada).
  - 15 · *Editor themes*: o draw.io tem cinco leiautes de editor (D5). O Excalidraw tem só tema claro e escuro, e o modo zen apenas esconde a interface. Marcado como Não.
  - 28 · *Shape properties*: o draw.io tem uma lista de propriedades avançadas por forma (D2). O Excalidraw tem só as opções do painel de estilo, já contadas no item 7. Marcado como Não.
  - 35 · *Custom shapes*: a documentação do draw.io aceita como forma personalizada o agrupamento de formas (D4), e o Excalidraw permite agrupar e salvar na biblioteca (C18). Marcado como Sim.
- **Geração por IA (item 13):** no `excalidraw-app` depende de um serviço externo; aqui só se verificou que a função existe na interface.
- **Escopo da medição:** mede-se a existência da função no código e na interface, não a qualidade nem a facilidade de uso. A produtividade fica com F-M8 e F-M9.
- **Versão do código:** os arquivos citados em 4.1 foram comparados com o commit `e7b5346` pelo hash do arquivo, e todos são idênticos.

## 7. Achado

| ID | Métrica | Evidência reproduzível | Pontuação | Impacto | Recomendação |
| --- | --- | --- | --- | --- | --- |
| A-F7 | F-M7 | Tabela 5.1, buscas da seção 4.3 e comandos da seção 3.1 | 0 | Médio | Para quem migra do draw.io, priorizar as funções mais usadas em diagramas técnicos que faltam: tabelas, swimlanes ou contêineres de raia, e importação de arquivos `.drawio` |

## 8. Contribuição para a questão

| Questão | Esta métrica indica que a hipótese foi | Por quê |
| --- | --- | --- |
| F-Q3 | confirmada | A hipótese previa cobertura parcial ("as tarefas básicas, mas não todas as funções de ferramentas mais completas"), e 57,1% das funções do draw.io estão presentes, concentradas nas básicas |
