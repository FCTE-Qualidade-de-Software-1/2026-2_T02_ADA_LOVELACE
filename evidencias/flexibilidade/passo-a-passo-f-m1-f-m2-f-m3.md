# Passo a passo — F-M1, F-M2 e F-M3

Este roteiro atende à [issue #62](https://github.com/FCTE-Qualidade-de-Software-1/2026-2_T02_ADA_LOVELACE/issues/62), parte da [issue #18](https://github.com/FCTE-Qualidade-de-Software-1/2026-2_T02_ADA_LOVELACE/issues/18).

## 1. Escopo da avaliação

- **F-M1:** repetir a mesma lista de tarefas no Chrome, Firefox, Edge e Safari.
- **F-M2:** repetir a mesma lista em Windows, Linux, macOS, Android e iOS, nos ambientes disponíveis.
- **F-M3:** registrar defeitos específicos de renderização, fontes e atalhos.
- Avaliar o Excalidraw no commit **`e7b5346`**.
- Registrar o responsável, a data, o ambiente, a versão e as evidências.

Os critérios de pontuação estão em [`docs/analise/roteiro.md`](../../docs/analise/roteiro.md):

| Métrica | 2 pontos | 1 ponto | 0 pontos |
|---|---:|---:|---:|
| F-M1 — navegadores sem falhas | ≥ 75% | 50%–74% | < 50% |
| F-M2 — sistemas sem falhas | ≥ 80% | 60%–79% | < 60% |
| F-M3 — defeitos encontrados | 0 | 1–3 | ≥ 4 |

## 2. Iniciar a tarefa

1. Abrir a issue #62.
2. Mover o cartão no Project para **Em andamento**.
3. Criar uma branch para a coleta.
4. Confirmar que a versão avaliada corresponde ao commit `e7b5346`.
5. Usar a configuração de ambiente descrita em [`evidencias/ambiente/ambiente-local.md`](../ambiente/ambiente-local.md), quando for necessário executar a instância local.

## 3. Preparar a aplicação

Na pasta `aplicacao/`:

```bash
yarn install --frozen-lockfile
cd excalidraw-app
yarn vite
```

Abrir:

```text
http://localhost:3001
```

Registrar qualquer serviço indisponível como limitação. Não misturar resultados de versões ou commits diferentes.

### 3.1 Acessar em outro dispositivo pela rede local

Para testar em um celular, tablet ou outro computador, o dispositivo e o computador que executa a aplicação precisam estar na mesma rede Wi-Fi ou Ethernet.

1. Descobrir o IP local do computador que executa a aplicação. Exemplos:

   ```bash
   # macOS
   ipconfig getifaddr en0

   # Linux
   hostname -I

   # Windows
   ipconfig
   ```

   Supondo que o IP seja `192.168.1.20`.

2. Iniciar o servidor Vite aceitando conexões da rede:

   ```bash
   cd Projeto/aplicacao/excalidraw-app
   yarn vite --host 0.0.0.0 --port 3001
   ```

3. No outro dispositivo, abrir:

   ```text
   http://192.168.1.20:3001
   ```

   Não usar `localhost:3001` no celular ou tablet, pois nesse caso `localhost` é o próprio dispositivo.

4. Se a colaboração também for testada, alterar temporariamente `aplicacao/.env.development.local` antes de iniciar o Vite:

   ```text
   VITE_APP_WS_SERVER_URL=http://192.168.1.20:3002
   ```

   O servidor `excalidraw-room` deve estar ativo com a porta publicada:

   ```bash
   docker run -d --name excalidraw-room -p 3002:80 excalidraw-room:03ff435
   ```

   Depois de alterar o `.env`, reiniciar o Vite. A URL `localhost:3002` não funciona no dispositivo remoto, porque apontaria para o próprio celular ou computador de teste.

5. Se o dispositivo não conseguir abrir a página, verificar:

   - se os dois dispositivos estão na mesma rede;
   - se o firewall do computador permite conexões TCP nas portas `3001` e `3002`;
   - se a rede Wi-Fi não possui isolamento entre clientes;
   - se o IP usado ainda é o IP atual do computador.

6. Usar esse acesso remoto apenas em uma rede confiável e desligar o servidor ao terminar. Não encaminhar essas portas para a Internet.

Para F-M1, F-M2 e F-M3, as tarefas locais de edição podem ser testadas apenas pela porta `3001`. Os serviços opcionais configurados como `localhost:9999` e `localhost:3016` continuarão indisponíveis no outro dispositivo, a menos que também sejam publicados na rede; registrar isso como limitação quando uma tarefa depender deles.

## 4. Lista fixa de tarefas

Usar a mesma sequência em todos os navegadores e sistemas. A lista abaixo é a lista de 25 funções já utilizada na evidência de [F-M4](F-M4_cobertura-mobile.md):

1. Criar retângulo, losango e elipse.
2. Criar seta ligada a duas formas.
3. Inserir texto em uma forma.
4. Fazer desenho livre.
5. Alterar cor do traço e do fundo.
6. Selecionar e mover um elemento.
7. Redimensionar um elemento.
8. Selecionar vários elementos.
9. Agrupar a seleção.
10. Desfazer e refazer.
11. Duplicar e excluir.
12. Usar o menu de contexto.
13. Usar a borracha.
14. Aplicar zoom.
15. Mover a tela.
16. Salvar um arquivo `.excalidraw`.
17. Abrir um arquivo `.excalidraw`.
18. Exportar uma imagem PNG.
19. Inserir uma imagem.
20. Adicionar e reutilizar um item da biblioteca.
21. Alternar o tema claro/escuro.
22. Trocar o idioma.
23. Converter Mermaid em diagrama.
24. Trocar a fonte do texto.
25. Ativar a trava de ferramenta.

Antes de cada ambiente, limpar a cena e registrar o navegador, a versão, o sistema, o dispositivo e a data.

## 5. Executar F-M1 — navegadores

Para cada navegador disponível:

1. Abrir a aplicação.
2. Confirmar a versão do navegador.
3. Criar uma cena vazia.
4. Executar as 25 tarefas na mesma ordem.
5. Registrar cada tarefa como **passou**, **falhou** ou **não disponível**.
6. Capturar prints dos comportamentos diferentes.
7. Anotar problemas de renderização, fontes e atalhos para consolidar no F-M3.

Cálculo:

```text
navegadores sem falhas ÷ navegadores testados × 100
```

## 6. Executar F-M2 — sistemas operacionais

Para cada sistema disponível:

1. Abrir a mesma versão do Excalidraw.
2. Usar a mesma lista de 25 tarefas.
3. Registrar o navegador realmente usado. A matriz do projeto não define uma combinação fixa entre sistema e navegador; ela exige testar Chrome, Firefox, Edge e Safari nos sistemas disponíveis.
4. Registrar o resultado de cada tarefa.
5. Capturar evidências dos problemas.
6. Registrar limitações, emulação ou sistema não disponível.

Cálculo:

```text
sistemas sem falhas ÷ sistemas testados × 100
```

Não registrar um ambiente não testado como aprovado.

## 7. Executar F-M3 — defeitos específicos

Classificar os defeitos encontrados:

| Categoria | Exemplos |
|---|---|
| Renderização | canvas desalinhado, controles ausentes ou elementos cortados |
| Fontes | fonte diferente, texto cortado ou caracteres quebrados |
| Atalhos | `Ctrl`/`Cmd`, `Alt`, `Shift`, `Q`, desfazer/refazer ou zoom inconsistentes |

Para cada defeito, registrar:

- ambiente;
- passos para reproduzir;
- comportamento esperado;
- comportamento observado;
- print ou vídeo;
- impacto;
- recomendação.

## 8. Criar as evidências

Copiar [`template.md`](template.md) e criar um arquivo para cada métrica:

```text
F-M1/F-M1_compatibilidade-navegadores_AAAA-MM-DD.md
F-M2/F-M2_compatibilidade-sistemas_AAAA-MM-DD.md
F-M3/F-M3_defeitos-ambiente_AAAA-MM-DD.md
```

Preencher:

- métrica e questão;
- tarefa do plano;
- responsável;
- data;
- ambiente e versão do navegador;
- commit `e7b5346`;
- procedimento reproduzível;
- dados brutos;
- cálculo;
- pontuação de 0 a 2;
- evidências;
- limitações;
- achados, quando a pontuação for 0.

Se não houver inspeção de código, escrever **“Não se aplica; medição executada funcionalmente no navegador”** na seção correspondente, sem inventar trechos.

Usar nomes de evidências como:

```text
F-M1_chrome_AAAA-MM-DD.png
F-M2_linux-firefox_AAAA-MM-DD.png
F-M3_safari-fonte-cortada_AAAA-MM-DD.png
```

## 9. Abrir o PR

Antes de abrir o PR:

1. Conferir se todas as tarefas possuem resultado.
2. Conferir os cálculos com base nos dados brutos.
3. Conferir o commit `e7b5346` nos três arquivos.
4. Conferir se os ambientes indisponíveis estão registrados.
5. Adicionar os arquivos e criar o commit.
6. Abrir o PR contendo:

```text
Closes #62
```

7. Mover o cartão para **Em revisão**.
8. Solicitar revisão de outro integrante.
9. Aguardar a aprovação antes do merge.

## 10. Finalizar no Project

Ao concluir:

1. Preencher o campo **Horas** com o esforço real gasto nesta issue.
2. Usar um valor aproximado, como `2` ou `3,5`.
3. Não usar o tempo em que o cartão ficou aberto.
4. Confirmar que o PR está vinculado à issue #62 e à issue pai #18.
