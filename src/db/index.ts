import * as schema from './schema/schema';
import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";

const turso = createClient({
  url: 'libsql://ecommerce-bormxx.aws-eu-west-1.turso.io',
  authToken: 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3Mzg5OTc3MDMsImlkIjoiZDAwNzU4ZmItYzNlNy00ZjM5LWE5YWUtMGY2NTRmMDk3MTk4In0.7I8gIV-5uXuygU7l7H4Pqv0ZtHCJniNqLH2fX69CY6u93B2nl_NZjzhKwljM4ooXOAkCyRiaQVkbssMihE4BCg',
});
export const db = drizzle(turso, {schema});


//-----------------------------------------


// import Database from 'better-sqlite3';
// import { drizzle } from 'drizzle-orm/better-sqlite3';

// import * as schema from './schema/schema';

// const baza = new Database('dev.db');

// export const db = drizzle(baza, {schema});