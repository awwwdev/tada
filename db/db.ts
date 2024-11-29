import config from "@/config";
import { sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

// import { sql } from "drizzle-orm"
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";
// import postgres from "postgres"

import { createClientForServer } from "@/utils/supabase/server";
import schema from "../schema";
import { decode } from "./jwt";

// ByPass RLS
const admin = drizzle({
  client: postgres(config().ADMIN_POSTGRESQL_CONNECTION_STRING, { prepare: false }),
  // casing: "snake_case",
  schema,
});

// Protected by RLS
const client = drizzle({
  client: postgres(config().POSTGRESQL_CONNECTION_STRING, { prepare: false }),
  schema,
});

type SupabaseToken = {
  iss?: string;
  sub?: string;
  aud?: string[] | string;
  exp?: number;
  nbf?: number;
  iat?: number;
  jti?: string;
  role?: string;
};

type QueryInTransaction<T> = (tx: PostgresJsDatabase<typeof schema>) => Promise<T> | T;

// https://github.com/orgs/supabase/discussions/23224
// Should be secure because we use the access token that is signed, and not the data read directly from the storage
export async function createDrizzleSupabaseClient() {
  const {
    data: { session },
  } = await createClientForServer().auth.getSession();
  const token = decode(session?.access_token ?? "") as SupabaseToken;

  return async <T>(callback: QueryInTransaction<T>) => {
    return await client.transaction(async (tx) => {
      // Supabase exposes auth.uid() and auth.jwt()
      // https://supabase.com/docs/guides/database/postgres/row-level-security#helper-functions
      try {
        await tx.execute(sql`
            -- auth.jwt()
            select set_config('request.jwt.claims', '${sql.raw(JSON.stringify(token))}', TRUE);
            -- auth.uid()
            select set_config('request.jwt.claim.sub', '${sql.raw(token.sub ?? "")}', TRUE);
            -- set local role
            set local role ${sql.raw(token.role ?? "anon")};
            `);
        return await callback(tx);
      } finally {
        await tx.execute(sql`
              -- reset
              select set_config('request.jwt.claims', NULL, TRUE);
              select set_config('request.jwt.claim.sub', NULL, TRUE);
              reset role;
              `);
      }
    });
  };
}
