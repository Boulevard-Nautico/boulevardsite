import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "@/lib/schema";

type Database = ReturnType<typeof createDatabase>;

let cachedDb: Database | null | undefined;

function createDatabase() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    return null;
  }

  const sql = neon(connectionString);
  return drizzle(sql, { schema });
}

export function getDb() {
  if (cachedDb !== undefined) {
    return cachedDb;
  }

  cachedDb = createDatabase();
  return cachedDb;
}

export function requireDb() {
  const db = getDb();

  if (!db) {
    throw new Error("DATABASE_URL nao configurado.");
  }

  return db;
}
