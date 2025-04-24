import { InferSelectModel, relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { items } from "./product";
import { users } from "./user";
import { Item } from "./product";

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

// Связи
export const ordersRelations = relations(orders, ({ many }) => ({
  lists: many(lists), // Один заказ → много элементов заказа
}));

export const listsRelations = relations(lists, ({ one }) => ({
  order: one(orders, {
    fields: [lists.orderId],
    references: [orders.id],
  }), // Один элемент заказа → один заказ
  item: one(items, {
    fields: [lists.itemId],
    references: [items.id],
  }), // Один элемент заказа → один товар
}));

// Новый тип для заказа с товарами, фото и характеристиками
export interface OrderWithItems extends Order {
  items: Array<{
    item: Item; // Данные о товаре
    quantity: number; // Количество
  }>;
  totalQuantity: number; // Общее количество товаров
  totalPrice: number; // Общая стоимость
}