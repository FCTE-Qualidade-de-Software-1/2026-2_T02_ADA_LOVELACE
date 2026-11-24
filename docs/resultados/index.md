# Resultados por métrica

Notas das métricas no commit
[`e7b5346`](https://github.com/excalidraw/excalidraw/commit/e7b534668a60add7f725531f3c9abf32508c7b4e)
do Excalidraw. A coluna **Faixa do roteiro** mostra o nível e o limite em que
o valor medido se encaixou, conforme as faixas de pontuação do
[roteiro da análise](../analise/roteiro.md#1-estrategia-gqm).

## Segurança

| Métrica | Valor medido | Faixa do roteiro | Nota (0–2) |
| --- | --- | --- | :---: |
| [S-M1 · Mensagens de colaboração cifradas](seguranca/s-m1.md) | 5 de 6 tipos de evento (83,3%) | Insatisfatório: < 90% | **0** |
| [S-M2 · Chave enviada ao servidor](seguranca/s-m2.md) | Não (0 ocorrências) | Satisfatório: não | **2** |
| [S-M3 · Mecanismos de controle de acesso](seguranca/s-m3.md) | 0 de 3 mecanismos | Insatisfatório: nenhum mecanismo | **0** |
| [S-M4 · Dados persistidos localmente sem criptografia](seguranca/s-m4.md) | Sim: cena e dados associados legíveis (localStorage e IndexedDB) | Insatisfatório: sim | **0** |
| [S-M5 · Taxa de detecção de adulteração](seguranca/s-m5.md) | 221 de 221 rejeitadas (100%) | Satisfatório: 100% | **2** |
| [S-M6 · Inconsistências após edições simultâneas](seguranca/s-m6.md) | 2 em 8 rodadas | Parcial: 1 a 2 | **1** |
| [S-M7 · Completude da trilha de auditoria](seguranca/s-m7.md) | 0 de 7 ações com autoria verificável (0%) | Insatisfatório: < 50% | **0** |
| [S-M8 · Histórico de versões com autoria](seguranca/s-m8.md) | Histórico persistente com autoria não encontrado | Insatisfatório: não existe | **0** |
| [S-M9 · Suficiência da autenticação](seguranca/s-m9.md) | Nome autodeclarado | Parcial: nome autodeclarado | **1** |
| [S-M10 · Passar-se por outro participante](seguranca/s-m10.md) | Sim (1 de 1 tentativa aceita sem alerta) | Insatisfatório: sim | **0** |
| [S-M11 · Vulnerabilidades altas ou críticas nas dependências](seguranca/s-m11.md) | 5 avisos altos; 0 críticos no recorte web | Insatisfatório: qualquer crítica ou ≥ 4 | **0** |
| [S-M12 · Advisories, CVEs e tempo de correção](seguranca/s-m12.md) | 1 aviso aplicável sem correção identificada; média indisponível | Insatisfatório: > 90 dias ou sem correção | **0** |
| [S-M13 · Cabeçalhos de segurança HTTP](seguranca/s-m13.md) | 3 de 6 cabeçalhos (nota C) | Parcial: B ou C | **1** |

## Flexibilidade

| Métrica | Valor medido | Faixa do roteiro | Nota (0–2) |
| --- | --- | --- | :---: |
| [F-M1 · Compatibilidade de navegadores](flexibilidade/f-m1.md) | 4 de 4 navegadores (100%) | Satisfatório: ≥ 75% | **2** |
| [F-M2 · Compatibilidade de sistemas operacionais](flexibilidade/f-m2.md) | 3 de 5 sistemas (60%) | Parcial: 60% a 79% | **1** |
| [F-M3 · Defeitos específicos de ambiente](flexibilidade/f-m3.md) | 2 defeitos específicos | Parcial: 1 a 3 | **1** |
| [F-M4 · Cobertura funcional em dispositivos móveis](flexibilidade/f-m4.md) | 25 de 25 funções por toque (100%) | Satisfatório: ≥ 90% | **2** |
| [F-M5 · Cobertura funcional offline](flexibilidade/f-m5.md) | 16 de 23 funções sem rede (69,6%) | Parcial: 50% a 79% | **1** |
| [F-M6 · Resoluções sem perda de elementos](flexibilidade/f-m6.md) | 3 de 4 larguras | Parcial: 3 de 4 | **1** |
| [F-M7 · Inclusão funcional](flexibilidade/f-m7.md) | 24 de 42 funções do draw.io (57,1%) | Insatisfatório: < 70% | **0** |
| [F-M8 · Razão de tempo de tarefa](flexibilidade/f-m8.md) | 0,71 (94 s no Excalidraw, 132 s no Lucidchart) | Satisfatório: ≤ 1,0 | **2** |
| [F-M9 · Conclusão de tarefas por quem vem de outra ferramenta](flexibilidade/f-m9.md) | 2 de 2 tarefas (100%) | Satisfatório: ≥ 90% | **2** |
| [F-M10 · Cobertura de formatos de exportação](flexibilidade/f-m10.md) | 60% | Parcial: 50% a 79% | **1** |
| [F-M11 · Fidelidade de migração](flexibilidade/f-m11.md) | 12 de 12 elementos (100%) | Satisfatório: 100% | **2** |
| [F-M12 · Formatos de importação aceitos](flexibilidade/f-m12.md) | 4 formatos | Satisfatório: ≥ 3 formatos | **2** |

## Capacidade de interação

| Métrica | Valor medido | Faixa do roteiro | Nota (0–2) |
| --- | --- | --- | :---: |
| [CI-M1 · Tempo até identificar o propósito](capacidade-interacao/ci-m1.md) | 18,7 s (n = 3) | Parcial: 11 a 30 s | **1** |
| [CI-M2 · Taxa de reconhecimento correto](capacidade-interacao/ci-m2.md) | 4 de 4 (100%) | Satisfatório: ≥ 90% | **2** |
| [CI-M3 · Ícones autoexplicativos](capacidade-interacao/ci-m3.md) | 80,8% | Satisfatório: ≥ 80% | **2** (no limite) |
| [CI-M4 · Tempo da primeira tarefa](capacidade-interacao/ci-m4.md) | 0,6 min | Satisfatório: ≤ 3 min | **2** |
| [CI-M5 · Conclusão sem ajuda](capacidade-interacao/ci-m5.md) | 5 de 8 tarefas (62,5%) | Insatisfatório: < 70% | **0** |
| [CI-M6 · Consultas à ajuda](capacidade-interacao/ci-m6.md) | 0,5 consulta por pessoa | Satisfatório: ≤ 1 | **2** |
| [CI-M7 · Cobertura da ajuda interna](capacidade-interacao/ci-m7.md) | 46 de 74 funções (62,2%) | Parcial: 50% a 79% | **1** |
| [CI-M8 · Melhoria de desempenho entre sessões](https://github.com/FCTE-Qualidade-de-Software-1/2026-2_T02_ADA_LOVELACE/blob/main/evidencias/capacidade-interacao/CI-M8_melhoria-entre-sessoes.md) | Não medida (exigia três sessões por pessoa; sem tempo) | — | — |
| [CI-M9 · Ações por tarefa frequente](capacidade-interacao/ci-m9.md) | média de 2,5 ações | Satisfatório: ≤ 3 | **2** |
| [CI-M10 · Cobertura de atalhos de teclado](capacidade-interacao/ci-m10.md) | 17 de 17 funções frequentes (100%) | Satisfatório: ≥ 80% | **2** |
| [CI-M11 · Tempo de experientes em relação a iniciantes](capacidade-interacao/ci-m11.md) | 0,41 | Satisfatório: ≤ 0,5 | **2** |
| [CI-M12 · Inconsistências da interface](capacidade-interacao/ci-m12.md) | 0 inconsistências em 11 casos | Satisfatório: 0 | **2** |
| [CI-M13 · Ações com feedback visual imediato](capacidade-interacao/ci-m13.md) | 13 de 13 ações (100%) | Satisfatório: 100% | **2** |
| [CI-M14 · Taxa de recuperabilidade](capacidade-interacao/ci-m14.md) | 11 de 13 ações (84,62%) | Insatisfatório: < 90% | **0** |
| [CI-M15 · Ações destrutivas sem confirmação](capacidade-interacao/ci-m15.md) | 1 ação sem confirmação entre 4 tipos | Parcial: 1 a 2 | **1** |
| [CI-M16 · Perda de dados ao fechar ou recarregar](capacidade-interacao/ci-m16.md) | Não houve perda nos 2 cenários testados | Satisfatório: não | **2** |
| [CI-M17 · Taxa de erro do usuário](capacidade-interacao/ci-m17.md) | 44 de 189 ações (23,3%) | Insatisfatório: > 10% | **0** |
| [CI-M18 · Mensagens de erro compreensíveis](capacidade-interacao/ci-m18.md) | 8 de 18 mensagens (44%) | Insatisfatório: < 50% | **0** |
| [CI-M19 · Escore SUS](capacidade-interacao/ci-m19.md) | 82,9 | Satisfatório: ≥ 68 | **2** |
| [CI-M20 · Satisfação visual](capacidade-interacao/ci-m20.md) | 4,22 de 5 | Satisfatório: ≥ 4,0 | **2** |
| [CI-M21 · Intenção de uso futuro](capacidade-interacao/ci-m21.md) | 6 de 6 (100%) | Satisfatório: ≥ 80% | **2** |
| [CI-M22 · Violações da WCAG 2.2 (A e AA)](capacidade-interacao/ci-m22.md) | 6 violações distintas | Insatisfatório: ≥ 6 | **0** |
| [CI-M23 · Funções operáveis só pelo teclado](capacidade-interacao/ci-m23.md) | 18 de 28 funções (64,3%) | Parcial: 60% a 89% | **1** |
| [CI-M24 · Elementos anunciados por leitor de tela](capacidade-interacao/ci-m24.md) | 1 de 9 elementos (11,1%) | Insatisfatório: < 40% | **0** |
| [CI-M25 · Contraste mínimo de 4,5:1](capacidade-interacao/ci-m25.md) | 8 de 19 combinações (42,1%) | Insatisfatório: < 80% | **0** |
| [CI-M26 · Idiomas e tradução para o português](capacidade-interacao/ci-m26.md) | 57 idiomas; 594 de 642 strings (92,5%) | Parcial: 70% a 94% | **1** |

CI-M1 a CI-M6, CI-M11, CI-M17 e CI-M19 a CI-M21 vêm das sessões com seis pessoas (perfil A = 3, B = 2, C = 1), uma sessão cada. Não houve pessoa do perfil D (não recrutada); a acessibilidade foi avaliada só com ferramentas (CI-M22 a CI-M25). A CI-M8 não foi medida por falta de tempo (decisão registrada na evidência). Nos tempos e consultas, dúvida sobre o termo "elipse" não conta como ajuda. O [roteiro da análise](../analise/roteiro.md) mantém o planejamento original, com a CI-M8 e o perfil D; essas decisões foram tomadas depois, na execução, e os resultados seguem o que foi concluído. Os valores foram conferidos com as transcrições, ainda não com o vídeo, e aprovados na revisão do [PR #113](https://github.com/FCTE-Qualidade-de-Software-1/2026-2_T02_ADA_LOVELACE/pull/113).
