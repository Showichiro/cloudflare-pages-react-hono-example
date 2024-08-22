import { factory } from "../server/util/appFactory";
import { handle } from "hono/cloudflare-pages";
import { helloApp } from "../server/routes/hello";
import { usersApp } from "../server/routes/users";

const app = factory()
  .basePath("/api")
  .route("/hello", helloApp)
  .route("/users", usersApp);

export type AppType = typeof app;

export const onRequest = handle(app);
