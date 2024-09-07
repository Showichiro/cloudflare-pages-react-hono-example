import { z } from "zod";
import { fetcher } from "../../util/fetcher";

const WELL_KNOWN =
  "https://accounts.google.com/.well-known/openid-configuration" as const;

export const wellKnownSchema = z.object({
  issuer: z.string(),
  authorization_endpoint: z.string(),
  device_authorization_endpoint: z.string(),
  token_endpoint: z.string(),
  userinfo_endpoint: z.string(),
  revocation_endpoint: z.string(),
  jwks_uri: z.string(),
  response_types_supported: z.array(z.string()),
  subject_types_supported: z.array(z.string()),
  id_token_signing_alg_values_supported: z.array(z.string()),
  scopes_supported: z.array(z.string()),
  token_endpoint_auth_methods_supported: z.array(z.string()),
  claims_supported: z.array(z.string()),
  code_challenge_methods_supported: z.array(z.string()),
  grant_types_supported: z.array(z.string()),
});

export type WellKnownSchemaType = z.TypeOf<typeof wellKnownSchema>;

export const fetchWellKnown = async () => {
  const result = await fetcher({
    request: { url: WELL_KNOWN },
    response: { schema: wellKnownSchema },
  });
  return result;
};
