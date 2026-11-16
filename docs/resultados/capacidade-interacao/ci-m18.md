# CI-M18 · Mensagens de erro compreensíveis

**Nota 0**: só 8 das 18 mensagens do grupo `errors.*` (44%) dizem o que
aconteceu e o que o usuário pode fazer. A maioria só informa que a operação
falhou.

!!! warning "Rascunho provisório"
    A classificação é um julgamento feito por uma pessoa e ainda não foi revisada
    por outro integrante. Mudando a classe de poucas mensagens, o valor varia entre
    39% e 61%.

```mermaid
flowchart LR
    M["18 mensagens<br/>errors.*"] --> S["8 orientam<br/>(problema + ação)"]
    M --> N["10 só informam<br/>a falha"]
```

## Evidências

Exemplos do bloco `errors` de `locales/en.json`:

=== "Só informam (N)"

    ```json
    "unsupportedFileType": "Unsupported file type.",
    "imageToolNotSupported": "Images are disabled.",
    "asyncPasteFailedOnParse": "Couldn't paste.",
    "copyToSystemClipboardFailed": "Couldn't copy to clipboard."
    ```

=== "Orientam (S)"

    ```json
    "fileTooBig": "File is too big. Maximum allowed size is {{maxSize}}.",
    "collabSaveFailed": "Couldn't save to the backend database. If problems persist, you should save your file locally to ensure you don't lose your work."
    ```

=== "Na tela"

    Erro ao abrir um arquivo inválido. Essa mensagem (`alerts.couldNotLoadInvalidFile`)
    fica fora do grupo `errors.*` e não entra na contagem.

    ![Erro Couldn't load invalid file](../../assets/resultados/capacidade-interacao/CI-M18_erro-arquivo-invalido_2026-11-09.png)

Classificação das 18 mensagens:
[`CI-M18_mensagens-de-erro.md`](https://github.com/FCTE-Qualidade-de-Software-1/2026-2_T02_ADA_LOVELACE/blob/main/evidencias/capacidade-interacao/CI-M18_mensagens-de-erro.md).

## Contexto da consolidação

| Item | Registro |
| --- | --- |
| Objetivo e questão GQM | O5 · CI-Q7 ([roteiro](../../analise/roteiro.md)) |
| Versão de referência | Excalidraw [`e7b534668a60add7f725531f3c9abf32508c7b4e`](https://github.com/excalidraw/excalidraw/commit/e7b534668a60add7f725531f3c9abf32508c7b4e); ressalvas de correspondência abaixo |
| Valor medido | 8 de 18 mensagens (44%) — provisório |
| Pontuação | **0/2 (provisória)** |
| Origem | [PR #50](https://github.com/FCTE-Qualidade-de-Software-1/2026-2_T02_ADA_LOVELACE/pull/50), integrado na main |

**Procedimento resumido:** Classificação documental das mensagens errors.* em inglês: explicar o problema e indicar uma ação.

**Resultado e justificativa:** O registro classifica oito de dezoito como compreensíveis e acionáveis. Abaixo de 50% recebe 0.

**Limitações:** Rascunho de uma avaliadora, sem validação de compreensão com participantes; revisão pendente e sensibilidade de 39% a 61%. Não incorpora entrevistas nem cobre toasts, pt-BR ou todas as mensagens exibidas. SHA do snapshot não confirmado na evidência.

**Evidência original:** [CI-M18_mensagens-de-erro.md](https://github.com/FCTE-Qualidade-de-Software-1/2026-2_T02_ADA_LOVELACE/blob/c9ac9610b92474af82cc9ad3e67dc53bfa3490d4/evidencias/capacidade-interacao/CI-M18_mensagens-de-erro.md), com dados, procedimento completo e arquivos de apoio. Esta página consolida a coleta existente; não registra nova medição ou aprovação humana.
