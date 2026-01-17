export async function createCourse(req, res) {
    try {
        const db = req.app.locals.db;
        const course = {
            ...req.body,
            createdAt: new Date(),
        };
        const result = await db.collection("courses").insertOne(course);
        res.status(201).json({ ...course, _id: result.insertedId.toHexString() });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error", error });
    }
}
//# sourceMappingURL=course.controller.js.map