import { Db, MongoClient, ServerApiVersion } from "mongodb";
const uri = process.env.MONGO_URI;
export const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});
export async function connectDB() {
    try {
        await client.connect();
        const db = client.db();
        return db;
    }
    catch (error) {
        console.error(error);
        process.exit(1);
    }
}
//# sourceMappingURL=db.config.js.map