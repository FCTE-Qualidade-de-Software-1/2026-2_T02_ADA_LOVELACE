# Estimativa de custos da avaliação

Esta página estima o esforço e o custo do **trabalho da equipe para avaliar o
Excalidraw**, atendendo à categoria *recursos e custos* da gestão com PSM/CID
descrita no artigo e em [Métricas de desenvolvimento](metricas.md). Os custos
de desenvolvimento e de operação do Excalidraw ficam fora do escopo.

## Método

A estimativa é **bottom-up, por atividades**, com apoio do
[guia de estimativa de custos do GAO](../referencias.md#estimativa-de-custos):
o trabalho é decomposto em 19 pacotes, distribuídos nas quatro fases do
artigo (F1 a F4) e em atividades transversais (T), e cada pacote recebe três
cenários de esforço em **pessoa-hora (p-h)**: otimista (O), base (B) e
pessimista (P). Como ainda não há registro de horas reais, os pacotes
concluídos têm estimativas retrospectivas, e os demais, previsões.

O esforço é valorado por uma taxa de referência acadêmica, a bolsa de
iniciação científica do [CNPq][cnpq-valores] (R$ 700,00 por mês) para 20 horas
semanais, conforme a [chamada PIBIC][iec-carga]:

```text
taxa = 700 / (20 × 52 / 12) = 8,08 R$/p-h
```

Os valores são uma **referência econômica, e não pagamentos** aos
integrantes. Ferramentas gratuitas (Excalidraw sob licença MIT, GitHub Free) e
equipamentos já disponíveis não são valorados; o desembolso efetivo da
avaliação permanece **não disponível**, o que não equivale a custo zero.

## Premissas

* **Ambientes:** cinco configurações que cobrem Windows, Linux, macOS, Android
  e iOS e os navegadores Chrome, Firefox, Edge e Safari, sem testar todas as
  combinações.
* **Participantes:** seis participantes externos (três iniciantes e três
  experientes), cada um com três sessões de 30 minutos no cenário B,
  conduzidas por dois integrantes. O tempo dos participantes (6 / 9 / 13,5 p-h)
  é somado à parte do esforço da equipe.
* **Melhoria:** a ação executada na Fase 4 é delimitada, como um protótipo ou
  uma proposta de processo; uma implementação maior exige nova estimativa.

## Esforço por pacote

**Fonte:** elaboração da equipe a partir do roteiro, das *issues* e do artigo,
com data-base 25/10/2026. Valores em p-h da equipe.

| Pacote | Atividade | Estado | O | B | P |
| --- | --- | --- | ---: | ---: | ---: |
| F1.1 | Método, normas e processo | concluída | 3 | 5 | 8 |
| F1.2 | Propósito, partes interessadas e escopo | concluída | 3 | 5 | 8 |
| F1.3 | Modelo de qualidade e priorização | concluída | 5 | 8 | 12 |
| F1.4 | Relação com os ODS | concluída | 2 | 3 | 5 |
| F2.1 | Objetivos de medição (GQM) | concluída | 3 | 5 | 8 |
| F2.2 | Questões, hipóteses, métricas e critérios | em andamento | 12 | 18 | 28 |
| F3.1 | Protocolos, casos de teste e dados de entrada | futura | 12 | 18 | 28 |
| F3.2 | Ambientes, ferramentas e instância local | futura | 6 | 10 | 16 |
| F3.3 | Participantes, consentimento e guarda dos registros | futura | 3 | 5 | 8 |
| F3.4 | Recursos, marcos e cronograma | futura | 2 | 4 | 6 |
| F4.1 | Medições de segurança (13 métricas) | futura | 10 | 16 | 24 |
| F4.2 | Medições de flexibilidade (12 métricas) | futura | 10 | 16 | 24 |
| F4.3 | Medições de capacidade de interação (26 métricas), com as sessões | futura | 22 | 30 | 44 |
| F4.4 | Consolidação, pontuação e respostas às questões GQM | futura | 8 | 12 | 18 |
| F4.5 | Priorização de melhorias e ação executada | futura | 6 | 10 | 16 |
| F4.6 | Ameaças à validade e conclusão do artigo | futura | 6 | 10 | 16 |
| T.1 | Manutenção da GitPage | em andamento | 6 | 10 | 16 |
| T.2 | Gestão, acompanhamento e reuniões | em andamento | 8 | 14 | 22 |
| T.3 | Revisão, integração e declaração de uso de IA | em andamento | 8 | 14 | 22 |

Nos pacotes em andamento, o esforço é dividido entre a parte já realizada e a
restante (O / B / P, em p-h):

| Pacote | Realizado (estimado) | Restante |
| --- | ---: | ---: |
| F2.2 | 10 / 14 / 22 | 2 / 4 / 6 |
| T.1 | 4 / 6 / 10 | 2 / 4 / 6 |
| T.2 | 2 / 4 / 6 | 6 / 10 / 16 |
| T.3 | 3 / 5 / 8 | 5 / 9 / 14 |

## Custos por fase

<!-- BEGIN CALCULO CUSTOS -->

**Fonte:** esforço por pacote acima × R$ 8,08/p-h, calculado pelo script. Esforço em p-h; custos em R$ no cenário B.

| Fase | O | B | P | Custo B | Restante B |
| --- | ---: | ---: | ---: | ---: | ---: |
| F1 | 13 | 21 | 33 | 169,68 | 0,00 |
| F2 | 15 | 23 | 36 | 185,84 | 32,32 |
| F3 | 23 | 37 | 58 | 298,96 | 298,96 |
| F4 | 62 | 94 | 142 | 759,52 | 759,52 |
| T | 22 | 38 | 60 | 307,04 | 185,84 |
| Equipe | 135 | 213 | 329 | 1.721,04 | 1.276,64 |
| Participantes externos | 6 | 9 | 13,5 | 72,72 | 72,72 |
| **Total humano** | **141** | **222** | **342,5** | **1.793,76** | **1.349,36** |

<!-- END CALCULO CUSTOS -->

A Fase 4 concentra o maior esforço, sobretudo F4.3, que reúne as sessões com
participantes. Ampliar a amostra, repetir sessões ou enfrentar problemas de
ambiente aumenta o custo.

## Acompanhamento

Conforme a decisão de gestão registrada no artigo, a equipe passa a registrar
as horas por integrante e por fase a partir da execução das medições. Na
Entrega 2, o esforço realizado de cada pacote será comparado ao previsto
(`desvio = realizado − previsto`, em p-h e em percentual), mantendo a mesma
taxa para isolar a variação de esforço.

As tabelas de custo são geradas por
[`calcular_custos_avaliacao.py`](https://github.com/FCTE-Qualidade-de-Software-1/2026-2_T02_ADA_LOVELACE/blob/main/scripts/calcular_custos_avaliacao.py),
que lê as horas desta página e os [parâmetros](dados/parametros-custos.json)
e grava a memória de cálculo em [custos-calculados.json](dados/custos-calculados.json):

```shell
python scripts/calcular_custos_avaliacao.py --write
python scripts/calcular_custos_avaliacao.py --check
```

[cnpq-valores]: https://www.gov.br/cnpq/pt-br/acesso-a-informacao/bolsas-e-auxilios/copy_of_modalidades/tabela-de-valores-no-pais
[iec-carga]: https://www.gov.br/iec/pt-br/iec-abre-chamada-para-o-programa-de-bolsas-de-iniciacao-cientifica-pibic-iec-202620132027
