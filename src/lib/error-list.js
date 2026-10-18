/**
 * A heading plus the first few errors as bullet lines, for a toast:
 *
 *   errorListMessage("This file can't be imported:", ['a', 'b', 'c', 'd'])
 *   // "This file can't be imported:\n• a\n• b\n• c\n+1 more"
 *
 * Toast messages keep line breaks (white-space: pre-line in Toast.css).
 */
export function errorListMessage(heading, errors = [], max = 3) {
  const lines = errors.slice(0, max).map((e) => `• ${e}`);
  if (errors.length > max) lines.push(`+${errors.length - max} more`);
  return [heading, ...lines].join('\n');
}
