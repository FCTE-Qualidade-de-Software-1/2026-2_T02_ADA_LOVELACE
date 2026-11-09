# Evidência S-M1 : Proporção de mensagens de colaboração cifradas

## 1. Identificação

| Campo | Valor |
| --- | --- |
| Métrica | S-M1 : Proporção de mensagens de colaboração cifradas |
| Questão (S-Q) | S-Q1 : Confidencialidade |
| Tarefa do plano | T1.1 (ver `tarefas-seguranca-excalidraw.md`) |
| Versão | Excalidraw `e7b5346` (pasta `aplicacao/`) |
| Ambiente | Instância local descrita em `evidencias/ambiente/ambiente-local.md`; navegador Helium 157.0.8103.38 (Chromium) |
| Responsável | João Pedro Lopes da Cruz |
| Data(s) da coleta | 2026-11-09 |
| Revisado por | <nome da outra pessoa> em <AAAA-MM-DD> |

## 2. O que foi medido

Quais mensagens que o cliente troca pelo socket da colaboração saem cifradas. Valem duas proporções, combinadas em T0.4:

- **(a), que vale para a nota:** por tipo de evento que leva dado do usuário (desenho, ponteiro ou nome).
- **(b), como observação:** por quantidade de eventos na captura.

Também se verificou a persistência remota (Firestore e link `#json`). O envio para a IA fica fora da proporção e é registrado à parte.

## 3. Procedimento

1. Listar no código todos os `emit` e `on` do socket e dizer, para cada um, se o payload passa por `encryptData` (seção 4.1 e E1).
2. Abrir a janela A em `localhost:3001`, com o DevTools em Network e "Preserve log" ligado. Desenhar um texto `SEGREDO-SM1`, iniciar uma sala com o nome `Joao-SM1` e entrar pela janela B (anônima) com o nome `Maria-SM1`.
3. Na janela A: mover o ponteiro, editar, ficar ausente e ocioso por mais de 60 s, seguir a Maria e deixar de seguir. Na janela B: seguir o João e deixar de seguir.
4. Na janela A: Share > Export to link, e Text to diagram com um prompt.
5. Exportar o HAR da janela A. Contar os eventos com o script de E2 e procurar `SEGREDO-SM1`, `Joao-SM1` e `Maria-SM1` nos frames.
6. No console do Firebase do grupo, abrir `scenes/1c620bd005c86aa4145f`.

### 3.1 Comandos executados

```bash
# 2026-11-09, pasta aplicacao/
git grep -n "\.emit(" -- excalidraw-app/collab
git grep -n "socket.on(\|socket.once(" -- excalidraw-app/collab
# 2026-11-09 16:09, HAR completo da janela A
node <script de E2> localhost.har
```

```text
enviados  (1861 eventos): join-room 1 | server-volatile-broadcast 1853 | server-broadcast 5 | user-follow 2
recebidos  (512 eventos): client-broadcast 502 | init-room 1 | first-in-room 1 | room-user-change 3 | new-user 1 | user-follow-room-change 4
'SEGREDO' em frame binário ou de texto: false
texto com nomes: só os 2 user-follow ("username":"Maria-SM1")
```

Saídas completas: E1 e E2.

## 4. Evidências

### 4.1 Trechos de código

| # | Arquivo:linha | O que mostra |
| --- | --- | --- |
| C1 | `excalidraw-app/collab/Portal.tsx:85-102` | Todo `server-broadcast` e `server-volatile-broadcast` é cifrado com a chave da sala antes do `emit`. O ID da sala vai em claro. |
| C2 | `excalidraw-app/collab/Portal.tsx:141-248` | Os subtipos `SCENE_INIT`/`SCENE_UPDATE` (`broadcastScene`), `IDLE_STATUS`, `MOUSE_LOCATION` e `USER_VISIBLE_SCENE_BOUNDS` passam por C1. Os três últimos levam `username`. |
| C3 | `excalidraw-app/collab/Portal.tsx:250-254` e `packages/excalidraw/types.ts:188-191`, `:686-689` | `user-follow` é emitido direto, sem C1, com `{ userToFollow: { socketId, username }, action }` |
| C4 | `excalidraw-app/collab/Portal.tsx:43-47` | `join-room` envia só o ID da sala |
| C5 | `excalidraw-app/collab/Collab.tsx:589-600` | `client-broadcast` recebido é decifrado antes do uso |
| C6 | `excalidraw-app/data/firebase.ts:176-188` | O documento da sala no Firestore tem só `sceneVersion` (em claro), `ciphertext` e `iv` |
| C7 | `excalidraw-app/data/FileManager.ts:245-246` | As imagens são comprimidas e cifradas (`compressData` com `encryptionKey`) |
| C8 | `excalidraw-app/data/index.ts:253-260`, `:276-279` e `packages/excalidraw/data/encode.ts:334-353` | O link `#json` envia a cena cifrada. Só o cabeçalho de formato (`version`, `compression`, `encryption`) vai em claro. |
| C9 | `excalidraw-app/components/AI.tsx:54-70` e `:158-166` | A IA recebe JSON sem a cifra do app (texto, imagem PNG ou mensagens do chat) |

```ts
// C1: excalidraw-app/collab/Portal.tsx:91-100
const json = JSON.stringify(data);
const encoded = new TextEncoder().encode(json);
const { encryptedBuffer, iv } = await encryptData(this.roomKey!, encoded);

this.socket?.emit(
  volatile ? WS_EVENTS.SERVER_VOLATILE : WS_EVENTS.SERVER,
  roomId ?? this.roomId,
  encryptedBuffer,
  iv,
);
```

```ts
// C3: excalidraw-app/collab/Portal.tsx:250-254
broadcastUserFollowed = (payload: OnUserFollowedPayload) => {
  if (this.socket?.id) {
    this.socket.emit(WS_EVENTS.USER_FOLLOW_CHANGE, payload);
  }
};
```

### 4.2 Arquivos de apoio

| # | Arquivo | Tipo | O que mostra |
| --- | --- | --- | --- |
| E1 | `S-M1_buscas-envios-socket_2026-11-09.txt` | saída de comando | Todos os `emit` e `on`, os subtipos, a persistência e a IA |
| E2 | `S-M1_contagem-frames-har_2026-11-09.txt` | saída de comando | Contagem de eventos por tipo na captura, com o script usado |
| E3 | `S-M1_S-M2_captura-reduzida_2026-11-09.har` | HAR | Socket, Firestore, IA e `#json` da janela A. As outras 850 entradas (arquivos estáticos do Vite) foram removidas e o `appId` do Firebase foi substituído. |
| E4 | `S-M1_frame-binario_2026-11-09.png` | print | `server-broadcast` de 1,2 kB: conteúdo ilegível |
| E5 | `S-M1_frame-follow-placeholders_2026-11-09.png` | print | O frame de texto só tem o evento, a sala e os `_placeholder` dos anexos binários |
| E6 | `S-M1_user-follow-em-claro_2026-11-09.png` | print | `user-follow` com `"username":"Maria-SM1"` legível |
| E7 | `S-M1_firestore-cena-cifrada_2026-11-09.png` | print | `scenes/1c620bd005c86aa4145f` com só `ciphertext`, `iv` e `sceneVersion` |
| E8 | `S-M1_payload-json-link_2026-11-09.png` | print | POST do `#json`: cabeçalho de formato em claro e o resto binário |
| E9 | `S-M1_payload-ia_2026-11-09.png` | print | POST da IA com as mensagens do chat em JSON legível |
| E10 | `S-M1_log-ia-falsa_2026-11-09.txt` | saída de comando | Corpo recebido pelo servidor de IA falso (`LOG_BODY=1`) |

### 4.3 Buscas sem resultado

| O que se procurou | Onde / comando | Resultado |
| --- | --- | --- |
| Texto do desenho `SEGREDO-SM1` | 7.196 frames do socket no HAR, binários decodificados (E2) | Nenhuma ocorrência |
| `SEGREDO-SM1` e os nomes no Firestore | Corpos dos 4 `documents:commit` no HAR | Nenhuma ocorrência |
| Outro `emit` fora de `Portal.tsx` | `git grep -n "\.emit(" -- excalidraw-app/collab` | Só os 3 de `Portal.tsx` |

## 5. Resultado

### 5.1 Dados brutos

| Evento (sentido) | Leva dado do usuário? | Cifrado? | O que expõe em claro | Código | Na captura |
| --- | --- | --- | --- | --- | --- |
| `SCENE_INIT` / `SCENE_UPDATE` (envio) | Sim, o desenho | Sim | ID da sala | C1, C2 | 5 `server-broadcast` |
| `MOUSE_LOCATION` (envio) | Sim, ponteiro e nome | Sim | ID da sala | C1, C2 | dentro dos 1.853 `server-volatile-broadcast` |
| `IDLE_STATUS` (envio) | Sim, nome | Sim | ID da sala | C1, C2 | idem |
| `USER_VISIBLE_SCENE_BOUNDS` (envio) | Sim, nome e área visível | Sim | `follow@<socketId>` | C1, C2 | idem |
| `user-follow` (envio) | Sim, nome | **Não** | `socketId` e **nome** de quem é seguido | C3 | 2 (E6) |
| `join-room` (envio) | Não | Não | ID da sala | C4 | 1 |
| `client-broadcast` (recebido) | Sim | Sim | nada | C5 | 502 |
| `init-room`, `first-in-room`, `new-user`, `room-user-change`, `user-follow-room-change` (recebidos) | Não | Não | IDs de socket | — | 10 |
| Cena no Firestore | Sim | Sim | `sceneVersion` | C6, E7 | — |
| Link `#json` | Sim | Sim | cabeçalho de formato | C8, E8 | — |

### 5.2 Cálculo

- **(a) Por tipo de evento com dado do usuário (nota):** 5 tipos cifrados (`SCENE_INIT`, `SCENE_UPDATE`, `MOUSE_LOCATION`, `IDLE_STATUS`, `USER_VISIBLE_SCENE_BOUNDS`) ÷ 6 tipos (os 5 mais o `user-follow`) = **83,3%**.
- **(b) Por quantidade na captura (observação):** eventos cifrados ÷ total de eventos Socket.IO da janela A = (1.853 + 5 + 502) ÷ 2.373 = 2.360 ÷ 2.373 = **99,5%**. Os frames de controle do Engine.IO (ping, pong, connect) ficaram fora. Os anexos binários contam junto do seu evento.

### 5.3 Pontuação

| Valor medido | Regra da métrica | Pontuação (0–2) |
| --- | --- | --- |
| (a) 83,3% | 2 = 100%; 1 = ≥ 90% e < 100%; 0 = < 90% | **0** |

**Justificativa:** todo o conteúdo do desenho sai cifrado, mas um dos seis tipos de evento com dado do usuário (`user-follow`) envia o nome do participante em claro ao servidor de sala.

## 6. Observações e limitações

- Pela proporção (b) a nota seria 1. O volume é dominado pelo ponteiro, e o `user-follow` só sai quando alguém clica para seguir. Por isso a nota usa (a), que não depende de quanto cada recurso foi usado na sessão.
- O ID da sala vai em claro em todo envio (C1, C4). É o que permite ao servidor retransmitir, mas mostra a ele quem está em qual sala.
- O `user-follow` é visto pelo servidor de sala (operador ou intermediário), não por terceiros na rede: a conexão em produção é HTTPS/WSS. No ambiente local ela é `ws://`.
- **Achado fora da proporção (IA):** o texto do chat e, no "diagrama para código", a imagem PNG do frame saem em JSON legível, protegidos só pelo HTTPS (C9, E9, E10). Quem opera o backend de IA lê o conteúdo.
- Medição só local, com o servidor `excalidraw-room` em Docker e o Firebase do grupo. A captura é da janela A.

## 7. Achado (preencher só se a pontuação for 0)

| ID | Métrica | Evidência reproduzível | Pontuação | Impacto (Baixo/Médio/Alto) | Recomendação |
| --- | --- | --- | --- | --- | --- |
| A-S1 | S-M1 | C3, E6; passos 2–3 e 5 da seção 3 | 0 | Baixo | Enviar o pedido de seguir por `_broadcastSocketData` (subtipo cifrado) ou mandar só o `socketId` |
| A-S1b | S-M1 (fora da proporção) | C9, E9, E10; passo 4 da seção 3 | — | Médio | Avisar na interface que o conteúdo vai ao serviço de IA sem a cifra de ponta a ponta |

## 8. Contribuição para a questão

| Questão | Esta métrica indica que a hipótese foi | Por quê |
| --- | --- | --- |
| S-Q1 | parcial | O desenho trafega e fica salvo cifrado, mas o nome no `user-follow` e o conteúdo enviado à IA saem sem a cifra do app |
