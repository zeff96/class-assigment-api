import { Router } from "express";
import { middlewareValidator, type Schemas } from "../middleware/validate.js";
import { courseSchema } from "../schemas/course.schemas.js";
import { CourseController } from "../controllers/course.controller.js";
import { CourseModel } from "../models/course.model.js";
import { connectDB } from "../config/db.config.js";
import { paramSchemaName } from "../schemas/course.params.schema.js";

const db = await connectDB();
const courseModel = new CourseModel(db);
const courseController = new CourseController(courseModel);

const router: Router = Router();

router.post(
  "/",
  middlewareValidator({ body: courseSchema }),
  courseController.createCourse,
);
router.get("/", courseController.getAllCourses);
router.get(
  "/:name",
  middlewareValidator({ params: paramSchemaName }),
  courseController.findByName,
);

export default router;
