import bcrypt from "bcrypt";
import User from "../models/User.model";
import Session from "../models/Session.model";
import { parseUserAgentHeader } from "../utils/headers.util";
import sessionService from "./session.service";
import { verifyToken } from "../utils/jwt.util";
import { TOKEN_TYPES } from "../constants/token.constant";

const signIn = async (email: string, password: string, userAgentHeader: string | undefined) => {
  const userDoc = await User.findOne({ email });
  if (!userDoc) {
    throw new Error("Incorrect email address or password.");
  }

  const isPasswordEqual = await bcrypt.compare(password, userDoc.password);
  if (!isPasswordEqual) {
    throw new Error("Incorrect email address or password.");
  }

  const userAgent = parseUserAgentHeader(userAgentHeader);

  return sessionService.createSession(userDoc._id.toString(), userAgent);
};

const signUp = async (email: string, password: string) => {
  const userDoc = await User.findOne({ email });
  if (userDoc) {
    throw new Error(`A user with email ${email} already exists.`);
  }

  const hashPassword = await bcrypt.hash(password, 10);
  await User.create({ email, password: hashPassword });
};

const signOut = async (sessionId: string) => Session.deleteOne({ _id: sessionId });

const refresh = async (refreshToken: string | undefined, userAgentHeader: string | undefined) => {
  if (!refreshToken) {
    throw new Error("Unauthorized");
  }

  const tokenPayload = verifyToken(refreshToken, TOKEN_TYPES.REFRESH);
  if (!tokenPayload) {
    throw new Error("Unauthorized");
  }

  const sessionDoc = await Session.findOne({ _id: tokenPayload.sessionId });
  if (!sessionDoc || refreshToken !== sessionDoc.refreshToken) {
    throw new Error("Unauthorized");
  }

  const userAgent = parseUserAgentHeader(userAgentHeader);

  const tokens = await sessionService.updateSession(tokenPayload.userId, tokenPayload.sessionId, userAgent);
  return tokens;
};

export default {
  signIn,
  signUp,
  signOut,
  refresh,
};
