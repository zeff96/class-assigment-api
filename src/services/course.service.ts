import type { CourseModel } from "../models/course.model.js";
import {
  listResponseSchema,
  responseSchema,
  type CreateCourseInput,
  type ICourse,
  type ICourseResponse,
  type UpdateCourseInput,
} from "../schemas/course.schemas.js";

export class CourseServices {
  constructor(private courseModel: CourseModel) {}

  async findCourseByName(name: string): Promise<ICourseResponse> {
    const result = await this.courseModel.findByName(name);
    if (!result) {
      const error = new Error("Course not found!");
      (error as any).statusCode = 404;
      throw error;
    }
    return responseSchema.parse(result);
  }

  async findAllCourses(): Promise<ICourseResponse[]> {
    const result = await this.courseModel.findAll();
    return listResponseSchema.parse(result);
  }

  async createNewCourse(rawData: CreateCourseInput): Promise<ICourseResponse> {
    const existing = await this.findCourseByName(rawData.name);
    if (existing) {
      const error = new Error("Course already exists!");
      (error as any).statusCode = 409;
      throw error;
    }

    const dbResult: ICourse = await this.courseModel.create(rawData);

    return responseSchema.parse(dbResult);
  }

  async updateExistingCourse(
    id: string,
    rawData: UpdateCourseInput,
  ): Promise<ICourseResponse> {
    const dbUpdate = await this.courseModel.update(id, rawData);
    if (!dbUpdate) {
      const error = new Error("Course not found!");
      (error as any).statusCode = 404;
    }
    return responseSchema.parse(dbUpdate);
  }

  async deleteExistingCourse(name: string): Promise<void> {
    const existing = await this.courseModel.findByName(name);
    if (!existing) {
      const error = new Error("Course not found!");
      (error as any).statusCode = 404;
      throw error;
    }
    await this.courseModel.deleteCourse(existing.name);
  }
}
