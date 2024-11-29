CREATE USER rls_client
WITH
  LOGIN PASSWORD 'replace-with-rls_client_password-from-env';

GRANT anon TO rls_client;

GRANT authenticated TO rls_client;