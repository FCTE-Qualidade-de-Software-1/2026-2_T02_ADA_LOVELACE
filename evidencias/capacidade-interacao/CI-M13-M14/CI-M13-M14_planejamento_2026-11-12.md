# Planejamento anterior à coleta — issue #70

Responsável: Renato Araújo Gameiro. Execução automatizada: Codex. Validação humana: pendente.

Fontes: issue #70 integral e sem comentários, template oficial, roteiro GQM (Tabela 14), plano `tarefas-capacidade-interacao.md`, evidências CI-M18/CI-M26. Consultados PRs abertos #87–#92 e #94: nenhum altera os diretórios desta coleta. A lista do plano é exemplificativa; não existe denominador previamente fechado para M13/M14.

## Protocolo fixado antes da execução

13 ações para ambas as métricas. CI-M13: verificar mudança visual e o estado correspondente. CI-M14: executar Ctrl+Z e Ctrl+Shift+Z separadamente e comparar a projeção relevante com antes/depois. Projeção de conteúdo inclui IDs, tipo, geometria, texto, cor e grupos dos elementos vivos; ignora metadados de versionamento, seleção e tombstones. Seleção compara IDs selecionados e conteúdo; tema compara tema e conteúdo; zoom compara zoom e conteúdo. Uma mudança desfeita de outra ação não conta como recuperação da ação avaliada.

Seleção, tema e zoom continuam no denominador, conforme o plano pede repetir as mesmas ações e registrar não revertíveis. Ausência de entrada no histórico é registrada separadamente e só será classificada como não recuperável após observar o par desfazer/refazer. Não significa defeito de conteúdo. Exibir também análise de sensibilidade somente das dez edições, sem substituir o resultado principal. Falhas funcionais ficam no denominador. Erros de automação geram tentativa incompleta preservada e nova execução identificada; não recebem nota de produto.

| ID | Ação | Estado inicial (preparado pela UI) | Visual/estado exigido depois | Desfazer / refazer esperado |
| --- | --- | --- | --- | --- |
| A01 | Criar retângulo | Tela vazia | Um retângulo de 160 × 100 | Vazio / mesmo retângulo |
| A02 | Selecionar | Retângulo sem seleção | Moldura/alças e ID selecionado | Restaurar seleção anterior / posterior, preservando conteúdo |
| A03 | Mover | Retângulo selecionado | x e y aumentam 80 e 60 | Geometria anterior / posterior |
| A04 | Redimensionar | Retângulo selecionado | Largura e altura aumentam | Dimensões anteriores / posteriores |
| A05 | Alterar cor | Retângulo selecionado preto | Contorno vermelho e strokeColor diferente | Cor anterior / posterior |
| A06 | Criar texto | Tela vazia | Texto fictício visível | Vazio / mesmo texto |
| A07 | Editar texto | Texto fictício existente | Novo conteúdo visível | Texto anterior / posterior |
| A08 | Duplicar | Retângulo selecionado | Dois elementos com IDs distintos | Um / dois elementos |
| A09 | Excluir | Retângulo selecionado | Nenhum elemento vivo | Retângulo / vazio |
| A10 | Agrupar | Dois retângulos selecionados | Grupo comum e seleção conjunta | Sem grupos / grupo posterior |
| A11 | Desagrupar | Dois retângulos agrupados | Sem grupo, seleção individual possível | Grupo anterior / sem grupo |
| A12 | Mudar tema | Tema claro, um retângulo | Fundo e controles escuros, theme=dark | Tema claro / escuro, conteúdo preservado |
| A13 | Zoom | Zoom 100%, um retângulo | Indicador e escala alterados | Zoom anterior / posterior, conteúdo preservado |

Um contexto novo por ação, 1366 × 900, en-US, Chrome headless. Espera fixa de 300 ms após cada gesto concluído, seguida de captura e leitura; preparação inicial aguarda fontes. Não mede latência, percepção humana ou garantia de feedback em menos de 300 ms. O termo imediato é operacionalizado como retorno no primeiro ponto de observação após essa espera, limitação explícita.

Nenhuma escrita em `window.h`, stores ou API do aplicativo: hook oficial de desenvolvimento usado apenas para leitura. Servidor Vite iniciado pelo próprio coletor na raiz do checkout validado, porta exclusiva e strictPort, evitando atribuir o SHA a um servidor preexistente. Requisições externas bloqueadas. Sem colaboração, contas ou dados reais.
