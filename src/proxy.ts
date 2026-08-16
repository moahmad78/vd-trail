import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Next.js 16+ uses proxy.ts
// Handles 301 domain redirects for legacy domain (voomet.com / www.voomet.com -> voometdesign.com)
// and auth-based route protection for lead management.

const LEGACY_HOSTS = ["voomet.com", "www.voomet.com"];

export function proxy(req: NextRequest) {
  const rawHost = req.headers.get("host") || "";
  const cleanHost = rawHost.split(":")[0].toLowerCase().trim();

  // Task 1: 301 Permanent Redirect for legacy domains ONLY (exact match)
  // voometdesign.com and www.voometdesign.com are NEVER redirected here.
  if (LEGACY_HOSTS.includes(cleanHost)) {
    const url = new URL(req.url);
    return NextResponse.redirect(
      `https://voometdesign.com${url.pathname}${url.search}`,
      301
    );
  }

  // Auth-based route protection for lead management system
  const token = req.cookies.get("session")?.value;
  const { pathname } = req.nextUrl;

  // Protect /lead and /adminlead routes
  if (pathname.startsWith("/adminlead") || pathname.startsWith("/lead")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
      // Decode JWT payload (base64) — Edge runtime safe
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
        return NextResponse.redirect(new URL("/login", req.url));
      }

      // Admin trying to access employee route — redirect to admin panel
      if (pathname.startsWith("/lead") && payload.isAdmin) {
        return NextResponse.redirect(new URL("/adminlead", req.url));
      }
    } catch {
      // Invalid/expired token — clear cookie and send to login
      const response = NextResponse.redirect(new URL("/login", req.url));
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
        return NextResponse.redirect(new URL("/adminlead", req.url));
      } else {
        return NextResponse.redirect(new URL("/lead", req.url));
      }
    } catch {
      // Bad token on login page — just proceed to show login
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for static files & images
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
