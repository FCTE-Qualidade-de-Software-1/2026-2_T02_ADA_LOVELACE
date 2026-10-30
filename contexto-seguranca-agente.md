# Contexto para análise de Segurança do Excalidraw

Este arquivo resume o que o repositório de documentação da equipe Ada Lovelace
(disciplina de Qualidade de Software) define para a característica
**Segurança**. Sua tarefa é coletar, **no código-fonte do Excalidraw**, as
evidências que respondem às questões e métricas abaixo.

## 1. Enquadramento

- **Produto:** Excalidraw (quadro branco colaborativo, código aberto, MIT).
  Repositório: `github.com/excalidraw/excalidraw`. Instância pública:
  `excalidraw.com`.
- **Modelo:** ISO/IEC 25010:2023, característica Segurança. Método GQM.
- **Ponto de vista:** usuário que cria e compartilha diagramas potencialmente
  sensíveis (O1) e usuários de sessões colaborativas + mantenedores (O2).
- **Escopo funcional:** colaboração em tempo real por link, link de
  compartilhamento (snapshot), armazenamento local no navegador, geração de
  diagramas com IA (o texto do usuário vai para um serviço externo).
- **Subcaracterísticas incluídas:** confidencialidade, integridade,
  responsabilização, autenticidade, resistência.
- **Excluída:** não repúdio (não há contas nem assinatura de ações na versão
  gratuita).

### Restrições obrigatórias

1. **Nada invasivo contra `excalidraw.com`** nem contra o backend público de
   colaboração, Firebase ou IA. Testes que adulteram dados ou geram carga só
   em **instância local**.
2. Requisições passivas e únicas à instância pública são aceitáveis (por
   exemplo, ler os cabeçalhos HTTP da página inicial).
3. **Fixe a versão:** registre o hash do commit (`git rev-parse HEAD`) e a
   data. Toda evidência deve citar `arquivo:linha` nesse commit.
4. Registre comandos executados, versões das ferramentas e saídas relevantes.
5. Não infira resultado apenas pela documentação do Excalidraw; a evidência é o
   código ou a execução.

## 2. Questões, hipóteses e métricas

Pontuação de cada métrica: **2 = Satisfatório, 1 = Parcial,
0 = Insatisfatório**. Métricas Sim/Não só têm 2 ou 0.

### O1 — Proteção das informações e controle de acesso

| Questão | Hipótese da equipe |
| --- | --- |
| **S-Q1.** Os dados trafegam e ficam armazenados protegidos contra acesso não autorizado? (confidencialidade) | Sim: mensagens cifradas com AES-GCM no navegador; chave no fragmento `#` do link, que não vai ao servidor |
| **S-Q2.** É possível controlar quem acessa um desenho compartilhado? (confidencialidade) | Não: quem tem o link acessa; sem senha, expiração ou revogação; cena sem criptografia no `localStorage` |
| **S-Q3.** O sistema impede alteração ou corrupção não autorizada? (integridade) | Sim: AES-GCM é autenticado (payload adulterado falha); reconciliação por versão evita inconsistências |

| Métrica | Como medir | 2 | 1 | 0 |
| --- | --- | --- | --- | --- |
| **S-M1.** Proporção de mensagens de colaboração cifradas | Cifradas ÷ total de mensagens | 100% | ≥ 90% e < 100% | < 90% |
| **S-M2.** A chave é enviada ao servidor? | Sim/Não: o fragmento `#` aparece em alguma requisição? | Não | — | Sim |
| **S-M3.** Mecanismos de controle de acesso | 0 a 3, um ponto por: senha, expiração, revogação do link | 2 ou 3 | 1 | 0 |
| **S-M4.** Dados persistidos localmente sem criptografia? | Sim/Não (localStorage e IndexedDB) | Não | — | Sim |
| **S-M5.** Taxa de detecção de adulteração | Adulterações rejeitadas ÷ injetadas no texto cifrado (instância local) | 100% | ≥ 90% e < 100% | < 90% |
| **S-M6.** Inconsistências após N edições simultâneas | Contagem em teste de concorrência | 0 | 1 a 2 | ≥ 3 |

### O2 — Identificação, responsabilização e riscos

| Questão | Hipótese da equipe |
| --- | --- |
| **S-Q4.** As ações dos usuários são rastreáveis? (responsabilização) | Não: sem histórico de versões nem autor por alteração na versão gratuita |
| **S-Q5.** O sistema confirma a identidade dos participantes? (autenticidade) | Não: só nome autodeclarado; qualquer um pode usar o nome de outro |
| **S-Q6.** A aplicação resiste a ataques e vulnerabilidades conhecidas? (resistência) | Parcialmente: poucas vulnerabilidades críticas, mas a configuração de hospedagem não define CSP |

| Métrica | Como medir | 2 | 1 | 0 |
| --- | --- | --- | --- | --- |
| **S-M7.** Completude da trilha de auditoria | Ações registradas com autor ÷ ações executadas | ≥ 90% | 50% a 89% | < 50% |
| **S-M8.** Histórico de versões com autoria | Existe na versão gratuita? E no Excalidraw+? | Sim, gratuita | Só no Excalidraw+ | Não existe |
| **S-M9.** Suficiência da autenticação | 0 nenhum, 1 nome autodeclarado, 2 login, 3 login + MFA | Login ou login + MFA | Nome autodeclarado | Nenhum |
| **S-M10.** Um participante pode se passar por outro mudando o nome? | Sim/Não | Não | — | Sim |
| **S-M11.** Vulnerabilidades altas/críticas nas dependências | Contagem via `npm audit` | 0 | 1 a 3, nenhuma crítica | Qualquer crítica ou ≥ 4 |
| **S-M12.** Advisories/CVEs publicados e tempo médio de correção | Nº de advisories e média de dias até a correção | ≤ 30 dias ou nenhum | 31 a 90 dias | > 90 dias ou sem correção |
| **S-M13.** Nota dos cabeçalhos de segurança HTTP | CSP, HSTS, X-Frame-Options (ex.: securityheaders.com) | A ou A+ | B ou C | D, E ou F |

## 3. O que procurar no código, por métrica

Os caminhos abaixo são **pontos de partida prováveis**; confirme no commit
avaliado e corrija se a estrutura for diferente.

**S-M1 — mensagens cifradas**
- Camada de socket da colaboração (provavelmente `excalidraw-app/collab/Portal.tsx`
  e `Collab.tsx`). Liste **todos** os `socket.emit(...)` e `socket.on(...)` e,
  para cada evento, diga se o payload passa por `encryptData` antes de sair.
- Eventos de controle (ex.: `join-room`, `room-user-change`) podem ir em claro;
  identifique o que eles expõem (ID da sala, IDs de socket, nomes?).
- Persistência remota da sala (provavelmente `excalidraw-app/data/firebase.ts`):
  a cena e os arquivos (imagens) são salvos cifrados?
- Link de compartilhamento estático (`exportToBackend` / `#json=`): o conteúdo
  enviado ao backend é cifrado?
- Recurso de IA (componentes de text-to-diagram / diagram-to-code): o texto ou
  imagem vai em claro para o backend de IA? Registre o endpoint. Isso não
  entra na proporção de S-M1, mas é achado de confidencialidade.
- Entregue a proporção calculada pelo código (eventos cifrados ÷ eventos com
  conteúdo do desenho) e indique que a confirmação final é por captura no
  DevTools.

**S-M2 — chave enviada ao servidor**
- Onde a chave é gerada e colocada na URL (`#room=<id>,<key>`, `#json=<id>,<key>`;
  provavelmente `excalidraw-app/data/index.ts` e
  `packages/excalidraw/data/encryption.ts`).
- Procure qualquer leitura de `window.location.hash` / `location.href` que
  acabe em `fetch`, `socket.emit`, Firebase, analytics ou **Sentry** (o Sentry
  costuma anexar a URL; verifique se há `beforeSend`/scrubbing do fragmento).
- Verifique se a URL completa é enviada ao backend de IA ou em algum
  cabeçalho/relatório de erro.

**S-M3 — controle de acesso**
- Existe senha, expiração ou revogação para sala de colaboração ou link
  `#json`? Procure TTL, exclusão de documento, "stop session" que invalide a
  chave, regras de acesso do Firebase versionadas no repositório.
- Distinga "parar a sessão localmente" de "revogar o acesso de quem já tem o
  link".

**S-M4 — dados locais**
- Módulos de persistência local (provavelmente
  `excalidraw-app/data/localStorage.ts`, `LocalData.ts`, uso de `idb-keyval`).
  Liste as chaves do `localStorage` e os stores do IndexedDB e diga se o
  conteúdo é gravado em claro (elementos, estado, imagens, nome do usuário).

**S-M5 — detecção de adulteração**
- Em `encryption.ts`, confirme algoritmo (AES-GCM), tamanho de chave, geração
  de IV (aleatório por mensagem? reutilizado?) e se há dados adicionais
  autenticados.
- Veja como a falha de `decryptData` é tratada no recebimento (try/catch,
  descarte silencioso, crash, fallback em claro?).
- **Teste local:** escreva um teste (ex.: Vitest, já usado no repo) que cifra
  um payload real e aplica N adulterações (inverter bits no ciphertext, no IV,
  truncar, trocar a chave). Conte quantas são rejeitadas. Reporte N e a taxa.

**S-M6 — consistência em edição simultânea**
- Lógica de reconciliação (provavelmente `packages/excalidraw/data/reconcile.ts`):
  descreva o critério (`version`, `versionNonce`, desempate) e casos em que
  dois clientes podem divergir.
- Se houver testes existentes de reconciliação, rode-os e cite. Se viável,
  crie um teste que simula duas réplicas aplicando edições concorrentes em
  ordens diferentes e conte divergências finais.

**S-M7 / S-M8 — rastreabilidade**
- Os elementos guardam autor (ex.: `updatedBy`, `userId`)? Existe log de ações
  ou histórico de versões persistido? O undo/redo é local ou compartilhado?
- Para S-M8, apenas registre se há histórico na versão gratuita; a comparação
  com o Excalidraw+ é feita pela equipe fora do código.

**S-M9 / S-M10 — identidade**
- Como o nome do colaborador é definido, salvo e transmitido (campo
  `username`, broadcast de ponteiro/idle). Há qualquer verificação do lado do
  servidor? Dois participantes podem ter o mesmo nome? O nome de outro
  participante pode ser forjado num payload?
- Verifique se o nome exibido é sanitizado (risco de injeção na UI).

**S-M11 — dependências**
- O repositório usa Yarn; `npm audit` exige `package-lock.json`. Opções:
  `yarn audit --groups dependencies` (Yarn v1) ou
  `npm i --package-lock-only && npm audit --omit=dev`. Registre a ferramenta
  usada, separe dependências de produção e de desenvolvimento e conte
  **high** e **critical**.

**S-M12 — advisories**
- `gh api repos/excalidraw/excalidraw/security-advisories` e a aba Security do
  GitHub; busque CVEs com "excalidraw". Para cada um: data de publicação, data
  da correção (release/commit), dias até a correção.

**S-M13 — cabeçalhos HTTP**
- Configuração de hospedagem no repositório (provavelmente `vercel.json`,
  além de `<meta http-equiv>` em `index.html`). Liste CSP, HSTS,
  X-Frame-Options, X-Content-Type-Options, Referrer-Policy,
  Permissions-Policy.
- Faça **uma** requisição passiva (`curl -sI https://excalidraw.com`) e compare
  com o repositório. A nota final do securityheaders.com é coletada pela
  equipe, mas indique a nota esperada.

## 4. Achados adicionais de resistência (opcionais)

Fora das métricas, mas úteis como oportunidades de melhoria: sanitização de
links em elementos (`javascript:`), allowlist e `sandbox` de embeddables
(iframes), carregamento de bibliotecas/arquivos externos, uso de
`dangerouslySetInnerHTML`, segredos ou chaves expostos no build (`.env`).

## 5. Formato de entrega

Nesta etapa você **não executa a avaliação**: você explora o código para
entender o que existe e devolve um **plano de tarefas** para duas pessoas
executarem. Gere um arquivo `tarefas-seguranca-excalidraw.md` com:

1. **Resumo do que foi entendido** (curto): commit explorado, como a
   colaboração, o link de compartilhamento, o armazenamento local e a IA
   funcionam, e os arquivos principais de cada um.
2. **Tarefas compartilhadas** (fazer antes da divisão), como subir a
   instância local, fixar o commit e combinar onde guardar as evidências.
3. **Tarefas da Pessoa 1** e **Tarefas da Pessoa 2**. Cada tarefa em
   linguagem simples, como uma checklist que um colega de turma entende sem
   conhecer o código, com:
   - [ ] **O que fazer**, em uma ou duas frases.
   - **Por que:** a métrica (S-M…) e a questão (S-Q…) que ela responde.
   - **Onde olhar / como fazer:** arquivos (`arquivo:linha`), comando ou
     passo a passo no navegador.
   - **O que registrar como evidência:** print, saída de comando, trecho de
     código, contagem.
   - **Como pontuar:** a regra de 0, 1 ou 2 da métrica, em palavras simples.
   - **Esforço estimado:** baixo, médio ou alto.
4. **Divisão equilibrada:** as duas pessoas devem ter esforço parecido, e
   cada questão (S-Q) deve ficar com uma só pessoa, para que ela consiga
   fechar a hipótese. Como ponto de partida, O1 (S-M1 a S-M6) para a Pessoa 1
   e O2 (S-M7 a S-M13) para a Pessoa 2; mude a divisão se o esforço ficar
   desigual e explique o motivo.
5. **Dependências e ordem:** o que uma pessoa precisa da outra e o que fazer
   primeiro.
6. **Fechamento conjunto:** consolidar os resultados no formato abaixo.

### Formato que as pessoas usarão para registrar os resultados

| Métrica | Valor medido | Pontuação (0–2) | Evidência | Observação |
| --- | --- | --- | --- | --- |

| ID | Métrica | Evidência reproduzível | Pontuação | Impacto (Baixo/Médio/Alto) | Recomendação |
| --- | --- | --- | --- | --- | --- |

Toda métrica com pontuação 0 gera um achado. Cada questão (S-Q1 a S-Q6)
termina com a hipótese confirmada, refutada ou parcial.

Seja factual: se algo não foi encontrado, diga "não encontrado" e onde
procurou, em vez de presumir.
