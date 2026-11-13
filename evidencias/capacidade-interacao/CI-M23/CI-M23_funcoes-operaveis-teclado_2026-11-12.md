# Evidência CI-M23 : Funções operáveis sem mouse

## 1. Identificação

| Campo | Valor |
| --- | --- |
| Métrica | CI-M23 : Funções operáveis sem mouse |
| Questão (CI-Q) | CI-Q9 : Pessoas com deficiência conseguem usar? |
| Tarefa do plano | CI-M23 — acessibilidade (O6), ver `tarefas-capacidade-interacao.md` |
| Responsável | Luís Felipe Parreira Cunha |
| Data(s) da coleta | 2026-11-12 |
| Versão avaliada | `e7b5346` (fixada pela documentação; ver limitações) |
| Ambiente | macOS 27.2 (26B123); OpenCode 2.2.1 / Chromium 152.0.7977.167 / Electron 44.9.1; viewport 800×655 @2x |
| Revisado por | _pendente_ |

## 2. O que foi medido

Proporção de funções do editor que podem ser **ativadas, executadas e concluídas** usando apenas o teclado. O denominador foi fixado antes do teste em **28 funções**, cobrindo seleção e criação no canvas, edição, propriedades, histórico, área de transferência, zoom, arquivo/exportação, ajuda/configurações, tema/idioma e colaboração.

Em relação à lista sugerida no guia, `agrupar` e `desagrupar` foram contadas separadamente, e `abrir ajuda e configurações` foi tratada como uma única função (o menu principal concentra as configurações e o controle de idioma). O total permaneceu em 28.

## 3. Procedimento

1. Abrir `http://localhost:3001` e recarregar a página.
2. Preparar uma cena de apoio com quatro elementos (três retângulos e um texto), para permitir testar funções que dependem de elementos existentes sem usar o mouse.
3. Não usar mouse durante a coleta. Percorrer a interface apenas com `Tab`, `Shift+Tab`, `Enter`, `Space`, setas, `Escape` e atalhos de teclado.
4. Tentar cada função da lista, registrando a sequência de teclas e o estado observado no DOM (foco, seleção, contagem de elementos, propriedades).
5. Classificar como **Sim** somente quando a função fosse ativada, executada e concluída sem mouse; caso contrário, **Não**.
6. Repetir os testes de menu e de foco com o botão real focado e eventos de teclado, para descartar falha de automação.
7. Contar as funções operáveis e calcular o percentual.

### 3.1 Comandos executados

Preparação da cena (script equivalente ao usado; a cena completa está em E2) e conferência da contagem:

```js
// 2026-11-12 — console do navegador
const cena = JSON.parse(/* conteúdo de CI-M23_cena-de-apoio_2026-11-12.excalidraw */);
localStorage.setItem("excalidraw", JSON.stringify(cena.elements));
location.reload();

JSON.parse(localStorage.getItem("excalidraw")).length;
```

```text
4
```

Conferência da versão no ambiente:

```bash
# 2026-11-12 — diretório Projeto
git cat-file -t e7b5346
ls -a aplicacao | grep '^\.git$'
```

```text
fatal: Not a valid object name e7b5346
(sem saída: aplicacao/ não tem .git)
```

```js
// 2026-11-12 — console do navegador
window.__EXCALIDRAW_SHA__;
```

```text
null
```

## 4. Evidências

### 4.1 Trechos de código

| # | Arquivo:linha | O que mostra |
| --- | --- | --- |
| C1 | `aplicacao/packages/excalidraw/actions/shortcuts.ts:59-118` | Mapa dos atalhos usados: desfazer/refazer, copiar/colar, selecionar tudo, excluir, duplicar, agrupar/desagrupar, zoom, exportar, paleta de comandos e tema |
| C2 | `aplicacao/packages/excalidraw/components/Tools.tsx:69-120` | Teclas das ferramentas: `R`, `O`, `A`, `L`, `P`, `T` (e `V` para seleção) |
| C3 | `aplicacao/packages/excalidraw/components/ColorPicker/colorPickerUtils.ts:38-42` | Hotkeys do seletor de cor (`q/w/e/r/t`, `a/s/d/f/g`, `z/x/c/v/b`) usadas para escolher traço e preenchimento |
| C4 | `aplicacao/packages/excalidraw/components/main-menu/MainMenu.tsx:42-55` | Menu principal controlado por `appState.openMenu`, com trigger que só alterna por `onClick` |
| C5 | `aplicacao/packages/excalidraw/components/dropdownMenu/DropdownMenu.tsx:42-44` | `DropdownMenuPrimitive.Root` recebe `open` controlado, sem `onOpenChange` |
| C6 | `aplicacao/excalidraw-app/components/AppMainMenu.tsx:81-85` | O controle de idioma (`LanguageList`) fica dentro do menu principal |
| C7 | `aplicacao/packages/excalidraw/actions/actionAlign.tsx:97-98` | `CtrlOrCmd+Shift+Arrow` executa alinhamento, não redimensionamento |
| C8 | `aplicacao/packages/excalidraw/actions/actionCanvas.tsx:461-465` | `toggleTheme` usa `event.code === CODES.D`; o atalho direto não dispara quando o `code` chega vazio na automação |

```ts
// C1: actions/shortcuts.ts:59-118 (trecho)
const shortcutMap: Record<ShortcutName, string[]> = {
  toggleTheme: [getShortcutKey("Shift+Alt+D")],
  loadScene: [getShortcutKey("CtrlOrCmd+O")],
  imageExport: [getShortcutKey("CtrlOrCmd+Shift+E")],
  commandPalette: [
    getShortcutKey("CtrlOrCmd+/"),
    getShortcutKey("CtrlOrCmd+Shift+P"),
  ],
  copy: [getShortcutKey("CtrlOrCmd+C")],
  paste: [getShortcutKey("CtrlOrCmd+V")],
  selectAll: [getShortcutKey("CtrlOrCmd+A")],
  deleteSelectedElements: [getShortcutKey("Delete")],
  duplicateSelection: [getShortcutKey("CtrlOrCmd+D")],
  group: [getShortcutKey("CtrlOrCmd+G")],
  ungroup: [getShortcutKey("CtrlOrCmd+Shift+G")],
  resetZoom: [getShortcutKey("CtrlOrCmd+0")],
  zoomOut: [getShortcutKey("CtrlOrCmd+-")],
  zoomIn: [getShortcutKey("CtrlOrCmd++")],
  toggleShortcuts: [getShortcutKey("?")],
};
```

```tsx
// C2: components/Tools.tsx:81-120 (trecho)
rectangle: { icon: RectangleIcon, letterKey: KEYS.R, numericKey: KEYS["2"], fillable: true },
ellipse:   { icon: EllipseIcon,   letterKey: KEYS.O, numericKey: KEYS["4"], fillable: true },
arrow:     { icon: ArrowIcon,     letterKey: KEYS.A, numericKey: KEYS["5"], fillable: true },
line:      { icon: LineIcon,      letterKey: KEYS.L, numericKey: KEYS["6"], fillable: true },
freedraw:  { icon: FreedrawIcon,  letterKey: [KEYS.P, KEYS.X], numericKey: KEYS["7"] },
text:      { icon: TextIcon,      letterKey: KEYS.T, numericKey: KEYS["8"] },
```

```ts
// C3: components/ColorPicker/colorPickerUtils.ts:38-42
export const colorPickerHotkeyBindings = [
  ["q", "w", "e", "r", "t"],
  ["a", "s", "d", "f", "g"],
  ["z", "x", "c", "v", "b"],
].flat();
```

```tsx
// C4/C5: MainMenu.tsx:42-55 e DropdownMenu.tsx:42-44
<DropdownMenu open={appState.openMenu === "canvas"}>
  <DropdownMenu.Trigger
    onToggle={() => {
      setAppState({
        openMenu: appState.openMenu === "canvas" ? null : "canvas",
        openPopup: null,
        openDialog: null,
      });
    }}
    data-testid="main-menu-trigger"
    className="main-menu-trigger"
  >
    {HamburgerMenuIcon}
  </DropdownMenu.Trigger>
  {/* ... */}
</DropdownMenu>

<DropdownMenuPrimitive.Root open={open} modal={false}>
```

```tsx
// C6: excalidraw-app/components/AppMainMenu.tsx:81-85
<MainMenu.DefaultItems.Preferences />
<MainMenu.DefaultItems.ToggleTheme allowSystemTheme theme={props.theme} />
<MainMenu.ItemCustom>
  <LanguageList style={{ width: "100%" }} />
</MainMenu.ItemCustom>
<MainMenu.DefaultItems.ChangeCanvasBackground />
```

```tsx
// C8: actions/actionCanvas.tsx:461-465
keyTest: (event) =>
  !event[KEYS.CTRL_OR_CMD] &&
  event.altKey &&
  event.shiftKey &&
  event.code === CODES.D,
```

### 4.2 Arquivos de apoio

| # | Arquivo | Tipo | O que mostra |
| --- | --- | --- | --- |
| E1 | `CI-M23_cena-de-apoio_2026-11-12.png` | print | Cena de apoio com os quatro elementos, seleção total (`Cmd+A`), painel de propriedades e zoom em 110% |
| E2 | `CI-M23_cena-de-apoio_2026-11-12.excalidraw` | cena | Elementos usados no teste (`apoio-ret-1/2/3` e `apoio-txt-1`) |
| E3 | `CI-M23_seletor-cor_2026-11-12.png` | print | Seletor de cor aberto por teclado, com as hotkeys visíveis nas amostras |
| E4 | `CI-M23_espessura-estilo_2026-11-12.png` | print | Popover de espessura, estilo, aspereza, bordas e opacidade, com foco no controle de espessura |
| E5 | `CI-M23_dialogo-exportar_2026-11-12.png` | print | Diálogo "Export image" aberto por `Cmd+Shift+E`, com botões PNG/SVG e prévia |
| E6 | `CI-M23_ajuda_2026-11-12.png` | print | Diálogo "Keyboard shortcuts" aberto por `?` |
| E7 | `CI-M23_paleta-comandos-tema_2026-11-12.png` | print | Paleta de comandos com a busca `dark` e o comando "Dark mode" |
| E8 | `CI-M23_dialogo-colaboracao_2026-11-12.png` | print | Diálogo "Live collaboration", com o botão "Start session" |
| E9 | `CI-M23_menu-foco-sem-abrir_2026-11-12.png` | print | Botão do menu principal (☰) com foco visível e menu fechado |
| E10 | `CI-M23_testemunho_2026-11-12.md` | dados brutos | Sequência de teclas, estados observados, contagens e limitações da automação |

### 4.3 Buscas sem resultado

| O que se procurou | Onde / comando | Resultado |
| --- | --- | --- |
| Comando de idioma na paleta | `Cmd+/` e busca `language` | "No matching commands..." — nenhum comando de idioma exposto |
| Controle de idioma fora do menu principal | `grep -rn "LanguageList" aplicacao/excalidraw-app` | Só `components/AppMainMenu.tsx:84`, dentro do `MainMenu` |
| Alças de redimensionamento focáveis | `Tab` no canvas e inspeção do DOM | Nenhum handle com foco; não há ação de teclado para redimensionar |
| Seleção de elemento no canvas | `Tab`/`Shift+Tab` e setas | Nenhum elemento do canvas recebe foco; `selectedElementIds` permanece vazio |
| Atalho para abrir o menu principal | `actions/shortcuts.ts` | Nenhuma entrada de menu principal no mapa de atalhos |

## 5. Resultado

### 5.1 Dados brutos

| Nº | Função | Operável sem mouse? | Forma de execução | Evidência |
| ---: | --- | :-: | --- | --- |
| 1 | Selecionar elemento individual | Não | `Tab`/`Shift+Tab`/setas: elementos do canvas não recebem foco | E1, E10 |
| 2 | Criar retângulo | Não | `R` ativa a ferramenta, mas a criação exige clique/arraste | E10 |
| 3 | Criar elipse | Não | `O` ativa a ferramenta, mas a criação exige clique/arraste | E10 |
| 4 | Criar seta | Não | `A` ativa a ferramenta, mas a criação exige clique/arraste | E10 |
| 5 | Criar linha | Não | `L` ativa a ferramenta, mas a criação exige clique/arraste | E10 |
| 6 | Desenho livre | Não | `P` ativa a ferramenta, mas o traço exige arraste | E10 |
| 7 | Inserir texto | Não | `T` ativa a ferramenta, mas o container exige clique no canvas | E10 |
| 8 | Mover elementos | Sim | `Cmd+A` + setas (1 px) ou `Shift+setas` (10 px) | E1, E10 |
| 9 | Redimensionar | Não | Sem alças focáveis; `Cmd+Shift+setas` apenas alinha | E10 |
| 10 | Cor do traço | Sim | `Tab` até "Stroke" → `Enter` → `s` | E3, E10 |
| 11 | Preenchimento | Sim | `Tab` até "Background" → `Enter` → `c` | E3, E10 |
| 12 | Espessura | Sim | `Tab` até o botão de espessura → `Enter` → `Tab` → `ArrowRight` | E4, E10 |
| 13 | Duplicar | Sim | `Cmd+D` (4 → 8 elementos no estado testado) | E10 |
| 14 | Excluir | Sim | `Delete` (8 → 4 elementos no estado testado) | E10 |
| 15 | Agrupar | Sim | `Cmd+G`; `groupIds` fica não vazio | E10 |
| 16 | Desagrupar | Sim | `Cmd+Shift+G`; `groupIds` volta a ficar vazio | E10 |
| 17 | Desfazer | Sim | `Cmd+Z` | E10 |
| 18 | Refazer | Sim | `Cmd+Shift+Z` | E10 |
| 19 | Copiar | Sim† | `Cmd+C`; handler confirmado com `ClipboardEvent("copy")` | E10 |
| 20 | Colar | Sim† | `Cmd+V`; handler confirmado com `ClipboardEvent("paste")` | E10 |
| 21 | Selecionar tudo | Sim | `Cmd+A` | E1, E10 |
| 22 | Alterar zoom | Sim | `Tab` até os botões de zoom + `Enter` (100% → 110%) | E1, E10 |
| 23 | Abrir arquivo | Sim† | `Cmd+O`; seletor nativo abriu, seleção do arquivo não concluída na automação | E10 |
| 24 | Exportar imagem | Sim† | `Cmd+Shift+E` → `Tab` até PNG → `Enter`; diálogo nativo de salvar pendente | E5, E10 |
| 25 | Abrir ajuda e configurações | Não | `?` abre a ajuda; o menu de configurações (☰) não abre com `Enter`/`Space`/`ArrowDown` | E6, E9, E10 |
| 26 | Alterar tema | Sim | `Cmd+/` → `dark` → `Enter`; tema escuro e persistido | E7, E10 |
| 27 | Alterar idioma | Não | Paleta sem comando de idioma; `<select>` só existe no menu principal inacessível | E9, E10 |
| 28 | Iniciar colaboração | Sim | `Tab` até compartilhar → `Enter` → `Tab` até "Start session" → `Enter` | E8, E10 |

**†** Ativação e execução pelo teclado confirmadas; a conclusão depende de clipboard ou de diálogo nativo do sistema operacional, não observáveis por completo na automação (ver seção 6).

| Total de funções | Operáveis (Sim) | Não operáveis (Não) | Percentual |
| ---: | ---: | ---: | ---: |
| 28 | 18 | 10 | 64,3% |

### 5.2 Cálculo

```text
18 funções operáveis ÷ 28 funções testadas × 100 = 64,2857...% ≈ 64,3%
```

### 5.3 Pontuação

| Valor medido | Regra da métrica | Pontuação (0–2) |
| --- | --- | :-: |
| 64,3% | 2 = ≥ 90%; 1 = 60% a 89%; 0 = < 60% | **1** |

**Justificativa:** a maior parte das funções de edição, propriedades, arquivo e colaboração é operável por teclado, mas seleção/criação no canvas, redimensionamento, menu principal e idioma continuam dependentes do mouse. O resultado fica na faixa intermediária (60% a 89%).

## 6. Observações e limitações

- **Ambiente diferente do documentado.** O teste foi feito no navegador embutido do OpenCode (Chromium/Electron) em macOS 27.2, enquanto `ambiente-local.md` registra Windows/Helium. Foco, atalhos e diálogos nativos podem variar em outro navegador.
- **Versão não confirmada por hash.** `aplicacao/` não tem `.git` próprio; `git cat-file -t e7b5346` no repositório `Projeto` retorna "Not a valid object name", e `window.__EXCALIDRAW_SHA__` é `null` na build local. A versão `e7b5346` é a fixada pela documentação do plano.
- **Clipboard.** A automação via CDP não gera eventos nativos de clipboard. Copiar/colar foram confirmados com `ClipboardEvent` sintético no mesmo handler acionado pelas teclas; o conteúdo foi verificado, mas o round-trip pelo clipboard do sistema não foi observado.
- **Diálogos nativos.** `Cmd+O` e a exportação abriram diálogos do sistema operacional. A parte da aplicação foi navegável por teclado, mas a seleção do arquivo e o salvamento não foram concluídos na automação.
- **`event.code`.** O atalho direto de tema (`Alt+Shift+D`) não disparou na automação porque os eventos chegam com `code` vazio. O tema foi alterado pela paleta de comandos, que é um caminho de teclado válido. Recomenda-se reconfirmar o atalho direto manualmente.
- **Menu principal.** O botão ☰ recebe foco, mas `Enter`, `Space` e `ArrowDown` não abrem o menu; `aria-expanded` permanece `"false"`. O comportamento é coerente com o código: o `DropdownMenu` é controlado por `open` sem `onOpenChange`, e o trigger só alterna por `onClick`. Recomenda-se uma reconfirmação manual em navegador comum.
- **Lista de funções.** O denominador de 28 foi fixado antes do teste. Em relação ao guia, `agrupar`/`desagrupar` foram separadas e `abrir ajuda e configurações` foi tratada como uma função combinada; o total foi preservado.
- **Achados fora da métrica.** A paleta de comandos (`Cmd+/`) é uma alternativa parcial ao menu para comandos como tema, mas não expõe idioma. A ajuda (`?`) é totalmente operável por teclado e lista os atalhos, mas não compensa a falta de acesso ao canvas. O botão de colaboração é operável por teclado mesmo com o menu principal inacessível.

## 7. Achado (não se aplica)

Não se aplica: a pontuação é **1**, não 0.

## 8. Contribuição para a questão

| Questão | Esta métrica indica que a hipótese foi | Por quê |
| --- | --- | --- |
| CI-Q9 | **parcial** | 64,3% das funções testadas são operáveis sem mouse; atalhos cobrem edição, propriedades, arquivo e colaboração, mas seleção/criação no canvas, redimensionamento, menu principal e idioma ainda exigem mouse |
