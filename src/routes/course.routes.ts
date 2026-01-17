import { Router } from "express";
import { middlewareValidator } from "../middleware/validate.js";
import { courseSchema } from "../schemas/course.schemas.js";
import { createCourse } from "../controllers/course.controller.js";

const router: Router = Router();

router.post("/", middlewareValidator(courseSchema), createCourse);

export default router;
