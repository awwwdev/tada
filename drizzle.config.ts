import type { Config } from 'drizzle-kit';

export default {
	schema: './schema/schema.ts',
	out: 'drizzle',
	dialect: 'postgresql',
	dbCredentials: {
		url: process.env.POSTGRESQL_CONNECTION_STRING as string
	},
} satisfies Config;