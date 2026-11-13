# Evidência F-M11 : Fidelidade de migração

> Status: **coleta no navegador** (feito com apoio do Claude, ver `docs/uso-ia.md`).

## 1. Identificação

| Campo | Valor |
| --- | --- |
| Métrica | F-M11 : Fidelidade de migração |
| Questão | F-Q4 : Substituibilidade (dados migram para dentro e para fora sem perdas?) |
| Issue | #67 (parte da #18) |
| Responsável | André Henrique |
| Data da coleta | 2026-11-11 |
| Ambiente | Instância local (`yarn start` em `aplicacao/`, `http://localhost:3001`), commit `e7b5346` do Excalidraw; Google Chrome 157.0.8103.50 (x86_64); Linux 7.0 |

## 2. O que foi medido

Proporção de elementos de uma cena que voltam iguais depois de salvar ou exportar e reabrir no Excalidraw. Foram testados os três formatos que guardam a cena editável: `.excalidraw` (JSON), PNG com cena incorporada e SVG com cena incorporada. A meta da métrica é 100% no `.excalidraw`.

## 3. Procedimento

1. Desenhar uma cena de teste com formas, textos, setas ligadas e cores (12 elementos, ver 5.1).
2. Menu → **Salvar em → Salvar no disco**: `F-M11_original_2026-11-11.excalidraw`.
3. Menu → **Exportar imagem**, com **Incorporar cena** ligado: botões **PNG** e **SVG** (`F-M11_exportado_2026-11-11.excalidraw.png` e `.svg`).
4. Para cada um dos três arquivos: **Limpar tela**, **Abrir** o arquivo, conferir o desenho na tela e salvar como `F-M11_reaberto-<formato>_2026-11-11.excalidraw`.
5. Comparar, com o script, cada cena reaberta com a original, elemento por elemento.
6. Comparar também a cena guardada dentro do PNG e do SVG com a original, sem passar pelo navegador.

O script `scripts/comparar_cenas_excalidraw.py` casa os elementos pelo `id` e compara 34 atributos: tipo, posição, tamanho, ângulo, `seed` (o traço "à mão"), cores de traço e de fundo, preenchimento, espessura e estilo do traço, opacidade, arredondamento, grupo, texto, fonte, alinhamento, contêiner do texto, pontos, pontas e ligações das setas e elementos vinculados. Números são comparados com tolerância de 0,01. Um elemento conta como preservado só se todos os atributos forem iguais. Ficam de fora `version`, `versionNonce`, `updated` e `index`, que o Excalidraw regrava ao abrir ou salvar, e, nas ligações das setas, o ponto exato de encaixe (só importa a qual elemento a seta está presa).

### 3.1 Comandos executados

```bash
# 2026-11-11, na pasta evidencias/flexibilidade/F-M11
python3 ../../../scripts/comparar_cenas_excalidraw.py F-M11_original_2026-11-11.excalidraw \
  F-M11_reaberto-excalidraw_2026-11-11.excalidraw \
  F-M11_reaberto-png_2026-11-11.excalidraw \
  F-M11_reaberto-svg_2026-11-11.excalidraw

python3 ../../../scripts/comparar_cenas_excalidraw.py F-M11_original_2026-11-11.excalidraw \
  F-M11_exportado_2026-11-11.excalidraw.png \
  F-M11_exportado_2026-11-11.excalidraw.svg
```

```text
| Arquivo reaberto | Preservados | Total | Fidelidade |
| F-M11_reaberto-excalidraw_2026-11-11.excalidraw | 12 | 12 | 100% |
| F-M11_reaberto-png_2026-11-11.excalidraw | 12 | 12 | 100% |
| F-M11_reaberto-svg_2026-11-11.excalidraw | 12 | 12 | 100% |

| F-M11_exportado_2026-11-11.excalidraw.png | 12 | 12 | 100% |
| F-M11_exportado_2026-11-11.excalidraw.svg | 12 | 12 | 100% |
```

A saída completa, com a situação de cada elemento, está em `F-M11/F-M11_comparacao_2026-11-11.txt`.

## 4. Evidências

### 4.1 Trechos de código

| # | Arquivo:linha | O que mostra |
| --- | --- | --- |
| C1 | `aplicacao/packages/excalidraw/data/index.ts:129-160` | Exportação SVG; com "incorporar cena" ligado, a cena vai no SVG e a extensão vira `.excalidraw.svg` |
| C2 | `aplicacao/packages/excalidraw/data/index.ts:182-202` | Exportação PNG; com "incorporar cena" ligado, a cena vai nos metadados e a extensão vira `.excalidraw.png` |
| C3 | `aplicacao/packages/excalidraw/data/image.ts:25` e `:49` | `encodePngMetadata` e `decodePngMetadata`: gravam e leem a cena no bloco `tEXt` do PNG |
| C4 | `aplicacao/packages/excalidraw/scene/export.ts:1194-1230` | `encodeSvgBase64Payload` e `decodeSvgBase64Payload`: cena em base64 entre os comentários `payload-start` e `payload-end` do SVG |
| C5 | `aplicacao/packages/excalidraw/data/blob.ts:34-82` | Ao abrir PNG ou SVG, o Excalidraw procura a cena incorporada |
| C6 | `aplicacao/packages/excalidraw/data/blob.ts:140-198` | `loadSceneOrLibraryFromBlob` passa os elementos por `restoreElements` (linha 163) antes de exibir |

### 4.2 Arquivos de apoio

Todos em `evidencias/flexibilidade/F-M11/`.

| # | Arquivo | Tipo | O que mostra |
| --- | --- | --- | --- |
| E1 | `F-M11_original_2026-11-11.excalidraw` | cena | Cena de teste antes da migração |
| E2 | `F-M11_exportado_2026-11-11.excalidraw.png` | imagem | PNG exportado com a cena incorporada |
| E3 | `F-M11_exportado_2026-11-11.excalidraw.svg` | imagem | SVG exportado com a cena incorporada |
| E4 | `F-M11_reaberto-excalidraw_2026-11-11.excalidraw` | cena | Cena salva depois de reabrir E1 |
| E5 | `F-M11_reaberto-png_2026-11-11.excalidraw` | cena | Cena salva depois de reabrir E2 |
| E6 | `F-M11_reaberto-svg_2026-11-11.excalidraw` | cena | Cena salva depois de reabrir E3 |
| E7 | `F-M11_comparacao_2026-11-11.txt` | saída de comando | Resultado do script por arquivo e por elemento |

## 5. Resultado

### 5.1 Dados brutos

Cena de teste (E1):

| Elemento | O que exercita |
| --- | --- |
| Retângulo | Fundo vermelho, grupo, texto e seta vinculados |
| Texto "Entrada" | Texto dentro do retângulo (contêiner) |
| Elipse | Traço e fundo coloridos, seta vinculada |
| Seta | Ligada nas duas pontas (retângulo → elipse) |
| Losango | Traço tracejado |
| Texto "Migração de dados (teste)" | Texto solto com acento e parênteses |
| Seta | Solta, tracejada |
| Linha | 4 pontos, tracejada |
| Desenho livre | 73 pontos |
| Elipse | Opacidade 50% |
| Retângulo e elipse | Agrupados entre si |

Resultado por formato:

| Formato | Preservados | Total | Fidelidade |
| --- | :-: | :-: | :-: |
| `.excalidraw` reaberto (E4) | 12 | 12 | 100% |
| PNG reaberto (E5) | 12 | 12 | 100% |
| SVG reaberto (E6) | 12 | 12 | 100% |
| Cena dentro do PNG (E2) | 12 | 12 | 100% |
| Cena dentro do SVG (E3) | 12 | 12 | 100% |

### 5.2 Cálculo

Elementos preservados ÷ total de elementos = 12 ÷ 12 = **100%** no `.excalidraw`, e também 100% no PNG e no SVG com cena incorporada.

### 5.3 Pontuação

| Valor medido | Regra da métrica | Pontuação |
| --- | --- | --- |
| 100% | 2 = 100%; 1 = 90% a 99%; 0 = < 90% | **2** |

**Justificativa:** todos os 12 elementos voltaram com os 34 atributos comparados iguais, nos três formatos.

## 6. Observações e limitações

- Mede a ida e volta dentro do próprio Excalidraw, na mesma versão. Não mede migração para outra ferramenta nem para outra versão do Excalidraw.
- Só vale para PNG e SVG exportados com **Incorporar cena** ligado. Sem essa opção, a imagem não guarda a cena e, ao abrir, o Excalidraw mostra "Image doesn't contain scene" (C5).
- A cena não tem imagens inseridas, frames nem elementos incorporados (*embeds*). Esses tipos não foram testados.
- O arquivo original tinha também 1 elemento apagado, resto da edição, que não entra na contagem. Ao reabrir, o Excalidraw não o grava de novo; por isso E4 é menor que E1.
- Os três arquivos reabertos (E4, E5 e E6) são idênticos byte a byte, o que é esperado, porque os três carregam a mesma cena e passam pela mesma normalização ao abrir (C6). A comparação direta da cena dentro do PNG e do SVG (E2 e E3) chega ao mesmo resultado sem depender do navegador.
- Coleta em um navegador e um sistema. A variação entre navegadores é tratada nas F-M1 a F-M3.

## 7. Achado (pontuação 2: não gera achado)

Não se aplica.

## 8. Contribuição para a questão

| Questão | Esta métrica indica que a hipótese foi | Por quê |
| --- | --- | --- |
| F-Q4 | confirmada | A hipótese previa que o `.excalidraw` preserva tudo ao exportar e reimportar, e os 12 elementos voltaram iguais; o PNG e o SVG com cena incorporada também preservaram tudo |
