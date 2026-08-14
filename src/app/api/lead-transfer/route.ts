import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const baseUsername = session.username.replace("Pinned: ", "");

    const pendingTransfers = await prisma.leadTransfer.findMany({
      where: { 
        toEmployee: baseUsername,
        status: "pending" 
      },
      include: {
        lead: {
          select: { name: true, projectLocation: true, requirement: true }
        }
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, data: pendingTransfers }, { status: 200 });
  } catch (error) {
    console.error("Error fetching transfers:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { leadId, toEmployee, note } = body;
    const fromEmployee = session.username.replace("Pinned: ", "");

    if (!leadId || !toEmployee) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    // Verify ownership
    const lead = await prisma.lead.findUnique({ where: { id: leadId } });
    if (!lead) {
      return NextResponse.json({ success: false, error: "Lead not found" }, { status: 404 });
    }

    // Only allow if admin, or if they own it
    const isOwner = lead.handledBy === fromEmployee || lead.handledBy === `Pinned: ${fromEmployee}`;
    if (!session.isAdmin && !isOwner) {
      return NextResponse.json({ success: false, error: "Forbidden: You do not own this lead" }, { status: 403 });
    }

    const transfer = await prisma.leadTransfer.create({
      data: {
        leadId,
        fromEmployee,
        toEmployee: toEmployee.replace("Pinned: ", ""),
        note,
        status: "pending"
      }
    });

    await prisma.leadActivity.create({
      data: {
        leadId,
        type: "transfer_requested",
        fromUser: fromEmployee,
        toUser: toEmployee.replace("Pinned: ", ""),
        note
      }
    });

    await prisma.notification.create({
      data: {
        username: toEmployee.replace("Pinned: ", ""),
        leadId,
        type: "transfer_request",
        message: `${fromEmployee} ne aapko ek lead transfer karne ki request bheji hai: ${lead.name}`,
      }
    });

    try {
      await prisma.notification.create({
        data: {
          username: "Admin",
          leadId,
          type: "transfer_request",
          message: `Lead transfer request: ${fromEmployee} -> ${toEmployee.replace("Pinned: ", "")} (${lead.name})`,
        }
      });
    } catch (notifErr) {
      console.error("Failed to notify admin on transfer:", notifErr);
    }

    return NextResponse.json({ success: true, data: transfer }, { status: 200 });
  } catch (error) {
    console.error("Error creating transfer:", error);
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
    const { transferId, action } = body; // action: "accept" | "reject"
    const currentUser = session.username.replace("Pinned: ", "");

    if (!transferId || !action) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    const transfer = await prisma.leadTransfer.findUnique({ 
      where: { id: transferId },
      include: { lead: true }
    });

    if (!transfer) {
      return NextResponse.json({ success: false, error: "Transfer not found" }, { status: 404 });
    }

    if (transfer.toEmployee !== currentUser && !session.isAdmin) {
      return NextResponse.json({ success: false, error: "Forbidden: Not your transfer request" }, { status: 403 });
    }

    if (transfer.status !== "pending") {
      return NextResponse.json({ success: false, error: "Transfer is already " + transfer.status }, { status: 400 });
    }

    const statusMap = action === "accept" ? "accepted" : "rejected";
    
    await prisma.leadTransfer.update({
      where: { id: transferId },
      data: { 
        status: statusMap,
        respondedAt: new Date()
      }
    });

    if (action === "accept") {
      await prisma.lead.update({
        where: { id: transfer.leadId },
        data: { handledBy: transfer.toEmployee } // removing 'Pinned:' prefix from handledBy when transferred
      });

      await prisma.leadActivity.create({
        data: {
          leadId: transfer.leadId,
          type: "transfer_accepted",
          fromUser: currentUser,
          toUser: transfer.fromEmployee
        }
      });

      await prisma.notification.create({
        data: {
          username: transfer.fromEmployee,
          leadId: transfer.leadId,
          type: "transfer_accepted",
          message: `${currentUser} ne aapki lead transfer request accept kar li hai: ${transfer.lead.name}`,
        }
      });
    } else {
      await prisma.leadActivity.create({
        data: {
          leadId: transfer.leadId,
          type: "transfer_rejected",
          fromUser: currentUser,
          toUser: transfer.fromEmployee
        }
      });

      await prisma.notification.create({
        data: {
          username: transfer.fromEmployee,
          leadId: transfer.leadId,
          type: "transfer_rejected",
          message: `${currentUser} ne aapki lead transfer request REJECT kar di hai: ${transfer.lead.name}`,
        }
      });
    }

    return NextResponse.json({ success: true, message: `Transfer ${statusMap}` }, { status: 200 });
  } catch (error) {
    console.error("Error updating transfer:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
