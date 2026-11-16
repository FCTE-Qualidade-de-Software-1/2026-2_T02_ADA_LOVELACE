# Resultados

Esta página deve ser preenchida após a execução dos casos de teste descritos no
[roteiro da análise](roteiro.md). Nenhum resultado deve ser inferido apenas a
partir da documentação do Excalidraw.

## Resumo executivo

`[Apresente a síntese após a coleta: versão avaliada, ambientes, objetivos
atendidos e principais riscos.]`

## Configuração da avaliação

| Item | Registro |
| --- | --- |
| Versão ou commit avaliado | `[Preencher]` |
| Data e duração da coleta | `[Preencher]` |
| Navegadores e versões | `[Preencher]` |
| Sistemas e dispositivos | `[Preencher]` |
| Participantes e perfil | `[Preencher sem nomes reais]` |
| Casos de teste executados | `[Preencher]` |

## Achados

| ID | Objetivo/métrica | Evidência reproduzível | Pontuação (0–2) | Impacto | Recomendação |
| --- | --- | --- | --- | --- | --- |
| A-S-M5-1 | S-Q3 · S-M5: mensagem válida reenviada (replay) é aceita, porque a cifra não tem contador nem AAD; no teste, a reconciliação descartou a versão antiga e a cena não mudou | [S-M5, O1](https://github.com/FCTE-Qualidade-de-Software-1/2026-2_T02_ADA_LOVELACE/blob/main/evidencias/seguranca/S-M5/S-M5_deteccao-adulteracao.md#6-observações-e-limitações) | 2 | Baixo | Incluir contador ou ID da sala como AAD e descartar sequências repetidas |
| A-S-M5-2 | S-Q3 · S-M5: cada mensagem inválida abre um `window.alert` bloqueante; quem souber só o ID da sala pode inundar a sessão (21 mensagens inválidas, enviadas sem a chave a partir de um participante, geraram 21 alertas no teste ponta a ponta) | [S-M5, O2](https://github.com/FCTE-Qualidade-de-Software-1/2026-2_T02_ADA_LOVELACE/blob/main/evidencias/seguranca/S-M5/S-M5_deteccao-adulteracao.md#6-observações-e-limitações) | 2 | Médio | Trocar o alerta por aviso não bloqueante e limitar a frequência |
| A-S-M6-1 | S-Q3 · S-M6: participantes divergem por até cerca de 20 s depois de edições concorrentes, até a ressincronização completa (rodadas 7, 9 e 10 no app; no modelo, 35% das rodadas com o destinatário editando o elemento) | [S-M6, O2](https://github.com/FCTE-Qualidade-de-Software-1/2026-2_T02_ADA_LOVELACE/blob/main/evidencias/seguranca/S-M6/S-M6_edicao-simultanea.md#6-observações-e-limitações) | 1 | Baixo | Ressincronizar o elemento assim que a edição local termina |
| A-S-M6-2 | S-Q3 · S-M6: em edições concorrentes do mesmo elemento, a edição perdedora é descartada sem aviso; mover um elemento não é protegido, e ele "pisca" para quem o está arrastando | [S-M6, O3](https://github.com/FCTE-Qualidade-de-Software-1/2026-2_T02_ADA_LOVELACE/blob/main/evidencias/seguranca/S-M6/S-M6_edicao-simultanea.md#6-observações-e-limitações) | 1 | Baixo a médio | Avisar o autor da edição substituída ou bloquear o elemento em edição por outro |
| A-S-M6-3 | S-Q3 · S-M6: depois de um empate de versão, quem perde o desempate sobe a versão sozinho (`bumpElementVersions` no recebimento) e, se isso ocorrer depois da última ressincronização dela, a versão não chega aos outros (2 de 8 rodadas no app real; na rodada 8, persistiu por 2 min). Depois disso, uma edição não concorrente de outro participante pode ser descartada em silêncio nessa janela (teste `edição posterior`) | [S-M6, O1 e seção 7](https://github.com/FCTE-Qualidade-de-Software-1/2026-2_T02_ADA_LOVELACE/blob/main/evidencias/seguranca/S-M6/S-M6_edicao-simultanea.md#7-achado-preencher-só-se-a-pontuação-for-0) | 1 | Médio a alto | Não aplicar `bumpElementVersions` a atualizações recebidas da colaboração, como o comentário da própria função indica, ou retransmitir a versão gerada |
| A-CI-M24-1 | CI-Q9 · CI-M24: o NVDA anuncia só 1 de 9 elementos desenhados (o nome do frame, que é HTML); formas, linhas, texto, desenho livre e imagem são pixels num canvas lido só como "Tela de desenho", e seleção e mudanças pelo teclado não produzem fala | [CI-M24, seção 7](https://github.com/FCTE-Qualidade-de-Software-1/2026-2_T02_ADA_LOVELACE/blob/main/evidencias/capacidade-interacao/CI-M24/CI-M24_elementos-anunciados.md#7-achado-preencher-só-se-a-pontuação-for-0) | 0 | Alto | Expor os elementos numa estrutura acessível paralela ao canvas (tipo, texto, rótulo e posição), anunciar seleção e mudanças numa região `aria-live` e permitir texto alternativo em imagens |

## Síntese por questão

A pontuação de cada questão é a média simples das notas das suas métricas, e o
percentual é `média / 2 × 100`, interpretado conforme a
[seção 6 do roteiro](roteiro.md#6-criterios-de-julgamento): 75% ou mais,
atendido; de 50% a 74%, parcialmente atendido; abaixo de 50%, não atendido.
As notas de cada métrica estão em [Resultados](../resultados/index.md).

| Questão | Métricas (nota) | Média | Percentual | Hipótese | Por quê |
| --- | --- | ---: | ---: | --- | --- |
| S-Q1 · Confidencialidade dos dados | S-M1, S-M2 | `[ ]` | `[ ]%` | Confirmada parcialmente | Ver análise parcial de Renato, seção S-Q1; médias reservadas à etapa conjunta. |
| S-Q2 · Controle de acesso | S-M3, S-M4 | `[ ]` | `[ ]%` | Confirmada no recorte, com limitações | Ver análise parcial de Renato, seção S-Q2; médias reservadas à etapa conjunta. |
| S-Q3 · Integridade | S-M5, S-M6 | `[ ]` | `[ ]%` | Confirmada parcialmente | Ver análise parcial de Renato, seção S-Q3; médias reservadas à etapa conjunta. |
| S-Q4 · Rastreabilidade | S-M7, S-M8 | `[ ]` | `[ ]%` | Confirmada no recorte observável | Ver análise parcial de Renato, seção S-Q4; médias reservadas à etapa conjunta. |
| S-Q5 · Autenticidade | S-M9, S-M10 | `[ ]` | `[ ]%` | Confirmada no recorte local | Ver análise parcial de Renato, seção S-Q5; médias reservadas à etapa conjunta. |
| S-Q6 · Resistência | S-M11 a S-M13 | `[ ]` | `[ ]%` | Confirmada parcialmente, com ressalvas | Ver análise parcial de Renato, seção S-Q6; médias reservadas à etapa conjunta. |
| F-Q1 · Navegadores e sistemas | F-M1 (2), F-M2 (1), F-M3 (1) | 1,33 | 66,7% | Confirmada em parte | Os quatro navegadores passaram, mas 2 de 5 sistemas falharam (erro de clipboard no Firefox do Android e scroll travado no Safari do iPad): as diferenças ficaram nos dispositivos móveis, não no macOS |
| F-Q2 · Dispositivos e condições de uso | F-M4 (2), F-M5 (1), F-M6 (1) | 1,33 | 66,7% | Confirmada em parte | Há barra própria para celular e o editor funciona offline, mas colaboração, IA, idioma e Mermaid dependem de rede, e o celular perde os botões de zoom e trava. A limitação no toque não apareceu nas 25 funções testadas |
| F-Q3 · Substituir uma ferramenta equivalente | F-M7 (0), F-M8, F-M9 | `[ ]` | `[ ]%` | `[ ]` | F-M7: 24 de 42 funções do draw.io (57,1%), faltam as avançadas. F-M8 e F-M9 dependem das sessões com participantes |
| F-Q4 · Migração de dados | F-M10 (1), F-M11 (2), F-M12 (2) | 1,67 | 83,3% | Confirmada | O `.excalidraw` e as imagens com cena incorporada preservaram 12 de 12 elementos, mas faltam PDF e JPEG na exportação e nenhum formato de outra ferramenta é importado como diagrama editável |
| CI-Q1 · Reconhecer a adequação | CI-M1 a CI-M3 | `[ ]` | `[ ]%` | `[ ]` | Dependem das sessões com participantes |
| CI-Q2 · Aprender as funções básicas | CI-M4 a CI-M6 | `[ ]` | `[ ]%` | `[ ]` | Dependem das sessões com participantes |
| CI-Q3 · Apoio ao aprendizado contínuo | CI-M7 (1), CI-M8 | `[ ]` | `[ ]%` | `[ ]` | CI-M7: a ajuda documenta 46 de 74 funções (62,2%) e não tem tutorial guiado. CI-M8 depende das sessões |
| CI-Q4 · Eficiência nas tarefas comuns | CI-M9 (2), CI-M10 (2), CI-M11 | `[ ]` | `[ ]%` | `[ ]` | CI-M9: as tarefas frequentes pedem em média 2,5 ações. CI-M10: as 17 funções frequentes têm atalho, as ferramentas com uma tecla. CI-M11 depende das sessões |
| CI-Q5 · Consistência e previsibilidade | CI-M12 (2), CI-M13 (2) | 2,00 | 100% | Refutada | A hipótese previa diferenças conforme o contexto, mas os 11 casos de seleção, snapping e texto se comportaram igual nos dois contextos (CI-M12), e as 13 ações deram retorno visual (CI-M13). O resultado é melhor que o previsto |
| CI-Q6 · Evitar e recuperar erros | CI-M14 a CI-M16 | `[ ]` | `[ ]%` | Confirmada parcialmente; classificação provisória | Ver análise parcial de Renato, seção CI-Q6; médias reservadas à etapa conjunta. |
| CI-Q7 · Frequência e clareza dos erros | CI-M17, CI-M18 | `[ ]` | `[ ]%` | Confirmação parcial apenas na clareza; frequência inconclusiva | Ver análise parcial de Renato, seção CI-Q7; médias reservadas à etapa conjunta. |
| CI-Q8 · Satisfação | CI-M19 a CI-M21 | `[ ]` | `[ ]%` | Inconclusiva; sem confirmação ou refutação | Ver análise parcial de Renato, seção CI-Q8; médias reservadas à etapa conjunta. |
| CI-Q9 · Uso por pessoas com deficiência | CI-M22 a CI-M25 | `[ ]` | `[ ]%` | Confirmada parcialmente, com barreiras adicionais | Ver análise parcial de Renato, seção CI-Q9; médias reservadas à etapa conjunta. |
| CI-Q10 · Adaptação a perfis de usuário | CI-M26 | `[ ]` | `[ ]%` | Confirmada parcialmente na dimensão linguística | Ver análise parcial de Renato, seção CI-Q10; médias reservadas à etapa conjunta. |

## Análise parcial de Segurança e Capacidade de interação — Renato

Esta contribuição da issue #20 interpreta S-Q1 a S-Q6 e CI-Q6 a CI-Q10 a partir das coletas existentes. As hipóteses abaixo vêm do [roteiro](roteiro.md); confirmar uma hipótese negativa significa confirmar a limitação prevista, não atendimento da qualidade. A referência oficial é `e7b534668a60add7f725531f3c9abf32508c7b4e`, com as ressalvas de correspondência e de implantação de cada evidência.

O [inventário das 26 métricas](../resultados/inventario-renato-issue-20.md) registra valores, notas, integração e revisão. Não foram realizadas novas medições nem usados resultados não revisados das entrevistas. Não se calculam aqui médias por questão/objetivo: o tratamento de pendências, notas provisórias e divergências metodológicas será combinado pelo grupo. As sínteses anteriores de André, inclusive O3, permanecem preservadas.

### S-Q1 · O1 — Dados protegidos no tráfego e armazenamento

**Hipótese original:** Sim: as mensagens da colaboração usam AES-GCM no navegador, e a chave fica no fragmento do link, não enviado pelo navegador ao servidor.

**Métricas e resultados disponíveis:** [S-M1](../resultados/seguranca/s-m1.md): cinco de seis tipos de evento cifrados (83,3%), nota 0. [S-M2](../resultados/seguranca/s-m2.md): nenhuma ocorrência da chave nas requisições e frames examinados, nota 2.

**Interpretação — Confirmada parcialmente:** A proteção observada cobre desenho, ponteiro, status e persistência remota examinada, mas o nome no evento user-follow fica legível para o servidor de sala. O conteúdo enviado à IA também fica fora da cifra do aplicativo, como observação separada da proporção. A hipótese positiva é sustentada apenas em parte; não há prova de proteção integral de todos os dados.

**Limitações e pendências:** Coleta local; o risco de envio do fragmento em breadcrumbs do Sentry é teórico, sem confirmação em produção. A proporção por volume (99,5%) não substitui a contagem por tipo usada na nota. O armazenamento local é examinado pela S-M4, associada no roteiro à S-Q2. As duas métricas possuem resultado, com revisão cruzada não preenchida.

### S-Q2 · O1 — Controle de acesso a desenhos compartilhados

**Hipótese original:** Não: na versão gratuita, quem tem o link acessa sem senha, expiração ou revogação, e a cena fica sem criptografia no localStorage.

**Métricas e resultados disponíveis:** [S-M3](../resultados/seguranca/s-m3.md): zero mecanismos entre senha, expiração e revogação, nota 0. [S-M4](../resultados/seguranca/s-m4.md): persistência de cena e dados associados sem criptografia da aplicação, nota 0.

**Interpretação — Confirmada no recorte, com limitações:** A hipótese negativa é confirmada quanto à ausência dos controles oferecidos no cliente e à persistência local legível. A saída do criador não invalidou imediatamente o link da sala local enquanto outro participante permanecia conectado. Isso não demonstra acesso remoto indevido ao armazenamento de um usuário.

**Limitações e pendências:** Na S-M3, a exportação #json não terminou, o Firebase estava indisponível e a captura de reentrada de C é limitada. Na S-M4, a associação entre o checkout auditado e o processo Vite não foi comprovada; a coleta não mede cifra de disco nem segurança do serviço real de IA. Ambas aguardam revisão; não há métrica sem resultado nesta questão.

### S-Q3 · O1 — Integridade e resistência à adulteração

**Hipótese original:** Sim: AES-GCM autenticado rejeita payload adulterado e a reconciliação por versão deve evitar inconsistências em edição simultânea.

**Métricas e resultados disponíveis:** [S-M5](../resultados/seguranca/s-m5.md): 221/221 adulterações rejeitadas, nota 2. [S-M6](../resultados/seguranca/s-m6.md): duas inconsistências em oito rodadas concorrentes, nota 1.

**Interpretação — Confirmada parcialmente:** A parte de adulteração é confirmada nas injeções realizadas. A expectativa de ausência de inconsistências não se sustenta integralmente: duas rodadas terminaram com versões diferentes, uma ainda divergente após dois minutos. Por isso a hipótese composta é apenas parcialmente confirmada.

**Limitações e pendências:** Os testes são locais e não estimam ocorrência em todos os ambientes. Replay de mensagem válida não é adulteração e fica fora da taxa; no caso observado, a reconciliação impediu mudança da cena. Os alertas bloqueantes são um efeito adicional. Nenhuma métrica está sem resultado, mas a revisão cruzada não está preenchida.

### S-Q4 · O2 — Rastreabilidade das ações

**Hipótese original:** Não: a versão gratuita não guarda histórico de versões nem registra o autor de cada alteração.

**Métricas e resultados disponíveis:** [S-M7](../resultados/seguranca/s-m7.md): zero de sete ações com autoria verificável (0%), nota 0. [S-M8](../resultados/seguranca/s-m8.md): histórico persistente com autoria não encontrado, nota registrada 0.

**Interpretação — Confirmada no recorte observável:** A hipótese negativa é confirmada para a interface e os registros acessíveis coletados: presença de participantes, propagação de mensagens e Desfazer/Refazer não formam uma trilha persistente com autoria. A constatação não prova que todo payload cifrado careça de metadados internos.

**Limitações e pendências:** S-M7 não decifrou os frames e não preservou HAR completo. S-M8 não comparou efetivamente o Excalidraw+: preserva-se a nota documentada 0, com o enquadramento entre ausência e existência apenas no produto pago pendente de revisão. Os dois registros se declaram não revisados; não há resultado numérico ausente.

### S-Q5 · O2 — Autenticidade dos participantes

**Hipótese original:** Não: o participante só informa um nome, sem login, e qualquer pessoa pode usar o nome de outra.

**Métricas e resultados disponíveis:** [S-M9](../resultados/seguranca/s-m9.md): nome autodeclarado, nota 1. [S-M10](../resultados/seguranca/s-m10.md): uma tentativa de usar o nome de outro participante aceita sem alerta, nota 0.

**Interpretação — Confirmada no recorte local:** A hipótese negativa é confirmada no cliente gratuito e na sessão local: C mudou de Carlos para Alice e as outras abas passaram a mostrar dois participantes Alice. O nome exibido não constitui identidade verificada.

**Limitações e pendências:** S-M10 usou três abas do mesmo perfil com sockets diferentes, compartilhando localStorage, e chamou pelo console o método do campo de nome. Quatro arquivos relevantes foram conferidos por hash contra o upstream. Isso não representa teste de todas as formas de personificação ou do produto pago. Revisões cruzadas não preenchidas; métricas com resultado.

### S-Q6 · O2 — Resistência a ataques e vulnerabilidades conhecidas

**Hipótese original:** Parcialmente: manutenção ativa deve deixar poucas vulnerabilidades críticas, mas a ausência de CSP na configuração deve reduzir a nota dos cabeçalhos.

**Métricas e resultados disponíveis:** [S-M11](../resultados/seguranca/s-m11.md): cinco avisos altos e nenhum crítico no recorte do cliente web, nota 0. [S-M12](../resultados/seguranca/s-m12.md): um caso aplicável sem correção pública identificada até 08/11/2026, média de correção indisponível, nota 0. [S-M13](../resultados/seguranca/s-m13.md): três de seis cabeçalhos e nota C, pontuação 1.

**Interpretação — Confirmada parcialmente, com ressalvas:** A ausência de CSP e a limitação dos cabeçalhos confirmam a parcela sobre hospedagem; a ausência de críticos vale apenas para o recorte web adotado. Os cinco avisos altos e o caso aplicável sem correção identificada impedem interpretar manutenção ativa como evidência de resistência satisfatória. A hipótese é parcialmente confirmada, sem certificação de resistência a ataques.

**Limitações e pendências:** S-M11 e S-M12 são fotografias de 08/11/2026, sem nova consulta ou exploração nesta consolidação. S-M12 tem zero intervalos verificáveis: não se calcula média de zero dias. S-M13 mede a resposta pública coletada, sem comprovar o SHA do deploy. Revisões cruzadas não preenchidas; não há métrica sem resultado.

### CI-Q6 · O5 — Proteção contra erros do usuário

**Hipótese original:** Sim: há desfazer/refazer, autosave no navegador e confirmação ao limpar o canvas.

**Métricas e resultados disponíveis:** [CI-M14](../resultados/capacidade-interacao/ci-m14.md): 11/13 = 84,62%, nota 0 provisória. [CI-M15](../resultados/capacidade-interacao/ci-m15.md): uma ação sem confirmação entre quatro tipos, nota 1. [CI-M16](../resultados/capacidade-interacao/ci-m16.md): nenhuma perda nos dois cenários testados, nota 2.

**Interpretação — Confirmada parcialmente; classificação provisória:** Há suporte à hipótese na recuperação das dez edições e da seleção, no autosave e na confirmação de limpeza. Porém a abertura sobre uma cena existente não pediu confirmação no fallback HTML, e tema/zoom ficaram fora da recuperação pelo histórico. O conjunto sustenta confirmação parcial, sujeita à decisão metodológica da CI-M14.

**Limitações e pendências:** Mantêm-se tema e zoom no denominador original. O cenário 11/11, 100%, nota 2 é sensibilidade, sem substituir 11/13 ou autorizar mudança da nota. CI-M16 aguardou autosave e reabriu só a aba no mesmo contexto; não testou crash ou reinício. Todas têm resultado automatizado, com validação manual de Renato e revisão cruzada pendentes.

### CI-Q7 · O5 — Frequência e compreensão dos erros

**Hipótese original:** Parcialmente: erros devem ser poucos nas tarefas básicas, com seleções e movimentos acidentais entre iniciantes e no toque.

**Métricas e resultados disponíveis:** CI-M17 permanece sem valor e sem nota consolidada. [CI-M18](../resultados/capacidade-interacao/ci-m18.md) registra 8/18 mensagens (44%) que explicam o problema e indicam ação, nota 0 provisória.

**Interpretação — Confirmação parcial apenas na clareza; frequência inconclusiva:** O rascunho da CI-M18 mostra apoio incompleto à compreensão e recuperação, compatível com uma confirmação apenas parcial nessa dimensão. Ele não mede erros cometidos por participantes. A previsão de poucos erros e de diferenças por perfil/toque permanece inconclusiva sem CI-M17.

**Limitações e pendências:** CI-M18 é classificação documental por uma pessoa, ainda não revisada, restrita a errors.* em inglês; a sensibilidade de 39% a 61% pode mudar a nota. Há fichas na branch de entrevistas, mas nenhum resultado delas foi usado aqui. Falta consolidar e revisar numerador e denominador da CI-M17.

### CI-Q8 · O5 — Engajamento e satisfação

**Hipótese original:** Sim: o estilo desenhado à mão e o modo escuro tendem a agradar, e o SUS deve superar 68.

**Métricas e resultados disponíveis:** CI-M19 (SUS), CI-M20 (satisfação visual) e CI-M21 (intenção de uso futuro) permanecem sem valor e sem pontuação nesta consolidação.

**Interpretação — Inconclusiva; sem confirmação ou refutação:** Não há base revisada incorporada para confirmar, refutar ou confirmar parcialmente a hipótese. A existência de temas ou estilos não substitui as respostas dos participantes.

**Limitações e pendências:** A branch feat/entrevistas contém fichas e questionários ainda não integrados. É necessário revisar os registros, os denominadores e os cálculos antes de usar os resultados. Ausência de resultado não é evidência de insatisfação e não recebe nota zero.

### CI-Q9 · O6 — Acessibilidade

**Hipótese original:** Parcialmente: menus e barra devem ser operáveis pelo teclado, mas o leitor de tela não deve anunciar os elementos desenhados no canvas.

**Métricas e resultados disponíveis:** [CI-M22](../resultados/capacidade-interacao/ci-m22.md): seis violações distintas, nota 0. [CI-M23](../resultados/capacidade-interacao/ci-m23.md): 18/28 funções (64,3%), nota registrada 1. [CI-M24](../resultados/capacidade-interacao/ci-m24.md): 1/9 elementos (11,1%), nota 0. [CI-M25](../resultados/capacidade-interacao/ci-m25.md): 8/19 combinações de contraste (42,1%), nota 0.

**Interpretação — Confirmada parcialmente, com barreiras adicionais:** A previsão sobre o canvas se confirma no NVDA/Edge: só o nome HTML do frame foi anunciado. A expectativa sobre menus e barra não é plenamente sustentada: CI-M23 registra impedimentos no menu principal, idioma e criação/seleção no canvas. As violações de interface e o contraste insuficiente acrescentam barreiras. A hipótese composta é parcialmente confirmada no recorte testado.

**Limitações e pendências:** Os ambientes são distintos. CI-M23 não confirmou SHA por hash, tem clipboard sintético e quatro Sim com conclusão incompleta; a nota registrada exige revisão desses casos. CI-M22 conta regra por elemento (por regra seriam cinco, nota 1). CI-M25 usa fundo padrão; CI-M24 depende da visibilidade do frame e não cobre outros leitores. Nenhuma métrica está sem resultado; revisões não estão preenchidas nas evidências.

### CI-Q10 · O6 — Adequação a diferentes perfis

**Hipótese original:** Sim: há dezenas de idiomas e o arquivo de cobertura indica 96% das strings em pt-BR.

**Métricas e resultados disponíveis:** [CI-M26](../resultados/capacidade-interacao/ci-m26.md): 57 idiomas, 594 de 642 strings traduzidas (92,5%), nota 1.

**Interpretação — Confirmada parcialmente na dimensão linguística:** A quantidade de idiomas sustenta a hipótese, mas os 96% usam como denominador as chaves existentes no próprio pt-BR. Considerando todas as strings de en.json, o resultado registrado é 92,5%, com 48 sem tradução. A confirmação é parcial e restrita à cobertura linguística, sem concluir adequação a todos os perfis.

**Limitações e pendências:** O snapshot da coleta original não teve correspondência com o SHA upstream confirmada. O PR #107, ainda aberto, registra reavaliação e comparação com os mesmos números em a8800f8 do repositório do grupo; essa diferença de versão é mantida. A métrica não avalia qualidade de todas as traduções. Resultado existente preservado; complemento pendente de integração.

### Pendências da etapa conjunta

Definir o tratamento das métricas sem resultado, resolver as ressalvas metodológicas e concluir revisões antes das médias. Julgamentos dos objetivos O1 a O6, percentuais globais, relação com as decisões da Tabela 1, priorização geral de melhorias e discussão integrada ficam para a etapa conjunta. O julgamento de O3 já presente na branch não foi refeito. As notas zero disponíveis permanecem identificáveis no índice e nas páginas, inclusive a CI-M14 provisória; não se estabelece prioridade global nesta contribuição.

## Síntese por objetivo

| Objetivo | Média (0–2) | Percentual | Julgamento |
| --- | ---: | ---: | --- |
| O1 — Proteção das informações e controle de acesso | `[ ]` | `[ ]%` | `[Atendido/Parcial/Não atendido]` |
| O2 — Identificação, responsabilização e riscos de segurança | `[ ]` | `[ ]%` | `[Atendido/Parcial/Não atendido]` |
| O3 — Adaptabilidade a diferentes ambientes e dispositivos | 1,33 | 66,7% | Parcialmente atendido |
| O4 — Substituibilidade e migração de diagramas | `[ ]` | `[ ]%` | `[Atendido/Parcial/Não atendido]` |
| O5 — Compreensão, aprendizagem e operação da interface | `[ ]` | `[ ]%` | `[Atendido/Parcial/Não atendido]` |
| O6 — Acessibilidade e adequação a diferentes perfis | `[ ]` | `[ ]%` | `[Atendido/Parcial/Não atendido]` |

## Gestão do grupo

Os indicadores abaixo devem ser preenchidos pela sessão automatizada descrita
em [Métricas de gestão do grupo](gestao-grupo.md). Eles avaliam o processo de
execução e não compõem a pontuação da qualidade do Excalidraw.

| Métrica | Valor | Denominador | Pontos (0–2) | Fonte/limitação |
| --- | ---: | ---: | ---: | --- |
| G-G1 — Cobertura de participação | `[ ]` | `[ ]` | `[ ]` | `[ ]` |
| G-G2 — Equilíbrio de entregas | `[ ]` | `[ ]` | `[ ]` | `[ ]` |
| G-G3 — Cumprimento do plano | `[ ]` | `[ ]` | `[ ]` | `[ ]` |
| G-G4 — Tempo mediano de ciclo | `[ ]` | `[ ]` | `[ ]` | `[ ]` |
| G-G5 — Revisão efetiva | `[ ]` | `[ ]` | `[ ]` | `[ ]` |
| G-G6 — Rastreabilidade do estudo | `[ ]` | `[ ]` | `[ ]` | `[ ]` |
| G-G7 — Saúde do backlog | `[ ]` | `[ ]` | `[ ]` | `[ ]` |
| G-G8 — Continuidade | `[ ]` | `[ ]` | `[ ]` | `[ ]` |

**Média da gestão:** `[ ] / 2` — **`[ ]%`** — **`[Atendida/Parcial/Não
atendida]`**. Métricas com 0 pontos e respectivas ações: `[Preencher]`.

## Pontos fortes

* `[Descreva o ponto forte, a métrica e a evidência que o sustentam.]`

## Oportunidades de melhoria

* `[Descreva a oportunidade, sua prioridade, o impacto e a recomendação.]`

## Limitações

`[Registre limitações de ambiente, tamanho da amostra, funcionalidades não
acessíveis, dependência de serviços externos e qualquer condição que limite a
validade dos resultados.]`
