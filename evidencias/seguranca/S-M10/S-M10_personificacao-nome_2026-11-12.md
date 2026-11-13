# Evidência S-M10 : Personificação pelo nome

## 1. Identificação

| Campo | Valor |
| --- | --- |
| Métrica | S-M10 : Personificação pelo nome |
| Questão (S-Q) | S-Q5 : Autenticidade |
| Tarefa do plano | T2.6 (ver `tarefas-seguranca-excalidraw.md`) |
| Responsável | Luis Felipe Parreira Cunha |
| Data(s) da coleta | 2026-11-12 |
| Versão avaliada | Excalidraw `e7b5346` (snapshot em `aplicacao/`) |
| Revisado por | `<preencher>` em `<AAAA-MM-DD>` |

## 2. O que foi medido

Se um participante de uma sala colaborativa consegue assumir o nome de outro participante e se a aplicação bloqueia, alerta ou rejeita a troca. O recorte foi o app gratuito (`excalidraw-app/`) na instância local, com o servidor de colaboração `excalidraw-room` na porta 3002. A pergunta é binária: o nome de outro participante pode ser usado?

## 3. Procedimento

O ambiente já estava preparado conforme `evidencias/ambiente/ambiente-local.md`. Antes do teste, confirmei que o servidor de colaboração e a aplicação estavam no ar.

1. Abri `http://localhost:3001` no navegador in-app.
2. Cliquei em **Live collaboration...** e em **Start session** para criar a sala.
3. Copiei o link da sala e abri o mesmo link em mais duas abas, totalizando três conexões (A, B e C).
4. Defini os nomes iniciais pelo console, com o mesmo método chamado pelo campo **Your name** do diálogo de compartilhamento:
   - A: `window.collab.setUsername("Alice")`
   - B: `window.collab.setUsername("Bruno")`
   - C: `window.collab.setUsername("Carlos")`
5. Confirmei os nomes com `window.collab.getUsername()` nas três janelas.
6. Na janela C, troquei o nome para `Alice`, que já pertencia à janela A:
   ```javascript
   window.collab.setUsername("Alice")
   window.collab.getUsername()
   ```
7. Movi o ponteiro na janela C e criei um retângulo no quadro para forçar o envio de uma atualização aos demais participantes.
8. Abri a lista de colaboradores (ícone de avatares no canto superior direito) nas três janelas e registrei os nomes exibidos, a existência de alerta, bloqueio ou rejeição do servidor.
9. Confirmei que as janelas A e B receberam o retângulo criado em C, para verificar que o servidor local estava retransmitindo as atualizações da janela C.

### 3.1 Comandos executados

```bash
# 2026-11-12 22:34, pasta Projeto/
git -C aplicacao rev-parse HEAD
# da62b70ff0237079ab774dd1ab3e0e16edd77fe0

git -C ../excalidraw-room rev-parse HEAD
# 03ff435860b508d7cd9e005cfc90f7977ae2a593

docker ps --filter name=excalidraw-room
# excalidraw-room   Up ...   0.0.0.0:3002->80/tcp, [::]:3002->80/tcp

curl -s -o /dev/null -w '%{http_code}\n' http://localhost:3001
# 200

curl -s -o /dev/null -w '%{http_code}\n' http://localhost:3002
# 200

# 2026-11-12 22:51, verificação dos arquivos citados contra o upstream
git hash-object aplicacao/excalidraw-app/collab/Collab.tsx
# 5569aa0fbffe84ba711bc9984d42ec8012b93282 (igual ao sha do GitHub em e7b5346)
```

A verificação dos quatro arquivos citados (Collab.tsx, Portal.tsx, ShareDialog.tsx e localStorage.ts) está em `S-M10_verificacao-versao_2026-11-12.txt`: todos são idênticos ao commit `e7b534668a60add7f725531f3c9abf32508c7b4e`.

As buscas por autenticação estão na seção 4.3 e no arquivo `S-M10_buscas-autenticacao_2026-11-12.txt`.

## 4. Evidências

### 4.1 Trechos de código

| # | Arquivo:linha | O que mostra |
| --- | --- | --- |
| C1 | `excalidraw-app/collab/Collab.tsx:1037-1046` | `setUsername` aceita qualquer string, salva no `localStorage` e atualiza a entrada do próprio participante, sem validar unicidade ou vínculo com identidade |
| C2 | `excalidraw-app/collab/Portal.tsx:185-200` | O nome é enviado no payload de `IDLE_STATUS`, preenchido pelo próprio cliente |
| C3 | `excalidraw-app/collab/Portal.tsx:202-224` | O nome também vai no payload de `MOUSE_LOCATION` |
| C4 | `excalidraw-app/collab/Collab.tsx:631-648` | Quem recebe usa o `username` que veio no payload e chama `updateCollaborator`, sem conferir com o servidor |
| C5 | `excalidraw-app/collab/Collab.tsx:682-689` | O mesmo ocorre no recebimento de `IDLE_STATUS` |
| C6 | `excalidraw-app/share/ShareDialog.tsx:110-115` | O campo "Your name" do diálogo chama `collabAPI.setUsername` diretamente; é o caminho de UI equivalente ao usado no teste |
| C7 | `excalidraw-app/collab/Collab.tsx:543-550` | O socket conecta apenas com a URL do servidor, sem token, senha ou credencial de identidade |
| C8 | `excalidraw-app/data/localStorage.ts:11-15` | O nome é persistido localmente como texto, sem validação |

```ts
// C1: excalidraw-app/collab/Collab.tsx:1037-1046
setUsername = (username: string) => {
  this.setState({ username });
  saveUsernameToLocalStorage(username);

  // keep our own collaborator entry in sync
  const socketId = this.portal.socket?.id as SocketId | undefined;
  if (socketId && this.collaborators.has(socketId)) {
    this.updateCollaborator(socketId, { username });
  }
};
```

```ts
// C2: excalidraw-app/collab/Portal.tsx:185-200
broadcastIdleChange = (userState: UserIdleState) => {
  if (this.socket?.id) {
    const data: SocketUpdateDataSource["IDLE_STATUS"] = {
      type: WS_SUBTYPES.IDLE_STATUS,
      payload: {
        socketId: this.socket.id as SocketId,
        userState,
        username: this.collab.state.username,
      },
    };
    return this._broadcastSocketData(
      data as SocketUpdateData,
      true, // volatile
    );
  }
};
```

```ts
// C3: excalidraw-app/collab/Portal.tsx:202-224
broadcastMouseLocation = (payload: {
  pointer: SocketUpdateDataSource["MOUSE_LOCATION"]["payload"]["pointer"];
  button: SocketUpdateDataSource["MOUSE_LOCATION"]["payload"]["button"];
}) => {
  if (this.socket?.id) {
    const data: SocketUpdateDataSource["MOUSE_LOCATION"] = {
      type: WS_SUBTYPES.MOUSE_LOCATION,
      payload: {
        socketId: this.socket.id as SocketId,
        pointer: payload.pointer,
        button: payload.button || "up",
        selectedElementIds:
          this.collab.excalidrawAPI.getAppState().selectedElementIds,
        username: this.collab.state.username,
      },
    };

    return this._broadcastSocketData(
      data as SocketUpdateData,
      true, // volatile
    );
  }
};
```

```ts
// C4: excalidraw-app/collab/Collab.tsx:631-648
case WS_SUBTYPES.MOUSE_LOCATION: {
  const { pointer, button, username, selectedElementIds } =
    decryptedData.payload;

  const socketId: SocketUpdateDataSource["MOUSE_LOCATION"]["payload"]["socketId"] =
    decryptedData.payload.socketId ||
    // @ts-ignore legacy, see #2094 (#2097)
    decryptedData.payload.socketID;

  this.updateCollaborator(socketId, {
    pointer,
    button,
    selectedElementIds,
    username,
  });

  break;
}
```

```ts
// C5: excalidraw-app/collab/Collab.tsx:682-689
case WS_SUBTYPES.IDLE_STATUS: {
  const { userState, socketId, username } = decryptedData.payload;
  this.updateCollaborator(socketId, {
    userState,
    username,
  });
  break;
}
```

```tsx
// C6: excalidraw-app/share/ShareDialog.tsx:110-115
<TextField
  defaultValue={collabAPI.getUsername()}
  placeholder="Your name"
  label="Your name"
  onChange={collabAPI.setUsername}
  onKeyDown={(event) => event.key === KEYS.ENTER && handleClose()}
/>
```

```ts
// C7: excalidraw-app/collab/Collab.tsx:543-550
this.portal.socket = this.portal.open(
  socketIOClient(import.meta.env.VITE_APP_WS_SERVER_URL, {
    transports: ["websocket", "polling"],
  }),
  roomId,
  roomKey,
);
```

```ts
// C8: excalidraw-app/data/localStorage.ts:11-15
export const saveUsernameToLocalStorage = (username: string) => {
  try {
    localStorage.setItem(
      STORAGE_KEYS.LOCAL_STORAGE_COLLAB,
      JSON.stringify({ username }),
    );
```

### 4.2 Arquivos de apoio

| # | Arquivo | Tipo | O que mostra |
| --- | --- | --- | --- |
| E1 | `S-M10_participante-A_2026-11-12.png` | print | Janela A: lista de colaboradores com **Alice (You)**, **Alice** e **Bruno** |
| E2 | `S-M10_participante-B_2026-11-12.png` | print | Janela B: lista com **Bruno (You)**, **Alice** e **Alice** |
| E3 | `S-M10_participante-C_2026-11-12.png` | print | Janela C: lista com **Alice (You)**, **Alice** e **Bruno** |
| E4 | `S-M10_personificacao_2026-11-12.png` | print composto | As três janelas lado a lado, com a lista de colaboradores aberta |
| E5 | `S-M10_console_2026-11-12.txt` | saída de console/estado | Nomes antes e depois, sockets, ausência de alertas e confirmação de que o servidor retransmitiu a alteração de C |
| E6 | `S-M10_buscas-autenticacao_2026-11-12.txt` | saída de comando | Buscas por login, senha, token e MFA, e todos os usos de `username` |
| E7 | `S-M10_verificacao-versao_2026-11-12.txt` | saída de comando | Hash dos quatro arquivos citados × sha do upstream `e7b5346`; todos iguais |

### 4.3 Buscas sem resultado

| O que se procurou | Onde / comando | Resultado |
| --- | --- | --- |
| Firebase Authentication | `git grep -n -i -E 'firebase/auth\|getAuth\(' -- excalidraw-app packages/excalidraw` | Nenhuma ocorrência |
| Fluxo de login | `signInWith`, `onAuthStateChanged` | Nenhuma ocorrência |
| Segundo fator | `webauthn`, `totp`; `git grep -n -I -i -w -E 'mfa\|2fa\|otp'` | Nenhuma ocorrência em texto |
| Token/credencial | `Authorization`, `auth:` | Nenhuma ocorrência; o socket usa só a URL do servidor (C7) |
| Senha | `git grep -n -i -F 'password'` | Só um comentário de CSS em `packages/excalidraw/css/styles.scss:817` |
| Nome do participante | `git grep -n 'username' -- excalidraw-app/collab excalidraw-app/data/localStorage.ts excalidraw-app/share` | O nome é lido, salvo e enviado, mas nunca validado (C1–C8) |

O comando agrupado do guia, sem limite de palavra, casa palavras como `formFactor`, `viewportZoomFactor` e `footprint` por causa de `mfa`/`otp`; com `-w`, o resultado é vazio. A saída completa está em `S-M10_buscas-autenticacao_2026-11-12.txt`.

## 5. Resultado

### 5.1 Dados brutos

| Participante | Socket.IO (prefixo) | Nome original | Nome após o teste | Bloqueado? | Alertado? |
| --- | --- | --- | --- | --- | --- |
| A | `PoCa0Spw` | Alice | Alice | Não | Não |
| B | `30iV5cS4` | Bruno | Bruno | Não | Não |
| C | `9_aF6ua9` | Carlos | Alice | Não | Não |

Nomes exibidos na lista de colaboradores de cada janela depois da troca:

| Janela | Nomes exibidos |
| --- | --- |
| A | Alice (You), Alice, Bruno |
| B | Bruno (You), Alice, Alice |
| C | Alice (You), Alice, Bruno |

Os três sockets estavam conectados e eram distintos. O mapa `window.collab.collaborators` ficou igual nas três janelas, com dois registros `Alice` e um `Bruno`.

### 5.2 Cálculo

Tentativas de usar o nome de outro participante: **1**. Aceitas sem alerta, bloqueio ou rejeição do servidor: **1**.

```text
1 ÷ 1 = 100% das tentativas aceitas
S-M10 = Sim
```

### 5.3 Pontuação

| Valor medido | Regra da métrica | Pontuação (0–2) |
| --- | --- | --- |
| O participante C conseguiu aparecer como "Alice" para A e B, sem alerta nem bloqueio | 2 = não é possível usar o nome de outro participante; 1 = não se aplica; 0 = é possível usar o nome de outro participante | **0** |

**Justificativa:** a janela C trocou o nome de "Carlos" para "Alice" e passou a ser exibida como "Alice" nas janelas A e B. Não houve alerta, confirmação, bloqueio ou rejeição do servidor. A aplicação exibiu duas conexões diferentes com o mesmo nome.

## 6. Observações e limitações

- O teste foi feito somente na instância local (`localhost:3001` + servidor de colaboração em `localhost:3002`). Nada foi enviado ao `excalidraw.com`, ao Firebase público ou ao backend de IA.
- A pasta `aplicacao/` está no commit `da62b70` do repositório do grupo e não traz o histórico do upstream. Segundo `evidencias/ambiente/ambiente-local.md`, esse snapshot corresponde ao Excalidraw `e7b5346`. Os quatro arquivos citados foram comparados por hash com o conteúdo do commit `e7b534668a60add7f725531f3c9abf32508c7b4e` e são idênticos (E7); a correspondência do restante do snapshot vem do ambiente preparado pelo grupo.
- Os três contextos foram três abas do mesmo perfil do navegador in-app, não três perfis separados. Cada aba tinha estado e conexão Socket.IO próprios (sockets distintos), mas compartilhava o `localStorage`. Os nomes foram definidos explicitamente em cada aba, então o resultado não depende do valor persistido. Ainda assim, é uma diferença em relação à sugestão do guia de usar janela anônima ou outro perfil.
- O nome foi alterado por `window.collab.setUsername`, o mesmo método chamado pelo campo "Your name" do diálogo de compartilhamento (C6). O caminho pela interface produz o mesmo efeito; a escolha pelo console foi só para registrar o valor exato antes e depois.
- O nome viaja dentro do payload cifrado da colaboração. O servidor não tem como validar a identidade sem um mecanismo adicional; ele apenas retransmite o payload. O servidor local aceitou e retransmitiu a alteração de C, como mostra a atualização de cena recebida por A e B.
- O `socketId` é atribuído pelo servidor, mas o `username` é preenchido pelo cliente e não é vinculado a ele. Não há verificação de unicidade, login, token ou MFA.
- O link da sala, a chave e a configuração do Firebase foram omitidos das evidências.
- Os pontinhos isolados que apareceram no quadro da janela C durante a preparação eram elementos de teste sem dimensão, criados por eventos sintéticos; foram removidos antes do print final e não afetam a conclusão.
- A persistência da cena no Firebase não foi usada como evidência. A sincronização observada entre as janelas foi feita pelo WebSocket local na porta 3002.

## 7. Achado (preencher só se a pontuação for 0)

| ID | Métrica | Evidência reproduzível | Pontuação | Impacto (Baixo/Médio/Alto) | Recomendação |
| --- | --- | --- | --- | --- | --- |
| A-S-M10 | S-M10 | C1–C5, E1–E3 e passos 4–8 da seção 3 | 0 | Médio. A identidade é apenas um nome autodeclarado e a personificação não deixa rastro verificável. | Autenticar os participantes e vincular o nome a um identificador verificado; enquanto não houver login, rejeitar nomes duplicados ou exibir um identificador adicional (ex.: sufixo aleatório) e validar a unicidade no servidor, não só no cliente |

**Detalhamento do achado:** a identidade na sala é apenas um nome autodeclarado. Qualquer participante com o link pode alterar o próprio nome para o de outro participante e passar a ser exibido dessa forma para os demais. Como não há histórico de autoria confiável (S-M7) nem login (S-M9), a personificação não pode ser detectada depois. A recomendação é exigir autenticação (conta ou token de sessão) e associar o nome ao identificador autenticado; uma alternativa paliativa é impedir nomes duplicados e mostrar um identificador curto por conexão.

## 8. Contribuição para a questão

| Questão | Esta métrica indica que a hipótese foi | Por quê |
| --- | --- | --- |
| S-Q5 | confirmada | A identidade é só um nome autodeclarado; o participante C assumiu o nome "Alice" e apareceu assim para A e B, sem alerta ou bloqueio. |
