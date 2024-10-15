"use server";

import { Settings } from '@/types';
import { cookies } from "next/headers";

export async function setThemeCookie({ theme , useSystemTheme}: { theme: Settings['theme'], useSystemTheme: boolean }) {
  cookies().set("theme", theme);
  cookies().set("useSystemTheme", String(useSystemTheme));
  // const th = cookies().get("theme");
  // or
}
