import crypto from "crypto";

export const META_CONFIG = {
  DATASET_ID: process.env.META_DATASET_ID || "1434564675397419",
  API_VERSION: process.env.META_API_VERSION || "v26.0",
  ACCESS_TOKEN:
    process.env.META_ACCESS_TOKEN ||
    "EAAh0jZB9k3TkBSzU2lvDzMANrcNZAcC8yHxMHciw4Kg7yByz4vNVpZAqKCJHVKbkhqhPzuTZAGoRATFazDd9ujAYkKZB9ZAdPM4TQcDBwU3l0a3Dxfoo6Y2x4EpEktziNaJYu1r5ZCqNEOZCqTM4YsCfTRdTC2baHtjw5mMK1gmeN9H05QXAeZBkhdI3CevqEsKXUbwZDZD",
};

/**
 * SHA-256 hex hash helper required by Meta Conversions API
 */
export function sha256(value: string): string {
  return crypto.createHash("sha256").update(value.trim().toLowerCase()).digest("hex");
}

/**
 * Formats a phone number into international format (digits only) and hashes it.
 * Defaults to country code 91 (India) for 10-digit numbers.
 */
export function hashPhone(phone: string | null | undefined): string | null {
  if (!phone) return null;
  const digits = phone.replace(/\D/g, "");
  if (!digits) return null;
  // If 10 digits (e.g., 9876543210), prepend 91 for Indian mobile standard
  const formatted = digits.length === 10 ? `91${digits}` : digits;
  return sha256(formatted);
}

/**
 * Builds Meta-compliant user_data payload with hashed PII
 */
export function buildUserData(params: {
  name?: string | null;
  email?: string | null;
  mobileNumber?: string | null;
  projectLocation?: string | null;
  metaLeadId?: number | string | null;
  ipAddress?: string | null;
  userAgent?: string | null;
}) {
  const userData: Record<string, any> = {};

  if (params.email) {
    const cleanEmail = params.email.trim().toLowerCase();
    if (cleanEmail.includes("@")) {
      userData.em = [sha256(cleanEmail)];
    }
  }

  if (params.mobileNumber) {
    const hashedPh = hashPhone(params.mobileNumber);
    if (hashedPh) userData.ph = [hashedPh];
  }

  if (params.metaLeadId) {
    const numericId = Number(params.metaLeadId);
    userData.lead_id = !isNaN(numericId) ? numericId : params.metaLeadId;
  }

  if (params.name) {
    const parts = params.name.trim().split(/\s+/);
    if (parts[0]) userData.fn = [sha256(parts[0])];
    if (parts.length > 1) userData.ln = [sha256(parts.slice(1).join(" "))];
  }

  if (params.projectLocation) {
    userData.ct = [sha256(params.projectLocation)];
  }

  if (params.ipAddress) {
    userData.client_ip_address = params.ipAddress;
  }

  if (params.userAgent) {
    userData.client_user_agent = params.userAgent;
  }

  return userData;
}

/**
 * Core function to send an event payload to Meta Graph API
 */
export async function postToMetaCAPI(payload: {
  eventName: string;
  eventId?: string;
  userData: Record<string, any>;
  customData?: Record<string, any>;
  actionSource?: "system_generated" | "website" | "other";
}) {
  const endpoint = `https://graph.facebook.com/${META_CONFIG.API_VERSION}/${META_CONFIG.DATASET_ID}/events?access_token=${META_CONFIG.ACCESS_TOKEN}`;

  const eventItem: Record<string, any> = {
    action_source: payload.actionSource || "system_generated",
    custom_data: {
      event_source: "crm",
      lead_event_source: "Voomet CRM",
      ...(payload.customData || {}),
    },
    event_name: payload.eventName,
    event_time: Math.floor(Date.now() / 1000),
    user_data: payload.userData,
  };

  if (payload.eventId) {
    eventItem.event_id = payload.eventId;
  }

  const body = {
    data: [eventItem],
  };

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    if (!res.ok) {
      console.error("[Meta CAPI] Error response from Meta:", data);
      return { success: false, error: data };
    }

    console.log("[Meta CAPI] Successfully sent event to Meta:", payload.eventName, data);
    return { success: true, data };
  } catch (error: any) {
    console.error("[Meta CAPI] Network error posting to Meta:", error);
    return { success: false, error: error.message };
  }
}

/**
 * Triggered when a new lead is received from website or manual admin entry
 */
export async function sendMetaLeadEvent(lead: {
  leadId?: string;
  name?: string | null;
  mobileNumber?: string | null;
  email?: string | null;
  projectLocation?: string | null;
  requirement?: string | null;
  source?: string | null;
  status?: string | null;
  metaLeadId?: number | string | null;
}) {
  const userData = buildUserData({
    name: lead.name,
    email: lead.email,
    mobileNumber: lead.mobileNumber,
    projectLocation: lead.projectLocation,
    metaLeadId: lead.metaLeadId,
  });

  // Ensure Meta matching requirement: at least phone or email must be present
  if (!userData.ph && !userData.em) {
    console.warn("[Meta CAPI] Skipping lead event: neither valid email nor phone available for matching.");
    return { success: false, error: "Missing customer info for matching" };
  }

  return await postToMetaCAPI({
    eventName: "Lead",
    eventId: lead.leadId,
    actionSource: "system_generated",
    userData,
    customData: {
      event_source: "crm",
      lead_event_source: "Voomet CRM",
      lead_status: lead.status || "New Lead",
      requirement: lead.requirement || "Interior Design",
      submission_source: lead.source || "Website Form",
      currency: "INR",
    },
  });
}

/**
 * Triggered when a lead's status is changed in the CRM panel
 * (e.g., Qualified, Contacted, Converted / Active Project, Site Visit Scheduled, etc.)
 */
export async function sendMetaLeadStatusEvent(lead: {
  leadId?: string;
  name?: string | null;
  mobileNumber?: string | null;
  email?: string | null;
  projectLocation?: string | null;
  requirement?: string | null;
  oldStatus?: string | null;
  newStatus: string;
  handledBy?: string | null;
  metaLeadId?: number | string | null;
}) {
  const userData = buildUserData({
    name: lead.name,
    email: lead.email,
    mobileNumber: lead.mobileNumber,
    projectLocation: lead.projectLocation,
    metaLeadId: lead.metaLeadId,
  });

  if (!userData.ph && !userData.em) {
    return { success: false, error: "Missing customer info for matching" };
  }

  return await postToMetaCAPI({
    eventName: "Lead",
    eventId: lead.leadId ? `${lead.leadId}_status_${Date.now()}` : undefined,
    actionSource: "system_generated",
    userData,
    customData: {
      event_source: "crm",
      lead_event_source: "Voomet CRM",
      lead_status: lead.newStatus,
      previous_status: lead.oldStatus || "New Lead",
      requirement: lead.requirement || "Interior Design",
      handled_by: lead.handledBy || "Unassigned",
      currency: "INR",
    },
  });
}

/**
 * Diagnostic test tool callable from Admin Settings
 */
export async function testMetaConnection() {
  const testUserData = {
    em: [sha256("test_lead@voometdesign.com")],
    ph: [sha256("919999999999")],
    fn: [sha256("Voomet")],
    ln: [sha256("Admin")],
    ct: [sha256("bangalore")],
  };

  return await postToMetaCAPI({
    eventName: "Lead",
    actionSource: "system_generated",
    userData: testUserData,
    customData: {
      event_source: "crm",
      lead_event_source: "Voomet CRM",
      lead_status: "Diagnostic Test Ping",
    },
  });
}
