import { InferSelectModel } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

// Пользователи
export const users = sqliteTable("users", {
  id: integer("userId").notNull().primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  surname: text("surname").notNull(),
  avatar: text("avatar").notNull().default("images/avatar.png"),
  email: text("email").notNull().unique(),
  password: text("password"),
});

export type User = InferSelectModel<typeof users>;

// Сессии
export const sessions = sqliteTable("session", {
  id: text("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
  expiresAt: integer("expires_at", {
    mode: "timestamp",
  }).notNull(),
});

export type Session = InferSelectModel<typeof sessions>;

// Карты
export const cards = sqliteTable("cards", {
  id: integer("cardId").notNull().primaryKey({ autoIncrement: true }),
  userId: integer("userId")
    .notNull()
    .references(() => users.id),
  cardNumber: text("cardNumber").notNull(),
  month: text("month").notNull(),
  year: text("year").notNull(),
  cvv: text("cvv").notNull(),
});

// Есть в модели Cart
// export const favorites = sqliteTable("favorites", {
//   id: integer("favoriteId").notNull().primaryKey({ autoIncrement: true }),
//   userId: integer("userId")
//     .notNull()
//     .references(() => users.id),
//   itemId: integer("itemId")
//     .notNull()
//     .references(() => items.id),
// });

export type Card = InferSelectModel<typeof cards>;
