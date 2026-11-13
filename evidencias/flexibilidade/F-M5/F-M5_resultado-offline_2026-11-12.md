# F-M5 · teste offline · 2026-11-12
URL: http://localhost:5000/
Navegador: Chrome 157.0.8103.50 (headless), linux
Precache do service worker: 16 arquivos

| ID | Função | Depende de servidor | Funcionou | Detalhe | Pedidos que falharam |
| --- | --- | :-: | :-: | --- | --- |
| F01 | Reabrir o app (recarregar a página) | não | Sim | canvas e barra de ferramentas carregados; página servida pelo service worker: sim | net::ERR_ABORTED https://queue.simpleanalyticscdn.com/append<br>net::ERR_INTERNET_DISCONNECTED https://queue.simpleanalyticscdn.com/simple.gif?… |
| F02 | Desenhar formas (retângulo, losango, elipse) | não | Sim | elementos na cena: rectangle, diamond, ellipse | — |
| F03 | Seta ligada a duas formas | não | Sim | seta criada; ligada no início: true, no fim: true | — |
| F04 | Texto dentro de uma forma | não | Sim | texto "Login", dentro de forma: true | — |
| F05 | Desenho livre | não | Sim | traço com 22 pontos | — |
| F06 | Mudar cor do traço e do fundo | não | Sim | traço #e03131, fundo #ffc9c9 | — |
| F07 | Desfazer e refazer | não | Sim | elementos: 7 → desfazer 6 → refazer 7 | — |
| F08 | Agrupar e duplicar | não | Sim | agrupados: true; elementos 6 → 12 após duplicar (desfeito depois) | — |
| F09 | Cena preservada ao recarregar | não | Sim | 6 elementos antes, 6 depois de recarregar | net::ERR_ABORTED https://queue.simpleanalyticscdn.com/append<br>net::ERR_INTERNET_DISCONNECTED https://queue.simpleanalyticscdn.com/simple.gif?… |
| F10 | Salvar em arquivo .excalidraw | não | Sim | arquivo Untitled-2026-11-12-1035.excalidraw com 6 elementos | — |
| F11 | Abrir arquivo .excalidraw | não | Sim | cena limpa (0); depois de abrir: 6 elementos | — |
| F12 | Exportar imagem PNG | não | Sim | Untitled-2026-11-12-1035.png, 33372 bytes | — |
| F13 | Exportar imagem SVG | não | Não | Untitled-2026-11-12-1035.svg, 7818 bytes; fontes no SVG: 0 embutida(s), 1 só como link externo | net::ERR_FAILED /assets/subset-shared.chunk-D3ioWSie.js<br>net::ERR_FAILED /fonts/Excalifont/Excalifont-Regular-a88b72a24fb54c9f94e3b5fdaa7481c9.woff2<br>net::ERR_FAILED https://esm.sh/@excalidraw/excalidraw/dist/prod/fonts/Excalifont/Excalifont-Regular-a88b72a24fb54c9f94e3b5fdaa7481c9.woff2 |
| F14 | Inserir imagem do computador | não | Sim | imagem inserida (status saved) | — |
| F15 | Adicionar à biblioteca e reutilizar | não | Sim | item salvo na biblioteca; elementos 6 → 8 ao reutilizar | — |
| F16 | Alternar modo escuro | não | Sim | tema escuro aplicado: true | — |
| F17 | Trocar o idioma para português | não | Não | lang=pt-BR; título do botão de retângulo: "Rectangle — R or 2" | net::ERR_FAILED /assets/locales/pt-BR.json-COimuEej.js |
| F18 | Converter Mermaid em diagrama | não | Não | erro no diálogo: Couldn't load Mermaid. Check your internet connection and try again. Retry | net::ERR_FAILED https://excalidraw.nyc3.cdn.digitaloceanspaces.com/oss/fonts/CascadiaCode/CascadiaCode-Regular.woff2<br>net::ERR_FAILED /fonts/CascadiaCode/CascadiaCode-Regular.woff2<br>net::ERR_FAILED https://esm.sh/@excalidraw/excalidraw/dist/prod/fonts/CascadiaCode/CascadiaCode-Regular.woff2<br>net::ERR_FAILED /assets/CodeMirrorEditor-C99jmTJQ.js<br>net::ERR_FAILED /assets/codemirror.chunk-CLhMQAUm.js |
| F19 | Trocar a fonte do texto | não | Sim | fontFamily do texto: 6; fonte Nunito no navegador: loaded | net::ERR_FAILED https://excalidraw.nyc3.cdn.digitaloceanspaces.com/oss/fonts/Lilita/Lilita-Regular-i7dPIFZ9Zz-WBtRtedDbYEF8RXi4EwQ.woff2<br>net::ERR_FAILED /fonts/Lilita/Lilita-Regular-i7dPIFZ9Zz-WBtRtedDbYEF8RXi4EwQ.woff2<br>net::ERR_FAILED https://esm.sh/@excalidraw/excalidraw/dist/prod/fonts/Lilita/Lilita-Regular-i7dPIFZ9Zz-WBtRtedDbYEF8RXi4EwQ.woff2 |
| F20 | Colaboração ao vivo | sim | Não | o botão de compartilhar não aparece sem rede (excalidraw-app/App.tsx:824-826) | — |
| F21 | Exportar link compartilhável | sim | Não | o botão de compartilhar, onde fica a opção, não aparece sem rede (excalidraw-app/App.tsx:824-826) | net::ERR_ABORTED https://queue.simpleanalyticscdn.com/append<br>net::ERR_INTERNET_DISCONNECTED https://queue.simpleanalyticscdn.com/simple.gif?… |
| F22 | Texto para diagrama (IA) | sim | Não | erro: Couldn't load Mermaid. Check your internet connection and try again. Retry | net::ERR_FAILED https://excalidraw.nyc3.cdn.digitaloceanspaces.com/oss/fonts/CascadiaCode/CascadiaCode-Regular.woff2<br>net::ERR_FAILED /fonts/CascadiaCode/CascadiaCode-Regular.woff2<br>net::ERR_FAILED https://esm.sh/@excalidraw/excalidraw/dist/prod/fonts/CascadiaCode/CascadiaCode-Regular.woff2<br>net::ERR_FAILED /assets/index-CA0yydio.js<br>net::ERR_INTERNET_DISCONNECTED http://localhost:3016/v1/ai/text-to-diagram/chat-streaming |
| F23 | Navegar bibliotecas públicas | sim | Não | site de bibliotecas: título "libraries.excalidraw.com" | — |

Funcionaram: 16 de 23 (69.6%)
