#!/usr/bin/env python3
"""Copia Status, Prazo e Horas do Project de usuário para o Project #19 da organização.

Usado uma vez, em 23/11/2026, na volta do Kanban para a organização (ver
docs/analise/gestao-grupo.md). Por padrão só mostra o que mudaria; grava
apenas com --aplicar.

Regras:
* as issues do quadro de usuário que não estiverem no #19 são adicionadas;
* um campo preenchido no quadro de usuário sobrescreve o do #19;
* um campo vazio no quadro de usuário mantém o valor do #19 (nada é apagado).

A data das mudanças de Status não pode ser copiada: o GitHub registra o
evento com o horário da cópia. O histórico anterior continua sendo lido do
quadro de usuário por scripts/collect_project_metrics.py.

Token: PROJECTS_TOKEN ou GH_TOKEN, com escopo "project"; sem eles, usa o
`gh auth token`.
"""

from __future__ import annotations

import argparse
import json
import os
import subprocess
import sys
import urllib.error
import urllib.request

API_URL = "https://api.github.com/graphql"
ORIGEM = ("user", "giovannafg", 1)
DESTINO = ("organization", "FCTE-Qualidade-de-Software-1", 19)
CAMPOS = ["Status", "Prazo", "Horas"]


def token() -> str:
    valor = os.environ.get("PROJECTS_TOKEN") or os.environ.get("GH_TOKEN")
    if valor:
        return valor
    return subprocess.run(["gh", "auth", "token"], capture_output=True, text=True, check=True).stdout.strip()


def graphql(query: str, variables: dict) -> dict:
    request = urllib.request.Request(
        API_URL,
        data=json.dumps({"query": query, "variables": variables}).encode(),
        headers={
            "Authorization": f"Bearer {TOKEN}",
            "Content-Type": "application/json",
            "User-Agent": "ada-lovelace-kanban-copy",
        },
    )
    try:
        with urllib.request.urlopen(request, timeout=30) as response:
            result = json.load(response)
    except urllib.error.HTTPError as error:
        raise RuntimeError(f"HTTP {error.code}: {error.read().decode('utf-8', 'replace')}") from error
    if result.get("errors"):
        raise RuntimeError(json.dumps(result["errors"], ensure_ascii=False))
    return result["data"]


QUERY = """
query($login: String!, $number: Int!, $after: String) {
  %s(login: $login) {
    projectV2(number: $number) {
      id
      fields(first: 50) {
        nodes {
          ... on ProjectV2FieldCommon { id name dataType }
          ... on ProjectV2SingleSelectField { options { id name } }
        }
      }
      items(first: 100, after: $after) {
        nodes {
          id
          status: fieldValueByName(name: "Status") { ... on ProjectV2ItemFieldSingleSelectValue { name } }
          prazo: fieldValueByName(name: "Prazo") { ... on ProjectV2ItemFieldDateValue { date } }
          horas: fieldValueByName(name: "Horas") { ... on ProjectV2ItemFieldNumberValue { number } }
          content { ... on Issue { id number repository { nameWithOwner } } ... on PullRequest { id number repository { nameWithOwner } } }
        }
        pageInfo { hasNextPage endCursor }
      }
    }
  }
}
"""


def ler_quadro(kind: str, login: str, number: int) -> dict:
    itens, cursor, projeto = {}, None, None
    while True:
        dados = graphql(QUERY % kind, {"login": login, "number": number, "after": cursor})[kind]["projectV2"]
        projeto = projeto or {"id": dados["id"], "campos": {campo["name"]: campo for campo in dados["fields"]["nodes"] if campo}}
        for item in dados["items"]["nodes"]:
            conteudo = item.get("content") or {}
            if not conteudo.get("number"):
                continue
            chave = (conteudo["repository"]["nameWithOwner"], conteudo["number"])
            itens[chave] = {
                "item_id": item["id"],
                "content_id": conteudo["id"],
                "Status": (item.get("status") or {}).get("name"),
                "Prazo": (item.get("prazo") or {}).get("date"),
                "Horas": (item.get("horas") or {}).get("number"),
            }
        pagina = dados["items"]["pageInfo"]
        if not pagina["hasNextPage"]:
            break
        cursor = pagina["endCursor"]
    projeto["itens"] = itens
    return projeto


ADD_ITEM = """
mutation($project: ID!, $content: ID!) {
  addProjectV2ItemById(input: {projectId: $project, contentId: $content}) { item { id } }
}
"""

SET_FIELD = """
mutation($project: ID!, $item: ID!, $field: ID!, $value: ProjectV2FieldValue!) {
  updateProjectV2ItemFieldValue(input: {projectId: $project, itemId: $item, fieldId: $field, value: $value}) {
    projectV2Item { id }
  }
}
"""


def valor_graphql(campo: dict, valor):
    if campo["dataType"] == "SINGLE_SELECT":
        opcoes = {opcao["name"]: opcao["id"] for opcao in campo["options"]}
        if valor not in opcoes:
            raise RuntimeError(f"Opção '{valor}' não existe no campo {campo['name']} do destino.")
        return {"singleSelectOptionId": opcoes[valor]}
    if campo["dataType"] == "DATE":
        return {"date": valor}
    if campo["dataType"] == "NUMBER":
        return {"number": float(valor)}
    raise RuntimeError(f"Tipo de campo não suportado: {campo['dataType']}")


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("--aplicar", action="store_true", help="grava no Project de destino (sem isso, só simula)")
    args = parser.parse_args()

    origem = ler_quadro(*ORIGEM)
    destino = ler_quadro(*DESTINO)
    for nome in CAMPOS:
        if nome not in destino["campos"]:
            raise RuntimeError(f"O campo {nome} não existe no Project de destino.")

    mudancas = []
    for chave, item in sorted(origem["itens"].items(), key=lambda par: par[0]):
        alvo = destino["itens"].get(chave)
        if alvo is None:
            mudancas.append((chave, "adicionar ao quadro", None, None))
            alvo = {"item_id": None, "content_id": item["content_id"], **{nome: None for nome in CAMPOS}}
            destino["itens"][chave] = alvo
        for nome in CAMPOS:
            if item[nome] is not None and item[nome] != alvo[nome]:
                mudancas.append((chave, nome, alvo[nome], item[nome]))

    modo = "APLICANDO" if args.aplicar else "SIMULAÇÃO (use --aplicar para gravar)"
    print(f"{modo}: {len(origem['itens'])} itens na origem, {len(destino['itens'])} no destino, {len(mudancas)} mudanças.")
    for (repo, numero), campo, antes, depois in mudancas:
        print(f"  #{numero:<4} {campo:<20} {antes!s:>12} -> {depois!s}")
        if not args.aplicar:
            continue
        alvo = destino["itens"][(repo, numero)]
        if campo == "adicionar ao quadro":
            resultado = graphql(ADD_ITEM, {"project": destino["id"], "content": alvo["content_id"]})
            alvo["item_id"] = resultado["addProjectV2ItemById"]["item"]["id"]
            continue
        definicao = destino["campos"][campo]
        graphql(SET_FIELD, {
            "project": destino["id"],
            "item": alvo["item_id"],
            "field": definicao["id"],
            "value": valor_graphql(definicao, depois),
        })
    return 0


if __name__ == "__main__":
    TOKEN = token()
    try:
        sys.exit(main())
    except Exception as error:
        print(f"Falha na cópia: {error}", file=sys.stderr)
        sys.exit(1)
