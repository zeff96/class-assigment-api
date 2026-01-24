import { Collection, Db, ObjectId } from "mongodb";
import type {
  CreateCourseInput,
  ICourse,
  UpdateCourseInput,
} from "../schemas/course.schemas.js";

export class CourseModel {
  private collection: Collection<ICourse>;
  constructor(db: Db) {
    this.collection = db.collection("courses");
  }

  async create(data: CreateCourseInput) {
    const now = new Date();
    const doc: ICourse = {
      ...data,
      _id: new ObjectId(),
      createdAt: now,
      updatedAt: now,
    };

    await this.collection.insertOne(doc);
    return doc;
  }

  async findAll() {
    return await this.collection.find().toArray();
  }

  async findByName(name: string) {
    return await this.collection.findOne({ name });
  }

  async findById(id: string) {
    return await this.collection.findOne({ _id: new ObjectId(id) });
  }

  async update(id: string, data: UpdateCourseInput) {
    const { name, code, semester } = data;

    const now = new Date();

    const updatePayload: Partial<ICourse> = {
      updatedAt: now,
    };
    if (name) updatePayload.name = name;
    if (code) updatePayload.code = code;
    if (semester) updatePayload.semester = semester;

    const result = await this.collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: updatePayload },
      { returnDocument: "after" },
    );

    return result;
  }

  async deleteById(id: string) {
    await this.collection.deleteOne({ _id: new ObjectId(id) });
  }
}
