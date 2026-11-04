# Evidência CI-M18 : Mensagens de erro compreensíveis

> Status: **rascunho provisório**. A classificação "entende e sabe como agir" é um julgamento; precisa ser revisada por outro integrante (ideal: dois avaliadores e comparar).

## 1. Identificação

| Campo | Valor |
| --- | --- |
| Métrica | CI-M18 : Mensagens de erro compreensíveis |
| Questão | CI-Q7 : Proteção contra erros do usuário (erros fáceis de entender?) |
| Responsável | Zayra Moraes |
| Data da coleta | 2026-11-04 |
| Revisado por | _pendente_ |

## 2. O que foi medido

Entre as mensagens de erro do grupo `errors.*` de `en.json`, quantas dizem o que aconteceu **e** o que o usuário pode fazer. Recorte: só o grupo `errors.*` (18 mensagens, tratando as 4 linhas de `brave_measure_text_error` como uma só). Mensagens exibidas em outros pontos do código (toasts, diálogos) ficam fora deste rascunho.

## 3. Procedimento

1. Listar as chaves `errors.*` em `aplicacao/packages/excalidraw/locales/en.json`.
2. Classificar cada mensagem: S = diz o problema e indica o que fazer; N = só informa a falha, ou é vaga.
3. Calcular S ÷ total.

## 4. Evidências

Arquivo: `aplicacao/packages/excalidraw/locales/en.json`, bloco `errors` (listagem feita por script que achata o JSON).

### 5.1 Dados brutos

| # | Chave | Mensagem (resumo) | Entende e sabe agir? |
| --- | --- | --- | :-: |
| 1 | unsupportedFileType | "Unsupported file type." | N |
| 2 | imageInsertError | "Couldn't insert image. Try again later..." | S |
| 3 | fileTooBig | "File is too big. Maximum allowed size is {{maxSize}}." | S |
| 4 | svgImageInsertError | "...The SVG markup looks invalid." | S |
| 5 | failedToFetchImage | "Failed to fetch image." | N |
| 6 | cannotResolveCollabServer | "...Please reload the page and try again." | S |
| 7 | importLibraryError | "Couldn't load library" | N |
| 8 | saveLibraryError | "...Please save your library to a file locally..." | S |
| 9 | collabSaveFailed | "...you should save your file locally..." | S |
| 10 | collabSaveFailed_sizeExceeded | "...canvas seems too big. Save the file locally..." | S |
| 11 | imageToolNotSupported | "Images are disabled." | N |
| 12 | brave_measure_text_error (4 linhas) | Explica a configuração do Brave e os passos para corrigir | S |
| 13 | libraryElementTypeError.embeddable | "Embeddable elements cannot be added to the library." | N |
| 14 | libraryElementTypeError.iframe | "IFrame elements cannot be added to the library." | N |
| 15 | libraryElementTypeError.image | "Support for adding images to the library coming soon!" | N |
| 16 | asyncPasteFailedOnRead | "Couldn't paste (couldn't read from system clipboard)." | N |
| 17 | asyncPasteFailedOnParse | "Couldn't paste." | N |
| 18 | copyToSystemClipboardFailed | "Couldn't copy to clipboard." | N |

### 5.2 Cálculo

S = 8 (itens 2, 3, 4, 6, 8, 9, 10, 12); total = 18. **8 ÷ 18 = 44%**.

### 5.3 Pontuação

| Valor medido | Regra da métrica | Pontuação |
| --- | --- | --- |
| 44% | 2 = ≥ 80%; 1 = 50% a 79%; 0 = < 50% | **0** |

**Justificativa:** menos da metade das mensagens orienta o usuário; a maioria só informa que a operação falhou.

## 6. Observações e limitações

- Classificação subjetiva e feita por uma pessoa. Se o item 4 e o item 13 a 15 mudarem de classe, o valor varia (entre 39% e 61%): a nota é sensível a essas decisões, então a revisão cruzada importa.
- Limitada ao grupo `errors.*`; recomenda-se completar com as mensagens de toast (`grep -rn "setToast\|toast" aplicacao/packages/excalidraw`).
- Mensagens em inglês (referência); o usuário brasileiro vê a versão em pt-BR.

## 7. Achado (pontuação 0)

| ID | Métrica | Evidência reproduzível | Pontuação | Impacto | Recomendação |
| --- | --- | --- | --- | --- | --- |
| A-__ | CI-M18 | Tabela 5.1: itens 1, 5, 7, 11, 13-18 sem orientação | 0 | Médio | Acrescentar o motivo provável e uma ação (por exemplo, "Use PNG, JPEG ou SVG" em vez de "Unsupported file type") |

## 8. Contribuição para a questão

| Questão | Esta métrica indica que a hipótese foi | Por quê |
| --- | --- | --- |
| CI-Q7 | parcial | Hipótese era "erros fáceis de entender" parcialmente; só 44% das mensagens orientam o usuário |
