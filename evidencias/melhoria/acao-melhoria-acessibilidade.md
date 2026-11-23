# Ação de melhoria: contraste e acessibilidade da interface

> Feito com apoio do Claude, ver `docs/uso-ia.md`. Resumo e justificativa na GitPage: [Oportunidades de melhoria e ação executada](../../docs/analise/melhoria.md).

## 1. Identificação

| Campo | Valor |
| --- | --- |
| Issue | #38 |
| Métricas alvo | CI-M25 (contraste mínimo de 4,5:1) e CI-M22 (violações da WCAG 2.2, A e AA) |
| Questão e objetivo | CI-Q9 · O6 (acessibilidade) |
| Tipo de ação | Modificação de código no Excalidraw (`aplicacao/`, commit-base `e7b5346`) |
| Responsável | André Henrique |
| Data | 2026-11-22 (antes e depois medidos no mesmo dia, no mesmo ambiente) |
| Ambiente | Build de produção (`yarn build:app:docker`) servido em `http://localhost:5000`; Google Chrome estável em modo headless via Playwright, janela 1366 × 768, interface em inglês; Linux |

## 2. O que foi alterado

O diff completo está em `melhoria-acessibilidade.patch` (aplica-se sobre `e7b5346` com `git apply`).

| # | Arquivo | Mudança | Métrica |
| --- | --- | --- | --- |
| M1 | `packages/excalidraw/css/theme.scss` | `--keybinding-color` (letras de atalho da barra e atalhos do menu) de `gray-40` (`#b8b8b8`) para `gray-70` (`#5c5c5c`) no claro e de `gray-60` (`#7a7a7a`) para `gray-50` (`#999999`) no escuro | CI-M25 |
| M2 | `packages/excalidraw/components/welcome-screen/WelcomeScreen.scss` | Textos de apoio, itens e atalhos da tela de boas-vindas: claro `gray-40/50` → `gray-70/80`; escuro `gray-60` → `gray-40/50` | CI-M25 |
| M3 | `packages/excalidraw/components/HintViewer.scss` | Dica "To move canvas, hold…": claro `gray-40` → `gray-70`; escuro `gray-60` → `gray-50` | CI-M25 |
| M4 | `packages/excalidraw/components/dropdownMenu/DropdownMenu.scss` | Atalhos do menu principal: tira o `opacity: 0.5` e usa `--keybinding-color` | CI-M25 |
| M5 | `excalidraw-app/index.scss` | Botão do Excalidraw+: título em `--color-primary-darkest` e subtítulo em `--color-primary-darker` (claro) e `--color-primary` (escuro) | CI-M25 |
| M6 | `excalidraw-app/index.html` | `<meta name="viewport">` sem `maximum-scale=1` e `user-scalable=no`, liberando o zoom do navegador | CI-M22 (V1) |
| M7 | `packages/excalidraw/components/main-menu/MainMenu.tsx` | Botão do menu principal com `aria-label` ("Menu") | CI-M22 (V2) |
| M8 | `packages/excalidraw/actions/actionCanvas.tsx` | Nome acessível do botão de zoom passa a conter o texto visível ("100% · Reset zoom") | CI-M22 (V5) |
| M9 | `packages/excalidraw/components/main-menu/DefaultItems.tsx` | Links "Discord chat" e "Follow us" com nome acessível igual ao texto visível | CI-M22 (V6) |

As cores novas são tokens que já existiam no tema; nenhuma cor nova foi criada.

## 3. Procedimento

1. Gerar o build de produção **sem alterações** e rodar o mesmo script da coleta original (`scripts/ci_m22_m25_acessibilidade.cjs`), guardando a saída em `antes/`.
2. Aplicar as mudanças M1 a M9, conferir os tipos (`npx tsc --noEmit`) e rodar a suíte de testes do Excalidraw.
3. Gerar o build de novo e rodar o script, guardando a saída em `depois/`. Repetir a medição uma segunda vez, sem o Lighthouse, para confirmar.
4. Contar as violações da CI-M22 com a mesma regra da evidência original: uma violação por regra em cada elemento, sem contar F1 a F4 (atalho junto ao nome do item do menu, já classificados como falso positivo na CI-M22).

```bash
# 2026-11-22, pasta aplicacao/excalidraw-app
yarn build:app:docker
npx vite preview --port 5000 --strictPort --host localhost
# raiz do repositório
node scripts/ci_m22_m25_acessibilidade.cjs --saida <antes|depois> --chrome /usr/bin/google-chrome
```

Saída antes (igual à da coleta de 13/11):

```text
CI-M22: 5 regra(s) distinta(s) violada(s): button-name, label-content-name-mismatch, meta-viewport, aria-allowed-attr, aria-required-children
Lighthouse claro: 87/100; reprovadas: button-name, label-content-name-mismatch, meta-viewport
Total: 8 de 19 combinações (42.1%)
```

Saída depois (as duas rodadas deram o mesmo resultado):

```text
CI-M22: 3 regra(s) distinta(s) violada(s): aria-allowed-attr, aria-required-children, label-content-name-mismatch
Lighthouse claro: 100/100; reprovadas: nenhuma
Total: 16 de 16 combinações (100.0%)
```

O `label-content-name-mismatch` que sobra no depois são só os itens F1 a F4 ("Open", "Export image...", "Command palette", "Find on canvas"), que a CI-M22 não conta.

## 4. Resultado

| Métrica | Antes | Depois | Nota antes | Nota depois |
| --- | --- | --- | :-: | :-: |
| CI-M25 · contraste ≥ 4,5:1 | 8 de 19 combinações (42,1%) | 16 de 16 (100%) | 0 | **2** |
| CI-M22 · violações A e AA | 6 (V1 a V6) | 2 (V3 e V4) | 0 | **1** |
| Lighthouse, acessibilidade | 87/100 | 100/100 | — | — |

O número de combinações caiu de 19 para 16 porque cores que antes eram diferentes passaram a ser o mesmo token (por exemplo, atalhos do menu, letras de atalho e textos de boas-vindas agora usam `#5c5c5c` no claro).

### Arquivos de apoio

| # | Arquivo | O que mostra |
| --- | --- | --- |
| E1 | `antes/CI-M25_resultado_2026-11-22.md` e `depois/CI-M25_resultado_2026-11-23.md` | As combinações de cor, com razão de contraste, antes e depois |
| E2 | `antes/CI-M25_textos_2026-11-22.json` e `depois/CI-M25_textos_2026-11-23.json` | Todos os textos coletados, com cor e fundo |
| E3 | `antes/CI-M22_resultado_2026-11-22.md` e `depois/CI-M22_resultado_2026-11-23.md` | Violações do axe-core e do Lighthouse |
| E4 | `antes/CI-M22_*-inicial_*.png` e `depois/CI-M22_*_2026-11-23.png` | Telas antes e depois, nos modos claro e escuro |
| E5 | `antes/CI-M22_lighthouse-claro_*.jpg` e `depois/CI-M22_lighthouse-claro_*.jpg` | Relatório do Lighthouse (87 e 100) |
| E6 | `melhoria-acessibilidade.patch` | Diff das mudanças M1 a M9 |

A data no nome dos arquivos é a do relógio UTC do script; as duas medições foram feitas em 22/11/2026, no horário de Brasília.

## 5. Limitações

- A ação muda uma cópia local do Excalidraw. As notas oficiais da avaliação continuam as do commit `e7b5346`; o "depois" mostra o efeito da mudança, não uma nova versão publicada.
- O recorte de telas é o mesmo da CI-M22 e da CI-M25 (inicial, seleção e menu, nos dois modos). Diálogos e biblioteca não foram medidos.
- Liberar o zoom do navegador (M6) não foi testado em aparelho real. No canvas, o Excalidraw trata a pinça como zoom do desenho, e o iOS já ignorava o `user-scalable=no` desde o iOS 10.
- V3 (gatilho do seletor de fonte) e V4 (papel do menu principal) continuam: exigem mudar a estrutura dos componentes do Radix e ficam como trabalho futuro.
- Os textos ficaram mais escuros no claro e mais claros no escuro. Isso reduz a diferença visual entre o texto principal e o de apoio; não foi feita avaliação estética com usuários.
