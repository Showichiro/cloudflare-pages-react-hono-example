import { honoClient } from "@/utils/honoClient";

export const getHello = (name: string) =>
  honoClient.api.hello.$get({ query: { name } }).then((v) => v.json());
