import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
	// Ignore static assets, _next, and api routes early
	const { pathname } = request.nextUrl;
	if (
		pathname.startsWith("/_next") ||
		pathname.startsWith("/api") ||
		pathname.includes(".")
	) {
		return NextResponse.next();
	}

	let token = null;
	try {
		// secureCookie is recommended in production; getToken may throw if misconfigured
		token = await getToken({ req: request, secureCookie: process.env.NODE_ENV === "production" });
	} catch (err) {
		// treat any error as no token (avoid crashing middleware)
		token = null;
	}

	// Protect admin routes: require authentication
	if (pathname.startsWith("/admin")) {
		if (!token) {
			// Send user to login and preserve original path as callbackUrl
			const loginUrl = new URL("/login", request.url);
			loginUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);
			return NextResponse.redirect(loginUrl);
		}
		return NextResponse.next();
	}

	// Prevent authenticated users from accessing exact /login or /signup pages
	if ((pathname === "/login" || pathname === "/signup") && token) {
		return NextResponse.redirect(new URL("/", request.url));
	}

	return NextResponse.next();
}

// Only run middleware for these routes (keeps middleware light-weight)
export const config = {
	matcher: ["/admin/:path*", "/login", "/signup"],
};

