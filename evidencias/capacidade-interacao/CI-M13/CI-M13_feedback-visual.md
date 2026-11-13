# Evidência CI-M13 : Ações com feedback visual imediato

> Coleta automatizada concluída pelo Codex. **Validação manual de Renato e revisão de outro integrante pendentes.** Issue [#70](https://github.com/FCTE-Qualidade-de-Software-1/2026-2_T02_ADA_LOVELACE/issues/70). Não houve push, PR ou merge.

## 1. Identificação

| Campo | Valor |
| --- | --- |
| Métrica | CI-M13 — Ações com feedback visual imediato |
| Objetivo | O5 — Compreensão, aprendizagem e operação da interface |
| Questão | CI-Q5 — A interface se comporta de forma consistente e previsível? |
| Tarefa do plano | Item CI-M13 de “Tarefas no navegador”; o plano não atribui código T a este item |
| Responsável | Renato Araújo Gameiro (`renatoyx`); execução automatizada e inspeção das capturas: Codex |
| Data da coleta | 12/11/2026, 22:53:27 até 22:54:48, America/Sao_Paulo (timestamps JSON em UTC, dia 13/11) |
| Revisado por | Pendente; nenhuma confirmação humana recebida |
| Versão | Excalidraw oficial `e7b534668a60add7f725531f3c9abf32508c7b4e` |
| Ambiente | Windows NT 10.0.19045; Edge 157.0.4341.46 headless; Playwright 1.58.2; Node v22.23.3; Vite 5.0.12; viewport 1366 × 900; locale en-US; tema claro inicial |

## 2. O que foi medido

Proporção das 13 ações que produziram o efeito visual esperado e a mudança correspondente no estado real do aplicativo. Considerou-se feedback visual uma mudança observável relacionada à ação: aparecimento ou remoção de elementos, alças de seleção, mudança de posição, dimensões, cor ou texto, indicação de agrupamento, tema ou escala. A inspeção das capturas antes/depois foi combinada com a leitura dos atributos específicos do estado; um clique aceito, uma alteração apenas interna ou uma diferença de hash isolada não comprovam esse feedback.

**Resultado observado preservado: 13/13 (100%). Nota registrada: 2/2, provisória quanto ao requisito temporal de feedback imediato.** Não houve medição formal de latência nem comprovação de um limite temporal de imediaticidade.

O denominador foi fixado antes da execução no [planejamento](../CI-M13-M14/CI-M13-M14_planejamento_2026-11-12.md), a partir do [plano da equipe](../tarefas-capacidade-interacao.md). Inclui criar retângulo, selecionar, mover, redimensionar, cor, criar texto, editar texto, duplicar, excluir, agrupar, desagrupar, tema e zoom. Exportação não integra o recorte, definido previamente. Nenhuma ação malsucedida foi retirada.

Seleção, tema e zoom foram testados sem presumir seu comportamento no histórico. Seleção apresentou entrada própria e foi recuperada. Tema e zoom não apresentaram entrada própria; a execução de Ctrl+Z/Ctrl+Shift+Z demonstrou que o alvo era a criação anterior do retângulo. Permanecem no denominador original porque integravam o conjunto previamente definido para esta medição. O plano pede repetir as mesmas ações e registrar as não revertíveis, mas não determina inequivocamente se tema e zoom devem reduzir a nota de recuperabilidade. Essa elegibilidade e a representatividade das 13 ações ainda dependem de decisão explícita da equipe; nenhuma aprovação coletiva é presumida.

## 3. Procedimento

1. Ler a issue integral, comentários (nenhum), roteiro GQM, template, plano e evidências CI-M18/CI-M26. Conferir os PRs abertos #87, #88, #89, #90, #91, #92 e #94: sem sobreposição nos três diretórios desta coleta. Atualizar `origin` e criar a branch `feat/interacao-ci-m13-m14` de `origin/main` (`da62b70ff0237079ab774dd1ab3e0e16edd77fe0`); árvore inicial limpa.
2. Usar checkout oficial separado, SHA exato e sem alterações rastreadas. O checkout anterior não foi localizado. Não usar `aplicacao/` como prova do SHA oficial nem depender de outra branch ainda não integrada.
3. Instalar o lockfile sem modificá-lo. O próprio coletor inicia o Vite na raiz `excalidraw-app` desse checkout, porta 3020 exclusiva (`strictPort`); registra raiz/configuração e fecha o servidor ao concluir. Não reutiliza processo preexistente.
4. Para cada caso, abrir contexto novo, aguardar app e fontes, preparar pela UI o estado listado no planejamento. Não escrever no hook `window.h`, API, cena, histórico ou stores.
5. Capturar tela e ler estado antes; executar a ação por mouse/teclado; realizar as esperas explícitas do coletor, inclusive as acumuladas descritas na seção 3.2, e capturar/ler depois. Exigir o efeito específico listado na seção 5.1, além da diferença da captura; um clique ou diferença de hash isolados não bastam.
6. Pressionar Ctrl+Z; aguardar 300 ms e capturar/ler. Pressionar Ctrl+Shift+Z; aguardar 300 ms e capturar/ler novamente. Comparar projeções conforme abaixo. Repetir para os 13 casos. Na coleta final não houve exceção de automação nem erro de página capturado.
7. Rodar o verificador, conferir capturas e matemática, executar as verificações técnicas e encaminhar o [roteiro manual de seis verificações](../CI-M13-M14/CI-M13-M14_validacao-manual_2026-11-12.md) para Renato. A confirmação continua pendente.

Comparação de conteúdo: IDs, tipo, x/y, largura/altura, ângulo, cor de contorno/fundo, texto, tamanho de fonte e grupos dos elementos vivos. Não compara versões/nonces, tombstones, seleção de edição, scroll ou todas as propriedades possíveis. Para selecionar, inclui IDs selecionados; para tema, inclui tema; para zoom, inclui escala. Essas três projeções também incluem conteúdo, evitando aceitar desfazer uma ação anterior como se fosse a ação-alvo. O código oficial renova versões ao desfazer/refazer, por isso igualdade byte a byte da cena não é apropriada.

### 3.1 Comandos executados

Na raiz do repositório (PowerShell), em 12/11/2026:

```powershell
git fetch origin
git status --short
git branch -avv
git log -1 origin/main
git switch -c feat/interacao-ci-m13-m14 origin/main
git clone --filter=blob:none --no-checkout https://github.com/excalidraw/excalidraw.git .venv/ci-m13-m14-source
```

No checkout oficial:

```powershell
git checkout --detach e7b534668a60add7f725531f3c9abf32508c7b4e
$env:NODE_OPTIONS='--dns-result-order=ipv4first --no-network-family-autoselection'
corepack.cmd yarn install --frozen-lockfile --ignore-scripts --non-interactive --network-concurrency 4 --network-timeout 30000
```

Na raiz da documentação:

```powershell
node evidencias/capacidade-interacao/CI-M13-M14/CI-M13-M14_coleta_2026-11-12.cjs .venv/ci-m13-m14-source evidencias/capacidade-interacao/CI-M13-M14/tentativa-04
node evidencias/capacidade-interacao/CI-M13-M14/CI-M13-M14_verificar_2026-11-12.cjs
```

```text
Checkout: e7b534668a60add7f725531f3c9abf32508c7b4e, limpo
Yarn 1.22.22: Done in 33.96s; scripts ignorados; avisos de peer dependencies
Lockfile SHA256: 3a40118db6c7a8d9038957d2437a7c0c52e7d882586b79739ce49660d6352196
13 ações completas; 52 estados/capturas; errors=[]; bloqueios externos=0
CI-M13: 13/13 = 100.00%; nota 2
CI-M14: 11/13 = 84.62%; nota 0
```

A saída acima é o registro histórico da coleta, preservado. As qualificações provisórias das notas estão nas seções 5.3 e 6.1; a revisão documental não altera essa saída nem os arquivos de apoio.

O primeiro fetch exigiu execução fora do sandbox para escrever `FETCH_HEAD`; repetição concluída. Tentativas preservadas: 01 falhou antes do navegador por importação CJS/ESM do Vite; 02 por Chrome ausente; 03 concluiu A01–A04 e parou em A05 por seletor de cor inexistente (`color-red`). A captura de erro mostra a paleta disponível. O seletor final usa a segunda amostra de cor visível. Ajuste de ambiente: Edge instalado substituiu Chrome previsto. A tentativa 04 repetiu o conjunto completo, sem alterar as ações ou denominadores. As falhas anteriores não são defeitos do Excalidraw. Scripts entregues correspondem à tentativa 04, não são cópias das versões intermediárias.

### 3.2 Observação do feedback e esperas do coletor

O [coletor original](../CI-M13-M14/CI-M13-M14_coleta_2026-11-12.cjs) foi apenas inspecionado nesta revisão documental; não foi modificado nem reexecutado. `shot` chama `settle` antes de ler o estado e capturar a tela; `settle` move o ponteiro para uma posição fixa e solicita uma espera de 300 ms. As funções `drag`, `text` e `select` também chamam `settle`, acumulando esperas com a chamada posterior de `shot`.

| Ponto de observação | Esperas explícitas solicitadas pelo coletor |
| --- | --- |
| Depois de A01, A02, A03, A04 e A06 | 300 ms em `drag`, `select` ou `text` + 300 ms em `shot`: total de 600 ms |
| Depois de A05 e A07–A13 | 300 ms em `shot` |
| Após cada desfazer e cada refazer | 300 ms em `shot`, separadamente |
| Inicialização de cada caso | Aguarda aplicativo e fontes, depois solicita 1000 ms; a preparação também contém suas próprias esperas antes da captura inicial |

Esses valores descrevem pausas programadas da automação, acrescidas do custo dos gestos, chamadas, leituras e capturas. **300 ms e 600 ms não são tempos de resposta medidos do Excalidraw**, nem limites máximos comprovados para o aparecimento do feedback. Não há timestamp instrumentado do primeiro retorno visual ou amostragem durante as pausas. A coleta comprova que o feedback estava presente na observação posterior; não estabelece quando surgiu. A aceitação temporal de “imediato” permanece pendente de alinhamento metodológico.

## 4. Evidências

### 4.1 Trechos de código

Referências abaixo ao SHA oficial avaliado; apoio interpretativo, não substituem a execução.

| # | Arquivo:linha | O que mostra |
| --- | --- | --- |
| C1 | `packages/excalidraw/components/App.tsx:3813` | Hook de desenvolvimento expõe app/state/history para leitura |
| C2 | `packages/excalidraw/history.ts:39` | Versão e nonce excluídos na aplicação do histórico |
| C3 | `packages/excalidraw/actions/actionHistory.tsx:84` e `:127` | Atalhos de desfazer e refazer |
| C4 | `packages/excalidraw/actions/actionCanvas.tsx:433` | Mudança de tema |

```ts
// packages/excalidraw/components/App.tsx:3813
    if (isTestEnv() || isDevEnv()) {
```

O coletor lê `window.h.elements`, `window.h.state` e os comprimentos das pilhas. As ações e a preparação são exclusivamente pela interface.

### 4.2 Arquivos de apoio

A origem comum é **uma coleta da issue #70**, identificada pelo prefixo CI-M13-M14; cada estado é identificado por A01–A13 e fase. Arquivos compartilhados são apenas auxiliares, as duas evidências são independentes.

| Arquivo | Tipo | Conteúdo |
| --- | --- | --- |
| [Planejamento](../CI-M13-M14/CI-M13-M14_planejamento_2026-11-12.md) | Markdown | Ações, pré-condições, critérios e denominador prévios |
| [Coletor](../CI-M13-M14/CI-M13-M14_coleta_2026-11-12.cjs) | Código | Execução reproduzível, isolamento, servidor próprio, leituras e capturas |
| [Dados finais](../CI-M13-M14/tentativa-04/dados.json) | JSON | 52 estados, horários, geometria/texto/cores/grupos/seleção, pilhas, hashes e resultados |
| [Verificador](../CI-M13-M14/CI-M13-M14_verificar_2026-11-12.cjs) e [saída](../CI-M13-M14/CI-M13-M14_verificacao_2026-11-12.txt) | Código/log | Recalcula efeitos, comparações, hashes e notas sem abrir navegador |
| [Tentativa 01](../CI-M13-M14/tentativa-01/dados.json), [02](../CI-M13-M14/tentativa-02/dados.json), [03](../CI-M13-M14/tentativa-03/dados.json) | JSON | Falhas de infraestrutura/automação e resultados preliminares preservados |
| [Roteiro manual](../CI-M13-M14/CI-M13-M14_validacao-manual_2026-11-12.md) | Markdown | Início local, seis verificações e registro de divergências |
| Capturas da tabela 5.1 | PNG | Antes, depois, desfazer e refazer de cada ação |
| [Conferência técnica](../CI-M13-M14/CI-M13-M14_conferencia_2026-11-12.txt) | Texto | Comandos e saídas das validações finais |

### 4.3 Buscas sem resultado

- Issue #70: consulta de comentários pelo conector GitHub retornou lista vazia.
- PRs abertos consultados: nenhum referente a CI-M13/CI-M14; mantido escopo em arquivos novos.
- `git -C .venv/ci-m13-m14-source status --short`: nenhuma alteração rastreada ou arquivo não ignorado no checkout oficial.
- Nenhum erro de página capturado pelo listener `pageerror` nos contextos da tentativa 04. Não equivale a análise exaustiva do console ou da rede.

## 5. Resultado

### 5.1 Dados brutos

Observado pelo Codex por automação e inspeção visual das capturas. **Nenhuma linha foi confirmada manualmente por Renato.** Os IDs reais, dimensões e estados completos estão no JSON final.

| Ação | Dado observado | Feedback | Entrada no histórico | Desfazer restaura antes? | Refazer coincide com depois? | Capturas |
| --- | --- | --- | --- | --- | --- | --- |
| A01 — Criar retângulo | 0 → 1 retângulo; 160 × 100; posição (450, 300) | Sim | Sim | Sim | Sim | [antes](../CI-M13-M14/tentativa-04/A01_antes.png) / [depois](../CI-M13-M14/tentativa-04/A01_depois.png) / [desfazer](../CI-M13-M14/tentativa-04/A01_desfazer.png) / [refazer](../CI-M13-M14/tentativa-04/A01_refazer.png) |
| A02 — Selecionar | 0 → 1 ID selecionado; alças visíveis; conteúdo preservado | Sim | Sim | Sim | Sim | [antes](../CI-M13-M14/tentativa-04/A02_antes.png) / [depois](../CI-M13-M14/tentativa-04/A02_depois.png) / [desfazer](../CI-M13-M14/tentativa-04/A02_desfazer.png) / [refazer](../CI-M13-M14/tentativa-04/A02_refazer.png) |
| A03 — Mover | (450, 300) → (530, 360), mesmo ID | Sim | Sim | Sim | Sim | [antes](../CI-M13-M14/tentativa-04/A03_antes.png) / [depois](../CI-M13-M14/tentativa-04/A03_depois.png) / [desfazer](../CI-M13-M14/tentativa-04/A03_desfazer.png) / [refazer](../CI-M13-M14/tentativa-04/A03_refazer.png) |
| A04 — Redimensionar | 160 × 100 → 220 × 140 | Sim | Sim | Sim | Sim | [antes](../CI-M13-M14/tentativa-04/A04_antes.png) / [depois](../CI-M13-M14/tentativa-04/A04_depois.png) / [desfazer](../CI-M13-M14/tentativa-04/A04_desfazer.png) / [refazer](../CI-M13-M14/tentativa-04/A04_refazer.png) |
| A05 — Alterar cor | Contorno #1e1e1e → #e03131 | Sim | Sim | Sim | Sim | [antes](../CI-M13-M14/tentativa-04/A05_antes.png) / [depois](../CI-M13-M14/tentativa-04/A05_depois.png) / [desfazer](../CI-M13-M14/tentativa-04/A05_desfazer.png) / [refazer](../CI-M13-M14/tentativa-04/A05_refazer.png) |
| A06 — Criar texto | Vazio → Cena ficticia CI70 | Sim | Sim | Sim | Sim | [antes](../CI-M13-M14/tentativa-04/A06_antes.png) / [depois](../CI-M13-M14/tentativa-04/A06_depois.png) / [desfazer](../CI-M13-M14/tentativa-04/A06_desfazer.png) / [refazer](../CI-M13-M14/tentativa-04/A06_refazer.png) |
| A07 — Editar texto | Cena ficticia CI70 → Texto editado CI70 | Sim | Sim | Sim | Sim | [antes](../CI-M13-M14/tentativa-04/A07_antes.png) / [depois](../CI-M13-M14/tentativa-04/A07_depois.png) / [desfazer](../CI-M13-M14/tentativa-04/A07_desfazer.png) / [refazer](../CI-M13-M14/tentativa-04/A07_refazer.png) |
| A08 — Duplicar | 1 → 2 IDs distintos; contornos deslocados | Sim | Sim | Sim | Sim | [antes](../CI-M13-M14/tentativa-04/A08_antes.png) / [depois](../CI-M13-M14/tentativa-04/A08_depois.png) / [desfazer](../CI-M13-M14/tentativa-04/A08_desfazer.png) / [refazer](../CI-M13-M14/tentativa-04/A08_refazer.png) |
| A09 — Excluir | 1 → 0 elementos vivos | Sim | Sim | Sim | Sim | [antes](../CI-M13-M14/tentativa-04/A09_antes.png) / [depois](../CI-M13-M14/tentativa-04/A09_depois.png) / [desfazer](../CI-M13-M14/tentativa-04/A09_desfazer.png) / [refazer](../CI-M13-M14/tentativa-04/A09_refazer.png) |
| A10 — Agrupar | 2 elementos sem grupo → mesmo groupId; moldura conjunta | Sim | Sim | Sim | Sim | [antes](../CI-M13-M14/tentativa-04/A10_antes.png) / [depois](../CI-M13-M14/tentativa-04/A10_depois.png) / [desfazer](../CI-M13-M14/tentativa-04/A10_desfazer.png) / [refazer](../CI-M13-M14/tentativa-04/A10_refazer.png) |
| A11 — Desagrupar | 2 elementos com grupo → groupIds vazios; alças individuais | Sim | Sim | Sim | Sim | [antes](../CI-M13-M14/tentativa-04/A11_antes.png) / [depois](../CI-M13-M14/tentativa-04/A11_depois.png) / [desfazer](../CI-M13-M14/tentativa-04/A11_desfazer.png) / [refazer](../CI-M13-M14/tentativa-04/A11_refazer.png) |
| A12 — Mudar tema | light → dark; desfazer mantém dark e remove retângulo; refazer repõe retângulo | Sim | Não | Não | Sim | [antes](../CI-M13-M14/tentativa-04/A12_antes.png) / [depois](../CI-M13-M14/tentativa-04/A12_depois.png) / [desfazer](../CI-M13-M14/tentativa-04/A12_desfazer.png) / [refazer](../CI-M13-M14/tentativa-04/A12_refazer.png) |
| A13 — Zoom | 1 → 1,1 (100% → 110%); desfazer mantém 1,1 e remove retângulo; refazer repõe retângulo | Sim | Não | Não | Sim | [antes](../CI-M13-M14/tentativa-04/A13_antes.png) / [depois](../CI-M13-M14/tentativa-04/A13_depois.png) / [desfazer](../CI-M13-M14/tentativa-04/A13_desfazer.png) / [refazer](../CI-M13-M14/tentativa-04/A13_refazer.png) |

Em A12/A13, “refazer coincide com depois” é verdadeiro, mas não prova recuperabilidade: desfazer não voltou ao estado anterior, e refazer apenas repôs o retângulo. O par completo falhou para a ação-alvo. As dez edições e a seleção passaram nos dois sentidos.

### 5.2 Cálculo

CI-M13 = ações com feedback visual observado / total de ações testadas × 100.

13 / 13 × 100 = **100%**.

As 13 ações cumpriram seu critério específico e apresentaram mudança visual. A janela de observação não mede latência.

### 5.3 Pontuação

| Valor medido | Regra do roteiro (inalterada) | Pontuação |
| --- | --- | --- |
| 100% de ações com feedback observado | 2 = 100%; 1 = 90% a 99%; 0 = abaixo de 90% | **2/2 — provisória quanto ao requisito temporal** |

**Justificativa:** Todas as ações deram o retorno visual esperado no ponto de observação. Preserva-se a nota original, mas a presença de feedback não comprova, por si só, sua imediaticidade. A nota 2/2 é provisória até definir o critério operacional temporal e verificar se a evidência disponível é suficiente para atendê-lo, sem alterar os critérios percentuais GQM.

## 6. Observações e limitações

- Um navegador desktop headless e uma execução completa por ação; não avalia toque, outros navegadores, participantes, fadiga ou percepção humana.
- As esperas explícitas variam entre os casos e podem acumular 600 ms antes da observação posterior (seção 3.2). Não houve medição formal de latência nem comprovação de limite temporal de imediaticidade. A nota 2/2 permanece provisória nesse requisito; eventos transitórios podem passar entre amostras.
- Diferença de hash da captura, isoladamente, pode refletir controles e seleção. Por isso exige-se o efeito no estado real e inspeção visual. Capturas não substituem a conferência manual solicitada.
- Ambiente de desenvolvimento com hook oficial apenas para leitura. Não se alterou código oficial para obter resultado. Não é build de produção.
- Tema e zoom recuperáveis por seus próprios controles não equivalem a recuperáveis por Ctrl+Z/Ctrl+Shift+Z. Nota de M14 depende do conjunto completo previsto no planejamento; o achado não deve ser anunciado como corrupção ou perda de dados.
- Projeção compara os atributos exercitados nesta cena; não prova fidelidade de todos os atributos, elementos vinculados, imagens, colaboração ou persistência. APIs externas não foram exercitadas. Dados inteiramente fictícios.
- Vite emitiu avisos de Browserslist antigo e compatibilidade do TypeScript com ESLint; reportou 0 erros de TypeScript e ESLint. Não houve atualização de dependências para suprimir avisos.
- `mkdocs build --strict` verifica o site existente. Estas evidências ficam fora de `docs/`; navegação e consolidações não foram alteradas.
- Validação humana e revisão cruzada pendentes. Roteiro manual entregue, sem atribuir confirmação ao responsável.

### 6.1 Pendências metodológicas

Decisões ainda não alinhadas pela equipe:

1. Tema e zoom contam como ações não recuperáveis para CI-M14?
2. Qual é o critério operacional de feedback visual imediato para CI-M13?
3. O conjunto das 13 ações representa adequadamente o plano da disciplina?

A aprovação de Renato para estes esclarecimentos documentais não equivale à aprovação coletiva desses critérios. As definições e faixas percentuais do [roteiro GQM](../../../docs/analise/roteiro.md#capacidade-de-interacao) permanecem inalteradas. Os resultados originais, scripts, dados, capturas e tentativas foram preservados; esta revisão não executou uma nova coleta. Validação manual e revisão por outro integrante continuam pendentes.

## 7. Achado (preencher só se a pontuação for 0)

Não se aplica à pontuação registrada: 2/2, provisória quanto ao requisito temporal. A insuficiência de evidência temporal está registrada nas limitações e pendências; não foi convertida automaticamente em outra nota.

## 8. Contribuição para a questão

| Questão | Esta métrica indica que a hipótese foi | Por quê |
| --- | --- | --- |
| CI-Q5 | Parcialmente sustentada no aspecto de feedback | 13/13 ações deram retorno visual no ponto observado, com nota 2/2 provisória quanto à imediaticidade. Isso sustenta a presença de feedback, mas não seu limite temporal, não mede inconsistências CI-M12 nem permite concluir a questão inteira. |
