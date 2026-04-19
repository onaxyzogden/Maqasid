"""
Batch retrieval driver for MILOS grounding runtime.

For each subtask in the filter set:
  1. Issue a Quran-biased query directly to Muslim Scholar.
  2. Issue a Hadith-biased query directly to Muslim Scholar.
  3. Save both raw JSON outputs + a meta record to artifacts/grounding-pilot/raw/.

Per-subtask budget: 2 MS calls (Claude Scholar removed — its corpus had no
Islamic content, so it contributed only base-LLM recall wrapped in a "sources
don't contain this" disclaimer. Queries are now deterministic templates that
hit Muslim Scholar directly).

Hard stop if MS returns an error 3 subtasks in a row.

Usage: MILOS_MODULE_KEY=faith_shahada_heart python scripts/grounding-retrieve-batch.py
"""
from __future__ import annotations
import json
import os
import re
import subprocess
import sys
import time
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
QUEUE = ROOT / "artifacts/grounding-pilot/faith-queue.json"
SEED = ROOT / "src/data/seed-tasks/faith-seed-tasks.js"
RAW = ROOT / "artifacts/grounding-pilot/raw"
RAW.mkdir(parents=True, exist_ok=True)

MS_ID = os.environ.get("MILOS_MS_ID", "be921648-2088-4860-bdd8-283a5e7301f3")

PY = r"C:\Python314\python.exe"


def safe_id(id_path: str) -> str:
    s = id_path.replace(".", "-").replace("[", "-").replace("]", "-")
    while "--" in s:
        s = s.replace("--", "-")
    return s.strip("-")


MIN_OK_BYTES = 1024  # responses under this are auth/rate-limit error blobs


def _looks_like_error(outfile: Path) -> bool:
    """Treat <1KB files or those with top-level error:true as failures."""
    try:
        if outfile.stat().st_size < MIN_OK_BYTES:
            return True
        d = json.loads(outfile.read_text(encoding="utf-8"))
        if isinstance(d, dict) and d.get("error") is True:
            return True
    except Exception:
        return True
    return False


def run_ask(notebook_id: str, query: str, outfile: Path) -> bool:
    """Invoke notebooklm ask with exponential backoff on rate limits.

    Retries up to 3 times on rate-limit errors with 30s, 90s, 180s delays.
    Always sleeps 5s after a successful call to pace the API.
    Deletes garbage output files so they don't masquerade as successful caches.
    """
    env = os.environ.copy()
    env["PYTHONIOENCODING"] = "utf-8"
    alt_home = os.environ.get("MILOS_NOTEBOOKLM_HOME")
    if alt_home:
        env["NOTEBOOKLM_HOME"] = alt_home

    delays = [30, 90, 180]  # backoff for up to 3 retries
    for attempt in range(len(delays) + 1):
        try:
            with open(outfile, "wb") as f:
                proc = subprocess.run(
                    [PY, "-m", "notebooklm", "ask", "--notebook", notebook_id, "--json", query],
                    stdout=f,
                    stderr=subprocess.STDOUT,
                    env=env,
                    timeout=300,
                )
            success = proc.returncode == 0 and not _looks_like_error(outfile)
            if success:
                time.sleep(5)  # pacing between calls
                return True
            # Delete the garbage so skip-if-exists doesn't trip next run
            try:
                outfile.unlink()
            except Exception:
                pass
            if attempt < len(delays):
                delay = delays[attempt]
                print(f"  retry {attempt + 1}/{len(delays)} in {delay}s (rate-limited/error)", file=sys.stderr)
                time.sleep(delay)
            else:
                return False
        except Exception as e:
            print(f"  ERROR running ask: {e}", file=sys.stderr)
            try:
                outfile.unlink()
            except Exception:
                pass
            if attempt < len(delays):
                time.sleep(delays[attempt])
            else:
                return False
    return False


def build_queries(task_title: str, sub_title: str) -> list[str]:
    """Two Muslim-Scholar queries (Quran-biased, Hadith-biased) from the subtask.

    Deterministic templates — no LLM middleman. MS's own corpus is the
    authoritative source; phrasing asks for primary refs + Arabic + translation
    (Quran) and canonical collection/book/number + matn + grade (Hadith).
    """
    ctx = f"MILOS subtask '{sub_title}' under parent task '{task_title}'."
    q1 = (
        f"{ctx} Retrieve primary Quranic verses that directly or contextually establish "
        f"this subtask. For each verse: include the exact reference (Surah:Ayah), the "
        f"Arabic text verbatim, and an accurate English translation. Prefer direct "
        f"anchors; include contextual anchors only if no direct verse applies. "
        f"Do not paraphrase — quote from the sources."
    )
    q2 = (
        f"{ctx} Retrieve Sahih hadith that directly or contextually establish this "
        f"subtask. Prefer Sahih al-Bukhari and Sahih Muslim. For each hadith: include "
        f"the canonical reference (collection + book + number, e.g. 'Sahih al-Bukhari "
        f"Book X Hadith Y' or 'Sahih Muslim Book X Hadith Y'), the full matn in Arabic "
        f"if available, an accurate English translation, and the grade. Do not quote "
        f"matn without a canonical reference. Do not paraphrase."
    )
    return [q1, q2]


def main():
    queue = json.loads(QUEUE.read_text(encoding="utf-8"))
    module_key = os.environ.get("MILOS_MODULE_KEY", "faith_shahada_core")
    subtasks = [s for s in queue["subtasks"] if s["moduleKey"] == module_key]
    if module_key == "faith_shahada_core":
        subtasks = [s for s in subtasks if not (s["taskIndex"] == 0 and s["subtaskIndex"] == 0)]
    print(f"Processing {len(subtasks)} subtasks from module {module_key}.")

    consecutive_failures = 0
    for i, s in enumerate(subtasks, 1):
        sid = safe_id(s["idPath"])
        q1_file = RAW / f"{sid}-ms-q1.json"
        q2_file = RAW / f"{sid}-ms-q2.json"

        # Skip if already done
        if q1_file.exists() and q2_file.exists():
            print(f"[{i}/{len(subtasks)}] SKIP (already retrieved): {s['idPath']}")
            consecutive_failures = 0
            continue

        print(f"[{i}/{len(subtasks)}] {s['idPath']} :: {s['subtaskTitle'][:70]}")
        task_title = s["taskTitle"]
        sub_title = s["subtaskTitle"]

        queries = build_queries(task_title, sub_title)

        if not q1_file.exists():
            ok = run_ask(MS_ID, queries[0], q1_file)
            if not ok:
                print("  MS Q1 failed.", file=sys.stderr)
                consecutive_failures += 1
                if consecutive_failures >= 3:
                    sys.exit(1)
                continue
        if not q2_file.exists():
            ok = run_ask(MS_ID, queries[1], q2_file)
            if not ok:
                print("  MS Q2 failed.", file=sys.stderr)
                consecutive_failures += 1
                if consecutive_failures >= 3:
                    sys.exit(1)
                continue

        # record queries alongside
        meta_file = RAW / f"{sid}-meta.json"
        meta_file.write_text(
            json.dumps(
                {
                    "idPath": s["idPath"],
                    "taskTitle": task_title,
                    "subtaskTitle": sub_title,
                    "queries": queries,
                    "retrievedAt": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
                },
                ensure_ascii=False,
                indent=2,
            ),
            encoding="utf-8",
        )
        consecutive_failures = 0
        print("  OK.")

    print("DONE.")


if __name__ == "__main__":
    main()
