# CI-M13 · Ações com feedback visual imediato

**Nota 2**: as 13 ações testadas deram o retorno visual esperado (100%):
alças de seleção, mudança de posição, tamanho, cor ou texto, moldura de grupo,
tema e escala.

```mermaid
flowchart LR
    A["13 ações"] --> F["13 com feedback<br/>visual (100%)"]
```

| Ações testadas | Feedback |
| --- | :---: |
| Criar retângulo, selecionar, mover, redimensionar, alterar cor | Sim |
| Criar texto, editar texto, duplicar, excluir | Sim |
| Agrupar, desagrupar, trocar tema, zoom | Sim |

!!! note "Imediato"
    A coleta confirmou a mudança visual em cada ação, mas não mediu a latência.
    A evidência registra a nota 2 como provisória quanto ao requisito de o
    feedback ser imediato.

## Evidências

=== "Antes"

    Retângulo selecionado, com contorno preto.

    ![Retângulo antes de mudar a cor](../../assets/resultados/capacidade-interacao/CI-M13_cor-antes_2026-11-12.png)

=== "Depois"

    Logo depois de escolher a cor, o contorno e o seletor mostram o vermelho.

    ![Retângulo depois de mudar a cor](../../assets/resultados/capacidade-interacao/CI-M13_cor-depois_2026-11-12.png)

Registro completo:
[`CI-M13_feedback-visual.md`](https://github.com/FCTE-Qualidade-de-Software-1/2026-2_T02_ADA_LOVELACE/blob/main/evidencias/capacidade-interacao/CI-M13/CI-M13_feedback-visual.md).
