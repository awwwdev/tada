import config from "@/config";
import { DrizzleConfig } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { createClient } from "@/utils/supabase/server";

import * as schema from "../schema/schema";
import { decode } from "./jwt";
import { createDrizzle } from "./supabaseDrizzle";

const drizzleConfig = {
  casing: "snake_case",
  schema,
} satisfies DrizzleConfig<typeof schema>;

// ByPass RLS
const admin = drizzle({
  client: postgres(config().ADMIN_POSTGRESQL_CONNECTION_STRING, { prepare: false }),
  ...drizzleConfig,
});

// Protected by RLS
const client = drizzle({
  client: postgres(config().POSTGRESQL_CONNECTION_STRING, { prepare: false }),
  ...drizzleConfig,
});

// https://github.com/orgs/supabase/discussions/23224
// Should be secure because we use the access token that is signed, and not the data read directly from the storage
export async function createDrizzleSupabaseClient() {
  const {
    data: { session },
  } = await createClient().auth.getSession();
  return createDrizzle(decode(session?.access_token ?? ""), { admin, client });
}
