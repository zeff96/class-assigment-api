import { CourseModel } from "../models/course.model.js";
export class CourseController {
    courseModel;
    constructor(courseModel) {
        this.courseModel = courseModel;
    }
    createCourse = async (req, res) => {
        const result = await this.courseModel.create(req.body);
        res.status(201).json(result);
    };
    getAllCourses = async (_req, res) => {
        const courses = await this.courseModel.findAll();
        res.status(200).json(courses);
    };
    findByName = async (req, res) => {
        const course = await this.courseModel.findByName(req.body);
        res.status(200).json(course);
    };
}
//# sourceMappingURL=course.controller.js.map