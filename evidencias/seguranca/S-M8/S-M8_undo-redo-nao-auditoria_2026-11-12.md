# S-M8 — Undo/redo não é histórico de versões com autoria

## Identificação

| Campo | Valor |
| --- | --- |
| Métrica | S-M8: Histórico de versões com autoria |
| Data da coleta | 2026-11-12 |
| Versão avaliada | Excalidraw `e7b5346`, conforme ficha de ambiente |
| Ambiente | Instância local; evidências visuais em `S-M8_historico-versoes_2026-11-12.md` |

## Evidência observada

As capturas E7–E13 do relatório de S-M8 mostram os comandos **Desfazer** e
**Refazer** no menu da aplicação, mas não mostram lista de versões, restauração,
comparação, data da versão ou autor da alteração. A cena foi reaberta, porém
isso demonstra somente persistência da cena atual, não versões nomeadas ou
auditáveis.

## Evidência no código

- `aplicacao/excalidraw-app/tests/collab.test.tsx:145-238` testa operações
  locais de undo/redo sobre o histórico do editor.
- `aplicacao/excalidraw-app/collab/Collab.tsx:590-598` recebe o payload de
  colaboração e `:471-485` descriptografa o payload; não há registro persistente
  de autor associado à operação nesse fluxo.
- `aplicacao/excalidraw-app/app_constants.ts:18-25` define eventos de
  broadcast e subtipos de cena, não um histórico de versões com autoria.

## Conclusão

Undo/redo é uma pilha de edição do cliente. Mesmo quando restaura uma cena
anterior durante a sessão, não oferece por si só uma versão persistente com
autor, data, comparação ou restauração auditável. Portanto, não altera o
resultado de S-M8: histórico persistente com autoria não encontrado na versão
avaliada; pontuação **0**.
