import z from "zod";

export const courseSchema = z.object({
  name: z.string().min(2, "Must be atleast 2 characters long"),
  code: z.string().min(2, "Must be atleast 2 characters long"),
  semester: z.string().min(1, "Must be atleast 1 characters long"),
});
