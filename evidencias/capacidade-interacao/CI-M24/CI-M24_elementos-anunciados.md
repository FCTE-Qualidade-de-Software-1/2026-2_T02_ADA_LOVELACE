# Evidência CI-M24 : Elementos do desenho anunciados por leitor de tela

## 1. Identificação

| Campo | Valor |
| --- | --- |
| Métrica | CI-M24 : Elementos do desenho anunciados por leitor de tela |
| Questão (CI-Q) | CI-Q9 : Pessoas com deficiência conseguem usar o Excalidraw? (assistência ao usuário) |
| Tarefa do plano | CI-M24, acessibilidade (O6); ver `tarefas-capacidade-interacao.md` |
| Responsável | João Pedro Lopes da Cruz (ojplc) |
| Data(s) da coleta | 2026-11-14 |
| Versão avaliada | `e7b5346` (snapshot em `aplicacao/`) |
| Ambiente | Windows 11 Home Single Language 10.0.26200 (x64); NVDA 2026.3 (portátil do Guidepup); Guidepup 0.40.0; Playwright 1.58.2; Microsoft Edge 157.0.4341.46, janela maximizada (área visível 1912 × 994); build de produção servido em `http://localhost:5000/` |
| Revisado por | _pendente_ |

## 2. O que foi medido

Proporção dos elementos desenhados no canvas que o NVDA anuncia de forma que
identifique o elemento. O denominador e o critério de "anunciado" foram fixados
antes da medição:

- **Denominador: 9 elementos**, um de cada tipo, na cena
  `CI-M24_cena-teste_2026-11-14.excalidraw` (gerada por
  `scripts/ci_m24_cena.cjs`): retângulo, elipse, losango, seta, linha, texto
  ("Texto de teste"), desenho livre, imagem (PNG 64 × 64) e frame ("Quadro de
  teste").
- **Anunciado:** o NVDA fala algo que identifica o elemento (tipo, rótulo ou
  texto) em pelo menos um de quatro caminhos, todos executados por script:
  - P1, leitura contínua;
  - P2, navegação sequencial;
  - P3, navegação por Tab;
  - P4, seleção pelo teclado no canvas.
- **Não contam:**
  1. fala genérica do canvas ("Tela de desenho", "imagem", "gráfico");
  2. os nomes das ferramentas da barra ("Retângulo", "Elipse"...), que existem
     com ou sem desenho. Por isso o script roda os mesmos caminhos no app
     vazio, como controle;
  3. fala do painel de propriedades que não diz qual é o elemento;
  4. texto lido só durante a edição (a `textarea` é o editor, e não o elemento);
  5. anúncio coletivo, como "9 elementos selecionados".

## 3. Procedimento

Tudo é feito por `scripts/ci_m24_leitor_tela.cjs`, sem ninguém ouvir e anotar.
O script:

1. Liga o NVDA portátil do Guidepup com a voz OneCore em volume 0. A leitura
   contínua precisa de uma voz real, porque avança quando a voz termina cada
   trecho. Abre uma segunda conexão ao NVDA Remote local (127.0.0.1:6837,
   canal `guidepup`) só para ouvir: cada mensagem `speak` do NVDA vira uma
   linha do registro.
2. Para cada cenário (**vazia**, que é o controle, e **cena**) e cada caminho,
   abre um contexto novo do Edge, com perfil limpo, para um caminho não herdar
   o estado do outro. No cenário "cena", solta o arquivo `.excalidraw` sobre o
   canvas (evento `drop`) e espera os 9 elementos no `localStorage`. Depois
   maximiza a janela, dá a ela um título exclusivo, confere a área visível
   (para se não estiver maximizada) e recarrega a página. Antes de cada
   caminho, e a cada 10 teclas, confere que a janela do teste tem o foco
   (`document.hasFocus()`) e para tudo se não tiver.
3. Percorre o caminho:
   - **P1:** Ctrl+Home e NVDA+Seta para baixo (ler tudo).
   - **P2:** Ctrl+End e item anterior (Seta para cima no modo de navegação)
     até o topo; depois Ctrl+Home e próximo item até o fim. Cada sentido para
     com 4 passos sem fala ou com a mesma fala 6 vezes seguidas.
   - **P3:** 5 Tabs no estado em que o app abre. Depois o script tira o foco
     do contêiner com `blur()`, como faria um clique fora, e segue com Tab até
     o foco sair da página.
   - **P4:**
     1. Ctrl+End, que leva o cursor virtual para o fim da página, sobre o
        canvas. Isso é necessário porque o NVDA, ao entrar no modo foco, põe o
        foco no item sob o cursor, e no topo esse item é o botão do menu.
     2. NVDA+Espaço (modo foco). O script confere que o foco ficou no
        contêiner do editor (`div.excalidraw`) e para se não tiver ficado.
     3. Ctrl+A, Seta para a direita, Seta para baixo, Tab, Shift+Tab, Esc e
        Ctrl+A de novo, o que deixa os 9 elementos selecionados.
     4. NVDA+Espaço (modo de navegação) e leitura contínua com a seleção ativa.
4. Salva o registro de fala, a árvore de acessibilidade (CDP
   `Accessibility.getFullAXTree` e `ariaSnapshot()` do Playwright), um print
   da cena e a classificação automática.
5. Classificação: o identificador de cada elemento é uma expressão regular
   sobre o texto sem acento, com o tipo em pt-BR e em inglês (conforme
   `locales/pt-BR.json`) ou o texto/nome do elemento. O elemento é "sim" num
   caminho quando alguma fala da cena contém o identificador e **não existe,
   igual, na fala do controle** no mesmo caminho. Falas do painel de
   propriedades que contêm o identificador mas não identificam o elemento
   (regra 3) estão na lista `EXCLUSOES` do script, com o motivo, e aparecem
   como "excluída" na tabela E4. A classificação foi conferida lendo o
   registro (seção 5.1).

### 3.1 Comandos executados

```bash
# 2026-11-14, pasta aplicacao/ (build igual ao da CI-M22)
npx yarn@1.22.22 install --frozen-lockfile          # dependências já instaladas
(cd excalidraw-app && npx yarn@1.22.22 build:app:docker)

# 2026-11-14, pasta scripts/: Guidepup e NVDA portátil
npm install --no-fund --no-audit --ignore-scripts   # @guidepup/guidepup 0.40.0 (scripts/package.json)
npm audit signatures                                # 10 pacotes com assinatura verificada; 2 com atestado
npx @guidepup/setup@0.29.3 install nvda             # guidepup-nvda-0.2.1-2026.3.zip em %LOCALAPPDATA%\guidepup
sha256sum guidepup-nvda-0.2.1-2026.3.zip            # 508ba38e…2e19, igual ao manifesto e ao digest da release no GitHub

# 2026-11-14, 17:00 a 17:06, raiz do repositório (sem teclado nem mouse
# durante a execução; o script sobe o vite preview na porta 5000)
node scripts/ci_m24_leitor_tela.cjs --saida evidencias/capacidade-interacao/CI-M24
```

```text
== cenário cena
cena carregada: 9 elementos
árvore de acessibilidade: 108 nós expostos; canvas: 2
área visível: 1912x994
P1. leitura contínua: 1 passo(s), 30 fala(s)
P2. navegação sequencial (próximo e anterior item): 74 passo(s), 73 fala(s)
P3. navegação por Tab: 29 passo(s), 25 fala(s)
P4. seleção pelo teclado no canvas: 11 passo(s), 81 fala(s)
elementos depois do P4: ci-m24-retangulo:diamond, ci-m24-elipse:diamond, ci-m24-losango:diamond, ci-m24-seta:arrow, …

classificação automática: 1 de 9 elementos anunciados
  Frame ("Quadro de teste"): sim (P1, P2, P4)
  (os outros 8: não)
```

A saída completa, com as versões, está em `CI-M24_saida-script_2026-11-14.txt` (E7).

## 4. Evidências

### 4.1 Trechos de código

Todos conferidos por hash contra o upstream no `e7b5346`
(`git hash-object` × `gh api repos/excalidraw/excalidraw/contents/<arquivo>?ref=e7b534668a60add7f725531f3c9abf32508c7b4e --jq .sha`):
os 10 arquivos citados nesta evidência são idênticos.

| # | Arquivo:linha | O que mostra |
| --- | --- | --- |
| C1 | `packages/excalidraw/components/canvases/InteractiveCanvas.tsx:210-239` | O canvas interativo não tem `role` nem `aria-*`; o único conteúdo acessível é o texto fixo `t("labels.drawingCanvas")` ("Tela de desenho", `locales/pt-BR.json:100`), o mesmo com ou sem desenho |
| C2 | `packages/excalidraw/components/canvases/StaticCanvas.tsx:44-72` | O canvas estático é inserido na página (`replaceChildren`) e os elementos são desenhados nele por `renderStaticScene`: viram pixels, sem nó no DOM |
| C3 | `packages/element/src/renderElement.ts:686-711` | Até o texto é desenhado com `context.fillText`; "Texto de teste" não existe no DOM |
| C4 | `packages/excalidraw/components/App.tsx:2141`, `:2172-2192` e `:2265-2269` | `renderFrameNames` põe o nome de cada frame num `div` HTML (`CLASSES.FRAME_NAME`), mas só para frames dentro da área visível (`isElementInViewport`); é a única parte de um elemento desenhado que chega ao leitor de tela |
| C5 | `packages/element/src/types.ts:161-171` | `ExcalidrawImageElement` não tem campo de texto alternativo; uma imagem não tem como ser descrita |
| C6 | `packages/excalidraw/components/App.tsx:5191-5218` | Com o foco no contêiner do editor, `Tab` e `Shift+Tab` caem num ramo com `event.preventDefault()`, haja ou não seleção, e o foco não sai do contêiner. Com elementos selecionados, o mesmo ramo troca o tipo das formas (`convertElementTypes`) |
| C7 | `packages/excalidraw/components/Stats/index.tsx:296-304` | O painel de estatísticas mostra o tipo (`t("element.<tipo>")`) só quando um único elemento está selecionado, o que pelo teclado não se consegue (CI-M23) |

```tsx
// C1: packages/excalidraw/components/canvases/InteractiveCanvas.tsx:210-212, 236-239
    <canvas
      className="excalidraw__canvas interactive"
      ...
    >
      {t("labels.drawingCanvas")}
    </canvas>
```

```tsx
// C4: packages/excalidraw/components/App.tsx:2172-2176 e 2265-2269
      if (
        !isElementInViewport(
          getRenderElementWithPositionOverride(f, renderState.offset),
          this.canvas.width / this.ownerWindow.devicePixelRatio,
          this.canvas.height / this.ownerWindow.devicePixelRatio,
      ...
      return (
        <div
          id={this.getFrameNameDOMId(f)}
          className={CLASSES.FRAME_NAME}
          key={f.id}
```

```tsx
// C6: packages/excalidraw/components/App.tsx:5191-5199 e 5203-5211
        } else if (
          event.key === KEYS.TAB &&
          (this.ownerDocument.activeElement ===
            this.excalidrawContainerRef?.current ||
            this.ownerDocument.activeElement?.classList.contains(
              CLASSES.CONVERT_ELEMENT_TYPE_POPUP,
            ))
        ) {
          event.preventDefault();
          ...
          if (
            editorJotaiStore.get(convertElementTypePopupAtom)?.type === "panel"
          ) {
            if (
              convertElementTypes(this, {
                conversionType,
                direction: event.shiftKey ? "left" : "right",
              })
```

### 4.2 Arquivos de apoio

| # | Arquivo | Tipo | O que mostra |
| --- | --- | --- | --- |
| E1 | `CI-M24_cena-teste_2026-11-14.excalidraw` | cena | Os 9 elementos do denominador (regerada por `scripts/ci_m24_cena.cjs`, byte a byte igual; SHA-256 `faebc49d…585f`) |
| E2 | `CI-M24_cena-carregada_2026-11-14.png` | print | A cena carregada no app (só a página, sem a interface do navegador) |
| E3 | `CI-M24_registro-fala-nvda_2026-11-14.json` / `.txt` | registro de fala | Tudo o que o NVDA falou, por cenário, caminho e tecla, com o foco depois de cada tecla no P3 e no P4 (o `.txt` é a versão legível) |
| E4 | `CI-M24_classificacao_2026-11-14.md` / `.json` | tabela | Elemento × caminho × anunciado, com as ocorrências na cena e no controle, o trecho de fala e as falas excluídas |
| E5 | `CI-M24_arvore-acessibilidade_2026-11-14.json` | árvore de acessibilidade | Nós expostos pelo Chromium, os dois `<canvas>` (papel, nome, atributos) e, por elemento, os nós cujo nome contém o identificador |
| E6 | `CI-M24_arvore-acessibilidade_2026-11-14.yml` | `ariaSnapshot()` | A mesma árvore em YAML, com a cena recém-carregada |
| E7 | `CI-M24_saida-script_2026-11-14.txt` | saída de comando | Versões e resumo da execução |
| E8 | `scripts/ci_m24_leitor_tela.cjs` e `scripts/ci_m24_cena.cjs` | scripts | A medição completa e o gerador da cena |

### 4.3 Buscas sem resultado

| O que se procurou | Onde / comando | Resultado |
| --- | --- | --- |
| `aria-*` ou `role` nos canvas | `git grep -n -E "aria-\|role=" -- packages/excalidraw/components/canvases/` | Nenhuma ocorrência |
| `aria-*`, `role` ou `alt` na renderização dos elementos | `git grep -n -E "aria-\|\brole\b\|\.alt\b" -- packages/excalidraw/renderer/ packages/element/src/renderElement.ts` | Só `renderElement.ts:350`, o SVG de espera de imagem, com `aria-hidden="true"` e desenhado no canvas |
| Região viva que anuncie seleção ou criação de elementos | `git grep -n "aria-live" -- packages/excalidraw` e `git grep -n 'role="status"' -- packages/excalidraw/components` | Só regiões sem relação com a seleção: `FileDropOverlay.tsx:133` (aviso ao arrastar arquivo), `Toast.tsx:61` (avisos curtos, como "Content replaced. Ctrl+Z to undo" ao carregar a cena, visto em E6) e `ViewportStatusFrame.tsx:49` |
| Texto alternativo no tipo de imagem | `packages/element/src/types.ts:161-171` | Nenhum campo (`fileId`, `status`, `scale`, `crop`) |
| Nó na árvore de acessibilidade com o texto, a imagem ou o tipo de algum elemento desenhado | E5, `porElemento` | Só os botões da barra ("Retângulo", "Losango", "Elipse", "Flecha", "Linha", "Desenhar", "Texto") e o `StaticText` "Quadro de teste"; nada para "Texto de teste" nem para a imagem |
| Fala com "Texto de teste" ou com a imagem | E3, todos os caminhos | Nenhuma ocorrência |

## 5. Resultado

### 5.1 Dados brutos

Resumo da tabela E4. "Cena / controle" é o número de ocorrências do
identificador em cada cenário; a decisão é pela existência de fala que só
aparece com a cena (seção 3, passo 5).

| Elemento | P1 leitura contínua | P2 sequencial | P3 Tab | P4 teclado no canvas | Anunciado? |
| --- | --- | --- | --- | --- | --- |
| Retângulo | 1 / 1 | 2 / 2 | 2 / 2 | 1 / 1 | Não (só o botão da barra) |
| Elipse | 1 / 1 | 2 / 2 | 2 / 2 | 1 / 1 | Não (só o botão da barra) |
| Losango | 1 / 1 | 2 / 2 | 2 / 2 | 1 / 1 | Não (só o botão da barra) |
| Seta | 1 / 1 | 2 / 2 | 2 / 2 | 1 / 1 | Não (botão "Flecha"; "Tipo de seta", do painel, excluído pela regra 3) |
| Linha | 1 / 1 | 2 / 2 | 2 / 2 | 1 / 1 | Não (só o botão da barra) |
| Texto ("Texto de teste") | 1 / 1 | 2 / 2 | 2 / 2 | 1 / 1 | Não (botão "Texto"; "Alinhamento do texto", do painel, excluído pela regra 3) |
| Desenho livre | 2 / 3 | 4 / 6 | 4 / 4 | 2 / 3 | Não (botões "Desenhar" e "Manter ativa…após desenhar"; no controle, também "comece a desenhar!" da tela de boas-vindas) |
| Imagem | 0 / 0 | 0 / 0 | 0 / 0 | 0 / 0 | Não |
| Frame ("Quadro de teste") | 1 / 0 | 7 / 0 | 0 / 0 | 2 / 0 | **Sim**: "Quadro de teste" |

Conferência manual do registro (E3, cenário "cena"):

- **P1:** lê o título, a barra de ferramentas, as ações da tela, "clicável,
  Tela de desenho" e, por último, "Quadro de teste". Nada de nenhum outro
  elemento.
- **P2:** de Ctrl+End, "Quadro de teste", "clicável, Tela de desenho" e os
  controles até o topo. Do topo, os mesmos controles até "Tela de desenho" e
  "Quadro de teste", que é o fim da página e que o NVDA repete até o critério
  de parada. O texto, a imagem e as formas não são itens do documento.
- **P3:** os 5 Tabs do estado inicial não falam nada e o foco fica em
  `div.excalidraw`. Depois do `blur()`, o Tab passa pelo menu, pelas 12
  ferramentas, por "Mais ferramentas", "Try Excalidraw+", "Colaboração ao
  vivo...", "Biblioteca", os três botões de zoom, o link do blog e "Ajuda", e
  então sai para a barra do navegador. Nenhum elemento desenhado recebe foco,
  nem o nome do frame, que não é focável.
- **P4:** o foco fica no contêiner do editor em todas as teclas. O Ctrl+A
  seleciona os 9 elementos (`selecionados: 9`) **sem nenhuma fala**. As
  setas, o Tab, o Shift+Tab e o Esc também não falam nada. O Tab e o
  Shift+Tab, porém, trocaram o tipo de duas formas: o retângulo e a elipse
  viraram losango (E7, "elementos depois do P4"). A leitura com a seleção
  ativa lê o painel de propriedades e, no fim, "Quadro de teste". O painel
  lê "Espessura do traço", "Arestas", "Tipo de seta", "Família da fonte",
  "Tamanho da fonte", "Alinhamento do texto", "Pontas", "Camadas", "Duplicar",
  "Apagar" e "Agrupar seleção". Esses controles deixam deduzir que há uma seta
  e um texto na seleção, mas não dizem quais elementos estão selecionados
  (regra 3).
- **Falas que só existem com a cena**, em todos os caminhos: "Quadro de
  teste", os controles do painel de propriedades (P4), variações de fala de
  controles que existem nos dois cenários (o botão do menu, a dica "Para mover
  a tela...", "Desfazer" habilitado) e o título da janela (P3). Nenhuma
  identifica outro elemento desenhado.

### 5.2 Cálculo

anunciados ÷ total = 1 ÷ 9 = **11,1%**

### 5.3 Pontuação

| Valor medido | Regra da métrica | Pontuação (0–2) |
| --- | --- | --- |
| 11,1% (1 de 9) | 2 = ≥ 80%; 1 = 40% a 79%; 0 = < 40% | **0** |

**Justificativa:** o NVDA só identifica o frame, e isso porque o nome do frame
é um `div` HTML sobre o canvas (C4). Retângulo, elipse, losango, seta, linha,
texto, desenho livre e imagem são pixels num `<canvas>` cujo único conteúdo
acessível é "Tela de desenho" (C1–C3), igual com ou sem desenho.

## 6. Observações e limitações

- **NVDA controlado por script.** O NVDA 2026.3 foi controlado pelo Guidepup
  0.40.0 (versão portátil `0.2.1-2026.3`), no Microsoft Edge 157.0.4341.46. O
  registro é o que o NVDA mandou falar, lido pelo NVDA Remote local; ninguém
  ouviu a fala. Não foi testado com VoiceOver nem com outros navegadores. O
  Chrome, usado na CI-M22, não está instalado na máquina da coleta.
- **Configuração do NVDA.** Partiu da configuração do pacote do Guidepup
  (idioma do Windows, pt-BR), com três mudanças, todas no script:
  - voz OneCore com volume 0 e aumento de velocidade;
  - troca automática de idioma da voz desligada;
  - visualizador de fala desligado.

  Nenhuma delas muda o que o NVDA anuncia.
- **O nome do frame depende da tela.** O Excalidraw só põe no DOM o nome dos
  frames dentro da área visível (C4). Num teste de depuração com a janela
  restaurada (921 × 968), o frame da cena ficava fora da tela, o nome não
  estava no DOM e o NVDA não o anunciava. Por isso o script maximiza a janela
  e para se ela não estiver maximizada. Numa cena maior, só os frames na tela
  são anunciados.
- **O controle (app vazio) tem a tela de boas-vindas**, que some quando há
  elementos. A frase "Escolha uma ferramenta e comece a desenhar!" contém
  "desenhar" e por isso aumenta a contagem do desenho livre no controle (5.1).
  A decisão é pelas falas que só existem com a cena, então essa diferença não
  esconde nenhuma fala nova.
- **Exclusões aplicadas depois de ler o registro.** "Tipo de seta" e
  "Alinhamento do texto", do painel de propriedades, contêm os identificadores
  da seta e do texto. Foram excluídas pela regra 3, fixada antes da medição.
  As exclusões estão no script (`EXCLUSOES`) e na tabela E4, com o motivo.
- **Rodadas descartadas.** Antes desta execução, seis rodadas completas foram
  descartadas por falhas de método, e os arquivos delas foram sobrescritos:
  1. o foco saiu da janela e o script parou, como previsto;
  2. o P2 não tinha critério de fim e o P3 começava com o foco preso;
  3. o P4 rodou com o foco na barra de abas, depois de o P3 sair da página;
  4. o Tab do P4 trocou o tipo de duas formas, e o P3 herdou a seleção;
  5. a janela estava restaurada, e o nome do frame ficou fora do DOM (0 de 9);
  6. o NVDA+Espaço do P4 pôs o foco no botão do menu, e não no contêiner do
     editor (1 de 9), o que a revisão independente apontou.

  Nos registros conferidos durante a coleta, o NVDA nunca falou o texto, a
  imagem ou o tipo de um elemento desenhado. A versão final isola cada caminho
  num perfil limpo e confere janela, foco e estado antes de começar.

### Observações fora da métrica

- **O1. "Tela de desenho" é igual para qualquer cena.** O NVDA lê "clicável,
  Tela de desenho" com o canvas vazio e com 9 elementos. No controle, esse é o
  último item da página. Com a cena, o último item é "Quadro de teste".
- **O2. Seleção e edição mudas.** Com o foco no editor, Ctrl+A, setas, Tab,
  Shift+Tab e Esc não produzem nenhuma fala. Não há região viva que diga o
  que foi selecionado, movido, convertido ou desmarcado (4.3).
- **O3. Armadilha de teclado (WCAG 2.1.2).** O app abre com o foco no
  contêiner do editor (`autoFocus`), e ali `Tab` e `Shift+Tab` não movem o
  foco (C6). No P3, os 5 Tabs do estado inicial deixaram o foco em
  `div.excalidraw`, sem nenhuma fala. Só depois de o foco sair do contêiner
  (no teste, por `blur()`) o Tab percorre a interface. Vale cruzar com a
  CI-M22 e a CI-M23.
- **O4. O Tab troca o tipo das formas selecionadas, sem aviso.** Com
  elementos selecionados e o foco no editor, Tab e Shift+Tab convertem as
  formas (C6). No P4, o retângulo e a elipse viraram losango, e o NVDA não
  falou nada. Quem usa leitor de tela e aperta Tab para navegar altera o
  desenho sem saber.

## 7. Achado (preencher só se a pontuação for 0)

| ID | Métrica | Evidência reproduzível | Pontuação | Impacto (Baixo/Médio/Alto) | Recomendação |
| --- | --- | --- | --- | --- | --- |
| A-CI-M24-1 | CI-M24 | E3/E4 (registro e classificação), C1–C4, passos da seção 3: só 1 de 9 elementos (o nome do frame) é anunciado pelo NVDA; formas, texto, linhas, desenho livre e imagem não existem para o leitor de tela, e seleção e mudanças pelo teclado não produzem fala | 0 | Alto | Expor os elementos numa estrutura acessível paralela ao canvas (lista ou árvore com tipo, texto, rótulo e posição) e anunciar seleção e mudanças numa região `aria-live`; permitir texto alternativo para imagens |

## 8. Contribuição para a questão

| Questão | Esta métrica indica que a hipótese foi | Por quê |
| --- | --- | --- |
| CI-Q9 | confirmada, na parte sobre o canvas | Os elementos desenhados no canvas não são anunciados pelo NVDA (1 de 9, e o único é um rótulo HTML fora do canvas). A parte sobre menus e barra operáveis pelo teclado é da CI-M23 |
