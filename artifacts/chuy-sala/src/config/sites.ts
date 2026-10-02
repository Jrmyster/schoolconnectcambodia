/** Public bridge between independently deployed applications. */
export const STEM_SITE_URL =
  import.meta.env.VITE_STEM_SITE_URL?.trim() ||
  "https://khmerone.jaredrobertw.workers.dev";
