# Evidência CI-M26 : Idiomas e tradução para o português

> Status: **rascunho da coleta de código** (feito com apoio do Claude, ver `docs/uso-ia.md`). Falta revisão por outro integrante.

## 1. Identificação

| Campo | Valor |
| --- | --- |
| Métrica | CI-M26 : Idiomas e tradução para o português |
| Questão | CI-Q10 : Inclusividade (adapta-se a diferentes perfis de usuário?) |
| Responsável | Zayra Moraes |
| Data da coleta | 2026-11-04 |
| Revisado por | _pendente_ |

## 2. O que foi medido

Número de idiomas disponíveis na interface e proporção de strings traduzidas para pt-BR, em relação ao total de strings da interface (`en.json`, arquivo de referência).

## 3. Procedimento

1. Contar os arquivos de idioma em `aplicacao/packages/excalidraw/locales/` (exceto `README.md` e `percentages.json`).
2. Achatar (`flatten`) `en.json` e `pt-BR.json` e comparar as chaves.
3. Comparar com o `percentages.json` oficial do projeto, gerado por `aplicacao/scripts/build-locales-coverage.js`.

### 3.1 Comandos executados

Script Python que achata os dois JSON e conta chaves (mesma lógica de achatamento do script oficial). Saída:

```text
en chaves: 642
pt-BR chaves: 614 (não vazias: 594)
chaves de en ausentes em pt-BR: 28
chaves de pt-BR inexistentes em en: 0
strings de pt-BR idênticas às de en: 21
```

## 4. Evidências

| # | Arquivo:linha | O que mostra |
| --- | --- | --- |
| C1 | `aplicacao/scripts/build-locales-coverage.js:19-30` | O percentual oficial é `floor(100 × chaves não vazias ÷ chaves **do próprio arquivo**)`: chaves ausentes não entram no denominador |
| C2 | `aplicacao/packages/excalidraw/locales/percentages.json:42` | `"pt-BR": 96` |
| C3 | `aplicacao/packages/excalidraw/locales/` | 57 idiomas listados em `percentages.json` |

As 21 strings idênticas ao inglês são termos que não se traduzem (`Ctrl`, `Shift`, `PNG`, `SVG`, `Mermaid`, `Menu`, `Excalidraw+`, `Bronze`, etc.), então foram contadas como traduzidas.

### 4.3 Buscas sem resultado

Não se aplica.

## 5. Resultado

### 5.1 Dados brutos

| Item | Valor |
| --- | ---: |
| Idiomas disponíveis | 57 |
| Strings da interface (`en.json`) | 642 |
| Strings de `en.json` com tradução não vazia em pt-BR | 594 |
| Sem tradução (28 chaves ausentes + 20 vazias) | 48 |

As 48 sem tradução são de recursos recentes: nota adesiva (`stickynote`), balde de tinta (`bucketfill`), diálogo de soltar arquivo (`fileDrop.*`), `colorPicker.*`, `labels.signIn/signUp/upgrade`, `hints.*` novos, entre outros.

### 5.2 Cálculo

Segundo a definição da métrica (strings traduzidas ÷ total de strings): 594 ÷ 642 = **92,5%**.

O `percentages.json` (96%) é calculado sobre as 614 chaves existentes em pt-BR (594 ÷ 614 = 96,7%, arredondado para baixo) e **ignora as 28 chaves que faltam**; por isso não deve ser usado como valor da métrica.

### 5.3 Pontuação

| Valor medido | Regra da métrica | Pontuação |
| --- | --- | --- |
| 92,5% | 2 = ≥ 95%; 1 = 70% a 94%; 0 = < 70% ou sem português | **1** |

**Justificativa:** o pt-BR existe e cobre quase tudo, mas fica abaixo de 95% quando se conta o que falta.

## 6. Observações e limitações

- Com o valor oficial (96%), a nota seria 2. A diferença vem só do denominador; recomenda-se explicar isso no relatório.
- Mede-se a existência de tradução, não a qualidade dela.
- A pasta `aplicacao/` não tem `.git` próprio; não foi possível confirmar por `git rev-parse` que está no commit `e7b5346`. Conferir antes de entregar.

## 7. Achado (pontuação 1: não gera achado obrigatório)

Sugestão de registro como oportunidade: 48 strings sem tradução em pt-BR, concentradas em recursos novos.

## 8. Contribuição para a questão

| Questão | Esta métrica indica que a hipótese foi | Por quê |
| --- | --- | --- |
| CI-Q10 | parcial | A hipótese dizia 96% em pt-BR; pelo total real da interface são 92,5% |
