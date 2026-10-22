// The wording of FirstSignInSheet.jsx and SnapshotSheet.jsx, kept apart so it can be tested.

export const plural = (n, one, many = `${one}s`) => `${n} ${n === 1 ? one : many}`;

export const intro = (total) => `${plural(total, 'record')} on this device ${total === 1 ? 'is' : 'are'} not in your account yet.`;

/** The lines shown once a choice is made: 'add' resolves addThisDevice's counts, 'empty' shelveThisDevice's. */
export function summary(choice, result) {
  if (choice === 'empty') {
    return [
      `${plural(result.kept, 'area')} of records set aside on this device.`,
      'To bring them back, sign out and choose “Put this device’s earlier records back”.',
    ];
  }
  const lines = [];
  if (result.queued) lines.push(`${plural(result.queued, 'record')} will be sent to your account.`);
  if (result.same) lines.push(`${plural(result.same, 'record')} your account already held the same.`);
  if (result.received) lines.push(`${plural(result.received, 'record')} came in from your account.`);
  if (result.clashed) lines.push(`${plural(result.clashed, 'record')} ${result.clashed === 1 ? 'differs' : 'differ'} from your account’s copy. Both are kept until you choose.`);
  for (const { was } of result.renumbered) lines.push(`Invoice ${was} gets a new number, since your account already uses it.`);
  if (!lines.length) lines.push('Your account already held everything on this device.');
  return lines;
}

/** The lines shown once the old account copy is brought in (sync-snapshot.js importSnapshot). */
export function snapshotSummary(result) {
  const lines = [];
  if (result.added) lines.push(`${plural(result.added, 'earlier record')} will be sent to your account.`);
  if (result.kept) lines.push(`${plural(result.kept, 'record')} ${result.kept === 1 ? 'was' : 'were'} already on this device, so this device’s copy is kept.`);
  if (result.same) lines.push(`${plural(result.same, 'record')} your account already held the same.`);
  if (result.clashed) lines.push(`${plural(result.clashed, 'record')} ${result.clashed === 1 ? 'differs' : 'differ'} from your account’s copy. Both are kept until you choose.`);
  for (const { was } of result.renumbered) lines.push(`Invoice ${was} gets a new number, since your account already uses it.`);
  if (!lines.length) lines.push('The earlier copy held nothing new.');
  return lines;
}
