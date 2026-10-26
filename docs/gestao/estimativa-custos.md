# Estimativa de custos da avaliação

## Objetivo e escopo

Esta página documentará a estimativa de esforço e recursos necessários para
a equipe Ada Lovelace realizar a avaliação acadêmica da qualidade do
Excalidraw, na disciplina Qualidade de Software 1 da Universidade de Brasília,
no semestre 2026.2. O objetivo é apoiar o planejamento e o acompanhamento da
execução do estudo, mantendo as premissas e as fontes rastreáveis.

O objeto da estimativa é o **trabalho da equipe para realizar a avaliação**:
definir e planejar o estudo, preparar e executar as medições, organizar as
evidências, analisar os resultados e produzir e revisar os entregáveis
acadêmicos. Também serão considerados os recursos necessários à realização
dessas atividades, conforme forem identificados e fundamentados.

Os **custos da avaliação** correspondem ao esforço e aos recursos empregados
nesse estudo. Os **custos de desenvolvimento do Excalidraw** correspondem à
criação, à evolução e à manutenção do produto pelos seus desenvolvedores e
ficam fora desta estimativa, assim como os custos de operação da instância
pública pelos seus mantenedores. Eventuais atividades locais necessárias à
avaliação deverão ser delimitadas como parte do estudo.

## Relação com o planejamento do projeto

A estimativa seguirá o escopo e as decisões registrados na
[metodologia](../metodologia.md), na
[priorização de qualidades](../priorizacao.md) e no
[roteiro da análise](../analise/roteiro.md). A avaliação adota a família
SQuaRE, o modelo ISO/IEC 25010:2023 e a abordagem GQM, com foco em
**segurança, flexibilidade e capacidade de interação**.

No contexto da gestão com PSM/CID, esta página complementará o acompanhamento
de recursos e custos previsto no roteiro. A organização do trabalho permanece
descrita em [Métricas de desenvolvimento](metricas.md), e as evidências da
avaliação serão registradas em [Resultados](../analise/resultados.md).
A estimativa deverá respeitar os critérios de medição e julgamento já
definidos pela equipe.

## Fundamentação e método

### Finalidade na gestão com PSM/CID

No planejamento PSM/CID adotado no artigo `main.tex`, a categoria de recursos
e custos prevê registrar horas por integrante e por fase. Esta estimativa
operacionaliza essa necessidade: permitirá discutir se o trabalho previsto é
compatível com a disponibilidade da equipe e com o calendário, identificar
atividades que concentram esforço e fundamentar ajustes no planejamento.
As métricas de qualidade do produto e seus critérios de julgamento permanecem
os definidos no roteiro.

O método será **bottom-up, por atividades**: estimar cada pacote de trabalho
e agregar os resultados por fase e para o estudo. Como apoio metodológico,
o [guia de estimativa de custos do GAO](../referencias.md#estimativa-de-custos)
trata da decomposição do trabalho, das premissas, dos métodos de estimativa,
da documentação e da atualização com dados realizados. O procedimento abaixo
é uma adaptação para esta avaliação acadêmica; não implica adoção integral do
guia nem exigência adicional da disciplina.

### Conceitos e unidades

Para esta estimativa, serão utilizadas as seguintes definições operacionais:

* **Esforço humano:** soma do tempo de trabalho de cada participante nas
  atividades do estudo, em **pessoa-hora (p-h)**. Em atividades compartilhadas,
  soma-se o tempo de cada pessoa; duração de calendário não equivale a esforço.
  Espera por revisão ou processamento sem trabalho humano não será contada
  automaticamente como pessoa-hora.
* **Custo financeiro efetivo:** desembolso comprovadamente realizado para a
  avaliação, em **reais (R$)**, acompanhado de data, finalidade e comprovante
  ou registro verificável. Uma despesa prevista ainda não paga será
  identificada como previsão de desembolso, sem integrar o total efetivo.
* **Custo econômico estimado:** valor de referência atribuído ao trabalho e
  aos recursos consumidos no estudo, em **reais (R$)**. A valoração do trabalho
  acadêmico não comprova remuneração, contratação ou pagamento aos integrantes.

Ausência de registro será indicada como **não disponível**, e não como zero.
Os dados observados no repositório, as declarações da equipe, as estimativas
e as hipóteses terão sua natureza e sua fonte identificadas.

### Procedimento por atividades

1. Delimitar a data-base, a versão do planejamento e os entregáveis, usando
   as fases do artigo, o roteiro, as issues e o Kanban como fontes.
2. Decompor os entregáveis em atividades com identificador, fase, escopo,
   critério de conclusão e fonte documental. Explicitar dependências e
   recursos, sem atribuir responsáveis que não estejam documentados.
3. Estimar o esforço de cada atividade, registrando técnica, justificativa,
   premissas, restrições e incertezas. Quando houver cenários, manter o mesmo
   escopo entre eles e explicar o que varia.
4. Associar taxas horárias de referência aos tipos de trabalho e identificar
   recursos não humanos, com fonte e critério de alocação para o estudo.
5. Agregar somente as atividades do nível mais detalhado da decomposição,
   evitando somar novamente seus totais de fase. Revisão, reuniões e retrabalho
   deverão ter alocação explícita, sem duplicação em outras atividades.
6. Submeter as premissas à revisão da equipe e preservar a versão aprovada
   como linha de base para acompanhamento.

Atividades concluídas poderão receber estimativas retrospectivas, claramente
identificadas, quando não houver registros confiáveis de horas reais.
Commits, PRs e tempos de permanência no Kanban servirão para rastrear o
trabalho, sem conversão direta em pessoa-hora.

### Fórmulas de valoração

Para cada atividade `i`, o custo humano econômico de referência será:

```text
C_humano_i = soma, para cada tipo de trabalho r, de (H_i,r × T_r)
C_economico_base = soma_i(C_humano_i) + soma_j(R_j)
C_financeiro_efetivo = soma_k(D_k)
```

`H_i,r` é o esforço estimado do tipo de trabalho `r` na atividade `i`, em
pessoa-hora; `T_r` é sua taxa de referência, em R$/pessoa-hora; `R_j` é o
valor alocado de cada recurso não humano `j`, em R$; e `D_k` é cada desembolso
efetivo comprovado `k`, em R$. Assim, o produto de esforço e taxa resulta em
reais. Os totais por fase usarão a mesma regra de agregação.

Os totais econômico e financeiro serão apresentados separadamente, sem
somá-los: uma despesa pode já estar representada na valoração econômica de
um recurso. Caso haja pagamento por trabalho humano, seu registro financeiro
também não será adicionado novamente ao custo humano de referência.
Uma eventual contingência será justificada e mostrada à parte da base,
evitando repetir incertezas já contempladas nos cenários.

### Seleção das taxas horárias

As taxas serão escolhidas somente após identificar os tipos de trabalho.
Serão priorizadas fontes públicas rastreáveis, como estatísticas oficiais,
tabelas institucionais ou pesquisas com método e período declarados. Cada
taxa deverá registrar fonte, data de consulta, período de referência, perfil,
abrangência geográfica e justificativa de adequação às atividades acadêmicas.
Uma referência profissional será identificada como aproximação, sem atribuir
salário ou vínculo profissional aos integrantes.

Se uma fonte apresentar remuneração mensal, a conversão será documentada
como `taxa horaria = remuneracao de referencia / horas mensais de referencia`.
O denominador deverá ter fundamento na mesma fonte ou em premissa explícita
para revisão; não será adotado silenciosamente. Também será informado se o
valor inclui encargos ou outros componentes, para evitar duplicação.
Fontes de períodos ou moedas diferentes exigirão explicação de qualquer
conversão ou atualização. Sem fonte adequada, a taxa ficará pendente ou será
tratada como hipótese de cenário, sem aparência de valor observado.

### Recursos gratuitos e despesas

Ferramentas com uso gratuito confirmado para as condições da avaliação não
serão registradas como licenças pagas. A gratuidade deverá ter fonte e data
de verificação, incluindo limites relevantes do plano utilizado. Isso não
elimina o esforço de instalação, preparação ou operação pela equipe.

Equipamentos e conexão já disponíveis não serão tratados como novas compras
do projeto. Uma eventual valoração econômica de uso deverá ter critério de
rateio, período e fonte explícitos; sem esses elementos, será registrada como
não valorada. Serviços pagos e demais despesas só integrarão o total efetivo
mediante comprovação e vínculo com a avaliação. Itens compartilhados terão
critério de alocação que impeça cobrar o mesmo recurso mais de uma vez.

### Comparação entre previsto e realizado

O acompanhamento usará os mesmos identificadores de atividade e fases da
linha de base. Cada registro de esforço realizado deverá informar data,
atividade, integrante, tempo em pessoa-hora e origem do registro. Horas
declaradas por integrantes serão identificadas como tais e terão o modo de
registro e conferência documentado. Estimativas retrospectivas ficarão
separadas dos registros de esforço realizado.

Para atividades concluídas e com registros comparáveis, serão calculados:

```text
desvio_esforco = H_realizado - H_previsto
desvio_percentual = (H_realizado - H_previsto) / H_previsto × 100
```

O desvio absoluto será expresso em pessoa-hora, e o relativo, em percentual;
valor positivo indicará esforço acima do previsto. Se o previsto for zero
ou inexistente, o percentual será **não aplicável**, com justificativa.
Registros incompletos não serão apresentados como totais realizados: a
cobertura de atividades e do período deverá acompanhar a comparação.
Atividades em andamento terão esforço acumulado e estimativa restante
identificados separadamente, sem comparação de execução parcial com uma
atividade concluída.

Para comparar a valoração do esforço previsto e realizado, serão mantidas as
mesmas taxas de referência da linha de base, isolando a variação de esforço.
Essa valoração do realizado continuará sendo econômica, e não comprovação
de pagamento. Desembolsos serão comparados apenas às respectivas previsões
financeiras. Mudanças de escopo, taxas ou premissas gerarão nova versão
identificada, preservando a linha de base e a justificativa da revisão.

## Mapeamento das atividades e recursos

### Data-base, fontes e interpretação dos estados

Levantamento realizado em **25/10/2026**, com a documentação de `origin/main`
no commit `f81800b0348398bc1cce85fe941476f22f4f52ab` e as etapas anteriores
desta estimativa na branch `feat/estimativa-custos`. Foram consultadas as
issues #9 a #22, os PRs #23 e #24, o roteiro, os resultados, a metodologia,
as métricas de desenvolvimento e as fases e entregáveis do [artigo].

O [Kanban] foi consultado, mas retornou “Page not found” no navegador desta
sessão; não foi possível verificar as colunas atuais dos cartões. O fluxo e
a fotografia de **19/10/2026** disponíveis em [Métricas de desenvolvimento]
foram usados apenas como registro histórico. Issue aberta não permite
distinguir, sozinha, Backlog, A fazer, Em andamento ou Em revisão.

Os estados abaixo são classificações documentais para a estimativa:

* **Concluída:** issue encerrada como concluída e entregável presente na base.
* **Em andamento:** há trabalho documental disponível, mas a issue permanece
  aberta, o PR aguarda integração ou o pacote ainda está sendo elaborado.
  Essa classificação não comprova trabalho humano contínuo nem uma coluna
  específica do Kanban.
* **Futura:** atividade requerida pelo roteiro ou pelo artigo, sem evidência
  de conclusão nas fontes consultadas; início efetivo não confirmado.

As fases seguem o processo descrito no artigo: definição (F1), especificação
das medições (F2), plano (F3) e execução e conclusão (F4). As issues #17 a #20
possuem label `fase-2`, embora tratem de execução e resultados; o mapeamento
usa F4 pelo conteúdo do artigo e preserva as labels existentes. A issue #22
está concluída, enquanto #16 permanece aberta e o roteiro já contém GQM;
essa divergência é mantida explícita, sem declarar a especificação inteira
encerrada.

### Estrutura de decomposição do trabalho

Os IDs identificam pacotes para estimar posteriormente. F1 a F4 agrupam as
fases; T identifica trabalho transversal. As dependências representam uma
sequência lógica proposta a partir dos entregáveis, não um cronograma
aprovado. Cada linha define seu limite e o entregável esperado; não contém
horas nem valores. Os códigos de recursos são definidos na seção seguinte.

**Fonte das tabelas:** elaboração desta decomposição a partir das fontes
indicadas em cada linha, consultadas na data-base. Os pacotes sem issue
específica derivam do artigo ou do roteiro e precisam de validação pela
equipe. As tabelas são qualitativas; IDs, fases e recursos são códigos,
sem unidade de esforço ou custo.

| ID / fase | Atividade e entregável de conclusão | Estado e evidência | Dependências | Recursos |
| --- | --- | --- | --- | --- |
| F1.1 / F1 | Documentar método, normas e processo: metodologia disponível | Concluída: [#10], [Metodologia](../metodologia.md) | — | R1, R2, R6 |
| F1.2 / F1 | Definir propósito, partes interessadas e escopo: delimitação documentada | Concluída: [#11], [Propósito](../fase1/proposito-partes-interessadas.md), [página inicial](../index.md) | — | R1, R2, R6 |
| F1.3 / F1 | Adaptar modelo e priorizar características: modelo e matriz disponíveis | Concluída: [#12], [Modelo](../fase1/modelo-qualidade.md), [Priorização](../priorizacao.md) | F1.2 | R1, R2, R6 |
| F1.4 / F1 | Relacionar o estudo aos ODS: relações e indicadores documentados | Concluída: [#13], [ODS](../fase1/ods.md) | F1.2, F1.3 | R1, R2, R6 |
| F2.1 / F2 | Definir objetivos de medição: objetivos GQM documentados | Concluída: [#14], [Objetivos](../fase1/objetivos-qualidade.md) | F1.1, F1.2, F1.3 | R1, R2, R6 |
| F2.2 / F2 | Consolidar questões, métricas, hipóteses e critérios: roteiro revisado e fechamento reconciliado | Em andamento: [#16] aberta; [#22] concluída; [Roteiro] existente | F2.1 | R1, R2, R6 |

| ID / fase | Atividade e entregável de conclusão | Estado e evidência | Dependências | Recursos |
| --- | --- | --- | --- | --- |
| F3.1 / F3 | Detalhar instruções, casos de teste e dados de entrada: protocolo reproduzível coerente com as métricas | Futura: [Roteiro], seção 5; [artigo], Fase 3 ainda em comentários | F2.2 | R1, R2, R3, R6 |
| F3.2 / F3 | Fixar versão e preparar ambientes e ferramentas: configuração registrada, incluindo instância local quando necessária | Futura: [Roteiro], seção 5; [Resultados](../analise/resultados.md), configuração por preencher | F3.1 | R1, R3, R5, R6 |
| F3.3 / F3 | Planejar participantes, autorização, consentimento e tratamento dos registros: protocolo e condições de acesso definidos | Futura: [artigo], aspectos éticos; [Roteiro], seção 5 | F3.1 | R1, R4, R6 |
| F3.4 / F3 | Consolidar recursos, disponibilidade, marcos e dependências: plano e cronograma revisados | Futura: [artigo], Fase 3; disponibilidade e marcos finais não confirmados | F3.1, F3.2, F3.3; insumos de T.2 | R1, R2, R6 |
| F4.1 / F4 | Executar medições de segurança e registrar evidências por métrica | Futura: [#17] aberta, sem responsável; [Resultados](../analise/resultados.md) por preencher | F3.1, F3.2, F3.4 | R1, R2, R3, R5, R6 |
| F4.2 / F4 | Executar medições de flexibilidade e registrar evidências por ambiente | Futura: [#18] aberta, sem responsável; [Resultados](../analise/resultados.md) por preencher | F3.1, F3.2, F3.4 | R1, R2, R3, R6 |
| F4.3 / F4 | Executar medições de capacidade de interação e acessibilidade: observações e respostas vinculadas às métricas | Futura: [#19] aberta, sem responsável; [Resultados](../analise/resultados.md) por preencher | F3.1, F3.2, F3.4; F3.3 para sessões com participantes | R1, R2, R3, R4, R5, R6 |
| F4.4 / F4 | Consolidar dados, pontuar, responder ao GQM e discutir relações entre características: resultados e julgamento rastreáveis | Futura: [#20] aberta; [Resultados](../analise/resultados.md) por preencher; [artigo], Fase 4 | F4.1, F4.2, F4.3 | R1, R2, R6 |
| F4.5 / F4 | Priorizar melhorias e executar uma ação fundamentada: proposta e evidência da ação | Futura: [artigo], oportunidades de melhoria e ação executada | F4.4 | R1, R2, R6; R3/R5 conforme ação escolhida |
| F4.6 / F4 | Concluir relato acadêmico: ameaças à validade, conclusão e integração dos resultados e da gestão no artigo | Futura: [artigo], seções finais ainda em comentários | F4.4, F4.5; registros de T.2 | R1, R2, R6 |

| ID / fase | Atividade e entregável de conclusão | Estado e evidência | Dependências | Recursos |
| --- | --- | --- | --- | --- |
| T.1 / transversal | Manter site, navegação e apresentação: estrutura publicada e atualizações verificadas | Em andamento para manutenção; estrutura inicial e ajuste de diagramas concluídos em [#9] e [#15] | Estrutura inicial sem dependência; atualizações conforme entregas | R1, R2, R6 |
| T.2 / transversal | Acompanhar fluxo, horas, custos e decisões: registros de gestão e estimativa revisados | Em andamento: [#21] aberta, [PR #23] e [PR #24] abertos; esta página em elaboração | Planejamento inicial; atualização ao longo de F1–F4 | R1, R2, R6 |
| T.3 / transversal | Revisar e integrar entregas e declarar uso de IA: revisões, links, fontes e declarações conferidos | Em andamento: processo no [artigo] e no [Roteiro]; [Uso de IA](../uso-ia.md) existente; revisão final pendente | Cada entregável disponível; encerramento após F4.6 | R1, R2, R6 |

A decomposição separa a coleta e o registro imediato das evidências (F4.1 a
F4.3) da análise consolidada (F4.4). O relato científico fica em F4.6; a
manutenção técnica do site, em T.1; a revisão e a integração, em T.3. Ao
estimar esforço, cada operação deverá ser atribuída a um único pacote,
inclusive reuniões e retrabalho. O trabalho transversal será agregado uma
única vez, com distribuição por fase somente quando houver critério explícito.

### Recursos humanos e atribuições documentadas

A equipe cadastrada na [página inicial](../index.md) reúne André Henrique,
Giovanna Felipe, João Pedro Lopes, Luís Cunha, Renato Araújo e Zayra Moraes.
Os papéis de preparação, execução, análise, redação e revisão são necessidades
dos pacotes, não novas atribuições individuais.

**Fonte da tabela:** campos de responsáveis das issues na data-base e
solicitação de Renato para esta estimativa. Os nomes indicam atribuições
documentadas, sem unidade de esforço e sem pressupor execução exclusiva.

| Pacote / referência | Atribuição documentada | Limite da informação |
| --- | --- | --- |
| F1.1 / [#10] | Renato (`renatoyx`) | Metodologia |
| F1.2 / [#11] | André (`andrehsb`) | Propósito e partes interessadas; não atribui todo o escopo do pacote |
| F1.3 / [#12] e F1.4 / [#13] | Giovanna (`giovannafg`) | Modelo e ODS; priorização sem nova atribuição nesta tabela |
| F2.1 / [#14] | Zayra (`Zayra-Moraes`) | Objetivos de qualidade |
| F2.2 / [#22] | João Pedro (`ojplc`) | Definição de métricas da issue #22; #16 sem responsável atribuído |
| T.1 / [#9] | Luís (`cunha-luiss`) | Estrutura inicial; #15 sem responsável atribuído |
| T.2 / [#21] | Luís (`cunha-luiss`) e Zayra (`Zayra-Moraes`) | Página de métricas; não atribui toda a gestão |
| T.2 / esta estimativa | Renato (`renatoyx`) | Responsabilidade declarada na solicitação desta tarefa |

As issues #17, #18, #19 e #20 não têm responsáveis atribuídos na consulta.
Não se estendem as responsabilidades da definição das características à
execução das medições. A distribuição dos demais pacotes e a disponibilidade
de cada integrante permanecem pendentes de confirmação pela equipe.

### Catálogo de recursos e pendências

**Fonte da tabela:** roteiro (métricas e seção 5), artigo (recursos, aspectos
éticos e rastreabilidade), README e documentação de gestão. Os recursos são
necessidades ou opções citadas nessas fontes, não comprovação de aquisição,
disponibilidade ou uso. Os códigos são qualitativos e não representam
quantidades, licenças ou custos.

| Código | Recurso e finalidade | Condição a confirmar |
| --- | --- | --- |
| R1 | Equipe: preparar protocolos, executar testes, analisar, redigir e revisar | Distribuição das tarefas futuras, disponibilidade e registro de horas |
| R2 | Git, GitHub, issues, PRs e Project #19: versionamento, planejamento e revisão | Acesso ao quadro, responsáveis e marcos atualizados; automações dos PRs ainda não integradas |
| R3 | Computadores, dispositivos móveis, navegadores, sistemas e conexão: executar os ambientes selecionados e colaboração | Inventário, versões, resoluções e condições de rede; não se presume compra |
| R4 | Participantes e instrumentos de sessão: tarefas, questionários SUS/Likert, consentimento e eventual gravação | Autorização, amostra e perfis, recrutamento, acesso e guarda dos registros; aplicação somente às métricas pertinentes |
| R5 | Ferramentas técnicas citadas no roteiro: DevTools, Burp Suite ou ZAP, npm audit, Advisory Database, Security Headers, axe DevTools/Lighthouse/WAVE e NVDA/VoiceOver; código e instância local do Excalidraw | Seleção conforme métrica, instalação, versões e condições de uso/licença; alternativas não significam uso cumulativo de todas as ferramentas |
| R6 | Artefatos e publicação: casos, dados de entrada, evidências, registros de horas, Markdown/MkDocs, Mermaid e LaTeX | Formato e local dos registros, dependências de compilação e revisão; fontes e comandos junto às evidências |

Testes que adulterem dados ou possam afetar o serviço dependem da preparação
da instância local (F3.2), conforme o roteiro. Sessões com participantes
dependem das condições éticas de F3.3. O detalhamento das ferramentas e dos
ambientes não está encerrado, e as seções de F3 e F4 do artigo ainda são
esboços; a existência desses títulos não comprova execução.

Os PRs #23 e #24 permaneciam abertos na consulta de 25/10/2026, com destino
a `main` e `dev`, respectivamente. Suas propostas de coleta e gestão foram
consideradas como trabalho em revisão, sem incorporar suas métricas ou
automações como capacidade já disponível na base. Este levantamento não
modifica issues, Kanban, responsáveis ou critérios do grupo.

[artigo]: https://github.com/FCTE-Qualidade-de-Software-1/2026-2_T02_ADA_LOVELACE/blob/f81800b0348398bc1cce85fe941476f22f4f52ab/main.tex
[Kanban]: https://github.com/orgs/FCTE-Qualidade-de-Software-1/projects/19
[Métricas de desenvolvimento]: metricas.md
[Roteiro]: ../analise/roteiro.md
[#9]: https://github.com/FCTE-Qualidade-de-Software-1/2026-2_T02_ADA_LOVELACE/issues/9
[#10]: https://github.com/FCTE-Qualidade-de-Software-1/2026-2_T02_ADA_LOVELACE/issues/10
[#11]: https://github.com/FCTE-Qualidade-de-Software-1/2026-2_T02_ADA_LOVELACE/issues/11
[#12]: https://github.com/FCTE-Qualidade-de-Software-1/2026-2_T02_ADA_LOVELACE/issues/12
[#13]: https://github.com/FCTE-Qualidade-de-Software-1/2026-2_T02_ADA_LOVELACE/issues/13
[#14]: https://github.com/FCTE-Qualidade-de-Software-1/2026-2_T02_ADA_LOVELACE/issues/14
[#15]: https://github.com/FCTE-Qualidade-de-Software-1/2026-2_T02_ADA_LOVELACE/issues/15
[#16]: https://github.com/FCTE-Qualidade-de-Software-1/2026-2_T02_ADA_LOVELACE/issues/16
[#17]: https://github.com/FCTE-Qualidade-de-Software-1/2026-2_T02_ADA_LOVELACE/issues/17
[#18]: https://github.com/FCTE-Qualidade-de-Software-1/2026-2_T02_ADA_LOVELACE/issues/18
[#19]: https://github.com/FCTE-Qualidade-de-Software-1/2026-2_T02_ADA_LOVELACE/issues/19
[#20]: https://github.com/FCTE-Qualidade-de-Software-1/2026-2_T02_ADA_LOVELACE/issues/20
[#21]: https://github.com/FCTE-Qualidade-de-Software-1/2026-2_T02_ADA_LOVELACE/issues/21
[#22]: https://github.com/FCTE-Qualidade-de-Software-1/2026-2_T02_ADA_LOVELACE/issues/22
[PR #23]: https://github.com/FCTE-Qualidade-de-Software-1/2026-2_T02_ADA_LOVELACE/pull/23
[PR #24]: https://github.com/FCTE-Qualidade-de-Software-1/2026-2_T02_ADA_LOVELACE/pull/24

## Estimativa de esforço

### Data-base e natureza dos valores

**Versão E1, data-base 25/10/2026, provisória para revisão da equipe.**
O escopo é o dos 19 pacotes mapeados acima, das 51 métricas do roteiro
(13 de segurança, 12 de flexibilidade e 26 de capacidade de interação) e dos
entregáveis do artigo. `origin/main` permanece em `f81800b`; os PRs #23 e #24
continuam abertos. Não foram encontrados registros de horas reais nos
arquivos consultados. Nenhum valor desta seção representa esforço observado
ou declaração individual de horas.

A técnica é a **estimativa analítica por decomposição**, com três pontos por
pacote: otimista (O), base (B) e pessimista (P). Cada orçamento base é a soma
dos blocos de trabalho explicitados nas tabelas; suas durações são hipóteses
de planejamento produzidas nesta elaboração, não produtividade histórica.
O e P representam menor ou maior dificuldade de execução do mesmo escopo.
Não são limites garantidos nem intervalos estatísticos. Não se usa média
ponderada PERT: B é o cenário central proposto, e não uma esperança calculada.

Para pacotes concluídos, os valores são **estimativas retrospectivas**.
Para pacotes futuros, são previsões do trabalho integral. Para os quatro
pacotes em andamento (F2.2, T.1, T.2 e T.3), o esforço integral é dividido em
parcela retrospectiva e restante, ambas estimadas. A existência do entregável
ajuda a delimitar o conteúdo, mas não permite medir seu custo passado.
O esforço real permanece **não disponível** para todos os pacotes; zero na
coluna de restante significa ausência de trabalho adicional no escopo
concluído, nunca ausência de esforço passado.

### Premissas de dimensionamento

* **P1 — Cobertura técnica:** preservar as métricas e denominadores do roteiro.
  Para dimensionar F3.2 e F4.2, propõem-se cinco configurações que cubram
  Windows, Linux, macOS, Android e iOS e os navegadores Chrome, Firefox, Edge
  e Safari, sem exigir o produto cartesiano de todas as combinações. A
  distribuição exata deve ser validada; as resoluções de 360, 768, 1366 e
  2560 px e os testes offline também estão incluídos. Acesso aos equipamentos
  é uma hipótese, sem compra presumida. Cobertura adicional exige revisão.
* **P2 — Participantes:** hipótese de seis participantes externos à equipe,
  com três iniciantes e três experientes e experiência de migração suficiente
  para F-M8 e F-M9. Cada participante realizará três sessões, preservando a
  comparação entre primeira e terceira sessão de CI-M8. Essa composição não
  foi aprovada ou recrutada e não constitui justificativa estatística de
  amostra nem garantia de representação dos perfis de acessibilidade.
* **P3 — Sessões compartilhadas:** orçamento por sessão de 20, 30 ou 45
  minutos (O/B/P), com dois integrantes da equipe em papéis de condução e
  registro. As mesmas sessões contemplarão tarefas de interação e migração,
  mediante protocolo viável e sem comprometer as medições. Toda condução e
  registro dessas sessões será alocada em F4.3, sem repetição em F4.2.
  Se o protocolo não couber nesse tempo, ou exigir grupos distintos, a
  estimativa deverá ser revista antes de ser adotada como linha de base.
* **P4 — Incerteza técnica:** O pressupõe acesso pronto aos recursos e pouca
  repetição; B admite preparação e correções localizadas; P admite obstáculos
  de ambiente, repetição de testes e retrabalho dentro do escopo. A espera
  por equipamentos, consentimento ou revisão afeta o calendário, mas só vira
  esforço quando houver trabalho humano. Não se pressupõem automações dos
  PRs pendentes, nem auditoria invasiva de infraestrutura de terceiros.
* **P5 — Limites dos pacotes:** execução inclui evidências e repetição técnica;
  F4.4 inclui tratamento e interpretação; F4.6 inclui redação; T.3 concentra
  revisão por pares, ajustes editoriais de integração e declaração de IA.
  T.2 inclui reuniões de planejamento e gestão, inclusive esta estimativa.
  A ação de F4.5 é uma melhoria delimitada, como um protótipo ou proposta de
  processo, conforme permitido no artigo; uma implementação mais ampla
  requer novo orçamento.

P1 e os requisitos de sessões e métricas derivam do [Roteiro]; os tamanhos,
tempos, composição dos grupos e orçamentos são **premissas propostas nesta
estimativa**, para revisão humana. Não foram relatados pelos integrantes.

### Esforço integral por pacote

**Fonte e unidade das tabelas:** estimativa analítica desta elaboração a
partir dos pacotes e fontes do mapeamento e das premissas P1–P5. Todos os
valores O/B/P e parcelas da justificativa estão em **pessoa-hora da equipe
(p-h)**. Os orçamentos base expressam trabalho somado entre pessoas, não
horas de calendário. As dependências são as do mapeamento; as justificativas
explicam os fatores que ampliam ou reduzem cada faixa.

| Pacote / natureza | O | B | P | Composição de B e justificativa da faixa |
| --- | ---: | ---: | ---: | --- |
| F1.1 / retrospectiva | 3 | 5 | 8 | 2 de leitura e delimitação + 3 de redação do método. Faixa varia com familiaridade com SQuaRE/GQM e necessidade de alinhar o processo. |
| F1.2 / retrospectiva | 3 | 5 | 8 | 2 de análise do contexto + 3 de propósito, interessados e escopo. Divergências de fronteira e necessidades ampliam a faixa. |
| F1.3 / retrospectiva | 5 | 8 | 12 | 4 de adaptação do modelo + 4 de matriz e justificativas. A seleção entre características e sua coerência com o escopo elevam a complexidade. |
| F1.4 / retrospectiva | 2 | 3 | 5 | 1 de consulta aos ODS + 2 de vinculação e documentação. A faixa considera dificuldade de distinguir contribuição do estudo de impacto social observado. |
| F2.1 / retrospectiva | 3 | 5 | 8 | 3 de formulação dos objetivos + 2 de rastreabilidade às características e interessados. A necessidade de reformulação amplia a faixa. |
| F2.2 / mista | 12 | 18 | 28 | 14 retrospectivas para formular e documentar questões, hipóteses, métricas e critérios + 4 restantes para conferir a coerência e reconciliar as issues. As 51 métricas e divergências documentais ampliam a faixa. |
| F3.1 / futura | 12 | 18 | 28 | 3 blocos de 6 para protocolos de segurança, flexibilidade e interação. O compartilhamento de casos reduz trabalho; métricas com múltiplos contextos e pilotos exigem detalhamento adicional. |
| F3.2 / futura | 6 | 10 | 16 | 5 de configuração dos ambientes de P1 + 3 de ferramentas e instância local + 2 de verificação e registro. Acesso a macOS/iOS e dependências locais são riscos da faixa. |
| F3.3 / futura | 3 | 5 | 8 | 2 de protocolo/consentimento + 2 de recrutamento e agendamento + 1 de organização da guarda dos registros. O recrutamento de perfis e reagendamentos exigem esforço adicional; esperas ficam fora. |
| F3.4 / futura | 2 | 4 | 6 | 2 de consolidação de recursos e disponibilidade + 2 de marcos e dependências. A indisponibilidade de responsáveis e datas demanda renegociação; reuniões gerais ficam em T.2. |

| Pacote / natureza | O | B | P | Composição de B e justificativa da faixa |
| --- | ---: | ---: | ---: | --- |
| F4.1 / futura | 10 | 16 | 24 | 4 de tráfego/armazenamento + 4 de acesso, identidade e registros + 4 de integridade/concorrência local + 4 de dependências, cabeçalhos e evidências. As 13 métricas compartilham inspeções; falhas e reprodução ampliam a faixa. |
| F4.2 / futura | 10 | 16 | 24 | 5 configurações × 1,5 = 7,5 + 4 resoluções × 0,5 = 2 + 1,5 de offline + 5 de comparação funcional, arquivos e migração técnica. P1 evita todas as combinações; sessões de F-M8/F-M9 ficam em F4.3. Dificuldades de reprodução e formatos ampliam a faixa. |
| F4.3 / futura | 22 | 30 | 44 | 6 participantes × 3 sessões × 0,5 × 2 integrantes = 18 + 12 de inspeções da interface, teclado, leitor de tela, contraste, tradução e evidências. Em O/P, sessões consomem 12/27 e inspeções 10/17. As 26 métricas combinam observação humana e inspeção técnica; P2/P3 precisam de validação. |
| F4.4 / futura | 8 | 12 | 18 | 4 de limpeza/consolidação + 4 de pontuação e respostas GQM + 4 de interpretação, relações e limitações. Dados incompletos e divergências entre fontes ampliam a faixa; recoleta fica nos pacotes de execução. |
| F4.5 / futura | 6 | 10 | 16 | 2 de priorização a partir dos achados + 6 de ação delimitada + 2 de verificação/evidência. A escolha depende de F4.4; complexidade ou integração superior a P5 exige reestimativa. |
| F4.6 / futura | 6 | 10 | 16 | 6 de redação/inserção de resultados + 2 de ameaças e conclusão + 2 de síntese da gestão. Articulação entre fases e restrição de extensão do artigo ampliam a faixa; revisão por pares fica em T.3. |
| T.1 / mista | 6 | 10 | 16 | 6 retrospectivas de estrutura/apresentação + 4 restantes de manutenção, navegação e builds das entregas. Problemas de apresentação ampliam a faixa; conteúdo científico fica nos pacotes de fase. |
| T.2 / mista | 8 | 14 | 22 | 4 retrospectivas de organização/gestão + 10 restantes: 6 para completar estimativa e registros de acompanhamento, e 4 de reuniões (2 encontros × 2 integrantes × 1 h). Frequência provisória; novas reuniões e automações complexas exigem revisão. |
| T.3 / mista | 8 | 14 | 22 | 5 retrospectivas de revisão/integração + 9 restantes de conferência cruzada, integração e declaração de IA. Divergências e devoluções ampliam a faixa. Correções técnicas e nova coleta não são contadas novamente aqui. |

O tempo dos participantes externos **não está incluído** nessas tabelas da
equipe. Sob P2/P3, a participação externa estimada é `6 × 3 × duração da
sessão`: **6 / 9 / 13,5 p-h** em O/B/P, respectivamente. É recurso humano
adicional, sem remuneração presumida, e será mostrado separadamente em
qualquer valoração posterior. Se integrantes da equipe atuarem como
participantes, os papéis e a alocação deverão ser revistos para evitar dupla
contagem e discutir o efeito metodológico.

### Separação entre retrospectivo e restante

**Fonte da tabela:** decomposição proposta nesta versão E1; unidade **p-h da
equipe**. Cada tripla está na ordem **O / B / P**. São estimativas, inclusive
as parcelas retrospectivas; não são percentual de execução nem horas reais.

| Pacote em andamento | Parcela retrospectiva estimada | Parcela restante estimada | Integral estimado |
| --- | ---: | ---: | ---: |
| F2.2 | 10 / 14 / 22 | 2 / 4 / 6 | 12 / 18 / 28 |
| T.1 | 4 / 6 / 10 | 2 / 4 / 6 | 6 / 10 / 16 |
| T.2 | 2 / 4 / 6 | 6 / 10 / 16 | 8 / 14 / 22 |
| T.3 | 3 / 5 / 8 | 5 / 9 / 14 | 8 / 14 / 22 |

**Fonte da síntese:** soma dos pacotes anteriores por fase, sem nova parcela
de contingência. Unidade **p-h da equipe**, triplas **O / B / P**. Concluídos
têm restante zero; futuros têm retrospectivo zero por convenção deste
planejamento, sem afirmar que ninguém iniciou trabalho fora do repositório.

| Fase/grupo | Retrospectivo estimado | Restante estimado | Integral estimado |
| --- | ---: | ---: | ---: |
| F1 | 13 / 21 / 33 | 0 / 0 / 0 | 13 / 21 / 33 |
| F2 | 13 / 19 / 30 | 2 / 4 / 6 | 15 / 23 / 36 |
| F3 | 0 / 0 / 0 | 23 / 37 / 58 | 23 / 37 / 58 |
| F4 | 0 / 0 / 0 | 62 / 94 / 142 | 62 / 94 / 142 |
| Transversal | 9 / 15 / 24 | 13 / 23 / 36 | 22 / 38 / 60 |
| **Total equipe** | **35 / 55 / 87** | **100 / 158 / 242** | **135 / 213 / 329** |

Somente o **restante estimado** deve orientar a capacidade futura; somar o
retrospectivo novamente superestimaria a demanda a partir da data-base.
Os totais O e P combinam todas as hipóteses favoráveis ou desfavoráveis;
não há fundamento para lhes atribuir probabilidade de ocorrência.

### Calendário, capacidade e revisão das premissas

O artigo registra **26/10/2026 para a primeira entrega**, referente às fases
iniciais, e propõe marcos semanais para F3. Não foi localizado prazo final
confirmado para F3/F4 nem disponibilidade individual registrada. Portanto,
não é possível afirmar que as horas restantes cabem no calendário acadêmico.
As 158 p-h restantes do cenário base não devem ser concentradas na véspera
da primeira entrega ou convertidas automaticamente em dias corridos.

Como análise de capacidade **hipotética**, se os seis integrantes pudessem
dedicar 4 p-h por semana cada um, a capacidade seria `6 × 4 = 24 p-h/semana`.
O esforço restante exigiria, pelo quociente `esforco / capacidade`, cerca de
**4,2 / 6,6 / 10,1 semanas** em O/B/P, arredondadas para uma casa decimal.
As 4 p-h semanais são uma hipótese para explicitar a disponibilidade limitada,
não um compromisso ou relato dos membros. O quociente é apenas uma referência
agregada: dependências, sessões repetidas, acesso a dispositivos e esperas
podem alongar o calendário, mesmo com capacidade total suficiente.

Antes de aprovar a linha de base, a equipe deverá confirmar prazo final,
disponibilidade por período, ambientes acessíveis, participantes e duração
do protocolo, alcance da melhoria e rotina de reuniões/revisões. Caso a
capacidade não comporte a previsão, será necessário renegociar a execução
e registrar as decisões; esta estimativa não reduz métricas ou critérios
para acomodar horas. Registros reais substituirão comparações retrospectivas
somente quando tiverem origem e cobertura verificáveis. Até lá, estes valores
permanecem hipóteses revisáveis, sem validação individual da equipe.

## Cálculo dos custos e cenários

### Referência acadêmica e conversão horária

**Versão C1, data-base e consulta das fontes: 25/10/2026.** Para valorar o
esforço estudantil, adota-se provisoriamente uma referência de iniciação
científica, em vez de atribuir salários profissionais aos integrantes.
A [tabela do CNPq][cnpq-valores] informa R$ 700,00 para IC; a divulgação da
[chamada PIBIC/IEC/CNPq 2026–2027][iec-carga] associa a bolsa mensal de
R$ 700,00 à disponibilidade de 20 horas semanais de estudantes de graduação.
É referência nacional de fomento, apoiada por uma chamada de instituição no
Pará, sem correspondência presumida com vínculo ou bolsa da equipe na UnB.

A conversão usa a **convenção de 52 semanas por 12 meses**, adotada nesta
estimativa, e não uma carga mensal declarada pelo CNPq:

```text
horas mensais de referencia = 20 × 52 / 12 = 86,6666... p-h
taxa calculada = 700 / (20 × 52 / 12) = 8,076923... R$/p-h
taxa aplicada = 8,08 R$/p-h
```

A taxa é arredondada uma única vez para centavos, pelo critério de metade
para cima, e depois multiplicada pelas horas de cada pacote. Os resultados
monetários também são arredondados para centavos e somados por fase. A taxa
única cobre preparação, execução, análise, redação e revisão por membros da
equipe estudantil; não há dados para justificar diferenças de remuneração
entre seus papéis. Não são acrescentados encargos, lucro ou custos de uma
contratação profissional a uma referência de bolsa.

**A taxa aplicada é uma aproximação econômica proposta, não salário, preço
de mercado, direito a bolsa ou pagamento realizado.** Seu uso para os
participantes externos é uma hipótese de valoração uniforme do tempo, sem
presumir que sejam estudantes, bolsistas ou remunerados. A ausência de
perfis confirmados impede alegar que essa taxa mede seu custo de oportunidade
individual. A referência mensal é a publicada nas fontes consultadas, sem
correção monetária adicional. A taxa será mantida em O/B/P para isolar a
variação de esforço; alteração da referência requer novo cálculo identificado.

### Memória de cálculo por atividade, fase e cenário

<!-- BEGIN CALCULO CUSTOS -->

**Fonte e unidade:** horas E1 acima × taxa acadêmica de R$ 8,08/p-h; valores em **R$**. Tabela gerada pelo script, sem pagamentos presumidos.

| Pacote | Integral O | Integral B | Integral P | Restante B |
| --- | ---: | ---: | ---: | ---: |
| F1.1 | 24,24 | 40,40 | 64,64 | 0,00 |
| F1.2 | 24,24 | 40,40 | 64,64 | 0,00 |
| F1.3 | 40,40 | 64,64 | 96,96 | 0,00 |
| F1.4 | 16,16 | 24,24 | 40,40 | 0,00 |
| F2.1 | 24,24 | 40,40 | 64,64 | 0,00 |
| F2.2 | 96,96 | 145,44 | 226,24 | 32,32 |
| F3.1 | 96,96 | 145,44 | 226,24 | 145,44 |
| F3.2 | 48,48 | 80,80 | 129,28 | 80,80 |
| F3.3 | 24,24 | 40,40 | 64,64 | 40,40 |
| F3.4 | 16,16 | 32,32 | 48,48 | 32,32 |
| F4.1 | 80,80 | 129,28 | 193,92 | 129,28 |
| F4.2 | 80,80 | 129,28 | 193,92 | 129,28 |
| F4.3 | 177,76 | 242,40 | 355,52 | 242,40 |
| F4.4 | 64,64 | 96,96 | 145,44 | 96,96 |
| F4.5 | 48,48 | 80,80 | 129,28 | 80,80 |
| F4.6 | 48,48 | 80,80 | 129,28 | 80,80 |
| T.1 | 48,48 | 80,80 | 129,28 | 32,32 |
| T.2 | 64,64 | 113,12 | 177,76 | 80,80 |
| T.3 | 64,64 | 113,12 | 177,76 | 72,72 |

**Fonte e unidade:** soma dos pacotes por fase; **R$**, somente equipe. O trabalho transversal não é repetido nas fases.

| Fase/grupo | Integral O | Integral B | Integral P | Restante B |
| --- | ---: | ---: | ---: | ---: |
| F1 | 105,04 | 169,68 | 266,64 | 0,00 |
| F2 | 121,20 | 185,84 | 290,88 | 32,32 |
| F3 | 185,84 | 298,96 | 468,64 | 298,96 |
| F4 | 500,96 | 759,52 | 1.147,36 | 759,52 |
| T | 177,76 | 307,04 | 484,80 | 185,84 |

**Fonte e unidade:** agregação calculada, em **R$**, com externos de P2/P3 valorados separadamente pela mesma taxa por hipótese.

| Componente | O | B | P |
| --- | ---: | ---: | ---: |
| Equipe — retrospectivo estimado | 282,80 | 444,40 | 702,96 |
| Equipe — restante estimado | 808,00 | 1.276,64 | 1.955,36 |
| Equipe — integral estimado | 1.090,80 | 1.721,04 | 2.658,32 |
| Participantes externos — futuro | 48,48 | 72,72 | 109,08 |
| **Subtotal humano integral valorado** | 1.139,28 | 1.793,76 | 2.767,40 |
| **Subtotal humano restante valorado** | 856,48 | 1.349,36 | 2.064,44 |

Infraestrutura e demais itens não valorados não integram esses subtotais. O total econômico completo e o desembolso efetivo permanecem **não disponíveis**.

<!-- END CALCULO CUSTOS -->

### Ferramentas, infraestrutura e despesas

**Fonte e unidade da tabela:** catálogo R1–R6, condições oficiais consultadas
em 25/10/2026 e hipóteses C1 descritas em cada linha. Valores monetários em
**R$**; “não valorado” e “não disponível” não são zeros. As categorias são
separadas para evidenciar a cobertura parcial da valoração.

| Categoria | Tratamento econômico em C1 | Tratamento financeiro e fundamento |
| --- | --- | --- |
| Trabalho da equipe | Horas E1 × R$ 8,08/p-h, inclusive parcelas retrospectivas estimadas | Remuneração efetiva não comprovada; valores calculados não são pagamentos |
| Tempo dos participantes | P2/P3 × mesma taxa por hipótese, separado da equipe | Não se presume incentivo ou ressarcimento; despesas dependem de confirmação |
| Licença do código Excalidraw para instância local | R$ 0,00 de licença do código sob MIT, preservadas suas condições; preparação e operação já estão nas horas | [Licença oficial][excalidraw-licenca] permite uso sem cobrança de licença; não demonstra gratuidade de infraestrutura nem de funcionalidades pagas |
| GitHub e publicação pública | Cenário de uso das funções gratuitas disponíveis, sem contratar plano adicional | [GitHub Free][github-planos] oferece colaboração em repositórios públicos e Pages; o plano efetivo da organização não foi comprovado; recursos excedentes ou pagos não são presumidos |
| Demais ferramentas do catálogo R5, editor e compilador | Não valoradas: seleção de ferramenta, edição e licença efetivamente usada ainda pendentes | Não se lança compra fictícia; licenças já disponíveis não comprovam despesa nova, e alternativas gratuitas devem ser verificadas antes da execução |
| Computadores, dispositivos, rede, energia e armazenamento | Não valorados: sem inventário, consumo incremental, período de uso ou critério de rateio verificável | Hipótese de uso de recursos disponíveis; não implica gratuidade econômica ou ausência de despesas |
| IA de apoio à documentação | Não valorada: sem custo incremental, plano e alocação ao estudo comprovados | Assinatura pessoal não será imputada integralmente ao projeto; declaração de uso será integrada na etapa de revisão |
| Transporte, impressão, incentivos e demais despesas | Não valorados: necessidade e valores não confirmados | Sem comprovantes de despesas nas fontes consultadas; desembolso total efetivo não disponível |

O subtotal humano calculado não incorpora preços fictícios para fechar um
total. Para chegar ao custo econômico completo, será necessário valorar os
recursos consumidos com fonte e rateio, inclusive eventual uso de recursos
já existentes. Para apurar o financeiro efetivo, serão necessários registros
de desembolso e cobertura do período. A ausência de comprovantes **não
autoriza concluir que a avaliação custou R$ 0,00**. Nenhuma contratação nova
é pressuposta por esta versão; isso é uma hipótese de planejamento, não
evidência sobre os gastos da equipe.

### Contingência, sensibilidade e fatores de variação

**Não se acrescenta reserva monetária à base nesta versão** (parcela
adicionada: R$ 0,00). Os cenários de esforço já contemplam repetição técnica
e retrabalho, e faltam probabilidades e impactos independentes para justificar
um percentual adicional sem duplicação. Isso não significa risco nulo.
Despesas ainda desconhecidas ficam pendentes, sem serem ocultadas como
contingência. Uma reserva futura exigirá risco, base de cálculo e aprovação
de premissa separados.

No cenário B, o subtotal humano integral valorado é **R$ 1.793,76**:
R$ 1.721,04 da equipe e R$ 72,72 dos participantes. Desses valores, o
subtotal humano restante é **R$ 1.349,36**; os R$ 444,40 retrospectivos
são uma valoração de estimativas, sem comprovação de gasto passado.
Os valores mantêm as limitações de E1 quanto a amostra, ambientes, duração
das sessões, disponibilidade e calendário.

F4 concentra 94 das 213 p-h da equipe no cenário B; dentro dela, F4.3 é
o maior pacote, com 30 p-h da equipe e 9 p-h externas. Ampliar a amostra,
realizar sessões adicionais, separar grupos de migração e interação ou
enfrentar problemas de ambiente aumenta a demanda de recursos. Também podem
alterar os custos a ação de melhoria escolhida, novas reuniões, necessidade
de equipamento indisponível e uso de planos pagos.

Como sensibilidade algébrica, mantendo as 222 p-h humanas integrais do
cenário B, **cada R$ 1,00/p-h acrescido à taxa uniforme acrescenta R$ 222,00**
ao subtotal humano integral; para as 167 p-h restantes, acrescenta R$ 167,00.
Não é uma previsão de reajuste ou taxa alternativa observada. A taxa baseada
em bolsa mede um equivalente acadêmico restrito: usar preços profissionais
responderia a outra hipótese e exigiria fontes e recálculo próprios.

### Reprodução e conferência

As horas continuam definidas nas tabelas E1 desta página, sem uma segunda
transcrição manual de entradas. O script
[`calcular_custos_avaliacao.py`](https://github.com/FCTE-Qualidade-de-Software-1/2026-2_T02_ADA_LOVELACE/blob/feat/estimativa-custos/scripts/calcular_custos_avaliacao.py)
lê essas tabelas e os
[`parâmetros C1`](dados/parametros-custos.json), aplica aritmética decimal e
gera a memória em [`custos-calculados.json`](dados/custos-calculados.json)
e as tabelas monetárias acima. A execução requer somente Python 3, com
biblioteca padrão, a partir da raiz do repositório:

```shell
python scripts/calcular_custos_avaliacao.py --write
python scripts/calcular_custos_avaliacao.py --check
mkdocs build --strict
git diff --check
```

`--write` atualiza somente a memória JSON e o bloco monetário delimitado
nesta página; `--check` verifica sua correspondência sem escrever arquivos.
A conferência exige 19 pacotes distintos, cenários ordenados, soma das
parcelas retrospectiva e restante igual ao integral, e reconciliação por
fase. O JSON conserva `null` para custos não humanos, desembolso efetivo e
custo econômico completo não disponíveis; decimais são strings para evitar
perda de precisão. Não há contingência embutida nas tabelas de equipe.
Mudanças nas entradas também exigem revisar as premissas e o texto de síntese
fora do bloco gerado; `--check` não certifica a validade dessas premissas.

[cnpq-valores]: https://www.gov.br/cnpq/pt-br/acesso-a-informacao/bolsas-e-auxilios/copy_of_modalidades/tabela-de-valores-no-pais
[iec-carga]: https://www.gov.br/iec/pt-br/iec-abre-chamada-para-o-programa-de-bolsas-de-iniciacao-cientifica-pibic-iec-202620132027
[github-planos]: https://docs.github.com/en/get-started/learning-about-github/githubs-plans
[excalidraw-licenca]: https://github.com/excalidraw/excalidraw/blob/master/LICENSE

## Comparativo de valoração econômica

### Escopo preservado e fontes de precificação

**Versão V1, data-base e pesquisa: 25/10/2026.** Esta análise adicional
preserva integralmente as estimativas E1 e a valoração acadêmica C1 de
**R$ 8,08/p-h**. No cenário de esforço base, continuam previstas **222 p-h
humanas**, das quais **213 p-h da equipe e 9 p-h de participantes externos**.
Não se reclassificam essas horas como realizadas ou faturáveis.

A pesquisa priorizou empresas juniores de computação e tecnologia, suas
páginas de serviços e suas informações públicas sobre orçamento. Foram
consultados o site da CJR, o FAQ institucional do CIC/UnB e o conteúdo
indexado das páginas oficiais da EJEM e da Code Júnior. A leitura direta
destas duas últimas páginas não ficou disponível pela ferramenta de pesquisa
nesta sessão; seus conteúdos foram recuperados pelo índice de busca. Os
valores publicados podem mudar e não constituem proposta comercial vigente
para este estudo. Nenhuma empresa foi contatada ou forneceu cotação formal.

**Fonte e unidade da tabela:** páginas oficiais indicadas em cada linha,
consultadas na data-base. Preço por projeto em **R$/projeto**; tarifa por
pessoa-hora em **R$/p-h**. “Não localizada” delimita esta pesquisa, sem afirmar
que a instituição nunca publique preços por outros canais.

| Referência | Informação pública encontrada | Informação de preço e limite de uso |
| --- | --- | --- |
| [CJR/UnB][cjr-servicos], com vínculo institucional corroborado pelo [CIC/UnB][cic-cjr] | Serviços de sistemas web, consultoria e soluções digitais; convite a diagnóstico gratuito e orçamento | Não localizada tarifa em R$/p-h nem preço de projeto na página consultada. Referência institucional de prestação de serviços estudantis de computação, sem valor monetário atribuído. Diagnóstico gratuito não implica projeto gratuito. |
| [EJEM Mackenzie — software sob medida][ejem-projeto] | Divulgação de projetos a partir de **R$ 8.000**, cujo valor final depende do escopo e da proposta | **R$/projeto**, não R$/p-h e não orçamento para avaliação de qualidade. Sem esforço publicado correspondente que permita converter o preço em tarifa horária comparável. |
| [Code Júnior/UFJF][code-junior] | Desenvolvimento de sistemas e aplicativos; levantamento de necessidades seguido de proposta técnica e comercial | Não localizada tarifa horária ou tabela numérica na página consultada. Evidencia orçamento condicionado ao escopo, sem base para imputar um valor a esta avaliação. |

O dado da EJEM é um **preço inicial anunciado para projeto de desenvolvimento**.
Não é média de mercado, remuneração de seus membros, teto de contratação ou
custo observado deste trabalho. Não se divide R$ 8.000 pelas nossas 222 p-h:
as horas pertencem à avaliação acadêmica, não ao projeto anunciado. Também
não se infere que a avaliação deva custar esse mínimo ou que a diferença
entre os subtotais represente economia obtida pela equipe.

### Hipóteses alternativas por pessoa-hora

Como não foi localizada tarifa pública de avaliação de qualidade diretamente
comparável nas páginas examinadas, adotam-se três **hipóteses próprias de
sensibilidade**, H25, H50 e H75: **R$ 25,00, R$ 50,00 e R$ 75,00/p-h**.
São pontos de uma grade exploratória com incremento de R$ 25,00 para mostrar
o efeito da taxa mantendo o esforço fixo. A escolha é uma premissa analítica
desta documentação, sem calibração por amostra de preços; não indica faixa
de mercado comprovada, tarifa recomendada ou probabilidade de ocorrência.
Nenhum desses valores é atribuído à CJR, à EJEM ou à Code Júnior.

Para cada valoração `v`, o script aplica:

```text
subtotal humano integral B(v) = (213 p-h equipe + 9 p-h externas) × taxa(v)
subtotal humano restante B(v) = (158 p-h equipe + 9 p-h externas) × taxa(v)
```

A aplicação uniforme aos participantes é uma hipótese para comparar o mesmo
volume de tempo humano. Não pressupõe que participação em teste seja serviço
técnico vendido pela equipe, nem que participantes recebam essa tarifa. Os
componentes permanecem separados nas tabelas. Para uma eventual cotação real,
seria necessário distinguir horas da prestadora, participação dos usuários,
recursos, condições contratuais e demais componentes de preço.

As linhas de valoração são independentes dos cenários de esforço O/B/P:
primeiro compara-se a taxa com B fixo em 222 p-h; depois mostra-se a
combinação de cada taxa com os esforços originais, sem reestimá-los. A linha
acadêmica continua a referência C1, sem ser substituída pelas alternativas.

<!-- BEGIN COMPARATIVO VALORACAO -->

**Fonte e unidade:** horas E1 preservadas; taxa C1 e hipóteses próprias H25/H50/H75 dos parâmetros V1. Taxas em **R$/p-h**, valores em **R$**. Cenário de esforço B fixo em **222 p-h** (213 equipe + 9 externas); parcela restante em **167 p-h** (158 equipe + 9 externas).

| Valoração | Taxa | Equipe integral B | Externos B | Subtotal humano integral B | Subtotal humano restante B |
| --- | ---: | ---: | ---: | ---: | ---: |
| ACADEMICO | 8,08 | 1.721,04 | 72,72 | 1.793,76 | 1.349,36 |
| H25 | 25,00 | 5.325,00 | 225,00 | 5.550,00 | 4.175,00 |
| H50 | 50,00 | 10.650,00 | 450,00 | 11.100,00 | 8.350,00 |
| H75 | 75,00 | 15.975,00 | 675,00 | 16.650,00 | 12.525,00 |

**Fonte e unidade:** mesmos parâmetros; subtotais humanos integrais em **R$**. O/B/P variam o esforço original; cada linha mantém sua taxa. Nenhuma linha representa orçamento de CJR, EJEM ou Code Júnior.

| Valoração | Esforço O: 141 p-h | Esforço B: 222 p-h | Esforço P: 342,5 p-h |
| --- | ---: | ---: | ---: |
| ACADEMICO | 1.139,28 | 1.793,76 | 2.767,40 |
| H25 | 3.525,00 | 5.550,00 | 8.562,50 |
| H50 | 7.050,00 | 11.100,00 | 17.125,00 |
| H75 | 10.575,00 | 16.650,00 | 25.687,50 |

Os preços publicados por projeto são contexto documental e não entram nas multiplicações. Infraestrutura e despesas desconhecidas continuam fora dos subtotais humanos.

<!-- END COMPARATIVO VALORACAO -->

### Por que preço comercial e avaliação acadêmica não são equivalentes

A oferta de software sob medida da EJEM descreve concepção de telas e dados,
desenvolvimento e implementação de uma solução para o cliente. A CJR também
divulga desenvolvimento e consultoria. Nosso objeto é avaliar um produto já
existente: preparar protocolos, coletar evidências para métricas GQM,
interpretar resultados e produzir documentação acadêmica, com uma ação de
melhoria delimitada. Há competências e atividades técnicas em comum, mas os
entregáveis, os critérios de aceitação e o risco de execução são distintos.

Por análise metodológica, um preço comercial pode cobrir, conforme a
proposta, estrutura da prestadora, gestão, infraestrutura, suporte,
obrigações de entrega e riscos, além da execução. Esta comparação calcula
somente equivalentes do tempo humano; não modela esses componentes nem
atribui suas parcelas a qualquer empresa. Tampouco a referência de bolsa
mede preço de venda. Preço anunciado, custo econômico de referência e
desembolso efetivo respondem a perguntas diferentes.

Os subtotais alternativos são, portanto, **simulações de valoração do mesmo
esforço**, sem comprovar quanto uma empresa júnior cobraria para executar
esta avaliação. Custo econômico completo e despesas efetivas permanecem
não disponíveis, e as premissas de esforço e de recursos continuam sujeitas
à revisão da equipe.

### Reprodução do comparativo

O script existente foi ampliado para ler `comparativo_valoracao` nos
[parâmetros JSON](dados/parametros-custos.json). Os preços publicados por
projeto ficam registrados como contexto, separados das taxas hipotéticas;
não entram nas multiplicações. A memória em
[custos-calculados.json](dados/custos-calculados.json) conserva todos os
resultados C1 e acrescenta as valorações V1 e seus cenários de esforço.
Os mesmos comandos `--write` e `--check` regeneram e conferem o bloco
acadêmico e o comparativo. O script verifica que a linha acadêmica do
comparativo coincide com C1 em O/B/P; mudanças nos parâmetros exigem revisão
do texto explicativo, como já previsto na memória original.

[cjr-servicos]: https://www.cjr.org.br/
[cic-cjr]: https://cic.unb.br/informacoes/faq
[ejem-projeto]: https://ejemackenzie.com.br/pagina/como-funciona-o-projeto/
[code-junior]: https://www.codejr.com.br/

## Próxima etapa

A revisão final integrará a estimativa ao artigo e à documentação, verificará
a coerência com a gestão e o calendário e registrará o uso de IA. As
premissas provisórias e os recursos não valorados continuam sujeitos à
confirmação da equipe; concluir a implementação não os transforma em dados
observados ou em despesas comprovadas.
