import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendLeadNotificationEmail } from "@/lib/mailer";
import { appendLeadToGoogleSheet } from "@/lib/googleSheet";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Basic Honeypot Validation
    if (body.botField) {
      return NextResponse.json({ success: false, error: "Spam detected." }, { status: 400 });
    }

    // Universal field normalization so every form on the entire website works
    const rawName = (body.name || body.fullName || body.clientName || "").toString().trim();
    const rawMobile = (body.mobileNumber || body.phone || body.phoneNumber || body.whatsappNumber || "").toString().trim();
    const rawEmail = (body.email || "").toString().trim() || null;
    const projectLocation = body.projectLocation || body.location || body.city || "Bangalore";
    const requirement = body.requirement || body.position || body.service || body.projectType || (body.type === "newsletter" ? "Newsletter" : "General Inquiry");
    const projectDetails = body.projectDetails || body.details || body.resumeLink || body.notes || (body.doorType ? `Door Type: ${body.doorType}` : null);
    const areaSqft = body.areaSqft || body.area || body.quantity || "Not Specified";
    const submissionSource = body.submissionSource || (body.type ? body.type.replace(/_/g, ' ') : "Website Form");
    const promoCode = body.promoCode || null;

    // Validate that at least some contact information is provided
    if (!rawName && !rawMobile && !rawEmail) {
      return NextResponse.json({ success: false, error: "Missing contact information: Name, Phone or Email is required." }, { status: 400 });
    }

    const name = rawName || (rawEmail ? rawEmail.split("@")[0] : "Website Lead");
    const mobileNumber = rawMobile || "Not Provided";
    const email = rawEmail;
    const finalRequirement = requirement || "General Inquiry";
    const finalAreaSqft = areaSqft || "Not Specified";
    const finalSource = submissionSource || "Website Form";

    // 1. Save lead to Database (if accessible)
    let newLead: any = null;
    try {
      newLead = await prisma.lead.create({
        data: {
          name,
          mobileNumber,
          email: email || null,
          projectLocation: projectLocation || null,
          requirement: finalRequirement,
          projectDetails: projectDetails || null,
          areaSqft: finalAreaSqft,
          submissionSource: finalSource,
          source: "Website",
          promoCode: promoCode || null,
        },
      });
      console.log("New Lead created in DB:", newLead.id);
    } catch (dbErr) {
      console.error("Failed to save lead in DB (continuing to Google Sheet & Email):", dbErr);
    }

    // 2. Append lead directly to Google Sheet in real time
    try {
      await appendLeadToGoogleSheet({
        leadId: newLead?.id || "",
        name,
        mobileNumber,
        email,
        projectLocation: projectLocation || "Bangalore",
        requirement: finalRequirement,
        projectDetails,
        areaSqft: finalAreaSqft,
        submissionSource: finalSource,
        promoCode,
      });
    } catch (sheetErr) {
      console.error("Failed to append lead to Google Sheet:", sheetErr);
    }

    // 3. Send email notification to voometd@gmail.com
    try {
      await sendLeadNotificationEmail({
        leadId: newLead?.id || "N/A",
        name,
        mobileNumber,
        email,
        projectLocation,
        requirement: finalRequirement,
        projectDetails,
        areaSqft: finalAreaSqft,
        submissionSource: finalSource,
        promoCode,
      });
    } catch (emailErr) {
      console.error("Failed to send lead email notification:", emailErr);
    }

    // 4. Create internal admin notification if DB record exists
    if (newLead?.id) {
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
    }

    return NextResponse.json({ success: true, message: "Submission received.", leadId: newLead?.id || "saved" }, { status: 200 });
  } catch (error) {
    console.error("Form submission error:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}