import { zValidator } from "@hono/zod-validator";
import { users } from "../db/schema";
import { factory } from "../util/appFactory";
import { z } from "zod";

export const usersApp = factory()
  .get("/", async (c) => {
    const result = await c.var.db.select().from(users);
    return c.json(result);
  })
  .post(
    "/",
    zValidator(
      "json",
      z.object({
        name: z.string(),
      }),
    ),
    async (c) => {
      const { name } = c.req.valid("json");
      const result = await c.var.db.insert(users).values({ name }).returning();
      return c.json(result[0], 201);
    },
  );
