# Evidência S-M9 : Suficiência da autenticação

## 1. Identificação

| Campo | Valor |
| --- | --- |
| Métrica | S-M9 : Suficiência da autenticação |
| Questão (S-Q) | S-Q5 : Autenticidade |
| Tarefa do plano | T2.5 (ver `tarefas-seguranca-excalidraw.md`) |
| Responsável | João Pedro Lopes da Cruz |
| Data(s) da coleta | 2026-11-04 |
| Revisado por | <nome da outra pessoa> em <AAAA-MM-DD> |

## 2. O que foi medido

Mecanismo que o participante de uma sala colaborativa usa para se identificar, na escala 0 = nenhum, 1 = nome autodeclarado, 2 = login, 3 = login + MFA. O recorte é o app gratuito (`excalidraw-app/`) e o pacote do editor (`packages/excalidraw/`). O Excalidraw+ ficou de fora.

## 3. Procedimento

1. Seguir o fluxo do nome do participante no código: como nasce (`startCollaboration`), como é alterado (`setUsername`), onde fica salvo (`localStorage.ts`) e como vai para os outros participantes (`Portal.tsx`).
2. Verificar se a conexão com o servidor de sala manda alguma credencial (`socketIOClient` em `Collab.tsx`).
3. Ver como quem recebe identifica o remetente (`client-broadcast` decifrado em `Collab.tsx`).
4. Procurar no código qualquer mecanismo de login, senha, token ou MFA (seção 4.3).
5. Conferir o único "sign in" que aparece na interface (menu principal), que leva ao Excalidraw+.

### 3.1 Comandos executados

```bash
# 2026-11-04 10:19, pasta aplicacao/
git grep -n -i -F '<termo>' -- excalidraw-app packages/excalidraw ':!*test*' ':!*.json' ':!*.snap'
# termos: firebase/auth, getAuth(, signInWith, onAuthStateChanged, webauthn, totp, password, Authorization, auth:
git grep -n -I -i -w 'mfa\|2fa\|otp' -- excalidraw-app packages/excalidraw ':!*test*'
git grep -n 'isExcalidrawPlusSignedUser\|excplus-auth' -- excalidraw-app
git grep -n 'username' -- excalidraw-app/collab excalidraw-app/data/localStorage.ts excalidraw-app/share
```

```text
firebase/auth, getAuth(, signInWith, onAuthStateChanged, webauthn, totp,
mfa/2fa/otp, Authorization, auth:  -> nenhuma ocorrência
password -> só packages/excalidraw/css/styles.scss:817 (comentário de CSS)
excplus-auth -> só app_constants.ts:56-59 e usos de isExcalidrawPlusSignedUser na interface
```

Saída completa: `S-M9_buscas-autenticacao_2026-11-04.txt`.

## 4. Evidências

### 4.1 Trechos de código

| # | Arquivo:linha | O que mostra |
| --- | --- | --- |
| C1 | `excalidraw-app/collab/Collab.tsx:495-499` | Sem nome definido, o app sorteia um nome aleatório |
| C2 | `excalidraw-app/share/ShareDialog.tsx:110-116` | Campo de texto livre "Your name" no diálogo de compartilhamento |
| C3 | `excalidraw-app/collab/Collab.tsx:1037-1039` | O nome digitado é aceito sem validação e salvo localmente |
| C4 | `excalidraw-app/data/localStorage.ts:11-16` | Gravação de `{ username }` em `excalidraw-collab` no localStorage |
| C5 | `excalidraw-app/collab/Collab.tsx:544-550` | O socket conecta só com a URL do servidor, sem token nem credencial |
| C6 | `excalidraw-app/collab/Portal.tsx:185-193` | O nome vai dentro do payload, junto do `socketId`, preenchido pelo próprio cliente |
| C7 | `excalidraw-app/collab/Collab.tsx:631-645` e `:683-687` | Quem recebe usa o `socketId` e o `username` que vêm no payload, sem conferir com o servidor |
| C8 | `excalidraw-app/app_constants.ts:55-61` e `components/AppMainMenu.tsx:54-62` | O único "sign in" é do Excalidraw+. A verificação só olha se o cookie `excplus-auth` existe e o link leva para `app.excalidraw.com` |

```ts
// C1: excalidraw-app/collab/Collab.tsx:495-499
if (!this.state.username) {
  import("@excalidraw/random-username").then(({ getRandomUsername }) => {
    const username = getRandomUsername();
    this.setUsername(username);
  });
}
```

```tsx
// C2: excalidraw-app/share/ShareDialog.tsx:110-116
<TextField
  defaultValue={collabAPI.getUsername()}
  placeholder="Your name"
  label="Your name"
  onChange={collabAPI.setUsername}
  ...
/>
```

```ts
// C3: excalidraw-app/collab/Collab.tsx:1037-1039
setUsername = (username: string) => {
  this.setState({ username });
  saveUsernameToLocalStorage(username);
```

```ts
// C5: excalidraw-app/collab/Collab.tsx:544-550
this.portal.socket = this.portal.open(
  socketIOClient(import.meta.env.VITE_APP_WS_SERVER_URL, {
    transports: ["websocket", "polling"],
  }),
  roomId,
  roomKey,
);
```

```ts
// C6: excalidraw-app/collab/Portal.tsx:185-193
broadcastIdleChange = (userState: UserIdleState) => {
  if (this.socket?.id) {
    const data: SocketUpdateDataSource["IDLE_STATUS"] = {
      type: WS_SUBTYPES.IDLE_STATUS,
      payload: {
        socketId: this.socket.id as SocketId,
        userState,
        username: this.collab.state.username,
```

```ts
// C7: excalidraw-app/collab/Collab.tsx:683-687
const { userState, socketId, username } = decryptedData.payload;
this.updateCollaborator(socketId, {
  userState,
  username,
});
```

```ts
// C8: excalidraw-app/app_constants.ts:55-61
export const COOKIES = {
  AUTH_STATE_COOKIE: "excplus-auth",
} as const;

export const isExcalidrawPlusSignedUser = document.cookie.includes(
  COOKIES.AUTH_STATE_COOKIE,
);
```

### 4.2 Arquivos de apoio

| # | Arquivo | Tipo | O que mostra |
| --- | --- | --- | --- |
| E1 | `S-M9_buscas-autenticacao_2026-11-04.txt` | saída de comando | Buscas por login, senha, token e MFA, e todos os usos de `username` |
| E2 | `S-M9_dialogo-nome_2026-11-09.png` | print | Diálogo "Live collaboration" com o campo "Your name", em duas janelas na mesma sala de excalidraw.com. O link da sala e o QR code foram cobertos |

### 4.3 Buscas sem resultado

| O que se procurou | Onde / comando | Resultado |
| --- | --- | --- |
| Firebase Authentication | `git grep -n -i -F 'firebase/auth'` e `'getAuth('` em `excalidraw-app packages/excalidraw` | Nenhuma ocorrência |
| Fluxo de login | `'signInWith'`, `'onAuthStateChanged'` | Nenhuma ocorrência |
| Senha | `'password'` | Só um comentário de CSS (`styles.scss:817`) |
| Token enviado ao servidor | `'Authorization'`, `'auth:'` (opção `auth` do Socket.IO) | Nenhuma ocorrência |
| Segundo fator | `-w 'mfa\|2fa\|otp'`, `'totp'`, `'webauthn'` | Nenhuma ocorrência em texto. Sem `-I`, só casam fontes `.woff2` binárias |

## 5. Resultado

### 5.1 Dados brutos

| Mecanismo | Existe no app gratuito? | Evidência |
| --- | --- | --- |
| Nome autodeclarado (aleatório ou digitado) | Sim | C1, C2, C3 |
| Login (conta e senha, OAuth, Firebase Auth) | Não | C5, seção 4.3 |
| Credencial enviada ao servidor de sala | Não | C5 |
| Identidade conferida por quem recebe | Não. `socketId` e nome vêm do próprio payload | C6, C7 |
| MFA | Não | seção 4.3 |

### 5.2 Cálculo

O nível mais alto encontrado na escala (0 nenhum, 1 nome autodeclarado, 2 login, 3 login + MFA) é o **1, nome autodeclarado**.

### 5.3 Pontuação

| Valor medido | Regra da métrica | Pontuação (0–2) |
| --- | --- | --- |
| Nível 1: nome autodeclarado | 2 = login ou login + MFA; 1 = nome autodeclarado; 0 = nenhum | **1** |

**Justificativa:** o participante só informa um nome em campo livre, ou recebe um nome sorteado. Nenhuma conta, senha ou token é verificado no app gratuito.

## 6. Observações e limitações

- A pasta `aplicacao/` está no commit `219e8d0` do repositório do grupo e não traz o histórico do upstream. As linhas conferem com as citadas no plano para o commit `e7b5346`, com diferença de no máximo 2 linhas.
- O servidor de sala (`excalidraw/excalidraw-room`) não está neste repositório. A afirmação de que ele não autentica vem do cliente: o cliente não envia credencial (C5). Confirmar no código do servidor junto com a T2.6.
- A chave da sala no `#` da URL controla o acesso ao conteúdo (S-Q2), mas não diz quem é a pessoa: todos com o link compartilham a mesma chave.
- Achado fora da métrica, para a S-M10: como `socketId` e `username` vêm do payload (C7), um participante com a chave pode, em tese, enviar mensagens em nome de outro. Isso é testado na T2.6.
- O print E2 foi tirado em 2026-11-09 no excalidraw.com, não na instância local. A nota não depende dele, que só ilustra C2.

## 7. Achado (preencher só se a pontuação for 0)

Não se aplica (pontuação 1).

## 8. Contribuição para a questão

| Questão | Esta métrica indica que a hipótese foi | Por quê |
| --- | --- | --- |
| S-Q5 | confirmada (parcial até sair a S-M10) | A identidade é só um nome autodeclarado, sem login. Falta a S-M10 para fechar a parte "qualquer um pode usar o nome de outro". |
