import 'dotenv/config';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import getDBClient from './client';
import config from "@/config";



const migrationConnection = postgres(config().POSTGRESQL_CONNECTION_STRING, { max: 1 });

export default async function migrator(connectionString?: string) {
  const dbClient = getDBClient(connectionString);
  // This will run migrations on the database, skipping the ones already applied
  await migrate(dbClient, { migrationsFolder: './drizzle' });

  // Don't forget to close the connection, otherwise the script will hang
  await migrationConnection.end();
}
