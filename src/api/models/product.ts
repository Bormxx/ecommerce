// src/api/models/product.ts
import { InferSelectModel, relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { users } from "./user"; // Предполагается, что users уже определён корректно

// 1. Определение таблиц
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
    .references(() => items.id), // Ссылка на items.id
  photoLink: text("photoLink").notNull(),
  isMainPhoto: integer("isMainPhoto", { mode: "boolean" }).notNull(),
});

export type Photo = InferSelectModel<typeof photos>;

// Характеристики
export const characteristics = sqliteTable("characteristics", {
  id: integer("characteristicId").notNull().primaryKey({ autoIncrement: true }),
  itemId: integer("itemId")
    .notNull()
    .references(() => items.id), // Ссылка на items.id
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
    .references(() => users.id), // Ссылка на users.id
  itemId: integer("itemId")
    .notNull()
    .references(() => items.id), // Ссылка на items.id
  rating: integer("rating").notNull(),
  post: text("post").notNull(),
});

export type Post = InferSelectModel<typeof posts>;

// 2. Определение связей (после таблиц)
export const itemsRelations = relations(items, ({ many }) => ({
  photos: many(photos), // Один товар → много фото
  characteristics: many(characteristics), // Один товар → много характеристик
  posts: many(posts), // Один товар → много отзывов
}));

export const photosRelations = relations(photos, ({ one }) => ({
  item: one(items, {
    fields: [photos.itemId],
    references: [items.id],
  }), // Одно фото → один товар
}));

export const characteristicsRelations = relations(
  characteristics,
  ({ one }) => ({
    item: one(items, {
      fields: [characteristics.itemId],
      references: [items.id],
    }), // Одна характеристика → один товар
  }),
);

export const postsRelations = relations(posts, ({ one }) => ({
  item: one(items, {
    fields: [posts.itemId],
    references: [items.id],
  }), // Один отзыв → один товар
  user: one(users, {
    fields: [posts.userId],
    references: [users.id],
  }), // Один отзыв → один пользователь
}));

// 3. Дополнительный тип для метода getAllItems
export interface ItemWithMainPhoto extends Item {
  mainPhoto?: Photo; // Только основное фото
}

// Избранное
export const favorites = sqliteTable("favorites", {
  id: integer("favoriteId").notNull().primaryKey({ autoIncrement: true }),
  userId: integer("userId")
    .notNull()
    .references(() => users.id),
  itemId: integer("itemId")
    .notNull()
    .references(() => items.id),
});

export type Favorite = InferSelectModel<typeof favorites>;
