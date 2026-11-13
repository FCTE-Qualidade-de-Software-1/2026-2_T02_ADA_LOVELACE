# F-M5 · teste online · 2026-11-12
URL: http://localhost:5000/
Navegador: Chrome 157.0.8103.50 (headless), linux
Precache do service worker: 16 arquivos

| ID | Função | Depende de servidor | Funcionou | Detalhe | Pedidos que falharam |
| --- | --- | :-: | :-: | --- | --- |
| F01 | Reabrir o app (recarregar a página) | não | Sim | canvas e barra de ferramentas carregados; página servida pelo service worker: sim | net::ERR_ABORTED https://queue.simpleanalyticscdn.com/append |
| F02 | Desenhar formas (retângulo, losango, elipse) | não | Sim | elementos na cena: rectangle, diamond, ellipse | — |
| F03 | Seta ligada a duas formas | não | Sim | seta criada; ligada no início: true, no fim: true | — |
| F04 | Texto dentro de uma forma | não | Sim | texto "Login", dentro de forma: true | — |
| F05 | Desenho livre | não | Sim | traço com 22 pontos | — |
| F06 | Mudar cor do traço e do fundo | não | Sim | traço #e03131, fundo #ffc9c9 | — |
| F07 | Desfazer e refazer | não | Sim | elementos: 7 → desfazer 6 → refazer 7 | — |
| F08 | Agrupar e duplicar | não | Sim | agrupados: true; elementos 6 → 12 após duplicar (desfeito depois) | — |
| F09 | Cena preservada ao recarregar | não | Sim | 6 elementos antes, 6 depois de recarregar | net::ERR_ABORTED https://queue.simpleanalyticscdn.com/append |
| F10 | Salvar em arquivo .excalidraw | não | Sim | arquivo Untitled-2026-11-12-1037.excalidraw com 6 elementos | — |
| F11 | Abrir arquivo .excalidraw | não | Sim | cena limpa (0); depois de abrir: 6 elementos | — |
| F12 | Exportar imagem PNG | não | Sim | Untitled-2026-11-12-1037.png, 33137 bytes | — |
| F13 | Exportar imagem SVG | não | Sim | Untitled-2026-11-12-1037.svg, 9417 bytes; fontes no SVG: 1 embutida(s), 0 só como link externo | — |
| F14 | Inserir imagem do computador | não | Sim | imagem inserida (status saved) | — |
| F15 | Adicionar à biblioteca e reutilizar | não | Sim | item salvo na biblioteca; elementos 6 → 8 ao reutilizar | — |
| F16 | Alternar modo escuro | não | Sim | tema escuro aplicado: true | — |
| F17 | Trocar o idioma para português | não | Sim | lang=pt-BR; título do botão de retângulo: "Retângulo — R ou 2" | — |
| F18 | Converter Mermaid em diagrama | não | Sim | elementos 6 → 27 ao inserir | — |
| F19 | Trocar a fonte do texto | não | Sim | fontFamily do texto: 6; fonte Nunito no navegador: loaded | — |
| F20 | Colaboração ao vivo | sim | não testado | não testado com rede (usaria o servidor oficial) | — |
| F21 | Exportar link compartilhável | sim | não testado | não testado com rede (usaria o servidor oficial) | — |
| F22 | Texto para diagrama (IA) | sim | Sim | elementos 7 → 18 ao inserir o diagrama gerado | — |
| F23 | Navegar bibliotecas públicas | sim | Sim | site de bibliotecas: título "Excalidraw Libraries" | — |

Funcionaram: 21 de 21 (100.0%)
