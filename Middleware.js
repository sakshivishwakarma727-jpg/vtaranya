import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  // Logged-in users should never see landing or login
  if (token && (pathname === "/" || pathname.startsWith("/login"))) {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  // Protected routes
  if (
    !token &&
    (pathname.startsWith("/home") ||
      pathname.startsWith("/report") ||
      pathname.startsWith("/settings"))
  ) {
    return NextResponse.redirect(
      new URL("/login?redirect=" + pathname.slice(1), req.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/home/:path*", "/report/:path*", "/settings/:path*"],
};
