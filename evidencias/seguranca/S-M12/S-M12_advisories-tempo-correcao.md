# Evidência S-M12 — Advisories e tempo de correção

## 1. Identificação

| Campo | Valor |
| --- | --- |
| Métrica | S-M12 — Avisos de segurança e tempo médio de correção |
| Objetivo e questão | O2 — Identificação, responsabilização e riscos de segurança. S-Q6 — Resistência |
| Tarefa do plano | [Issue #61](https://github.com/FCTE-Qualidade-de-Software-1/2026-2_T02_ADA_LOVELACE/issues/61) |
| Responsável | Renato Araújo Gameiro |
| Data da coleta | 2026-11-08, UTC−03:00. Datas das fontes em UTC |
| Revisado por | Pendente de revisão por outro integrante |
| Versão | [`e7b534668a60add7f725531f3c9abf32508c7b4e`](https://github.com/excalidraw/excalidraw/commit/e7b534668a60add7f725531f3c9abf32508c7b4e) |
| Ambiente | Windows x64, PowerShell 7.6.9, Git 2.56.0.windows.2 e Python 3.12.10 para organizar o registro das consultas |

## 2. O que foi medido

Quantidade de avisos públicos aplicáveis à aplicação web Excalidraw no commit fixado e tempo médio entre divulgação e correção pública. A busca incluiu os avisos do repositório oficial e registros externos que nomeiam o Excalidraw. As vulnerabilidades exclusivamente de dependências de terceiros pertencem à S-M11. Quando um aviso do próprio projeto descreve o impacto de uma dependência na aplicação, a relação é registrada sem contar a origem como um segundo caso do Excalidraw.

## 3. Procedimento

1. Listar os advisories públicos do repositório oficial e consultar a GitHub Advisory Database para os pacotes `@excalidraw/excalidraw` e `@excalidraw/mermaid-to-excalidraw`. Na NVD, buscar pela palavra `excalidraw` e pelos CVEs conhecidos. Consultar o registro do emissor do CVE de importação para conferir versões e publicação.
2. Consolidar GHSA e CVE referentes ao mesmo problema. Separar registros retirados, produtos terceiros e casos históricos. Verificar a aplicabilidade pelas versões afetadas, pelo código e pelo histórico do SHA avaliado. O número `0.18.0` no manifesto do editor também aparece no checkout de outubro de 2026 e, isoladamente, não determina se ele equivale ao pacote estável distribuído com esse número.
3. Para cada caso, registrar a data de divulgação pública do aviso do produto. Para as correções históricas, distinguir data do commit, integração e disponibilização via npm ou release. Usar a data de publicação de uma correção pertinente e verificável para calcular o intervalo dos casos aplicáveis. Casos sem correção pública identificada ou com data indeterminada ficam fora da média e são informados separadamente.
4. Para o CVE de importação, procurar correções por identificador e pelo caminho de código, conferir os PRs encontrados, as duas páginas de releases do GitHub, os metadados do npm e o histórico até o `origin/master` consultado. Usar esse histórico como fonte sobre correções e manter o commit fixado como objeto da avaliação.

### 3.1 Comandos executados

O registro E1 contém URLs, filtros, horários, status HTTP, paginação e campos selecionados das 20 respostas públicas. Todas retornaram HTTP 200. Para repetir uma consulta, use o campo `url` de E1 com o seguinte comando PowerShell. O resultado corresponde ao estado das fontes na data da nova consulta.

```powershell
$headers = @{ 'User-Agent' = 'ADA-Lovelace-SM12' }
if ($url -like 'https://api.github.com/*') {
  $headers.Accept = 'application/vnd.github+json'
  $headers.'X-GitHub-Api-Version' = '2022-11-28'
}
Invoke-WebRequest -Uri $url -Headers $headers -SkipHttpErrorCheck
```

Verificações no checkout oficial. A primeira operação foi necessária porque o checkout inicial era raso. O `origin/master` observado era `701b901a0f1ba3d0b390d9cdf63d112e25abac4b`. E2 contém os resultados da inspeção e da ancestralidade.

```powershell
git fetch --unshallow --filter=blob:none --no-tags origin master:refs/remotes/origin/master
git rev-parse HEAD origin/master
git fetch --filter=blob:none --no-tags origin 'refs/tags/v0.16.4:refs/tags/v0.16.4' 'refs/tags/v0.17.6:refs/tags/v0.17.6' 'refs/tags/v0.18.1:refs/tags/v0.18.1'
git merge-base --is-ancestor 14bb42edee3d6fee6be264e3ee78670b3b9cee79 HEAD
git log --format='%H %cI %s' HEAD..origin/master -- packages/excalidraw/data/restore.ts packages/excalidraw/data/blob.ts packages/excalidraw/components/App.tsx
git log --format='%H %cI %s' -G 'generationData|srcDoc|allow-popups-to-escape-sandbox|customData' HEAD..origin/master -- packages/excalidraw/data/restore.ts packages/excalidraw/data/blob.ts packages/excalidraw/components/App.tsx
git grep -n -E 'base.customData|case "iframe"|restoreElements\(data.elements|isIframeElement\(el\)|el.customData\?\.generationData|srcDoc=|allow-popups-to-escape-sandbox' HEAD origin/master -- packages/excalidraw/components/App.tsx packages/excalidraw/data/restore.ts packages/excalidraw/data/blob.ts
git grep -n -E '^"?mermaid@|"@excalidraw/mermaid-to-excalidraw@3.0.0"|^pele@1.8.0' HEAD -- yarn.lock
```

## 4. Evidências

### 4.1 Trechos de código e histórico

| # | Evidência | O que mostra |
| --- | --- | --- |
| C1 | [`data/blob.ts:147–167`](https://github.com/excalidraw/excalidraw/blob/e7b534668a60add7f725531f3c9abf32508c7b4e/packages/excalidraw/data/blob.ts#L147-L167) e [`data/restore.ts:513–520`](https://github.com/excalidraw/excalidraw/blob/e7b534668a60add7f725531f3c9abf32508c7b4e/packages/excalidraw/data/restore.ts#L513-L520) | A importação de cena chama `restoreElements`. A restauração preserva `customData` e aceita o [tipo `iframe`](https://github.com/excalidraw/excalidraw/blob/e7b534668a60add7f725531f3c9abf32508c7b4e/packages/excalidraw/data/restore.ts#L739-L745). |
| C2 | [`App.tsx:1842–1859`](https://github.com/excalidraw/excalidraw/blob/e7b534668a60add7f725531f3c9abf32508c7b4e/packages/excalidraw/components/App.tsx#L1842-L1859) e [`App.tsx:2047–2068`](https://github.com/excalidraw/excalidraw/blob/e7b534668a60add7f725531f3c9abf32508c7b4e/packages/excalidraw/components/App.tsx#L2047-L2068) | O HTML vindo de `customData.generationData` segue para `srcDoc` em um iframe com sandbox que permite scripts e pop-ups. O caminho corresponde ao descrito no CVE de importação. |
| C3 | [`yarn.lock:1484–1491`](https://github.com/excalidraw/excalidraw/blob/e7b534668a60add7f725531f3c9abf32508c7b4e/yarn.lock#L1484-L1491), [PR #12480](https://github.com/excalidraw/excalidraw/pull/12480) e E2 | O conversor 3.0.0 usa Pele 1.8.0. O commit `14bb42ed`, integrado em 27/10/2026 e ancestral do SHA fixado, removeu o Mermaid do bundle conforme o PR oficial. |
| C4 | [`App.tsx:1847–1864` no master consultado](https://github.com/excalidraw/excalidraw/blob/701b901a0f1ba3d0b390d9cdf63d112e25abac4b/packages/excalidraw/components/App.tsx#L1847-L1864), [sandbox nessa revisão](https://github.com/excalidraw/excalidraw/blob/701b901a0f1ba3d0b390d9cdf63d112e25abac4b/packages/excalidraw/components/App.tsx#L2052-L2073) e E2 | O fluxo de HTML e as permissões relevantes também aparecem no master observado na coleta. |

### 4.2 Arquivos de apoio

| # | Arquivo | Conteúdo |
| --- | --- | --- |
| E1 | [S-M12_consultas_2026-11-08.json](S-M12_consultas_2026-11-08.json) | Registro das consultas e seleção de campos das respostas, incluindo identificação, versão, divulgação, publicação, estado de PR e paginação |
| E2 | [S-M12_historico_2026-11-08.txt](S-M12_historico_2026-11-08.txt) | Saídas selecionadas das verificações no histórico oficial, com SHAs, datas, caminhos e resultados de ancestralidade |

### 4.3 Buscas sem resultado

| O que se procurou | Onde | Resultado |
| --- | --- | --- |
| Referência exata a `CVE-2026-97224` em issues ou PRs | [Busca no repositório](https://github.com/excalidraw/excalidraw/issues?q=%22CVE-2026-97224%22) e `searchCve` em E1 | Zero resultados na API. A busca por `generationData` e `iframe` encontrou a issue #11930 e o PR #12191. A issue referencia o PR #12019. |
| Correção publicada para o fluxo de importação descrito no CVE | Advisory e registro do CVE, duas páginas de releases, npm, PRs relacionados e histórico dos arquivos entre o SHA fixado e o master consultado | Nenhuma correção pública identificada. Os PRs #12019 e #12191 estavam abertos, com `merged_at=null`. O código ainda preservava e encaminhava o HTML de `customData`. |
| Resolução do pacote `mermaid` no lockfile do commit fixado | `git grep` em `yarn.lock` e PR #12480 | A busca encontrou o conversor 3.0.0 e Pele 1.8.0. Não encontrou entrada para o pacote `mermaid`. |

## 5. Resultado

### 5.1 Dados brutos

Foram identificados **quatro casos públicos distintos do Excalidraw**. Três são históricos e não se aplicam ao SHA fixado. Um se aplica ao fluxo de importação pela correspondência estática com o código.

| Caso | Divulgação pública (UTC) | Correção pública verificável | Aplicabilidade ao commit fixado | Intervalo para a métrica |
| --- | --- | --- | --- | --- |
| [GHSA-v7v8-gjv7-ffmr](https://github.com/excalidraw/excalidraw/security/advisories/GHSA-v7v8-gjv7-ffmr) / [CVE-2023-26140](https://nvd.nist.gov/vuln/detail/CVE-2023-26140), sanitização de links | 2023-08-16, registro NVD e advisory do projeto | `0.15.3` no npm em 2023-08-16, após o [PR #6728](https://github.com/excalidraw/excalidraw/pull/6728), integrado em 2023-06-29. | Não aplicável. Faixa afetada `<0.15.3` e correção `b33fa6d6` ancestral do SHA fixado. | Fora do cálculo |
| [GHSA-m64q-4jqh-f72f](https://github.com/excalidraw/excalidraw/security/advisories/GHSA-m64q-4jqh-f72f) / [CVE-2024-32472](https://nvd.nist.gov/vuln/detail/CVE-2024-32472), XSS no componente de embed | 2024-04-17, advisory do projeto | `0.16.4` e `0.17.6` no npm em 2024-04-17. | Não aplicável. Faixas históricas 0.16.x e 0.17.x. As mudanças do [PR #7883](https://github.com/excalidraw/excalidraw/pull/7883), [PR #7884](https://github.com/excalidraw/excalidraw/pull/7884) e [PR #7889](https://github.com/excalidraw/excalidraw/pull/7889) já constam na ancestralidade. | Fora do cálculo |
| [GHSA-39h7-pwv7-rc3x](https://github.com/excalidraw/excalidraw/security/advisories/GHSA-39h7-pwv7-rc3x), conversão Mermaid | 2026-04-21 no repositório, replicado na base global em 2026-04-24. | Pacote estável `0.18.1` no npm em 2026-04-20 e [release GitHub](https://github.com/excalidraw/excalidraw/releases/tag/v0.18.1) em 2026-04-21. | Não aplicável. O `=0.18.0` do advisory se refere ao pacote afetado que usava Mermaid. O checkout fixado já incorpora o conversor `3.0.0` com Pele, conforme C3. | Fora do cálculo |
| [CVE-2026-97224](https://www.cve.org/CVERecord?id=CVE-2026-97224) / [GHSA-v2vq-3h6w-9r3c](https://github.com/advisories/GHSA-v2vq-3h6w-9r3c), HTML em cena importada | 2026-09-24, registro CNA publicado às 14:45:10.771 UTC. A NVD e a base do GitHub registraram o caso no mesmo dia. | Sem correção pública identificada em 2026-11-08. [PR #12019](https://github.com/excalidraw/excalidraw/pull/12019) e [PR #12191](https://api.github.com/repos/excalidraw/excalidraw/pulls/12191) estavam abertos. | Aplicável por inspeção estática do fluxo de importação, conforme C1 e C2. O CNA lista 0.18.0 e 0.18.1. O código fixado apresenta o fluxo descrito, que também aparece no master consultado. | Indisponível |

O [GHSA-fr9g-2m2h-c27j](https://github.com/advisories/GHSA-fr9g-2m2h-c27j) foi retirado por duplicar o aviso sobre sanitização de links. O [CVE-2026-30587](https://nvd.nist.gov/vuln/detail/CVE-2026-30587) cita o Excalidraw, mas o produto vulnerável no registro é o Seafile Server. O CVE-2025-54881 identifica a falha no Mermaid e aparece como referência causal no aviso do Excalidraw. A API do repositório o associa ao `GHSA-39h7-pwv7-rc3x`, enquanto o registro global do mesmo GHSA não atribui CVE próprio ao Excalidraw. Essa associação não gera outro caso do produto. [Advisory do Mermaid](https://github.com/advisories/GHSA-7rqq-prvp-x9jh) · [Registro global do Excalidraw](https://github.com/advisories/GHSA-39h7-pwv7-rc3x)

### 5.2 Cálculo

- Avisos públicos aplicáveis = **1**.
- Avisos aplicáveis com divulgação e correção verificáveis = **0**.
- Tempo médio = soma dos intervalos verificáveis ÷ número de intervalos verificáveis. Com denominador zero, **a média é indisponível**. Os três casos históricos ficam fora do denominador.

### 5.3 Pontuação

| Resultado | Critério do [roteiro GQM](../../../docs/analise/roteiro.md) | Pontuação |
| --- | --- | ---: |
| Um aviso aplicável sem correção pública identificada até 08/11/2026 nas fontes consultadas. Tempo médio indisponível. | 2 para média de até 30 dias ou ausência de advisories. 1 para 31 a 90 dias. 0 para média acima de 90 dias ou caso sem correção. | **0** |

A pontuação **0/2** aplica o critério de caso sem correção ao `CVE-2026-97224` pela **ausência de correção pública identificada até 08/11/2026 nas fontes consultadas**. A conclusão vale para o corte da coleta e para as fontes registradas em E1 e E2. O caso tem data de divulgação, e a média permanece indisponível porque nenhum intervalo de correção pôde ser verificado.

## 6. Observações e limitações

- Na coleta, a GitHub Advisory Database marcava o CVE-2026-97224 como não revisado e a NVD registrava `Awaiting Analysis`. O registro CNA e a leitura do código sustentam a correspondência com o fluxo descrito. O iframe é isolado por sandbox, e a análise estática não demonstra execução de código na origem da página principal nem exploração no serviço público. [Registro direto na NVD](https://nvd.nist.gov/vuln/detail/CVE-2026-97224)
- A issue #11930 descreve um caminho relacionado pela colaboração. Os PRs #12019 e #12191 tratam permissões ou validação de iframes. Foram usados como pistas de correção, sem contar a issue como outro advisory ou usar sua data como divulgação do CVE de importação.
- A classificação de correção cobre as fontes públicas registradas em E1 e o histórico consultado em E2. Ela não cobre correções privadas nem confirma a data de implantação do serviço.

## 7. Achado

| ID | Métrica | Evidência reproduzível | Pontuação | Impacto | Recomendação |
| --- | --- | --- | ---: | --- | --- |
| A-S-M12 | S-M12 | Conferir o CVE-2026-97224 em E1, seguir o fluxo de importação em C1 e C2 e comparar com o histórico público em C4 e E2 | 0 | Médio. A importação pode encaminhar HTML ao iframe com permissões de scripts e pop-ups. | Acompanhar a correção oficial e verificar, em instância local, se a importação de cenas passa a aplicar as restrições esperadas ao iframe. |

## 8. Contribuição para a questão

| Questão | Esta métrica indica que a hipótese foi | Por quê |
| --- | --- | --- |
| S-Q6 — Resistência | Parcial no recorte desta métrica | O histórico mostra correções publicadas para avisos anteriores, mas há um caso aplicável sem correção pública identificada no levantamento. |
