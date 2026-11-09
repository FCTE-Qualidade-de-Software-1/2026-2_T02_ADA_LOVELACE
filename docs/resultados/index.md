# Resultados

Notas das métricas no commit
[`e7b5346`](https://github.com/excalidraw/excalidraw/commit/e7b534668a60add7f725531f3c9abf32508c7b4e)
do Excalidraw. Só as métricas já coletadas têm nota. Os critérios estão no
[roteiro da análise](../analise/roteiro.md).

[sm9]: https://github.com/FCTE-Qualidade-de-Software-1/2026-2_T02_ADA_LOVELACE/tree/main/evidencias/seguranca/S-M9
[sm13]: https://github.com/FCTE-Qualidade-de-Software-1/2026-2_T02_ADA_LOVELACE/tree/main/evidencias/seguranca/S-M13
[fm10]: https://github.com/FCTE-Qualidade-de-Software-1/2026-2_T02_ADA_LOVELACE/blob/main/evidencias/flexibilidade/F-M10_formatos-exportacao.md
[fm12]: https://github.com/FCTE-Qualidade-de-Software-1/2026-2_T02_ADA_LOVELACE/blob/main/evidencias/flexibilidade/F-M12_formatos-importacao.md
[cim18]: https://github.com/FCTE-Qualidade-de-Software-1/2026-2_T02_ADA_LOVELACE/blob/main/evidencias/capacidade-interacao/CI-M18_mensagens-de-erro.md
[cim26]: https://github.com/FCTE-Qualidade-de-Software-1/2026-2_T02_ADA_LOVELACE/blob/main/evidencias/capacidade-interacao/CI-M26_idiomas-traducao-pt-BR.md

## Segurança

| Métrica | Valor medido | Nota (0–2) |
| --- | --- | :---: |
| [S-M1 · Mensagens de colaboração cifradas](seguranca/s-m1.md) | 5 de 6 tipos de evento (83,3%) | **0** |
| [S-M2 · Chave enviada ao servidor](seguranca/s-m2.md) | Não (0 ocorrências) | **2** |
| S-M3 · Mecanismos de controle de acesso | — | — |
| S-M4 · Dados persistidos localmente sem criptografia | — | — |
| S-M5 · Taxa de detecção de adulteração | — | — |
| S-M6 · Inconsistências após edições simultâneas | — | — |
| S-M7 · Completude da trilha de auditoria | — | — |
| S-M8 · Histórico de versões com autoria | — | — |
| [S-M9 · Suficiência da autenticação][sm9] | Nome autodeclarado | **1** |
| S-M10 · Passar-se por outro participante | — | — |
| S-M11 · Vulnerabilidades altas ou críticas nas dependências | — | — |
| S-M12 · Advisories, CVEs e tempo de correção | — | — |
| [S-M13 · Cabeçalhos de segurança HTTP][sm13] | 3 de 6 cabeçalhos (D esperado) | **0** (provisória) |

## Flexibilidade

| Métrica | Valor medido | Nota (0–2) |
| --- | --- | :---: |
| F-M1 · Compatibilidade de navegadores | — | — |
| F-M2 · Compatibilidade de sistemas operacionais | — | — |
| F-M3 · Defeitos específicos de ambiente | — | — |
| F-M4 · Cobertura funcional em dispositivos móveis | — | — |
| F-M5 · Cobertura funcional offline | — | — |
| F-M6 · Resoluções sem perda de elementos | — | — |
| F-M7 · Inclusão funcional | — | — |
| F-M8 · Razão de tempo de tarefa | — | — |
| F-M9 · Conclusão de tarefas por quem vem de outra ferramenta | — | — |
| [F-M10 · Cobertura de formatos de exportação][fm10] | 60% | **1** |
| F-M11 · Fidelidade de migração | — | — |
| [F-M12 · Formatos de importação aceitos][fm12] | 4 formatos | **2** |

## Capacidade de interação

| Métrica | Valor medido | Nota (0–2) |
| --- | --- | :---: |
| CI-M1 · Tempo até identificar o propósito | — | — |
| CI-M2 · Taxa de reconhecimento correto | — | — |
| CI-M3 · Ícones autoexplicativos | — | — |
| CI-M4 · Tempo da primeira tarefa | — | — |
| CI-M5 · Conclusão sem ajuda | — | — |
| CI-M6 · Consultas à ajuda | — | — |
| CI-M7 · Cobertura da ajuda interna | — | — |
| CI-M8 · Melhoria de desempenho entre sessões | — | — |
| CI-M9 · Ações por tarefa frequente | — | — |
| CI-M10 · Cobertura de atalhos de teclado | — | — |
| CI-M11 · Tempo de experientes em relação a iniciantes | — | — |
| CI-M12 · Inconsistências da interface | — | — |
| CI-M13 · Ações com feedback visual imediato | — | — |
| CI-M14 · Taxa de recuperabilidade | — | — |
| CI-M15 · Ações destrutivas sem confirmação | — | — |
| CI-M16 · Perda de dados ao fechar ou recarregar | — | — |
| CI-M17 · Taxa de erro do usuário | — | — |
| [CI-M18 · Mensagens de erro compreensíveis][cim18] | 44% | **0** |
| CI-M19 · Escore SUS | — | — |
| CI-M20 · Satisfação visual | — | — |
| CI-M21 · Intenção de uso futuro | — | — |
| CI-M22 · Violações da WCAG 2.2 (A e AA) | — | — |
| CI-M23 · Funções operáveis só pelo teclado | — | — |
| CI-M24 · Elementos anunciados por leitor de tela | — | — |
| CI-M25 · Contraste mínimo de 4,5:1 | — | — |
| [CI-M26 · Idiomas e tradução para o português][cim26] | 92,5% | **1** |
