import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { Hono, type Env } from "hono";

export const helloApp = new Hono<Env>().get(
  "/",
  zValidator(
    "query",
    z.object({
      name: z.string(),
    }),
  ),
  (c) => {
    const { name } = c.req.valid("query");
    return c.json({
      message: `Hello ${name}!`,
    });
  },
);
