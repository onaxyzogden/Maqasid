#!/usr/bin/env node
// One-shot: strip unnecessary `\'` escapes inside backtick template literals.
// State machine respects single-quote, double-quote, backtick, line + block comments.

import fs from 'node:fs';

const files = process.argv.slice(2);
let totalStripped = 0;

for (const file of files) {
  const src = fs.readFileSync(file, 'utf8');
  const out = [];
  let i = 0;
  let mode = 'code'; // code | sq | dq | bt | lc | bc
  let stripped = 0;
  while (i < src.length) {
    const c = src[i];
    const n = src[i + 1];
    if (mode === 'code') {
      if (c === '/' && n === '/') { mode = 'lc'; out.push(c); i++; continue; }
      if (c === '/' && n === '*') { mode = 'bc'; out.push(c); i++; continue; }
      if (c === "'") { mode = 'sq'; out.push(c); i++; continue; }
      if (c === '"') { mode = 'dq'; out.push(c); i++; continue; }
      if (c === '`') { mode = 'bt'; out.push(c); i++; continue; }
      out.push(c); i++; continue;
    }
    if (mode === 'lc') {
      if (c === '\n') mode = 'code';
      out.push(c); i++; continue;
    }
    if (mode === 'bc') {
      if (c === '*' && n === '/') { mode = 'code'; out.push(c, n); i += 2; continue; }
      out.push(c); i++; continue;
    }
    if (mode === 'sq') {
      if (c === '\\' && n) { out.push(c, n); i += 2; continue; }
      if (c === "'") { mode = 'code'; out.push(c); i++; continue; }
      out.push(c); i++; continue;
    }
    if (mode === 'dq') {
      if (c === '\\' && n) { out.push(c, n); i += 2; continue; }
      if (c === '"') { mode = 'code'; out.push(c); i++; continue; }
      out.push(c); i++; continue;
    }
    if (mode === 'bt') {
      if (c === '\\' && n === "'") { out.push("'"); i += 2; stripped++; continue; }
      // \$ is only meaningful before { (escapes interpolation). Otherwise unnecessary.
      if (c === '\\' && n === '$' && src[i + 2] !== '{') { out.push('$'); i += 2; stripped++; continue; }
      if (c === '\\' && n) { out.push(c, n); i += 2; continue; }
      if (c === '`') { mode = 'code'; out.push(c); i++; continue; }
      out.push(c); i++; continue;
    }
  }
  if (stripped > 0) {
    fs.writeFileSync(file, out.join(''));
    console.log(`${file}: stripped ${stripped}`);
    totalStripped += stripped;
  }
}
console.log(`Total: ${totalStripped}`);
