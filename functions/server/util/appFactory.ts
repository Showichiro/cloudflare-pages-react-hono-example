import { type Context, Hono } from "hono";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "../db/schema";
import type { Env } from "../types/env";
import { fetchWellKnown } from "../api/auth/wellknown";
import { fetchTokenInfo } from "../api/auth/tokenInfo";
import { bearerAuth } from "hono/bearer-auth";

export const factory = () => {
  return new Hono<Env>()
    .use(async (c, next) => {
      const db = drizzle(c.env.DB, { schema, logger: true });
      c.set("db", db);
      const wellKnown = await fetchWellKnown();
      if (!wellKnown.valid) {
        throw new Error("failed to set well-known");
      }
      c.set("authInfo", {
        wellKnown: wellKnown.response,
      });
      await next();
    })
    .use(
      "/api/authenticated/*",
      bearerAuth({
        verifyToken: async (token, c: Context<Env>) => {
          const result = await fetchTokenInfo(token);
          if (!result.valid || "error_description" in result.response) {
            return false;
          }
          c.set("tokenInfo", result.response);
          return true;
        },
      }),
    );
};
