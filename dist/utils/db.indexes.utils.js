export async function createDbIndexes(db) {
    // create course indexes
    await db.collection("courses").createIndex({ name: 1 }, { unique: true });
}
//# sourceMappingURL=db.indexes.utils.js.map