// @crafted-by: Sahil Sheikh | IG: @sahil_sheikh78 | Unauthorized use prohibited
import Link from "next/link";
import { FileText, Shield, AlertCircle, Scale, Mail } from "lucide-react";

export const metadata = {
 title: "Terms of Service | Voomet Design & Fabrication",
 description:
 "Read the Terms of Service for Voomet Design & Fabrication. Understand your rights and responsibilities when using our services.",
};

const sections = [
 {
 icon: FileText,
 title: "1. Acceptance of Terms",
 content: [
 "By accessing or using the website, products, or services of Voomet Design & Fabrication Private Limited (\"VoometDesign\", \"we\", \"us\", or \"our\"), you agree to be legally bound by these Terms of Service (\"Terms\").",
 "If you do not agree to these Terms in full, you must discontinue use of our website and services immediately. These Terms apply to all visitors, clients, prospective clients, and vendors who interact with VoometDesign in any capacity.",
 ],
 },
 {
 icon: Scale,
 title: "2. Services & Scope of Work",
 content: [
 "Voomet Design & Fabrication provides end-to-end turnkey interior design, architectural execution, custom furniture fabrication, aluminium UPVC systems, and related services (\"Services\") as detailed on our website and in individual project contracts.",
 "All specific project deliverables, timelines, material specifications, and payment terms are governed by a separate written Project Agreement (\"Agreement\") signed between VoometDesign and the client before commencement of any work.",
 "These Terms supplement—and do not replace—any such Agreement. In case of a conflict between these Terms and a signed Agreement, the Agreement shall take precedence.",
 ],
 },
 {
 icon: Shield,
 title: "3. Intellectual Property",
 content: [
 "All designs, architectural drawings, 3D renders, mood boards, technical specifications, AutoCAD files, and other creative materials produced by VoometDesign remain the exclusive intellectual property of Voomet Design & Fabrication Private Limited until full and final payment is received.",
 "Upon receipt of full payment, design ownership rights for project-specific deliverables are transferred to the client as specified in the Project Agreement. Generic design templates, proprietary tools, and process methodologies remain the exclusive property of VoometDesign at all times.",
 "You may not reproduce, distribute, publicly display, or create derivative works based on any VoometDesign-created content without prior written permission.",
 ],
 },
 {
 icon: AlertCircle,
 title: "4. Client Responsibilities",
 content: [
 "Clients are responsible for providing accurate site measurements, structural information, and all required approvals, NOCs, and permissions from relevant government authorities before project commencement.",
 "Delays caused by client-side failure to provide timely approvals, access to site, or staged payments will not be the responsibility of VoometDesign and may result in project timeline extensions or additional charges.",
 "Clients are responsible for ensuring site safety and providing a secure working environment for VoometDesign's on-site engineering teams.",
 ],
 },
 {
 icon: FileText,
 title: "5. Payment Terms & Refund Policy",
 content: [
 "All payment schedules are outlined in the Project Agreement. Typically, a non-refundable design deposit is required to commence design work, followed by stage-based milestone payments tied to project progress.",
 "Custom-fabricated items (furniture, aluminium systems, custom woodwork) that have entered production are non-refundable once manufacturing has commenced, as materials are sourced and processed specifically for each client's project.",
 "In cases of project cancellation by the client, VoometDesign will invoice for all work completed and materials procured up to the date of cancellation. The design deposit is non-refundable in all cases.",
 ],
 },
 {
 icon: Shield,
 title: "6. Warranty",
 content: [
 "VoometDesign provides a structural integrity warranty on all fabricated and installed elements as specified in the Project Agreement (typically 1–5 years depending on the product category).",
 "Warranty covers manufacturing defects and structural failures under normal use conditions. It does not cover damage caused by misuse, natural disasters, third-party modifications, or routine wear and tear.",
 "Warranty claims must be submitted in writing within the warranty period. VoometDesign reserves the right to inspect the reported issue before authorizing any repair or replacement.",
 ],
 },
 {
 icon: AlertCircle,
 title: "7. Limitation of Liability",
 content: [
 "To the maximum extent permitted by applicable law, VoometDesign shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to the use of our services.",
 "Our total liability for any claim arising from or related to a project shall not exceed the total fees paid by the client for that specific project.",
 "VoometDesign makes no warranties regarding the fitness for a particular purpose of any advice, recommendations, or materials provided beyond what is expressly stated in the Project Agreement.",
 ],
 },
 {
 icon: Scale,
 title: "8. Governing Law & Dispute Resolution",
 content: [
 "These Terms shall be governed by and construed in accordance with the laws of India, specifically under the jurisdiction of courts in Uttar Pradesh / Gorakhpur, India.",
 "In the event of a dispute, both parties agree to first attempt resolution through good-faith negotiation. If negotiation fails, disputes shall be referred to binding arbitration under the Arbitration and Conciliation Act, 1996.",
 ],
 },
 {
 icon: FileText,
 title: "9. Changes to These Terms",
 content: [
 "VoometDesign reserves the right to update or modify these Terms at any time. Changes will be effective upon posting to our website. We encourage you to review these Terms periodically.",
 "Your continued use of our services after changes are posted constitutes your acceptance of the updated Terms.",
 ],
 },
];

export default function TermsPage() {
 return (
 <main className="bg-white min-h-screen pt-24">
 {/* Hero */}
 <section className="bg-[#0f172a] text-white py-20 px-4">
 <div className="max-w-4xl mx-auto text-center">
 <span className="text-badge ] text-[#324A61] block mb-4">
 LEGAL DOCUMENTATION
 </span>
 <h1 className="text-hero text-3xl md:text-5xl mb-6">
 Terms of Service
 </h1>
 <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
 Please read these Terms carefully before engaging with Voomet Design
 & Fabrication. By proceeding, you acknowledge and accept all
 conditions stated herein.
 </p>
 <p className="mt-6 text-neutral-500 text-sm font-normal ">
 Last Updated: May 27, 2026
 </p>
 </div>
 </section>

 {/* Content */}
 <section className="max-w-4xl mx-auto px-4 py-20">
 <div className="space-y-12">
 {sections.map((section, i) => {
 const Icon = section.icon;
 return (
 <div
 key={i}
 className="border border-slate-100 rounded-2xl p-8 hover:shadow-md transition-shadow"
 >
 <div className="flex items-start gap-4 mb-6">
 <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center shrink-0">
 <Icon size={18} className="text-slate-400" />
 </div>
 <h2 className="text-section text-xl text-neutral-900">
 {section.title}
 </h2>
 </div>
 <div className="space-y-4 pl-14">
 {section.content.map((para, j) => (
 <p
 key={j}
 className="text-neutral-600 leading-relaxed text-base"
 >
 {para}
 </p>
 ))}
 </div>
 </div>
 );
 })}
 </div>

 {/* Contact CTA */}
 <div className="mt-16 bg-slate-50 border border-slate-200 rounded-3xl p-10 text-center">
 <Mail size={36} className="text-[#324A61] mx-auto mb-4" />
 <h3 className="text-card text-2xl text-neutral-900 mb-3">
 Questions About These Terms?
 </h3>
 <p className="text-neutral-600 leading-relaxed mb-6 max-w-lg mx-auto">
 Our legal and client relations team is happy to clarify any aspect
 of these Terms before you engage our services.
 </p>
 <Link
 href="/contact"
 className="inline-flex items-center gap-2 bg-[#0f172a] text-white text-sm px-8 py-4 rounded-full hover:bg-[#324A61] transition-colors"
 >
 Contact Us
 </Link>
 <p className="mt-4 text-slate-400 text-xs ">
 Or email us at{" "}
 <a
 href="mailto:legal@VoometDesign.com"
 className="underline hover:text-slate-700 transition-colors"
 >
 legal@VoometDesign.com
 </a>
 </p>
 </div>

 <div className="mt-10 flex items-center justify-center gap-6 text-sm text-slate-400 font-bold ">
 <Link
 href="/privacy"
 className="hover:text-[#0f172a] transition-colors"
 >
 Privacy Policy
 </Link>
 <span className="text-slate-200">|</span>
 <Link href="/" className="hover:text-[#0f172a] transition-colors">
 Back to Home
 </Link>
 </div>
 </section>
 </main>
 );
}
