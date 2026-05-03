import fs from 'fs';
import path from 'path';
const dir = "tasks";
const files = fs.readdirSync(dir).filter(f => f.startsWith('L-') && f.endsWith('.json')).sort();
for (const f of files) {
  const raw = fs.readFileSync(path.join(dir, f), 'utf8').replace(/^﻿/, '').trim();
  if (!raw) { console.log(`EMPTY ${f}`); continue; }
  let j;
  try { j = JSON.parse(raw); } catch (e) { console.log(`BADJSON ${f}: ${e.message}`); continue; }
  if (j.error) { console.log(`ERR  ${f}: ${j.message}`); continue; }
  const a = j.answer || '';
  const m = a.match(/```json\s*([\s\S]+?)```/);
  if (m) {
    try {
      const o = JSON.parse(m[1]);
      console.log(`OK   ${f}: ${JSON.stringify(o)}`);
    } catch (e) {
      console.log(`PARS ${f}: ${m[1].slice(0, 250).replace(/\n/g, ' ')}`);
    }
  } else {
    console.log(`NONE ${f}: ${a.slice(0, 250).replace(/\n/g, ' ')}`);
  }
}
