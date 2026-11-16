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
| S-M3 · Mecanismos de controle de acesso | — | — |
| S-M4 · Dados persistidos localmente sem criptografia | — | — |
| [S-M5 · Taxa de detecção de adulteração](seguranca/s-m5.md) | 221 de 221 rejeitadas (100%) | **2** |
| [S-M6 · Inconsistências após edições simultâneas](seguranca/s-m6.md) | 2 em 8 rodadas | **1** |
| S-M7 · Completude da trilha de auditoria | — | — |
| S-M8 · Histórico de versões com autoria | — | — |
| [S-M9 · Suficiência da autenticação](seguranca/s-m9.md) | Nome autodeclarado | **1** |
| S-M10 · Passar-se por outro participante | — | — |
| S-M11 · Vulnerabilidades altas ou críticas nas dependências | — | — |
| S-M12 · Advisories, CVEs e tempo de correção | — | — |
| [S-M13 · Cabeçalhos de segurança HTTP](seguranca/s-m13.md) | 3 de 6 cabeçalhos (nota C) | **1** |

## Flexibilidade

| Métrica | Valor medido | Nota (0–2) |
| --- | --- | :---: |
| [F-M1 · Compatibilidade de navegadores](flexibilidade/f-m1.md) | 4 de 4 navegadores (100%) | **2** |
| [F-M2 · Compatibilidade de sistemas operacionais](flexibilidade/f-m2.md) | 3 de 5 sistemas (60%) | **1** |
| [F-M3 · Defeitos específicos de ambiente](flexibilidade/f-m3.md) | 2 defeitos específicos | **1** |
| F-M4 · Cobertura funcional em dispositivos móveis | — | — |
| F-M5 · Cobertura funcional offline | — | — |
| F-M6 · Resoluções sem perda de elementos | — | — |
| F-M7 · Inclusão funcional | — | — |
| F-M8 · Razão de tempo de tarefa | — | — |
| F-M9 · Conclusão de tarefas por quem vem de outra ferramenta | — | — |
| [F-M10 · Cobertura de formatos de exportação](flexibilidade/f-m10.md) | 60% | **1** |
| F-M11 · Fidelidade de migração | — | — |
| [F-M12 · Formatos de importação aceitos](flexibilidade/f-m12.md) | 4 formatos | **2** |

## Capacidade de interação

| Métrica | Valor medido | Nota (0–2) |
| --- | --- | :---: |
| [CI-M1 · Tempo até identificar o propósito](https://github.com/FCTE-Qualidade-de-Software-1/2026-2_T02_ADA_LOVELACE/blob/main/evidencias/capacidade-interacao/CI-M1_tempo-proposito.md) | média de 18,7 s (n = 3) | **1** |
| [CI-M2 · Taxa de reconhecimento correto](https://github.com/FCTE-Qualidade-de-Software-1/2026-2_T02_ADA_LOVELACE/blob/main/evidencias/capacidade-interacao/CI-M2_reconhecimento-correto.md) | 4 de 4 (100%) | **2** |
| [CI-M3 · Ícones autoexplicativos](https://github.com/FCTE-Qualidade-de-Software-1/2026-2_T02_ADA_LOVELACE/blob/main/evidencias/capacidade-interacao/CI-M3_icones-autoexplicativos.md) | 80,8% | **2** |
| [CI-M4 · Tempo da primeira tarefa](https://github.com/FCTE-Qualidade-de-Software-1/2026-2_T02_ADA_LOVELACE/blob/main/evidencias/capacidade-interacao/CI-M4_tempo-primeira-tarefa.md) | média de 0,6 min (n = 3) | **2** |
| [CI-M5 · Conclusão sem ajuda](https://github.com/FCTE-Qualidade-de-Software-1/2026-2_T02_ADA_LOVELACE/blob/main/evidencias/capacidade-interacao/CI-M5_conclusao-sem-ajuda.md) | 1 de 6 tarefas (16,7%) | **0** |
| [CI-M6 · Consultas à ajuda](https://github.com/FCTE-Qualidade-de-Software-1/2026-2_T02_ADA_LOVELACE/blob/main/evidencias/capacidade-interacao/CI-M6_consultas-ajuda.md) | média de 1,0 consulta (provisória) | **2** |
| CI-M7 · Cobertura da ajuda interna | — | — |
| [CI-M8 · Melhoria de desempenho entre sessões](https://github.com/FCTE-Qualidade-de-Software-1/2026-2_T02_ADA_LOVELACE/blob/main/evidencias/capacidade-interacao/CI-M8_melhoria-entre-sessoes.md) | não medida (1 sessão por pessoa) | — |
| [CI-M9 · Ações por tarefa frequente](https://github.com/FCTE-Qualidade-de-Software-1/2026-2_T02_ADA_LOVELACE/blob/main/evidencias/capacidade-interacao/CI-M9/CI-M9_acoes-por-tarefa.md) | média de 2,5 ações | **2** |
| CI-M10 · Cobertura de atalhos de teclado | — | — |
| [CI-M11 · Tempo de experientes em relação a iniciantes](https://github.com/FCTE-Qualidade-de-Software-1/2026-2_T02_ADA_LOVELACE/blob/main/evidencias/capacidade-interacao/CI-M11_experientes-vs-iniciantes.md) | razão de 0,43 (n = 1 experiente; provisória) | **2** |
| [CI-M12 · Inconsistências da interface](https://github.com/FCTE-Qualidade-de-Software-1/2026-2_T02_ADA_LOVELACE/blob/main/evidencias/capacidade-interacao/CI-M12/CI-M12_inconsistencias-interface.md) | 0 inconsistências reproduzíveis | **2** |
| CI-M13 · Ações com feedback visual imediato | — | — |
| CI-M14 · Taxa de recuperabilidade | — | — |
| CI-M15 · Ações destrutivas sem confirmação | — | — |
| CI-M16 · Perda de dados ao fechar ou recarregar | — | — |
| [CI-M17 · Taxa de erro do usuário](https://github.com/FCTE-Qualidade-de-Software-1/2026-2_T02_ADA_LOVELACE/blob/main/evidencias/capacidade-interacao/CI-M17_taxa-erro-usuario.md) | 28,0% (40 de 143 ações) | **0** |
| [CI-M18 · Mensagens de erro compreensíveis](capacidade-interacao/ci-m18.md) | 44% | **0** |
| [CI-M19 · Escore SUS](https://github.com/FCTE-Qualidade-de-Software-1/2026-2_T02_ADA_LOVELACE/blob/main/evidencias/capacidade-interacao/CI-M19_escore-sus.md) | média de 82,0 | **2** |
| [CI-M20 · Satisfação visual](https://github.com/FCTE-Qualidade-de-Software-1/2026-2_T02_ADA_LOVELACE/blob/main/evidencias/capacidade-interacao/CI-M20_satisfacao-visual.md) | média de 4,27 | **2** |
| [CI-M21 · Intenção de uso futuro](https://github.com/FCTE-Qualidade-de-Software-1/2026-2_T02_ADA_LOVELACE/blob/main/evidencias/capacidade-interacao/CI-M21_intencao-de-uso.md) | 4 de 4 (100%) | **2** |
| CI-M22 · Violações da WCAG 2.2 (A e AA) | — | — |
| CI-M23 · Funções operáveis só pelo teclado | — | — |
| [CI-M24 · Elementos anunciados por leitor de tela](capacidade-interacao/ci-m24.md) | 1 de 9 (11%) | **0** |
| CI-M25 · Contraste mínimo de 4,5:1 | — | — |
| [CI-M26 · Idiomas e tradução para o português](capacidade-interacao/ci-m26.md) | 92,5% | **1** |
