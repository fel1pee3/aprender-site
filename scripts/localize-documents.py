"""Import or verify the binary-preserving, same-origin document archive.

First import (from the previously inspected files):
  python scripts/localize-documents.py --import-files --catalogue "C:/path/catalogue.pdf"
Subsequent integrity checks (no network, no writes):
  python scripts/localize-documents.py

Uses the project's existing PyMuPDF and Pillow tools when installed in .tools/pylibs.
Source URLs are provenance, never a runtime fallback.
"""
from __future__ import annotations

import argparse
import hashlib
import json
from pathlib import Path
import re
import shutil
import sys

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / ".tools/pylibs"))
try:
    import pymupdf as fitz  # noqa: E402
    from PIL import Image  # noqa: E402
except ImportError as error:
    raise SystemExit("Document verification requires PyMuPDF and Pillow; install with: python -m pip install PyMuPDF Pillow") from error

DATA_FILE = ROOT / "src/data/resources.ts"
MATRIX_FILE = ROOT / "docs/refinement/document-migration.json"
EXPECTED = {
    "brincando-e-aprendendo": 4, "lendo-e-escrevendo": 3,
    "novo-lendo-voce-fica-sabendo": 2, "escrever-comunicar-e-ser": 5,
    "acerta-brasil": 2, "projeto-tema": 3,
    "vida-e-linguagem": 4, "vida-e-matematica": 4,
}
TESTIMONIALS = {
    "alcides-leite": 1, "cicera-rejane": 3, "germana-santos": 4,
    "herbert-lima": 5, "jose-leandro": 6, "jose-marcelo": 7,
    "julio-cesar": 8, "lucinete-alves": 9, "vilma-rodrigues": 10,
}


def resources():
    source = DATA_FILE.read_text(encoding="utf-8-sig")
    match = re.search(
        r"export const documentResources: DocumentResource\[\] = (\[.*?\n\]);",
        source, re.S,
    )
    assert match, "Cannot locate typed document inventory"
    return source, match, json.loads(match[1])


def sha256(path):
    digest = hashlib.sha256()
    with path.open("rb") as stream:
        for block in iter(lambda: stream.read(1024 * 1024), b""):
            digest.update(block)
    return digest.hexdigest()


def inspect_pdf(path):
    binary = path.read_bytes()
    assert binary.startswith(b"%PDF-"), f"Not a PDF: {path}"
    assert b"%%EOF" in binary[-2048:], f"Missing PDF trailer: {path}"
    with fitz.open(path) as document:
        assert document.is_pdf and not document.needs_pass
        assert not document.is_repaired, f"PDF requires repair: {path}"
        assert document.page_count > 0
        # Resolve every page tree entry and content stream, then rasterize both
        # ends. This catches a truncated body, not only a plausible header.
        for page in document:
            page.get_text()
        for index in {0, document.page_count - 1}:
            document[index].get_pixmap(matrix=fitz.Matrix(.25, .25))
        result = {
            "signature": "%PDF-", "trailer": "%%EOF",
            "parser": f"PyMuPDF {fitz.VersionBind}",
            "parse": "all pages loaded; first and last pages rasterized",
            "pageCount": document.page_count, "repaired": document.is_repaired,
            "firstPageText": document[0].get_text()[:400],
        }
    return {"sizeBytes": len(binary), "sha256": sha256(path), **result}


def assert_inventory(records):
    counts = {}
    for record in records:
        if record["kind"] == "sample":
            slug = record["collectionSlug"]
            counts[slug] = counts.get(slug, 0) + 1
    assert counts == EXPECTED, f"Unexpected sample counts: {counts}"
    assert sum(x["kind"] == "institutional" for x in records) == 1
    assert sum(x["kind"] == "catalog" for x in records) == 1
    assert len(records) == 29
    return counts


def import_files(catalogue):
    source, match, records = resources()
    counts = assert_inventory(records)
    documents = []
    for record in records:
        origin = dict(record)
        original = (catalogue if record["kind"] == "catalog" else
                    ROOT / ".tools/samples" / f"{record['id']}.pdf")
        target = ROOT / "public/documents" / f"{record['id']}.pdf"
        target.parent.mkdir(parents=True, exist_ok=True)
        original_validation = inspect_pdf(original)
        assert original_validation["sizeBytes"] == record["sizeBytes"]
        assert original_validation["pageCount"] == record["pageCount"]
        shutil.copyfile(original, target)
        validation = inspect_pdf(target)
        assert validation["sha256"] == original_validation["sha256"]
        record["sourceUrl"] = origin.get("sourceUrl", origin["url"])
        record["url"] = "/documents/" + target.name
        record["sizeBytes"] = validation["sizeBytes"]
        if record["kind"] == "sample":
            record["edition"] = "Amostra de acervo · ano de edição não informado"
            record.pop("notes", None)
        if record["id"] == "educacao-infantil-laranja":
            record["notes"] = "Trecho “Dia de Supermercado”. Livro e volume não identificados no documento."
        if record["id"] == "educacao-infantil-verde-vol-02":
            record["notes"] = "Livro da Criança 2 · volume II · ISBN 978-85-8314-256-0."
        if record["kind"] == "institutional":
            record["notes"] = "SEDUC / UNICEF · ISBN 978-85-8171-019-8. A publicação tem 196 páginas editoriais, organizadas em 100 páginas digitais."
        if record["kind"] == "catalog":
            record.pop("notes", None)
        documents.append({
            "id": record["id"], "title": record["title"], "kind": record["kind"],
            "collectionSlug": record.get("collectionSlug"),
            "sourceUrl": record["sourceUrl"], "sourcePage": record["sourcePage"],
            "localUrl": record["url"], "edition": record["edition"],
            "originalRecord": origin, "validation": validation,
            "binaryChanged": False, "action": "same-origin PDF; load only after explicit action",
        })
    source = source[:match.start(1)] + json.dumps(records, ensure_ascii=False, indent=2) + source[match.end(1):]
    source = source.replace("title: string; url: string; format:", "title: string; url: string; sourceUrl: string; format:")
    DATA_FILE.write_text(source, encoding="utf-8", newline="\n")
    portraits = []
    for id, number in TESTIMONIALS.items():
        original = ROOT / ".tools/institutional" / f"frase-{number}.jpg"
        target = ROOT / "public/images/testimonials" / f"original-{id}.jpg"
        target.parent.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(original, target)
        with Image.open(target) as image:
            image.verify()
        with Image.open(target) as image:
            width, height = image.size
        assert sha256(original) == sha256(target)
        portraits.append({
            "id": id,
            "sourceUrl": f"https://www.aprendereditora.com.br/v2/midia/banner/frase-{number}.jpg",
            "localUrl": f"/images/testimonials/{target.name}",
            "format": "JPEG", "width": width, "height": height,
            "sizeBytes": target.stat().st_size, "sha256": sha256(target),
            "binaryChanged": False,
        })
    matrix = {
        "checkedAt": "2026-10-14", "method": "Original binary copied without compression or content changes",
        "summary": {"samples": 27, "institutional": 1, "catalogues": 1,
                    "sampleCounts": counts, "totalDocumentBytes": sum(x["sizeBytes"] for x in records),
                    "testimonialOriginals": 9},
        "documents": documents, "testimonials": portraits,
    }
    MATRIX_FILE.parent.mkdir(parents=True, exist_ok=True)
    MATRIX_FILE.write_text(json.dumps(matrix, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def verify():
    _, _, records = resources()
    assert_inventory(records)
    matrix = json.loads(MATRIX_FILE.read_text(encoding="utf-8"))
    expectations = {item["id"]: item for item in matrix["documents"]}
    for record in records:
        assert record["url"].startswith("/documents/")
        path = ROOT / "public" / record["url"].lstrip("/")
        actual = inspect_pdf(path)
        expected = expectations[record["id"]]["validation"]
        for field in ("sha256", "sizeBytes", "pageCount"):
            assert actual[field] == expected[field], f"Changed {record['id']} {field}"
        assert actual["sizeBytes"] == record["sizeBytes"]
        assert actual["pageCount"] == record["pageCount"]
    for item in matrix["testimonials"]:
        path = ROOT / "public" / item["localUrl"].lstrip("/")
        assert sha256(path) == item["sha256"]
        with Image.open(path) as image:
            assert list(image.size) == [item["width"], item["height"]]
            image.verify()
    print(json.dumps({"verified": True, **matrix["summary"]}, ensure_ascii=True))


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--import-files", action="store_true")
    parser.add_argument("--catalogue", type=Path)
    args = parser.parse_args()
    if args.import_files:
        assert args.catalogue and args.catalogue.is_file(), "Provide the catalogue's real file path"
        import_files(args.catalogue)
    verify()
