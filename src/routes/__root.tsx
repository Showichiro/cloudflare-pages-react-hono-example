import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import type { QueryClient } from "@tanstack/react-query";
import {
  getItem,
  LocalStorageUtilErrorReason,
  removeItem,
  setItem,
} from "@/utils/localStorageUtil";
import { LocalStorageKey } from "@/constants/localStorageKey";
import { tokenInfoSchema } from "@/schemas/tokenInfo";
import { z } from "zod";

const rootSearchParamSchema = z
  .object({
    access_token: z.string(),
    refresh_token: z.string(),
  })
  .or(z.object({}));

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  component: () => <Outlet />,
  validateSearch: (search) => rootSearchParamSchema.parse(search),
  beforeLoad: ({ search }) => {
    if ("access_token" in search) {
      setItem(LocalStorageKey.tokenInfo, search);
      return;
    }
    const itemResult = getItem(LocalStorageKey.tokenInfo, tokenInfoSchema);
    if (!itemResult.valid) {
      switch (itemResult.reason) {
        case LocalStorageUtilErrorReason.UNABLE_TO_USE_LOCAL_STORAGE:
          throw new Error();
        case LocalStorageUtilErrorReason.CANNOT_PARSABLE:
        case LocalStorageUtilErrorReason.DOES_NOT_FIND_ITEM:
          if (
            itemResult.reason === LocalStorageUtilErrorReason.CANNOT_PARSABLE
          ) {
            removeItem(LocalStorageKey.tokenInfo);
          }
          window.location.href = "/api/auth/login";
      }
    }
  },
});
