// @crafted-by: Sahil Sheikh | IG: @sahil_sheikh78 | Unauthorized use prohibited
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Send, Sparkles, Phone, User, Mail, Building, Ruler, Calendar, MapPin, MessageSquare } from "lucide-react";

// Custom SVG Icons for stability and branding
const InstagramIcon = ({ size = 20 }: { size?: number }) => (
 <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);

const FacebookIcon = ({ size = 20 }: { size?: number }) => (
 <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);

const YoutubeIcon = ({ size = 20 }: { size?: number }) => (
 <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>
);

const WhatsAppIcon = ({ size = 20 }: { size?: number }) => (
 <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-10.6 8.38 8.38 0 0 1 3.8.9L21 3z"/></svg>
);

const PinterestIcon = ({ size = 20 }: { size?: number }) => (
 <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.966 1.406-5.966s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.771-2.249 3.771-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.034-1.002 2.324-1.488 3.121 1.12.345 2.3.536 3.525.536 6.62 0 11.988-5.367 11.988-11.987C23.987 5.367 18.637 0 12.017 0z"/></svg>
);

const faqs = [
 {
 question: "What types of sectors do you specialize in?",
 answer: "We specialize in high-precision interior design and technical execution for Premium Residential, Hospitality, and Educational sectors."
 },
 {
 question: "Do you provide bespoke woodwork?",
 answer: "Yes, our artisanal finishes and bespoke woodwork are executed in-house to ensure 100% quality control and superior artisanal detail."
 },
 {
 question: "Do you provide turnkey solutions?",
 answer: "Yes, we handle everything from initial 2D/3D design and layout planning to fabrication, on-site technical execution, and final handover."
 },
 {
 question: "Is the initial 3D layout consultation complimentary?",
 answer: "Yes, we offer a turnkey 3D site survey and initial layout plan worth ₹10,000 to help you visualize your project's potential before you commit."
 },
 {
 question: "Do you handle projects outside of Bangalore?",
 answer: "Yes, we provide pan-India services, from the heart of Gorakhpur to the Silicon Valley of Bangalore."
 },
 {
 question: "What materials do you use for high-end interiors?",
 answer: "We use premium materials including Italian marble, high-grade veneers, and in-house customized woodwork to ensure bespoke excellence."
 },
 {
 question: "Can I see a 3D visualization of my project before work starts?",
 answer: "Absolutely. We provide real-time 3D visualizations so you can see your space come to life before the first brick is laid."
 }
];

const FAQSection = () => {
 const [activeIndex, setActiveIndex] = useState<number | null>(0);

 return (
 <section className="py-6 md:py-12 bg-white">
 <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12">
 <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1.3fr] gap-12 items-stretch">
 {/* Left Column: FAQs */}
 <div className="flex flex-col">
 <h2 className="text-section text-[10px] md:text-base font-bold text-[#0f172a] mb-2 md:mb-4">Common <span className="italic font-light">Questions</span></h2>
 <h3 className="text-card text-3xl md:text-4xl font-bold text-[#0f172a] mb-6 md:mb-12">Frequently Asked <span className="italic font-light">Questions</span></h3>
 
 <div className="space-y-3 md:space-y-5 flex-grow">
 {faqs.map((faq, index) => (
 <motion.div
 key={index}
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 transition={{ delay: index * 0.1 }}
 viewport={{ once: true }}
 className="border border-slate-100 rounded-xl md:rounded-2xl overflow-hidden shadow-sm"
 >
 <button
 onClick={() => setActiveIndex(activeIndex === index ? null : index)}
 className="w-full flex items-center justify-between p-4 py-5 md:p-6 md:py-7 text-left bg-slate-50/50 hover:bg-slate-50 transition-colors"
 >
 <span className="font-bold text-[#0f172a] text-sm md:text-lg pr-4">{faq.question}</span>
 <ChevronDown 
 className={`text-[#0f172a] flex-shrink-0 transition-transform duration-300 ${activeIndex === index ? "rotate-180" : ""}`} 
 size={20} 
 />
 </button>
 <AnimatePresence>
 {activeIndex === index && (
 <motion.div
 initial={{ height: 0, opacity: 0 }}
 animate={{ height: "auto", opacity: 1 }}
 exit={{ height: 0, opacity: 0 }}
 transition={{ duration: 0.3 }}
 >
 <div className="p-4 pt-0 md:p-6 md:pt-0 bg-slate-50/50 text-neutral-500 text-xs md:text-base leading-relaxed">
 {faq.answer}
 </div>
 </motion.div>
 )}
 </AnimatePresence>
 </motion.div>
 ))}
 </div>
 </div>

 {/* Right Column: Contact Card + Social Media */}
 <div className="w-full flex flex-col mt-4 md:mt-0">
 <div className="bg-[#0f172a] text-white p-5 md:p-10 rounded-3xl md:rounded-[2.5rem] shadow-2xl relative overflow-hidden flex flex-col h-full border border-white/5">
 <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-y-16 translate-x-16" />
 <div className="relative z-10 flex flex-col h-full">
 <div className="flex items-center gap-2 text-[#0f172a] mb-2 md:mb-3">
 <Sparkles size={16} className="text-white" />
 <span className="text-[10px] md:text-xs font-bold text-white">Consultation</span>
 </div>
 <h4 className="text-card text-2xl md:text-3xl font-bold mb-2">Claim My 3D Plan</h4>
 <p className="text-white/50 mb-4 md:mb-5 text-xs md:text-sm">Fill in your details and our senior designer will contact you within 24 hours.</p>
 
 <form className="space-y-4 flex-grow mt-4">
 <div className="grid grid-cols-2 gap-4">
 <div className="relative">
 <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/30"><User size={16} /></div>
 <input type="text" placeholder="Your Name" className="w-full h-14 pl-10 pr-5 text-sm rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:ring-2 focus:ring-white/20 transition-all outline-none" />
 </div>
 <div className="relative">
 <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/30"><Mail size={16} /></div>
 <input type="email" placeholder="Email Address" className="w-full h-14 pl-10 pr-5 text-sm rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:ring-2 focus:ring-white/20 transition-all outline-none" />
 </div>
 </div>
 <div className="grid grid-cols-2 gap-4">
 <div className="relative">
 <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/30"><Phone size={16} /></div>
 <input type="tel" placeholder="Phone Number" className="w-full h-14 pl-10 pr-5 text-sm rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:ring-2 focus:ring-white/20 transition-all outline-none" />
 </div>
 <div className="relative">
 <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/30"><Building size={16} /></div>
 <select defaultValue="" className="w-full h-14 pl-10 pr-5 text-sm rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:ring-2 focus:ring-white/20 transition-all appearance-none outline-none">
 <option value="" disabled className="bg-[#0f172a] text-white/40">Project Type</option>
 <option className="bg-[#0f172a]">Residential Project</option>
 <option className="bg-[#0f172a]">Hospitality/Hotel</option>
 <option className="bg-[#0f172a]">Education/School</option>
 </select>
 </div>
 </div>
 <div className="grid grid-cols-2 gap-4">
 <div className="relative">
 <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/30"><Ruler size={16} /></div>
 <input type="text" placeholder="Est. SQFT" className="w-full h-14 pl-10 pr-5 text-sm rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:ring-2 focus:ring-white/20 transition-all outline-none" />
 </div>
 <div className="relative">
 <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/30"><Calendar size={16} /></div>
 <select defaultValue="" className="w-full h-14 pl-10 pr-5 text-sm rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:ring-2 focus:ring-white/20 transition-all appearance-none outline-none">
 <option value="" disabled className="bg-[#0f172a] text-white/40">Timeline</option>
 <option className="bg-[#0f172a]">Immediate</option>
 <option className="bg-[#0f172a]">1-3 Months</option>
 <option className="bg-[#0f172a]">3-6 Months</option>
 <option className="bg-[#0f172a]">6+ Months</option>
 </select>
 </div>
 </div>
 <div className="relative">
 <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/30"><MapPin size={16} /></div>
 <input type="text" placeholder="Project Location" className="w-full h-14 pl-10 pr-5 text-sm rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:ring-2 focus:ring-white/20 transition-all outline-none" />
 </div>
 <div className="relative">
 <div className="absolute top-4 left-0 pl-4 flex items-start pointer-events-none text-white/30"><MessageSquare size={16} /></div>
 <textarea rows={3} placeholder="Project Brief" className="w-full px-5 py-4 pl-10 text-sm rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:ring-2 focus:ring-white/20 transition-all outline-none resize-none" />
 </div>
 
 <button className="text-badge w-full bg-white text-[#0f172a] h-14 rounded-xl font-bold hover:bg-slate-200 transition-all shadow-xl flex items-center justify-center gap-2 active:scale-95 transform mt-4">
 Send My Request <Send size={16} />
 </button>
 </form>

 {/* Contact Info & Social Icons */}
 <div className="mt-6 pt-6 md:mt-8 md:pt-8 border-t border-white/10">
 <div className="grid grid-cols-2 gap-4 md:gap-6 text-sm font-bold text-white/40 mb-6 md:mb-8">
 <div>
 <p className="text-white/40 ] text-[10px] md:text-xs mb-1 md:mb-2 flex items-center gap-1 md:gap-2"><Phone size={12} className="md:w-[14px] md:h-[14px]" /> Direct Line</p>
 <p className="text-white text-xs md:text-base">+91 9845014279</p>
 </div>
 <div>
 <p className="text-white/40 ] text-[10px] md:text-xs mb-1 md:mb-2 flex items-center gap-1 md:gap-2"><Mail size={12} className="md:w-[14px] md:h-[14px]" /> Inquiries</p>
 <p className="text-white text-xs md:text-base truncate" title="info@voometdesign.com">info@voometdesign.com</p>
 </div>
 <div className="col-span-2">
 <p className="text-white/40 ] text-xs mb-2 flex items-center gap-2"><MapPin size={14} /> Studio</p>
 <p className="text-white normal-case text-base leading-relaxed">No. 166, Obandehalli Industrial Area, Doddaballapura, Bangalore, Karnataka.</p>
 </div>
 </div>

 <div className="flex flex-wrap items-center justify-between gap-6 pt-8 border-t border-white/5">
 <p className="text-xs font-normal text-white/20">Connect with us</p>
 <div className="flex gap-5">
 {[
 { name: 'Instagram', icon: <InstagramIcon size={18} />, color: 'hover:text-[#E4405F]', href: 'https://instagram.com' },
 { name: 'Facebook', icon: <FacebookIcon size={18} />, color: 'hover:text-[#1877F2]', href: 'https://facebook.com' },
 { name: 'Pinterest', icon: <PinterestIcon size={18} />, color: 'hover:text-[#BD081C]', href: 'https://pinterest.com' },
 { name: 'YouTube', icon: <YoutubeIcon size={18} />, color: 'hover:text-[#FF0000]', href: 'https://youtube.com' },
 { name: 'WhatsApp', icon: <WhatsAppIcon size={18} />, color: 'hover:text-[#25D366]', href: 'https://wa.me/919845014279' }
 ].map((social, sIdx) => (
 <a
 key={sIdx}
 href={social.href}
 target="_blank"
 rel="noopener noreferrer"
 className={`text-white/40 transition-all duration-300 transform hover:-translate-y-1 ${social.color}`}
 title={social.name}
 >
 {social.icon}
 </a>
 ))}
 </div>
 </div>
 </div>
 </div>
 </div>
 </div>
 </div>
 </div>
 </section>
 );
};

export default FAQSection;
