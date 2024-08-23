import { useMutation, useQueryClient } from "@tanstack/react-query";
import { type ChangeEventHandler, useState } from "react";
import { createUser } from "../api";

export const useUserCreateFormRenderer = () => {
  const [name, setName] = useState("");

  const handleChangeName: ChangeEventHandler<HTMLInputElement> = ({
    target: { value },
  }) => {
    setName(value);
  };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createUser,
    onSettled: () => {
      setName("");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const userCreateFormRenderer = () => {
    return (
      <form>
        <label>
          name: <input type="text" value={name} onChange={handleChangeName} />
        </label>
        <button
          type="button"
          onClick={() => {
            mutation.mutate(name);
          }}
        >
          登録
        </button>
      </form>
    );
  };

  return { userCreateFormRenderer };
};
