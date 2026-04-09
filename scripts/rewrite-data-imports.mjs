#!/usr/bin/env node
/**
 * Codemod: rewrite data/ imports after file reorganization.
 * Maps old data/<filename> paths to new data/<subfolder>/<filename> paths.
 * Uses @data/ alias form for all rewrites.
 */

import { readFileSync, writeFileSync } from 'fs';
import { execSync } from 'child_process';

// Mapping: filename stem → new subfolder
const FILE_MAP = {
  // ayat/ (14 files)
  'readiness-ayat-router': 'ayat',
  'faith-readiness-ayat': 'ayat',
  'life-readiness-ayat': 'ayat',
  'intellect-readiness-ayat': 'ayat',
  'wealth-readiness-ayat': 'ayat',
  'environment-readiness-ayat': 'ayat',
  'community-readiness-ayat': 'ayat',
  'family-readiness-ayat': 'ayat',
  'people-readiness-ayat': 'ayat',
  'work-readiness-ayat': 'ayat',
  'spirituality-readiness-ayat': 'ayat',
  'rest-readiness-ayat': 'ayat',
  'learning-readiness-ayat': 'ayat',
  // seed-tasks/ (5 files)
  'faith-seed-tasks': 'seed-tasks',
  'family-seed-tasks': 'seed-tasks',
  'intellect-seed-tasks': 'seed-tasks',
  'wealth-seed-tasks': 'seed-tasks',
  'environment-seed-tasks': 'seed-tasks',
  // bbos/ (4 files)
  'bbos-pipeline': 'bbos',
  'bbos-task-definitions': 'bbos',
  'bbos-role-access': 'bbos',
  'bbos-stage-islamic': 'bbos',
  // islamic/ (5 files)
  'islamic-data': 'islamic',
  'islamic-glossary': 'islamic',
  'five-pillars-content': 'islamic',
  'pillar-content': 'islamic',
  'pillar-dashboard-data': 'islamic',
  // config/ (4 files)
  'contact-config': 'config',
  'money-categories': 'config',
  'people-departments': 'config',
  'g-labels': 'config',
};

// Find all JS/JSX files in src/
const files = execSync('find src/ -name "*.jsx" -o -name "*.js"', { encoding: 'utf8' })
  .trim()
  .split('\n')
  .filter(Boolean);

let totalChanges = 0;

for (const filePath of files) {
  let content = readFileSync(filePath, 'utf8');
  let changed = false;

  for (const [stem, subfolder] of Object.entries(FILE_MAP)) {
    // Match patterns like: from '../data/<stem>' or from '../../data/<stem>' or from './data/<stem>'
    // Also match: from '@data/<stem>'
    const patterns = [
      // Relative: any number of ../  ending in data/<stem>
      new RegExp(`(from\\s+['"])([.][./]*)/data/${stem}(['"])`, 'g'),
      // Already aliased but flat: @data/<stem>
      new RegExp(`(from\\s+['"])@data/${stem}(['"])`, 'g'),
    ];

    for (const pattern of patterns) {
      if (pattern.source.includes('@data')) {
        // @data/<stem> → @data/<subfolder>/<stem>
        const replaced = content.replace(pattern, `$1@data/${subfolder}/${stem}$2`);
        if (replaced !== content) {
          content = replaced;
          changed = true;
        }
      } else {
        // relative path → @data/<subfolder>/<stem>
        const replaced = content.replace(pattern, `$1@data/${subfolder}/${stem}$3`);
        if (replaced !== content) {
          content = replaced;
          changed = true;
        }
      }
    }
  }

  // Also handle relative imports WITHIN data/ subfolders (e.g., ./<stem> when both are in same folder)
  // These stay as-is since they moved together. But cross-subfolder refs need fixing.

  if (changed) {
    writeFileSync(filePath, content, 'utf8');
    totalChanges++;
    console.log(`  Updated: ${filePath}`);
  }
}

console.log(`\nDone. Updated ${totalChanges} files.`);
