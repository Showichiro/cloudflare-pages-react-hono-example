import { createFileRoute, Link } from "@tanstack/react-router";
import { useHelloRenderer } from "@/features/hello/hooks";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  const { messageRenderer, inputRenderer } = useHelloRenderer();
  return (
    <>
      {messageRenderer()}
      {inputRenderer()}
      <Link to="/articles">記事一覧へ</Link>
    </>
  );
}
