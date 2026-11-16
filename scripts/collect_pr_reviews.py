#!/usr/bin/env python3
"""Coleta os pull requests integrados e as revisões feitas antes do merge.

Alimenta a métrica de revisão efetiva (G-G5) em
docs/gestao/graficos-entrega-2.md. Usa o GITHUB_TOKEN do workflow (o
repositório é público, então basta leitura).
"""

from __future__ import annotations

import json
import os
import sys
import urllib.error
import urllib.request
from datetime import datetime, timezone
from pathlib import Path

API_URL = "https://api.github.com/graphql"
REPOSITORY = os.environ.get("GITHUB_REPOSITORY", "")
OUTPUT = Path(os.environ.get("REVIEWS_OUTPUT", "docs/gestao/dados/revisoes-prs.json"))

QUERY = """
query($owner: String!, $name: String!, $after: String) {
  repository(owner: $owner, name: $name) {
    pullRequests(states: MERGED, first: 50, after: $after, orderBy: {field: CREATED_AT, direction: ASC}) {
      nodes {
        number title createdAt mergedAt
        author { login }
        mergedBy { login }
        reviews(first: 100) { nodes { author { login } state submittedAt } }
      }
      pageInfo { hasNextPage endCursor }
    }
  }
}
"""


def graphql(token: str, variables: dict) -> dict:
    request = urllib.request.Request(
        API_URL,
        data=json.dumps({"query": QUERY, "variables": variables}).encode(),
        headers={
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json",
            "User-Agent": "ada-lovelace-project-metrics",
        },
    )
    try:
        with urllib.request.urlopen(request, timeout=30) as response:
            result = json.load(response)
    except urllib.error.HTTPError as error:
        detail = error.read().decode("utf-8", errors="replace")
        raise RuntimeError(f"GitHub GraphQL retornou HTTP {error.code}: {detail}") from error
    if result.get("errors"):
        raise RuntimeError("Erro GraphQL: " + json.dumps(result["errors"], ensure_ascii=False))
    return result["data"]


def main() -> int:
    token = os.environ.get("GITHUB_TOKEN") or os.environ.get("GH_TOKEN")
    if not token or "/" not in REPOSITORY:
        raise RuntimeError("Defina GITHUB_TOKEN e GITHUB_REPOSITORY (dono/repositório).")
    owner, name = REPOSITORY.split("/", 1)

    prs, cursor = [], None
    while True:
        connection = graphql(token, {"owner": owner, "name": name, "after": cursor})["repository"]["pullRequests"]
        for pr in connection["nodes"]:
            author = (pr["author"] or {}).get("login")
            prs.append({
                "numero": pr["number"],
                "titulo": pr["title"],
                "autor": author,
                "integrado_por": (pr["mergedBy"] or {}).get("login"),
                "criado_em": pr["createdAt"],
                "integrado_em": pr["mergedAt"],
                # Só revisões de outra pessoa, enviadas até o merge.
                "revisoes": [
                    {"revisor": review["author"]["login"], "estado": review["state"], "em": review["submittedAt"]}
                    for review in pr["reviews"]["nodes"]
                    if review.get("author") and review["author"]["login"] != author
                    and review.get("submittedAt") and review["submittedAt"] <= pr["mergedAt"]
                ],
            })
        if not connection["pageInfo"]["hasNextPage"]:
            break
        cursor = connection["pageInfo"]["endCursor"]

    prs.sort(key=lambda pr: pr["numero"])
    if OUTPUT.exists() and json.loads(OUTPUT.read_text(encoding="utf-8")).get("prs") == prs:
        print(f"Revisões inalteradas em {OUTPUT}; nada a gravar.")
        return 0
    collected_at = datetime.now(timezone.utc).replace(microsecond=0).isoformat()
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT.write_text(
        json.dumps({"coletado_em": collected_at, "prs": prs}, ensure_ascii=False, indent=1) + "\n",
        encoding="utf-8",
    )
    print(f"{len(prs)} pull requests integrados gravados em {OUTPUT}.")
    return 0


if __name__ == "__main__":
    try:
        sys.exit(main())
    except Exception as error:
        print(f"Falha na coleta das revisões: {error}", file=sys.stderr)
        sys.exit(1)
