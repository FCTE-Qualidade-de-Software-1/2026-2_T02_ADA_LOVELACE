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

# Regra de revisão obrigatória na main (#41, concluída em 04/11/2026).
REGRA_REVISAO = datetime(2026, 11, 4, 17, 9, tzinfo=timezone.utc).astimezone(BRT)

PACOTES = Path("docs/gestao/dados/pacotes-issues.json")
CUSTOS = Path("docs/gestao/dados/custos-calculados.json")
REVISOES = Path("docs/gestao/dados/revisoes-prs.json")
TAXA = float(json.loads(CUSTOS.read_text(encoding="utf-8"))["taxa_brl_ph"])

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
    "Luís Cunha": {"Luis Felipe", "Luís Felipe Parreira Cunha", "cunha-luiss"},
    "Renato Araújo": {"Renato Araújo Gameiro", "Renato Gameiro", "renatoyx", "renatvg"},
    "Zayra Moraes": {"Zayra-Moraes"},
}


def instante(valor: str) -> datetime:
    return datetime.fromisoformat(valor.replace("Z", "+00:00")).astimezone(BRT)


def fmt_num(valor: float | None, casas: int = 1) -> str:
    if valor is None:
        return "N/A"
    return f"{valor:.{casas}f}".replace(".", ",")


def fmt_reais(valor: float) -> str:
    return f"{valor:,.2f}".replace(",", "X").replace(".", ",").replace("X", ".")


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


# --------------------------------------------------------------------------
# Horas registradas no Project e esforço previsto x realizado


def integrante_do_login(login: str) -> str:
    return next((nome for nome, ids in INTEGRANTES.items() if login in ids), login)


def horas_por_issue(issue: dict) -> dict[str, float]:
    """Horas de cada integrante numa issue.

    Issue de um responsável: campo Horas do Project. Atividade compartilhada:
    os comentários "Horas: x" de cada integrante; sem comentários, o campo
    Horas é dividido igualmente entre os responsáveis.
    """
    responsaveis = issue["responsaveis"]
    comentadas = issue.get("horas_comentadas") or []
    if len(responsaveis) == 1 and issue.get("horas") is not None:
        return {integrante_do_login(responsaveis[0]): float(issue["horas"])}
    if comentadas:
        soma: dict[str, float] = {}
        for registro in comentadas:
            nome = integrante_do_login(registro["autor"])
            soma[nome] = soma.get(nome, 0) + registro["horas"]
        return soma
    if issue.get("horas") is not None and responsaveis:
        parte = float(issue["horas"]) / len(responsaveis)
        return {integrante_do_login(login): parte for login in responsaveis}
    return {}


def fase_do_pacote(pacote: str) -> str:
    return {"F3": "Fase 3", "F4": "Fase 4", "T": "Transversal"}.get(pacote.split(".")[0], pacote)


def horas_e_esforco(issues: list[dict]) -> tuple[str, str]:
    mapa = json.loads(PACOTES.read_text(encoding="utf-8"))
    pacote_da_issue = {numero: pacote for pacote, numeros in mapa["pacotes"].items() for numero in numeros}
    custos = {p["id"]: p for p in json.loads(CUSTOS.read_text(encoding="utf-8"))["pacotes"]}

    por_integrante = {nome: {} for nome in INTEGRANTES}
    por_pacote: dict[str, float] = {}
    sem_horas = []
    for issue in issues:
        horas = horas_por_issue(issue)
        pacote = pacote_da_issue.get(issue["issue"])
        concluida = issue["status_atual"] == "Concluído"
        if concluida and not horas and pacote:
            sem_horas.append(issue["issue"])
        if not pacote:
            continue
        fase = fase_do_pacote(pacote)
        for nome, valor in horas.items():
            por_integrante.setdefault(nome, {})
            por_integrante[nome][fase] = por_integrante[nome].get(fase, 0) + valor
            por_pacote[pacote] = por_pacote.get(pacote, 0) + valor

    fases = ["Fase 3", "Fase 4", "Transversal"]
    nomes = sorted(por_integrante, key=str.casefold)
    concluidas = [i for i in issues if i["status_atual"] == "Concluído" and i["issue"] in pacote_da_issue]

    # Gráfico de horas por integrante, empilhado por fase.
    figura, eixo = plt.subplots(figsize=(7, 3.2))
    esquerda = [0.0] * len(nomes)
    for fase, cor in zip(fases, [COR_SECUNDARIA, COR_PRINCIPAL, "#3f9e6e"]):
        valores = [por_integrante[n].get(fase, 0) for n in nomes]
        eixo.barh(nomes, valores, left=esquerda, color=cor, label=fase)
        esquerda = [a + b for a, b in zip(esquerda, valores)]
    for posicao, total in enumerate(esquerda):
        eixo.text(total, posicao, f" {fmt_num(total)}", va="center", fontsize=8)
    eixo.invert_yaxis()
    eixo.set_xlabel("horas registradas no Project")
    eixo.set_title("Horas registradas por integrante e por fase, Entrega 2 (ordem alfabética)", fontsize=10)
    eixo.legend(frameon=False, fontsize=8, loc="lower right")
    estilo(eixo)
    salvar(figura, "horas-integrante-entrega-2.svg")

    tabela_horas = [
        "| Integrante | " + " | ".join(fases) + " | Total |",
        "| --- |" + " ---: |" * (len(fases) + 1),
        *(
            f"| {n} | " + " | ".join(fmt_num(por_integrante[n].get(f, 0)) for f in fases)
            + f" | {fmt_num(sum(por_integrante[n].values()))} |"
            for n in nomes
        ),
        "| **Total** | " + " | ".join(
            f"**{fmt_num(sum(por_integrante[n].get(f, 0) for n in nomes))}**" for f in fases
        ) + f" | **{fmt_num(sum(sum(v.values()) for v in por_integrante.values()))}** |",
        "",
        f"Issues concluídas com horas registradas: **{len(concluidas) - len(sem_horas)} de {len(concluidas)}**.",
    ]
    if sem_horas:
        tabela_horas.append(
            "Sem horas no Project (preencher o campo **Horas** ou comentar \"Horas: x\" na issue): "
            + ", ".join(link(n) for n in sorted(sem_horas)) + "."
        )

    # Previsto (cenário B da estimativa) x realizado, por pacote.
    pacotes = list(mapa["pacotes"])
    previsto = {}
    for pacote in pacotes:
        # O que restava fazer na data-base da estimativa (25/10): o pacote
        # inteiro se era futuro; só o restante se já tinha começado.
        previsto[pacote] = float(custos[pacote]["restante_ph"]["B"])
    realizado = {p: por_pacote.get(p, 0.0) for p in pacotes}

    figura, eixo = plt.subplots(figsize=(7, 0.36 * len(pacotes) + 1.2))
    posicoes = range(len(pacotes))
    eixo.barh([p - 0.2 for p in posicoes], [previsto[p] for p in pacotes], 0.4, color="#c9c9d6", label="Previsto (cenário B)")
    eixo.barh([p + 0.2 for p in posicoes], [realizado[p] for p in pacotes], 0.4, color=COR_PRINCIPAL, label="Realizado (horas registradas)")
    eixo.set_yticks(list(posicoes), pacotes)
    eixo.invert_yaxis()
    eixo.set_xlabel("pessoa-hora")
    eixo.set_title("Esforço previsto × horas registradas por pacote, Entrega 2", fontsize=10)
    eixo.legend(frameon=False, fontsize=8, loc="lower right")
    estilo(eixo)
    salvar(figura, "esforco-previsto-realizado-entrega-2.svg")

    def desvio(p: str) -> str:
        if not previsto[p]:
            return "N/A"
        return f"{fmt_num(realizado[p] - previsto[p])} ({fmt_num(100 * (realizado[p] - previsto[p]) / previsto[p], 0)}%)"

    total_prev, total_real = sum(previsto.values()), sum(realizado.values())
    tabela_esforco = [
        "| Pacote | Issues | Previsto B (p-h) | Realizado (p-h) | Desvio |",
        "| --- | --- | ---: | ---: | ---: |",
        *(
            f"| {p} | {', '.join(link(n) for n in mapa['pacotes'][p])} | {fmt_num(previsto[p])} | {fmt_num(realizado[p])} | {desvio(p)} |"
            for p in pacotes
        ),
        f"| **Total** | | **{fmt_num(total_prev)}** | **{fmt_num(total_real)}** | "
        f"**{fmt_num(total_real - total_prev)} ({fmt_num(100 * (total_real - total_prev) / total_prev, 0)}%)** |",
        "",
        f"Custo de referência do realizado: **R$ {fmt_reais(total_real * TAXA)}** "
        f"({fmt_num(total_real)} p-h × R$ {fmt_num(TAXA, 2)}/p-h), contra R$ {fmt_reais(total_prev * TAXA)} previstos.",
    ]
    return "\n".join(tabela_horas), "\n".join(tabela_esforco)


# --------------------------------------------------------------------------
# Revisão efetiva dos pull requests (G-G5)


def pontos_gg5(percentual: float | None) -> str:
    if percentual is None:
        return "N/A"
    return "2" if percentual >= 90 else "1" if percentual >= 70 else "0"


def commits_diretos(desde: datetime, ate: datetime) -> int:
    """Commits na main que não vieram de pull request (sem merge, sem squash "(#n)" e sem bots)."""
    saida = subprocess.run(
        ["git", "log", REF, "--first-parent", "--no-merges", f"--since={desde.isoformat()}",
         f"--until={ate.isoformat()}", "--format=%an%x09%s"],
        check=True, capture_output=True, text=True, encoding="utf-8",
    ).stdout
    return sum(
        1 for linha in saida.splitlines()
        if linha and not linha.split("\t", 1)[0].endswith("[bot]")
        and not re.search(r"\(#\d+\)$", linha.split("\t", 1)[1])
    )


def revisao_efetiva(coleta: datetime) -> str:
    prs = json.loads(REVISOES.read_text(encoding="utf-8"))["prs"]
    logins = set().union(*INTEGRANTES.values())

    def aprovado(pr: dict) -> bool:
        return any(r["estado"] == "APPROVED" and r["revisor"] in logins for r in pr["revisoes"])

    inicio_e2 = datetime.combine(INICIO, datetime.min.time(), BRT)
    periodos = [
        ("Entrega 1", None, inicio_e2),
        ("Entrega 2, antes da regra (até 04/11)", inicio_e2, REGRA_REVISAO),
        ("Entrega 2, depois da regra", REGRA_REVISAO, coleta),
        ("Entrega 2 (total)", inicio_e2, coleta),
    ]
    linhas, rotulos, percentuais = [], [], []
    for nome, desde, ate in periodos:
        grupo = [
            pr for pr in prs
            if (desde is None or instante(pr["integrado_em"]) >= desde) and instante(pr["integrado_em"]) < ate
        ]
        aprovados = sum(aprovado(pr) for pr in grupo)
        proprio = sum(pr["autor"] == pr["integrado_por"] for pr in grupo)
        pct = 100 * aprovados / len(grupo) if grupo else None
        # Na Entrega 1, conta a partir do primeiro PR, quando o fluxo por PR começou.
        primeiro_pr = min(instante(pr["integrado_em"]) for pr in prs)
        diretos = commits_diretos(desde or primeiro_pr, ate)
        linhas.append(
            f"| {nome} | {len(grupo)} | {aprovados} | {fmt_num(pct, 0) + '%' if pct is not None else 'N/A'} "
            f"| {pontos_gg5(pct)} | {proprio} | {diretos} |"
        )
        if nome != "Entrega 2 (total)":
            rotulos.append(nome.replace(", ", "\n"))
            percentuais.append(pct or 0)

    figura, eixo = plt.subplots(figsize=(7, 3.2))
    rects = eixo.bar(rotulos, percentuais, color=["#c9c9d6", "#c9c9d6", COR_PRINCIPAL], width=0.55)
    eixo.bar_label(rects, labels=[f"{fmt_num(p, 0)}%" for p in percentuais], fontsize=8)
    eixo.axhline(90, color="#3f9e6e", linestyle="--", linewidth=1)
    eixo.text(-0.4, 91, "meta G-G5 (90%)", ha="left", va="bottom", fontsize=8, color="#3f9e6e")
    eixo.set_ylim(0, 110)
    eixo.set_ylabel("% dos PRs integrados")
    eixo.set_title("PRs aprovados por outro integrante antes do merge", fontsize=10)
    eixo.spines[["top", "right"]].set_visible(False)
    eixo.grid(axis="y", color="#e6e6ee", linewidth=0.8)
    eixo.set_axisbelow(True)
    salvar(figura, "revisao-efetiva.svg")

    sem_aprovacao = [
        pr for pr in prs
        if instante(pr["integrado_em"]) >= REGRA_REVISAO and instante(pr["integrado_em"]) < coleta and not aprovado(pr)
    ]
    tabela = [
        "| Período | PRs integrados | Aprovados por outro integrante | Revisão efetiva | Pontos G-G5 | Integrados pelo próprio autor | Commits direto na `main` |",
        "| --- | ---: | ---: | ---: | :---: | ---: | ---: |",
        *linhas,
    ]
    if sem_aprovacao:
        tabela += [
            "",
            "Integrados sem aprovação depois da regra: " + ", ".join(
                f"[#{pr['numero']}](https://github.com/FCTE-Qualidade-de-Software-1/2026-2_T02_ADA_LOVELACE/pull/{pr['numero']})"
                for pr in sem_aprovacao
            ) + ".",
        ]
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
    tabela_horas, tabela_esforco = horas_e_esforco(issues)
    pagina = substituir_bloco(pagina, "horas", tabela_horas)
    pagina = substituir_bloco(pagina, "esforco", tabela_esforco)
    pagina = substituir_bloco(pagina, "revisao", revisao_efetiva(coleta))
    PAGE.write_text(pagina, encoding="utf-8")
    print(f"Gráficos em {IMAGES} e tabelas em {PAGE} atualizados.")


if __name__ == "__main__":
    main()
