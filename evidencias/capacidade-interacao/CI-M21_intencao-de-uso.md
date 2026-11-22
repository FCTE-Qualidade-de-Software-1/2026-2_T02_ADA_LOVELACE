# Evidência CI-M21 : Intenção de uso futuro

## 1. Identificação

| Campo | Valor |
| --- | --- |
| Métrica | CI-M21 : Intenção de uso futuro |
| Questão (CI-Q) | CI-Q8 : Engajamento do usuário |
| Tarefa do plano | questionário (parte 4) (ver `protocolo-testes-participantes.md`) |
| Responsável | Zayra Moraes |
| Data(s) da coleta | 2026-11-12 a 2026-11-15 (P01 a P05; a data da sessão de P06 não consta na transcrição); tabulação em 2026-11-22 |
| Revisado por | Pendente |
| Ambiente | Excalidraw commit `e7b5346`; computador do participante, navegador não padronizado |

## 2. O que foi medido

Participantes que responderam "sim" a "você usaria o Excalidraw novamente?" ÷ total (CI-M21).

## 3. Procedimento

1. Aplicar o roteiro único do `protocolo-testes-participantes.md` a cada participante (códigos P01 a P06), com a facilitadora Zayra Moraes, gravando tela e áudio (as gravações ficam fora do repositório).
2. Preencher a ficha de observação de cada sessão em `evidencias/participantes/fichas/P_0X/` a partir da gravação e das transcrições (VTT com marcação de tempo; a de P01 é texto sem tempo).
3. Copiar os valores já resumidos para `evidencias/participantes/registro-sessoes.csv` (só códigos, sem nomes).
4. Aplicar a parte 4 do questionário ao fim da sessão.
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

| Código | Usaria novamente? |
| --- | :-: |
| P01 | sim |
| P02 | sim |
| P03 | sim |
| P04 | sim |
| P05 | sim |
| P06 | sim |

### 5.2 Cálculo

sim ÷ total = 6 ÷ 6 = **100%**.

### 5.3 Pontuação

| Valor medido | Regra da métrica | Pontuação (0–2) |
| --- | --- | :-: |
| 100% (6 de 6) | 2 = ≥ 80%; 1 = 60% a 79%; 0 = < 60% | **2** |

**Justificativa:** A taxa fica 20 pontos acima do mínimo de 80% para a nota 2.

## 6. Observações e limitações

- O "sim" de P01 foi confirmado pela equipe depois (o campo estava sem marca no questionário).
- Comentários livres (cor do fundo, exportação, ícones de diagramas padronizados como UML, mais tempo para explorar) entram na análise qualitativa.
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
| CI-Q8 | Confirmada | Todos os seis usariam de novo. |
