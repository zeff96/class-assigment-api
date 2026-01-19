import { Collection, Db } from "mongodb";
export class CourseModel {
    collection;
    constructor(db) {
        this.collection = db.collection("courses");
    }
    async create(data) {
        try {
            await this.collection.insertOne({
                ...data,
                createdAt: new Date(),
            });
        }
        catch (error) { }
    }
    async findAll() {
        return await this.collection.find().toArray();
    }
    async findByName(name) {
        return await this.collection.findOne({ name });
    }
}
//# sourceMappingURL=course.model.js.map