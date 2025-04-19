import Database from "better-sqlite3";
// import { drizzle } from "drizzle-orm/better-sqlite3";

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

export const schema = {
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

import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";

const turso = createClient({
  url: 'libsql://ecommerce-bormxx.aws-eu-west-1.turso.io',
  authToken: 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3Mzg5OTc3MDMsImlkIjoiZDAwNzU4ZmItYzNlNy00ZjM5LWE5YWUtMGY2NTRmMDk3MTk4In0.7I8gIV-5uXuygU7l7H4Pqv0ZtHCJniNqLH2fX69CY6u93B2nl_NZjzhKwljM4ooXOAkCyRiaQVkbssMihE4BCg',
});
export const db = drizzle(turso, {schema});

// const baza = new Database("dev.db");

// export const db = drizzle(baza, { schema });
