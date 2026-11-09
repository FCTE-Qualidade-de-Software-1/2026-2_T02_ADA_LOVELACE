"""Reproduz a valoracao da estimativa de custos; somente biblioteca padrao.

python scripts/calcular_custos_avaliacao.py --write  # atualiza JSON e tabela
python scripts/calcular_custos_avaliacao.py --check  # confere sem escrever
"""

from __future__ import annotations

import argparse
import json
from decimal import Decimal, ROUND_HALF_UP
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
PAGE = ROOT / "docs/gestao/estimativa-custos.md"
PARAMS = ROOT / "docs/gestao/dados/parametros-custos.json"
OUTPUT = ROOT / "docs/gestao/dados/custos-calculados.json"
BEGIN = "<!-- BEGIN CALCULO CUSTOS -->"
END = "<!-- END CALCULO CUSTOS -->"
CASES = ("O", "B", "P")
PHASES = ("F1", "F2", "F3", "F4", "T")
CENT = Decimal("0.01")
NATURE = {"concluída": "retrospectiva", "em andamento": "mista", "futura": "futura"}


def money(value: Decimal) -> Decimal:
    return value.quantize(CENT, rounding=ROUND_HALF_UP)


def brl(value: Decimal) -> str:
    return f"{value:,.2f}".replace(",", "_").replace(".", ",").replace("_", ".")


def hours(value: Decimal) -> str:
    return format(value.normalize(), "f").replace(".", ",")


def sum_cases(rows: list[dict], key: str) -> dict:
    return {c: sum((r[key][c] for r in rows), Decimal(0)) for c in CASES}


def triple(cell: str) -> dict:
    return dict(zip(CASES, map(Decimal, cell.split(" / "))))


def read_effort(text: str) -> list[dict]:
    pattern = (r"^\| ((?:F[1-4]|T)\.\d+) \| [^|]+ \| (concluída|em andamento|futura) "
               r"\| (\d+) \| (\d+) \| (\d+) \|$")
    rows = [{"id": ident, "natureza": NATURE[state],
             "integral_ph": dict(zip(CASES, map(Decimal, values)))}
            for ident, state, *values in re.findall(pattern, text, re.M)]
    expected = {f"{phase}.{i}" for phase, count in
                (("F1", 4), ("F2", 2), ("F3", 4), ("F4", 6), ("T", 3))
                for i in range(1, count + 1)}
    if len(rows) != 19 or {r["id"] for r in rows} != expected:
        raise ValueError("A decomposicao deve conter exatamente os 19 pacotes.")
    split = r"^\| ((?:F[1-4]|T)\.\d+) \| (\d+ / \d+ / \d+) \| (\d+ / \d+ / \d+) \|$"
    mixed = {ident: (triple(done), triple(rest))
             for ident, done, rest in re.findall(split, text, re.M)}
    if set(mixed) != {r["id"] for r in rows if r["natureza"] == "mista"}:
        raise ValueError("A divisao deve cobrir exatamente os pacotes em andamento.")
    for row in rows:
        full = row["integral_ph"]
        if not full["O"] <= full["B"] <= full["P"]:
            raise ValueError("Cenarios fora de ordem: " + row["id"])
        if row["natureza"] == "mista":
            retro, remaining = mixed[row["id"]]
            if any(retro[c] + remaining[c] != full[c] for c in CASES):
                raise ValueError("Parcelas inconsistentes: " + row["id"])
        else:
            remaining = {c: full[c] if row["natureza"] == "futura" else Decimal(0)
                         for c in CASES}
            retro = {c: full[c] - remaining[c] for c in CASES}
        row.update(retrospectivo_ph=retro, restante_ph=remaining)
    return rows


def calculate(text: str, params: dict) -> tuple[dict, str]:
    if (params["moeda"] != "BRL" or params["custos_nao_humanos_brl"] is not None
            or params["desembolso_efetivo_brl"] is not None
            or params["taxa_externos"] != "mesma_proxy_academica_por_hipotese"):
        raise ValueError("Novos recursos ou taxas exigem revisar o modelo.")
    rate = money(Decimal(params["referencia_mensal_brl"]) * Decimal(params["meses_ano"])
                 / (Decimal(params["horas_semanais_referencia"])
                    * Decimal(params["semanas_convencionais_ano"])))
    rows = read_effort(text)
    for row in rows:
        for part in ("integral", "retrospectivo", "restante"):
            row[part + "_brl"] = {c: money(row[part + "_ph"][c] * rate) for c in CASES}
    keys = ("integral_ph", "retrospectivo_ph", "restante_ph",
            "integral_brl", "retrospectivo_brl", "restante_brl")
    totals = {key: sum_cases(rows, key) for key in keys}
    phases = {phase: {key: sum_cases([r for r in rows if r["id"].split(".")[0] == phase], key)
                      for key in keys} for phase in PHASES}
    external_h = {c: Decimal(params["participantes_externos_ph"][c]) for c in CASES}
    if not Decimal(0) <= external_h["O"] <= external_h["B"] <= external_h["P"]:
        raise ValueError("Horas externas negativas ou cenarios fora de ordem.")
    external = {c: money(external_h[c] * rate) for c in CASES}
    human_h = {c: totals["integral_ph"][c] + external_h[c] for c in CASES}
    valued = {c: totals["integral_brl"][c] + external[c] for c in CASES}
    remaining_valued = {c: totals["restante_brl"][c] + external[c] for c in CASES}
    result = {"versao": params["versao"], "data_base": params["data_base"],
              "taxa_brl_ph": rate, "moeda": "BRL", "pacotes": rows,
              "fases_equipe": phases, "totais_equipe": totals,
              "externos_ph": external_h, "externos_brl": external,
              "subtotal_humano_integral_ph": human_h,
              "subtotal_humano_integral_brl": valued,
              "subtotal_humano_restante_brl": remaining_valued,
              "custos_nao_humanos_brl": None, "desembolso_efetivo_brl": None}

    def line(label: str, ph: dict, cost: Decimal, rest: Decimal, bold: bool = False) -> str:
        cells = [label] + [hours(ph[c]) for c in CASES] + [brl(cost), brl(rest)]
        if bold:
            cells = [f"**{cell}**" for cell in cells]
        return "| " + " | ".join(cells) + " |"

    lines = [BEGIN, "", "**Fonte:** esforço por pacote acima × R$ " + brl(rate)
             + "/p-h, calculado pelo script. Esforço em p-h; custos em R$ no cenário B.", "",
             "| Fase | O | B | P | Custo B | Restante B |",
             "| --- | ---: | ---: | ---: | ---: | ---: |"]
    for phase, v in phases.items():
        lines.append(line(phase, v["integral_ph"], v["integral_brl"]["B"],
                          v["restante_brl"]["B"]))
    lines.append(line("Equipe", totals["integral_ph"], totals["integral_brl"]["B"],
                      totals["restante_brl"]["B"]))
    lines.append(line("Participantes externos", external_h, external["B"], external["B"]))
    lines.append(line("Total humano", human_h, valued["B"], remaining_valued["B"], bold=True))
    lines += ["", END]
    return result, "\n".join(lines)


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    group = parser.add_mutually_exclusive_group(required=True)
    group.add_argument("--write", action="store_true")
    group.add_argument("--check", action="store_true")
    args = parser.parse_args()
    text = PAGE.read_text(encoding="utf-8")
    params = json.loads(PARAMS.read_text(encoding="utf-8"))
    result, block = calculate(text, params)
    output = json.dumps(result, ensure_ascii=False, indent=2,
                        default=lambda value: format(value, "f")) + "\n"
    pattern = re.escape(BEGIN) + r".*?" + re.escape(END)
    updated, count = re.subn(pattern, lambda _: block, text, flags=re.S)
    if count != 1:
        raise ValueError("Deve existir um unico bloco de calculo na pagina.")
    if args.write:
        OUTPUT.write_text(output, encoding="utf-8")
        PAGE.write_text(updated, encoding="utf-8")
    elif updated != text or not OUTPUT.exists() or OUTPUT.read_text(encoding="utf-8") != output:
        raise SystemExit("Calculos desatualizados. Execute com --write e revise o diff.")
    print("19 pacotes e 3 cenarios reconciliados; taxa R$ " + brl(result["taxa_brl_ph"]) + "/p-h.")
    print("Subtotal humano base: R$ " + brl(result["subtotal_humano_integral_brl"]["B"]))


if __name__ == "__main__":
    main()
