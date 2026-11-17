# Interpretação GQM — contribuição de Renato à issue #20

**Material auxiliar temporário, a integrar em [Resultados da análise](resultados.md).** Esta contribuição usa a base `401b898b66804cc46bafd69dc0b3b0fb4cd9a1dc`, após a integração já concluída, e foi preparada em 17/11/2026. A branch é compartilhada com André; por isso o relatório principal permanece intacto. Ao integrar, aproveitar seus trechos existentes e incorporar apenas os complementos e qualificações abaixo, retirando este auxiliar para evitar duplicação permanente.

**Atualização concorrente identificada:** na conferência remota final, André publicou `44302e5ee7d6805124bf5846d5628c09df2fcad1` (`docs: preenche médias, objetivos e seções da síntese de resultados`), alterando somente `docs/analise/resultados.md`. A leitura foi feita pela referência Git, sem merge ou rebase. Os cálculos e as novas seções não foram incorporados ou recalculados nesta tarefa. Este auxiliar deve ser integrado posteriormente sobre o relatório atualizado, preservando as duas contribuições.

O objeto de referência é o Excalidraw `e7b534668a60add7f725531f3c9abf32508c7b4e`, observadas as ressalvas de versão e ambiente das evidências. O [roteiro oficial](roteiro.md#4-estrategia-gqm) fornece os enunciados, hipóteses e vínculos; as [definições dos objetivos](../fase_planejamento/objetivos-qualidade.md#4-matriz-de-rastreabilidade-dos-objetivos-gqm) fornecem os propósitos. A [issue #20](https://github.com/FCTE-Qualidade-de-Software-1/2026-2_T02_ADA_LOVELACE/issues/20) e sua consulta de comentários não acrescentaram evidências de medição.

Não houve novas medições nem uso de resultados de sessões ainda não consolidados. Os valores e notas nas tabelas são transcrições do [índice de resultados](../resultados/index.md); cada página individual liga à evidência original. A cadeia usada é **objetivo → questão → hipótese → métrica → página/evidência → interpretação**. O inventário continua com **51 métricas, 37 medidas e 14 pendentes sem valor e sem nota**.

As categorias de hipótese descrevem a compatibilidade da previsão com a evidência. **Confirmar uma hipótese negativa confirma uma limitação, não o atendimento do objetivo.** A expressão “no recorte” limita a conclusão às condições coletadas; hipóteses compostas são examinadas por suas partes. Quando falta uma medida essencial para testar a previsão, o julgamento é inconclusivo, mesmo que haja achados úteis em outra métrica.

## Conferência do trabalho existente

| Contribuição existente | Situação antes desta etapa | Tratamento neste auxiliar |
| --- | --- | --- |
| Renato: S-Q1 a S-Q6 e CI-Q6 a CI-Q10 | 11 análises detalhadas, com resultados, interpretação e limites; algumas hipóteses estavam parafraseadas | Referenciar a fundamentação existente, transcrever as hipóteses literais e qualificar CI-Q7 sem apagar seus achados |
| André: F-Q1, F-Q2, F-Q4 e CI-Q5 | Quatro sínteses com julgamentos e cálculos já registrados | Aproveitar suas conclusões; completar enunciados, hipóteses, vínculos e ressalvas; não recalcular ou homologar médias |
| F-Q3 e CI-Q1 a CI-Q4 | Cinco sínteses incompletas ou com julgamento em aberto | Completar a interpretação disponível e declarar explicitamente as pendências |
| André: O3 | Julgamento e valores já registrados | Preservar o original; propor leitura qualitativa compatível, sujeita à conferência de André |

A conferência inicial acima retrata a base local `401b898b`. O commit remoto concorrente `44302e5` acrescentou médias de 13 questões e julgamentos de O1, O2, O3 e O6, além de resumo, configuração, pontos fortes, oportunidades, limitações e relação com a Tabela 1. Essas seções são contribuição de André; não foram refeitas aqui. Os resultados das 51 métricas não foram alterados por esse commit.

As respostas abaixo resumem e referenciam as análises corretas, sem copiar novamente seus parágrafos completos. As hipóteses são reproduzidas literalmente das tabelas oficiais, inclusive quando a previsão começa por “Parcialmente”.

## Análise das questões GQM


### Segurança · O1 — Proteção das informações e controle de acesso


#### S-Q1 — Os dados do desenho trafegam e ficam armazenados de forma protegida contra acesso não autorizado?

**Hipótese original:** Sim: o código cifra as mensagens da colaboração com AES-GCM no navegador, e a chave fica no fragmento `#` do link, que o navegador não envia ao servidor

**Métricas relacionadas e resultados disponíveis:**

| Métrica / evidência | Valor documentado | Nota documentada (0–2) |
| --- | --- | --- |
| [S-M1 · Mensagens de colaboração cifradas](../resultados/seguranca/s-m1.md) | 5 de 6 tipos de evento (83,3%) | **0** |
| [S-M2 · Chave enviada ao servidor](../resultados/seguranca/s-m2.md) | Não (0 ocorrências) | **2** |

**Resposta fundamentada:** Os dados examinados têm proteção parcial. O desenho e outros eventos da colaboração usam cifra no cliente, e a chave não apareceu no tráfego capturado; o nome em `user-follow` foi enviado em claro ao servidor de sala. Não há demonstração de proteção integral do tráfego e do armazenamento.

**Julgamento da hipótese:** **Parcialmente confirmada** no recorte documentado.

**Justificativa:** Mantém-se a conclusão parcial de Renato: a S-M2 favorável não elimina a exceção registrada na S-M1. O envio à IA é uma observação separada, fora da proporção da S-M1; a persistência local é coberta pela S-M4 em S-Q2, conforme o vínculo oficial.

**Limitações e métricas pendentes:** Não há métrica pendente nesta questão. Coleta local; Sentry desativado nesse ambiente, com risco teórico de registrar o fragmento ainda não confirmado em produção. Tipos de evento e volume de mensagens são unidades distintas; conserva-se a nota por tipo, sem substituí-la pelo percentual por volume. Revisões cruzadas não preenchidas.

**Análise aproveitada:** [fundamentação anterior de Renato para S-Q1](resultados.md#s-q1-o1-dados-protegidos-no-trafego-e-armazenamento).


#### S-Q2 — É possível controlar quem acessa um desenho compartilhado?

**Hipótese original:** Não: na versão gratuita, quem tem o link acessa o desenho, sem senha, expiração ou revogação, e a cena fica sem criptografia no `localStorage`

**Métricas relacionadas e resultados disponíveis:**

| Métrica / evidência | Valor documentado | Nota documentada (0–2) |
| --- | --- | --- |
| [S-M3 · Mecanismos de controle de acesso](../resultados/seguranca/s-m3.md) | 0 de 3 mecanismos | **0** |
| [S-M4 · Dados persistidos localmente sem criptografia](../resultados/seguranca/s-m4.md) | Sim: cena e dados associados legíveis (localStorage e IndexedDB) | **0** |

**Resposta fundamentada:** O cliente gratuito examinado não oferece senha, expiração ou revogação de links, e a cena e dados associados ficaram legíveis no armazenamento do navegador. O controle de acesso previsto na pergunta não foi demonstrado.

**Julgamento da hipótese:** **Confirmada** no recorte documentado.

**Justificativa:** Mantém-se a confirmação da hipótese negativa de Renato no recorte observado: as duas métricas sustentam as limitações previstas. Encerrar a participação do criador não invalidou o link enquanto outro participante permanecia conectado; posse do link e da chave não equivale a autorização por identidade.

**Limitações e métricas pendentes:** Não há métrica pendente. Na S-M3, Firebase indisponível e exportação `#json` não concluída limitam o teste remoto; a reentrada de C tem registro visual limitado. Na S-M4, não foi comprovado o vínculo entre o checkout auditado e o processo Vite; a coleta não mede cifra de disco, acesso remoto indevido ou segurança da IA real. Revisão cruzada pendente.

**Análise aproveitada:** [fundamentação anterior de Renato para S-Q2](resultados.md#s-q2-o1-controle-de-acesso-a-desenhos-compartilhados).


#### S-Q3 — O sistema impede alteração ou corrupção não autorizada dos dados?

**Hipótese original:** Sim: o AES-GCM é autenticado, então um payload adulterado falha ao ser decifrado, e a reconciliação por versão dos elementos deve evitar inconsistências na edição simultânea

**Métricas relacionadas e resultados disponíveis:**

| Métrica / evidência | Valor documentado | Nota documentada (0–2) |
| --- | --- | --- |
| [S-M5 · Taxa de detecção de adulteração](../resultados/seguranca/s-m5.md) | 221 de 221 rejeitadas (100%) | **2** |
| [S-M6 · Inconsistências após edições simultâneas](../resultados/seguranca/s-m6.md) | 2 em 8 rodadas | **1** |

**Resposta fundamentada:** A adulteração dos payloads testados foi rejeitada sem alterar a cena, mas a colaboração não evitou todas as inconsistências nas edições simultâneas. Duas das oito rodadas terminaram com versões divergentes.

**Julgamento da hipótese:** **Parcialmente confirmada** no recorte documentado.

**Justificativa:** Mantém-se a análise composta de Renato: há suporte à autenticação criptográfica das mensagens, mas a expectativa sobre reconciliação não se sustenta integralmente. Uma divergência persistiu por dois minutos. Nem a nota alta da S-M5 confirma toda a hipótese, nem a falha de sincronização invalida a rejeição de adulterações demonstrada.

**Limitações e métricas pendentes:** Não há métrica pendente. O ensaio é local e controlado; não estima a frequência em produção. Replay de mensagem válida fica fora da taxa de adulteração e, no caso documentado, foi descartado pela reconciliação. Alertas bloqueantes são efeito adicional, não nova pontuação. Revisão cruzada não preenchida.

**Análise aproveitada:** [fundamentação anterior de Renato para S-Q3](resultados.md#s-q3-o1-integridade-e-resistencia-a-adulteracao).


### Segurança · O2 — Identificação, responsabilização e riscos de segurança


#### S-Q4 — As ações dos usuários são rastreáveis?

**Hipótese original:** Não: a versão gratuita não guarda histórico de versões nem registra o autor de cada alteração

**Métricas relacionadas e resultados disponíveis:**

| Métrica / evidência | Valor documentado | Nota documentada (0–2) |
| --- | --- | --- |
| [S-M7 · Completude da trilha de auditoria](../resultados/seguranca/s-m7.md) | 0 de 7 ações com autoria verificável (0%) | **0** |
| [S-M8 · Histórico de versões com autoria](../resultados/seguranca/s-m8.md) | Histórico persistente com autoria não encontrado | **0** |

**Resposta fundamentada:** Não foi encontrada rastreabilidade persistente das ações até seus autores no material observável. Presença de participantes e desfazer/refazer não formam histórico auditável com autoria.

**Julgamento da hipótese:** **Confirmada** no recorte documentado.

**Justificativa:** Mantém-se a confirmação da hipótese negativa de Renato: nenhuma das sete ações teve autoria verificável, e não foi encontrado histórico persistente com data e autor. A conclusão descreve o recorte observável do cliente gratuito.

**Limitações e métricas pendentes:** Não há métrica pendente. S-M7 não preservou HAR completo nem decifrou os payloads; não prova ausência de todo campo interno cifrado. S-M8 não comparou efetivamente o Excalidraw+: conserva-se a nota registrada 0, com o enquadramento entre 0 e 1 pendente de revisão metodológica. Registros não revisados.

**Análise aproveitada:** [fundamentação anterior de Renato para S-Q4](resultados.md#s-q4-o2-rastreabilidade-das-acoes).


#### S-Q5 — O sistema confirma a identidade de quem participa da sessão?

**Hipótese original:** Não: o participante só informa um nome, sem login, e qualquer pessoa pode usar o nome de outra

**Métricas relacionadas e resultados disponíveis:**

| Métrica / evidência | Valor documentado | Nota documentada (0–2) |
| --- | --- | --- |
| [S-M9 · Suficiência da autenticação](../resultados/seguranca/s-m9.md) | Nome autodeclarado | **1** |
| [S-M10 · Passar-se por outro participante](../resultados/seguranca/s-m10.md) | Sim (1 de 1 tentativa aceita sem alerta) | **0** |

**Resposta fundamentada:** Não há confirmação da identidade no fluxo gratuito examinado. O nome é autodeclarado, e uma tentativa de usar o nome de outro participante foi aceita sem alerta ou bloqueio.

**Julgamento da hipótese:** **Confirmada** no recorte documentado.

**Justificativa:** Mantém-se a confirmação da hipótese negativa de Renato. A existência de nome e `socketId` não verifica a identidade: duas conexões distintas passaram a aparecer como Alice. S-M9 e S-M10 sustentam conjuntamente a conclusão.

**Limitações e métricas pendentes:** Não há métrica pendente. A troca de nome chamou pelo console o método usado pela interface; foram três abas do mesmo perfil, com sockets distintos e armazenamento compartilhado. Quatro arquivos foram conferidos por hash na evidência. Não generalizar para todas as formas de personificação ou para o produto pago; revisões cruzadas não preenchidas.

**Análise aproveitada:** [fundamentação anterior de Renato para S-Q5](resultados.md#s-q5-o2-autenticidade-dos-participantes).


#### S-Q6 — A aplicação resiste a ataques e vulnerabilidades conhecidas?

**Hipótese original:** Parcialmente: o projeto é mantido ativamente e deve ter poucas vulnerabilidades críticas, mas a configuração de hospedagem do repositório não define CSP, o que deve baixar a nota dos cabeçalhos

**Métricas relacionadas e resultados disponíveis:**

| Métrica / evidência | Valor documentado | Nota documentada (0–2) |
| --- | --- | --- |
| [S-M11 · Vulnerabilidades altas ou críticas nas dependências](../resultados/seguranca/s-m11.md) | 5 avisos altos; 0 críticos no recorte web | **0** |
| [S-M12 · Advisories, CVEs e tempo de correção](../resultados/seguranca/s-m12.md) | 1 aviso aplicável sem correção identificada; média indisponível | **0** |
| [S-M13 · Cabeçalhos de segurança HTTP](../resultados/seguranca/s-m13.md) | 3 de 6 cabeçalhos (nota C) | **1** |

**Resposta fundamentada:** Há fragilidades documentadas, e as evidências não certificam resistência a ataques. O recorte do cliente web teve cinco avisos altos e nenhum crítico; um caso aplicável ficou sem correção pública identificada no corte da coleta. A resposta HTTP coletada tinha proteção incompleta.

**Julgamento da hipótese:** **Parcialmente confirmada** no recorte documentado.

**Justificativa:** Mantém-se a conclusão parcial de Renato: ausência de CSP e nota C apoiam a previsão sobre cabeçalhos, e o recorte web não apresentou críticos. Porém avisos altos e o caso sem correção impedem tomar manutenção ativa como prova de resistência satisfatória; a coleta não demonstra relação causal entre manutenção e contagem de avisos.

**Limitações e métricas pendentes:** Não há métrica pendente, mas o tempo médio de correção é indisponível, não zero dias. S-M11/S-M12 retratam 08/11/2026 e não demonstram exploração ou composição do bundle implantado. Os recortes de dependências não são aditivos; o registro do CVE ainda não estava revisado na coleta. S-M13 mistura configuração versionada e resposta pública cujo SHA implantado não foi comprovado. Revisões cruzadas pendentes.

**Análise aproveitada:** [fundamentação anterior de Renato para S-Q6](resultados.md#s-q6-o2-resistencia-a-ataques-e-vulnerabilidades-conhecidas).


### Flexibilidade · O3 — Adaptabilidade a diferentes ambientes e dispositivos


#### F-Q1 — O Excalidraw funciona de forma consistente em diferentes navegadores e sistemas operacionais?

**Hipótese original:** Sim, com pequenas diferenças: é uma aplicação web que roda inteira no navegador, mas fontes e atalhos de teclado podem variar no macOS e no Safari

**Métricas relacionadas e resultados disponíveis:**

| Métrica / evidência | Valor documentado | Nota documentada (0–2) |
| --- | --- | --- |
| [F-M1 · Compatibilidade de navegadores](../resultados/flexibilidade/f-m1.md) | 4 de 4 navegadores (100%) | **2** |
| [F-M2 · Compatibilidade de sistemas operacionais](../resultados/flexibilidade/f-m2.md) | 3 de 5 sistemas (60%) | **1** |
| [F-M3 · Defeitos específicos de ambiente](../resultados/flexibilidade/f-m3.md) | 2 defeitos específicos | **1** |

**Resposta fundamentada:** O funcionamento foi consistente nos quatro ambientes de navegador examinados no macOS, mas a estabilidade não foi uniforme entre sistemas e dispositivos. Houve interrupção por clipboard no Firefox do Android e scroll travado no Safari do iPad.

**Julgamento da hipótese:** **Parcialmente confirmada** no recorte documentado.

**Justificativa:** Aproveita-se a síntese parcial de André: as tarefas disponíveis foram concluídas nos cinco sistemas, mas apenas três ficaram sem falhas. Portanto, falha de estabilidade não significa que todas as tarefas falharam. As diferenças observadas concentraram-se no mobile; a previsão específica sobre fontes e atalhos no macOS não foi demonstrada.

**Limitações e métricas pendentes:** Não há métrica pendente, mas a cobertura tem desvios documentados: Chrome foi representado pelo Helium/Chromium; Linux não estava disponível; iOS e iPadOS foram contados separadamente. F-M1 testa navegadores no macOS, não todas as combinações de navegador e sistema. A trava de ferramenta ausente no mobile foi registrada como não disponível, não como defeito da F-M3. Preservam-se denominadores e notas existentes; revisões pendentes.

**Análise aproveitada:** [síntese por questão de André](resultados.md#sintese-por-questao), preservada no relatório principal.


#### F-Q2 — A aplicação se adapta a diferentes dispositivos e condições de uso?

**Hipótese original:** Parcialmente: há barra de ferramentas própria para celular e uso offline como PWA, mas colaboração e IA dependem de conexão, e funções ligadas a atalhos devem ser limitadas no toque

**Métricas relacionadas e resultados disponíveis:**

| Métrica / evidência | Valor documentado | Nota documentada (0–2) |
| --- | --- | --- |
| [F-M4 · Cobertura funcional em dispositivos móveis](../resultados/flexibilidade/f-m4.md) | 25 de 25 funções por toque (100%) | **2** |
| [F-M5 · Cobertura funcional offline](../resultados/flexibilidade/f-m5.md) | 16 de 23 funções sem rede (69,6%) | **1** |
| [F-M6 · Resoluções sem perda de elementos](../resultados/flexibilidade/f-m6.md) | 3 de 4 larguras | **1** |

**Resposta fundamentada:** A aplicação se adapta parcialmente: as 25 funções selecionadas funcionaram por toque na emulação, o núcleo de desenho e edição funcionou offline e três larguras mantiveram os elementos da interface. Serviços remotos e alguns recursos não armazenados no primeiro acesso dependeram de rede.

**Julgamento da hipótese:** **Parcialmente confirmada** no recorte documentado.

**Justificativa:** Aproveita-se a síntese de André com as ressalvas integradas: colaboração e IA dependerem de conexão sustenta parte da hipótese, mas o ensaio de toque não demonstrou a limitação prevista nas 25 funções escolhidas. A ausência dos botões de zoom e trava em 360 px é perda de controle visível, não prova de ausência da função. A combinação das três métricas sustenta adaptação parcial.

**Limitações e métricas pendentes:** Não há métrica pendente. F-M4 usa emulação Chrome, não iPad/Safari real, e exclui modificadores de teclado e funções dependentes de servidor; a trava não foi encontrada nos aparelhos reais da F-M2. F-M5 pressupõe um primeiro acesso com rede e tem sensibilidade ao cache. F-M6 redimensiona janela desktop, sem toque. Não trocar as notas pelos cenários alternativos já documentados.

**Análise aproveitada:** [síntese por questão de André](resultados.md#sintese-por-questao), preservada no relatório principal.


### Flexibilidade · O4 — Substituibilidade e migração de diagramas


#### F-Q3 — O Excalidraw pode substituir uma ferramenta equivalente (por exemplo, draw.io ou Miro) sem perda de funcionalidade e produtividade?

**Hipótese original:** Parcialmente: deve cobrir as tarefas básicas de diagramação em tempo parecido, mas não todas as funções de ferramentas mais completas como o draw.io e o Miro

**Métricas relacionadas e resultados disponíveis:**

| Métrica / evidência | Valor documentado | Nota documentada (0–2) |
| --- | --- | --- |
| [F-M7 · Inclusão funcional](../resultados/flexibilidade/f-m7.md) | 24 de 42 funções do draw.io (57,1%) | **0** |
| F-M8 · Razão de tempo de tarefa | — | — |
| F-M9 · Conclusão de tarefas por quem vem de outra ferramenta | — | — |

**Resposta fundamentada:** A substituição funcional é limitada ao conjunto básico observado: a F-M7 mostra cobertura incompleta frente ao draw.io. Ainda não se pode responder se a substituição preserva produtividade ou se os usuários migrantes concluem as mesmas tarefas.

**Julgamento da hipótese:** **Inconclusiva** por insuficiência de evidências.

**Justificativa:** A parcela funcional da hipótese é compatível com a presença de funções básicas e ausência das avançadas. A previsão de tempo parecido depende da F-M8, e a conclusão por usuários migrantes depende da F-M9; ambas estão pendentes. Por isso a hipótese composta permanece inconclusiva, sem transformá-la em refutada apenas pela nota 0 da F-M7.

**Limitações e métricas pendentes:** Pendentes: F-M8 e F-M9, sem valor nem nota. A referência efetivamente examinada foi draw.io, não Miro. F-M7 mede existência de funções no recorte escolhido, não produtividade nem facilidade de uso; as leituras alternativas documentadas mantêm sua nota 0. Nenhuma nova sessão ou medição foi realizada.


#### F-Q4 — Os dados podem ser migrados para dentro e para fora do Excalidraw sem perdas?

**Hipótese original:** Parcialmente: o formato `.excalidraw` é um JSON aberto e deve preservar tudo ao exportar e reimportar, mas não há importação direta de arquivos do draw.io nem do Miro

**Métricas relacionadas e resultados disponíveis:**

| Métrica / evidência | Valor documentado | Nota documentada (0–2) |
| --- | --- | --- |
| [F-M10 · Cobertura de formatos de exportação](../resultados/flexibilidade/f-m10.md) | 60% | **1** |
| [F-M11 · Fidelidade de migração](../resultados/flexibilidade/f-m11.md) | 12 de 12 elementos (100%) | **2** |
| [F-M12 · Formatos de importação aceitos](../resultados/flexibilidade/f-m12.md) | 4 formatos | **2** |

**Resposta fundamentada:** A migração é possível com limites: o round-trip no próprio Excalidraw preservou os 12 elementos e 34 atributos comparados, enquanto importação direta de diagramas do draw.io/Miro não foi encontrada. Exportar ou inserir uma imagem comum não garante diagrama editável em outra ferramenta.

**Julgamento da hipótese:** **Confirmada** no recorte documentado.

**Justificativa:** Mantém-se o julgamento de André como confirmação da hipótese originalmente parcial, dentro do recorte ensaiado. Os três formatos com cena preservaram os elementos; os limites de exportação e de importação documentados correspondem à expectativa de migração restrita. Confirmar essa hipótese não equivale a declarar migração irrestrita ou O4 atendido.

**Limitações e métricas pendentes:** Não há métrica pendente, mas F-M10 mantém lista de cinco formatos ainda sujeita à decisão do grupo; sua nota 1 não é recalculada. F-M11 é uma cena sem imagens, frames ou embeds, na mesma versão e ferramenta; PNG/SVG exigem cena incorporada. F-M12 mede existência dos caminhos no código, e a lista de tipos Mermaid editáveis vem da documentação, não de ensaio completo.

**Análise aproveitada:** [síntese por questão de André](resultados.md#sintese-por-questao), preservada no relatório principal.


### Capacidade de interação · O5 — Compreensão, aprendizagem e operação da interface


#### CI-Q1 — O usuário consegue reconhecer rapidamente se o Excalidraw atende à sua necessidade?

**Hipótese original:** Sim: a tela de boas-vindas e a barra de ferramentas à vista deixam claro, em poucos segundos, que é um quadro branco para desenhar

**Métricas relacionadas e resultados disponíveis:**

| Métrica / evidência | Valor documentado | Nota documentada (0–2) |
| --- | --- | --- |
| CI-M1 · Tempo até identificar o propósito | — | — |
| CI-M2 · Taxa de reconhecimento correto | — | — |
| CI-M3 · Ícones autoexplicativos | — | — |

**Resposta fundamentada:** Não é possível determinar a rapidez ou a correção com que usuários reconhecem a finalidade da ferramenta: não há resultados consolidados das três métricas desta questão.

**Julgamento da hipótese:** **Inconclusiva** por insuficiência de evidências.

**Justificativa:** A existência da tela de boas-vindas e de ícones não substitui o tempo, a descrição correta e o reconhecimento de ícones pelos participantes. Falta evidência para confirmar ou refutar a hipótese positiva.

**Limitações e métricas pendentes:** Pendentes: CI-M1, CI-M2 e CI-M3, todas sem valor e sem nota. Não foram inferidos segundos, taxas ou respostas de participantes a partir de capturas da interface. A autodescritividade observada em CI-M7 não substitui a identificação de ícones medida pela CI-M3.


#### CI-Q2 — Um usuário novo consegue aprender a usar as funções básicas sem treinamento?

**Hipótese original:** Sim: as funções básicas seguem as convenções de editores gráficos (escolher a ferramenta, arrastar para desenhar)

**Métricas relacionadas e resultados disponíveis:**

| Métrica / evidência | Valor documentado | Nota documentada (0–2) |
| --- | --- | --- |
| CI-M4 · Tempo da primeira tarefa | — | — |
| CI-M5 · Conclusão sem ajuda | — | — |
| CI-M6 · Consultas à ajuda | — | — |

**Resposta fundamentada:** Não é possível concluir se iniciantes aprendem as funções básicas sem treinamento. O comportamento técnico do editor não demonstra o desempenho de um usuário novo.

**Julgamento da hipótese:** **Inconclusiva** por insuficiência de evidências.

**Justificativa:** São necessários os registros de tempo da primeira tarefa, conclusão sem ajuda e consultas à ajuda. A semelhança com convenções de editores gráficos fundamenta a hipótese original, mas não é resultado de teste com participantes.

**Limitações e métricas pendentes:** Pendentes: CI-M4, CI-M5 e CI-M6, sem valor nem nota. Não se usam tempos de automação ou de avaliadores como se fossem tempos de iniciantes; não há resultado de sessão consolidado empregado nesta análise.


#### CI-Q3 — A ferramenta oferece recursos que apoiam o aprendizado contínuo?

**Hipótese original:** Parcialmente: há diálogo de ajuda com os atalhos e dicas na tela, mas não há tutorial guiado

**Métricas relacionadas e resultados disponíveis:**

| Métrica / evidência | Valor documentado | Nota documentada (0–2) |
| --- | --- | --- |
| [CI-M7 · Cobertura da ajuda interna](../resultados/capacidade-interacao/ci-m7.md) | 46 de 74 funções (62,2%) | **1** |
| CI-M8 · Melhoria de desempenho entre sessões | — | — |

**Resposta fundamentada:** Há apoio documental parcial ao aprendizado: o diálogo de atalhos cobre 46 das 74 funções com controle visível, mas não cobre abrir, salvar, exportar e parte das propriedades; não há tutorial guiado no recorte documentado. A melhoria de desempenho ao longo de sessões ainda não foi demonstrada.

**Julgamento da hipótese:** **Parcialmente confirmada** no recorte documentado.

**Justificativa:** O recurso e a limitação previstos na hipótese estão documentados pela CI-M7. Isso permite confirmação parcial quanto ao apoio oferecido, mas não autoriza afirmar eficácia do aprendizado contínuo, pois CI-M8 está pendente. A nota da cobertura da ajuda não funciona como medida de ganho entre sessões.

**Limitações e métricas pendentes:** Pendente: CI-M8, sem valor nem nota. CI-M7 inspeciona o diálogo de ajuda e sua cobertura, não a clareza de toda a documentação, tooltips ou material externo. Conserva-se o denominador 74; o cenário com 17 funções é apenas sensibilidade. O campo de revisão da evidência está pendente.


#### CI-Q4 — As tarefas comuns podem ser realizadas de forma eficiente?

**Hipótese original:** Sim: as ferramentas têm atalho de uma tecla (por exemplo, R ou 2 para retângulo), o que deve tornar os usuários experientes bem mais rápidos

**Métricas relacionadas e resultados disponíveis:**

| Métrica / evidência | Valor documentado | Nota documentada (0–2) |
| --- | --- | --- |
| [CI-M9 · Ações por tarefa frequente](../resultados/capacidade-interacao/ci-m9.md) | média de 2,5 ações | **2** |
| [CI-M10 · Cobertura de atalhos de teclado](../resultados/capacidade-interacao/ci-m10.md) | 17 de 17 funções frequentes (100%) | **2** |
| CI-M11 · Tempo de experientes em relação a iniciantes | — | — |

**Resposta fundamentada:** As quatro tarefas frequentes exigiram poucas ações no percurso documentado, e as 17 funções selecionadas possuem atalhos no código. Esses mecanismos favorecem eficiência operacional, mas não demonstram que experientes sejam mais rápidos que iniciantes.

**Julgamento da hipótese:** **Parcialmente confirmada** no recorte documentado.

**Justificativa:** Aproveitam-se os achados de André sobre CI-M9/CI-M10: 2,5 ações é um resultado já coletado da métrica, não uma média GQM calculada nesta etapa. A previsão sobre rapidez relativa exige a CI-M11; sem ela, o componente causal e a diferença de desempenho por experiência permanecem não verificados.

**Limitações e métricas pendentes:** Pendente: CI-M11, sem valor nem nota. CI-M9 cobre quatro tarefas, duas repetições cada, e exclui a preparação da cena. CI-M10 é inspeção de código, não validação de todos os atalhos no navegador; o de exportação abre apenas o diálogo e os de cor têm pré-condições. Não extrapolar a lista selecionada para todas as ações do editor.


#### CI-Q5 — A interface se comporta de forma consistente e previsível?

**Hipótese original:** Parcialmente: a interface é simples e dá retorno visual imediato, mas seleção, snapping e edição de texto em formas podem mudar conforme o contexto

**Métricas relacionadas e resultados disponíveis:**

| Métrica / evidência | Valor documentado | Nota documentada (0–2) |
| --- | --- | --- |
| [CI-M12 · Inconsistências da interface](../resultados/capacidade-interacao/ci-m12.md) | 0 inconsistências em 11 casos | **2** |
| [CI-M13 · Ações com feedback visual imediato](../resultados/capacidade-interacao/ci-m13.md) | 13 de 13 ações (100%) | **2** (provisória) |

**Resposta fundamentada:** No recorte testado, a interface se mostrou consistente: os 11 casos repetidos não produziram inconsistências entre contextos, e as 13 ações deram retorno visual no ponto de observação. A imediaticidade desse retorno ainda não foi comprovada.

**Julgamento da hipótese:** **Refutada** no recorte documentado.

**Justificativa:** Preserva-se a refutação registrada por André, restrita à previsão de mudanças de comportamento por contexto nos casos de seleção, snapping e texto examinados: o resultado foi melhor que a limitação esperada. A análise considera também a CI-M13, que apoia presença de feedback, mas não resolve sua dimensão temporal. Assim, não se refuta a existência de feedback nem se conclui previsibilidade universal; a classificação da hipótese fica qualificada pelo recorte e pela nota provisória.

**Limitações e métricas pendentes:** Não há métrica sem resultado. CI-M12 examina 11 casos em Safari/macOS e não prova ausência de toda inconsistência. Escape preservou texto nos dois contextos; diferenças de quebra de linha foram classificadas como layout. CI-M13 usa Edge headless/Windows, sem medição de latência ou critério operacional temporal aprovado; a nota 2/2 é provisória, com validação manual e revisão cruzada pendentes. O julgamento e o percentual existentes na síntese de André não são recalculados nem homologados aqui.

**Análise aproveitada:** [síntese por questão de André](resultados.md#sintese-por-questao), preservada no relatório principal.


#### CI-Q6 — O sistema evita e permite recuperar erros do usuário?

**Hipótese original:** Sim: há desfazer e refazer, a cena é salva automaticamente no navegador e limpar o canvas pede confirmação

**Métricas relacionadas e resultados disponíveis:**

| Métrica / evidência | Valor documentado | Nota documentada (0–2) |
| --- | --- | --- |
| [CI-M14 · Taxa de recuperabilidade](../resultados/capacidade-interacao/ci-m14.md) | 11 de 13 ações (84,62%) | **0 provisória** |
| [CI-M15 · Ações destrutivas sem confirmação](../resultados/capacidade-interacao/ci-m15.md) | 1 ação sem confirmação entre 4 tipos | **1** |
| [CI-M16 · Perda de dados ao fechar ou recarregar](../resultados/capacidade-interacao/ci-m16.md) | Não houve perda nos 2 cenários testados | **2** |

**Resposta fundamentada:** Há prevenção e recuperação de erros no recorte ensaiado: edições e seleção foram recuperadas, a limpeza pediu confirmação e o autosave preservou a cena após reload e reabertura da aba. A proteção é incompleta: abrir outro arquivo substituiu a cena sem confirmação no fallback HTML, e tema/zoom não foram recuperados pelo histórico.

**Julgamento da hipótese:** **Parcialmente confirmada** no recorte documentado.

**Justificativa:** Mantém-se a conclusão parcial de Renato, considerando as três métricas em conjunto. A recuperação observada e a persistência apoiam a hipótese, mas não eliminam o fluxo destrutivo sem confirmação nem a pendência metodológica da recuperabilidade. A nota provisória 0 da CI-M14 não constitui, sozinha, conclusão de ausência de toda recuperação.

**Limitações e métricas pendentes:** Não há métrica sem resultado. CI-M14 conserva 11/13, 84,62%, nota 0/2 provisória; tema e zoom continuam no denominador original. O cenário documentado 11/11 é sensibilidade, não substituição autorizada. CI-M15 não cobre seletor nativo ou arrastar e soltar. CI-M16 aguardou autosave e reabriu a aba no mesmo contexto; não cobre crash, gravação pendente ou reinício do navegador/SO. Validação manual e revisão cruzada pendentes.

**Análise aproveitada:** [fundamentação anterior de Renato para CI-Q6](resultados.md#ci-q6-o5-protecao-contra-erros-do-usuario).


#### CI-Q7 — Os erros cometidos são frequentes e fáceis de entender?

**Hipótese original:** Parcialmente: os erros devem ser poucos nas tarefas básicas, mas seleções e movimentos acidentais devem aparecer entre iniciantes e no toque

**Métricas relacionadas e resultados disponíveis:**

| Métrica / evidência | Valor documentado | Nota documentada (0–2) |
| --- | --- | --- |
| CI-M17 · Taxa de erro do usuário | — | — |
| [CI-M18 · Mensagens de erro compreensíveis](../resultados/capacidade-interacao/ci-m18.md) | 8 de 18 mensagens (44%) — provisório | **0 provisória** |

**Resposta fundamentada:** A frequência dos erros dos participantes e a ocorrência por perfil ou toque são desconhecidas. Quanto às mensagens, o registro documental provisório classificou apenas 8 de 18 como explicativas e acionáveis; isso indica apoio incompleto, sem medir compreensão real dos usuários.

**Julgamento da hipótese:** **Inconclusiva** por insuficiência de evidências.

**Justificativa:** Preserva-se a observação de Renato sobre a clareza parcial, mas a classificação única da hipótese é inconclusiva: a previsão literal trata de poucos erros, seleções e movimentos acidentais entre iniciantes/no toque, que dependem da CI-M17. A CI-M18 não mede frequência ou distribuição por perfil e não confirma essa previsão. Trata-se de qualificação da síntese anterior, sem descartar seus achados.

**Limitações e métricas pendentes:** Pendente: CI-M17, sem valor nem nota. CI-M18 é classificação de uma pessoa, sem revisão ou validação de compreensão com participantes, restrita a `errors.*` em inglês. Os 44% e a nota 0 são provisórios; a sensibilidade documentada de 39% a 61% pode mudar a nota. Não se usam fichas não consolidadas como resultados revisados.

**Análise aproveitada:** [fundamentação anterior de Renato para CI-Q7](resultados.md#ci-q7-o5-frequencia-e-compreensao-dos-erros).


#### CI-Q8 — A interface é agradável e satisfatória para o usuário?

**Hipótese original:** Sim: o estilo desenhado à mão e o modo escuro tendem a agradar, e o SUS deve ficar acima da média de 68

**Métricas relacionadas e resultados disponíveis:**

| Métrica / evidência | Valor documentado | Nota documentada (0–2) |
| --- | --- | --- |
| CI-M19 · Escore SUS | — | — |
| CI-M20 · Satisfação visual | — | — |
| CI-M21 · Intenção de uso futuro | — | — |

**Resposta fundamentada:** Não é possível concluir se a interface é agradável, satisfatória ou se há intenção de uso futuro: SUS, satisfação visual e intenção ainda não têm resultados consolidados nesta base.

**Julgamento da hipótese:** **Inconclusiva** por insuficiência de evidências.

**Justificativa:** Mantém-se a inconclusão de Renato. Estilo desenhado à mão e modo escuro são características da interface, não respostas de participantes. Não há base para testar a previsão de SUS acima de 68 ou preferência visual.

**Limitações e métricas pendentes:** Pendentes: CI-M19, CI-M20 e CI-M21, sem valor e sem pontuação. É necessário consolidar e revisar os registros das sessões; não foram fabricados escores, médias Likert ou intenções de uso. Ausência de evidência não é evidência de insatisfação.

**Análise aproveitada:** [fundamentação anterior de Renato para CI-Q8](resultados.md#ci-q8-o5-engajamento-e-satisfacao).


### Capacidade de interação · O6 — Acessibilidade e adequação a diferentes perfis de usuários


#### CI-Q9 — Pessoas com deficiência conseguem usar o Excalidraw?

**Hipótese original:** Parcialmente: menus e barra de ferramentas devem ser operáveis pelo teclado, mas os elementos desenhados no canvas não devem ser anunciados por leitores de tela

**Métricas relacionadas e resultados disponíveis:**

| Métrica / evidência | Valor documentado | Nota documentada (0–2) |
| --- | --- | --- |
| [CI-M22 · Violações da WCAG 2.2 (A e AA)](../resultados/capacidade-interacao/ci-m22.md) | 6 violações distintas | **0** |
| [CI-M23 · Funções operáveis só pelo teclado](../resultados/capacidade-interacao/ci-m23.md) | 18 de 28 funções (64,3%) | **1** |
| [CI-M24 · Elementos anunciados por leitor de tela](../resultados/capacidade-interacao/ci-m24.md) | 1 de 9 elementos (11,1%) | **0** |
| [CI-M25 · Contraste mínimo de 4,5:1](../resultados/capacidade-interacao/ci-m25.md) | 8 de 19 combinações (42,1%) | **0** |

**Resposta fundamentada:** O uso por pessoas com deficiência encontra barreiras importantes: a operação por teclado é incompleta, só o nome HTML do frame foi anunciado na cena testada e há violações de interface e contraste insuficiente em parte dos textos.

**Julgamento da hipótese:** **Parcialmente confirmada** no recorte documentado.

**Justificativa:** Mantém-se a conclusão parcial de Renato. A previsão de barreira no canvas se sustenta para o NVDA/Edge examinado, mas a expectativa de menus e barra operáveis não foi plenamente atendida. As quatro métricas convergem para assistência limitada; a exceção do frame impede afirmar que nenhum elemento é anunciado, e os recursos operáveis impedem concluir ausência de toda assistência.

**Limitações e métricas pendentes:** Não há métrica pendente, mas persistem revisões. CI-M22 conta regra por elemento, com alternativa por regra ainda não adotada; ferramentas não cobrem todo o canvas ou diálogos. CI-M23 não confirmou SHA por hash e tem quatro casos Sim com clipboard/diálogos não concluídos integralmente. CI-M24 cobre NVDA/Edge, com frame visível, não todos os leitores. CI-M25 usa combinações de texto e fundo padrão, com ressalva de ancestrais do DOM; não mede ícones.

**Análise aproveitada:** [fundamentação anterior de Renato para CI-Q9](resultados.md#ci-q9-o6-acessibilidade).


#### CI-Q10 — A ferramenta se adapta a diferentes perfis de usuário?

**Hipótese original:** Sim: a interface é traduzida para dezenas de idiomas, e o arquivo de traduções do repositório indica 96% das strings em português do Brasil

**Métricas relacionadas e resultados disponíveis:**

| Métrica / evidência | Valor documentado | Nota documentada (0–2) |
| --- | --- | --- |
| [CI-M26 · Idiomas e tradução para o português](../resultados/capacidade-interacao/ci-m26.md) | 57 idiomas; 594 de 642 strings (92,5%) | **1** |

**Resposta fundamentada:** Há ampla oferta de idiomas e cobertura significativa de pt-BR, porém incompleta. Os 96% do arquivo oficial usam as chaves existentes no próprio pt-BR; a comparação com todas as strings de referência registra 92,5%. Isso não demonstra adequação a todos os perfis.

**Julgamento da hipótese:** **Parcialmente confirmada** no recorte documentado.

**Justificativa:** Mantém-se a conclusão parcial de Renato: dezenas de idiomas sustentam a expectativa, mas a cobertura oficial não equivale à cobertura de todas as strings. A reavaliação integrada confirmou os mesmos números e nota 1; não se recalcula a métrica nesta etapa nem se toma tradução como substituto de acessibilidade.

**Limitações e métricas pendentes:** Não há métrica pendente. Há divergência documental de revisão: a página individual ainda tem aviso de revisão pendente, enquanto seu contexto e a evidência original identificam Luís Felipe em 15/11/2026 e o PR #107 integrado. Registra-se a inconsistência sem editar a página ou inventar revisão. A comparação esclarece que `a8800f8` é snapshot do grupo, não outra versão do Excalidraw. A amostra qualitativa de 20 chaves não cobre toda a tradução ou todos os perfis.

**Análise aproveitada:** [fundamentação anterior de Renato para CI-Q10](resultados.md#ci-q10-o6-adequacao-a-diferentes-perfis).


## Julgamentos interpretativos preliminares dos objetivos

**Todos os julgamentos desta seção são preliminares.** São propostas qualitativas, não classificações quantitativas finais. A [seção 6 do roteiro](roteiro.md#6-criterios-de-julgamento) exige confronto com médias oficiais e estabelece as faixas de atendimento; nenhuma média ou percentual por questão/objetivo foi calculado aqui. As tabelas de síntese do relatório principal e os cálculos de André permanecem intactos. A confirmação de hipóteses negativas não melhora a qualidade avaliada.

**Conferência com a contribuição remota:** as propostas qualitativas de O1, O2, O3 e O6 são compatíveis com as categorias já publicadas por André em `44302e5`; O4 e O5 continuam sem classificação consolidada. Essa comparação de categorias não revalida seus cálculos ou encerra as decisões metodológicas. Mantém-se o caráter preliminar desta contribuição até a revisão conjunta e a integração dos documentos.

### O1 — Proteção das informações e controle de acesso

**Propósito específico e questões:** identificar fragilidades na proteção dos diagramas e na restrição de acessos não autorizados, do ponto de vista de quem compartilha dados potencialmente sensíveis. Questões: S-Q1, S-Q2 e S-Q3.

**Hipóteses:** S-Q2 confirmada (previsão negativa); S-Q1 e S-Q3 parcialmente confirmadas.

**Evidências favoráveis:** S-M2 não encontrou envio da chave na captura local; S-M5 rejeitou todas as adulterações do protocolo testado. Mensagens de desenho e persistência remota examinadas tiveram proteção criptográfica.

**Evidências desfavoráveis:** S-M1 registrou nome em claro; S-M3 não encontrou os controles de senha, expiração e revogação; S-M4 recuperou dados locais legíveis; S-M6 mostrou divergência em edições simultâneas. Esses problemas atingem confidencialidade, controle de acesso e integridade, em vez de um único aspecto isolado.

**Julgamento interpretativo preliminar proposto: Não atendido.** As proteções criptográficas observadas não demonstram atendimento do conjunto de necessidades de proteção e restrição de acesso. A proposta considera as falhas documentadas, sem aplicar informalmente os limites quantitativos do roteiro.

**Limitações:** ensaios locais e revisão cruzada pendente; retenção remota e `#json` não concluídos na S-M3; correspondência de processo/checkout limitada na S-M4; risco Sentry teórico. Não é certificação de segurança nem julgamento do Excalidraw+. Falta a conferência conjunta das médias de André e das ressalvas das evidências.

### O2 — Identificação, responsabilização e riscos de segurança

**Propósito específico e questões:** identificar limitações de identidade e autoria em sessões colaborativas e exposição a vulnerabilidades conhecidas, sob a perspectiva de participantes e mantenedores. Questões: S-Q4, S-Q5 e S-Q6.

**Hipóteses:** S-Q4 e S-Q5 confirmadas (previsões negativas); S-Q6 parcialmente confirmada.

**Evidências favoráveis:** o recorte web da S-M11 não apresentou avisos críticos, e a S-M13 encontrou três cabeçalhos de proteção. São resultados favoráveis localizados, sem comprovar identidade ou autoria.

**Evidências desfavoráveis:** não houve autoria verificável nas sete ações da S-M7 ou histórico persistente com autoria na S-M8; nome autodeclarado e personificação aceita em S-M9/S-M10; cinco avisos altos, um caso aplicável sem correção pública identificada e cabeçalhos incompletos em S-M11 a S-M13.

**Julgamento interpretativo preliminar proposto: Não atendido.** Os mecanismos observados não sustentam identificação confiável ou responsabilização persistente, e a análise técnica registra riscos adicionais. A conclusão não depende de presumir exploração de vulnerabilidade ou somar recortes de auditoria.

**Limitações:** payloads cifrados não decifrados na S-M7; produto pago não comparado na S-M8; recorte local na personificação. Vulnerabilidades retratam o corte de 08/11/2026, não exploração em produção; resposta HTTP não fixa o SHA implantado. Revisões e médias de André ainda precisam ser confrontadas.

### O3 — Adaptabilidade a diferentes ambientes e dispositivos

**Propósito específico e questões:** identificar limitações de compatibilidade e adaptação das funções essenciais nos ambientes selecionados, do ponto de vista de usuários finais em dispositivos variados. Questões: F-Q1 e F-Q2.

**Hipóteses:** ambas parcialmente confirmadas.

**Evidências favoráveis:** quatro ambientes de navegador concluíram as tarefas sem falhas na F-M1; 25 funções por toque funcionaram nos dois dispositivos emulados na F-M4; o núcleo de desenho/edição teve uso offline, e três larguras mantiveram os elementos da interface.

**Evidências desfavoráveis:** interrupção de clipboard no Android/Firefox e scroll travado no iPad/Safari; dependência de rede para serviços e recursos não armazenados; perda de controles visíveis em 360 px. O toque emulado favorável não elimina os problemas em aparelhos reais.

**Julgamento interpretativo preliminar proposto: Parcialmente atendido.** A leitura qualitativa é compatível com o julgamento de O3 já registrado por André: há adaptação demonstrada e limitações concretas. Seus valores permanecem preservados, sem recálculo ou nova aprovação nesta contribuição.

**Limitações:** Chrome representado pelo Helium na F-M1, Linux não testado e iOS/iPadOS separados na F-M2; matriz de combinações incompleta; emulação não reproduz todas as condições físicas e o teclado virtual. Cache e escolha de funções condicionam o offline. Revisões e consolidação quantitativa continuam sob responsabilidade dos responsáveis.

### O4 — Substituibilidade e migração de diagramas

**Propósito específico e questões:** determinar a viabilidade de substituir ferramentas equivalentes e preservar informações durante a migração, do ponto de vista de quem traz atividades e arquivos de outra ferramenta. Questões: F-Q3 e F-Q4.

**Hipóteses:** F-Q3 inconclusiva quanto ao conjunto funcionalidade/produtividade; F-Q4 confirmada no recorte da hipótese de migração parcial.

**Evidências favoráveis:** F-M7 identifica funções básicas presentes; F-M11 preservou a cena de teste no round-trip; F-M12 registra quatro formatos aceitos.

**Evidências desfavoráveis:** cobertura funcional incompleta frente ao draw.io; ausência documentada de importação direta de draw.io/Miro; exportação restrita frente aos cinco formatos selecionados. Fidelidade dentro da própria ferramenta não demonstra fidelidade de migração entre ferramentas.

**Julgamento interpretativo preliminar proposto: Pendente de consolidação.** A migração observada é limitada, mas F-M8/F-M9 ausentes impedem julgar a preservação da produtividade e a conclusão de tarefas por usuários migrantes. Não se declara o objetivo não atendido apenas pela F-M7 nem atendido apenas pela F-M11.

**Limitações:** denominador da F-M10 ainda sujeito à decisão do grupo; uma cena de 12 elementos na F-M11, sem imagens, frames ou embeds; importação avaliada sobretudo por existência no código. A comparação funcional efetiva foi com draw.io. Faltam a consolidação das métricas pendentes e o julgamento quantitativo de André.

### O5 — Compreensão, aprendizagem e operação da interface

**Propósito específico e questões:** identificar dificuldades de reconhecimento, aprendizagem, operação, prevenção/recuperação de erros e engajamento, do ponto de vista de iniciantes e experientes. Questões: CI-Q1 a CI-Q8.

**Hipóteses:** CI-Q3, CI-Q4 e CI-Q6 parcialmente confirmadas; CI-Q5 refutada no recorte da previsão de inconsistência, com imediaticidade inconclusiva; CI-Q1, CI-Q2, CI-Q7 e CI-Q8 inconclusivas.

**Evidências favoráveis:** poucas ações nas tarefas selecionadas e atalhos no código; nenhuma inconsistência nos 11 casos comparados; feedback observado nas 13 ações; recuperação de edições/seleção e persistência após autosave nos cenários documentados.

**Evidências desfavoráveis:** ajuda incompleta, uma abertura destrutiva sem confirmação e mensagens de erro com orientação limitada. CI-M14 registra 11/13 recuperáveis e nota 0 provisória, cuja ressalva sobre tema/zoom impede tratá-la como falha definitiva de toda a recuperação.

**Julgamento interpretativo preliminar proposto: Pendente de consolidação.** Os achados técnicos não cobrem reconhecimento, aprendizagem efetiva, ganho por experiência, frequência de erros ou satisfação. Faltam CI-M1 a CI-M6, CI-M8, CI-M11, CI-M17 e CI-M19 a CI-M21. Não se generaliza sucesso de automação como sucesso de participantes.

**Limitações:** cobertura desigual; CI-M13 sem medição temporal, CI-M14 com decisão metodológica pendente, CI-M15/16 com validação manual pendente e CI-M18 documental/provisória. A CI-M16 depende de aguardar autosave e não cobre falhas abruptas. É necessário consolidar as sessões, revisões e médias com André antes da classificação final.

### O6 — Acessibilidade e adequação a diferentes perfis

**Propósito específico e questões:** identificar barreiras de inclusividade e assistência na navegação, interação e apresentação de informações, do ponto de vista de usuários com necessidades variadas de acessibilidade. Questões: CI-Q9 e CI-Q10.

**Hipóteses:** ambas parcialmente confirmadas.

**Evidências favoráveis:** parte das funções é operável por teclado; o nome HTML do frame foi anunciado; há dezenas de idiomas e cobertura significativa de pt-BR, com reavaliação documentada na CI-M26.

**Evidências desfavoráveis:** seleção/criação no canvas, menu principal e outros fluxos tiveram barreiras de teclado; a maior parte da cena não foi anunciada pelo NVDA; há violações de interface e combinações de texto com contraste insuficiente. A tradução também está incompleta em relação ao total de strings de referência.

**Julgamento interpretativo preliminar proposto: Não atendido.** Há recursos de assistência e idioma, porém barreiras documentadas atingem operações e compreensão essenciais do desenho. O julgamento considera teclado, leitor, contraste e tradução em conjunto; a oferta de idiomas não compensa tecnicamente as barreiras de acesso ao canvas.

**Limitações:** ambientes diferentes entre métricas; quatro casos qualificados na CI-M23; CI-M22 automatizada e restrita a estados de interface; CI-M24 não cobre VoiceOver/outros leitores; CI-M25 usa fundo padrão e combinações de texto. A revisão da CI-M26 está documentada, mas há aviso desatualizado na página; sua amostra qualitativa não representa toda a tradução. A classificação quantitativa final depende de André.

## Limitações transversais e pendências de integração

**Cobertura desigual e métricas não medidas.** F-M8/F-M9 e CI-M1 a CI-M6, CI-M8, CI-M11, CI-M17 e CI-M19 a CI-M21 permanecem sem valor e sem nota. São 14 métricas pendentes, não 14 notas zero. F-Q3, CI-Q1, CI-Q2, CI-Q7 e CI-Q8 têm hipótese global inconclusiva; CI-Q3/CI-Q4 permitem confirmação parcial somente do componente observado. A localização de fichas em outra branch não equivale a resultado revisado nesta base.

**Ambientes e versão.** Ensaios de código, testes locais headless, emulação, aparelhos reais e resposta pública são fontes distintas. Safari/macOS, Edge/Windows, Helium no lugar do Chrome e Chromium embutido podem diferir. Nem toda evidência confirmou hash ou vínculo do processo ao checkout, e a resposta pública de cabeçalhos não prova o SHA implantado. Os resultados não se generalizam ao Excalidraw+, a todos os dispositivos, a todos os leitores de tela ou a versões futuras.

**Resultados provisórios e decisões metodológicas.** CI-M13 não mediu latência; CI-M14 conserva 11/13, 84,62%, nota 0/2 provisória e tema/zoom no denominador original; CI-M18 é classificação documental subjetiva ainda sensível à revisão. F-M10 tem lista de formatos a decidir, S-M8 tem comparação com produto pago não realizada, CI-M22 tem unidade regra/elemento e CI-M23 tem quatro casos com conclusão qualificada. Nenhum cenário alternativo foi adotado para substituir notas ou denominadores.

**Revisão documental e revisão de coleta.** A integração das páginas não equivale à revisão metodológica de todas as evidências. Na CI-M26, a evidência original e a reavaliação incorporada registram revisão, enquanto o aviso da página individual ainda diz pendente; essa divergência textual fica registrada para correção posterior, sem editar a página nesta tarefa. Não há divergência numérica nova nesse caso.

**Limites de generalização.** Amostras pequenas de ações, cenas e contextos não medem frequência de uso real. A ausência de inconsistências em CI-M12 não prova consistência universal; comparação por script não demonstra aprendizagem ou satisfação. Avisos de dependências e leitura estática de um CVE não demonstram exploração, e ausência de autoria observável não prova ausência de todo metadado cifrado.

**Etapa conjunta com André.** Incorporar de forma coordenada o commit remoto `44302e5` e integrar este auxiliar ao relatório principal atualizado, aproveitando os trechos já existentes; manter hipóteses literais; harmonizar o julgamento único de CI-Q7 e as qualificações de CI-Q5/F-Q4; resolver revisões e decisões metodológicas; então confrontar as propostas de O1 a O6 com as médias oficiais de André e com o tratamento aprovado das pendências. O3 e as sínteses numéricas já existentes permanecem preservados, sem homologação adicional. A relação com a Tabela 1 do propósito, a lista final de melhorias, sua priorização e a discussão integrada entre características continuam para a etapa conjunta.

## Quadro de rastreabilidade dos 20 julgamentos

| Questão | Objetivo | Julgamento da hipótese | Situação da evidência |
| --- | --- | --- | --- |
| S-Q1 | O1 | Parcialmente confirmada | Todas as métricas têm resultado |
| S-Q2 | O1 | Confirmada | Todas as métricas têm resultado |
| S-Q3 | O1 | Parcialmente confirmada | Todas as métricas têm resultado |
| S-Q4 | O2 | Confirmada | Todas as métricas têm resultado |
| S-Q5 | O2 | Confirmada | Todas as métricas têm resultado |
| S-Q6 | O2 | Parcialmente confirmada | Todas as métricas têm resultado |
| F-Q1 | O3 | Parcialmente confirmada | Todas as métricas têm resultado |
| F-Q2 | O3 | Parcialmente confirmada | Todas as métricas têm resultado |
| F-Q3 | O4 | Inconclusiva | Pendentes: F-M8, F-M9 |
| F-Q4 | O4 | Confirmada | Todas as métricas têm resultado; denominador de F-M10 a decidir e round-trip limitado |
| CI-Q1 | O5 | Inconclusiva | Pendentes: CI-M1, CI-M2, CI-M3 |
| CI-Q2 | O5 | Inconclusiva | Pendentes: CI-M4, CI-M5, CI-M6 |
| CI-Q3 | O5 | Parcialmente confirmada | Pendentes: CI-M8 |
| CI-Q4 | O5 | Parcialmente confirmada | Pendentes: CI-M11 |
| CI-Q5 | O5 | Refutada | Todas as métricas têm resultado; nota provisória em CI-M13; refutação limitada aos contextos comparados |
| CI-Q6 | O5 | Parcialmente confirmada | Todas as métricas têm resultado; nota provisória em CI-M14 |
| CI-Q7 | O5 | Inconclusiva | Pendentes: CI-M17; nota provisória em CI-M18 |
| CI-Q8 | O5 | Inconclusiva | Pendentes: CI-M19, CI-M20, CI-M21 |
| CI-Q9 | O6 | Parcialmente confirmada | Todas as métricas têm resultado |
| CI-Q10 | O6 | Parcialmente confirmada | Todas as métricas têm resultado |

**Contagem dos julgamentos das hipóteses:** 4 confirmadas, 10 parcialmente confirmadas, 1 refutada e 5 inconclusivas. Essa contagem não é pontuação, média ou percentual GQM. As 20 questões foram abordadas; onde falta evidência essencial, a resposta explica por que não é possível concluir.
