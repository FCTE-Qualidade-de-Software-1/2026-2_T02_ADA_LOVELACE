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
| [S-M3 · Mecanismos de controle de acesso](seguranca/s-m3.md) | 0 mecanismos | **0** |
| [S-M4 · Dados persistidos localmente sem criptografia](seguranca/s-m4.md) | Sim: cena e dados associados legíveis | **0** |
| [S-M5 · Taxa de detecção de adulteração](seguranca/s-m5.md) | 221 de 221 rejeitadas (100%) | **2** |
| [S-M6 · Inconsistências após edições simultâneas](seguranca/s-m6.md) | 2 em 8 rodadas | **1** |
| [S-M7 · Completude da trilha de auditoria](seguranca/s-m7.md) | 0 de 7 ações com autoria verificável (0%) | **0** |
| [S-M8 · Histórico de versões com autoria](seguranca/s-m8.md) | Histórico persistente com autoria não encontrado | **0** |
| [S-M9 · Suficiência da autenticação](seguranca/s-m9.md) | Nome autodeclarado | **1** |
| [S-M10 · Passar-se por outro participante](seguranca/s-m10.md) | Sim (1 tentativa aceita sem alerta) | **0** |
| [S-M11 · Vulnerabilidades altas ou críticas nas dependências](seguranca/s-m11.md) | 5 avisos altos; 0 críticos no recorte web | **0** |
| [S-M12 · Advisories, CVEs e tempo de correção](seguranca/s-m12.md) | 1 aviso aplicável sem correção identificada; média indisponível | **0** |
| [S-M13 · Cabeçalhos de segurança HTTP](seguranca/s-m13.md) | 3 de 6 cabeçalhos (nota C) | **1** |

## Flexibilidade

| Métrica | Valor medido | Nota (0–2) |
| --- | --- | :---: |
| [F-M1 · Compatibilidade de navegadores](flexibilidade/f-m1.md) | 4 de 4 navegadores (100%) | **2** |
| [F-M2 · Compatibilidade de sistemas operacionais](flexibilidade/f-m2.md) | 3 de 5 sistemas (60%) | **1** |
| [F-M3 · Defeitos específicos de ambiente](flexibilidade/f-m3.md) | 2 defeitos específicos | **1** |
| [F-M4 · Cobertura funcional em dispositivos móveis](flexibilidade/f-m4.md) | 25 de 25 funções por toque (100%) | **2** |
| [F-M5 · Cobertura funcional offline](flexibilidade/f-m5.md) | 16 de 23 funções sem rede (69,6%) | **1** |
| [F-M6 · Resoluções sem perda de elementos](flexibilidade/f-m6.md) | 3 de 4 larguras | **1** |
| [F-M7 · Inclusão funcional](flexibilidade/f-m7.md) | 24 de 42 funções do draw.io (57,1%) | **0** |
| F-M8 · Razão de tempo de tarefa | — | — |
| F-M9 · Conclusão de tarefas por quem vem de outra ferramenta | — | — |
| [F-M10 · Cobertura de formatos de exportação](flexibilidade/f-m10.md) | 60% | **1** |
| [F-M11 · Fidelidade de migração](flexibilidade/f-m11.md) | 12 de 12 elementos (100%) | **2** |
| [F-M12 · Formatos de importação aceitos](flexibilidade/f-m12.md) | 4 formatos | **2** |

## Capacidade de interação

| Métrica | Valor medido | Nota (0–2) |
| --- | --- | :---: |
| CI-M1 · Tempo até identificar o propósito | — | — |
| CI-M2 · Taxa de reconhecimento correto | — | — |
| CI-M3 · Ícones autoexplicativos | — | — |
| CI-M4 · Tempo da primeira tarefa | — | — |
| CI-M5 · Conclusão sem ajuda | — | — |
| CI-M6 · Consultas à ajuda | — | — |
| [CI-M7 · Cobertura da ajuda interna](capacidade-interacao/ci-m7.md) | 46 de 74 funções (62,2%) | **1** |
| CI-M8 · Melhoria de desempenho entre sessões | — | — |
| [CI-M9 · Ações por tarefa frequente](capacidade-interacao/ci-m9.md) | média de 2,5 ações | **2** |
| [CI-M10 · Cobertura de atalhos de teclado](capacidade-interacao/ci-m10.md) | 17 de 17 funções frequentes (100%) | **2** |
| CI-M11 · Tempo de experientes em relação a iniciantes | — | — |
| [CI-M12 · Inconsistências da interface](capacidade-interacao/ci-m12.md) | 0 inconsistências em 11 casos | **2** |
| [CI-M13 · Ações com feedback visual imediato](capacidade-interacao/ci-m13.md) | 13 de 13 ações (100%) | **2** |
| [CI-M14 · Taxa de recuperabilidade](capacidade-interacao/ci-m14.md) | 11 de 13 ações (84,62%) | **0 provisória** |
| [CI-M15 · Ações destrutivas sem confirmação](capacidade-interacao/ci-m15.md) | 1 ação sem confirmação entre 4 tipos | **1** |
| [CI-M16 · Perda de dados ao fechar ou recarregar](capacidade-interacao/ci-m16.md) | Não houve perda nos 2 cenários testados | **2** |
| CI-M17 · Taxa de erro do usuário | — | — |
| [CI-M18 · Mensagens de erro compreensíveis](capacidade-interacao/ci-m18.md) | 8 de 18 mensagens (44%) — provisório | **0 provisória** |
| CI-M19 · Escore SUS | — | — |
| CI-M20 · Satisfação visual | — | — |
| CI-M21 · Intenção de uso futuro | — | — |
| [CI-M22 · Violações da WCAG 2.2 (A e AA)](capacidade-interacao/ci-m22.md) | 6 violações distintas | **0** |
| [CI-M23 · Funções operáveis só pelo teclado](capacidade-interacao/ci-m23.md) | 18 de 28 funções (64,3%) | **1** |
| [CI-M24 · Elementos anunciados por leitor de tela](capacidade-interacao/ci-m24.md) | 1 de 9 elementos (11,1%) | **0** |
| [CI-M25 · Contraste mínimo de 4,5:1](capacidade-interacao/ci-m25.md) | 8 de 19 combinações (42,1%) | **0** |
| [CI-M26 · Idiomas e tradução para o português](capacidade-interacao/ci-m26.md) | 57 idiomas; 594 de 642 strings (92,5%) | **1** |

## Rastreabilidade da contribuição de Renato

[Inventário das 26 métricas](inventario-renato-issue-20.md), com origem, integração, revisão e limitações. CI-M17 e CI-M19 a CI-M21 permanecem sem valor e sem nota; há fichas em branch de entrevistas aguardando revisão e consolidação. Notas provisórias não representam revisão concluída.
