@echo off
set NOTEBOOKLM_HOME=C:\Users\MY OWN AXIS\.notebooklm-alt
set MILOS_MS_ID=be921648-2088-4860-bdd8-283a5e7301f3
set AMANAH_PACE_MS=3000
cd /d "C:\Users\MY OWN AXIS\Documents\MAQASID OS - V2.1"
node scripts/grade-amanah-tiers.mjs faith >> artifacts/amanah-grading/faith.log 2>&1
