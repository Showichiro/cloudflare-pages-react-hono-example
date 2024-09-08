import { honoClient } from "@/utils/honoClient";
import type { InferRequestType } from "hono";

const { $get } = honoClient.api.hello;

export const getHello = (args: InferRequestType<typeof $get>) =>
  $get(args).then((v) => v.json());
