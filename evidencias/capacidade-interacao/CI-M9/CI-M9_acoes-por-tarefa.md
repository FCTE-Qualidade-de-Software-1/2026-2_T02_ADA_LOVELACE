# Evidência CI-M9: ações por tarefa frequente

## 1. Identificação

| Campo | Valor |
| --- | --- |
| Métrica | CI-M9: ações por tarefa frequente |
| Questão (CI-Q) | CI-Q4: tarefas comuns eficientes |
| Tarefa do plano | Contar cliques para criar forma, mudar cor, agrupar e exportar PNG |
| Responsável | Luís Felipe Parreira Cunha (`cunha-luiss`) |
| Data da coleta | 2026-11-14 |
| Revisado por | Pendente |
| Ambiente | macOS 27.2.1; Safari 27.2; Node 24.19.0; Vite 5.0.12; aplicação 0.18.0 |
| Versão avaliada | Commit indicado no guia: `e7b5346` |

## 2. O que foi medido

Foi contabilizado o número de ações necessárias para concluir quatro tarefas
frequentes no Excalidraw. A contagem considera cliques e gestos necessários,
não conta movimentos do cursor nem a preparação da cena e não usa atalhos de
teclado.

## 3. Procedimento

1. Conferi as gravações de 2026-11-14 quadro a quadro.
2. Para criar uma forma, contei selecionar a ferramenta e desenhar.
3. Para mudar a cor, contei selecionar a forma e clicar na amostra de cor.
4. Para agrupar, contei seleção por área, menu contextual e **Agrupar seleção**.
5. Para exportar, contei abrir o menu principal, escolher **Exportar imagem**
   e escolher PNG.
6. A criação de formas usadas como suporte para agrupar e exportar foi tratada
   como preparação e não entrou na contagem.

### 3.1 Comandos executados

Não houve comando de coleta: os dados foram observados nas gravações e
confirmados pelos prints abaixo.

## 4. Evidências

### 4.1 Trechos de código

Não aplicável: esta é uma medição comportamental executada na interface.

### 4.2 Arquivos de apoio

| # | Arquivo | O que mostra |
| --- | --- | --- |
| E1 | [T1_canvas-inicial_2026-11-14.png](T1_canvas-inicial_2026-11-14.png) | Estado inicial da tarefa de criação |
| E2 | [T1_resultado_2026-11-14.png](T1_resultado_2026-11-14.png) | Formas criadas |
| E3 | [T2_cor-alterada_2026-11-14.png](T2_cor-alterada_2026-11-14.png) | Cor alterada e painel de propriedades |
| E4 | [T3_selecao_2026-11-14.png](T3_selecao_2026-11-14.png) | Formas selecionadas para agrupamento |
| E5 | [T3_menu-contexto_2026-11-14.png](T3_menu-contexto_2026-11-14.png) | Ação **Agrupar seleção** |
| E6 | [T3_grupo-criado_2026-11-14.png](T3_grupo-criado_2026-11-14.png) | Grupo criado |
| E7 | [T4_menu-principal_2026-11-14.png](T4_menu-principal_2026-11-14.png) | Menu de exportação |
| E8 | [T4_dialogo-png_2026-11-14.png](T4_dialogo-png_2026-11-14.png) | Diálogo com a opção PNG |

## 5. Resultado

### 5.1 Dados brutos

| Tarefa | Repetição 1 | Repetição 2 | Valor usado |
| --- | ---: | ---: | ---: |
| Criar forma | 2 | 2 | 2 |
| Mudar cor | 2 | 2 | 2 |
| Agrupar elementos | 3 | 3 | 3 |
| Exportar PNG | 3 | 3 | 3 |

Sequências observadas:

- criar forma: selecionar retângulo; desenhar;
- mudar cor: selecionar forma; clicar na amostra de cor;
- agrupar: selecionar por área; abrir menu contextual; clicar em **Agrupar
  seleção**;
- exportar PNG: abrir menu principal; clicar em **Exportar imagem**; clicar em
  **PNG**.

### 5.2 Cálculo

```text
média = (2 + 2 + 3 + 3) / 4 = 10 / 4 = 2,5 ações
```

### 5.3 Pontuação

| Valor medido | Regra da métrica | Pontuação |
| ---: | --- | ---: |
| 2,5 ações | 2 = média ≤ 3; 1 = 4–5; 0 = ≥ 6 | 2 |

**Justificativa:** a média observada, 2,5 ações, está na faixa de pontuação 2.

## 6. Observações e limitações

- A tarefa de criação tem duas execuções visíveis na gravação. O valor usado é a execução observada e rechecadas nos quadros.
- A contagem não inclui a criação das formas de apoio para agrupar e exportar,
  pois elas são preparação da cena, não ações da tarefa medida.
- Os vídeos foram usados somente para verificação e não permanecem na pasta de
  evidências.

## 7. Achado

Não se aplica: a pontuação não foi 0.

## 8. Contribuição para a questão

| Questão | Esta métrica indica que a hipótese foi | Por quê |
| --- | --- | --- |
| CI-Q4 | Confirmada | As quatro tarefas foram concluídas com média de 2,5 ações, dentro da faixa mais eficiente |
