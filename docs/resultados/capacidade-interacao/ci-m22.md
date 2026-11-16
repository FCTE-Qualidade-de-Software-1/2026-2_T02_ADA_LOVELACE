# CI-M22 · Violações da WCAG 2.2 (A e AA)

**Nota 0/2**: 6 violações distintas.

## Contexto da consolidação

| Item | Registro |
| --- | --- |
| Objetivo e questão GQM | O6 · CI-Q9 ([roteiro](../../analise/roteiro.md)) |
| Versão de referência | Excalidraw [`e7b534668a60add7f725531f3c9abf32508c7b4e`](https://github.com/excalidraw/excalidraw/commit/e7b534668a60add7f725531f3c9abf32508c7b4e); ressalvas de correspondência abaixo |
| Valor medido | 6 violações distintas |
| Pontuação | **0/2** |
| Origem | [PR #101](https://github.com/FCTE-Qualidade-de-Software-1/2026-2_T02_ADA_LOVELACE/pull/101), integrado na main |

**Procedimento resumido:** axe-core e Lighthouse em três estados da tela principal, modos claro/escuro, com deduplicação e conferência dos elementos.

**Resultado e justificativa:** Foram registradas seis violações distintas por regra e elemento, após excluir quatro falsos positivos. Seis ou mais recebe 0.

**Limitações:** Por regra distinta seriam cinco, nota 1; a unidade adotada é regra por elemento. Ferramentas não cobrem canvas nem todos os diálogos. Revisado por não preenchido; ajustes do PR #101 já integrados.

**Evidência original:** [CI-M22_violacoes-wcag.md](https://github.com/FCTE-Qualidade-de-Software-1/2026-2_T02_ADA_LOVELACE/blob/c9ac9610b92474af82cc9ad3e67dc53bfa3490d4/evidencias/capacidade-interacao/CI-M22_violacoes-wcag.md), com dados, procedimento completo e arquivos de apoio. Esta página consolida a coleta existente; não registra nova medição ou aprovação humana.
