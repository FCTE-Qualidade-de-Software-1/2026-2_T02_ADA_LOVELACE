"""Hook do MkDocs: escreve no rodapé a versão e a data da publicação.

A versão é a última release (tag) mais o commit publicado, e a data é a do
commit, no horário de Brasília. Fora de um repositório Git, o rodapé fica só
com o nome da equipe.
"""

from __future__ import annotations

import subprocess
from datetime import datetime, timedelta, timezone


def _git(*args: str) -> str:
    try:
        return subprocess.run(
            ["git", *args], check=True, capture_output=True, text=True, encoding="utf-8"
        ).stdout.strip()
    except (OSError, subprocess.CalledProcessError):
        return ""


def on_config(config, **kwargs):
    partes = ["Equipe Ada Lovelace · Qualidade de Software 1 · 2026.2"]
    commit = _git("rev-parse", "--short", "HEAD")
    if commit:
        tag = _git("describe", "--tags", "--abbrev=0")
        versao = f"{tag} + {commit}" if tag else commit
        if tag and _git("rev-list", "-n", "1", tag)[:len(commit)] == commit:
            versao = tag
        data = _git("log", "-1", "--format=%cI")
        quando = datetime.fromisoformat(data).astimezone(timezone(timedelta(hours=-3)))
        partes.append(f"Versão {versao}")
        partes.append(f"Atualizado em {quando:%d/%m/%Y}")
    config["copyright"] = " · ".join(partes)
    return config
