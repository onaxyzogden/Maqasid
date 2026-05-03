param([Parameter(Mandatory=$true)][string]$Ref, [Parameter(Mandatory=$true)][string]$Slug, [string]$Kind="hadith")
$env:PYTHONIOENCODING="utf-8"
$nb = "be921648-2088-4860-bdd8-283a5e7301f3"
if ($Kind -eq "quran") {
  $q = "For the citation '$Ref', return JSON with keys ref_ok (bool), arabic (string), translation (string), relevance (one of: direct, contextual, thematic). Wrap the JSON in a fenced code block."
} else {
  $q = "For the citation '$Ref', return JSON with keys ref_ok (bool), correct_ref (string if differs from given), summary (one sentence), relevance (one of: direct, contextual, thematic, unrelated). Wrap the JSON in a fenced code block."
}
py -m notebooklm ask $q --notebook $nb --json | Out-File -Encoding utf8 "tasks/L-$Slug.json"
