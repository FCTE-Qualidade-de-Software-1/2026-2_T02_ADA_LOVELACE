# S-M7 · Completude da trilha de auditoria

**Nota 0**: nenhuma das 7 ações feitas por Alice e Bob numa sala local ficou
associada ao autor (0%). As ações foram criar, mudar a cor, mover, excluir,
desfazer/refazer e exportar. Todas chegaram ao outro participante, mas nos metadados visíveis das
mensagens do Socket.IO e no arquivo exportado coletado não foi encontrada
autoria verificável. Os payloads cifrados não foram decifrados.

| Ação | Participante | Autor associado? |
| --- | --- | :---: |
| Criar retângulo | Alice | Não |
| Criar seta | Bob | Não |
| Alterar a cor | Alice | Não |
| Mover objeto | Bob | Não |
| Excluir objeto | Alice | Não |
| Desfazer/refazer | Bob | Não |
| Exportar a cena | Alice | Não |

!!! note "Limites da coleta"
    As capturas mostram uma seleção de frames, não um HAR completo. Como as
    mensagens são cifradas, só dá para afirmar que não há autoria verificável
    no que foi coletado.

## Contexto da consolidação

| Item | Registro |
| --- | --- |
| Objetivo e questão GQM | O2 · S-Q4 ([roteiro](../../analise/roteiro.md)) |
| Valor medido | 0 de 7 ações com autoria verificável (0%) |
| Pontuação | **0/2** |
| Origem | [PR #94](https://github.com/FCTE-Qualidade-de-Software-1/2026-2_T02_ADA_LOVELACE/pull/94), aprovado por outro integrante e integrado na main |

**Procedimento resumido:** Sete ações colaborativas controladas, inspeção da interface, frames visíveis e buscas no código.

**Resultado e justificativa:** Nenhuma das sete ações apresentou associação verificável a um autor. Abaixo de 50% corresponde a 0.

**Limitações:** Frames selecionados, sem HAR completo nem decifragem dos payloads. Ausência de autoria visível não demonstra ausência de campos internos cifrados.

**Evidência original:** [S-M7_trilha-auditoria_2026-11-12.md](https://github.com/FCTE-Qualidade-de-Software-1/2026-2_T02_ADA_LOVELACE/blob/c9ac9610b92474af82cc9ad3e67dc53bfa3490d4/evidencias/seguranca/S-M7/S-M7_trilha-auditoria_2026-11-12.md), com dados, procedimento completo e arquivos de apoio. Esta página consolida a coleta existente, sem nova medição.

Registro completo:
[`evidencias/seguranca/S-M7`](https://github.com/FCTE-Qualidade-de-Software-1/2026-2_T02_ADA_LOVELACE/tree/main/evidencias/seguranca/S-M7).
