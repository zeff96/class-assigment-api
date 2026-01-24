import { ObjectId } from "mongodb";
import z from "zod/v4";

const objectIdSchema = z
  .string()
  .readonly()
  .refine((val) => ObjectId.isValid(val), { message: "Invalid ObjectId" })
  .transform((val) => new ObjectId(val));

const objectIdSchemaUnion = z
  .union([z.string(), z.instanceof(ObjectId)])
  .transform((val) => val.toString());

export { objectIdSchema, objectIdSchemaUnion };
