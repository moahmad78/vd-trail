import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    // username in DB usually doesn't have "Pinned: " prefix, but let's be safe
    const baseUsername = session.username.replace("Pinned: ", "");

    const notifications = await prisma.notification.findMany({
      where: { username: baseUsername },
      orderBy: { createdAt: "desc" },
      take: 50, // limit to recent 50
    });

    return NextResponse.json({ success: true, data: notifications }, { status: 200 });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const baseUsername = session.username.replace("Pinned: ", "");
    
    if (body.markAllRead) {
      await prisma.notification.updateMany({
        where: { username: baseUsername, isRead: false },
        data: { isRead: true }
      });
      return NextResponse.json({ success: true }, { status: 200 });
    }

    if (body.notificationId) {
      const notif = await prisma.notification.findUnique({ where: { id: body.notificationId } });
      if (!notif || notif.username !== baseUsername) {
        return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 });
      }

      const updated = await prisma.notification.update({
        where: { id: body.notificationId },
        data: { isRead: true }
      });
      return NextResponse.json({ success: true, data: updated }, { status: 200 });
    }

    return NextResponse.json({ success: false, error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("Error updating notifications:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
