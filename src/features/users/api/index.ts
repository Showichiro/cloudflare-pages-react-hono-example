import { honoClient } from "@/utils/honoClient";

export const getUsers = () =>
  honoClient.api.users.$get().then((res) => res.json());

export const createUser = (name: string) =>
  honoClient.api.users.$post({ json: { name } }).then((res) => res.json());
