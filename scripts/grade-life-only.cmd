@echo off
setlocal
set ROOT=C:\Users\MY OWN AXIS\Documents\MAQASID OS - V2.1
set NOTEBOOKLM_HOME=C:\Users\MY OWN AXIS\.notebooklm-alt
set MILOS_MS_ID=be921648-2088-4860-bdd8-283a5e7301f3
set AMANAH_PACE_MS=3000

:loop
echo [%date% %time%] running life grader >> "%ROOT%\artifacts\amanah-grading\life-restart.log"
node "%ROOT%\scripts\grade-amanah-tiers.mjs" life >> "%ROOT%\artifacts\amanah-grading\life.log" 2>&1
echo [%date% %time%] life grader exited — checking if done >> "%ROOT%\artifacts\amanah-grading\life-restart.log"

REM Count rows — if < 236, restart
for /f %%i in ('node -e "const fs=require('fs'); try { const n=fs.readFileSync('%ROOT%\\artifacts\\amanah-grading\\life.jsonl','utf-8').trim().split('\n').filter(Boolean).length; console.log(n); } catch(e){ console.log(0); }"') do set ROWS=%%i
echo [%date% %time%] rows=%ROWS% >> "%ROOT%\artifacts\amanah-grading\life-restart.log"
if %ROWS% LSS 236 goto loop

echo [%date% %time%] life done (%ROWS% rows) >> "%ROOT%\artifacts\amanah-grading\life-restart.log"
