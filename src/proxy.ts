import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Next.js 16+ uses proxy.ts instead of middleware.ts
// This file handles auth-based route protection for the lead management system.

export function proxy(request: NextRequest) {
  const token = request.cookies.get("session")?.value;
  const { pathname } = request.nextUrl;

  // Protect /lead and /adminlead routes
  if (pathname.startsWith("/adminlead") || pathname.startsWith("/lead")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
      // Decode JWT payload (base64) — we cannot use jsonwebtoken in Edge runtime
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );

      const payload = JSON.parse(jsonPayload);

      // Employee trying to access admin-only route
      if (pathname.startsWith("/adminlead") && !payload.isAdmin) {
        return NextResponse.redirect(new URL("/login", request.url));
      }

      // Admin trying to access employee route — redirect to admin panel
      if (pathname.startsWith("/lead") && payload.isAdmin) {
        return NextResponse.redirect(new URL("/adminlead", request.url));
      }
    } catch (e) {
      // Invalid/expired token — clear cookie and send to login
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("session");
      return response;
    }
  }

  // If already logged in and visiting /login, redirect to correct dashboard
  if (pathname === "/login" && token) {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const payload = JSON.parse(atob(base64));

      if (payload.isAdmin) {
        return NextResponse.redirect(new URL("/adminlead", request.url));
      } else {
        return NextResponse.redirect(new URL("/lead", request.url));
      }
    } catch (e) {
      // Bad token on login page — just proceed to show login
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/adminlead/:path*", "/lead/:path*", "/login"],
};
