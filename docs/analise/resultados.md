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
| S-Q1 · Confidencialidade dos dados | S-M1, S-M2 | `[ ]` | `[ ]%` | `[ ]` | `[ ]` |
| S-Q2 · Controle de acesso | S-M3, S-M4 | `[ ]` | `[ ]%` | `[ ]` | `[ ]` |
| S-Q3 · Integridade | S-M5, S-M6 | `[ ]` | `[ ]%` | `[ ]` | `[ ]` |
| S-Q4 · Rastreabilidade | S-M7, S-M8 | `[ ]` | `[ ]%` | `[ ]` | `[ ]` |
| S-Q5 · Autenticidade | S-M9, S-M10 | `[ ]` | `[ ]%` | `[ ]` | `[ ]` |
| S-Q6 · Resistência | S-M11 a S-M13 | `[ ]` | `[ ]%` | `[ ]` | `[ ]` |
| F-Q1 · Navegadores e sistemas | F-M1 (2), F-M2 (1), F-M3 (1) | 1,33 | 66,7% | Confirmada em parte | Os quatro navegadores passaram, mas 2 de 5 sistemas falharam (erro de clipboard no Firefox do Android e scroll travado no Safari do iPad): as diferenças ficaram nos dispositivos móveis, não no macOS |
| F-Q2 · Dispositivos e condições de uso | F-M4 (2), F-M5 (1), F-M6 (1) | 1,33 | 66,7% | Confirmada em parte | Há barra própria para celular e o editor funciona offline, mas colaboração, IA, idioma e Mermaid dependem de rede, e o celular perde os botões de zoom e trava. A limitação no toque não apareceu nas 25 funções testadas |
| F-Q3 · Substituir uma ferramenta equivalente | F-M7 (0), F-M8, F-M9 | `[ ]` | `[ ]%` | `[ ]` | F-M7: 24 de 42 funções do draw.io (57,1%), faltam as avançadas. F-M8 e F-M9 dependem das sessões com participantes |
| F-Q4 · Migração de dados | F-M10 (1), F-M11 (2), F-M12 (2) | 1,67 | 83,3% | Confirmada | O `.excalidraw` e as imagens com cena incorporada preservaram 12 de 12 elementos, mas faltam PDF e JPEG na exportação e nenhum formato de outra ferramenta é importado como diagrama editável |
| CI-Q1 · Reconhecer a adequação | CI-M1 a CI-M3 | `[ ]` | `[ ]%` | `[ ]` | Dependem das sessões com participantes |
| CI-Q2 · Aprender as funções básicas | CI-M4 a CI-M6 | `[ ]` | `[ ]%` | `[ ]` | Dependem das sessões com participantes |
| CI-Q3 · Apoio ao aprendizado contínuo | CI-M7 (1), CI-M8 | `[ ]` | `[ ]%` | `[ ]` | CI-M7: a ajuda documenta 46 de 74 funções (62,2%) e não tem tutorial guiado. CI-M8 depende das sessões |
| CI-Q4 · Eficiência nas tarefas comuns | CI-M9, CI-M10 (2), CI-M11 | `[ ]` | `[ ]%` | `[ ]` | CI-M10: as 17 funções frequentes têm atalho, as ferramentas com uma tecla. CI-M9 está no PR #106 e CI-M11 depende das sessões |
| CI-Q5 · Consistência e previsibilidade | CI-M12, CI-M13 (2) | `[ ]` | `[ ]%` | `[ ]` | CI-M13: as 13 ações testadas deram retorno visual. CI-M12 está no PR #106 |
| CI-Q6 · Evitar e recuperar erros | CI-M14 a CI-M16 | `[ ]` | `[ ]%` | `[ ]` | `[ ]` |
| CI-Q7 · Frequência e clareza dos erros | CI-M17, CI-M18 | `[ ]` | `[ ]%` | `[ ]` | `[ ]` |
| CI-Q8 · Satisfação | CI-M19 a CI-M21 | `[ ]` | `[ ]%` | `[ ]` | `[ ]` |
| CI-Q9 · Uso por pessoas com deficiência | CI-M22 a CI-M25 | `[ ]` | `[ ]%` | `[ ]` | `[ ]` |
| CI-Q10 · Adaptação a perfis de usuário | CI-M26 | `[ ]` | `[ ]%` | `[ ]` | `[ ]` |

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
