import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret_for_dev_only_please_change";

export interface SessionData {
  username: string;
  isAdmin: boolean;
}

export async function getSession(): Promise<SessionData | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;

  if (!token) {
    return null;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as SessionData;
    return {
      username: decoded.username,
      isAdmin: decoded.isAdmin
    };
  } catch (error) {
    return null;
  }
}
