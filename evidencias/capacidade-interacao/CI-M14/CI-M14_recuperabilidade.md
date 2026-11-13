# Evidência CI-M14 : Taxa de recuperabilidade

> Coleta automatizada concluída pelo Codex. **Validação manual de Renato e revisão de outro integrante pendentes.** Issue [#70](https://github.com/FCTE-Qualidade-de-Software-1/2026-2_T02_ADA_LOVELACE/issues/70). Não houve push, PR ou merge.

## 1. Identificação

| Campo | Valor |
| --- | --- |
| Métrica | CI-M14 — Taxa de recuperabilidade |
| Objetivo | O5 — Compreensão, aprendizagem e operação da interface |
| Questão | CI-Q6 — O sistema evita e permite recuperar erros do usuário? |
| Tarefa do plano | Item CI-M14 de “Tarefas no navegador”; o plano não atribui código T a este item |
| Responsável | Renato Araújo Gameiro (`renatoyx`); execução automatizada e inspeção das capturas: Codex |
| Data da coleta | 12/11/2026, 22:53:27 até 22:54:48, America/Sao_Paulo (timestamps JSON em UTC, dia 13/11) |
| Revisado por | Pendente; nenhuma confirmação humana recebida |
| Versão | Excalidraw oficial `e7b534668a60add7f725531f3c9abf32508c7b4e` |
| Ambiente | Windows NT 10.0.19045; Edge 157.0.4341.46 headless; Playwright 1.58.2; Node v22.23.3; Vite 5.0.12; viewport 1366 × 900; locale en-US; tema claro inicial |

## 2. O que foi medido

Proporção das mesmas 13 ações cujo estado anterior foi restaurado por desfazer e cujo estado posterior foi restaurado por refazer. As duas verificações foram executadas separadamente.

O denominador foi fixado antes da execução no [planejamento](../CI-M13-M14/CI-M13-M14_planejamento_2026-11-12.md), a partir do [plano da equipe](../tarefas-capacidade-interacao.md). Inclui criar retângulo, selecionar, mover, redimensionar, cor, criar texto, editar texto, duplicar, excluir, agrupar, desagrupar, tema e zoom. Exportação não integra o recorte, definido previamente. Nenhuma ação malsucedida foi retirada.

Seleção, tema e zoom foram testados sem presumir seu comportamento no histórico. Seleção apresentou entrada própria e foi recuperada. Tema e zoom não apresentaram entrada própria; a execução de Ctrl+Z/ Ctrl+Shift+Z demonstrou que o alvo era a criação anterior do retângulo. São **não recuperáveis pelo par de comandos no recorte**, e não erros de restauração do desenho. Mantê-los no total segue o plano, que pede repetir as mesmas ações e registrar as não revertíveis.

## 3. Procedimento

1. Ler a issue integral, comentários (nenhum), roteiro GQM, template, plano e evidências CI-M18/CI-M26. Conferir os PRs abertos #87, #88, #89, #90, #91, #92 e #94: sem sobreposição nos três diretórios desta coleta. Atualizar `origin` e criar a branch `feat/interacao-ci-m13-m14` de `origin/main` (`da62b70ff0237079ab774dd1ab3e0e16edd77fe0`); árvore inicial limpa.
2. Usar checkout oficial separado, SHA exato e sem alterações rastreadas. O checkout anterior não foi localizado. Não usar `aplicacao/` como prova do SHA oficial nem depender de outra branch ainda não integrada.
3. Instalar o lockfile sem modificá-lo. O próprio coletor inicia o Vite na raiz `excalidraw-app` desse checkout, porta 3020 exclusiva (`strictPort`); registra raiz/configuração e fecha o servidor ao concluir. Não reutiliza processo preexistente.
4. Para cada caso, abrir contexto novo, aguardar app e fontes, preparar pela UI o estado listado no planejamento. Não escrever no hook `window.h`, API, cena, histórico ou stores.
5. Capturar tela e ler estado antes; executar a ação por mouse/teclado; aguardar 300 ms e capturar/ler depois. Exigir o efeito específico listado na seção 5.1, além da diferença da captura; um clique ou diferença de hash isolados não bastam.
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

O primeiro fetch exigiu execução fora do sandbox para escrever `FETCH_HEAD`; repetição concluída. Tentativas preservadas: 01 falhou antes do navegador por importação CJS/ESM do Vite; 02 por Chrome ausente; 03 concluiu A01–A04 e parou em A05 por seletor de cor inexistente (`color-red`). A captura de erro mostra a paleta disponível. O seletor final usa a segunda amostra de cor visível. Ajuste de ambiente: Edge instalado substituiu Chrome previsto. A tentativa 04 repetiu o conjunto completo, sem alterar as ações ou denominadores. As falhas anteriores não são defeitos do Excalidraw. Scripts entregues correspondem à tentativa 04, não são cópias das versões intermediárias.

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
| A01 — Criar retÃ¢ngulo | 0 → 1 retângulo; 160 × 100; posição (450, 300) | Sim | Sim | Sim | Sim | [antes](../CI-M13-M14/tentativa-04/A01_antes.png) / [depois](../CI-M13-M14/tentativa-04/A01_depois.png) / [desfazer](../CI-M13-M14/tentativa-04/A01_desfazer.png) / [refazer](../CI-M13-M14/tentativa-04/A01_refazer.png) |
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

CI-M14 = ações recuperadas por desfazer e refazer / total de ações testadas × 100.

11 / 13 × 100 = **84,615384…% (84,62%)**.

Numerador: A01–A11, incluindo seleção. A12 e A13 continuam no denominador de 13, com não recuperabilidade observada. Sensibilidade, sem substituir o valor principal: apenas dez edições de conteúdo = 10/10 = 100%, nota 2; edições + seleção = 11/11 = 100%, nota 2. A diferença decorre do escopo e da política de histórico, não de perda de desenho nas dez edições.

### 5.3 Pontuação

| Valor medido | Regra do roteiro (inalterada) | Pontuação |
| --- | --- | --- |
| 84,62% | 2 = 100%; 1 = 90% a 99%; 0 = abaixo de 90% | **0/2** |

**Justificativa:** Onze das treze ações foram recuperadas pelo par desfazer/refazer; 84,62% fica abaixo de 90%. Não se atribuiu sucesso automaticamente às ações sem histórico nem se retiraram essas ações do total.

## 6. Observações e limitações

- Um navegador desktop headless e uma execução completa por ação; não avalia toque, outros navegadores, participantes, fadiga ou percepção humana.
- Espera mínima fixa de 300 ms após gesto concluído, acrescida do custo das leituras/capturas. Feedback “imediato” significa observado na primeira amostra após a espera. **Não é medição de latência em milissegundos nem prova de retorno perceptualmente imediato**; eventos transitórios podem passar entre amostras.
- Diferença de hash da captura, isoladamente, pode refletir controles e seleção. Por isso exige-se o efeito no estado real e inspeção visual. Capturas não substituem a conferência manual solicitada.
- Ambiente de desenvolvimento com hook oficial apenas para leitura. Não se alterou código oficial para obter resultado. Não é build de produção.
- Tema e zoom recuperáveis por seus próprios controles não equivalem a recuperáveis por Ctrl+Z/Ctrl+Shift+Z. Nota de M14 depende do conjunto completo previsto no planejamento; o achado não deve ser anunciado como corrupção ou perda de dados.
- Projeção compara os atributos exercitados nesta cena; não prova fidelidade de todos os atributos, elementos vinculados, imagens, colaboração ou persistência. APIs externas não foram exercitadas. Dados inteiramente fictícios.
- Vite emitiu avisos de Browserslist antigo e compatibilidade do TypeScript com ESLint; reportou 0 erros de TypeScript e ESLint. Não houve atualização de dependências para suprimir avisos.
- `mkdocs build --strict` verifica o site existente. Estas evidências ficam fora de `docs/`; navegação e consolidações não foram alteradas.
- Validação humana e revisão cruzada pendentes. Roteiro manual entregue, sem atribuir confirmação ao responsável.

## 7. Achado (preencher só se a pontuação for 0)

| ID | Métrica | Evidência reproduzível | Pontuação | Impacto | Recomendação |
| --- | --- | --- | --- | --- | --- |
| A-CI-M14-01 | CI-M14 | A12/A13 na tabela 5.1 e JSON: mudar tema/zoom, Ctrl+Z mantém o ajuste e remove o retângulo; Ctrl+Shift+Z repõe o retângulo | 0 | Baixo | Explicitar o escopo do histórico ao usuário e manter controles claros para restaurar tema/zoom; se o produto desejar recuperação unificada, avaliar registrar esses ajustes sem prejudicar edição. Não tratar o comportamento como perda de dados. |

## 8. Contribuição para a questão

| Questão | Esta métrica indica que a hipótese foi | Por quê |
| --- | --- | --- |
| CI-Q6 | Parcialmente sustentada no recorte | Edições e seleção recuperadas, mas tema/zoom não recuperados por histórico. O resultado 0 limita a hipótese positiva de CI-Q6 no denominador escolhido; prevenção e persistência dependem também de CI-M15/CI-M16. |
