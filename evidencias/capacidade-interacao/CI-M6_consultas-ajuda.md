# Evidência CI-M6 : Consultas à ajuda

## 1. Identificação

| Campo | Valor |
| --- | --- |
| Métrica | CI-M6 : Consultas à ajuda |
| Questão (CI-Q) | CI-Q2 : Apreensibilidade |
| Tarefa do plano | T4 e T5 (ver `protocolo-testes-participantes.md`) |
| Responsável | Zayra Moraes |
| Data(s) da coleta | 2026-11-12 a 2026-11-15 (P01 a P05; a data da sessão de P06 não consta na transcrição); tabulação em 2026-11-22 |
| Revisado por | Pendente |
| Ambiente | Excalidraw commit `e7b5346`; computador do participante, navegador não padronizado |

## 2. O que foi medido

Número de consultas por participante durante T4 e T5 (CI-M6): diálogo de ajuda, tooltip lido, busca externa ou pergunta à facilitadora. Média de A e C.

## 3. Procedimento

1. Aplicar o roteiro único do `protocolo-testes-participantes.md` a cada participante (códigos P01 a P06), com a facilitadora Zayra Moraes, gravando tela e áudio (as gravações ficam fora do repositório).
2. Preencher a ficha de observação de cada sessão em `evidencias/participantes/fichas/P_0X/` a partir da gravação e das transcrições (VTT com marcação de tempo; a de P01 é texto sem tempo).
3. Copiar os valores já resumidos para `evidencias/participantes/registro-sessoes.csv` (só códigos, sem nomes).
4. Contar cada consulta ou pergunta à facilitadora durante T4 e T5 (tooltips passados sem intenção não contam).
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

| Código | Consultas T4 | Consultas T5 | Total | Observação |
| --- | --: | --: | --: | --- |
| P03 | 0 | 0 | 0 | a facilitadora explicou elipse na T4, sem pergunta da participante |
| P04 | 0 | 1 | 1 | "o que é uma elipse?" na T4 não conta; pergunta na T5 conta |
| P05 | 0 | 1 | 1 | "vai com as cores também?" |
| P01 | 0 | 0 | 0 | dúvida sobre a elipse na T4 não conta; T5 sem consulta (ficha) |
| P02 | 2 | 1 | 3 | fora da média (perfil B) |
| P06 | 0 | 0 | 0 | fora da média (perfil B) |

### 5.2 Cálculo

média = (0 + 0 + 1 + 1) ÷ 4 = **0,5 consulta** por participante (n = 4: P01, P03, P04, P05). Pela regra anterior (contando dúvidas sobre elipse) seria 1,0.

### 5.3 Pontuação

| Valor medido | Regra da métrica | Pontuação (0–2) |
| --- | --- | :-: |
| 0,5 consulta | 2 = ≤ 1; 1 = 2 a 3; 0 = ≥ 4 | **2** (provisória) |

**Justificativa:** A média de 0,5 fica na faixa 2; seriam necessárias mais 3 consultas somadas (média acima de 1) para cair na faixa 1.

## 6. Observações e limitações

- Ninguém abriu o diálogo de ajuda (?): todas as consultas foram perguntas à facilitadora.
- Falta conferir a T5 de P01 no vídeo (a transcrição quase não traz a fala dele), mas uma consulta a mais não muda a nota.
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
| CI-Q2 | Confirmada | As consultas ficaram em torno de 0,5 por pessoa e nenhuma foi ao diálogo de ajuda. |
