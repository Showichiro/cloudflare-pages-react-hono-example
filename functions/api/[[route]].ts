import { factory } from "../server/util/appFactory";
import { handle } from "hono/cloudflare-pages";
import { helloApp } from "../server/routes/hello";
import { articlesApp } from "../server/routes/authenticated/articles";
import { authApp } from "../server/routes/auth";
import { Hono } from "hono";
import type { Env } from "functions/server/types/env";

const app = factory()
  .basePath("/api")
  .route("/authenticated", new Hono<Env>().route("/articles", articlesApp))
  .route("/hello", helloApp)
  .route("/auth", authApp);

export type AppType = typeof app;

export const onRequest = handle(app);
