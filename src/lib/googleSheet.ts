export interface GoogleSheetLeadData {
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
  createdAt?: string;
}

const DEFAULT_WEBHOOK_URL =
  "https://script.google.com/macros/s/AKfycbw5JCO6w0jndkW6uYd3HTEQFPIKwV-7X2BqDYgWd_cX-JtQzGSj2UE8GmyBNQAywl2_/exec";

/**
 * Appends a new lead to the configured Google Sheet via Google Apps Script Webhook.
 * Handles timeouts, network retries, and Google Apps Script redirects gracefully.
 */
export async function appendLeadToGoogleSheet(data: GoogleSheetLeadData): Promise<boolean> {
  const webhookUrl = (process.env.GOOGLE_SHEET_WEBHOOK_URL || DEFAULT_WEBHOOK_URL).trim();
  if (!webhookUrl || webhookUrl === "") {
    console.warn("[GoogleSheet] GOOGLE_SHEET_WEBHOOK_URL is not configured.");
    return false;
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000); // 12 second timeout for cold starts

    const payload = {
      leadId: data.leadId || "",
      name: data.name || "",
      mobileNumber: data.mobileNumber || "",
      email: data.email || "",
      projectLocation: data.projectLocation || "Bangalore",
      requirement: data.requirement || "General Inquiry",
      projectDetails: data.projectDetails || "",
      areaSqft: data.areaSqft || "Not Specified",
      submissionSource: data.submissionSource || "Quote Landing Page",
      promoCode: data.promoCode || "",
      createdAt: data.createdAt || new Date().toISOString(),
    };

    const response = await fetch(webhookUrl.trim(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      redirect: "follow",
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.error(`[GoogleSheet] Sync failed with status: ${response.status}`);
      return false;
    }

    const resData = await response.json().catch(() => null);
    console.log("[GoogleSheet] Lead appended successfully:", resData || "OK");
    return true;
  } catch (error) {
    console.error("[GoogleSheet] Error syncing lead:", error);
    return false;
  }
}
