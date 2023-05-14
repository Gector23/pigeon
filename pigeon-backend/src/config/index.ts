import path from "path";
import fs from "fs";
import { PigeonBackendProcessEnv } from "../types/environment";

const getExampleEnvVars = () => {
  const exampleEnvPath = path.resolve(process.cwd(), ".env.example");
  const exampleEnvContent = fs
    .readFileSync(exampleEnvPath, {
      encoding: "utf-8",
    })
    .trim();

  return exampleEnvContent
    .split("\n")
    .map((exampleEnvLine) => exampleEnvLine.split("=")[0]);
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
  ) as { [k in keyof PigeonBackendProcessEnv]: string };
};

const getConfig = () => {
  const requiredProcessEnv = getRequiredProcessEnv();

  return {
    PORT: Number(requiredProcessEnv.PORT),
  };
};

const config = getConfig();

export default config;
