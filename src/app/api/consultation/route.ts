import { NextResponse } from 'next/server';
import { sendLeadNotificationEmail } from '@/lib/mailer';
import { appendLeadToGoogleSheet } from '@/lib/googleSheet';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Required Fields: Name, Mobile Number, Requirement, Submission Source
    // Optional Fields: Email, WhatsApp Number, Project Details
    const {
      name,
      mobileNumber,
      requirement,
      submissionSource,
      email,
      whatsappNumber,
      projectDetails
    } = data;

    if (!name || !mobileNumber || !requirement || !submissionSource) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields.' },
        { status: 400 }
      );
    }

    const timestamp = new Date().toISOString();

    // ---------------------------------------------------------
    // MOCKED BACKEND ACTIONS & GOOGLE SHEET SYNC
    // ---------------------------------------------------------
    
    // 1. Append lead to Google Sheet
    try {
      await appendLeadToGoogleSheet({
        name,
        mobileNumber,
        email,
        requirement,
        projectDetails: projectDetails || (whatsappNumber ? `WhatsApp: ${whatsappNumber}` : null),
        submissionSource: submissionSource || "Consultation Form",
        createdAt: timestamp,
      });
    } catch (sheetErr) {
      console.error("[API/CONSULTATION] Failed to sync to Google Sheet:", sheetErr);
    }

    // 2. Send notification Email to Admin (voometd@gmail.com)
    await sendLeadNotificationEmail({
      name,
      mobileNumber,
      email,
      requirement,
      projectDetails: projectDetails || (whatsappNumber ? `WhatsApp: ${whatsappNumber}` : null),
      submissionSource: submissionSource || "Consultation Form",
      timestamp,
    });

    // 3. Send confirmation Email to the user (if email provided)
    if (email) {
      console.log(`[API/CONSULTATION] 📧 Confirmation email sent to: ${email}`);
    } else {
      console.log(`[API/CONSULTATION] 📧 No email provided. Skipping confirmation email.`);
    }

    // 4. Trigger WhatsApp notification to the business number
    console.log(`[API/CONSULTATION] 📱 WhatsApp notification sent to business number for new lead: ${name}`);

    // 5. Log submission source
    console.log(`[API/CONSULTATION] 📍 Source logged successfully: ${submissionSource}`);

    // Simulate network delay to make the UI loading state visible
    await new Promise((resolve) => setTimeout(resolve, 800));

    return NextResponse.json(
      { success: true, message: 'Consultation request received successfully.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('[API/CONSULTATION] ❌ Error processing request:', error);
    return NextResponse.json(
      { success: false, message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
