# CI-M22 · Violações da WCAG 2.2 (A e AA)

**Nota 0**: o axe-core e o Lighthouse acharam 6 violações distintas de nível A
ou AA na tela principal, iguais nos modos claro e escuro: zoom bloqueado pelo
`<meta name="viewport">`, botão do menu principal sem nome, ARIA inválido no
seletor de fonte e no menu, e dois controles (zoom "100%" e link "Discord
chat") cujo nome acessível não contém o texto visível.

| Critério WCAG | Nível | Violações |
| --- | :-: | :-: |
| 1.4.4 Redimensionar texto | AA | 1 |
| 4.1.2 Nome, função, valor | A | 2 |
| 1.3.1 Informações e relações | A | 1 |
| 2.5.3 Rótulo no nome | A | 2 |

!!! note "Contagem"
    Cada violação é uma regra reprovada num elemento. Contando por regra, e
    não por elemento, seriam 5 (nota 1). Quatro itens do menu que o axe também
    reprovou foram conferidos e ficaram fora: são falsos positivos da regra
    experimental `label-content-name-mismatch`. O canvas não é lido pelas
    ferramentas.

## Contexto da consolidação

| Item | Registro |
| --- | --- |
| Objetivo e questão GQM | O6 · CI-Q9 ([roteiro](../../analise/roteiro.md)) |
| Valor medido | 6 violações distintas |
| Pontuação | **0/2** |
| Origem | [PR #101](https://github.com/FCTE-Qualidade-de-Software-1/2026-2_T02_ADA_LOVELACE/pull/101), aprovado por outro integrante e integrado na main |

**Procedimento resumido:** axe-core e Lighthouse em três estados da tela principal, modos claro/escuro, com deduplicação e conferência dos elementos.

**Resultado e justificativa:** Foram registradas seis violações distintas por regra e elemento, após excluir quatro falsos positivos. Seis ou mais recebe 0.

**Limitações:** Por regra distinta seriam cinco, nota 1; a unidade adotada é regra por elemento. Ferramentas não cobrem canvas nem todos os diálogos.

**Evidência original:** [CI-M22_violacoes-wcag.md](https://github.com/FCTE-Qualidade-de-Software-1/2026-2_T02_ADA_LOVELACE/blob/c9ac9610b92474af82cc9ad3e67dc53bfa3490d4/evidencias/capacidade-interacao/CI-M22_violacoes-wcag.md), com dados, procedimento completo e arquivos de apoio. Esta página consolida a coleta existente, sem nova medição.

Registro completo:
[`CI-M22_violacoes-wcag.md`](https://github.com/FCTE-Qualidade-de-Software-1/2026-2_T02_ADA_LOVELACE/blob/main/evidencias/capacidade-interacao/CI-M22_violacoes-wcag.md).
Saída do script e relatórios do Lighthouse:
[`CI-M22-M25`](https://github.com/FCTE-Qualidade-de-Software-1/2026-2_T02_ADA_LOVELACE/tree/main/evidencias/capacidade-interacao/CI-M22-M25).
