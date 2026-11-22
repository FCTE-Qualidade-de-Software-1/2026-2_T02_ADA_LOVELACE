# Evidência CI-M20 : Satisfação visual

## 1. Identificação

| Campo | Valor |
| --- | --- |
| Métrica | CI-M20 : Satisfação visual |
| Questão (CI-Q) | CI-Q8 : Engajamento do usuário |
| Tarefa do plano | questionário (parte 3) (ver `protocolo-testes-participantes.md`) |
| Responsável | Zayra Moraes |
| Data(s) da coleta | 2026-11-12 a 2026-11-15 (P01 a P05; a data da sessão de P06 não consta na transcrição); tabulação em 2026-11-22 |
| Revisado por | Pendente |
| Ambiente | Excalidraw commit `e7b5346`; computador do participante, navegador não padronizado |

## 2. O que foi medido

Média das notas Likert de 1 a 5 para o estilo desenhado à mão (L1), a organização da tela (L2) e o modo escuro (L3), de todos os participantes, desconsiderando "Não vi" (CI-M20).

## 3. Procedimento

1. Aplicar o roteiro único do `protocolo-testes-participantes.md` a cada participante (códigos P01 a P06), com a facilitadora Zayra Moraes, gravando tela e áudio (as gravações ficam fora do repositório).
2. Preencher a ficha de observação de cada sessão em `evidencias/participantes/fichas/P_0X/` a partir da gravação e das transcrições (VTT com marcação de tempo; a de P01 é texto sem tempo).
3. Copiar os valores já resumidos para `evidencias/participantes/registro-sessoes.csv` (só códigos, sem nomes).
4. Mostrar o modo escuro por cerca de 20 s antes da L3 para quem não o usou; aplicar L1 a L3.
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

| Código | Perfil | L1 estilo desenhado à mão | L2 organização da tela | L3 modo escuro | Média da pessoa |
| --- | --- | --: | --: | --: | --: |
| P01 | A | 5 | 5 | 1 | 3,7 |
| P02 | B | 5 | 4 | 3 | 4,0 |
| P03 | A | 4 | 5 | 3 | 4,0 |
| P04 | A | 5 | 5 | 5 | 5,0 |
| P05 | C | 4 | 5 | 5 | 4,7 |
| P06 | B | 5 | 4 | 3 | 4,0 |
| **Média por item** | | **4,7** (n = 6) | **4,7** (n = 6) | **3,3** (n = 6) | **4,22** |

### 5.2 Cálculo

média = 76 ÷ 18 notas = **4,22** (L1: 28, L2: 28, L3: 20).

### 5.3 Pontuação

| Valor medido | Regra da métrica | Pontuação (0–2) |
| --- | --- | :-: |
| 4,22 | 2 = ≥ 4,0; 1 = 3,0 a 3,9; 0 = < 3,0 | **2** |

**Justificativa:** A média passa de 4,0, puxada por L1 (4,7) e L2 (4,7); o modo escuro (3,3) ficou na faixa parcial.

## 6. Observações e limitações

- O 1 de P01 em L3 não foi dito como número: ela respondeu "não vi" e, depois de ver o modo escuro, "não" à pergunta sobre ficar satisfeita. Sem essa nota a média sobe para 4,4.
- P06 tinha marcado "Não vi" em L1 por engano; o correto é 5, já corrigido no questionário.
- O modo escuro divide as opiniões (1 a 5).
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
| CI-Q8 | Confirmada | O estilo e a organização agradaram, o modo escuro menos. |
