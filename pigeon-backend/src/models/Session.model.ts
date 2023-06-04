import { Schema, model } from "mongoose";
import config from "../config";

interface ISession {
  userId: Schema.Types.ObjectId;
  refreshToken: string;
  browser?: string;
  browserVersion?: string;
  os?: string;
  osVersion?: string;
  deviceModel?: string;
  deviceType?: string;
}

const sessionSchema = new Schema<ISession>(
  {
    userId: { type: Schema.Types.ObjectId, required: true },
    refreshToken: { type: String, required: true },
    browser: { type: String },
    browserVersion: { type: String },
    os: { type: String },
    osVersion: { type: String },
    deviceModel: { type: String },
    deviceType: { type: String },
  },
  { timestamps: true },
);

sessionSchema.index({ updatedAt: 1 }, { expireAfterSeconds: config.SESSION_EXPIRE_AFTER_SECONDS });

const Session = model<ISession>("Session", sessionSchema);

export default Session;
