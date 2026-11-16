# Evidência F-M1 : Compatibilidade de navegadores

> Status: coleta concluída em 2026-11-14. Revisão por outro integrante pendente.

## 1. Identificação

| Campo | Valor |
| --- | --- |
| Métrica | F-M1 : Compatibilidade de navegadores |
| Questão (F-Q) | F-Q1 : Funciona em navegadores e sistemas diferentes? |
| Issue | #62 (parte da #18) |
| Tarefa do plano | F-M1, em [`tarefas-flexibilidade.md`](../tarefas-flexibilidade.md) |
| Responsável | Luís Felipe Parreira Cunha |
| Data(s) da coleta | 2026-11-14 |
| Ambiente | Excalidraw no commit `e7b5346`, servido em `http://localhost:3001`; macOS 27.2.1; Firefox 160.0; Microsoft Edge 157.0.4341.60; Safari 27.2; Chromium (Helium 0.21.3.1) |
| Revisado por | A revisar |

## 2. O que foi medido

Proporção de navegadores que concluem a lista fixa de 25 tarefas sem falha. O
denominador são os quatro navegadores previstos: Chrome, Firefox, Edge e Safari.

**Sem falha** significa que nenhuma tarefa exigiu recarregar a página, reiniciar
o navegador ou refazer a ação. Limitações gerais do Excalidraw e diferenças de
modal do sistema operacional não contam como falha do navegador: elas ficam na
[F-M3](../F-M3/F-M3_defeitos-ambiente_2026-11-14.md).

## 3. Procedimento

1. Na pasta `aplicacao/`, instalar as dependências e iniciar o servidor local.
2. Abrir `http://localhost:3001` em cada navegador.
3. Limpar a cena e executar as 25 tarefas na mesma ordem, conforme a seção 4 do
   [passo a passo](../passo-a-passo-f-m1-f-m2-f-m3.md).
4. Registrar cada tarefa como **passou**, **falhou** ou **não disponível**.
5. Gravar a sessão inteira e capturar prints das diferenças de comportamento.
6. Anotar problemas de renderização, fontes e atalhos para a F-M3.

Entre um navegador e outro, a cena foi limpa e o mesmo roteiro foi repetido. O
ambiente não foi reiniciado; apenas o navegador mudou.

### 3.1 Comandos executados

```bash
# 2026-11-14, pasta Projeto/aplicacao/
yarn install --frozen-lockfile
(cd excalidraw-app && yarn vite)
```

```text
Local: http://localhost:3001/
```

A saída completa do Vite não foi preservada. A aplicação abriu em
`localhost:3001` nas quatro sessões.

## 4. Evidências

### 4.1 Trechos de código

Não se aplica; medição executada funcionalmente no navegador.

### 4.2 Arquivos de apoio

Todos em `evidencias/flexibilidade/F-M1/`.

| # | Arquivo | Tipo | O que mostra |
| --- | --- | --- | --- |
| E1 | `Chrome 2026-11-14 at 17.27.01.mov` | vídeo (3:54) | Sessão no Chromium (Helium 0.21.3.1) |
| E2 | `Firefox 2026-11-14 at 17.12.51.mov` | vídeo (4:50) | Sessão no Firefox 160.0 |
| E3 | `Microsoft Edge 2026-11-14 at 17.19.05.mov` | vídeo (4:27) | Sessão no Microsoft Edge 157.0.4341.60 |
| E4 | `Safari 2026-11-14 at 17.02.47.mov` | vídeo (7:17) | Sessão no Safari 27.2 |
| E5 | `save board modal - Chrome.png` e `save image modal - Chrome.png` | prints | Modal do Excalidraw + diálogo nativo do Chromium ao salvar cena e imagem |
| E6 | `save board modal - Edge.png` e `save image modal - Edge.png` | prints | O mesmo fluxo no Edge |
| E7 | `bilbioteca info nova - Safari.png` | print | Mensagem geral de que imagens ainda não podem ser adicionadas à biblioteca |

### 4.3 Buscas sem resultado

| O que se procurou | Onde / comando | Resultado |
| --- | --- | --- |
| Google Chrome instalado | `ls /Applications` | Só Helium e Safari. O Google Chrome não estava instalado; o Helium 0.21.3.1 foi usado como representante do motor Chromium |

## 5. Resultado

### 5.1 Dados brutos

| Navegador | Versão | Sistema | Tarefas concluídas | Falhas que exigiram recarga | Resultado |
| --- | --- | --- | :-: | --- | --- |
| Chromium (Helium) | 0.21.3.1 | macOS 27.2.1 | 25 de 25 | Nenhuma | Sem falhas |
| Firefox | 160.0 | macOS 27.2.1 | 25 de 25 | Nenhuma | Sem falhas |
| Microsoft Edge | 157.0.4341.60 | macOS 27.2.1 | 25 de 25 | Nenhuma | Sem falhas |
| Safari | 27.2 | macOS 27.2.1 | 25 de 25 | Nenhuma | Sem falhas |

Detalhe por tarefa. **P** = passou; a observação da tarefa que gerou achado
transversal está na F-M3.

| # | Tarefa | Chromium | Firefox | Edge | Safari |
| :-: | --- | :-: | :-: | :-: | :-: |
| 1 | Criar retângulo, losango e elipse | P | P | P | P |
| 2 | Criar seta ligada a duas formas | P | P | P | P |
| 3 | Inserir texto em uma forma | P | P | P | P |
| 4 | Fazer desenho livre | P | P | P | P |
| 5 | Alterar cor do traço e do fundo | P | P | P | P |
| 6 | Selecionar e mover um elemento | P | P | P | P |
| 7 | Redimensionar um elemento | P | P | P | P |
| 8 | Selecionar vários elementos | P | P | P | P |
| 9 | Agrupar a seleção | P | P | P | P |
| 10 | Desfazer e refazer | P | P | P | P |
| 11 | Duplicar e excluir | P | P | P | P |
| 12 | Usar o menu de contexto | P | P | P | P |
| 13 | Usar a borracha | P | P | P | P |
| 14 | Aplicar zoom | P | P | P | P |
| 15 | Mover a tela | P | P | P | P |
| 16 | Salvar um arquivo `.excalidraw` | P | P | P | P |
| 17 | Abrir um arquivo `.excalidraw` | P | P | P | P |
| 18 | Exportar uma imagem PNG | P | P | P | P |
| 19 | Inserir uma imagem | P | P | P | P |
| 20 | Adicionar e reutilizar um item da biblioteca | P | P | P | P |
| 21 | Alternar o tema claro/escuro | P | P | P | P |
| 22 | Trocar o idioma | P | P | P | P |
| 23 | Converter Mermaid em diagrama | P | P | P | P |
| 24 | Trocar a fonte do texto | P | P | P | P |
| 25 | Ativar a trava de ferramenta | P | P | P | P |

### 5.2 Cálculo

```text
navegadores sem falhas ÷ navegadores testados = 4 ÷ 4 = 100%
```

### 5.3 Pontuação

| Valor medido | Regra da métrica | Pontuação (0–2) |
| --- | --- | --- |
| 100% | 2 = ≥ 75%; 1 = 50% a 74%; 0 = < 50% | **2** |

**Justificativa:** os quatro ambientes de navegador concluíram as 25 tarefas sem
interrupção que exigisse recarga ou refazer a ação. As diferenças observadas no
salvamento são de plataforma, não de compatibilidade do editor.

## 6. Observações e limitações

- **Chrome:** o Google Chrome não estava instalado. O Helium 0.21.3.1, baseado
  em Chromium, foi usado como representante do motor. Os arquivos e prints
  mantiveram o nome “Chrome” porque foi assim que a coleta foi rotulada.
- **Versões:** Firefox 160.0, Microsoft Edge 157.0.4341.60, Safari 27.2 e
  macOS 27.2.1 estão identificados.
- **Escopo:** só a instância local, sem colaboração, backend ou serviços
  externos. O comportamento em produção pode variar.
- **Salvamento:** no Chromium/Edge, o Excalidraw mostra o modal “Salvar como…” e
  o navegador abre o diálogo nativo em seguida. Os prints estão em E5 e E6. Essa
  diferença de fluxo é tratada como observação na F-M3.
- **Biblioteca:** a mensagem “Support for adding images to the library coming
  soon!” (E7) é uma limitação geral do Excalidraw, não um defeito do Safari. A
  tarefa 20 foi concluída com um item comum da biblioteca.

## 7. Achado

Não se aplica: a pontuação foi 2.

## 8. Contribuição para a questão

| Questão | Esta métrica indica que a hipótese foi | Por quê |
| --- | --- | --- |
| F-Q1 | confirmada, com ressalva | Os quatro ambientes de navegador concluíram as 25 tarefas sem falhas. A ressalva é que o Chrome foi representado pelo Helium (Chromium), não pelo Chrome proprietário. |
