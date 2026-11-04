import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

const DEFAULT_SHEET_ID = "1Oil1S4a9lt0noA1untM_PkF2ZC8NXfb3k3pzmTMZnDM";
const DEFAULT_SHEET_URL = "https://docs.google.com/spreadsheets/d/1Oil1S4a9lt0noA1untM_PkF2ZC8NXfb3k3pzmTMZnDM/edit?usp=sharing";

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

function cleanPhone(phone: string): string {
  if (!phone) return "";
  const cleaned = phone.replace(/[^0-9]/g, "");
  // If starts with 91 and length 12, take last 10 digits
  if (cleaned.length === 12 && cleaned.startsWith("91")) {
    return cleaned.slice(2);
  }
  return cleaned;
}

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const sheetId = (process.env.GOOGLE_SHEET_ID || DEFAULT_SHEET_ID).trim();
    const sheetUrl = (process.env.GOOGLE_SHEET_URL || DEFAULT_SHEET_URL).trim();
    const csvUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv`;

    const response = await fetch(csvUrl, {
      next: { revalidate: 0 },
      headers: { "Cache-Control": "no-cache" },
    });

    if (!response.ok) {
      return NextResponse.json(
        { success: false, error: `Failed to fetch Google Sheet CSV (${response.status})` },
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
    console.error("[GoogleSheetSync GET] Error:", error);
    return NextResponse.json({ success: false, error: error.message || "Internal server error" }, { status: 500 });
  }
}

export async function POST() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const sheetId = (process.env.GOOGLE_SHEET_ID || DEFAULT_SHEET_ID).trim();
    const csvUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv`;

    const response = await fetch(csvUrl, {
      next: { revalidate: 0 },
      headers: { "Cache-Control": "no-cache" },
    });

    if (!response.ok) {
      return NextResponse.json(
        { success: false, error: `Failed to fetch Google Sheet CSV (${response.status})` },
        { status: 502 }
      );
    }

    const csvText = await response.text();
    const rows = parseCSV(csvText);

    let importedCount = 0;
    let existingCount = 0;

    for (const row of rows) {
      const name = (row["Name"] || "").trim();
      const rawPhone = (row["Mobile Number"] || "").trim();
      const phone = cleanPhone(rawPhone);
      const requirement = (row["Service / Requirement"] || "General Inquiry").trim();
      const location = (row["Project Location"] || "Bangalore").trim();
      const area = (row["Area (Sq. Ft.)"] || "").trim();
      const rawEmail = (row["Email"] || "").trim();
      const email = rawEmail && !rawEmail.toLowerCase().includes("not provided") && rawEmail !== "-" ? rawEmail : null;
      const details = (row["Project Details"] || "").trim();
      const submissionSource = (row["Lead Source"] || "Google Sheet / Website").trim();
      const promoCode = (row["Promo Code"] || "").trim();

      if (!name && !phone) continue;

      // Check if lead already exists in DB by normalized mobile or name
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
          },
        });
        importedCount++;
      } else {
        if (existing.isTrashed) {
          await prisma.lead.update({
            where: { id: existing.id },
            data: { isTrashed: false },
          });
          importedCount++;
        } else {
          existingCount++;
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: `Sync complete: ${importedCount} new leads imported, ${existingCount} already existed in CRM`,
      importedCount,
      existingCount,
      totalInSheet: rows.length,
    });
  } catch (error: any) {
    console.error("[GoogleSheetSync POST] Error:", error);
    return NextResponse.json({ success: false, error: error.message || "Internal server error" }, { status: 500 });
  }
}

