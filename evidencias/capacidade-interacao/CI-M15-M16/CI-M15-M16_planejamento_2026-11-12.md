# Planejamento anterior à execução — issue #71

O5 — Compreensão, aprendizagem e operação da interface; CI-Q6 — O sistema evita e permite recuperar erros do usuário? Responsável: Renato Araújo Gameiro. Execução: Codex; conferência manual pendente.

Fontes consultadas: issue #71 integral, roteiro GQM (Tabela 14), template e plano de capacidade de interação. Procedimentos de S-M4 (PR #92) e CI-M13/CI-M14 (PR #96) consultados como referência; seus dados não são resultados desta coleta. PRs abertos consultados (#87–#92, #94–#97): nenhum referente a CI-M15/CI-M16. Base `origin/main`: `da62b70ff0237079ab774dd1ab3e0e16edd77fe0`; main local igual à remota; árvore inicial limpa. Branch própria criada da base, sem integrar branches pendentes.

## CI-M15: escopo e regra de classificação

Quatro tipos de operação, definidos antes da execução. Cancelar e confirmar são tentativas do mesmo tipo, não duas ações na contagem. Biblioteca tem dois escopos pertinentes: remover somente a seleção e limpar toda a coleção, ambos com dados efetivamente presentes. Nenhuma operação adicional de exclusão no canvas será somada a este recorte.

| ID | Operação | Estado inicial fictício | Efeito esperado para verificar execução |
| --- | --- | --- | --- |
| D01 | Limpar canvas | Retângulo e texto identificável | Canvas sem elementos vivos após autorizar; cancelamento preserva os elementos |
| D02 | Abrir arquivo sobre cena existente | Cena com retângulo/texto; arquivo válido com outra cena identificável | Arquivo substitui a cena corrente; verificar IDs e texto |
| D03 | Remover item selecionado da biblioteca | Dois itens salvos na biblioteca; selecionar apenas um | Um item removido e o outro preservado; cancelamento preserva ambos |
| D04 | Limpar toda a biblioteca | Dois itens salvos, nenhum selecionado | Biblioteca vazia; cancelamento preserva ambos |

Confirmação é decisão preventiva explícita sobre a operação/perda, com opção de cancelar antes de alterar os dados: modal ou mecanismo efetivamente equivalente. Abrir o menu, escolher um arquivo no seletor, feedback, desfazer e autosave não são, isoladamente, confirmação de substituição/perda. Diálogos DOM e eventos de diálogo nativo serão registrados. Nas operações com confirmação, testar cancelamento e nova invocação controlada para executar. Verificar conteúdo antes, durante o diálogo, após cancelar, após executar e após Ctrl+Z. A recuperação será comparada ao estado anterior, separadamente da confirmação. Não presumir que Ctrl+Z restaure biblioteca: verificar o conteúdo da biblioteca e do canvas.

Contagem principal: tipos de operação realmente executados sem confirmação preventiva. Critérios imutáveis: 0 tipos = nota 2; 1 ou 2 = nota 1; 3 ou mais = nota 0. Operações incompletas não recebem classificação confirmada; preservar tentativas com problemas de automação e identificá-las antes de repetir.

## CI-M16: cena e comparações

Contexto novo, sem colaboração, mesma origem e mesmo contexto ao reabrir a aba. Criar pela UI retângulo, elipse e texto fictício identificável; modificar cor de um elemento. Sem salvar manualmente. Registrar elementos completos e uma projeção sem metadados de versão, normalizando `boundElements: null` e `[]` (normalização conhecida da restauração, a ser registrada como diferença se ocorrer). Comparar por ID, incluindo todos os demais atributos dos elementos vivos, e registrar diferenças completas adicionais. Não exigir equivalência de seleção/viewport como se fossem conteúdo do desenho.

Confirmar autosave por leitura de `localStorage.excalidraw`, sem escrever no armazenamento. Aguardar por condição (consulta a cada 100 ms, timeout 10 s), registrar duração observada e critério, não um tempo garantido do produto. A constante de debounce oficial é 300 ms; isso não é, por si só, prova de salvamento. Repetir a verificação de armazenamento antes de fechar a aba. Comparar: cena antes × após reload; cena antes de fechar × nova aba na mesma origem/contexto. Registrar os dois resultados separadamente.

CI-M16: perda Não = nota 2; perda Sim = nota 0; nota 1 não se aplica. Falha de coleta não é evidência de perda de dados. Não serão testados encerramento do navegador, reinício do SO, falhas ou perda física.

## Ambiente e integridade

Reutilizar checkout oficial `e7b534668a60add7f725531f3c9abf32508c7b4e`, limpo, com dependências já instaladas. Coletor inicia seu próprio Vite em porta exclusiva 3021, raiz conhecida e `strictPort`; Edge instalado, Playwright 1.58.2, viewport 1366 × 900, en-US. Hook oficial `window.h` somente para leitura. Preparação e operações pela UI; arquivo de importação fictício gerado a partir de cena criada pela UI em contexto separado.

Para automatizar a abertura de arquivo, usar fallback HTML do próprio aplicativo desabilitando `showOpenFilePicker` no contexto, antes do carregamento; não alterar código do produto. Registrar essa limitação. Capturas com espera de 300 ms apenas em `snapshot`, além das esperas condicionais de inicialização/autosave; não medir latência. Nenhuma escrita em stores, cena ou histórico para produzir resultados. Arquivos de saída em diretório novo, sem sobrescrever tentativas. Bloquear requisições externas e acompanhar erros/crash em todas as abas, inclusive a reaberta.
