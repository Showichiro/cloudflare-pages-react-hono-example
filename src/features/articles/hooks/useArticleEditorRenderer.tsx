import { useMutation, useQueryClient } from "@tanstack/react-query";
import { type ChangeEventHandler, useCallback, useState } from "react";
import { createArticle } from "../api";
import { useNavigate } from "@tanstack/react-router";

export const useArticleEditorRenderer = () => {
  const [article, setArticle] = useState({ title: "", content: "" });

  const handleChangeTitle = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      setArticle((prev) => ({ ...prev, title: e.target.value }));
    },
    [],
  );

  const handleChangeContent = useCallback<
    ChangeEventHandler<HTMLTextAreaElement>
  >((e) => {
    setArticle((prev) => ({ ...prev, content: e.target.value }));
  }, []);

  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (value: { title: string; content: string }) => {
      return createArticle({ args: { json: value } });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["articles"] });
      navigate({ to: ".." });
    },
    onError: () => {
      window.alert("送信に失敗しました。");
    },
  });

  const editorRenderer = () => {
    return (
      <div>
        <div>記事エディター</div>
        <div>
          <label>
            タイトル
            <input
              type="text"
              value={article.title}
              onChange={handleChangeTitle}
            />
          </label>
        </div>
        <div>
          <label htmlFor="content">本文</label>
          <textarea
            name="content"
            id="content"
            value={article.content}
            onChange={handleChangeContent}
          />
        </div>
        <div>
          <button type="button" onClick={() => mutation.mutate(article)}>
            送信
          </button>
        </div>
      </div>
    );
  };

  return { editorRenderer };
};
