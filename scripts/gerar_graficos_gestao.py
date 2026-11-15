#!/usr/bin/env python3
"""Gera os gráficos e as tabelas de gestão da Entrega 2 (issue #76).

Lê o histórico de Status coletado por scripts/collect_project_metrics.py e o
histórico de commits da main, e atualiza:

* as imagens em docs/assets/gestao/;
* os blocos automáticos de docs/gestao/graficos-entrega-2.md.

Não consulta a API do GitHub: roda igual com ou sem o token do Project, a
partir do último historico-status.json versionado.
"""

from __future__ import annotations

import json
import os
import re
import statistics
import subprocess
from collections import Counter
from datetime import date, datetime, timedelta, timezone
from pathlib import Path

import matplotlib
import matplotlib.dates

matplotlib.use("Agg")
import matplotlib.pyplot as plt  # noqa: E402

HISTORY = Path("docs/gestao/dados/historico-status.json")
PAGE = Path("docs/gestao/graficos-entrega-2.md")
IMAGES = Path("docs/assets/gestao")
REF = os.environ.get("METRICS_REF", "main")
MILESTONE = "Entrega 2"

# Horário de Brasília (sem horário de verão em 2026): os dias e os prazos do
# Project são datas locais.
BRT = timezone(timedelta(hours=-3))

# Ciclos de duas semanas da Entrega 2. O primeiro começa no dia seguinte à
# Entrega 1 (26/10); o segundo termina na Entrega 2 (18/11) e por isso é
# mais curto.
CICLOS = [
    ("Ciclo 1", date(2026, 10, 27), date(2026, 11, 9)),
    ("Ciclo 2", date(2026, 11, 10), date(2026, 11, 18)),
]
INICIO, FIM = CICLOS[0][1], CICLOS[-1][2]

# Troca do quadro: Project #19 da organização -> Project de usuário, para que
# todos os integrantes pudessem mover os cartões (ver gestao-grupo.md).
MIGRACAO = datetime(2026, 11, 6, 5, 47, tzinfo=timezone.utc).astimezone(BRT)

ESTADOS = ["Backlog", "A fazer", "Em andamento", "Em revisão", "Concluído"]
CORES = {
    "Backlog": "#c9c9d6",
    "A fazer": "#8e8ce6",
    "Em andamento": "#f2a541",
    "Em revisão": "#e2665b",
    "Concluído": "#3f9e6e",
}
COR_PRINCIPAL = "#6965db"
COR_SECUNDARIA = "#f2a541"

# Identidades de commit agrupadas por integrante (nomes e logins da página
# inicial). Commits de bots ficam de fora.
INTEGRANTES = {
    "André Henrique": {"andrehsb"},
    "Giovanna Felipe": {"giovannafg", "Giovanna Felipe"},
    "João Pedro Lopes": {"João Pedro Lopes da Cruz", "ojplc"},
    "Luís Cunha": {"Luis Felipe", "cunha-luiss"},
    "Renato Araújo": {"Renato Araújo Gameiro", "Renato Gameiro", "renatoyx", "renatvg"},
    "Zayra Moraes": {"Zayra-Moraes"},
}


def instante(valor: str) -> datetime:
    return datetime.fromisoformat(valor.replace("Z", "+00:00")).astimezone(BRT)


def fmt_num(valor: float | None, casas: int = 1) -> str:
    if valor is None:
        return "N/A"
    return f"{valor:.{casas}f}".replace(".", ",")


def fmt_data(dia: date) -> str:
    return dia.strftime("%d/%m")


def link(numero: int) -> str:
    return f"[#{numero}](https://github.com/FCTE-Qualidade-de-Software-1/2026-2_T02_ADA_LOVELACE/issues/{numero})"


def status_em(issue: dict, momento: datetime) -> str | None:
    """Status da issue no quadro no instante dado (None se ainda não estava no quadro)."""
    atual = None
    for evento in issue["eventos"]:
        if instante(evento["em"]) > momento:
            break
        atual = evento["para"]
    return atual


def tempos(issue: dict) -> tuple[datetime, datetime | None, datetime] | None:
    """(criação, início do Cycle Time, conclusão), com a mesma regra do lead-cycle-time.csv."""
    eventos = [(instante(e["em"]), e["para"]) for e in issue["eventos"]]
    conclusoes = [momento for momento, para in eventos if para == "Concluído"]
    if issue["status_atual"] != "Concluído" or not conclusoes:
        return None
    fim = conclusoes[-1]
    limite = conclusoes[-2] if len(conclusoes) > 1 else None
    inicios = [
        momento for momento, para in eventos
        if para == "Em andamento" and momento <= fim and (limite is None or momento > limite)
    ]
    return instante(issue["criada_em"]), (inicios[0] if inicios else None), fim


def dias(inicio: datetime, fim: datetime) -> float:
    return (fim - inicio).total_seconds() / 86400


def mediana(valores: list[float]) -> float | None:
    return statistics.median(valores) if valores else None


def substituir_bloco(texto: str, nome: str, conteudo: str) -> str:
    padrao = rf"<!-- BEGIN AUTO: {nome} -->.*?<!-- END AUTO: {nome} -->"
    novo = f"<!-- BEGIN AUTO: {nome} -->\n{conteudo}\n<!-- END AUTO: {nome} -->"
    texto, trocas = re.subn(padrao, lambda _: novo, texto, count=1, flags=re.S)
    if trocas != 1:
        raise RuntimeError(f"Bloco automático '{nome}' não encontrado em {PAGE}")
    return texto


def salvar(figura, nome: str) -> None:
    IMAGES.mkdir(parents=True, exist_ok=True)
    # svg.hashsalt e metadata fixos deixam o SVG estável entre execuções,
    # para o workflow só gerar commit quando os dados mudarem.
    figura.savefig(IMAGES / nome, format="svg", bbox_inches="tight", metadata={"Date": None})
    plt.close(figura)


def estilo(eixo) -> None:
    eixo.spines[["top", "right"]].set_visible(False)
    eixo.grid(axis="x", color="#e6e6ee", linewidth=0.8)
    eixo.set_axisbelow(True)


# --------------------------------------------------------------------------
# Lead Time e Cycle Time


def lead_cycle(issues: list[dict]) -> str:
    linhas = []
    for issue in issues:
        t = tempos(issue)
        if not t:
            continue
        criada, inicio, fim = t
        linhas.append({
            "issue": issue["issue"],
            "titulo": issue["titulo"],
            "lead": dias(criada, fim),
            "cycle": dias(inicio, fim) if inicio else None,
            "fim": fim,
        })
    linhas.sort(key=lambda linha: linha["issue"])
    leads = [linha["lead"] for linha in linhas]
    cycles = [linha["cycle"] for linha in linhas if linha["cycle"] is not None]

    figura, eixo = plt.subplots(figsize=(8, 0.32 * len(linhas) + 1.4))
    rotulos = [f"#{linha['issue']}" for linha in linhas]
    posicoes = range(len(linhas))
    eixo.barh([p + 0.2 for p in posicoes], leads, height=0.4, color=COR_PRINCIPAL, label="Lead Time")
    eixo.barh(
        [p - 0.2 for p in posicoes],
        [linha["cycle"] or 0 for linha in linhas],
        height=0.4, color=COR_SECUNDARIA, label="Cycle Time",
    )
    if leads:
        eixo.axvline(mediana(leads), color=COR_PRINCIPAL, linestyle="--", linewidth=1)
    if cycles:
        eixo.axvline(mediana(cycles), color=COR_SECUNDARIA, linestyle="--", linewidth=1)
    eixo.set_yticks(list(posicoes), rotulos)
    eixo.invert_yaxis()
    eixo.set_xlabel("dias")
    eixo.set_title("Lead Time e Cycle Time por issue concluída (linhas tracejadas: medianas)", fontsize=10)
    eixo.legend(loc="lower right", frameon=False)
    estilo(eixo)
    salvar(figura, "lead-cycle-time-entrega-2.svg")

    tabela = [
        "| Issue | Título | Concluída em | Lead Time (dias) | Cycle Time (dias) |",
        "| --- | --- | :---: | ---: | ---: |",
        *(
            f"| {link(l['issue'])} | {l['titulo']} | {l['fim']:%d/%m} | {fmt_num(l['lead'])} | {fmt_num(l['cycle'])} |"
            for l in linhas
        ),
        "",
        f"**Mediana:** Lead Time de **{fmt_num(mediana(leads))} dias** ({len(leads)} issues) e "
        f"Cycle Time de **{fmt_num(mediana(cycles))} dias** ({len(cycles)} issues; "
        f"{len(linhas) - len(cycles)} sem passagem por *Em andamento* ficam como N/A).",
    ]
    return "\n".join(tabela)


# --------------------------------------------------------------------------
# Efeito da troca do quadro: Entrega 1 x Entrega 2


def comparacao_entregas(todas: list[dict]) -> str:
    entregas = ["Entrega 1", "Entrega 2"]
    resumo = {}
    for entrega in entregas:
        concluidas = [
            (issue, t) for issue in todas
            if issue["milestone"] == entrega and issue["motivo_fechamento"] != "NOT_PLANNED"
            and (t := tempos(issue))
        ]
        total = len(concluidas)
        com_andamento = sum(1 for _, t in concluidas if t[1])
        com_revisao = sum(
            1 for issue, _ in concluidas if any(e["para"] == "Em revisão" for e in issue["eventos"])
        )
        resumo[entrega] = (total, com_andamento, com_revisao)

    def pct(parte: int, total: int) -> float:
        return 100 * parte / total if total else 0

    figura, eixo = plt.subplots(figsize=(7, 3.4))
    grupos = ["Passaram por Em andamento\n(Cycle Time mensurável)", "Passaram por Em revisão"]
    largura = 0.35
    for deslocamento, entrega, cor in [(-largura / 2, "Entrega 1", "#c9c9d6"), (largura / 2, "Entrega 2", COR_PRINCIPAL)]:
        total, andamento, revisao = resumo[entrega]
        rects = eixo.bar(
            [p + deslocamento for p in range(len(grupos))],
            [pct(andamento, total), pct(revisao, total)],
            largura, color=cor, label=f"{entrega} ({total} issues concluídas)",
        )
        eixo.bar_label(rects, labels=[f"{andamento}/{total}", f"{revisao}/{total}"], fontsize=8)
    eixo.set_xticks(range(len(grupos)), grupos)
    eixo.set_ylim(0, 110)
    eixo.set_ylabel("% das issues concluídas")
    eixo.set_title("Issues concluídas com cada etapa registrada no quadro", fontsize=10)
    eixo.legend(frameon=False, fontsize=8, loc="upper left")
    eixo.spines[["top", "right"]].set_visible(False)
    eixo.grid(axis="y", color="#e6e6ee", linewidth=0.8)
    eixo.set_axisbelow(True)
    salvar(figura, "comparacao-entregas.svg")

    linhas = [
        "| Entrega | Issues concluídas | Passaram por Em andamento | Passaram por Em revisão |",
        "| --- | ---: | ---: | ---: |",
    ]
    for entrega in entregas:
        total, andamento, revisao = resumo[entrega]
        linhas.append(
            f"| {entrega} | {total} | {andamento} ({fmt_num(pct(andamento, total), 0)}%) "
            f"| {revisao} ({fmt_num(pct(revisao, total), 0)}%) |"
        )
    return "\n".join(linhas)


# --------------------------------------------------------------------------
# Fluxo acumulado


def fluxo_acumulado(issues: list[dict], hoje: date) -> str:
    ultimo = min(hoje, FIM)
    dias_serie = [INICIO + timedelta(days=n) for n in range((ultimo - INICIO).days + 1)]
    contagens = {estado: [] for estado in ESTADOS}
    for dia in dias_serie:
        fim_do_dia = datetime.combine(dia, datetime.max.time(), BRT)
        estados = Counter(status_em(issue, fim_do_dia) for issue in issues)
        for estado in ESTADOS:
            contagens[estado].append(estados.get(estado, 0))

    figura, eixo = plt.subplots(figsize=(9, 4.2))
    # Concluído embaixo, Backlog em cima: leitura padrão do diagrama.
    ordem = list(reversed(ESTADOS))
    eixo.stackplot(
        dias_serie, *(contagens[e] for e in ordem),
        labels=ordem, colors=[CORES[e] for e in ordem], alpha=0.95,
    )
    for nome, comeco, _ in CICLOS[1:]:
        eixo.axvline(comeco, color="#555", linestyle=":", linewidth=1)
        eixo.text(comeco, eixo.get_ylim()[1] * 0.98, f" {nome}", va="top", fontsize=8, color="#555")
    troca = MIGRACAO.date()
    if INICIO <= troca <= ultimo:
        eixo.axvline(troca, color="#222", linestyle="--", linewidth=1)
        eixo.text(troca, eixo.get_ylim()[1] * 0.90, " novo quadro", va="top", fontsize=8, color="#222")
    eixo.set_xlim(dias_serie[0], dias_serie[-1])
    eixo.set_ylabel("issues")
    eixo.set_title("Fluxo acumulado das issues da Entrega 2 (Status no fim de cada dia)", fontsize=10)
    eixo.xaxis.set_major_locator(matplotlib.dates.DayLocator(interval=2))
    eixo.xaxis.set_major_formatter(matplotlib.dates.DateFormatter("%d/%m"))
    eixo.legend(loc="upper left", frameon=False, fontsize=8, reverse=True)
    eixo.spines[["top", "right"]].set_visible(False)
    salvar(figura, "fluxo-acumulado-entrega-2.svg")

    marcos = sorted({INICIO, *(c[1] for c in CICLOS[1:]), ultimo, *[d for d in dias_serie if d.weekday() == 0]})
    tabela = [
        "| Dia | " + " | ".join(ESTADOS) + " | WIP (andamento + revisão) |",
        "| --- |" + " ---: |" * len(ESTADOS) + " ---: |",
    ]
    for dia in marcos:
        i = dias_serie.index(dia)
        valores = [contagens[e][i] for e in ESTADOS]
        tabela.append(f"| {fmt_data(dia)} | " + " | ".join(map(str, valores)) + f" | {valores[2] + valores[3]} |")
    return "\n".join(tabela)


# --------------------------------------------------------------------------
# Planejado x concluído


def planejado_concluido(issues: list[dict], coleta: datetime) -> str:
    hoje = coleta.date()
    linhas, rotulos, planejados, no_prazo, no_ciclo = [], [], [], [], []
    sem_prazo = [issue for issue in issues if not issue["prazo"]]
    for nome, comeco, fim in CICLOS:
        fim_do_ciclo = datetime.combine(fim, datetime.max.time(), BRT)
        corte = min(fim_do_ciclo, coleta)
        plano = [
            issue for issue in issues
            if issue["prazo"] and comeco <= date.fromisoformat(issue["prazo"]) <= fim
        ]
        feitas = [issue for issue in plano if status_em(issue, corte) == "Concluído"]
        entregues = [
            issue for issue in issues
            if (t := tempos(issue)) and comeco <= t[2].date() <= fim
        ]
        andamento = " (em curso)" if hoje <= fim else ""
        taxa = f"{len(feitas) / len(plano):.0%}".replace(".", ",") if plano else "N/A"
        linhas.append(
            f"| {nome}{andamento} | {fmt_data(comeco)} a {fmt_data(fim)} | {len(plano)} | {len(feitas)} | {taxa} | {len(entregues)} |"
        )
        rotulos.append(f"{nome}\n{fmt_data(comeco)}–{fmt_data(fim)}{andamento}")
        planejados.append(len(plano))
        no_prazo.append(len(feitas))
        no_ciclo.append(len(entregues))

    figura, eixo = plt.subplots(figsize=(7, 3.8))
    posicoes = range(len(CICLOS))
    largura = 0.26
    barras = [
        (planejados, "Planejadas (Prazo no ciclo)", "#c9c9d6", -largura),
        (no_prazo, "Planejadas e concluídas no ciclo", COR_PRINCIPAL, 0),
        (no_ciclo, "Total concluído no ciclo", "#3f9e6e", largura),
    ]
    for valores, rotulo, cor, deslocamento in barras:
        rects = eixo.bar([p + deslocamento for p in posicoes], valores, largura, label=rotulo, color=cor)
        eixo.bar_label(rects, fontsize=8)
    eixo.set_xticks(list(posicoes), rotulos)
    eixo.set_ylabel("issues")
    eixo.set_title("Planejado × concluído por ciclo (Entrega 2)", fontsize=10)
    eixo.legend(frameon=False, fontsize=8, loc="upper left")
    eixo.spines[["top", "right"]].set_visible(False)
    eixo.grid(axis="y", color="#e6e6ee", linewidth=0.8)
    eixo.set_axisbelow(True)
    salvar(figura, "planejado-concluido-entrega-2.svg")

    tabela = [
        "| Ciclo | Período | Planejadas | Planejadas e concluídas | Planejado × concluído | Total concluído no ciclo |",
        "| --- | --- | ---: | ---: | ---: | ---: |",
        *linhas,
        "",
        f"Issues da Entrega 2 sem Prazo no Project (fora do planejado): {len(sem_prazo)} "
        f"({', '.join(link(i['issue']) for i in sem_prazo) or 'nenhuma'}).",
    ]
    return "\n".join(tabela)


# --------------------------------------------------------------------------
# Commits por integrante


def commits_por_integrante() -> str:
    desde = datetime.combine(INICIO, datetime.min.time(), BRT).isoformat()
    ate = datetime.combine(FIM, datetime.max.time(), BRT).replace(microsecond=0).isoformat()
    saida = subprocess.run(
        ["git", "shortlog", "-sn", "--no-merges", f"--since={desde}", f"--until={ate}", REF],
        check=True, capture_output=True, text=True, encoding="utf-8",
    ).stdout
    por_identidade = {}
    for linha in saida.splitlines():
        quantidade, nome = linha.strip().split("\t", 1)
        por_identidade[nome] = int(quantidade)
    contagem = {integrante: 0 for integrante in INTEGRANTES}
    nao_identificados = []
    for nome, quantidade in por_identidade.items():
        if nome.endswith("[bot]"):
            continue
        dono = next((i for i, nomes in INTEGRANTES.items() if nome in nomes), None)
        if dono:
            contagem[dono] += quantidade
        else:
            nao_identificados.append(f"{nome} ({quantidade})")

    # Ordem alfabética, de propósito: o dado é descritivo, não um ranking.
    nomes = sorted(contagem, key=str.casefold)
    figura, eixo = plt.subplots(figsize=(7, 3.2))
    rects = eixo.barh(nomes, [contagem[n] for n in nomes], color=COR_PRINCIPAL)
    eixo.bar_label(rects, fontsize=8, padding=2)
    eixo.invert_yaxis()
    eixo.set_xlabel("commits não-merge na main")
    eixo.set_title(f"Commits por integrante, {fmt_data(INICIO)} a {fmt_data(FIM)} (ordem alfabética)", fontsize=10)
    estilo(eixo)
    salvar(figura, "commits-integrante-entrega-2.svg")

    tabela = [
        "| Integrante | Commits não-merge |",
        "| --- | ---: |",
        *(f"| {n} | {contagem[n]} |" for n in nomes),
        f"| **Total** | **{sum(contagem.values())}** |",
    ]
    if nao_identificados:
        tabela += ["", "Identidades não associadas a um integrante: " + ", ".join(nao_identificados) + "."]
    return "\n".join(tabela)


def main() -> None:
    plt.rcParams.update({"font.size": 9, "svg.hashsalt": "ada-lovelace", "svg.fonttype": "none"})
    dados = json.loads(HISTORY.read_text(encoding="utf-8"))
    issues = [
        issue for issue in dados["issues"]
        if issue["milestone"] == MILESTONE and issue["motivo_fechamento"] != "NOT_PLANNED"
    ]
    coleta = instante(dados["coletado_em"])
    hoje = coleta.date()

    pagina = PAGE.read_text(encoding="utf-8")
    pagina = substituir_bloco(
        pagina, "coleta",
        f"*Dados do Project coletados em {coleta:%d/%m/%Y %H:%M} (horário de Brasília); "
        f"{len(issues)} issues no milestone {MILESTONE}.*",
    )
    pagina = substituir_bloco(pagina, "comparacao", comparacao_entregas(dados["issues"]))
    pagina = substituir_bloco(pagina, "lead-cycle", lead_cycle(issues))
    pagina = substituir_bloco(pagina, "fluxo", fluxo_acumulado(issues, hoje))
    pagina = substituir_bloco(pagina, "planejado", planejado_concluido(issues, coleta))
    pagina = substituir_bloco(pagina, "commits", commits_por_integrante())
    PAGE.write_text(pagina, encoding="utf-8")
    print(f"Gráficos em {IMAGES} e tabelas em {PAGE} atualizados.")


if __name__ == "__main__":
    main()
