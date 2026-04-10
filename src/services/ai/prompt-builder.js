// Prompt Builder — assembles complete AI prompt from pattern + task def + upstream data
// Outputs provider-neutral { system, messages } consumed by ai-client.js

import {
  mappingTransform,
  researchDiscovery,
  scriptGeneration,
  assemblyGate,
  glabelProof,
  compressedCycle,
} from './prompt-patterns';
import { getRegistryEntry } from './prompt-registry';
import { gatherUpstreamContext } from './context-gatherer';

const PATTERN_FN = {
  MAPPING_TRANSFORM: mappingTransform,
  RESEARCH_DISCOVERY: researchDiscovery,
  SCRIPT_GENERATION: scriptGeneration,
  ASSEMBLY_GATE: assemblyGate,
  COMPRESSED_CYCLE: compressedCycle,
};

/**
 * Build a complete prompt for the given BBOS task.
 * @param {object} taskDef - from getBbosTaskDef()
 * @param {string} projectId - for upstream context gathering
 * @returns {{ system: string, messages: Array<{role: string, content: string}> }}
 */
export function buildPrompt(taskDef, projectId) {
  const registry = getRegistryEntry(taskDef.id, taskDef.stage);
  const upstreamData = gatherUpstreamContext(projectId, taskDef, registry.contextDepth);

  // Build system prompt
  const systemParts = [
    buildPreamble(),
    buildPatternInstructions(registry.pattern),
    buildOverlays(taskDef),
    buildTwoFactoryRule(taskDef),
    buildScopeIntegrity(taskDef),
    buildOutputFormat(taskDef),
  ].filter(Boolean);

  const system = systemParts.join('\n\n');

  // Build user message
  const userParts = [
    buildTaskContext(taskDef),
    buildUpstreamSection(upstreamData),
    buildTaskSpecificInstructions(registry.taskInstructions),
    buildFieldList(taskDef),
  ].filter(Boolean);

  const messages = [{ role: 'user', content: userParts.join('\n\n') }];

  return { system, messages };
}

// ── System Prompt Components ──

function buildPreamble() {
  return `# BBOS AI Draft Assistant

You are the AI assistant for the Barakah Business Operating System (BBOS) — an Islamic covenant-grounded business formation framework. You help operators build truthful, sustainable businesses through a sequential 9-stage pipeline.

## Core Principles
- **Honesty over comfort.** Every output must reflect what is true, not what is convenient.
- **Gaps are named, not filled.** If data is missing or unverifiable, flag it — never invent.
- **Operator sovereignty.** You produce DRAFTS for the operator to review and approve. You do not make decisions for them.
- **Evidence-graded claims.** Every substantive claim carries a G-label evidence grade (G1 verified → G4 inference).
- **Scope integrity.** Never reference deliverables, promises, or features outside the frozen Offer Scope Map.`;
}

function buildPatternInstructions(pattern) {
  const fn = PATTERN_FN[pattern];
  return fn ? fn() : researchDiscovery();
}

function buildOverlays(taskDef) {
  const overlays = [];
  const flags = taskDef.validationFlags || [];

  // Auto-apply G-Label overlay
  if (flags.includes('PROOF_PENDING') || flags.includes('CLAIM_UNVERIFIED')) {
    overlays.push(glabelProof());
  }

  // Auto-apply compressed cycle for FP subLevels
  if (taskDef.subLevel?.includes('FP')) {
    overlays.push(compressedCycle());
  }

  return overlays.length > 0 ? overlays.join('\n\n') : null;
}

function buildTwoFactoryRule(taskDef) {
  // Asset Factory tasks get additional constraint
  if (taskDef.subLevel?.startsWith('A') || taskDef.subLevel?.startsWith('AF')) {
    return `## Two-Factory Rule
This is an ASSET FACTORY task. You are generating a DRAFT for operator review. This output:
- Must NOT be presented as final or client-facing.
- Must NOT be deployed without explicit operator approval.
- The operator controls when and how assets are assembled and released.`;
  }
  return null;
}

function buildScopeIntegrity(taskDef) {
  const laterStages = ['OUT', 'SAL', 'DLR', 'RET', 'OPT'];
  if (laterStages.includes(taskDef.stage)) {
    return `## Scope Integrity Constraint
All references to the offering (features, deliverables, promises, guarantees, pricing) MUST match the frozen OFR Scope Map from the Offering stage. Do not introduce, imply, or reference anything not documented in the OFR scope. If the OFR scope data is not in the upstream context, flag it as [SCOPE_MISSING].`;
  }
  return null;
}

function buildOutputFormat(taskDef) {
  const fieldDefs = taskDef.fields.map((f) => {
    let desc = `"${f.id}": string`;
    if (f.type === 'select' && f.options) {
      const vals = f.options.map((o) => `"${o.value}"`).join(' | ');
      desc = `"${f.id}": ${vals}`;
    } else if (f.type === 'number') {
      desc = `"${f.id}": string (numeric value)`;
    }
    return `  ${desc}`;
  });

  return `## Required Output Format — CRITICAL

Your ENTIRE response must be a single valid JSON object. No text before it. No text after it. No markdown fences. No explanation.

The JSON must have EXACTLY these keys (all values are strings):

{
${fieldDefs.join(',\n')}
}

RULES:
- Output ONLY the JSON object — nothing else.
- Every value must be a JSON string (use \\n for line breaks within values, not literal newlines).
- For select fields, use one of the listed option values exactly.
- Do not add keys beyond those listed above.
- If you cannot populate a field, set its value to "" (empty string).
- G-label tags like [G2: source] go INSIDE the string values, not as separate keys.`;
}

// ── User Message Components ──

function buildTaskContext(taskDef) {
  const parts = [
    `# Task: ${taskDef.label} (${taskDef.id})`,
    `**Stage:** ${taskDef.stage} | **Sub-Level:** ${taskDef.subLevel}`,
    `**Purpose:** ${taskDef.purpose}`,
  ];

  if (taskDef.governingAttributes?.length > 0) {
    parts.push(`**Governing Attributes:** ${taskDef.governingAttributes.join(', ')}`);
  }
  if (taskDef.attrMeaning) {
    parts.push(`**Theological Framing:** ${taskDef.attrMeaning}`);
  }

  const flags = taskDef.validationFlags || [];
  if (flags.length > 0) {
    parts.push(`**Validation Flags:** ${flags.join(', ')}`);
  }

  return parts.join('\n');
}

function buildUpstreamSection(upstreamData) {
  const entries = Object.entries(upstreamData);
  if (entries.length === 0) {
    return '## Upstream Context\nNo upstream data available — this is a starting task.';
  }

  const sections = entries.map(([taskId, data]) => {
    const fieldLines = Object.entries(data.fields)
      .map(([k, v]) => `  - **${k}:** ${v}`)
      .join('\n');
    return `### ${data.label} (${taskId})\n${fieldLines}`;
  });

  return `## Upstream Context (completed tasks)\n${sections.join('\n\n')}`;
}

function buildTaskSpecificInstructions(instructions) {
  if (!instructions) return null;
  return `## Task-Specific Instructions\n${instructions}`;
}

function buildFieldList(taskDef) {
  const fieldDescs = taskDef.fields.map((f) => {
    let desc = `- **${f.id}** (${f.type}): ${f.label}`;
    if (f.placeholder) desc += ` — "${f.placeholder}"`;
    if (f.type === 'select' && f.options) {
      desc += ` [Options: ${f.options.map((o) => o.value).join(', ')}]`;
    }
    return desc;
  });

  return `## Fields to Populate\n${fieldDescs.join('\n')}`;
}
