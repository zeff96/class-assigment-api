import z from "zod/v4";

export const courseSchema = z.object({
  name: z.string().min(2, "Must be atleast 2 characters long"),
  code: z.string().min(2, "Must be atleast 2 characters long"),
  semester: z.string().min(1, "Must be atleast 1 characters long"),
});

const updateCourseSchema = courseSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "Atleast one field must be provided",
  });

const courseIdParams = z.object({
  id: z.string().min(1),
});

export type CreateCourseInput = z.infer<typeof courseSchema>;

export type UpdateCourseSchema = z.infer<typeof updateCourseSchema>;
