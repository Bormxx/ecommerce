// src/api/db.ts
import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
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

const baza = new Database("dev.db");
export const db = drizzle(baza, { schema });