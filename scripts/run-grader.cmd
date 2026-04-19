@echo off
set NOTEBOOKLM_HOME=C:\Users\MY OWN AXIS\.notebooklm-alt
set MILOS_MS_ID=be921648-2088-4860-bdd8-283a5e7301f3
set AMANAH_PACE_MS=3000
cd /d "C:\Users\MY OWN AXIS\Documents\MAQASID OS - V2.1"
echo [run-grader] starting life >> artifacts/amanah-grading/run.log 2>&1
node scripts/grade-amanah-tiers.mjs life >> artifacts/amanah-grading/life.log 2>&1
echo [run-grader] done life >> artifacts/amanah-grading/run.log 2>&1
echo [run-grader] starting family >> artifacts/amanah-grading/run.log 2>&1
node scripts/grade-amanah-tiers.mjs family >> artifacts/amanah-grading/family.log 2>&1
echo [run-grader] done family >> artifacts/amanah-grading/run.log 2>&1
echo [run-grader] starting intellect >> artifacts/amanah-grading/run.log 2>&1
node scripts/grade-amanah-tiers.mjs intellect >> artifacts/amanah-grading/intellect.log 2>&1
echo [run-grader] done intellect >> artifacts/amanah-grading/run.log 2>&1
echo [run-grader] starting wealth >> artifacts/amanah-grading/run.log 2>&1
node scripts/grade-amanah-tiers.mjs wealth >> artifacts/amanah-grading/wealth.log 2>&1
echo [run-grader] done wealth >> artifacts/amanah-grading/run.log 2>&1
echo [run-grader] starting environment >> artifacts/amanah-grading/run.log 2>&1
node scripts/grade-amanah-tiers.mjs environment >> artifacts/amanah-grading/environment.log 2>&1
echo [run-grader] done environment >> artifacts/amanah-grading/run.log 2>&1
echo [run-grader] starting ummah >> artifacts/amanah-grading/run.log 2>&1
node scripts/grade-amanah-tiers.mjs ummah >> artifacts/amanah-grading/ummah.log 2>&1
echo [run-grader] ALL DONE >> artifacts/amanah-grading/run.log 2>&1
