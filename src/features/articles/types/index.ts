import type { getArticles } from "../api";

export type Article = Awaited<ReturnType<typeof getArticles>>[number];
