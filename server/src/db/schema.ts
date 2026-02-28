import { sql, relations } from "drizzle-orm"
import { int, sqliteTable, text, integer, index } from "drizzle-orm/sqlite-core"

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

// export const users = sqliteTable("users_table", {
//   id: int().primaryKey({ autoIncrement: true }),
//   username: text().notNull().unique(),
//   password: text().notNull(),
// })

export const refreshTokens = sqliteTable("refresh_tokens_table", {
  id: int().primaryKey({ autoIncrement: true }),
  refreshToken: text("refresh_token").notNull(),
  userId: text("user_id").references(() => user.id),
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
  userId: text("user_id").references(() => user.id),
  imdbId: text("imdb_id").references(() => shows.imdbId),
  enabled: int({ mode: "boolean" }).default(sql`1`),
})

// Better Auth Tables

export const user = sqliteTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: integer("email_verified", { mode: "boolean" })
    .default(false)
    .notNull(),
  image: text("image"),
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
    .notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" })
    .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
})

export const session = sqliteTable(
  "session",
  {
    id: text("id").primaryKey(),
    expiresAt: integer("expires_at", { mode: "timestamp_ms" }).notNull(),
    token: text("token").notNull().unique(),
    createdAt: integer("created_at", { mode: "timestamp_ms" })
      .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
      .notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp_ms" })
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
  },
  (table) => [index("session_userId_idx").on(table.userId)],
)

export const account = sqliteTable(
  "account",
  {
    id: text("id").primaryKey(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: integer("access_token_expires_at", {
      mode: "timestamp_ms",
    }),
    refreshTokenExpiresAt: integer("refresh_token_expires_at", {
      mode: "timestamp_ms",
    }),
    scope: text("scope"),
    password: text("password"),
    createdAt: integer("created_at", { mode: "timestamp_ms" })
      .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
      .notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp_ms" })
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("account_userId_idx").on(table.userId)],
)

export const verification = sqliteTable(
  "verification",
  {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: integer("expires_at", { mode: "timestamp_ms" }).notNull(),
    createdAt: integer("created_at", { mode: "timestamp_ms" })
      .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
      .notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp_ms" })
      .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("verification_identifier_idx").on(table.identifier)],
)

export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
}))

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}))

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}))
