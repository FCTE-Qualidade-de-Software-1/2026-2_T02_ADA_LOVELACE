# CI-M16 · Perda de dados ao fechar ou recarregar

**Nota 2**: não houve perda de dados nos dois cenários testados. Uma cena com retângulo, elipse e texto,
sem salvamento manual, voltou igual depois de recarregar a página e depois de
fechar e reabrir a aba, com os mesmos elementos, posições, dimensões, cores e
texto.

!!! note "Limitações"
    A coleta esperou a cena ser gravada no navegador antes de recarregar ou
    fechar. Não foram testados fechar durante a gravação, travamento, reinício
    do navegador ou do sistema, nem cenas com vínculos, imagens ou
    colaboração. A validação manual e a revisão por outro integrante estão
    pendentes.

## Contexto da consolidação

| Item | Registro |
| --- | --- |
| Objetivo e questão GQM | O5 · CI-Q6 ([roteiro](../../analise/roteiro.md)) |
| Versão de referência | Excalidraw [`e7b534668a60add7f725531f3c9abf32508c7b4e`](https://github.com/excalidraw/excalidraw/commit/e7b534668a60add7f725531f3c9abf32508c7b4e); ressalvas de correspondência abaixo |
| Valor medido | Não houve perda nos 2 cenários testados |
| Pontuação | **2/2** |
| Origem | [PR #99](https://github.com/FCTE-Qualidade-de-Software-1/2026-2_T02_ADA_LOVELACE/pull/99), integrado na main |

**Procedimento resumido:** Cena fictícia de três elementos; espera pela confirmação de autosave; reload e fechamento/reabertura da aba no mesmo contexto.

**Resultado e justificativa:** Conteúdo e IDs foram preservados nos dois cenários; Não corresponde a 2.

**Limitações:** Não testou fechamento com gravação pendente, crash ou reinício do navegador/SO. Cena sem imagens, vínculos ou colaboração; null para [] em boundElements foi normalização registrada. Validação manual e revisão cruzada pendentes.

**Evidência original:** [CI-M16_recuperacao-dados.md](https://github.com/FCTE-Qualidade-de-Software-1/2026-2_T02_ADA_LOVELACE/blob/c9ac9610b92474af82cc9ad3e67dc53bfa3490d4/evidencias/capacidade-interacao/CI-M16/CI-M16_recuperacao-dados.md), com dados, procedimento completo e arquivos de apoio. Esta página consolida a coleta existente; não registra nova medição ou aprovação humana.

Registro completo:
[`CI-M16_recuperacao-dados.md`](https://github.com/FCTE-Qualidade-de-Software-1/2026-2_T02_ADA_LOVELACE/tree/main/evidencias/capacidade-interacao/CI-M16).
Dados e capturas da coleta:
[`CI-M15-M16`](https://github.com/FCTE-Qualidade-de-Software-1/2026-2_T02_ADA_LOVELACE/tree/main/evidencias/capacidade-interacao/CI-M15-M16).
