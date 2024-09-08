import { type Fetcher, honoClient } from "@/utils/honoClient";

export const refreshToken: Fetcher<typeof honoClient.api.auth.refresh.$post> = (
  opt,
) => honoClient.api.auth.refresh.$post(opt.args, {}).then((res) => res.json());
