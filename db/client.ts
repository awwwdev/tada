import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import config from "../config";
// import * as schema from '../db/schema';
import * as relations from '../schema/relations';
import * as schema from '../schema/schema';


const getDBClient = (connectionString?: string) => {
  const client = postgres(connectionString ?? config().POSTGRESQL_CONNECTION_STRING, {prepare: false});
  return drizzle(client, { schema: { ...schema, ...relations } });
};

export default getDBClient;
