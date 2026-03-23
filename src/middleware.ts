// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export function middleware(request: NextRequest) {
//   const session = request.cookies.get("admin_session");

//   const { pathname } = request.nextUrl;

//   // Allow login page
//   if (pathname.startsWith("/login")) {
//     return NextResponse.next();
//   }

//   // Protect all /admin routes
//   if (pathname.startsWith("/admin")) {
//     if (!session) {
//       return NextResponse.redirect(
//         new URL("/login", request.url)
//       );
//     }
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/admin/:path*"],
// };

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// const MAINTENANCE = true;
const MAINTENANCE = false;

export function middleware(request: NextRequest) {
  const session = request.cookies.get("admin_session");
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/maintenance")) return NextResponse.next();
  if (pathname.startsWith("/login")) return NextResponse.next();

  if (pathname.startsWith("/admin")) {
    if (!session) return NextResponse.redirect(new URL("/login", request.url));
    return NextResponse.next();
  }

  if (session) return NextResponse.next();

  if (MAINTENANCE) {
    const response = NextResponse.rewrite(new URL("/maintenance", request.url));
    // ✅ Set a custom header so the layout knows it's maintenance mode
    response.headers.set("x-is-maintenance", "1");
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico).*)"],
};
