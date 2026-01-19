import { Router } from "express";
import { middlewareValidator } from "../middleware/validate.js";
import { courseSchema } from "../schemas/course.schemas.js";
import { CourseController } from "../controllers/course.controller.js";
import { CourseModel } from "../models/course.model.js";
import { connectDB } from "../config/db.config.js";
const db = await connectDB();
const courseModel = new CourseModel(db);
const courseController = new CourseController(courseModel);
const router = Router();
router.post("/", middlewareValidator(courseSchema), courseController.createCourse);
router.get("/", courseController.getAllCourses);
export default router;
//# sourceMappingURL=course.routes.js.map