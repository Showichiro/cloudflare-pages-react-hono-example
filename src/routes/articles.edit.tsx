import { useArticleEditorRenderer } from "@/features/articles/hooks/useArticleEditorRenderer";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/articles/edit")({
  component: Editor,
});

function Editor() {
  const { editorRenderer } = useArticleEditorRenderer();

  return (
    <div>
      {editorRenderer()}
      <div>
        <Link to="/articles">記事一覧に戻る</Link>
      </div>
    </div>
  );
}
