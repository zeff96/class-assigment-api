import type { Request, Response, NextFunction } from "express";
import { ZodType } from "zod";
export declare function middlewareValidator<T>(schema: ZodType<T>): (req: Request<{}, {}, T>, _res: Response, next: NextFunction) => void;
//# sourceMappingURL=validate.d.ts.map