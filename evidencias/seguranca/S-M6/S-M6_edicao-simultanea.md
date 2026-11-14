# Evidência S-M6 : Inconsistências após edições simultâneas

## 1. Identificação

| Campo | Valor |
| --- | --- |
| Métrica | S-M6 : Inconsistências entre participantes após N edições simultâneas |
| Questão (S-Q) | S-Q3 : Integridade |
| Tarefa do plano | T1.4 (ver `tarefas-seguranca-excalidraw.md`) |
| Issue | #58 |
| Responsável | João Pedro Lopes da Cruz |
| Data(s) da coleta | 2026-11-14 (teste automatizado); teste manual com 3 janelas `<pendente>` |
| Versão avaliada | Excalidraw `e7b5346` (snapshot em `aplicacao/`) |
| Revisado por | `<preencher>` em `<AAAA-MM-DD>` |

## 2. O que foi medido

A métrica conta em quantas rodadas de edição simultânea os participantes terminam com cenas diferentes. A reconciliação usada é a mesma do app (`reconcileElements`).

**Critério de inconsistência:** só conta a divergência que **continua depois da ressincronização completa**. No app, essa ressincronização envia a cena inteira no máximo a cada 20 s enquanto há edições, e mais uma vez depois que elas param (C4). A divergência que some na ressincronização é **temporária**. Ela é registrada à parte e não conta para a métrica.

A medição tem duas fontes:

1. um teste automatizado com 500 rodadas, 3 réplicas e entrega fora de ordem, que é a base da nota;
2. um teste manual com 3 janelas na instância local (`<pendente, Tarefa 4 do plano>`).

## 3. Procedimento

### 3.1 Testes existentes

Rodei os testes de reconciliação e de colaboração que já vêm com o Excalidraw:

- `reconcile.test.ts`: **2 de 2 passaram**.
- `collab.test.tsx`: **não carregou neste ambiente**. Ele importa `tests/helpers/api.ts:67`, que chama `util.promisify`, e o módulo `util` carregado pelo Vitest/jsdom não tem essa função (`TypeError: default.promisify is not a function`).

A falha é do ambiente (Node v24.12.0 no Windows com Vitest 3.0.6), não do código avaliado. Outros testes que importam o mesmo helper falham do mesmo jeito, por exemplo `clipboard.test.tsx`. A saída completa está em `S-M6_vitest-existentes_2026-11-14.txt`.

### 3.2 Teste automatizado

1. Criei `aplicacao/packages/excalidraw/tests/avaliacao/concorrencia.test.ts`, que usa a função real `reconcileElements` de `packages/excalidraw/data/reconcile.ts` (C1 e C2). Os sorteios vêm de um PRNG com semente fixa (mulberry32, semente 58, `tests/avaliacao/prng.ts`).
2. **Cena base:** 5 elementos (`alvo`, `e1` a `e4`), com índices fracionários válidos (`syncInvalidIndices`). As 3 réplicas (A, B e C) começam com cópias da mesma cena.
3. **Edições:** cada rodada tem 30 edições, 10 por réplica. Metade cai no `alvo` e o resto num elemento sorteado entre `e1` e `e4`. Cada edição faz `version + 1`, sorteia um `versionNonce` em [0, 2³¹) e muda `x`, como `bumpVersion` (C5) e `randomInteger` (C6). A mensagem enviada leva o elemento editado, como as atualizações incrementais do app.
4. **Concorrência:** as edições e as entregas se intercalam ao acaso. Cada mensagem vai para as outras duas réplicas e é entregue **fora de ordem**: o destinatário e a mensagem da fila são sorteados.
5. **Elemento em edição:** em 20% das entregas, o destinatário está redimensionando o `alvo` (`appState.resizingElement`). Nesse caso o app nunca sobrescreve o elemento local (C1).
6. **Comparação:** a assinatura de cada réplica é a lista ordenada de `id:version:versionNonce:x`. Comparei as assinaturas em dois momentos:
   - depois de todas as entregas ("antes da ressincronização");
   - depois de simular a ressincronização completa, em que cada réplica envia a cena inteira às outras sem elemento em edição ("final").
7. **Controle:** sem concorrência, uma edição de A chega idêntica a B e C.
8. **Causa da divergência temporária:** repeti as 500 rodadas sem o destinatário estar editando o alvo (probabilidade 0).
9. **Verificação do próprio teste:** rodei uma cópia temporária em que a réplica descartava toda mensagem recebida. As 500 rodadas divergiram e os 3 testes falharam. Isso mostra que as asserções detectam quando as réplicas não convergem. A cópia foi apagada depois.

### 3.3 Teste manual com 3 janelas

`<pendente, Tarefa 4 do plano: script de edição concorrente no alvo nas 3 janelas por 30 s, 5 rodadas, assinatura SHA-256 da cena 25 s depois do fim>`

### 3.4 Comandos executados

```bash
# 2026-11-14 13:34 -0300, pasta aplicacao/
yarn test:app --watch=false packages/excalidraw/tests/data/reconcile.test.ts excalidraw-app/tests/collab.test.tsx
# 2026-11-14 13:39 -0300
yarn test:app --watch=false packages/excalidraw/tests/avaliacao/concorrencia.test.ts
```

```text
semente: 58
réplicas: 3, edições por rodada: 30, P(alvo): 0.5, P(destinatário editando o alvo): 0.2
│ rodadas                │ 500  │
│ divergentesAntesResync │ 175  │
│ divergentesFinal       │ 0    │
│ descartesPorEdicao     │ 3014 │
S-M6 = 0 inconsistências finais
P(destinatário editando o alvo) = 0: 0 de 500 rodadas divergentes antes da ressincronização
Tests  3 passed (3)
```

As saídas completas estão em `S-M6_vitest-existentes_2026-11-14.txt` e `S-M6_vitest-concorrencia_2026-11-14.txt`.

Os sete arquivos citados abaixo foram comparados por hash com o upstream no commit `e7b534668a60add7f725531f3c9abf32508c7b4e`, e todos são idênticos (`S-M6_verificacao-versao_2026-11-14.txt`).

## 4. Evidências

### 4.1 Trechos de código

| # | Arquivo:linha | O que mostra |
| --- | --- | --- |
| C1 | `packages/excalidraw/data/reconcile.ts:23-44` | Regra de desempate: o elemento local em edição nunca é sobrescrito; fora isso, vence a maior `version` e, no empate, o menor `versionNonce` |
| C2 | `packages/excalidraw/data/reconcile.ts:73-118` | Junção: aplica a regra elemento a elemento e reordena pelo índice fracionário |
| C3 | `excalidraw-app/collab/Portal.tsx:151-153` | Comentário dos autores: a ressincronização completa periódica existe para que ninguém fique divergente |
| C4 | `excalidraw-app/collab/Collab.tsx:970-999` e `excalidraw-app/app_constants.ts:6` | Cada envio incremental agenda a ressincronização completa, limitada a uma a cada 20 s (`SYNC_FULL_SCENE_INTERVAL_MS = 20000`) |
| C5 | `packages/element/src/mutateElement.ts:188-197` | `bumpVersion`: cada edição faz `version + 1` e sorteia um novo `versionNonce` |
| C6 | `packages/common/src/random.ts:9` | `randomInteger` sorteia em [0, 2³¹) |
| C7 | `excalidraw-app/data/firebase.ts:209-241` | A gravação no Firestore roda numa transação e reconcilia com a cena já salva |

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

```ts
// C4: excalidraw-app/collab/Collab.tsx:970-979
  broadcastElements = (elements: readonly OrderedExcalidrawElement[]) => {
    if (
      getSceneVersion(elements) >
      this.getLastBroadcastedOrReceivedSceneVersion()
    ) {
      this.portal.broadcastScene(WS_SUBTYPES.UPDATE, elements, false);
      this.lastBroadcastedOrReceivedSceneVersion = getSceneVersion(elements);
      this.queueBroadcastAllElements();
    }
  };
```

### 4.2 Arquivos de apoio

| # | Arquivo | Tipo | O que mostra |
| --- | --- | --- | --- |
| E1 | `aplicacao/packages/excalidraw/tests/avaliacao/concorrencia.test.ts` | teste | Controle, 500 rodadas com 3 réplicas e o teste sem elemento em edição |
| E2 | `aplicacao/packages/excalidraw/tests/avaliacao/prng.ts` | código | PRNG com semente (mulberry32) |
| E3 | `S-M6_vitest-existentes_2026-11-14.txt` | saída de comando | `reconcile.test.ts` 2/2; `collab.test.tsx` não carrega (ambiente) |
| E4 | `S-M6_vitest-concorrencia_2026-11-14.txt` | saída de comando | 175 de 500 rodadas divergentes antes da ressincronização e 0 depois |
| E5 | `S-M6_verificacao-versao_2026-11-14.txt` | saída de comando | Hash dos 7 arquivos citados igual ao do upstream `e7b5346` |
| E6 | `S-M6_editor-concorrente.js` e `S-M6_assinatura.js` | scripts | `<pendente, Tarefa 4>` |
| E7 | `S-M6_assinaturas-rodada<N>_<data>.txt` | saída de console | `<pendente, Tarefa 4>` |
| E8 | `S-M6_tres-janelas_<data>.png` | print | `<pendente, Tarefa 4>` |

### 4.3 Buscas sem resultado

| O que se procurou | Onde / comando | Resultado |
| --- | --- | --- |
| Aviso ao usuário quando a edição dele perde para a de outro participante | leitura de C1, C2 e `Collab.tsx:589-716` (tratamento de `SCENE_UPDATE`) | Nenhum: o elemento remoto substitui o local sem aviso |

## 5. Resultado

### 5.1 Dados brutos

| Cenário (500 rodadas, 3 réplicas, 30 edições por rodada) | Rodadas divergentes antes da ressincronização | Rodadas divergentes depois (inconsistências) |
| --- | --- | --- |
| Destinatário editando o alvo em 20% das entregas | 175 (35%) | **0** |
| Destinatário nunca editando o alvo | 0 | 0 |
| Teste manual com 3 janelas (5 rodadas) | `<pendente>` | `<pendente>` |

No cenário com edição, 3014 mensagens sobre o `alvo` chegaram enquanto o destinatário o editava e foram descartadas pela exceção de C1.

### 5.2 Cálculo

```text
teste automatizado: inconsistências finais = 0 em 500 rodadas
nota final: inconsistências finais do automatizado + do manual = 0 + <pendente>
```

### 5.3 Pontuação

| Valor medido | Regra da métrica | Pontuação (0–2) |
| --- | --- | --- |
| 0 inconsistências finais em 500 rodadas (automatizado); manual `<pendente>` | 2 = 0; 1 = 1 a 2; 0 = ≥ 3 | **2** (parcial, confirmar com o teste manual) |

**Justificativa:** a regra de desempate (C1) define uma ordem total sobre as versões de cada elemento: maior `version` e, no empate, menor `versionNonce`. Por isso todas as réplicas que recebem as mesmas versões escolhem a mesma, em qualquer ordem de entrega. As divergências observadas vieram só da exceção do elemento em edição e sumiram na ressincronização completa.

## 6. Observações e limitações

- **O1. Divergência temporária de até cerca de 20 s.** Em 35% das rodadas, os participantes ficaram com cenas diferentes até a ressincronização completa. A causa é só a exceção do elemento em edição: sem ela, nenhuma rodada divergiu (seção 5.1). No app, a ressincronização completa roda no máximo a cada 20 s (C4). Então, enquanto alguém arrasta ou redimensiona um elemento que outro participante também alterou, cada um pode ver uma versão diferente por até cerca de 20 s depois que as edições param. Impacto estimado: baixo. A cena converge sozinha.
- **O2. Perda silenciosa de atualização.** Quando dois participantes editam o mesmo elemento ao mesmo tempo, uma das edições é descartada (vence a de maior versão, ou a de menor `versionNonce` no empate), e o autor da edição perdida não recebe aviso (seção 4.3). Isso não é inconsistência, porque todos convergem para a mesma cena, mas é perda de dado. Não foi quantificada. Impacto estimado: baixo a médio, conforme o uso.
- **O3. Colisão de `versionNonce` (teórica).** Se duas edições do mesmo elemento tiverem a mesma `version` **e** o mesmo `versionNonce` com conteúdo diferente, cada réplica mantém a sua (`<=` em C1), e a divergência fica permanente. A chance por empate é de 1 em 2³¹ (C6), por isso o caso é só teórico e não apareceu na medição.
- **O4. Escopo do teste automatizado.** O teste exercita a mesma função de reconciliação do app, mas sem socket, sem interface, sem perda de mensagem e sem o Firestore (C7). O teste manual da Tarefa 4 cobre o caminho real pelo socket.
- **O5. Modelo da ressincronização.** O teste simula uma ressincronização completa depois do fim das edições, sem elemento em edição. Se um participante continuar editando o mesmo elemento sem parar, a versão dele não é substituída enquanto a edição durar. O teste não modela esse caso.
- **O6.** O `collab.test.tsx` não pôde ser executado neste ambiente (seção 3.1). O resultado da métrica não depende dele.
- **O7.** As regras abertas do Firestore (`firestore.rules`: `allow get, write: if true`) permitem que quem souber o ID da sala sobrescreva a cena salva. Esse ponto está registrado na S-M3 e não é duplicado aqui.
- Nenhum teste foi feito contra o excalidraw.com, o Firebase público ou o backend de IA.

## 7. Achado (preencher só se a pontuação for 0)

Não se aplica: a pontuação é 2. As observações O1 e O2 ficam como pontos de atenção.

| Observação | Recomendação |
| --- | --- |
| O1 (divergência temporária) | Fazer uma ressincronização do elemento logo que a edição local termina, em vez de esperar até 20 s pela sincronização completa |
| O2 (perda silenciosa) | Avisar o participante quando a edição dele for substituída pela de outro, ou bloquear o elemento enquanto outro participante o edita |

## 8. Contribuição para a questão

| Questão | Esta métrica indica que a hipótese foi | Por quê |
| --- | --- | --- |
| S-Q3 | confirmada para edição simultânea (parcial até o teste manual) | Nenhuma das 500 rodadas terminou com cenas diferentes depois da ressincronização. As divergências temporárias (O1) e a perda silenciosa de atualização (O2) não violam a consistência final. |
