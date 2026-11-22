# Evidência F-M8 : Razão de tempo de tarefa

> Status: **medida na sessão com participante do perfil C** (#75). Cálculo feito com apoio do Claude, ver `docs/uso-ia.md`.

## 1. Identificação

| Campo | Valor |
| --- | --- |
| Métrica | F-M8 : Razão de tempo de tarefa |
| Questão | F-Q3 : Substituibilidade (o Excalidraw pode substituir uma ferramenta equivalente sem perda de funcionalidade e produtividade?) |
| Issue | #66 (parte da #18) |
| Responsável | André Henrique (cálculo e registro); sessão conduzida por Zayra Moraes (#75) |
| Data da coleta | 2026-11-15 (sessão do P05); cálculo em 2026-11-16 |
| Ambiente | Excalidraw commit `e7b5346`, no navegador Opera do computador do participante; ferramenta anterior: Lucidchart, com a conta do participante |

## 2. O que foi medido

Tempo para reproduzir o diagrama-modelo no Excalidraw ÷ tempo para reproduzir o mesmo diagrama na ferramenta que o participante já usa ([roteiro](../../docs/analise/roteiro.md), F-M8). A tarefa é a T5 do [protocolo](../participantes/protocolo-testes-participantes.md): um fluxo de login com 6 elementos (2 elipses, 3 retângulos e 1 losango) e 6 setas, duas delas rotuladas "Sim" e "Não". Só entra o perfil C (quem vem de outra ferramenta); na S1 houve um participante desse perfil, o P05.

## 3. Procedimento

1. A facilitadora aplicou o roteiro único do protocolo ao P05 em 2026-11-15, com gravação de tela e áudio autorizada (a gravação fica fora do repositório).
2. **T5 no Excalidraw** (primeira ferramenta, pela ordem alternada prevista no protocolo): o participante abriu a imagem do diagrama-modelo ao lado e reproduziu o diagrama. O cronômetro parou quando ele disse "Pronto".
3. Depois da T6 (migração, qualitativa, para a F-Q4), **T5 na ferramenta anterior**: o participante refez o mesmo diagrama do zero no Lucidchart, sem ajuda.
4. Os tempos de início e fim foram anotados na ficha de observação e conferidos com a transcrição com marcação de tempo (E1). Os valores em minutos foram passados para `registro-sessoes.csv` (E2), colunas `t5_minutos_excalidraw` e `t5_minutos_anterior`.
5. Razão = tempo no Excalidraw ÷ tempo na ferramenta anterior, com os tempos em segundos da ficha (mais precisos que os minutos arredondados do CSV). Pontuação pela tabela do roteiro: ≤ 1,0 → 2; > 1,0 e ≤ 1,5 → 1; > 1,5 → 0.

Nas duas ferramentas o tempo cobre **só a reprodução do diagrama**. As etapas extras da T5 no Excalidraw (mudar a cor de uma caixa, ligar mais uma seta e exportar em PNG) foram feitas depois do "Pronto" e não foram repetidas no Lucidchart, por isso ficam fora da razão.

### 3.1 Comandos executados

Não houve comando de coleta: os dados vieram da sessão. Conferência do cálculo a partir do CSV:

```bash
# 2026-11-16, raiz do repositório
python3 -c "
import csv
for r in csv.DictReader(open('evidencias/participantes/registro-sessoes.csv')):
    if r['perfil'] == 'C':
        e, a = float(r['t5_minutos_excalidraw']), float(r['t5_minutos_anterior'])
        print(r['codigo'], e, a, round(e / a, 3))
"
```

```text
P05 1.6 2.2 0.727
```

## 4. Evidências

### 4.1 Trechos de código

Não aplicável: medição feita com participante.

### 4.2 Arquivos de apoio

| # | Arquivo | Tipo | O que mostra |
| --- | --- | --- | --- |
| E1 | `../participantes/fichas/P_05/ficha-observacao-sessao.md` | ficha | Horários da T5 nas duas ferramentas, ordem das ferramentas e ocorrências da sessão |
| E2 | `../participantes/registro-sessoes.csv` | planilha | Linha do P05 (perfil C), só com o código |
| E3 | `../participantes/fichas/P_05/questionarios.md` | questionário | Perfil do participante (ferramentas que já usou e uso anterior do Excalidraw) |

Gravação, TCLE assinado e questionários com identificação ficam na pasta privada da equipe, fora do repositório.

### 4.3 Buscas sem resultado

| O que se procurou | Onde / comando | Resultado |
| --- | --- | --- |
| Outro participante do perfil C | `registro-sessoes.csv`, coluna `perfil` | nenhum; só o P05 (P01, P03 e P04 são perfil A; P02, perfil B) |
| T5 feita no draw.io ou no Miro | E1, ocorrências de 00:13:05 a 00:17:40 | não; o Miro pediu para apagar boards (limite do plano) e o participante disse que usa pouco o draw.io, então a T5 foi feita no Lucidchart |

## 5. Resultado

### 5.1 Dados brutos

| Código | Perfil | Ferramenta | Início | Fim | Duração | Concluiu? | Sem ajuda? |
| --- | --- | --- | --- | --- | --- | :-: | :-: |
| P05 | C | Excalidraw | 00:10:05 | 00:11:39 | 94 s (1,6 min) | sim | não (1 pergunta) |
| P05 | C | Lucidchart | 00:17:49 | 00:20:01 | 132 s (2,2 min) | sim | sim |

A pergunta no Excalidraw foi "vai com as cores também, né?", sobre o enunciado e não sobre a ferramenta.

### 5.2 Cálculo

tempo no Excalidraw ÷ tempo no Lucidchart = 94 s ÷ 132 s = **0,71**

Com os minutos arredondados do CSV: 1,6 ÷ 2,2 = 0,73.

### 5.3 Pontuação

| Valor medido | Regra da métrica | Pontuação (0–2) |
| --- | --- | --- |
| 0,71 | 2 = ≤ 1,0; 1 = > 1,0 e ≤ 1,5; 0 = > 1,5 | **2** |

**Justificativa:** o participante reproduziu o diagrama-modelo no Excalidraw em 71% do tempo que levou na ferramenta que já usa. A razão fica abaixo de 1,0 com folga: para cair para nota 1, o tempo no Excalidraw teria de passar de 132 s, ou seja, 38 s a mais.

## 6. Observações e limitações

- **Um participante.** O protocolo previa 1 participante por perfil; a S1 teve só o P05 no perfil C. O valor é de uma pessoa e não permite média nem variação.
- **Uso anterior do Excalidraw.** No questionário de perfil (E3), o P05 marcou que já usou o Excalidraw "Regularmente", embora a ficha o classifique no perfil C, que pede quem "nunca ou quase nunca usou o Excalidraw". O acerto de 13 de 13 ícones na T3 e a T4 mais rápida da amostra (0,3 min) são coerentes com familiaridade. Isso favorece o Excalidraw na razão; a classificação precisa ser confirmada com a facilitadora.
- **Ferramenta anterior.** O roteiro cita draw.io ou Miro como exemplos; a T5 foi feita no Lucidchart, que o participante disse dominar junto com o Miro. A F-M7 comparou funções com o draw.io, então as duas métricas da F-Q3 usam ferramentas de referência diferentes.
- **Ordem das ferramentas.** O Excalidraw veio primeiro. Ao chegar ao Lucidchart, o participante já conhecia o diagrama, o que tende a encurtar o tempo na ferramenta anterior. Mesmo com essa vantagem para o Lucidchart, o Excalidraw foi mais rápido.
- **Tarefa básica.** O diagrama-modelo usa formas, setas e rótulos simples. A razão não diz nada sobre funções que o Excalidraw não tem (tabelas, swimlanes, camadas, ver F-M7).
- **Ambiente não padronizado:** computador e navegador do participante (Opera), com a conta dele no Lucidchart.
- **Conferência:** a ficha foi conferida com a transcrição com marcação de tempo; a conferência com a gravação ficou registrada na ficha como não feita.

## 7. Achado (pontuação 2: não gera achado)

Não se aplica.

## 8. Contribuição para a questão

| Questão | Esta métrica indica que a hipótese foi | Por quê |
| --- | --- | --- |
| F-Q3 | confirmada, na parte de produtividade | A hipótese previa que o Excalidraw cobre as tarefas básicas de diagramação em tempo parecido com o de outra ferramenta; o diagrama-modelo saiu mais rápido no Excalidraw (razão 0,71). A parte das funções avançadas fica com a F-M7 |
