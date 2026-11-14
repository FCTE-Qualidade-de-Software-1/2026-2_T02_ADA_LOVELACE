# Evidência S-M6 : Inconsistências após edições simultâneas

## 1. Identificação

| Campo | Valor |
| --- | --- |
| Métrica | S-M6 : Inconsistências entre participantes após N edições simultâneas |
| Questão (S-Q) | S-Q3 : Integridade |
| Tarefa do plano | T1.4 (ver `tarefas-seguranca-excalidraw.md`) |
| Issue | #58 |
| Responsável | João Pedro Lopes da Cruz |
| Data(s) da coleta | 2026-11-14 (teste automatizado e teste com 3 janelas) |
| Versão avaliada | Excalidraw `e7b5346` (snapshot em `aplicacao/`) |
| Revisado por | `<preencher>` em `<AAAA-MM-DD>` |

## 2. O que foi medido

A métrica conta em quantas rodadas de edição simultânea os participantes terminam com cenas diferentes.

**Critério de inconsistência:** só conta a divergência que **continua depois da ressincronização completa**. No app, essa ressincronização envia a cena inteira no máximo a cada 20 s, e só depois de uma edição local (C4). Por isso a cena foi comparada 30 s depois do fim das edições. Nas rodadas 6 a 10, também 2 min depois, para ver se a divergência persiste. A divergência que some na ressincronização é **temporária** e não conta.

**Fonte da nota:** o teste com 3 janelas no app real, em 8 rodadas concorrentes. O teste automatizado explica o mecanismo e mostra a frequência num modelo (seção 6, O7).

## 3. Procedimento

### 3.1 Testes existentes

Rodei os testes de reconciliação e de colaboração que já vêm com o Excalidraw:

- `reconcile.test.ts`: **2 de 2 passaram**.
- `collab.test.tsx`: **não carregou neste ambiente**. Ele importa `tests/helpers/api.ts:67`, que chama `util.promisify`, e o módulo `util` carregado pelo Vitest/jsdom não tem essa função (`TypeError: default.promisify is not a function`).

A falha é do ambiente (Node v24.12.0 no Windows com Vitest 3.0.6), não do código avaliado. O mesmo acontece com outros testes que importam esse helper, por exemplo `clipboard.test.tsx`. A saída está em `S-M6_vitest-existentes_2026-11-14.txt`.

### 3.2 Teste com 3 janelas (app real)

O ambiente foi o de `evidencias/ambiente/ambiente-local.md`:

- app em `localhost:3001`;
- servidor de sala `excalidraw-room` `03ff435` em Docker, na porta 3002;
- navegador Helium (Chromium): A em janela normal, B e C em janelas anônimas, as três lado a lado e visíveis.

1. Na A: **Live collaboration** → **Start session**. Abri o link na B e na C e desenhei **1 retângulo** (o alvo).
2. Colei `S-M6_snippet-janelas.js` no console das 3 janelas.
3. `__sm6.rodar(n)` agenda o início para o próximo múltiplo de 30 s do relógio, para as 3 janelas começarem no mesmo instante. Durante 30 s, a cada 100 ms, o script move o alvo como uma edição do app: `version + 1`, `versionNonce` novo e `updateScene`, que passa pelo `onChange` e envia a mudança aos outros. Cada janela fez 299 edições por rodada.
4. Ao terminar, cada janela calcula sozinha a **assinatura** da cena: a lista `id:version:versionNonce:x:y` e o SHA-256 dela. São três momentos: `fim` (logo ao terminar), `final` (30 s depois) e `2min` (só nas rodadas 6 a 10).
5. **Rodada 0 (controle):** só a A editou. A B e a C receberam as edições, e as 3 janelas terminaram iguais.
6. Fiz as rodadas 1 a 3 com a primeira versão do script, sem a assinatura de 2 min (`S-M6_rodadas-exploratorias_2026-11-14.txt`).
7. Fiz as rodadas 6 a 10 com a versão final do script (`S-M6_rodadas-2min_2026-11-14.txt`).
8. A rodada 4 tinha a B e a C editando com o script e a A arrastando o alvo com o mouse. Foi descartada, porque a B e a C começaram com 30 s de diferença e não editaram ao mesmo tempo. A rodada 5 repetiria esse formato e não foi feita. As rodadas com a versão final do script foram numeradas a partir de 6, para não se misturarem com as exploratórias.

### 3.3 Teste automatizado

`aplicacao/packages/excalidraw/tests/avaliacao/concorrencia.test.ts`, com PRNG de semente 58 (`tests/avaliacao/prng.ts`) e `reseed(58)` no gerador do Excalidraw.

1. **Cena e réplicas:** 5 elementos, um deles o `alvo`. 3 réplicas (A, B e C), 30 edições por rodada e 500 rodadas.
2. **Edições:** metade cai no `alvo`. Cada edição faz `version + 1` e sorteia um `versionNonce` novo, como `bumpVersion` (C5).
3. **Entrega fora de ordem:** o destinatário e a mensagem da fila são sorteados.
4. **Elemento em edição:** em 20% das entregas, o destinatário está redimensionando o alvo (C1).
5. **Comparação:** depois de todas as entregas e depois de uma ressincronização completa, em que cada réplica envia a cena inteira às outras.
6. **Dois modelos de recebimento:**
   - **reconciliação pura:** só `reconcileElements` (C1 e C2);
   - **caminho do app:** `reconcileElements` seguido de `bumpElementVersions`, como `Collab._reconcileElements` (C8 e C9).
7. **Testes:**
   - controle: sem concorrência, uma edição de A chega igual a B e C;
   - teste sem elemento em edição;
   - **reprodução** mínima do mecanismo encontrado no teste com 3 janelas;
   - **edição posterior:** depois da divergência, uma edição não concorrente da A, nos dois casos de desempate.

### 3.4 Comandos executados

```bash
# 2026-11-14, pasta aplicacao/
yarn test:app --watch=false packages/excalidraw/tests/data/reconcile.test.ts excalidraw-app/tests/collab.test.tsx
yarn test:app --watch=false packages/excalidraw/tests/avaliacao/concorrencia.test.ts
```

```text
reconciliação pura:  divergentesAntesResync 175 | divergentesFinal 0   (500 rodadas)
sem elemento em edição: 0 de 500 rodadas divergentes antes da ressincronização
reprodução: A 10:100 | B 11:780759674
edição posterior, caso 1: A x=50 v11 | B x=5 v11
edição posterior, caso 2: A x=50 v11 | B x=50 v12
caminho do app:      divergentesAntesResync 471 | divergentesFinal 257 (500 rodadas, 51,4%)
Tests  6 passed (6)
```

Os oito arquivos citados foram comparados por hash com o upstream no commit `e7b534668a60add7f725531f3c9abf32508c7b4e`, e todos são idênticos (`S-M6_verificacao-versao_2026-11-14.txt`).

## 4. Evidências

### 4.1 Trechos de código

| # | Arquivo:linha | O que mostra |
| --- | --- | --- |
| C1 | `packages/excalidraw/data/reconcile.ts:23-44` | Regra de desempate: o elemento local em edição nunca é sobrescrito; fora isso, vence a maior `version` e, no empate, o menor `versionNonce` |
| C2 | `packages/excalidraw/data/reconcile.ts:73-118` | Junção: aplica a regra elemento a elemento |
| C3 | `excalidraw-app/collab/Portal.tsx:151-153` | Comentário dos autores: a ressincronização completa existe para que ninguém fique divergente |
| C4 | `excalidraw-app/collab/Collab.tsx:970-999` e `app_constants.ts:6` | A ressincronização completa só é agendada quando há envio de edição local, e no máximo a cada 20 s |
| C5 | `packages/element/src/mutateElement.ts:188-197` | `bumpVersion`: `version + 1` e um `versionNonce` aleatório novo |
| C6 | `packages/common/src/random.ts:9` | `randomInteger` sorteia em [0, 2³¹) |
| C7 | `excalidraw-app/data/firebase.ts:209-241` | A gravação no Firestore roda numa transação e reconcilia com a cena salva |
| C8 | `excalidraw-app/collab/Collab.tsx:772-803` | Ao receber, o app reconcilia e em seguida chama `bumpElementVersions`; a versão resultante é marcada como já recebida e não é retransmitida |
| C9 | `packages/excalidraw/data/restore.ts:1154-1187` | `bumpElementVersions` sobe para `local + 1` (com `versionNonce` novo) todo elemento cuja versão local seja maior ou igual com outro `versionNonce`. O comentário diz que a função **não** deveria ser usada em atualizações da colaboração |

```ts
// C8: excalidraw-app/collab/Collab.tsx:772-803
  private _reconcileElements = (
    remoteElements: readonly RemoteExcalidrawElement[],
  ): ReconciledExcalidrawElement[] => {
    const appState = this.excalidrawAPI.getAppState();

    const existingElements = this.getSceneElementsIncludingDeleted();

    // NOTE ideally we restore _after_ reconciliation but we can't do that
    // as we'd regenerate even elements such as appState.newElement which would
    // break the state
    remoteElements = restoreElements(remoteElements, existingElements);

    let reconciledElements = reconcileElements(
      existingElements,
      remoteElements,
      appState,
    );

    reconciledElements = bumpElementVersions(
      reconciledElements,
      existingElements,
    );

    // Avoid broadcasting to the rest of the collaborators the scene
    // we just received!
    // Note: this needs to be set before updating the scene as it
    // synchronously calls render.
    this.setLastBroadcastedOrReceivedSceneVersion(
      getSceneVersion(reconciledElements),
    );

    return reconciledElements;
  };
```

```ts
// C9: packages/excalidraw/data/restore.ts:1154-1163 (comentário de bumpElementVersions)
/**
 * When replacing elements that may exist locally, this bumps their versions
 * to the local version + 1. Mainly for later reconciliation to work properly.
 *
 * See https://github.com/excalidraw/excalidraw/issues/3795
 *
 * Generally use this on editor boundaries (importing from file etc.), though
 * it does not apply universally (e.g. we don't want to do this for collab
 * updates).
 */
```

```ts
// C1: packages/excalidraw/data/reconcile.ts:23-44
export const shouldDiscardRemoteElement = (
  localAppState: AppState,
  local: OrderedExcalidrawElement | undefined,
  remote: RemoteExcalidrawElement,
): boolean => {
  if (
    local &&
    // local element is being edited
    (local.id === localAppState.editingTextElement?.id ||
      local.id === localAppState.resizingElement?.id ||
      local.id === localAppState.newElement?.id ||
      // local element is newer
      local.version > remote.version ||
      // resolve conflicting edits deterministically by taking the one with
      // the lowest versionNonce
      (local.version === remote.version &&
        local.versionNonce <= remote.versionNonce))
  ) {
    return true;
  }
  return false;
};
```

### 4.2 Arquivos de apoio

| # | Arquivo | Tipo | O que mostra |
| --- | --- | --- | --- |
| E1 | `S-M6_snippet-janelas.js` | script | Edição concorrente sincronizada e assinaturas da cena |
| E2 | `S-M6_rodadas-exploratorias_2026-11-14.txt` | registro | Rodadas 0 a 4 (relatório das 3 janelas); na rodada 1, a cena divergente com as linhas completas |
| E3 | `S-M6_rodadas-2min_2026-11-14.txt` | registro | Rodadas 6 a 10 com as linhas completas em `fim`, `final` e `2min` |
| E4 | `S-M6_rodada8-divergente_2026-11-14.png` | print | Consoles das 3 janelas: B em 7262 e A e C em 7261 no `final` e no `2min` |
| E5 | `S-M6_rodada10-consistente_2026-11-14.png` | print | Consoles das 3 janelas: rodada 10 com o mesmo hash no `final` e no `2min` |
| E6 | `aplicacao/packages/excalidraw/tests/avaliacao/concorrencia.test.ts` | teste | Reconciliação pura, caminho do app, reprodução do mecanismo e perda de uma edição posterior |
| E7 | `S-M6_vitest-concorrencia_2026-11-14.txt` | saída de comando | Execução do teste automatizado (6 testes) |
| E8 | `S-M6_vitest-existentes_2026-11-14.txt` | saída de comando | `reconcile.test.ts` 2/2; `collab.test.tsx` não carrega (ambiente) |
| E9 | `S-M6_verificacao-versao_2026-11-14.txt` | saída de comando | Hash dos 8 arquivos citados igual ao do upstream `e7b5346` |

### 4.3 Buscas sem resultado

| O que se procurou | Onde / comando | Resultado |
| --- | --- | --- |
| Ressincronização periódica independente de edição local | `git grep -n "SYNC_FULL_SCENE_INTERVAL_MS\|setInterval" -- excalidraw-app/collab` | Só os `throttle` de `Collab.tsx:987-999` (envio) e `:1001-1012` (Firebase), ambos acionados por edição local. Os dois `setInterval` (`:841` e `:861`) só reportam o estado de presença (`reportActive`) |
| Aviso ao usuário quando a edição dele perde para a de outro participante | leitura de C1, C2 e `Collab.tsx:589-716` | Nenhum: o elemento remoto substitui o local sem aviso |

## 5. Resultado

### 5.1 Dados brutos

**Teste com 3 janelas (app real):**

| Rodada | Concorrente | `final` (30 s depois do fim) | `2min` | Inconsistente? |
| --- | --- | --- | --- | --- |
| 0 | não (só a A, controle) | A = B = C | não medido | não (controle) |
| 1 | sim | A 880:157834071, B 879:979519135, C 880:1081316812 | não medido | **sim** |
| 2 | sim | A = B = C (v1412) | não medido | não |
| 3 | sim | A = B = C (v3213) | não medido | não |
| 4 | não (B e C defasadas em 30 s) | descartada | descartada | descartada |
| 6 | sim | A = B = C (v6202) | igual | não |
| 7 | sim | A = B = C (v6733) | igual | não |
| 8 | sim | A 7261:416376951, B **7262**:1710286577, C 7261:416376951 | **igual ao `final`** (persistiu) | **sim** |
| 9 | sim | A = B = C (v7799) | igual | não |
| 10 | sim | A = B = C (v8325) | igual | não |

Nas duas rodadas inconsistentes, a posição do alvo era a mesma em todas as janelas no momento da assinatura. A divergência é de **versão** (`version` e `versionNonce`). Ela decide como as próximas edições do elemento serão aceitas em cada participante e pode fazer uma edição posterior se perder (O1).

Nas rodadas consistentes com diferença no `fim`:

- **rodadas 7 e 9:** a B terminou uma versão à frente, porque a última mensagem dela ainda estava a caminho, e a A e a C a alcançaram;
- **rodada 10:** a A e a C terminaram empatadas em 8324. A C perdeu o desempate e subiu para 8325. A ressincronização completa da C, que disparou depois disso, levou a versão 8325 à A e à B. É o mesmo mecanismo da rodada 8, mas com a ressincronização acontecendo depois da subida de versão.

**Teste automatizado (500 rodadas por modelo):**

| Modelo | Divergentes antes da ressincronização | Divergentes depois (inconsistências) |
| --- | --- | --- |
| Reconciliação pura, 20% das entregas com o destinatário editando | 175 | 0 |
| Reconciliação pura, sem elemento em edição | 0 | 0 |
| **Caminho do app** (reconciliação + `bumpElementVersions`) | 471 | **257 (51,4%)** |

### 5.2 Cálculo

```text
teste com 3 janelas: rodadas concorrentes válidas = 8 (1, 2, 3, 6, 7, 8, 9, 10)
                     inconsistências finais       = 2 (rodadas 1 e 8)
S-M6 = 2
```

### 5.3 Pontuação

| Valor medido | Regra da métrica | Pontuação (0–2) |
| --- | --- | --- |
| 2 inconsistências em 8 rodadas concorrentes no app real | 2 = 0; 1 = 1 a 2; 0 = ≥ 3 | **1** |

**Justificativa:** em 2 das 8 rodadas, os participantes terminaram com versões diferentes do mesmo elemento. Na rodada 8, a diferença continuava 2 min depois, sem novas edições.

A causa é a etapa `bumpElementVersions` do recebimento (C8 e C9):

1. Quem perde um desempate de versão adota o elemento vencedor, mas sobe a versão dele com um `versionNonce` novo.
2. Essa versão não sai como atualização incremental. Ela só chega aos outros se a ressincronização completa dessa janela disparar **depois** da subida de versão. Essa ressincronização é um `throttle` de 20 s com chamada final, acionado só por edição local (C4).
3. Na rodada 10, a ressincronização da C veio depois, e as 3 janelas convergiram. Na rodada 8, a subida de versão da B veio depois da última ressincronização dela, e nada mais corrigiu a diferença sem uma nova edição.

A regra de desempate em si (C1) converge. O problema está na camada do app.

**Por que a nota não soma o teste automatizado, ao contrário da S-M5:** na S-M5, as duas fontes medem a mesma coisa (a decifragem real de mensagens adulteradas) e concordam. Na S-M6, o teste automatizado é um modelo, e a contagem dele depende do número de rodadas e dos parâmetros escolhidos (O7). Por isso ele serve para explicar e reproduzir o mecanismo, não para contar. **Ponto para decisão do grupo (#77):** o roteiro não fixa o N da métrica. Com mais rodadas, a contagem tende a crescer: no modelo do caminho do app, 51% das rodadas terminam inconsistentes. Se o grupo considerar também o teste automatizado do caminho do app, a contagem passa de 3 e a nota seria **0**.

## 6. Observações e limitações

- **O1. Divergência persistente de versão, que pode virar perda de edição** (seção 5.1, rodadas 1 e 8). Mecanismo descrito na justificativa e reproduzido no teste automatizado (`reprodução: A 10:100 | B 11:780759674`).
  - **Consequência mostrada no teste:** depois da divergência, a A move o elemento sozinha, **sem nenhuma edição concorrente** (versão 11). A edição empata com a versão 11 que a B criou ao receber. Há dois casos:
    - se o `versionNonce` da A for maior, a B descarta a edição e continua com o conteúdo antigo (`caso 1: A x=50 v11 | B x=5 v11`);
    - se for menor, a B aceita o conteúdo, mas sobe a versão de novo (`caso 2: B x=50 v12`), e a divergência se repete.
  - **Chance e alcance:** cada caso tem cerca de 50% de chance. Nas ressincronizações seguintes da A, a B descarta da mesma forma. A A e a C passam a ver a nova posição, e a B continua na antiga, sem aviso, até a própria B editar o elemento.
  - Impacto estimado: médio a alto, porque o conteúdo diverge de forma silenciosa e persistente, mas depende de um empate anterior no mesmo elemento.
- **O2. Divergência temporária.** Nas rodadas 7, 9 e 10, as janelas terminaram em versões diferentes e convergiram na ressincronização: nas rodadas 7 e 9 por uma mensagem ainda a caminho, e na rodada 10 pelo mecanismo de O1, corrigido a tempo.
  - **No modelo automatizado:** com reconciliação pura, 35% das rodadas divergem antes da ressincronização quando o destinatário está editando o elemento (a regra C1 não o sobrescreve).
  - **Essa causa não ocorreu no teste com janelas:** o script não usa redimensionamento nem criação de elemento.
  - Impacto estimado: baixo.
- **O3. Perda silenciosa de atualização.** Quando dois participantes editam o mesmo elemento ao mesmo tempo, vale uma das edições e o autor da outra não recebe aviso (seção 4.3). **Mover** um elemento não é protegido pela regra de edição local, que só cobre texto em edição, redimensionamento e criação (C1). Na rodada 4, enquanto a A arrastava o alvo e outra janela o editava, o retângulo **piscava** na A entre a posição do arraste e a posição remota. Impacto estimado: baixo a médio, conforme o uso.
- **O4. Colisão de `versionNonce` (teórica).** Duas edições com a mesma `version` e o mesmo `versionNonce` e conteúdo diferente nunca convergiriam. A chance por empate é de 1 em 2³¹ (C6).
- **O5. Escopo do teste com 3 janelas.** O teste tem 1 elemento, edições por script (`updateScene`) a cada 100 ms e 3 janelas no mesmo computador e no mesmo servidor local. A frequência real depende de quantas pessoas editam o mesmo elemento ao mesmo tempo. O Firestore estava ativo, mas a assinatura compara só a cena em memória de cada janela.
- **O6. Rodadas exploratórias.** As rodadas 1 a 3 usaram a primeira versão do script, sem a assinatura de 2 min. A rodada 1 conta pelo critério de 30 s, mas sua persistência não foi medida.
  - **Rodada 3:** foi executada mais de uma vez. Nas execuções anteriores, as janelas não começaram juntas: os consoles mostram a A terminando na versão 2240, a B e a C na 2687, e um `r3-final` da C na 1942. Por isso a rodada foi repetida.
  - **O que conta:** só a execução das 14:19:30, iniciada nas 3 janelas no mesmo horário, entra na contagem. As assinaturas das execuções anteriores foram sobrescritas no registro (o script guardava por nome). Como nelas as janelas não editaram juntas, elas não são rodadas concorrentes válidas.
- **O7. Modelo do teste automatizado.** A ressincronização foi modelada como um único envio da cena inteira por cada réplica, depois das entregas. A taxa de 51,4% depende desse modelo e dos parâmetros (5 elementos, 30 edições). Por isso o teste mostra o mecanismo e a ordem de grandeza, e a nota vem do app real.
- **O8.** O `collab.test.tsx` não pôde ser executado neste ambiente (seção 3.1). O resultado não depende dele.
- **O9.** As regras abertas do Firestore (`firestore.rules`: `allow get, write: if true`) estão registradas na S-M3 e não são duplicadas aqui.
- Nenhum teste foi feito contra o excalidraw.com, o Firebase público ou o backend de IA. Os prints foram recortados sem a barra de endereço.

## 7. Achado (preencher só se a pontuação for 0)

A pontuação é 1, mas O1 é um defeito reproduzível de integridade e vai para a tabela de achados da GitPage:

| ID | Métrica | Evidência reproduzível | Pontuação | Impacto (Baixo/Médio/Alto) | Recomendação |
| --- | --- | --- | --- | --- | --- |
| A-S-M6-3 | S-M6 | C8, C9, E3 (rodada 8), E4 e os testes `reprodução` e `edição posterior` em E6 | 1 | Médio a alto | Não aplicar `bumpElementVersions` ao reconciliar atualizações recebidas da colaboração, como o próprio comentário da função indica, ou retransmitir a versão gerada no recebimento |

## 8. Contribuição para a questão

| Questão | Esta métrica indica que a hipótese foi | Por quê |
| --- | --- | --- |
| S-Q3 | parcialmente confirmada | A regra de reconciliação converge, mas no app real 2 de 8 rodadas concorrentes terminaram com versões diferentes entre os participantes, e numa delas a diferença persistiu sem novas edições. |
