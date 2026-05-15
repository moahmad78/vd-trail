"use client";

import Link from "next/link";
import Image from "next/image";
import React from "react";
import { MapPin, Phone, Mail, ArrowRight } from "lucide-react";

// Custom SVG Icons for stability and branding
const InstagramIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);

const FacebookIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);

const YoutubeIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>
);

const PinterestIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.966 1.406-5.966s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.771-2.249 3.771-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.034-1.002 2.324-1.488 3.121 1.12.345 2.3.536 3.525.536 6.62 0 11.988-5.367 11.988-11.987C23.987 5.367 18.637 0 12.017 0z"/></svg>
);

const WhatsAppIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
);

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
  "Interior Designer in Solapur", "Interior Designer in Hubli-Dharwad"
];

const categories = [
  "Hospitality Interior Designs", "Healthcare Interior Designs", "Educational Interior Designs", "Luxury Residential Interiors",
  "Bespoke Woodwork & Artisanal Finishes", "Corporate Office Interior Designs", "Office Cabin Designs", "Modern Office Designs",
  "Office Reception Designs", "Office Wall Designs", "Office Ceiling Designs", "Office Layout Designs", "Office Space Planning",
  "Biophilic Office Designs", "Gypsum False Ceiling Designs", "Conference Room Designs", "Boutique Hotel Design",
  "Multi-Specialty Hospital Layout", "School Science Lab Interior", "Smart Classroom Design", "Modular Kitchen Systems",
  "Luxury Penthouse Design", "Duplex Villa Interiors", "Technical Interior Execution", "Soundproof Cabin Designs",
  "Ergonomic Workspace Planning", "Minimalist Apartment Design", "Industrial Theme Cafe", "Showroom Interior Design",
  "Retail Store Layout", "Pharmacy Interior Design", "Clinic Interior Planning", "Library Furniture Design",
  "College Auditorium Interior", "Custom Cabinetry Solutions", "High-End Wardrobe Design", "False Ceiling with Cove Lighting",
  "Texture Wall Painting", "Italian Marble Flooring", "Hardwood Flooring Services", "Acoustic Wall Paneling",
  "Open Office Floor Plans", "Executive Suite Interior", "Creative Studio Design", "Sustainable Interior Solutions",
  "Turnkey Interior Execution", "Commercial Interior Renovation", "Luxury Interior Styling"
];

const Footer = () => {
  return (
    <footer className="bg-white border-t-4 border-[#0F172A]">
      <div className="container mx-auto px-6 lg:px-12 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1: Brand Profile */}
          <div className="space-y-8 pr-4">
            <Link href="/" className="relative h-12 w-52 block transition-all hover:opacity-80">
              <Image 
                src="/logo/logo.png" 
                alt="Voomet Design Full Logo" 
                fill 
                className="object-contain object-left" 
              />
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed">
              Voomet Design is a premier interior design and fabrication powerhouse specializing in transforming spaces across healthcare, education, and residential sectors with precision engineering.
            </p>
            <div className="flex items-center gap-4">
              {[
                { name: 'Instagram', icon: <InstagramIcon size={16} />, href: '#' },
                { name: 'Facebook', icon: <FacebookIcon size={16} />, href: '#' },
                { name: 'Pinterest', icon: <PinterestIcon size={16} />, href: '#' },
                { name: 'YouTube', icon: <YoutubeIcon size={16} />, href: '#' }
              ].map((social, idx) => (
                <a 
                  key={idx} 
                  href={social.href} 
                  className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-amber-500 hover:border-amber-500 transition-all"
                  title={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
            <a href="https://wa.me/919845014279" className="flex items-center gap-3 bg-white border border-slate-100 rounded-2xl px-6 py-4 shadow-sm hover:shadow-md hover:border-slate-200 transition-all group w-fit">
              <WhatsAppIcon size={24} className="text-[#25D366]" />
              <div className="text-left">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Instant Connectivity</p>
                <p className="text-sm font-bold text-[#0F172A]">Chat with us</p>
              </div>
            </a>
          </div>

          {/* Column 2: Navigation */}
          <div className="lg:border-l lg:border-slate-200 lg:pl-12">
            <div className="mb-10">
              <h5 className="text-[12px] font-bold uppercase tracking-widest text-[#0F172A] mb-2">Navigation</h5>
              <div className="w-5 h-0.5 bg-amber-500" />
            </div>
            <ul className="space-y-4">
              {[
                { name: "Home", href: "/" },
                { name: "About Us", href: "/about" },
                { name: "Portfolio", href: "/portfolio" },
                { name: "Careers", href: "/careers" },
                { name: "Blog", href: "/blog" },
                { name: "Contact Us", href: "/contact" }
              ].map((link, idx) => (
                <li key={idx}>
                  <Link href={link.href} className="text-slate-500 hover:text-[#0F172A] transition-all flex items-center gap-2 group text-sm">
                    <ArrowRight size={14} className="text-amber-500 opacity-0 group-hover:opacity-100 -ml-5 group-hover:ml-0 transition-all duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Our Expertise */}
          <div className="lg:border-l lg:border-slate-200 lg:pl-12">
            <div className="mb-10">
              <h5 className="text-[12px] font-bold uppercase tracking-widest text-[#0F172A] mb-2">Our Expertise</h5>
              <div className="w-5 h-0.5 bg-amber-500" />
            </div>
            <ul className="space-y-4">
              {[
                { name: "Hospitality Interiors", href: "/services/hospitality" },
                { name: "Healthcare Precision", href: "/services/healthcare" },
                { name: "Educational Innovation", href: "/services/education" },
                { name: "Luxury Residential", href: "/services/residential" },
                { name: "Technical Interiors", href: "/services/technical" }
              ].map((link, idx) => (
                <li key={idx}>
                  <Link href={link.href} className="text-slate-500 hover:text-[#0F172A] transition-all flex items-center gap-2 group text-sm">
                    <ArrowRight size={14} className="text-amber-500 opacity-0 group-hover:opacity-100 -ml-5 group-hover:ml-0 transition-all duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Studio Address */}
          <div className="lg:border-l lg:border-slate-200 lg:pl-12">
            <div className="mb-10">
              <h5 className="text-[12px] font-bold uppercase tracking-widest text-[#0F172A] mb-2">Studio Address</h5>
              <div className="w-5 h-0.5 bg-amber-500" />
            </div>
            <div className="space-y-8">
              <div className="flex gap-4">
                <MapPin size={24} className="text-amber-500 shrink-0" />
                <p className="text-slate-500 text-sm leading-relaxed">
                  No. 166, Obandehalli Industrial Area, Doddaballapura, Bangalore, Karnataka.
                </p>
              </div>
              <div className="flex gap-4">
                <Phone size={24} className="text-amber-500 shrink-0" />
                <a href="https://wa.me/919845014279" className="text-slate-500 hover:text-[#0F172A] transition-all text-sm font-bold">
                  +91 9845014279
                </a>
              </div>
              <div className="flex gap-4">
                <Mail size={24} className="text-amber-500 shrink-0" />
                <a href="mailto:shiraz@voomet.com" className="text-slate-500 hover:text-[#0F172A] transition-all text-sm font-bold">
                  shiraz@voomet.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* SEO Link Cloud Section */}
        <div className="mt-20 pt-16 border-t border-slate-100 space-y-12">
          {/* Section 1: Locations */}
          <div>
            <h6 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">
              PAN-India Service Locations
            </h6>
            <div className="flex flex-wrap items-center gap-y-3">
              {locations.map((loc, idx) => (
                <React.Fragment key={idx}>
                  <span className="text-[10px] text-slate-400 hover:text-amber-500 transition-colors cursor-default leading-relaxed">
                    {loc}
                  </span>
                  {idx < locations.length - 1 && (
                    <span className="text-[10px] font-bold text-slate-200 mx-2">•</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Section 2: Specialized Categories */}
          <div>
            <h6 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">
              Specialized Architectural Categories
            </h6>
            <div className="flex flex-wrap items-center gap-y-3">
              {categories.map((cat, idx) => (
                <React.Fragment key={idx}>
                  <span className="text-[10px] text-slate-400 hover:text-amber-500 transition-colors cursor-default leading-relaxed">
                    {cat}
                  </span>
                  {idx < categories.length - 1 && (
                    <span className="text-[10px] font-bold text-slate-200 mx-2">•</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-slate-50 border-t border-slate-100">
        <div className="container mx-auto px-6 lg:px-12 py-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-[11px] font-bold uppercase tracking-widest text-slate-400">
            <p>
              © 2026 VOOMET DESIGN & FABRICATION PRIVATE LIMITED. ALL RIGHTS RESERVED.
            </p>
            <div className="flex items-center gap-8">
              <Link href="/privacy" className="hover:text-amber-500 transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-amber-500 transition-colors">Terms of Service</Link>
              <span className="text-slate-200 hidden md:inline">|</span>
              <p className="text-amber-600/60">
                Designed for Excellence by Sahil Sheikh.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
