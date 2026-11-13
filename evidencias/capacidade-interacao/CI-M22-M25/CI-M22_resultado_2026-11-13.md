# CI-M22 · axe-core 4.10.2 e Lighthouse · 2026-11-13
URL: http://localhost:5000/
Navegador: Chrome 157.0.8103.51 (headless), janela 1366 × 768, win32
Regras do axe usadas: tags wcag2a, wcag2aa, wcag21a, wcag21aa, wcag22a, wcag22aa, mais as experimentais label-content-name-mismatch

## axe-core: violações por modo e estado

| Modo | Estado | Regra | Critério WCAG | Nível | Impacto | Elementos | Descrição | Exemplos |
| --- | --- | --- | --- | --- | --- | :-: | --- | --- |
| claro | inicial | `button-name` | wcag412 | wcag2a | critical | 1 | Buttons must have discernible text | `#radix-\:r2\:` |
| claro | inicial | `label-content-name-mismatch` | wcag253 | wcag21a | serious | 1 | Elements must have their visible text as part of their accessible name | `.reset-zoom-button` |
| claro | inicial | `meta-viewport` | wcag144 | wcag2aa | critical | 1 | Zooming and scaling must not be disabled | `meta[name="viewport"]` |
| claro | selecao | `aria-allowed-attr` | wcag412 | wcag2a | critical | 1 | Elements must only use supported ARIA attributes | `div[data-openpopup="fontFamily"]` |
| claro | selecao | `button-name` | wcag412 | wcag2a | critical | 1 | Buttons must have discernible text | `#radix-\:r2\:` |
| claro | selecao | `label-content-name-mismatch` | wcag253 | wcag21a | serious | 1 | Elements must have their visible text as part of their accessible name | `.reset-zoom-button` |
| claro | selecao | `meta-viewport` | wcag144 | wcag2aa | critical | 1 | Zooming and scaling must not be disabled | `meta[name="viewport"]` |
| claro | menu | `aria-required-children` | wcag131 | wcag2a | critical | 1 | Certain ARIA roles must contain particular children | `#radix-\:r3\:` |
| claro | menu | `button-name` | wcag412 | wcag2a | critical | 1 | Buttons must have discernible text | `#radix-\:r2\:` |
| claro | menu | `label-content-name-mismatch` | wcag253 | wcag21a | serious | 6 | Elements must have their visible text as part of their accessible name | `button[data-testid="load-button"]`<br>`button[data-testid="image-export-button"]`<br>`button[data-testid="command-palette-button"]` |
| claro | menu | `meta-viewport` | wcag144 | wcag2aa | critical | 1 | Zooming and scaling must not be disabled | `meta[name="viewport"]` |
| escuro | inicial | `button-name` | wcag412 | wcag2a | critical | 1 | Buttons must have discernible text | `#radix-\:r2\:` |
| escuro | inicial | `label-content-name-mismatch` | wcag253 | wcag21a | serious | 1 | Elements must have their visible text as part of their accessible name | `.reset-zoom-button` |
| escuro | inicial | `meta-viewport` | wcag144 | wcag2aa | critical | 1 | Zooming and scaling must not be disabled | `meta[name="viewport"]` |
| escuro | selecao | `aria-allowed-attr` | wcag412 | wcag2a | critical | 1 | Elements must only use supported ARIA attributes | `div[data-openpopup="fontFamily"]` |
| escuro | selecao | `button-name` | wcag412 | wcag2a | critical | 1 | Buttons must have discernible text | `#radix-\:r2\:` |
| escuro | selecao | `label-content-name-mismatch` | wcag253 | wcag21a | serious | 1 | Elements must have their visible text as part of their accessible name | `.reset-zoom-button` |
| escuro | selecao | `meta-viewport` | wcag144 | wcag2aa | critical | 1 | Zooming and scaling must not be disabled | `meta[name="viewport"]` |
| escuro | menu | `aria-required-children` | wcag131 | wcag2a | critical | 1 | Certain ARIA roles must contain particular children | `#radix-\:r3\:` |
| escuro | menu | `button-name` | wcag412 | wcag2a | critical | 1 | Buttons must have discernible text | `#radix-\:r2\:` |
| escuro | menu | `label-content-name-mismatch` | wcag253 | wcag21a | serious | 6 | Elements must have their visible text as part of their accessible name | `button[data-testid="load-button"]`<br>`button[data-testid="image-export-button"]`<br>`button[data-testid="command-palette-button"]` |
| escuro | menu | `meta-viewport` | wcag144 | wcag2aa | critical | 1 | Zooming and scaling must not be disabled | `meta[name="viewport"]` |

## axe-core: resumo

| Modo | Estado | Regras violadas | Elementos afetados |
| --- | --- | :-: | :-: |
| claro | inicial | 3 | 3 |
| claro | selecao | 4 | 4 |
| claro | menu | 4 | 9 |
| escuro | inicial | 3 | 3 |
| escuro | selecao | 4 | 4 |
| escuro | menu | 4 | 9 |

Regras distintas violadas (todos os modos e estados): 5 — button-name, label-content-name-mismatch, meta-viewport, aria-allowed-attr, aria-required-children

## axe-core: todos os elementos reprovados, por regra (sem repetir entre modos e estados)

| Regra | Elemento | HTML | Modos e estados |
| --- | --- | --- | --- |
| `button-name` | `#radix-\:r2\:` | `<button type="button" id="radix-:r2:" aria-haspopup="menu" aria-expanded="false" data-state="closed" class="dropdown-menu-button main-menu-trigger zen-mode-tran` | claro/inicial, claro/selecao, claro/menu, escuro/inicial, escuro/selecao, escuro/menu |
| `label-content-name-mismatch` | `.reset-zoom-button` | `<button class="ToolIcon_type_button ToolIcon_size_medium reset-zoom-button zoom-button ToolIcon_type_button--show ToolIcon" aria-label="Reset zoom" type="button` | claro/inicial, claro/selecao, claro/menu, escuro/inicial, escuro/selecao, escuro/menu |
| `meta-viewport` | `meta[name="viewport"]` | `<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover,shrink-to-fit=no">` | claro/inicial, claro/selecao, claro/menu, escuro/inicial, escuro/selecao, escuro/menu |
| `aria-allowed-attr` | `div[data-openpopup="fontFamily"]` | `<div data-openpopup="fontFamily" class="properties-trigger" type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-:r8:" data-state="cl` | claro/selecao, escuro/selecao |
| `aria-required-children` | `#radix-\:r3\:` | `<div data-side="bottom" data-align="start" role="menu" aria-orientation="vertical" data-state="open" data-radix-menu-content="" dir="ltr" id="radix-:r3:" aria-l` | claro/menu, escuro/menu |
| `label-content-name-mismatch` | `button[data-testid="load-button"]` | `<button data-testid="load-button" aria-label="Open" class="radix-menu-item dropdown-menu-item dropdown-menu-item-base" title="Open" role="menuitem" tabindex="-1` | claro/menu, escuro/menu |
| `label-content-name-mismatch` | `button[data-testid="image-export-button"]` | `<button data-testid="image-export-button" aria-label="Export image..." class="radix-menu-item dropdown-menu-item dropdown-menu-item-base" title="Export image...` | claro/menu, escuro/menu |
| `label-content-name-mismatch` | `button[data-testid="command-palette-button"]` | `<button data-testid="command-palette-button" aria-label="Command palette" class="radix-menu-item dropdown-menu-item dropdown-menu-item-base highlighted" title="` | claro/menu, escuro/menu |
| `label-content-name-mismatch` | `button[data-testid="search-menu-button"]` | `<button data-testid="search-menu-button" aria-label="Find on canvas" class="radix-menu-item dropdown-menu-item dropdown-menu-item-base" title="Find on canvas" r` | claro/menu, escuro/menu |
| `label-content-name-mismatch` | `a[aria-label="Discord"]` | `<a aria-label="Discord" href="https://discord.gg/UexuTaE" target="_blank" rel="noopener noopener" class="radix-menu-item dropdown-menu-item dropdown-menu-item-b` | claro/menu, escuro/menu |

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

Violações distintas somando axe-core e Lighthouse: 5 — button-name, label-content-name-mismatch, meta-viewport, aria-allowed-attr, aria-required-children
