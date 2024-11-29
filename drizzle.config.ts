import type { Config } from 'drizzle-kit';
import config from "./config";

export default {
	schema: './schema/index.ts',
	out: './drizzle',
	dialect: 'postgresql',
	dbCredentials: {
		// url: process.env.ADMIN_POSTGRESQL_CONNECTION_STRING as string
		host: config().POSTGRESQL_HOST,
		port: config().POSTGRESQL_PORT,
		database: config().POSTGRESQL_DATABASE,
		user: config().POSTGRESQL_USER,
		password: config().POSTGRESQL_PASSWORD,
	},
	entities: {
		roles: {
			provider: "supabase",
		},
	},
} satisfies Config;