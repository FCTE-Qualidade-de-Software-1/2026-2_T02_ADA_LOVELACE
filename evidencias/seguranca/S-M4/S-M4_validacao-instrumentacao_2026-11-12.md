# S-M4 — Validação posterior da instrumentação

Data: 2026-11-12. Responsável: Renato Araújo Gameiro (`renatoyx`), com assistência de agente.

Este registro documenta ajustes posteriores à auditoria. Não constitui nova coleta, não substitui os snapshots e não atribui à instrumentação original controles introduzidos depois. A medição do commit `85f4225ccb2c76cceeffb8d25fb27a53caaef89f` permanece **S-M4 = Sim, GQM 0/2**.

## Alterações e limites

| Componente | Antes | Depois |
| --- | --- | --- |
| Listeners | `pageerror` apenas na primeira página | `pageerror` e `crash` em páginas existentes e em cada evento `page` do contexto, incluindo a aba reaberta; sem duplicação |
| Falhas | Exceções de biblioteca, imagem e TTD absorvidas, sem falhar o processo | Todas as etapas necessárias aos oito snapshots são obrigatórias; exceções interrompem a execução e retornam código 1 |
| Diagnósticos futuros | Uma lista `errors`, com cobertura incompleta | `capturedErrors`, `fatalFailures` e `optionalFailures` separados; erros de página/crash impedem sucesso; só falhas de captura/DOM permitem `complete-with-warnings` |
| Versão | SHA constante | Leitura real de `git rev-parse HEAD^{commit}`, exigência do SHA oficial e ausência de alterações rastreadas; validação antes da saída, do Playwright ou do navegador |
| Versão servida | Sem associação comprovada ao Vite | Continua **não verificada**; `checkoutVersion.servedAssociation = not-verified` não afirma a versão atendida pela porta |
| Verificação | Subconjunto de marcadores, IDs e registros, com algumas contagens apenas impressas | Oito snapshots únicos e ordenados; horários, origem, versões disponíveis, bancos/stores, contagens/tipos, texto e propriedades persistidas, IDs, vínculo da imagem, SVG, biblioteca, prompt e resposta fixa; falha explícita na CLI |
| Evidências | Saída padrão na pasta original, com risco de sobrescrita | Pasta temporária nova por padrão; pasta explícita precisa ser inexistente; nada é acrescentado ao JSON legado |

O verificador distingue o registro original sem `schemaVersion` do schema 2 futuro. No legado, o campo `commit` continua sendo tratado como declaração histórica, e `errors: []` mantém sua limitação original. Não há recaptura de erros antigos. A verificação de versão do checkout não é um atestado sobre o processo Vite. Os listeners não capturam todo o console ou tráfego de rede.

Os ensaios de schema 2 usam cópias sintéticas temporárias do JSON original somente como fixtures de teste. Não são resultados observados e não foram incorporados às evidências de medição.

## Comandos e resultados

Na raiz do repositório da disciplina, na branch `feat/seguranca-sm4-armazenamento-local`:

```powershell
node --check evidencias/seguranca/S-M4/S-M4_coleta_2026-11-12.cjs
node --check evidencias/seguranca/S-M4/S-M4_verificar_2026-11-12.cjs
node --check evidencias/seguranca/S-M4/S-M4_testes-instrumentacao_2026-11-12.cjs
node evidencias/seguranca/S-M4/S-M4_verificar_2026-11-12.cjs
node evidencias/seguranca/S-M4/S-M4_coleta_2026-11-12.cjs "$env:TEMP/sm4-e7b5346-20261112" --check-version
node evidencias/seguranca/S-M4/S-M4_testes-instrumentacao_2026-11-12.cjs "$env:TEMP/sm4-e7b5346-20261112"
git diff --check
& "$env:TEMP/sm4-mkdocs-20261112/Scripts/python.exe" -m mkdocs build --strict --site-dir "$env:TEMP/sm4-site-20261112"
```

| Verificação executada | Resultado |
| --- | --- |
| Sintaxe dos três scripts | Exit 0 |
| Verificador reforçado sobre JSON original | Exit 0; oito snapshots; versão descrita como declaração legada; `result: Sim`, `score: 0` |
| SHA correto no checkout oficial existente | Exit 0; detectado `e7b534668a60add7f725531f3c9abf32508c7b4e`; associação ao Vite não verificada |
| SHA incorreto | A CLI rejeitou o Git real do repositório da disciplina, cujo HEAD difere do SHA exigido; exit 1; nenhum diretório de saída criado; checkout oficial não modificado |
| Suíte de testes | **46 testes passaram**, sem iniciar navegador ou repetir a coleta |
| `git diff --check` | Exit 0 |
| MkDocs estrito | Exit 0; `Documentation built in 1.23 seconds` |
| Preservação das evidências | Três JSONs, três PNGs e SVG comparados por bytes com o commit original: idênticos |

Os 46 testes incluem: ausência de cada um dos oito snapshots; duplicação/ordem; commit incorreto; navegador ausente ou User-Agent incompatível; versão de banco, origem e horário inválidos; elemento removido; texto alterado; IDs alterados/duplicados; vínculo `fileId`; ID/conteúdo do arquivo; biblioteca/chat ausentes ou alterados; prompt e resposta incorretos; IDs de mensagens duplicados; erros legados; JSON malformado; SHA correto/incorreto; schema 2 válido/inválido; versão detectada incorreta; alegação indevida sobre o Vite; erros capturados/falhas obrigatórias/status incompleto; aviso opcional; listeners em duas páginas; propagação de falha obrigatória; recusa de saída existente; preservação do JSON original.

Os testes negativos chamam a CLI em processos separados e exigem saída 1 com o motivo esperado. O teste de listeners usa emissores de eventos controlados para exercitar o registro e a captura em páginas existentes/reabertas; não é nova navegação no Excalidraw. O teste de saída preserva um arquivo sentinela em um diretório temporário já existente.

## Uso futuro sem sobrescrever o registro original

O comando de coleta histórico permanece no relatório principal como parte do que foi executado. Com o coletor reforçado, omitir a pasta de saída cria uma pasta temporária exclusiva e imprime seu caminho. Para conferir um novo resultado:

```powershell
node evidencias/seguranca/S-M4/S-M4_verificar_2026-11-12.cjs '<nova-pasta>/S-M4_inspecao_2026-11-12.json'
```

A saída textual antiga `S-M4_verificacao_2026-11-12.txt` pertence ao verificador histórico, não ao formato atual de saída. Nenhuma execução posterior deve sobrescrever esse arquivo, os snapshots ou as capturas originais.
