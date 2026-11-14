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
| A-CI-M24-1 | CI-Q9 · CI-M24: o NVDA anuncia só 1 de 9 elementos desenhados (o nome do frame, que é HTML); formas, linhas, texto, desenho livre e imagem são pixels num canvas lido só como "Tela de desenho", e seleção e mudanças pelo teclado não produzem fala | [CI-M24, seção 7](https://github.com/FCTE-Qualidade-de-Software-1/2026-2_T02_ADA_LOVELACE/blob/main/evidencias/capacidade-interacao/CI-M24/CI-M24_elementos-anunciados.md#7-achado-preencher-só-se-a-pontuação-for-0) | 0 | Alto | Expor os elementos numa estrutura acessível paralela ao canvas (tipo, texto, rótulo e posição), anunciar seleção e mudanças numa região `aria-live` e permitir texto alternativo em imagens |

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
