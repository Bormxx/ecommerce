import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable('users', {
	id: integer('userId').notNull().primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  surname: text('surname').notNull(),
  avatar: text('avatar').notNull().default('images/avatar.png'),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
});

export const favorites = sqliteTable("favorites", {
  id: integer("favoriteId").notNull().primaryKey({ autoIncrement: true }),
  userId: integer("userId")
    .notNull()
    .references(() => users.id),
  itemId: integer("itemId")
    .notNull()
    .references(() => items.id),
});

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

export const basket = sqliteTable("basket", {
  id: integer("basketId").notNull().primaryKey({ autoIncrement: true }),
  userId: integer("userId").notNull().references(() => users.id),
  itemId: integer("itemId").notNull().references(() => items.id),
  quantity: integer("quantity").notNull(),
});

export const items = sqliteTable("items", {
  id: integer("itemId").notNull().primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  price: integer("price").notNull(),
  description: text("description").notNull(),
  availability: integer("availability", { mode: "boolean" }).notNull(),
});

export const photos = sqliteTable("photos", {
  id: integer("photoId").notNull().primaryKey({ autoIncrement: true }),
  itemId: integer("itemId").notNull().references(() => items.id),
  photoLink: text("photoLink").notNull(),
  isMainPhoto: integer("isMainPhoto", { mode: "boolean" }).notNull(),
});

export const characteristics = sqliteTable("characteristics", {
  id: integer("characteristicId").notNull().primaryKey({ autoIncrement: true }),
  itemId: integer("itemId").notNull().references(() => items.id),
  frameMatherials: text("frameMatherials").notNull(),
  linzeMatherials: text("linzeMatherials").notNull(),
  linzeTypes: text("linzeTypes").notNull(),
  linzeUVDefences: text("linzeUVDefences").notNull(),
  linzeEffects: text("linzeEffects").notNull(),
});

export const posts = sqliteTable("posts", {
  id: integer("postId").notNull().primaryKey({ autoIncrement: true }),
  userId: integer("userId").notNull().references(() => users.id),
  itemId: integer("itemId").notNull().references(() => items.id),
  rating: integer("rating").notNull(),
  post: text("post").notNull(),
});

export const orders = sqliteTable("orders", {
  id: integer("orderId").notNull().primaryKey({ autoIncrement: true }),
  userId: integer("userId")
    .notNull()
    .references(() => users.id),
  comment: text("comment"),
  address: text("address").notNull(),
  phone: text("phone").notNull(),
  isCourier: integer("availability", { mode: "boolean" }).notNull(),
  payment: integer("payment"),
});

export const lists = sqliteTable("lists", {
  id: integer("listId").notNull().primaryKey({ autoIncrement: true }),
  orderId: integer("orderId")
    .notNull()
    .references(() => orders.id),
  itemId: integer("itemId")
    .notNull()
    .references(() => items.id),
  quantity: integer("quantity").notNull(),
});
