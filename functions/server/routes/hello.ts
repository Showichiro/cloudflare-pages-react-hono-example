import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { factory } from "../util/appFactory";

export const helloApp = factory().get(
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
