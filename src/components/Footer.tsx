// @crafted-by: Sahil Sheikh | IG: @sahil_sheikh78 | Unauthorized use prohibited
"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { MapPin, Phone, Mail, ChevronDown } from "lucide-react";

/* ─── SVG Icons ─────────────────────────────────────────────────────── */
const InstagramIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);
const FacebookIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);
const PinterestIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.966 1.406-5.966s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.771-2.249 3.771-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.034-1.002 2.324-1.488 3.121 1.12.345 2.3.536 3.525.536 6.62 0 11.988-5.367 11.988-11.987C23.987 5.367 18.637 0 12.017 0z"/>
  </svg>
);
const YoutubeIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/>
  </svg>
);
const WhatsAppIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

/* ─── SEO Data ──────────────────────────────────────────────────────── */
const locations = [
  "Interior Designer in Bengaluru", "Interior Designer in Gorakhpur", "Interior Designer in Maharajganj", "Interior Designer in Delhi",
  "Interior Designer in Gurugram", "Interior Designer in Noida", "Interior Designer in Mumbai", "Interior Designer in Pune",
  "Interior Designer in Hyderabad", "Interior Designer in Chennai", "Interior Designer in Kolkata", "Interior Designer in Ahmedabad",
  "Interior Designer in Surat", "Interior Designer in Lucknow", "Interior Designer in Kanpur", "Interior Designer in Varanasi",
  "Interior Designer in Jaipur", "Interior Designer in Chandigarh", "Interior Designer in Indore", "Interior Designer in Bhopal",
  "Interior Designer in Patna", "Interior Designer in Vadodara", "Interior Designer in Ghaziabad", "Interior Designer in Ludhiana",
  "Interior Designer in Coimbatore", "Interior Designer in Agra", "Interior Designer in Madurai", "Interior Designer in Nashik",
  "Interior Designer in Faridabad", "Interior Designer in Meerut", "Interior Designer in Rajkot", "Interior Designer in Kalyan",
  "Interior Designer in Vasai-Virar", "Interior Designer in Srinagar", "Interior Designer in Aurangabad", "Interior Designer in Dhanbad",
  "Interior Designer in Amritsar", "Interior Designer in Navi Mumbai", "Interior Designer in Allahabad", "Interior Designer in Ranchi",
  "Interior Designer in Howrah", "Interior Designer in Jabalpur", "Interior Designer in Gwalior", "Interior Designer in Vijayawada",
  "Interior Designer in Jodhpur", "Interior Designer in Raipur", "Interior Designer in Kota", "Interior Designer in Guwahati",
  "Interior Designer in Solapur", "Interior Designer in Hubli-Dharwad",
];

const categories = [
  "Luxury Residential Interiors", "Hospitality Interior Designs", "Educational Interior Designs",
  "Service Apartments", "Boutique Hotel", "P.G Accommodation",
  "Bespoke Woodwork & Artisanal Finishes", "Corporate Office Interior Designs", "Office Cabin Designs", "Modern Office Designs",
  "Office Reception Designs", "Office Wall Designs", "Office Ceiling Designs", "Office Layout Designs", "Office Space Planning",
  "Biophilic Office Designs", "Gypsum False Ceiling Designs", "Conference Room Designs", "Multi-Specialty Hospital Layout",
  "School Science Lab Interior", "Smart Classroom Design", "Modular Kitchen Systems",
  "Luxury Penthouse Design", "Duplex Villa Interiors", "Technical Interior Execution", "Soundproof Cabin Designs",
  "Ergonomic Workspace Planning", "Minimalist Apartment Design", "Industrial Theme Cafe", "Showroom Interior Design",
  "Retail Store Layout", "Pharmacy Interior Design", "Clinic Interior Planning", "Library Furniture Design",
  "College Auditorium Interior", "Custom Cabinetry Solutions", "High-End Wardrobe Design", "False Ceiling with Cove Lighting",
  "Texture Wall Painting", "Italian Marble Flooring", "Hardwood Flooring Services", "Acoustic Wall Paneling",
  "Open Office Floor Plans", "Executive Suite Interior", "Creative Studio Design", "Sustainable Interior Solutions",
  "Turnkey Interior Execution", "Commercial Interior Renovation", "Luxury Interior Styling",
];

/* ─── Accordion ─────────────────────────────────────────────────────── */
function SeoAccordion({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-t" style={{ borderColor: "rgba(11,22,51,0.10)" }}>
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between py-4 text-left rounded-sm transition-colors duration-200"
        aria-expanded={open}
        style={{ background: open ? "rgba(11,22,51,0.025)" : "transparent" }}
        onMouseEnter={e => { if (!open) (e.currentTarget as HTMLButtonElement).style.background = "rgba(11,22,51,0.02)"; }}
        onMouseLeave={e => { if (!open) (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}
      >
        <span
          className="text-[9.5px] font-bold uppercase tracking-[0.28em]"
          style={{ color: "#0B1633" }}
        >
          {title}
        </span>
        <ChevronDown
          size={13}
          style={{
            color: "#6E7D9B",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.3s ease",
            flexShrink: 0,
          }}
        />
      </button>
      <div
        style={{
          maxHeight: open ? "600px" : 0,
          overflow: "hidden",
          transition: "max-height 0.45s cubic-bezier(.22,.68,0,.98)",
        }}
      >
        <div className="pb-5 pt-1">{children}</div>
      </div>
    </div>
  );
}

/* ─── Column heading ────────────────────────────────────────────────── */
function ColHead({ label }: { label: string }) {
  return (
    <div className="mb-5">
      <p
        className="text-[9.5px] font-bold uppercase tracking-[0.30em] mb-2.5"
        style={{ color: "#0B1633" }}
      >
        {label}
      </p>
      <div className="w-5 h-px" style={{ backgroundColor: "rgba(11,22,51,0.30)" }} />
    </div>
  );
}

/* ─── Footer ────────────────────────────────────────────────────────── */
const Footer = () => {
  return (
    <footer style={{ backgroundColor: "#F7F7F5" }}>

      {/* ── Editorial Divider ──────────────────────────────────────── */}
      <div
        className="w-full border-t"
        style={{ borderColor: "rgba(11,22,51,0.08)" }}
      >
        <div
          className="site-container py-5 flex flex-col sm:flex-row items-center justify-between gap-3"
        >
          <p
            className="text-[9px] font-bold uppercase tracking-[0.35em]"
            style={{ color: "#B7BDC9" }}
          >
            Designed Across India. Executed With Precision.
          </p>
          {/* WhatsApp CTA */}
          <a
            href="https://wa.me/919845014279"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 group"
          >
            <span
              className="text-[9px] font-bold uppercase tracking-[0.28em] transition-colors duration-300"
              style={{ color: "#6E7D9B" }}
            >
              Need Immediate Assistance?
            </span>
            <span
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-[0.2em] transition-all duration-300"
              style={{
                backgroundColor: "#0B1633",
                color: "#F7F7F5",
              }}
            >
              <WhatsAppIcon size={12} />
              WhatsApp Consultation →
            </span>
          </a>
        </div>
      </div>

      {/* ── Main Footer Body ───────────────────────────────────────── */}
      <div
        className="relative overflow-hidden border-t"
        style={{ borderColor: "rgba(11,22,51,0.06)" }}
      >
        {/* V watermark */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
          style={{ zIndex: 0 }}
        >
          <span
            className="select-none font-bold leading-none"
            style={{
              fontSize: "clamp(18rem, 30vw, 34rem)",
              color: "#0B1633",
              opacity: 0.015,
              filter: "blur(3px)",
              letterSpacing: "-0.06em",
              userSelect: "none",
            }}
          >
            V
          </span>
        </div>

        {/* Grid */}
        <div
          className="relative site-container py-12 md:py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8"
          style={{ zIndex: 1 }}
        >

          {/* ── Col 1: Brand & Social ────────────────────────────── */}
          <div className="space-y-6">
            <Link href="/" className="relative h-[48px] sm:h-[55px] md:h-[65px] w-[200px] sm:w-[240px] md:w-[280px] block mb-8">
              <Image
                unoptimized
                src="/logo/logo.png"
                alt="VoometDesign"
                fill
                sizes="(max-width: 768px) 200px, 280px"
                loading="lazy"
                className="object-contain object-left"
              />
            </Link>
            <p
              className="text-[12.5px] leading-relaxed max-w-[240px]"
              style={{ color: "#5E6B85" }}
            >
              Premier interior design and fabrication studio delivering precision-crafted spaces across India.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-2.5">
              {[
                { name: "Instagram", icon: <InstagramIcon />, href: "#" },
                { name: "Facebook",  icon: <FacebookIcon />,  href: "#" },
                { name: "Pinterest", icon: <PinterestIcon />, href: "#" },
                { name: "YouTube",   icon: <YoutubeIcon />,   href: "#" },
              ].map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  title={s.name}
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
                  style={{
                    border: "1px solid rgba(11,22,51,0.20)",
                    color: "#4F5F7D",
                    backgroundColor: "transparent",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLAnchorElement).style.color = "#FFFFFF";
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "#0B1633";
                    (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#0B1633";
                    (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-3px)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLAnchorElement).style.color = "#4F5F7D";
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(11,22,51,0.20)";
                    (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "transparent";
                    (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* ── Col 2: Navigation ────────────────────────────────── */}
          <div>
            <ColHead label="Navigation" />
            <ul className="space-y-3">
              {[
                { name: "Home",       href: "/" },
                { name: "About Us",   href: "/about" },
                { name: "Our Work",   href: "/portfolio" },
                { name: "Careers",    href: "/careers" },
                { name: "Blog",       href: "/blog" },
                { name: "FAQs",       href: "/faq" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-[12.5px] transition-all duration-300 inline-block"
                    style={{ color: "#4F5F7D", transform: "translateX(0)" }}
                    onMouseEnter={e => {
                      (e.target as HTMLAnchorElement).style.color = "#0B1633";
                      (e.target as HTMLAnchorElement).style.transform = "translateX(3px)";
                    }}
                    onMouseLeave={e => {
                      (e.target as HTMLAnchorElement).style.color = "#4F5F7D";
                      (e.target as HTMLAnchorElement).style.transform = "translateX(0)";
                    }}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Col 3: Core Expertise ────────────────────────────── */}
          <div>
            <ColHead label="Core Expertise" />
            <ul className="space-y-3">
              {[
                { name: "Residential",          href: "/services/residential" },
                { name: "Hospitality",          href: "/services/hospitality" },
                { name: "Educational",          href: "/services/education" },
                { name: "Commercial",           href: "/services/commercial" },
                { name: "Technical Solutions",  href: "/services/technical" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-[12.5px] transition-all duration-300 inline-block"
                    style={{ color: "#4F5F7D", transform: "translateX(0)" }}
                    onMouseEnter={e => {
                      (e.target as HTMLAnchorElement).style.color = "#0B1633";
                      (e.target as HTMLAnchorElement).style.transform = "translateX(3px)";
                    }}
                    onMouseLeave={e => {
                      (e.target as HTMLAnchorElement).style.color = "#4F5F7D";
                      (e.target as HTMLAnchorElement).style.transform = "translateX(0)";
                    }}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Col 4: Studio Contact ─────────────────────────────── */}
          <div>
            <ColHead label="Studio Contact" />
            <div className="space-y-4">
              <div className="flex gap-3 items-start">
                <MapPin size={14} className="mt-0.5 flex-shrink-0" style={{ color: "#4F5F7D" }} />
                <p className="text-[12px] leading-relaxed" style={{ color: "#5E6B85" }}>
                  No. 166, Obandehalli Industrial Area,<br />Doddaballapura, Bangalore.
                </p>
              </div>
              <div className="flex gap-3 items-center">
                <Phone size={14} className="flex-shrink-0" style={{ color: "#4F5F7D" }} />
                <a
                  href="https://wa.me/919845014279"
                  className="text-[12.5px] font-semibold transition-colors duration-200"
                  style={{ color: "#0B1633" }}
                  onMouseEnter={e => ((e.target as HTMLAnchorElement).style.color = "#4F5F7D")}
                  onMouseLeave={e => ((e.target as HTMLAnchorElement).style.color = "#0B1633")}
                >
                  +91 98450 14279
                </a>
              </div>
              <div className="flex gap-3 items-center">
                <Mail size={14} className="flex-shrink-0" style={{ color: "#4F5F7D" }} />
                <a
                  href="mailto:info@voometdesign.com"
                  className="text-[12.5px] font-semibold transition-colors duration-200"
                  style={{ color: "#0B1633" }}
                  onMouseEnter={e => ((e.target as HTMLAnchorElement).style.color = "#4F5F7D")}
                  onMouseLeave={e => ((e.target as HTMLAnchorElement).style.color = "#0B1633")}
                >
                  info@voometdesign.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ── SEO Accordions ───────────────────────────────────────── */}
        <div
          className="relative site-container pb-8"
          style={{ zIndex: 1 }}
        >
          <SeoAccordion title="PAN-India Service Locations">
            <div className="flex flex-wrap gap-y-2">
              {locations.map((loc, idx) => (
                <React.Fragment key={idx}>
                  <span
                    className="text-[11px] transition-colors duration-200 cursor-default"
                    style={{ color: "#7A8BA3" }}
                  >
                    {loc}
                  </span>
                  {idx < locations.length - 1 && (
                    <span className="text-[11px] mx-2" style={{ color: "rgba(90,107,133,0.30)" }}>•</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </SeoAccordion>

          <SeoAccordion title="Specialized Architectural Categories">
            <div className="flex flex-wrap gap-y-2">
              {categories.map((cat, idx) => (
                <React.Fragment key={idx}>
                  <span
                    className="text-[11px] transition-colors duration-200 cursor-default"
                    style={{ color: "#7A8BA3" }}
                  >
                    {cat}
                  </span>
                  {idx < categories.length - 1 && (
                    <span className="text-[11px] mx-2" style={{ color: "rgba(90,107,133,0.30)" }}>•</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </SeoAccordion>
        </div>
      </div>

      {/* ── Bottom Bar ─────────────────────────────────────────────── */}
      <div
        className="border-t"
        style={{ borderColor: "rgba(11,22,51,0.07)", backgroundColor: "#F7F7F5" }}
      >
        <div className="site-container py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p
            className="text-[10px] font-semibold"
            style={{ color: "#7A8BA3" }}
          >
            © 2026 VOOMETDESIGN. All Rights Reserved.
          </p>
          <div className="flex items-center gap-3">
            {[
              { label: "Privacy Policy", href: "/privacy" },
              { label: "Terms",          href: "/terms" },
              { label: "Site Credits",   href: "#" },
            ].map((item, i) => (
              <React.Fragment key={item.label}>
                {i > 0 && (
                  <span className="text-[10px]" style={{ color: "rgba(183,189,201,0.5)" }}>•</span>
                )}
                <Link
                  href={item.href}
                  className="text-[10px] font-semibold transition-colors duration-200"
                  style={{ color: "#7A8BA3" }}
                  onMouseEnter={e => ((e.target as HTMLAnchorElement).style.color = "#0B1633")}
                  onMouseLeave={e => ((e.target as HTMLAnchorElement).style.color = "#7A8BA3")}
                >
                  {item.label}
                </Link>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
