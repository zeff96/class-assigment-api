import type { Request, Response, NextFunction } from "express";
import { ZodType } from "zod";

export type Schemas = {
  body?: ZodType<any>;
  params?: ZodType<Record<string, string>>;
  query?: ZodType<Record<string, string>>;
};

export function middlewareValidator(schemas: Schemas) {
  return function validator(req: Request, _res: Response, next: NextFunction) {
    try {
      if (schemas.body) {
        req.body = schemas.body.parse(req.body);
      }
      if (schemas.params) {
        req.params = schemas.params.parse(req.params);
      }
      if (schemas.query) {
        req.query = schemas.query.parse(req.query);
      }

      next();
    } catch (error) {
      next(error);
    }
  };
}
