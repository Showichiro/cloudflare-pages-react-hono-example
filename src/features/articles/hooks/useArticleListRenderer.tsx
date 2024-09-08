import { queryOptions, useQuery } from "@tanstack/react-query";
import { getArticles } from "../api";
import { ArticleLink } from "../components/ArticleLink";

export const articleListQueryOption = queryOptions({
  queryKey: ["articles"],
  queryFn: () => {
    return getArticles({ args: {} });
  },
});

export const useArticleListRenderer = () => {
  const { data, isLoading } = useQuery(articleListQueryOption);

  const listRenderer = () => {
    if (isLoading) {
      return <p>...loading</p>;
    }
    if (data?.length === 0) {
      return <div>記事はありません。</div>;
    }

    return (
      <ul>
        {data?.map((v) => (
          <li key={`article-${v.id}`}>
            <ArticleLink id={`${v.id}`} title={v.title} />
          </li>
        ))}
      </ul>
    );
  };

  return { listRenderer };
};
