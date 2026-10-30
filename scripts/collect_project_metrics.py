#!/usr/bin/env python3
"""Collect issue lead/cycle time from GitHub Projects v2 status history."""

from __future__ import annotations

import csv
import json
import os
import sys
import urllib.error
import urllib.request
from datetime import datetime, timezone
from pathlib import Path

API_URL = "https://api.github.com/graphql"
OWNER = os.environ.get("PROJECT_OWNER", "FCTE-Qualidade-de-Software-1")
PROJECT_NUMBER = int(os.environ.get("PROJECT_NUMBER", "19"))
REPOSITORY = os.environ.get("GITHUB_REPOSITORY", "")
IN_PROGRESS = os.environ.get("IN_PROGRESS_STATUS", "Em andamento").casefold()
REVIEW = os.environ.get("REVIEW_STATUS", "Em revisão").casefold()
DONE = os.environ.get("DONE_STATUS", "Concluído").casefold()
OUTPUT = Path(os.environ.get("METRICS_OUTPUT", "docs/gestao/dados/lead-cycle-time.csv"))


def graphql(token: str, query: str, variables: dict) -> dict:
    body = json.dumps({"query": query, "variables": variables}).encode()
    request = urllib.request.Request(
        API_URL,
        data=body,
        headers={
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json",
            "Accept": "application/vnd.github+json",
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


PROJECT_QUERY = """
query($owner: String!, $number: Int!, $after: String) {
  organization(login: $owner) {
    projectV2(number: $number) {
      items(first: 100, after: $after) {
        nodes {
          id
          content {
            ... on Issue {
              number title createdAt url
              repository { nameWithOwner }
              timelineItems(first: 100, itemTypes: [PROJECT_V2_ITEM_STATUS_CHANGED_EVENT]) {
                nodes {
                  ... on ProjectV2ItemStatusChangedEvent {
                    createdAt previousStatus status project { number }
                  }
                }
                pageInfo { hasNextPage endCursor }
              }
            }
          }
        }
        pageInfo { hasNextPage endCursor }
      }
    }
  }
}
"""

TIMELINE_QUERY = """
query($id: ID!, $after: String) {
  node(id: $id) {
    ... on Issue {
      timelineItems(first: 100, after: $after, itemTypes: [PROJECT_V2_ITEM_STATUS_CHANGED_EVENT]) {
        nodes {
          ... on ProjectV2ItemStatusChangedEvent {
            createdAt previousStatus status project { number }
          }
        }
        pageInfo { hasNextPage endCursor }
      }
    }
  }
}
"""


def parse_date(value: str) -> datetime:
    return datetime.fromisoformat(value.replace("Z", "+00:00"))


def main() -> int:
    token = os.environ.get("PROJECTS_TOKEN") or os.environ.get("GH_TOKEN")
    if not token:
        raise RuntimeError("Defina o secret PROJECTS_TOKEN com leitura do Project.")
    if not REPOSITORY:
        raise RuntimeError("GITHUB_REPOSITORY não está definido; execute pelo GitHub Actions.")

    issues: list[dict] = []
    cursor = None
    while True:
        data = graphql(token, PROJECT_QUERY, {"owner": OWNER, "number": PROJECT_NUMBER, "after": cursor})
        organization = data.get("organization")
        project = organization and organization.get("projectV2")
        if not project:
            raise RuntimeError(f"Não encontrei o Project #{PROJECT_NUMBER} da organização {OWNER}.")
        connection = project["items"]
        for item in connection["nodes"]:
            issue = item.get("content")
            if not issue or not issue.get("number"):
                continue
            if issue["repository"]["nameWithOwner"].casefold() != REPOSITORY.casefold():
                continue
            events = issue["timelineItems"]["nodes"]
            page = issue["timelineItems"]["pageInfo"]
            while page["hasNextPage"]:
                timeline = graphql(token, TIMELINE_QUERY, {"id": issue["id"], "after": page["endCursor"]})["node"]["timelineItems"]
                events.extend(timeline["nodes"])
                page = timeline["pageInfo"]
            relevant = [event for event in events if event.get("project", {}).get("number") == PROJECT_NUMBER]
            relevant.sort(key=lambda event: event["createdAt"])
            issues.append({**issue, "events": relevant})
        page = connection["pageInfo"]
        if not page["hasNextPage"]:
            break
        cursor = page["endCursor"]

    collected_at = datetime.now(timezone.utc).replace(microsecond=0).isoformat()
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    columns = [
        "coletado_em", "repositorio", "issue", "titulo", "url", "criada_em",
        "inicio_cycle_time", "concluida_em", "lead_time_dias", "cycle_time_dias",
        "retornos_revisao_para_andamento",
    ]
    rows = []
    for issue in sorted(issues, key=lambda row: row["number"]):
        events = issue["events"]
        completion_events = [event for event in events if event["status"].casefold() == DONE]
        if not completion_events:
            continue
        completed = completion_events[-1]
        completed_at = parse_date(completed["createdAt"])
        previous_completions = [
            event for event in completion_events
            if parse_date(event["createdAt"]) < completed_at
        ]
        cycle_boundary = parse_date(previous_completions[-1]["createdAt"]) if previous_completions else None
        starts_before_completion = [
            event for event in events
            if event["status"].casefold() == IN_PROGRESS
            and parse_date(event["createdAt"]) <= completed_at
            and (cycle_boundary is None or parse_date(event["createdAt"]) > cycle_boundary)
        ]
        # Start at the first move to in-progress in the latest delivery
        # cycle; review rework remains part of that cycle's elapsed time.
        started = starts_before_completion[0] if starts_before_completion else None
        created_at = parse_date(issue["createdAt"])
        cycle_start = parse_date(started["createdAt"]) if started else None
        rework = sum(
            event["previousStatus"].casefold() == REVIEW
            and event["status"].casefold() == IN_PROGRESS
            for event in events
        )
        rows.append({
            "coletado_em": collected_at,
            "repositorio": issue["repository"]["nameWithOwner"],
            "issue": issue["number"],
            "titulo": issue["title"],
            "url": issue["url"],
            "criada_em": issue["createdAt"],
            "inicio_cycle_time": started["createdAt"] if started else "",
            "concluida_em": completed["createdAt"],
            "lead_time_dias": round((completed_at - created_at).total_seconds() / 86400, 3),
            "cycle_time_dias": round((completed_at - cycle_start).total_seconds() / 86400, 3) if cycle_start else "",
            "retornos_revisao_para_andamento": rework,
        })

    # Sem mudança nos dados, mantém o CSV (e sua data de coleta) para não gerar commit.
    def without_date(row: dict) -> dict:
        return {key: str(value) for key, value in row.items() if key != "coletado_em"}

    if OUTPUT.exists():
        with OUTPUT.open(encoding="utf-8-sig", newline="") as file:
            previous = [without_date(row) for row in csv.DictReader(file)]
        if previous == [without_date(row) for row in rows]:
            print(f"Métricas inalteradas em {OUTPUT}; nada a gravar.")
            return 0
    with OUTPUT.open("w", encoding="utf-8-sig", newline="") as file:
        writer = csv.DictWriter(file, fieldnames=columns)
        writer.writeheader()
        writer.writerows(rows)
    print(f"CSV atualizado: {OUTPUT} ({len(issues)} issues do Project; somente issues concluídas exportadas).")
    return 0


if __name__ == "__main__":
    try:
        sys.exit(main())
    except Exception as error:  # emit a useful GitHub Actions log
        print(f"Falha na coleta de métricas: {error}", file=sys.stderr)
        sys.exit(1)
