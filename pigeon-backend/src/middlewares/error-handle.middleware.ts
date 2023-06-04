import { NextFunction, Request, Response } from "express";
import { handelError } from "../utils/errors.util";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandleMiddleware = (error: Error, req: Request, res: Response, next: NextFunction) => {
  handelError(error, res);
};

export default errorHandleMiddleware;
