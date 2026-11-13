# Testemunho de execução — CI-M23

> **Arquivo de apoio E10.** Registro bruto da sessão de 2026-11-12. Complementa `CI-M23_funcoes-operaveis-teclado_2026-11-12.md`. As contagens referem-se ao estado no momento de cada teste; desfazer/refazer e recarregamentos entre grupos fizeram o número de elementos variar.

## 1. Ambiente e versão

| Item | Valor |
| --- | --- |
| Data | 2026-11-12 |
| Sistema operacional | macOS 27.2 (build 26B123), arm64 |
| Tela | 1470×956 @2x (Retina) |
| Navegador | OpenCode 2.2.1 (Electron 44.9.1), Chromium 152.0.7977.167 |
| Viewport | 800×655 px CSS |
| Aplicação | `http://localhost:3001` |
| Versão avaliada | `e7b5346`, fixada pelo guia da métrica |
| Responsável | Luís Felipe Parreira Cunha |
| Método | apenas teclado; foco e estado inspecionados pelo DOM |

**Sobre a versão:** `aplicacao/` não possui metadados `.git` próprios; no repositório `Projeto`, `git cat-file -t e7b5346` retorna `fatal: Not a valid object name e7b5346`. A build local também expõe `window.__EXCALIDRAW_SHA__ = null`. Portanto, `e7b5346` é a versão registrada na documentação do plano, mas não pôde ser confirmada por hash dentro do ambiente.

## 2. Preparação da cena

1. Abrir `http://localhost:3001` e recarregar a página.
2. No console do navegador, gravar os elementos da cena de apoio em `localStorage` (script equivalente ao usado; a cena completa está em E2):

```js
const cena = JSON.parse(/* conteúdo de CI-M23_cena-de-apoio_2026-11-12.excalidraw */);
localStorage.setItem("excalidraw", JSON.stringify(cena.elements));
location.reload();
```

3. Confirmar quatro elementos: `apoio-ret-1`, `apoio-ret-2`, `apoio-ret-3` (retângulos de 140×90) e `apoio-txt-1` (texto "Texto de apoio").
4. Não usar mouse. O foco foi verificado com `document.activeElement`; os estados de seleção e de menu, com `selectedElementIds`, `groupIds`, `aria-expanded` e a presença dos nós do menu.

## 3. Registros por função

| Nº | Função | Teclas / sequência | Estado observado | Resultado |
| ---: | --- | --- | --- | :-: |
| 1 | Selecionar elemento individual | `Tab` repetido pela barra, painéis e canvas; `Shift+Tab`; setas; `Enter`/`Space` | O foco percorre botões e painéis, mas nenhum dos quatro elementos do canvas recebe foco; não há contorno de seleção; `selectedElementIds` permanece vazio | Não |
| 2 | Criar retângulo | `R`; `Tab` até o canvas; `Enter`; setas | A ferramenta retângulo é ativada (botão destacado), mas a criação exige clique/arraste no canvas; nenhum elemento novo é criado | Não |
| 3 | Criar elipse | `O`; mesma tentativa | Ferramenta ativada; sem posicionamento por teclado; nenhum elemento criado | Não |
| 4 | Criar seta | `A`; mesma tentativa | Ferramenta ativada; sem posicionamento por teclado; nenhum elemento criado | Não |
| 5 | Criar linha | `L`; mesma tentativa | Ferramenta ativada; sem posicionamento por teclado; nenhum elemento criado | Não |
| 6 | Desenho livre | `P`; mesma tentativa | Ferramenta ativada; o traço depende de arraste; nenhum elemento criado | Não |
| 7 | Inserir texto | `T`; `Tab` até o canvas; `Enter` | Ferramenta de texto ativada, mas não há como criar o container de texto sem clique no canvas | Não |
| 8 | Mover elementos | `Cmd+A`; `ArrowRight` (1 px); `Shift+ArrowDown` (10 px) | Quatro elementos selecionados; as posições x/y mudaram conforme o passo das setas | Sim |
| 9 | Redimensionar | Com a seleção ativa, `Tab` pelo painel; `Cmd+Shift+Arrow` (alinhamento); `Shift+Arrow` | Não há alças de redimensionamento focáveis; os atalhos de alinhamento mudam a posição, mas não a largura/altura | Não |
| 10 | Cor do traço | `Tab` até o botão "Stroke"; `Enter`; tecla `s` | O seletor de cor abre; `s` seleciona a amostra azul; `strokeColor` dos elementos muda para azul | Sim |
| 11 | Preenchimento | `Tab` até "Background"; `Enter`; tecla `c` | O seletor abre; `c` seleciona a amostra laranja; `backgroundColor` muda | Sim |
| 12 | Espessura | `Tab` até o botão de espessura "Stroke"; `Enter`; `Tab` até o rádio; `ArrowRight` | O popover de espessura/estilo abre; a seta direita muda a espessura selecionada | Sim |
| 13 | Duplicar | `Cmd+D` | O estado testado passou de 4 para 8 elementos; as cópias ficam selecionadas | Sim |
| 14 | Excluir | `Delete` | O estado testado passou de 8 para 4 elementos (as cópias selecionadas foram removidas) | Sim |
| 15 | Agrupar | `Cmd+G` | Os elementos selecionados passam a compartilhar `groupIds` não vazio | Sim |
| 16 | Desagrupar | `Cmd+Shift+G` | `groupIds` volta a ficar vazio | Sim |
| 17 | Desfazer | `Cmd+Z` | O estado anterior é restaurado (posição, cor, agrupamento ou contagem, conforme o passo) | Sim |
| 18 | Refazer | `Cmd+Shift+Z` | O estado desfeito é reaplicado | Sim |
| 19 | Copiar | `Cmd+C`; verificação com `ClipboardEvent("copy")` sintético | O clipboard nativo não é observável pela automação; o handler do aplicativo gerou JSON com os 8 elementos no `clipboardData` | Sim† |
| 20 | Colar | `Cmd+V`; verificação com `ClipboardEvent("paste")` sintético | O handler do aplicativo inseriu os elementos do JSON; o estado testado passou de 8 para 16 elementos | Sim† |
| 21 | Selecionar tudo | `Cmd+A` | Todos os elementos do estado são selecionados; `selectedElementIds` contém 4 (ou 8, no estado com 8 elementos) | Sim |
| 22 | Alterar zoom | `Tab` até "Zoom in"/"Zoom out"/reset; `Enter` | O zoom passou de 100% para 110%; os botões e o indicador respondem ao teclado | Sim |
| 23 | Abrir arquivo | `Cmd+O` | O seletor de arquivos nativo do sistema abriu; a seleção do arquivo não pôde ser concluída pela automação (segunda tentativa retornou `File picker already active`) | Sim† |
| 24 | Exportar imagem | `Cmd+Shift+E`; `Tab` até "PNG"; `Enter` | O diálogo de exportação abriu e foi navegável por teclado; a exportação foi iniciada e ficou aguardando o diálogo nativo de salvar | Sim† |
| 25 | Abrir ajuda e configurações | `?` para ajuda; `Tab` até o botão ☰; `Enter`, `Space`, `ArrowDown` | `?` abre o diálogo de ajuda; o botão ☰ recebe foco, mas o menu de configurações não abre: `aria-expanded` permanece `"false"` e `.main-menu` não é renderizado | Não |
| 26 | Alterar tema | `Cmd+/`; digitar `dark`; `Enter` | A paleta de comandos abre, filtra "Dark mode" e o tema muda para escuro; `excalidraw-theme` registra `dark`. O atalho direto `Alt+Shift+D` não disparou na automação porque o evento chega com `event.code` vazio | Sim |
| 27 | Alterar idioma | `Cmd+/`; digitar `language` | A paleta responde "No matching commands..."; o controle de idioma é um `<select>` dentro do menu principal, que não abre por teclado | Não |
| 28 | Iniciar colaboração | `Tab` até o botão de compartilhar; `Enter`; `Tab` até "Start session"; `Enter` | O diálogo "Live collaboration" abre; a sessão inicia e a URL passa a conter `#room=f8fe04793a2d5ef98bc9,zTgSz85mrNBkF_vVyrH95A`; `collaborators.size = 1`; a sessão foi encerrada com confirmação nativa | Sim |

**†** Ativação e execução pelo teclado confirmadas; a conclusão depende de clipboard ou de diálogo nativo do sistema operacional, que a automação não conseguiu observar por completo (ver seção 5).

## 4. Contagens e valores brutos

| Medida | Valor observado |
| --- | --- |
| Elementos na cena de apoio | 4 (`apoio-ret-1/2/3`, `apoio-txt-1`) |
| Duplicar (`Cmd+D`) | 4 → 8 elementos |
| Excluir (`Delete`) | 8 → 4 elementos |
| Copiar (evento sintético) | JSON com 8 elementos |
| Colar (evento sintético) | 8 → 16 elementos |
| Selecionar tudo (`Cmd+A`) | 4 elementos (8 no estado com 8) |
| Zoom | 100% → 110% |
| Tema | claro → escuro; `excalidraw-theme = "dark"` |
| Colaboração | `#room=...`; `collaborators.size = 1` |
| Menu principal | `aria-expanded = "false"` após `Enter`, `Space` e `ArrowDown` |
| Resultado | 18 Sim de 28 testadas = 64,3% |

## 5. Limitações da automação

- **Clipboard.** O navegador embutido usado na automação não gera eventos nativos de clipboard. Copiar e colar foram verificados com `ClipboardEvent` sintético no mesmo handler acionado por `Cmd+C`/`Cmd+V`; o conteúdo foi confirmado, mas o round-trip pelo clipboard do sistema não foi observado. Em um navegador comum, o caminho de teclado é o mesmo.
- **Diálogos nativos.** Abrir arquivo e exportar imagem dependem de diálogos do sistema operacional, fora do DOM. O lado da aplicação abriu e foi navegável por teclado; a seleção do arquivo e o salvamento não foram concluídos na automação.
- **`event.code`.** O atalho de tema `Alt+Shift+D` usa `event.code`; a automação envia eventos com `code` vazio. Por isso, o tema foi alterado pela paleta de comandos. Isso é uma limitação do instrumento, não necessariamente do produto.
- **Menu principal.** O teste foi repetido com foco programático no botão real e eventos de teclado reais; `Enter`, `Space` e `ArrowDown` não abriram o menu. O comportamento é consistente com o código: o `DropdownMenu` é controlado por `open` sem `onOpenChange`, e o trigger tem apenas `onClick`. Recomenda-se uma reconfirmação manual em navegador comum.
- **Ambiente.** O teste foi feito no navegador embutido do OpenCode (Chromium/Electron) em macOS, diferente do ambiente Windows/Helium registrado em `ambiente-local.md`. O comportamento de foco e de atalhos pode variar em outros navegadores.
- **Versão.** `e7b5346` não pôde ser confirmada por hash no diretório `aplicacao/`; ver seção 1.

## 6. Conclusão do registro

As funções de edição por atalho (mover, propriedades, duplicar, excluir, agrupar, desfazer/refazer, copiar/colar, selecionar tudo, zoom), arquivo/exportação e colaboração funcionam pelo teclado, com as ressalvas acima. As funções centrais de seleção e criação no canvas, o redimensionamento, o menu principal e o idioma não são operáveis sem mouse. Total: **18 ÷ 28 = 64,3% → pontuação 1**.
