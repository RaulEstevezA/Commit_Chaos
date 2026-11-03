import { describe, expect, it } from 'vitest';
import { personalize } from '../src/core/missions/personalize';

describe('narrative personalization', () => {
  it('replaces every player marker', () => {
    expect(personalize('{player}, welcome. {player}, run.', 'Ada')).toBe(
      'Ada, welcome. Ada, run.',
    );
  });

  it('leaves ordinary narrative text untouched', () => {
    expect(personalize('Laura: Production is down.', 'Ada')).toBe(
      'Laura: Production is down.',
    );
  });
});
