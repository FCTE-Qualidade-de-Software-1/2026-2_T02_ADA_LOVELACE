# CI-M26 — Comparação: Coleta Independente vs. Registro Anterior

| Item | Coleta independente | Registro anterior | Divergência | Decisão com a Zayra |
| --- | --- | --- | --- | --- |
| Versão do Excalidraw | `e7b5346` (código em `aplicacao/`) | `e7b5346` | Nenhuma. `a8800f8` é o snapshot do repositório do grupo, não uma versão do Excalidraw; `locales/` não mudou desde que o código foi incorporado (`07efd32`). | — |
| Idiomas | 57 | 57 | Nenhuma | — |
| Total de strings | 642 | 642 | Nenhuma | — |
| Strings traduzidas | 594 | 594 | Nenhuma | — |
| Denominador | `en.json` (642) | `en.json` (642) | Nenhuma. Ambos corretamente usaram en.json, não percentages.json. | — |
| Percentual | 92,52% | 92,5% | Apenas arredondamento | Insignificante. Ambos dentro da faixa 70% a 94%. |
| Pontuação | **1** | **1** | Nenhuma | — |
| Amostra | 20 chaves avaliadas qualitativamente | Não documentada | A coleta independente incluiu amostra qualitativa; a anterior não. | A amostra qualitativa confirma que as traduções são adequadas. |

## Conclusão

**Não há divergência substantiva.** A pontuação independente é **1**, consistente com o registro anterior.

As duas coletas avaliaram o mesmo código do Excalidraw (`e7b5346`): os arquivos de `aplicacao/packages/excalidraw/locales/` só foram alterados no commit que incorporou o código (`07efd32`). Por isso os números (642 chaves em `en.json`, 594 traduzidas, 92,5%) são idênticos.
