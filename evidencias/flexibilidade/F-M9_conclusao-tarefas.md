# Evidência F-M9 : Taxa de conclusão de tarefas por usuários vindos da ferramenta anterior

> Status: **medida na sessão com participante do perfil C** (#75). Cálculo feito com apoio do Claude, ver `docs/uso-ia.md`.

## 1. Identificação

| Campo | Valor |
| --- | --- |
| Métrica | F-M9 : Taxa de conclusão de tarefas por usuários vindos da ferramenta anterior |
| Questão | F-Q3 : Substituibilidade (o Excalidraw pode substituir uma ferramenta equivalente sem perda de funcionalidade e produtividade?) |
| Issue | #66 (parte da #18) |
| Responsável | André Henrique (cálculo e registro); sessão conduzida por Zayra Moraes (#75) |
| Data da coleta | 2026-11-15 (sessão do P05); cálculo em 2026-11-16 |
| Ambiente | Excalidraw commit `e7b5346`, no navegador Opera do computador do participante |

## 2. O que foi medido

Tarefas concluídas no Excalidraw ÷ tarefas propostas, por quem vem de outra ferramenta ([roteiro](../../docs/analise/roteiro.md), F-M9). Pelo [protocolo](../participantes/protocolo-testes-participantes.md) (seção 8), as tarefas que entram são a T4 (primeira tarefa: retângulo, elipse, seta e um nome em cada forma) e a T5 (reproduzir o diagrama-modelo, mudar a cor de fundo de uma caixa e exportar em PNG). Só entra o perfil C; na S1 houve um participante desse perfil, o P05.

## 3. Procedimento

1. A facilitadora aplicou o roteiro único do protocolo ao P05 em 2026-11-15, com gravação de tela e áudio autorizada (a gravação fica fora do repositório).
2. Para cada tarefa, a ficha de observação (E1) registrou se o participante concluiu, se precisou de ajuda, consultas, ações e ações erradas. A ficha foi conferida com a transcrição com marcação de tempo.
3. Os valores foram passados para `registro-sessoes.csv` (E2), colunas `t4_concluiu` e `t5_concluiu`.
4. Critério: a tarefa conta como concluída quando o resultado pedido ficou na tela (ou no arquivo exportado), com ou sem ajuda. Ajuda e consultas são medidas pela CI-M5 e pela CI-M6, não aqui.
5. Taxa = concluídas ÷ propostas. Pontuação pela tabela do roteiro: ≥ 90% → 2; 70% a 89% → 1; < 70% → 0.

### 3.1 Comandos executados

Não houve comando de coleta: os dados vieram da sessão. Conferência a partir do CSV:

```bash
# 2026-11-16, raiz do repositório
python3 -c "
import csv
for r in csv.DictReader(open('evidencias/participantes/registro-sessoes.csv')):
    if r['perfil'] == 'C':
        t = [r['t4_concluiu'], r['t5_concluiu']]
        print(r['codigo'], t, sum(x == 'sim' for x in t), 'de', len(t))
"
```

```text
P05 ['sim', 'sim'] 2 de 2
```

## 4. Evidências

### 4.1 Trechos de código

Não aplicável: medição feita com participante.

### 4.2 Arquivos de apoio

| # | Arquivo | Tipo | O que mostra |
| --- | --- | --- | --- |
| E1 | `../participantes/fichas/P_05/ficha-observacao-sessao.md` | ficha | Conclusão, ajuda, ações e ocorrências de cada tarefa |
| E2 | `../participantes/registro-sessoes.csv` | planilha | Linha do P05 (perfil C), só com o código |
| E3 | `../participantes/fichas/P_05/questionarios.md` | questionário | Perfil do participante |

Gravação, TCLE assinado e questionários com identificação ficam na pasta privada da equipe, fora do repositório.

### 4.3 Buscas sem resultado

| O que se procurou | Onde / comando | Resultado |
| --- | --- | --- |
| Outro participante do perfil C | `registro-sessoes.csv`, coluna `perfil` | nenhum; só o P05 |
| Pedido para agrupar duas caixas (parte da T5 no protocolo) | E1, ocorrências de 00:11:46 a 00:12:30 | não foi pedido na sessão; a facilitadora pediu, no lugar, para ligar mais uma seta |

## 5. Resultado

### 5.1 Dados brutos

| Código | Tarefa | Concluiu? | Sem ajuda? | Consultas | Ações | Ações erradas |
| --- | --- | :-: | :-: | :-: | :-: | :-: |
| P05 | T4 retângulo, elipse, seta | sim | sim | 0 | 5 | 0 |
| P05 | T5 diagrama-modelo, cor de fundo e exportação em PNG | sim | não (1 pergunta sobre as cores) | 1 | 33 | 0 |

### 5.2 Cálculo

tarefas concluídas ÷ tarefas propostas = 2 ÷ 2 = **100%**

### 5.3 Pontuação

| Valor medido | Regra da métrica | Pontuação (0–2) |
| --- | --- | --- |
| 100% (2 de 2) | 2 = ≥ 90%; 1 = 70% a 89%; 0 = < 70% | **2** |

**Justificativa:** o participante vindo de outra ferramenta concluiu as duas tarefas propostas no Excalidraw, sem nenhuma ação errada.

## 6. Observações e limitações

- **Um participante e duas tarefas.** Com só o P05 no perfil C e duas tarefas, cada tarefa vale 50 pontos percentuais: uma falha derrubaria a taxa para 50% (nota 0). O resultado é frágil a qualquer variação.
- **Uso anterior do Excalidraw.** No questionário de perfil (E3), o P05 marcou que já usou o Excalidraw "Regularmente", embora a ficha o classifique no perfil C ("nunca ou quase nunca usou o Excalidraw"). Isso favorece a conclusão das tarefas; a classificação precisa ser confirmada com a facilitadora (o mesmo ponto está na F-M8).
- **T5 sem o agrupamento.** O protocolo pede para agrupar duas caixas; isso não foi pedido na sessão. O participante fez o resto da T5 (reprodução, cor de fundo e exportação em PNG) e ainda ligou uma seta extra.
- **Outras tarefas da sessão.** T1 a T3 (propósito, exploração e ícones) também foram concluídas, mas medem reconhecimento e ficam com a CI-M1 a CI-M3. A T6 (levar o diagrama de uma ferramenta para a outra) é qualitativa e alimenta a F-Q4: o participante só conseguiu inserir uma imagem do diagrama no Lucidchart, perdendo a edição. Ela não entra na F-M9 pelo protocolo; se entrasse como não concluída, a taxa seria 2 de 3 (66,7%, nota 0).
- **Ambiente não padronizado:** computador e navegador do participante (Opera).

## 7. Achado (pontuação 2: não gera achado)

Não se aplica.

## 8. Contribuição para a questão

| Questão | Esta métrica indica que a hipótese foi | Por quê |
| --- | --- | --- |
| F-Q3 | confirmada, na parte de produtividade | A hipótese previa que quem vem de outra ferramenta consegue fazer as tarefas básicas de diagramação no Excalidraw; o participante do perfil C concluiu as duas tarefas propostas. As funções avançadas que faltam ficam com a F-M7 |
