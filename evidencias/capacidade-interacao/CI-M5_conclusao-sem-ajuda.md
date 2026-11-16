# Evidência CI-M5 : Taxa de conclusão sem ajuda

## 1. Identificação

| Campo | Valor |
| --- | --- |
| Métrica | CI-M5 : Taxa de conclusão sem ajuda |
| Questão (CI-Q) | CI-Q2 : Apreensibilidade |
| Tarefa do plano | T4 e T5 (ver `protocolo-testes-participantes.md`) |
| Responsável | Zayra Moraes |
| Data(s) da coleta | 2026-11-12 a 2026-11-15 (sessões); tabulação em 2026-11-16 |
| Revisado por | Pendente |
| Ambiente | Excalidraw commit `e7b5346`; computador do participante, navegador não padronizado |

## 2. O que foi medido

Tarefas básicas (T4 e T5) concluídas sem pedir ajuda ÷ tarefas propostas (CI-M5). Pelo protocolo, perguntar algo à facilitadora tira a tarefa de "sem ajuda", e passar de 8 min conta como não concluída. Perfis A e C.

## 3. Procedimento

1. Aplicar o roteiro único do `protocolo-testes-participantes.md` a cada participante (códigos P01 a P05), com a facilitadora Zayra Moraes, gravando tela e áudio (as gravações ficam fora do repositório).
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
| E6 | `../participantes/registro-sessoes.csv` | planilha | Dados resumidos por código (só códigos) |

Gravações, TCLE assinado e questionários com identificação ficam na pasta privada da equipe, fora do repositório.

### 4.3 Buscas sem resultado

| O que se procurou | Onde / comando | Resultado |
| --- | --- | --- |
| Participante do perfil D | `registro-sessoes.csv`, coluna `perfil` | nenhum; sessão com perfil D ainda não realizada |

## 5. Resultado

### 5.1 Dados brutos

| Código | T4 concluída sem ajuda? | T5 concluída sem ajuda? | Observação |
| --- | :-: | :-: | --- |
| P03 | não | não | T4: facilitadora explicou elipse; T5: 10,6 min, passou do limite de 8 min |
| P04 | não | não | T4: perguntou o que é elipse; T5: perguntou e não mudou a cor nem exportou |
| P05 | sim | não | T5: perguntou se era com as cores |
| P01 | não | a conferir | T5 não aparece na transcrição |
| P02 | não | não | fora da taxa (perfil B) |

### 5.2 Cálculo

concluídas sem ajuda ÷ propostas = 1 ÷ 6 = **16,7%** (P03, P04 e P05; P01 fica de fora por falta de dados da T5). Com P01 (T4 não, T5 desconhecida) o máximo possível é 2 ÷ 8 = 25%.

### 5.3 Pontuação

| Valor medido | Regra da métrica | Pontuação (0–2) |
| --- | --- | :-: |
| 16,7% | 2 = ≥ 90%; 1 = 70% a 89%; 0 = < 70% | **0** |

**Justificativa:** Quase todas as tarefas tiveram pergunta à facilitadora, então a taxa fica muito abaixo de 70% em qualquer cenário.

## 6. Observações e limitações

- A regra é rígida: uma pergunta de vocabulário já tira a tarefa de "sem ajuda". Cinco das seis tarefas de A e C foram perdidas por perguntas desse tipo ou pelo limite de tempo, não por falta de caminho na interface.
- Na T4 de P03 a facilitadora ditou etapas, o que foge do protocolo; isso foi tratado como ajuda.
- Perfil B (P02) não entra, porque o protocolo define só A, C e D para esta métrica; P02 aparece à parte quando útil.
- Amostra de 5 participantes na sessão S1: perfil A = 3 (P01, P03, P04), B = 1 (P02), C = 1 (P05), D = 0. **Ainda não foi feita sessão com pessoa do perfil D**; a análise de acessibilidade dessas tarefas fica pendente e, pelo protocolo, ela seria reportada à parte.
- Cada pessoa fez uma única sessão, e o navegador não foi padronizado (P05 usou Opera; nos demais não ficou registrado).
- Valores conferidos com as transcrições; a conferência quadro a quadro com o vídeo ainda está pendente (ver a conferência no fim de cada ficha).

## 7. Achado (preencher só se a pontuação for 0)

| ID | Métrica | Evidência reproduzível | Pontuação | Impacto (Baixo/Médio/Alto) | Recomendação |
| --- | --- | --- | --- | --- | --- |
| A-CI-M5-01 | CI-M5 | Tabelas da seção 5.1 e fichas E1 a E5; passos 4 a 6 da seção 3 | 0 | Médio. Só 1 de 6 tarefas foi concluída sem pergunta; as dúvidas foram sobre o vocabulário do enunciado ("elipse") e sobre a cor, não sobre a interface | Revisar as instruções de T4 e T5 (por exemplo, "círculo ou oval"; dizer se a cor entra) e, na ferramenta, avaliar dicas de formas na primeira abertura |


## 8. Contribuição para a questão

| Questão | Esta métrica indica que a hipótese foi | Por quê |
| --- | --- | --- |
| CI-Q2 | Refutada | Só 1 de 6 tarefas foi feita sem ajuda, embora todas tenham sido concluídas quase de imediato. |
