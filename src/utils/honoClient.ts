import { hc } from "hono/client";
import type { AppType } from "../../functions/api/[[route]]";

export const honoClient = hc<AppType>("/");
