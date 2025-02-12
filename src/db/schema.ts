import { relations, sql } from 'drizzle-orm';
import { sqliteTable, text, integer, unique } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  id: integer().primaryKey({ autoIncrement: true }),
  name: text('first_name').notNull(),
  surname: text('last_name').notNull(),
  email: text().notNull().unique(),
  password: text().notNull(),
  avatar: text().default('avatar'), // todo добавить ссылку
  registration: integer('timestamp', { mode: 'timestamp' }).default(sql`(strftime('%s', 'now'))`),
  isDeleted: integer('boolean', {mode: 'boolean'}).default(false).notNull(),
});

export const usersRelation = relations(users, ({ many }) => ({
  userCards: many(userCards),
  orders: many(orders),
  baskets: many(baskets),
  favorites: many(favorites),
  posts: many(posts)
}));

export const userCards = sqliteTable('userCards', {
  id: integer().primaryKey({ autoIncrement: true }),
  userId: integer().references(() => users.id, { onDelete: 'cascade'}).notNull(),
  card: text().notNull(),
});

export const userCardsRelation = relations(userCards, ({ one }) => ({
  user: one(users, {
    fields: [userCards.userId],
    references: [users.id]
  })
}));

export const items = sqliteTable('items', {
  id: integer().primaryKey({ autoIncrement: true }),
  title: text().notNull(),
  description: text().notNull(),
  cost: integer().notNull(),
  quantity: integer().notNull(),
});

export const itemsRelation = relations(items, ({ many }) => ({
  photos: many(photos),
  parameters: many(parameters),
  orderedItems: many(orderedItems),
  baskets: many(baskets),
  favorites: many(favorites),
  posts: many(posts)
}));

export const photos = sqliteTable('photos', {
  id: integer().primaryKey({ autoIncrement: true }),
  itemId: integer().references(() => items.id, { onDelete: 'cascade'}).notNull(),
  photo: text().notNull(),
});

export const photosRelation = relations(photos, ({ one }) => ({
  item: one(items, {
    fields: [photos.itemId],
    references: [items.id]
  })
}));

export const parameters = sqliteTable('parameters', {
  id: integer().primaryKey({ autoIncrement: true }),
  itemId: integer().references(() => items.id, { onDelete: 'cascade'}).notNull(),
  parameter: text().notNull(),
  value: text().notNull(),
});

export const parametersRelation = relations(parameters, ({ one }) => ({
  item: one(items, {
    fields: [parameters.itemId],
    references: [items.id]
  })
}));

export const orders = sqliteTable('orders', {
  id: integer().primaryKey({ autoIncrement: true }),
  userId: integer().references(() => users.id, { onDelete: 'cascade' }).notNull(),
  number: text().notNull(),
  address: text().notNull(),
  comment: text().notNull(),
  isCourier: integer('boolean', {mode: 'boolean'}).default(false).notNull(),
  cardPay: integer('boolean', {mode: 'boolean'}).default(false).notNull(),
  ordered: integer('timestamp', { mode: 'timestamp' }).default(sql`(strftime('%s', 'now'))`),
});

export const ordersRelation = relations(orders, ({ one, many }) => ({
  user: one(users, {
    fields: [orders.userId],
    references: [users.id]
  }),
  orderedItems: many(orderedItems)
}));

export const orderedItems = sqliteTable('orderedItems', {
  id: integer().primaryKey({ autoIncrement: true }),
  orderId: integer().references(() => orders.id, { onDelete: 'cascade'}).notNull(),
  itemId: integer().references(() => items.id, { onDelete: 'cascade'}).notNull(),
});

export const orderedItemsRelation = relations(orderedItems, ({ one }) => ({
  order: one(orders, {
    fields: [orderedItems.orderId],
    references: [orders.id]
  }),
  item: one(items, {
    fields: [orderedItems.itemId],
    references: [items.id]
  })
}));

export const baskets = sqliteTable('basket', {
  id: integer().primaryKey({ autoIncrement: true }),
  userId: integer().references(() => users.id, { onDelete: 'cascade'}).notNull(),
  itemId: integer().references(() => items.id, { onDelete: 'cascade'}).notNull(),
  quantity: integer().notNull(),
});

export const basketsRelation = relations(baskets, ({ one }) => ({
  user: one(users, {
    fields: [baskets.userId],
    references: [users.id]
  }),
  item: one(items, {
    fields: [baskets.itemId],
    references: [items.id]
  })
}));

export const favorites = sqliteTable('favorites', {
  id: integer().primaryKey({ autoIncrement: true }),
  userId: integer().references(() => users.id, { onDelete: 'cascade'}).notNull(),
  itemId: integer().references(() => items.id, { onDelete: 'cascade'}).notNull(),
});

export const favoritesRelation = relations(favorites, ({ one }) => ({
  user: one(users, {
    fields: [favorites.userId],
    references: [users.id]
  }),
  item: one(items, {
    fields: [favorites.itemId],
    references: [items.id]
  })
}));

export const posts = sqliteTable('posts', {
  id: integer().primaryKey({ autoIncrement: true }),
  userId: integer().references(() => users.id, { onDelete: 'cascade'}).notNull(),
  itemId: integer().references(() => items.id, { onDelete: 'cascade'}).notNull(),
  message: text().notNull(),
  rating: integer().notNull(),
  posted: integer('timestamp', { mode: 'timestamp' }).default(sql`(strftime('%s', 'now'))`)
}, (t) => ({
  uniqFields: unique('custom').on(t.itemId, t.userId),
}));

export const postsRelation = relations(posts, ({ one }) => ({
  user: one(users, {
    fields: [posts.userId],
    references: [users.id]
  }),
  item: one(items, {
    fields: [posts.itemId],
    references: [items.id]
  })
}));