import { describe, expect, it } from 'vitest';
import { MAX_EFFECTS } from './catalog';
import { resolveSelection, selectImport } from './selection';

const ids = (count: number) => Array.from({ length: count }, (_, index) => `effect-${index}`);

describe('resolveSelection', () => {
  it('checks every catalog effect before the first change', () => {
    expect([...resolveSelection(null, ids(18))]).toEqual(ids(18));
  });

  it('checks at most the package limit by default', () => {
    expect(resolveSelection(null, ids(25)).size).toBe(MAX_EFFECTS);
  });

  it('keeps the choice of the user, also an empty one', () => {
    expect(resolveSelection(new Set(), ids(18)).size).toBe(0);
    expect([...resolveSelection(new Set(['effect-3']), ids(18))]).toEqual(['effect-3']);
  });
});

describe('selectImport', () => {
  it('checks a close fit when the package has room', () => {
    const result = selectImport(new Set(ids(18)), 'lut', 'B');
    expect(result.selection.has('lut')).toBe(true);
    expect(result.full).toBe(false);
  });

  it('leaves a close fit out when the package is full', () => {
    const checked = new Set(ids(MAX_EFFECTS));
    expect(selectImport(checked, 'lut', 'A')).toEqual({ selection: checked, full: true });
  });

  it('leaves a loose fit for the user to check', () => {
    const checked = new Set(ids(2));
    expect(selectImport(checked, 'lut', 'C')).toEqual({ selection: checked, full: false });
  });
});
