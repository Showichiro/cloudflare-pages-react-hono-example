import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const articles = sqliteTable("articles", {
  id: integer("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  sub: text("sub").notNull(),
});

export const tokens = sqliteTable("tokens", {
  id: integer("id").primaryKey(),
  accessToken: text("access_token").notNull(),
  refreshToken: text("refresh_token").notNull(),
  idToken: text("id_token").notNull(),
  expiresIn: integer("expires_in").notNull(),
});
