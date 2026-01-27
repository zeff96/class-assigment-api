import express, { type Express } from "express";
import cors from "cors";
import type { Db } from "mongodb";
import { setupCourseRoutes } from "./routes/course.routes.js";
import { CourseModel } from "./models/course.model.js";
import { setupAssignmentRoutes } from "./routes/assignment.routes.js";
import { globalError } from "./globalError.js";

export function initApp(db: Db): Express {
  const app: Express = express();

  const courseModel = new CourseModel(db);
  const courseRoutes = setupCourseRoutes(db, courseModel);
  const assignmentRoutes = setupAssignmentRoutes(db, courseModel);

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use("/api/v1/courses", courseRoutes);
  app.use("/api/v1/courses", assignmentRoutes);

  app.use(globalError);

  return app;
}
