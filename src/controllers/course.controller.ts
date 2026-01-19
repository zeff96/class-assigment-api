import type { Request, Response } from "express";
import { CourseModel } from "../models/course.model.js";

export class CourseController {
  constructor(private courseModel: CourseModel) {}

  createCourse = async(req: Request, res: Response) =>{
    const result = await this.courseModel.create(req.body);
    res.status(201).json(result);
  }

  getAllCourses = async(_req: Request, res: Response) => {
    const courses = await this.courseModel.findAll();
    res.status(200).json(courses);
  }

  findByName = async(req: Request, res: Response) =>{
    const course = await this.courseModel.findByName(req.body);
    res.status(200).json(course);
  }
}
