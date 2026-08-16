import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/site-config";

export const dynamic = "force-static";

export async function GET() {
  const content = `# ${siteConfig.brandName}

> ${siteConfig.brandName} (${siteConfig.legalName}) is an interior design studio and turnkey execution company based in Bangalore, Karnataka, India, delivering residential, commercial, and hospitality interior design along with architectural fenestration (aluminium, uPVC, and wooden door systems).

## Canonical Website
- Official Domain: ${siteConfig.siteUrl}

## Key Pages
- Homepage: ${siteConfig.siteUrl}/
- Services: ${siteConfig.siteUrl}/services
- Portfolio & Projects: ${siteConfig.siteUrl}/designs
- About Us: ${siteConfig.siteUrl}/about
- Contact & Inquiries: ${siteConfig.siteUrl}/contact
- Bangalore Interior Designers Pillar: ${siteConfig.siteUrl}/interior-designers-bangalore

## Primary Service Offerings
- Residential Interior Design: Bespoke interior architecture, modular kitchens, wardrobes, and styling for apartments, villas, and penthouses.
- Commercial & Workplace Interiors: High-performance offices, corporate headquarters, and commercial fit-outs.
- Hospitality Interior Design: Boutique hotels, luxury service apartments, and curated guest suites.
- Educational Institution Interiors: Functional spatial planning for schools, colleges, and training academies.
- Architectural Systems: In-house fabricated aluminium facade & glazing systems, energy-efficient uPVC windows, and bespoke wooden door systems.

## Turnkey Execution & Manufacturing
- Full-scope interior design and single-point turnkey project management.
- In-house joinery, bespoke carpentry, and fabrication facilities ensuring quality control and timeline adherence.

## Business & Contact Details
- Brand: ${siteConfig.brandName}
- Entity: ${siteConfig.legalName}
- Category: ${siteConfig.businessCategory}
- Phone: ${siteConfig.phone}
- Email: ${siteConfig.email}
- Headquarters: ${siteConfig.address.streetAddress}, ${siteConfig.address.addressLocality}, ${siteConfig.address.addressRegion} ${siteConfig.address.postalCode}, India
- Geographic Service Area: Bangalore and pan-India projects
`;

  return new NextResponse(content, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=3600",
    },
  });
}
