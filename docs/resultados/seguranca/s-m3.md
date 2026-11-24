# S-M3 · Mecanismos de controle de acesso

**Nota 0**: o cliente gratuito não oferece nenhum dos três mecanismos (0 de 3).
Nem a sala de colaboração (`#room`) nem o link de cena exportada (`#json`)
têm senha, prazo de expiração ou opção de revogar o link. Depois que o criador
clicou em **Parar sessão**, uma nova aba abriu o mesmo link e entrou na sala,
porque outro participante continuava conectado.

| Mecanismo | `#room` | `#json` |
| --- | :---: | :---: |
| Senha | Não | Não |
| Expiração do link | Não | Não |
| Revogação do link | Não | Não |

A chave aleatória no link não conta como senha: o usuário não a escolhe, e
quem tem o link consegue decifrar a cena. Parar a sessão só desconecta o
próprio cliente (`Collab.tsx:376-440`, `Portal.tsx:37-76`).

!!! note "Limites da coleta"
    Sem Firebase e sem backend de cenas configurados, não foi possível gerar e
    reabrir um link `#json` nem testar o acesso depois que todos saem da sala.
    A retenção e a expiração nos servidores externos ficaram sem conclusão. A
    contagem considera o que a interface e o código do cliente oferecem.

## Contexto da consolidação

| Item | Registro |
| --- | --- |
| Objetivo e questão GQM | O1 · S-Q2 ([roteiro](../../analise/roteiro.md)) |
| Valor medido | 0 mecanismos |
| Pontuação | **0/2** |
| Origem | [PR #91](https://github.com/FCTE-Qualidade-de-Software-1/2026-2_T02_ADA_LOVELACE/pull/91), aprovado por outro integrante e integrado na main |

**Procedimento resumido:** Inspeção da interface e dos fluxos de colaboração e exportação; teste local com clientes A/B/C e leitura dos callbacks.

**Resultado e justificativa:** Não foram oferecidos senha, expiração ou revogação ao usuário. Nenhum dos três mecanismos corresponde a 0.

**Limitações:** Firebase indisponível e exportação #json não concluída; não comprova controles ou retenção de servidores externos. O registro visual da reentrada de C é limitado.

**Evidência original:** [S-M3_mecanismos-controle-acesso.md](https://github.com/FCTE-Qualidade-de-Software-1/2026-2_T02_ADA_LOVELACE/blob/c9ac9610b92474af82cc9ad3e67dc53bfa3490d4/evidencias/seguranca/S-M3/S-M3_mecanismos-controle-acesso.md), com dados, procedimento completo e arquivos de apoio. Esta página consolida a coleta existente, sem nova medição.

Registro completo:
[`evidencias/seguranca/S-M3`](https://github.com/FCTE-Qualidade-de-Software-1/2026-2_T02_ADA_LOVELACE/tree/main/evidencias/seguranca/S-M3).
