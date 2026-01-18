import type { Request } from "express";
import type { Db } from "mongodb";
import type z from "zod";
import { courseSchema } from "../schemas/course.schemas.js";

export const Course = {
  async findByName(name: string, db: Db) {
    try {
      return await db.collection("courses").findOne({ name });
    } catch (error) {
      console.error(error);
    }
  },
  async createCourse(req: Request) {
    try {
      const db = req.app.locals.db;
      const course = {
        ...req.body,
        createdAt: new Date(),
      };
      await db.collection("courses").insertOne(course);
    } catch (error) {
      console.error(error);
    }
  },

  async fetchAllCourses(db: Db) {
    try {
      return await db.collection("courses").find({}).sort(-1).toArray();
    } catch (error) {
      console.error(error);
    }
  },

  async updateCourse(
    name: string,
    fieldsToUpdate: Partial<z.infer<typeof courseSchema>>,
    db: Db,
  ) {
    try {
      await db.collection("courses").updateOne({ name }, { ...fieldsToUpdate });
    } catch (error) {
      console.error(error);
    }
  },

  async deleteCourse(name: string, db: Db) {
    try {
      await db.collection("courses").deleteOne({ name });
    } catch (error) {
      console.error(error);
    }
  },
};
