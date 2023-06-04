export const TOKEN_TYPES = {
  ACCESS: "access",
  REFRESH: "refresh",
} as const;

type TokenTypes = typeof TOKEN_TYPES;
export type TokenType = TokenTypes[keyof TokenTypes];
