/** Tiny class joiner — no runtime dep needed for the conditional patterns used here. */
export const cn = (...parts: Array<string | false | null | undefined>): string =>
  parts.filter(Boolean).join(' ');
