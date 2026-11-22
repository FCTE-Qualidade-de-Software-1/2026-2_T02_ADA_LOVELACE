# Ameaças à validade e conclusão

## Ameaças à validade

As ameaças seguem os quatro tipos de Wohlin et al. (2012) ([ref. 41](../referencias.md)): construção,
interna, externa e de conclusão. Para cada uma, a tabela mostra o que foi
feito para reduzi-la e quanto ela pode mudar o resultado. O detalhe de cada
caso está nas [limitações dos resultados](resultados.md#limitacoes) e nas
evidências.

| Tipo | Ameaça | Como foi tratada | Efeito no resultado |
| --- | --- | --- | --- |
| Construção | Algumas métricas medem uma aproximação do atributo: a CI-M18 classifica o texto das mensagens no código, sem medir se o usuário entende; a CI-M13 vê o retorno visual, sem medir a latência; a CI-M5 conta qualquer pergunta como ajuda, inclusive sobre o enunciado ("o que é elipse?") | Regra escrita na evidência antes da nota; CI-M13 e CI-M18 ficam provisórias | A CI-M5 (nota 0) e a CI-M18 (nota 0) podem subestimar a capacidade de interação |
| Construção | Denominadores escolhidos por quem mediu: F-M10 (5 formatos), CI-M7 (74 funções), CI-M10 (17 funções), F-M7 (42 funções do draw.io), S-M1 (por tipo de evento, 83,3%, e não por volume, 99,5%) e S-M6 (só o teste real) | Lista registrada em cada evidência e levada ao grupo na #77 | Com 3 formatos na F-M10, o O4 iria a 83,3%; com o modelo automatizado na S-M6, o O1 cairia a 33,3%. Nenhum julgamento muda |
| Construção | A CI-M8 exige três sessões com a mesma pessoa, e cada participante fez uma | A métrica fica sem valor, não vira zero, e a CI-Q3 fica sem média | O O5 sai das outras 7 questões (71,4%); com a CI-Q3 só pela CI-M7, 68,8%; com a CI-M8 como 0, 65,6%. Sempre parcial |
| Interna | Na F-M8, o Excalidraw veio primeiro, e o participante chegou ao Lucidchart já conhecendo o diagrama | Ordem registrada na ficha | Favorece a ferramenta anterior; mesmo assim, o Excalidraw foi mais rápido (razão 0,71) |
| Interna | O P05, único do perfil C, marcou no questionário que já usava o Excalidraw "regularmente" | Registrado como limitação na F-M8 e na F-M9; classificação a confirmar com a facilitadora | Favorece o Excalidraw. Se o P05 não valer como perfil C, F-M8 e F-M9 ficam sem valor, e o O4 passa a depender só da migração de dados (F-Q4) |
| Interna | Um único avaliador por coleta. Nas sessões, as ações erradas foram contadas por uma pessoa, pela transcrição, e o protocolo previa dois avaliadores pela gravação | Revisão de cada evidência por outro integrante no PR; reavaliação independente da CI-M26 (sem divergência) e da CI-M18 (em andamento na #77) | A CI-M17 (28,0% de ações erradas) pode variar com outro avaliador |
| Interna | Uso de IA na coleta, nos scripts e nos cálculos | Declarado em [Uso de IA](../uso-ia.md), com a forma de conferência de cada integrante | Baixo: as notas e as médias do relatório foram reconferidas contra as evidências e o CSV das sessões |
| Externa | Commit fixo `e7b5346`, em instância local: servidor de colaboração local (`excalidraw-room`), IA com servidor falso e Excalidraw+ fora do escopo | Commit fixado no plano e recorte declarado em cada página; nem toda coleta confirmou o hash, e a S-M13 usou a resposta pública | Os resultados valem para esse commit e esse ambiente, não para a versão implantada nem para o produto pago |
| Externa | Celular e tablet emulados no Chrome (F-M4); aparelhos reais só na F-M2 e na F-M3; Linux não testado; leitor de tela só NVDA com Edge | Ambiente registrado em cada evidência | O toque (25 de 25 funções) pode não se repetir em aparelhos reais, que já mostraram falhas no Android e no iPadOS |
| Externa | Cinco participantes, sem nenhum do perfil D (acessibilidade); a ferramenta anterior foi o Lucidchart, enquanto a F-M7 comparou com o draw.io | Perfis e ferramentas registrados no CSV e nas fichas | Os resultados das sessões não se estendem a pessoas com deficiência nem a quem vem do draw.io ou do Miro |
| Conclusão | Amostras muito pequenas: n = 1 na F-M8 e na F-M9, 1 experiente contra 2 iniciantes na CI-M11 e n = 3 na CI-M1. Os resultados são descritivos, sem teste estatístico | Valores individuais publicados junto com as médias | Uma tarefa ou uma pessoa muda a nota: se a T6 contasse na F-M9, a nota cairia a 0 e o O4 a 58,3% (parcial); com o P05 entre os iniciantes, a CI-M11 iria a 0,57 (nota 1) |
| Conclusão | O O4 fica no limite exato de 75%, e as médias dão o mesmo peso a cada questão, tenha ela uma métrica (CI-Q10) ou quatro (CI-Q9) | Método da [seção 6 do roteiro](roteiro.md#6-criterios-de-julgamento), fixado antes da coleta; sensibilidade calculada | Dos cenários alternativos desta tabela, só o da T6 muda um julgamento (O4) |

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
cinco participantes avaliados. As ameaças acima e as notas provisórias
(CI-M6, CI-M11, CI-M13, CI-M14 e CI-M18) limitam o quanto se pode
generalizar.

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
- Fechar as notas provisórias: latência na CI-M13 e compreensão das
  mensagens com usuários na CI-M18.
- Repetir a avaliação numa versão mais nova para verificar as melhorias.
