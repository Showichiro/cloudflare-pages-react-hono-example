import { Hono } from "hono";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "../db/schema";
import type { Env } from "../types/env";

export const factory = () => {
  return new Hono<Env>().use(async (c, next) => {
    const db = drizzle(c.env.DB, { schema, logger: true });
    c.set("db", db);
    await next();
  });
};
