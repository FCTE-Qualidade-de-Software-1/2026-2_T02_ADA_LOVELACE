# Evidência S-M8: Histórico de versões com autoria

## 1. Identificação

| Campo | Valor |
| --- | --- |
| Métrica | S-M8: Histórico de versões com autoria |
| Questão (S-Q) | S-Q4: As ações dos usuários são rastreáveis? |
| Tarefa do plano | T2.4 (ver `tarefas-seguranca-excalidraw.md`) |
| Versão | Excalidraw `e7b5346` (pasta `aplicacao/`); `@sentry/browser` 9.0.1 instalado |
| Ambiente | Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/157.0.0.0 Safari/537.36 |
| Responsável | Luís Felipe Parreira Cunha |
| Data(s) da coleta | 2026-11-12 |
| Revisado por | Não revisado |

## 2. O que foi medido

Foi verificada a existência de histórico persistente de versões que permita
consultar alterações, restaurar versões e identificar seus autores. O recorte
foi a aplicação local observada após a criação e alteração de uma cena
colaborativa.

## 3. Procedimento

1. Abrir a sala colaborativa local em duas janelas do navegador.
2. Confirmar a presença dos participantes Alice e Bob e a existência de uma
   cena com retângulo, losango, seta e texto.
3. Recarregar/reabrir o mesmo link da sala e verificar se a cena continua
   disponível.
4. Abrir o menu de comandos da aplicação.
5. Procurar por **Version history**, **Histórico**, **History**, **Restore**,
   restauração, comparação de versões, data da alteração ou autor.
6. Registrar separadamente os comandos **Desfazer** e **Refazer**. Esses
   comandos representam a pilha de edição do editor e não um histórico
   persistente de versões com autoria.

### 3.1 Comandos executados

A busca somente de leitura foi salva em
[`S-M8_buscas-historico-versoes_2026-11-12.txt`](./S-M8_buscas-historico-versoes_2026-11-12.txt).
O detalhamento de undo/redo está em
[`S-M8_undo-redo-nao-auditoria_2026-11-12.md`](./S-M8_undo-redo-nao-auditoria_2026-11-12.md).

## 4. Evidências

### 4.1 Trechos de código

| # | Arquivo:linha | O que mostra |
| --- | --- | --- |
| C1 | `aplicacao/excalidraw-app/tests/collab.test.tsx:145-238` | Undo/redo é testado como operação da pilha de histórico do editor |
| C2 | `aplicacao/excalidraw-app/app_constants.ts:18-25` | Há eventos de broadcast e subtipos de cena, sem evento de histórico persistente |

As linhas e o comando executado estão preservados em
[`S-M8_buscas-historico-versoes_2026-11-12.txt`](./S-M8_buscas-historico-versoes_2026-11-12.txt).

### 4.2 Arquivos de apoio

| # | Arquivo | Tipo | O que mostra |
| --- | --- | --- | --- |
| E1 | [`Screenshot 2026-11-12 at 21.53.58.png`](./Screenshot%202026-11-12%20at%2021.53.58.png) | print | Reabertura do link da sala local |
| E2 | [`Screenshot 2026-11-12 at 21.54.01.png`](./Screenshot%202026-11-12%20at%2021.54.01.png) | print | Cena colaborativa após a reabertura da sala |
| E3 | [`Screenshot 2026-11-12 at 21.54.13.png`](./Screenshot%202026-11-12%20at%2021.54.13.png) | print | Cena com retângulo, seta, losango e texto; sem painel de histórico |
| E4 | [`Screenshot 2026-11-12 at 21.54.17.png`](./Screenshot%202026-11-12%20at%2021.54.17.png) | print | Edição de objeto na cena; sem autor ou versão exibidos |
| E5 | [`Screenshot 2026-11-12 at 21.55.18.png`](./Screenshot%202026-11-12%20at%2021.55.18.png) | print | Cena alterada com participantes, sem histórico de versões |
| E6 | [`Screenshot 2026-11-12 at 21.55.23.png`](./Screenshot%202026-11-12%20at%2021.55.23.png) | print | Edição de seta e painel de propriedades, sem histórico |
| E7 | [`Screenshot 2026-11-12 at 21.57.31.png`](./Screenshot%202026-11-12%20at%2021.57.31.png) | print | Menu de comandos com opções de exportação e **Desfazer** |
| E8 | [`Screenshot 2026-11-12 at 21.57.38.png`](./Screenshot%202026-11-12%20at%2021.57.38.png) | print | Menu de comandos; não há opção de histórico ou restauração |
| E9 | [`Screenshot 2026-11-12 at 22.02.52.png`](./Screenshot%202026-11-12%20at%2022.02.52.png) | print | Menu de comandos com **Desfazer** e **Refazer** |
| E10 | [`Screenshot 2026-11-12 at 22.02.56.png`](./Screenshot%202026-11-12%20at%2022.02.56.png) | print | Continuação do menu de comandos, sem histórico de versões |
| E11 | [`Screenshot 2026-11-12 at 22.03.00.png`](./Screenshot%202026-11-12%20at%2022.03.00.png) | print | Lista de ferramentas e comandos, sem histórico |
| E12 | [`Screenshot 2026-11-12 at 22.03.03.png`](./Screenshot%202026-11-12%20at%2022.03.03.png) | print | Continuação da lista de ferramentas, sem restauração de versão |
| E13 | [`Screenshot 2026-11-12 at 22.03.08.png`](./Screenshot%202026-11-12%20at%2022.03.08.png) | print | Elementos e links do menu, sem histórico persistente |
| E14 | `S-M8_buscas-historico-versoes_2026-11-12.txt` | busca de código | Resultado da busca por histórico, revisão, restauração e auditoria |
| E15 | `S-M8_undo-redo-nao-auditoria_2026-11-12.md` | análise | Explica por que undo/redo não satisfaz a métrica |

### 4.3 Buscas sem resultado

| O que se procurou | Onde / observação | Resultado |
| --- | --- | --- |
| Histórico de versões | Interface e menu de comandos | Não foi encontrada menção a histórico |
| `Version history`, `History` ou equivalente | Menu de comandos e interface | Não foi encontrada opção correspondente |
| Restaurar ou comparar versões | Interface da sala após reabertura | Não foi encontrada opção correspondente |
| Data e autor de uma versão | Interface da sala | Não foram exibidos |
| Undo/Redo | Menu de comandos e controles inferiores | Encontrados **Desfazer** e **Refazer**, sem autoria ou lista de versões |
| Termos de histórico no código | `S-M8_buscas-historico-versoes_2026-11-12.txt` | Não foi encontrada implementação de histórico; as ocorrências de `revision` são referências não relacionadas em fonte/testes |

## 5. Resultado

### 5.1 Dados brutos

| Recurso observado | Disponível na versão avaliada? | Há autoria e versões persistentes? | Evidência |
| --- | --- | --- | --- |
| Histórico de versões | Não encontrado | Não | E7–E13 |
| Restauração de versão | Não encontrada | Não | E7–E13 |
| Comparação de versões | Não encontrada | Não | E7–E13 |
| Data/autor da alteração | Não encontrado | Não | E1–E6 |
| Desfazer | Sim | Não se aplica | E7–E10 |
| Refazer | Sim | Não se aplica | E9–E10 |

### 5.2 Cálculo

Não há proporção numérica para esta métrica. O resultado é uma verificação de
existência: não foi encontrado histórico persistente com autoria na versão
avaliada.

### 5.3 Pontuação

| Valor medido | Regra da métrica | Pontuação (0–2) |
| --- | --- | ---: |
| Histórico persistente com autoria não encontrado | 2 = existe na versão gratuita; 1 = existe somente no Excalidraw+; 0 = não existe | **0** |

**Justificativa:** a interface apresenta apenas **Desfazer** e **Refazer**.
Não foi encontrada opção de histórico, restauração, comparação, data ou autor
de versões.

## 6. Observações e limitações

- A coleta foi realizada na instância local da aplicação.
- A reabertura da sala confirma a continuidade da cena observada, mas não
  demonstra a existência de versões nomeadas ou de um histórico auditável.
- **Desfazer/Refazer** é uma funcionalidade de edição e não foi contado como
  histórico persistente com autoria, conforme o critério da métrica.
- As imagens não mostram uma comparação específica com o Excalidraw+; por
  isso, não há base para pontuar 1 (“somente no Excalidraw+”). O resultado
  observado para a versão avaliada é ausência de histórico.

## 7. Achado

| ID | Métrica | Evidência reproduzível | Pontuação | Impacto (Baixo/Médio/Alto) | Recomendação |
| --- | --- | --- | ---: | --- | --- |
| A-S-M8-01 | S-M8 | Repetir os passos da seção 3 e consultar E7–E13; o menu apresenta Desfazer/Refazer, mas não histórico, restauração ou autoria | 0 | Alto | Implementar histórico persistente de versões, com data, operação, autor identificável e opção de restauração |

## 8. Contribuição para a questão

| Questão | Esta métrica indica que a hipótese foi | Por quê |
| --- | --- | --- |
| S-Q4 | Confirmada | Não foi encontrado histórico persistente com autoria; os únicos recursos semelhantes observados foram Desfazer e Refazer. |
