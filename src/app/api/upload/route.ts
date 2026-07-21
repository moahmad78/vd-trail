import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { existsSync } from "fs";
import { getSession } from "@/lib/auth";

export async function POST(request: Request): Promise<NextResponse> {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get("filename");

    if (!filename) {
      return NextResponse.json({ success: false, error: "Filename is required" }, { status: 400 });
    }

    if (!request.body) {
      return NextResponse.json({ success: false, error: "No file body" }, { status: 400 });
    }

    // Fallback to local upload if Vercel Blob token is missing
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      console.log("Vercel Blob token missing, falling back to local upload.");
      
      const uploadDir = path.join(process.cwd(), "public", "uploads");
      
      // Ensure the directory exists
      if (!existsSync(uploadDir)) {
        await mkdir(uploadDir, { recursive: true });
      }

      // Convert readable stream to buffer
      const reader = request.body.getReader();
      const chunks = [];
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        if (value) chunks.push(value);
      }
      
      const buffer = Buffer.concat(chunks);
      const filePath = path.join(uploadDir, filename);
      await writeFile(filePath, buffer);
      
      return NextResponse.json({ success: true, url: `/uploads/${filename}` });
    }

    // Vercel Blob Upload
    const blob = await put(filename, request.body, {
      access: "public",
    });

    return NextResponse.json({ success: true, url: blob.url });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ success: false, error: "File upload failed" }, { status: 500 });
  }
}
