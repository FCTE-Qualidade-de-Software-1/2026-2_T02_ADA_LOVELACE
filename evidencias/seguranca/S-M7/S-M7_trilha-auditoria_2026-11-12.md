# Evidência S-M7: Completude da trilha de auditoria

## 1. Identificação

| Campo | Valor |
| --- | --- |
| Métrica | S-M7: Completude da trilha de auditoria |
| Questão (S-Q) | S-Q4: As ações dos usuários são rastreáveis? |
| Tarefa do plano | T2.3 (ver `tarefas-seguranca-excalidraw.md`) |
| Versão | Excalidraw `e7b5346` (pasta `aplicacao/`); `@sentry/browser` 9.0.1 instalado |
| Ambiente | Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/157.0.0.0 Safari/537.36 |
| Responsável | Luís Felipe Parreira Cunha |
| Data(s) da coleta | 2026-11-12 |
| Revisado por | Não revisado |

## 2. O que foi medido

Foi verificada a proporção de ações colaborativas que possuem autor
identificado e associado à ação específica. O denominador foi fixado em sete
ações controladas, executadas em uma sala local do Excalidraw com os
participantes visuais Alice e Bob.

## 3. Procedimento

1. Abrir a mesma sala local (`localhost:3001`) em duas janelas conectadas ao
   servidor de colaboração local.
2. Identificar visualmente os participantes como Alice e Bob.
3. Manter o DevTools aberto em **Network**, com o filtro **Socket** e
   **Messages** selecionado.
4. Executar as sete ações: Alice criar um retângulo; Bob criar uma seta; Alice
   alterar a cor; Bob mover um objeto; Alice excluir um objeto; Bob executar
   desfazer/refazer; e Alice exportar ou salvar a cena.
5. Para cada ação, verificar a interface e as mensagens da conexão
   `socket.io/?EIO=4` procurando `author`, `userId`, `createdBy`, `updatedBy`,
   `username`, `timestamp` ou outro campo que associasse a alteração ao
   participante.
6. Registrar mensagens binárias, `client-broadcast` e
   `server-volatile-broadcast` sem tratá-las como autoria quando não houver
   vínculo explícito com a ação.

### 3.1 Comandos executados

As buscas somente de leitura e as linhas encontradas foram salvas em
[`S-M7_buscas-auditoria_2026-11-12.txt`](./S-M7_buscas-auditoria_2026-11-12.txt)
e [`S-M7_linhas-codigo_2026-11-12.txt`](./S-M7_linhas-codigo_2026-11-12.txt).
As ações transcritas estão em
[`S-M7_acoes-executadas_2026-11-12.txt`](./S-M7_acoes-executadas_2026-11-12.txt).

## 4. Evidências

### 4.1 Trechos de código

| # | Arquivo:linha | O que mostra |
| --- | --- | --- |
| C1 | `aplicacao/excalidraw-app/collab/Collab.tsx:471-485` | O payload recebido é descriptografado; falha gera alerta e resposta inválida, sem registro de autor |
| C2 | `aplicacao/excalidraw-app/collab/Collab.tsx:590-598` | O evento `client-broadcast` recebe dados cifrados e IV |
| C3 | `aplicacao/excalidraw-app/app_constants.ts:18-25` | Há eventos de broadcast e subtipos de cena, mas nenhum evento de auditoria |

### 4.2 Arquivos de apoio

| # | Arquivo | Tipo | O que mostra |
| --- | --- | --- | --- |
| E1 | [`Screenshot 2026-11-12 at 21.30.48.png`](./Screenshot%202026-11-12%20at%2021.30.48.png) | print | Alice com o retângulo selecionado; não há autoria persistente visível |
| E2 | [`Screenshot 2026-11-12 at 21.35.48.png`](./Screenshot%202026-11-12%20at%2021.35.48.png) | print | Alice e Bob na mesma sala; seta de Bob e conexão Socket.IO com mensagens binárias |
| E3 | [`Screenshot 2026-11-12 at 21.36.25.png`](./Screenshot%202026-11-12%20at%2021.36.25.png) | print | Mensagem expandida `server-volatile-broadcast` com identificador da sala e placeholders, sem autor da alteração |
| E4 | [`Screenshot 2026-11-12 at 21.37.15.png`](./Screenshot%202026-11-12%20at%2021.37.15.png) | print | Retângulo alterado para vermelho; Network continua exibindo mensagens binárias |
| E5 | [`Screenshot 2026-11-12 at 21.37.35.png`](./Screenshot%202026-11-12%20at%2021.37.35.png) | print | Cena colaborativa com retângulo e seta; presença de Bob não identifica a autoria da alteração |
| E6 | [`Screenshot 2026-11-12 at 21.38.00.png`](./Screenshot%202026-11-12%20at%2021.38.00.png) | print | Seta selecionada/editada e mensagens Socket.IO; nenhum campo de autoria associado à ação |
| E7 | [`Screenshot 2026-11-12 at 21.39.03.png`](./Screenshot%202026-11-12%20at%2021.39.03.png) | print | Cena após alteração/remoção, com mensagens binárias e eventos `2`/`3`; não é trilha de auditoria |
| E8 | [`documentoExportado.png`](./documentoExportado.png) | exportação às 21:39 de 12/11/2026 | Resultado exportado contendo a seta; o arquivo exportado não contém autor ou histórico da alteração |
| E9 | `S-M7_acoes-executadas_2026-11-12.txt` | dados brutos | Sete ações, participantes e horários transcritos das capturas |
| E10 | `S-M7_buscas-auditoria_2026-11-12.txt` | busca de código | Resultado da busca por campos e termos de auditoria |
| E11 | `S-M7_linhas-codigo_2026-11-12.txt` | busca de código | Linhas de Socket.IO, broadcast e descriptografia no snapshot local |

### 4.3 Buscas sem resultado

| O que se procurou | Onde / observação | Resultado |
| --- | --- | --- |
| `author`, `userId`, `createdBy`, `updatedBy` | DevTools > Network > Socket > Messages/Frames | Não observado nas mensagens apresentadas |
| Nome Alice/Bob associado a uma alteração | Interface e mensagens do Network | Os nomes aparecem como identificação visual de participante/cursor, não como autoria auditável |
| Histórico ou log de ações | Interface durante a execução | Não foi observado log persistente de ações |
| Conteúdo das mensagens binárias | Frames do Socket.IO | Não foi possível associar o conteúdo binário a um autor; não foi feita tentativa de descriptografia |

## 5. Resultado

### 5.1 Dados brutos

| # | Participante visual | Ação executada | Propagação/mensagem observada | Autor associado à ação? |
| ---: | --- | --- | --- | --- |
| 1 | Alice | Criar retângulo | Mensagens binárias no Socket.IO | Não |
| 2 | Bob | Criar seta | `client-broadcast`, `server-volatile-broadcast` e mensagens binárias | Não |
| 3 | Alice | Alterar a cor do retângulo | Mensagens binárias no Socket.IO | Não |
| 4 | Bob | Mover/editar objeto | Mensagens binárias no Socket.IO | Não |
| 5 | Alice | Excluir objeto | Mensagens binárias no Socket.IO | Não |
| 6 | Bob | Desfazer/refazer | Eventos `2` e `3` e mensagens binárias | Não |
| 7 | Alice | Exportar/salvar a cena | Arquivo exportado sem autoria/histórico | Não |

Os nomes Alice e Bob foram visíveis na interface, mas não foram encontrados
como metadados que identificassem cada alteração. A conexão registrou a
propagação em tempo real, não uma trilha de auditoria.

### 5.2 Cálculo

```text
ações com autor identificado ÷ total de ações
= 0 ÷ 7
= 0%
```

### 5.3 Pontuação

| Valor medido | Regra da métrica | Pontuação (0–2) |
| --- | --- | ---: |
| 0% | 2 = pelo menos 90%; 1 = de 50% a 89%; 0 = menos de 50% | **0** |

**Justificativa:** nenhuma das sete ações apresentou um campo observável que
associasse a alteração específica a Alice ou Bob. Mensagens binárias,
`server-volatile-broadcast`, `socketId` ou nome exibido na presença não
comprovam autoria.

## 6. Observações e limitações

- A coleta foi realizada na instância local em `localhost:3001`, com
  comunicação Socket.IO para o servidor local de colaboração.
- As imagens mostram apenas uma seleção dos frames e não constituem um HAR
  completo. A conclusão está limitada aos metadados visíveis nos frames
  apresentados.
- A presença de dois participantes e os nomes Alice/Bob demonstram
  colaboração, mas não um mecanismo de auditoria.
- `undo`/`redo`, números de eventos, versões de cena e mensagens binárias não
  foram contados como autoria.
- A ausência de autoria observável não permite concluir que o conteúdo interno
  de um frame cifrado não tenha algum campo oculto; permite apenas concluir que
  não há autoria verificável na evidência coletada.

## 7. Achado

| ID | Métrica | Evidência reproduzível | Pontuação | Impacto (Baixo/Médio/Alto) | Recomendação |
| --- | --- | --- | ---: | --- | --- |
| A-S-M7-01 | S-M7 | Repetir os passos da seção 3, observar E2–E7 e contar as sete ações sem autor associado | 0 | Alto | Implementar uma trilha de auditoria persistente que registre cada ação, participante autenticado, horário e operação, separada da mera propagação Socket.IO |

## 8. Contribuição para a questão

| Questão | Esta métrica indica que a hipótese foi | Por quê |
| --- | --- | --- |
| S-Q4 | Confirmada | As sete ações foram propagadas entre os participantes, mas nenhuma apresentou autoria verificável ou registro auditável associado à alteração. |
