import { queryOptions, useQuery } from "@tanstack/react-query";
import { getHello } from "../api";
import { useName } from "./useName";

const helloQueryOption = (name: string) =>
  queryOptions({
    queryKey: ["hello", name] as const,
    queryFn: ({ queryKey: [, name] }) => getHello(name),
    enabled: name !== "",
  });

export const useHelloRenderer = () => {
  const { name, handleBlur } = useName();
  const { data, isLoading } = useQuery(helloQueryOption(name));

  const messageRenderer = () => (
    <div>{name === "" ? "Input your name" : data?.message}</div>
  );

  const inputRenderer = () => {
    if (isLoading) {
      return <p>...loading</p>;
    }
    return (
      <label>
        <input type="text" defaultValue={name} onBlur={handleBlur} />
      </label>
    );
  };

  return { messageRenderer, inputRenderer };
};
