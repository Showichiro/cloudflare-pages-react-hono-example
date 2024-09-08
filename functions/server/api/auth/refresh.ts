import { z } from "zod";
import { fetcher, HTTP_METHOD } from "../../util/fetcher";

export const refreshTokenParamSchema = z.object({
  client_secret: z.string(),
  grant_type: z.literal("refresh_token"),
  refresh_token: z.string(),
  client_id: z.string(),
});

export const refreshTokenResponse = z.object({
  access_token: z.string(),
  expires_in: z.number(),
  scope: z.string(),
  token_type: z.literal("Bearer"),
  id_token: z.string(),
});

export type RefreshTokenParam = z.TypeOf<typeof refreshTokenParamSchema>;

export const fetchTokenRefresh = (
  endpoint: string,
  params: Omit<RefreshTokenParam, "grant_type">,
) => {
  const result = fetcher({
    request: {
      url: endpoint,
      opt: {
        body: new URLSearchParams({
          ...params,
          grant_type: "refresh_token",
        } satisfies RefreshTokenParam),
        method: HTTP_METHOD.POST,
        headers: { "content-type": "application/x-www-form-urlencoded" },
      },
    },
    response: {
      schema: refreshTokenResponse,
    },
  });
  return result;
};
