"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  COOKIE,
  SESSION_MAX_AGE,
  createSessionToken,
  getDashboardPassword,
  isAuthConfigured,
  verifySessionToken,
} from "@/lib/session";

export async function login(formData: FormData): Promise<void> {
  "use server";
  if (!isAuthConfigured()) {
    redirect("/login?error=config");
  }

  const expectedPassword = getDashboardPassword();
  const password = formData.get("password") as string;
  if (!password || !expectedPassword || password !== expectedPassword) {
    redirect("/login?error=1");
  }

  const cookieStore = await cookies();
  cookieStore.set(COOKIE, await createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_MAX_AGE,
    path: "/",
  });
  redirect("/leads");
}

export async function logout() {
  "use server";
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE);
  redirect("/login");
}

export async function requireAuth() {
  if (!isAuthConfigured()) {
    redirect("/login?error=config");
  }

  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE)?.value;
  if (!token || !(await verifySessionToken(token))) {
    redirect("/login");
  }
}
