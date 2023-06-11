import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import logger from "./logger.util";

export class BackendError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class ValidationError extends BackendError {
  constructor(message: string) {
    super(StatusCodes.BAD_REQUEST, message);
  }
}

export const handelError = (error: Error | BackendError, res?: Response) => {
  if (error instanceof BackendError && error.statusCode < 500) {
    logger.warn(error);
  } else {
    logger.error(error);
  }

  if (res) {
    if (error instanceof BackendError) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Something went wrong when processing the request." });
    }
  } else {
    process.exit(1);
  }
};
