import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const session = request.cookies.get("admin_session");

  const { pathname } = request.nextUrl;

  // Allow login page
  if (pathname.startsWith("/login")) {
    return NextResponse.next();
  }

  // Protect all /admin routes
  if (pathname.startsWith("/admin")) {
    if (!session) {
      return NextResponse.redirect(
        new URL("/login", request.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};