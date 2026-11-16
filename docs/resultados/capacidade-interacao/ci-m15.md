# CI-M15 · Ações destrutivas sem confirmação

**Nota 1/2**: 1 ação sem confirmação entre 4 tipos.

## Contexto da consolidação

| Item | Registro |
| --- | --- |
| Objetivo e questão GQM | O5 · CI-Q6 ([roteiro](../../analise/roteiro.md)) |
| Versão de referência | Excalidraw [`e7b534668a60add7f725531f3c9abf32508c7b4e`](https://github.com/excalidraw/excalidraw/commit/e7b534668a60add7f725531f3c9abf32508c7b4e); ressalvas de correspondência abaixo |
| Valor medido | 1 ação sem confirmação entre 4 tipos |
| Pontuação | **1/2** |
| Origem | [PR #99](https://github.com/FCTE-Qualidade-de-Software-1/2026-2_T02_ADA_LOVELACE/pull/99), integrado na main |

**Procedimento resumido:** Teste de limpar canvas, abrir arquivo sobre cena, remover item e limpar biblioteca, verificando confirmação e cancelamento antes da alteração.

**Resultado e justificativa:** Abrir arquivo substituiu a cena sem confirmação no fallback HTML; os outros três tipos pediram confirmação. Uma ação corresponde a 1.

**Limitações:** Contagem, não percentual. Não abrange seletor nativo ou drag-and-drop. Recuperação do conteúdo de D02 teve ressalva de index e não substitui confirmação preventiva. Validação manual e revisão cruzada pendentes.

**Evidência original:** [CI-M15_acoes-destrutivas.md](https://github.com/FCTE-Qualidade-de-Software-1/2026-2_T02_ADA_LOVELACE/blob/c9ac9610b92474af82cc9ad3e67dc53bfa3490d4/evidencias/capacidade-interacao/CI-M15/CI-M15_acoes-destrutivas.md), com dados, procedimento completo e arquivos de apoio. Esta página consolida a coleta existente; não registra nova medição ou aprovação humana.
