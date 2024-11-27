import dotenv from 'dotenv';

dotenv.config();


const config = () => {
  return {
    PORT: process.env.PORT ? Number(process.env.PORT) : 8000,
    POSTGRESQL_CONNECTION_STRING: process.env.POSTGRESQL_CONNECTION_STRING ?? 'value_not_provided',
    ADMIN_POSTGRESQL_CONNECTION_STRING: process.env.ADMIN_POSTGRESQL_CONNECTION_STRING ?? 'value_not_provided',
    SESSION_SECRET_KEY: process.env.SESSION_SECRET_KEY ?? 'the flying elephant',
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '',
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
    FRONTEND_URL: process.env.FRONTEND_URL ?? 'http://localhost:3000',
    POSTGRESQL_HOST: process.env.POSTGRESQL_HOST ?? '127.0.0.1',
    POSTGRESQL_PORT: Number(process.env.POSTGRESQL_PORT) ?? 54322,
    POSTGRESQL_DATABASE: process.env.POSTGRESQL_DATABASE ?? 'tada',
    POSTGRESQL_USER: process.env.POSTGRESQL_USER ?? 'postgres',
    POSTGRESQL_PASSWORD: process.env.POSTGRESQL_PASSWORD ?? 'postgres',
  } as const;
};

export default config;
