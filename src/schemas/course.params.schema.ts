import z from "zod/v4";

const paramSchemaName = z.object({
  name: z.string().min(1),
});
