import { ExtractTablesWithRelations, sql } from "drizzle-orm";
import { PgDatabase, PgTransaction } from "drizzle-orm/pg-core";
import { PostgresJsQueryResultHKT } from "drizzle-orm/postgres-js";
import * as schema from "../schema/schema";

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

type TX = PgTransaction<PostgresJsQueryResultHKT, typeof schema, ExtractTablesWithRelations<typeof schema>>;


type QueryInTransaction<T> = (
  tx: PgTransaction<
    PostgresJsQueryResultHKT,
    Record<string, never>,
    ExtractTablesWithRelations<Record<string, never>>
  >
) => Promise<T>;

export function createDrizzle<T>(
  token: SupabaseToken,
  { client }: { client: PgDatabase<any> }
) {
  return async (callback: QueryInTransaction<T>) => {
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
