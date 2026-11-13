# Evidência CI-M16 : Perda de dados ao recarregar ou fechar a aba

> Coleta automatizada concluída pelo Codex, issue [#71](https://github.com/FCTE-Qualidade-de-Software-1/2026-2_T02_ADA_LOVELACE/issues/71). Validação humana e revisão cruzada pendentes. Entrega local, sem push, PR ou merge.

## 1. Identificação

| Campo | Valor |
| --- | --- |
| Métrica | CI-M16 — Perda de dados ao fechar a aba ou recarregar sem salvar |
| Tarefa do plano | Item CI-M16 de Tarefas no navegador; sem identificador T próprio |
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

Se houve perda de conteúdo do desenho após recarregar a página e após fechar/reabrir somente a aba na mesma origem e no mesmo contexto do navegador, sem salvamento manual. Os dois cenários são verificados separadamente. Resultado binário: perda Não = nota 2; perda Sim = nota 0; nota 1 não se aplica.

Cena fictícia criada pela UI em contexto novo: retângulo, elipse vermelha e texto `CENA-FICTICIA-CI71`. Não houve colaboração, salvar manual, importação ou geração por serviço externo neste caso. O arquivo de D02 foi preparado em outro contexto e não é fonte dos resultados da CI-M16. O [planejamento](../CI-M15-M16/CI-M15-M16_planejamento_2026-11-12.md) fixou o escopo e as comparações antes da execução.

## 3. Procedimento

1. Preparar ambiente e iniciar Vite/Edge pelo coletor, conforme comandos abaixo. Um contexto novo para CI-M16, distinto de todos os casos destrutivos, com listeners em todas as páginas.
2. R, arrastar de (450,300) a (610,400); T, clicar em (470,440), digitar `CENA-FICTICIA-CI71`, Escape; O, arrastar de (760,500) a (880,580); clicar na segunda amostra de Stroke, vermelha. Não usar Ctrl+S, exportar ou salvar arquivo.
3. Aguardar por condição: consultar a cada 100 ms se o conteúdo vivo da cena coincide com o JSON de `localStorage.excalidraw` na projeção canônica, com timeout de 10 s. Somente leitura de armazenamento. Registrar início, conclusão e duração da espera.
4. Registrar `P16_antes-reload`, com todos os atributos dos três elementos vivos e o JSON armazenado. Recarregar a página; aguardar app e fontes; registrar `P16_apos-reload`. Comparar elementos por ID e atributos, não apenas imagem.
5. Confirmar novamente a condição de autosave e registrar `P16_antes-fechar`. Fechar somente essa aba; manter o contexto Playwright aberto. Abrir outra página dentro do mesmo contexto e acessar a mesma origem. Registrar `P16_aba-reaberta` e comparar com antes de fechar.
6. Executar o verificador; registrar tanto comparações canônicas quanto todas as diferenças de propriedades. Não testar encerramento/reinício do browser ou do sistema operacional e não inferir esses resultados.

### Comparação e sincronização

O JSON contém os elementos vivos completos em cada estado. A comparação canônica ordena por ID, preserva todos os atributos salvo `version`, `versionNonce` e `updated`, e normaliza `boundElements: null` para `[]`. Essa normalização foi planejada previamente por ser uma transformação de restauração conhecida, e não foi aplicada retroativamente aos dados brutos. O verificador também lista diferenças completas, sem esconder essas mudanças. Índices de ordenação, IDs, texto, geometria, cores e demais atributos de conteúdo continuam comparados.

| Condição observada | Duração registrada da espera | Como interpretar |
| --- | --- | --- |
| Conteúdo no localStorage coincide com a cena após criação/cor, antes do reload | 314 ms | Duração da espera da automação com polling; não é benchmark do autosave |
| Conteúdo no localStorage coincide com a cena restaurada antes de fechar a aba | 3 ms | A condição já estava satisfeita ao consultar; não é tempo de gravação |

A constante oficial de debounce é 300 ms. O protocolo não presumiu persistência só por aguardar esse valor: verificou conteúdo armazenado. Além das esperas condicionais, cada captura solicita 300 ms para estabilização, e a inicialização aguarda aplicativo e fontes. Leituras/capturas têm custo adicional. Não houve medição formal da latência do salvamento automático.

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

| # | Arquivo:linha no SHA oficial | O que mostra |
| --- | --- | --- |
| C1 | `excalidraw-app/app_constants.ts:2` | Debounce configurado em 300 ms |
| C2 | `excalidraw-app/data/LocalData.ts:90` | Grava elementos não excluídos em localStorage |
| C3 | `excalidraw-app/data/LocalData.ts:125` | Agendamento automático por debounce |

```ts
// excalidraw-app/app_constants.ts:2
export const SAVE_TO_LOCAL_STORAGE_TIMEOUT = 300;
```

A persistência foi confirmada pela comparação dos estados de execução. A constante isolada não comprova que uma gravação terminou nem define um tempo garantido.

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

Conteúdo inicial identificado por IDs estáveis, também presente nos três estados posteriores:

| Tipo | ID | Posição e dimensão | Conteúdo/propriedade observada |
| --- | --- | --- | --- |
| rectangle | `D97_vkHWhXF7V_FmkDogF` | (450, 300); 160 × 100 | #1e1e1e |
| text | `Mi_62Vb05RxBiqWtHrN6P` | (470, 427.5); 212.63983154296875 × 25 | CENA-FICTICIA-CI71 |
| ellipse | `8KJBr5X10agbma9nEW8hH` | (760, 500); 120 × 80 | #e03131 |

| Verificação | Antes → depois | Conteúdo real | Diferenças completas | Resultado |
| --- | --- | --- | --- | --- |
| Reload | 3 elementos → 3, mesmos IDs | Texto, formas, posições, dimensões, cores e demais atributos comparados preservados | `boundElements` de cada um dos três elementos: null → []; sem outra diferença | Sem perda observada; igualdade canônica verdadeira |
| Fechar/reabrir aba no mesmo contexto | 3 elementos → 3, mesmos IDs | Mesmas propriedades e conteúdo | Nenhuma diferença de atributos dos elementos vivos | Sem perda observada; igualdade canônica verdadeira |

[antes do reload](../CI-M15-M16/tentativa-03/CI-M15-M16_P16_antes-reload_2026-11-12.png) / [após reload](../CI-M15-M16/tentativa-03/CI-M15-M16_P16_apos-reload_2026-11-12.png) / [antes de fechar](../CI-M15-M16/tentativa-03/CI-M15-M16_P16_antes-fechar_2026-11-12.png) / [aba reaberta](../CI-M15-M16/tentativa-03/CI-M15-M16_P16_aba-reaberta_2026-11-12.png).

Não havia bindings nessa cena: `null` e `[]` representam ausência de vínculos, de modo que a normalização não demonstra perda. Os brutos preservam os dois valores e o log do verificador lista cada diferença. Não se infere fidelidade de bindings reais, imagens ou diagramas complexos a partir deste caso.

`manualSave=false`, duas esperas por condição registradas, contexto reutilizado ao reabrir (`sameContext=true`), reinício do navegador não testado (`browserRestartTested=false`). A implementação do coletor confirma a sequência de criação por UI, reload, `page.close()` e `newPage()` no mesmo contexto, sem comando de salvar ou escrita no armazenamento.

### 5.2 Cálculo

Esta métrica é binária, não percentual. Perda após reload = **Não**; perda após fechar/reabrir a aba = **Não**. Logo, no conjunto dos dois cenários efetivamente testados, **perda de dados = Não**. As duas verificações passaram; não se cria uma média ou nota intermediária.

### 5.3 Pontuação

| Valor medido | Regra do roteiro, inalterada | Pontuação |
| --- | --- | --- |
| Não houve perda de conteúdo nos dois cenários avaliados | 2 = Não; 1 = não se aplica; 0 = Sim | **2/2** |

**Justificativa:** os três elementos e atributos de conteúdo comparados retornaram após reload e reabertura no mesmo contexto, sem salvamento manual. A única transformação do reload foi null → [] em `boundElements`, registrada e semanticamente equivalente para esta cena sem vínculos.

## 6. Observações e limitações

- Resultado condicionado a aguardar a confirmação do conteúdo no armazenamento antes de recarregar/fechar. Não avalia fechamento durante uma gravação pendente, crash, esgotamento de quota ou indisponibilidade do armazenamento.
- Fechou-se somente a aba. Entre fechar e reabrir a aba, o contexto foi mantido aberto; encerramento do contexto, processo do navegador e sistema operacional não foram cenários de persistência avaliados. Não extrapolar para reinício do navegador/SO, recuperação após falha, limpeza de perfil ou perda física do dispositivo.
- Cena de três elementos sem bindings, imagens, arquivos binários ou colaboração. O teste não certifica todos os tipos de conteúdo ou atributos possíveis em outras cenas.
- Normalizações e exclusões da comparação foram explicitadas antes da execução; os dados brutos e a lista completa de diferenças foram mantidos. Seleção e viewport não são contados como conteúdo perdido.
- Um navegador desktop headless e uma execução completa por tipo de operação; sem usuários participantes, mobile, colaboração ou serviços externos.
- Hook oficial de desenvolvimento usado apenas para leitura. Preparação e operações pela UI; não se alterou código do Excalidraw nem se escreveu diretamente no armazenamento, cena ou histórico.
- Abertura de arquivo pelo fallback HTML do próprio aplicativo: `showOpenFilePicker` removido do contexto antes do carregamento. O fluxo nativo de seleção de arquivo do SO, drag-and-drop e outras formas de importação não foram avaliados. Não generalizar a observação de D02 a todos esses caminhos.
- `snapshot` solicita 300 ms antes de ler estado e capturar a tela, além de esperas condicionais. Isso não é medição de latência; não se atribui tempo de resposta ao produto. O salvamento automático tem verificação própria por condição, detalhada na CI-M16.
- Vite apresentou avisos de Browserslist antigo e compatibilidade TypeScript/ESLint, com 0 erros de TypeScript/ESLint reportados. Nenhuma dependência foi alterada para suprimir avisos.
- `mkdocs build --strict` verifica o site existente. Evidências ficam fora de `docs/`; navegação e consolidações não foram alteradas.
- Validação manual de Renato e revisão de outro integrante permanecem pendentes. O [roteiro manual](../CI-M15-M16/CI-M15-M16_validacao-manual_2026-11-12.md) distingue as três situações a conferir das observações automatizadas do Codex.

## 7. Achado (preencher só se a pontuação for 0)

Não se aplica: pontuação 2/2. A normalização sem perda de conteúdo foi registrada nas seções 5.1 e 6, sem criar achado de nota zero.

## 8. Contribuição para a questão

| Questão | Esta métrica indica que a hipótese foi | Por quê |
| --- | --- | --- |
| CI-Q6 | Sustentada no aspecto de salvamento automático local examinado | Desenho retornou após reload e reabertura da aba sem salvar manualmente, sob as condições avaliadas. Não conclui prevenção de erros ou toda a questão; CI-M14 e CI-M15 também contribuem. |
