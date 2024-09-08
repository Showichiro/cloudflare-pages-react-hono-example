import { articleListQueryOption } from "@/features/articles/hooks";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/articles/$id")({
  loader: async ({ context: { queryClient } }) => {
    queryClient.ensureQueryData(articleListQueryOption);
  },
  component: Article,
});

function Article() {
  const { id } = Route.useParams();
  const { data } = useQuery(articleListQueryOption);

  if (!data) {
    return null;
  }

  const article = data.find((v) => `${v.id}` === id);

  if (!article) {
    return <>記事が存在しません。</>;
  }

  return (
    <div>
      <div>{article.title}</div>
      <div>{article.content}</div>
      <Link to={"/articles"}>記事一覧に戻る</Link>
    </div>
  );
}
