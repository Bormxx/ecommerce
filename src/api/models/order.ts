import { InferSelectModel } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { items } from "./product";
import { users } from "./user";

// Заказы
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

export type Order = InferSelectModel<typeof orders>;

// Элементы заказа
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

export type OrderItem = InferSelectModel<typeof lists>;
