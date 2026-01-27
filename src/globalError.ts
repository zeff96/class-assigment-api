import type { NextFunction, Request, Response } from "express";
import z, { ZodError } from "zod";

export function globalError(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (err.stack) {
    console.error(err);
  }

  if (err instanceof ZodError) {
    res.status(400).json({
      status: "error",
      message: z.prettifyError(err),
    });
  }

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    status: "error",
    message:
      process.env.NODE_ENV === "production"
        ? "Internal server error"
        : err.message,
  });
}
