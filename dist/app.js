import express, {} from "express";
import cors from "cors";
const app = express();
app.use(cors);
app.use(express.json);
app.use(express.urlencoded({ extended: true }));
app.use((err, _req, res, _next) => {
    console.error(err.stack);
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        status: "error",
        message: process.env.NODE_ENV === "production"
            ? "Internal Server Error"
            : err.message,
    });
});
export default app;
//# sourceMappingURL=app.js.map