import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret_for_dev_only_please_change";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 });
    }

    // Handle Logout
    if (body.action === 'logout') {
      const cookieStore = await cookies();
      cookieStore.delete("session");
      return NextResponse.json({ success: true }, { status: 200 });
    }

    const { username, password, role } = body;
    const cleanUser = String(username || '').toLowerCase().trim();
    const cleanPass = String(password || '').trim();
    const cleanRole = String(role || '').toLowerCase().trim();

    let authenticatedUser = null;
    let authIsAdmin = false;
    let finalRole = "";

    // 1. ADMIN AUTHENTICATION
    if (cleanRole === 'admin') {
      const adminUser = String(process.env.NEXT_PUBLIC_ADMIN_USER || "Sahil").toLowerCase().trim();
      const adminPass = String(process.env.NEXT_PUBLIC_ADMIN_PASS || "Sahil1234").trim();

      if (cleanUser === adminUser && cleanPass === adminPass) {
        authenticatedUser = "Super Admin";
        authIsAdmin = true;
        finalRole = "admin";
      }
    }

    // 2. EMPLOYEE AUTHENTICATION
    else if (cleanRole === 'employee') {
      try {
        const user = await prisma.user.findFirst({
          where: {
            OR: [
              { email: cleanUser },
              { username: cleanUser },
              { name: cleanUser }
            ]
          } as any
        }) as any;

        if (user && user.password) {
          if (user.status === "Hold" || user.status === "Inactive" || user.status === "Disabled") {
            return NextResponse.json({ success: false, error: "Your account is deactivated or on hold. Please contact Admin." }, { status: 403 });
          }

          const isPasswordValid = await bcrypt.compare(cleanPass, user.password);
          if (isPasswordValid) {
            authenticatedUser = user.name; // Use the name for session context
            authIsAdmin = user.role === 'Manager'; // Or false if you strictly separate
            finalRole = "employee";
          }
        }
      } catch (dbError) {
        console.error("Auth DB Error:", dbError);
        // Do not crash the process; silently fail the auth
      }
    }

    if (authenticatedUser) {
      const token = jwt.sign(
        { username: authenticatedUser, isAdmin: authIsAdmin },
        JWT_SECRET,
        { expiresIn: "24h" }
      );

      const cookieStore = await cookies();
      cookieStore.set("session", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 24 * 60 * 60, // 24 hours
        path: "/",
      });

      return NextResponse.json({ success: true, role: finalRole }, { status: 200 });
    }

    return NextResponse.json({ success: false, error: 'Invalid Credentials' }, { status: 401 });

  } catch (error) {
    console.error("FATAL AUTH API ERROR:", error);
    return NextResponse.json({ success: false, error: 'Invalid Credentials' }, { status: 401 });
  }
}
