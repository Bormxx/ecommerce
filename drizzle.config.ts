// -----------------------------------------------------
// Кроме этого файла редактируем ещё файл /src/api/db.ts
// -----------------------------------------------------

import type { Config } from "drizzle-kit";
import 'dotenv/config';



// -------Выбираем тип базы данных-----------------------

// Этот блок для Turso, раскомментировать, если будете использовать Turso

export default {
  schema: "./src/api/models/**/*.ts",
  out: "./migrations",
  dialect: "turso",
  dbCredentials: {
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
  },
} satisfies Config;

// -----------------------------------------------------

// Этот блок для Sqlite, раскомментировать, если будете использовать Sqlite

// export default {
//     schema: "./src/api/models/**/*.ts",
//     dialect: "sqlite",
//     dbCredentials: {
//         url: "dev.db",
//       },
//       out: "./drizzle",
//     } satisfies Config;

// Если выбрана SQLite база данных, то сделать npm run push в консоли!!!
// -----------------------------------------------------
    