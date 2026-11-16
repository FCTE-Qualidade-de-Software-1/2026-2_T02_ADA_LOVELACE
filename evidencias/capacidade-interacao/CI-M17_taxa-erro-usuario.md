# Evidência CI-M17 : Taxa de erro do usuário

## 1. Identificação

| Campo | Valor |
| --- | --- |
| Métrica | CI-M17 : Taxa de erro do usuário |
| Questão (CI-Q) | CI-Q7 : Proteção contra erros do usuário |
| Tarefa do plano | T4 e T5 (ver `protocolo-testes-participantes.md`) |
| Responsável | Zayra Moraes |
| Data(s) da coleta | 2026-11-12 a 2026-11-15 (sessões); tabulação em 2026-11-16 |
| Revisado por | Pendente |
| Ambiente | Excalidraw commit `e7b5346`; computador do participante, navegador não padronizado |

## 2. O que foi medido

Ações erradas (desfeitas, corrigidas ou com resultado diferente do pretendido) ÷ total de ações, somando T4 e T5 dos perfis A e C (CI-M17).

## 3. Procedimento

1. Aplicar o roteiro único do `protocolo-testes-participantes.md` a cada participante (códigos P01 a P05), com a facilitadora Zayra Moraes, gravando tela e áudio (as gravações ficam fora do repositório).
2. Preencher a ficha de observação de cada sessão em `evidencias/participantes/fichas/P_0X/` a partir da gravação e das transcrições (VTT com marcação de tempo; a de P01 é texto sem tempo).
3. Copiar os valores já resumidos para `evidencias/participantes/registro-sessoes.csv` (só códigos, sem nomes).
4. Contar, pela gravação, cada ação do participante na T4 e na T5 e quais delas foram erradas, conforme a regra "o que conta como ação errada" do protocolo.
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

| Código | Perfil | Ações T4 | Erradas T4 | Ações T5 | Erradas T5 | Total | Erradas | Taxa |
| --- | --- | --: | --: | --: | --: | --: | --: | --: |
| P03 | A | 18 | 12 | 50 | 20 | 68 | 32 | 47,1% |
| P04 | A | 7 | 2 | 30 | 6 | 37 | 8 | 21,6% |
| P05 | C | 5 | 0 | 33 | 0 | 38 | 0 | 0% |
| P01 | A | a conferir | a conferir | a conferir | a conferir | n/a | n/a | n/a |
| P02 | B | 13 | 0 | 25 | 3 | 38 | 3 | 7,9% (fora da taxa) |

### 5.2 Cálculo

ações erradas ÷ total = 40 ÷ 143 = **28,0%** (P03 + P04 + P05). Incluindo P02: 43 ÷ 181 = 23,8%.

### 5.3 Pontuação

| Valor medido | Regra da métrica | Pontuação (0–2) |
| --- | --- | :-: |
| 28,0% | 2 = ≤ 5%; 1 = > 5% e ≤ 10%; 0 = > 10% | **0** |

**Justificativa:** A taxa fica mais de duas vezes acima do limite de 10%. Sem P03 (o caso mais extremo) ainda seria 10,7% (8 ÷ 75), acima de 10%.

## 6. Observações e limitações

- As contagens de ações e de erros vêm das fichas e dependem do critério de quem contou; o protocolo pede dois avaliadores pela gravação, o que ainda não foi feito.
- P05 não teve nenhuma ação errada, e P03 teve quase metade das ações erradas, então a média esconde grande variação entre pessoas.
- Perfil B (P02) não entra, porque o protocolo define só A, C e D para esta métrica; P02 aparece à parte quando útil.
- Amostra de 5 participantes na sessão S1: perfil A = 3 (P01, P03, P04), B = 1 (P02), C = 1 (P05), D = 0. **Ainda não foi feita sessão com pessoa do perfil D**; a análise de acessibilidade dessas tarefas fica pendente e, pelo protocolo, ela seria reportada à parte.
- Cada pessoa fez uma única sessão, e o navegador não foi padronizado (P05 usou Opera; nos demais não ficou registrado).
- Valores conferidos com as transcrições; a conferência quadro a quadro com o vídeo ainda está pendente (ver a conferência no fim de cada ficha).

## 7. Achado (preencher só se a pontuação for 0)

| ID | Métrica | Evidência reproduzível | Pontuação | Impacto (Baixo/Médio/Alto) | Recomendação |
| --- | --- | --- | --- | --- | --- |
| A-CI-M17-01 | CI-M17 | Tabela da seção 5.1 e fichas E3 a E5 (colunas "Ações erradas" de T4 e T5); passos 4 a 6 da seção 3 | 0 | Alto. 40 de 143 ações foram desfeitas ou saíram diferentes do pretendido, a maior parte de P03 | Rever as ocorrências de P03 e P04 nas fichas para achar o padrão (setas, texto no lugar errado, seleção acidental) e tratar na interface; confirmar as contagens no vídeo |


## 8. Contribuição para a questão

| Questão | Esta métrica indica que a hipótese foi | Por quê |
| --- | --- | --- |
| CI-Q7 | Refutada | A hipótese era de poucos erros nas tarefas básicas; a taxa de 28% é bem maior, com forte variação entre pessoas. |
