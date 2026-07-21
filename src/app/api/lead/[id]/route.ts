import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

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
      messagesToUpdate
    } = body;

    const existingLead = await prisma.lead.findUnique({ where: { id: leadId } });
    if (!existingLead) {
      return NextResponse.json({ success: false, error: "Lead not found" }, { status: 404 });
    }

    // Ownership check for team members
    if (!session.isAdmin) {
      const baseUsername = session.username.replace("Pinned: ", "");
      const isOwner = existingLead.handledBy === session.username || existingLead.handledBy === `Pinned: ${baseUsername}`;
      const isUnassigned = !existingLead.handledBy || existingLead.handledBy === "Unassigned" || existingLead.handledBy === "";
      
      if (!isOwner && !isUnassigned) {
        return NextResponse.json({ success: false, error: "Forbidden: You cannot edit a lead assigned to another employee" }, { status: 403 });
      }
    }

    const dataToUpdate: any = {};
    if (name !== undefined) dataToUpdate.name = name;
    if (mobileNumber !== undefined) dataToUpdate.mobileNumber = mobileNumber;
    if (email !== undefined) dataToUpdate.email = email;
    if (projectLocation !== undefined) dataToUpdate.projectLocation = projectLocation;
    if (requirement !== undefined) dataToUpdate.requirement = requirement;
    if (status !== undefined) dataToUpdate.status = status;
    if (handledBy !== undefined) dataToUpdate.handledBy = handledBy;

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

    // Check if handledBy changed to log the transfer activity
    if (handledBy !== undefined && handledBy !== existingLead.handledBy) {
      const isAssigningSelf = handledBy === session.username || handledBy === `Pinned: ${session.username.replace("Pinned: ", "")}`;
      let activityType = "assigned";
      
      if (!session.isAdmin && isAssigningSelf && (!existingLead.handledBy || existingLead.handledBy === "Unassigned")) {
        activityType = "claimed";
      } else if (!session.isAdmin && !isAssigningSelf) {
        activityType = "transfer_accepted"; // Employee transferring it away
      }

      await prisma.leadActivity.create({
        data: {
          leadId,
          type: activityType,
          fromUser: session.username,
          toUser: handledBy,
        }
      });
    }

    return NextResponse.json({ success: true, data: updatedLead }, { status: 200 });
  } catch (error) {
    console.error("Error updating lead details:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
