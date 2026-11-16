# F-M5 · Cobertura funcional offline

**Nota 1**: com o modo offline do Chrome, depois de abrir o app uma vez com
rede, 16 das 23 funções testadas funcionaram (69,6%). Todas as funções de
desenho, edição e arquivo funcionaram sem rede. Falharam as 4 que dependem de
servidor e 3 locais que dependem de arquivos não guardados no primeiro acesso.

| Grupo | Sem rede |
| --- | :-: |
| Desenho, edição, salvar, abrir, exportar PNG, biblioteca, tema, fonte (16) | Sim |
| Exportar SVG (a fonte fica só como link, não embutida) | **Não** |
| Trocar o idioma (a interface continua em inglês, sem aviso) | **Não** |
| Converter Mermaid ("Couldn't load Mermaid") | **Não** |
| Colaboração, link compartilhável, IA e bibliotecas públicas | **Não** |

!!! note "Sensibilidade"
    Só com as 19 funções que não dependem de servidor, seriam 16 de 19 (84,2%,
    nota 2). Contando o SVG como Sim, seriam 17 de 23 (73,9%, ainda nota 1).
    Quem já usou idioma, Mermaid e SVG com rede teria resultado melhor nesses
    itens, porque o service worker só guarda esses arquivos depois do primeiro
    uso.

Registro completo:
[`F-M5_cobertura-offline.md`](https://github.com/FCTE-Qualidade-de-Software-1/2026-2_T02_ADA_LOVELACE/blob/main/evidencias/flexibilidade/F-M5_cobertura-offline.md)
e [arquivos de apoio](https://github.com/FCTE-Qualidade-de-Software-1/2026-2_T02_ADA_LOVELACE/tree/main/evidencias/flexibilidade/F-M5).
