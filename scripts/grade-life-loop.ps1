$ROOT = "C:\Users\MY OWN AXIS\Documents\MAQASID OS - V2.1"
$env:NOTEBOOKLM_HOME = "C:\Users\MY OWN AXIS\.notebooklm-alt"
$env:MILOS_MS_ID = "be921648-2088-4860-bdd8-283a5e7301f3"
$env:AMANAH_PACE_MS = "3000"
$LOG = "$ROOT\artifacts\amanah-grading\life.log"
$RESTART_LOG = "$ROOT\artifacts\amanah-grading\life-ps-restart.log"
$JSONL = "$ROOT\artifacts\amanah-grading\life.jsonl"

function Get-RowCount {
    if (-not (Test-Path $JSONL)) { return 0 }
    (Get-Content $JSONL | Where-Object { $_.Trim() -ne "" }).Count
}

Add-Content $RESTART_LOG "[$([datetime]::Now)] PS grader loop starting"

while ((Get-RowCount) -lt 236) {
    $rows = Get-RowCount
    Add-Content $RESTART_LOG "[$([datetime]::Now)] launching node — $rows rows done"
    $proc = Start-Process -FilePath "node" `
        -ArgumentList "`"$ROOT\scripts\grade-amanah-tiers.mjs`" life" `
        -WorkingDirectory $ROOT `
        -RedirectStandardError $LOG `
        -NoNewWindow -PassThru -Wait
    $exit = $proc.ExitCode
    $rows2 = Get-RowCount
    Add-Content $RESTART_LOG "[$([datetime]::Now)] node exited ($exit) — $rows2 rows"
    if ($rows2 -ge 236) { break }
    Start-Sleep -Seconds 3
}

Add-Content $RESTART_LOG "[$([datetime]::Now)] life DONE ($(Get-RowCount) rows)"
