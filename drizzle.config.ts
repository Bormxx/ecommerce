import type { Config } from "drizzle-kit";

export default {
  schema: "./src/api/models/**/*.ts",
  // dialect: 'turso',
  dialect: "sqlite",
  dbCredentials: {
    url: "dev.db",
    // url: `${process.env.TURSO_HOST}`,
    // authToken: `${process.env.TURSO_AUTH_TOKEN}`
  },
  out: "./drizzle",
} satisfies Config;
