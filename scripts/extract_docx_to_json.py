#!/usr/bin/env python3
"""Extract DOCX text corpus into raw JSON for curation workflows.

Usage:
  python3 scripts/extract_docx_to_json.py \
    --source-dir "/path/to/Policy Handbook" \
    --output "data/docx-raw.json"
"""

from __future__ import annotations

import argparse
import json
import re
import zipfile
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path
import xml.etree.ElementTree as ET

WORD_NS = {"w": "http://schemas.openxmlformats.org/wordprocessingml/2006/main"}


@dataclass
class DocExtract:
    name: str
    path: str
    visibility: str
    paragraph_count: int
    character_count: int
    paragraphs: list[str]


def classify_document(filename: str) -> str:
    lowered = filename.lower()

    internal_markers = [
        "owner_guide",
        "policy_handbook",
        "department_guides",
        "mnss_agreement",
        "mta_mnss_",
    ]
    restricted_markers = ["contractor", "freelancer"]

    if any(marker in lowered for marker in internal_markers):
        return "internal"
    if any(marker in lowered for marker in restricted_markers):
        return "restricted-request"
    return "public"


def extract_docx_paragraphs(path: Path) -> list[str]:
    with zipfile.ZipFile(path) as archive:
        xml_data = archive.read("word/document.xml")

    root = ET.fromstring(xml_data)
    paragraphs: list[str] = []

    for para in root.findall(".//w:p", WORD_NS):
        chunks = [node.text for node in para.findall(".//w:t", WORD_NS) if node.text]
        if not chunks:
            continue

        text = re.sub(r"\s+", " ", "".join(chunks)).strip()
        if text:
            paragraphs.append(text)

    return paragraphs


def build_payload(source_dir: Path) -> dict:
    files = sorted(source_dir.glob("*.docx"))
    extracted: list[DocExtract] = []

    for doc in files:
        paragraphs = extract_docx_paragraphs(doc)
        extracted.append(
            DocExtract(
                name=doc.name,
                path=str(doc.resolve()),
                visibility=classify_document(doc.name),
                paragraph_count=len(paragraphs),
                character_count=sum(len(p) for p in paragraphs),
                paragraphs=paragraphs,
            )
        )

    return {
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "source_dir": str(source_dir.resolve()),
        "documents": [item.__dict__ for item in extracted],
    }


def main() -> None:
    parser = argparse.ArgumentParser(description="Extract DOCX text to JSON")
    parser.add_argument(
        "--source-dir",
        default="/home/vinay-kali/Documents/Mangalam Technical Agency /Policy Handbook",
        help="Directory containing DOCX files",
    )
    parser.add_argument(
        "--output",
        default="scripts/docx-raw.json",
        help="Output JSON file path",
    )

    args = parser.parse_args()
    source_dir = Path(args.source_dir)
    output = Path(args.output)

    if not source_dir.exists() or not source_dir.is_dir():
        raise SystemExit(f"Source directory not found: {source_dir}")

    payload = build_payload(source_dir)
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(json.dumps(payload, ensure_ascii=True, indent=2), encoding="utf-8")

    print(f"Extracted {len(payload['documents'])} documents -> {output}")


if __name__ == "__main__":
    main()
