import { ClassConstructor, plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { ValidationError } from "../utils/errors.util";

const validationMiddleware =
  <T extends object>(reqBodyShema: ClassConstructor<T>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const convertedReqBody = plainToInstance(reqBodyShema, req.body);
    const reqBodyValidationErrors = await validate(convertedReqBody);
    if (reqBodyValidationErrors.length) {
      return next(new ValidationError(Object.values(reqBodyValidationErrors[0].constraints ?? [])[0]));
    }
    return next();
  };

export default validationMiddleware;
