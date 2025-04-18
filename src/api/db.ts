import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";

import { basket, favorites } from "@/api/models/cart";
import { lists, orders } from "@/api/models/order";
import {
  characteristics,
  characteristicsRelations,
  items,
  itemsRelations,
  photos,
  photosRelations,
  posts,
  postsRelations,
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
};

const baza = new Database("dev.db");
export const db = drizzle(baza, { schema });
