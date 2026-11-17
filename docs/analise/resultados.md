# Resultados

Relatório integrado da issue #20, com as interpretações de Renato
(`34ca062591887d5f7779b2d33d145b26a8de8edb`) e os cálculos e a síntese de André
(`44302e5ee7d6805124bf5846d5628c09df2fcad1`), preservados no histórico Git.
A integração de 17/11/2026 não realiza novas medições nem altera valores,
notas ou denominadores publicados. Os critérios são os do [roteiro](roteiro.md).

## Resumo executivo

O Excalidraw foi avaliado no commit `e7b5346`, entre 4 e 15 de novembro de
2026, em seis objetivos ligados a três características da ISO/IEC 25010:2023:
Segurança, Flexibilidade e Capacidade de interação. Das 51 métricas do
roteiro, 37 têm nota; as outras 14 dependem das sessões com participantes.

Com os dados atuais:

- **Segurança é o ponto fraco.** O1 (41,7%) e O2 (13,9%) não são atendidos. A
  colaboração cifra o desenho e não envia a chave ao servidor, mas não há
  controle de acesso ao link, autoria das alterações nem identificação dos
  participantes, e a cena fica sem cifra no navegador.
- **Flexibilidade é parcial.** O3 (66,7%) é parcialmente atendido: o editor
  funciona em navegadores, no toque e offline, mas há falhas em dois sistemas
  móveis e dependência de rede para parte das funções. A migração de dados (F-Q4, 83,3%)
  é atendida, com 100% de fidelidade no formato próprio.
- **Acessibilidade não é atendida.** O6 (31,3%): o leitor de tela não
  anuncia o que está desenhado, e há violações da WCAG e textos com pouco
  contraste.
- O4 e O5 dependem das métricas das sessões com participantes.

## Configuração da avaliação

| Item | Registro |
| --- | --- |
| Versão ou commit avaliado | Commit [`e7b5346`](https://github.com/excalidraw/excalidraw/commit/e7b534668a60add7f725531f3c9abf32508c7b4e) do Excalidraw, em instância local e em build de produção servido localmente ([ambiente](https://github.com/FCTE-Qualidade-de-Software-1/2026-2_T02_ADA_LOVELACE/blob/main/evidencias/ambiente/ambiente-local.md)) |
| Data e duração da coleta | De 4 a 15 de novembro de 2026; sessões com participantes de 12 a 15 de novembro |
| Navegadores e versões | Google Chrome 157 (também automatizado com Playwright), Microsoft Edge 157, Helium 157 (Chromium), Firefox 160, Safari 27.2 e Opera; NVDA 2026.3 com Edge para o leitor de tela |
| Sistemas e dispositivos | Windows 10 e 11, macOS 27.2.1, Android 10, iOS 27.2.1 e iPadOS 27.2; celular e tablet também emulados no Chrome (Pixel 7 e iPad). Linux era previsto, mas não foi testado na F-M2; iOS e iPadOS foram contados separadamente |
| Participantes e perfil | Perfil informado na síntese de André: 5 participantes, P01 a P05 (3 iniciantes, 1 experiente e 1 vindo do Lucidchart). Resultados individuais ainda não consolidados nesta base; a elegibilidade de P05 para F-M8/F-M9 depende de confirmação na [#66](https://github.com/FCTE-Qualidade-de-Software-1/2026-2_T02_ADA_LOVELACE/issues/66). Esses perfis não constituem notas de métricas |
| Casos de teste executados | Inventário de 51 métricas do [roteiro](roteiro.md); 37 com resultado e evidência em `evidencias/`, e 14 sem consolidação. Nas sessões, o roteiro único de seis tarefas do [protocolo](https://github.com/FCTE-Qualidade-de-Software-1/2026-2_T02_ADA_LOVELACE/blob/main/evidencias/participantes/protocolo-testes-participantes.md) |

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
Calcula-se com as frações completas e arredonda-se apenas a apresentação
(médias com duas casas e percentuais com uma). Média ausente é indicada por
**—**, sem imputar zero nem calcular média apenas das métricas disponíveis.
Isso mantém integralmente os vínculos do roteiro; não cria regra de imputação.
Há **13 questões com média completa e 7 sem média**. O julgamento da hipótese
é distinto do atendimento quantitativo: confirmar uma previsão negativa
confirma uma limitação.

| Questão | Métricas (nota) | Média | Percentual | Hipótese | Por quê |
| --- | --- | ---: | ---: | --- | --- |
| S-Q1 · Confidencialidade dos dados | S-M1 (0), S-M2 (2) | 1,00 | 50,0% | Confirmada parcialmente | Proteção parcial: nome em claro; chave não observada no servidor. |
| S-Q2 · Controle de acesso | S-M3 (0), S-M4 (0) | 0,00 | 0,0% | Confirmada no recorte, com limitações | Ausência de senha, expiração e revogação; persistência local legível. |
| S-Q3 · Integridade | S-M5 (2), S-M6 (1) | 1,50 | 75,0% | Confirmada parcialmente | 221/221 adulterações rejeitadas; duas divergências em oito rodadas. |
| S-Q4 · Rastreabilidade | S-M7 (0), S-M8 (0) | 0,00 | 0,0% | Confirmada no recorte observável | Sem autoria verificável ou histórico persistente no recorte gratuito. |
| S-Q5 · Autenticidade | S-M9 (1), S-M10 (0) | 0,50 | 25,0% | Confirmada no recorte local | Nome autodeclarado e personificação aceita no teste local. |
| S-Q6 · Resistência | S-M11 (0), S-M12 (0), S-M13 (1) | 0,33 | 16,7% | Confirmada parcialmente, com ressalvas | Cinco avisos altos, um caso sem correção identificada e cabeçalhos incompletos. |
| F-Q1 · Navegadores e sistemas | F-M1 (2), F-M2 (1), F-M3 (1) | 1,33 | 66,7% | Confirmada em parte | Os quatro navegadores passaram, mas 2 de 5 sistemas falharam (erro de clipboard no Firefox do Android e scroll travado no Safari do iPad): as diferenças ficaram nos dispositivos móveis, não no macOS |
| F-Q2 · Dispositivos e condições de uso | F-M4 (2), F-M5 (1), F-M6 (1) | 1,33 | 66,7% | Confirmada em parte | Há barra própria para celular e o editor funciona offline, mas colaboração, IA, idioma e Mermaid dependem de rede, e em 360 px faltam os botões de zoom e de trava da ferramenta. A limitação no toque não apareceu nas 25 funções testadas |
| F-Q3 · Substituir uma ferramenta equivalente | F-M7 (0), F-M8, F-M9 | — | — | Inconclusiva | F-M7: 24 de 42 funções do draw.io (57,1%), faltam as avançadas. F-M8 e F-M9 dependem das sessões com participantes |
| F-Q4 · Migração de dados | F-M10 (1), F-M11 (2), F-M12 (2) | 1,67 | 83,3% | Confirmada | O `.excalidraw` e as imagens com cena incorporada preservaram 12 de 12 elementos, mas faltam PDF e JPEG na exportação e nenhum formato de outra ferramenta é importado como diagrama editável |
| CI-Q1 · Reconhecer a adequação | CI-M1 a CI-M3 | — | — | Inconclusiva | Dependem das sessões com participantes |
| CI-Q2 · Aprender as funções básicas | CI-M4 a CI-M6 | — | — | Inconclusiva | Dependem das sessões com participantes |
| CI-Q3 · Apoio ao aprendizado contínuo | CI-M7 (1), CI-M8 | — | — | Parcialmente confirmada quanto ao apoio documental | CI-M7: a ajuda documenta 46 de 74 funções (62,2%) e não tem tutorial guiado. CI-M8 depende das sessões |
| CI-Q4 · Eficiência nas tarefas comuns | CI-M9 (2), CI-M10 (2), CI-M11 | — | — | Parcialmente confirmada quanto aos mecanismos | CI-M9: as tarefas frequentes pedem em média 2,5 ações. CI-M10: as 17 funções frequentes têm atalho, as ferramentas com uma tecla. CI-M11 depende das sessões |
| CI-Q5 · Consistência e previsibilidade | CI-M12 (2), CI-M13 (2, provisória) | 2,00 | 100% | Refutada | A hipótese previa diferenças conforme o contexto, mas os 11 casos de seleção, snapping e texto se comportaram igual nos dois contextos (CI-M12), e as 13 ações deram retorno visual no ponto observado (CI-M13, sem medir latência). O resultado de consistência é melhor que o previsto |
| CI-Q6 · Evitar e recuperar erros | CI-M14 (0, provisória), CI-M15 (1), CI-M16 (2) | 1,00 | 50,0% | Confirmada parcialmente; classificação provisória | Recuperação e autosave presentes, com abertura destrutiva e nota provisória em CI-M14. |
| CI-Q7 · Frequência e clareza dos erros | CI-M17, CI-M18 | — | — | Inconclusiva; clareza documental limitada | CI-M17 ausente; CI-M18 mede orientação documental, não frequência de erros. |
| CI-Q8 · Satisfação | CI-M19 a CI-M21 | — | — | Inconclusiva; sem confirmação ou refutação | Sem resultados consolidados de SUS, satisfação visual ou intenção de uso. |
| CI-Q9 · Uso por pessoas com deficiência | CI-M22 (0), CI-M23 (1), CI-M24 (0), CI-M25 (0) | 0,25 | 12,5% | Confirmada parcialmente, com barreiras adicionais | Barreiras de teclado, leitor de tela e contraste; ver ressalvas da coleta. |
| CI-Q10 · Adaptação a perfis de usuário | CI-M26 (1) | 1,00 | 50,0% | Confirmada parcialmente na dimensão linguística | 57 idiomas; cobertura de pt-BR de 92,5% usa todas as strings de referência. |

## Interpretação das 20 questões GQM

A cadeia de rastreabilidade é **objetivo → questão → hipótese → métrica →
página de resultado/evidência → interpretação**. Cada página de métrica
abaixo liga à evidência original. O [inventário de Renato](../resultados/inventario-renato-issue-20.md)
complementa a rastreabilidade de suas 26 métricas. Confirmar uma hipótese
negativa não significa atender ao objetivo. As ressalvas de versão, ambiente
e revisão acompanham os resultados; esta consolidação não substitui a revisão
das coletas. As hipóteses são literais conforme o roteiro.


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

**Limitações e métricas pendentes:** Não há métrica pendente. A troca de nome chamou pelo console o método usado pela interface; foram três abas do mesmo perfil, com sockets distintos e armazenamento compartilhado. Quatro arquivos relevantes foram conferidos por hash contra o upstream na evidência. Não generalizar para todas as formas de personificação ou para o produto pago; revisões cruzadas não preenchidas.

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

**Limitações e métricas pendentes:** Pendentes: F-M8 e F-M9, sem valor nem nota, até confirmar a elegibilidade do perfil de P05 e validar as evidências na [#66](https://github.com/FCTE-Qualidade-de-Software-1/2026-2_T02_ADA_LOVELACE/issues/66). O roteiro prevê usuários vindos de draw.io/Miro; a síntese de perfil informa Lucidchart, o que exige confirmação, sem escolher julgamento alternativo de O4. A referência efetivamente examinada na F-M7 foi draw.io, não Miro. F-M7 mede existência de funções no recorte escolhido, não produtividade nem facilidade de uso; as leituras alternativas documentadas mantêm sua nota 0. Nenhuma nova sessão ou medição foi realizada.

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

**Justificativa:** Aproveitam-se os achados de André sobre CI-M9/CI-M10: 2,5 ações é o resultado coletado da CI-M9, distinto da média GQM das notas. A previsão sobre rapidez relativa exige a CI-M11; sem ela, o componente causal e a diferença de desempenho por experiência permanecem não verificados.

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

**Limitações e métricas pendentes:** Não há métrica sem resultado. CI-M12 examina 11 casos em Safari/macOS e não prova ausência de toda inconsistência. Escape preservou texto nos dois contextos; diferenças de quebra de linha foram classificadas como layout. CI-M13 usa Edge headless/Windows, sem medição de latência ou critério operacional temporal aprovado; a nota 2/2 é provisória, com validação manual e revisão cruzada pendentes. A média 2,00 e os 100% da síntese de André são aritmeticamente corretos com as notas publicadas, mas dependem da nota provisória da CI-M13; não comprovam imediaticidade.

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

**Limitações e métricas pendentes:** Não há métrica pendente, mas persistem revisões. CI-M22 conta seis violações por regra e elemento (nota 0); por regra seriam cinco (nota 1), alternativa ainda não adotada; ferramentas não cobrem todo o canvas ou diálogos. CI-M23 não confirmou SHA por hash e tem quatro casos Sim com clipboard/diálogos não concluídos integralmente; 14/28 = 50% é apenas cenário estrito a revisar, sem substituir 18/28 ou a nota 1. CI-M24 cobre NVDA/Edge, com frame visível, não todos os leitores. CI-M25 usa combinações de texto e fundo padrão, com ressalva de ancestrais do DOM; não mede ícones.

#### CI-Q10 — A ferramenta se adapta a diferentes perfis de usuário?

**Hipótese original:** Sim: a interface é traduzida para dezenas de idiomas, e o arquivo de traduções do repositório indica 96% das strings em português do Brasil

**Métricas relacionadas e resultados disponíveis:**

| Métrica / evidência | Valor documentado | Nota documentada (0–2) |
| --- | --- | --- |
| [CI-M26 · Idiomas e tradução para o português](../resultados/capacidade-interacao/ci-m26.md) | 57 idiomas; 594 de 642 strings (92,5%) | **1** |

**Resposta fundamentada:** Há ampla oferta de idiomas e cobertura significativa de pt-BR, porém incompleta: 48 strings sem tradução (28 ausentes e 20 vazias). Os 96% do arquivo oficial usam as chaves existentes no próprio pt-BR; a comparação com todas as strings de referência registra 92,5%. Isso não demonstra adequação a todos os perfis.

**Julgamento da hipótese:** **Parcialmente confirmada** no recorte documentado.

**Justificativa:** Mantém-se a conclusão parcial de Renato: dezenas de idiomas sustentam a expectativa, mas a cobertura oficial não equivale à cobertura de todas as strings. A [comparação independente integrada](https://github.com/FCTE-Qualidade-de-Software-1/2026-2_T02_ADA_LOVELACE/blob/main/evidencias/capacidade-interacao/CI-M26_comparacao.md) confirmou os mesmos números e nota 1; não se recalcula a métrica nesta etapa nem se toma tradução como substituto de acessibilidade.

**Limitações e métricas pendentes:** Não há métrica pendente. A evidência original identifica revisão por Luís Felipe em 15/11/2026 e a comparação foi integrada no PR #107. Na revisão documental de 17/11/2026, o aviso desatualizado da página individual foi alinhado a esse registro, sem nova medição ou revisão da coleta. A comparação esclarece que `a8800f8` é snapshot do grupo, não outra versão do Excalidraw. A amostra qualitativa de 20 chaves não cobre toda a tradução ou todos os perfis.


## Síntese por objetivo

| Objetivo | Média (0–2) | Percentual | Julgamento |
| --- | ---: | ---: | --- |
| O1 — Proteção das informações e controle de acesso | 0,83 | 41,7% | Não atendido |
| O2 — Identificação, responsabilização e riscos de segurança | 0,28 | 13,9% | Não atendido |
| O3 — Adaptabilidade a diferentes ambientes e dispositivos | 1,33 | 66,7% | Parcialmente atendido |
| O4 — Substituibilidade e migração de diagramas | — | — | Pendente de consolidação |
| O5 — Compreensão, aprendizagem e operação da interface | — | — | Pendente de consolidação |
| O6 — Acessibilidade e adequação a diferentes perfis | 0,63 | 31,3% | Não atendido |

### Conciliação dos julgamentos e memória de cálculo

Os julgamentos preliminares de Renato e os quantitativos de André coincidem
em O1, O2, O3 e O6. O4 e O5 continuam pendentes nas duas contribuições.
Pela seção 6 do roteiro, a média do objetivo é a média das **questões**,
não a média direta de todas as suas métricas. Com frações não arredondadas:

| Objetivo | Cálculo da média das questões | Cobertura de métricas | Ressalva qualitativa preservada |
| --- | --- | --- | --- |
| O1 | `(1 + 0 + 3/2) / 3 = 5/6` → 0,83; 41,7% | 6/6 com resultado | S-Q3 atinge 75%, mas as divergências de edição e as falhas de acesso/confidencialidade permanecem; não há certificação de segurança |
| O2 | `(0 + 1/2 + 1/3) / 3 = 5/18` → 0,28; 13,9% | 7/7 com resultado | Confirmar hipóteses negativas sobre autoria e identidade confirma limitações; S-M8 aguarda comparação efetiva com o produto pago |
| O3 | `(4/3 + 4/3) / 2 = 4/3` → 1,33; 66,7% | 6/6 com resultado | Toque emulado favorável não elimina falhas nos aparelhos reais, dependência de cache/rede ou perda de controles em 360 px |
| O4 | `(F-Q3 + F-Q4) / 2`; F-Q4 = `5/3`, F-Q3 sem média | 4/6 com resultado | Faltam F-M8/F-M9; a fidelidade dentro do Excalidraw não prova substituição produtiva de outra ferramenta |
| O5 | `(CI-Q1 + … + CI-Q8) / 8`; apenas CI-Q5 e CI-Q6 têm média completa | 9/21 com resultado | Faltam 12 métricas; mecanismos eficientes não demonstram aprendizagem, rapidez relativa ou satisfação; CI-M13/M14/M18 provisórias |
| O6 | `(1/4 + 1) / 2 = 5/8` → 0,63; 31,3% | 5/5 com resultado | O peso igual das duas questões dá à tradução o mesmo peso de CI-Q9; isso segue o método e não elimina as barreiras do canvas |

**Diferenças entre pontuação e interpretação.** F-Q4 tem média 1,67 (83,3%,
atendida), embora a resposta e a hipótese descrevam migração limitada.
Preserva-se o atendimento quantitativo previsto no roteiro: os 12 elementos
foram preservados e há quatro caminhos de importação, mas isso não demonstra
intercâmbio editável com draw.io/Miro nem decide O4. CI-Q5 tem média 2,00
(100%, atendida com nota provisória), com refutação restrita à inconsistência
prevista; a latência do feedback continua sem demonstração. S-Q3 tem média
1,50 (75%, atendida) e hipótese apenas parcialmente confirmada, pois a
rejeição de adulteração não elimina as duas divergências concorrentes.
CI-Q6 tem média 1,00 (50%, parcial), preservando a nota 0 provisória da
CI-M14 e a recuperação efetivamente observada. Nenhuma dessas diferenças
autoriza alterar notas para ajustar a narrativa.

**Pendências e hipóteses.** As 14 métricas sem valor/nota são F-M8/F-M9,
CI-M1 a CI-M6, CI-M8, CI-M11, CI-M17 e CI-M19 a CI-M21.
F-Q3, CI-Q1, CI-Q2, CI-Q7 e CI-Q8 têm hipótese global **inconclusiva**;
CI-Q3 e CI-Q4 têm confirmação parcial apenas dos componentes observados e
continuam sem média. CI-Q7 substitui a classificação anterior de confirmação
parcial na clareza por inconclusão da hipótese literal sobre frequência e
perfil dos erros, preservando o achado documental da CI-M18. No total:
**4 hipóteses confirmadas, 10 parcialmente confirmadas, 1 refutada e 5
inconclusivas**. Essa contagem não é percentual de atendimento GQM.

## Relação com as decisões do propósito

A Tabela 1 do [propósito](../fase_planejamento/proposito-partes-interessadas.md)
liga cada decisão a objetivos e a um critério. Com os resultados atuais:

| Decisão | Critério | Resultado |
| --- | --- | --- |
| Usar o link de colaboração gratuito para diagramas sensíveis | O1 e O2 atendidos e nenhuma métrica de confidencialidade com nota 0 | **Não recomendado.** O1 e O2 não são atendidos, e S-M1, S-M3 e S-M4 têm nota 0. A chave não vai ao servidor (S-M2), mas quem tiver o link entra sem senha e sem prazo |
| Adotar como recurso pedagógico com alunos no celular ou com deficiência | O1, O3, O5 e O6 ao menos parcialmente atendidos | **Critério de adoção não atingido.** O3 é parcial, O1 e O6 não são atendidos e O5 segue pendente. As barreiras com nota 0 viram restrições de uso: não usar com leitor de tela (CI-M24), atenção ao contraste (CI-M25) e ao zoom bloqueado (CI-M22) |
| Migrar do draw.io ou do Miro | O4 atendido e fidelidade de 100% ao exportar e reimportar | **Em aberto.** A fidelidade é de 100% (F-M11) e a migração de dados atende (F-Q4), mas o Excalidraw tem só 57,1% das funções do draw.io (F-M7), e o O4 depende da F-M8 e da F-M9 |
| Quais problemas corrigir primeiro | Cada nota 0 gera relato reprodutível; falhas de segurança seguem divulgação responsável | As 14 da tabela de [oportunidades de melhoria](#oportunidades-de-melhoria), começando pelas de Segurança; revisar as duas provisórias. A integração não publica relatos nem comunica terceiros |
| Se a avaliação aplica corretamente SQuaRE e GQM | Critérios de correção da disciplina | As 20 questões e 51 métricas têm rastreabilidade; 14 medidas e revisões metodológicas permanecem pendentes. A correção acadêmica cabe ao requisitante, sem inferir aprovação a partir das médias |

## Relações entre as características

**Segurança e Capacidade de interação.** O compartilhamento por link e o nome
autodeclarado simplificam a entrada na sessão, mas S-M3/S-M9/S-M10 mostram
limitações de autorização e identidade. Não foi medido o efeito de adicionar
autenticação sobre o tempo de uso. O autosave evita perda nos dois cenários
da CI-M16 e, ao mesmo tempo, a S-M4 mostra persistência local legível: a
conveniência não demonstra confidencialidade. Alertas bloqueantes da S-M5
ainda relacionam a rejeição de mensagens inválidas à interrupção da operação,
conforme os achados preservados acima.

**Flexibilidade e Capacidade de interação.** As 25 funções por toque emuladas
(F-M4) e os atalhos (CI-M10) indicam caminhos de operação, mas não substituem
acessibilidade por teclado ou leitor de tela (CI-M23/CI-M24). As falhas nos
dispositivos reais (F-M2/F-M3), a perda de controles visíveis em 360 px (F-M6)
e o contraste insuficiente (CI-M25) limitam a adoção pedagógica para públicos
variados. A tradução (CI-M26) amplia cobertura linguística, sem compensar
essas barreiras. A cobertura funcional de migração (F-M7) tampouco demonstra
produtividade, ainda dependente de F-M8/F-M9.

**Segurança e Flexibilidade.** A F-M5 demonstra desenho/edição offline após
primeiro acesso, reduzindo a necessidade de conexão nessas operações; os
dados locais continuam sujeitos à limitação da S-M4. Colaboração e IA
dependem de rede, e a proteção do desenho na colaboração não se estende
automaticamente ao conteúdo enviado ao backend de IA (observação da S-M1,
fora da sua proporção). Não há medição que permita atribuir causalidade ou
criar uma nota global entre as três características. As decisões combinam
os objetivos conforme a Tabela 1, preservando os julgamentos separados.

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

Métricas com nota 2:

* **Integridade da colaboração:** 221 de 221 mensagens adulteradas foram
  rejeitadas ([S-M5](../resultados/seguranca/s-m5.md)), e a chave de
  criptografia não é enviada ao servidor ([S-M2](../resultados/seguranca/s-m2.md)).
* **Compatibilidade e toque:** sem falhas nos quatro navegadores testados
  ([F-M1](../resultados/flexibilidade/f-m1.md)) e 25 de 25 funções operáveis só
  com toque no celular e no tablet ([F-M4](../resultados/flexibilidade/f-m4.md)).
* **Dados sem perda:** 12 de 12 elementos preservados ao salvar e reabrir em
  `.excalidraw`, PNG e SVG com cena ([F-M11](../resultados/flexibilidade/f-m11.md)),
  e quatro formatos de importação ([F-M12](../resultados/flexibilidade/f-m12.md)).
  Recarregar ou reabrir a aba não perde a cena ([CI-M16](../resultados/capacidade-interacao/ci-m16.md)).
* **Operação eficiente e consistente:** média de 2,5 ações nas tarefas
  frequentes ([CI-M9](../resultados/capacidade-interacao/ci-m9.md)), atalhos para
  as 17 funções frequentes ([CI-M10](../resultados/capacidade-interacao/ci-m10.md)),
  nenhuma inconsistência em 11 casos ([CI-M12](../resultados/capacidade-interacao/ci-m12.md))
  e retorno visual, com nota provisória e sem medição de latência, nas 13 ações testadas ([CI-M13](../resultados/capacidade-interacao/ci-m13.md)).

## Oportunidades de melhoria

Toda métrica com nota 0 vira oportunidade, mesmo quando a média da questão é
maior ([seção 6 do roteiro](roteiro.md#6-criterios-de-julgamento)):

| Métrica / evidência | Problema | Impacto | Recomendação |
| --- | --- | --- | --- |
| [S-M1](../resultados/seguranca/s-m1.md) | 1 de 6 tipos de evento da colaboração vai sem cifra (o nome no pedido de seguir) | Exposição do nome ao operador do servidor de sala; não demonstra leitura por terceiros sob HTTPS/WSS. | Enviar o pedido de seguir pelo canal cifrado ou mandar só o `socketId` |
| [S-M3](../resultados/seguranca/s-m3.md) | Link de colaboração sem senha, expiração nem revogação | Quem possui o link e a chave pode entrar; dificulta limitar duração e retirar acesso. | Oferecer senha separada do link, expiração e revogação validadas pelo servidor |
| [S-M4](../resultados/seguranca/s-m4.md) | Cena, arquivos e biblioteca ficam sem cifra no navegador | Conteúdo permanece legível a quem acesse o armazenamento do navegador; não prova acesso remoto indevido. | Avisar do salvamento local e permitir limpar ou não persistir; cifrar com chave do usuário num modo protegido |
| [S-M7](../resultados/seguranca/s-m7.md) | Nenhuma das 7 ações tem autor registrado | Impede atribuir as sete ações observadas a um autor verificável. | Registrar ação, participante, horário e operação numa trilha persistente |
| [S-M8](../resultados/seguranca/s-m8.md) | Não há histórico de versões, só desfazer e refazer | Dificulta investigar e restaurar alterações com autoria; comparação paga não concluída. | Guardar versões com data, autor e opção de restaurar |
| [S-M10](../resultados/seguranca/s-m10.md) | Um participante assumiu o nome de outro sem bloqueio | Nomes iguais confundem a atribuição das ações; a identidade não é verificada. | Oferecer identidade autenticada; sem login, distinguir nomes repetidos por identificador visível, sem apresentá-lo como autenticação |
| [S-M11](../resultados/seguranca/s-m11.md) | 5 vulnerabilidades altas nas dependências | Risco potencial nas versões instaladas; exploração e presença no bundle não demonstradas. | Atualizar `nanoid` e `socket.io-parser` e repetir a auditoria |
| [S-M12](../resultados/seguranca/s-m12.md) | Advisory aplicável sem correção publicada | Permanece risco potencial na importação descrita no aviso, sujeito à revisão da análise estática. | Acompanhar a correção e verificar de novo a importação de cenas |
| [F-M7](../resultados/flexibilidade/f-m7.md) | Só 24 de 42 funções do draw.io | Usuários vindos do draw.io perdem funções avançadas; impacto sobre produtividade ainda não medido. | Priorizar tabelas, swimlanes e importação de arquivos `.drawio` |
| [CI-M14](../resultados/capacidade-interacao/ci-m14.md) (provisória) | Tema e zoom não entram no desfazer | Desfazer não restaura tema/zoom e pode atingir edição anterior; enquadramento metodológico provisório. | Deixar claro o que o histórico cobre e manter controles para restaurar tema e zoom |
| [CI-M18](../resultados/capacidade-interacao/ci-m18.md) (provisória) | Só 8 de 18 mensagens de erro explicam o problema e a saída | Orientação documental insuficiente para recuperar falhas; compreensão real não foi medida. | Incluir o motivo provável e uma ação (por exemplo, "Use PNG, JPEG ou SVG") |
| [CI-M22](../resultados/capacidade-interacao/ci-m22.md) | 6 violações da WCAG 2.2 (A e AA) | Barreiras de zoom, nome e semântica dificultam navegação e uso assistivo nos estados testados. | Permitir zoom no `viewport`, nomear o botão do menu e corrigir papéis e rótulos ARIA |
| [CI-M24](../resultados/capacidade-interacao/ci-m24.md) | O leitor de tela anuncia 1 de 9 elementos desenhados | A maior parte do desenho fica indisponível ao NVDA/Edge testado. | Expor os elementos numa estrutura acessível e anunciar seleção e mudanças |
| [CI-M25](../resultados/capacidade-interacao/ci-m25.md) | 11 de 19 combinações de texto abaixo de 4,5:1 | Textos de apoio e atalhos podem ficar difíceis de ler, especialmente para baixa visão. | Escurecer os cinzas usados em texto até 4,5:1 e não usar `opacity` nos atalhos |

São **14 oportunidades, uma por métrica com nota 0** (8 de Segurança,
1 de Flexibilidade e 5 de Capacidade de interação); CI-M14 e CI-M18 são
provisórias, sujeitas às revisões descritas. As páginas vinculadas na primeira
coluna contêm o registro original, procedimento e evidência reproduzível.
As 14 métricas sem resultado não entram nesta lista. Os achados adicionais
com notas 1 ou 2 permanecem em [Achados](#achados), sem alterar essa contagem.
A prioridade inicial de Segurança é recomendação de triagem; as barreiras
assistivas também restringem o uso, sem uma pontuação de prioridade inventada.

## Limitações

* **Predomínio de instância local.** Os ensaios funcionais usaram a referência
  `e7b5346` em instância local ou build de produção local. O servidor de
  colaboração foi o `excalidraw-room` local, e a IA usou um servidor falso.
  A resposta pública coletada em S-M13 é uma exceção, sem SHA implantado comprovado.
* **Amostra de participantes.** Cinco pessoas (três iniciantes, uma
  experiente e uma vinda de outra ferramenta, nenhuma do perfil de
  acessibilidade), em uma sessão cada, conforme a síntese de André. Após
  consolidação, médias de tempo e satisfação terão baixo poder de
  generalização, e a CI-M8, que exige três sessões, fica
  limitada.
* **Emulação e automação.** Parte das métricas de Flexibilidade e de
  acessibilidade foi coletada com Playwright no Chrome, e o celular e o tablet
  da F-M4 foram emulados. Aparelhos reais aparecem só na F-M2 e na F-M3.
* **Notas provisórias.** A CI-M13 e a CI-M14 têm nota provisória nas próprias
  evidências, e a CI-M18 é uma classificação de uma pessoa, em revisão cruzada
  na #77.
* **Denominadores escolhidos pela equipe.** F-M7, F-M10, CI-M7 e CI-M10
  dependem de listas definidas na coleta, registradas em cada evidência.
* **Funções pagas e de rede.** O Excalidraw+ não foi avaliado, e as funções
  que dependem de servidores oficiais (link compartilhável, IA, bibliotecas
  públicas) foram testadas só no que é possível localmente.

* **Pendências não são notas zero.** São 37 métricas com resultado (incluindo
  notas provisórias) e 14 sem valor/nota. Não se concluem O4/O5 nem se calcula
  média global com cobertura desigual. As fichas de outra branch ainda
  exigem consolidação e revisão; CI-M8 exige três sessões, além da amostra
  informada na configuração.
* **Decisões metodológicas abertas.** Conservar S-M1 por tipo de evento,
  distinguindo os 83,3% usados na nota dos 99,5% por volume; comparar o produto
  pago em S-M8; decidir o denominador de F-M10; validar latência em CI-M13,
  tema/zoom em CI-M14 e compreensão em CI-M18. CI-M22 usa regra por elemento;
  CI-M23 tem quatro casos com conclusão incompleta. Cenários alternativos
  registrados nas evidências não substituem valores ou notas nesta análise.
* **Versão e ambiente não uniformes.** Nem toda coleta confirmou hash ou o
  vínculo entre checkout e processo; S-M13 inclui resposta pública sem SHA
  implantado comprovado. A descrição geral de instância local não se aplica
  integralmente aos cabeçalhos. Os recortes não autorizam generalização a
  produção, Excalidraw+, biblioteca, outros leitores ou versões futuras.
* **Revisão documental.** CI-M26 possui revisão registrada por Luís Felipe
  em 15/11/2026 e comparação integrada. O aviso da página individual foi
  corrigido na revisão documental de 17/11/2026, sem divergência numérica ou
  nova revisão da coleta. Integração documental não equivale à revisão
  de todas as coletas. S-M12 conserva média de correção indisponível, nunca
  zero dias; avisos técnicos não comprovam exploração.

## Conferência da integração e pendências antes do PR

Foram confrontadas as 20 hipóteses literais e seus vínculos com o roteiro,
as 51 entradas do índice (37 com resultado e 14 pendentes), as 13 médias
completas por questão e as quatro médias completas por objetivo. As médias
de André foram preservadas, com cálculo pelas frações completas e pesos
iguais por questão; as contribuições interpretativas de Renato foram
incorporadas e qualificadas sem nova medição. As 14 notas zero têm
problema, impacto, recomendação e rastreabilidade na tabela de melhorias.

Na conferência de 17/11/2026, a branch
[`feat/entrevistas`](https://github.com/FCTE-Qualidade-de-Software-1/2026-2_T02_ADA_LOVELACE/tree/feat/entrevistas),
no commit `859e745`, contém fichas e rascunhos de métricas das sessões de
Zayra, sem PR identificado para essa branch. Esses dados não foram integrados
nem usados como resultados revisados neste relatório.

Antes do PR: Zayra deve disponibilizar as evidências das sessões para revisão;
André deve concluir F-M8/F-M9 após confirmar a elegibilidade de P05 e validar
as evidências na #66. A CI-M8 continua **não medida, sem valor e sem nota**:
falta evidência comparável da primeira e da terceira sessão, exigida no
roteiro. Sua ausência limita CI-Q3 e O5; não se imputa zero nem se altera a
regra oficial de cálculo. Permanecem as decisões metodológicas e revisões
listadas acima, incluindo CI-M14 e CI-M18.
Os indicadores G-G1 a G-G8 continuam a cargo da sessão automatizada de gestão,
fora das 51 métricas do produto. Os julgamentos desta versão valem para as
notas publicadas; alterações futuras exigem atualizar os cálculos e suas
ressalvas. A integração não significa aprovação acadêmica ou conclusão das
revisões humanas pendentes.
