import gzip
import json
from collections import Counter
from pathlib import Path

EVIDENCE = Path(__file__).resolve().parent
SEVERITIES = ("info", "low", "moderate", "high", "critical")
DATE = "2026-11-08"


def load(scope):
    path = EVIDENCE / f"S-M11_yarn-{scope}_{DATE}.jsonl.gz"
    advisories = {}
    occurrences = Counter()
    summaries = []
    with gzip.open(path, "rt", encoding="utf-8") as stream:
        for line in stream:
            record = json.loads(line)
            if record["type"] == "auditSummary":
                summaries.append(record["data"]["vulnerabilities"])
                continue
            if record["type"] != "auditAdvisory":
                continue
            advisory = record["data"]["advisory"]
            identifier = advisory["github_advisory_id"] or f'npm:{advisory["id"]}'
            severity = advisory["severity"]
            item = advisories.setdefault(identifier, {"severity": severity, "findings": set()})
            assert item["severity"] == severity
            occurrences[severity] += 1
            for finding in advisory["findings"]:
                for path in finding["paths"]:
                    item["findings"].add((path, advisory["module_name"], finding["version"]))
    assert len(summaries) == 1 and occurrences == Counter(summaries[0])
    return advisories, occurrences


def scope_of(path):
    parts = path.split(">")
    if parts[0] in {"with-nextjs", "with-script-in-browser"}:
        return "examples"
    if parts == ["@excalidraw/excalidraw"]:
        return "editor-itself"
    if parts[:2] in (["excalidraw-app", "vite-plugin-html"], ["@excalidraw/excalidraw", "sass"]):
        return "build"
    if parts[:2] == ["excalidraw-app", "firebase"]:
        assert parts[2] in {
            "@firebase/firestore", "@firebase/firestore-compat",
            "@firebase/database", "@firebase/database-compat",
        }
        return "sdk-outside-browser"
    if parts == ["excalidraw-app", "socket.io-client", "engine.io-client", "ws"]:
        return "sdk-outside-browser"
    if parts[0] in {"excalidraw-app", "@excalidraw/excalidraw"}:
        return "browser-candidates"
    raise ValueError(f"Unclassified path: {path}")


def count(label, counts):
    print(f"{label}: " + " ".join(f"{s}={counts[s]}" for s in SEVERITIES)
          + f" total={sum(counts.values())}")


complete, complete_occurrences = load("completo")
filtered, filtered_occurrences = load("grupos")
assert filtered.keys() <= complete.keys()
assert all(item["severity"] == complete[key]["severity"] for key, item in filtered.items())

count("completo (ocorrencias)", complete_occurrences)
count("grupos (ocorrencias)", filtered_occurrences)
count("completo (avisos)", Counter(item["severity"] for item in complete.values()))
count("grupos (avisos)", Counter(item["severity"] for item in filtered.values()))
count("somente consulta completa", Counter(complete[key]["severity"] for key in complete.keys() - filtered.keys()))

# Counts for individual scopes can overlap. Unions count each advisory once.
scopes = {
    key: {scope_of(path) for path, _, _ in item["findings"]}
    for key, item in filtered.items()
}
for scope in ("browser-candidates", "sdk-outside-browser", "build", "examples", "editor-itself"):
    count(scope, Counter(filtered[key]["severity"] for key in scopes if scope in scopes[key]))
count("examples-only", Counter(filtered[key]["severity"] for key in scopes if scopes[key] == {"examples"}))
count("app-runtime-declared", Counter(
    filtered[key]["severity"]
    for key in scopes if scopes[key] & {"browser-candidates", "sdk-outside-browser"}
))
for key in sorted(scopes):
    if "browser-candidates" in scopes[key]:
        item = filtered[key]
        for path, package, version in sorted(item["findings"]):
            if scope_of(path) == "browser-candidates":
                print(f"{key}\t{item['severity']}\t{package}@{version}\t{path}")
