import { zValidator } from "@hono/zod-validator";
import { articles } from "../../db/schema";
import { z } from "zod";
import { and, eq } from "drizzle-orm";
import { Hono } from "hono";
import type { Env } from "../../types/env";

export const articlesApp = new Hono<Env>()
  .get("/", async (c) => {
    const { sub } = c.get("tokenInfo");
    const result = await c.var.db
      .select()
      .from(articles)
      .where(eq(articles.sub, sub));
    return c.json(result);
  })
  .post(
    "/",
    zValidator(
      "json",
      z.object({
        title: z.string(),
        content: z.string(),
      }),
    ),
    async (c) => {
      const { sub } = c.get("tokenInfo");
      const { title, content } = c.req.valid("json");
      const result = await c.var.db
        .insert(articles)
        .values({ title, content, sub })
        .returning();
      return c.json(result[0], 201);
    },
  )
  .put(
    "/:id",
    zValidator(
      "json",
      z.object({
        title: z.string().optional(),
        content: z.string().optional(),
      }),
    ),
    async (c) => {
      const { sub } = c.get("tokenInfo");
      const id = c.req.param("id");
      const content = c.req.valid("json")?.content;
      const title = c.req.valid("json").content;
      await c.var.db
        .update(articles)
        .set({ id: Number(id), title, content })
        .where(and(eq(articles.id, Number(id)), eq(articles.sub, sub)));
      return c.json(null, 200);
    },
  )
  .delete("/:id", async (c) => {
    const { sub } = c.get("tokenInfo");
    const id = c.req.param("id");
    await c.var.db
      .delete(articles)
      .where(and(eq(articles.id, Number(id)), eq(articles.sub, sub)));
    return c.json(null, 200);
  });
