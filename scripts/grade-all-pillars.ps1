$ROOT = "C:\Users\MY OWN AXIS\Documents\MAQASID OS - V2.1"
$env:NOTEBOOKLM_HOME = "C:\Users\MY OWN AXIS\.notebooklm-alt"
$env:MILOS_MS_ID = "be921648-2088-4860-bdd8-283a5e7301f3"
$env:AMANAH_PACE_MS = "3000"
$RLOG = "$ROOT\artifacts\amanah-grading\run2.log"

$TARGETS = @{ life=236; family=233; intellect=236; wealth=236; environment=226; ummah=450 }
$PILLARS = @("life","family","intellect","wealth","environment","ummah")

function Get-Rows($pillar) {
    $f = "$ROOT\artifacts\amanah-grading\${pillar}.jsonl"
    if (-not (Test-Path $f)) { return 0 }
    (Get-Content $f -Encoding UTF8 | Where-Object { $_.Trim() -ne "" }).Count
}

Add-Content $RLOG "[$([datetime]::Now)] Grade-all-pillars PS starting"

foreach ($pillar in $PILLARS) {
    $target = $TARGETS[$pillar]
    Add-Content $RLOG "[$([datetime]::Now)] starting $pillar (target $target)"

    while ((Get-Rows $pillar) -lt $target) {
        $rows = Get-Rows $pillar
        Add-Content $RLOG "[$([datetime]::Now)] ${pillar}: $rows of $target — launching node"
        $plog = "$ROOT\artifacts\amanah-grading\${pillar}.log"
        $proc = Start-Process -FilePath "node" `
            -ArgumentList "`"$ROOT\scripts\grade-amanah-tiers.mjs`" $pillar" `
            -WorkingDirectory $ROOT `
            -RedirectStandardError $plog `
            -NoNewWindow -PassThru -Wait
        $rows2 = Get-Rows $pillar
        Add-Content $RLOG "[$([datetime]::Now)] ${pillar}: node exited ($($proc.ExitCode)) — $rows2 rows"
        if ($rows2 -ge $target) { break }
        Start-Sleep -Seconds 5
    }

    Add-Content $RLOG "[$([datetime]::Now)] done $pillar ($(Get-Rows $pillar) rows)"
}

Add-Content $RLOG "[$([datetime]::Now)] ALL DONE"
