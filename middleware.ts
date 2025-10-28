import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip middleware for non-auth routes (explicitly listed)
  const isAuthRoute = pathname.startsWith("/admin") || 
                     pathname === "/login" || 
                     pathname === "/signup";
  
  if (!isAuthRoute) {
    return NextResponse.next();
  }

  let token = null;
  try {
    token = await getToken({ 
      req: request,
      // Use secure cookies in production
      secureCookie: process.env.NODE_ENV === "production",
    });
    } catch (_error) {
    token = null;
  }

  // Store current URL before any redirects
  const returnTo = request.nextUrl.href;

  // Handle admin routes
  if (pathname.startsWith("/admin")) {
    if (!token) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("callbackUrl", returnTo);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  // Handle login/signup routes
  if (pathname === "/login" || pathname === "/signup") {
    if (token) {
      const destination = request.nextUrl.searchParams.get("callbackUrl") || "/";
      return NextResponse.redirect(new URL(destination, request.url));
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

// Only run middleware on auth-related routes
export const config = {
  matcher: [
    "/admin/:path*",
    "/login",
    "/signup"
  ],
};