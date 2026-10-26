#!/usr/bin/env python3
"""Collect non-merge commit counts by author for the group management page."""

from __future__ import annotations

import csv
import os
import re
import subprocess
from datetime import datetime, timezone
from pathlib import Path

OUTPUT = Path("docs/gestao/dados/membros-commits.csv")
PAGE = Path("docs/analise/gestao-grupo.md")


def collect_counts(ref: str) -> list[tuple[str, str, int]]:
    result = subprocess.run(
        ["git", "shortlog", "-sne", "--no-merges", ref],
        check=True,
        capture_output=True,
        text=True,
    )
    rows: list[tuple[str, str, int]] = []
    for line in result.stdout.splitlines():
        count, author = line.strip().split("\t", 1)
        name, email = author.rsplit(" <", 1)
        rows.append((name, email.rstrip(">"), int(count)))
    return sorted(rows, key=lambda row: (-row[2], row[0].casefold()))


def main() -> None:
    ref = os.environ.get("METRICS_REF", "main")
    collected_at = datetime.now(timezone.utc).isoformat(timespec="seconds")
    rows = collect_counts(ref)
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    with OUTPUT.open("w", newline="", encoding="utf-8") as output:
        writer = csv.writer(output)
        writer.writerow(["coletado_em", "referencia", "autor", "email", "commits"])
        writer.writerows(
            (collected_at, ref, name, email, count)
            for name, email, count in rows
        )
    table = [
        "| Integrante identificado | Commits não-merge |",
        "| --- | ---: |",
        *(f"| {name} | {count} |" for name, _, count in rows),
        f"| **Total** | **{sum(row[2] for row in rows)}** |",
        "",
        f"*Última coleta: {collected_at}, referência `{ref}`.*",
    ]
    page = PAGE.read_text(encoding="utf-8")
    pattern = r"<!-- BEGIN AUTO: membros-commits -->.*?<!-- END AUTO: membros-commits -->"
    replacement = (
        "<!-- BEGIN AUTO: membros-commits -->\n"
        + "\n".join(table)
        + "\n<!-- END AUTO: membros-commits -->"
    )
    updated_page, replacements = re.subn(pattern, replacement, page, count=1, flags=re.S)
    if replacements != 1:
        raise RuntimeError("Bloco de commits automatizado não encontrado na página de gestão")
    PAGE.write_text(updated_page, encoding="utf-8")
    print(f"{len(rows)} autores registrados em {OUTPUT}")


if __name__ == "__main__":
    main()
