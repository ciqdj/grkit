import { MAX_EFFECTS, type Grade } from './catalog';

/**
 * The effects that the user checked, or `null` before the first change. The page then checks
 * every catalog effect, up to the package limit. The site serves the catalog of the latest
 * release, so the default comes from the loaded catalog, not from a list in the page.
 */
export type Selection = ReadonlySet<string> | null;

/** The checked effect IDs. `catalog` gives the IDs of the catalog effects in catalog order. */
export function resolveSelection(
  selection: Selection,
  catalog: readonly string[],
): ReadonlySet<string> {
  return selection ?? new Set(catalog.slice(0, MAX_EFFECTS));
}

/**
 * The selection after an import. An import is checked when it follows its LUT closely (grade A
 * or B) and the package has room. A looser fit waits for the user to check it.
 */
export function selectImport(
  checked: ReadonlySet<string>,
  id: string,
  grade: Grade,
): { selection: ReadonlySet<string>; full: boolean } {
  const close = grade === 'A' || grade === 'B';
  if (!close) return { selection: checked, full: false };
  if (checked.size >= MAX_EFFECTS) return { selection: checked, full: true };
  return { selection: new Set(checked).add(id), full: false };
}
