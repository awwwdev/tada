import { unique } from "drizzle-orm/pg-core";
import { AUTH_USER } from "./supabaseTables";


export const uniqueEmail = unique("unique_email").on(AUTH_USER.email);
