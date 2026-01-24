import { ObjectId } from "mongodb";
import z from "zod/v4";
import { objectIdSchemaUnion } from "../utils/schema.utils.js";

// schemas

export const courseSchema = z.object({
  name: z.string().min(2, "Must be atleast 2 characters long"),
  code: z.string().min(2, "Must be atleast 2 characters long"),
  semester: z.string().min(1, "Must be atleast 1 characters long"),
});

const updateCourseSchema = courseSchema
  .partial()
  .refine(
    (data) => Object.keys(data).length > 0,
    "Atleast one field must be provided",
  );

export const courseIdParams = z.object({
  id: z.string().min(1),
});

export const responseSchema = courseSchema.extend({
  _id: objectIdSchemaUnion,
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const listResponseSchema = z.array(responseSchema);

// types

export type CreateCourseInput = z.infer<typeof courseSchema>;

export interface ICourse extends CreateCourseInput {
  _id: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
export type ICourseResponse = z.infer<typeof responseSchema>;

export type UpdateCourseInput = z.infer<typeof updateCourseSchema>;
