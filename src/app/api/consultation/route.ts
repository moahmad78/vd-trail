import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // ---------------------------------------------------------
    // MOCKED BACKEND ACTIONS
    // ---------------------------------------------------------
    
    // 1. Save lead to Database
    console.log('\n[API/CONSULTATION] ✅ Lead saved to database:', data);

    // 2. Send confirmation Email to the user
    console.log(`[API/CONSULTATION] 📧 Confirmation email sent to: ${data.email}`);

    // 3. Send notification Email to Admin
    console.log('[API/CONSULTATION] 🛡️ Admin notification email triggered');

    // 4. Trigger WhatsApp notification to the business number
    console.log(`[API/CONSULTATION] 📱 WhatsApp notification sent for new lead: ${data.fullName}`);

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
