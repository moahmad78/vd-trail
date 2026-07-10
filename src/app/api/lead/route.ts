import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const leads = await prisma.lead.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json({ success: true, data: leads }, { status: 200 });
  } catch (error) {
    console.error("Error fetching leads:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}

const TEAM_MEMBERS: Record<string, string> = {
  "Sahil": "1234",
  "Design Admin": "2222",
  "Team Member 1": "3333",
  "Team Member 2": "4444",
  "Team Member 3": "5555",
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Handle Lead Creation
    if (body.action === 'create_lead') {
      const { name, mobileNumber, projectLocation, requirement, areaSqft, source, handledBy } = body;
      if (!name || !mobileNumber || !requirement || !areaSqft) {
        return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
      }

      const newLead = await prisma.lead.create({
        data: {
          name,
          mobileNumber,
          projectLocation,
          requirement,
          areaSqft,
          source: source || "Website",
          handledBy: handledBy || "Unassigned",
          submissionSource: "Manual Admin Entry",
        },
      });

      return NextResponse.json({ success: true, data: newLead }, { status: 201 });
    }

    // Handle Authentication
    const { username, pin, isAdmin } = body;
    if (!username || !pin) {
      return NextResponse.json({ success: false, error: "Username and PIN required" }, { status: 400 });
    }
    
    if (isAdmin) {
      if (username === "Sahil" && pin === "Sahil1234") {
        return NextResponse.json({ success: true, user: "Super Admin" }, { status: 200 });
      }
      return NextResponse.json({ success: false, error: "Invalid Admin Credentials" }, { status: 401 });
    }

    const validPin = TEAM_MEMBERS[username];
    if (validPin && validPin === pin) {
      return NextResponse.json({ success: true, user: username }, { status: 200 });
    } else {
      return NextResponse.json({ success: false, error: "Invalid Access PIN" }, { status: 401 });
    }
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { id, status, handledBy, notes } = await req.json();

    if (!id) {
      return NextResponse.json({ success: false, error: "Missing Lead ID" }, { status: 400 });
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

