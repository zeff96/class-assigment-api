import type { Request, Response } from "express";
import type { AssignmentServices } from "../services/assignment.services.js";
import type {
  CreateAssignmentInput,
  UpdateAssignmentInput,
} from "../schemas/assignment.schema.js";

export class AssignmentController {
  constructor(private assignmentServices: AssignmentServices) {}

  createNewAssignment = async (
    req: Request<{ id: string }, {}, CreateAssignmentInput>,
    res: Response,
  ) => {
    const { params, body } = req;
    const result = await this.assignmentServices.createNewAssignment(
      params.id,
      body,
    );
    res.status(201).json(result);
  };

  findAllAssignments = async (req: Request<{ id: string }>, res: Response) => {
    const { params } = req;
    const result = await this.assignmentServices.findAllAssignments(params.id);
    res.status(200).json(result);
  };

  updateAssignmentById = async (
    req: Request<{ id: string }, {}, UpdateAssignmentInput>,
    res: Response,
  ) => {
    const { params, body } = req;
    const result = await this.assignmentServices.updateAssignmentById(
      params.id,
      body,
    );
    res.status(200).json(result);
  };

  deleteAssignmentById = async (
    req: Request<{ id: string }>,
    res: Response,
  ) => {
    const { params } = req;
    await this.assignmentServices.deleteAssignmentById(params.id);
    res.status(204).send();
  };
}
