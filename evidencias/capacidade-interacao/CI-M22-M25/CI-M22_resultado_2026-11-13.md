# CI-M22 · axe-core 4.10.2 e Lighthouse · 2026-11-13
URL: http://localhost:5000/
Navegador: Chrome 157.0.8103.51 (headless), janela 1366 × 768, win32
Regras do axe usadas: tags wcag2a, wcag2aa, wcag21a, wcag21aa, wcag22a, wcag22aa

## axe-core: violações por modo e estado

| Modo | Estado | Regra | Critério WCAG | Nível | Impacto | Elementos | Descrição | Exemplos |
| --- | --- | --- | --- | --- | --- | :-: | --- | --- |
| claro | inicial | `button-name` | wcag412 | wcag2a | critical | 1 | Buttons must have discernible text | `#radix-\:r2\:` |
| claro | inicial | `meta-viewport` | wcag144 | wcag2aa | critical | 1 | Zooming and scaling must not be disabled | `meta[name="viewport"]` |
| claro | selecao | `aria-allowed-attr` | wcag412 | wcag2a | critical | 1 | Elements must only use supported ARIA attributes | `div[data-openpopup="fontFamily"]` |
| claro | selecao | `button-name` | wcag412 | wcag2a | critical | 1 | Buttons must have discernible text | `#radix-\:r2\:` |
| claro | selecao | `meta-viewport` | wcag144 | wcag2aa | critical | 1 | Zooming and scaling must not be disabled | `meta[name="viewport"]` |
| claro | menu | `aria-required-children` | wcag131 | wcag2a | critical | 1 | Certain ARIA roles must contain particular children | `#radix-\:r3\:` |
| claro | menu | `button-name` | wcag412 | wcag2a | critical | 1 | Buttons must have discernible text | `#radix-\:r2\:` |
| claro | menu | `meta-viewport` | wcag144 | wcag2aa | critical | 1 | Zooming and scaling must not be disabled | `meta[name="viewport"]` |
| escuro | inicial | `button-name` | wcag412 | wcag2a | critical | 1 | Buttons must have discernible text | `#radix-\:r2\:` |
| escuro | inicial | `meta-viewport` | wcag144 | wcag2aa | critical | 1 | Zooming and scaling must not be disabled | `meta[name="viewport"]` |
| escuro | selecao | `aria-allowed-attr` | wcag412 | wcag2a | critical | 1 | Elements must only use supported ARIA attributes | `div[data-openpopup="fontFamily"]` |
| escuro | selecao | `button-name` | wcag412 | wcag2a | critical | 1 | Buttons must have discernible text | `#radix-\:r2\:` |
| escuro | selecao | `meta-viewport` | wcag144 | wcag2aa | critical | 1 | Zooming and scaling must not be disabled | `meta[name="viewport"]` |
| escuro | menu | `aria-required-children` | wcag131 | wcag2a | critical | 1 | Certain ARIA roles must contain particular children | `#radix-\:r3\:` |
| escuro | menu | `button-name` | wcag412 | wcag2a | critical | 1 | Buttons must have discernible text | `#radix-\:r2\:` |
| escuro | menu | `meta-viewport` | wcag144 | wcag2aa | critical | 1 | Zooming and scaling must not be disabled | `meta[name="viewport"]` |

## axe-core: resumo

| Modo | Estado | Regras violadas | Elementos afetados |
| --- | --- | :-: | :-: |
| claro | inicial | 2 | 2 |
| claro | selecao | 3 | 3 |
| claro | menu | 3 | 3 |
| escuro | inicial | 2 | 2 |
| escuro | selecao | 3 | 3 |
| escuro | menu | 3 | 3 |

Regras distintas violadas (todos os modos e estados): 4 — button-name, meta-viewport, aria-allowed-attr, aria-required-children

## Lighthouse (categoria acessibilidade, tela inicial, preset desktop)

- claro: nota 87/100 (Lighthouse 12.6.1, janela 1350 × 940); auditorias reprovadas: 3
    - `button-name` (Buttons do not have an accessible name): 1 elemento(s); ex.: `<button type="button" id="radix-:r2:" aria-haspopup="menu" aria-expanded="false" data-state="closed" class="dropdown-men`
    - `label-content-name-mismatch` (Elements with visible text labels do not have matching accessible names.): 1 elemento(s); ex.: `<button class="ToolIcon_type_button ToolIcon_size_medium reset-zoom-button zoom-button To…" aria-label="Reset zoom" type`
    - `meta-viewport` (`[user-scalable="no"]` is used in the `<meta name="viewport">` element or the `[maximum-scale]` attribute is less than 5.): 1 elemento(s); ex.: `<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no,viewpo…">`
- escuro: nota 87/100 (Lighthouse 12.6.1, janela 1350 × 940); auditorias reprovadas: 3
    - `button-name` (Buttons do not have an accessible name): 1 elemento(s); ex.: `<button type="button" id="radix-:r2:" aria-haspopup="menu" aria-expanded="false" data-state="closed" class="dropdown-men`
    - `label-content-name-mismatch` (Elements with visible text labels do not have matching accessible names.): 1 elemento(s); ex.: `<button class="ToolIcon_type_button ToolIcon_size_medium reset-zoom-button zoom-button To…" aria-label="Reset zoom" type`
    - `meta-viewport` (`[user-scalable="no"]` is used in the `<meta name="viewport">` element or the `[maximum-scale]` attribute is less than 5.): 1 elemento(s); ex.: `<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no,viewpo…">`

## axe-core: contraste não decidido (incomplete) por estado

| Modo | Estado | Elementos | Motivos informados pelo axe |
| --- | --- | :-: | --- |
| claro | inicial | 22 | Element's background color could not be determined because it is overlapped by another element; Element content is too short to determine if it is actual text content |
| claro | selecao | 26 | Element's background color could not be determined because it is overlapped by another element; Element content is too short to determine if it is actual text content |
| claro | menu | 43 | Element's background color could not be determined because it is overlapped by another element; Element content is too short to determine if it is actual text content |
| escuro | inicial | 22 | Element's background color could not be determined because it is overlapped by another element; Element content is too short to determine if it is actual text content |
| escuro | selecao | 26 | Element's background color could not be determined because it is overlapped by another element; Element content is too short to determine if it is actual text content |
| escuro | menu | 43 | Element's background color could not be determined because it is overlapped by another element; Element content is too short to determine if it is actual text content |

Violações distintas somando axe-core e Lighthouse: 5 — button-name, meta-viewport, aria-allowed-attr, aria-required-children, label-content-name-mismatch
