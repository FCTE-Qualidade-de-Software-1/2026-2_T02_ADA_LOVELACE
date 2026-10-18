# Roteiro da análise

## 1. Propósito e partes interessadas

O propósito é identificar o nível de atendimento e as oportunidades de
melhoria do Excalidraw em **segurança, portabilidade e usabilidade**. Os
resultados apoiarão recomendações para usuários, desenvolvedores e
mantenedores, além de fornecerem evidências para o artigo científico da
equipe.

As principais partes interessadas são:

| Parte interessada | Necessidade na avaliação |
| --- | --- |
| Usuário final, iniciante ou experiente | Criar e compartilhar diagramas com segurança e baixo esforço |
| Usuário com necessidade de acessibilidade | Operar a aplicação com teclado e tecnologia assistiva |
| Desenvolvedor ou mantenedor | Conhecer vulnerabilidades, incompatibilidades e barreiras de uso |
| Integrador de outra aplicação | Usar a ferramenta em diferentes navegadores, dispositivos e fluxos de migração |

## 2. Produto, contexto e escopo

O produto é uma aplicação web de quadro branco colaborativo. O escopo inclui:

* criação e edição de formas, textos, setas e wireframes;
* interação com o canvas por mouse, teclado e toque;
* compartilhamento e colaboração por links;
* exportação e importação de diagramas;
* criação de diagramas com apoio de inteligência artificial;
* armazenamento local, autenticação observável e proteção das comunicações;
* execução em navegadores, sistemas operacionais, resoluções e dispositivos
  selecionados.

Ficam fora do escopo a auditoria completa da infraestrutura de produção, a
certificação criptográfica formal, o teste de penetração invasivo e a
avaliação exaustiva de todas as funcionalidades do produto. Essa delimitação
evita generalizar resultados obtidos em uma aplicação pública e em condições
de teste controladas.

## 3. Modelo de qualidade

O modelo adotado é a ISO/IEC 25010:2023, adaptado ao contexto colaborativo do
Excalidraw. Foram priorizadas:

* **Segurança:** confidencialidade, integridade, responsabilização,
  autenticidade e resistência;
* **Portabilidade:** adaptabilidade e substituibilidade;
* **Usabilidade:** reconhecibilidade da adequação, apreensibilidade,
  operabilidade, proteção contra erros, estética da interface e
  acessibilidade.

Segurança foi priorizada pelo compartilhamento de informações e pela
colaboração em tempo real; portabilidade, pelo uso predominante em
dispositivos móveis e pela variedade de navegadores; e usabilidade, pela
necessidade de desenhar com rapidez, aprender a interface e colaborar sem
perder dados.

## 4. Estratégia GQM

A medição segue o método **Goal-Question-Metric (GQM)**:

1. **Objetivo:** define o que será analisado, para qual finalidade, sob qual
   característica, para quem e em qual contexto.
2. **Questão:** decompõe o objetivo em perguntas observáveis.
3. **Métrica:** define o dado, a fórmula, a fonte e o critério usados para
   responder à questão.

### O1 — Segurança: proteção das informações e controle de acesso

Analisar armazenamento, compartilhamento e colaboração em tempo real para
identificar fragilidades na confidencialidade e integridade dos diagramas, do
ponto de vista de usuários que criam e compartilham conteúdo.

| ID | Questão | Métricas |
| --- | --- | --- |
| S-Q1 | As mensagens e os dados são protegidos contra acesso não autorizado? | S-M1: proporção de mensagens criptografadas; S-M2: chave de criptografia enviada ao servidor; S-M3: dados locais sem criptografia |
| S-Q2 | O compartilhamento permite controlar quem acessa o diagrama? | S-M4: mecanismos de controle de acesso; S-M5: exposição de links e permissões |
| S-Q3 | O sistema impede alteração ou corrupção não autorizada? | S-M6: taxa de detecção de adulteração; S-M7: inconsistências após edições simultâneas |

### O2 — Segurança: identificação, responsabilização e resistência

Analisar identificação de participantes, registros de ações, dependências e
configurações técnicas para identificar limitações de autenticidade,
responsabilização e resistência a ataques.

| ID | Questão | Métricas |
| --- | --- | --- |
| S-Q4 | As ações dos usuários são rastreáveis? | S-M8: completude da trilha de auditoria; S-M9: histórico de versões com autoria |
| S-Q5 | O sistema confirma a identidade dos participantes? | S-M10: suficiência da autenticação; S-M11: possibilidade de personificação |
| S-Q6 | A aplicação resiste a vulnerabilidades conhecidas? | S-M12: vulnerabilidades altas ou críticas nas dependências; S-M13: advisories/CVEs e tempo de correção; S-M14: nota dos cabeçalhos HTTP |

### O3 — Portabilidade: adaptação, substituição e migração

Analisar a execução em diferentes ambientes e a troca de dados com ferramentas
equivalentes, do ponto de vista de usuários e desenvolvedores integradores.

| ID | Questão | Métricas |
| --- | --- | --- |
| P-Q1 | O Excalidraw funciona de forma consistente em navegadores e sistemas operacionais diferentes? | P-M1: compatibilidade de navegadores; P-M2: compatibilidade de sistemas operacionais; P-M3: defeitos específicos de ambiente |
| P-Q2 | A aplicação se adapta a dispositivos e condições de uso variadas? | P-M4: cobertura funcional em mobile; P-M5: cobertura funcional offline; P-M6: resoluções sem perda de elementos |
| P-Q3 | A ferramenta substitui uma equivalente sem perda de produtividade? | P-M7: inclusão funcional; P-M8: razão de tempo de tarefa; P-M9: taxa de conclusão |
| P-Q4 | Os dados podem ser migrados sem perdas? | P-M10: cobertura de formatos; P-M11: fidelidade no round-trip; P-M12: formatos de importação aceitos |

### O4 — Usabilidade: compreensão, aprendizagem e operação

Analisar a interface de criação e edição para identificar dificuldades de
compreensão, aprendizagem, operação, recuperação de erros e satisfação.

| ID | Questão | Métricas |
| --- | --- | --- |
| U-Q1 | O usuário reconhece rapidamente a adequação da ferramenta? | U-M1: tempo para identificar o propósito; U-M2: reconhecimento correto após um minuto; U-M3: ícones autoexplicativos |
| U-Q2 | Um usuário novo aprende as funções básicas sem treinamento? | U-M4: tempo da primeira tarefa; U-M5: conclusão sem ajuda; U-M6: consultas à ajuda |
| U-Q3 | Há apoio ao aprendizado contínuo? | U-M7: cobertura da ajuda interna; U-M8: melhoria entre a primeira e a terceira sessão |
| U-Q4 | As tarefas comuns são eficientes e previsíveis? | U-M9: ações por tarefa; U-M10: cobertura de atalhos; U-M11: tempo de experientes versus iniciantes; U-M12: inconsistências; U-M13: feedback visual |
| U-Q5 | O sistema evita e permite recuperar erros? | U-M14: recuperabilidade por desfazer/refazer; U-M15: ações destrutivas sem confirmação; U-M16: perda de dados após recarga; U-M17: taxa de erro; U-M18: mensagens compreensíveis |
| U-Q6 | A experiência é satisfatória e acessível? | U-M19: SUS; U-M20: satisfação visual; U-M21: intenção de uso futuro; U-M22: violações WCAG; U-M23: funções operáveis por teclado; U-M24: elementos anunciados por leitor de tela; U-M25: contraste; U-M26: tradução para português |

## 5. Execução e fontes de evidência

1. Fixar a versão avaliada, os navegadores, sistemas operacionais, resoluções
   e dispositivos.
2. Preparar casos de teste e tarefas representativas de criação,
   compartilhamento, exportação, importação e colaboração.
3. Inspecionar o código-fonte e as dependências; registrar comandos, versões e
   saída, sem executar testes invasivos contra terceiros.
4. Executar testes funcionais, de compatibilidade, acessibilidade e
   usabilidade com participantes, quando autorizados.
5. Armazenar evidências no repositório, vinculando cada resultado à métrica,
   data, ambiente e responsável.

Entrevistas ou testes com participantes exigem autorização prévia. Os registros
não devem conter nomes reais ou dados pessoais desnecessários.

## 6. Critérios de julgamento

Cada métrica recebe **0, 1 ou 2 pontos**: satisfatório, parcial ou
insatisfatório. A meta declarada é o limite do nível 2; quando não houver meta,
as faixas devem ser definidas antes da coleta. Métricas booleanas recebem 2
para “sim” no comportamento esperado e 0 caso contrário.

As pontuações de uma questão e de um objetivo são médias simples. O percentual
é calculado por `média / 2 × 100`:

| Percentual | Interpretação |
| --- | --- |
| 75% ou mais | Atendido |
| 50% a 74% | Parcialmente atendido |
| Abaixo de 50% | Não atendido |

Uma métrica com pontuação 0 sempre deve ser registrada como oportunidade de
melhoria, mesmo quando a média da questão seja satisfatória.

## 7. Gestão e rastreabilidade

As contribuições devem ser realizadas no Git, com commits identificáveis,
revisões e vínculo entre mudanças e evidências. A gestão do projeto usará
práticas do **PSM (Practical Software and Systems Measurement)**, acompanhando
recursos, custos, desempenho do processo e calendário. O registro de decisões,
alterações de escopo e resultados deve permanecer no repositório.
