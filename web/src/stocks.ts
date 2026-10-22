/**
 * The film numbers of the effects that have them. Photographers often know motion picture and
 * aerial films by number (5219, not Vision3 500T), so the effect list shows the number under the
 * name. `print` is the print film of a cine look.
 */
export const STOCKS: Readonly<Record<string, { film: string; print?: string }>> = {
  'vision3-250d-2383-v1': { film: '5207', print: '2383' },
  'vision3-500t-2393-v1': { film: '5219', print: '2393' },
  'eterna-500t-3523xd-v1': { film: '8573', print: '3523XD' },
  'aerocolor-iv-v1': { film: '2460' },
};
