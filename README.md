# 2026-2_T02_ADA_LOVELACE

Repositório da equipe **Ada Lovelace** para a análise de qualidade de software
do Excalidraw, desenvolvida na disciplina de Qualidade de Software.

## Sobre o GitHub Pages

O [GitHub Pages do projeto](https://fcte-qualidade-de-software-1.github.io/2026-2_T02_ADA_LOVELACE/)
apresenta a documentação completa da avaliação em um site gerado com
[MkDocs Material](https://squidfunk.github.io/mkdocs-material/). A página
documenta:

- o contexto, o escopo e o propósito do estudo de caso;
- a aplicação avaliada, o [Excalidraw](https://excalidraw.com), um quadro
  branco colaborativo para criação e compartilhamento de diagramas;
- a avaliação das características de **segurança, portabilidade e
  usabilidade**, com base na ISO/IEC 25010:2023;
- o roteiro de avaliação, as partes interessadas, as questões e as métricas
  definidas pela abordagem Goal-Question-Metric (GQM);
- os critérios de pontuação, as evidências, os achados e as recomendações;
- as referências normativas, técnicas e bibliográficas utilizadas.

O site utiliza a identidade visual do Excalidraw, incluindo seus assets, cores
principais e suporte aos modos claro e escuro. Os resultados da avaliação serão
preenchidos após a execução dos testes e devem ser interpretados apenas para a
versão, os ambientes e as funcionalidades efetivamente analisados.

### Navegação

- [Página inicial](docs/index.md): visão geral do estudo e integrantes;
- [Roteiro da análise](docs/analise/roteiro.md): método, escopo, GQM,
  métricas e critérios de julgamento;
- [Resultados](docs/analise/resultados.md): evidências, pontuações, achados e
  recomendações;
- [Referências](docs/referencias.md): normas e fontes consultadas.

## Membros do Grupo

<table align="center">
  <tr>
    <td align="center">
      <img src="https://github.com/andrehsb.png" width="150" height="150" style="border-radius:50%;" alt="André Henrique"/><br>
      <b>André Henrique</b><br>
      <a href="https://github.com/andrehsb">andrehsb</a>
    </td>
    <td align="center">
      <img src="https://avatars.githubusercontent.com/u/87036806?v=4" width="150" height="150" style="border-radius:50%;" alt="Luís Cunha"/><br>
      <b>Luís Cunha</b><br>
      <a href="https://github.com/cunha-luiss">cunha-luiss</a>
    </td>
    <td align="center">
      <img src="https://github.com/giovannafg.png" height="150" style="border-radius:50%;" alt="Giovanna Felipe"/><br>
      <b>Giovanna Felipe</b><br>
      <a href="https://github.com/giovannafg">giovannafg</a>
    </td>
    <td align="center">
      <img src="https://github.com/ojplc.png" width="150" height="150" style="border-radius:50%;" alt="João Pedro Lopes"/><br>
      <b>João Pedro Lopes</b><br>
      <a href="https://github.com/ojplc">ojplc</a>
    </td>
    <td align="center">
      <img src="https://github.com/renatoyx.png" width="150" height="150" style="border-radius:50%;" alt="Renato Araújo"/><br>
      <b>Renato Araújo</b><br>
      <a href="https://github.com/renatoyx">renatoyx</a>
    </td>
    <td align="center">
      <img src="https://github.com/Zayra-Moraes.png" width="150" height="150" style="border-radius:50%;" alt="Zayra Moraes"/><br>
      <b>Zayra Moraes</b><br>
      <a href="https://github.com/Zayra-Moraes">Zayra-Moraes</a>
    </td>
  </tr>
</table>

## Executar a documentação localmente

O site é gerado com [MkDocs](https://www.mkdocs.org/). Para visualizar as
alterações localmente, recomenda-se criar um ambiente virtual:

- É recomendado criar um ambiente virtual Python antes de instalar:

```shell
python -m venv venv
```

- Ative o ambiente virtual:

```shell
# Windows (PowerShell)
venv\Scripts\activate

# Linux/macOS
source venv/bin/activate
```

- Instale as dependências e inicie o servidor:

```bash
pip install -r requirements.txt
mkdocs serve
```

Depois, acesse `http://127.0.0.1:8000`. Para gerar o site sem iniciar o
servidor, use:

```bash
mkdocs build --strict
```
