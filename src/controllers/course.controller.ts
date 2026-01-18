import type { Request, Response } from "express";
import { Course } from "../models/course.model.js";

export async function createCourse(req: Request, res: Response) {
  try {
    const db = req.app.locals.db;

    const course = {
      ...req.body,
      createdAt: new Date(),
    };

    const result = await db.collection("courses").insertOne(course);
    res.status(201).json({ ...course, _id: result.insertedId.toHexString() });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error });
  }
}

async function fetchAllCourses(req: Request, res: Response) {
  try {
    const db = req.app.locals.db;
    const coursesLists = (await Course.fetchAllCourses(db)) ?? [];
    res.status(200).json(coursesLists);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error });
  }
}

async function findCourseByName(req: Request, res: Response) {
  try {
    const db = req.app.locals.db;
    const name = req.body;
    const course = await Course.findByName(name, db);
    if (course === null) {
      res.status(404).json({ message: `Course with name ${name} not found!` });
      return;
    }
    res.status(200).json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server error", error });
  }
}
