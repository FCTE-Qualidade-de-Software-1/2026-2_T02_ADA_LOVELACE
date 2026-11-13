# Evidência CI-M15 : Ações destrutivas sem confirmação

> Coleta automatizada concluída pelo Codex, issue [#71](https://github.com/FCTE-Qualidade-de-Software-1/2026-2_T02_ADA_LOVELACE/issues/71). Validação humana e revisão cruzada pendentes. Entrega local, sem push, PR ou merge.

## 1. Identificação

| Campo | Valor |
| --- | --- |
| Métrica | CI-M15 — Ações destrutivas sem confirmação |
| Tarefa do plano | Item CI-M15 de Tarefas no navegador; sem identificador T próprio |
| Objetivo | O5 — Compreensão, aprendizagem e operação da interface |
| Questão | CI-Q6 — O sistema evita e permite recuperar erros do usuário? Proteção contra erros do usuário |
| Responsável | Renato Araújo Gameiro (`renatoyx`); coleta automatizada e inspeção das capturas: Codex |
| Data da coleta final | 12/11/2026, 23:45:46–23:46:29, America/Sao_Paulo; JSON em UTC, dia 13/11 |
| Revisado por | Pendente de outro integrante |
| Validação manual | Pendente de Renato; não houve confirmação humana |
| Versão | Excalidraw oficial `e7b534668a60add7f725531f3c9abf32508c7b4e`, detached HEAD e checkout limpo |
| Ambiente | Windows NT 10.0.19045; Edge 157.0.4341.46 headless; Playwright 1.58.2; Node v22.23.3; Vite 5.0.12; viewport 1366 × 900, en-US |
| Origem | `http://127.0.0.1:3021/`, servidor iniciado pelo coletor na raiz oficial validada, porta exclusiva com strictPort |

## 2. O que foi medido

Contagem de tipos de operação destrutiva que puderam ser concluídos sem decisão preventiva explícita de confirmação. O [planejamento](../CI-M15-M16/CI-M15-M16_planejamento_2026-11-12.md) fixou quatro operações a partir do [plano da disciplina](../tarefas-capacidade-interacao.md): limpar canvas, abrir arquivo sobre cena existente, remover item selecionado e limpar a biblioteca inteira. Os dois escopos de biblioteca foram incluídos por afetarem, respectivamente, um subconjunto e toda a coleção. Não há denominador percentual nesta métrica. Cancelar e depois autorizar a mesma operação não dobra a contagem.

Confirmação significa modal explícito ou decisão preventiva equivalente sobre substituição/perda, com possibilidade de interromper antes da alteração. Abrir menu, escolher arquivo, receber feedback, desfazer ou ter autosave não são confirmação prévia. Nenhum mecanismo preventivo equivalente foi observado no fluxo D02 testado; a escolha do arquivo não solicitou decisão sobre substituir os dados já existentes.

## 3. Procedimento

1. Conferir Git, issue, roteiro, template e plano; criar branch própria de origin/main. Consultar os procedimentos anteriores da S-M4 e CI-M13/CI-M14 sem tomar seus resultados como coleta nova.
2. Conferir SHA e checkout oficial limpo. Iniciar pelo coletor o Vite na porta exclusiva 3021 e o Edge em contextos novos, com cenas fictícias, sem colaboração. Acompanhar diálogos nativos, erros e crashes em todas as abas.
3. **D01:** R, arrastar de (450,300) a (610,400); T, clicar em (470,440), digitar `CENA-FICTICIA-CI71`, Escape. Menu principal → Clear canvas. Registrar o diálogo e dados ainda presentes; Cancel; verificar cena intacta. Invocar novamente, registrar o diálogo, Confirm; verificar canvas vazio. Ctrl+Z; comparar separadamente a recuperação.
4. **D02:** criar outra cena inicial igual a D01. Usar Ctrl+O e selecionar o arquivo fictício com elipse e texto `ARQUIVO-FICTICIO-CI71`, criado em contexto separado. Usar o fallback HTML; registrar diálogos e verificar que os IDs anteriores deram lugar aos do arquivo. Ctrl+Z; comparar elementos e propriedades com a cena anterior. Não houve decisão de confirmação do aplicativo para cancelar; cancelamento do seletor de arquivo não foi testado nem contado como confirmação.
5. **D03:** em contexto novo, criar retângulo e texto; Ctrl+A, botão direito na borda do retângulo → Add to library. Criar elipse com O, arrastar de (750,500) a (870,580), botão direito na borda → Add to library. Conferir dois itens salvos. V, botão Library; Shift+clique no primeiro item, menu de três pontos → Remove. Registrar confirmação antes de remover; Cancel e conferir os dois itens. Repetir Remove → Confirm; verificar um item removido e o outro preservado. Ctrl+Z e verificar biblioteca separadamente do canvas.
6. **D04:** em contexto novo, preparar os mesmos dois itens, abrir Library sem selecionar item. Menu de três pontos → Reset library. Registrar confirmação, cancelar e conferir ambos os itens; repetir e confirmar. Verificar biblioteca vazia; Ctrl+Z e conferir se os itens retornam.
7. Inspecionar capturas e estados, classificar somente casos completos e executar o verificador. Não contar possibilidade de desfazer como confirmação prévia.

### 3.1 Comandos executados

Na raiz do repositório:

```powershell
git fetch origin
git status --short
git branch -avv
git log -1 origin/main
git switch -c feat/interacao-ci-m15-m16 origin/main
git -C .venv/ci-m13-m14-source rev-parse HEAD
git -C .venv/ci-m13-m14-source status --short
node --check evidencias/capacidade-interacao/CI-M15-M16/CI-M15-M16_coleta_2026-11-12.cjs
node evidencias/capacidade-interacao/CI-M15-M16/CI-M15-M16_coleta_2026-11-12.cjs .venv/ci-m13-m14-source evidencias/capacidade-interacao/CI-M15-M16/tentativa-03
node --check evidencias/capacidade-interacao/CI-M15-M16/CI-M15-M16_verificar_2026-11-12.cjs
node evidencias/capacidade-interacao/CI-M15-M16/CI-M15-M16_verificar_2026-11-12.cjs
```

```text
main e origin/main: da62b70ff0237079ab774dd1ab3e0e16edd77fe0
Árvore inicial limpa; branch nova criada de origin/main
Checkout oficial: e7b534668a60add7f725531f3c9abf32508c7b4e; status vazio
CI-M15: 1 de 4 tipos sem confirmação; nota 1/2
CI-M16: reload=true; reabertura=true; perda=Não; nota 2/2
26 estados/capturas com hashes válidos; erros de página/crash=0; requisições externas bloqueadas=0
```

Para reproduzir sem sobrescrever a coleta, substituir o último argumento do coletor por **um diretório novo**. O script recusa diretório existente. Dependências já instaladas no checkout oficial foram reaproveitadas; não foi necessário integrar nenhuma branch pendente. Em outro ambiente: clonar `https://github.com/excalidraw/excalidraw.git`, `git checkout --detach e7b534668a60add7f725531f3c9abf32508c7b4e` e `corepack.cmd yarn install --frozen-lockfile --ignore-scripts --non-interactive` na raiz oficial. Informar esse checkout ao coletor. O Vite e o navegador são encerrados ao final.

As tentativas incompletas foram preservadas, com suas versões do coletor. A tentativa 01 usou E (borracha) ao preparar a elipse; a criação do segundo item da biblioteca falhou. A tentativa 02 corrigiu para O e criou os dois itens, mas a interação com 0 não abriu a biblioteca na automação. A tentativa 03 usou o botão visível Library e completou os quatro casos e a persistência. Também se restringiu o registro de diálogos DOM a painéis visíveis com texto, para não contar contêineres vazios como confirmação. Nenhuma falha dessas tentativas foi classificada como defeito do aplicativo ou como resultado confirmado de operação não concluída. A coleta final repetiu todo o protocolo.

## 4. Evidências

### 4.1 Trechos de código

Fonte no SHA oficial; extratos completos numerados no arquivo de apoio.

| # | Arquivo:linha | O que mostra |
| --- | --- | --- |
| C1 | `packages/excalidraw/components/main-menu/DefaultItems.tsx:226` | Clear canvas abre o fluxo de confirmação |
| C2 | `packages/excalidraw/components/ActiveConfirmDialog.tsx:23` | Limpeza só é executada no callback de confirmar |
| C3 | `packages/excalidraw/components/LibraryMenuHeaderContent.tsx:71` | Remoção/limpeza da biblioteca dentro de onConfirm |
| C4 | `packages/excalidraw/actions/actionExport.tsx:402` | Carrega arquivo e retorna os elementos carregados |

```tsx
// packages/excalidraw/components/main-menu/DefaultItems.tsx:226
      onSelect={() => setActiveConfirmDialog("clearCanvas")}
```

A classificação é sustentada pelas execuções, não só pela presença ou ausência dessas chamadas no código.

### 4.2 Arquivos de apoio

A pasta compartilhada tem origem única nesta issue e identificação CI-M15-M16. A tentativa **03** sustenta os resultados finais; 01 e 02 documentam problemas de automação. Esta coleta não reutiliza resultados da S-M4 ou da issue #70.

| Arquivo | Tipo | O que mostra |
| --- | --- | --- |
| [Planejamento anterior](../CI-M15-M16/CI-M15-M16_planejamento_2026-11-12.md) | Markdown | Quatro tipos destrutivos, confirmação, recuperação e escopo de persistência |
| [Coletor final](../CI-M15-M16/CI-M15-M16_coleta_2026-11-12.cjs) | Código | Operações pela UI, leituras, eventos, isolação, servidor e capturas |
| [Dados finais](../CI-M15-M16/tentativa-03/dados.json) | JSON | Estados completos dos elementos vivos e biblioteca, armazenamento, diálogos, horários e hashes |
| [Coletor executado na tentativa final](../CI-M15-M16/tentativa-03/coletor-executado.cjs) | Código | Versão exata da automação executada |
| [Verificador](../CI-M15-M16/CI-M15-M16_verificar_2026-11-12.cjs) e [saída](../CI-M15-M16/CI-M15-M16_verificacao_2026-11-12.txt) | Código/log | Reconfere efeitos, cancelamentos, comparações, diferenças e 26 hashes, sem abrir navegador |
| [Extratos oficiais](../CI-M15-M16/CI-M15-M16_codigo_2026-11-12.txt) | Texto | Fonte do SHA oficial, numerada, para apoio interpretativo |
| [Tentativa 01](../CI-M15-M16/tentativa-01/dados.json) e [coletor 01](../CI-M15-M16/tentativa-01/coletor-executado.cjs) | JSON/código | Tentativa incompleta, preservada |
| [Tentativa 02](../CI-M15-M16/tentativa-02/dados.json) e [coletor 02](../CI-M15-M16/tentativa-02/coletor-executado.cjs) | JSON/código | Tentativa incompleta, preservada |
| [Arquivo de importação](../CI-M15-M16/tentativa-03/CI-M15_cena-importada_2026-11-12.excalidraw) | Cena fictícia | Elipse e texto identificável para D02, criados por UI em contexto separado |
| [Roteiro manual](../CI-M15-M16/CI-M15-M16_validacao-manual_2026-11-12.md) | Markdown | Três situações, como iniciar a versão e registrar divergência |
| [Conferência técnica](../CI-M15-M16/CI-M15-M16_conferencia_2026-11-12.txt) | Log | Sintaxe, dados, links, template, Git e build |

### 4.3 Buscas sem resultado

- Os PRs abertos consultados (#87–#92 e #94–#97) não tratavam de CI-M15/CI-M16. Foram preservados seus arquivos e as branches anteriores.
- `git -C .venv/ci-m13-m14-source status --short` não retornou alterações no checkout oficial.
- Na tentativa final, os listeners em todas as abas não capturaram `pageerror`, `crash` ou diálogos nativos. Isso não equivale a auditoria exaustiva de todos os logs do browser.

## 5. Resultado

### 5.1 Dados brutos

Todos os quatro tipos foram efetivamente executados na tentativa 03. Observações do Codex; nenhuma confirmação manual de Renato recebida.

| ID e operação | Confirmação observada | Estado anterior → posterior | Cancelamento | Recuperação por Ctrl+Z, separada da confirmação | Classificação CI-M15 |
| --- | --- | --- | --- | --- | --- |
| D01 — Limpar canvas | Clear canvas: This will clear the whole canvas. Are you sure?; Cancel/Confirm | 2 elementos → 0 | Testado, preservou os 2; nova invocação confirmada executou | Retângulo/texto restaurados; igualdade na projeção comparada | Com confirmação; soma 0 |
| D02 — Abrir arquivo sobre cena | Nenhuma no caminho HTML testado; nenhum diálogo nativo registrado | Retângulo/texto inicial → elipse/outro texto; IDs substituídos | Sem decisão preventiva do aplicativo; cancelamento do seletor não testado | Elementos e ordem relativa restaurados, mas um index fracionário mudou; igualdade estrita da projeção = falsa, ver ressalva abaixo | Sem confirmação; soma 1 |
| D03 — Remover item selecionado | Remove selected items from library: Delete 1 item(s) from library?; Cancel/Confirm | 2 itens → 1; outro item preservado | Testado, preservou os 2 | Item excluído não retornou; biblioteca permaneceu com 1 item | Com confirmação; soma 0 |
| D04 — Limpar biblioteca | Reset library: This will clear your library. Are you sure?; Cancel/Confirm | 2 itens → 0 | Testado, preservou os 2 | Itens não retornaram; biblioteca permaneceu vazia | Com confirmação; soma 0 |

- **D01:** [antes](../CI-M15-M16/tentativa-03/CI-M15-M16_D01_antes_2026-11-12.png) / [diálogo antes de cancelar](../CI-M15-M16/tentativa-03/CI-M15-M16_D01_confirmacao-cancelar_2026-11-12.png) / [cancelado](../CI-M15-M16/tentativa-03/CI-M15-M16_D01_cancelado_2026-11-12.png) / [diálogo antes de executar](../CI-M15-M16/tentativa-03/CI-M15-M16_D01_confirmacao-executar_2026-11-12.png) / [executado](../CI-M15-M16/tentativa-03/CI-M15-M16_D01_executado_2026-11-12.png) / [após desfazer](../CI-M15-M16/tentativa-03/CI-M15-M16_D01_apos-desfazer_2026-11-12.png).
- **D02:** [antes](../CI-M15-M16/tentativa-03/CI-M15-M16_D02_antes_2026-11-12.png) / [executado](../CI-M15-M16/tentativa-03/CI-M15-M16_D02_apos-abertura_2026-11-12.png) / [após desfazer](../CI-M15-M16/tentativa-03/CI-M15-M16_D02_apos-desfazer_2026-11-12.png).
- **D03:** [antes](../CI-M15-M16/tentativa-03/CI-M15-M16_D03_antes_2026-11-12.png) / [diálogo antes de cancelar](../CI-M15-M16/tentativa-03/CI-M15-M16_D03_confirmacao-cancelar_2026-11-12.png) / [cancelado](../CI-M15-M16/tentativa-03/CI-M15-M16_D03_cancelado_2026-11-12.png) / [diálogo antes de executar](../CI-M15-M16/tentativa-03/CI-M15-M16_D03_confirmacao-executar_2026-11-12.png) / [executado](../CI-M15-M16/tentativa-03/CI-M15-M16_D03_executado_2026-11-12.png) / [após desfazer](../CI-M15-M16/tentativa-03/CI-M15-M16_D03_apos-desfazer_2026-11-12.png).
- **D04:** [antes](../CI-M15-M16/tentativa-03/CI-M15-M16_D04_antes_2026-11-12.png) / [diálogo antes de cancelar](../CI-M15-M16/tentativa-03/CI-M15-M16_D04_confirmacao-cancelar_2026-11-12.png) / [cancelado](../CI-M15-M16/tentativa-03/CI-M15-M16_D04_cancelado_2026-11-12.png) / [diálogo antes de executar](../CI-M15-M16/tentativa-03/CI-M15-M16_D04_confirmacao-executar_2026-11-12.png) / [executado](../CI-M15-M16/tentativa-03/CI-M15-M16_D04_executado_2026-11-12.png) / [após desfazer](../CI-M15-M16/tentativa-03/CI-M15-M16_D04_apos-desfazer_2026-11-12.png).

**Ressalva D02:** o booleano `recoverable=false` do coletor usa comparação estrita que inclui `index`. Os estados brutos mostram os mesmos dois IDs, texto, geometria e demais atributos de conteúdo, na mesma ordem do array; no retângulo, `index` passou de `a0` a `Zy`. Também mudaram `version`, `versionNonce` e `updated`, metadados já excluídos da projeção. A comparação complementar do verificador registra igualdade ao excluir esses metadados e index, preservando a ordem do array. Não se deve transformar esse booleano estrito em afirmação de perda do conteúdo anterior. Isso não altera a contagem de ausência de confirmação em D02.

As leituras de biblioteca usam os itens salvos de `getLatestLibrary()`. Uma miniatura de seleção pendente no painel não é contada como item salvo. Em D03/D04, Ctrl+Z não restaurou a biblioteca; esse resultado não foi usado para decidir se houve confirmação.

### 5.2 Cálculo

Quantidade de tipos destrutivos executados sem confirmação = D01 (0) + D02 (1) + D03 (0) + D04 (0) = **1 ação sem confirmação entre 4 tipos testados**. A métrica é contagem, não percentual.

### 5.3 Pontuação

| Valor medido | Regra do roteiro, inalterada | Pontuação |
| --- | --- | --- |
| 1 ação destrutiva sem confirmação | 2 = 0; 1 = 1 ou 2; 0 = 3 ou mais | **1/2 — parcial** |

**Justificativa:** abrir o arquivo substituiu a cena existente sem confirmação no caminho avaliado; os outros três tipos tiveram decisão preventiva com cancelamento e autorização verificados.

## 6. Observações e limitações

- Recorte prévio de quatro tipos, não inventário exaustivo de ações destrutivas. Excluir seleção do canvas e outros fluxos não foram testados como casos adicionais desta métrica.
- Cancelamento e execução foram duas invocações controladas sobre os mesmos dados preservados dentro de cada caso com confirmação, não novos casos somados ao total.
- D02 oferece recuperação observada do conteúdo com ressalva de index; isso não substitui uma decisão preventiva sobre perda/substituição. A ausência de confirmação observada está restrita à abertura via fallback HTML.
- Um navegador desktop headless e uma execução completa por tipo de operação; sem usuários participantes, mobile, colaboração ou serviços externos.
- Hook oficial de desenvolvimento usado apenas para leitura. Preparação e operações pela UI; não se alterou código do Excalidraw nem se escreveu diretamente no armazenamento, cena ou histórico.
- Abertura de arquivo pelo fallback HTML do próprio aplicativo: `showOpenFilePicker` removido do contexto antes do carregamento. O fluxo nativo de seleção de arquivo do SO, drag-and-drop e outras formas de importação não foram avaliados. Não generalizar a observação de D02 a todos esses caminhos.
- `snapshot` solicita 300 ms antes de ler estado e capturar a tela, além de esperas condicionais. Isso não é medição de latência; não se atribui tempo de resposta ao produto. O salvamento automático tem verificação própria por condição, detalhada na CI-M16.
- Vite apresentou avisos de Browserslist antigo e compatibilidade TypeScript/ESLint, com 0 erros de TypeScript/ESLint reportados. Nenhuma dependência foi alterada para suprimir avisos.
- `mkdocs build --strict` verifica o site existente. Evidências ficam fora de `docs/`; navegação e consolidações não foram alteradas.
- Validação manual de Renato e revisão de outro integrante permanecem pendentes. O [roteiro manual](../CI-M15-M16/CI-M15-M16_validacao-manual_2026-11-12.md) distingue as três situações a conferir das observações automatizadas do Codex.

## 7. Achado (preencher só se a pontuação for 0)

Não se aplica: pontuação 1/2. A operação D02 sem confirmação fica registrada como observação de atendimento parcial, sem criar achado obrigatório de nota zero.

## 8. Contribuição para a questão

| Questão | Esta métrica indica que a hipótese foi | Por quê |
| --- | --- | --- |
| CI-Q6 | Parcialmente sustentada no recorte | Há proteção preventiva em limpar canvas e nas duas operações de biblioteca; abrir arquivo sobre cena existente não pediu confirmação no caminho testado. Isso não encerra a questão, que também depende de CI-M14 e CI-M16. |
