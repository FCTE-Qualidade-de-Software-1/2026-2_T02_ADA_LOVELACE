# CI-M22 · axe-core 4.10.2 e Lighthouse · 2026-11-23
URL: http://localhost:5000/
Navegador: Chrome 157.0.8103.50 (headless), janela 1366 × 768, linux
Regras do axe usadas: tags wcag2a, wcag2aa, wcag21a, wcag21aa, wcag22a, wcag22aa, mais as experimentais label-content-name-mismatch

## axe-core: violações por modo e estado

| Modo | Estado | Regra | Critério WCAG | Nível | Impacto | Elementos | Descrição | Exemplos |
| --- | --- | --- | --- | --- | --- | :-: | --- | --- |
| claro | selecao | `aria-allowed-attr` | wcag412 | wcag2a | critical | 1 | Elements must only use supported ARIA attributes | `div[data-openpopup="fontFamily"]` |
| claro | menu | `aria-required-children` | wcag131 | wcag2a | critical | 1 | Certain ARIA roles must contain particular children | `#radix-\:r3\:` |
| claro | menu | `label-content-name-mismatch` | wcag253 | wcag21a | serious | 4 | Elements must have their visible text as part of their accessible name | `button[data-testid="load-button"]`<br>`button[data-testid="image-export-button"]`<br>`button[data-testid="command-palette-button"]` |
| escuro | selecao | `aria-allowed-attr` | wcag412 | wcag2a | critical | 1 | Elements must only use supported ARIA attributes | `div[data-openpopup="fontFamily"]` |
| escuro | menu | `aria-required-children` | wcag131 | wcag2a | critical | 1 | Certain ARIA roles must contain particular children | `#radix-\:r3\:` |
| escuro | menu | `label-content-name-mismatch` | wcag253 | wcag21a | serious | 4 | Elements must have their visible text as part of their accessible name | `button[data-testid="load-button"]`<br>`button[data-testid="image-export-button"]`<br>`button[data-testid="command-palette-button"]` |

## axe-core: resumo

| Modo | Estado | Regras violadas | Elementos afetados |
| --- | --- | :-: | :-: |
| claro | inicial | 0 | 0 |
| claro | selecao | 1 | 1 |
| claro | menu | 2 | 5 |
| escuro | inicial | 0 | 0 |
| escuro | selecao | 1 | 1 |
| escuro | menu | 2 | 5 |

Regras distintas violadas (todos os modos e estados): 3 — aria-allowed-attr, aria-required-children, label-content-name-mismatch

## axe-core: todos os elementos reprovados, por regra (sem repetir entre modos e estados)

| Regra | Elemento | HTML | Modos e estados |
| --- | --- | --- | --- |
| `aria-allowed-attr` | `div[data-openpopup="fontFamily"]` | `<div data-openpopup="fontFamily" class="properties-trigger" type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-:r8:" data-state="cl` | claro/selecao, escuro/selecao |
| `aria-required-children` | `#radix-\:r3\:` | `<div data-side="bottom" data-align="start" role="menu" aria-orientation="vertical" data-state="open" data-radix-menu-content="" dir="ltr" id="radix-:r3:" aria-l` | claro/menu, escuro/menu |
| `label-content-name-mismatch` | `button[data-testid="load-button"]` | `<button data-testid="load-button" aria-label="Open" class="radix-menu-item dropdown-menu-item dropdown-menu-item-base" title="Open" role="menuitem" tabindex="-1` | claro/menu, escuro/menu |
| `label-content-name-mismatch` | `button[data-testid="image-export-button"]` | `<button data-testid="image-export-button" aria-label="Export image..." class="radix-menu-item dropdown-menu-item dropdown-menu-item-base" title="Export image...` | claro/menu, escuro/menu |
| `label-content-name-mismatch` | `button[data-testid="command-palette-button"]` | `<button data-testid="command-palette-button" aria-label="Command palette" class="radix-menu-item dropdown-menu-item dropdown-menu-item-base highlighted" title="` | claro/menu, escuro/menu |
| `label-content-name-mismatch` | `button[data-testid="search-menu-button"]` | `<button data-testid="search-menu-button" aria-label="Find on canvas" class="radix-menu-item dropdown-menu-item dropdown-menu-item-base" title="Find on canvas" r` | claro/menu, escuro/menu |

## Lighthouse (categoria acessibilidade, tela inicial, preset desktop)

- claro: nota 100/100 (Lighthouse 12.6.1, janela 1350 × 940); auditorias reprovadas: 0
- escuro: nota 100/100 (Lighthouse 12.6.1, janela 1350 × 940); auditorias reprovadas: 0

## axe-core: contraste não decidido (incomplete) por estado

| Modo | Estado | Elementos | Motivos informados pelo axe |
| --- | --- | :-: | --- |
| claro | inicial | 22 | Element's background color could not be determined because it is overlapped by another element; Element content is too short to determine if it is actual text content |
| claro | selecao | 26 | Element's background color could not be determined because it is overlapped by another element; Element content is too short to determine if it is actual text content |
| claro | menu | 43 | Element's background color could not be determined because it is overlapped by another element; Element content is too short to determine if it is actual text content |
| escuro | inicial | 22 | Element's background color could not be determined because it is overlapped by another element; Element content is too short to determine if it is actual text content |
| escuro | selecao | 26 | Element's background color could not be determined because it is overlapped by another element; Element content is too short to determine if it is actual text content |
| escuro | menu | 43 | Element's background color could not be determined because it is overlapped by another element; Element content is too short to determine if it is actual text content |

Violações distintas somando axe-core e Lighthouse: 3 — aria-allowed-attr, aria-required-children, label-content-name-mismatch
