# Evidência CI-M12: inconsistências da interface

## 1. Identificação

| Campo | Valor |
| --- | --- |
| Métrica | CI-M12: inconsistências da interface |
| Questão (CI-Q) | CI-Q5: interface consistente e previsível |
| Tarefa do plano | Registrar inconsistências de seleção, snapping e edição de texto |
| Responsável | Luís Felipe Parreira Cunha (`cunha-luiss`) |
| Data da coleta | 2026-11-14 |
| Revisado por | Pendente |
| Ambiente | macOS 27.2.1; Safari 27.2; Node 24.19.0; Vite 5.0.12; aplicação 0.18.0 |
| Versão avaliada | Commit indicado no guia: `e7b5346` |

## 2. O que foi medido

Foram comparados onze casos equivalentes em três áreas: seleção, snapping e
edição de texto. Uma inconsistência só foi contada quando a diferença era
observável e reproduzível entre os dois contextos do caso.

## 3. Procedimento

1. Restaurei o quadro de cenários e executei a mesma ação nos dois contextos
   de cada caso.
2. Comparei seleção simples, Shift+clique, seleção por área e sobreposição.
3. Comparei conexão de setas, encaixe na borda/centro e movimento de forma
   conectada.
4. Comparei duplo clique, Enter, Escape, confirmação por clique fora e texto
   longo.
5. Repeti a observação dos estados finais nas gravações e marquei como
   inconsistente somente uma diferença reproduzível.

### 3.1 Comandos executados

Não houve comando de coleta: o resultado foi obtido por inspeção visual das
gravações e dos prints.

## 4. Evidências

### 4.1 Trechos de código

Não aplicável: esta é uma comparação funcional da interface.

### 4.2 Arquivos de apoio

Os vídeos abaixo são as evidências principais da comparação. Substitua apenas
o valor de `src` em cada bloco pelo link do vídeo correspondente.

#### E13 · Vídeo de seleção

<video controls width="100%" src="https://youtu.be/9gzApPJQU-A">
  Seu navegador não suporta a reprodução de vídeo.
</video>

Abrange I1–I4: clique simples, Shift+clique, seleção por área e sobreposição.

#### E14 · Vídeo de snapping

<video controls width="100%" src="https://youtu.be/MgK9QpfUqPQ">
  Seu navegador não suporta a reprodução de vídeo.
</video>

Abrange I5–I7: conexão de setas, borda × centro e movimento da forma
conectada.

#### E15 · Vídeo de edição de texto

<video controls width="100%" src="https://youtu.be/qHcJAX3MtEg">
  Seu navegador não suporta a reprodução de vídeo.
</video>

Abrange I8–I11: duplo clique, Enter, confirmação/cancelamento e texto longo.

Os prints abaixo permanecem como arquivos de apoio e referência visual:

| # | Arquivo | O que mostra |
| --- | --- | --- |
| E1 | [quadro-cenarios_2026-11-14.png](quadro-cenarios_2026-11-14.png) | Quadro geral dos casos |
| E2 | [I1_sem-texto_2026-11-14.png](I1_sem-texto_2026-11-14.png) / [I1_com-texto_2026-11-14.png](I1_com-texto_2026-11-14.png) | Clique simples |
| E3 | [I2_sem-texto_2026-11-14.png](I2_sem-texto_2026-11-14.png) / [I2_com-texto_2026-11-14.png](I2_com-texto_2026-11-14.png) | Shift+clique |
| E4 | [I3_sem-texto_2026-11-14.png](I3_sem-texto_2026-11-14.png) / [I3_com-texto_2026-11-14.png](I3_com-texto_2026-11-14.png) | Seleção por área |
| E5 | [I4_sem-texto_2026-11-14.png](I4_sem-texto_2026-11-14.png) / [I4_com-texto_2026-11-14.png](I4_com-texto_2026-11-14.png) | Sobreposição |
| E6 | [I5_conectar-seta_2026-11-14.png](I5_conectar-seta_2026-11-14.png) | Conexão de setas |
| E7 | [I6_borda-centro_2026-11-14.png](I6_borda-centro_2026-11-14.png) | Snapping na borda e no centro |
| E8 | [I7_mover-forma_2026-11-14.png](I7_mover-forma_2026-11-14.png) | Movimento da forma conectada |
| E9 | [I8_duplo-clique_2026-11-14.png](I8_duplo-clique_2026-11-14.png) | Edição por duplo clique |
| E10 | [I9_enter_2026-11-14.png](I9_enter_2026-11-14.png) | Entrada por Enter |
| E11 | [I10_escape_2026-11-14.png](I10_escape_2026-11-14.png) / [I10_confirmar_2026-11-14.png](I10_confirmar_2026-11-14.png) | Cancelamento e confirmação |
| E12 | [I11_texto-longo_2026-11-14.png](I11_texto-longo_2026-11-14.png) | Texto longo |

## 5. Resultado

### 5.1 Dados brutos

| ID | Área | Contextos comparados | Resultado esperado | Resultado observado | Inconsistente? | Evidência |
| --- | --- | --- | --- | --- | --- | --- |
| I1 | seleção | forma sem texto × forma com texto | Selecionar a forma | A forma foi selecionada nos dois casos | não | E13 |
| I2 | seleção | par sem texto × par com texto | Shift adicionar a segunda forma | As duas formas foram selecionadas nos dois casos | não | E13 |
| I3 | seleção | par sem texto × par com texto | Seleção por área incluir o par | O par foi selecionado nos dois casos | não | E13 |
| I4 | seleção | sobreposição sem texto × com texto | Selecionar a forma de cima | A forma de cima foi selecionada nos dois casos | não | E13 |
| I5 | snapping | seta para forma sem texto × com texto | Ponta reconhecer e manter a conexão | As duas setas encostaram e permaneceram conectadas | não | E14 |
| I6 | snapping | ponta na borda × ponta no centro | Reconhecer ambos os alvos | Os dois alvos foram reconhecidos visualmente | não | E14 |
| I7 | snapping | forma sem texto × forma com texto | Seta acompanhar a forma | A seta acompanhou a forma nos dois contextos; após a movimentação e a reconexão, o binding permaneceu | não | E14 |
| I8 | texto | texto solto × texto dentro da forma | Entrar/sair da edição e preservar texto | Ambos preservaram a alteração | não | E15 |
| I9 | texto | texto solto × texto dentro da forma | Enter iniciar edição | Enter iniciou a edição nos dois casos | não | E15 |
| I10 | texto | Escape × clique fora, nos dois contextos | Cancelar/confirmar de modo equivalente | Escape e clique fora tiveram o mesmo comportamento nos dois contextos | não | E15 |
| I11 | texto | texto longo solto × dentro da forma | Preservar e refluír o texto | O conteúdo foi preservado; cada contêiner refluíu conforme seu layout | não | E15 |

### 5.2 Cálculo

```text
inconsistências observáveis e reproduzíveis = 0
```

### 5.3 Pontuação

| Valor medido | Regra da métrica | Pontuação |
| ---: | --- | ---: |
| 0 | 2 = 0; 1 = 1–2; 0 = 3 ou mais | 2 |

**Justificativa:** os onze casos foram executados nos dois contextos e
repetidos. Nenhum apresentou diferença observável e reproduzível que pudesse
ser contabilizada como inconsistência.

## 6. Observações e limitações

- Em I10, Escape preservou a alteração nos dois contextos. Isso pode ser uma
  questão de comportamento esperado, mas não é uma inconsistência entre os
  contextos e, por isso, não foi contado.
- Em I11, texto solto e texto dentro de forma têm contêineres diferentes; a
  quebra e o crescimento observados foram tratados como diferenças de layout,
  não como inconsistência.
- As repetições dos casos foram realizadas; os três vídeos serão usados como
  evidência principal, e os prints permanecem como apoio.

## 7. Achado

Não se aplica: a pontuação não foi 0.

## 8. Contribuição para a questão

| Questão | Esta métrica indica que a hipótese foi | Por quê |
| --- | --- | --- |
| CI-Q5 | Refutada | A hipótese previa parcialmente que seleção, snapping e edição de texto poderiam mudar conforme o contexto. Os onze casos, repetidos nos dois contextos, não mostraram inconsistências reproduzíveis; o resultado foi melhor e oposto ao previsto. |
