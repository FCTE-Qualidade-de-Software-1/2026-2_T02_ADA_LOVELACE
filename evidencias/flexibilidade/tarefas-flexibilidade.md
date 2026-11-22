# Plano de tarefas: Flexibilidade (O3 e O4)

Fase atual: **não são aplicadas todas as 12 métricas**. Este plano separa o que já foi coletado, o que dá para fazer sem participantes e o que fica para quando houver autorização e roteiro de testes.

Para cada métrica, copiar `evidencias/flexibilidade/template.md` para `F-Mxx_descricao.md` e preencher. Fixar o commit `e7b5346` e registrar navegador, sistema e data. Abrir uma issue por tarefa (label `medição` e `fase-3`) e passar por PR com revisão.

## Situação

| Métrica | Situação | Arquivo |
| --- | --- | --- |
| F-M10 | Coletada: 60%, nota 1; falta decidir o denominador com o grupo | `F-M10_formatos-exportacao.md` |
| F-M12 | Coletada: 4 formatos, nota 2 | `F-M12_formatos-importacao.md` |
| F-M5 | Coletada: 16 de 23 funções sem rede (69,6%), nota 1 | `F-M5_cobertura-offline.md` |
| F-M6 | Coletada: 3 de 4 resoluções (360 px perde os botões de zoom e trava), nota 1 | `F-M6_resolucoes.md` |
| F-M11 | Coletada: 100% nos três formatos, nota 2 | `F-M11_fidelidade-migracao.md` |
| F-M1 | Coletada: 4 de 4 navegadores (100%), nota 2; Chrome testado via Helium 0.21.3.1 | `F-M1/F-M1_compatibilidade-navegadores_2026-11-14.md` |
| F-M2 | Coletada: 3 de 5 sistemas (60%), nota 1; Linux indisponível | `F-M2/F-M2_compatibilidade-sistemas_2026-11-14.md` |
| F-M3 | Coletada: 2 defeitos específicos, nota 1 | `F-M3/F-M3_defeitos-ambiente_2026-11-14.md` |
| F-M4 | Coletada por emulação: 25 de 25 funções por toque no celular e no tablet (100%), nota 2 | `F-M4_cobertura-mobile.md` |
| F-M7 | Coletada com o draw.io: 24 de 42 funções (57,1%), nota 0 | `F-M7_inclusao-funcional.md` |
| F-M8 | Coletada na sessão do P05 (perfil C): 94 s no Excalidraw ÷ 132 s no Lucidchart = 0,71, nota 2 | `F-M8_razao-tempo-tarefa.md` |
| F-M9 | Coletada na sessão do P05 (perfil C): 2 de 2 tarefas (100%), nota 2 | `F-M9_conclusao-tarefas.md` |

## Tarefas de código (sem navegador)

- [x] **F-M10: formatos de exportação.** Feito. **Decidir em grupo o denominador** (sugestão: PNG, SVG, JSON, PDF e JPEG) e conferir os formatos do draw.io e do Miro na documentação deles.
- [x] **F-M12: formatos de importação.** Feito.

## Tarefas no navegador (instância local, `yarn start` em `aplicacao/`)

- [x] **F-M6:** feito com `scripts/fm6_resolucoes.cjs`. Nada fica cortado; em 360 px somem os botões de zoom e de trava de ferramenta, mas as funções continuam pelo teclado (3 de 4).
- [x] **F-M5:** feito com `scripts/fm5_teste_offline.cjs` no build de produção. Sem rede, 16 de 23 funções funcionam; falham SVG, idioma, Mermaid e as quatro que dependem de servidor.
- [x] **F-M11:** feito. Cena de 12 elementos salva em `.excalidraw` e exportada em PNG e SVG com "incorporar cena"; os três arquivos reabertos preservaram todos os elementos.

## Vários ambientes (O3)

- [x] **F-M1, F-M2 e F-M3:** feito. As mesmas 25 tarefas foram executadas em Chromium (Helium 0.21.3.1), Firefox 160.0, Edge 157.0.4341.60 e Safari 27.2 no macOS 27.2.1, e em Windows 11, Android 10, iPadOS 27.2 e iOS 27.2.1. A F-M1 fechou em 4 de 4 navegadores (nota 2); a F-M2, em 3 de 5 sistemas (nota 1); a F-M3 contou 2 defeitos específicos (nota 1). O Linux não estava disponível.
- [x] **F-M4:** feito com `scripts/fm4_toque.cjs`, emulando um Pixel 7 e um iPad no Chrome. As 25 funções feitas com mouse no desktop também funcionam só com toque; no celular, o zoom passa pela pinça e a trava pelo menu de preferências na emulação. Nos aparelhos reais da F-M2, a trava não foi encontrada.

## Comparação com outra ferramenta (O4)

- [x] **F-M7:** feito com o draw.io (24 de 42 funções, 57,1%).

## Sessões com participantes

- [x] **F-M8 e F-M9:** feito com a sessão do P05 (perfil C) da #75, em 2026-11-15. Reproduziu o diagrama-modelo em 94 s no Excalidraw e 132 s no Lucidchart (razão 0,71) e concluiu as duas tarefas propostas (T4 e T5). Um único participante, que marcou no perfil já usar o Excalidraw regularmente: ver as limitações nos registros.
