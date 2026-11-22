# Resultados

Notas das métricas no commit
[`e7b5346`](https://github.com/excalidraw/excalidraw/commit/e7b534668a60add7f725531f3c9abf32508c7b4e)
do Excalidraw. Só as métricas já coletadas têm nota. Os critérios estão no
[roteiro da análise](../analise/roteiro.md).

## Segurança

| Métrica | Valor medido | Nota (0–2) |
| --- | --- | :---: |
| [S-M1 · Mensagens de colaboração cifradas](seguranca/s-m1.md) | 5 de 6 tipos de evento (83,3%) | **0** |
| [S-M2 · Chave enviada ao servidor](seguranca/s-m2.md) | Não (0 ocorrências) | **2** |
| [S-M3 · Mecanismos de controle de acesso](seguranca/s-m3.md) | 0 de 3 mecanismos | **0** |
| [S-M4 · Dados persistidos localmente sem criptografia](seguranca/s-m4.md) | Sim (localStorage e IndexedDB) | **0** |
| [S-M5 · Taxa de detecção de adulteração](seguranca/s-m5.md) | 221 de 221 rejeitadas (100%) | **2** |
| [S-M6 · Inconsistências após edições simultâneas](seguranca/s-m6.md) | 2 em 8 rodadas | **1** |
| [S-M7 · Completude da trilha de auditoria](seguranca/s-m7.md) | 0 de 7 ações com autor (0%) | **0** |
| [S-M8 · Histórico de versões com autoria](seguranca/s-m8.md) | Não existe (só desfazer/refazer) | **0** |
| [S-M9 · Suficiência da autenticação](seguranca/s-m9.md) | Nome autodeclarado | **1** |
| [S-M10 · Passar-se por outro participante](seguranca/s-m10.md) | Sim (1 de 1 tentativa aceita) | **0** |
| [S-M11 · Vulnerabilidades altas ou críticas nas dependências](seguranca/s-m11.md) | 5 altas, 0 críticas | **0** |
| [S-M12 · Advisories, CVEs e tempo de correção](seguranca/s-m12.md) | 1 aplicável, sem correção | **0** |
| [S-M13 · Cabeçalhos de segurança HTTP](seguranca/s-m13.md) | 3 de 6 cabeçalhos (nota C) | **1** |

## Flexibilidade

| Métrica | Valor medido | Nota (0–2) |
| --- | --- | :---: |
| [F-M1 · Compatibilidade de navegadores](flexibilidade/f-m1.md) | 4 de 4 navegadores (100%) | **2** |
| [F-M2 · Compatibilidade de sistemas operacionais](flexibilidade/f-m2.md) | 3 de 5 sistemas (60%) | **1** |
| [F-M3 · Defeitos específicos de ambiente](flexibilidade/f-m3.md) | 2 defeitos específicos | **1** |
| [F-M4 · Cobertura funcional em dispositivos móveis](flexibilidade/f-m4.md) | 25 de 25 funções por toque (100%) | **2** |
| [F-M5 · Cobertura funcional offline](flexibilidade/f-m5.md) | 16 de 23 funções sem rede (69,6%) | **1** |
| [F-M6 · Resoluções sem perda de elementos](flexibilidade/f-m6.md) | 3 de 4 resoluções | **1** |
| [F-M7 · Inclusão funcional](flexibilidade/f-m7.md) | 24 de 42 funções do draw.io (57,1%) | **0** |
| [F-M8 · Razão de tempo de tarefa](flexibilidade/f-m8.md) | 0,71 (94 s no Excalidraw, 132 s no Lucidchart) | **2** |
| [F-M9 · Conclusão de tarefas por quem vem de outra ferramenta](flexibilidade/f-m9.md) | 2 de 2 tarefas (100%) | **2** |
| [F-M10 · Cobertura de formatos de exportação](flexibilidade/f-m10.md) | 60% | **1** |
| [F-M11 · Fidelidade de migração](flexibilidade/f-m11.md) | 100% (12 de 12 elementos) | **2** |
| [F-M12 · Formatos de importação aceitos](flexibilidade/f-m12.md) | 4 formatos | **2** |

## Capacidade de interação

| Métrica | Valor medido | Nota (0–2) |
| --- | --- | :---: |
| [CI-M1 · Tempo até identificar o propósito](capacidade-interacao/ci-m1.md) | 18,7 s (n = 3) | **1** |
| [CI-M2 · Taxa de reconhecimento correto](capacidade-interacao/ci-m2.md) | 4 de 4 (100%) | **2** |
| [CI-M3 · Ícones autoexplicativos](capacidade-interacao/ci-m3.md) | 80,8% | **2** (no limite) |
| [CI-M4 · Tempo da primeira tarefa](capacidade-interacao/ci-m4.md) | 0,6 min | **2** |
| [CI-M5 · Conclusão sem ajuda](capacidade-interacao/ci-m5.md) | 5 de 8 tarefas (62,5%) | **0** |
| [CI-M6 · Consultas à ajuda](capacidade-interacao/ci-m6.md) | 0,5 consulta por pessoa | **2** |
| [CI-M7 · Cobertura da ajuda interna](capacidade-interacao/ci-m7.md) | 46 de 74 funções (62,2%) | **1** |
| [CI-M8 · Melhoria de desempenho entre sessões](https://github.com/FCTE-Qualidade-de-Software-1/2026-2_T02_ADA_LOVELACE/blob/main/evidencias/capacidade-interacao/CI-M8_melhoria-entre-sessoes.md) | Não realizada e retirada (exigia três sessões por pessoa; sem tempo) | — |
| [CI-M9 · Ações por tarefa frequente](capacidade-interacao/ci-m9.md) | média de 2,5 ações | **2** |
| [CI-M10 · Cobertura de atalhos de teclado](capacidade-interacao/ci-m10.md) | 17 de 17 funções (100%) | **2** |
| [CI-M11 · Tempo de experientes em relação a iniciantes](capacidade-interacao/ci-m11.md) | 0,41 | **2** (provisória) |
| [CI-M12 · Inconsistências da interface](capacidade-interacao/ci-m12.md) | 0 inconsistências reproduzíveis | **2** |
| [CI-M13 · Ações com feedback visual imediato](capacidade-interacao/ci-m13.md) | 13 de 13 ações (100%) | **2** (provisória) |
| [CI-M14 · Taxa de recuperabilidade](capacidade-interacao/ci-m14.md) | 11 de 13 ações (84,6%) | **0** (provisória) |
| [CI-M15 · Ações destrutivas sem confirmação](capacidade-interacao/ci-m15.md) | 1 de 4 tipos testados | **1** |
| [CI-M16 · Perda de dados ao fechar ou recarregar](capacidade-interacao/ci-m16.md) | Não (reload e reabrir a aba) | **2** |
| [CI-M17 · Taxa de erro do usuário](capacidade-interacao/ci-m17.md) | 44 de 189 ações (23,3%) | **0** |
| [CI-M18 · Mensagens de erro compreensíveis](capacidade-interacao/ci-m18.md) | 44% | **0** |
| [CI-M19 · Escore SUS](capacidade-interacao/ci-m19.md) | 82,9 | **2** |
| [CI-M20 · Satisfação visual](capacidade-interacao/ci-m20.md) | 4,22 de 5 | **2** |
| [CI-M21 · Intenção de uso futuro](capacidade-interacao/ci-m21.md) | 6 de 6 (100%) | **2** |
| [CI-M22 · Violações da WCAG 2.2 (A e AA)](capacidade-interacao/ci-m22.md) | 6 violações | **0** |
| [CI-M23 · Funções operáveis só pelo teclado](capacidade-interacao/ci-m23.md) | 18 de 28 funções (64,3%) | **1** |
| [CI-M24 · Elementos anunciados por leitor de tela](capacidade-interacao/ci-m24.md) | 1 de 9 (11%) | **0** |
| [CI-M25 · Contraste mínimo de 4,5:1](capacidade-interacao/ci-m25.md) | 8 de 19 combinações (42,1%) | **0** |
| [CI-M26 · Idiomas e tradução para o português](capacidade-interacao/ci-m26.md) | 92,5% | **1** |

CI-M1 a CI-M6, CI-M11, CI-M17 e CI-M19 a CI-M21 vêm das sessões com seis pessoas (perfil A = 3, B = 2, C = 1), uma sessão cada. Não houve pessoa do perfil D (não recrutada); a acessibilidade foi avaliada só com ferramentas (CI-M22 a CI-M25). A CI-M8 não foi realizada e foi retirada por falta de tempo (decisão registrada na evidência). Nos tempos e consultas, dúvida sobre o termo "elipse" não conta como ajuda. O [roteiro da análise](../analise/roteiro.md) mantém o planejamento original, com a CI-M8 e o perfil D; essas decisões foram tomadas depois, na execução, e os resultados seguem o que foi concluído. Os valores seguem sem conferência no vídeo e sem revisão por outro integrante.
