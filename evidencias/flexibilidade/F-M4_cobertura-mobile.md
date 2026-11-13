# Evidência F-M4 : Cobertura funcional em dispositivos móveis

> Status: **coleta por emulação de celular e tablet no Chrome, automatizada com Playwright** (feito com apoio do Claude, ver `docs/uso-ia.md`).

## 1. Identificação

| Campo | Valor |
| --- | --- |
| Métrica | F-M4 : Cobertura funcional em dispositivos móveis |
| Questão | F-Q2 : Adaptabilidade (a aplicação se adapta a dispositivos e condições de uso?) |
| Issue | #63 (parte da #18) |
| Responsável | Giovanna Felipe |
| Data da coleta | 2026-11-13 |
| Ambiente | Build de produção do Excalidraw, commit `e7b5346`, servido em `http://localhost:5000`; Google Chrome 157.0.8103.51 (headless, via Playwright 1.58.2) com emulação de dispositivo; Windows 11 |
| Revisado por | André Henrique em 2026-11-13 |

## 2. O que foi medido

Funções operáveis por toque ÷ funções operáveis com mouse no desktop ([roteiro](../../docs/analise/roteiro.md), F-M4). O denominador é uma lista fechada de **25 funções** do editor (tabela 5.1): as funções de desenho, edição e arquivo da F-M5 que não dependem de servidor, mais as interações que mudam com o tipo de entrada (mover, redimensionar, caixa de seleção, menu de contexto, zoom, mover a tela, borracha e trava de ferramenta). Primeiro, as 25 funções foram feitas com mouse no desktop para confirmar que entram no denominador. Depois, foram repetidas só com toque num celular e num tablet emulados.

Ficaram fora: as funções que dependem de servidor (colaboração, link compartilhável, IA e bibliotecas públicas), porque o que limita essas funções é a rede, não o toque; e os atalhos de teclado, que são outro caminho para as mesmas funções, não funções novas. A trava de ferramenta (M25) entrou porque a F-M6 mostrou que o botão dela some no celular.

## 3. Procedimento

1. Gerar o build de produção e servi-lo localmente (comandos em 3.1).
2. **Controle (desktop):** abrir o app no Chrome em 1366 × 768 e fazer as 25 funções da tabela 5.1 com o mouse: barra de ferramentas, painel de propriedades, botão direito e menus. O teclado só digita texto.
3. **Celular:** abrir o app no Chrome emulando um Pixel 7 (412 × 839, tela de toque, user agent de Android). Fazer as mesmas 25 funções só com gestos de toque: tocar, arrastar, tocar duas vezes, toque longo (900 ms) e pinça com dois dedos. Os toques são enviados como eventos de toque do protocolo do DevTools (`Input.dispatchTouchEvent`), que o Chrome entrega à página como pointer events do tipo `touch`. O teclado só digita texto, como faria o teclado virtual.
4. **Tablet:** repetir o passo 3 emulando um iPad (gen 7) em retrato (810 × 1080).
5. Para cada função, o script confere o resultado na cena salva pelo Excalidraw (`localStorage`), no arquivo baixado ou na tela, tira um print e registra o gesto usado. Também conta os eventos `pointerdown` recebidos pela página, por tipo, para mostrar que nos modos de toque não houve evento de mouse.
6. Olhar os prints para confirmar o que o script apontou.

Critério: **Sim** quando a função produz pelo toque o mesmo resultado que produz com mouse, mesmo que por outro caminho (por exemplo, o zoom pela pinça, já que os botões de zoom não aparecem no celular). **Não** quando não há caminho por toque ou quando o resultado é diferente.

Entre uma função e outra, o script aperta `Esc` para fechar menus e desfazer a seleção. Essa limpeza não faz parte de nenhuma função testada.

### 3.1 Comandos executados

```bash
# 2026-11-13 11:30, pasta aplicacao/
npx yarn@1.22.22 install --frozen-lockfile
(cd excalidraw-app && npx yarn@1.22.22 build:app:docker)   # build de produção, Sentry desligado
(cd excalidraw-app && npx vite preview --port 5000 --strictPort --host localhost)
```

```text
PWA v0.21.1
precache  16 entries (2207.86 KiB)
✓ built in 1m 18s
```

```bash
# 2026-11-13 12:09, raiz do repositório
node scripts/fm4_toque.cjs --modo desktop --saida evidencias/flexibilidade/F-M4
node scripts/fm4_toque.cjs --modo celular --saida evidencias/flexibilidade/F-M4
node scripts/fm4_toque.cjs --modo tablet  --saida evidencias/flexibilidade/F-M4
```

```text
desktop   Funcionaram: 25 de 25 (100.0%)    pointerdown: mouse=93
celular   Funcionaram: 25 de 25 (100.0%)    pointerdown: touch=102
tablet    Funcionaram: 25 de 25 (100.0%)    pointerdown: touch=95
```

O script foi rodado duas vezes em cada modo, com o mesmo resultado. A saída completa, com o detalhe de cada função, está em `F-M4/F-M4_resultado-<modo>_2026-11-13.md`.

## 4. Evidências

### 4.1 Trechos de código

| # | Arquivo:linha | O que mostra |
| --- | --- | --- |
| C1 | `aplicacao/packages/common/src/editorInterface.ts:19-29` | Limites de largura: celular até 599 px; tablet de 600 a 1180 px |
| C2 | `aplicacao/packages/excalidraw/components/App.tsx:2390` | No celular, o editor recebe a classe `excalidraw--mobile`, que aparece no relatório do modo celular |
| C3 | `aplicacao/packages/excalidraw/components/MobileMenu.tsx:174-185` | No celular, a barra de baixo junta o painel de propriedades (`MobileShapeActions`) e a barra de ferramentas própria (`MobileToolbar`) |
| C4 | `aplicacao/packages/excalidraw/components/Actions.tsx:750-762` e `:860-871` | Desfazer e refazer sempre aparecem na barra do celular; duplicar e excluir saem do menu "Actions" quando há espaço |
| C5 | `aplicacao/packages/excalidraw/components/MobileToolbar.tsx:179-220` e `:286-358` | Losango e elipse ficam no menu do botão do retângulo, a linha no da seta, e texto, imagem, nota adesiva e Mermaid no menu "More tools" |
| C6 | `aplicacao/packages/excalidraw/components/App.tsx:8018-8040` e `aplicacao/packages/common/src/constants.ts:360` | Em toque, o menu de contexto abre com um toque parado por 500 ms (`TOUCH_CTX_MENU_TIMEOUT`) |
| C7 | `aplicacao/packages/excalidraw/components/App.tsx:8081-8110` | Zoom e movimento com dois dedos (pinça), calculados pela distância entre os toques |
| C8 | `aplicacao/packages/excalidraw/components/main-menu/DefaultItems.tsx:429-446` | A trava de ferramenta também fica no menu principal, em Preferences ("Tool lock"), caminho usado no celular, onde o botão da barra não aparece |

### 4.2 Arquivos de apoio

Todos em `evidencias/flexibilidade/F-M4/`.

| # | Arquivo | Tipo | O que mostra |
| --- | --- | --- | --- |
| E1 | `F-M4_resultado-desktop_2026-11-13.md` | saída do script | Controle com mouse: resultado de cada função, ambiente e contagem de eventos de ponteiro |
| E2 | `F-M4_resultado-celular_2026-11-13.md` | saída do script | O mesmo, só com toque, no celular emulado |
| E3 | `F-M4_resultado-tablet_2026-11-13.md` | saída do script | O mesmo, só com toque, no tablet emulado |
| E4 | `prints-desktop/`, `prints-celular/` e `prints-tablet/` (`Mxx_<modo>_2026-11-13.png`) | prints | Tela ao fim de cada função, em cada modo. No M14, o print é tirado com o zoom aplicado, antes de o script voltar a 100% |
| E5 | `F-M4_cena-<modo>_2026-11-13.excalidraw` | cena | Arquivo salvo em M16 e reaberto em M17 |
| E6 | `F-M4_exportado-<modo>_2026-11-13.png` | imagem | PNG exportado em M18 e inserido de volta em M19 |
| E7 | `scripts/fm4_toque.cjs` | script | Roteiro automatizado das 25 funções nos três modos |

### 4.3 Buscas sem resultado

| O que se procurou | Onde / comando | Resultado |
| --- | --- | --- |
| Botão de trava de ferramenta na barra do celular | `grep -n "LockButton\|toolbar-lock" aplicacao/packages/excalidraw/components/MobileToolbar.tsx` | Nenhuma ocorrência: a barra do celular não tem o botão (só a do desktop, `Toolbar.tsx:275`). A função continua no menu principal (C8) |
| Botões de zoom no celular | `grep -n "ZoomActions" aplicacao/packages/excalidraw/components/MobileMenu.tsx` | Nenhuma ocorrência: no celular, o zoom só é feito pela pinça (C7) |

## 5. Resultado

### 5.1 Dados brutos

Gesto usado em cada modo e resultado. O detalhe de cada linha (contagens, cores, zoom etc.) está em E1, E2 e E3.

| # | Função | Desktop (mouse) | Celular e tablet (toque) | Desktop | Celular | Tablet |
| --- | --- | --- | --- | :-: | :-: | :-: |
| M01 | Desenhar formas (retângulo, losango, elipse) | arrastar | arrastar | Sim | Sim | Sim |
| M02 | Seta ligada a duas formas | arrastar | arrastar | Sim | Sim | Sim |
| M03 | Texto dentro de uma forma | clique duplo + digitar | toque duplo + teclado | Sim | Sim | Sim |
| M04 | Desenho livre | arrastar | arrastar | Sim | Sim | Sim |
| M05 | Mudar cor do traço e do fundo | clique no painel | toque no seletor de cor | Sim | Sim | Sim |
| M06 | Selecionar e mover um elemento | clicar e arrastar | tocar e arrastar | Sim | Sim | Sim |
| M07 | Redimensionar pela alça | arrastar a alça | arrastar a alça | Sim | Sim | Sim |
| M08 | Selecionar vários com caixa de seleção | arrastar em área vazia | arrastar em área vazia | Sim | Sim | Sim |
| M09 | Agrupar a seleção | botão do painel | botão do painel (menu "Actions" no celular) | Sim | Sim | Sim |
| M10 | Desfazer e refazer | botões | botões | Sim | Sim | Sim |
| M11 | Duplicar e excluir | botões do painel | botões do painel | Sim | Sim | Sim |
| M12 | Menu de contexto (copiar e colar estilo) | botão direito | toque longo | Sim | Sim | Sim |
| M13 | Apagar com a borracha | arrastar | arrastar | Sim | Sim | Sim |
| M14 | Zoom | botões de zoom | pinça com dois dedos | Sim | Sim | Sim |
| M15 | Mover a tela (ferramenta mão) | arrastar | arrastar | Sim | Sim | Sim |
| M16 | Salvar em arquivo `.excalidraw` | menu principal | menu principal | Sim | Sim | Sim |
| M17 | Abrir arquivo `.excalidraw` | menu principal | menu principal | Sim | Sim | Sim |
| M18 | Exportar imagem PNG | menu principal | menu principal | Sim | Sim | Sim |
| M19 | Inserir imagem do aparelho | ferramenta de imagem | ferramenta de imagem | Sim | Sim | Sim |
| M20 | Adicionar à biblioteca e reutilizar | botão direito + painel | toque longo + painel | Sim | Sim | Sim |
| M21 | Alternar tema escuro | menu principal | menu principal | Sim | Sim | Sim |
| M22 | Trocar o idioma | menu principal | menu principal | Sim | Sim | Sim |
| M23 | Converter Mermaid em diagrama | menu de ferramentas | menu "More tools" | Sim | Sim | Sim |
| M24 | Trocar a fonte do texto | painel de texto | painel de texto | Sim | Sim | Sim |
| M25 | Manter a ferramenta ativa (trava) | botão da barra | celular: menu principal > Preferences; tablet: botão da barra | Sim | Sim | Sim |

### 5.2 Cálculo

Funções operáveis por toque ÷ funções operáveis com mouse no desktop:

- Celular: 25 ÷ 25 = **100%**
- Tablet: 25 ÷ 25 = **100%**

O denominador é 25 porque as 25 funções funcionaram com mouse no desktop (E1).

**Sensibilidade:** o critério usado para "caminho diferente" é a falta, na tela, do controle que o desktop usa. Quando o controle está na tela e só o gesto muda, conta como o mesmo caminho: o toque longo no lugar do botão direito (M12 e M20) é o equivalente do toque ao clique direito, sobre o mesmo elemento e abrindo o mesmo menu. Por esse critério, duas funções só passaram no celular por um caminho diferente, porque o botão delas não aparece nessa largura (F-M6): o zoom (M14, pela pinça, sem os botões de zoom) e a trava (M25, pelo menu de preferências, sem o botão da barra). Se só valesse o mesmo botão do desktop, o celular ficaria com 23 ÷ 25 = 92%, ainda nota 2. Se também o toque longo contasse como caminho diferente, seriam 4 funções e o celular ficaria com 21 ÷ 25 = 84% (nota 1); essa leitura não foi adotada porque troca o gesto, não a função nem o controle. O roteiro mede a função, não o botão, por isso o valor adotado é 100%.

### 5.3 Pontuação

| Valor medido | Regra da métrica | Pontuação |
| --- | --- | --- |
| 100% (celular e tablet) | 2 = ≥ 90%; 1 = 70% a 89%; 0 = < 70% | **2** |

**Justificativa:** todas as 25 funções feitas com mouse no desktop também foram feitas só com toque, no celular e no tablet emulados. O celular tem barra e painel próprios (C3 a C5), e as funções sem botão nessa largura têm um gesto ou item de menu equivalente (C6 a C8).

## 6. Observações e limitações

- **Emulação, não aparelho real.** O teste usou o Chrome do Windows emulando celular e tablet: tamanho de tela, densidade de pixels, user agent, `pointer: coarse` e eventos de toque (cabeçalho de E2 e E3). Isso não reproduz a precisão do dedo, a rejeição de palma, a rolagem e o zoom do próprio navegador, nem o teclado virtual. O texto foi digitado com eventos de teclado, então autocorretor e sugestões do teclado do celular não foram testados.
- **O tablet é um iPad só no user agent.** A página roda no motor do Chrome, não no Safari do iPadOS. O comportamento do Safari fica com as F-M1 e F-M2. Na largura de 810 px o Excalidraw usa o layout de desktop, com a barra completa, e não o de celular (E3).
- **Caneta não testada.** O Excalidraw tem modo caneta (`penMode`), que não entrou no teste. O roteiro aceita toque ou caneta, e o toque bastou para as 25 funções.
- **Recorte do denominador.** A lista tem 25 funções escolhidas pela equipe (seção 2) e não todas as ações do editor. Ficaram fora as funções que dependem de servidor e os atalhos de teclado, inclusive os modificadores usados com o mouse (Shift+clique, Shift ao redimensionar, Alt+arrastar). Com outra lista o valor pode mudar.
- **Seletores de arquivo.** Como na F-M5, o script remove `showSaveFilePicker` e `showOpenFilePicker`, e o Excalidraw usa o download e o `<input type="file">`. Os navegadores de celular não têm essas APIs, então esse é o mesmo caminho de um celular real. A escolha do arquivo em si (M17 e M19) é feita pelo Playwright, no lugar do seletor do sistema.
- **Seletor de idioma.** É um `<select>` nativo. No teste, o toque abre o campo e a opção é escolhida pelo Playwright; num celular real abriria a lista do sistema.
- **Fora da métrica:** no celular, tocar de novo na ferramenta de seleção já ativa troca para o laço, sem aviso além do ícone.

## 7. Achado (pontuação 2: não gera achado)

Não se aplica. Fica a oportunidade de mostrar no celular um atalho visível para a trava de ferramenta, hoje só no menu de preferências.

## 8. Contribuição para a questão

| Questão | Esta métrica indica que a hipótese foi | Por quê |
| --- | --- | --- |
| F-Q2 | parcialmente confirmada | A barra própria para celular foi confirmada (C3 a C5). Já a limitação esperada para as funções ligadas a atalhos não apareceu nas 25 funções escolhidas: as que não têm botão no celular têm gesto ou item de menu equivalente. Os atalhos ficaram fora do denominador (seção 2), e as funções que no desktop usam modificador junto com o mouse (Shift+clique para somar à seleção, Shift para manter a proporção, Alt+arrastar para duplicar) não foram testadas, então a hipótese não fica descartada para elas |
