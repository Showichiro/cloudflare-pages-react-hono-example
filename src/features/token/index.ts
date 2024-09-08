import { LocalStorageKey } from "@/constants/localStorageKey";
import { getItem, removeItem, setItem } from "@/utils/localStorageUtil";
import { z } from "zod";

export const tokenSchema = z.object({
  access_token: z.string(),
  refresh_token: z.string(),
});

type TokenInfo = z.TypeOf<typeof tokenSchema>;

export const getSavedToken = () => {
  const itemResult = getItem(LocalStorageKey.tokenInfo, tokenSchema);
  return itemResult;
};

export const saveToken = (info: TokenInfo) => {
  setItem(LocalStorageKey.tokenInfo, info);
};

export const removeSavedToken = () => {
  removeItem(LocalStorageKey.tokenInfo);
};
