# Evidência F-M__ : <nome da métrica>

## 1. Identificação

| Campo | Valor |
| --- | --- |
| Métrica | F-M__ : <nome> |
| Questão (F-Q) | F-Q_ : <subcaracterística> |
| Tarefa do plano | T_._ (ver `tarefas-flexibilidade.md`) |
| Responsável | <Pessoa 1 / Pessoa 2: nome> |
| Data(s) da coleta | <AAAA-MM-DD> |
| Revisado por | <nome da outra pessoa> em <AAAA-MM-DD> |

## 2. O que foi medido

<Uma ou duas frases: o que a métrica pergunta e qual foi o recorte. Exemplo: "Proporção de eventos de socket com dados do usuário que saem cifrados. Denominador combinado em T0.4: por tipo de evento.">

## 3. Procedimento

> Passos numerados para que outra pessoa consiga repetir. Inclua o que foi clicado no navegador.

1. <passo>
2. <passo>
3. <passo>

### 3.1 Comandos executados

> Cole o comando exatamente como rodou e a parte relevante da saída. Se a saída for longa, salve num arquivo e cite o nome.

```bash
# <AAAA-MM-DD HH:MM>
<comando>
```

```text
<saída relevante>
```

## 4. Evidências

### 4.1 Trechos de código

> Uma linha por trecho.

| # | Arquivo:linha | O que mostra |
| --- | --- | --- |
| C1 | `<caminho>:<linha>` | <ex.: payload cifrado antes do emit> |
| C2 | | |

```ts
// C1: <caminho>:<linha-inicial>-<linha-final>
<trecho copiado>
```

### 4.2 Arquivos de apoio

> Nome no padrão `F-Mx_descricao_AAAA-MM-DD.ext`.

| # | Arquivo | Tipo | O que mostra |
| --- | --- | --- | --- |
| E1 | `F-M__<descricao>_<data>.png` | print | <ex.: frames WS binários na aba Messages> |
| E2 | `F-M__<descricao>_<data>.har` | HAR | |
| E3 | `F-M__<descricao>_<data>.txt` | saída de comando | |

### 4.3 Buscas sem resultado

> Quando algo **não foi encontrado**, registre onde e como procurou. Não presuma.

| O que se procurou | Onde / comando | Resultado |
| --- | --- | --- |
| <ex.: exclusão de documento no Firebase> | `git grep -n "deleteDoc" -- excalidraw-app` | <nenhuma ocorrência> |

## 5. Resultado

### 5.1 Dados brutos

> Tabela de contagem, lista de itens ou o que a métrica pedir. Exemplos: eventos × cifrado; adulterações por grupo; vulnerabilidades por pacote.

| <coluna> | <coluna> | <coluna> |
| --- | --- | --- |
| | | |

### 5.2 Cálculo

<Fórmula com números. Exemplo: "rejeitadas ÷ injetadas = 200 ÷ 200 = 100%".>

### 5.3 Pontuação

| Valor medido | Regra da métrica | Pontuação (0–2) |
| --- | --- | --- |
| <valor> | 2 = <...>; 1 = <...>; 0 = <...> | <0 / 1 / 2> |

**Justificativa:** <uma ou duas frases ligando o valor à regra>

## 6. Observações e limitações

- <O que pode ter influenciado o resultado: só testado localmente, Sentry desligado em localhost, denominador escolhido etc.>
- <Achados fora da métrica que valem registrar>

## 7. Achado (preencher só se a pontuação for 0)

| ID | Métrica | Evidência reproduzível | Pontuação | Impacto (Baixo/Médio/Alto) | Recomendação |
| --- | --- | --- | --- | --- | --- |
| A-__ | F-M__ | <referência a C1/E1 e passos da seção 3> | 0 | <impacto> | <recomendação> |

## 8. Contribuição para a questão

| Questão | Esta métrica indica que a hipótese foi | Por quê |
| --- | --- | --- |
| F-Q_ | <confirmada / refutada / parcial> | <uma frase> |
