import path from "path";
import fs from "fs";
import parseDuration from "parse-duration";
import { IPigeonBackendProcessEnv } from "../types/environment";

const getExampleEnvVars = () => {
  const exampleEnvPath = path.resolve(process.cwd(), ".env.example");
  const exampleEnvContent = fs
    .readFileSync(exampleEnvPath, {
      encoding: "utf-8",
    })
    .trim();

  return exampleEnvContent.split("\n").map((exampleEnvLine) => exampleEnvLine.split("=")[0]);
};

const getRequiredProcessEnv = () => {
  const exampleEnvVars = getExampleEnvVars();

  return Object.fromEntries(
    exampleEnvVars.map((exampleEnvVar) => {
      if (!process.env[exampleEnvVar]) {
        throw new Error(`Missing env variable ${exampleEnvVar} in config.env`);
      }

      return [exampleEnvVar, process.env[exampleEnvVar]];
    }),
  ) as { [k in keyof IPigeonBackendProcessEnv]: string };
};

const getConfig = () => {
  const requiredProcessEnv = getRequiredProcessEnv();

  return {
    PORT: Number(requiredProcessEnv.PORT),
    JWT_ACCESS_SECRET: requiredProcessEnv.JWT_ACCESS_SECRET,
    JWT_REFRESH_SECRET: requiredProcessEnv.JWT_REFRESH_SECRET,
    JWT_ACCESS_EXPIRES: requiredProcessEnv.JWT_ACCESS_EXPIRES,
    JWT_REFRESH_EXPIRES: requiredProcessEnv.JWT_REFRESH_EXPIRES,
    ACCESS_TOKEN_MAX_AGE: parseDuration(requiredProcessEnv.JWT_ACCESS_EXPIRES),
    REFRESH_TOKEN_MAX_AGE: parseDuration(requiredProcessEnv.JWT_REFRESH_EXPIRES),
    SESSION_EXPIRE_AFTER_SECONDS: parseDuration(requiredProcessEnv.JWT_REFRESH_EXPIRES, "second"),
    MONGODB_CONNECTION_STRING: `mongodb://${requiredProcessEnv.MONGODB_HOST}:${requiredProcessEnv.MONGODB_PORT}/${requiredProcessEnv.MONGODB_DATABASE}`,
  };
};

const config = getConfig();

export default config;
