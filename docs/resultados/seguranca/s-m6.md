# S-M6 · Inconsistências após edições simultâneas

**Nota 1**: em 2 de 8 rodadas com três participantes editando o mesmo elemento,
eles terminaram com versões diferentes. Numa delas, a diferença persistiu
2 min sem novas edições. Quem perde o desempate sobe a versão sozinho
(`bumpElementVersions`, `Collab.tsx:790`). Se isso acontece depois da última
ressincronização dessa janela, a versão não chega aos outros, e uma edição
posterior pode se perder.

```mermaid
flowchart LR
    A["A: v7261"] -->|"empate"| B["B adota A<br/>e sobe para v7262"]
    B -.->|"não retransmite"| AC["A e C ficam em v7261"]
```

Registro completo:
[`evidencias/seguranca/S-M6`](https://github.com/FCTE-Qualidade-de-Software-1/2026-2_T02_ADA_LOVELACE/tree/main/evidencias/seguranca/S-M6).

## Contexto da consolidação

| Item | Registro |
| --- | --- |
| Objetivo e questão GQM | O1 · S-Q3 ([roteiro](../../analise/roteiro.md)) |
| Valor medido | 2 em 8 rodadas |
| Pontuação | **1/2** |
| Origem | [PR #102](https://github.com/FCTE-Qualidade-de-Software-1/2026-2_T02_ADA_LOVELACE/pull/102), aprovado por outro integrante e integrado na main |

**Procedimento resumido:** Oito rodadas concorrentes com três janelas; comparação após 30 segundos e, em parte das rodadas, após dois minutos.

**Resultado e justificativa:** Duas rodadas terminaram com versões divergentes; a faixa de uma a duas inconsistências recebe 1.

**Limitações:** Teste local com concorrência controlada; não estima frequência para todos os usuários. Divergência temporária foi separada da persistente.

**Evidência original:** [S-M6_edicao-simultanea.md](https://github.com/FCTE-Qualidade-de-Software-1/2026-2_T02_ADA_LOVELACE/blob/c9ac9610b92474af82cc9ad3e67dc53bfa3490d4/evidencias/seguranca/S-M6/S-M6_edicao-simultanea.md), com dados, procedimento completo e arquivos de apoio. Esta página consolida a coleta existente, sem nova medição.
