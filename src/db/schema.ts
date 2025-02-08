import { sql } from 'drizzle-orm';
import { sqliteTable, text, int } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable("users", {
  id: int().primaryKey({ autoIncrement: true }),
  firstName: text("first_name").notNull().default("Аноноим"),
  lastName: text("last_name").notNull().default("Аноним"),
  email: text().notNull().unique(),
  password: text().notNull(),
  avatar: text().default("avatar"), // todo добавить ссылку
  createdAt: int('timestamp', { mode: 'timestamp' }).default(sql`(strftime('%s', 'now'))`),
  test: text("test", { mode: "json"} ).notNull().$type<string[]>().default(sql`'[]'`),
});



// export const userRelation = relations(users, ({ one }) => ({
//   profile: one(profiles, { fields: [users.id], references: [profiles.userId]}),
// }));

// export const profiles = sqliteTable("profiles", {
//   id: int().primaryKey({ autoIncrement: true }),
//   userId: int("user_id").references(() => users.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
//   data: text()
// });

// export const profileRelation = relations(profiles, ({ one }) => ({
//   user: one(users, { fields: [profiles.userId], references: [users.id]})
// }));