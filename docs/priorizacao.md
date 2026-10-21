# Priorização de qualidades

A seleção das características do
[modelo de qualidade](fase1/modelo-qualidade.md) usou uma matriz
**impacto × risco** aplicada às nove características da ISO/IEC 25010:2023.
O impacto (I, de 1 a 5) mede a consequência de uma falha para as
[partes interessadas](fase1/proposito-partes-interessadas.md): 1, nenhuma é
afetada; 3, limita parte das funções; 5, dano irreversível ou que inviabiliza
uma decisão da Tabela 1. O risco (R, de 1 a 5) mede a probabilidade de falha
antes da medição: 1, nenhum sinal; 3, a função existe, mas há condições não
cobertas; 5, falha conhecida. Foram selecionadas as características com
**I × R ≥ 10** que podem ser medidas no escopo e no prazo da disciplina.

| Característica | I | R | I × R | Mensurável | Justificativa |
| --- | --- | --- | --- | --- | --- |
| **Segurança** | 5 | 4 | **20** | Sim | Vazamento é irreversível e veta o uso do link gratuito (O1, O2); não há login, a chave vai no link e o texto é enviado à IA |
| **Capacidade de interação** | 4 | 4 | **16** | Sim | Exclui quem depende do teclado ou de leitor de tela (O5, O6); o canvas é pouco acessível a tecnologias assistivas |
| **Flexibilidade** | 4 | 3 | **12** | Sim | Exclui quem só tem celular, 60% dos usuários de Internet (O3, O4); aceita toque, mas tela pequena, rede instável e migração não são garantidas |
| Confiabilidade | 3 | 2 | 6 | Não | Exige monitoramento prolongado do serviço |
| Eficiência de desempenho | 2 | 2 | 4 | Não | Depende do equipamento e da rede |
| Compatibilidade | 2 | 2 | 4 | Sim | Troca de arquivos coberta por substituibilidade |
| Manutenibilidade | 2 | 2 | 4 | Não | Exige análise estática extensa |
| Adequação funcional | 3 | 1 | 3 | Sim | Funções de desenho maduras |
| Proteção (*safety*) | 1 | 1 | 1 | — | Sem risco físico ou ambiental |

A ordem define a sequência das medições e dos relatos de métricas com
pontuação 0 aos mantenedores; ela não altera o julgamento, e cada objetivo
continua julgado separadamente. Os detalhes das exclusões estão em
[características não selecionadas](fase1/modelo-qualidade.md#caracteristicas-nao-selecionadas).
