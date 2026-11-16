# Evidência CI-M11 : Tempo de experientes em relação ao de iniciantes

## 1. Identificação

| Campo | Valor |
| --- | --- |
| Métrica | CI-M11 : Tempo de experientes em relação ao de iniciantes |
| Questão (CI-Q) | CI-Q4 : Operabilidade |
| Tarefa do plano | T5 (diagrama-modelo) (ver `protocolo-testes-participantes.md`) |
| Responsável | Zayra Moraes |
| Data(s) da coleta | 2026-11-12 a 2026-11-15 (sessões); tabulação em 2026-11-16 |
| Revisado por | Pendente |
| Ambiente | Excalidraw commit `e7b5346`; computador do participante, navegador não padronizado |

## 2. O que foi medido

Tempo médio da T5 de experientes (B) ÷ tempo médio de iniciantes (A), contando só a reprodução do diagrama (CI-M11). Quem passou do limite de 8 min entra com 8 min.

## 3. Procedimento

1. Aplicar o roteiro único do `protocolo-testes-participantes.md` a cada participante (códigos P01 a P05), com a facilitadora Zayra Moraes, gravando tela e áudio (as gravações ficam fora do repositório).
2. Preencher a ficha de observação de cada sessão em `evidencias/participantes/fichas/P_0X/` a partir da gravação e das transcrições (VTT com marcação de tempo; a de P01 é texto sem tempo).
3. Copiar os valores já resumidos para `evidencias/participantes/registro-sessoes.csv` (só códigos, sem nomes).
4. Cronometrar a reprodução do diagrama na T5 (sem as etapas extras de cor, grupo e PNG) e separar as pessoas por perfil.
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

| Código | Perfil | Minutos na T5 | Entra com | Observação |
| --- | --- | --: | --: | --- |
| P02 | B | 2,7 | 2,7 | única experiente (n = 1) |
| P03 | A | 10,6 | 8,0 | passou do limite do protocolo |
| P04 | A | 4,5 | 4,5 | não mudou a cor nem exportou |
| P01 | A | não medido | n/a | T5 sem dados |
| P05 | C | 1,6 | n/a | perfil C não entra nesta razão |

### 5.2 Cálculo

experientes = 2,7 min; iniciantes = (8,0 + 4,5) ÷ 2 = 6,25 min; razão = 2,7 ÷ 6,25 = **0,43**. Com os 10,6 min reais de P03: 2,7 ÷ 7,55 = 0,36.

### 5.3 Pontuação

| Valor medido | Regra da métrica | Pontuação (0–2) |
| --- | --- | :-: |
| 0,43 | 2 = ≤ 0,5; 1 = > 0,5 e ≤ 0,8; 0 = > 0,8 | **2** (provisória) |

**Justificativa:** A experiente levou menos da metade do tempo dos iniciantes, mas a conta usa uma só experiente e dois iniciantes.

## 6. Observações e limitações

- n = 1 em experientes e n = 2 em iniciantes: o valor é indicativo. Se P01 for adicionado e levou tempo semelhante a P04, a razão mal muda.
- Se o perfil C entrasse como iniciante, a razão subiria para 0,57 (nota 1); o protocolo manda comparar só B com A.
- Amostra de 5 participantes na sessão S1: perfil A = 3 (P01, P03, P04), B = 1 (P02), C = 1 (P05), D = 0. **Ainda não foi feita sessão com pessoa do perfil D**; a análise de acessibilidade dessas tarefas fica pendente e, pelo protocolo, ela seria reportada à parte.
- Cada pessoa fez uma única sessão, e o navegador não foi padronizado (P05 usou Opera; nos demais não ficou registrado).
- Valores conferidos com as transcrições; a conferência quadro a quadro com o vídeo ainda está pendente (ver a conferência no fim de cada ficha).

## 7. Achado (preencher só se a pontuação for 0)

| ID | Métrica | Evidência reproduzível | Pontuação | Impacto (Baixo/Médio/Alto) | Recomendação |
| --- | --- | --- | --- | --- | --- |
| | | | | | |

## 8. Contribuição para a questão

| Questão | Esta métrica indica que a hipótese foi | Por quê |
| --- | --- | --- |
| CI-Q4 | Confirmada (provisória) | A experiente foi bem mais rápida, como o atalho de uma tecla sugere, mas com amostra mínima. |
