# Evidência CI-M1 : Tempo até identificar o propósito da ferramenta

## 1. Identificação

| Campo | Valor |
| --- | --- |
| Métrica | CI-M1 : Tempo até identificar o propósito da ferramenta |
| Questão (CI-Q) | CI-Q1 : Reconhecibilidade da adequação |
| Tarefa do plano | T1 (primeira impressão) (ver `protocolo-testes-participantes.md`) |
| Responsável | Zayra Moraes |
| Data(s) da coleta | 2026-11-12 a 2026-11-15 (P01 a P05; a data da sessão de P06 não consta na transcrição); tabulação em 2026-11-22 |
| Revisado por | Pendente |
| Ambiente | Excalidraw commit `e7b5346`; computador do participante, navegador não padronizado |

## 2. O que foi medido

Segundos até o participante dizer, na tela inicial e sem mexer, para que serve a ferramenta (CI-M1). Média de A e C; resposta correta cita desenhar, esboçar, diagramar ou quadro branco.

## 3. Procedimento

1. Aplicar o roteiro único do `protocolo-testes-participantes.md` a cada participante (códigos P01 a P06), com a facilitadora Zayra Moraes, gravando tela e áudio (as gravações ficam fora do repositório).
2. Preencher a ficha de observação de cada sessão em `evidencias/participantes/fichas/P_0X/` a partir da gravação e das transcrições (VTT com marcação de tempo; a de P01 é texto sem tempo).
3. Copiar os valores já resumidos para `evidencias/participantes/registro-sessoes.csv` (só códigos, sem nomes).
4. Mostrar a tela inicial sem deixar mexer e pedir: "assim que souber para que serve esta ferramenta, diga em voz alta"; anotar o tempo até a resposta (transcrição com marcação de tempo).
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

| Código | Perfil | Segundos até a resposta | Resposta correta? | Observação |
| --- | --- | --: | :-: | --- |
| P01 | A | não medido | sim | transcrição sem marcação de tempo; resposta em poucos segundos |
| P03 | A | 21 | sim | a facilitadora precisou repetir a pergunta |
| P04 | A | 9 | sim | pode ter sido influenciada: a facilitadora já tinha dito "diagramas" |
| P05 | C | 26 | sim | |
| P02 | B | (6) | sim | fora da média (perfil B) |
| P06 | B | (12) | sim | fora da média (perfil B); a resposta longa citou desenhar após ~12 s |

### 5.2 Cálculo

média = (21 + 9 + 26) ÷ 3 = 56 ÷ 3 = **18,7 s** (n = 3; P01 sem tempo medido).

### 5.3 Pontuação

| Valor medido | Regra da métrica | Pontuação (0–2) |
| --- | --- | :-: |
| 18,7 s | 2 = ≤ 10 s; 1 = 11 a 30 s; 0 = > 30 s | **1** |

**Justificativa:** A média cai na faixa de 11 a 30 s. Todos acertaram, e só P04 ficou abaixo de 10 s.

## 6. Observações e limitações

- Se P04 sair da conta (pode ter sido influenciada), a média é 23,5 s; se P01 entrar com qualquer valor até 10 s, fica abaixo de 16,5 s. Nos dois casos a nota continua 1.
- Perfil B (P02 e P06) não entra, porque o protocolo define só A, C e D para esta métrica; P02 e P06 aparecem à parte quando útil.
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
| CI-Q1 | Parcial | As cinco pessoas reconheceram o propósito, mas só uma em até 10 s; a média de 18,7 s fica na faixa parcial. |
