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

## Próximas etapas

Esta versão define o método, sem atribuir horas ou valores monetários.
As próximas seções serão desenvolvidas incrementalmente para apresentar:

* **Atividades e recursos:** decomposição do trabalho, entregáveis,
  dependências e fontes documentais.
* **Estimativa de esforço:** premissas, justificativas e cenários por
  atividade, distinguindo estimativas de horas efetivamente registradas.
* **Cálculo dos custos:** conversão do esforço em custo econômico de
  referência, identificação de despesas efetivas e recursos gratuitos, e
  consolidação reproduzível dos cenários.
* **Acompanhamento e integração acadêmica:** comparação entre previsto e
  realizado, limitações e articulação com a documentação e o artigo.

O mapeamento das atividades, a atribuição de esforço, a seleção de taxas e a
apuração de despesas ainda dependem das etapas seguintes e da revisão das
fontes e premissas pela equipe.
