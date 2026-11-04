# Evidência F-M10 : Cobertura de formatos de exportação

> Status: **rascunho da coleta de código** (feito com apoio do Claude, ver `docs/uso-ia.md`). Falta revisão por outro integrante e decidir em grupo o denominador.

## 1. Identificação

| Campo | Valor |
| --- | --- |
| Métrica | F-M10 : Cobertura de formatos de exportação |
| Questão | F-Q4 : Substituibilidade (dados migram para dentro e para fora sem perdas?) |
| Responsável | André Henrique |
| Data da coleta | 2026-11-04 |
| Revisado por | _pendente_ |

## 2. O que foi medido

Formatos em que o usuário consegue exportar um diagrama **pela interface** do Excalidraw, em relação aos formatos relevantes para quem migra de uma ferramenta equivalente (draw.io ou Miro). Recorte: só exportações que geram arquivo. Cópia para a área de transferência, link compartilhável e envio ao Excalidraw+ ficam fora da contagem.

## 3. Procedimento

1. Ler o tipo `ExportType` e a função `exportCanvas`, que tratam a exportação de imagem.
2. Ler `saveAsJSON` e `saveLibraryAsJSON`, que salvam a cena e a biblioteca.
3. Conferir nos diálogos de exportação (`ImageExportDialog.tsx` e `JSONExportDialog.tsx`) quais opções aparecem para o usuário.
4. Procurar exportação para PDF, JPEG e formatos de outras ferramentas.

### 3.1 Comandos executados

```bash
# 2026-11-04, pasta aplicacao/
git grep -n -I -i "application/pdf\|\.pdf\b\|jpeg" -- packages excalidraw-app ':!*test*' ':!*.snap' ':!*locales*'
git grep -n -I -i "drawio\|mxfile\|mxGraph\|miro\|\.vsdx\|lucid" -- packages excalidraw-app ':!*locales*' ':!*.md'
```

```text
PDF: nenhuma ocorrência
JPEG: só na API da biblioteca (scene/export.ts:1296, exportScene({ type: "jpeg" })),
      numa palavra-chave da paleta de comandos (CommandPalette.tsx:412) e no
      app de IA (excalidraw-app/components/AI.tsx:38). O diálogo de exportação
      não oferece JPEG.
draw.io, Miro, Visio, Lucidchart: nenhuma ocorrência
```

## 4. Evidências

| # | Arquivo:linha | O que mostra |
| --- | --- | --- |
| C1 | `aplicacao/packages/excalidraw/scene/types.ts:155-160` | `ExportType` aceita só `png`, `svg`, `clipboard`, `clipboard-svg` e `backend` |
| C2 | `aplicacao/packages/excalidraw/data/index.ts:129-160` | Exportação SVG; com "incorporar cena" ligado, a extensão vira `.excalidraw.svg` |
| C3 | `aplicacao/packages/excalidraw/data/index.ts:182-202` | Exportação PNG; com "incorporar cena" ligado, a cena vai nos metadados e a extensão vira `.excalidraw.png` |
| C4 | `aplicacao/packages/excalidraw/data/json.ts:77-100` | `saveAsJSON` grava a cena em `.excalidraw` (JSON) |
| C5 | `aplicacao/packages/excalidraw/data/json.ts:147-160` | `saveLibraryAsJSON` grava a biblioteca em `.excalidrawlib` (JSON) |
| C6 | `aplicacao/packages/excalidraw/components/ImageExportDialog.tsx:273-279` e `:310-350` | Diálogo de imagem: opção "incorporar cena" e botões PNG, SVG e copiar PNG |
| C7 | `aplicacao/packages/excalidraw/components/JSONExportDialog.tsx:68` e `:73-87` | Diálogo de cena: salvar em disco e exportar como link |
| C8 | `aplicacao/packages/excalidraw/actions/actionClipboard.tsx:131` e `:199` | Copiar como SVG e como PNG (área de transferência, fora da contagem) |

### 4.3 Buscas sem resultado

| O que se procurou | Onde / comando | Resultado |
| --- | --- | --- |
| Exportação para PDF | `git grep -n -I -i "application/pdf\|\.pdf\b"` em `aplicacao/` | Nenhuma ocorrência |
| Exportação para JPEG pela interface | `git grep -n -I -i "jpeg"` e leitura de C1 e C6 | Existe só na API (`exportScene`), não no diálogo |
| Exportação para formatos de draw.io, Miro, Visio ou Lucidchart | `git grep -n -I -i "drawio\|mxfile\|miro\|vsdx\|lucid"` | Nenhuma ocorrência |

## 5. Resultado

### 5.1 Dados brutos

| Formato relevante | Exporta pela interface? | Evidência |
| --- | :-: | --- |
| PNG | Sim | C3, C6 |
| SVG | Sim | C2, C6 |
| JSON aberto (`.excalidraw`) | Sim | C4, C7 |
| PDF | Não | 4.3 |
| JPEG | Não | 4.3 |

Variantes que não contam como formato novo: `.excalidraw.png` e `.excalidraw.svg` (PNG e SVG com a cena embutida) e `.excalidrawlib` (JSON da biblioteca, não do diagrama).

### 5.2 Cálculo

Segundo a definição da métrica (formatos abertos suportados ÷ formatos relevantes considerados): 3 ÷ 5 = **60%**.

Se o denominador for só os três formatos citados na métrica (JSON, SVG e PNG), o resultado é 3 ÷ 3 = 100%. Esse cálculo não mede nada, porque o denominador foi escrito a partir do que o Excalidraw já tem.

### 5.3 Pontuação

| Valor medido | Regra da métrica | Pontuação |
| --- | --- | --- |
| 60% | 2 = ≥ 80%; 1 = 50% a 79%; 0 = < 50% | **1** |

**Justificativa:** os três formatos abertos estão disponíveis, mas faltam PDF e JPEG, comuns em ferramentas equivalentes.

## 6. Observações e limitações

- O denominador (PNG, SVG, JSON, PDF e JPEG) foi escolhido nesta coleta. **Decidir em grupo** e registrar a lista; com denominador 3 a nota seria 2.
- A lista de formatos do draw.io e do Miro não foi conferida na documentação deles nesta coleta. Conferir antes de entregar.
- Mede-se a existência da exportação no código, não a qualidade do arquivo gerado. A preservação dos elementos é a F-M11.
- Os arquivos citados foram comparados com o commit `e7b5346` do Excalidraw pelo hash do arquivo (`gh api .../contents/<arquivo>?ref=e7b5346` × `git hash-object`): todos idênticos.

## 7. Achado (pontuação 1: não gera achado obrigatório)

Sugestão de registro como oportunidade: o diálogo de exportação não oferece PDF nem JPEG, embora a API da biblioteca já gere JPEG (`scene/export.ts:1296`).

## 8. Contribuição para a questão

| Questão | Esta métrica indica que a hipótese foi | Por quê |
| --- | --- | --- |
| F-Q4 | parcial | Os formatos abertos existem para levar os dados para fora, mas não há exportação em PDF, JPEG ou formato de outra ferramenta |
