import type { ZodSchema, ZodTypeDef } from "zod";

export enum ErrorReason {
  FAILED_TO_FETCH = 0,
  STATUS_IS_NOT_OK = 1,
  CANNOT_PARSABLE = 2,
}

export enum HTTP_METHOD {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
  PATCH = "PATCH",
}

export type FetcherReturnType<
  // biome-ignore lint/suspicious/noExplicitAny: zod
  Output = any,
> =
  | {
      valid: true;
      response: Output;
    }
  | {
      valid: false;
      reason: ErrorReason;
    };

export const fetcher = async <
  // biome-ignore lint/suspicious/noExplicitAny: zod
  Output = any,
  Def extends ZodTypeDef = ZodTypeDef,
  Input = Output,
>(param: {
  request: {
    url: string;
    opt?: {
      method?: HTTP_METHOD;
      body?: RequestInit["body"];
      headers?: RequestInit["headers"];
      query?: URLSearchParams;
    };
  };
  response: {
    schema: ZodSchema<Output, Def, Input>;
  };
}): Promise<FetcherReturnType<Output>> => {
  try {
    const url =
      param.request.opt?.query != null
        ? `${param.request.url}?${param.request.opt.query}`
        : param.request.url;
    const res = await fetch(url, param.request.opt);
    if (!res.ok) {
      return { valid: false, reason: ErrorReason.STATUS_IS_NOT_OK };
    }
    try {
      const rawJson = await res.json();
      const parsed = param.response.schema.parse(rawJson);
      return { valid: true, response: parsed };
    } catch (e) {
      return { valid: false, reason: ErrorReason.CANNOT_PARSABLE };
    }
  } catch (e) {
    console.error(e);
    return {
      valid: false,
      reason: ErrorReason.FAILED_TO_FETCH,
    };
  }
};
