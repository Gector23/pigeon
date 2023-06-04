import mongoose from "mongoose";
import { IUserAgent } from "../utils/headers.util";
import { genereateTokens } from "../utils/jwt.util";
import Session from "../models/Session.model";

const createSession = async (userId: string, userAgent: IUserAgent) => {
  const sessionId = new mongoose.Types.ObjectId();

  const tokens = genereateTokens({ userId, sessionId: sessionId.toString() });

  const { browser, browserVersion, os, osVersion, deviceModel, deviceType } = userAgent;

  await Session.create({
    _id: sessionId,
    refreshToken: tokens.refreshToken,
    userId,
    browser,
    browserVersion,
    os,
    osVersion,
    deviceModel,
    deviceType,
  });

  return tokens;
};

const updateSession = async (userId: string, sessionId: string, userAgent: IUserAgent) => {
  const tokens = genereateTokens({ userId, sessionId });

  const { browser, browserVersion, os, osVersion, deviceModel, deviceType } = userAgent;
  await Session.updateOne(
    { _id: sessionId },
    { refreshToken: tokens.refreshToken, browser, browserVersion, os, osVersion, deviceModel, deviceType },
  );

  return tokens;
};

export default {
  createSession,
  updateSession,
};
