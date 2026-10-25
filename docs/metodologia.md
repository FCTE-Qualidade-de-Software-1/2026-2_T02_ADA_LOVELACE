# Metodologia

Este trabalho caracteriza-se como uma pesquisa aplicada, de abordagem mista,
quantitativa e qualitativa, conduzida por meio de um estudo de caso da
aplicação web Excalidraw. A avaliação tem como objetivo analisar a qualidade
do software a partir das características de Segurança (*security*),
Flexibilidade (*flexibility*, anteriormente Portabilidade) e Capacidade de
interação (*interaction capability*, anteriormente Usabilidade), considerando
o contexto de utilização da ferramenta e as necessidades de seus usuários.

A metodologia adotada fundamenta-se na família de normas ISO/IEC 25000,
denominada *Systems and software Quality Requirements and Evaluation*
(SQuaRE), que estabelece referências para a especificação de requisitos,
medição e avaliação da qualidade de produtos de software. Como modelo de
qualidade, utiliza-se a ISO/IEC 25010:2023, que organiza a qualidade em
características e subcaracterísticas, permitindo uma análise estruturada dos
atributos selecionados, conforme o [modelo de qualidade](fase1/modelo-qualidade.md)
adotado pela equipe. A fundamentação normativa e a abordagem GQM estão
documentadas nas [referências](referencias.md) do projeto.

## Abordagem de avaliação

A avaliação concentra-se na versão pública do Excalidraw, disponível em
[excalidraw.com](https://excalidraw.com), considerando funcionalidades
relacionadas à criação e manipulação de diagramas, ao compartilhamento de
informações e à interação do usuário com a aplicação.

A abordagem quantitativa será empregada na obtenção de medidas objetivas,
como proporções, quantidades, tempos e taxas relacionadas às características
avaliadas. A abordagem qualitativa complementará essa análise por meio de
observações sobre o comportamento da aplicação, inspeções técnicas e
interpretação das evidências coletadas.

A combinação dessas abordagens busca proporcionar uma visão mais abrangente
da qualidade do produto, considerando tanto os resultados mensuráveis quanto
os aspectos observacionais associados ao uso do software.

## Estratégia de medição

Para estruturar o processo de medição, será utilizada a abordagem
*Goal-Question-Metric* (GQM), que estabelece uma relação hierárquica entre
objetivos, questões e métricas.

Inicialmente, serão definidos objetivos de medição associados às
características de qualidade selecionadas. Cada objetivo será desdobrado em
questões que representam os aspectos investigados. Em seguida, serão
estabelecidas métricas capazes de fornecer evidências para responder às
questões formuladas.

A utilização do GQM busca assegurar que as medições estejam alinhadas aos
objetivos da avaliação, evitando a coleta de dados sem uma finalidade
claramente definida. O detalhamento será mantido no
[roteiro da análise](analise/roteiro.md).

## Processo de avaliação

O processo de avaliação será organizado em quatro etapas principais:

1. **Definição da avaliação:** identificação do propósito, das partes
   interessadas, das características de qualidade e do escopo do produto
   avaliado.
2. **Especificação das medições:** definição dos objetivos, questões,
   métricas, hipóteses e critérios de julgamento, com base no modelo de
   qualidade adotado e na abordagem GQM.
3. **Execução das medições:** aplicação das métricas selecionadas por meio
   de testes, observações e inspeções técnicas, de acordo com as
   particularidades de cada característica de qualidade.
4. **Análise dos resultados:** organização e interpretação dos dados
   coletados, considerando os critérios de julgamento estabelecidos, as
   limitações das medições e os objetivos definidos.

A organização dessas etapas busca garantir consistência entre o
planejamento, a execução e a interpretação dos resultados, além de favorecer
a rastreabilidade das atividades realizadas.

## Registro e análise dos resultados

Os resultados das medições serão documentados juntamente com as evidências
e informações relevantes sobre os procedimentos utilizados. O registro das
atividades será realizado no repositório do projeto, permitindo acompanhar
as contribuições dos integrantes e manter a rastreabilidade do processo de
avaliação. As evidências e a análise serão organizadas na página de
[resultados](analise/resultados.md).

A gestão da execução será acompanhada separadamente por métricas de
participação, entrega, revisão, rastreabilidade e calendário, definidas em
[Métricas de gestão do grupo](analise/gestao-grupo.md). A sessão automatizada
de membros e atividades deve fornecer os valores brutos e os denominadores
dessas métricas; atividade não deve ser interpretada apenas pelo número de
commits.

A interpretação dos resultados será realizada por meio da comparação entre
os valores obtidos e os critérios de julgamento estabelecidos para cada
métrica. Essa análise permitirá identificar o nível de atendimento aos
objetivos definidos, bem como eventuais limitações e oportunidades de
melhoria.

Por se tratar da avaliação de uma aplicação web pública, os resultados
estarão restritos às funcionalidades, ambientes e condições efetivamente
examinados, não representando uma certificação integral da qualidade ou da
segurança do software.
