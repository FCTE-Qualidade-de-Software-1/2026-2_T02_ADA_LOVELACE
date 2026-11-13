# Evidência CI-M22 : Violações da WCAG 2.2, níveis A e AA

> Status: **coleta automatizada com axe-core e Lighthouse** (feito com apoio do Claude, ver `docs/uso-ia.md`).

## 1. Identificação

| Campo | Valor |
| --- | --- |
| Métrica | CI-M22 : Violações da WCAG 2.2, níveis A e AA |
| Questão (CI-Q) | CI-Q9 : Assistência ao usuário (pessoas com deficiência conseguem usar o Excalidraw?) |
| Tarefa do plano | CI-M22, acessibilidade (O6), ver `tarefas-capacidade-interacao.md` |
| Issue | #72 (parte da #19) |
| Responsável | Giovanna Felipe |
| Data da coleta | 2026-11-13 |
| Versão avaliada | `e7b5346` |
| Ambiente | Build de produção do Excalidraw servido em `http://localhost:5000`; Google Chrome 157.0.8103.51 (headless, via Playwright 1.58.2), interface em inglês; axe-core 4.10.2; Lighthouse 12.6.1; Windows 11 |
| Revisado por | — |

## 2. O que foi medido

Número de violações dos critérios de nível A e AA da WCAG 2.2 na tela principal, detectadas por ferramenta automática ([roteiro](../../docs/analise/roteiro.md), CI-M22). Foram usadas duas das ferramentas do roteiro: o **axe-core**, que é o motor do axe DevTools, e o **Lighthouse**.

Recorte: a tela principal nos modos claro e escuro, em três estados: inicial (tela de boas-vindas), com uma forma e um texto selecionados (painel de propriedades aberto) e com o menu principal aberto. Os dois últimos estados entraram porque o painel e o menu fazem parte da tela principal e só aparecem depois de uma ação.

**Como se conta:** uma violação é um problema distinto, isto é, uma regra reprovada num elemento. O mesmo elemento reprovado pela mesma regra em vários estados, nos dois modos ou nas duas ferramentas conta uma vez só.

## 3. Procedimento

1. Gerar o build de produção e servi-lo localmente (comandos em 3.1).
2. Abrir o app no Chrome em 1366 × 768, gravar o tema no `localStorage` (`excalidraw-theme`) e recarregar.
3. Em cada modo (claro e escuro) e estado (inicial, seleção e menu), injetar o axe-core e rodar só as regras com as tags `wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa`, `wcag22a` e `wcag22aa`. O script guarda as violações e um print de cada estado.
4. Rodar o Lighthouse (categoria acessibilidade, preset desktop) na tela inicial, nos dois modos. Como o Lighthouse não deixa escolher o tema, o script grava o tema num perfil novo do Chrome, abre o Chrome com esse perfil e conecta o Lighthouse a ele (`--port` e `--disable-storage-reset`). O print de página inteira do Lighthouse confirma o tema de cada execução (E3).
5. Juntar as violações das duas ferramentas, tirar as repetidas e conferir cada uma no código (seção 4.1).

### 3.1 Comandos executados

```bash
# 2026-11-13, pasta aplicacao/
npx yarn@1.22.22 install --frozen-lockfile
(cd excalidraw-app && npx yarn@1.22.22 build:app:docker)   # build de produção, Sentry desligado
(cd excalidraw-app && npx vite preview --port 5000 --strictPort --host localhost)
```

```bash
# 2026-11-13 13:45, raiz do repositório
node scripts/ci_m22_m25_acessibilidade.cjs --saida evidencias/capacidade-interacao/CI-M22-M25
```

```text
claro/inicial: 2 regra(s) violada(s) no axe; 20 aprovadas; contraste incompleto em 22 elemento(s)
claro/selecao: 3 regra(s) violada(s) no axe; 23 aprovadas; contraste incompleto em 26 elemento(s)
claro/menu: 3 regra(s) violada(s) no axe; 25 aprovadas; contraste incompleto em 43 elemento(s)
escuro/inicial: 2 regra(s) violada(s) no axe; 20 aprovadas; contraste incompleto em 22 elemento(s)
escuro/selecao: 3 regra(s) violada(s) no axe; 23 aprovadas; contraste incompleto em 26 elemento(s)
escuro/menu: 3 regra(s) violada(s) no axe; 25 aprovadas; contraste incompleto em 43 elemento(s)
Lighthouse claro: 87/100; reprovadas: button-name, label-content-name-mismatch, meta-viewport
Lighthouse escuro: 87/100; reprovadas: button-name, label-content-name-mismatch, meta-viewport
```

O script foi rodado duas vezes, com o mesmo resultado. A saída completa está em `CI-M22-M25/CI-M22_resultado_2026-11-13.md` (E1).

## 4. Evidências

### 4.1 Trechos de código

| # | Arquivo:linha | O que mostra |
| --- | --- | --- |
| C1 | `aplicacao/excalidraw-app/index.html:6-8` | `<meta name="viewport">` com `maximum-scale=1` e `user-scalable=no`, os atributos que a regra `meta-viewport` reprova (V1) |
| C2 | `aplicacao/packages/excalidraw/components/main-menu/MainMenu.tsx:43-55` | O botão do menu principal só tem o ícone (`HamburgerMenuIcon`), sem `aria-label` nem `title` (V2) |
| C3 | `aplicacao/packages/excalidraw/components/FontPicker/FontPickerTrigger.tsx:35-36` | O gatilho do seletor de fonte é um `<div>` sem papel dentro de `Popover.Trigger asChild`; o Radix põe `aria-haspopup` e `aria-expanded` nesse `<div>`, onde não são permitidos (V3) |
| C4 | `aplicacao/excalidraw-app/components/AppMainMenu.tsx:81-86` e `aplicacao/packages/excalidraw/components/dropdownMenu/DropdownMenuContent.tsx:93` | O menu principal tem `role="menu"` (Radix), mas inclui o seletor de tema, a lista de idiomas (`<select>`) e o seletor de cor do fundo, que não são itens de menu (V4) |
| C5 | `aplicacao/packages/excalidraw/actions/actionCanvas.tsx:276-285` | O botão de zoom mostra "100%", mas o nome acessível é "Reset zoom", que não contém o texto visível (V5) |

### 4.2 Arquivos de apoio

Todos em `evidencias/capacidade-interacao/CI-M22-M25/`.

| # | Arquivo | Tipo | O que mostra |
| --- | --- | --- | --- |
| E1 | `CI-M22_resultado_2026-11-13.md` | saída do script | Violações do axe por modo e estado, resultado do Lighthouse e contraste não decidido pelo axe |
| E2 | `CI-M22_<modo>-<estado>_2026-11-13.png` | prints | Os seis estados avaliados com o axe |
| E3 | `CI-M22_lighthouse-<modo>_2026-11-13.json` e `.jpg` | relatório e print | Relatório completo do Lighthouse e o print de página inteira de cada modo |
| E4 | `scripts/ci_m22_m25_acessibilidade.cjs` | script | Coleta automatizada da CI-M22 e da CI-M25 |

### 4.3 Buscas sem resultado

| O que se procurou | Onde / comando | Resultado |
| --- | --- | --- |
| Nome acessível no botão do menu principal | `grep -n "aria-label\|title=" aplicacao/packages/excalidraw/components/main-menu/MainMenu.tsx` | Nenhuma ocorrência |

## 5. Resultado

### 5.1 Dados brutos

| # | Regra | Critério WCAG | Nível | Elemento | axe-core | Lighthouse | Em que estados |
| --- | --- | --- | --- | --- | :-: | :-: | --- |
| V1 | `meta-viewport` | 1.4.4 Redimensionar texto | AA | `<meta name="viewport">` (C1) | Sim | Sim | todos, nos dois modos |
| V2 | `button-name` | 4.1.2 Nome, função, valor | A | botão do menu principal (C2) | Sim | Sim | todos, nos dois modos |
| V3 | `aria-allowed-attr` | 4.1.2 Nome, função, valor | A | gatilho do seletor de fonte (C3) | Sim | — | seleção, nos dois modos |
| V4 | `aria-required-children` | 1.3.1 Informações e relações | A | menu principal aberto (C4) | Sim | — | menu, nos dois modos |
| V5 | `label-content-name-mismatch` | 2.5.3 Rótulo no nome | A | botão "100%" de zoom (C5) | — | Sim | inicial, nos dois modos |

O Lighthouse só avaliou a tela inicial, por isso não acusa V3 e V4, que dependem de seleção ou do menu aberto. O axe não acusa V5 porque a regra `label-content-name-mismatch` é marcada como experimental e fica fora das tags WCAG. O Lighthouse a roda à parte.

Cada violação atinge um elemento. Os resultados são iguais nos modos claro e escuro.

### 5.2 Cálculo

Violações distintas = V1 a V5 = **5** (4 do axe-core, 3 do Lighthouse, 2 em comum).

**Sensibilidade:**

- Só com o axe-core, seriam 4; só com o Lighthouse, 3. Os dois casos dão nota 1.
- Contando cada repetição por estado e modo, o axe registra 16 ocorrências (E1), o que daria nota 0. Essa contagem não foi adotada porque repete o mesmo problema no mesmo elemento.
- **Contraste:** nenhuma das ferramentas acusou violação de contraste (1.4.3). O axe deixou de 22 a 43 textos por estado como "incompletos", porque o texto fica sobre o canvas e o axe não consegue decidir a cor do fundo (E1). A medição da CI-M25 mostra que há texto abaixo de 4,5:1. Somando o critério 1.4.3, seriam **6** violações, nota 0. Como a métrica conta as violações **detectadas pelas ferramentas**, o valor adotado é 5, e o contraste fica com a CI-M25.

### 5.3 Pontuação

| Valor medido | Regra da métrica | Pontuação |
| --- | --- | --- |
| 5 violações | 2 = 0; 1 = 1 a 5; 0 = ≥ 6 | **1** |

**Justificativa:** as duas ferramentas acharam 5 problemas distintos de nível A ou AA, todos em controles da interface (zoom bloqueado, botão sem nome, ARIA inválido e rótulo diferente do nome). O valor está no limite da faixa 1: com o contraste, que as ferramentas não conseguem avaliar sobre o canvas, passaria para 0.

## 6. Observações e limitações

- **Ferramentas automáticas.** O axe e o Lighthouse só acham parte dos problemas da WCAG. Teclado (CI-M23), leitor de tela (CI-M24) e contraste sobre o canvas (CI-M25) precisam de outras medições.
- **O canvas não é avaliado.** O desenho fica num `<canvas>`, que as ferramentas não leem. A métrica cobre só a interface em HTML.
- **Recorte de estados.** Foram avaliados três estados da tela principal. Diálogos (exportar, ajuda, colaboração) e a biblioteca não entraram e podem ter outras violações.
- **Janelas diferentes.** O axe rodou em 1366 × 768 e o Lighthouse no preset desktop (1350 × 940). Na janela maior aparecem as dicas da tela de boas-vindas (setas com texto), que não mudam o resultado.
- **Chrome headless no Windows**, interface em inglês. Outros navegadores ficam com as F-M1 a F-M3.

## 7. Achado (pontuação 1: não gera achado)

Não se aplica. Correções simples resolveriam as cinco violações: permitir o zoom no `<meta name="viewport">`, dar `aria-label` ao botão do menu, tirar o `<div>` do gatilho do seletor de fonte, mudar o papel do menu principal (ou separar as preferências) e incluir "100%" no nome do botão de zoom.

## 8. Contribuição para a questão

| Questão | Esta métrica indica que a hipótese foi | Por quê |
| --- | --- | --- |
| CI-Q9 | parcialmente confirmada | A interface passa na maioria das regras automáticas (20 a 25 aprovadas por estado), mas tem 5 violações de nível A ou AA nos controles, e o canvas fica fora do alcance das ferramentas |
