# Evidência F-M6 : Resoluções suportadas sem perda de elementos da interface

> Status: **coleta no navegador, automatizada com Playwright** (feito com apoio do Claude, ver `docs/uso-ia.md`).

## 1. Identificação

| Campo | Valor |
| --- | --- |
| Métrica | F-M6 : Resoluções suportadas sem perda de elementos da interface |
| Questão | F-Q2 : Adaptabilidade (a aplicação se adapta a dispositivos e condições de uso?) |
| Issue | #64 (parte da #18) |
| Responsável | André Henrique |
| Data da coleta | 2026-11-12 |
| Ambiente | Build de produção do Excalidraw, commit `e7b5346`, servido em `http://localhost:5000`; Google Chrome 157.0.8103.50 (headless, via Playwright 1.58.2); Linux 7.0 |

## 2. O que foi medido

Sim/Não para cada largura do roteiro (360, 768, 1366 e 2560 px): a interface aparece sem perder elementos? ([roteiro](../../docs/analise/roteiro.md), F-M6). Conta como perda um controle que **some** da interface naquela largura ou que fica **cortado** fora da janela. Um controle que só muda de lugar (por exemplo, vai para um menu) não é perda. Para cada controle que some, registra-se à parte se a **função** continua disponível por outro caminho.

## 3. Procedimento

1. Abrir o app no Chrome com a janela em cada tamanho: 360 × 800 (celular), 768 × 1024 (tablet), 1366 × 768 (notebook) e 2560 × 1440 (monitor QHD). A largura decide o layout: até 599 px é celular, e de 600 a 1180 px no menor e no maior lado é tablet (C1).
2. Em três estados, tirar print e procurar controles (botões, campos, seletores) cortados ou fora da janela, além de rolagem horizontal na página:
   1. tela inicial;
   2. retângulo selecionado, com o painel de estilo aberto;
   3. menu principal aberto.
3. Conferir se estes controles estão na tela, no menu de ferramentas extras, no menu agrupado de um botão ou no menu principal: as 10 ferramentas básicas (seleção, retângulo, losango, elipse, seta, linha, desenho livre, texto, imagem e borracha), menu principal, desfazer, refazer, ajuda, biblioteca, zoom, trava de ferramenta e selo de criptografia.
4. Para cada controle ausente, testar a função por outro caminho: o zoom com `Ctrl` + `=` e a trava de ferramenta com a tecla `Q`, desenhando dois retângulos seguidos.
5. Olhar os prints para confirmar o que o script apontou.

### 3.1 Comandos executados

O build e o servidor são os mesmos da F-M5 (ver `F-M5_cobertura-offline.md`, seção 3.1).

```bash
# 2026-11-12 10:34, raiz do repositório
node scripts/fm6_resolucoes.cjs --saida evidencias/flexibilidade/F-M6
```

```text
360px Não controles ausentes: zoom (+, − e redefinir), trava de ferramenta, selo de criptografia
768px Sim
1366px Sim
2560px Sim

Resoluções sem perda: 3 de 4
```

A saída completa está em `F-M6/F-M6_resultado_2026-11-12.md`.

## 4. Evidências

### 4.1 Trechos de código

| # | Arquivo:linha | O que mostra |
| --- | --- | --- |
| C1 | `aplicacao/packages/common/src/editorInterface.ts:19-26` e `:72-87` | Limites de largura: celular até 599 px e tablet de 600 a 1180 px |
| C2 | `aplicacao/packages/excalidraw/components/LayerUI.tsx:612-628` | No celular, a interface usa o `MobileMenu` no lugar do rodapé |
| C3 | `aplicacao/packages/excalidraw/components/footer/Footer.tsx:44-48` | Zoom e desfazer/refazer ficam no rodapé, que não aparece no celular |
| C4 | `aplicacao/packages/excalidraw/components/MobileToolbar.tsx:179-220` | No celular, losango e elipse ficam no menu do botão do retângulo, e a linha no da seta (`ToolPopover`) |

### 4.2 Arquivos de apoio

Todos em `evidencias/flexibilidade/F-M6/`.

| # | Arquivo | Tipo | O que mostra |
| --- | --- | --- | --- |
| E1 | `F-M6_resultado_2026-11-12.md` | saída do script | Resultado por largura e onde cada controle foi encontrado |
| E2 | `F-M6_<largura>px_2026-11-12_1-inicial.png` | prints | Tela inicial em cada largura |
| E3 | `F-M6_<largura>px_2026-11-12_1b-extras.png` | prints | Menu de ferramentas extras aberto |
| E4 | `F-M6_360px_2026-11-12_1c-menu-rectangle.png` e `_1c-menu-arrow.png` | prints | Menus agrupados do celular (losango, elipse e linha) |
| E5 | `F-M6_<largura>px_2026-11-12_2-selecao.png` | prints | Retângulo selecionado com o painel de estilo |
| E6 | `F-M6_<largura>px_2026-11-12_3-menu.png` | prints | Menu principal aberto |
| E7 | `scripts/fm6_resolucoes.cjs` | script | Roteiro automatizado da medição |

### 4.3 Buscas sem resultado

| O que se procurou | Onde / comando | Resultado |
| --- | --- | --- |
| Botões de zoom e trava de ferramenta no layout de celular | `grep -n -i "lock\|zoom" MobileToolbar.tsx MobileMenu.tsx` | Nenhuma ocorrência |

## 5. Resultado

### 5.1 Dados brutos

| Janela (px) | Layout | Sem perda de elementos? | Controles ausentes | A função continua? | Controles cortados |
| --- | --- | :-: | --- | --- | --- |
| 360 × 800 | celular | **Não** | Zoom (+, − e redefinir), trava de ferramenta, selo de criptografia | Sim: zoom pelo teclado (`Ctrl` + `=` levou o zoom de 100% a 110%), trava pela tecla `Q`; o selo é só um link informativo | nenhum |
| 768 × 1024 | tablet | Sim | nenhum | — | nenhum |
| 1366 × 768 | desktop | Sim | nenhum | — | nenhum |
| 2560 × 1440 | desktop | Sim | nenhum | — | nenhum |

Em 360 px, o resto continua alcançável, mas em outro lugar (E1, E4):

- losango e elipse ficam no menu do botão do retângulo, e a linha no da seta;
- imagem fica no menu de ferramentas extras;
- ajuda fica no menu principal;
- desfazer e refazer ficam acima da barra de ferramentas.

Em nenhuma largura há controle cortado ou rolagem horizontal.

### 5.2 Cálculo

Resoluções sem perda de elementos = 3 de 4 (768, 1366 e 2560 px).

### 5.3 Pontuação

| Valor medido | Regra da métrica | Pontuação |
| --- | --- | --- |
| 3 de 4 | 2 = 4 de 4; 1 = 3 de 4; 0 = ≤ 2 de 4 | **1** |

**Justificativa:** em 360 px, o layout de celular tira os botões de zoom e de trava de ferramenta. É uma perda de controle, não de função: as duas funções continuam pelo teclado. Nas outras três larguras, nada some nem fica cortado.

## 6. Observações e limitações

- **Perda de controle, não de função.** A métrica conta elementos da interface, por isso 360 px fica como Não. Se a métrica contasse só funções, seriam 4 de 4 (nota 2).
- **Atalhos de teclado.** O zoom e a trava foram testados por teclado, que um celular de verdade não tem. A pinça para zoom e o uso por toque ficam com a F-M4.
- **Janela de desktop redimensionada.** A medição usa a janela do Chrome no tamanho de cada tela, sem emular toque nem o navegador de um celular. O layout depende só da largura e da altura (C1), mas um aparelho real pode mudar a detecção de toque.
- Apenas o Chrome, em inglês. O texto em português é mais longo e pode se comportar de outro jeito nos menus estreitos.
- Em 768 e 360 px, o painel de estilo fica compacto, com ícones que abrem submenus (E5). Isso conta como mudança de lugar, não como perda.

## 7. Achado (pontuação 1: não gera achado)

Não se aplica. Fica a oportunidade de oferecer zoom e trava de ferramenta também na barra do celular.

## 8. Contribuição para a questão

| Questão | Esta métrica indica que a hipótese foi | Por quê |
| --- | --- | --- |
| F-Q2 | confirmada | A hipótese previa barra de ferramentas própria para celular: a interface se reorganiza nas quatro larguras sem cortar controles, e só o celular perde dois botões, que continuam acessíveis pelo teclado |
