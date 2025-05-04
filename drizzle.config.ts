import type { Config } from "drizzle-kit";

export default {
  schema: "./src/api/models/**/*.ts",
  out: "./migrations",
  dialect: "turso",
  dbCredentials: {
    url: 'libsql://ecommerce-bormxx.aws-eu-west-1.turso.io',
    authToken: process.env.TURSO_AUTH_TOKEN!,
  },
} satisfies Config;


// import type { Config } from "drizzle-kit";

// export default {
//   schema: "./src/api/models/**/*.ts",
//   // dialect: 'turso',
//   dialect: "sqlite",
//   dbCredentials: {
//     url: "dev.db",
//     // url: `${process.env.TURSO_HOST}`,
//     // authToken: `${process.env.TURSO_AUTH_TOKEN}`
//   },
//   out: "./drizzle",
// } satisfies Config;
