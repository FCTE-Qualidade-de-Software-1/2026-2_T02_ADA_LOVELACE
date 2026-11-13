# S-M3 — Manifesto das sete capturas

Manifesto elaborado após a revisão técnica da issue #56, a partir dos arquivos existentes e do histórico da execução de 12/11/2026. Não houve repetição do teste, nova captura ou geração de logs de execução. As identificações E1–E7 seguem o registro principal; as letras A–D representam os clientes descritos no procedimento.

## Origem e grau de confirmação

- **Registrado nos arquivos:** conteúdo visual de cada JPEG; em E8, texto e snapshots DOM gravados às `2026-11-12T14:55:37.084Z` e `2026-11-12T14:56:04.376Z`; em E9, SHA do checkout e trechos de código. Os horários de E8 são dos blocos de registro, não horários individuais das capturas.
- **Registrado no histórico da execução:** criação das abas, URLs de navegação, identificadores devolvidos pela ferramenta (A = aba `1`, B = aba `2`, C = aba `3`, D = aba `4`), comandos que iniciaram o servidor e chamadas que salvaram os JPEGs. Esses identificadores são locais à sessão do navegador, não IDs de socket, usuários autenticados ou campos embutidos nos JPEGs.
- **Reconstruído neste manifesto:** associação entre cada arquivo, cliente/aba e momento do procedimento, pela sequência das chamadas no histórico. O conteúdo visível pode ser conferido no próprio arquivo, mas a sequência e as identidades não podem ser deduzidas apenas da imagem.
- **Não informado:** horário exato de cada captura e IDs de socket dos clientes. Não se usaram nomes, datas de criação ou modificação dos arquivos para inferir esses valores.

**V1 — Versão associada à execução:** Excalidraw `e7b534668a60add7f725531f3c9abf32508c7b4e`. O SHA está registrado em E9; a vinculação das capturas a esse checkout é reconstruída dos comandos de inicialização e navegação no histórico. Nenhum JPEG exibe o SHA ou comprova isoladamente a versão servida.

**Ambiente associado:** Vite em `http://127.0.0.1:3013/`, iniciado na cópia temporária `sm3-e7b5346-20261112/excalidraw-app`; servidor oficial `excalidraw-room` em `http://localhost:3014`, revisão `03ff435860b508d7cd9e005cfc90f7977ae2a593`. Origem: comandos e saídas no histórico, sintetizados na seção 3.1 do registro principal; E9 registra a revisão do servidor.

## Inventário e limites

| ID e arquivo | Horário exato da captura | Cliente/aba associado | Contexto e comprovação visual | Versão | Origem da associação e limitações |
| --- | --- | --- | --- | --- | --- |
| E1 — [S-M3_criar-sala_2026-11-12.jpg](S-M3_criar-sala_2026-11-12.jpg) | Não informado | A / `1` | Diálogo anterior à criação, com Iniciar sessão e aviso de criptografia; sem campos de senha ou prazo. | V1 | Reconstruído da chamada de gravação antes de Iniciar sessão. O JPEG não identifica aba, URL ou versão. |
| E2 — [S-M3_sala-ativa_2026-11-12.jpg](S-M3_sala-ativa_2026-11-12.jpg) | Não informado | A / `1` | Nome `SM3-A`, campo de link, QR code, copiar e Parar sessão; texto explica que sair não afeta os outros participantes. | V1 | Reconstruído da chamada de gravação após nomear A e fechar o aviso. Nome e início do link local são visíveis; não há barra de endereço ou SHA. |
| E3 — [S-M3_dois-clientes_2026-11-12.jpg](S-M3_dois-clientes_2026-11-12.jpg) | Não informado | B / `2` | Retângulo selecionado e contador 2 antes da saída de A. | V1 | Reconstruído da gravação após desenhar em B. O contador comprova a quantidade exibida, não a identidade das duas conexões. |
| E4 — [S-M3_link-anterior-apos-saida_2026-11-12.jpg](S-M3_link-anterior-apos-saida_2026-11-12.jpg) | Não informado | C / `3` | Modal de erro de salvamento no Firebase sobre o canvas; contador 2 ao fundo. Não comprova visualmente o retângulo recebido por C. | V1 | Reconstruído da gravação em C após a entrada pelo link original. E8 foi gravado às 14:55:37.084 UTC no mesmo bloco de trabalho, sem fornecer o horário exato do JPEG. A imagem não identifica URL, sequência A/B/C ou conteúdo recebido. |
| E5 — [S-M3_compartilhar-cena_2026-11-12.jpg](S-M3_compartilhar-cena_2026-11-12.jpg) | Não informado | D / `4` | Salvar como: arquivo, Link compartilhável, Exportar link e Excalidraw+, sem os três controles avaliados. | V1 | Reconstruído da gravação após menu > Salvar como. Não demonstra criação bem-sucedida de um link. |
| E6 — [S-M3_limite-firebase_2026-11-12.jpg](S-M3_limite-firebase_2026-11-12.jpg) | Não informado | B / `2` | Modal de falha ao salvar no banco de dados; ferramenta Retângulo ativa e texto do erro selecionado. | V1 | Reconstruído da gravação antes de dispensar o aviso em B e desenhar. Não demonstra perda da cena ou política de acesso remoto. |
| E7 — [S-M3_limite-link-cena_2026-11-12.jpg](S-M3_limite-link-cena_2026-11-12.jpg) | Não informado | D / `4` | Erro de criação de link sobre o diálogo Salvar como. | V1 | Reconstruído da gravação após Exportar link. O bloco textual de E8 foi gravado às 14:56:04.376 UTC; esse horário não é o horário exato do JPEG. A causa associada ao backend indisponível vem da configuração/histórico, não apenas da mensagem visível. |

## Endereços e sequência registrados

E8 registra a URL de teste `http://127.0.0.1:3013/#room=c5adaeee85d98d892a90,-VFIyEEy2ZGkft-0curOlA` e o retorno de A a `http://127.0.0.1:3013/` depois de Parar sessão. A associação de B e C ao mesmo link vem do registro textual e das navegações no histórico, não das capturas E3/E4, que não incluem barra de endereço. D foi aberto na URL sem fragmento, conforme o histórico.

O relato de recebimento do retângulo por C permanece preservado em E8 e nas observações/snapshots do histórico. O snapshot DOM de C em E8 mostra contador 2 e erro de persistência, sem descrever elementos do canvas. E4 não deve ser usada como prova visual desse recebimento. Nenhum desses registros equivale a um log de eventos de rede ou a uma captura completa da sequência.

## Referências

- [Registro principal da S-M3](S-M3_mecanismos-controle-acesso.md), seções 3, 4.2 e 6.
- [E8 — observação e snapshots DOM](S-M3_observacao_2026-11-12.txt), com nota editorial posterior separada dos snapshots originais.
- [E9 — código e comandos](S-M3_codigo_2026-11-12.txt), para a versão e o código associados à execução.
