import { sql } from "drizzle-orm";
import { bigserial, pgSchema, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

// drizzle-orm/supabase
const auth = pgSchema('auth');
export const AUTH_USER = auth.table('users', {
	id: uuid().primaryKey().notNull(),
  email: varchar({length: 255}),
	phone: text(),
	email_confirmed_at: timestamp()
});
const realtime = pgSchema('realtime');
export const REALTIME_MESSAGES = realtime.table(
	'messages',
	{
		id: bigserial({ mode: 'bigint' }).primaryKey(),
		topic: text().notNull(),
		extension: text({
			enum: ['presence', 'broadcast', 'postgres_changes'],
		}).notNull(),
	},
);
export const authUid = sql`(select auth.uid())`;
export const realtimeTopic = sql`realtime.topic()`;