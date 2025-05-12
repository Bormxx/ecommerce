// -----------------------------------------------------
// Кроме этого файла редактируем ещё drizzle.config.ts
// -----------------------------------------------------

// -------Выбираем тип базы данных----------------------

// Для SQLite базы данных

// import Database from "better-sqlite3";
// import { drizzle } from "drizzle-orm/better-sqlite3";

// Для Turso базы данных

import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

// В самом низу тоже нужно выбрать нужный тип базы данных
// ------------------------------------------------------

// Основные модели и схема базы данных
import { basket } from "@/api/models/cart";
import {
  lists,
  orders,
  ordersRelations,
  listsRelations,
} from "@/api/models/order";

import {
  characteristics,
  items,
  photos,
  posts,
  itemsRelations,
  photosRelations,
  characteristicsRelations,
  postsRelations,
  favorites,
} from "@/api/models/product";
import { cards, sessions, users } from "@/api/models/user";

const schema = {
  users,
  sessions,
  cards,
  orders,
  lists,
  items,
  photos,
  characteristics,
  basket,
  favorites,
  posts,
  itemsRelations,
  photosRelations,
  characteristicsRelations,
  postsRelations,
  ordersRelations,
  listsRelations,
};

// -------Выбираем тип базы данных----------------------

// Для Turso базы данных

const turso = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});
export const db = drizzle(turso, { schema });

// Для SQLite базы данных

// const baza = new Database("dev.db");
// export const db = drizzle(baza, { schema });

// Если выбрана SQLite база данных, то сделать npm run push в консоли!!!
// ------------------------------------------------------
