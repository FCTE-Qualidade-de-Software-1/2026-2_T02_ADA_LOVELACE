# S-M4 · Dados persistidos localmente sem criptografia

**Nota 0**: sim, há dados do desenho salvos sem criptografia no navegador. O
texto e as propriedades da cena ficam em JSON no `localStorage` e continuam
lá depois de recarregar e de reabrir a aba. A biblioteca, a imagem e o
histórico do Texto para diagrama ficam no IndexedDB como objetos legíveis.

| Onde | O que fica salvo | Legível sem chave? |
| --- | --- | :---: |
| `localStorage` `excalidraw` | Elementos da cena (texto, IDs, coordenadas) | Sim |
| IndexedDB `excalidraw-library-db` | Itens da biblioteca | Sim |
| IndexedDB `files-db` | Imagem em `dataURL` base64 | Sim (só decodificar) |
| IndexedDB `excalidraw-ttd-chats-db` | Prompt e resposta do Texto para diagrama | Sim |

!!! note "Limites da coleta"
    A IA usada foi o servidor falso do grupo. Não foram testados o reinício
    completo do navegador, a leitura dos arquivos no disco nem a criptografia
    do sistema operacional.

Registro completo:
[`evidencias/seguranca/S-M4`](https://github.com/FCTE-Qualidade-de-Software-1/2026-2_T02_ADA_LOVELACE/tree/main/evidencias/seguranca/S-M4).
