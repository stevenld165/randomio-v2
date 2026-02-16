import { sql } from "drizzle-orm"
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core"

export const shows = sqliteTable("shows_table", {
  id: int().primaryKey({ autoIncrement: true }),
  title: text().notNull(),
  desc: text(),
  imdbId: text("imdb_id").notNull().unique(),
  backgroundImg: text("background_img"),
  coverImg: text("cover_img"),
  releaseYear: text("release_year"),
  seasons: text({ mode: "json" })
    .notNull()
    .$type<number[]>()
    .default(sql`'[]'`),
  episodeCount: int("episode_count"),
})

export const users = sqliteTable("users_table", {
  id: int().primaryKey({ autoIncrement: true }),
  username: text().notNull().unique(),
  password: text().notNull(),
})

export const refreshTokens = sqliteTable("refresh_tokens_table", {
  id: int().primaryKey({ autoIncrement: true }),
  refreshToken: text("refresh_token").notNull(),
  userId: int("user_id").references(() => users.id),
})

export const showListEntries = sqliteTable("show_list_entries_table", {
  id: int().primaryKey({ autoIncrement: true }),
  excludedSeasons: text("excluded_seasons", { mode: "json" })
    .notNull()
    .$type<number[]>()
    .default(sql`'[]'`),
  extraEpisodes: text("extra_episodes", { mode: "json" })
    .notNull()
    .$type<string[]>()
    .default(sql`'[]'`),
  userId: int("user_id").references(() => users.id),
  imdbId: int("imdb_id").references(() => shows.imdbId),
  enabled: int({ mode: "boolean" }).default(sql`1`),
})
