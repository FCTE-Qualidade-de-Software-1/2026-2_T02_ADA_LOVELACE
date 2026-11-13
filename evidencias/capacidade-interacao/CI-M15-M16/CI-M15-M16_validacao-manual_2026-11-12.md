# Conferência manual de Renato — issue #71

**Pendente de execução por Renato.** Os estados e capturas coletados pelo Codex são observações automatizadas, não validação humana. Revisão cruzada por outro integrante também pendente.

## Iniciar a versão local

Na raiz do repositório, PowerShell:

```powershell
git -C .venv/ci-m13-m14-source rev-parse HEAD
git -C .venv/ci-m13-m14-source status --short
```

Exigir SHA `e7b534668a60add7f725531f3c9abf32508c7b4e` e checkout limpo. Esse diretório contém somente o checkout oficial e dependências reutilizados, não depende da branch da issue #70. Depois:

```powershell
Set-Location .venv/ci-m13-m14-source/excalidraw-app
node ../node_modules/vite/bin/vite.js --host 127.0.0.1 --port 3021 --strictPort
```

Abrir `http://127.0.0.1:3021/` no Edge em uma janela InPrivate dedicada, sem colaboração. O coletor fecha seu servidor ao terminar; se a porta estiver ocupada, conferir o processo em vez de presumir a versão servida. Em outra máquina, clonar o repositório oficial, fixar o SHA acima e instalar as dependências com `corepack.cmd yarn install --frozen-lockfile --ignore-scripts --non-interactive`; ajustar o caminho local.

## Três situações

| Situação | Passos pela interface | O que conferir |
| --- | --- | --- |
| 1 — Limpar cena com confirmação | R, arrastar no centro para criar retângulo; T, clicar fora da forma e digitar `CONFERENCIA-CI71`, Escape. Abrir menu principal → Clear canvas. Clicar Cancel; repetir a operação e clicar Confirm | O diálogo aparece antes da exclusão. Cancel mantém desenho e texto. Confirm limpa a cena. Ctrl+Z deve restaurá-la no caso avaliado. Registrar cada etapa separadamente |
| 2 — Recarregar sem salvar | Em cena nova, criar retângulo, elipse (O) e texto `CONFERENCIA-CI71`; não usar salvar. No DevTools → Application → Local Storage da origem, conferir que a chave `excalidraw` contém os elementos e texto. Recarregar a página | Formas, texto, posições e propriedades devem retornar. Registrar o intervalo aguardado e diferenças observadas; não atribuir um tempo de resposta a partir de uma espera fixa |
| 3 — Fechar e reabrir a aba | Após a situação 2, conferir novamente o armazenamento automático. Manter outra aba InPrivate em branco aberta para preservar o mesmo contexto; fechar somente a aba da aplicação e abrir a mesma origem em outra aba InPrivate | O desenho deve retornar no mesmo contexto. Não fechar a última janela InPrivate nem o navegador: esses cenários não foram avaliados. Comparar conteúdo e propriedades, não apenas a aparência geral |

Para aprofundar a situação 1, usar o arquivo fictício `.excalidraw` da tentativa final indicada nos dois documentos de evidência: abrir pelo menu Open sobre outra cena e verificar se há decisão preventiva de substituição. A escolha do arquivo não equivale, por si só, a confirmação sobre perda de dados.

## Registrar divergência ou confirmação

Criar um arquivo novo `CI-M15-M16_revisao-renato_AAAA-MM-DD.md`, informando data/hora e fuso, SHA, navegador/versão, situação executada, passos, esperado, observado e capturas. Não sobrescrever dados ou imagens da automação. Indicar explicitamente quais situações foram realizadas e seus resultados; leitura da documentação não equivale à validação manual. Aguardar revisão do responsável antes de qualquer entrega no GitHub.
