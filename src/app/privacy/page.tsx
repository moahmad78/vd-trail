// @crafted-by: Sahil Sheikh | IG: @sahil_sheikh78 | Unauthorized use prohibited
import Link from "next/link";
import { Eye, Database, Lock, Globe, Bell, UserCheck, Mail } from "lucide-react";

export const metadata = {
 title: "Privacy Policy | Voomet Design & Fabrication",
 description:
 "Voomet Design & Fabrication's Privacy Policy — learn how we collect, use, protect, and manage your personal data.",
};

const sections = [
 {
 icon: Eye,
 title: "1. Information We Collect",
 content: [
 "When you interact with Voomet Design & Fabrication through our website, contact forms, or service enquiries, we may collect the following categories of personal information:",
 ],
 bullets: [
 "Contact Details: Your full name, phone number, email address, and city/state of residence.",
 "Project Details: Property type, budget range, project timeline, and scope of work shared during enquiries.",
 "Technical Data: IP address, browser type, operating system, pages visited, and time spent on our site (collected via cookies and analytics tools).",
 "Communication Records: Messages sent via contact forms, WhatsApp, or email correspondence with our team.",
 ],
 after: [
 "We do not collect sensitive personal data such as financial account details, government ID numbers, or health information through our website.",
 ],
 },
 {
 icon: Database,
 title: "2. How We Use Your Information",
 content: [
 "VoometDesign uses the information we collect solely for legitimate business purposes directly related to delivering our interior design and fabrication services:",
 ],
 bullets: [
 "To respond to your project enquiries and provide accurate service quotations.",
 "To schedule consultations, site visits, and project meetings.",
 "To send relevant updates about your project's progress.",
 "To send periodic newsletters about new services, design trends, and company news (only if you have opted in).",
 "To improve our website experience through anonymized analytics data.",
 ],
 after: [
 "We will never sell, rent, or trade your personal information to any third party for their marketing purposes.",
 ],
 },
 {
 icon: Globe,
 title: "3. Cookies & Analytics",
 content: [
 "Our website uses cookies—small text files stored on your device—to enhance your browsing experience and help us understand how visitors use our site.",
 "We use Google Analytics (anonymized) to understand traffic patterns and improve our content. These analytics tools do not collect personally identifiable information.",
 "You can control cookie settings through your browser preferences. Disabling cookies may affect certain features of our website.",
 ],
 },
 {
 icon: Lock,
 title: "4. Data Security",
 content: [
 "We take the security of your personal information seriously. VoometDesign employs industry-standard technical and organizational security measures to protect your data from unauthorized access, disclosure, alteration, or destruction.",
 "All data is stored on secure servers with access controls limited strictly to authorized personnel who need the information to provide our services.",
 "However, please note that no method of transmission over the internet or electronic storage is 100% secure. We cannot guarantee absolute security, but we continually strive to maintain best-in-class protective practices.",
 ],
 },
 {
 icon: Globe,
 title: "5. Third-Party Services",
 content: [
 "Our website may contain links to third-party websites and services (such as Google Maps, social media platforms, or embedded videos). VoometDesign is not responsible for the privacy practices of these external sites.",
 "We recommend reviewing the privacy policies of any third-party services you interact with through our website.",
 "We may use trusted third-party service providers (e.g., email service providers, CRM tools) to help operate our business. These providers are contractually obligated to maintain the confidentiality of your data and use it only for the specific services they provide to us.",
 ],
 },
 {
 icon: Bell,
 title: "6. Marketing Communications",
 content: [
 "If you have provided your contact details and expressed interest in our services, we may send you occasional communications about relevant design insights, new service offerings, or company updates.",
 "You may opt out of marketing communications at any time by clicking the 'Unsubscribe' link in any email, or by contacting us directly at the details below. Opting out of marketing will not affect transactional communications related to an active project.",
 ],
 },
 {
 icon: UserCheck,
 title: "7. Your Rights",
 content: [
 "As an individual whose data we process, you have the following rights under applicable data protection laws:",
 ],
 bullets: [
 "Right of Access: You can request a copy of the personal data we hold about you.",
 "Right of Correction: You can ask us to correct any inaccurate or incomplete data.",
 "Right of Erasure: You can request that we delete your personal data, subject to our legal and contractual obligations.",
 "Right to Object: You can object to our processing of your data for marketing purposes at any time.",
 "Right of Portability: You can request that we provide your data in a commonly used, machine-readable format.",
 ],
 after: [
 "To exercise any of these rights, please contact us at legal@VoometDesign.com. We will respond within 30 days.",
 ],
 },
 {
 icon: Database,
 title: "8. Data Retention",
 content: [
 "We retain client project data (including communications, designs, and contracts) for a minimum of 7 years for legal and warranty purposes.",
 "Website enquiry data from prospective clients who did not proceed with a project is retained for a maximum of 2 years, after which it is securely deleted.",
 "Marketing contact lists are purged or refreshed annually. You may request deletion at any time.",
 ],
 },
 {
 icon: Lock,
 title: "9. Changes to This Privacy Policy",
 content: [
 "VoometDesign reserves the right to update this Privacy Policy as our practices evolve or as required by law. Any significant changes will be communicated via a notice on our website.",
 "We encourage you to review this page periodically. Your continued use of our services following any changes constitutes acceptance of the updated policy.",
 "This policy was last updated on May 27, 2026.",
 ],
 },
];

export default function PrivacyPage() {
 return (
 <main className="bg-white min-h-screen pt-24">
 {/* Hero */}
 <section className="bg-[#0f172a] text-white py-20 px-4">
 <div className="max-w-4xl mx-auto text-center">
 <span className="text-badge ] text-[#324A61] block mb-4">
 LEGAL DOCUMENTATION
 </span>
 <h1 className="text-hero text-3xl md:text-5xl mb-6">
 Privacy Policy
 </h1>
 <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
 Your privacy is fundamental to how we operate. This policy explains
 clearly and transparently how VoometDesign collects, uses, and protects
 your personal information.
 </p>
 <p className="mt-6 text-neutral-500 text-sm font-normal ">
 Last Updated: May 27, 2026
 </p>
 </div>
 </section>

 {/* Quick Summary Banner */}
 <div className="bg-slate-50 border-b border-slate-200 py-6 px-4">
 <div className="max-w-4xl mx-auto">
 <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
 <div className="flex flex-col items-center gap-2 p-4">
 <Lock size={24} className="text-[#324A61]" />
 <p className="text-xs text-slate-700">We Never Sell Your Data</p>
 </div>
 <div className="flex flex-col items-center gap-2 p-4">
 <UserCheck size={24} className="text-[#324A61]" />
 <p className="text-xs text-slate-700">You Control Your Information</p>
 </div>
 <div className="flex flex-col items-center gap-2 p-4">
 <Eye size={24} className="text-[#324A61]" />
 <p className="text-xs text-slate-700">Full Transparency Always</p>
 </div>
 </div>
 </div>
 </div>

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
 <p key={j} className="text-neutral-600 leading-relaxed text-base">
 {para}
 </p>
 ))}
 {section.bullets && (
 <ul className="space-y-3 mt-4">
 {section.bullets.map((bullet, j) => (
 <li key={j} className="flex items-start gap-3 text-neutral-600 text-sm leading-relaxed">
 <span className="w-1.5 h-1.5 rounded-full bg-[#324A61] mt-2 shrink-0"></span>
 <span><strong className="text-slate-800">{bullet.split(":")[0]}:</strong>{bullet.split(":").slice(1).join(":")}</span>
 </li>
 ))}
 </ul>
 )}
 {section.after?.map((para, j) => (
 <p key={`after-${j}`} className="text-neutral-600 leading-relaxed text-base font-medium border-l-4 border-[#324A61] pl-4 mt-4">
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
 Privacy Questions or Data Requests?
 </h3>
 <p className="text-neutral-600 leading-relaxed mb-6 max-w-lg mx-auto">
 Contact our Data Protection Officer directly. We are committed to
 responding to all privacy-related requests within 30 days.
 </p>
 <a
 href="mailto:legal@VoometDesign.com"
 className="inline-flex items-center gap-2 bg-[#0f172a] text-white text-sm px-8 py-4 rounded-full hover:bg-[#324A61] transition-colors"
 >
 <Mail size={16} />
 legal@VoometDesign.com
 </a>
 </div>

 <div className="mt-10 flex items-center justify-center gap-6 text-sm text-slate-400 font-bold ">
 <Link href="/terms" className="hover:text-[#0f172a] transition-colors">
 Terms of Service
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
