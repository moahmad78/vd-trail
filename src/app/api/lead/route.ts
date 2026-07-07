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
    const { username, pin } = await req.json();
    if (!username || !pin) {
      return NextResponse.json({ success: false, error: "Username and PIN required" }, { status: 400 });
    }
    
    const validPin = TEAM_MEMBERS[username];
    if (validPin && validPin === pin) {
      return NextResponse.json({ success: true, user: username }, { status: 200 });
    } else {
      return NextResponse.json({ success: false, error: "Invalid Access PIN" }, { status: 401 });
    }
  } catch (error) {
    console.error("Auth Error:", error);
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

