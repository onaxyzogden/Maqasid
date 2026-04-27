@echo off
setlocal
set ROOT=C:\Users\MY OWN AXIS\Documents\MAQASID OS - V2.1
set NOTEBOOKLM_HOME=C:\Users\MY OWN AXIS\.notebooklm-alt
set MILOS_MS_ID=be921648-2088-4860-bdd8-283a5e7301f3
set AMANAH_PACE_MS=3000
set LOG=%ROOT%\artifacts\amanah-grading\run2.log

echo [%date% %time%] Starting grader round 2 >> "%LOG%"

for %%P in (health family intellect wealth environment ummah) do (
  echo [%date% %time%] starting %%P >> "%LOG%"
  :retry_%%P
  node "%ROOT%\scripts\grade-amanah-tiers.mjs" %%P >> "%ROOT%\artifacts\amanah-grading\%%P.log" 2>&1
  for /f %%i in ('node -e "try{const l=require('fs').readFileSync('%ROOT%\\artifacts\\amanah-grading\\%%P.jsonl','utf-8').trim().split('\n').filter(Boolean).length;process.stdout.write(String(l));}catch(e){process.stdout.write('0');}"') do set ROWS=%%i
  echo [%date% %time%] %%P rows=!ROWS! >> "%LOG%"
  if !ROWS! LSS 236 if "%%P"=="health" goto retry_%%P
  if !ROWS! LSS 233 if "%%P"=="family" goto retry_%%P
  if !ROWS! LSS 236 if "%%P"=="intellect" goto retry_%%P
  if !ROWS! LSS 236 if "%%P"=="wealth" goto retry_%%P
  if !ROWS! LSS 226 if "%%P"=="environment" goto retry_%%P
  if !ROWS! LSS 450 if "%%P"=="ummah" goto retry_%%P
  echo [%date% %time%] done %%P >> "%LOG%"
)

echo [%date% %time%] ALL DONE >> "%LOG%"
