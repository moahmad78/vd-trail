import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { sendMetaLeadStatusEvent } from "@/lib/metaConversions";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { id: leadId } = await params;
    const lead = await prisma.lead.findUnique({
      where: { id: leadId },
      include: {
        activities: {
          orderBy: { createdAt: "desc" }
        },
        messages: {
          orderBy: { createdAt: "asc" }
        },
        transfers: {
          orderBy: { createdAt: "desc" }
        }
      }
    });

    if (!lead) {
      return NextResponse.json({ success: false, error: "Lead not found" }, { status: 404 });
    }

    // Optional: check access rights if needed (Admins see all, Employees see if assigned or if they have past activities?)
    // Leaving it somewhat open if they have the ID, or strictly enforce:
    const baseUsername = session.username.replace("Pinned: ", "");
    const isOwner = lead.handledBy === session.username || lead.handledBy === `Pinned: ${baseUsername}`;
    if (!session.isAdmin && !isOwner) {
      // In some CRMs, anyone can see timeline if they have access to the link, but let's restrict:
      // Wait, the user specifically mentioned "Abhi employee login karke bhi saare leads dekh sakta hai (admin jaise hi) — ye fix karna hai."
      // So let's restrict it to admins or owner.
      return NextResponse.json({ success: false, error: "Forbidden: You do not have access to this lead's details" }, { status: 403 });
    }

    return NextResponse.json({ success: true, data: lead });
  } catch (error) {
    console.error("Error fetching lead details:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { id: leadId } = await params;
    const body = await request.json();
    const { text, attachmentUrl, attachmentType } = body;

    const baseUsername = session.username.replace("Pinned: ", "");

    // Verify lead exists and ownership
    const lead = await prisma.lead.findUnique({ where: { id: leadId } });
    if (!lead) {
      return NextResponse.json({ success: false, error: "Lead not found" }, { status: 404 });
    }

    const isOwner = lead.handledBy === session.username || lead.handledBy === `Pinned: ${baseUsername}`;
    if (!session.isAdmin && !isOwner) {
      return NextResponse.json({ success: false, error: "Forbidden: You do not have access to message this lead" }, { status: 403 });
    }

    const message = await prisma.leadMessage.create({
      data: {
        leadId,
        author: baseUsername,
        text,
        attachmentUrl,
        attachmentType,
      }
    });

    return NextResponse.json({ success: true, data: message });
  } catch (error) {
    console.error("Error posting message:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { id: leadId } = await params;
    const body = await request.json();
    
    // Extract editable fields and messages to update
    const { 
      name, 
      mobileNumber, 
      email, 
      projectLocation, 
      requirement, 
      status, 
      handledBy,
      reminderDateTime,
      messagesToUpdate
    } = body;

    const existingLead = await prisma.lead.findUnique({ where: { id: leadId } });
    if (!existingLead) {
      return NextResponse.json({ success: false, error: "Lead not found" }, { status: 404 });
    }

    // Ownership check for team members
    if (!session.isAdmin) {
      const baseUsername = session.username.replace("Pinned: ", "");
      const currentUserProfile = await prisma.user.findFirst({ where: { username: session.username } });
      const currentName = currentUserProfile?.name || session.username;

      const validOwnerNames = [
        session.username,
        `Pinned: ${session.username}`,
        currentName,
        `Pinned: ${currentName}`
      ];

      const isOwner = validOwnerNames.includes(existingLead.handledBy || "");
      const isUnassigned = !existingLead.handledBy || existingLead.handledBy === "Unassigned" || existingLead.handledBy === "";
      
      if (!isOwner && !isUnassigned) {
        return NextResponse.json({ success: false, error: "Forbidden: You cannot edit a lead assigned to another employee" }, { status: 403 });
      }

      // If the lead is unassigned and they are assigning it, they must assign it to themselves.
      if (handledBy !== undefined && isUnassigned && !isOwner) {
        if (!validOwnerNames.includes(handledBy)) {
           return NextResponse.json({ success: false, error: "Forbidden: You can only claim unassigned leads for yourself." }, { status: 403 });
        }
      }
    }

    const dataToUpdate: any = {};
    if (name !== undefined) dataToUpdate.name = name;
    if (mobileNumber !== undefined) dataToUpdate.mobileNumber = mobileNumber;
    if (email !== undefined) dataToUpdate.email = email;
    if (projectLocation !== undefined) dataToUpdate.projectLocation = projectLocation;
    if (body.areaSqft !== undefined) dataToUpdate.areaSqft = body.areaSqft;
    if (body.source !== undefined) dataToUpdate.source = body.source;
    if (requirement !== undefined) dataToUpdate.requirement = requirement;
    if (status !== undefined) dataToUpdate.status = status;
    if (body.isTrashed !== undefined) dataToUpdate.isTrashed = Boolean(body.isTrashed);
    
    if (handledBy !== undefined) {
      dataToUpdate.handledBy = handledBy;
      
      // Auto-reset logic when a lead is released/unassigned
      const isNowUnassigned = handledBy === null || handledBy === "Unassigned" || handledBy === "";
      const wasAssigned = existingLead.handledBy && existingLead.handledBy !== "Unassigned" && existingLead.handledBy !== "";
      
      if (isNowUnassigned && wasAssigned) {
        dataToUpdate.status = "New Lead";
        dataToUpdate.reminderDateTime = null;
        dataToUpdate.reminderSent = false;
      }
    }

    if (reminderDateTime !== undefined && dataToUpdate.reminderDateTime === undefined) {
      dataToUpdate.reminderDateTime = reminderDateTime ? new Date(reminderDateTime) : null;
      dataToUpdate.reminderSent = false;
    }

    // Handle nested messages if provided
    if (messagesToUpdate && Array.isArray(messagesToUpdate) && messagesToUpdate.length > 0) {
      dataToUpdate.messages = {
        update: messagesToUpdate.map((msg: any) => ({
          where: { id: msg.id },
          data: { text: msg.text }
        }))
      };
    }

    const updatedLead = await prisma.lead.update({
      where: { id: leadId },
      data: dataToUpdate,
    });

    // Post lead status change event from CRM to Meta Conversions API
    if (status && status !== existingLead.status) {
      try {
        await sendMetaLeadStatusEvent({
          leadId: updatedLead.id,
          name: updatedLead.name,
          mobileNumber: updatedLead.mobileNumber,
          email: updatedLead.email,
          projectLocation: updatedLead.projectLocation,
          requirement: updatedLead.requirement,
          oldStatus: existingLead.status,
          newStatus: status,
          handledBy: updatedLead.handledBy,
        });
      } catch (metaErr) {
        console.error("Failed to post lead status event to Meta CAPI:", metaErr);
      }
    }

    // Check if handledBy changed to log the transfer activity
    if (handledBy !== undefined && handledBy !== existingLead.handledBy) {
      const isAssigningSelf = handledBy === session.username || handledBy === `Pinned: ${session.username.replace("Pinned: ", "")}`;
      let activityType = "assigned";
      
      if (!session.isAdmin && isAssigningSelf && (!existingLead.handledBy || existingLead.handledBy === "Unassigned")) {
        activityType = "claimed";
      } else if (handledBy === null || handledBy === "Unassigned" || handledBy === "") {
        activityType = session.isAdmin ? "unassigned" : "unclaimed";
      } else if (!session.isAdmin && !isAssigningSelf) {
        activityType = "transfer_accepted"; // Employee transferring it away
      }

      const releaseNote = (activityType === "unassigned" || activityType === "unclaimed")
        ? `Lead released and reset to New Lead status by ${session.username}`
        : undefined;

      await prisma.leadActivity.create({
        data: {
          leadId,
          type: activityType,
          fromUser: session.username,
          toUser: handledBy,
          note: releaseNote,
        }
      });

      if (activityType === "claimed" || activityType === "unclaimed") {
        try {
          await prisma.notification.create({
            data: {
              username: "Admin",
              leadId,
              type: activityType === "claimed" ? "lead_claimed" : "lead_unclaimed",
              message: activityType === "claimed"
                ? `Lead ${existingLead.name} was claimed by ${session.username}`
                : `Lead ${existingLead.name} was released back to the pool by ${session.username}`,
            }
          });
        } catch (notifErr) {
          console.error("Failed to create admin notification:", notifErr);
        }
      }
    }

    return NextResponse.json({ success: true, data: updatedLead }, { status: 200 });
  } catch (error) {
    console.error("Error updating lead details:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { id: leadId } = await params;
    const { searchParams } = new URL(request.url);
    const isPermanent = searchParams.get("permanent") === "true";

    const existingLead = await prisma.lead.findUnique({ where: { id: leadId } });
    if (!existingLead) {
      // Return 200 idempotent response if lead is already removed/not found
      return NextResponse.json({ success: true, message: "Lead already removed or does not exist" }, { status: 200 });
    }

    if (isPermanent) {
      // PERMANENT (HARD) DELETE - ADMIN ONLY
      if (!session.isAdmin) {
        return NextResponse.json({ success: false, error: "Forbidden: Only Admin can permanently delete leads" }, { status: 403 });
      }

      // Record tombstone in AdminAuditLog so sheet auto-sync never resurrects this lead
      try {
        await prisma.adminAuditLog.create({
          data: {
            adminUsername: session.username || "Admin",
            action: "PERMANENT_DELETE_LEAD",
            targetType: "Lead",
            targetId: leadId,
            details: JSON.stringify({
              phone: existingLead.mobileNumber,
              name: existingLead.name,
              deletedAt: new Date().toISOString(),
            }),
          },
        });
      } catch (logErr) {
        console.error("Failed to log deleted lead tombstone:", logErr);
      }

      // Explicitly delete related records
      await prisma.leadActivity.deleteMany({ where: { leadId } });
      await prisma.leadMessage.deleteMany({ where: { leadId } });
      await prisma.leadTransfer.deleteMany({ where: { leadId } });
      await prisma.notification.deleteMany({ where: { leadId } });

      // Delete Lead record
      await prisma.lead.delete({ where: { id: leadId } });

      return NextResponse.json({ success: true, message: "Lead permanently deleted from database" }, { status: 200 });
    } else {
      // SOFT DELETE (Move to trash)
      if (!session.isAdmin) {
        const currentUserProfile = await prisma.user.findFirst({ where: { username: session.username } });
        const currentName = currentUserProfile?.name || session.username;

        const validOwnerNames = [
          session.username,
          `Pinned: ${session.username}`,
          currentName,
          `Pinned: ${currentName}`
        ];

        const isOwner = validOwnerNames.includes(existingLead.handledBy || "");
        if (!isOwner) {
          return NextResponse.json({ success: false, error: "Forbidden: You cannot trash this lead" }, { status: 403 });
        }
      }

      const trashedLead = await prisma.lead.update({
        where: { id: leadId },
        data: { isTrashed: true },
      });

      return NextResponse.json({ success: true, data: trashedLead }, { status: 200 });
    }
  } catch (error) {
    console.error("Error deleting lead:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}

