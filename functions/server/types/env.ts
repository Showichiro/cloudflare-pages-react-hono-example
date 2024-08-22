import type { DrizzleD1Database } from "drizzle-orm/d1";
import type * as schema from "../db/schema";

export type Env = {
  Variables: {
    db: DrizzleD1Database<typeof schema>;
  };
  Bindings: {
    DB: D1Database;
  };
};
