# CI-M12 — Roteiro de execução dos cenários

> **Status:** cenários executados em 2026-11-14.
> Os resultados e as limitações da coleta estão registrados em
> `CI-M12_inconsistencias-interface.md`.

## 1. Onde estão os cenários

Os 11 casos estão em um quadro único aberto no Excalidraw local
(`http://localhost:3001`), dividido em três seções:

| Seção | Casos | Área da métrica |
| --- | --- | --- |
| **A · SELEÇÃO** | A1–A4 (I1–I4) | seleção |
| **B · SNAPPING** | B1–B3 (I5–I7) | snapping |
| **C · EDIÇÃO DE TEXTO** | C1–C4 (I8–I11) | edição de texto |

Cada caso tem **dois contextos equivalentes lado a lado** (por exemplo, “sem
texto” × “com texto”). As etiquetas com o ID do caso e as instruções curtas
ficam acima das formas; as legendas de cada contexto ficam logo abaixo dele.

O arquivo de apoio do quadro é
`CI-M12_cenarios_2026-11-14.excalidraw`. Se o quadro for apagado ou alterado,
importe esse arquivo para restaurar a versão original.

## 2. Regra de contagem (vale para todos os casos)

1. Execute **a mesma ação** nos dois contextos do caso.
2. Compare o comportamento observado, não a impressão.
3. **Repita o caso ao menos uma vez** para confirmar.
4. Só marque `Inconsistente? = sim` se a diferença for **observável e
   reproduzível** entre contextos equivalentes.
5. Registre o que foi feito e o que foi visto. Não presuma pelo código.
6. Capture evidência antes, durante ou depois da ação — o suficiente para
   outra pessoa conferir.

Se os dois contextos se comportarem igual, marque `não`. Diferenças de
posição, tamanho ou conteúdo entre os contextos são esperadas e não contam
como inconsistência; o que se compara é a **resposta à mesma ação**.

## 3. Mapa dos casos

| ID | Caso no quadro | Contextos comparados | Ação única |
| --- | --- | --- | --- |
| I1 | A1 — Clique simples | forma sem texto × forma com texto | clicar no centro da forma |
| I2 | A2 — Shift+clique | par sem texto × par com texto | clicar na 1ª e Shift+clicar na 2ª |
| I3 | A3 — Seleção por área | par sem texto × par com texto | arrastar da área vazia ao redor do par |
| I4 | A4 — Sobreposição | sobreposição sem texto × sobreposição com texto | clicar na interseção das formas |
| I5 | B1 — Conectar seta | seta → forma sem texto × seta → forma com texto | arrastar a ponta final da seta até a borda |
| I6 | B2 — Borda × centro | ponta na borda × ponta no centro | arrastar a ponta da seta até o alvo |
| I7 | B3 — Mover forma conectada | forma sem texto × forma com texto | arrastar a forma ~120 unidades à direita |
| I8 | C1 — Duplo clique | texto solto × texto dentro da forma | duplo clique, digitar e clicar fora |
| I9 | C2 — Tecla Enter | texto solto × texto dentro da forma | selecionar e pressionar Enter |
| I10 | C3 — Confirmar × cancelar | texto solto × texto dentro da forma | editar, cancelar com Escape; repetir confirmando com clique fora |
| I11 | C4 — Texto longo | texto solto × texto dentro da forma | colar texto de 2–3 linhas e sair da edição |

## 4. Procedimento por caso

### Seção A — Seleção

#### I1 · A1 — Clique simples

- **Ação:** clique uma vez no centro da forma sem texto; depois, no centro da
  forma com texto.
- **Esperado:** a forma é selecionada nos dois casos; o clique não entra em
  edição de texto nem seleciona apenas o texto.
- **Observe/registre:** qual elemento ficou selecionado (forma, texto ou
  nada), alças de seleção e cursor.
- **Evidência sugerida:** `CI-M12_I1-clique-simples_2026-11-14.png` (as duas
  seleções, uma após a outra).

#### I2 · A2 — Shift+clique

- **Ação:** clique na primeira forma e Shift+clique na segunda, no par sem
  texto; repita no par com texto.
- **Esperado:** as duas formas ficam selecionadas em ambos os pares, com o
  mesmo comportamento de adição/remoção da seleção.
- **Observe/registre:** quantidade de elementos selecionados, se o Shift
  adicionou ou substituiu a seleção, e se o texto interferiu.
- **Evidência sugerida:** `CI-M12_I2-shift-clique_2026-11-14.png`.

#### I3 · A3 — Seleção por área

- **Ação:** arraste de uma área vazia acima/à esquerda até envolver todo o
  par sem texto; repita no par com texto. Não comece o arraste sobre uma
  forma.
- **Esperado:** as duas formas são selecionadas nos dois pares, com o mesmo
  critério de inclusão.
- **Observe/registre:** quais elementos entraram na seleção, se o retângulo
  de seleção apareceu e se o texto bound foi incluído junto com a forma.
- **Evidência sugerida:** `CI-M12_I3-selecao-area_2026-11-14.png`.
- **Atenção:** esta é a única área do quadro sem legendas abaixo dos pares,
  para não interferir no arraste.

#### I4 · A4 — Sobreposição

- **Ação:** clique na região em que as duas formas se sobrepõem (a parte
  visível da forma de cima), no par sem texto; repita no par com texto.
- **Esperado:** a forma de cima é selecionada nos dois pares, sem selecionar
  a de baixo nem entrar em edição de texto.
- **Observe/registre:** qual forma foi selecionada e se o clique atravessou
  para a forma de baixo.
- **Evidência sugerida:** `CI-M12_I4-sobreposicao_2026-11-14.png`.

### Seção B — Snapping

#### I5 · B1 — Conectar seta

- **Ação:** arraste a ponta final da seta até a borda da forma sem texto;
  repita com a seta ao lado da forma com texto. Solte quando o ponto de
  conexão for destacado.
- **Esperado:** o ponto de conexão é reconhecido e a seta permanece presa à
  forma nos dois casos.
- **Observe/registre:** se o destaque de conexão apareceu, se a seta ficou
  ligada, e se o binding persistiu após soltar e clicar fora.
- **Evidência produzida:** `I5_conectar-seta_2026-11-14.png`.

#### I6 · B2 — Borda × centro

- **Ação:** na seta 1, arraste a ponta até a **borda esquerda** da forma; na
  seta 2, arraste a ponta até o **centro** da forma. Compare os dois alvos.
- **Esperado:** ambos os alvos são reconhecidos de forma coerente; o ponto de
  conexão e o comportamento de encaixe são previsíveis e equivalentes.
- **Observe/registre:** onde a seta encostou, se houve snap para borda ou
  centro, e se a seta ficou ligada nos dois casos.
- **Evidência sugerida:** `CI-M12_I6-borda-centro_2026-11-14.png`.

#### I7 · B3 — Mover forma conectada

- **Ação:** arraste cada forma (já conectada a uma seta) cerca de 120
  unidades para a direita. Depois, mova a ponta de cada seta e reconecte.
- **Esperado:** a seta continua conectada e acompanha a forma nos dois
  contextos; após reconectar, o binding se mantém.
- **Observe/registre:** se a seta acompanhou, se o ponto de conexão mudou de
  lado sozinho, se o binding quebrou e se o comportamento diferiu entre a
  forma simples e a com texto.
- **Evidência produzida:** `I7_mover-forma_2026-11-14.png`. O segundo
  contexto ficou incompleto e essa limitação está registrada no relatório.

### Seção C — Edição de texto

#### I8 · C1 — Duplo clique

- **Ação:** duplo clique no texto solto, digite uma alteração e clique fora;
  repita no texto dentro da forma.
- **Esperado:** o modo de edição entra e sai de forma equivalente; o cursor
  aparece no ponto do clique; a alteração é preservada ao sair.
- **Observe/registre:** como a edição foi iniciada, posição do cursor, se o
  texto foi preservado e se a forma mudou de tamanho.
- **Evidência sugerida:** `CI-M12_I8-duplo-clique_2026-11-14.png`.

#### I9 · C2 — Tecla Enter

- **Ação:** selecione o texto solto e pressione Enter; digite e saia.
  Repita com a forma que contém texto (selecione a forma e pressione Enter).
- **Esperado:** Enter inicia a edição nos dois contextos, com o mesmo modo de
  edição e a mesma forma de saída.
- **Observe/registre:** se Enter entrou em edição, qual elemento entrou em
  edição (texto ou forma) e como a edição terminou.
- **Evidência sugerida:** `CI-M12_I9-enter_2026-11-14.png`.

#### I10 · C3 — Confirmar × cancelar

- **Ação:** edite cada texto, digite uma alteração e pressione **Escape**
  (cancelar); confira o texto. Repita digitando outra alteração e
  **confirme com clique fora**.
- **Esperado:** Escape descarta a alteração e o clique fora a preserva, de
  forma igual nos dois contextos; a edição é encerrada corretamente.
- **Observe/registre:** texto exibido após cada saída, se a edição encerrou e
  se a forma voltou ao estado esperado.
- **Evidência sugerida:**
  `CI-M12_I10-escape-cancelar_2026-11-14.png` e
  `CI-M12_I10-clique-confirmar_2026-11-14.png`.

#### I11 · C4 — Texto longo

- **Ação:** edite o texto solto e cole um texto de 2–3 linhas; repita no texto
  da forma. Saia da edição.
- **Esperado:** a quebra de linha, o crescimento e a preservação do conteúdo
  são equivalentes nos dois contextos, e a forma acomoda o texto sem
  comportamento inesperado.
- **Observe/registre:** largura/altura antes e depois, número de linhas,
  se o texto transbordou e se o conteúdo permaneceu após sair.
- **Evidência sugerida:** `CI-M12_I11-texto-longo_2026-11-14.png`.

## 5. Evidências a produzir

Use o padrão exigido pelo guia:

```text
CI-M12_<descricao>_AAAA-MM-DD.ext
```

Sugestão de conjunto mínimo:

| ID | Arquivo sugerido | Mostra |
| --- | --- | --- |
| E1 | `CI-M12_quadro-cenarios_2026-11-14.png` | visão geral das três seções |
| E2 | `CI-M12_I1-a-I4_selecao_2026-11-14.png` | resultado das quatro comparações de seleção |
| E3 | `I5_conectar-seta_2026-11-14.png`, `I6_borda-centro_2026-11-14.png`, `I7_mover-forma_2026-11-14.png` | conexões e movimento |
| E4 | `CI-M12_I8-a-I11_texto_2026-11-14.png` | edições de texto |
| E5 | `CI-M12_planilha-observacoes_2026-11-14.csv` | tabela I1–I11 preenchida (opcional) |

Os prints podem ser recortes das duas metades do caso, mas devem deixar
visível o ID do caso e o resultado nos dois contextos.

## 6. Depois da execução

1. Preencha a tabela I1–I11 em `CI-M12_inconsistencias-interface.md`
   (a mesma tabela da seção 5.4 do guia).
2. Conte **apenas** as linhas com `Inconsistente? = sim`.
3. Compare o total com a regra:

   | Total de inconsistências | Pontuação |
   | --- | --- |
   | 0 | 2 |
   | 1 a 2 | 1 |
   | 3 ou mais | 0 |

4. Registre o ambiente real usado (sistema, navegador e versões), mesmo que
   difira do ambiente documentado no guia.
5. Anexe as evidências e os arquivos de apoio ao relatório e ao PR.

> Enquanto os testes não forem executados, nenhuma linha da tabela deve ser
> marcada como inconsistente e nenhuma pontuação deve ser atribuída.
