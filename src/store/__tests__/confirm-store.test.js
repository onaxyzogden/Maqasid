// The confirm store resolves each request with the user's answer and keeps
// later requests queued behind the one on screen.
import { describe, it, expect, beforeEach } from 'vitest';
import { useConfirmStore, requestConfirm } from '../confirm-store';

beforeEach(() => useConfirmStore.setState({ queue: [] }));

const head = () => useConfirmStore.getState().queue[0];

describe('confirm store', () => {
  it('resolves true when confirmed', async () => {
    const p = requestConfirm({ title: 'Delete?' });
    useConfirmStore.getState().answer(head().id, true);
    await expect(p).resolves.toBe(true);
    expect(useConfirmStore.getState().queue).toHaveLength(0);
  });

  it('resolves false when cancelled', async () => {
    const p = requestConfirm({ title: 'Delete?' });
    useConfirmStore.getState().answer(head().id, false);
    await expect(p).resolves.toBe(false);
  });

  it('queues a second request behind the first', async () => {
    const a = requestConfirm({ title: 'First' });
    const b = requestConfirm({ title: 'Second' });
    expect(head().title).toBe('First');
    useConfirmStore.getState().answer(head().id, true);
    expect(head().title).toBe('Second');
    useConfirmStore.getState().answer(head().id, false);
    await expect(a).resolves.toBe(true);
    await expect(b).resolves.toBe(false);
  });

  it('ignores an answer for an unknown id', () => {
    requestConfirm({ title: 'Only' });
    useConfirmStore.getState().answer(9999, true);
    expect(useConfirmStore.getState().queue).toHaveLength(1);
  });
});
