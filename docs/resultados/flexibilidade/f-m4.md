# F-M4 · Cobertura funcional em dispositivos móveis

**Nota 2**: as 25 funções feitas com mouse no desktop também foram feitas só
com toque, num celular (Pixel 7, 412 × 839) e num tablet (iPad, 810 × 1080)
emulados no Chrome 157 via Playwright: 25 de 25 (100%) nos dois. No celular, o
zoom passa pela pinça e a trava de ferramenta pelo menu de preferências, porque
os botões delas não aparecem nessa largura (ver F-M6).

| Modo | Entrada | Funções | Resultado |
| --- | --- | :-: | :-: |
| Desktop (controle, 1366 × 768) | Mouse | 25 de 25 | 100% |
| Celular emulado (Pixel 7) | Toque | 25 de 25 | 100% |
| Tablet emulado (iPad) | Toque | 25 de 25 | 100% |

!!! note "Emulação e aparelhos reais"
    O teste foi feito por emulação, não em aparelho real: não reproduz a
    precisão do dedo, o teclado virtual nem o Safari do iPadOS. Nos aparelhos
    reais da F-M2 (Android 10, iPadOS 27.2 e iOS 27.2.1), a trava de ferramenta
    (tarefa 25) não foi encontrada e ficou como não disponível. Contando assim,
    a F-M4 fica em 24 de 25 (96%), e a nota continua 2.

!!! note "Sensibilidade"
    Se só valesse o mesmo botão do desktop, o celular ficaria com 23 de 25
    (92%), ainda nota 2. A lista de 25 funções foi escolhida pela equipe e deixa
    de fora funções que dependem de servidor e atalhos de teclado.

Registro completo:
[`F-M4_cobertura-mobile.md`](https://github.com/FCTE-Qualidade-de-Software-1/2026-2_T02_ADA_LOVELACE/blob/main/evidencias/flexibilidade/F-M4_cobertura-mobile.md)
e [arquivos de apoio](https://github.com/FCTE-Qualidade-de-Software-1/2026-2_T02_ADA_LOVELACE/tree/main/evidencias/flexibilidade/F-M4).
