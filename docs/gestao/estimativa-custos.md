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

## Próximas etapas

Esta versão define o método e mapeia o trabalho, sem atribuir horas ou valores monetários.
As próximas seções serão desenvolvidas incrementalmente para apresentar:

* **Estimativa de esforço:** premissas, justificativas e cenários por
  atividade, distinguindo estimativas de horas efetivamente registradas.
* **Cálculo dos custos:** conversão do esforço em custo econômico de
  referência, identificação de despesas efetivas e recursos gratuitos, e
  consolidação reproduzível dos cenários.
* **Acompanhamento e integração acadêmica:** comparação entre previsto e
  realizado, limitações e articulação com a documentação e o artigo.

A atribuição de esforço, a seleção de taxas e a apuração de despesas ainda
dependem das etapas seguintes e da revisão das fontes e premissas pela equipe.
