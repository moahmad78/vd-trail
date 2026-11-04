import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

const GOOGLE_SHEET_ID = "1Oil1S4a9lt0noA1untM_PkF2ZC8NXfb3k3pzmTMZnDM";
const META_SHEET_ID = process.env.META_SHEET_ID || "1ee22jV4WOKH8MVb1L9Mhly8U7zeuvgev20p2Ozg2uP8";

function parseCSV(text: string) {
  const lines = text.split(/\r?\n/).filter((l) => l.trim().length > 0);
  if (lines.length < 2) return [];

  const parseRow = (row: string) => {
    const result: string[] = [];
    let insideQuote = false;
    let entry = "";
    for (let i = 0; i < row.length; i++) {
      const c = row[i];
      if (c === '"') {
        if (insideQuote && row[i + 1] === '"') {
          entry += '"';
          i++;
        } else {
          insideQuote = !insideQuote;
        }
      } else if (c === "," && !insideQuote) {
        result.push(entry.replace(/^"|"$/g, "").trim());
        entry = "";
      } else {
        entry += c;
      }
    }
    result.push(entry.replace(/^"|"$/g, "").trim());
    return result;
  };

  const headers = parseRow(lines[0]);
  return lines.slice(1).map((line) => {
    const values = parseRow(line);
    const obj: Record<string, string> = {};
    headers.forEach((h, i) => {
      if (h) obj[h] = values[i] || "";
    });
    return obj;
  });
}

function cleanPhone(raw: string): string {
  if (!raw) return "";
  let cleaned = raw.replace(/^p:/i, "").replace(/[^0-9]/g, "");
  if (cleaned.length === 12 && cleaned.startsWith("91")) {
    return cleaned.slice(2);
  }
  return cleaned;
}

function parseDate(rawDate: string): Date {
  if (!rawDate) return new Date();
  const trimmed = rawDate.trim();
  const dateStr = trimmed.includes("+") ? trimmed : `${trimmed} +05:30`;
  const parsed = new Date(dateStr);
  if (!isNaN(parsed.getTime())) return parsed;
  const fallback = new Date(trimmed);
  if (!isNaN(fallback.getTime())) return fallback;
  return new Date();
}

function formatRequirement(raw: string): string {
  if (!raw) return "Aluminium Systems";
  const formatted = raw
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .replace(/And/g, "&");
  return formatted || "Aluminium Systems";
}

export async function POST() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    let newlyImportedGoogle = 0;
    let newlyImportedMeta = 0;
    const newLeadNames: string[] = [];

    // 1. Fetch & Auto-Sync Google Sheet
    try {
      const googleCsvUrl = `https://docs.google.com/spreadsheets/d/${GOOGLE_SHEET_ID}/gviz/tq?tqx=out:csv`;
      const googleRes = await fetch(googleCsvUrl, {
        next: { revalidate: 0 },
        headers: { "Cache-Control": "no-cache" },
      });

      if (googleRes.ok) {
        const csvText = await googleRes.text();
        const rows = parseCSV(csvText);

        for (const row of rows) {
          const name = (row["Name"] || "").trim();
          const rawPhone = (row["Mobile Number"] || "").trim();
          const phone = cleanPhone(rawPhone);
          const rawDate = row["Date & Time (IST)"] || row["Date & Time"] || row["Date"] || row["Timestamp"] || "";
          const createdAt = parseDate(rawDate);

          const requirement = (row["Service / Requirement"] || "General Inquiry").trim();
          const location = (row["Project Location"] || "Bangalore").trim();
          const area = (row["Area (Sq. Ft.)"] || "").trim();
          const rawEmail = (row["Email"] || "").trim();
          const email = rawEmail && !rawEmail.toLowerCase().includes("not provided") && rawEmail !== "-" ? rawEmail : null;
          const details = (row["Project Details"] || "").trim();
          const submissionSource = (row["Lead Source"] || "Google Sheet / Website").trim();
          const promoCode = (row["Promo Code"] || "").trim();

          if (!name && !phone) continue;

          // Check if lead was permanently deleted by admin - if so, NEVER re-import it
          const wasDeleted = await prisma.adminAuditLog.findFirst({
            where: {
              action: "PERMANENT_DELETE_LEAD",
              OR: [
                phone.length >= 10 ? { details: { contains: phone } } : undefined,
                name ? { details: { contains: name } } : undefined,
              ].filter(Boolean) as any[],
            },
          });
          if (wasDeleted) {
            continue;
          }

          const existing = await prisma.lead.findFirst({
            where: {
              OR: [
                phone.length >= 10 ? { mobileNumber: { contains: phone } } : undefined,
                name ? { name: { equals: name, mode: "insensitive" } } : undefined,
              ].filter(Boolean) as any[],
            },
          });

          if (!existing) {
            await prisma.lead.create({
              data: {
                name: name || "Google Sheet Lead",
                mobileNumber: phone || rawPhone || "Not Provided",
                email,
                requirement: requirement || "General Inquiry",
                projectLocation: location || null,
                areaSqft: area || null,
                submissionSource: submissionSource || "Google Sheet",
                source: "Google Ads",
                projectDetails: details || null,
                promoCode: promoCode || null,
                status: "New Lead",
                handledBy: "Unassigned",
                isTrashed: false,
                createdAt,
              },
            });
            newlyImportedGoogle++;
            newLeadNames.push(name || "Google Sheet Lead");
          }
        }
      }
    } catch (gErr) {
      console.error("[AutoSync] Error checking Google Sheet:", gErr);
    }

    // 2. Fetch & Auto-Sync Meta Sheet
    try {
      const metaCsvUrl = `https://docs.google.com/spreadsheets/d/${META_SHEET_ID}/gviz/tq?tqx=out:csv`;
      const metaRes = await fetch(metaCsvUrl, {
        next: { revalidate: 0 },
        headers: { "Cache-Control": "no-cache" },
      });

      if (metaRes.ok) {
        const csvText = await metaRes.text();
        const rows = parseCSV(csvText);

        for (const row of rows) {
          const name = (row["Full name"] || row["Name"] || "").trim();
          const rawPhone = (row["Phone"] || row["Mobile"] || "").trim();
          const phone = cleanPhone(rawPhone);
          const rawTime = row["Time"] || row["Date"] || "";
          const createdAt = parseDate(rawTime);

          const city = (row["City"] || "Bangalore").trim();
          const rawReq = row["What are you looking for?"] || row["Requirement"] || "";
          const requirement = formatRequirement(rawReq);

          const remarks = (row["Remarks"] || "").trim();
          const userType = (row["Who are you?"] || "").trim();
          const projectType = (row["What is the project?"] || row["What type of property?"] || "").trim();
          const area = (row["Area (Sq. Ft.)"] || row["Area"] || (projectType ? projectType.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) : "")).trim();
          const timeline = (row["When do you need it?"] || row["When do you want to start?"] || "").trim();
          const budget = (row["What is your budget?"] || "").trim();

          const detailParts: string[] = [];
          if (remarks) detailParts.push(`Remarks: ${remarks}`);
          if (userType) detailParts.push(`Profile: ${userType}`);
          if (projectType) detailParts.push(`Project: ${projectType.replace(/_/g, " ")}`);
          if (timeline) detailParts.push(`Timeline: ${timeline.replace(/_/g, " ")}`);
          if (budget) detailParts.push(`Budget: ${budget}`);

          const projectDetails = detailParts.join(" • ") || "Meta Lead Ad Submission";

          if (!name && !phone) continue;

          // Check if lead was permanently deleted by admin - if so, NEVER re-import it
          const wasDeleted = await prisma.adminAuditLog.findFirst({
            where: {
              action: "PERMANENT_DELETE_LEAD",
              OR: [
                phone.length >= 10 ? { details: { contains: phone } } : undefined,
                name ? { details: { contains: name } } : undefined,
              ].filter(Boolean) as any[],
            },
          });
          if (wasDeleted) {
            continue;
          }

          const existing = await prisma.lead.findFirst({
            where: {
              OR: [
                phone.length >= 10 ? { mobileNumber: { contains: phone } } : undefined,
                name ? { name: { equals: name, mode: "insensitive" } } : undefined,
              ].filter(Boolean) as any[],
            },
          });

          if (!existing) {
            await prisma.lead.create({
              data: {
                name: name || "Meta Lead",
                mobileNumber: phone || rawPhone || "Not Provided",
                requirement,
                projectLocation: city || null,
                areaSqft: area || null,
                submissionSource: "Facebook Lead Form",
                source: "Meta Ads",
                projectDetails,
                status: "New Lead",
                handledBy: "Unassigned",
                isTrashed: false,
                createdAt,
              },
            });
            newlyImportedMeta++;
            newLeadNames.push(name || "Meta Lead");
          }
        }
      }
    } catch (mErr) {
      console.error("[AutoSync] Error checking Meta Sheet:", mErr);
    }

    const totalImported = newlyImportedGoogle + newlyImportedMeta;

    return NextResponse.json({
      success: true,
      totalImported,
      newlyImportedGoogle,
      newlyImportedMeta,
      newLeadNames,
    });
  } catch (error: any) {
    console.error("[AutoSync] Critical Error:", error);
    return NextResponse.json({ success: false, error: error.message || "Internal server error" }, { status: 500 });
  }
}

