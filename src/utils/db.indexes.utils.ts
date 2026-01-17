import type { Db } from "mongodb";

export async function createDbIndexes(db: Db) {
  // create course indexes
  await db.collection("courses").createIndex({ name: 1 }, { unique: true });
}
