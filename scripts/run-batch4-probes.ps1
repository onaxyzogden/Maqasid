# Drives all batch-4 NotebookLM probes in parallel via background jobs.
# PowerShell 5.1 compatible — uses Start-Job with throttle.

$probes = @(
  @{Slug="i-b5027"; Ref="Sahih al-Bukhari 5027"; Kind="hadith"},
  @{Slug="i-b71";   Ref="Sahih al-Bukhari 71";   Kind="hadith"},
  @{Slug="i-q17-36";Ref="Quran 17:36";           Kind="quran"},
  @{Slug="i-m1017"; Ref="Sahih Muslim 1017";     Kind="hadith"},
  @{Slug="i-q49-6"; Ref="Quran 49:6";            Kind="quran"},
  @{Slug="i-q2-111";Ref="Quran 2:111";           Kind="quran"},
  @{Slug="i-b6018"; Ref="Sahih al-Bukhari 6018"; Kind="hadith"},
  @{Slug="i-q16-125";Ref="Quran 16:125";         Kind="quran"},
  @{Slug="i-b6496"; Ref="Sahih al-Bukhari 6496"; Kind="hadith"},
  @{Slug="i-q23-3"; Ref="Quran 23:3";            Kind="quran"},
  @{Slug="f-b893";  Ref="Sahih al-Bukhari 893";  Kind="hadith"},
  @{Slug="f-q66-6"; Ref="Quran 66:6";            Kind="quran"},
  @{Slug="f-b5984"; Ref="Sahih al-Bukhari 5984"; Kind="hadith"},
  @{Slug="f-q30-21";Ref="Quran 30:21";           Kind="quran"},
  @{Slug="f-q25-74";Ref="Quran 25:74";           Kind="quran"},
  @{Slug="f-m223";  Ref="Sahih Muslim 223";      Kind="hadith"},
  @{Slug="f-m2107"; Ref="Sahih Muslim 2107";     Kind="hadith"},
  @{Slug="f-m780";  Ref="Sahih Muslim 780";      Kind="hadith"},
  @{Slug="f-b6019"; Ref="Sahih al-Bukhari 6019"; Kind="hadith"},
  @{Slug="f-q4-1";  Ref="Quran 4:1";             Kind="quran"},
  @{Slug="f-d4207"; Ref="Sunan Abi Dawud 4207";  Kind="hadith"},
  @{Slug="f-q17-23";Ref="Quran 17:23";           Kind="quran"},
  @{Slug="f-b5186"; Ref="Sahih al-Bukhari 5186"; Kind="hadith"},
  @{Slug="w-q2-282";Ref="Quran 2:282";           Kind="quran"},
  @{Slug="w-q2-275";Ref="Quran 2:275";           Kind="quran"},
  @{Slug="w-q64-16";Ref="Quran 64:16";           Kind="quran"},
  @{Slug="w-q25-67";Ref="Quran 25:67";           Kind="quran"},
  @{Slug="w-q2-261";Ref="Quran 2:261";           Kind="quran"},
  @{Slug="w-q4-11"; Ref="Quran 4:11-12";         Kind="quran"},
  @{Slug="w-q4-29"; Ref="Quran 4:29";            Kind="quran"},
  @{Slug="w-q9-60"; Ref="Quran 9:60";            Kind="quran"},
  @{Slug="w-b1496"; Ref="Sahih al-Bukhari 1496"; Kind="hadith"},
  @{Slug="w-m2588"; Ref="Sahih Muslim 2588";     Kind="hadith"},
  @{Slug="w-q3-92"; Ref="Quran 3:92";            Kind="quran"},
  @{Slug="w-b2140"; Ref="Sahih al-Bukhari 2140"; Kind="hadith"},
  @{Slug="e-q7-31"; Ref="Quran 7:31";            Kind="quran"},
  @{Slug="e-q17-27";Ref="Quran 17:27";           Kind="quran"},
  @{Slug="e-d29";   Ref="Sunan Abi Dawud 29";    Kind="hadith"},
  @{Slug="e-m1955"; Ref="Sahih Muslim 1955";     Kind="hadith"},
  @{Slug="e-b6416"; Ref="Sahih al-Bukhari 6416"; Kind="hadith"},
  @{Slug="e-q2-195";Ref="Quran 2:195";           Kind="quran"},
  @{Slug="e-m49";   Ref="Sahih Muslim 49";       Kind="hadith"},
  @{Slug="e-q6-38"; Ref="Quran 6:38";            Kind="quran"},
  @{Slug="e-b2320"; Ref="Sahih al-Bukhari 2320"; Kind="hadith"},
  @{Slug="e-q7-26"; Ref="Quran 7:26";            Kind="quran"}
)

$throttle = 6
$jobs = @()
$queue = [System.Collections.Queue]::new()
foreach ($p in $probes) { $queue.Enqueue($p) }
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
    Write-Host "queued: $($p.Slug) (running=$($jobs.Count) pending=$($queue.Count))"
  }
  Start-Sleep -Seconds 3
  $finished = $jobs | Where-Object { $_.State -ne 'Running' }
  foreach ($f in $finished) {
    Write-Host "done: $($f.ProbeSlug) [$($f.State)]"
    Remove-Job -Job $f -Force
  }
  $jobs = @($jobs | Where-Object { $_.State -eq 'Running' })
}
Write-Host "ALL PROBES COMPLETE"
