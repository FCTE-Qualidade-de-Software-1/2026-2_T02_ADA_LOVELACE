# Evidência CI-M25 : Contraste mínimo de 4,5:1

> Status: **coleta automatizada no navegador, com cálculo da razão de contraste da WCAG** (feito com apoio do Claude, ver `docs/uso-ia.md`).

## 1. Identificação

| Campo | Valor |
| --- | --- |
| Métrica | CI-M25 : Contraste mínimo de 4,5:1 |
| Questão (CI-Q) | CI-Q9 : Assistência ao usuário (pessoas com deficiência conseguem usar o Excalidraw?) |
| Tarefa do plano | CI-M25, acessibilidade (O6), ver `tarefas-capacidade-interacao.md` |
| Issue | #72 (parte da #19) |
| Responsável | Giovanna Felipe |
| Data da coleta | 2026-11-13 |
| Versão avaliada | `e7b5346` |
| Ambiente | Build de produção do Excalidraw servido em `http://localhost:5000`; Google Chrome 157.0.8103.51 (headless, via Playwright 1.58.2), janela 1366 × 768, interface em inglês; Windows 11 |
| Revisado por | — |

## 2. O que foi medido

Combinações de cor de texto e cor de fundo que atingem a razão de contraste de 4,5:1 ÷ combinações testadas, nos modos claro e escuro ([roteiro](../../docs/analise/roteiro.md), CI-M25).

**Combinação** é o par (cor do texto, cor efetiva do fundo) num modo. As combinações foram tiradas de **todo o texto visível** da interface na tela principal, nos mesmos três estados da CI-M22: inicial, com forma e texto selecionados e com o menu principal aberto. Assim a lista não depende de uma escolha manual das "combinações principais": entra tudo o que aparece nessas telas. Ficam de fora o desenho no canvas, que é do usuário, e os rótulos só para leitor de tela (`visually-hidden`), que ninguém vê.

## 3. Procedimento

1. Gerar o build de produção e servi-lo localmente (comandos na CI-M22, seção 3.1).
2. Abrir o app no Chrome em 1366 × 768 em cada modo e estado, como na CI-M22.
3. Para cada elemento com texto visível, o script lê a cor do texto (`color`) e calcula a cor efetiva do fundo: sobe pelos ancestrais somando as camadas de fundo semitransparentes até achar uma opaca. Também aplica a opacidade do elemento e dos ancestrais à cor do texto.
4. Agrupar os pares iguais em combinações e calcular a razão de contraste pela fórmula da WCAG (luminância relativa: (L1 + 0,05) ÷ (L2 + 0,05)).
5. Conferir as cores reprovadas nas variáveis de tema e no CSS do Excalidraw (seção 4.1) e nos prints (E2 da CI-M22).

Critério: **Sim** quando a razão é ≥ 4,5:1, o limite da métrica e da WCAG 1.4.3 (nível AA) para texto normal. Nenhum texto das telas avaliadas é "texto grande" (≥ 24 px, ou ≥ 18,66 px em negrito), para o qual a WCAG aceitaria 3:1.

### 3.1 Comandos executados

```bash
# 2026-11-13 13:45, raiz do repositório (o mesmo script da CI-M22)
node scripts/ci_m22_m25_acessibilidade.cjs --saida evidencias/capacidade-interacao/CI-M22-M25
```

```text
claro: 4 de 10 combinações com contraste ≥ 4,5:1 (40.0%)
escuro: 4 de 9 combinações com contraste ≥ 4,5:1 (44.4%)
Total: 8 de 19 combinações (42.1%)
```

O script foi rodado duas vezes, com o mesmo resultado. A tabela completa, com exemplos de texto de cada combinação, está em `CI-M22-M25/CI-M25_resultado_2026-11-13.md` (E1), e os 186 textos coletados, com cor e fundo, em `CI-M25_textos_2026-11-13.json` (E2).

## 4. Evidências

### 4.1 Trechos de código

| # | Arquivo:linha | O que mostra |
| --- | --- | --- |
| C1 | `aplicacao/packages/excalidraw/css/theme.scss:96-98` | Cinzas do tema: `--color-gray-40: #b8b8b8`, `--color-gray-50: #999999` e `--color-gray-60: #7a7a7a`, as cores dos textos reprovados |
| C2 | `aplicacao/packages/excalidraw/css/theme.scss:26` e `:205` | A letra do atalho nos botões da barra usa `--color-gray-40` no modo claro e `--color-gray-60` no escuro |
| C3 | `aplicacao/packages/excalidraw/components/welcome-screen/WelcomeScreen.scss:12`, `:167` e `:201` | Tela de boas-vindas: textos de apoio em `--color-gray-40`, itens do menu em `--color-gray-50` e atalhos em `--color-gray-40` |
| C4 | `aplicacao/packages/excalidraw/components/dropdownMenu/DropdownMenu.scss:168-170` | Os atalhos do menu principal ("Ctrl+O", "Ctrl+Shift+E" etc.) ficam com `opacity: 0.5` |

### 4.2 Arquivos de apoio

Todos em `evidencias/capacidade-interacao/CI-M22-M25/`.

| # | Arquivo | Tipo | O que mostra |
| --- | --- | --- | --- |
| E1 | `CI-M25_resultado_2026-11-13.md` | saída do script | As 19 combinações, com razão, estados e exemplos de texto |
| E2 | `CI-M25_textos_2026-11-13.json` | dados | Os 186 textos coletados, com cor, fundo, modo e estado |
| E3 | `CI-M22_<modo>-<estado>_2026-11-13.png` | prints | Os seis estados avaliados (os mesmos da CI-M22) |
| E4 | `scripts/ci_m22_m25_acessibilidade.cjs` | script | Coleta e cálculo |

## 5. Resultado

### 5.1 Dados brutos

| Modo | Texto | Fundo | Razão | ≥ 4,5:1 | Onde aparece |
| --- | --- | --- | :-: | :-: | --- |
| claro | `#b8b8b8` | `#ffffff` | 1,98 | **Não** | Textos de apoio e atalhos da tela de boas-vindas, dica "To move canvas…", letras de atalho da barra |
| claro | `#b4b2ed` | `#ffffff` | 1,99 | **Não** | Atalho "Ctrl+/" da paleta de comandos, no menu |
| claro | `#8b88e0` | `#f0efff` | 2,76 | **Não** | "14-day free trial", no botão do Excalidraw+ |
| claro | `#999999` | `#ffffff` | 2,85 | **Não** | Itens da tela de boas-vindas ("Open", "Help", "Live collaboration…") |
| claro | `#8d8d8f` | `#ffffff` | 3,31 | **Não** | Atalhos dos itens do menu principal ("Ctrl+O", "Ctrl+Shift+E"…) |
| claro | `#6965db` | `#f0efff` | 4,12 | **Não** | "Try Excalidraw+" |
| claro | `#6965db` | `#ffffff` | 4,68 | Sim | Itens destacados do menu ("Command palette", "Sign up") |
| claro | `#030064` | `#e0dfff` | 13,61 | Sim | Letra de atalho da ferramenta ativa |
| claro | `#1b1b1f` | `#ececf4` | 14,61 | Sim | Valor do zoom ("100%") |
| claro | `#1b1b1f` | `#ffffff` | 17,17 | Sim | Itens do menu e rótulos do painel de propriedades |
| escuro | `#666494` | `#232329` | 2,84 | **Não** | Atalho "Ctrl+/" da paleta de comandos, no menu |
| escuro | `#7a7a7a` | `#232329` | 3,64 | **Não** | Dica "To move canvas…", letras de atalho da barra |
| escuro | `#838389` | `#232329` | 4,15 | **Não** | Atalhos dos itens do menu principal |
| escuro | `#7a7a7a` | `#121212` | 4,36 | **Não** | Textos, itens e atalhos da tela de boas-vindas |
| escuro | `#8f8cc4` | `#2b2a40` | 4,45 | **Não** | "14-day free trial" |
| escuro | `#a8a5ff` | `#2b2a40` | 6,29 | Sim | "Try Excalidraw+" |
| escuro | `#a8a5ff` | `#232329` | 7,06 | Sim | Itens destacados do menu |
| escuro | `#e0dfff` | `#403e6a` | 7,64 | Sim | Letra de atalho da ferramenta ativa |
| escuro | `#e3e3e8` | `#232329` | 12,22 | Sim | Valor do zoom, itens do menu e rótulos do painel |

### 5.2 Cálculo

Combinações que atendem ÷ combinações testadas:

- Modo claro: 4 ÷ 10 = 40,0%
- Modo escuro: 4 ÷ 9 = 44,4%
- **Total: 8 ÷ 19 = 42,1%**

**Sensibilidade:**

- **Por texto, e não por combinação:** 73 dos 186 textos visíveis atingem 4,5:1 (39,2%), também nota 0 (E2).
- **Por tela (Sim/Não, como diz o roteiro):** nenhuma das 6 telas (3 estados × 2 modos) tem todas as combinações acima de 4,5:1, ou seja, 0 de 6.
- **Com o limite de 3:1**, que a WCAG aceita para texto grande, 134 dos 186 textos passariam (72%). Ainda abaixo de 80%, nota 0. Além disso, nenhum desses textos é grande.

### 5.3 Pontuação

| Valor medido | Regra da métrica | Pontuação |
| --- | --- | --- |
| 42,1% das combinações | 2 = 100%; 1 = ≥ 80% e < 100%; 0 = < 80% | **0** |

**Justificativa:** o texto principal (itens do menu, rótulos do painel, zoom) tem contraste alto nos dois modos. Já os textos de apoio (tela de boas-vindas, dicas, letras de atalho e atalhos do menu) usam cinzas claros do tema (C1 a C4), que ficam entre 1,98:1 e 4,45:1. Como esses textos aparecem em todas as telas, menos da metade das combinações atinge 4,5:1.

## 6. Observações e limitações

- **O axe não acusou essas falhas.** Na CI-M22, o axe deixou de 22 a 43 textos por estado como "incompletos", porque o texto fica sobre o canvas e ele não consegue decidir a cor do fundo. O cálculo desta métrica resolve isso: sobre o canvas, o fundo efetivo é a cor da página (`#ffffff` no claro, `#121212` no escuro), que é a mesma do canvas vazio.
- **Fundo do canvas.** Se o usuário mudar a cor de fundo do canvas, o contraste dos textos sobre ele muda. Foi usado o fundo padrão.
- **Texto, não ícones.** A métrica e o critério 1.4.3 tratam de texto. O contraste dos ícones e das bordas dos controles (1.4.11, limite 3:1) não foi medido.
- **Peso igual por combinação.** Uma combinação que aparece em um texto vale o mesmo que uma que aparece em dezenas. A sensibilidade por texto (39,2%) mostra que isso não muda a nota.
- **Recorte de estados**, o mesmo da CI-M22: diálogos e biblioteca não entraram.

## 7. Achado

| ID | Métrica | Evidência reproduzível | Pontuação | Impacto | Recomendação |
| --- | --- | --- | --- | --- | --- |
| A-CI-M25-01 | CI-M25 | Tabela 5.1 e E1; cores em C1 a C4; passos da seção 3 | 0 | Médio. Afeta quem tem baixa visão: a tela de boas-vindas, as dicas e os atalhos, que orientam quem está começando, são os textos mais apagados | Escurecer no modo claro (e clarear no escuro) os cinzas usados em texto, `--color-gray-40` e `--color-gray-50`, até 4,5:1, por exemplo `#767676` sobre branco; não usar `opacity` para apagar atalhos no menu |

## 8. Contribuição para a questão

| Questão | Esta métrica indica que a hipótese foi | Por quê |
| --- | --- | --- |
| CI-Q9 | parcialmente confirmada | O texto dos controles principais tem bom contraste, mas os textos de apoio ficam abaixo de 4,5:1 nos dois modos, o que dificulta o uso por pessoas com baixa visão |
