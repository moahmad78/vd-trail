/**
 * =========================================================================
 * VOOMETDESIGN - GOOGLE SHEET LEAD AUTOMATION SCRIPT
 * Target Sheet: https://docs.google.com/spreadsheets/d/1Oil1S4a9lt0noA1untM_PkF2ZC8NXfb3k3pzmTMZnDM/edit
 * =========================================================================
 *
 * HOW TO INSTALL:
 * 1. Open your Google Sheet in browser:
 *    https://docs.google.com/spreadsheets/d/1Oil1S4a9lt0noA1untM_PkF2ZC8NXfb3k3pzmTMZnDM/edit
 * 2. In top menu click: Extensions > Apps Script
 * 3. Delete any default code in 'Code.gs' and paste this entire code below.
 * 4. Click the 'Save' icon (Ctrl+S / Cmd+S).
 * 5. Click the blue 'Deploy' button (top-right) > 'New deployment'.
 * 6. Click the Gear icon next to 'Select type' and choose 'Web app'.
 * 7. Set:
 *    - Description: "VD Leads Sync"
 *    - Execute as: "Me" (your email)
 *    - Who has access: "Anyone"  <--- (IMPORTANT!)
 * 8. Click 'Deploy' and authorize access:
 *    - Click 'Authorize access'
 *    - Choose your Google account
 *    - Click 'Advanced' > 'Go to Untitled project (unsafe)'
 *    - Click 'Allow'
 * 9. Copy the generated "Web app URL" (looks like: https://script.google.com/macros/s/.../exec)
 * 10. Add it to your .env.local file:
 *     GOOGLE_SHEET_WEBHOOK_URL="https://script.google.com/macros/s/.../exec"
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  // Wait up to 10 seconds for other concurrent requests to complete
  lock.tryLock(10000);

  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Ensure header row exists with styling
    if (sheet.getLastRow() === 0) {
      var headers = [
        "Date & Time (IST)",
        "Name",
        "Mobile Number",
        "Service / Requirement",
        "Area (Sq. Ft.)",
        "Project Location",
        "Email",
        "Project Details",
        "Lead Source",
        "Promo Code"
      ];
      
      sheet.appendRow(headers);
      
      var headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setFontWeight("bold");
      headerRange.setBackground("#0B1B44");
      headerRange.setFontColor("#FFFFFF");
      headerRange.setHorizontalAlignment("center");
      headerRange.setVerticalAlignment("middle");
      sheet.setRowHeight(1, 38);
      sheet.setFrozenRows(1);
    }

    var data = {};
    if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        data = e.parameter || {};
      }
    } else if (e && e.parameter) {
      data = e.parameter;
    }

    // Format Indian Standard Time (IST)
    var istDate = Utilities.formatDate(new Date(), "Asia/Kolkata", "dd-MMM-yyyy hh:mm a");

    var row = [
      istDate,
      data.name || "N/A",
      data.mobileNumber ? "'" + String(data.mobileNumber).replace(/^'/, '') : "N/A",
      data.requirement || "General Inquiry",
      data.areaSqft || "Not Specified",
      data.projectLocation || "Bangalore",
      data.email || "-",
      data.projectDetails || "-",
      data.submissionSource || "Quote Landing Page",
      data.promoCode || "-"
    ];

    sheet.appendRow(row);
    
    // Auto-fit columns nicely if within reasonable range
    var lastRow = sheet.getLastRow();
    sheet.getRange(lastRow, 1, 1, row.length).setVerticalAlignment("middle");
    sheet.setRowHeight(lastRow, 30);

    return ContentService.createTextOutput(
      JSON.stringify({ status: "success", message: "Lead added successfully", row: lastRow })
    ).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ status: "error", message: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  return ContentService.createTextOutput(
    JSON.stringify({ status: "online", message: "VoometDesign Google Sheet Webhook is active!" })
  ).setMimeType(ContentService.MimeType.JSON);
}
