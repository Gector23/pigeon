import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import authService from "../services/auth.service";
import config from "../config";
import { COOKIE_NAMES, Cookie } from "../constants/cookie.constant";

interface SignInBody {
  email: string;
  password: string;
}

const signIn = async (req: Request<unknown, unknown, SignInBody, unknown>, res: Response) => {
  const { email, password } = req.body;
  const userAgentHeader = req.headers["user-agent"];

  const tokens = await authService.signIn(email, password, userAgentHeader);

  res.cookie(COOKIE_NAMES.ACCESS_TOKEN, tokens.accessToken, { maxAge: config.ACCESS_TOKEN_MAX_AGE, httpOnly: true });
  res.cookie(COOKIE_NAMES.REFRESH_TOKEN, tokens.refreshToken, {
    maxAge: config.REFRESH_TOKEN_MAX_AGE,
    httpOnly: true,
    path: "api/auth",
  });

  return res.sendStatus(StatusCodes.OK);
};

interface SignUpBody {
  email: string;
  password: string;
}

const signUp = async (req: Request<unknown, unknown, SignUpBody, unknown>, res: Response) => {
  const { email, password } = req.body;

  await authService.signUp(email, password);

  return res.sendStatus(StatusCodes.OK);
};

const signOut = async (req: Request, res: Response) => {
  const { userData } = req;

  await authService.signOut(userData.sessionId);

  res.clearCookie(COOKIE_NAMES.ACCESS_TOKEN);
  res.clearCookie(COOKIE_NAMES.REFRESH_TOKEN, { path: "api/auth" });

  return res.sendStatus(StatusCodes.OK);
};

const refresh = async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies as Cookie;
  const userAgentHeader = req.headers["user-agent"];

  const tokens = await authService.refresh(refreshToken, userAgentHeader);

  res.cookie(COOKIE_NAMES.ACCESS_TOKEN, tokens.accessToken, { maxAge: config.ACCESS_TOKEN_MAX_AGE, httpOnly: true });
  res.cookie(COOKIE_NAMES.REFRESH_TOKEN, tokens.refreshToken, {
    maxAge: config.REFRESH_TOKEN_MAX_AGE,
    httpOnly: true,
    path: "api/auth",
  });

  return res.sendStatus(StatusCodes.OK);
};

export default {
  signIn,
  signUp,
  signOut,
  refresh,
};
