# Uso de inteligência artificial

Esta página registra como cada integrante da equipe usou ferramentas de
inteligência artificial (IA) na elaboração da avaliação e desta GitPage. O
objetivo é dar transparência ao processo: o leitor deve saber quais partes do
trabalho tiveram apoio de IA, para qual tarefa e como o resultado foi conferido
pela equipe.

## Como declarar

Cada integrante preenche o próprio bloco. Para cada uso, informe:

* **Ferramenta:** nome e versão ou modelo (por exemplo, o nome do assistente e
  o modelo utilizado);
* **Tarefa:** para que a ferramenta foi usada (por exemplo, revisão de texto,
  comparação entre documentos, organização de tabelas);
* **Onde:** as páginas ou seções afetadas;
* **Quando:** a data ou o período de uso;
* **Como conferiu e ajustou:** uma frase sobre a revisão humana, isto é, o que
  foi verificado, corrigido ou decidido pelo integrante.

Quem não usou IA declara: "Não utilizei ferramentas de IA neste trabalho."
Trechos copiados literalmente de uma fonte, com ou sem apoio de IA, devem
aparecer entre aspas e com a referência correspondente.

## Declarações por integrante

### André Henrique

* **Ferramenta:** Claude Code, com o modelo Claude Opus 5.5 (Anthropic), na
  extensão do VS Code.
* **Tarefa:** redação da primeira versão da página de propósito e partes
  interessadas (texto, tabelas e diagrama), a partir do documento da equipe e
  das páginas de modelo de qualidade, ODS e objetivos de medição.
  Alinhamento das partes interessadas no modelo de qualidade e no roteiro.
  Revisão da página frente aos critérios 1 e 2 da entrega.
* **Onde:** [propósito e partes interessadas](fase_planejamento/proposito-partes-interessadas.md),
  [modelo de qualidade](fase_planejamento/modelo-qualidade.md) (lista e tabela de partes
  interessadas, numeração dos diagramas), [ODS](fase_planejamento/ods.md) (numeração do
  diagrama), [roteiro da análise](analise/roteiro.md) (seção 1 e item 3 da
  seção 5) e slides 3 a 6 da apresentação.
* **Quando:** 18 out. 2026.
* **Como conferiu e ajustou:** Comparei o texto gerado frente aos
  critérios 1 e 2 da entrega, o que levou a correções: legenda e chamada no
  texto da tabela de requisitante e avaliador, uso do termo "comprador" da
  rubrica, ligação dos usuários de sessões colaborativas também ao O2,
  coerência entre evidência e critério na Tabela 1 e um diagrama que liga cada
  parte interessada diretamente aos objetivos. Comparei cada parte
  interessada com o material da equipe e com os objetivos O1 a O6, o que
  mostrou quais tinham sido inferidas pela ferramenta (comprador e operador).

Na Entrega 2:

* **Ferramenta:** Claude Code, com o modelo Claude Opus 5.5 (Anthropic), no
  terminal.
* **Tarefa:** redação do plano de avaliação da Fase 3; coleta e registro das
  métricas F-M5, F-M6, F-M10, F-M11 e F-M12, incluindo os scripts de teste
  offline e de resoluções; cálculo e registro da F-M8 e da F-M9 a partir das
  fichas da sessão do perfil C; apoio na revisão de PRs da equipe; cálculo das
  médias por questão e por objetivo e redação das respostas às questões GQM no
  relatório de resultados (#20).
* **Onde:** [plano de avaliação](fase_aplicacao/plano-avaliacao.md),
  evidências `F-M5`, `F-M6`, `F-M8` a `F-M12` em `evidencias/flexibilidade/`,
  `scripts/fm5_teste_offline.cjs`, `scripts/fm6_resolucoes.cjs`, páginas de
  [resultados](resultados/index.md) dessas métricas e
  [resultados da análise](analise/resultados.md).
* **Quando:** de 4 a 22 nov. 2026.
* **Como conferiu e ajustou:** repeti à mão no Chrome, com o modo offline do
  DevTools, os casos da F-M5 que falharam no script; conferi os tempos da
  F-M8 e as conclusões da F-M9 na ficha de observação e no CSV das sessões;
  refiz as médias com as frações completas e conferi cada nota com o índice
  de resultados. Decidi com o grupo os denominadores (#77) e registrei como
  limitação o perfil do P05, que marcou já usar o Excalidraw.

### Giovanna Felipe

* **Ferramenta:** Claude Code, com o modelo Claude Opus 5.5 (Anthropic), na
  extensão do VS Code.
* **Tarefa:** apoio na formatação e nos diagramas das páginas da GitPage;
  na atualização do artigo da Entrega 1 a partir da GitPage (seção de gestão
  com PSM/CID, diagramação e referências); e na coleta das métricas de
  flexibilidade F-M7 e F-M4, incluindo o script de teste por toque da F-M4.
* **Onde:** [modelo de qualidade](fase_planejamento/modelo-qualidade.md),
  [ODS](fase_planejamento/ods.md), [métricas de gestão](gestao/metricas.md),
  [referências](referencias.md), artigo (`main.tex`), evidências da F-M7 e da
  F-M4 e `scripts/fm4_toque.cjs`.
* **Quando:** de 18 out. a 13 nov. 2026.
* **Como conferiu e ajustou:** conferi o conteúdo das páginas e do artigo com
  o material da equipe e decidi com o grupo as ações de gestão. Nas métricas,
  defini o escopo de cada coleta, conferi os resultados nos relatórios e
  prints e decidi o que entra na evidência.

### João Pedro Lopes

* **Ferramenta:** Claude Code, com o modelo Claude Opus 5.5 (Anthropic), na
  extensão do VS Code.
* **Tarefa:** comparação entre o documento de definição que tinha sido escrito no google docs e o
  GitPage para identificar divergências nas questões e métricas. Transposição
  das questões, das métricas e dos níveis de pontuação para o roteiro, com
  tabelas e diagramas. Atualização da matriz de rastreabilidade. Resolução de
  um conflito de *merge*. Revisão da GitPage frente aos critérios de avaliação
  da entrega, com inclusão de legendas e das referências das ferramentas de
  medição. Além disso, a IA foi usada para pegar as principais informações do pages e 
  passar estruturadamente para o artigo no overleaf
* **Onde:** [roteiro da análise](analise/roteiro.md) (seções 1, 4, 5 e 6),
  [objetivos de medição](fase_planejamento/objetivos-qualidade.md) (seções 4 e 9),
  [resultados](analise/resultados.md), [referências](referencias.md) e esta
  página.
* **Quando:** 18 out. 2026.
* **Como conferiu e ajustou:** as divergências encontradas foram apresentadas
  antes de qualquer alteração, e as decisões sobre elas foram minhas: remover
  a métrica que não constava no documento de definição, manter a métrica de
  armazenamento local na S-Q2, adotar a WCAG 2.2 e ligar o contraste à
  assistência ao usuário, seguindo o modelo de qualidade. Conferi as métricas
  transpostas com o documento de definição e a geração do site sem erros.

### Luís Cunha

* **Ferramenta:** OpenCode, DeepSeek V4.1 Flash & MiniCPM V4.7 35B A3B - Local.
* **Tarefa:** na primeira fase, orientação sobre os conteúdos e sobre a
  estruturação inicial da GitPage e do artigo em LaTeX, que ainda eram
  esqueletos sem as informações dos integrantes. Na segunda fase, orientação e
  apoio passo a passo nas atividades de métricas, auxílio na redação de
  commits e pull requests e execução assistida de algumas métricas. Na terceira
  fase, apoio na análise das gravações e dos prints das F-M1, F-M2 e F-M3,
  incluindo a extração de quadros dos vídeos, a conferência do código do
  Excalidraw e a redação das evidências e das páginas de resultados.
* **Onde:** estrutura da GitPage e do artigo (`main.tex`), [roteiro da
  análise](analise/roteiro.md), [métricas de gestão](gestao/metricas.md),
  [evidências de capacidade de interação](https://github.com/FCTE-Qualidade-de-Software-1/2026-2_T02_ADA_LOVELACE/tree/main/evidencias/capacidade-interacao) e
  resultados das [F-M1](resultados/flexibilidade/f-m1.md),
  [F-M2](resultados/flexibilidade/f-m2.md) e
  [F-M3](resultados/flexibilidade/f-m3.md).
* **Quando:** primeira, segunda e terceira fases da avaliação, entre out. e
  nov. 2026.
* **Como conferiu e ajustou:** revisei e adaptei todas as sugestões ao
  contexto do projeto, conferi os textos e as métricas nas fontes e nos
  registros do repositório e acompanhei a execução das atividades. A
  realização assistida da CI-M23 foi fiscalizada por mim, com conferência do
  procedimento e do resultado antes do registro. Nas F-M1 a F-M3, conferi cada
  vídeo, print e versão registrada, refiz as contagens e decidi com o grupo
  quais observações entram como defeito específico de ambiente.

### Renato Araújo

* **Ferramenta:** Codex/ChatGPT (OpenAI).
* **Tarefa:** apoio na escrita, na organização e na revisão dos textos do
  trabalho, além de auxílio nas pesquisas de conceitos e referências para
  fundamentar a metodologia e a estimativa de custos.
* **Onde:** [metodologia](metodologia.md),
  [estimativa de custos](gestao/estimativa-custos.md) e esta página.
* **Quando:** out. 2026, durante a elaboração e a revisão da entrega.
* **Como conferiu e ajustou:** revisei os textos sugeridos e os ajustei ao
  contexto do projeto e às decisões da equipe. Conferi as informações das
  pesquisas com as fontes utilizadas no trabalho e revisei as premissas e os
  cálculos da estimativa de custos antes de incorporá-los à documentação.
### Zayra Moraes

* **Ferramenta:** ChatGPT (OpenAI).
* **Tarefa:** Apoio complementar na estruturação e no refinamento dos objetivos de medição GQM, além da identificação de referências bibliográficas para fundamentação teórica.
* **Onde:** Definição dos objetivos de medição.
* **Quando:** Após a pesquisa inicial e o estudo das normas e dos conceitos relacionados à avaliação da qualidade de software.
* **Como conferiu e ajustou:** A ferramenta foi utilizada de forma complementar ao estudo inicial, auxiliando na organização das informações, no refinamento da escrita científica e na identificação de novas fontes bibliográficas. As sugestões foram analisadas criticamente e ajustadas ao contexto do Excalidraw, considerando a ISO/IEC 25010:2023, o método GQM e o modelo de qualidade definido pela equipe. As referências sugeridas foram utilizadas como ponto de partida para aprofundamento da pesquisa, mediante conferência de sua pertinência e adequação ao trabalho.
