import type { Config } from "drizzle-kit";
import 'dotenv/config';

export default {
  schema: "./src/api/models/**/*.ts",
  out: "./migrations",
  dialect: "turso",
  dbCredentials: {
    url: "libsql://ecommerce-bormxx.aws-eu-west-1.turso.io",
    authToken: "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3Mzg5OTc3MDMsImlkIjoiZDAwNzU4ZmItYzNlNy00ZjM5LWE5YWUtMGY2NTRmMDk3MTk4In0.7I8gIV-5uXuygU7l7H4Pqv0ZtHCJniNqLH2fX69CY6u93B2nl_NZjzhKwljM4ooXOAkCyRiaQVkbssMihE4BCg",
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
