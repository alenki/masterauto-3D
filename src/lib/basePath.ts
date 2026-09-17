/**
 * Sub-directory the site is served from (https://lumako.ru/masterauto).
 * Kept in sync with `basePath` in next.config.ts, which imports this constant.
 */
export const BASE_PATH = "/masterauto";

/**
 * Prefixes a file in `public/` with the deploy sub-directory.
 * Next.js only rewrites paths it controls (next/link, next/image, _next assets),
 * so raw `src`/loader URLs have to be prefixed by hand.
 */
export function asset(path: string) {
  return `${BASE_PATH}${path}`;
}
