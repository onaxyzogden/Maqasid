import { describe, it, expect } from 'vitest';
import { errorListMessage } from '../error-list';

describe('errorListMessage', () => {
  it('lists every error when there are few', () => {
    expect(errorListMessage('Bad file:', ['a', 'b'])).toBe('Bad file:\n• a\n• b');
  });

  it('caps the list and counts the rest', () => {
    expect(errorListMessage('Bad file:', ['a', 'b', 'c', 'd', 'e'])).toBe('Bad file:\n• a\n• b\n• c\n+2 more');
  });

  it('copes with no errors', () => {
    expect(errorListMessage('Bad file:')).toBe('Bad file:');
  });
});
