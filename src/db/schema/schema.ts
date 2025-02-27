import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: integer("userId").notNull().primaryKey(),
  name: text("name").notNull(),
  surname: text("surname").notNull(),
  avatar: text("avatar").notNull(),
  email: text("email").notNull(),
  password: text("password").notNull(),
});

export const favorites = sqliteTable("favorites", {
  id: integer("favoriteId").notNull().primaryKey(),
  userId: integer("userId")
    .notNull()
    .references(() => users.id),
  itemId: integer("itemId")
    .notNull()
    .references(() => items.id),
});

export const cards = sqliteTable("cards", {
  id: integer("cardId").notNull().primaryKey(),
  userId: integer("userId")
    .notNull()
    .references(() => users.id),
  cardNumber: integer("cardNumber").notNull(),
});

export const basket = sqliteTable("basket", {
  id: integer("basketId").notNull().primaryKey(),
  userId: integer("userId")
    .notNull()
    .references(() => users.id),
  itemId: integer("itemId")
    .notNull()
    .references(() => items.id),
  quantity: integer("quantity").notNull(),
});

export const items = sqliteTable("items", {
  id: integer("itemId").primaryKey(),
  title: text("title").notNull(),
  price: integer("price").notNull(),
  description: text("description").notNull(),
  availability: integer("availability", { mode: "boolean" }).notNull(),
});


export const photos = sqliteTable("photos", {
  id: integer("photoId").primaryKey(),
  itemId: integer("itemId")
    .notNull()
    .references(() => items.id),
  photoLink: text("photoLink").notNull(),
});

export const references = sqliteTable("references", {
  id: integer("referenceId").primaryKey(),
  itemId: integer("itemId")
    .notNull()
    .references(() => items.id),
  reference: text("reference").notNull(),
});

export const posts = sqliteTable("posts", {
  id: integer("postId").notNull().primaryKey(),
  userId: integer("userId")
    .notNull()
    .references(() => users.id),
  itemId: integer("itemId")
    .notNull()
    .references(() => items.id),
  rating: integer("rating").notNull(),
  post: text("post").notNull(),
});

export const orders = sqliteTable("orders", {
  id: integer("orderId").notNull().primaryKey(),
  userId: integer("userId")
    .notNull()
    .references(() => users.id),
  comment: text("comment").notNull(),
  address: text("address").notNull(),
  courier: integer("availability", { mode: "boolean" }).notNull(),
  payCash: integer("availability", { mode: "boolean" }).notNull(),
});

export const lists = sqliteTable("lists", {
  id: integer("listId").notNull().primaryKey(),
  orderId: integer("orderId")
    .notNull()
    .references(() => orders.id),
  itemId: integer("itemId")
    .notNull()
    .references(() => items.id),
  quantity: integer("quantity").notNull(),
});
