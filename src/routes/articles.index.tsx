import { useArticleListRenderer } from "@/features/articles/hooks/useArticleListRenderer";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/articles/")({
  component: Articles,
});

function Articles() {
  const { listRenderer } = useArticleListRenderer();

  return (
    <div>
      <div>記事一覧</div>
      {listRenderer()}
      <Link to="/articles/edit">新しい記事を追加する</Link>
    </div>
  );
}
