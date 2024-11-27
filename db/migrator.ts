import 'dotenv/config';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
// import getDBClient from './client';
import config from "@/config";
import { drizzle } from "drizzle-orm/postgres-js";
// import * as schema from '../db/schema';





export default async function migrator() {
  const migrationConnection = postgres(config().ADMIN_POSTGRESQL_CONNECTION_STRING, { max: 1 });
  // const dbClient = getDBClient(connectionString);
  const dbClient = drizzle(migrationConnection);
  // This will run migrations on the database, skipping the ones already applied
  await migrate(dbClient, { migrationsFolder: "./drizzle" });

  // Don't forget to close the connection, otherwise the script will hang
  await migrationConnection.end();
}

