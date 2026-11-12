# Plano de tarefas: Capacidade de interação (O5 e O6)

Fase atual: **não são aplicadas todas as 26 métricas**. Este plano separa o que já foi coletado, o que dá para fazer sem participantes e o que fica para quando houver autorização e roteiro de testes.

Para cada métrica, copiar `evidencias/capacidade-interacao/template.md` para `CI-Mxx_descricao.md` e preencher. Fixar o commit `e7b5346` e registrar navegador, sistema e data. Abrir uma issue por tarefa (label `medição` e `fase-2`) e passar por PR com revisão.

## Situação

| Métrica | Situação | Arquivo |
| --- | --- | --- |
| CI-M26 | Coletada (rascunho, falta revisão): 92,5%, nota 1 | `CI-M26_idiomas-traducao-pt-BR.md` |
| CI-M18 | Coletada parcialmente (rascunho): 44%, nota 0 | `CI-M18_mensagens-de-erro.md` |
| CI-M7 | Coletada (rascunho, denominador: ferramentas da barra + ações visíveis): 62,2%, nota 1 | `CI-M7_cobertura-ajuda-interna.md` |
| CI-M10 | Coletada (rascunho, falta revisão): 100%, nota 2 | `CI-M10_cobertura-atalhos.md` |
| CI-M12, M13, M14, M15, M16 | Testes funcionais no app local | — |
| CI-M9 | Contagem de cliques nas 4 tarefas | — |
| CI-M22, M23, M24, M25 | Ferramentas de acessibilidade | — |
| CI-M1-M6, M8, M11, M17, M19-M21 | Exigem participantes: adiar | — |


## Tarefas de código (sem navegador)

- [ ] **CI-M18:** completar com toasts (`grep -rn "toast" aplicacao/packages/excalidraw`) e fazer revisão cruzada da classificação.

## Tarefas no navegador (instância local, `yarn start` em `aplicacao/`)

- [ ] **CI-M13:** lista de ações (selecionar, desenhar, mover, redimensionar, cor, texto...) e se cada uma dá retorno visual imediato.
- [ ] **CI-M14:** repetir as mesmas ações e conferir desfazer/refazer. Registrar ações não revertíveis (exportar, mudar tema, zoom).
- [ ] **CI-M15:** listar ações destrutivas e se pedem confirmação (limpar canvas, abrir arquivo sobre cena atual, excluir biblioteca).
- [ ] **CI-M16:** desenhar, recarregar a página e fechar a aba sem salvar; conferir se a cena volta (`localStorage`).
- [ ] **CI-M12:** registrar inconsistências de seleção, snapping e edição de texto em formas.
- [ ] **CI-M9:** contar cliques de criar forma, mudar cor, agrupar e exportar PNG.

## Acessibilidade (O6)

- [ ] **CI-M22:** rodar axe DevTools e Lighthouse na tela principal (claro e escuro); contar violações WCAG 2.2 A/AA.
- [ ] **CI-M23:** percorrer as funções só com teclado e contar as operáveis.
- [ ] **CI-M24:** NVDA ou VoiceOver sobre o canvas; contar elementos anunciados.
- [ ] **CI-M25:** medir contraste das combinações principais, nos dois modos.

## Adiadas (precisam de participantes e autorização)

CI-M1, M2, M3, M4, M5, M6, M8, M11, M17, M19 (SUS), M20, M21. Antes: roteiro de tarefas único e autorização prévia, sem nomes reais nos registros.
