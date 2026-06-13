export const ANALYTICS_CONFIG = {
  // Google Analytics 4 Measurement ID (e.g., "G-XXXXXXXXXX")
  GA_MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "",
  
  // Google Tag Manager ID (e.g., "GTM-XXXXXXX")
  GTM_ID: process.env.NEXT_PUBLIC_GTM_ID || "",
  
  // Microsoft Clarity Project ID
  CLARITY_ID: process.env.NEXT_PUBLIC_CLARITY_ID || "",

  // Google Ads Conversion ID (e.g., "AW-XXXXXXXXXX")
  ADS_CONVERSION_ID: process.env.NEXT_PUBLIC_ADS_CONVERSION_ID || "",
};
