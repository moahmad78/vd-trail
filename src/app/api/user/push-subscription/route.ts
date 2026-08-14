import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { endpoint, keys } = body.subscription;
    
    if (!endpoint || !keys || !keys.auth || !keys.p256dh) {
      return NextResponse.json({ success: false, error: "Invalid subscription object" }, { status: 400 });
    }

    // Upsert subscription for this endpoint
    await prisma.pushSubscription.upsert({
      where: {
        username_endpoint: {
          username: session.username,
          endpoint: endpoint,
        }
      },
      update: {
        auth: keys.auth,
        p256dh: keys.p256dh,
      },
      create: {
        username: session.username,
        endpoint: endpoint,
        auth: keys.auth,
        p256dh: keys.p256dh,
      }
    });

    return NextResponse.json({ success: true, message: "Subscription saved successfully" });
  } catch (error) {
    console.error("Error saving push subscription:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { endpoint } = body;
    
    if (!endpoint) {
      return NextResponse.json({ success: false, error: "Missing endpoint" }, { status: 400 });
    }

    await prisma.pushSubscription.deleteMany({
      where: {
        username: session.username,
        endpoint: endpoint,
      }
    });

    return NextResponse.json({ success: true, message: "Subscription deleted successfully" });
  } catch (error) {
    console.error("Error deleting push subscription:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
