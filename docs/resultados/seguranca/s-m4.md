# S-M4 · Dados persistidos localmente sem criptografia

**Nota 0**: sim, há dados do desenho salvos sem criptografia no navegador. O
texto e as propriedades da cena ficam em JSON no `localStorage` e continuam
lá depois de recarregar e de reabrir a aba. A biblioteca, a imagem e o
histórico do Texto para diagrama ficam no IndexedDB como objetos legíveis.

| Onde | O que fica salvo | Legível sem chave? |
| --- | --- | :---: |
| `localStorage` `excalidraw` | Elementos da cena (texto, IDs, coordenadas) | Sim |
| IndexedDB `excalidraw-library-db` | Itens da biblioteca | Sim |
| IndexedDB `files-db` | Imagem em `dataURL` base64 | Sim (só decodificar) |
| IndexedDB `excalidraw-ttd-chats-db` | Prompt e resposta do Texto para diagrama | Sim |

!!! note "Limites da coleta"
    A IA usada foi o servidor falso do grupo. Não foram testados o reinício
    completo do navegador, a leitura dos arquivos no disco nem a criptografia
    do sistema operacional.

## Contexto da consolidação

| Item | Registro |
| --- | --- |
| Objetivo e questão GQM | O1 · S-Q2 ([roteiro](../../analise/roteiro.md)) |
| Versão de referência | Excalidraw [`e7b534668a60add7f725531f3c9abf32508c7b4e`](https://github.com/excalidraw/excalidraw/commit/e7b534668a60add7f725531f3c9abf32508c7b4e); ressalvas de correspondência abaixo |
| Valor medido | Sim: cena e dados associados legíveis |
| Pontuação | **0/2** |
| Origem | [PR #92](https://github.com/FCTE-Qualidade-de-Software-1/2026-2_T02_ADA_LOVELACE/pull/92), integrado na main |

**Procedimento resumido:** Criação de dados fictícios pela interface e leitura de localStorage/IndexedDB antes e após reload; conferência do código de persistência.

**Resultado e justificativa:** Cena, biblioteca e histórico foram recuperados sem decifragem da aplicação; a imagem foi decodificada de base64 sem chave. Sim corresponde a 0.

**Limitações:** Não mede cifra física do disco, acesso remoto ou serviço real de IA. A auditoria confirmou dados e checkout, mas não a associação do processo Vite ao checkout. Scripts reforçados posteriormente não foram usados retroativamente. Revisão cruzada pendente.

**Evidência original:** [S-M4_dados-locais-sem-criptografia.md](https://github.com/FCTE-Qualidade-de-Software-1/2026-2_T02_ADA_LOVELACE/blob/c9ac9610b92474af82cc9ad3e67dc53bfa3490d4/evidencias/seguranca/S-M4/S-M4_dados-locais-sem-criptografia.md), com dados, procedimento completo e arquivos de apoio. Esta página consolida a coleta existente; não registra nova medição ou aprovação humana.

Registro completo:
[`evidencias/seguranca/S-M4`](https://github.com/FCTE-Qualidade-de-Software-1/2026-2_T02_ADA_LOVELACE/tree/main/evidencias/seguranca/S-M4).
