import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';

import * as schema from './schema/schema';

const baza = new Database('dev.db');

export const db = drizzle(baza, {schema});
