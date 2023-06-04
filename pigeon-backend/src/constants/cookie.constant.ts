export const COOKIE_NAMES = {
  ACCESS_TOKEN: "accessToken",
  REFRESH_TOKEN: "refreshToken",
} as const;

type CookieNames = typeof COOKIE_NAMES;
type CookieName = CookieNames[keyof CookieNames];
export type Cookie = Record<CookieName, string | undefined>;
