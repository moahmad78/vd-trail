import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export const dynamic = 'force-dynamic';

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret_for_dev_only_please_change";

export async function GET(req: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const url = new URL(req.url);
    const isTrashed = url.searchParams.get("trashed") === "true";

    let queryOptions: any = {
      orderBy: [
        { isPinned: "desc" },
        { createdAt: "desc" }
      ],
      where: {
        isTrashed: isTrashed
      }
    };

    if (!session.isAdmin) {
      queryOptions.where.OR = [
        { handledBy: `Pinned: ${session.username}` },
        { handledBy: session.username },
        { handledBy: "Unassigned" },
        { handledBy: null },
        { handledBy: "" }
      ];
    } else {
      const employeeFilter = url.searchParams.get("employee");
      if (employeeFilter && employeeFilter !== "All") {
        queryOptions.where.handledBy = employeeFilter;
      }
    }

    const leads = await prisma.lead.findMany(queryOptions);

    let stats = null;
    if (session.isAdmin) {
      stats = await prisma.lead.groupBy({
        by: ['handledBy'],
        _count: { id: true }
      });
    }

    return NextResponse.json({ success: true, data: leads, stats }, { status: 200 });
  } catch (error) {
    console.error("Error fetching leads:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}

// TEAM_MEMBERS hardcoded auth removed in favor of environment variables

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Handle Logout
    if (body.action === 'logout') {
      const cookieStore = await cookies();
      cookieStore.delete("session");
      return NextResponse.json({ success: true }, { status: 200 });
    }

    // Handle Lead Creation
    if (body.action === 'create_lead') {
      const session = await getSession();
      if (!session) {
        return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
      }

      const { name, mobileNumber, projectLocation, requirement, areaSqft, source, handledBy } = body;
      if (!name || !mobileNumber || !requirement || !areaSqft) {
        return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
      }

      let finalHandledBy = handledBy || "Unassigned";
      if (!session.isAdmin) {
        finalHandledBy = `Pinned: ${session.username}`;
      }

      const newLead = await prisma.lead.create({
        data: {
          name,
          mobileNumber,
          projectLocation,
          requirement,
          areaSqft,
          source: source || "Website",
          handledBy: finalHandledBy,
          submissionSource: "Manual Admin Entry",
        },
      });

      return NextResponse.json({ success: true, data: newLead }, { status: 201 });
    }

    return NextResponse.json({ success: false, error: "Authentication moved to /api/auth" }, { status: 400 });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { id, action, status, handledBy, notes } = await req.json();

    if (!id) {
      return NextResponse.json({ success: false, error: "Missing Lead ID" }, { status: 400 });
    }

    // Advanced Actions
    if (action === "pin" || action === "unpin") {
      if (!session.isAdmin) return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 });
      
      const newPinnedState = action === "pin";
      const updatedLead = await prisma.lead.update({
        where: { id },
        data: { isPinned: newPinnedState }
      });

      await prisma.leadActivity.create({
        data: {
          leadId: id,
          type: action === "pin" ? "pinned" : "unpinned",
          fromUser: session.username,
        }
      });

      return NextResponse.json({ success: true, data: updatedLead }, { status: 200 });
    }

    if (action === "trash" || action === "recover") {
      if (!session.isAdmin) return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 });
      
      const newTrashedState = action === "trash";
      const updatedLead = await prisma.lead.update({
        where: { id },
        data: { isTrashed: newTrashedState }
      });

      await prisma.leadActivity.create({
        data: {
          leadId: id,
          type: action === "trash" ? "trashed" : "recovered",
          fromUser: session.username,
        }
      });

      return NextResponse.json({ success: true, data: updatedLead }, { status: 200 });
    }

    if (action === "delete") {
      if (!session.isAdmin) return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 });
      
      // Hard delete
      // Cascade delete related records first if not configured in Prisma
      await prisma.leadActivity.deleteMany({ where: { leadId: id } });
      await prisma.leadTransfer.deleteMany({ where: { leadId: id } });
      await prisma.notification.deleteMany({ where: { leadId: id } });
      await prisma.leadMessage.deleteMany({ where: { leadId: id } });
      
      await prisma.lead.delete({
        where: { id }
      });

      return NextResponse.json({ success: true, data: { id } }, { status: 200 });
    }

    if (action === "assign") {
      if (!session.isAdmin) return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 });
      
      const updatedLead = await prisma.lead.update({
        where: { id },
        data: { 
          handledBy: handledBy,
          assignedBy: session.username 
        }
      });

      await prisma.leadActivity.create({
        data: {
          leadId: id,
          type: "assigned",
          fromUser: session.username,
          toUser: handledBy,
        }
      });

      if (handledBy !== "Unassigned" && handledBy !== "") {
        await prisma.notification.create({
          data: {
            username: handledBy.replace("Pinned: ", ""),
            leadId: id,
            type: "assigned",
            message: `Aapko ek naya lead assign kiya gaya hai: ${updatedLead.name}`,
          }
        });
      }

      return NextResponse.json({ success: true, data: updatedLead }, { status: 200 });
    }

    // Standard fallback updates (Employees & Admins)

    if (!session.isAdmin) {
      const existingLead = await prisma.lead.findUnique({ where: { id } });
      if (!existingLead) {
        return NextResponse.json({ success: false, error: "Lead not found" }, { status: 404 });
      }
      
      const isOwner = existingLead.handledBy === `Pinned: ${session.username}` || existingLead.handledBy === session.username;
      const isUnassigned = !existingLead.handledBy || existingLead.handledBy === "Unassigned" || existingLead.handledBy === "";
      
      if (!isOwner && !isUnassigned) {
        return NextResponse.json({ success: false, error: "Forbidden: You cannot modify leads assigned to others." }, { status: 403 });
      }

      if (handledBy !== undefined) {
        const tryingToAssignToSelf = handledBy === `Pinned: ${session.username}` || handledBy === session.username;
        const tryingToUnassign = handledBy === "Unassigned" || handledBy === "" || handledBy === null;
        if (!tryingToAssignToSelf && !tryingToUnassign) {
           return NextResponse.json({ success: false, error: "Forbidden: You can only claim leads for yourself." }, { status: 403 });
        }
      }
    }

    const dataToUpdate: any = {};
    if (status) dataToUpdate.status = status;
    if (handledBy) dataToUpdate.handledBy = handledBy;
    if (notes !== undefined) dataToUpdate.notes = notes;

    const updatedLead = await prisma.lead.update({
      where: { id },
      data: dataToUpdate,
    });

    return NextResponse.json({ success: true, data: updatedLead }, { status: 200 });
  } catch (error) {
    console.error("Error updating lead status:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}

