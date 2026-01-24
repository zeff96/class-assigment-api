import z from "zod/v4";
import { objectIdSchema, objectIdSchemaUnion } from "../utils/schema.utils.js";
import type { ObjectId } from "mongodb";

const createAssignmentSchema = z.object({
  courseId: objectIdSchema,
  title: z.string().min(4, "must be atleast 4 characters long"),
  description: z
    .string()
    .min(10, "Must be atleast 10 characters long")
    .optional(),
  dueDate: z.coerce.date(),
  status: z.enum(["pending", "submitted", "graded"]).default("pending"),
});

const updateAssignmentSchema = z
  .object({
    title: z.string().min(4, "must be atleast 4 characters long").optional(),
    description: z
      .string()
      .min(10, "Must be atleast 10 characters long")
      .optional(),
    dueDate: z.coerce.date().optional(),
    status: z.enum(["pending", "submitted", "graded"]).optional(),
  })
  .refine(
    (val) => Object.keys(val).length > 0,
    "Atleast one field must be provided",
  );

const assignmentResponseSchema = createAssignmentSchema.extend({
  _id: objectIdSchemaUnion,
  createdAt: z.coerce.date(),
  updateAt: z.coerce.date(),
});

const listAssignmentSchema = z.array(assignmentResponseSchema);
const assignmentIdParam = z.object({
  id: z.string().min(1),
});

type CreateAssignmentInput = z.infer<typeof createAssignmentSchema>;
type UpdateAssignmentInput = z.infer<typeof updateAssignmentSchema>;

interface IAssignment extends CreateAssignmentInput {
  _id: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export {
  createAssignmentSchema,
  assignmentResponseSchema,
  listAssignmentSchema,
  assignmentIdParam,
  updateAssignmentSchema,
  type CreateAssignmentInput,
  type UpdateAssignmentInput,
  type IAssignment,
};
