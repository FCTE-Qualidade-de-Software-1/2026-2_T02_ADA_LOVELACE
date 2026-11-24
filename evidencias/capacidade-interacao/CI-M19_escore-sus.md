# Evidência CI-M19 : Escore SUS

## 1. Identificação

| Campo | Valor |
| --- | --- |
| Métrica | CI-M19 : Escore SUS |
| Questão (CI-Q) | CI-Q8 : Engajamento do usuário |
| Tarefa do plano | questionário (parte 2) (ver `protocolo-testes-participantes.md`) |
| Responsável | Zayra Moraes |
| Data(s) da coleta | 2026-11-12 a 2026-11-15 (P01 a P05; a data da sessão de P06 não consta na transcrição); tabulação em 2026-11-22 |
| Revisado por | Pendente |
| Ambiente | Excalidraw commit `e7b5346`; computador do participante, navegador não padronizado |

## 2. O que foi medido

Escore da System Usability Scale, de 0 a 100, aplicado aos seis participantes (CI-M19). Itens ímpares contribuem com (resposta − 1), pares com (5 − resposta), e a soma é multiplicada por 2,5.

## 3. Procedimento

1. Aplicar o roteiro único do `protocolo-testes-participantes.md` a cada participante (códigos P01 a P06), com a facilitadora Zayra Moraes, gravando tela e áudio (as gravações ficam fora do repositório).
2. Preencher a ficha de observação de cada sessão em `evidencias/participantes/fichas/P_0X/` a partir da gravação e das transcrições (VTT com marcação de tempo; a de P01 é texto sem tempo).
3. Copiar os valores já resumidos para `evidencias/participantes/registro-sessoes.csv` (só códigos, sem nomes).
4. Aplicar os dez itens do SUS em escala de 1 a 5 depois das tarefas e calcular o escore de cada pessoa.
5. Calcular a métrica conforme a seção 8 do protocolo e pontuar pela Tabela 13 do roteiro de análise.

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

| Código | Perfil | Respostas aos itens 1 a 10 | SUS | Observação |
| --- | --- | --- | --: | --- |
| P01 | A | 3 1 5 1 4 1 5 1 4 2 | 87,5 | item 2 sem resposta audível (registrado 1) |
| P02 | B | 4 1 4 1 4 1 5 1 4 1 | 90,0 | itens 4 e 9 não conferidos |
| P03 | A | 3 4 2 1 3 4 2 3 2 1 | 47,5 | itens 5 a 10 inaudíveis; mantidos os valores do formulário |
| P04 | A | 3 1 4 1 4 1 5 1 4 1 | 87,5 | itens 4 a 6 inaudíveis; mantidos os valores do formulário |
| P05 | C | 5 1 5 1 4 1 5 1 5 1 | 97,5 |  |
| P06 | B | 4 2 4 1 5 2 4 1 5 1 | 87,5 | conferido com o áudio |

### 5.2 Cálculo

média = (87,5 + 90,0 + 47,5 + 87,5 + 97,5 + 87,5) ÷ 6 = 497,5 ÷ 6 = **82,9** (mínimo 47,5; máximo 97,5; mediana 87,5).

### 5.3 Pontuação

| Valor medido | Regra da métrica | Pontuação (0–2) |
| --- | --- | :-: |
| 82,9 | 2 = ≥ 68; 1 = 51 a 67; 0 = < 51 | **2** |

**Justificativa:** A média passa com folga da referência de 68. Sem P03, a média seria 90,0.

## 6. Observações e limitações

- P03 sozinha ficou abaixo de 51 (47,5), a mesma pessoa com mais ações erradas e 10,6 min na T5; vale ler junto com CI-M17.
- Em P01, P02, P03 e P04 alguns itens não estão audíveis; os valores do formulário foram mantidos.
- Amostra de 6 participantes na sessão S1: perfil A = 3 (P01, P03, P04), B = 2 (P02, P06), C = 1 (P05), D = 0. **Não houve sessão com perfil D**: a equipe não conseguiu recrutar pessoas com deficiência e decidiu não incluir esse perfil; a acessibilidade foi avaliada só com ferramentas (CI-M22 a CI-M25).
- Cada pessoa fez uma única sessão (por falta de tempo a equipe retirou a CI-M8, que pedia três), e o navegador não foi padronizado (P05 usou Opera, P06 usou Safari; nos demais não ficou registrado).
- Valores conferidos com as transcrições; a conferência quadro a quadro com o vídeo ainda está pendente (ver a conferência no fim de cada ficha).

## 7. Achado (preencher só se a pontuação for 0)

| ID | Métrica | Evidência reproduzível | Pontuação | Impacto (Baixo/Médio/Alto) | Recomendação |
| --- | --- | --- | --- | --- | --- |
| | | | | | |

## 8. Contribuição para a questão

| Questão | Esta métrica indica que a hipótese foi | Por quê |
| --- | --- | --- |
| CI-Q8 | Confirmada | O escore médio de 83 supera a referência de 68, embora com uma pessoa abaixo disso. |
