# Objetivos de medição GQM

A definição dos objetivos de medição foi fundamentada no método
*Goal–Question–Metric* (GQM), considerando o modelo de qualidade de produto
estabelecido pela ISO/IEC 25010:2023 e sua adaptação ao contexto do
Excalidraw. Os objetivos foram estruturados a partir de cinco elementos:
objeto de análise, propósito da medição, foco da qualidade, ponto de vista dos
interessados e contexto de avaliação.

A partir das características de Segurança (*Security*), Flexibilidade
(*Flexibility*) e Capacidade de interação (*Interaction Capability*), foram
definidos seis objetivos de medição, associados às subcaracterísticas
selecionadas na Fase 1. Essa organização busca estabelecer propósitos
específicos para as necessidades de informação identificadas, considerando o
escopo e as restrições de tempo e recursos já definidos pelo projeto.

A decomposição dos objetivos foi realizada segundo a proximidade entre os
aspectos de qualidade investigados e suas perspectivas de avaliação. Em
Segurança, foram diferenciadas a proteção das informações e a investigação de
mecanismos de identificação, responsabilização e exposição a riscos. Em
Flexibilidade, distinguiram-se a adaptabilidade a diferentes ambientes e a
substituibilidade de ferramentas. Na Capacidade de interação, foram agrupados
os aspectos relacionados à experiência geral de utilização, mantendo-se um
objetivo específico para inclusividade e assistência ao usuário.

A estrutura resultante preserva a rastreabilidade entre o modelo de qualidade
adaptado, os objetivos conceituais e as questões e métricas já definidas no
roteiro de análise. A quantidade de objetivos representa uma decisão
metodológica da equipe, não uma determinação da ISO/IEC 25010:2023.

## 1. Segurança — ISO/IEC 25010:2023

### 1.1 — Proteção das informações e controle de acesso

| Elemento GQM | Definição |
| --- | --- |
| **Analisar** | Os mecanismos de armazenamento, compartilhamento e colaboração em tempo real do Excalidraw |
| **Com o propósito de** | Identificar fragilidades e oportunidades de melhoria na proteção dos diagramas e na restrição de acessos não autorizados |
| **Com respeito à** | Confidencialidade e integridade |
| **Do ponto de vista** | Dos usuários que criam e compartilham diagramas potencialmente sensíveis |
| **No contexto de** | Armazenamento local, compartilhamento por links e sessões colaborativas em tempo real na versão web pública |

A utilização de sessões colaborativas e links de compartilhamento introduz
situações nas quais a confidencialidade e a integridade dos dados tornam-se
relevantes para a qualidade do produto.

### 1.2 — Identificação, responsabilização e riscos de segurança

| Elemento GQM | Definição |
| --- | --- |
| **Analisar** | Os mecanismos de identificação dos participantes, os registros de ações e os componentes técnicos de segurança do Excalidraw |
| **Com o propósito de** | Identificar limitações nos mecanismos de identificação e responsabilização dos participantes, bem como riscos associados a vulnerabilidades conhecidas |
| **Com respeito à** | Responsabilização, autenticidade e resistência |
| **Do ponto de vista** | Dos usuários de sessões colaborativas e dos desenvolvedores ou mantenedores da aplicação |
| **No contexto de** | Sessões colaborativas por links compartilhados e análise técnica da versão selecionada do código-fonte e da aplicação web pública |

A colaboração em tempo real torna pertinente investigar a capacidade da
aplicação de identificar participantes e atribuir ações aos respectivos
responsáveis. A análise de vulnerabilidades conhecidas complementa o objetivo
como indicador de possíveis fontes de risco, sem representar, isoladamente,
uma avaliação completa da resistência a ataques.

## 2. Flexibilidade — ISO/IEC 25010:2023

### 2.1 — Adaptabilidade a diferentes ambientes e dispositivos

| Elemento GQM | Definição |
| --- | --- |
| **Analisar** | As funcionalidades de criação e edição de diagramas do Excalidraw |
| **Com o propósito de** | Identificar limitações de compatibilidade e adaptação que possam comprometer a utilização das funcionalidades essenciais em diferentes ambientes |
| **Com respeito à** | Adaptabilidade |
| **Do ponto de vista** | Dos usuários finais que acessam a aplicação em diferentes dispositivos e plataformas |
| **No contexto de** | Utilização nos navegadores, sistemas operacionais, dispositivos e resoluções de tela selecionados no projeto |

A disponibilização do Excalidraw como aplicação web possibilita sua utilização
em diferentes ambientes de hardware e software. A avaliação permanece
limitada à matriz de ambientes definida pela equipe.

### 2.2 — Substituibilidade e migração de diagramas

| Elemento GQM | Definição |
| --- | --- |
| **Analisar** | As funcionalidades de criação, importação e exportação de diagramas do Excalidraw |
| **Com o propósito de** | Determinar a viabilidade de substituição de ferramentas equivalentes e identificar limitações na preservação das informações durante a migração |
| **Com respeito à** | Substituibilidade |
| **Do ponto de vista** | Dos usuários que utilizam ferramentas de diagramação e necessitam migrar suas atividades ou arquivos |
| **No contexto de** | Comparação com as ferramentas equivalentes e os formatos selecionados no projeto |

A importação e a exportação são consideradas evidências de substituibilidade
porque o interesse da parte envolvida é migrar o trabalho de uma ferramenta
para outra. Essa decisão não amplia a avaliação para toda a característica de
compatibilidade ou interoperabilidade.

## 3. Capacidade de interação — ISO/IEC 25010:2023

### 3.1 — Compreensão, aprendizagem e operação da interface

| Elemento GQM | Definição |
| --- | --- |
| **Analisar** | A interface de criação e edição de diagramas e seus mecanismos de interação no Excalidraw |
| **Com o propósito de** | Identificar dificuldades de compreensão, aprendizagem e operação, limitações na prevenção e recuperação de erros e aspectos que comprometam o engajamento dos usuários |
| **Com respeito à** | Reconhecibilidade da adequação, apreensibilidade, operabilidade, proteção contra erros do usuário, engajamento do usuário e autodescritividade |
| **Do ponto de vista** | Dos usuários finais, iniciantes e experientes |
| **No contexto de** | Reconhecimento inicial da aplicação e execução das tarefas de criação e edição definidas no projeto |

A capacidade de interação envolve reconhecer a adequação da ferramenta,
compreender suas funções, aprender os procedimentos necessários e operar a
interface de forma previsível. A autodescritividade complementa esses aspectos
ao reduzir a necessidade de consultas externas.

### 3.2 — Acessibilidade e adequação a diferentes perfis de usuários

| Elemento GQM | Definição |
| --- | --- |
| **Analisar** | Os mecanismos de navegação, interação e apresentação das informações do Excalidraw |
| **Com o propósito de** | Identificar barreiras que possam restringir a utilização da aplicação por usuários com diferentes características, capacidades e necessidades de interação |
| **Com respeito à** | Inclusividade e assistência ao usuário |
| **Do ponto de vista** | Dos usuários com diferentes necessidades de acessibilidade e interação |
| **No contexto de** | Cenários e mecanismos de acessibilidade definidos no projeto |

A manutenção de um objetivo específico justifica-se pela necessidade de
procedimentos próprios de avaliação, capazes de identificar barreiras que
podem não ser evidenciadas pelos testes gerais de interação.

<!-- tabelas para o overleaf

\subsection{Objetivos de medição}

Os objetivos de medição foram definidos com base no método
\textit{Goal--Question--Metric} (GQM), considerando o modelo
estabelecido pela ISO/IEC 25010:2023 e sua adaptação ao Excalidraw.
Cada objetivo é descrito por cinco elementos: objeto de análise,
propósito, foco da qualidade, ponto de vista e contexto.

Foram definidos seis objetivos, distribuídos entre Segurança,
Flexibilidade e Capacidade de interação. O objeto geral da
avaliação é a versão web pública do Excalidraw
(\url{https://excalidraw.com}), sendo cada objetivo direcionado
a mecanismos e funcionalidades específicos do produto.

As Tabelas~\ref{tab:objetivos-seguranca},
\ref{tab:objetivos-flexibilidade} e
\ref{tab:objetivos-interacao} apresentam os objetivos no
nível conceitual do GQM.

% SEGURANÇA
\begin{table*}[!t]
\caption{Objetivos de medição de Segurança (nível conceitual). Fonte: elaboração própria.}
\label{tab:objetivos-seguranca}
\centering
\footnotesize
\begin{tabular}{@{}L{2.8cm} L{6.8cm} L{6.8cm}@{}}
\toprule
& \textbf{O1: Proteção das informações e controle de acesso}
& \textbf{O2: Identificação, responsabilização e riscos de segurança}\\
\midrule
\textbf{Analisar}
& os mecanismos de armazenamento, compartilhamento e colaboração em tempo real do Excalidraw
& os mecanismos de identificação dos participantes, os registros de ações e os componentes técnicos de segurança do Excalidraw\\
\textbf{Com o propósito de}
& identificar fragilidades e oportunidades de melhoria na proteção dos diagramas e na restrição de acessos não autorizados
& identificar limitações na identificação e responsabilização dos participantes e na exposição da aplicação a vulnerabilidades conhecidas\\
\textbf{Com respeito à}
& confidencialidade e integridade
& responsabilização, autenticidade e resistência\\
\textbf{Do ponto de vista}
& dos usuários que criam e compartilham diagramas potencialmente sensíveis
& dos usuários de sessões colaborativas e dos desenvolvedores ou mantenedores da aplicação\\
\textbf{No contexto de}
& armazenamento local, compartilhamento por links e sessões colaborativas em tempo real na versão web pública
& sessões colaborativas por links e análise técnica da versão selecionada do código-fonte e da aplicação web pública\\
\bottomrule
\end{tabular}
\end{table*}

% FLEXIBILIDADE
\begin{table*}[!t]
\caption{Objetivos de medição de Flexibilidade (nível conceitual). Fonte: elaboração própria.}
\label{tab:objetivos-flexibilidade}
\centering
\footnotesize
\begin{tabular}{@{}L{2.8cm} L{6.8cm} L{6.8cm}@{}}
\toprule
& \textbf{O3: Adaptabilidade a ambientes e dispositivos}
& \textbf{O4: Substituibilidade e migração de diagramas}\\
\midrule
\textbf{Analisar}
& as funcionalidades de criação e edição de diagramas do Excalidraw
& as funcionalidades de criação, importação e exportação de diagramas do Excalidraw\\
\textbf{Com o propósito de}
& identificar limitações de compatibilidade e adaptação que possam comprometer a utilização das funcionalidades essenciais
& determinar a viabilidade de substituição de ferramentas equivalentes e identificar limitações na preservação das informações durante a migração\\
\textbf{Com respeito à}
& adaptabilidade
& substituibilidade\\
\textbf{Do ponto de vista}
& dos usuários finais que acessam a aplicação em diferentes dispositivos e plataformas
& dos usuários que utilizam ferramentas de diagramação e necessitam migrar atividades ou arquivos\\
\textbf{No contexto de}
& utilização em navegadores, sistemas operacionais, dispositivos e resoluções selecionados, incluindo diferentes condições de conectividade
& comparação com ferramentas equivalentes e operações de importação e exportação em formatos selecionados\\
\bottomrule
\end{tabular}
\end{table*}

% CAPACIDADE DE INTERAÇÃO
\begin{table*}[!t]
\caption{Objetivos de medição de Capacidade de interação (nível conceitual). Fonte: elaboração própria.}
\label{tab:objetivos-interacao}
\centering
\footnotesize
\begin{tabular}{@{}L{2.8cm} L{6.8cm} L{6.8cm}@{}}
\toprule
& \textbf{O5: Compreensão, aprendizagem e operação da interface}
& \textbf{O6: Acessibilidade e adequação a diferentes perfis}\\
\midrule
\textbf{Analisar}
& a interface de criação e edição de diagramas e seus mecanismos de interação no Excalidraw
& os mecanismos de navegação, interação e apresentação das informações do Excalidraw\\
\textbf{Com o propósito de}
& identificar dificuldades de compreensão, aprendizagem e operação, limitações na prevenção e recuperação de erros e aspectos que comprometam o engajamento dos usuários
& identificar barreiras que possam restringir a utilização da aplicação por usuários com diferentes características, capacidades e necessidades de interação\\
\textbf{Com respeito à}
& reconhecibilidade da adequação, apreensibilidade, operabilidade, proteção contra erros do usuário, engajamento do usuário e autodescritividade
& inclusividade e assistência ao usuário\\
\textbf{Do ponto de vista}
& dos usuários finais, iniciantes e experientes
& dos usuários com diferentes necessidades de acessibilidade e interação\\
\textbf{No contexto de}
& reconhecimento inicial da aplicação e execução de tarefas de criação e edição de diagramas, utilizando mouse e teclado
& criação e edição de diagramas por navegação exclusivamente por teclado, utilização de leitores de tela e avaliação de contraste e idioma\\
\bottomrule
\end{tabular}
\end{table*} -->

## 4. Matriz de rastreabilidade dos objetivos GQM

A matriz abaixo não altera as questões ou métricas existentes; apenas explicita
como elas contribuem para os seis objetivos conceituais. Quando uma questão
reúne métricas de mais de um objetivo, a rastreabilidade é indicada no nível
da métrica.

| Característica | Objetivo | Subcaracterísticas | Questões existentes | Métricas existentes |
| --- | --- | --- | --- | --- |
| Segurança | **O1** | Confidencialidade e integridade | S-Q1 a S-Q3 | S-M1 a S-M7 |
| Segurança | **O2** | Responsabilização, autenticidade e resistência | S-Q4 a S-Q6 | S-M8 a S-M14 |
| Flexibilidade | **O3** | Adaptabilidade | P-Q1 e P-Q2 | P-M1 a P-M6 |
| Flexibilidade | **O4** | Substituibilidade | P-Q3 e P-Q4 | P-M7 a P-M12 |
| Capacidade de interação | **O5** | Reconhecibilidade da adequação, apreensibilidade, operabilidade, proteção contra erros, engajamento e autodescritividade | U-Q1 a U-Q6 | U-M1 a U-M21 |
| Capacidade de interação | **O6** | Inclusividade e assistência ao usuário | U-Q6 | U-M22 a U-M26 |

## 9. Ajustes recomendados nas questões e métricas

As recomendações abaixo registram os ajustes necessários para uma etapa
posterior, sem modificar neste documento as questões e métricas já definidas
no roteiro de análise.

| Objetivo | Ponto de revisão |
| --- | --- |
| **O1** | Diferenciar alterações maliciosas de problemas comuns de sincronização; revisar a vinculação da métrica de armazenamento local à questão pertinente. |
| **O2** | Preservar julgamentos separados sobre autenticidade, responsabilização e resistência; indicadores de dependências vulneráveis não demonstram sozinhos resistência geral a ataques. |
| **O3** | Delimitar os ambientes efetivamente testados; tratar a operação offline sem extrapolar a conclusão para toda a adaptabilidade. |
| **O4** | Justificar importação/exportação como evidência complementar à substituibilidade, considerando também a relação possível com interoperabilidade. |
| **O5** | Atualizar a antiga estética para engajamento e incorporar autodescritividade; o SUS mede usabilidade percebida em sentido amplo, não apenas apresentação visual. |
| **O6** | Organizar medidas de acessibilidade em torno de inclusividade e assistência ao usuário, distinguindo seus propósitos; esclarecer o alcance de testes por teclado, leitores de tela e contraste. |

## 10. Referências

1. INTERNATIONAL ORGANIZATION FOR STANDARDIZATION. *ISO/IEC 25010:2023:
   Systems and software engineering — Systems and software Quality
   Requirements and Evaluation (SQuaRE) — Product quality model*. Geneva:
   ISO, 2023. Disponível em:
   <https://www.iso.org/standard/78176.html>.
2. BASILI, Victor R.; CALDIERA, Gianluigi; ROMBACH, H. Dieter. *The Goal
   Question Metric approach*. In: Encyclopedia of Software Engineering. New
   York: Wiley, 1994.
3. ISO/IEC. *ISO/IEC 25023:2016: Systems and software engineering — SQuaRE —
   Measurement of system and software product quality*. Geneva: ISO, 2016.
4. ISO/IEC. *ISO/IEC 25040:2011: Systems and software engineering — SQuaRE —
   Evaluation process*. Geneva: ISO, 2011.

A lista bibliográfica consolidada do projeto está em
[Referências](../referencias.md).
