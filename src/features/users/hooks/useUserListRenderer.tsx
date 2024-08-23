import { useSuspenseQuery } from "@tanstack/react-query";
import { getUsers } from "../api";

export const useUserListRenderer = () => {
  const { data } = useSuspenseQuery({ queryKey: ["users"], queryFn: getUsers });

  const userListRenderer = () => {
    if (data.length === 0) {
      return <div>No Data</div>;
    }
    return (
      <ul>
        {data.map((v) => (
          <li key={`users-${v.id}`}>{v.name}</li>
        ))}
      </ul>
    );
  };

  return { userListRenderer };
};
