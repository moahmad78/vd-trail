import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import webPush from "web-push";

webPush.setVapidDetails(
  "mailto:admin@voometdesign.com",
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || "",
  process.env.VAPID_PRIVATE_KEY || ""
);

export async function GET(request: Request) {
  try {
    // 1. Verify Cron Token to prevent public abuse
    const authHeader = request.headers.get("authorization");
    if (authHeader !== `Bearer ${process.env.CRON_SECRET || 'secret'}`) {
      return NextResponse.json({ success: false, error: "Unauthorized cron trigger" }, { status: 401 });
    }

    const now = new Date();

    // 2. Query due reminders
    const dueLeads = await prisma.lead.findMany({
      where: {
        reminderDateTime: { lte: now },
        reminderSent: false,
        handledBy: { not: null }
      }
    });

    if (dueLeads.length === 0) {
      return NextResponse.json({ success: true, message: "No due reminders found" });
    }

    let notificationsSent = 0;

    // 3. Process each due lead
    for (const lead of dueLeads) {
      if (!lead.handledBy || lead.handledBy === "Unassigned") continue;

      const employeeUsername = lead.handledBy.replace("Pinned: ", "");
      
      // Get push subscriptions for this user
      const subscriptions = await prisma.pushSubscription.findMany({
        where: { username: employeeUsername }
      });

      // Prepare payload
      const payload = JSON.stringify({
        title: "⏰ Callback Reminder",
        body: `${lead.name} requires follow-up. (${lead.requirement})`,
        url: "/lead"
      });

      // Send to all endpoints of this user
      for (const sub of subscriptions) {
        try {
          await webPush.sendNotification({
            endpoint: sub.endpoint,
            keys: { auth: sub.auth, p256dh: sub.p256dh }
          }, payload);
          notificationsSent++;
        } catch (pushErr: any) {
          if (pushErr.statusCode === 410 || pushErr.statusCode === 404) {
            // Subscription has expired or is invalid, delete it
            await prisma.pushSubscription.delete({ where: { id: sub.id } });
          } else {
            console.error("Push Error:", pushErr);
          }
        }
      }

      // 4. In-App Notification Integration (Phase 4 requirement)
      await prisma.notification.create({
        data: {
          username: employeeUsername,
          leadId: lead.id,
          type: "callback_reminder",
          message: `Reminder: You have a scheduled callback for ${lead.name} (${lead.status})`
        }
      });

      // 5. Mark reminder as sent
      await prisma.lead.update({
        where: { id: lead.id },
        data: { reminderSent: true }
      });
    }

    return NextResponse.json({ 
      success: true, 
      message: `Processed ${dueLeads.length} leads. Sent ${notificationsSent} push notifications.` 
    });

  } catch (error) {
    console.error("Cron Error:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
