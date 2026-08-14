import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getSession();
    if (!session || !session.isAdmin) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 403 });
    }

    let logs: any[] = [];
    try {
      if ((prisma as any).adminAuditLog) {
        logs = await (prisma as any).adminAuditLog.findMany({
          orderBy: { timestamp: "desc" },
          take: 100,
        });
      } else {
        logs = await prisma.$queryRaw`SELECT * FROM "AdminAuditLog" ORDER BY "timestamp" DESC LIMIT 100`;
      }
    } catch (dbErr) {
      console.warn("AuditLog DB query fallback:", dbErr);
      logs = [];
    }

    return NextResponse.json({ success: true, data: logs });
  } catch (error) {
    console.error("Error fetching audit logs:", error);
    return NextResponse.json({ success: true, data: [] });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session || !session.isAdmin) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 403 });
    }

    const { action, targetType, targetId, details } = await req.json();

    try {
      if ((prisma as any).adminAuditLog) {
        const log = await (prisma as any).adminAuditLog.create({
          data: {
            adminUsername: session.username,
            action,
            targetType,
            targetId: targetId || null,
            details: details || null,
          }
        });
        return NextResponse.json({ success: true, data: log });
      } else {
        await prisma.$executeRaw`INSERT INTO "AdminAuditLog" ("id", "adminUsername", "action", "targetType", "targetId", "details", "timestamp") VALUES (gen_random_uuid(), ${session.username}, ${action}, ${targetType}, ${targetId || null}, ${details || null}, NOW())`;
        return NextResponse.json({ success: true });
      }
    } catch (insertErr) {
      console.error("Audit log insert error:", insertErr);
      return NextResponse.json({ success: false, error: "Failed to create log" }, { status: 500 });
    }
  } catch (error) {
    console.error("Error in POST audit log:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
