import { InferSelectModel } from "drizzle-orm";
import { integer, sqliteTable } from "drizzle-orm/sqlite-core";
import { items } from "./product";
import { users } from "./user";

// Корзина
export const basket = sqliteTable("basket", {
  id: integer("basketId").notNull().primaryKey({ autoIncrement: true }),
  userId: integer("userId")
    .notNull()
    .references(() => users.id),
  itemId: integer("itemId")
    .notNull()
    .references(() => items.id),
  quantity: integer("quantity").notNull(),
});

export type CartItem = InferSelectModel<typeof basket>;


