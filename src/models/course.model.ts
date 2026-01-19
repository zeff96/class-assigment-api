import { Collection, Db } from "mongodb";

export class CourseModel {
  private collection: Collection;
  constructor(db: Db) {
    this.collection = db.collection("courses");
  }

  async create(data: any) {
    try {
      await this.collection.insertOne({
        ...data,
        createdAt: new Date(),
      });
    } catch (error) {}
  }

  async findAll() {
    return await this.collection.find().toArray();
  }

  async findByName(name: string) {
    return await this.collection.findOne({ name });
  }
}
