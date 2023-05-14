export interface PigeonBackendProcessEnv {
  PORT: string | undefined;
}

declare global {
  namespace NodeJS {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface ProcessEnv extends PigeonBackendProcessEnv {}
  }
}
