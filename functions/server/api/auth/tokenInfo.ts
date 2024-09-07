import { z } from "zod";
import { fetcher } from "../../util/fetcher";

const TOKEN_INFO_ENDPOINT = "https://oauth2.googleapis.com/tokeninfo" as const;

const tokenInfoValidSchema = z.object({
  azp: z.string(),
  aud: z.string(),
  sub: z.string(),
  scope: z.string(),
  exp: z.string(),
  expires_in: z.string(),
  email: z.string().optional(),
  email_verified: z.literal("true").or(z.literal("false")),
  access_type: z.string(),
});

const tokenInfoSchema = tokenInfoValidSchema.or(
  z.object({ error: z.string().optional(), error_description: z.string() }),
);

export type TokenInfoResponse = z.TypeOf<typeof tokenInfoSchema>;
export type TokenInfo = z.TypeOf<typeof tokenInfoValidSchema>;

export const fetchTokenInfo = (token: string) => {
  const result = fetcher({
    request: {
      url: TOKEN_INFO_ENDPOINT,
      opt: { query: new URLSearchParams({ access_token: token }) },
    },
    response: { schema: tokenInfoSchema },
  });
  return result;
};
