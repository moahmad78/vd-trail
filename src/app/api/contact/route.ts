import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Basic Honeypot Validation
    if (body.botField) {
      return NextResponse.json({ success: false, error: "Spam detected." }, { status: 400 });
    }

    const {
      name,
      mobileNumber,
      email,
      projectLocation,
      requirement,
      projectDetails,
      areaSqft,
      submissionSource,
      promoCode,
    } = body;

    // Validate required fields
    if (!name || !mobileNumber || !requirement || !areaSqft) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    const newLead = await prisma.lead.create({
      data: {
        name,
        mobileNumber,
        email: email || null,
        projectLocation: projectLocation || null,
        requirement,
        projectDetails: projectDetails || null,
        areaSqft,
        submissionSource: submissionSource || "Website Form",
        source: "Website",
        promoCode: promoCode || null,
      },
    });

    console.log("New Lead created:", newLead.id);

    try {
      await prisma.notification.create({
        data: {
          username: "Admin",
          leadId: newLead.id,
          type: "new_lead",
          message: `New website lead received: ${name} (${requirement})`,
        }
      });
    } catch (notifErr) {
      console.error("Failed to create admin notification:", notifErr);
    }

    return NextResponse.json({ success: true, message: "Submission received.", leadId: newLead.id }, { status: 200 });
  } catch (error) {
    console.error("Form submission error:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}