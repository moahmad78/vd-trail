import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/site-config";

export const dynamic = "force-static";

export async function GET() {
  const content = `# ${siteConfig.brandName}

> ${siteConfig.brandName} is a premium turnkey interior design and fenestration studio based in Bangalore, delivering commercial, residential, and hospitality interior solutions.

## Key Pages
- Homepage: ${siteConfig.siteUrl}/
- Services: ${siteConfig.siteUrl}/services
- Projects: ${siteConfig.siteUrl}/designs
- About: ${siteConfig.siteUrl}/about
- Contact: ${siteConfig.siteUrl}/contact

## What VOOMET Does
VOOMET is a turnkey studio — clients work with a single point of contact from design through execution, rather than coordinating separately with architects, contractors, and vendors. Services include residential and commercial interiors, hospitality spaces, aluminium/facade systems, and custom furniture. Residential projects are typically completed in around 45 days from execution start, depending on scope. Based in Bangalore, serving clients across Bangalore and Karnataka.

## Contact
Phone: ${siteConfig.phone}
Email: ${siteConfig.email}
Location: Bangalore, Karnataka, India
`;

  return new NextResponse(content, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=3600",
    },
  });
}
