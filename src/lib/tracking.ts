import { ANALYTICS_CONFIG } from "@/config/analytics";

// Define the gtag function on the window object
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

/**
 * Tracks standard GA4 Events
 */
export const trackEvent = (eventName: string, params?: Record<string, any>) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, params);
  }
};

/**
 * Tracks a Google Ads Conversion
 * Requires the Conversion Label to be passed when calling.
 */
export const trackAdsConversion = (conversionLabel: string, value?: number, currency = "INR") => {
  if (typeof window !== "undefined" && window.gtag && ANALYTICS_CONFIG.ADS_CONVERSION_ID) {
    window.gtag("event", "conversion", {
      send_to: `${ANALYTICS_CONFIG.ADS_CONVERSION_ID}/${conversionLabel}`,
      value,
      currency,
    });
  }
};

// ==========================================
// PRE-DEFINED LEAD CONVERSION TRIGGERS
// ==========================================

export const trackWhatsAppClick = () => {
  trackEvent("whatsapp_click", {
    method: "WhatsApp",
    content_type: "Lead Generation",
  });
};

export const trackCallClick = () => {
  trackEvent("call_now_click", {
    method: "Phone",
    content_type: "Lead Generation",
  });
};

export const trackConsultationRequest = (details?: Record<string, any>) => {
  trackEvent("consultation_request", {
    ...details,
    method: "Form Submission",
  });
};

export const trackFormSubmission = (formName: string) => {
  trackEvent("form_submission", {
    form_name: formName,
  });
};
