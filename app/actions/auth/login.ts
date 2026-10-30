"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { checkAdminCredentials } from "@/lib/auth/credentials";
import {
  ADMIN_COOKIE,
  createSessionToken,
  sessionCookieOptions,
} from "@/lib/auth/session";

export type LoginState = { error?: string };

export async function loginAction(
  _prevState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "/admin");

  if (!username || !password) {
    return { error: "Username and password are required." };
  }

  if (!checkAdminCredentials(username, password)) {
    return { error: "Invalid username or password." };
  }

  const token = await createSessionToken(username);
  (await cookies()).set(ADMIN_COOKIE, token, sessionCookieOptions);

  redirect(next.startsWith("/admin") ? next : "/admin");
}
