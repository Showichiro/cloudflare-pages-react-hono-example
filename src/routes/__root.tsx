import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import type { QueryClient } from "@tanstack/react-query";
import { LocalStorageUtilErrorReason } from "@/utils/localStorageUtil";
import { getSavedToken, removeSavedToken, saveToken } from "@/features/token";
import { z } from "zod";

const rootSearchSchema = z.object({
  access_token: z.string().optional(),
  refresh_token: z.string().optional(),
});

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  component: () => <Outlet />,
  validateSearch: (search) => rootSearchSchema.parse(search),
  beforeLoad: ({ search }) => {
    if (search.access_token && search.refresh_token) {
      saveToken({
        access_token: search.access_token,
        refresh_token: search.refresh_token,
      });
    }
    const itemResult = getSavedToken();
    if (!itemResult.valid) {
      switch (itemResult.reason) {
        case LocalStorageUtilErrorReason.UNABLE_TO_USE_LOCAL_STORAGE:
          throw new Error();
        case LocalStorageUtilErrorReason.CANNOT_PARSABLE:
        case LocalStorageUtilErrorReason.DOES_NOT_FIND_ITEM:
          if (
            itemResult.reason === LocalStorageUtilErrorReason.CANNOT_PARSABLE
          ) {
            removeSavedToken();
          }
          window.location.href = "/api/auth/login";
      }
    }
  },
});
