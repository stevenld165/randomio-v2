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
})

export const users = sqliteTable("users_table", {
  id: int().primaryKey({ autoIncrement: true }),
  username: text().notNull().unique(),
  password: text().notNull(),
})

export const showListEntries = sqliteTable("show_list_entries_table", {
  id: int().primaryKey({ autoIncrement: true }),
  includedSeasons: text("included_seasons", { mode: "json" })
    .notNull()
    .$type<number[]>()
    .default(sql`'[]'`),
  extraEpisodes: text("extra_episodes", { mode: "json" })
    .notNull()
    .$type<string[]>()
    .default(sql`'[]'`),
  userId: int("user_id").references(() => users.id),
  showId: int("show_id").references(() => shows.id),
})
