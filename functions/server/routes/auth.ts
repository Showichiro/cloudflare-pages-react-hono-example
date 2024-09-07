import { zValidator } from "@hono/zod-validator";
import { fetchToken } from "../api/auth/token";
import { fetchTokenRefresh } from "../api/auth/refresh";
import { z } from "zod";
import { Hono } from "hono";
import type { Env } from "../types/env";
import { tokens } from "../db/schema";
import { eq, and } from "drizzle-orm";
import { ErrorReason } from "../util/fetcher";

const authParamSchema = z.object({
  client_id: z.string(),
  response_type: z.literal("code"),
  scope: z.literal("openid email profile"),
  redirect_uri: z.string(),
  access_type: z.literal("offline"),
  state: z.string(),
});

type AuthParam = z.TypeOf<typeof authParamSchema>;

export const authApp = new Hono<Env>()
  .get("/login", async (c) => {
    const state = crypto.randomUUID();
    const { authorization_endpoint } = c.var.authInfo.wellKnown;
    const param = new URLSearchParams({
      client_id: c.env.CLIENT_ID,
      response_type: "code",
      redirect_uri: c.env.REDIRECT_URI,
      scope: "openid email profile",
      access_type: "offline",
      state,
    } satisfies AuthParam);

    return c.redirect(`${authorization_endpoint}?${param}`);
  })
  // TODO: state検証.
  .get(
    "/callback",
    zValidator(
      "query",
      z.object({
        code: z.string(),
        state: z.string(),
      }),
      (result, c) => {
        if (!result.success) {
          return c.text("login failed", 404);
        }
      },
    ),
    async (c) => {
      const code = c.req.valid("query").code;
      const tokenEndpoint = c.var.authInfo.wellKnown.token_endpoint;
      const tokenResult = await fetchToken(tokenEndpoint, {
        client_id: c.env.CLIENT_ID,
        client_secret: c.env.CLIENT_SECRET,
        redirect_uri: c.env.REDIRECT_URI,
        code,
      });

      if (!tokenResult.valid) {
        return c.text("failed to fetch token", 500);
      }

      await c.var.db.insert(tokens).values({
        accessToken: tokenResult.response.access_token,
        idToken: tokenResult.response.id_token,
        expiresIn: tokenResult.response.expires_in,
        refreshToken: tokenResult.response.refresh_token,
      });

      return c.redirect(
        `/?${new URLSearchParams({
          access_token: tokenResult.response.access_token,
          refresh_token: tokenResult.response.refresh_token,
        })}`,
      );
    },
  )
  .post(
    "/refresh",
    zValidator(
      "json",
      z.object({
        access_token: z.string(),
        refresh_token: z.string(),
      }),
      (result, c) => {
        if (!result.success) {
          return c.text("BadRequest", 400);
        }
      },
    ),
    async (c) => {
      const { access_token, refresh_token } = c.req.valid("json");
      const dbData = await c.var.db
        .select()
        .from(tokens)
        .where(
          and(
            eq(tokens.accessToken, access_token),
            eq(tokens.refreshToken, refresh_token),
          ),
        );
      const data = dbData.at(0);
      if (!data) {
        return c.text("BadRequest", 400);
      }
      const refreshResult = await fetchTokenRefresh(
        c.var.authInfo.wellKnown.token_endpoint,
        {
          client_id: c.env.CLIENT_ID,
          client_secret: c.env.CLIENT_SECRET,
          refresh_token,
        },
      );
      if (!refreshResult.valid) {
        if (refreshResult.reason === ErrorReason.STATUS_IS_NOT_OK) {
          return c.text("Bad Request", 400);
        }
        return c.text("Internal Server Error", 500);
      }
      await c.var.db
        .update(tokens)
        .set({ accessToken: refreshResult.response.access_token })
        .where(eq(tokens.id, data.id));
      return c.json({ access_token: refreshResult.response.access_token });
    },
  );
