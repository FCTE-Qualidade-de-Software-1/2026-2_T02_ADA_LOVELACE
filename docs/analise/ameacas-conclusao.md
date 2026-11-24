# Ameaças à validade e conclusão

## Ameaças à validade

As ameaças seguem os quatro tipos de Wohlin et al. (2012) ([ref. 41](../referencias.md)): construção,
interna, externa e de conclusão. Para cada uma, a tabela mostra o que foi
feito para reduzi-la e quanto ela pode mudar o resultado. O detalhe de cada
caso está nas evidências, e o que não cabe na tabela está em
[Limitações](#limitacoes).

| Tipo | Ameaça | Como foi tratada | Efeito no resultado |
| --- | --- | --- | --- |
| Construção | Algumas métricas medem uma aproximação do atributo: a CI-M18 classifica o texto das mensagens no código, sem medir se o usuário entende; a CI-M13 vê o retorno visual, sem medir a latência | Regra escrita na evidência antes da nota; a CI-M13 conta o retorno presente no ponto observado, e a lacuna fica como limitação | A CI-M18 (nota 0) pode subestimar a capacidade de interação |
| Construção | Duas regras foram fixadas depois das sessões: a dúvida sobre o termo "elipse" não conta como ajuda (CI-M5 e CI-M6), e o gabarito da T3 (CI-M3) veio de P05 e P06, que acertaram os 13 ícones | Decisões registradas no protocolo e nas evidências, com o valor pela regra rígida ao lado; o gabarito confere com a barra no código do commit | Pela regra rígida, a CI-M5 cairia de 62,5% para 25% e a CI-M6 iria de 0,5 a 1,0, sem mudar as notas. A CI-M3 (80,8%) fica no limite: sem P01, 79,5% (nota 1) |
| Construção | Denominadores escolhidos por quem mediu: F-M10 (5 formatos), CI-M7 (74 funções), CI-M10 (17 funções), F-M7 (42 funções do draw.io), S-M1 (por tipo de evento, 83,3%, e não por volume, 99,5%) e S-M6 (só o teste real) | Lista registrada em cada evidência; F-M10, CI-M7 e CI-M10 aprovadas pelo grupo em 23/11/2026 ([registro](https://github.com/FCTE-Qualidade-de-Software-1/2026-2_T02_ADA_LOVELACE/blob/main/evidencias/decisoes-grupo_2026-11-23.md)) | Com 3 formatos na F-M10, o O4 iria a 83,3%; com o modelo automatizado na S-M6, o O1 cairia a 33,3%. Nenhum julgamento muda |
| Construção | A CI-M8 exige três sessões com a mesma pessoa, e cada participante fez uma | A métrica fica sem valor, não vira zero, e a CI-Q3 fica sem média | O O5 sai das outras 7 questões (71,4%); com a CI-Q3 só pela CI-M7, 68,8%; com a CI-M8 como 0, 65,6%. Sempre parcial |
| Interna | Na F-M8, o Excalidraw veio primeiro, e o participante chegou ao Lucidchart já conhecendo o diagrama | Ordem registrada na ficha | Favorece a ferramenta anterior; mesmo assim, o Excalidraw foi mais rápido (razão 0,71) |
| Interna | O P05, único do perfil C, marcou no questionário que já usava o Excalidraw "regularmente" | Registrado como limitação na F-M8 e na F-M9; classificação a confirmar com a facilitadora | Favorece o Excalidraw. Se o P05 não valer como perfil C, F-M8 e F-M9 ficam sem valor, e o O4 passa a depender só da migração de dados (F-Q4) |
| Interna | Um único avaliador por coleta. Nas sessões, as ações erradas foram contadas por uma pessoa, pela transcrição, e o protocolo previa dois avaliadores pela gravação | Revisão de cada evidência por outro integrante no PR; reavaliação independente da CI-M26 (sem divergência); a da CI-M18, prevista na #77, não foi feita | A CI-M17 (23,3% de ações erradas) pode variar com outro avaliador e depende sobretudo de P03 (32 de 68 ações erradas): sem P03, 9,9% (nota 1) |
| Interna | Uso de IA na coleta, nos scripts e nos cálculos | Declarado em [Uso de IA](../uso-ia.md), com a forma de conferência de cada integrante | Baixo: as notas e as médias do relatório foram reconferidas contra as evidências e o CSV das sessões |
| Externa | Commit fixo `e7b5346`, em instância local: servidor de colaboração local (`excalidraw-room`), IA com servidor falso e Excalidraw+ fora do escopo | Commit fixado no plano e recorte declarado em cada página; nem toda coleta confirmou o hash, e a S-M13 usou a resposta pública | Os resultados valem para esse commit e esse ambiente, não para a versão implantada nem para o produto pago |
| Externa | Celular e tablet emulados no Chrome (F-M4); aparelhos reais só na F-M2 e na F-M3; Linux não testado; leitor de tela só NVDA com Edge | Ambiente registrado em cada evidência | O toque (25 de 25 funções) pode não se repetir em aparelhos reais, que já mostraram falhas no Android e no iPadOS |
| Externa | Seis participantes (perfil A = 3, B = 2, C = 1), uma sessão cada, no próprio computador e navegador, sem nenhum do perfil D (acessibilidade), que não foi recrutado; a ferramenta anterior foi o Lucidchart, enquanto a F-M7 comparou com o draw.io | Perfis e ferramentas registrados no CSV e nas fichas; acessibilidade avaliada só com ferramentas (CI-M22 a CI-M25) | Os resultados das sessões não se estendem a pessoas com deficiência nem a quem vem do draw.io ou do Miro |
| Conclusão | Amostras muito pequenas: n = 1 na F-M8 e na F-M9, 2 experientes contra 2 iniciantes na CI-M11 e n = 3 na CI-M1. Os resultados são descritivos, sem teste estatístico | Valores individuais publicados junto com as médias | Uma tarefa ou uma pessoa muda a nota: se a T6 contasse na F-M9, a nota cairia a 0 e o O4 a 58,3% (parcial); sem P03 na CI-M17, a nota iria a 1 e o O5 a 75,0% (atendido); com o P05 entre os iniciantes, a CI-M11 iria a 0,54 (nota 1) |
| Conclusão | O O4 fica no limite exato de 75%, e o O5 (71,4%) fica perto dele. As médias dão o mesmo peso a cada questão, tenha ela uma métrica (CI-Q10) ou quatro (CI-Q9) | Método da [seção 3 do roteiro](roteiro.md#3-criterios-de-julgamento), fixado antes da coleta; sensibilidade calculada | Dos cenários alternativos desta tabela, só dois mudam um julgamento: o da T6 (O4) e o de P03 na CI-M17 (O5) |

## Limitações

Além das ameaças da tabela, que já cobrem a instância local, a amostra, a
emulação, os denominadores e a CI-M8:

* **Notas que antes eram provisórias.** Em 23/11/2026, o grupo decidiu, em
  discussão interna ([registro](https://github.com/FCTE-Qualidade-de-Software-1/2026-2_T02_ADA_LOVELACE/blob/main/evidencias/decisoes-grupo_2026-11-23.md)), tornar definitivas as notas publicadas de CI-M6 (2), CI-M11 (2), CI-M13 (2),
  CI-M14 (0) e CI-M18 (0), sem mudar médias nem julgamentos. Os motivos da
  ressalva ficam como limitação: a CI-M6 não muda com a conferência no vídeo;
  a CI-M11 iria a 0,53 ou 0,54 (nota 1) com P01 ou P05 entre os iniciantes; a
  CI-M13 não mediu a latência; a CI-M14 contou tema e zoom, que fora do
  denominador dariam 100% (nota 2); e a CI-M18 é a classificação de uma
  pessoa, sem a reclassificação independente prevista na #77, e passaria a 1
  a partir de 50%.
* **Decisões metodológicas abertas.** A comparação com o produto pago na S-M8
  não foi feita. Os cenários
  alternativos registrados nas evidências (S-M1 por volume, CI-M22 por regra,
  CI-M23 estrito) não substituem valores nem notas.
* **Funções pagas e de rede.** O Excalidraw+ não foi avaliado, e as funções
  que dependem de servidores oficiais (link compartilhável, IA e bibliotecas
  públicas) foram testadas só no que é possível localmente.

## Conclusão

O Excalidraw, no commit `e7b5346`, protege o conteúdo da colaboração, mas
não controla quem entra nem registra quem fez cada alteração. Funciona bem em
navegadores, no toque e offline, e serve como substituto para diagramas
básicos. A interface agrada e é fácil de reconhecer, mas iniciantes erram e
pedem ajuda, e o canvas é praticamente inacessível ao leitor de tela.

| Objetivo | Percentual | Julgamento |
| --- | ---: | --- |
| O1 · Proteção das informações e controle de acesso | 41,7% | Não atendido |
| O2 · Identificação, responsabilização e riscos | 13,9% | Não atendido |
| O3 · Adaptabilidade a ambientes e dispositivos | 66,7% | Parcialmente atendido |
| O4 · Substituibilidade e migração | 75,0% | Atendido |
| O5 · Compreensão, aprendizagem e operação | 71,4% | Parcialmente atendido |
| O6 · Acessibilidade e perfis | 31,3% | Não atendido |

Para as decisões do [propósito](../fase_planejamento/proposito-partes-interessadas.md):
o link gratuito **não é recomendado** para diagramas sensíveis; o uso
pedagógico com alunos no celular ou com deficiência **não atinge o critério**;
e a migração do draw.io ou do Miro é **recomendada só para diagramas
básicos**. O cálculo e a justificativa estão nos [resultados](resultados.md).

**Limitações.** Os julgamentos valem para o commit, o ambiente local e os
seis participantes avaliados. As ameaças e as limitações acima limitam o
quanto se pode generalizar.

**Contribuições.**

- Avaliação reprodutível: 51 métricas GQM ligadas a 20 questões e 6
  objetivos, cada uma com evidência, commit e regra de pontuação.
- Scripts reutilizáveis em [`scripts/`](https://github.com/FCTE-Qualidade-de-Software-1/2026-2_T02_ADA_LOVELACE/tree/main/scripts),
  para o teste offline, as resoluções, o toque e a acessibilidade.
- Protocolo de sessões com participantes, com perfis, tarefas e registro
  anônimo.
- 16 oportunidades de melhoria, uma por métrica com nota 0, cada uma com
  recomendação.

**Trabalhos futuros.**

- Medir a CI-M8 com três sessões por pessoa e ampliar a amostra, incluindo
  o perfil D e quem vem do draw.io ou do Miro.
- Repetir a F-M8 alternando a ordem das ferramentas, com quem nunca usou o
  Excalidraw.
- Testar em aparelhos reais e no Linux, e avaliar o Excalidraw+ (S-M8).
- Medir a latência do retorno visual na CI-M13 e a compreensão das
  mensagens com usuários na CI-M18.
- Conferir as sessões no vídeo, com dois avaliadores contando as ações
  erradas, como o protocolo previa.
- Repetir a avaliação numa versão mais nova para verificar as melhorias.
