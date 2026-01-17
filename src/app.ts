import express, {
  type Express,
  type NextFunction,
  type Request,
  type Response,
} from "express";
import cors from "cors";
import z, { ZodError } from "zod";
import courseRoutes from "./routes/course.routes.js";

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/courses", courseRoutes);

app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);

  if (err instanceof ZodError) {
    res.status(400).json({
      status: "error",
      errors: z.prettifyError(err),
    });
    return;
  }

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    status: "error",
    message:
      process.env.NODE_ENV === "production"
        ? "Internal Server Error"
        : err.message,
  });
});

export default app;
