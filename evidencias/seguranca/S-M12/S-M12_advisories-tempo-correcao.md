# Evidência S-M12 — Advisories e tempo de correção

## 1. Identificação

| Campo | Valor |
| --- | --- |
| Métrica | S-M12 — Avisos de segurança e tempo médio de correção |
| Objetivo e questão | O2 — Identificação, responsabilização e riscos de segurança. S-Q6 — Resistência |
| Tarefa do plano | [Issue #61](https://github.com/FCTE-Qualidade-de-Software-1/2026-2_T02_ADA_LOVELACE/issues/61) |
| Responsável | Renato Araújo Gameiro |
| Data da preparação | 2026-11-08 |
| Data da coleta | Pendente |
| Revisado por | Pendente |
| Versão | [`e7b534668a60add7f725531f3c9abf32508c7b4e`](https://github.com/excalidraw/excalidraw/commit/e7b534668a60add7f725531f3c9abf32508c7b4e) |
| Ambiente da preparação | Windows x64, PowerShell 7.6.9 e Git 2.56.0.windows.2 |

## 2. O que foi medido

Coleta pendente. O recorte inclui avisos públicos do Excalidraw pertinentes à versão fixada e o tempo entre a divulgação e a disponibilização da correção, quando houver evidência para as duas datas. Avisos exclusivamente de dependências de terceiros pertencem à análise de S-M11.

## 3. Procedimento

1. Após a autorização para S-M12, consultar os advisories do repositório oficial e a base de advisories do GitHub. Conferir os CVEs na NVD quando aplicável. Registrar data, URL ou comando, filtros, paginação e eventuais erros.
2. Consolidar identificadores GHSA e CVE que descrevam o mesmo aviso. Para cada caso, verificar o pacote e as versões afetadas e a posição da correção em relação ao commit fixado. Preservar as fontes que fundamentam a classificação.
3. Registrar a data de divulgação e a primeira correção pública verificável no escopo, com link para a release ou o commit correspondente. Distinguir aviso sem correção, aviso com data indeterminada e aviso fora do recorte.
4. Calcular o intervalo somente para casos com datas sustentadas por fontes. Informar quantos avisos entraram na média e aplicar o critério do roteiro conforme a evidência disponível.

### 3.1 Comandos executados

Pendente de coleta. O checkout inicial é raso. Se a verificação de ancestralidade exigir commits adicionais, obter o histórico necessário antes de interpretar a relação entre a correção e o SHA avaliado.

## 4. Evidências

### 4.1 Fontes

| Fonte prevista | Finalidade |
| --- | --- |
| [GitHub Security do Excalidraw](https://github.com/excalidraw/excalidraw/security/advisories) | Avisos publicados pelo projeto |
| [GitHub Advisory Database](https://github.com/advisories) | Avisos e correspondências entre identificadores |
| [National Vulnerability Database](https://nvd.nist.gov/vuln/search) | Consulta por CVE quando aplicável |
| [Releases do Excalidraw](https://github.com/excalidraw/excalidraw/releases) | Histórico oficial de disponibilização de correções |

### 4.2 Arquivos de apoio

Pendentes. Usar o padrão `S-M12_descricao_AAAA-MM-DD.ext` para arquivos de coleta.

### 4.3 Buscas sem resultado

Pendente. Registrar também consultas que retornarem lista vazia, com seus filtros e data.

## 5. Resultado

### 5.1 Dados brutos

Pendentes. Para cada aviso, registrar GHSA/CVE, aplicabilidade, divulgação, correção, intervalo e fontes.

### 5.2 Cálculo

Registrar o número de avisos aplicáveis. Para cada aviso com datas verificadas, calcular a diferença em dias entre a correção e a divulgação. Calcular a média pela soma dos intervalos dividida pelo número de avisos com intervalo verificável. Se o denominador for zero, registrar a média como indisponível e distinguir a situação da regra para ausência de advisories.

### 5.3 Pontuação

| Pontuação | Critério do [roteiro GQM](../../../docs/analise/roteiro.md) |
| --- | --- |
| 2 | Média de até 30 dias ou ausência de advisories |
| 1 | Média de 31 a 90 dias |
| 0 | Média acima de 90 dias ou ausência de correção |

**Pontuação atribuída** — Pendente de coleta.

## 6. Observações e limitações

- A cobertura depende das publicações e dos metadados das fontes consultadas. Uma busca sem registros descreve as fontes, os filtros e a data da consulta.
- A data de divulgação pública e a data da correção podem divergir da data do relato privado ou da implantação em produção. O intervalo será baseado nas datas verificáveis e terá a fonte registrada por aviso.

## 7. Achado

Pendente de pontuação.

## 8. Contribuição para a questão

A contribuição de S-M12 para S-Q6 será avaliada após a coleta.
