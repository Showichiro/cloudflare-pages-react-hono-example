import { hc, type InferResponseType, type InferRequestType } from "hono/client";
import type { AppType } from "../../functions/api/[[route]]";
import { getSavedToken, saveToken } from "@/features/token";
import { refreshToken } from "@/features/token/api";

export const honoClient = hc<AppType>("/");

type Opt<T> = {
  args: InferRequestType<T>;
  token?: string;
};

export type Fetcher<T> = (opt: Opt<T>) => Promise<InferResponseType<T>>;

export const fetcherAuthWrapperFactory = <T>(
  fetcher: Fetcher<T>,
): Fetcher<T> => {
  return async (opt) => {
    const savedToken = getSavedToken();
    if (!savedToken.valid) {
      throw new Error();
    }
    const refreshed = await refreshToken({
      args: {
        json: {
          access_token: savedToken.value.access_token,
          refresh_token: savedToken.value.refresh_token,
        },
      },
    });
    if (typeof refreshed === "string") {
      throw new Error();
    }
    saveToken({ ...savedToken.value, access_token: refreshed.access_token });
    return fetcher({ args: opt.args, token: refreshed.access_token });
  };
};
