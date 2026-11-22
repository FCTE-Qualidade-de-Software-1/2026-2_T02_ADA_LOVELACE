# Evidência CI-M5 : Taxa de conclusão sem ajuda

## 1. Identificação

| Campo | Valor |
| --- | --- |
| Métrica | CI-M5 : Taxa de conclusão sem ajuda |
| Questão (CI-Q) | CI-Q2 : Apreensibilidade |
| Tarefa do plano | T4 e T5 (ver `protocolo-testes-participantes.md`) |
| Responsável | Zayra Moraes |
| Data(s) da coleta | 2026-11-12 a 2026-11-15 (P01 a P05; a data da sessão de P06 não consta na transcrição); tabulação em 2026-11-22 |
| Revisado por | Pendente |
| Ambiente | Excalidraw commit `e7b5346`; computador do participante, navegador não padronizado |

## 2. O que foi medido

Tarefas básicas (T4 e T5) concluídas sem pedir ajuda ÷ tarefas propostas (CI-M5). Pelo protocolo, perguntar algo à facilitadora tira a tarefa de "sem ajuda" (exceto dúvida sobre o significado de "elipse", que a equipe decidiu não contar), e passar de 8 min conta como não concluída. Perfis A e C.

## 3. Procedimento

1. Aplicar o roteiro único do `protocolo-testes-participantes.md` a cada participante (códigos P01 a P06), com a facilitadora Zayra Moraes, gravando tela e áudio (as gravações ficam fora do repositório).
2. Preencher a ficha de observação de cada sessão em `evidencias/participantes/fichas/P_0X/` a partir da gravação e das transcrições (VTT com marcação de tempo; a de P01 é texto sem tempo).
3. Copiar os valores já resumidos para `evidencias/participantes/registro-sessoes.csv` (só códigos, sem nomes).
4. Para cada tarefa, registrar se concluiu dentro de 8 min e se houve consulta ou pergunta à facilitadora.
5. Calcular a métrica conforme a seção 8 do protocolo e pontuar pela Tabela 14 do roteiro de análise.

### 3.1 Comandos executados

Não houve comando de coleta: os dados vieram das sessões. O cálculo foi refeito em Python a partir de `registro-sessoes.csv` (2026-11-16) e confere com os números abaixo.

## 4. Evidências

### 4.1 Trechos de código

Não aplicável: medição feita com participantes.

### 4.2 Arquivos de apoio

| # | Arquivo | Tipo | O que mostra |
| --- | --- | --- | --- |
| E1 | `../participantes/fichas/P_01/ficha-observacao-sessao_P01.md` | ficha | Ficha de P01 (tempos só aproximados: transcrição sem marcação) |
| E2 | `../participantes/fichas/P_02/ficha-observacao-sessao.md` | ficha | Ficha de P02 |
| E3 | `../participantes/fichas/P_03/ficha-observacao-sessao.md` | ficha | Ficha de P03 |
| E4 | `../participantes/fichas/P_04/ficha-observacao-sessao.md` | ficha | Ficha de P04 |
| E5 | `../participantes/fichas/P_05/ficha-observacao-sessao.md` | ficha | Ficha de P05 |
| E6 | `../participantes/fichas/P_06/ficha-observacao-sessao.md` | ficha | Ficha de P06 (perfil B) |
| E7 | `../participantes/registro-sessoes.csv` | planilha | Dados resumidos por código (só códigos) |

Gravações, TCLE assinado e questionários com identificação ficam na pasta privada da equipe, fora do repositório.

### 4.3 Buscas sem resultado

| O que se procurou | Onde / comando | Resultado |
| --- | --- | --- |
| Participante do perfil D | `registro-sessoes.csv`, coluna `perfil` | nenhum; perfil D não recrutado (decisão da equipe) |

## 5. Resultado

### 5.1 Dados brutos

| Código | T4 concluída sem ajuda? | T5 concluída sem ajuda? | Observação |
| --- | :-: | :-: | --- |
| P03 | sim | não | T4: facilitadora explicou elipse (não conta); T5: 10,6 min, passou do limite de 8 min |
| P04 | sim | não | T4: perguntou o que é elipse (não conta); T5: perguntou e não mudou a cor nem exportou |
| P05 | sim | não | T5: perguntou se era com as cores |
| P01 | sim | sim | T4: dúvida sobre a elipse (não conta); T5: sem consulta (ficha, tempo entre 2 e 6,5 min) |
| P02 | não | não | fora da taxa (perfil B) |
| P06 | sim | sim | fora da taxa (perfil B); T4: facilitadora explicou elipse (não conta); T5: conferir no vídeo uma fala da facilitadora aos 00:11:53 |

### 5.2 Cálculo

concluídas sem ajuda ÷ propostas = 5 ÷ 8 = **62,5%** (T4 dos quatro participantes e T5 de P01; quatro participantes, duas tarefas cada).

### 5.3 Pontuação

| Valor medido | Regra da métrica | Pontuação (0–2) |
| --- | --- | :-: |
| 62,5% | 2 = ≥ 90%; 1 = 70% a 89%; 0 = < 70% | **0** |

**Justificativa:** Três das oito tarefas (todas T5) não foram concluídas sem ajuda, e a taxa de 62,5% fica abaixo de 70%. Seriam necessárias 6 de 8 para chegar à faixa 1.

## 6. Observações e limitações

- Decisão da equipe (2026-11-22): explicar ou responder o que é "elipse" não conta como ajuda, pois é dúvida de vocabulário do enunciado e não da interface. Com a regra rígida do protocolo, a taxa seria 2 de 8 (25%).
- A pergunta de P05 na T5 ("é com as cores?") continua contando como consulta.
- Na T4 de P03 a facilitadora ditou etapas, o que foge do protocolo; mesmo assim a T4 foi mantida como sem ajuda, pela decisão acima.
- Perfil B (P02 e P06) não entra, porque o protocolo define só A, C e D para esta métrica; P02 e P06 aparecem à parte quando útil.
- Amostra de 6 participantes na sessão S1: perfil A = 3 (P01, P03, P04), B = 2 (P02, P06), C = 1 (P05), D = 0. **Não houve sessão com perfil D**: a equipe não conseguiu recrutar pessoas com deficiência e decidiu não incluir esse perfil; a acessibilidade foi avaliada só com ferramentas (CI-M22 a CI-M25).
- Cada pessoa fez uma única sessão (por falta de tempo a equipe retirou a CI-M8, que pedia três), e o navegador não foi padronizado (P05 usou Opera, P06 usou Safari; nos demais não ficou registrado).
- Valores conferidos com as transcrições; a conferência quadro a quadro com o vídeo ainda está pendente (ver a conferência no fim de cada ficha).

## 7. Achado (preencher só se a pontuação for 0)

| ID | Métrica | Evidência reproduzível | Pontuação | Impacto (Baixo/Médio/Alto) | Recomendação |
| --- | --- | --- | --- | --- | --- |
| A-CI-M5-01 | CI-M5 | Tabelas da seção 5.1 e fichas E1 a E5; passos 4 a 6 da seção 3 | 0 | Médio. Só 5 de 8 tarefas foram concluídas sem ajuda; as três falhas são da T5 (diagrama-modelo): P03 passou do limite de 8 min, P04 não concluiu e perguntou, P05 perguntou se era com as cores | Deixar explícito na instrução da T5 se a cor entra e, na ferramenta, avaliar dicas para trocar a cor de fundo e para exportar |


## 8. Contribuição para a questão

| Questão | Esta métrica indica que a hipótese foi | Por quê |
| --- | --- | --- |
| CI-Q2 | Refutada | Só 5 de 8 tarefas foram feitas sem ajuda, e as três falhas estão na T5, a mais longa. |
