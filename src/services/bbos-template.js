/**
 * BBOS Per-Task Template — generate, download, validate, and import
 * blank .bbos task templates for offline form filling.
 */

import { downloadJson } from './bbos-export';

/**
 * Generate a blank template JSON from a BBOS task definition.
 */
export function generateTaskTemplate(taskDef) {
  const fields = {};
  for (const field of taskDef.fields) {
    fields[field.id] = '';
  }
  return {
    schema_version: '1.0',
    format: 'maqasid-bbos-task-template',
    task_type: taskDef.id,
    stage: taskDef.stage,
    sub_level: taskDef.subLevel,
    label: taskDef.label,
    fields,
    g_label: null,
    instructions: 'Fill in each field with your data. Re-upload this file into Maqasid OS to populate the task.',
  };
}

/**
 * Download a blank .bbos template for a single task.
 */
export function downloadTaskTemplate(taskDef) {
  const template = generateTaskTemplate(taskDef);
  const filename = `${taskDef.id}-template.bbos.json`;
  downloadJson(template, filename);
}

/**
 * Validate an uploaded template JSON against a task definition.
 * Returns { valid: boolean, errors: string[] }.
 */
export function validateTaskTemplate(json, taskDef) {
  const errors = [];

  if (!json || typeof json !== 'object') {
    errors.push('File is not valid JSON.');
    return { valid: false, errors };
  }

  if (json.format !== 'maqasid-bbos-task-template') {
    errors.push(`Invalid format: expected "maqasid-bbos-task-template", got "${json.format}".`);
  }

  if (json.task_type !== taskDef.id) {
    errors.push(`Task type mismatch: expected "${taskDef.id}", got "${json.task_type}".`);
  }

  if (!json.fields || typeof json.fields !== 'object') {
    errors.push('Missing or invalid "fields" object.');
  }

  return { valid: errors.length === 0, errors };
}

/**
 * Import field data from a validated template into the task's expected shape.
 * Returns a fieldData object: { [fieldId]: value }.
 */
export function importTaskTemplate(json, taskDef) {
  const fieldData = {};
  const validFieldIds = new Set(taskDef.fields.map((f) => f.id));

  for (const [key, value] of Object.entries(json.fields || {})) {
    if (validFieldIds.has(key) && value !== '') {
      fieldData[key] = value;
    }
  }

  return { fieldData, gLabel: json.g_label || null };
}
