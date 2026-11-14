# Evidência S-M5 : Taxa de detecção de adulteração

## 1. Identificação

| Campo | Valor |
| --- | --- |
| Métrica | S-M5 : Taxa de detecção de adulteração |
| Questão (S-Q) | S-Q3 : Integridade |
| Tarefa do plano | T1.3 (ver `tarefas-seguranca-excalidraw.md`) |
| Issue | #58 |
| Responsável | João Pedro Lopes da Cruz |
| Data(s) da coleta | 2026-11-14 (teste automatizado e teste ponta a ponta) |
| Versão avaliada | Excalidraw `e7b5346` (snapshot em `aplicacao/`) |
| Revisado por | `<preencher>` em `<AAAA-MM-DD>` |

## 2. O que foi medido

A métrica mede a proporção de mensagens de colaboração adulteradas que a decifragem rejeita. Cada mensagem é cifrada com o mesmo código e o mesmo formato que o app usa ao enviar pelo socket (AES-GCM com chave de 128 bits e IV aleatório de 12 bytes) e depois sofre uma adulteração.

O denominador são as adulterações injetadas, sem contar as mensagens de controle. A medição tem duas fontes:

1. um teste automatizado com 200 adulterações em 5 grupos de 40, que é a base da nota;
2. um teste ponta a ponta na instância local, com duas janelas na mesma sala, que confirma a reação do app real: 21 adulterações enviadas pelo socket.

A nota usa as duas fontes somadas.

## 3. Procedimento

### 3.1 Teste automatizado

1. Na branch `feat/seguranca-sm5-sm6`, criei `aplicacao/packages/excalidraw/tests/avaliacao/adulteracao.test.ts`. Ele usa as funções reais `encryptData`, `decryptData` e `generateEncryptionKey` de `packages/excalidraw/data/encryption.ts` (C1 e C2).
2. **Payload:** `{"type":"SCENE_INIT","payload":{"elements":[…]}}`, no mesmo formato que `Portal._broadcastSocketData` cifra (C3). Os elementos vêm de uma cena real com 4 elementos, exportada do app em 2026-11-12 (`fixtures/cena-s-m5.json`, cópia de `evidencias/capacidade-interacao/CI-M23/CI-M23_cena-de-apoio_2026-11-12.excalidraw`).
3. **Controle:** cifrei 40 mensagens sem adulteração e confirmei que todas são decifradas e ficam idênticas ao original. Isso mostra que o teste não rejeita tudo por algum defeito próprio.
4. **Adulterações:** 200, em 5 grupos de 40. Cada adulteração é feita sobre uma mensagem cifrada nova, com IV próprio. As posições e os bits sorteados vêm de um PRNG com semente fixa (mulberry32, semente 58, `tests/avaliacao/prng.ts`), então a medição se repete exatamente.

   | Grupo | O que é alterado |
   | --- | --- |
   | `bit-cifrado` | 1 bit de um byte sorteado do texto cifrado (fora dos 16 bytes finais da tag) |
   | `bit-tag` | 1 bit de um dos 16 bytes finais (tag de autenticação do GCM) |
   | `bit-iv` | 1 bit de um dos 12 bytes do IV |
   | `tamanho` | alterna entre truncar e acrescentar de 1 a 16 bytes aleatórios |
   | `chave-ou-iv-trocado` | alterna entre decifrar com outra chave e decifrar com o IV de outra mensagem |

5. Uma mensagem conta como **rejeitada** quando `decryptData` lança erro. É exatamente a condição em que o app mostra o alerta e descarta a mensagem (C4 e C5).
6. **Replay:** decifrei duas vezes a mesma mensagem válida. É uma observação de integridade e não entra na taxa.
7. **Verificação do próprio teste:** rodei uma cópia temporária em que o grupo `bit-cifrado` não alterava nada. O total caiu para 160 ÷ 200 e o teste falhou. Isso mostra que a asserção detecta quando uma adulteração passa. A cópia foi apagada depois.

### 3.2 Teste ponta a ponta

O ambiente foi o de `evidencias/ambiente/ambiente-local.md`:

- app em `localhost:3001` (`yarn vite`);
- servidor de sala `excalidraw-room` `03ff435` em Docker, na porta 3002;
- navegador Helium (Chromium): janela A normal e janela B anônima, na mesma sala.

1. Na janela A: **Live collaboration** → **Start session**. Abri o link da sala na janela B.
2. Colei `S-M5_snippet-janela-A.js` no console da A. O script intercepta `socket.emit` e guarda cópias das mensagens `server-broadcast` reais, já cifradas pelo app (C3). Ele não altera nada do que o app envia.
3. Colei `S-M5_snippet-janela-B.js` no console da B. O script troca `window.alert` por um contador. Só o primeiro alerta aparece de verdade, para o print; os outros são só contados, para a janela não travar.
4. **Controle do canal:** desenhei 2 retângulos na A, e eles apareceram na B. Registrei a cena da B com `__sm5b.foto("antes")`.
5. Na A, `__sm5.injetar("bit-tag", 1)`. A B mostrou o alerta "Não foi possível descriptografar os dados." (E8).
6. Na A, `__sm5.injetar(<modo>, 4)` para cada um dos 5 modos: `bit-cifrado`, `bit-tag`, `bit-iv`, `truncar` e `iv-de-outra-msg`.
   - Cada injeção reenvia, direto ao servidor de sala, uma cópia adulterada da última mensagem válida que a A enviou.
   - A troca de chave do teste automatizado não foi repetida aqui, porque pelo console não dá para cifrar com outra chave sem mexer no app. No lugar dela entrou o IV de outra mensagem.
7. Na B, conferi `__sm5b.alertas.length` e `__sm5b.foto("depois")` (E9).
8. **Replay:**
   - na A, marquei a última mensagem válida (`__sm5.antiga = __sm5.validas.at(-1)`) e arrastei um dos retângulos; a B recebeu o movimento;
   - na B, registrei `__sm5b.foto("antes-replay")`;
   - na A, reenviei a mensagem antiga sem alteração (`__sm5.reenviar(...)`);
   - na B, registrei `__sm5b.foto("depois-replay")` (E10).
9. Exportei os registros com `__sm5.relatorio()` e `__sm5b.relatorio()` (E7). Os registros não incluem o ID da sala nem a chave. Os prints foram recortados sem a barra de endereço.

### 3.3 Comandos executados

```bash
# 2026-11-14 13:31 -0300, pasta aplicacao/
yarn test:app --watch=false packages/excalidraw/tests/avaliacao/adulteracao.test.ts
```

```text
controle: 40 enviadas, 0 rejeitadas
semente: 58
│ 'bit-cifrado'         │ 40  │ 40  │
│ 'bit-tag'             │ 40  │ 40  │
│ 'bit-iv'              │ 40  │ 40  │
│ 'tamanho'             │ 40  │ 40  │
│ 'chave-ou-iv-trocado' │ 40  │ 40  │
│ 'TOTAL'               │ 200 │ 200 │
S-M5 = 200 ÷ 200 = 100.0%
replay: 1ª entrega aceita, reenvio aceito
Tests  3 passed (3)
```

A saída completa, com Node v24.12.0, Yarn 1.22.22 e Vitest 3.0.6, está em `S-M5_vitest_2026-11-14.txt`.

Os quatro arquivos citados abaixo foram comparados por hash com o upstream no commit `e7b534668a60add7f725531f3c9abf32508c7b4e`, e todos são idênticos (`S-M5_verificacao-versao_2026-11-14.txt`).

## 4. Evidências

### 4.1 Trechos de código

| # | Arquivo:linha | O que mostra |
| --- | --- | --- |
| C1 | `packages/excalidraw/data/encryption.ts:50-78` | Cifra AES-GCM com IV aleatório e sem dados adicionais autenticados (AAD) |
| C2 | `packages/excalidraw/data/encryption.ts:80-94` | A decifragem usa `subtle.decrypt`, que lança erro se a tag de autenticação não conferir |
| C3 | `excalidraw-app/collab/Portal.tsx:85-102` | Todo payload de colaboração é serializado em JSON e cifrado antes do `emit` |
| C4 | `excalidraw-app/collab/Collab.tsx:469-489` | Quando a decifragem falha, o app mostra um `window.alert` e devolve `INVALID_RESPONSE` |
| C5 | `excalidraw-app/collab/Collab.tsx:602-604` | Uma mensagem `INVALID_RESPONSE` é descartada sem alterar a cena |
| C6 | `excalidraw-app/data/index.ts:170-188` | Leitura do link `#json` legado: se a decifragem com o IV embutido falha, tenta de novo com um IV fixo de zeros |

```ts
// C1: packages/excalidraw/data/encryption.ts:66-75
  // We use symmetric encryption. AES-GCM is the recommended algorithm and
  // includes checks that the ciphertext has not been modified by an attacker.
  const encryptedBuffer = await window.crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv,
    },
    importedKey,
    buffer,
  );
```

```ts
// C4: excalidraw-app/collab/Collab.tsx:469-489
  private decryptPayload = async (
    iv: Uint8Array<ArrayBuffer>,
    encryptedData: ArrayBuffer,
    decryptionKey: string,
  ): Promise<ValueOf<SocketUpdateDataSource>> => {
    try {
      const decrypted = await decryptData(iv, encryptedData, decryptionKey);

      const decodedData = new TextDecoder("utf-8").decode(
        new Uint8Array(decrypted),
      );
      return JSON.parse(decodedData);
    } catch (error) {
      window.alert(t("alerts.decryptFailed"));
      console.error(error);
      return {
        type: WS_SUBTYPES.INVALID_RESPONSE,
      };
    }
  };
```

```ts
// C5: excalidraw-app/collab/Collab.tsx:602-604
        switch (decryptedData.type) {
          case WS_SUBTYPES.INVALID_RESPONSE:
            return;
```

```ts
// C6: excalidraw-app/data/index.ts:179-188
  try {
    // Buffer should contain both the IV (fixed length) and encrypted data
    const iv = buffer.slice(0, IV_LENGTH_BYTES);
    const encrypted = buffer.slice(IV_LENGTH_BYTES, buffer.byteLength);
    decrypted = await decryptData(new Uint8Array(iv), encrypted, decryptionKey);
  } catch (error: any) {
    // Fixed IV (old format, backward compatibility)
    const fixedIv = new Uint8Array(IV_LENGTH_BYTES);
    decrypted = await decryptData(fixedIv, buffer, decryptionKey);
  }
```

### 4.2 Arquivos de apoio

| # | Arquivo | Tipo | O que mostra |
| --- | --- | --- | --- |
| E1 | `aplicacao/packages/excalidraw/tests/avaliacao/adulteracao.test.ts` | teste | Controle, 200 adulterações em 5 grupos e observação de replay |
| E2 | `aplicacao/packages/excalidraw/tests/avaliacao/prng.ts` | código | PRNG com semente (mulberry32) usado para sortear posições e bits |
| E3 | `aplicacao/packages/excalidraw/tests/avaliacao/fixtures/cena-s-m5.json` | cena | Payload real com 4 elementos |
| E4 | `S-M5_vitest_2026-11-14.txt` | saída de comando | Execução do teste: 200 ÷ 200 rejeitadas, controle 0 ÷ 40 e replay aceito |
| E5 | `S-M5_verificacao-versao_2026-11-14.txt` | saída de comando | Hash dos 4 arquivos citados igual ao do upstream `e7b5346` |
| E6 | `S-M5_snippet-janela-A.js` e `S-M5_snippet-janela-B.js` | scripts | Captura das mensagens válidas e injeção das adulteradas (A); contagem dos alertas e fotos da cena (B) |
| E7 | `S-M5_contagem-e2e_2026-11-14.txt` | registro | As 21 adulterações (modo, byte e bit), os 21 alertas com horário, as fotos da cena e o replay |
| E8 | `S-M5_alerta-janela-B_2026-11-14.png` | print | Janela B com o alerta "Não foi possível descriptografar os dados." e a cena intacta |
| E9 | `S-M5_cena-intacta_2026-11-14.png` | print | Janela B depois das 21 adulterações: 21 erros em `decryptData` (`encryption.ts:86`), `alertas.length = 21` e cena igual à de antes |
| E10 | `S-M5_replay-janela-B_2026-11-14.png` | print | Janela B antes e depois do replay: a cena não volta à versão antiga e a contagem continua em 21 |

### 4.3 Buscas sem resultado

| O que se procurou | Onde / comando | Resultado |
| --- | --- | --- |
| Dados adicionais autenticados (AAD) na cifra | `git grep -n "additionalData" -- packages/excalidraw/data excalidraw-app` | Nenhuma ocorrência: a cifra não vincula a mensagem à sala nem a um contador |
| Contador ou número de sequência contra replay | leitura de C1, C3 e `Collab.tsx:589-716` | Nenhum: a mensagem leva só o IV e o texto cifrado |

## 5. Resultado

### 5.1 Dados brutos

| Grupo | Injetadas | Rejeitadas |
| --- | --- | --- |
| `bit-cifrado` | 40 | 40 |
| `bit-tag` | 40 | 40 |
| `bit-iv` | 40 | 40 |
| `tamanho` | 40 | 40 |
| `chave-ou-iv-trocado` | 40 | 40 |
| **Total (teste automatizado)** | **200** | **200** |

| Ponta a ponta (grupo) | Injetadas (A) | Rejeitadas (alertas na B) |
| --- | --- | --- |
| `bit-cifrado` | 4 | 4 |
| `bit-tag` | 5 | 5 |
| `bit-iv` | 4 | 4 |
| `truncar` | 4 | 4 |
| `iv-de-outra-msg` | 4 | 4 |
| **Total (ponta a ponta)** | **21** | **21** |

No `bit-tag` entraram 5 injeções: 1 para o print do alerta e mais 4. As injeções 10 e 13 (`bit-iv`) sortearam o mesmo byte e bit, e as duas foram enviadas e contadas. Os horários de cada injeção na A e de cada alerta na B batem um a um, com 2 a 4 ms de diferença (E7).

| Controle e observação | Resultado |
| --- | --- |
| Mensagens sem adulteração (controle, automatizado) | 40 enviadas, 0 rejeitadas, todas idênticas ao original |
| Controle do canal (ponta a ponta) | Os 2 retângulos desenhados na A apareceram na B |
| Cena da B antes e depois das 21 adulterações | Idêntica: `…eG:33:146,218 \| …ehb:33:150,424` |
| Mesma mensagem válida decifrada duas vezes (automatizado) | Aceita nas duas vezes |
| Replay pelo socket de mensagem válida antiga (retângulo na versão 33, depois de movido para a versão 51) | Sem alerta e sem efeito: a cena da B continuou na versão 51, na nova posição |

### 5.2 Cálculo

```text
teste automatizado: 200 ÷ 200 = 100%
ponta a ponta:       21 ÷ 21  = 100%
S-M5 = (200 + 21) ÷ (200 + 21) = 221 ÷ 221 = 100%
```

### 5.3 Pontuação

| Valor medido | Regra da métrica | Pontuação (0–2) |
| --- | --- | --- |
| 100% (221 ÷ 221) | 2 = 100%; 1 = ≥ 90% e < 100%; 0 = < 90% | **2** |

**Justificativa:** todas as 221 adulterações foram rejeitadas, nos cinco tipos: texto cifrado, tag, IV, tamanho e chave ou IV trocados. O AES-GCM autentica o texto cifrado e o IV, então qualquer alteração faz a decifragem falhar (C1 e C2). No app real, cada mensagem adulterada gerou um erro em `decryptData` e um alerta, e foi descartada sem alterar a cena (C4, C5, E9).

## 6. Observações e limitações

- **O1. Não há proteção contra replay.** A mesma mensagem válida é aceita quantas vezes for reenviada (seção 5.1). A cifra não usa AAD nem contador, e a mensagem não leva número de sequência (seção 4.3). Quem tiver uma mensagem antiga e o ID da sala pode reenviá-la, sem precisar da chave. O efeito na cena depende da reconciliação, que descarta elementos com versão menor ou igual à local (`packages/excalidraw/data/reconcile.ts:23-44`). No teste ponta a ponta, o replay de uma mensagem antiga chegou à janela B sem alerta, mas não teve efeito: o retângulo estava na versão 51 e a mensagem trazia a versão 33 (seção 5.1, E10). O replay só teria efeito se o destinatário ainda não tivesse uma versão mais nova do elemento, por exemplo um participante que entrou na sala depois. Impacto estimado: baixo. A observação não entra na taxa, porque o replay não é adulteração do texto cifrado.
- **O2. Cada mensagem inválida abre um `window.alert` bloqueante** (C4). O servidor de sala só retransmite e não conhece a chave. Então qualquer cliente que saiba o ID da sala, que trafega em claro no `join-room` (`Portal.tsx:45`, ver S-M1), pode enviar lixo e fazer cada participante receber um alerta por mensagem. Isso trava a interação até o alerta ser fechado. A integridade da cena se mantém, porque a mensagem é descartada, mas a disponibilidade da sessão fica afetada.

**Confirmado no teste ponta a ponta:** as 21 mensagens inválidas geraram 21 alertas na B, quatro deles no mesmo intervalo de 4 ms (E7). O primeiro bloqueou a janela até o clique em OK (E8). Sem o contador do script, seriam 21 caixas de diálogo seguidas.

As mensagens injetadas foram montadas sem usar a chave: são cópias adulteradas de texto cifrado, enviadas só com o ID da sala. Isso mostra que o servidor retransmite qualquer conteúdo endereçado à sala. Impacto estimado: médio para a sessão afetada.
- **O3. IV fixo no link `#json` legado** (C6). Na leitura de links antigos, se a decifragem com o IV embutido falha, o app tenta de novo com um IV fixo de zeros. A segunda tentativa também é autenticada, então uma adulteração continua sendo rejeitada. O IV fixo só aparece nesse caminho de compatibilidade de leitura, não na colaboração atual. Impacto estimado: baixo.
- **O4. Escopo de cada fonte.** O teste automatizado exercita a mesma função de decifragem que o app usa (`decryptData`), mas não passa pelo socket nem pela interface. O teste ponta a ponta cobre esse caminho com o servidor de sala local, mas com uma amostra menor (21) e sem o modo de chave trocada.
- **O5. Ambiente.** O Vitest roda em jsdom com o Web Crypto do Node 24. No navegador, o AES-GCM é o do Chromium (Helium), e o teste ponta a ponta mostrou o mesmo comportamento.
- **O6. Instrumentação.** Na janela B, o `window.alert` foi trocado por um contador depois do primeiro alerta. O script não altera a decifragem nem a cena; só evita 20 caixas de diálogo seguidas.
- Nenhum teste foi feito contra o excalidraw.com, o Firebase público ou o backend de IA.

## 7. Achado (preencher só se a pontuação for 0)

Não se aplica: a pontuação é 2. As observações O1 e O2 ficam como pontos de atenção e entram nas recomendações da característica.

| Observação | Recomendação |
| --- | --- |
| O1 (replay) | Incluir um contador ou o ID da sala como AAD na cifra e descartar mensagens com número de sequência repetido |
| O2 (alerta bloqueante) | Trocar o `window.alert` por um aviso não bloqueante (toast) e limitar a frequência dos avisos de falha de decifragem |

## 8. Contribuição para a questão

| Questão | Esta métrica indica que a hipótese foi | Por quê |
| --- | --- | --- |
| S-Q3 | confirmada para adulteração (a parte de edição simultânea é a S-M6) | Todas as 221 adulterações foram rejeitadas e descartadas sem alterar a cena. O replay de mensagem válida não é detectado pela cifra, mas não teve efeito porque a reconciliação descartou a versão antiga (O1). |
