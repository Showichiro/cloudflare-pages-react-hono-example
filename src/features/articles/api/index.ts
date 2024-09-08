import {
  type Fetcher,
  fetcherAuthWrapperFactory,
  honoClient,
} from "@/utils/honoClient";

export const getArticles: Fetcher<
  typeof honoClient.api.authenticated.articles.$get
> = fetcherAuthWrapperFactory((opt) =>
  honoClient.api.authenticated.articles
    .$get(opt.args, {
      headers: {
        authorization: `Bearer ${opt.token}`,
      },
    })
    .then((res) => res.json()),
);

export const createArticle: Fetcher<
  typeof honoClient.api.authenticated.articles.$post
> = fetcherAuthWrapperFactory((opt) =>
  honoClient.api.authenticated.articles
    .$post(opt.args, {
      headers: {
        authorization: `Bearer ${opt.token}`,
      },
    })
    .then((res) => res.json()),
);

export const updateArticle: Fetcher<
  (typeof honoClient.api.authenticated.articles)[":id"]["$put"]
> = fetcherAuthWrapperFactory((opt) =>
  honoClient.api.authenticated.articles[":id"]
    .$put(opt.args, {
      headers: {
        authorization: `Bearer ${opt.token}`,
      },
    })
    .then((res) => res.json()),
);

export const deleteArticle: Fetcher<
  (typeof honoClient.api.authenticated.articles)[":id"]["$delete"]
> = fetcherAuthWrapperFactory((opt) =>
  honoClient.api.authenticated.articles[":id"]
    .$delete(opt.args, {
      headers: {
        authorization: `Bearer ${opt.token}`,
      },
    })
    .then((res) => res.json()),
);
