import type { LocalStorageKey } from "@/constants/localStorageKey";
import type { ZodSchema, ZodTypeDef } from "zod";

export const enableLocalStorage = (): boolean => {
  try {
    localStorage.setItem("abc", "test");
    localStorage.getItem("abc");
    localStorage.removeItem("abc");
    return true;
  } catch (e) {
    return false;
  }
};

export enum LocalStorageUtilErrorReason {
  UNABLE_TO_USE_LOCAL_STORAGE = 0,
  DOES_NOT_FIND_ITEM = 1,
  CANNOT_PARSABLE = 2,
}

export type GetItemReturnType<
  // biome-ignore lint/suspicious/noExplicitAny: zod
  Output = any,
> =
  | {
      valid: true;
      value: Output;
    }
  | {
      valid: false;
      reason: LocalStorageUtilErrorReason;
    };

export const getItem = <
  // biome-ignore lint/suspicious/noExplicitAny: zod
  Output = any,
  Def extends ZodTypeDef = ZodTypeDef,
  Input = Output,
>(
  key: LocalStorageKey,
  expectedSchema: ZodSchema<Output, Def, Input>,
): GetItemReturnType<Output> => {
  if (!enableLocalStorage()) {
    return {
      valid: false,
      reason: LocalStorageUtilErrorReason.UNABLE_TO_USE_LOCAL_STORAGE,
    };
  }
  const item = localStorage.getItem(key);
  if (!item) {
    return {
      valid: false,
      reason: LocalStorageUtilErrorReason.DOES_NOT_FIND_ITEM,
    };
  }
  try {
    const json = JSON.parse(item);
    const parsed = expectedSchema.parse(json);
    return {
      valid: true,
      value: parsed,
    };
  } catch (e) {
    return {
      valid: false,
      reason: LocalStorageUtilErrorReason.CANNOT_PARSABLE,
    };
  }
};

export type SetItemReturnType =
  | {
      valid: true;
    }
  | {
      valid: false;
      reason:
        | LocalStorageUtilErrorReason.UNABLE_TO_USE_LOCAL_STORAGE
        | LocalStorageUtilErrorReason.CANNOT_PARSABLE;
    };

export const setItem = (
  key: LocalStorageKey,
  value: unknown,
): SetItemReturnType => {
  if (!enableLocalStorage()) {
    return {
      valid: false,
      reason: LocalStorageUtilErrorReason.UNABLE_TO_USE_LOCAL_STORAGE,
    };
  }
  try {
    const stringified = JSON.stringify(value);
    localStorage.setItem(key, stringified);
    return {
      valid: true,
    };
  } catch (e) {
    return {
      valid: false,
      reason: LocalStorageUtilErrorReason.CANNOT_PARSABLE,
    };
  }
};

export type RemoveItemReturnType =
  | {
      valid: true;
    }
  | {
      valid: false;
      reason: LocalStorageUtilErrorReason.UNABLE_TO_USE_LOCAL_STORAGE;
    };

export const removeItem = (key: LocalStorageKey): RemoveItemReturnType => {
  if (!enableLocalStorage()) {
    return {
      valid: false,
      reason: LocalStorageUtilErrorReason.UNABLE_TO_USE_LOCAL_STORAGE,
    };
  }
  localStorage.removeItem(key);
  return { valid: true };
};
