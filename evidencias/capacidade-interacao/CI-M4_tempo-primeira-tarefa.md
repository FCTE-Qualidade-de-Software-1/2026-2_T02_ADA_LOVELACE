# Evidência CI-M4 : Tempo da primeira tarefa

## 1. Identificação

| Campo | Valor |
| --- | --- |
| Métrica | CI-M4 : Tempo da primeira tarefa |
| Questão (CI-Q) | CI-Q2 : Apreensibilidade |
| Tarefa do plano | T4 (retângulo, elipse, seta e rótulos) (ver `protocolo-testes-participantes.md`) |
| Responsável | Zayra Moraes |
| Data(s) da coleta | 2026-11-12 a 2026-11-15 (P01 a P05; a data da sessão de P06 não consta na transcrição); tabulação em 2026-11-22 |
| Revisado por | Pendente |
| Ambiente | Excalidraw commit `e7b5346`; computador do participante, navegador não padronizado |

## 2. O que foi medido

Minutos para desenhar um retângulo, ligá-lo com uma seta a uma elipse e rotulá-los (CI-M4). Média de A e C; quem não concluísse entraria com 8 min (limite).

## 3. Procedimento

1. Aplicar o roteiro único do `protocolo-testes-participantes.md` a cada participante (códigos P01 a P06), com a facilitadora Zayra Moraes, gravando tela e áudio (as gravações ficam fora do repositório).
2. Preencher a ficha de observação de cada sessão em `evidencias/participantes/fichas/P_0X/` a partir da gravação e das transcrições (VTT com marcação de tempo; a de P01 é texto sem tempo).
3. Copiar os valores já resumidos para `evidencias/participantes/registro-sessoes.csv` (só códigos, sem nomes).
4. Ler a T4 e cronometrar do fim da instrução até a conclusão; marcar o limite de 8 min.
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

| Código | Perfil | Minutos | Concluiu? | Sem ajuda? | Observação |
| --- | --- | --: | :-: | :-: | --- |
| P03 | A | 0,9 | sim | sim | a facilitadora explicou o que é elipse (não conta como ajuda) |
| P04 | A | 0,6 | sim | sim | perguntou o que é elipse (não conta como ajuda) |
| P05 | C | 0,3 | sim | sim | |
| P01 | A | ~1,5 (estimado) | sim | sim | perguntou sobre a elipse (não conta); transcrição sem tempo, não entra na média |
| P02 | B | 1,3 | sim | não | fora da média (perfil B); 2 perguntas à facilitadora |
| P06 | B | 0,6 | sim | sim | fora da média (perfil B); a facilitadora explicou "elipse" sem ele perguntar (não conta) |

### 5.2 Cálculo

média = (0,9 + 0,6 + 0,3) ÷ 3 = **0,6 min** (~36 s).

### 5.3 Pontuação

| Valor medido | Regra da métrica | Pontuação (0–2) |
| --- | --- | :-: |
| 0,6 min | 2 = ≤ 3 min; 1 = > 3 e ≤ 5 min; 0 = > 5 min ou não concluiu | **2** |

**Justificativa:** A tarefa foi feita em menos de 1 minuto em média. Mesmo que P01 não tenha concluído e entrasse com 8 min, a média seria 2,45 min, ainda na faixa 2.

## 6. Observações e limitações

- Três dos quatro participantes de A e C tiveram dúvida sobre o termo "elipse"; por decisão da equipe, explicar o termo não conta como ajuda (ver CI-M5 e CI-M6).
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
| CI-Q2 | Confirmada | As formas básicas são desenhadas em menos de 1 min por quem nunca usou a ferramenta. |
