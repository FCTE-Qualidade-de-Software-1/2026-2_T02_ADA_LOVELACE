#!/usr/bin/env python3
"""Compare an original .excalidraw scene with scenes reopened after export (F-M11)."""

from __future__ import annotations

import argparse
import base64
import json
import math
import re
import struct
import zlib
from pathlib import Path

# Atributos que o usuário vê ou que mudam o diagrama. Ficam de fora version,
# versionNonce, updated e index, que o Excalidraw regrava ao abrir ou salvar.
ATRIBUTOS = [
    "type", "x", "y", "width", "height", "angle", "seed",
    "strokeColor", "backgroundColor", "fillStyle", "strokeWidth", "strokeStyle",
    "roughness", "opacity", "roundness", "groupIds", "frameId", "link", "locked",
    "text", "originalText", "fontSize", "fontFamily", "textAlign", "verticalAlign",
    "containerId", "lineHeight", "points", "startArrowhead", "endArrowhead",
    "startBinding", "endBinding", "boundElements", "fileId",
]
TOLERANCIA = 0.01


def decodificar_cena(metadados: dict) -> dict:
    # Mesmo formato de packages/excalidraw/data/encode.ts: string binária,
    # opcionalmente comprimida com deflate.
    dados = metadados["encoded"].encode("latin1")
    if metadados.get("compressed"):
        dados = zlib.decompress(dados)
    return json.loads(dados.decode("utf-8"))


def cena_do_png(caminho: Path) -> dict:
    dados = caminho.read_bytes()
    posicao = 8
    while posicao < len(dados):
        tamanho, tipo = struct.unpack(">I4s", dados[posicao:posicao + 8])
        if tipo == b"tEXt":
            chave, valor = dados[posicao + 8:posicao + 8 + tamanho].split(b"\0", 1)
            if chave == b"application/vnd.excalidraw+json":
                return decodificar_cena(json.loads(valor.decode("latin1")))
        posicao += 12 + tamanho
    raise ValueError(f"{caminho.name} não tem cena incorporada")


def cena_do_svg(caminho: Path) -> dict:
    trecho = re.search(r"<!-- payload-start -->\s*(.+?)\s*<!-- payload-end -->",
                       caminho.read_text(encoding="utf-8"), re.S)
    if not trecho:
        raise ValueError(f"{caminho.name} não tem cena incorporada")
    return decodificar_cena(json.loads(base64.b64decode(trecho.group(1)).decode("latin1")))


def carregar(caminho: Path) -> dict:
    if caminho.suffix == ".png":
        return cena_do_png(caminho)
    if caminho.suffix == ".svg":
        return cena_do_svg(caminho)
    with caminho.open(encoding="utf-8") as arquivo:
        return json.load(arquivo)


def elementos_ativos(cena: dict) -> dict[str, dict]:
    return {el["id"]: el for el in cena.get("elements", []) if not el.get("isDeleted")}


def normalizar(atributo: str, valor):
    # Na ligação de setas importa a qual elemento ela se liga, não o ponto exato.
    if atributo in ("startBinding", "endBinding"):
        return valor["elementId"] if valor else None
    if atributo == "boundElements":
        return sorted(item["id"] for item in valor or [])
    return valor


def iguais(a, b) -> bool:
    if isinstance(a, (int, float)) and isinstance(b, (int, float)):
        return math.isclose(a, b, abs_tol=TOLERANCIA)
    if isinstance(a, list) and isinstance(b, list):
        return len(a) == len(b) and all(iguais(x, y) for x, y in zip(a, b))
    if isinstance(a, dict) and isinstance(b, dict):
        return a.keys() == b.keys() and all(iguais(a[k], b[k]) for k in a)
    return a == b


def diferencas(original: dict, reaberto: dict) -> list[str]:
    return [
        atributo for atributo in ATRIBUTOS
        if not iguais(normalizar(atributo, original.get(atributo)),
                      normalizar(atributo, reaberto.get(atributo)))
    ]


def comparar(original: dict, reaberto: dict) -> list[tuple[str, str, str]]:
    elementos_reabertos = elementos_ativos(reaberto)
    linhas = []
    for id_, el in elementos_ativos(original).items():
        if id_ not in elementos_reabertos:
            linhas.append((id_, el["type"], "ausente"))
            continue
        difs = diferencas(el, elementos_reabertos[id_])
        if el.get("fileId") and el["fileId"] not in reaberto.get("files", {}):
            difs.append("arquivo da imagem")
        linhas.append((id_, el["type"], ", ".join(difs) if difs else "preservado"))
    return linhas


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("original", type=Path, help="cena salva antes da exportação")
    parser.add_argument("reabertos", type=Path, nargs="+",
                        help="cenas salvas depois de reabrir cada exportação, ou .png/.svg com cena incorporada")
    args = parser.parse_args()

    original = carregar(args.original)
    total = len(elementos_ativos(original))
    print(f"Cena original: {args.original.name} ({total} elementos)\n")
    print("| Arquivo reaberto | Preservados | Total | Fidelidade |")
    print("| --- | :-: | :-: | :-: |")
    detalhes = []
    for caminho in args.reabertos:
        linhas = comparar(original, carregar(caminho))
        preservados = sum(1 for *_, situacao in linhas if situacao == "preservado")
        print(f"| {caminho.name} | {preservados} | {total} | {preservados / total:.0%} |")
        detalhes.append((caminho.name, linhas))

    for nome, linhas in detalhes:
        print(f"\n{nome}\n")
        print("| Elemento | Tipo | Situação |")
        print("| --- | --- | --- |")
        for id_, tipo, situacao in linhas:
            print(f"| `{id_}` | {tipo} | {situacao} |")


if __name__ == "__main__":
    main()
