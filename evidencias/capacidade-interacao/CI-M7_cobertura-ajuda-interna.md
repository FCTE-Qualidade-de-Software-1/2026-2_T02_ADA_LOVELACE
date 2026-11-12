# Evidência CI-M7 : Cobertura da ajuda interna

## 1. Identificação

| Campo | Valor |
| --- | --- |
| Métrica | CI-M7 : Cobertura da ajuda interna |
| Questão | CI-Q3 : Apreensibilidade (apoio ao aprendizado contínuo) |
| Versão | Excalidraw, commit `e7b5346` (pasta `aplicacao/`) |
| Responsável | Zayra Moraes |
| Data da coleta | 2026-11-11 |
| Ambiente | Inspeção de código-fonte (sem execução) |
| Revisado por | _pendente_ |

## 2. O que foi medido

Funções documentadas no diálogo de ajuda (`HelpDialog.tsx`, aberto por `?`) ÷ total de funções disponíveis. **Denominador adotado**: o recorte definido nas tarefas do grupo, **ferramentas da barra + ações com botão ou menu visível**, num total de **74 funções** em quatro fontes (tabela 5.1). Funções sem controle visível (por exemplo, copiar, colar e selecionar tudo, que só têm atalho) **não** entram no denominador. Excluídos também: links externos do menu (Excalidraw+, GitHub, redes sociais) e itens condicionados a IA (`magicframe`, gerar diagrama por texto).

Esta definição é diferente da lista de 17 funções frequentes da CI-M10, que mede outra coisa (atalhos para o que se usa mais).

## 3. Procedimento

1. Listar as funções visíveis nas quatro fontes da tabela abaixo.
2. Para cada uma, procurar uma entrada `<Shortcut label=...>` correspondente em `packages/excalidraw/components/HelpDialog.tsx`, pelo rótulo (`t("...")`).
3. Calcular documentadas ÷ 74. A correspondência função → rótulo da ajuda está na tabela 5.1.

| Fonte | Arquivo | Funções | Documentadas |
| --- | --- | ---: | ---: |
| Ferramentas e botões da barra | `components/Toolbar.tsx:100-310` | 21 | 16 |
| Painel de propriedades | `components/Actions.tsx:65-217` (`renderAction`) | 35 | 19 |
| Rodapé (zoom e histórico) | `components/Actions.tsx:877-911` | 5 | 5 |
| Menu principal | `excalidraw-app/components/AppMainMenu.tsx:29-86` | 13 | 6 |

### 3.1 Comandos executados

```bash
# 2026-11-12
grep -c "<Shortcut" aplicacao/packages/excalidraw/components/HelpDialog.tsx
grep -n -i "save\|loadScene\|imageExport\|exportTo" aplicacao/packages/excalidraw/components/HelpDialog.tsx
```

```text
85
(sem saída; código de saída 1: nenhuma entrada de salvar, abrir ou exportar)
```

Uma busca mais ampla por `export` retorna só a linha `export const HelpDialog` (linha 128), que é a declaração do componente e não uma entrada de ajuda.

## 4. Evidências

| # | Arquivo:linha | O que mostra |
| --- | --- | --- |
| C1 | `components/Toolbar.tsx:100-212, 262-310` | Botões da barra e menu de ferramentas extras |
| C2 | `components/Actions.tsx:65-217` | Camadas, alinhamento e propriedades do painel (`SelectedShapeActions`) |
| C3 | `components/Actions.tsx:877-911` | Botões de zoom e de desfazer/refazer |
| C4 | `excalidraw-app/components/AppMainMenu.tsx:29-86` | Itens do menu principal |
| C5 | `components/HelpDialog.tsx:144-520` | As 85 entradas `<Shortcut>` do diálogo |

### 4.3 Buscas sem resultado

| O que se procurou | Onde / comando | Resultado |
| --- | --- | --- |
| Entrada de **abrir**, **salvar** e **exportar** | `grep -n -i "save\|loadScene\|imageExport\|exportTo" HelpDialog.tsx` | Nenhuma ocorrência |

## 5. Resultado

### 5.1 Dados brutos

| # | Fonte | Função | Documentada na ajuda? | Evidência |
| --: | --- | --- | :-: | --- |
| 1 | Ferramentas e botões da barra | Mão | Sim | `HelpDialog.tsx:149` |
| 2 | Ferramentas e botões da barra | Seleção | Sim | `HelpDialog.tsx:151` |
| 3 | Ferramentas e botões da barra | Laço (lasso) | **Não** | 4.3 |
| 4 | Ferramentas e botões da barra | Retângulo | Sim | `HelpDialog.tsx:155` |
| 5 | Ferramentas e botões da barra | Losango | Sim | `HelpDialog.tsx:159` |
| 6 | Ferramentas e botões da barra | Elipse | Sim | `HelpDialog.tsx:163` |
| 7 | Ferramentas e botões da barra | Seta | Sim | `HelpDialog.tsx:167` |
| 8 | Ferramentas e botões da barra | Linha | Sim | `HelpDialog.tsx:171` |
| 9 | Ferramentas e botões da barra | Desenho livre | Sim | `HelpDialog.tsx:175` |
| 10 | Ferramentas e botões da barra | Texto | Sim | `HelpDialog.tsx:179` |
| 11 | Ferramentas e botões da barra | Nota adesiva | Sim | `HelpDialog.tsx:182` |
| 12 | Ferramentas e botões da barra | Borracha | Sim | `HelpDialog.tsx:185` |
| 13 | Ferramentas e botões da barra | Imagem | Sim | `HelpDialog.tsx:183` |
| 14 | Ferramentas e botões da barra | Moldura | Sim | `HelpDialog.tsx:188` |
| 15 | Ferramentas e botões da barra | Conteúdo incorporado (embeddable) | **Não** | 4.3 |
| 16 | Ferramentas e botões da barra | Autoforma (autoshape) | **Não** | 4.3 |
| 17 | Ferramentas e botões da barra | Laser | Sim | `HelpDialog.tsx:189` |
| 18 | Ferramentas e botões da barra | Balde de tinta | Sim | `HelpDialog.tsx:190` |
| 19 | Ferramentas e botões da barra | Mermaid para Excalidraw | **Não** | 4.3 |
| 20 | Ferramentas e botões da barra | Travar ferramenta | Sim | `HelpDialog.tsx:247` |
| 21 | Ferramentas e botões da barra | Modo caneta | **Não** | 4.3 |
| 22 | Painel de propriedades | Enviar para trás (sendToBack) | Sim | `HelpDialog.tsx:415` |
| 23 | Painel de propriedades | Recuar (sendBackward) | Sim | `HelpDialog.tsx:431` |
| 24 | Painel de propriedades | Avançar (bringForward) | Sim | `HelpDialog.tsx:435` |
| 25 | Painel de propriedades | Trazer para frente (bringToFront) | Sim | `HelpDialog.tsx:423` |
| 26 | Painel de propriedades | Alinhar à direita | Sim | `HelpDialog.tsx:451` |
| 27 | Painel de propriedades | Centralizar horizontalmente | **Não** | 4.3 |
| 28 | Painel de propriedades | Alinhar à esquerda | Sim | `HelpDialog.tsx:447` |
| 29 | Painel de propriedades | Distribuir horizontalmente | **Não** | 4.3 |
| 30 | Painel de propriedades | Alinhar ao topo | Sim | `HelpDialog.tsx:439` |
| 31 | Painel de propriedades | Centralizar verticalmente | **Não** | 4.3 |
| 32 | Painel de propriedades | Alinhar embaixo | Sim | `HelpDialog.tsx:443` |
| 33 | Painel de propriedades | Distribuir verticalmente | **Não** | 4.3 |
| 34 | Painel de propriedades | Cor de preenchimento do balde | **Não** | 4.3 |
| 35 | Painel de propriedades | Estilo de preenchimento | **Não** | 4.3 |
| 36 | Painel de propriedades | Opacidade | **Não** | 4.3 |
| 37 | Painel de propriedades | Cor do traço | Sim | `HelpDialog.tsx:501` |
| 38 | Painel de propriedades | Cor de fundo | Sim | `HelpDialog.tsx:505` |
| 39 | Painel de propriedades | Espessura do traço | **Não** | 4.3 |
| 40 | Painel de propriedades | Estilo do traço | **Não** | 4.3 |
| 41 | Painel de propriedades | Modo do desenho livre | **Não** | 4.3 |
| 42 | Painel de propriedades | Irregularidade (sloppiness) | **Não** | 4.3 |
| 43 | Painel de propriedades | Arredondamento | **Não** | 4.3 |
| 44 | Painel de propriedades | Tipo de seta | **Não** | 4.3 |
| 45 | Painel de propriedades | Fonte | Sim | `HelpDialog.tsx:509` |
| 46 | Painel de propriedades | Tamanho da fonte | Sim | `HelpDialog.tsx:517` |
| 47 | Painel de propriedades | Alinhamento do texto | **Não** | 4.3 |
| 48 | Painel de propriedades | Alinhamento vertical do texto | **Não** | 4.3 |
| 49 | Painel de propriedades | Pontas da seta | **Não** | 4.3 |
| 50 | Painel de propriedades | Duplicar | Sim | `HelpDialog.tsx:455` |
| 51 | Painel de propriedades | Excluir | Sim | `HelpDialog.tsx:363` |
| 52 | Painel de propriedades | Agrupar | Sim | `HelpDialog.tsx:481` |
| 53 | Painel de propriedades | Desagrupar | Sim | `HelpDialog.tsx:485` |
| 54 | Painel de propriedades | Link | Sim | `HelpDialog.tsx:253` |
| 55 | Painel de propriedades | Recortar imagem (crop) | Sim | `HelpDialog.tsx:238` |
| 56 | Painel de propriedades | Editar pontos de linha/seta | Sim | `HelpDialog.tsx:196` |
| 57 | Rodapé (zoom e histórico) | Diminuir zoom | Sim | `HelpDialog.tsx:271` |
| 58 | Rodapé (zoom e histórico) | Zoom 100% | Sim | `HelpDialog.tsx:275` |
| 59 | Rodapé (zoom e histórico) | Aumentar zoom | Sim | `HelpDialog.tsx:267` |
| 60 | Rodapé (zoom e histórico) | Desfazer | Sim | `HelpDialog.tsx:466` |
| 61 | Rodapé (zoom e histórico) | Refazer | Sim | `HelpDialog.tsx:470` |
| 62 | Menu principal | Abrir (LoadScene) | **Não** | 4.3 |
| 63 | Menu principal | Salvar (SaveToActiveFile) | **Não** | 4.3 |
| 64 | Menu principal | Exportar (Export) | **Não** | 4.3 |
| 65 | Menu principal | Salvar como imagem (SaveAsImage) | **Não** | 4.3 |
| 66 | Menu principal | Colaboração ao vivo (LiveCollaborationTrigger) | **Não** | 4.3 |
| 67 | Menu principal | Paleta de comandos | Sim | `HelpDialog.tsx:325` |
| 68 | Menu principal | Buscar (SearchMenu) | Sim | `HelpDialog.tsx:321` |
| 69 | Menu principal | Ajuda (Help) | **Não** | 4.3 |
| 70 | Menu principal | Limpar canvas | Sim | `HelpDialog.tsx:359` |
| 71 | Menu principal | Grade (Preferences) | Sim | `HelpDialog.tsx:303` |
| 72 | Menu principal | Modo zen (Preferences) | Sim | `HelpDialog.tsx:295` |
| 73 | Menu principal | Tema (ToggleTheme) | Sim | `HelpDialog.tsx:312` |
| 74 | Menu principal | Cor de fundo do canvas (ChangeCanvasBackground) | **Não** | 4.3 |

### 5.2 Cálculo

46 documentadas ÷ 74 funções = **62,2%**.

### 5.3 Pontuação

| Valor medido | Regra da métrica | Pontuação (0–2) |
| --- | --- | --- |
| 62,2% | 2 = ≥ 80%; 1 = 50% a 79%; 0 = < 50% | **1** |

**Justificativa:** a ajuda cobre as ferramentas e as ações de edição, mas não documenta as funções de arquivo (abrir, salvar, exportar), nem a maior parte das propriedades de estilo do painel.

## 6. Observações e limitações

- O resultado depende do denominador. Com a lista das 17 funções frequentes da CI-M10, o valor seria 82,4% (nota 2); com o recorte adotado, é 62,2% (nota 1). O recorte atual segue o definido nas tarefas do grupo e foi adotado após a revisão.
- Só se verificou o diálogo de ajuda (`?`). Dicas na tela (`HintViewer`), tooltips e a documentação externa não entram.
- O diálogo é de **atalhos**: funções sem atalho (estilo do traço, opacidade, arredondamento etc.) tendem a ficar de fora por natureza. Isso é parte do que a métrica mede, mas explica boa parte das 28 funções sem entrada.
- A classificação é de existência da entrada de ajuda, não de clareza.
- A CI-M7 também observa a autodescritividade (ver roteiro).
- Oportunidade (nota não é 0): acrescentar abrir, salvar e exportar, e as propriedades de estilo, ao diálogo de ajuda.

## 7. Achado (só se a pontuação for 0)

Não se aplica.

## 8. Contribuição para a questão

| Questão | Esta métrica indica que a hipótese foi | Por quê |
| --- | --- | --- |
| CI-Q3 | parcial | A hipótese era "parcialmente": há diálogo de ajuda com atalhos, mas cobre 62% das funções visíveis e não documenta abrir, salvar e exportar |
