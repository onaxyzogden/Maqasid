// Response Parser — extracts structured field data from AI text output
// Expects AI to return a JSON object with keys matching taskDef.fields[].id

/**
 * Parse AI response text into field data.
 * @param {string} text - raw AI response (may contain markdown fences)
 * @param {object} taskDef - BBOS task definition with fields array
 * @returns {{ fieldData: object, warnings: string[] }}
 */
export function parseAiResponse(text, taskDef) {
  const warnings = [];
  const validFieldIds = new Set(taskDef.fields.map((f) => f.id));

  // Extract JSON from the response
  const json = extractJSON(text);
  if (!json) {
    return {
      fieldData: {},
      warnings: ['Could not extract structured data from AI response. Try regenerating.'],
    };
  }

  // Validate and filter to known field IDs
  const fieldData = {};
  for (const [key, value] of Object.entries(json)) {
    if (!validFieldIds.has(key)) {
      warnings.push(`Unknown field "${key}" returned by AI — skipped.`);
      continue;
    }

    const fieldDef = taskDef.fields.find((f) => f.id === key);

    // Validate select fields
    if (fieldDef.type === 'select' && fieldDef.options) {
      const validValues = fieldDef.options.map((o) => o.value);
      if (value && !validValues.includes(value)) {
        warnings.push(`Field "${fieldDef.label}": AI returned "${value}" which is not a valid option — kept for review.`);
      }
    }

    // Coerce numbers
    if (fieldDef.type === 'number' && typeof value === 'string') {
      const num = parseFloat(value);
      fieldData[key] = isNaN(num) ? value : String(num);
    } else {
      fieldData[key] = typeof value === 'string' ? value : JSON.stringify(value);
    }
  }

  // Check for missing fields
  const populated = Object.keys(fieldData);
  const missing = taskDef.fields
    .filter((f) => !populated.includes(f.id))
    .map((f) => f.label);

  if (missing.length > 0) {
    warnings.push(`AI did not populate: ${missing.join(', ')}. Fill these manually.`);
  }

  return { fieldData, warnings };
}

/**
 * Extract a JSON object from text that may contain markdown code fences
 * or narrative text surrounding the JSON.
 */
function extractJSON(text) {
  // Strategy 1: markdown code fence
  const fenceMatch = text.match(/```(?:json)?\s*\n([\s\S]*?)\n\s*```/);
  if (fenceMatch) {
    const parsed = safeParse(fenceMatch[1].trim());
    if (parsed) return parsed;
  }

  // Strategy 2: find { ... } and fix newlines inside strings
  const braceStart = text.indexOf('{');
  if (braceStart !== -1) {
    const braceEnd = text.lastIndexOf('}');
    if (braceEnd > braceStart) {
      const candidate = text.slice(braceStart, braceEnd + 1);
      const parsed = safeParse(candidate);
      if (parsed) return parsed;
    }
  }

  // Strategy 3: entire text as JSON
  const parsed = safeParse(text.trim());
  if (parsed) return parsed;

  // Strategy 4: regex field-by-field extraction (handles any format)
  return regexExtract(text);
}

/**
 * Try to parse JSON, with aggressive repair for literal newlines in string values.
 */
function safeParse(str) {
  // Attempt 1: direct parse
  try { return JSON.parse(str); } catch { /* fall through */ }

  // Attempt 2: escape literal newlines/tabs inside JSON string values
  const fixed = escapeNewlinesInStrings(str);
  try { return JSON.parse(fixed); } catch { /* fall through */ }

  // Attempt 3: also fix trailing commas
  try { return JSON.parse(fixed.replace(/,\s*([\]}])/g, '$1')); } catch { /* fall through */ }

  return null;
}

/**
 * Walk through text character by character. When inside a JSON string,
 * replace literal newlines/tabs with their escape sequences.
 * This is the key fix: LLMs often produce JSON with real newlines inside strings.
 */
function escapeNewlinesInStrings(str) {
  const out = [];
  let inString = false;
  let i = 0;

  while (i < str.length) {
    const ch = str[i];

    if (inString) {
      if (ch === '\\') {
        // Escape sequence — pass through both characters
        out.push(ch);
        i++;
        if (i < str.length) out.push(str[i]);
        i++;
        continue;
      }
      if (ch === '"') {
        // End of string
        inString = false;
        out.push(ch);
        i++;
        continue;
      }
      if (ch === '\n') { out.push('\\n'); i++; continue; }
      if (ch === '\r') { out.push('\\r'); i++; continue; }
      if (ch === '\t') { out.push('\\t'); i++; continue; }
      out.push(ch);
      i++;
    } else {
      if (ch === '"') {
        inString = true;
      }
      out.push(ch);
      i++;
    }
  }

  return out.join('');
}

/**
 * Last-resort: extract "key": "value" pairs using regex.
 * Handles multiline values by matching from "key": " to the next ",\n or "} pattern.
 */
function regexExtract(text) {
  const obj = {};

  // Match "key": "value" where value can span multiple lines
  // Look for key-value pairs where value ends at ", or "} or "\n  "
  const keyPattern = /"(\w+)"\s*:\s*"/g;
  let keyMatch;

  while ((keyMatch = keyPattern.exec(text)) !== null) {
    const key = keyMatch[1];
    const valueStart = keyMatch.index + keyMatch[0].length;

    // Find the end of the value: an unescaped " followed by , or } or end
    let valueEnd = -1;
    let j = valueStart;
    while (j < text.length) {
      if (text[j] === '\\') { j += 2; continue; }
      if (text[j] === '"') { valueEnd = j; break; }
      j++;
    }

    if (valueEnd > valueStart) {
      const rawValue = text.slice(valueStart, valueEnd);
      obj[key] = rawValue.replace(/\\n/g, '\n').replace(/\\t/g, '\t').replace(/\\"/g, '"').replace(/\\\\/g, '\\');
    }
  }

  return Object.keys(obj).length > 0 ? obj : null;
}
