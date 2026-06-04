import { NextRequest, NextResponse } from "next/server";
import { COOKIE, isAuthConfigured, verifySessionToken } from "@/lib/session";

const PUBLIC_PATHS = ["/login", "/favicon.ico"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (PUBLIC_PATHS.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  if (!isAuthConfigured()) {
    return NextResponse.redirect(new URL("/login?error=config", request.url));
  }

  const token = request.cookies.get(COOKIE)?.value;
  if (!token || !(await verifySessionToken(token))) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|ico|webp)$).*)"],
};
