import type { Config } from "drizzle-kit";

export default {
  schema: "./src/db/schema/schema.ts",
  out: "./migrations",
  dialect: "turso",
  dbCredentials: {
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
  },
} satisfies Config;

//---------------------------------------------------------------------------------


// import type { Config } from 'drizzle-kit';

// export default {
//   schema: './src/db/schema',
//   // dialect: 'turso',
//   dialect: "sqlite",
//   dbCredentials: {
//     url: "dev.db"
//     // url: `${process.env.TURSO_HOST}`,
//     // authToken: `${process.env.TURSO_AUTH_TOKEN}`
//   },
//   out: './drizzle',
// } satisfies Config;