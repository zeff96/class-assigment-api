import { Router } from "express";
import type { Db } from "mongodb";
import { AssignmentModel } from "../models/assignment.model.js";
import { AssignmentServices } from "../services/assignment.services.js";
import type { CourseModel } from "../models/course.model.js";
import { AssignmentController } from "../controllers/assignment.controller.js";
import { middlewareValidator } from "../middleware/validate.js";
import {
  assignmentIdParam,
  createAssignmentSchema,
} from "../schemas/assignment.schema.js";
import { catchAsync } from "../utils/catchAsync.js";
import { courseIdParams } from "../schemas/course.schemas.js";

export function setupAssignmentRoutes(
  db: Db,
  courseModel: CourseModel,
): Router {
  // router
  const router: Router = Router();

  // models, services and controller
  const assignmentModel = new AssignmentModel(db);
  const assignmentServices = new AssignmentServices(
    assignmentModel,
    courseModel,
  );
  const assignmentController = new AssignmentController(assignmentServices);

  // api endpoints
  router.post(
    "/:courseId/assignments",
    middlewareValidator({ body: createAssignmentSchema }),
    catchAsync(assignmentController.createNewAssignment),
  );

  router.get(
    "/:courseId/assignments",
    middlewareValidator({ params: courseIdParams }),
    catchAsync(assignmentController.findAllAssignments),
  );

  router.patch(
    "/:assignmentId",
    middlewareValidator({ params: assignmentIdParam }),
    catchAsync(assignmentController.updateAssignmentById),
  );

  router.delete(
    "/:assignmentId",
    middlewareValidator({ params: assignmentIdParam }),
    catchAsync(assignmentController.deleteAssignmentById),
  );

  return router;
}
