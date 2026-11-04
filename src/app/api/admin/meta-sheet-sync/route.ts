import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

const DEFAULT_META_SHEET_ID = "1ee22jV4WOKH8MVb1L9Mhly8U7zeuvgev20p2Ozg2uP8";
const DEFAULT_META_SHEET_URL = "https://docs.google.com/spreadsheets/d/1ee22jV4WOKH8MVb1L9Mhly8U7zeuvgev20p2Ozg2uP8/edit?usp=sharing";

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
  // Strip "p:", "+", and any non-digit
  let cleaned = raw.replace(/^p:/i, "").replace(/[^0-9]/g, "");
  // If starts with country code 91 and length 12, take last 10 digits
  if (cleaned.length === 12 && cleaned.startsWith("91")) {
    return cleaned.slice(2);
  }
  return cleaned;
}

function formatRequirement(raw: string): string {
  if (!raw) return "Aluminium Systems";
  const formatted = raw
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .replace(/And/g, "&");
  return formatted || "Aluminium Systems";
}

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const sheetId = (process.env.META_SHEET_ID || DEFAULT_META_SHEET_ID).trim();
    const sheetUrl = (process.env.META_SHEET_URL || DEFAULT_META_SHEET_URL).trim();
    const csvUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv`;

    const response = await fetch(csvUrl, {
      next: { revalidate: 0 },
      headers: { "Cache-Control": "no-cache" },
    });

    if (!response.ok) {
      return NextResponse.json(
        { success: false, error: `Failed to fetch Meta Google Sheet CSV (${response.status})` },
        { status: 502 }
      );
    }

    const csvText = await response.text();
    const rows = parseCSV(csvText);

    return NextResponse.json({
      success: true,
      sheetId,
      sheetUrl,
      rowCount: rows.length,
      rows,
    });
  } catch (error: any) {
    console.error("[MetaSheetSync GET] Error:", error);
    return NextResponse.json({ success: false, error: error.message || "Internal server error" }, { status: 500 });
  }
}

export async function POST() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const sheetId = (process.env.META_SHEET_ID || DEFAULT_META_SHEET_ID).trim();
    const csvUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv`;

    const response = await fetch(csvUrl, {
      next: { revalidate: 0 },
      headers: { "Cache-Control": "no-cache" },
    });

    if (!response.ok) {
      return NextResponse.json(
        { success: false, error: `Failed to fetch Meta Google Sheet CSV (${response.status})` },
        { status: 502 }
      );
    }

    const csvText = await response.text();
    const rows = parseCSV(csvText);

    let importedCount = 0;
    let existingCount = 0;

    for (const row of rows) {
      const name = (row["Full name"] || row["Name"] || "").trim();
      const rawPhone = (row["Phone"] || row["Mobile"] || "").trim();
      const phone = cleanPhone(rawPhone);
      const city = (row["City"] || "Bangalore").trim();
      const rawReq = row["What are you looking for?"] || row["Requirement"] || "";
      const requirement = formatRequirement(rawReq);

      const remarks = (row["Remarks"] || "").trim();
      const userType = (row["Who are you?"] || "").trim();
      const projectType = (row["What is the project?"] || "").trim();
      const timeline = (row["When do you need it?"] || row["When do you want to start?"] || "").trim();
      const budget = (row["What is your budget?"] || "").trim();

      // Build rich project details from Meta Instant Form answers
      const detailParts: string[] = [];
      if (remarks) detailParts.push(`Remarks: ${remarks}`);
      if (userType) detailParts.push(`Profile: ${userType}`);
      if (projectType) detailParts.push(`Project: ${projectType.replace(/_/g, " ")}`);
      if (timeline) detailParts.push(`Timeline: ${timeline.replace(/_/g, " ")}`);
      if (budget) detailParts.push(`Budget: ${budget}`);

      const projectDetails = detailParts.join(" • ") || "Meta Lead Ad Submission";

      let createdAt = new Date();
      if (row["Time"]) {
        const parsedTime = new Date(row["Time"]);
        if (!isNaN(parsedTime.getTime())) {
          createdAt = parsedTime;
        }
      }

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

      // Check if lead already exists by phone or name
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
            submissionSource: "Facebook Lead Form",
            source: "Meta Ads",
            projectDetails,
            status: "New Lead",
            handledBy: "Unassigned",
            isTrashed: false,
            createdAt,
          },
        });
        importedCount++;
      } else {
        if (!existing.isTrashed) {
          await prisma.lead.update({
            where: { id: existing.id },
            data: {
              source: "Meta Ads",
              submissionSource: existing.submissionSource || "Facebook Lead Form",
              projectDetails: existing.projectDetails || projectDetails,
            },
          });
        }
        existingCount++;
      }
    }

    return NextResponse.json({
      success: true,
      message: `Meta Sheet synced: ${importedCount} new lead(s) imported, ${existingCount} updated to Meta Ads`,
      importedCount,
      existingCount,
      totalInSheet: rows.length,
    });
  } catch (error: any) {
    console.error("[MetaSheetSync POST] Error:", error);
    return NextResponse.json({ success: false, error: error.message || "Internal server error" }, { status: 500 });
  }
}

