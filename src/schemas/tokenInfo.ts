import { z } from "zod";

export const tokenInfoSchema = z.object({
  access_token: z.string(),
  refresh_token: z.string(),
});
