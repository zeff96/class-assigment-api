import { AppError } from "../app.error.js";
import type { AssignmentModel } from "../models/assignment.model.js";
import type { CourseModel } from "../models/course.model.js";
import {
  assignmentResponseSchema,
  listAssignmentSchema,
  type CreateAssignmentInput,
  type IResponseAssignment,
  type ListAssignmentResponse,
  type UpdateAssignmentInput,
} from "../schemas/assignment.schema.js";

export class AssignmentServices {
  constructor(
    private assignmentModel: AssignmentModel,
    private courseModel: CourseModel,
  ) {}

  async createNewAssignment(
    id: string,
    rawData: CreateAssignmentInput,
  ): Promise<IResponseAssignment> {
    const existingCourse = await this.courseModel.findById(id);
    if (!existingCourse) {
      throw new AppError("Course not found!", 404);
    }

    const result = await this.assignmentModel.create(rawData);
    return assignmentResponseSchema.parse(result);
  }

  async findAllAssignments(id: string): Promise<ListAssignmentResponse> {
    const result = await this.assignmentModel.findAll(id);

    return listAssignmentSchema.parse(result);
  }

  async updateAssignmentById(
    id: string,
    rawData: UpdateAssignmentInput,
  ): Promise<IResponseAssignment> {
    const dbUpdate = await this.assignmentModel.updateById(id, rawData);
    if (!dbUpdate) {
      throw new AppError("Assignment not found!", 404);
    }

    return assignmentResponseSchema.parse(dbUpdate);
  }

  async deleteAssignmentById(id: string) {
    await this.assignmentModel.deleteById(id);
  }
}
