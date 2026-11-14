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
| A-S-M5-1 | S-Q3 · S-M5: mensagem válida reenviada (replay) é aceita, porque a cifra não tem contador nem AAD | [S-M5, O1](https://github.com/FCTE-Qualidade-de-Software-1/2026-2_T02_ADA_LOVELACE/blob/main/evidencias/seguranca/S-M5/S-M5_deteccao-adulteracao.md#6-observações-e-limitações) | 2 | Baixo | Incluir contador ou ID da sala como AAD e descartar sequências repetidas |
| A-S-M5-2 | S-Q3 · S-M5: cada mensagem inválida abre um `window.alert` bloqueante; quem souber só o ID da sala pode inundar a sessão (a confirmar no teste ponta a ponta) | [S-M5, O2](https://github.com/FCTE-Qualidade-de-Software-1/2026-2_T02_ADA_LOVELACE/blob/main/evidencias/seguranca/S-M5/S-M5_deteccao-adulteracao.md#6-observações-e-limitações) | 2 | Médio | Trocar o alerta por aviso não bloqueante e limitar a frequência |
| A-S-M6-1 | S-Q3 · S-M6: participantes divergem por até cerca de 20 s quando um deles edita o elemento alterado por outro (35% das rodadas simuladas) | [S-M6, O1](https://github.com/FCTE-Qualidade-de-Software-1/2026-2_T02_ADA_LOVELACE/blob/main/evidencias/seguranca/S-M6/S-M6_edicao-simultanea.md#6-observações-e-limitações) | 2 | Baixo | Ressincronizar o elemento assim que a edição local termina |
| A-S-M6-2 | S-Q3 · S-M6: em edições concorrentes do mesmo elemento, a edição perdedora é descartada sem aviso | [S-M6, O2](https://github.com/FCTE-Qualidade-de-Software-1/2026-2_T02_ADA_LOVELACE/blob/main/evidencias/seguranca/S-M6/S-M6_edicao-simultanea.md#6-observações-e-limitações) | 2 | Baixo a médio | Avisar o autor da edição substituída ou bloquear o elemento em edição por outro |

## Síntese por objetivo

| Objetivo | Média (0–2) | Percentual | Julgamento |
| --- | ---: | ---: | --- |
| O1 — Proteção das informações e controle de acesso | `[ ]` | `[ ]%` | `[Atendido/Parcial/Não atendido]` |
| O2 — Identificação, responsabilização e riscos de segurança | `[ ]` | `[ ]%` | `[Atendido/Parcial/Não atendido]` |
| O3 — Adaptabilidade a diferentes ambientes e dispositivos | `[ ]` | `[ ]%` | `[Atendido/Parcial/Não atendido]` |
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
