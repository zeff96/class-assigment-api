import { Router } from "express";
import { middlewareValidator } from "../middleware/validate.js";
import { courseIdParams, courseSchema } from "../schemas/course.schemas.js";
import { CourseController } from "../controllers/course.controller.js";
import { CourseModel } from "../models/course.model.js";
import { connectDB } from "../config/db.config.js";
import { paramSchemaName } from "../schemas/course.params.schema.js";
import { CourseServices } from "../services/course.service.js";
import { catchAsync } from "../utils/catchAsync.js";

const db = await connectDB();
const courseModel = new CourseModel(db);
const courseService = new CourseServices(courseModel);
const courseController = new CourseController(courseService);

const router: Router = Router();

router.post(
  "/",
  middlewareValidator({ body: courseSchema }),
  catchAsync(courseController.createCourse),
);
router.get("/", catchAsync(courseController.getAllCourses));
router.get(
  "/:name",
  middlewareValidator({ params: paramSchemaName }),
  catchAsync(courseController.findByName),
);
router.patch(
  "/:id",
  middlewareValidator({ params: courseIdParams }),
  catchAsync(courseController.updateCourse),
);
router.delete(
  "/:id",
  middlewareValidator({ params: courseIdParams }),
  catchAsync(courseController.deleteCourse),
);

export default router;
