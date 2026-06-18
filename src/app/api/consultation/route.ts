import { NextResponse } from 'next/server';

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
    // MOCKED BACKEND ACTIONS
    // ---------------------------------------------------------
    
    // 1. Save lead to Database
    console.log('\n[API/CONSULTATION] ✅ Lead saved to database:');
    console.table({
      Name: name,
      'Mobile Number': mobileNumber,
      Requirement: requirement,
      Source: submissionSource,
      Timestamp: timestamp,
      Email: email || 'Not provided',
      'WhatsApp Number': whatsappNumber || 'Not provided',
      'Project Details': projectDetails || 'Not provided'
    });

    // 2. Send notification Email to Admin
    console.log(`[API/CONSULTATION] 🛡️ Admin notification email triggered for lead: ${name}`);

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
