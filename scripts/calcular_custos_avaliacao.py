"""Reproduz a valoracao parcial da avaliacao; somente biblioteca padrao.

python scripts/calcular_custos_avaliacao.py --write  # atualiza JSON e tabelas
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
COMPARE_BEGIN = "<!-- BEGIN COMPARATIVO VALORACAO -->"
COMPARE_END = "<!-- END COMPARATIVO VALORACAO -->"
CASES = ("O", "B", "P")
CENT = Decimal("0.01")


def money(value: Decimal) -> Decimal:
    return value.quantize(CENT, rounding=ROUND_HALF_UP)


def brl(value: Decimal) -> str:
    return f"{value:,.2f}".replace(",", "_").replace(".", ",").replace("_", ".")


def sum_cases(rows: list[dict], key: str) -> dict:
    return {c: sum((r[key][c] for r in rows), Decimal(0)) for c in CASES}


def read_effort(text: str) -> list[dict]:
    integral = text.split("### Esforço integral por pacote\n", 1)[1].split(
        "### Separação entre retrospectivo e restante\n", 1
    )[0]
    pattern = r"^\| ((?:F[1-4]|T)\.\d+) / (retrospectiva|mista|futura) \| (\d+) \| (\d+) \| (\d+) \|"
    rows = []
    for match in re.finditer(pattern, integral, re.M):
        ident, nature, *hours = match.groups()
        rows.append({"id": ident, "natureza": nature,
                     "integral_ph": dict(zip(CASES, map(Decimal, hours)))})
    expected = {f"{phase}.{i}" for phase, count in
                (("F1", 4), ("F2", 2), ("F3", 4), ("F4", 6), ("T", 3))
                for i in range(1, count + 1)}
    if len(rows) != 19 or {r["id"] for r in rows} != expected:
        raise ValueError("A decomposicao deve conter exatamente os 19 pacotes E1.")
    mixed_text = text.split("### Separação entre retrospectivo e restante\n", 1)[1].split(
        "### Calendário, capacidade e revisão das premissas\n", 1
    )[0]
    mixed = {}
    for line in mixed_text.splitlines():
        cells = [x.strip() for x in line.strip().strip("|").split("|")]
        if cells[0] in {"F2.2", "T.1", "T.2", "T.3"}:
            mixed[cells[0]] = [dict(zip(CASES, map(Decimal, cell.split(" / "))))
                              for cell in cells[1:]]
    for row in rows:
        full = row["integral_ph"]
        if not full["O"] <= full["B"] <= full["P"]:
            raise ValueError("Cenarios fora de ordem: " + row["id"])
        if row["natureza"] == "mista":
            retro, remaining, total = mixed[row["id"]]
            if total != full or any(retro[c] + remaining[c] != full[c] for c in CASES):
                raise ValueError("Parcelas inconsistentes: " + row["id"])
            if any(not Decimal(0) <= retro[c] <= full[c] for c in CASES):
                raise ValueError("Parcela retrospectiva fora dos limites: " + row["id"])
        else:
            remaining = {c: full[c] if row["natureza"] == "futura" else Decimal(0)
                         for c in CASES}
            retro = {c: full[c] - remaining[c] for c in CASES}
        row.update(retrospectivo_ph=retro, restante_ph=remaining)
    return rows


def calculate(text: str, params: dict) -> tuple[dict, str]:
    if (params["moeda"] != "BRL" or params["custos_nao_humanos_brl"] is not None
            or params["desembolso_efetivo_brl"] is not None
            or Decimal(params["contingencia_adicionada_brl"]) != 0
            or params["taxa_externos"] != "mesma_proxy_academica_por_hipotese"):
        raise ValueError("Novos recursos, contingencia ou taxas exigem revisar o modelo C1.")
    rate = money(Decimal(params["referencia_mensal_brl"]) * Decimal(params["meses_ano"])
                 / (Decimal(params["horas_semanais_referencia"])
                    * Decimal(params["semanas_convencionais_ano"])))
    if rate <= 0:
        raise ValueError("Taxa de referencia deve ser positiva.")
    rows = read_effort(text)
    for row in rows:
        for part in ("integral", "retrospectivo", "restante"):
            row[part + "_brl"] = {c: money(row[part + "_ph"][c] * rate) for c in CASES}
        if any(row["retrospectivo_brl"][c] + row["restante_brl"][c]
               != row["integral_brl"][c] for c in CASES):
            raise ValueError("Arredondamento das parcelas exige reconciliacao.")
    keys = ("integral_ph", "retrospectivo_ph", "restante_ph",
            "integral_brl", "retrospectivo_brl", "restante_brl")
    totals = {key: sum_cases(rows, key) for key in keys}
    phases = {phase: {key: sum_cases([r for r in rows if r["id"].split(".")[0] == phase], key)
                      for key in keys} for phase in ("F1", "F2", "F3", "F4", "T")}
    external_h = {c: Decimal(params["participantes_externos_ph"][c]) for c in CASES}
    if not Decimal(0) <= external_h["O"] <= external_h["B"] <= external_h["P"]:
        raise ValueError("Horas externas negativas ou cenarios fora de ordem.")
    external = {c: money(external_h[c] * rate) for c in CASES}
    valued = {c: totals["integral_brl"][c] + external[c] for c in CASES}
    remaining_valued = {c: totals["restante_brl"][c] + external[c] for c in CASES}
    if any(sum(phases[p]["integral_brl"][c] for p in phases)
           != totals["integral_brl"][c] for c in CASES):
        raise ValueError("Totais por fase inconsistentes.")
    result = {"versao": params["versao"], "data_base": params["data_base"],
              "taxa_brl_ph": rate, "moeda": "BRL", "pacotes": rows,
              "fases_equipe": phases, "totais_equipe": totals,
              "externos_ph": external_h, "externos_brl": external,
              "subtotal_humano_integral_brl": valued,
              "subtotal_humano_restante_brl": remaining_valued,
              "custos_nao_humanos_brl": params["custos_nao_humanos_brl"],
              "desembolso_efetivo_brl": params["desembolso_efetivo_brl"],
              "contingencia_adicionada_brl": params["contingencia_adicionada_brl"],
              "custo_economico_completo_brl": None}
    lines = [BEGIN, "", "**Fonte e unidade:** horas E1 acima × taxa acadêmica de R$ "
             + brl(rate) + "/p-h; valores em **R$**. Tabela gerada pelo script, sem pagamentos presumidos.",
             "", "| Pacote | Integral O | Integral B | Integral P | Restante B |",
             "| --- | ---: | ---: | ---: | ---: |"]
    for row in rows:
        lines.append("| " + row["id"] + " | " + " | ".join(
            [brl(row["integral_brl"][c]) for c in CASES]
            + [brl(row["restante_brl"]["B"])]) + " |")
    lines += ["", "**Fonte e unidade:** soma dos pacotes por fase; **R$**, somente equipe. "
              "O trabalho transversal não é repetido nas fases.", "",
              "| Fase/grupo | Integral O | Integral B | Integral P | Restante B |",
              "| --- | ---: | ---: | ---: | ---: |"]
    for phase, values in phases.items():
        lines.append("| " + phase + " | " + " | ".join(
            [brl(values["integral_brl"][c]) for c in CASES]
            + [brl(values["restante_brl"]["B"])]) + " |")
    lines += ["", "**Fonte e unidade:** agregação calculada, em **R$**, "
              "com externos de P2/P3 valorados separadamente pela mesma taxa por hipótese.", "",
              "| Componente | O | B | P |", "| --- | ---: | ---: | ---: |"]
    for label, values in (("Equipe — retrospectivo estimado", totals["retrospectivo_brl"]),
                          ("Equipe — restante estimado", totals["restante_brl"]),
                          ("Equipe — integral estimado", totals["integral_brl"]),
                          ("Participantes externos — futuro", external),
                          ("**Subtotal humano integral valorado**", valued),
                          ("**Subtotal humano restante valorado**", remaining_valued)):
        lines.append("| " + label + " | " + " | ".join(brl(values[c]) for c in CASES) + " |")
    lines += ["", "Infraestrutura e demais itens não valorados não integram esses subtotais. "
              "O total econômico completo e o desembolso efetivo permanecem **não disponíveis**.",
              "", END]
    return result, "\n".join(lines)


def compare_valuations(academic: dict, params: dict) -> tuple[dict, str]:
    """Varia apenas a taxa; precos publicados por projeto nao entram na conta."""
    config = params["comparativo_valoracao"]
    hypotheses = config["taxas_alternativas"]
    ids = [item["id"] for item in hypotheses]
    if len(set(ids)) != len(ids) or "ACADEMICO" in ids:
        raise ValueError("Identificadores de valoracao devem ser unicos.")
    for item in hypotheses:
        rate = Decimal(item["taxa_brl_ph"])
        if item["natureza"] != "hipotese_propria" or rate <= 0 or money(rate) != rate:
            raise ValueError("Taxas alternativas devem ser hipoteses positivas em centavos.")
    valuations = [{"id": "ACADEMICO", "taxa_brl_ph": academic["taxa_brl_ph"],
                   "natureza": "proxy_academica_C1"}, *hypotheses]
    rows = []
    for item in valuations:
        rate = Decimal(item["taxa_brl_ph"])
        cases = {}
        for case in CASES:
            team = academic["totais_equipe"]
            external_ph = academic["externos_ph"][case]
            team_cost = money(team["integral_ph"][case] * rate)
            external_cost = money(external_ph * rate)
            remaining_cost = money(team["restante_ph"][case] * rate) + external_cost
            cases[case] = {
                "equipe_integral_ph": team["integral_ph"][case],
                "externos_ph": external_ph,
                "humano_integral_ph": team["integral_ph"][case] + external_ph,
                "humano_restante_ph": team["restante_ph"][case] + external_ph,
                "equipe_integral_brl": team_cost,
                "externos_brl": external_cost,
                "subtotal_humano_integral_brl": team_cost + external_cost,
                "subtotal_humano_restante_brl": remaining_cost,
                "desembolso_efetivo_brl": None,
                "custo_economico_completo_brl": None,
            }
        rows.append({"id": item["id"], "natureza": item["natureza"],
                     "taxa_brl_ph": rate, "cenarios_esforco": cases})
    for case in CASES:
        current = rows[0]["cenarios_esforco"][case]
        if (current["subtotal_humano_integral_brl"]
                != academic["subtotal_humano_integral_brl"][case]
                or current["subtotal_humano_restante_brl"]
                != academic["subtotal_humano_restante_brl"][case]):
            raise ValueError("Comparativo diverge da valoracao academica original.")
    lines = [COMPARE_BEGIN, "",
             "**Fonte e unidade:** horas E1 preservadas; taxa C1 e hipóteses próprias H25/H50/H75 "
             "dos parâmetros V1. Taxas em **R$/p-h**, valores em **R$**. "
             "Cenário de esforço B fixo em **222 p-h** (213 equipe + 9 externas); "
             "parcela restante em **167 p-h** (158 equipe + 9 externas).", "",
             "| Valoração | Taxa | Equipe integral B | Externos B | Subtotal humano integral B | Subtotal humano restante B |",
             "| --- | ---: | ---: | ---: | ---: | ---: |"]
    for row in rows:
        base = row["cenarios_esforco"]["B"]
        values = [row["taxa_brl_ph"], base["equipe_integral_brl"], base["externos_brl"],
                  base["subtotal_humano_integral_brl"], base["subtotal_humano_restante_brl"]]
        lines.append("| " + row["id"] + " | " + " | ".join(map(brl, values)) + " |")
    lines += ["", "**Fonte e unidade:** mesmos parâmetros; subtotais humanos integrais em **R$**. "
              "O/B/P variam o esforço original; cada linha mantém sua taxa. "
              "Nenhuma linha representa orçamento de CJR, EJEM ou Code Júnior.", "",
              "| Valoração | Esforço O: 141 p-h | Esforço B: 222 p-h | Esforço P: 342,5 p-h |",
              "| --- | ---: | ---: | ---: |"]
    for row in rows:
        values = [row["cenarios_esforco"][c]["subtotal_humano_integral_brl"] for c in CASES]
        lines.append("| " + row["id"] + " | " + " | ".join(map(brl, values)) + " |")
    lines += ["", "Os preços publicados por projeto são contexto documental e não entram "
              "nas multiplicações. Infraestrutura e despesas desconhecidas continuam fora "
              "dos subtotais humanos.", "", COMPARE_END]
    return {"versao": config["versao"], "data_base": config["data_base"],
            "valoracoes": rows}, "\n".join(lines)


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    group = parser.add_mutually_exclusive_group(required=True)
    group.add_argument("--write", action="store_true")
    group.add_argument("--check", action="store_true")
    args = parser.parse_args()
    text = PAGE.read_text(encoding="utf-8")
    params = json.loads(PARAMS.read_text(encoding="utf-8"))
    result, block = calculate(text, params)
    comparison, comparison_block = compare_valuations(result, params)
    result["comparativo_valoracao"] = comparison
    output = json.dumps(result, ensure_ascii=False, indent=2,
                        default=lambda value: format(value, "f")) + "\n"
    pattern = re.escape(BEGIN) + r".*?" + re.escape(END)
    updated, count = re.subn(pattern, lambda _: block, text, flags=re.S)
    if count != 1:
        raise ValueError("Deve existir um unico bloco de calculo na pagina.")
    comparison_pattern = re.escape(COMPARE_BEGIN) + r".*?" + re.escape(COMPARE_END)
    updated, count = re.subn(comparison_pattern, lambda _: comparison_block, updated, flags=re.S)
    if count != 1:
        raise ValueError("Deve existir um unico bloco comparativo na pagina.")
    if args.write:
        OUTPUT.write_text(output, encoding="utf-8")
        PAGE.write_text(updated, encoding="utf-8")
    elif updated != text or not OUTPUT.exists() or OUTPUT.read_text(encoding="utf-8") != output:
        raise SystemExit("Calculos desatualizados. Execute com --write e revise o diff.")
    print("19 pacotes e 3 cenarios reconciliados; taxa R$ " + brl(result["taxa_brl_ph"]) + "/p-h.")
    print("Subtotal humano base: R$ " + brl(result["subtotal_humano_integral_brl"]["B"]))


if __name__ == "__main__":
    main()
