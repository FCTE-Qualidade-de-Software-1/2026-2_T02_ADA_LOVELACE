# Evidência F-M3 : Defeitos específicos de ambiente

> Status: coleta concluída em 2026-11-14. Revisão por outro integrante pendente.

## 1. Identificação

| Campo | Valor |
| --- | --- |
| Métrica | F-M3 : Defeitos específicos de ambiente |
| Questão (F-Q) | F-Q1 : Funciona em navegadores e sistemas diferentes? |
| Issue | #62 (parte da #18) |
| Tarefa do plano | F-M3, em [`tarefas-flexibilidade.md`](../tarefas-flexibilidade.md) |
| Responsável | Luís Felipe Parreira Cunha |
| Data(s) da coleta | 2026-11-14 |
| Ambiente | Excalidraw no commit `e7b5346`; macOS 27.2.1, Windows 11, Android 10, iPadOS 27.2 e iOS 27.2.1; Firefox 160.0, Edge 157.0.4341.60 e Safari 27.2 (desktop e móvel) |
| Revisado por | A revisar |

## 2. O que foi medido

Contagem de defeitos que aparecem em **um ambiente e não em outro**, nas
categorias de renderização do canvas, fontes e atalhos, observados durante as 25
tarefas das F-M1 e F-M2.

Um defeito entra na contagem quando:

1. acontece em pelo menos um ambiente;
2. não acontece em pelo menos um dos outros ambientes testados;
3. é reproduzível ou está registrado em vídeo/print com passos claros.

Defeitos que aparecem em **todos** os ambientes são registrados como achados
transversais, mas não entram nesta contagem. Diferenças esperadas de modal do
sistema operacional também não são defeitos.

## 3. Procedimento

1. Executar as 25 tarefas em cada ambiente, como nas F-M1 e F-M2.
2. Quando algo diferente acontecer, repetir a ação e registrar:
   - ambiente;
   - passos para reproduzir;
   - comportamento esperado;
   - comportamento observado;
   - print ou vídeo;
   - impacto;
   - recomendação.
3. Classificar o defeito em renderização, fonte ou atalho.
4. Verificar se o mesmo defeito acontece nos outros ambientes.
5. Contar só os que são específicos de ambiente.

O roteiro completo está na seção 7 do
[passo a passo](../passo-a-passo-f-m1-f-m2-f-m3.md).

### 3.1 Comandos executados

Não houve comando adicional. A mesma instância local das F-M1 e F-M2 foi usada:
`http://localhost:3001` no desktop e `http://192.168.0.8:3001` nos dispositivos.

## 4. Evidências

### 4.1 Trechos de código

| # | Arquivo:linha | O que mostra |
| --- | --- | --- |
| C1 | `aplicacao/packages/element/src/comparisons.ts:3-15` | `hasBackground` inclui `freedraw`; por isso o controle de fundo aparece para desenho livre |
| C2 | `aplicacao/packages/excalidraw/components/shapeActionPredicates.ts:64-79` | O painel mostra o controle de fundo quando a ferramenta ou a seleção tem fundo |
| C3 | `aplicacao/packages/element/src/shape.ts:1040-1045` | O preenchimento do desenho livre só é gerado se `isPathALoop(element.points)` for verdadeiro; em traço aberto, o fundo não tem efeito |
| C4 | `aplicacao/packages/excalidraw/actions/actionClipboard.tsx:63-79` | Em Firefox, a falha de leitura do clipboard gera a mensagem sobre `dom.events.asyncClipboard.clipboardItem` |
| C5 | `aplicacao/packages/excalidraw/data/index.ts:207-219` | A exportação para o clipboard em Firefox também cai na mesma mensagem quando o `ClipboardItem` não existe |
| C6 | `aplicacao/packages/excalidraw/actions/actionAddToLibrary.ts:26` e `locales/en.json:319-323` | Imagens não podem ser adicionadas à biblioteca; a mensagem “coming soon” é uma limitação geral do app |

```ts
// C1: aplicacao/packages/element/src/comparisons.ts:3-15
export const hasBackground = (type: ElementOrToolType) =>
  type === "rectangle" ||
  type === "stickynote" ||
  type === "iframe" ||
  type === "embeddable" ||
  type === "ellipse" ||
  type === "diamond" ||
  type === "line" ||
  type === "freedraw" ||
  type === "autoshape" ||
  type === "bucketfill";
```

```ts
// C3: aplicacao/packages/element/src/shape.ts:1035-1045
case "freedraw": {
  // oredered in terms of z-index [background, stroke]
  const shapes: ElementShapes[typeof element.type] = [];

  // (1) background fill (rc shape), optional
  if (isPathALoop(element.points)) {
    // generate rough polygon to fill freedraw shape
    shapes.push(
      generator.curve(getFreedrawFillCurvePoints(element), {
        ...generateRoughOptions(element, false, isDarkMode),
        stroke: "none",
      }),
    );
  }
```

### 4.2 Arquivos de apoio

Todos em `evidencias/flexibilidade/`.

| # | Arquivo | Tipo | O que mostra |
| --- | --- | --- | --- |
| E1 | `F-M3/background bug - Chrome.png` | print | Fundo selecionado no painel; desenho livre continua sem preenchimento (Chromium/Helium) |
| E2 | `F-M3/background bug - Edge.png` | print | O mesmo no Edge |
| E3 | `F-M3/background bug - Safari.png` | print | O mesmo no Safari |
| E4 | `F-M3/backgroud bug - iPad.PNG` | print | O mesmo no iPad com iPadOS 27.2 |
| E5 | `F-M3/background bug - iPhone.PNG` | print | O mesmo no iPhone com iOS 27.2.1 |
| E6 | `F-M3/background bug -Android.png` | print | O mesmo no Android |
| E7 | `F-M3/background bug - Firefox.png` | print | O desenho livre no Firefox; o painel não aparece no enquadramento, mas o comportamento foi o mesmo |
| E8 | `F-M2/F-M2_android_2026-11-14.mp4` | vídeo | Erro de clipboard em 1:20 e interrupção da sessão; sistema Android 10 com Firefox 160.0 (o nome original do arquivo dizia “Android 14”) |
| E9 | `F-M2/iPad2 11-14-2026 17-44-14_1.mp4` | vídeo | Sessão no iPad com iPadOS 27.2 e Safari 27.2 em que o scroll falhou; o gesto não aparece na gravação |
| E10 | `F-M1/save board modal - Chrome.png` e `F-M1/save image modal - Chrome.png` | prints | Modal “Salvar como…” + diálogo nativo do Chromium |
| E11 | `F-M1/save board modal - Edge.png` e `F-M1/save image modal - Edge.png` | prints | O mesmo no Edge |
| E12 | `F-M2/save board modal - iPad.PNG` e `F-M2/save image modal - iPad.PNG` | prints | Modal do Excalidraw + prompt de download do Safari 27.2 no iPadOS 27.2 |
| E13 | `F-M2/save board modal - iPhone.PNG` e `F-M2/save image modal - iPhone.PNG` | prints | O mesmo no iOS 27.2.1 |
| E14 | `F-M2/save board - Andoird.png` e `F-M2/save image - Android.png` | prints | Modal do Excalidraw + diálogo “Download file?” do Android |
| E15 | `F-M1/bilbioteca info nova - Safari.png` | print | Mensagem “Support for adding images to the library coming soon!” |

### 4.3 Buscas sem resultado

| O que se procurou | Onde / comando | Resultado |
| --- | --- | --- |
| Defeito de fonte durante as 25 tarefas | Vídeos das F-M1 e F-M2 | Nenhuma fonte trocada, cortada ou com caractere quebrado |
| Defeito de atalho de teclado no desktop | Vídeos das F-M1 | Nenhum atalho falhou; o problema de clipboard apareceu no Firefox Android, não no desktop |
| Defeito de renderização no Chromium, Firefox, Edge ou Safari desktop | Vídeos das F-M1 | Nenhum além das diferenças de modal de salvamento, que não são defeito |

## 5. Resultado

### 5.1 Dados brutos

| ID | Ambiente | Categoria | Esperado | Observado | Evidência | Entra na contagem? |
| --- | --- | --- | --- | --- | --- | :-: |
| D1 | iPadOS 27.2 + Safari 27.2 | Renderização / interação (scroll) | O canvas rola e permite chegar a qualquer parte do desenho | A tela não rolava; só voltou ao normal depois de recarregar o site | E9 e relato do avaliador | **Sim** |
| D2 | Android 10 + Firefox 160.0 | Atalho / clipboard | Copiar, colar ou exportar para o clipboard funciona, ou falha com aviso sem perder a cena | Diálogo de erro sobre `dom.events.asyncClipboard.clipboardItem`; a sessão foi interrompida e parte da adição foi refeita | E8; C4 e C5 | **Sim** |
| D3 | Todos (Chromium, Edge, Safari, iPad, iPhone, Android; Firefox observado) | Renderização / UI | O fundo do desenho livre muda de cor, ou o controle não aparece quando não se aplica | O controle aparece, mas o traço aberto continua sem preenchimento | E1 a E7; C1 a C3 | Não: é transversal |
| D4 | Todos (capturado no Safari) | Biblioteca | Adicionar uma imagem à biblioteca | “Support for adding images to the library coming soon!” | E15; C6 | Não: é limitação geral |
| D5 | Desktop e mobile | Fluxo de salvamento | Salvar a cena ou a imagem | Alguns ambientes mostram uma tela extra do Excalidraw e depois o diálogo do sistema; outros mostram só o diálogo do sistema | E10 a E14 | Não: é diferença de plataforma |
| D6 | Android 10, iPadOS 27.2 e iOS 27.2.1 | Funcionalidade / UI | O menu oferece a trava de ferramenta | A opção não existe nesses dispositivos; a tarefa 25 da F-M2 foi registrada como não disponível | F-M2, seção 5.1, tarefa 25 | Não: é ausência de função no mobile, fora das categorias da métrica |

### 5.2 Cálculo

```text
defeitos específicos de ambiente = 2 (D1 e D2)
2 defeitos → faixa de 1 a 3 → pontuação 1
```

### 5.3 Pontuação

| Valor medido | Regra da métrica | Pontuação (0–2) |
| --- | --- | --- |
| 2 defeitos específicos | 2 = 0 defeitos; 1 = 1 a 3 defeitos; 0 = ≥ 4 defeitos | **1** |

**Justificativa:** foram encontrados dois defeitos que aparecem em um ambiente
e não nos outros: o scroll do iPad e o erro de clipboard no Firefox Android. O
controle de fundo do desenho livre, o modal extra de salvamento e a ausência da
trava de ferramenta no mobile foram registrados, mas não são defeitos de
renderização, fonte ou atalho específicos de ambiente; por isso não entram na
contagem.

### 5.4 Observação sobre o “background bug”

O controle de fundo aparece para desenho livre porque `hasBackground` inclui
`freedraw` (C1) e o painel usa esse predicado (C2). O desenho só recebe
preenchimento quando o traço forma um laço fechado, isto é, quando
`isPathALoop(element.points)` é verdadeiro (C3). Nos desenhos abertos usados na
coleta, o fundo escolhido não teve efeito visível.

Isso aconteceu em todos os ambientes, então **não é um defeito específico de
ambiente**. A recomendação é esconder ou desabilitar o controle de fundo para
desenho livre aberto, ou explicar que o preenchimento só vale para laços
fechados.

### 5.5 Observação sobre as telas de salvamento

O modal extra não é um defeito: é o caminho que cada plataforma oferece para
entregar o arquivo ao sistema.

| Ambiente | Tela do Excalidraw | Tela do sistema | Captura |
| --- | --- | --- | --- |
| Chromium (Helium) | “Salvar como…” / “Exportar imagem” | Diálogo nativo “Warning: this site can see edits you make” | E10 |
| Microsoft Edge | “Salvar como…” / “Exportar imagem” | O mesmo diálogo nativo | E11 |
| iPadOS 27.2 + Safari 27.2 | “Salvar como…” / “Exportar imagem” | Prompt “Do you want to download … on 192.168.0.8?” | E12 |
| iOS 27.2.1 + Safari 27.2 | “Salvar como…” / “Exportar imagem” | O mesmo prompt | E13 |
| Android 10 + Firefox 160.0 | “Salvar como…” / “Exportar imagem” | “Download file?” com nome e pasta | E14 |

### 5.6 Observação sobre a trava de ferramenta

A tarefa 25 da lista fixa (ativar a trava de ferramenta) existe no desktop, mas
não existe no Android 10, no iPadOS 27.2 e no iOS 27.2.1. Na F-M2, ela foi
registrada como **não disponível**, não como falha. Como não é um defeito de
renderização, fonte ou atalho, também não entra na contagem da F-M3. A
recomendação é expor a função no menu móvel ou documentar a ausência.

## 6. Observações e limitações

- **iPad:** o defeito de scroll é um relato do avaliador. O vídeo mostra a
  sessão, mas não o gesto; não há um timestamp isolado da falha. O refresh que
  corrigiu o problema também não foi cronometrado.
- **Android 10:** o avaliador relatou “crash”. O vídeo mostra um diálogo de erro
  do Excalidraw, não uma tela de crash do sistema. A causa provável é a ausência
  da flag de clipboard no Firefox 160.0 (C4 e C5). O impacto real foi a
  interrupção da gravação e o retrabalho da cena. O arquivo de vídeo está
  nomeado “Android 14”, mas o sistema registrado é Android 10.
- **Firefox:** o print do background bug não mostra o painel aberto. O
  comportamento foi observado na sessão, mas a evidência visual é mais fraca
  nesse ambiente.
- **Versões:** Firefox 160.0, Edge 157.0.4341.60, Safari 27.2 (desktop e móvel),
  macOS 27.2.1, iPadOS 27.2 e iOS 27.2.1 estão identificados.
- **Categorias:** não houve defeito de fonte nem de atalho no desktop. O caso do
  Android é uma falha de clipboard, não de atalho de teclado. A ausência da
  trava de ferramenta no mobile é diferença de funcionalidade, não de
  renderização, fonte ou atalho; por isso também não entra na contagem.
- **Escopo:** instância local, sem colaboração, backend ou serviços externos.
- **Revisão:** a contagem e a classificação de D3, D4 e D5 como “fora da
  contagem” ainda precisam ser confirmadas por outro integrante.

## 7. Achado

Não se aplica: a pontuação foi 1.

## 8. Contribuição para a questão

| Questão | Esta métrica indica que a hipótese foi | Por quê |
| --- | --- | --- |
| F-Q1 | parcial | O editor funciona nos ambientes testados, mas há dois defeitos específicos: o scroll do iPad e o clipboard do Firefox Android. |
