import app from "./app.js";
import { client, connectDB } from "./config/db.config.js";
const PORT = process.env.PORT || 3000;
async function createServer() {
    try {
        const db = await connectDB();
        app.locals.db = db;
        const server = app.listen(PORT, () => {
            console.log(`Server started on port: ${PORT}`);
        });
        const shutdown = async (signal) => {
            console.log(`Received ${signal} server shutting down...`);
            try {
                server.close(async () => {
                    try {
                        await client.close();
                        console.log("MongoDB connection shutting down...");
                        process.exit(0);
                    }
                    catch (error) {
                        console.error(error);
                        process.exit(1);
                    }
                });
                process.on("SIGINT", () => shutdown("SIGINT"));
                process.on("SIGTERM", () => shutdown("SIGTERM"));
            }
            catch (error) {
                console.error(error);
                process.exit(1);
            }
        };
    }
    catch (error) {
        console.error(error);
        process.exit(1);
    }
}
createServer();
//# sourceMappingURL=server.js.map