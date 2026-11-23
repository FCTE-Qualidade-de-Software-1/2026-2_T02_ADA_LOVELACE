# Oportunidades de melhoria e ação executada

As 16 métricas com nota 0 estão na tabela de
[oportunidades de melhoria](resultados.md#oportunidades-de-melhoria) dos
resultados. Esta página prioriza essas oportunidades, explica qual foi
executada e mostra o efeito medido.

## Priorização

Cada oportunidade foi classificada pelo impacto no propósito da avaliação, pelo
esforço da correção e pela possibilidade de medir o resultado com o mesmo
método da coleta.

| Prioridade | Métricas (nota 0) | Impacto | Esforço | Dá para medir o efeito agora? |
| :-: | --- | --- | --- | --- |
| **1** | [CI-M25](../resultados/capacidade-interacao/ci-m25.md) contraste e [CI-M22](../resultados/capacidade-interacao/ci-m22.md) violações da WCAG | Alto: O6 é o pior objetivo de Capacidade de interação (31,3%) e bloqueia a decisão de uso pedagógico; os textos apagados são justamente os que orientam quem está começando | Baixo: cores do tema e atributos de HTML | Sim, com o mesmo script da coleta |
| 2 | [CI-M18](../resultados/capacidade-interacao/ci-m18.md) mensagens de erro | Médio | Médio: reescrever 10 mensagens | Só com usuários (compreensão) |
| 3 | [CI-M24](../resultados/capacidade-interacao/ci-m24.md) leitor de tela | Alto | Alto: estrutura acessível paralela ao canvas | Sim, mas exige o desenvolvimento antes |
| 4 | [S-M1](../resultados/seguranca/s-m1.md), [S-M3](../resultados/seguranca/s-m3.md), [S-M4](../resultados/seguranca/s-m4.md), [S-M7](../resultados/seguranca/s-m7.md), [S-M8](../resultados/seguranca/s-m8.md), [S-M10](../resultados/seguranca/s-m10.md) | Alto para diagramas sensíveis | Alto: mudam o servidor de colaboração, autenticação e armazenamento | Não no prazo |
| 5 | [S-M11](../resultados/seguranca/s-m11.md), [S-M12](../resultados/seguranca/s-m12.md) dependências | Médio | Médio: atualizar pacotes e testar regressões; um aviso não tem correção publicada | Sim, com nova auditoria |
| 6 | [F-M7](../resultados/flexibilidade/f-m7.md), [CI-M14](../resultados/capacidade-interacao/ci-m14.md), [CI-M5](../resultados/capacidade-interacao/ci-m5.md), [CI-M17](../resultados/capacidade-interacao/ci-m17.md) | Médio | Alto (novas funções) ou exigem novas sessões com participantes | Não no prazo |

A prioridade 1 foi escolhida porque junta o maior efeito sobre o objetivo mais
fraco ao menor esforço, e porque o resultado pode ser medido de novo, com o
mesmo script e no mesmo ambiente, para comparar antes e depois.

## Ação executada: contraste e acessibilidade da interface

**Tipo:** modificação de código no Excalidraw (cópia em `aplicacao/`, a partir
do commit `e7b5346`).

**O que mudou** (registro completo e diff na
[evidência](https://github.com/FCTE-Qualidade-de-Software-1/2026-2_T02_ADA_LOVELACE/blob/main/evidencias/melhoria/acao-melhoria-acessibilidade.md)):

- **Contraste (CI-M25).** Os textos de apoio, as letras de atalho, a dica de
  navegação, os atalhos do menu e o botão do Excalidraw+ passaram a usar tons
  do próprio tema com pelo menos 4,5:1: `#5c5c5c` sobre branco no modo claro
  (6,7:1) e `#999999` sobre o fundo escuro (5,5:1 a 6,6:1). Os atalhos do menu
  deixaram de ser apagados com `opacity: 0.5`.
- **Zoom do navegador (CI-M22, V1).** O `<meta name="viewport">` deixou de
  bloquear o zoom (`maximum-scale=1` e `user-scalable=no`).
- **Nomes acessíveis (CI-M22, V2, V5 e V6).** O botão do menu ganhou nome
  ("Menu"), e o botão de zoom e os links do Discord e do X passaram a ter um
  nome que contém o texto visível.

**Como foi medido.** O build de produção foi gerado antes e depois das
mudanças, e o mesmo script da coleta original
(`scripts/ci_m22_m25_acessibilidade.cjs`, com axe-core e Lighthouse) foi rodado
nos dois, no mesmo computador e no mesmo dia. O "antes" reproduziu exatamente
as 19 combinações e as 6 violações registradas em 13/11.

## Resultado

| Métrica | Antes | Depois | Nota antes | Nota depois |
| --- | --- | --- | :-: | :-: |
| CI-M25 · contraste ≥ 4,5:1 | 8 de 19 combinações (42,1%) | 16 de 16 (100%) | 0 | **2** |
| CI-M22 · violações A e AA | 6 | 2 | 0 | **1** |
| Lighthouse, acessibilidade | 87/100 | 100/100 | — | — |

Com essas duas notas, a CI-Q9 passaria de 0,25 para 1,00 e o O6 de 31,3% para
50,0% (parcialmente atendido). A CI-M24 (leitor de tela) continua com nota 0,
e por isso o uso com leitor de tela segue não recomendado.

| | Modo claro | Modo escuro |
| --- | --- | --- |
| Antes | ![Tela inicial do Excalidraw no modo claro antes da correção: dica de navegação, atalhos e textos de boas-vindas em cinza claro](../assets/melhoria/contraste-antes-claro.png) | ![Tela inicial do Excalidraw no modo escuro antes da correção: textos de apoio em cinza médio sobre fundo escuro](../assets/melhoria/contraste-antes-escuro.png) |
| Depois | ![Tela inicial do Excalidraw no modo claro depois da correção: os mesmos textos em cinza escuro, legíveis](../assets/melhoria/contraste-depois-claro.png) | ![Tela inicial do Excalidraw no modo escuro depois da correção: textos de apoio em cinza claro, legíveis](../assets/melhoria/contraste-depois-escuro.png) |

*Telas iniciais nos modos claro e escuro, antes e depois da correção. Fonte:
script `ci_m22_m25_acessibilidade.cjs`, 22/11/2026.*

## Limitações

- As notas oficiais da avaliação continuam as do commit `e7b5346`. O "depois"
  mede uma cópia modificada, não uma versão publicada do Excalidraw.
- O recorte é o mesmo da coleta: tela inicial, seleção e menu, nos dois modos.
- Duas violações continuam: o gatilho do seletor de fonte (V3) e o papel do
  menu principal (V4), que exigem mudar a estrutura dos componentes.
- O zoom liberado não foi testado em aparelho real, e a mudança visual não foi
  avaliada com usuários.
- A correção ainda não foi proposta ao projeto Excalidraw. Ela pode ser enviada
  como contribuição, com o diff da evidência.
