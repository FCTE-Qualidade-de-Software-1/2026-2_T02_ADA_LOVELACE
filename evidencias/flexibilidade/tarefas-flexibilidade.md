# Plano de tarefas: Flexibilidade (O3 e O4)

Fase atual: **não são aplicadas todas as 12 métricas**. Este plano separa o que já foi coletado, o que dá para fazer sem participantes e o que fica para quando houver autorização e roteiro de testes.

Para cada métrica, copiar `evidencias/flexibilidade/template.md` para `F-Mxx_descricao.md` e preencher. Fixar o commit `e7b5346` e registrar navegador, sistema e data. Abrir uma issue por tarefa (label `medição` e `fase-3`) e passar por PR com revisão.

## Situação

| Métrica | Situação | Arquivo |
| --- | --- | --- |
| F-M10 | Coletada (rascunho, falta revisão): 60%, nota 1; falta decidir o denominador com o grupo | `F-M10_formatos-exportacao.md` |
| F-M12 | Coletada (rascunho, falta revisão): 4 formatos, nota 2 | `F-M12_formatos-importacao.md` |
| F-M11 | Teste de exportar e reimportar no app local | — |
| F-M5, M6 | Testes no navegador (offline e resoluções) | — |
| F-M1, M2, M3 | Testes em vários navegadores e sistemas | — |
| F-M4 | Teste em celular ou tablet | — |
| F-M7 | Comparação de funções com draw.io ou Miro | — |
| F-M8, M9 | Exigem participantes: adiar | — |

## Tarefas de código (sem navegador)

- [x] **F-M10: formatos de exportação.** Rascunho feito. **Decidir em grupo o denominador** (sugestão: PNG, SVG, JSON, PDF e JPEG) e conferir os formatos do draw.io e do Miro na documentação deles.
- [x] **F-M12: formatos de importação.** Rascunho feito.

## Tarefas no navegador (instância local, `yarn start` em `aplicacao/`)

- [ ] **F-M11:** desenhar uma cena com formas, textos, setas ligadas e cores; salvar em `.excalidraw`, exportar PNG e SVG com "incorporar cena", reabrir cada arquivo e contar os elementos preservados.
- [ ] **F-M6:** abrir em 360, 768, 1366 e 2560 px e registrar com print se algum controle some ou fica cortado. A interface muda de layout em 599 px (celular) e 1180 px (tablet), conforme `packages/common/src/editorInterface.ts:19-26`.
- [ ] **F-M5:** com o build de produção (o service worker só existe nele), carregar com rede, ativar o modo offline no DevTools e testar uma lista fixa de funções.

## Vários ambientes (O3)

- [ ] **F-M1, F-M2 e F-M3:** repetir as mesmas tarefas em Chrome, Firefox, Edge e Safari e em Windows, Linux, macOS, Android e iOS; anotar os defeitos de renderização, fontes e atalhos (F-M3). Safari, macOS e iOS precisam de quem tenha Mac ou iPhone.
- [ ] **F-M4:** num celular ou tablet, fazer por toque as funções da lista de desktop e contar as que funcionam.

## Comparação com outra ferramenta (O4)

- [ ] **F-M7:** definir a lista de funções do draw.io ou do Miro e marcar quais existem no Excalidraw.

## Adiadas (precisam de participantes e autorização)

F-M8 e F-M9. Antes: roteiro de tarefas único e autorização prévia, sem nomes reais nos registros.
