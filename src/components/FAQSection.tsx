"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Send, Sparkles, Phone } from "lucide-react";

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
    answer: "We specialize in high-precision interior design and technical execution for Healthcare, Hospitality, Educational, and Premium Residential sectors."
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
    question: "Is the initial 3D layout consultation really free?",
    answer: "Yes, we offer a free 3D site survey and initial layout plan worth ₹10,000 to help you visualize your project's potential before you commit."
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
    <section className="py-12 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-stretch">
          {/* Left Column: FAQs */}
          <div className="lg:w-1/2 flex flex-col">
            <h2 className="text-sm font-bold text-accent uppercase tracking-widest mb-4">Common Questions</h2>
            <h3 className="text-4xl font-display font-bold text-[#020617] mb-12">Frequently Asked Questions</h3>
            
            <div className="space-y-4 flex-grow">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="border border-slate-100 rounded-2xl overflow-hidden shadow-sm"
                >
                  <button
                    onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                    className="w-full flex items-center justify-between p-6 text-left bg-slate-50/50 hover:bg-slate-50 transition-colors"
                  >
                    <span className="font-bold text-[#020617]">{faq.question}</span>
                    <ChevronDown 
                      className={`text-accent transition-transform duration-300 ${activeIndex === index ? "rotate-180" : ""}`} 
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
                        <div className="p-6 pt-0 bg-slate-50/50 text-slate-500 text-sm leading-relaxed">
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
          <div className="lg:w-1/2 w-full flex flex-col">
            <div className="bg-[#020617] text-white p-10 md:p-12 rounded-[3rem] shadow-2xl relative overflow-hidden flex flex-col h-full border border-white/5">
               <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl -translate-y-16 translate-x-16" />
               <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-center gap-3 text-accent mb-6">
                    <Sparkles size={20} />
                    <span className="text-sm font-bold uppercase tracking-widest">Free Consultation</span>
                  </div>
                  <h4 className="text-3xl md:text-4xl font-display font-bold mb-6">Claim My Free 3D Plan</h4>
                  <p className="text-white/60 mb-10 text-lg">Fill in your details and our senior designer will contact you within 24 hours.</p>
                  
                  <form className="space-y-6 flex-grow">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <input type="text" placeholder="Your Name" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 outline-none focus:border-accent transition-all placeholder:text-white/20" />
                      <input type="tel" placeholder="Phone Number" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 outline-none focus:border-accent transition-all placeholder:text-white/20" />
                    </div>
                    <select className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 outline-none focus:border-accent transition-all appearance-none text-white/60">
                      <option className="bg-[#020617]">Residential Project</option>
                      <option className="bg-[#020617]">Hospitality/Hotel</option>
                      <option className="bg-[#020617]">Healthcare/Hospital</option>
                      <option className="bg-[#020617]">Education/School</option>
                    </select>
                    <button className="w-full bg-accent text-primary py-5 rounded-2xl font-bold text-lg hover:bg-white transition-all shadow-xl flex items-center justify-center gap-3 active:scale-95 transform">
                      Send My Request <Send size={20} />
                    </button>
                  </form>

                  {/* Contact Info & Social Icons */}
                  <div className="mt-12 pt-10 border-t border-white/10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-[11px] uppercase tracking-[0.2em] font-bold text-white/40 mb-12">
                      <div>
                        <p className="text-accent mb-2">Direct Line</p>
                        <p className="text-white text-base">+91 9845014279</p>
                      </div>
                      <div>
                        <p className="text-accent mb-2">Inquiries</p>
                        <p className="text-white text-base">shiraz@voomet.com</p>
                      </div>
                      <div className="md:col-span-2">
                        <p className="text-accent mb-2">Studio</p>
                        <p className="text-white normal-case tracking-normal text-sm leading-relaxed">No. 166, Obandehalli Industrial Area, Doddaballapura, Bangalore, Karnataka.</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-6 pt-8 border-t border-white/5">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-white/20">Connect with us</p>
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
