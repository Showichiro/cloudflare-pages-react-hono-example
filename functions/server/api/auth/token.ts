import { z } from "zod";
import { fetcher, HTTP_METHOD } from "../../util/fetcher";

export const TokenParamSchema = z.object({
  client_id: z.string(),
  client_secret: z.string(),
  grant_type: z.literal("authorization_code"),
  code: z.string(),
  redirect_uri: z.string(),
});

type TokenParam = z.TypeOf<typeof TokenParamSchema>;

const tokenEndpointSchema = z.object({
  access_token: z.string(),
  refresh_token: z.string(),
  id_token: z.string(),
  expires_in: z.number(),
  scope: z.string().or(z.null()),
  token_type: z.literal("Bearer"),
});

export const fetchToken = async (
  tokenEndpoint: string,
  param: Omit<TokenParam, "grant_type">,
) => {
  const result = await fetcher({
    request: {
      url: tokenEndpoint,
      opt: {
        body: new URLSearchParams({
          ...param,
          grant_type: "authorization_code",
        } satisfies TokenParam),
        headers: { "content-type": "application/x-www-form-urlencoded" },
        method: HTTP_METHOD.POST,
      },
    },
    response: { schema: tokenEndpointSchema },
  });
  return result;
};
