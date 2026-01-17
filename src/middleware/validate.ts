import type { Request, Response, NextFunction } from "express";
import { ZodType } from "zod";

export function middlewareValidator<T>(schema: ZodType<T>) {
  return function validator(
    req: Request<{}, {}, T>,
    _res: Response,
    next: NextFunction,
  ) {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      next(error);
    }
  };
}
