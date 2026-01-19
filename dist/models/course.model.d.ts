import { Db } from "mongodb";
export declare class CourseModel {
    private collection;
    constructor(db: Db);
    create(data: any): Promise<void>;
    findAll(): Promise<import("mongodb").WithId<import("mongodb").Document>[]>;
    findByName(name: string): Promise<import("mongodb").WithId<import("mongodb").Document> | null>;
}
//# sourceMappingURL=course.model.d.ts.map