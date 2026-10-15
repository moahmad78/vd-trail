// Test Google Sheet Integration
const fs = require('fs');
const path = require('path');

// Read .env.local or .env for GOOGLE_SHEET_WEBHOOK_URL
let webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;

if (!webhookUrl) {
  try {
    const envLocal = fs.readFileSync(path.join(__dirname, '.env.local'), 'utf8');
    const match = envLocal.match(/GOOGLE_SHEET_WEBHOOK_URL=["']?([^"'\r\n]+)["']?/);
    if (match) webhookUrl = match[1];
  } catch (e) {}
}

if (!webhookUrl) {
  try {
    const env = fs.readFileSync(path.join(__dirname, '.env'), 'utf8');
    const match = env.match(/GOOGLE_SHEET_WEBHOOK_URL=["']?([^"'\r\n]+)["']?/);
    if (match) webhookUrl = match[1];
  } catch (e) {}
}

if (!webhookUrl) {
  console.log("❌ GOOGLE_SHEET_WEBHOOK_URL not found in .env or .env.local");
  process.exit(1);
}

console.log("Testing Webhook URL:", webhookUrl);

const sampleLead = {
  name: "Test User (Verification)",
  mobileNumber: "+91 9876543210",
  requirement: "Turnkey Interior - 3BHK",
  areaSqft: "1850 Sq. Ft.",
  projectLocation: "Indiranagar, Bangalore",
  email: "test@example.com",
  projectDetails: "Sample test lead to verify Google Sheets auto-sync",
  submissionSource: "Quote Landing Page",
  promoCode: "VOOMET2026",
  createdAt: new Date().toISOString()
};

fetch(webhookUrl, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(sampleLead),
  redirect: "follow"
})
  .then(res => res.text())
  .then(text => {
    console.log("✅ Response from Google Apps Script Webhook:", text);
  })
  .catch(err => {
    console.error("❌ Request failed:", err);
  });
