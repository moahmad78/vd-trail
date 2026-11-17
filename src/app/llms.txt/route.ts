import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/site-config";

export const dynamic = "force-static";

export async function GET() {
  const content = `# ${siteConfig.brandName}

> ${siteConfig.brandName} is a premier turnkey interior design and architectural fenestration studio based in Bangalore, delivering end-to-end commercial office fitouts, luxury residential villas, boutique hotels, educational spaces, and custom manufactured aluminium and UPVC systems.

${siteConfig.brandName} operates as a single-point turnkey interior design and contracting firm in Bangalore, Karnataka. Clients work with a dedicated project team from concept 3D visualization through in-house factory manufacturing, civil execution, MEP engineering, and final site handover.

## Core Services
- [Commercial Interior Designers Bangalore](${siteConfig.siteUrl}/services/commercial-interior-designers-bangalore): High-performance commercial interiors, tech park fitouts, and ergonomic office environments.
- [Office Interior Designers Bangalore](${siteConfig.siteUrl}/services/office-interior-designers-bangalore): Corporate workplace strategy, modular workstation fabrication, acoustic meeting rooms, and turnkey execution.
- [Turnkey Interior Contractors Bangalore](${siteConfig.siteUrl}/services/turnkey-interior-contractors-bangalore): Comprehensive end-to-end interior contracting, civil fitouts, and project management.
- [Turnkey Interior Designers Bangalore](${siteConfig.siteUrl}/services/turnkey-interior-designers-bangalore): Single-contract turnkey design and delivery for homes, offices, and institutions.
- [Luxury Interior Designers Bangalore](${siteConfig.siteUrl}/services/luxury-interior-designers-bangalore): Bespoke luxury interior design for premium villas, penthouses, and private residences.
- [Hospitality Interior Designers Bangalore](${siteConfig.siteUrl}/services/hospitality-interior-designers-bangalore): Boutique hotel interiors, resort suites, guestrooms, restaurants, and lounges.
- [Hotel Interior Design Company](${siteConfig.siteUrl}/services/hotel-interior-design-company): High-RevPAR hospitality architecture, lobby transformations, and banquet fitouts.
- [Educational Interior Designers](${siteConfig.siteUrl}/services/educational-interior-designers): Safe, acoustic, and inspiring educational campuses, schools, and STEM classrooms.
- [Aluminium Windows Manufacturers Bangalore](${siteConfig.siteUrl}/services/aluminium-windows-manufacturers-bangalore): Precision-engineered thermal break and slimline aluminium sliding systems.
- [UPVC Windows and Doors Bangalore](${siteConfig.siteUrl}/services/upvc-windows-and-doors-bangalore): High-performance acoustic, multi-chamber UPVC windows and balcony doors.
- [Custom Furniture Manufacturers Bangalore](${siteConfig.siteUrl}/services/custom-furniture-manufacturers-bangalore): In-house factory joinery, modular storage, and bespoke commercial furniture.
- [Corporate Office Interior Design](${siteConfig.siteUrl}/services/corporate-office-interior-design): Scalable corporate interior solutions for technology and enterprise spaces.

## Portfolio & Projects
- [Our Portfolio & Completed Projects](${siteConfig.siteUrl}/designs): Curated showcase of delivered commercial, residential, and hospitality projects across Bangalore.

## Tools & Interactive Features
- [Interior Design Cost Calculator](${siteConfig.siteUrl}/calculator): Interactive estimation tool for commercial and residential interior budgets in Bangalore.
- [Instant Quote Consultation](${siteConfig.siteUrl}/quote): Schedule an on-site consultation or request a custom architectural proposal.

## Company Information
- [About VoometDesign](${siteConfig.siteUrl}/about): Company background, leadership, design philosophy, and turnkey execution process.
- [Contact VoometDesign](${siteConfig.siteUrl}/contact): Studio address in Marathahalli Outer Ring Road, direct phone lines, and email inquiries.

## Optional
- [Frequently Asked Questions](${siteConfig.siteUrl}/faq): Common inquiries about project timelines, pricing, warranties, and scope.
- [Interior Design Pricing Guide](${siteConfig.siteUrl}/pricing): Comprehensive cost breakdown per square foot for Bangalore interiors.
- [Privacy Policy](${siteConfig.siteUrl}/privacy): Data privacy policies, client confidentiality, and terms of service.
- [Terms and Conditions](${siteConfig.siteUrl}/terms): Service terms, payment milestones, and execution warranty agreements.
`;

  return new NextResponse(content, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=3600",
    },
  });
}
