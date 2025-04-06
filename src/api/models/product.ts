import { InferSelectModel } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { users } from './user';

// Товары
export const items = sqliteTable("items", {
  id: integer("itemId").notNull().primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  price: integer("price").notNull(),
  description: text("description").notNull(),
  availability: integer("availability", { mode: "boolean" }).notNull(),
});

export type Item = InferSelectModel<typeof items>;

// Фото
export const photos = sqliteTable("photos", {
  id: integer("photoId").notNull().primaryKey({ autoIncrement: true }),
  itemId: integer("itemId")
    .notNull()
    .references(() => items.id),
  photoLink: text("photoLink").notNull(),
  isMainPhoto: integer("isMainPhoto", { mode: "boolean" }).notNull(),
});

export type Photo = InferSelectModel<typeof photos>;

// Характеристики
export const characteristics = sqliteTable("characteristics", {
  id: integer("characteristicId").notNull().primaryKey({ autoIncrement: true }),
  itemId: integer("itemId")
    .notNull()
    .references(() => items.id),
  frameMatherials: text("frameMatherials").notNull(),
  linzeMatherials: text("linzeMatherials").notNull(),
  linzeTypes: text("linzeTypes").notNull(),
  linzeUVDefences: text("linzeUVDefences").notNull(),
  linzeEffects: text("linzeEffects").notNull(),
});

export type Characteristic = InferSelectModel<typeof characteristics>;

// Отзывы
export const posts = sqliteTable("posts", {
  id: integer("postId").notNull().primaryKey({ autoIncrement: true }),
  userId: integer("userId")
    .notNull()
    .references(() => users.id),
  itemId: integer("itemId")
    .notNull()
    .references(() => items.id),
  rating: integer("rating").notNull(),
  post: text("post").notNull(),
});

export type Post = InferSelectModel<typeof posts>;
