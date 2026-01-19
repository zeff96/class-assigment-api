import type { Request, Response } from "express";
import { CourseModel } from "../models/course.model.js";
export declare class CourseController {
    private courseModel;
    constructor(courseModel: CourseModel);
    createCourse: (req: Request, res: Response) => Promise<void>;
    getAllCourses: (_req: Request, res: Response) => Promise<void>;
    findByName: (req: Request, res: Response) => Promise<void>;
}
//# sourceMappingURL=course.controller.d.ts.map