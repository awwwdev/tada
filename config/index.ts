import dotenv from 'dotenv';

dotenv.config();


const config = () => {
  return {
    PORT: process.env.PORT ? Number(process.env.PORT) : 8000,
    POSTGRESQL_CONNECTION_STRING: process.env.POSTGRESQL_CONNECTION_STRING ?? 'value_not_provided',
    SESSION_SECRET_KEY: process.env.SESSION_SECRET_KEY ?? 'the flying elephant',
    FRONTEND_URL: process.env.FRONTEND_URL ?? 'http://localhost:3000',
    PGHOST: process.env.PGHOST ?? '127.0.0.1',
    PGUSER: process.env.PGUSER ?? 'postgres',
    PGPASSWORD: process.env.PGPASSWORD ?? 'admin',
    PGDATABASE: process.env.PGDATABASE ?? 'tada',
  } as const;
};

export default config;
