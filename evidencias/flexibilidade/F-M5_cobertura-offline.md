# Evidência F-M5 : Cobertura funcional offline

> Status: **coleta no navegador, automatizada com Playwright** (feito com apoio do Claude, ver `docs/uso-ia.md`).

## 1. Identificação

| Campo | Valor |
| --- | --- |
| Métrica | F-M5 : Cobertura funcional offline |
| Questão | F-Q2 : Adaptabilidade (a aplicação se adapta a dispositivos e condições de uso?) |
| Issue | #64 (parte da #18) |
| Responsável | André Henrique |
| Data da coleta | 2026-11-12 |
| Ambiente | Build de produção do Excalidraw, commit `e7b5346`, servido em `http://localhost:5000`; Google Chrome 157.0.8103.50 (headless, via Playwright 1.58.2); Linux 7.0 |

## 2. O que foi medido

Funções que funcionam sem conexão ÷ funções testadas, com o modo offline do Chrome ([roteiro](../../docs/analise/roteiro.md), F-M5). Foram testadas 23 funções: 19 de edição e de arquivo e 4 que dependem de servidor por natureza (colaboração, link compartilhável, IA e bibliotecas públicas). As 4 entram na conta porque o roteiro mede "funções testadas" e a hipótese da F-Q2 trata justamente da dependência de conexão.

## 3. Procedimento

1. Gerar o build de produção, o único que tem service worker, e servi-lo localmente (comandos em 3.1).
2. Abrir o app **uma vez com rede**, como um visitante novo, e esperar o service worker assumir a página. Nenhuma função é usada antes de desligar a rede.
3. Ligar o modo offline do Chrome (`BrowserContext.setOffline`, a mesma emulação de rede do modo offline do DevTools).
4. Executar, em ordem, as 23 funções da tabela 5.1. Para cada uma, o script faz a ação pela interface (teclado, mouse, menus), confere o resultado na cena salva pelo Excalidraw (`localStorage`), no arquivo baixado ou na tela, tira um print e registra os pedidos de rede que falharam.
5. Repetir tudo **com rede**, como controle, para mostrar que as funções que falharam offline funcionam quando há conexão. Colaboração e link compartilhável não foram testados com rede, porque usariam os servidores oficiais do Excalidraw.

Critério: **Sim** quando a função produz o mesmo resultado que produz com rede; **Não** quando não fica disponível, mostra erro ou entrega um resultado diferente do obtido com rede (caso do SVG, item 13).

### 3.1 Comandos executados

```bash
# 2026-11-12 09:55, pasta aplicacao/
# a IA aponta para o servidor falso local (comentário da issue #64)
echo 'VITE_APP_AI_BACKEND=http://localhost:3016' > .env.production.local
(cd excalidraw-app && yarn build:app:docker)      # build de produção, Sentry desligado
(cd excalidraw-app && npx vite preview --port 5000 --strictPort --host localhost)
node ../evidencias/ambiente/servidor-ia-falso.mjs  # só faz diferença no controle com rede
```

```text
PWA v0.21.1
mode      generateSW
precache  16 entries (2207.84 KiB)
✓ built in 37.91s
```

```bash
# 2026-11-12 10:35, raiz do repositório
node scripts/fm5_teste_offline.cjs --modo offline --saida evidencias/flexibilidade/F-M5
node scripts/fm5_teste_offline.cjs --modo online  --saida evidencias/flexibilidade/F-M5
```

```text
Funcionaram: 16 de 23 (69.6%)     # sem rede
Funcionaram: 21 de 21 (100.0%)    # com rede (F20 e F21 não testados)
```

**Conferência manual:** no Chrome 157 do responsável, com o modo offline do DevTools (Network → Offline), o app recarregou normalmente (F01), a troca de idioma para português deixou a interface em inglês (F17), e o botão de compartilhar sumiu (F20 e F21), como no script.

A saída completa, com o detalhe de cada função e os pedidos que falharam, está em `F-M5/F-M5_resultado-offline_2026-11-12.md` e `F-M5/F-M5_resultado-online_2026-11-12.md`. O script foi rodado duas vezes sem rede, com o mesmo resultado.

## 4. Evidências

### 4.1 Trechos de código

| # | Arquivo:linha | O que mostra |
| --- | --- | --- |
| C1 | `aplicacao/excalidraw-app/vite.config.mts:262-284` | Service worker (`VitePWA`); ficam **fora** do precache os idiomas (`**/locales/**`), os pedaços `*.chunk-*.js`, o editor de código e o SDK do Firebase |
| C2 | `aplicacao/excalidraw-app/vite.config.mts:285-294` | Os pedaços do Mermaid também são tirados do precache |
| C3 | `aplicacao/excalidraw-app/vite.config.mts:295-355` | Cache em tempo de execução para fontes, idiomas e pedaços de código: só guarda o que já foi baixado com rede |
| C4 | `aplicacao/excalidraw-app/vite.config.mts:216-223` | Cada idioma, menos o inglês, vira um arquivo separado (`locales/<idioma>`) |
| C5 | `aplicacao/excalidraw-app/App.tsx:824-826` | O botão de compartilhar só aparece se não estiver offline (`!isOffline \|\| isCollaborating`) |
| C6 | `aplicacao/packages/excalidraw/fonts/ExcalidrawFontFace.ts:58-88` | Ao exportar SVG, a fonte é baixada, recortada e embutida; se o download ou o recorte falha (sem rede, o código do recorte, `subset-shared.chunk`, não está no cache), fica só o link da última URL |

### 4.2 Arquivos de apoio

Todos em `evidencias/flexibilidade/F-M5/`.

| # | Arquivo | Tipo | O que mostra |
| --- | --- | --- | --- |
| E1 | `F-M5_resultado-offline_2026-11-12.md` | saída do script | Resultado de cada função sem rede, com os pedidos que falharam |
| E2 | `F-M5_resultado-online_2026-11-12.md` | saída do script | Controle com rede |
| E3 | `prints-offline/Fxx_offline_2026-11-12.png` | prints | Tela ao fim de cada função, sem rede (F23 tem também o print da aba aberta) |
| E4 | `prints-online/Fxx_online_2026-11-12.png` | prints | Os mesmos prints com rede |
| E5 | `F-M5_precache_2026-11-12.json` | lista | Os 16 arquivos guardados pelo service worker no primeiro acesso |
| E6 | `F-M5_cena-offline_2026-11-12.excalidraw` | cena | Arquivo salvo sem rede (F10) e reaberto em F11 |
| E7 | `F-M5_exportado-offline_2026-11-12.png` e `.svg` | imagens | PNG e SVG exportados sem rede (F12 e F13) |
| E8 | `F-M5_exportado-online_2026-11-12.svg` | imagem | SVG exportado com rede, com a fonte embutida, para comparar com E7 |
| E9 | `scripts/fm5_teste_offline.cjs` | script | Roteiro automatizado das 23 funções |

## 5. Resultado

### 5.1 Dados brutos

| # | Função | Depende de servidor | Sem rede | Com rede | Detalhe sem rede |
| --- | --- | :-: | :-: | :-: | --- |
| F01 | Reabrir o app (recarregar a página) | não | Sim | Sim | Página servida pelo service worker |
| F02 | Desenhar formas (retângulo, losango, elipse) | não | Sim | Sim | |
| F03 | Seta ligada a duas formas | não | Sim | Sim | Ligada nas duas pontas |
| F04 | Texto dentro de uma forma | não | Sim | Sim | |
| F05 | Desenho livre | não | Sim | Sim | |
| F06 | Mudar cor do traço e do fundo | não | Sim | Sim | |
| F07 | Desfazer e refazer | não | Sim | Sim | |
| F08 | Agrupar e duplicar | não | Sim | Sim | |
| F09 | Cena preservada ao recarregar | não | Sim | Sim | 6 elementos antes e depois |
| F10 | Salvar em arquivo `.excalidraw` | não | Sim | Sim | |
| F11 | Abrir arquivo `.excalidraw` | não | Sim | Sim | |
| F12 | Exportar imagem PNG | não | Sim | Sim | |
| F13 | Exportar imagem SVG | não | **Não** | Sim | O SVG é gerado, mas a fonte fica só como link para `esm.sh` em vez de embutida (C6); aberto sem internet, o texto perde a fonte |
| F14 | Inserir imagem do computador | não | Sim | Sim | |
| F15 | Adicionar à biblioteca e reutilizar | não | Sim | Sim | |
| F16 | Alternar modo escuro | não | Sim | Sim | |
| F17 | Trocar o idioma para português | não | **Não** | Sim | O arquivo `locales/pt-BR` não está no cache (C1, C4); a interface continua em inglês, sem aviso |
| F18 | Converter Mermaid em diagrama | não | **Não** | Sim | "Couldn't load Mermaid. Check your internet connection and try again." (C2) |
| F19 | Trocar a fonte do texto (Nunito) | não | Sim | Sim | Nunito é pré-carregada no primeiro acesso |
| F20 | Colaboração ao vivo | sim | **Não** | não testado | O botão de compartilhar some sem rede (C5) |
| F21 | Exportar link compartilhável | sim | **Não** | não testado | Fica no mesmo botão de compartilhar (C5) |
| F22 | Texto para diagrama (IA) | sim | **Não** | Sim | "Couldn't load Mermaid…"; o pedido à IA também falha |
| F23 | Navegar bibliotecas públicas | sim | **Não** | Sim | A aba de `libraries.excalidraw.com` abre com a página de erro do Chrome |

### 5.2 Cálculo

Funções que funcionaram sem rede ÷ funções testadas = 16 ÷ 23 = **69,6%**.

**Sensibilidade:**

- Só com as 19 funções que não dependem de servidor, o resultado seria 16 ÷ 19 = 84,2%, nota 2.
- Contando o SVG (F13) como Sim, já que o arquivo é gerado, seria 17 ÷ 23 = 73,9%, ainda nota 1.

### 5.3 Pontuação

| Valor medido | Regra da métrica | Pontuação |
| --- | --- | --- |
| 69,6% | 2 = ≥ 80%; 1 = 50% a 79%; 0 = < 50% | **1** |

**Justificativa:** todas as funções de desenho, edição e arquivo funcionam sem rede, mas falham as que dependem de servidor e três locais que dependem de arquivos não guardados no primeiro acesso (idioma, Mermaid e a fonte do SVG).

## 6. Observações e limitações

- **Primeiro acesso só abrindo o app.** O service worker guarda 16 arquivos no primeiro acesso (E5). Idiomas, Mermaid, editor de código, fontes extras e o código que embute fontes no SVG só ficam guardados se forem usados uma vez com rede (C3). Quem já usou essas funções com rede teria resultado melhor nos itens 13, 17 e 18.
- **Fontes.** Excalifont, Nunito, Comic Shanns e Assistant são pré-carregadas pelo `index.html` no primeiro acesso, por isso o PNG e a troca para Nunito funcionam. As fontes da lista estendida, como Lilita One, falham sem rede (pedidos registrados em E1, item F19).
- **Coleta automatizada.** O Playwright não controla os seletores nativos de arquivo, então o script remove `showSaveFilePicker` e `showOpenFilePicker` e o Excalidraw usa o caminho alternativo da biblioteca `browser-fs-access` (download e `<input type="file">`). O resto passa pela interface normal.
- **Chrome headless** em uma janela de 1366 × 768 px, com o navegador em inglês. Outros navegadores ficam com as F-M1 a F-M3.
- **IA** testada com o servidor falso (`evidencias/ambiente/servidor-ia-falso.mjs`) no controle com rede. Sem rede, o diálogo falha antes de chegar à IA, porque o Mermaid não carrega.
- **Fora da métrica:** mesmo no build sem rastreamento, a página chama o Simple Analytics (`queue.simpleanalyticscdn.com`); sem rede, esses pedidos aparecem como falhas em E1.

## 7. Achado (pontuação 1: não gera achado)

Não se aplica. Fica a oportunidade de guardar no primeiro acesso o idioma do navegador e o Mermaid, e de embutir no SVG a fonte já pré-carregada.

## 8. Contribuição para a questão

| Questão | Esta métrica indica que a hipótese foi | Por quê |
| --- | --- | --- |
| F-Q2 | confirmada | A hipótese previa uso offline como PWA, com colaboração e IA dependendo de conexão: o editor funciona sem rede e as funções de servidor falham, além de idioma, Mermaid e a fonte do SVG |
