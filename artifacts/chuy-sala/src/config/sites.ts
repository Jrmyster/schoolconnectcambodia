/** Public bridge between independently deployed applications. */
export const MAP_SITE_URL =
  import.meta.env.VITE_MAP_SITE_URL?.trim() ||
  "https://schoolconnectcambodia.com";
