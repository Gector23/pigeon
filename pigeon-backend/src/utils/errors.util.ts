import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import logger from "./logger.util";

export class BackendError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message || "Something went wrong when processing the request.");
    this.statusCode = statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
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
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Something went wrong." });
    }
  } else {
    process.exit(1);
  }
};
