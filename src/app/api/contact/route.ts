import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendLeadNotificationEmail } from "@/lib/mailer";

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

    // Validate essential required fields
    if (!name || !mobileNumber) {
      return NextResponse.json({ success: false, error: "Missing required fields: Name and Phone Number are required." }, { status: 400 });
    }

    const finalRequirement = requirement || "General Inquiry";
    const finalAreaSqft = areaSqft || "Not Specified";

    const newLead = await prisma.lead.create({
      data: {
        name,
        mobileNumber,
        email: email || null,
        projectLocation: projectLocation || null,
        requirement: finalRequirement,
        projectDetails: projectDetails || null,
        areaSqft: finalAreaSqft,
        submissionSource: submissionSource || "Website Form",
        source: "Website",
        promoCode: promoCode || null,
      },
    });

    console.log("New Lead created:", newLead.id);

    // Send email notification to voometd@gmail.com
    try {
      await sendLeadNotificationEmail({
        leadId: newLead.id,
        name,
        mobileNumber,
        email,
        projectLocation,
        requirement: finalRequirement,
        projectDetails,
        areaSqft: finalAreaSqft,
        submissionSource: submissionSource || "Website Form",
        promoCode,
      });
    } catch (emailErr) {
      console.error("Failed to send lead email notification:", emailErr);
    }

    try {
      await prisma.notification.create({
        data: {
          username: "Admin",
          leadId: newLead.id,
          type: "new_lead",
          message: `New website lead received: ${name} (${finalRequirement})`,
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