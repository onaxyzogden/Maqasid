# Retry batch4 probes that timed out / returned empty / had parse failures.
$retries = @(
  @{Slug="e-b2320"; Ref="Sahih al-Bukhari 2320"; Kind="hadith"},
  @{Slug="e-m1955"; Ref="Sahih Muslim 1955";     Kind="hadith"},
  @{Slug="e-q7-26"; Ref="Quran 7:26";            Kind="quran"},
  @{Slug="f-b5984"; Ref="Sahih al-Bukhari 5984"; Kind="hadith"},
  @{Slug="f-q25-74";Ref="Quran 25:74";           Kind="quran"},
  @{Slug="f-q4-1";  Ref="Quran 4:1";             Kind="quran"},
  @{Slug="i-b6018"; Ref="Sahih al-Bukhari 6018"; Kind="hadith"},
  @{Slug="i-q23-3"; Ref="Quran 23:3";            Kind="quran"},
  @{Slug="w-b1496"; Ref="Sahih al-Bukhari 1496"; Kind="hadith"},
  @{Slug="w-q2-282";Ref="Quran 2:282";           Kind="quran"},
  @{Slug="w-q3-92"; Ref="Quran 3:92";            Kind="quran"},
  @{Slug="w-q64-16";Ref="Quran 64:16";           Kind="quran"},
  @{Slug="w-q9-60"; Ref="Quran 9:60";            Kind="quran"}
)
$throttle = 5
$jobs = @()
$queue = [System.Collections.Queue]::new()
foreach ($p in $retries) { $queue.Enqueue($p) }
$tasksDir = (Resolve-Path ".\tasks").Path

while ($queue.Count -gt 0 -or $jobs.Count -gt 0) {
  while ($jobs.Count -lt $throttle -and $queue.Count -gt 0) {
    $p = $queue.Dequeue()
    $j = Start-Job -ScriptBlock {
      param($Slug, $Ref, $Kind, $TasksDir)
      $env:PYTHONIOENCODING="utf-8"
      $nb = "be921648-2088-4860-bdd8-283a5e7301f3"
      if ($Kind -eq "quran") {
        $q = "For the citation '$Ref', return JSON with keys ref_ok (bool), arabic (string), translation (string), relevance (one of: direct, contextual, thematic). Wrap the JSON in a fenced code block."
      } else {
        $q = "For the citation '$Ref', return JSON with keys ref_ok (bool), correct_ref (string if differs from given), summary (one sentence), relevance (one of: direct, contextual, thematic, unrelated). Wrap the JSON in a fenced code block."
      }
      py -m notebooklm ask $q --notebook $nb --json | Out-File -Encoding utf8 (Join-Path $TasksDir "B4-$Slug.json")
    } -ArgumentList $p.Slug, $p.Ref, $p.Kind, $tasksDir
    $j | Add-Member -NotePropertyName ProbeSlug -NotePropertyValue $p.Slug -Force
    $jobs += $j
    Write-Host "queued: $($p.Slug)"
  }
  Start-Sleep -Seconds 3
  $finished = $jobs | Where-Object { $_.State -ne 'Running' }
  foreach ($f in $finished) {
    Write-Host "done: $($f.ProbeSlug) [$($f.State)]"
    Remove-Job -Job $f -Force
  }
  $jobs = @($jobs | Where-Object { $_.State -eq 'Running' })
}
Write-Host "RETRY COMPLETE"
