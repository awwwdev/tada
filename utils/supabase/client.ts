"use client";
import config from '@/config'
import { Database } from "@/database.types";

import { createBrowserClient } from "@supabase/ssr";

export function createClientForBrowser() {
  return createBrowserClient<Database>(
    config().NEXT_PUBLIC_SUPABASE_URL,
    config().NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}
