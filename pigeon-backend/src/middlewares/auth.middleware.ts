import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Cookie } from "../constants/cookie.constant";
import { verifyToken } from "../utils/jwt.util";
import { TOKEN_TYPES } from "../constants/token.constant";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { accessToken } = req.cookies as Cookie;
    if (!accessToken) {
      return res.sendStatus(StatusCodes.UNAUTHORIZED);
    }

    const userData = verifyToken(accessToken, TOKEN_TYPES.ACCESS);
    if (!userData) {
      return res.sendStatus(StatusCodes.UNAUTHORIZED);
    }
    req.userData = userData;

    next();
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
  }
};

export default authMiddleware;
