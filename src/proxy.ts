import { NextRequest, NextResponse } from "next/server";
import {
  COOKIE,
  isAuthConfigured,
  verifySessionToken,
} from "@/lib/crm/session";

const PUBLIC_PATHS = ["/crm/login", "/favicon.ico"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (PUBLIC_PATHS.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  if (!pathname.startsWith("/crm")) {
    return NextResponse.next();
  }

  if (!isAuthConfigured()) {
    return NextResponse.redirect(
      new URL("/crm/login?error=config", request.url)
    );
  }

  const token = request.cookies.get(COOKIE)?.value;
  if (!token || !(await verifySessionToken(token))) {
    return NextResponse.redirect(new URL("/crm/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/crm/:path*"],
};
