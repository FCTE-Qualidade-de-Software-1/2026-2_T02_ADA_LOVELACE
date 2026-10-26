# Métricas de gestão do grupo

Esta página define o complemento de gestão que deve ser calculado pela sessão
automatizada de membros e atividades. O objetivo é avaliar a execução do
trabalho da equipe Ada Lovelace durante a análise do Excalidraw, e não medir a
qualidade do Excalidraw. Por isso, os resultados desta página não alteram a
pontuação dos 51 indicadores de produto do [roteiro da análise](roteiro.md).

## Objetivo e período de medição

**Objetivo:** acompanhar se o grupo distribui o trabalho, mantém o calendário,
produz evidências rastreáveis e revisa as entregas com qualidade suficiente
para sustentar a avaliação.

Cada execução deve informar uma janela `[data inicial, data final]`, a
referência da coleta e a data de coleta. A sessão deve consultar
commits, pull requests, revisões, issues e arquivos do repositório. Commits de
merge, bots e mensagens sem autor associado a um integrante devem ser
identificados e excluídos dos indicadores individuais, mas registrados na
configuração da coleta.

## Processo de trabalho e fonte dos dados

O grupo organiza as atividades em um fluxo Kanban no
[GitHub Projects](https://github.com/orgs/FCTE-Qualidade-de-Software-1/projects/19).
As tarefas são registradas como issues e percorrem os estados **Backlog**,
**A fazer**, **Em andamento**, **Em revisão** e **Concluído**. A
[lista de issues do repositório](https://github.com/FCTE-Qualidade-de-Software-1/2026-2_T02_ADA_LOVELACE/issues)
é a fonte de planejamento, responsáveis, prazos e vínculos com pull requests
e evidências.

| Estado | Critério de entrada | Critério de saída |
| --- | --- | --- |
| Backlog | Demanda identificada | Priorizada para um ciclo |
| A fazer | Priorizada e ainda não iniciada | Responsável inicia o trabalho |
| Em andamento | Trabalho efetivamente iniciado | Entrega pronta para revisão |
| Em revisão | Entrega disponível para conferência | Revisada e aprovada ou devolvida |
| Concluído | Entrega aprovada e incorporada | Não há ação pendente |

Esse fluxo torna visível o trabalho em andamento e permite identificar
acúmulo em revisão, tarefas que permanecem muito tempo em execução e
diferenças entre o que foi planejado e o que foi concluído.

!!! warning "Interpretação responsável"
    Quantidade de commits, linhas alteradas e tempo online são sinais de
    atividade, não medidas de produtividade individual. A interpretação deve
    combinar entrega, revisão, rastreabilidade e contexto, sem criar ranking
    entre integrantes. Trabalho documentado fora do Git deve ser registrado
    manualmente para não penalizar uma atividade legítima.

## Métricas individuais

As métricas individuais servem para identificar lacunas de participação e
necessidade de apoio. Elas devem ser apresentadas por integrante e sempre
acompanhadas do denominador, do período e da fonte.

### Quantidade de commits por integrante

A quantidade de commits não-merge é coletada automaticamente para complementar
a análise de participação. O script consulta o histórico do repositório,
agrupa os commits por autor e atualiza o arquivo
[`membros-commits.csv`](../gestao/dados/membros-commits.csv). O resultado
apresenta a data da coleta, o período ou referência analisada, o integrante e
a quantidade de commits identificada.

O resultado da última coleta também é exibido diretamente na página:
na tabela abaixo. O arquivo
[`membros-commits.csv`](../gestao/dados/membros-commits.csv) permanece
disponível para conferência e processamento.

<!-- BEGIN AUTO: membros-commits -->
| Integrante identificado | Commits não-merge |
| --- | ---: |
| Luis Felipe | 14 |
| João Pedro Lopes da Cruz | 5 |
| Zayra-Moraes | 5 |
| andrehsb | 4 |
| giovannafg | 3 |
| Renato Gameiro | 1 |
| **Total** | **32** |

*Última coleta: 2026-10-26T15:18:42+00:00, referência `main`.*
<!-- END AUTO: membros-commits -->

A atualização é executada semanalmente pelo
[workflow automatizado de métricas de membros](https://github.com/FCTE-Qualidade-de-Software-1/2026-2_T02_ADA_LOVELACE/blob/main/.github/workflows/metricas-membros.yml).
Também é possível executar a coleta manualmente quando necessário. Autores
com diferentes identificações no Git devem ser associados ao mesmo integrante
antes da consolidação, e autores não reconhecidos devem ser informados como
limitação.

O valor é uma evidência auxiliar de **G-I1** e não deve ser convertido
diretamente em uma nota individual. A interpretação deve considerar também
entregas, revisões, evidências produzidas e o contexto das atividades.

## Indicadores de fluxo

Além da participação individual, o acompanhamento deve observar a capacidade
de planejamento e entrega do grupo. Esses indicadores apoiam principalmente
G-G3, G-G4 e G-G7 e devem ser analisados por ciclo de duas semanas.

| Indicador | Fórmula | Uso na gestão |
| --- | --- | --- |
| Planejado versus concluído | tarefas concluídas no ciclo ÷ tarefas comprometidas no início do ciclo | Avaliar previsibilidade do planejamento |
| Lead Time | data de conclusão − data de criação da issue | Medir o tempo total de espera e execução |
| Cycle Time | data de conclusão − entrada em “Em andamento” | Medir o tempo de execução efetiva |
| Velocidade | tarefas concluídas no ciclo | Apoiar o planejamento do ciclo seguinte |
| Trabalho em andamento (WIP) | quantidade de tarefas nos estados “Em andamento” e “Em revisão” | Detectar excesso de tarefas abertas |
| Fluxo por estado | quantidade de tarefas em cada estado ao longo do ciclo | Identificar gargalos e acúmulo |

Lead Time e Cycle Time devem ser apresentados como mediana, acompanhados de
quantidade de tarefas e período analisado. Tarefas canceladas, duplicadas ou
reabertas devem ser identificadas e explicadas. Velocidade não é uma meta
individual nem deve ser usada para comparar integrantes.

O histórico das issues e do Kanban pode ser consolidado automaticamente, mas a
interpretação do motivo de atrasos, devoluções e mudanças de escopo permanece
responsabilidade da equipe. Quando uma tarefa não tiver data ou estado
suficiente para o cálculo, o resultado deve ser `N/A`, e não zero.

No estado atual do projeto, a coleta automática disponível é a quantidade de
commits não-merge. Os indicadores de Lead Time, Cycle Time, velocidade, WIP e
fluxo por estado ainda devem ser preenchidos pela equipe a cada ciclo a partir
do histórico do GitHub Projects. Eles estão definidos aqui para padronizar a
coleta, mas não devem ser apresentados como resultados automatizados enquanto
não houver dados registrados.

| ID | Métrica e fórmula | Fonte mínima | Referência para acompanhamento |
| --- | --- | --- | --- |
| **G-I1** | Dias ativos: dias distintos com commit, PR, revisão ou comentário ÷ dias úteis do período | GitHub Events/Commits/PRs | Todos os integrantes têm atividade em pelo menos 50% dos ciclos |
| **G-I2** | Cobertura de entrega: entregas atribuídas concluídas ÷ entregas atribuídas | Issues e PRs vinculados ao integrante | ≥ 80% |
| **G-I3** | Participação em revisão: PRs de outros integrantes revisados ÷ PRs elegíveis de outros integrantes | Reviews de PR | ≥ 1 revisão por PR elegível, distribuída entre o grupo |
| **G-I4** | Rastreabilidade: entregas com vínculo para issue e evidência ÷ entregas concluídas | PR/issue, links em `docs/analise` | ≥ 90% |
| **G-I5** | Taxa de retrabalho: PRs reabertos ou devolvidos por mudança necessária ÷ PRs concluídos | Histórico de PR e revisões | ≤ 30%; investigar, não punir |
| **G-I6** | Responsabilidade por evidência: evidências aceitas com responsável identificado ÷ evidências publicadas | Resultados e histórico Git | 100% |

Para G-I2, “entrega” deve ser definida antes da coleta (por exemplo, uma
issue fechada ou um PR aceito), e tarefas compartilhadas devem aceitar mais de
um responsável. G-I5 não deve ser usado isoladamente: revisões rigorosas e
mudanças de escopo podem aumentar o valor sem indicar falha individual.

## Métricas do grupo

Estas métricas são as principais para o julgamento da gestão. A sessão deve
calcular o valor bruto, a classificação e os itens que exigem ação.

| ID | Métrica e fórmula | Fonte mínima | Atendido | Parcial | Não atendido |
| --- | --- | --- | ---: | ---: | ---: |
| **G-G1** | Cobertura de participação: integrantes com atividade válida no ciclo ÷ integrantes ativos | GitHub e cadastro do grupo | 100% | 67%–99% | < 67% |
| **G-G2** | Equilíbrio de entregas: 1 − (maior participação individual − menor participação individual) | Entregas concluídas por integrante | ≥ 0,60 | 0,40–0,59 | < 0,40 |
| **G-G3** | Cumprimento do plano: entregas concluídas no prazo ÷ entregas planejadas para o período | Issues com marcos/prazos | ≥ 80% | 60%–79% | < 60% |
| **G-G4** | Tempo mediano de ciclo: mediana de abertura até fechamento de issue/PR | Histórico de issues/PRs | ≤ 7 dias | 8–14 dias | > 14 dias |
| **G-G5** | Revisão efetiva: PRs com revisão de outro integrante antes do merge ÷ PRs mesclados | Reviews e merges | ≥ 90% | 70%–89% | < 70% |
| **G-G6** | Rastreabilidade do estudo: métricas de produto com resultado, data, ambiente e evidência ÷ métricas executadas | `resultados.md` e evidências | ≥ 90% | 70%–89% | < 70% |
| **G-G7** | Saúde do backlog: issues vencidas abertas ÷ issues abertas com prazo | Issues e marcos | ≤ 10% | 11%–25% | > 25% |
| **G-G8** | Continuidade: ciclos consecutivos sem atividade do grupo | Histórico por ciclo | 0 | 1 | ≥ 2 |

O equilíbrio G-G2 é um alerta de distribuição, não uma meta de igualdade
aritmética. Uma diferença pode ser justificada por papéis, especialização ou
período de coleta; a justificativa deve aparecer no registro de decisões.

## Pontuação e decisão

Para manter a compatibilidade com o restante do site, cada métrica recebe:

* **2 pontos** quando está na coluna “Atendido”;
* **1 ponto** quando está na coluna “Parcial”;
* **0 ponto** quando está na coluna “Não atendido”.

A média das métricas do grupo é convertida em percentual por
`média / 2 × 100`. Use os mesmos limites da avaliação do produto:

| Percentual | Julgamento da gestão | Ação mínima |
| ---: | --- | --- |
| ≥ 75% | Atendida | Manter o processo e registrar boas práticas |
| 50%–74% | Parcialmente atendida | Criar ação, responsável e prazo no backlog |
| < 50% | Não atendida | Replanejar o ciclo e revisar riscos |

Qualquer métrica com 0 pontos deve gerar uma ação ou uma justificativa
registrada. A média não deve esconder falhas de rastreabilidade ou revisão.

## Procedimento de coleta automatizada

Esta seção é mantida para documentar como os dados são obtidos e permitir a
reprodução da medição. A automação deve registrar, para cada coleta:

```text
coleta: data, janela_inicio, janela_fim, referencia
grupo: integrantes_ativos, entregas_planejadas, entregas_concluidas
integrante: login, dias_ativos, entregas_concluidas, entregas_atribuidas,
            revisoes_de_outros, entregas_com_issue, entregas_com_evidencia,
            prs_reabertos, evidencias_responsaveis
grupo_calculado: G-G1, G-G2, G-G3, G-G4, G-G5, G-G6, G-G7, G-G8
```

Esses campos garantem que os resultados possam ser conferidos: a data e a
janela identificam o período, os dados do grupo e dos integrantes mostram os
denominadores, e os indicadores calculados registram o resultado da medição.
Esse procedimento não é uma métrica adicional nem altera a pontuação da
gestão.

Para reproduzir a métrica de commits localmente:

```bash
python scripts/collect_member_metrics.py
```

O workflow semanal
[de métricas de membros](https://github.com/FCTE-Qualidade-de-Software-1/2026-2_T02_ADA_LOVELACE/blob/main/.github/workflows/metricas-membros.yml) repete
essa coleta e versiona o CSV somente quando houver alteração. Commits de merge
são excluídos da contagem para evitar que a integração de alterações seja
confundida com uma nova entrega. A quantidade de commits deve ser combinada com
revisões, entregas, evidências e contexto antes de qualquer decisão de gestão.

O relatório deve mostrar, para cada métrica, **valor**, **fórmula aplicada**,
**denominador**, **pontuação**, **fonte** e **limitação**. Quando o denominador
for zero, o resultado deve ser `N/A`, com explicação explícita; não deve ser
convertido silenciosamente em 0% ou 100%.

## Registro recomendado

Ao final de cada ciclo, a equipe deve incluir no registro de gestão:

1. janela e referência analisadas;
2. tabela de valores das métricas e pontuações;
3. divergências entre GitHub e trabalho relatado;
4. ações corretivas, responsáveis e prazos;
5. decisão sobre escopo, ambiente ou prioridade que tenha afetado os números.

Não devem ser publicados dados pessoais desnecessários, horários detalhados,
informações de autenticação ou avaliações subjetivas sem evidência. A
consolidação pode usar os logins públicos do GitHub, já listados na
[página inicial](../index.md), mas o relatório deve privilegiar o desempenho
do processo coletivo.
