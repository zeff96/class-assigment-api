import { ObjectId, Collection, Db } from "mongodb";
import type {
  CreateAssignmentInput,
  IAssignment,
  UpdateAssignmentInput,
} from "../schemas/assignment.schema.js";

export class AssignmentModel {
  private collection: Collection<IAssignment>;
  constructor(db: Db) {
    this.collection = db.collection("assignments");
  }

  async create(
    id: string,
    rawData: CreateAssignmentInput,
  ): Promise<IAssignment> {
    const now = new Date();
    const assignment: IAssignment = {
      ...rawData,
      _id: new ObjectId(),
      courseId: new ObjectId(id),
      createdAt: now,
      updatedAt: now,
    };

    await this.collection.insertOne(assignment);
    return assignment;
  }

  async findAll(id: string): Promise<IAssignment[]> {
    return await this.collection.find({ courseId: new ObjectId(id) }).toArray();
  }

  async updateById(
    id: string,
    rawData: UpdateAssignmentInput,
  ): Promise<IAssignment | null> {
    const { title, description, status, dueDate } = rawData;

    const updatePayload: Partial<IAssignment> = {
      updatedAt: new Date(),
    };
    if (title) updatePayload.title = title;
    if (description) updatePayload.description = description;
    if (dueDate) updatePayload.dueDate = dueDate;
    if (status) updatePayload.status = status;

    const doc = await this.collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: updatePayload },
      { returnDocument: "after" },
    );

    return doc;
  }

  async deleteById(id: string): Promise<void> {
    await this.collection.deleteOne({ _id: new ObjectId(id) });
  }
}
