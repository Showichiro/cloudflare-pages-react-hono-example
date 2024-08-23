import { type FocusEventHandler, useState } from "react";

export const useName = () => {
  const [name, setName] = useState("");

  const handleBlur: FocusEventHandler<HTMLInputElement> = ({
    target: { value },
  }) => setName(value);

  return { name, handleBlur };
};
