import type { DrizzleD1Database } from "drizzle-orm/d1";
import type * as schema from "../db/schema";
import type { WellKnownSchemaType } from "../api/auth/wellknown";
import type { TokenInfo } from "../api/auth/tokenInfo";

export type Env = {
  Variables: {
    db: DrizzleD1Database<typeof schema>;
    authInfo: {
      wellKnown: WellKnownSchemaType;
    };
    tokenInfo: TokenInfo;
  };
  Bindings: {
    DB: D1Database;
    CLIENT_ID: string;
    CLIENT_SECRET: string;
    REDIRECT_URI: string;
  };
};
