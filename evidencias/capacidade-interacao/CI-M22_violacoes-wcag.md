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

**Como se conta:** uma violação é um problema distinto, isto é, uma regra reprovada num elemento. O mesmo elemento reprovado pela mesma regra em vários estados, nos dois modos ou nas duas ferramentas conta uma vez só. A mesma regra reprovada em dois elementos diferentes conta duas vezes, porque são dois controles com problema, e cada um precisa de correção própria. Cada elemento apontado pelas ferramentas é conferido no código e na tela (seção 4.1); o que não se confirma como falha do critério fica registrado, mas fora da contagem (seção 5.1).

## 3. Procedimento

1. Gerar o build de produção e servi-lo localmente (comandos em 3.1).
2. Abrir o app no Chrome em 1366 × 768, gravar o tema no `localStorage` (`excalidraw-theme`) e recarregar.
3. Em cada modo (claro e escuro) e estado (inicial, seleção e menu), injetar o axe-core e rodar só as regras com as tags `wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa`, `wcag22a` e `wcag22aa`, mais a regra `label-content-name-mismatch` (2.5.3, nível A). Essa regra tem a tag `wcag21a`, mas o axe a marca como experimental e a deixa desligada por padrão, então o script a liga à parte. O script guarda todos os elementos reprovados e um print de cada estado.
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
# 2026-11-13, raiz do repositório (refeito depois da revisão do PR #101)
node scripts/ci_m22_m25_acessibilidade.cjs --saida evidencias/capacidade-interacao/CI-M22-M25
```

```text
claro/inicial: 3 regra(s) violada(s) no axe; 20 aprovadas; contraste incompleto em 22 elemento(s)
claro/selecao: 4 regra(s) violada(s) no axe; 23 aprovadas; contraste incompleto em 26 elemento(s)
claro/menu: 4 regra(s) violada(s) no axe; 26 aprovadas; contraste incompleto em 43 elemento(s)
escuro/inicial: 3 regra(s) violada(s) no axe; 20 aprovadas; contraste incompleto em 22 elemento(s)
escuro/selecao: 4 regra(s) violada(s) no axe; 23 aprovadas; contraste incompleto em 26 elemento(s)
escuro/menu: 4 regra(s) violada(s) no axe; 26 aprovadas; contraste incompleto em 43 elemento(s)
Lighthouse claro: 87/100; reprovadas: button-name, label-content-name-mismatch, meta-viewport
Lighthouse escuro: 87/100; reprovadas: button-name, label-content-name-mismatch, meta-viewport
```

A saída completa, com a lista de todos os elementos reprovados, está em `CI-M22-M25/CI-M22_resultado_2026-11-13.md` (E1).

## 4. Evidências

### 4.1 Trechos de código

| # | Arquivo:linha | O que mostra |
| --- | --- | --- |
| C1 | `aplicacao/excalidraw-app/index.html:6-8` | `<meta name="viewport">` com `maximum-scale=1` e `user-scalable=no`, os atributos que a regra `meta-viewport` reprova (V1) |
| C2 | `aplicacao/packages/excalidraw/components/main-menu/MainMenu.tsx:43-55` | O botão do menu principal só tem o ícone (`HamburgerMenuIcon`), sem `aria-label` nem `title` (V2) |
| C3 | `aplicacao/packages/excalidraw/components/FontPicker/FontPickerTrigger.tsx:35-36` | O gatilho do seletor de fonte é um `<div>` sem papel dentro de `Popover.Trigger asChild`; o Radix põe `aria-haspopup` e `aria-expanded` nesse `<div>`, onde não são permitidos (V3) |
| C4 | `aplicacao/excalidraw-app/components/AppMainMenu.tsx:81-86` e `aplicacao/packages/excalidraw/components/dropdownMenu/DropdownMenuContent.tsx:93` | O menu principal tem `role="menu"` (Radix), mas inclui o seletor de tema, a lista de idiomas (`<select>`) e o seletor de cor do fundo, que não são itens de menu (V4) |
| C5 | `aplicacao/packages/excalidraw/actions/actionCanvas.tsx:276-285` | O botão de zoom mostra "100%", mas o nome acessível é "Reset zoom", que não contém o texto visível (V5) |
| C6 | `aplicacao/packages/excalidraw/components/main-menu/DefaultItems.tsx:393-398` | O link do Discord mostra "Discord chat" (`labels.discordChat`), mas tem `aria-label="Discord"`, que não contém o texto visível (V6) |
| C7 | `aplicacao/packages/excalidraw/components/dropdownMenu/DropdownMenuItemContent.tsx:28-29` | Os itens do menu mostram o atalho de teclado num `<div>` ao lado do nome; o axe junta esse atalho ao texto visível do item (F1 a F4) |

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
| V5 | `label-content-name-mismatch` | 2.5.3 Rótulo no nome | A | botão "100%" de zoom (C5) | Sim | Sim | todos, nos dois modos |
| V6 | `label-content-name-mismatch` | 2.5.3 Rótulo no nome | A | link "Discord chat" do menu principal (C6) | Sim | — | menu, nos dois modos |

O Lighthouse só avaliou a tela inicial, por isso não acusa V3, V4 e V6, que dependem de seleção ou do menu aberto. A regra `label-content-name-mismatch` tem a tag `wcag21a`, mas o axe a marca como experimental e a deixa desligada por padrão; o Lighthouse a roda por conta própria. Por isso o script a liga à parte no axe, para avaliá-la nos três estados (seção 3).

Cada violação atinge um elemento. Os resultados são iguais nos modos claro e escuro.

**Apontados pelo axe e não contados.** Com o menu aberto, a mesma regra reprova mais quatro itens. Conferindo no código e no print do menu (E2), o nome acessível de cada um é igual ao nome que aparece na tela. O axe reprova porque junta ao texto visível o atalho de teclado mostrado à direita (C7), e o atalho não faz parte do rótulo. Esses quatro casos não contam como violação:

| # | Elemento | Nome acessível | Texto visível (nome + atalho) |
| --- | --- | --- | --- |
| F1 | item "Open" | Open | Open · Ctrl+O |
| F2 | item "Export image..." | Export image... | Export image... · Ctrl+Shift+E |
| F3 | item "Command palette" | Command palette | Command palette · Ctrl+/ |
| F4 | item "Find on canvas" | Find on canvas | Find on canvas · Ctrl+F |

### 5.2 Cálculo

Violações distintas = V1 a V6 = **6** (6 do axe-core, 3 do Lighthouse, 3 em comum).

**Sensibilidade:**

- **Por regra distinta, e não por elemento:** seriam 5 (V5 e V6 são a mesma regra), nota 1. Essa contagem não foi adotada porque a unidade da seção 2 é a regra num elemento, e dois controles diferentes com o mesmo defeito são dois problemas para o usuário, cada um com sua correção.
- **Contando também F1 a F4** (tudo o que o axe apontou, sem conferir): seriam 10, também nota 0.
- **Só com o Lighthouse**, seriam 3 (nota 1), porque ele avalia só a tela inicial. Só com o axe-core, 6 (nota 0).
- Contando cada repetição por estado e modo, o axe registra 32 elementos reprovados (E1). Essa contagem não foi adotada porque repete o mesmo problema no mesmo elemento.
- **Contraste:** nenhuma das ferramentas acusou violação de contraste (1.4.3). O axe deixou de 22 a 43 textos por estado como "incompletos", porque o texto fica sobre o canvas e o axe não consegue decidir a cor do fundo (E1). A CI-M25 mostra que há texto abaixo de 4,5:1. Somando o critério 1.4.3, seriam 7 violações, sem mudar a nota. Como a métrica conta as violações **detectadas pelas ferramentas**, o contraste fica com a CI-M25.

O valor adotado (6) fica logo acima do limite da faixa 1 (1 a 5): a nota depende de contar por elemento, e a sensibilidade acima mostra o valor por regra.

### 5.3 Pontuação

| Valor medido | Regra da métrica | Pontuação |
| --- | --- | --- |
| 6 violações | 2 = 0; 1 = 1 a 5; 0 = ≥ 6 | **0** |

**Justificativa:** as duas ferramentas acharam 6 problemas distintos de nível A ou AA, todos em controles da interface: zoom bloqueado, botão sem nome, ARIA inválido e dois controles cujo nome acessível não contém o texto visível. São problemas simples de corrigir, mas afetam justamente quem usa leitor de tela, controle por voz ou zoom do navegador.

## 6. Observações e limitações

- **Ferramentas automáticas.** O axe e o Lighthouse só acham parte dos problemas da WCAG. Teclado (CI-M23), leitor de tela (CI-M24) e contraste sobre o canvas (CI-M25) precisam de outras medições.
- **O canvas não é avaliado.** O desenho fica num `<canvas>`, que as ferramentas não leem. A métrica cobre só a interface em HTML.
- **Recorte de estados.** Foram avaliados três estados da tela principal. Diálogos (exportar, ajuda, colaboração) e a biblioteca não entraram e podem ter outras violações.
- **Janelas diferentes.** O axe rodou em 1366 × 768 e o Lighthouse no preset desktop (1350 × 940). Na janela maior aparecem as dicas da tela de boas-vindas (setas com texto), que não mudam o resultado.
- **Chrome headless no Windows**, interface em inglês. Outros navegadores ficam com as F-M1 a F-M3. O caminho do Chrome usado pelo Lighthouse é o padrão do Windows, mas pode ser trocado com `--chrome <caminho>`; o Lighthouse é baixado pelo `npx` na versão fixa 12.6.1.
- **Regra experimental.** A `label-content-name-mismatch` ainda é experimental no axe 4.10 e gera falsos positivos como F1 a F4. Cada caso foi conferido na tela antes de entrar na contagem.
- **Falha que as ferramentas não acusaram.** O link "Follow us" do menu tem `aria-label="X"` (`DefaultItems.tsx:386-392`), o mesmo defeito de V6, mas nenhuma das duas ferramentas o apontou. Fica fora da contagem, que é das violações detectadas pelas ferramentas.

## 7. Achado

| ID | Métrica | Evidência reproduzível | Pontuação | Impacto | Recomendação |
| --- | --- | --- | --- | --- | --- |
| A-CI-M22-01 | CI-M22 | Tabela 5.1 e E1; código em C1 a C6; passos da seção 3 | 0 | Médio. Quem usa leitor de tela não sabe o que faz o botão do menu (V2) e ouve uma estrutura de menu inválida (V3, V4); quem usa controle por voz não consegue acionar pelo nome visível o zoom e o link do Discord (V5, V6); e, no celular, o zoom do navegador fica bloqueado (V1) | Permitir o zoom no `<meta name="viewport">`; dar `aria-label` ao botão do menu; tirar o `<div>` do gatilho do seletor de fonte; mudar o papel do menu principal (ou separar as preferências); fazer o nome acessível conter o texto visível ("100%" no zoom, "Discord chat" e "Follow us" nos links) |

## 8. Contribuição para a questão

| Questão | Esta métrica indica que a hipótese foi | Por quê |
| --- | --- | --- |
| CI-Q9 | parcialmente confirmada | A interface passa na maioria das regras automáticas (20 a 26 aprovadas por estado), mas tem 6 violações de nível A ou AA nos controles, e o canvas fica fora do alcance das ferramentas |
