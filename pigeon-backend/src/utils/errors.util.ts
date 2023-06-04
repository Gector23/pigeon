import { Response } from "express";
import { StatusCodes } from "http-status-codes";

export class BackendError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message || "Something went wrong when processing the request.");
    this.statusCode = statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  }
}

export const handelError = (error: Error | BackendError, res?: Response) => {
  // eslint-disable-next-line no-console
  console.error(error);

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
