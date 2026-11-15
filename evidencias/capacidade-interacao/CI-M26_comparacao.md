# CI-M26 — Comparação: Coleta Independente vs. Registro Anterior

| Item | Coleta independente | Registro anterior | Divergência | Decisão com a Zayra |
| --- | --- | --- | --- | --- |
| Versão/commit | `a8800f822de70d8d82c9621f1afe684b9ed1394f` | `e7b5346` (não confirmado) | Commit diferente. A coleta anterior não foi confirmada via `git rev-parse`. | A estrutura foi verificada e se mantinha a mesma, por isso o uso da commit mais atual |
| Idiomas | 57 | 57 | Nenhuma | — |
| Total de strings | 642 | 642 | Nenhuma | — |
| Strings traduzidas | 594 | 594 | Nenhuma | — |
| Denominador | `en.json` (642) | `en.json` (642) | Nenhuma. Ambos corretamente usaram en.json, não percentages.json. | — |
| Percentual | 92.52% | 92.5% | Diferença de arredondamento (0.02%) | Insignificante. Ambos dentro da faixa 70%-94%. |
| Pontuação | **1** | **1** | Nenhuma | — |
| Amostra | 20 chaves avaliadas qualitativamente | Não documentada | A coleta independente incluiu amostra qualitativa; a anterior não. | A amostra qualitativa confirma que as traduções são adequadas. |

## Conclusão

**Não há divergência substantiva.** A pontuação independente é **1**, consistente com o registro anterior.

A única diferença relevante é a versão/commit avaliado. A coleta anterior mencionou o commit `e7b5346`. A coleta independente foi feita no commit `a8800f822de70d8d82c9621f1afe684b9ed1394f`.

Os números (642 chaves em en.json, 594 traduzidas, 92.5%) são idênticos, indicando que a estrutura de arquivos de idioma não mudou significativamente entre os commits.
