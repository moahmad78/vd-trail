import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // We can't use jsonwebtoken in Edge middleware.
  // A simple check is to look for the "session" cookie, and we could also read role data from a cookie, 
  // but to parse JWT properly in Edge runtime, you'd usually use jose or decode manually.
  // Since we only need to secure the routes, we can parse the JWT payload base64.
  
  const token = request.cookies.get("session")?.value;
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/adminlead") || pathname.startsWith("/lead")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
      // Decode JWT payload (without verification, as edge runtime lacks crypto for `jsonwebtoken`)
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      
      const payload = JSON.parse(jsonPayload);

      if (pathname.startsWith("/adminlead") && !payload.isAdmin) {
        return NextResponse.redirect(new URL("/login", request.url));
      }

      if (pathname.startsWith("/lead") && payload.isAdmin) {
        // We could redirect to /adminlead, or to login. Let's redirect to adminlead if they are admin.
        return NextResponse.redirect(new URL("/adminlead", request.url));
      }
    } catch (e) {
      // Invalid token format
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("session");
      return response;
    }
  }

  // If user is already logged in and visits /login, redirect them appropriately
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
      // ignore
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/adminlead/:path*", "/lead/:path*", "/login"],
};
