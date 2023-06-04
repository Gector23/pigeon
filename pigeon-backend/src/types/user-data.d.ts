export interface IUserData {
  userId: string;
  sessionId: string;
}

declare global {
  namespace Express {
    export interface Request {
      userData: IUserData;
    }
  }
}
