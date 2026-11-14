# Evidência F-M2 : Compatibilidade de sistemas operacionais

> Status: coleta concluída em 2026-11-14. Revisão por outro integrante pendente.

## 1. Identificação

| Campo | Valor |
| --- | --- |
| Métrica | F-M2 : Compatibilidade de sistemas operacionais |
| Questão (F-Q) | F-Q1 : Funciona em navegadores e sistemas diferentes? |
| Issue | #62 (parte da #18) |
| Tarefa do plano | F-M2, em [`tarefas-flexibilidade.md`](../tarefas-flexibilidade.md) |
| Responsável | Luís Felipe Parreira Cunha |
| Data(s) da coleta | 2026-11-14 |
| Ambiente | Excalidraw no commit `e7b5346`; servidor local em `http://localhost:3001` e acesso remoto em `http://192.168.0.8:3001`; Windows 11 com Edge 157.0.4341.60; macOS 27.2.1 com Safari 27.2; Android 10 com Firefox 160.0; iPadOS 27.2 e iOS 27.2.1 com Safari móvel 27.2 |
| Revisado por | A revisar |

## 2. O que foi medido

Proporção de sistemas operacionais que concluem a lista fixa de 25 tarefas sem
falha. O denominador são os sistemas disponíveis: Windows, macOS, Android 10 e iOS.
O Linux não estava disponível e não entrou na contagem.

**Sem falha** significa que nenhuma tarefa exigiu recarregar a página, reiniciar
o navegador ou refazer a ação. Todos os sistemas concluíram as tarefas
disponíveis; no Android 10 e no iPadOS/iOS, a tarefa 25 (trava de ferramenta)
não existe e foi registrada como não disponível. A diferença está nas
interrupções que obrigaram a recarregar e refazer parte do trabalho.

## 3. Procedimento

1. Iniciar o servidor local na pasta `aplicacao/` (comandos em 3.1).
2. No desktop, abrir `http://localhost:3001`; no celular e no tablet, abrir
   `http://192.168.0.8:3001` na mesma rede Wi-Fi.
3. Em cada sistema, limpar a cena e executar as 25 tarefas na mesma ordem,
   conforme a seção 4 do [passo a passo](../passo-a-passo-f-m1-f-m2-f-m3.md).
4. Registrar o navegador realmente usado, o dispositivo e o resultado de cada
   tarefa.
5. Gravar a sessão e capturar prints dos problemas.
6. Registrar limitações, emulação ou sistema não disponível.

### 3.1 Comandos executados

```bash
# 2026-11-14, pasta Projeto/aplicacao/
yarn install --frozen-lockfile
(cd excalidraw-app && yarn vite --host 0.0.0.0 --port 3001)
```

```text
Local:   http://localhost:3001/
Network: http://192.168.0.8:3001/
```

## 4. Evidências

### 4.1 Trechos de código

Não se aplica; medição executada funcionalmente no navegador.

### 4.2 Arquivos de apoio

Todos em `evidencias/flexibilidade/F-M2/`.

| # | Arquivo | Tipo | O que mostra |
| --- | --- | --- | --- |
| E1 | `Windows2 2026-11-14 185037.mp4` | vídeo (4:12) | Sessão no Windows 11 com Edge 157.0.4341.60 |
| E2 | `Android 14 Nov 2026 at 18:16.mp4` | vídeo (5:11) | Sessão no Android 10 com Firefox 160.0; erro de clipboard em 1:20. O nome do arquivo diz “Android 14”, mas o sistema registrado é Android 10 |
| E3 | `iPad2 11-14-2026 17-44-14_1.mp4` | vídeo (6:27) | Sessão no iPad com iPadOS 27.2 e Safari 27.2; falha de scroll relatada |
| E4 | `iPhone 11-14-2026 17-51-17_1.MP4` | vídeo (5:19) | Sessão no iPhone com iOS 27.2.1 e Safari 27.2 |
| E5 | `Safari 2026-11-14 at 17.02.47.mov` | vídeo (7:17) | Sessão no macOS com Safari (mesma gravação usada na F-M1) |
| E6 | `save board - Andoird.png` e `save image - Android.png` | prints | Modal do Excalidraw + diálogo “Download file?” do Android |
| E7 | `save board modal - iPad.PNG` e `save image modal - iPad.PNG` | prints | Modal do Excalidraw + prompt de download do Safari no iPad |
| E8 | `save board modal - iPhone.PNG` e `save image modal - iPhone.PNG` | prints | O mesmo fluxo no iPhone |

Os vídeos E3 e E4 foram reencodados para H.264 720p para atender ao limite de
100 MB por arquivo do GitHub. A duração foi preservada (6:27 e 5:19); os
originais ficam fora do repositório.

### 4.3 Buscas sem resultado

| O que se procurou | Onde / comando | Resultado |
| --- | --- | --- |
| Ambiente Linux disponível | inventário do grupo | Nenhum integrante tinha Linux disponível; o sistema não foi testado |

## 5. Resultado

### 5.1 Dados brutos

| Sistema | Versão | Navegador | Dispositivo | Tarefas concluídas (25 previstas) | Falha observada | Resultado |
| --- | --- | --- | --- | :-: | --- | --- |
| Windows | 11 | Microsoft Edge 157.0.4341.60 | desktop | 25 de 25 | Nenhuma | Sem falhas |
| macOS | 27.2.1 | Safari 27.2, Chromium (Helium 0.21.3.1), Firefox 160.0 e Edge 157.0.4341.60 | Mac | 25 de 25 | Nenhuma | Sem falhas |
| Android | 10 | Firefox 160.0 | celular | 24 de 25 (1 não disponível) | Erro de clipboard em 1:20; a sessão foi interrompida e parte da cena foi refeita | **Com falha** |
| iPadOS / iOS | 27.2 / 27.2.1 | Safari 27.2 | iPad e iPhone | 24 de 25 (1 não disponível) | No iPad, a tela não rolava; só voltou ao normal depois de recarregar o site | **Com falha** |
| Linux | — | — | — | — | Não testado | Não testado |

Detalhe por tarefa. **P** = passou; **N/D** = não disponível no ambiente. As
tarefas 14, 15 e 18 foram as mais afetadas pelas interrupções; depois da recarga,
foram repetidas e concluídas. A tarefa 25 não existe no Android 10, no iPadOS
27.2 e no iOS 27.2.1.

| # | Tarefa | Windows | macOS | Android | iPadOS/iOS |
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
| 14 | Aplicar zoom | P | P | P* | P* |
| 15 | Mover a tela | P | P | P* | P* |
| 16 | Salvar um arquivo `.excalidraw` | P | P | P | P |
| 17 | Abrir um arquivo `.excalidraw` | P | P | P | P |
| 18 | Exportar uma imagem PNG | P | P | P* | P |
| 19 | Inserir uma imagem | P | P | P | P |
| 20 | Adicionar e reutilizar um item da biblioteca | P | P | P | P |
| 21 | Alternar o tema claro/escuro | P | P | P | P |
| 22 | Trocar o idioma | P | P | P | P |
| 23 | Converter Mermaid em diagrama | P | P | P | P |
| 24 | Trocar a fonte do texto | P | P | P | P |
| 25 | Ativar a trava de ferramenta | P | P | N/D | N/D |

\* Concluída depois da recarga/refresh; a interrupção está descrita na F-M3.
**N/D** = a tarefa não existe no ambiente e não conta como falha.

### 5.2 Cálculo

```text
sistemas sem falhas ÷ sistemas testados = 2 ÷ 4 = 50%
```

### 5.3 Pontuação

| Valor medido | Regra da métrica | Pontuação (0–2) |
| --- | --- | --- |
| 50% | 2 = ≥ 80%; 1 = 60% a 79%; 0 = < 60% | **0** |

**Justificativa:** Windows e macOS concluíram as 25 tarefas sem interrupção. O
Android e o iOS concluíram as tarefas disponíveis, mas tiveram falhas que
obrigaram a recarregar e refazer parte do trabalho; pela definição da métrica, o
sistema não é “sem falhas”. A tarefa 25 não existir no mobile não conta como
falha.

## 6. Observações e limitações

- **Trava de ferramenta:** a tarefa 25 não existe nos dispositivos móveis
  Android 10, iPadOS 27.2 e iOS 27.2.1. Ela foi registrada como **não
  disponível**, não como falha; no desktop (Chromium, Firefox, Edge e Safari) a
  função funciona. A ausência não muda a nota, que já era 0 pelas falhas de
  estabilidade.
- **As tarefas disponíveis passaram em todos os sistemas.** O que derruba a nota
  não é a ausência de função, e sim a falha de estabilidade que exige recarga e
  refazer a ação. Isso está explícito no critério “sem falhas”.
- **Android 10:** o “crash” relatado aparece no vídeo como um diálogo de erro do
  Excalidraw sobre a flag `dom.events.asyncClipboard.clipboardItem` do Firefox
  160.0. A gravação foi interrompida e a adição que estava sendo feita no
  Excalidraw foi refeita. O código que gera a mensagem está na F-M3 (C4 e C5).
- **iPad:** a tela não rolava e só voltou ao normal depois de recarregar o site.
  O gesto não aparece na gravação de tela; a falha é um relato do avaliador,
  registrado no vídeo da sessão. O iPhone não apresentou o mesmo problema.
- **Linux:** não havia ambiente disponível. Não foi registrado como aprovado
  nem como reprovado.
- **Versões:** Windows 11 com Edge 157.0.4341.60, macOS 27.2.1 com Safari 27.2,
  Android 10 com Firefox 160.0, iPadOS 27.2 e iOS 27.2.1 com Safari móvel 27.2.
- **Escopo:** instância local, sem colaboração, backend ou serviços externos. O
  comportamento em produção pode variar.
- **Salvamento:** o Android, o iPad e o iPhone mostram uma tela extra do
  Excalidraw e depois o diálogo do sistema (E6 a E8). É diferença de plataforma,
  não falha de compatibilidade; está na F-M3.

## 7. Achado

A pontuação foi 0, então os achados estão registrados abaixo.

| ID | Métrica | Evidência reproduzível | Pontuação | Impacto (Baixo/Médio/Alto) | Recomendação |
| --- | --- | --- | :-: | --- | --- |
| A-001 | F-M2 | Android 10, `Android 14 Nov 2026 at 18:16.mp4` em 1:20; F-M3 C4 e C5 | 0 | **Alto** | Tratar o Firefox sem a flag de clipboard: avisar antes de copiar/colar, oferecer download como alternativa e evitar que a falha interrompa a sessão e perca a cena |
| A-002 | F-M2 | iPadOS 27.2, `iPad2 11-14-2026 17-44-14_1.mp4` (sessão de 6:27) e relato do avaliador | 0 | **Médio** | Investigar o bloqueio de scroll por toque no iPadOS e garantir que o canvas volte a responder sem recarregar a página |

## 8. Contribuição para a questão

| Questão | Esta métrica indica que a hipótese foi | Por quê |
| --- | --- | --- |
| F-Q1 | parcial | Windows e macOS funcionam sem falhas; Android e iOS funcionam, mas tiveram falhas que exigiram recarga e refazer parte do trabalho. |
