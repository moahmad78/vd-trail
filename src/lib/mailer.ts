import nodemailer from "nodemailer";

export interface LeadEmailPayload {
  leadId?: string;
  name: string;
  mobileNumber: string;
  email?: string | null;
  projectLocation?: string | null;
  requirement?: string | null;
  projectDetails?: string | null;
  areaSqft?: string | null;
  submissionSource?: string | null;
  promoCode?: string | null;
  timestamp?: string;
}

export async function sendLeadNotificationEmail(lead: LeadEmailPayload) {
  const receiverEmail = process.env.LEAD_RECEIVER_EMAIL || "voometd@gmail.com";
  const resendApiKey = process.env.RESEND_API_KEY;
  const smtpUser = process.env.SMTP_USER || process.env.GMAIL_USER || receiverEmail;
  const smtpPass = process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD;

  const formattedDate = lead.timestamp || new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0f172a; color: #334155; margin: 0; padding: 24px; }
    .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.15); }
    .header { background: linear-gradient(135deg, #0B1633 0%, #1e293b 100%); color: #ffffff; padding: 28px 32px; border-bottom: 3px solid #f59e0b; }
    .header h1 { margin: 0; font-size: 22px; font-weight: 700; letter-spacing: -0.5px; }
    .header p { margin: 6px 0 0 0; color: #94a3b8; font-size: 13px; }
    .content { padding: 28px 32px; }
    .lead-table { width: 100%; border-collapse: collapse; margin-top: 12px; }
    .lead-table td { padding: 12px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px; vertical-align: top; }
    .label { width: 38%; color: #64748b; font-weight: 600; text-transform: uppercase; font-size: 12px; letter-spacing: 0.5px; }
    .value { color: #0f172a; font-weight: 600; font-size: 14px; }
    .highlight { color: #d97706; font-size: 16px; font-weight: 700; }
    .phone-btn { display: inline-block; background: #0B1633; color: #ffffff !important; padding: 10px 18px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 13px; margin-top: 6px; }
    .footer { background: #f8fafc; padding: 18px 32px; font-size: 12px; color: #94a3b8; text-align: center; border-top: 1px solid #e2e8f0; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h1>🚀 New Lead Received — VoometDesign</h1>
      <p>Source: ${lead.submissionSource || "Website Form"} • ${formattedDate}</p>
    </div>
    <div class="content">
      <table class="lead-table">
        <tr>
          <td class="label">Customer Name</td>
          <td class="value">${lead.name}</td>
        </tr>
        <tr>
          <td class="label">Phone / Mobile</td>
          <td class="value">
            <span class="highlight">${lead.mobileNumber}</span><br/>
            <a href="tel:${lead.mobileNumber.replace(/\s+/g, '')}" class="phone-btn">📞 Call Customer</a>
            <a href="https://wa.me/${lead.mobileNumber.replace(/[^0-9]/g, '')}" style="display:inline-block; background:#25D366; color:#ffffff; padding:10px 18px; border-radius:8px; text-decoration:none; font-weight:600; font-size:13px; margin-top:6px; margin-left:6px;">💬 WhatsApp</a>
          </td>
        </tr>
        <tr>
          <td class="label">Email Address</td>
          <td class="value">${lead.email || "Not Provided"}</td>
        </tr>
        <tr>
          <td class="label">Requirement</td>
          <td class="value">${lead.requirement || "General Inquiry"}</td>
        </tr>
        <tr>
          <td class="label">Project Location</td>
          <td class="value">${lead.projectLocation || "Not Specified"}</td>
        </tr>
        <tr>
          <td class="label">Approx Area (Sq Ft)</td>
          <td class="value">${lead.areaSqft || "Not Specified"}</td>
        </tr>
        ${
          lead.promoCode
            ? `<tr><td class="label">Promo Code</td><td class="value" style="color: #16a34a; font-weight: 700;">${lead.promoCode}</td></tr>`
            : ""
        }
        ${
          lead.projectDetails
            ? `<tr><td class="label">Project Notes</td><td class="value" style="background:#f8fafc; padding:10px; border-radius:8px; font-weight:400;">${lead.projectDetails}</td></tr>`
            : ""
        }
      </table>
    </div>
    <div class="footer">
      VoometDesign Automation • Received directly from website lead form
    </div>
  </div>
</body>
</html>
`;

  // 1. Resend API Mode (Recommended & Free, doesn't require Google 2FA or App Passwords)
  if (resendApiKey) {
    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: process.env.RESEND_FROM || "VoometDesign <onboarding@resend.dev>",
          to: [receiverEmail],
          reply_to: lead.email || undefined,
          subject: `🔥 New Lead: ${lead.name} (${lead.requirement || "Website Inquiry"})`,
          html: htmlContent,
        }),
      });

      const resData = await response.json();
      if (response.ok) {
        console.log("[Mailer/Resend] ✅ Lead email sent via Resend API:", resData.id);
        return { success: true, messageId: resData.id };
      } else {
        console.error("[Mailer/Resend] ❌ Resend API Error:", resData);
      }
    } catch (resendErr) {
      console.error("[Mailer/Resend] ❌ Exception calling Resend:", resendErr);
    }
  }

  // 2. SMTP Mode (Gmail SMTP, Brevo, SendGrid, etc.)
  if (!smtpPass) {
    console.warn(
      "[Mailer] ⚠️ Neither RESEND_API_KEY nor SMTP_PASS is set. Skipping email dispatch. Set RESEND_API_KEY or SMTP_PASS in environment variables."
    );
    return { success: false, skipped: true, reason: "Missing email credentials" };
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT) || 465,
    secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : true,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  try {
    const info = await transporter.sendMail({
      from: `"VoometDesign Leads" <${smtpUser}>`,
      to: receiverEmail,
      replyTo: lead.email || undefined,
      subject: `🔥 New Lead: ${lead.name} (${lead.requirement || "Website Inquiry"})`,
      text: `New Lead from VoometDesign:\n\nName: ${lead.name}\nPhone: ${lead.mobileNumber}\nEmail: ${lead.email || "N/A"}\nRequirement: ${lead.requirement || "N/A"}\nLocation: ${lead.projectLocation || "N/A"}\nArea: ${lead.areaSqft || "N/A"}\nSource: ${lead.submissionSource || "Website Form"}\nDetails: ${lead.projectDetails || "N/A"}`,
      html: htmlContent,
    });

    console.log("[Mailer/SMTP] ✅ Lead email notification sent successfully:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("[Mailer/SMTP] ❌ Error sending lead notification email:", error);
    return { success: false, error };
  }
}
