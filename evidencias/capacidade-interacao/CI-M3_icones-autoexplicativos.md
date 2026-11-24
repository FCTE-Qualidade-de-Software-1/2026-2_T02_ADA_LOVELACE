# Evidência CI-M3 : Ícones autoexplicativos

## 1. Identificação

| Campo | Valor |
| --- | --- |
| Métrica | CI-M3 : Ícones autoexplicativos |
| Questão (CI-Q) | CI-Q1 : Reconhecibilidade da adequação |
| Tarefa do plano | T3 (ícones sem tooltip) (ver `protocolo-testes-participantes.md`) |
| Responsável | Zayra Moraes |
| Data(s) da coleta | 2026-11-12 a 2026-11-15 (P01 a P05; a data da sessão de P06 não consta na transcrição); tabulação em 2026-11-22 |
| Revisado por | Pendente |
| Ambiente | Excalidraw commit `e7b5346`; computador do participante, navegador não padronizado |

## 2. O que foi medido

Ícones da barra de ferramentas identificados corretamente sem tooltip ÷ total de ícones (CI-M3). Média da proporção por participante (A e C).

## 3. Procedimento

1. Aplicar o roteiro único do `protocolo-testes-participantes.md` a cada participante (códigos P01 a P06), com a facilitadora Zayra Moraes, gravando tela e áudio (as gravações ficam fora do repositório).
2. Preencher a ficha de observação de cada sessão em `evidencias/participantes/fichas/P_0X/` a partir da gravação e das transcrições (VTT com marcação de tempo; a de P01 é texto sem tempo).
3. Copiar os valores já resumidos para `evidencias/participantes/registro-sessoes.csv` (só códigos, sem nomes).
4. Mostrar a imagem da barra sem tooltips e pedir que o participante diga o que cada ícone faz; conferir cada resposta com o gabarito (aceitando equivalentes, como "lápis" para desenho livre).
5. Registrar acertos e total de ícones por participante. O total de 13 e as respostas aceitas estão no gabarito do protocolo (seção T3); na ficha de P01 o total estava em branco e foi igualado a 13, pois a barra é a mesma.
6. Calcular a métrica conforme a seção 8 do protocolo e pontuar pela Tabela 13 do roteiro de análise.

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
| Gabarito da T3 antes das sessões | busca no repositório e em `protocolo-testes-participantes.md` | não existia; fixado depois a partir de P05 e P06 (ver seção 6) |

## 5. Resultado

### 5.1 Dados brutos

| Código | Perfil | Acertos | Total | Proporção | Observação |
| --- | --- | --: | --: | --: | --- |
| P01 | A | 11 | 13 | 84,6% | uma resposta ambígua (mão) não contada |
| P03 | A | 11 | 13 | 84,6% | |
| P04 | A | 7 | 13 | 53,8% | mais uma resposta parcial não contada |
| P05 | C | 13 | 13 | 100% | |
| P02 | B | 12 | 13 | 92,3% | fora da média (perfil B) |
| P06 | B | 13 | 13 | 100% | fora da média (perfil B) |

### 5.2 Cálculo

média = (84,6 + 84,6 + 53,8 + 100) ÷ 4 = **80,8%** (equivale a 42 ÷ 52 ícones).

### 5.3 Pontuação

| Valor medido | Regra da métrica | Pontuação (0–2) |
| --- | --- | :-: |
| 80,8% | 2 = ≥ 80%; 1 = 50% a 79%; 0 = < 50% | **2** |

**Justificativa:** O valor passa de 80% por menos de um ponto percentual.

## 6. Observações e limitações

- O resultado está na fronteira: sem P01 a média é 79,5% (nota 1); contando as respostas parciais de P01 e P04 sobe para 83% (nota 2). O gabarito foi fixado depois das sessões, a partir de P05 e P06.
- Gabarito fixado em 2026-11-22 no `protocolo-testes-participantes.md` (seção T3), a partir dos 13 ícones citados por P05 e P06, que acertaram 13 de 13. Ele ainda não foi comparado com a imagem da barra usada nas sessões.
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
| CI-Q1 | Confirmada (no limite) | A média passa de 80%, mas por pouco e com um participante abaixo de 60%. |
