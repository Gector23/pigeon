export interface IPigeonBackendProcessEnv {
  PORT: string | undefined;
  JWT_ACCESS_SECRET: string | undefined;
  JWT_REFRESH_SECRET: string | undefined;
  JWT_ACCESS_EXPIRES: string | undefined;
  JWT_REFRESH_EXPIRES: string | undefined;
  MONGODB_HOST: string | undefined;
  MONGODB_PORT: string | undefined;
  MONGODB_DATABASE: string | undefined;
}

declare global {
  namespace NodeJS {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface ProcessEnv extends PigeonBackendProcessEnv {}
  }
}
