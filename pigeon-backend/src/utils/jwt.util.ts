import jwt from "jsonwebtoken";
import config from "../config";
import { TOKEN_TYPES, TokenType } from "../constants/token.constant";
import { IUserData } from "../types/user-data";

export const genereateTokens = (tokenPayload: IUserData) => {
  const accessToken = jwt.sign(tokenPayload, config.JWT_ACCESS_SECRET, { expiresIn: config.JWT_ACCESS_EXPIRES });
  const refreshToken = jwt.sign(tokenPayload, config.JWT_REFRESH_SECRET, { expiresIn: config.JWT_REFRESH_EXPIRES });
  return {
    accessToken,
    refreshToken,
  };
};

export const verifyToken = (token: string, tokenType: TokenType) => {
  try {
    const tokenSecret = tokenType === TOKEN_TYPES.ACCESS ? config.JWT_ACCESS_SECRET : config.JWT_REFRESH_SECRET;
    const tokenPayload = jwt.verify(token, tokenSecret) as IUserData;
    return tokenPayload;
  } catch {
    return null;
  }
};
