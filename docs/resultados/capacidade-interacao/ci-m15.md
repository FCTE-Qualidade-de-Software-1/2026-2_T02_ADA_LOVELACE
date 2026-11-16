# CI-M15 · Ações destrutivas sem confirmação

**Nota 1**: de 4 tipos de ação destrutiva testados, 1 foi concluído sem
confirmação: abrir um arquivo substituiu a cena existente sem perguntar.
Limpar o canvas, remover um item da biblioteca e limpar a biblioteca inteira
mostram um diálogo com Cancelar e Confirmar.

| Ação | Pede confirmação? |
| --- | :-: |
| Limpar canvas | Sim |
| Abrir arquivo sobre a cena atual | **Não** |
| Remover item da biblioteca | Sim |
| Limpar biblioteca | Sim |

!!! note "Limitações"
    Os quatro tipos são um recorte, não um inventário de todas as ações
    destrutivas. A abertura de arquivo foi testada pelo seletor HTML do
    próprio aplicativo; o seletor nativo do sistema e o arrastar e soltar não
    foram avaliados. A validação manual e a revisão por outro integrante estão
    pendentes.

Registro completo:
[`CI-M15_acoes-destrutivas.md`](https://github.com/FCTE-Qualidade-de-Software-1/2026-2_T02_ADA_LOVELACE/tree/main/evidencias/capacidade-interacao/CI-M15).
Dados e capturas da coleta:
[`CI-M15-M16`](https://github.com/FCTE-Qualidade-de-Software-1/2026-2_T02_ADA_LOVELACE/tree/main/evidencias/capacidade-interacao/CI-M15-M16).
