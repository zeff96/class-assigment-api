import type { Db } from "mongodb";

declare global {
  namespace Express {
    interface Locals {
      db: Db;
    }
  }
}
