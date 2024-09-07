import { createFileRoute } from "@tanstack/react-router";
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
    </>
  );
}
