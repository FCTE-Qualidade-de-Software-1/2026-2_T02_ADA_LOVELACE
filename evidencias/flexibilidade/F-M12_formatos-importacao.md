# Evidência F-M12 : Formatos de importação aceitos

> Status: **rascunho da coleta de código** (feito com apoio do Claude, ver `docs/uso-ia.md`). Falta revisão por outro integrante.

## 1. Identificação

| Campo | Valor |
| --- | --- |
| Métrica | F-M12 : Formatos de importação aceitos |
| Questão | F-Q4 : Substituibilidade (dados migram para dentro e para fora sem perdas?) |
| Responsável | André Henrique |
| Data da coleta | 2026-11-04 |
| Revisado por | _pendente_ |

## 2. O que foi medido

Quantos dos formatos listados na métrica (`.excalidraw`, `.excalidrawlib`, Mermaid e imagens) o Excalidraw aceita como entrada, e se aceita arquivos de outras ferramentas de diagramação.

## 3. Procedimento

1. Ler `loadSceneOrLibraryFromBlob` e `parseFileContents`, usados ao abrir um arquivo.
2. Ler a abertura de biblioteca, a inserção de imagem e a colagem de texto Mermaid.
3. Procurar importação de draw.io, Miro, Visio ou Lucidchart.

### 3.1 Comandos executados

```bash
# 2026-11-04, pasta aplicacao/
git grep -n -I -i "drawio\|mxfile\|mxGraph\|miro\|\.vsdx\|lucid" -- packages excalidraw-app ':!*locales*' ':!*.md'
```

```text
nenhuma ocorrência
```

## 4. Evidências

| # | Arquivo:linha | O que mostra |
| --- | --- | --- |
| C1 | `aplicacao/packages/excalidraw/data/blob.ts:140-198` | Ao abrir arquivo, aceita cena (`.excalidraw`/JSON) ou biblioteca (`.excalidrawlib`); o resto dá "invalid file" |
| C2 | `aplicacao/packages/excalidraw/data/blob.ts:34-82` | PNG e SVG são lidos procurando a cena embutida; sem cena, dá "Image doesn't contain scene" |
| C3 | `aplicacao/packages/excalidraw/actions/actionExport.tsx:393-408` | Ação "Abrir" usa `loadFromJSON` |
| C4 | `aplicacao/packages/excalidraw/components/LibraryMenuHeaderContent.tsx:158-170` | Importação de biblioteca por arquivo, mesclando com a atual |
| C5 | `aplicacao/packages/common/src/constants.ts:299-309` e `aplicacao/packages/excalidraw/components/App.tsx:10544-10550` | Inserção de imagem aceita 9 tipos: SVG, PNG, JPG, GIF, WebP, BMP, ICO, AVIF e JFIF |
| C6 | `aplicacao/packages/excalidraw/components/TTDDialog/TTDDialog.tsx:193` | Aba "Mermaid" no diálogo de texto para diagrama |
| C7 | `aplicacao/packages/excalidraw/components/App.clipboard.ts:207-222` | Texto Mermaid colado no canvas vira diagrama; se o conversor não carregar (por exemplo, offline), é colado como texto |

### 4.3 Buscas sem resultado

| O que se procurou | Onde / comando | Resultado |
| --- | --- | --- |
| Importação de arquivos do draw.io, Miro, Visio ou Lucidchart | `git grep -n -I -i "drawio\|mxfile\|mxGraph\|miro\|vsdx\|lucid"` em `aplicacao/` | Nenhuma ocorrência |

## 5. Resultado

### 5.1 Dados brutos

| Formato | Aceito? | Como entra | Evidência |
| --- | :-: | --- | --- |
| `.excalidraw` (JSON) | Sim | Cena editável | C1, C3 |
| `.excalidrawlib` | Sim | Itens da biblioteca | C1, C4 |
| Mermaid | Sim | Diagrama editável (fluxograma, sequência, classe, ER e estado); os demais tipos entram como imagem | C6, C7 |
| Imagens | Sim | Elemento de imagem, não editável como diagrama. PNG e SVG com cena embutida abrem como cena editável | C2, C5 |
| draw.io, Miro e outras ferramentas | Não | — | 4.3 |

### 5.2 Cálculo

4 dos 4 formatos da métrica são aceitos.

### 5.3 Pontuação

| Valor medido | Regra da métrica | Pontuação |
| --- | --- | --- |
| 4 formatos | 2 = ≥ 3 formatos; 1 = 2 formatos; 0 = ≤ 1 formato | **2** |

**Justificativa:** o Excalidraw aceita os quatro formatos considerados na métrica.

## 6. Observações e limitações

- A nota alta não significa migração fácil: nenhum dos formatos aceitos vem de outra ferramenta de diagramação. Um diagrama do draw.io ou do Miro só entra como imagem, sem poder ser editado. Recomenda-se explicar isso no relatório.
- Os tipos de Mermaid convertidos em elementos editáveis vêm do README de `@excalidraw/mermaid-to-excalidraw` 3.0.0 (`aplicacao/node_modules/@excalidraw/mermaid-to-excalidraw/README.md:64`), não de teste.
- Mede-se a existência da importação no código, não se ela funciona sem perdas. A preservação dos elementos é a F-M11.
- Os arquivos citados foram comparados com o commit `e7b5346` do Excalidraw pelo hash do arquivo: todos idênticos.

## 7. Achado (pontuação 2: não gera achado)

Não se aplica.

## 8. Contribuição para a questão

| Questão | Esta métrica indica que a hipótese foi | Por quê |
| --- | --- | --- |
| F-Q4 | confirmada | A hipótese previa formatos próprios abertos e nenhuma importação direta do draw.io ou do Miro, e é isso que o código mostra |
