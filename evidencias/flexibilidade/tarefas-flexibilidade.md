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
| F-M1, M2, M3 | Testes em vários navegadores e sistemas | — |
| F-M4 | Teste em celular ou tablet | — |
| F-M7 | Comparação de funções com draw.io ou Miro | — |
| F-M8, M9 | Exigem participantes: adiar | — |

## Tarefas de código (sem navegador)

- [x] **F-M10: formatos de exportação.** Feito. **Decidir em grupo o denominador** (sugestão: PNG, SVG, JSON, PDF e JPEG) e conferir os formatos do draw.io e do Miro na documentação deles.
- [x] **F-M12: formatos de importação.** Feito.

## Tarefas no navegador (instância local, `yarn start` em `aplicacao/`)

- [x] **F-M6:** feito com `scripts/fm6_resolucoes.cjs`. Nada fica cortado; em 360 px somem os botões de zoom e de trava de ferramenta, mas as funções continuam pelo teclado (3 de 4).
- [x] **F-M5:** feito com `scripts/fm5_teste_offline.cjs` no build de produção. Sem rede, 16 de 23 funções funcionam; falham SVG, idioma, Mermaid e as quatro que dependem de servidor.
- [x] **F-M11:** feito. Cena de 12 elementos salva em `.excalidraw` e exportada em PNG e SVG com "incorporar cena"; os três arquivos reabertos preservaram todos os elementos.

## Vários ambientes (O3)

- [ ] **F-M1, F-M2 e F-M3:** repetir as mesmas tarefas em Chrome, Firefox, Edge e Safari e em Windows, Linux, macOS, Android e iOS; anotar os defeitos de renderização, fontes e atalhos (F-M3). Safari, macOS e iOS precisam de quem tenha Mac ou iPhone.
- [ ] **F-M4:** num celular ou tablet, fazer por toque as funções da lista de desktop e contar as que funcionam.

## Comparação com outra ferramenta (O4)

- [x] **F-M7:** feito com o draw.io (24 de 42 funções, 57,1%).

## Adiadas (precisam de participantes e autorização)

F-M8 e F-M9. Antes: roteiro de tarefas único e autorização prévia, sem nomes reais nos registros.
