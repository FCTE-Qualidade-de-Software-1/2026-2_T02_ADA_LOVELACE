# Protocolo dos testes com participantes

Usado pelas métricas de **Capacidade de interação** (O5) e de **Substituibilidade** (O4, Flexibilidade). 
Arquivos desta pasta:

| Arquivo | Para quê |
| --- | --- |
| `protocolo-testes-participantes.md` | Este documento: perfis, roteiro de tarefas, registro e cálculo das métricas |
| `tcle.md` | Termo de consentimento |
| `questionarios.md` | Perfil do participante, SUS (CI-M19), Likert (CI-M20) e intenção de uso (CI-M21) |
| `ficha-observacao-sessao.md` | Folha para quem acompanha a sessão |
| `registro-sessoes-modelo.csv` | Modelo da planilha de dados (só códigos P01, P02..., sem nomes) |

## 1. Métricas que dependem dos testes

| Métrica | O que os testes fornecem | Tarefa |
| --- | --- | --- |
| CI-M1 | Segundos até identificar o propósito na tela inicial | T1 |
| CI-M2 | Descrição correta do que a ferramenta faz após 1 min de uso | T2 |
| CI-M3 | Ícones da barra identificados sem tooltip | T3 |
| CI-M4 | Minutos da primeira tarefa (retângulo + elipse + seta + rótulos) | T4 |
| CI-M5 | Tarefas básicas concluídas sem ajuda externa ÷ propostas | T4, T5 |
| CI-M6 | Consultas à ajuda por participante | T4, T5 |
| CI-M8 | Tempo da T4 na 1ª sessão ÷ tempo na 3ª sessão | T4 repetida |
| CI-M11 | Tempo médio de experientes ÷ tempo médio de iniciantes | T5 |
| CI-M17 | Ações erradas ÷ total de ações | T4, T5 |
| CI-M19 | Escore SUS | questionário |
| CI-M20 | Média Likert da satisfação visual | questionário |
| CI-M21 | Participantes que usariam de novo ÷ total | questionário |
| F-M8 | Tempo no Excalidraw ÷ tempo na ferramenta anterior (mesma tarefa) | T5 nas duas ferramentas |
| F-M9 | Tarefas concluídas ÷ propostas, por quem vem de outra ferramenta | T4, T5 |

Também geram observações qualitativas para CI-M18 (mensagens de erro vistas), CI-Q9 (barreiras de acessibilidade) e F-Q4 (migração, T6).

## 2. Perfis e recrutamento

**1 participantes por perfil (4 no total)** (2 por perfil, se o prazo permitir). 

| Perfil | Critério de inclusão | Entra em |
| --- | --- | --- |
| **A. Iniciante** | Nunca usou o Excalidraw; já fez algum diagrama em outra ferramenta ou no papel | CI-M1 a M6, M8, M11, M17, M19 a M21 |
| **B. Experiente** | Usa o Excalidraw com regularidade (por exemplo, mais de 5 usos) e já usou atalhos | CI-M11 (numerador), M19 a M21 |
| **C. Vem de outra ferramenta** | Usa draw.io ou Miro com frequência e nunca ou quase nunca usou o Excalidraw | F-M8, F-M9, CI-M1 a M6, M17, M19 a M21 |
| **D. Necessidades de acessibilidade** | Usa tecnologia assistiva ao navegar (leitor de tela, ampliação, navegação só por teclado etc.) | todas as tarefas, **analisado à parte** |

Regras:

- Participantes maiores de 18 anos, voluntários, sem relação de avaliação com o grupo (não vale colega da equipe nem a docente).
- Cada pessoa entra em **um único perfil**.
- CI-M1 a M6 e M17 usam quem nunca usou o Excalidraw (perfis A, C e D). CI-M11 compara só B com A, como no roteiro ("experientes ÷ iniciantes"). O perfil D é reportado separado porque a tecnologia assistiva muda os tempos, e não entra nas médias de tempo.
- Pessoa do perfil D que não consiga fazer uma tarefa: registrar a barreira exata (é achado para CI-Q9).

## 3. Preparação do ambiente

- Excalidraw na versão avaliada (commit `e7b5346`), em instância local ou na pública, **sempre a mesma para todos** e registrada na ficha. Ver `evidencias/ambiente/ambiente-local.md`.
- Mesmo navegador, tema claro, canvas vazio e `localStorage` limpo a cada sessão.
- Para o perfil C: ferramenta anterior (draw.io ou Miro) aberta e com a conta do participante, se necessário.
- Para o perfil D: o participante usa seu próprio computador e tecnologia assistiva, quando possível.
- Material pronto antes: imagem do **diagrama-modelo** (seção 5), imagem da barra de ferramentas sem rótulos (T3), cronômetro, ficha de observação.

## 4. Condução

O facilitador lê o roteiro sempre do mesmo jeito.

1. Explicar que o teste avalia a ferramenta, **não a pessoa**; ela pode parar quando quiser.
2. Ler o TCLE, tirar dúvidas, colher assinatura e a autorização de gravação (`tcle.md`).
3. Aplicar o questionário de perfil (`questionarios.md`, parte 1).
4. Rodar as tarefas T1 a T6, na ordem do roteiro.
5. Aplicar SUS, Likert e intenção de uso (partes 2 a 4).
6. Agradecer e lembrar como pedir a exclusão dos dados.

Regras do facilitador durante as tarefas:

- Não ajudar, não dar dicas, não confirmar se está certo. Se perguntarem, responder "faça do jeito que achar melhor".
- **Sem resposta por 60 s:** perguntar "o que você está pensando em fazer?", sem sugerir nada.
- **Tempo-limite:** T4 e T5 param em 8 minutos; marcar "não concluiu".
- Pensar em voz alta é bem-vindo, mas não obrigatório.

### O que conta como "ajuda"

| Evento | Registro |
| --- | --- |
| Abrir o diálogo de ajuda (?), usar tooltip, buscar na internet, ver vídeo | +1 em **consultas à ajuda** (CI-M6) |
| Perguntar algo ao facilitador | +1 em consultas; a tarefa **não conta como "sem ajuda"** (CI-M5) |
| Tooltip que aparece só por passar o mouse sem intenção de ler | Não conta |

### O que conta como "ação errada" (CI-M17)

Ação que o participante **desfaz ou corrige em seguida**, ou que produz algo diferente do pretendido: forma errada, elemento arrastado ou redimensionado sem querer, texto no lugar errado, seleção acidental seguida de mudança. Contar cada ação como 1 e somar todas as ações do participante, para o denominador. Dois avaliadores contam pela gravação e, havendo diferença, vale a conferência conjunta.

## 5. Roteiro único de tarefas

Todos os participantes recebem as mesmas tarefas, com as mesmas palavras. Texto a ser lido pelo facilitador entre aspas.

**Diagrama-modelo** (usado em T5 e para o F-M8): fluxo de login com 6 elementos: "Início" (elipse), "Digitar usuário e senha" (retângulo), "Dados válidos?" (losango), "Entrar no sistema" (retângulo), "Mostrar erro" (retângulo), "Fim" (elipse); 6 setas, sendo as duas saídas do losango rotuladas "Sim" e "Não". Entregar a imagem impressa ou na tela ao lado.

| # | Tarefa | Instrução ao participante | Medidas | Métrica |
| --- | --- | --- | --- | --- |
| **T1** | Primeira impressão | Mostrar a tela inicial **sem deixar mexer**. "Assim que souber para que serve esta ferramenta, diga em voz alta." | Segundos até uma resposta; se a resposta está correta (menciona desenhar, esboçar ou diagramar, ou "quadro branco") | CI-M1 |
| **T2** | Exploração livre | "Explore por 1 minuto como quiser." Ao fim: "Em uma frase, o que esta ferramenta faz?" | Resposta correta? (mesmo critério da T1) | CI-M2 |
| **T3** | Ícones | Mostrar a imagem da barra de ferramentas **sem tooltips**. "Para cada ícone, diga o que ele faz." | Ícones corretos ÷ total (gabarito preparado antes) | CI-M3 |
| **T4** | Primeira tarefa | "Desenhe um retângulo, uma elipse, ligue os dois com uma seta e escreva um nome em cada forma." | Minutos até concluir; ajuda; ações; erros | CI-M4, M5, M6, M17, F-M9 |
| **T5** | Diagrama-modelo | "Reproduza este diagrama. Depois, mude a cor de fundo de uma caixa, agrupe duas caixas e exporte tudo como imagem PNG." | Minutos até concluir; ajuda; ações; erros | CI-M5, M6, M11, M17, F-M8, F-M9 |
| **T6** | Migração (só perfil C) | "Leve o diagrama que você já tem na sua ferramenta para o Excalidraw, do jeito que achar melhor." | Qualitativo: como tentou, o que se perdeu | F-Q4 |

Observações:

- **Gabarito da T3:** listar, antes das sessões, os ícones realmente visíveis na barra no commit `e7b5346` e a função de cada um. Candidatos vistos no código: mão, seleção, retângulo, losango, elipse, seta, linha, desenho livre, texto, nota adesiva, imagem, borracha, moldura e laser. Conferir na tela e ajustar. Aceitar respostas equivalentes ("lápis" para desenho livre).
- **F-M8:** o participante do perfil C refaz o diagrama-modelo **na ferramenta anterior** (cronometrado) e no Excalidraw. Para evitar efeito de aprendizado, metade começa por cada ferramenta. Razão = tempo no Excalidraw ÷ tempo na anterior.
- **Perfil B:** faz só T4 e T5 (T1 a T3 não se aplicam a quem já conhece a ferramenta).
- **Perfil D:** T1 a T5 com a própria tecnologia assistiva; tempos reportados à parte.
- **CI-M9** (cliques por tarefa frequente) é medida pela equipe, não pelos participantes.

## 6. Sessões repetidas (CI-M8)

A CI-M8 exige a mesma tarefa (T4) em **três sessões** do mesmo participante, em dias diferentes, e só vale para o perfil A. Com a Entrega 2 em 18/11 e as medições a concluir em 16/11, três sessões por pessoa provavelmente não cabem. Por isso aplicaremos mais de uma sessão apenas se a pessoa estiver disponível.

## 7. Registro, privacidade e acesso

- **Identificação por código:** P01, P02... por ordem de sessão. O repositório nunca recebe nomes, e-mails ou rostos.
- **Gravação:** tela e áudio. Rosto **não** é gravado; a gravação só ocorre com autorização no TCLE. Nome do arquivo: `P01_S1_AAAA-MM-DD.mp4`.
- **Onde ficam:** pasta compartilhada **privada** (Drive, OneDrive ou equivalente) criada para o grupo, com acesso apenas aos integrantes da equipe e à docente, quando solicitado. **Nada de gravação, TCLE assinado ou questionário com nome vai para o Git ou GitHub Pages.**
- **No repositório entram:** protocolo, modelos em branco, e o CSV com os dados já resumidos por código (sem texto livre que possa identificar a pessoa).
- Base legal e cuidados: pessoas maiores de 18 anos, consentimento livre e específico, coleta mínima (a LGPD, Lei 13.709/2018, é a referência).

## 8. Do dado à métrica

| Métrica | Cálculo | Dados na planilha |
| --- | --- | --- |
| CI-M1 | Média dos segundos (A, C) | `t1_segundos`, `t1_correto` |
| CI-M2 | Corretos ÷ participantes | `t2_correto` |
| CI-M3 | Média da proporção de ícones corretos | `t3_acertos`, `t3_total` |
| CI-M4 | Média dos minutos; quem não concluiu entra com 8 min (o tempo-limite) e é contado à parte | `t4_minutos`, `t4_concluiu` |
| CI-M5 | Tarefas (T4 e T5) concluídas sem ajuda ÷ tarefas propostas | `t4_sem_ajuda`, `t5_sem_ajuda` |
| CI-M6 | Média de consultas por participante | `consultas_t4`, `consultas_t5` |
| CI-M8 | `t4_minutos` (S1) ÷ `t4_minutos` (S3) | uma linha por sessão |
| CI-M11 | Média T5 experientes ÷ média T5 iniciantes | `t5_minutos`, `perfil` |
| CI-M17 | Ações erradas ÷ total de ações | `acoes_total`, `acoes_erradas` |
| CI-M19 | Escore SUS médio (0 a 100) | `sus_1` a `sus_10` |
| CI-M20 | Média das 3 notas Likert | `likert_estilo`, `likert_organizacao`, `likert_modo_escuro` |
| CI-M21 | Responderam "sim" ÷ participantes | `usaria_novamente` |
| F-M8 | Média de `t5_minutos_excalidraw` ÷ `t5_minutos_anterior` (perfil C) | idem |
| F-M9 | Tarefas concluídas ÷ propostas (perfil C) | `t4_concluiu`, `t5_concluiu` |

Pontuação segue os limites da Tabela 14 do roteiro de análise. Reportar também **n**, mínimo, máximo e média; e quais regras do protocolo foram aplicadas.

