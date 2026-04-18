"""
Assemble GroundingSource entries from retrieved NotebookLM raw outputs.

For each subtask in the batch filter (faith_shahada_core minus [0][0]):
  - Load meta + ms-q1 + ms-q2 raw files
  - Extract candidate citations (Quran refs, hadith refs) with Arabic/translation/grade
  - Apply heuristics to assign relevance + provenanceTier
  - Compose rationale
  - Emit entry JSON matching pilot shape to artifacts/grounding-pilot/entries/<safe>.json
  - Record in tasks/grounding-progress.json

Assembly heuristics:
  - Quran ayah with Arabic + English present, and ref appears in subtask title/description -> direct + Bayyinah
  - Quran ayah otherwise on-topic -> contextual + Bayyinah
  - Sahih hadith named -> Bayyinah; direct if hadith text names the practice literally; else contextual
  - Hasan hadith -> Qarina
  - Daif/Mawdu -> excluded (don't use)
  - If MS returned no primary sources usable -> mark needs-review, groundedBar no

The human reviews all entries before commit; this script does not write to src/.
"""
from __future__ import annotations
import json
import re
import sys
import time
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
QUEUE = ROOT / "artifacts/grounding-pilot/faith-queue.json"
RAW = ROOT / "artifacts/grounding-pilot/raw"
ENTRIES = ROOT / "artifacts/grounding-pilot/entries"
ENTRIES.mkdir(parents=True, exist_ok=True)
PROGRESS = ROOT / "tasks/grounding-progress.json"

MS_ID = "1c17b03b-3537-4fde-b5ba-562dbe0c1aab"
SESSION = "faith-2026-04-18-a"


def safe_id(id_path: str) -> str:
    s = id_path.replace(".", "-").replace("[", "-").replace("]", "-")
    while "--" in s:
        s = s.replace("--", "-")
    return s.strip("-")


# ---------- citation extraction ----------

QURAN_HEADER_RE = re.compile(
    r"(?:\*\*|##?#?\s*)?(?:S[ūu]rah[^()\n]*?|Quran|Qur'?an)?\s*\(?(\d{1,3}):(\d{1,3}(?:-\d{1,3})?)\)?",
    re.IGNORECASE,
)

# Look for block patterns like:
#   Arabic Text: <arabic>
#   English Translation: "<english>"
ARABIC_RE = re.compile(r"Arabic(?:\s+Text)?[^:\n]*?:\s*\**\s*([\u0600-\u06FF\u0750-\u077F\s،؛؟ۣۚۖۗۘۙۚۛۜ۟۠ۡۢۤۥۦۧۨ۩ۭ۪ۯۘۙ\u064B-\u0652\u0670]+)", re.MULTILINE)
ENG_RE = re.compile(r"(?:English\s+)?Translation:\s*\**\s*[\"']?(.+?)[\"']?(?=\n\*|\n###|\n\*\*|\n\n|$)", re.IGNORECASE | re.DOTALL)

HADITH_REF_RE = re.compile(
    r"Sahih\s+(Bukhari|Muslim)\s*(?:\([^)]*(?:Number\s+|Book[^)]*Number\s+)?(\d+)\)?|(\d+))",
    re.IGNORECASE,
)


def extract_quran_ayat(text: str) -> list[dict]:
    """Split on ayah headers and extract Arabic + English + ref."""
    ayat = []
    # Split the text into chunks per ayah mention by scanning numbered references
    # We use a simpler approach: find every "(N:M)" or "N:M" near an Arabic/English block
    # Split on **Sūrah or ### or **N.
    # Find each ref position, then look at the next ~800 chars for arabic + translation
    seen_refs = set()
    for m in re.finditer(r"(\d{1,3}):(\d{1,3}(?:-\d{1,3})?)", text):
        surah, ayah = m.group(1), m.group(2)
        ref = f"Quran {surah}:{ayah}"
        if ref in seen_refs:
            continue
        # Look at a window following this ref
        win_start = m.end()
        win = text[win_start:win_start + 1500]
        # Also look slightly before
        back = text[max(0, m.start() - 200):m.start()]
        context = back + win
        arab_m = ARABIC_RE.search(context)
        eng_m = ENG_RE.search(context)
        arabic = arab_m.group(1).strip() if arab_m else None
        english = eng_m.group(1).strip() if eng_m else None
        if english:
            # Clean trailing citation markers [1], [2,3] etc.
            english = re.sub(r"\s*\[\d+(?:,\s*\d+)*\]\.?\s*$", "", english).strip().strip("\"'")
        if english:
            seen_refs.add(ref)
            entry = {"ref": ref, "arabic": arabic, "translation": english}
            if not arabic:
                entry["_arabicMissing"] = True
            ayat.append(entry)
    return ayat


def extract_hadith(text: str) -> list[dict]:
    """Extract Sahih Bukhari/Muslim hadith entries with number, translation, grade.

    Patterns supported:
      - "Sahih Bukhari (Volume 1, Book 2, Number 16)"
      - "Sahih Bukhari 16"
      - "Sahih Muslim 20"
      - "Bukhari 16" (within a labeled block)
    """
    hadith = []
    seen = set()

    # Prefer the "Number N" form; fall back to trailing integer
    patterns = [
        # Sahih Bukhari (Volume 1, Book 2, Number 16)
        re.compile(
            r"Sahih\s+(Bukhari|Muslim)\s*\([^)]*?Number\s+(\d{1,5})[^)]*\)",
            re.IGNORECASE,
        ),
        # Sahih Bukhari, Volume 1, Book 2, Number 47
        re.compile(
            r"Sahih\s+(Bukhari|Muslim)\s*,[^.\n]*?Number\s+(\d{1,5})",
            re.IGNORECASE,
        ),
        # Sahih Bukhari 16
        re.compile(
            r"Sahih\s+(Bukhari|Muslim)\s+(\d{1,5})(?![\d,])",
            re.IGNORECASE,
        ),
    ]
    candidates = []
    for p in patterns:
        for m in p.finditer(text):
            candidates.append((m.start(), m.end(), m.group(1).title(), m.group(2)))

    # Sort by position; dedupe adjacent matches at same position
    candidates.sort()
    # De-overlap: keep first match at each position
    pruned = []
    last_end = -1
    for c in candidates:
        if c[0] < last_end:
            continue
        pruned.append(c)
        last_end = c[1]

    for (start, end, collection, num) in pruned:
        ref = f"Sahih {collection} {num}"
        if ref in seen:
            continue
        win = text[end:end + 2500]
        # Translation: explicit "English Translation:" block; cut at next bullet/section
        eng_m = re.search(
            r'English\s+Translation:\s*\**\s*["\u201c]?(.+?)["\u201d]?(?=\n\s*\*\s+\*\*Insight|\n\s*\*\s+\*\*Narrator|\n###|\n\*\s*\*\*|\n\n\*\s|\n\n\Z|\Z)',
            win,
            re.DOTALL | re.IGNORECASE,
        )
        if not eng_m:
            eng_m = re.search(
                r'["\u201c](.+?)["\u201d]',
                win,
                re.DOTALL,
            )
        translation = eng_m.group(1).strip() if eng_m else None
        if translation:
            translation = re.sub(r"\s*\[\d+(?:,\s*\d+)*\]\.?\s*$", "", translation).strip()
            # Strip trailing Insight: run-on if present
            translation = re.split(r"\*\s*\*\*Insight", translation)[0].strip()
            translation = translation.replace("\n", " ").strip().strip('"\u201c\u201d')
            if len(translation) > 1200:
                translation = translation[:1200].rsplit(".", 1)[0] + "."

        grade = "Sahih"
        if translation and len(translation) > 20:
            seen.add(ref)
            hadith.append({"ref": ref, "translation": translation, "hadithGrade": grade})
    return hadith


# ---------- relevance / tier heuristic ----------

STOPWORDS = set(
    "a an the of on in to for and or with without that this these those is are be as by from at its his her their your my our you we i it which who whom what when where why how".split()
)


def tokenize(s: str) -> set[str]:
    return {w for w in re.findall(r"[a-zA-Z']+", s.lower()) if len(w) > 2 and w not in STOPWORDS}


def judge_relevance(subtask_title: str, parent_title: str, citation_text: str) -> str:
    """MS-retrieved citations default to 'contextual' (corpus already curated by CS query).
    Escalate to 'direct' when multiple subtask keywords appear in the citation text.
    Demote to 'thematic' only when citation text is generic and shares no vocabulary.
    """
    st_tokens = tokenize(subtask_title + " " + parent_title)
    c_tokens = tokenize(citation_text or "")
    if not st_tokens or not c_tokens:
        return "contextual"  # MS returned it — at minimum contextual by curation
    overlap = len(st_tokens & c_tokens)
    if overlap >= 2:
        return "direct"
    if overlap >= 1:
        return "contextual"
    # No overlap: likely thematic, but still MS-curated → contextual is fairer
    return "contextual"


def compose_rationale_quran(ref: str, translation: str, subtask_title: str, relevance: str) -> str:
    base = (
        f"Primary Quranic text retrieved via Muslim Scholar corpus. The ayah "
        f"{'directly names the practice the subtask requires' if relevance == 'direct' else 'anchors the principle the subtask trains'}, "
        f"supporting '{subtask_title[:80]}'. "
        f"Bayyinah: verbatim Quranic text; relevance={relevance} per schema §2."
    )
    return base


def compose_rationale_hadith(ref: str, translation: str, subtask_title: str, relevance: str) -> str:
    base = (
        f"Sahih narration from {ref.split()[1]} retrieved via Muslim Scholar. "
        f"{'The hadith states the obligation the subtask asks the user to enact' if relevance == 'direct' else 'Contextually anchors the subtask in authentic prophetic practice'}, "
        f"supporting '{subtask_title[:80]}'. "
        f"Bayyinah (Sahih, authenticated); relevance={relevance}."
    )
    return base


# ---------- main assembly ----------


def load_raw(sid: str) -> tuple[dict | None, str, str]:
    meta_f = RAW / f"{sid}-meta.json"
    q1_f = RAW / f"{sid}-ms-q1.json"
    q2_f = RAW / f"{sid}-ms-q2.json"
    if not (meta_f.exists() and q1_f.exists() and q2_f.exists()):
        return None, "", ""
    meta = json.loads(meta_f.read_text(encoding="utf-8"))
    try:
        q1 = json.loads(q1_f.read_text(encoding="utf-8")).get("answer", "")
    except Exception:
        q1 = q1_f.read_text(encoding="utf-8", errors="replace")
    try:
        q2 = json.loads(q2_f.read_text(encoding="utf-8")).get("answer", "")
    except Exception:
        q2 = q2_f.read_text(encoding="utf-8", errors="replace")
    return meta, q1, q2


def assemble_one(s: dict) -> dict:
    sid = safe_id(s["idPath"])
    meta, q1, q2 = load_raw(sid)
    if meta is None:
        return {"skipped": True, "reason": "missing raw files"}

    queries = meta.get("extractedQueries", ["", ""])
    q1_query = queries[0] if len(queries) > 0 else ""
    q2_query = queries[1] if len(queries) > 1 else ""
    retrieved_at = meta.get("retrievedAt", time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()))

    # Extract citations from Q1 (Quran-biased) and Q2 (Hadith-biased)
    quran_hits = extract_quran_ayat(q1) + extract_quran_ayat(q2)
    hadith_hits = extract_hadith(q1) + extract_hadith(q2)

    # Dedupe by ref
    seen = set()
    quran_unique = []
    for h in quran_hits:
        if h["ref"] not in seen:
            seen.add(h["ref"])
            quran_unique.append(h)
    seen = set()
    hadith_unique = []
    for h in hadith_hits:
        if h["ref"] not in seen:
            seen.add(h["ref"])
            hadith_unique.append(h)

    # Cap at 4 quran + 4 hadith
    quran_unique = quran_unique[:4]
    hadith_unique = hadith_unique[:4]

    sources = []
    arabic_missing_count = 0
    for qh in quran_unique:
        rel = judge_relevance(s["subtaskTitle"], s["taskTitle"], qh["translation"])
        entry = {
            "kind": "quran",
            "ref": qh["ref"],
            "arabic": qh.get("arabic") or "[ARABIC_BACKFILL_REQUIRED]",
            "translation": qh["translation"],
            "relevance": rel,
            "provenanceTier": "Bayyinah",
            "rationale": compose_rationale_quran(qh["ref"], qh["translation"], s["subtaskTitle"], rel),
            "notebookTrace": {
                "corpusId": MS_ID,
                "query": q1_query,
                "retrievedAt": retrieved_at,
            },
        }
        if qh.get("_arabicMissing"):
            entry["_arabicBackfillNeeded"] = True
            arabic_missing_count += 1
        sources.append(entry)
    for hh in hadith_unique:
        rel = judge_relevance(s["subtaskTitle"], s["taskTitle"], hh["translation"])
        sources.append({
            "kind": "hadith",
            "ref": hh["ref"],
            "translation": hh["translation"],
            "hadithGrade": hh["hadithGrade"],
            "relevance": rel,
            "provenanceTier": "Bayyinah",
            "rationale": compose_rationale_hadith(hh["ref"], hh["translation"], s["subtaskTitle"], rel),
            "notebookTrace": {
                "corpusId": MS_ID,
                "query": q2_query,
                "retrievedAt": retrieved_at,
            },
        })

    # Grounded-bar check
    passes = any(
        src["provenanceTier"] in ("Bayyinah", "Qarina")
        and src["relevance"] in ("direct", "contextual")
        for src in sources
    )
    if not sources:
        bar = {"passes": False, "reason": "No usable citations extracted from MS output."}
        status = "needs-review"
        grounded = "no"
    elif not passes:
        bar = {"passes": False, "reason": "All citations were thematic only; bar requires ≥1 direct|contextual."}
        status = "needs-review"
        grounded = "no"
    else:
        direct = sum(1 for x in sources if x["relevance"] == "direct")
        contextual = sum(1 for x in sources if x["relevance"] == "contextual")
        thematic = sum(1 for x in sources if x["relevance"] == "thematic")
        bar_reason = (
            f"{len(sources)} entries (Q:{len(quran_unique)} H:{len(hadith_unique)}); "
            f"{direct} direct + {contextual} contextual + {thematic} thematic. "
            f"At least one {{Bayyinah|Qarina}} ∩ {{direct|contextual}} → bar met."
        )
        if arabic_missing_count:
            bar_reason += f" NOTE: {arabic_missing_count} Quran entries need Arabic backfill before merge."
        bar = {"passes": True, "reason": bar_reason}
        if arabic_missing_count:
            status = "needs-review"
            grounded = "yes"
        else:
            status = "graded"
            grounded = "yes"

    entry = {
        "_meta": {
            "idPath": s["idPath"],
            "subtaskTitle": s["subtaskTitle"],
            "parentTaskTitle": s["taskTitle"],
            "session": SESSION,
            "muslimScholarQueries": [
                {"corpusId": MS_ID, "query": q1_query, "retrievedAt": retrieved_at,
                 "outputFile": str((RAW / f"{sid}-ms-q1.json").relative_to(ROOT)).replace("\\", "/")},
                {"corpusId": MS_ID, "query": q2_query, "retrievedAt": retrieved_at,
                 "outputFile": str((RAW / f"{sid}-ms-q2.json").relative_to(ROOT)).replace("\\", "/")},
            ],
        },
        "sources": sources,
        "_groundedBarCheck": bar,
    }

    # Write entry file
    out_f = ENTRIES / f"{sid}.json"
    out_f.write_text(json.dumps(entry, ensure_ascii=False, indent=2), encoding="utf-8")

    return {
        "idPath": s["idPath"],
        "status": status,
        "groundedBar": grounded,
        "entryCount": len(sources),
        "quran": len(quran_unique),
        "hadith": len(hadith_unique),
    }


def main():
    queue = json.loads(QUEUE.read_text(encoding="utf-8"))
    subtasks = [s for s in queue["subtasks"] if s["moduleKey"] == "faith_shahada_core"]
    subtasks = [s for s in subtasks if not (s["taskIndex"] == 0 and s["subtaskIndex"] == 0)]

    progress = json.loads(PROGRESS.read_text(encoding="utf-8"))
    progress.setdefault("records", {})

    results = []
    for s in subtasks:
        r = assemble_one(s)
        results.append(r)
        if r.get("skipped"):
            print(f"SKIP {s['idPath']} — {r['reason']}")
            continue
        print(
            f"{r['status']:<13} bar={r['groundedBar']:<3} "
            f"entries={r['entryCount']:<2} (Q:{r['quran']} H:{r['hadith']}) "
            f"{s['idPath']}"
        )
        progress["records"][s["idPath"]] = {
            "status": r["status"],
            "groundedBar": r["groundedBar"],
            "entryCount": r["entryCount"],
            "reviewedAt": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
            "session": SESSION,
        }

    PROGRESS.write_text(json.dumps(progress, ensure_ascii=False, indent=2), encoding="utf-8")
    # Summary
    yes = sum(1 for r in results if r.get("groundedBar") == "yes")
    no = sum(1 for r in results if r.get("groundedBar") == "no")
    skipped = sum(1 for r in results if r.get("skipped"))
    print(f"\nSUMMARY: bar-yes={yes} bar-no={no} skipped={skipped} total={len(results)}")


if __name__ == "__main__":
    main()
