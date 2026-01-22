import type { Request, Response } from "express";
import type {
  CreateCourseInput,
  UpdateCourseInput,
} from "../schemas/course.schemas.js";
import type { CourseServices } from "../services/course.service.js";

export class CourseController {
  constructor(private courseService: CourseServices) {}

  createCourse = async (
    req: Request<{}, {}, CreateCourseInput>,
    res: Response,
  ) => {
    const result = await this.courseService.createNewCourse(req.body);
    res.status(201).json(result);
  };

  getAllCourses = async (_req: Request, res: Response) => {
    const courses = await this.courseService.findAllCourses();
    res.status(200).json(courses);
  };

  findByName = async (req: Request<{ name: string }>, res: Response) => {
    const course = await this.courseService.findCourseByName(req.params.name);
    if (!course) {
      res.status(201).json({ message: "Course not found!" });
      return;
    }
    res.status(200).json(course);
  };

  updateCourse = async (
    req: Request<{ id: string }, {}, UpdateCourseInput>,
    res: Response,
  ) => {
    const result = await this.courseService.updateExistingCourse(
      req.params.id,
      req.body,
    );
    res.status(201).json(result);
  };

  deleteCourse = async (req: Request<{ id: string }>, res: Response) => {
    await this.courseService.deleteExistingCourse(req.params.id);
    res.status(204).json({ message: "Course deleted successfully!" });
  };
}
