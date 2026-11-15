# CI-M26 — Reavaliação Independente (sem viés da avaliação da Zayra)

## 1. Identificação

| Campo | Valor |
| --- | --- |
| Métrica | CI-M26 : Idiomas e tradução para o português |
| Questão | CI-Q10 : Inclusividade (adapta-se a diferentes perfis de usuário?) |
| Responsável | Luís Felipe Parreira Cunha |
| Data da coleta | 2026-11-15 |

### Dados da Versão Avaliada
- **Commit:** `a8800f822de70d8d82c9621f1afe684b9ed1394f`
- **Caminho dos arquivos:**
  - `aplicacao/packages/excalidraw/locales/en.json`
  - `aplicacao/packages/excalidraw/locales/pt-BR.json`

## 1. Idiomas Disponíveis
**Total de idiomas:** 57 (arquivos JSON na pasta `locales`, excluindo `percentages.json`)

Lista completa:
ar-SA, az-AZ, bg-BG, bn-BD, bn-IN, ca-ES, cs-CZ, da-DK, de-CH, de-DE, el-GR, en, es-ES, eu-ES, fa-IR, fi-FI, fr-FR, gl-ES, he-IL, hi-IN, hu-HU, id-ID, it-IT, ja-JP, kaa, kab-KAB, kk-KZ, km-KH, ko-KR, ku-TR, lt-LT, lv-LV, mr-IN, my-MM, nb-NO, nl-NL, nn-NO, oc-FR, pa-IN, pl-PL, pt-BR, pt-PT, ro-RO, ru-RU, si-LK, sk-SK, sl-SI, sv-SE, ta-IN, th-TH, tr-TR, uk-UA, uz-UZ, vi-VN, zh-CN, zh-HK, zh-TW

## 2. Comparação en.json vs pt-BR.json

| Métrica | Valor |
| --- | --- |
| Total de chaves em `en.json` (denominador) | 642 |
| Chaves em `pt-BR.json` | 614 |
| Chaves traduzidas (não vazias) em pt-BR | 594 |
| Chaves ausentes em pt-BR | 28 |
| Chaves vazias em pt-BR | 20 |
| Chaves extras em pt-BR | 0 |
| Valores idênticos ao inglês | 21 |

**Cálculo da proporção:**
```
percentual = (594 ÷ 642) × 100 = 92.52%
```

## 3. Amostra Qualitativa (20 chaves)

| # | Chave | EN | PT-BR | Adequada? | Justificativa |
|---|-------|----|-------|-----------|---------------|
| 1 | `alerts.cannotExportEmptyCanvas` | Cannot export empty canvas. | Não é possível exportar uma tela vazia. | Adequada | Tradução correta e natural. |
| 2 | `buttons.createNewRoom` | Create new room | Criar nova sala | Adequada | Tradução direta e clara. |
| 3 | `buttons.zenMode` | Zen mode | Modo Zen | Adequada | Tradução padrão accepted. |
| 4 | `chat.rateLimit.messageLimit` | You've hit your AI limit... | Você atingiu o limite de IA... | Adequada | Tradução completa e contextual. |
| 5 | `colors.white` | White | Branco | Adequada | Tradução correta. |
| 6 | `elementLink.title` | Link to object | Links para o objeto | Adequada | Tradução adequada. |
| 7 | `errors.svgImageInsertError` | Couldn't insert SVG image... | Não foi possível inserir a imagem SVG... | Adequada | Tradução correta. |
| 8 | `helpDialog.drag` | drag | arrastar | Adequada | Tradução correta do verbo. |
| 9 | `hints.enterCropEditor` | Double click the image... | Clique duas vezes na imagem... | Adequada | Tradução completa. |
| 10 | `imageExportDialog.title.copyPngToClipboard` | Copy PNG to clipboard | Copiar PNG para área de transferência | Adequada | Tradução correta. |
| 11 | `labels.arrowhead_cardinality_one_or_many` | Cardinality (one or many) | Cardinalidade (um ou muitos) | Adequada | Tradução correta. |
| 12 | `labels.center` | Center | Centralizar | Adequada | Tradução adequada (verbo). |
| 13 | `labels.drawingCanvas` | Drawing canvas | Tela de desenho | Adequada | Tradução natural. |
| 14 | `labels.lineEditor.edit` | Edit line | Editar linha | Adequada | Tradução correta. |
| 15 | `labels.polygon.convertToPolygon` | Convert to polygon | Converter para polígono | Adequada | Tradução correta. |
| 16 | `labels.tab` | Tab | Aba | Adequada | Tradução correta. |
| 17 | `mermaid.inputPlaceholder` | Write Mermaid diagram... | Escreva definição de diagrama Mermaid... | Adequada | Tradução completa. |
| 18 | `publishDialog.libraryName` | Library name | Nome da Biblioteca | Adequada | Tradução correta. |
| 19 | `search.placeholder` | Find text on canvas... | Procurar texto na tela... | Adequada | Tradução natural. |
| 20 | `toast.pasteAsSingleElement` | Use {{shortcut}} to paste... | Use {{shortcut}} para colar... | Adequada | Tradução completa. |

**Itens inadequados ou não avaliáveis:** Nenhum

## 4. Pontuação Independente

| Item | Valor |
| --- | --- |
| Versão/commit | `a8800f822de70d8d82c9621f1afe684b9ed1394f` |
| Idiomas disponíveis | 57 |
| Total de chaves em en.json | 642 |
| Chaves traduzidas em pt-BR | 594 |
| Chaves ausentes | 28 |
| Chaves vazias | 20 |
| Percentual calculado | 92.52% |
| Tamanho da amostra | 20 chaves |
| Itens inadequados ou não avaliáveis | 0 |
| **Pontuação independente** | **1** |
| Limitações | Amostra qualitativa pequena; valores idênticos ao inglês (21) foram mantidos na contagem quantitativa conforme regra. |

## 5. Critério de Pontuação CI-M26

| Proporção | Pontuação | Aplicável? |
| ---: | ---: | ---: |
| ≥ 95% | 2 | Não (92.52%) |
| 70% a 94% | 1 | **Sim** |
| < 70% ou sem português | 0 | Não |

**Pontuação atribuída: 1**
