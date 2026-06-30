import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Basic Honeypot Validation
    if (body.botField) {
      return NextResponse.json({ success: false, error: "Spam detected." }, { status: 400 });
    }

    // Log for demonstration (In production, wire this to Nodemailer / Resend)
    console.log("New Submission to info@voometdesign.com:", body);

    return NextResponse.json({ success: true, message: "Submission received." }, { status: 200 });
  } catch (error) {
    console.error("Form submission error:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}