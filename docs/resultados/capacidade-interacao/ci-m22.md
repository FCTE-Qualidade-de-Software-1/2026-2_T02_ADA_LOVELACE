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

Registro completo:
[`CI-M22_violacoes-wcag.md`](https://github.com/FCTE-Qualidade-de-Software-1/2026-2_T02_ADA_LOVELACE/blob/main/evidencias/capacidade-interacao/CI-M22_violacoes-wcag.md).
Saída do script e relatórios do Lighthouse:
[`CI-M22-M25`](https://github.com/FCTE-Qualidade-de-Software-1/2026-2_T02_ADA_LOVELACE/tree/main/evidencias/capacidade-interacao/CI-M22-M25).
