import { Link } from "@tanstack/react-router";
import type { FC } from "react";

export const ArticleLink: FC<{ title: string; id: string }> = ({
  title,
  id,
}) => {
  return (
    <Link to="/articles/$id" params={{ id }}>
      {title}
    </Link>
  );
};
