# Evidência CI-M2 : Taxa de reconhecimento correto

## 1. Identificação

| Campo | Valor |
| --- | --- |
| Métrica | CI-M2 : Taxa de reconhecimento correto |
| Questão (CI-Q) | CI-Q1 : Reconhecibilidade da adequação |
| Tarefa do plano | T2 (exploração de 1 min) (ver `protocolo-testes-participantes.md`) |
| Responsável | Zayra Moraes |
| Data(s) da coleta | 2026-11-12 a 2026-11-15 (P01 a P05; a data da sessão de P06 não consta na transcrição); tabulação em 2026-11-22 |
| Revisado por | Pendente |
| Ambiente | Excalidraw commit `e7b5346`; computador do participante, navegador não padronizado |

## 2. O que foi medido

Participantes que, após 1 minuto de exploração livre, descrevem corretamente o que a ferramenta faz ÷ total (CI-M2). Perfis A e C.

## 3. Procedimento

1. Aplicar o roteiro único do `protocolo-testes-participantes.md` a cada participante (códigos P01 a P06), com a facilitadora Zayra Moraes, gravando tela e áudio (as gravações ficam fora do repositório).
2. Preencher a ficha de observação de cada sessão em `evidencias/participantes/fichas/P_0X/` a partir da gravação e das transcrições (VTT com marcação de tempo; a de P01 é texto sem tempo).
3. Copiar os valores já resumidos para `evidencias/participantes/registro-sessoes.csv` (só códigos, sem nomes).
4. Pedir "explore por 1 minuto como quiser" e, ao fim, "em uma frase, o que esta ferramenta faz?"; marcar se a resposta menciona desenhar, esboçar, diagramar ou quadro branco.
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

| Código | Perfil | Resposta (resumo) | Correta? |
| --- | --- | --- | :-: |
| P01 | A | "Desenhos." | sim |
| P03 | A | quase inaudível; aparece "desenho" | sim (a confirmar no vídeo) |
| P04 | A | desenhar e escrever | sim |
| P05 | C | "Diagramas e desenhos." | sim |
| P02 | B | desenhar e esclarecer diagramas | sim (fora da taxa) |
| P06 | B | "diagramas em si", desenhos livres, brainstorming | sim (fora da taxa) |

### 5.2 Cálculo

corretos ÷ total = 4 ÷ 4 = **100%**.

### 5.3 Pontuação

| Valor medido | Regra da métrica | Pontuação (0–2) |
| --- | --- | :-: |
| 100% (4 de 4) | 2 = ≥ 90%; 1 = 70% a 89%; 0 = < 70% | **2** |

**Justificativa:** Todos os participantes dos perfis A e C descreveram a ferramenta com o critério do protocolo.

## 6. Observações e limitações

- A resposta de P03 está quase inaudível na gravação; se for considerada errada, a taxa cai para 75% (3 de 4) e a nota para 1. Conferir no vídeo.
- Respostas curtas como "desenhos" passam pelo critério do protocolo, que é permissivo.
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
| CI-Q1 | Confirmada | Todos reconheceram o que a ferramenta faz após 1 min de uso. |
