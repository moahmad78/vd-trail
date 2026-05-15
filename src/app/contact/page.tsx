"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Clock, Mail, Send, Instagram, Facebook, Youtube } from "lucide-react";
import Image from "next/image";

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

const WhatsAppIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
);

const PinterestIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.966 1.406-5.966s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.771-2.249 3.771-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.034-1.002 2.324-1.488 3.121 1.12.345 2.3.536 3.525.536 6.62 0 11.988-5.367 11.988-11.987C23.987 5.367 18.637 0 12.017 0z"/></svg>
);

const infoCards = [
  {
    title: "Our Studio",
    content: "No. 166, Obandehalli Industrial Area, Doddaballapura, Bangalore.",
    icon: <MapPin className="w-6 h-6 text-accent" />
  },
  {
    title: "Get in Touch",
    content: "+91 9845014279 | shiraz@voomet.com",
    icon: <Mail className="w-6 h-6 text-accent" />
  },
  {
    title: "Working Hours",
    content: "Mon - Sat: 9:00 AM - 7:00 PM (Sunday by Appointment).",
    icon: <Clock className="w-6 h-6 text-accent" />
  }
];

export default function ContactPage() {
  return (
    <main className="bg-white relative">
      {/* WhatsApp Floating Button */}
      <a 
        href="https://wa.me/919845014279" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-10 right-10 z-50 bg-[#25D366] text-white p-5 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center"
      >
        <WhatsAppIcon size={28} />
      </a>

      {/* Hero Section */}
      <section className="pt-32 pb-24">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <h1 className="text-5xl md:text-8xl font-display font-bold text-[#020617] mb-8 leading-[1.1]">
              Let’s Build Something Extraordinary
            </h1>
            <p className="text-xl md:text-2xl text-slate-500 max-w-2xl leading-relaxed">
              From initial consultation to final handover, we are here to bring your vision to life.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Modern Info Cards */}
      <section className="pb-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {infoCards.map((card, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col gap-6"
              >
                <div className="w-12 h-12 border border-accent/20 rounded-full flex items-center justify-center">
                  {card.icon}
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-3">{card.title}</h4>
                  <p className="text-lg text-slate-600 font-medium leading-relaxed">{card.content}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Form Section */}
      <section className="py-24 bg-slate-50/50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-20 items-stretch">
            {/* Left Side: Visual */}
            <div className="lg:w-1/2 relative min-h-[500px] rounded-[3rem] overflow-hidden shadow-2xl">
              <Image 
                src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80" 
                alt="Premium Interior Project" 
                fill 
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/50 to-transparent" />
              <div className="absolute bottom-12 left-12">
                <p className="text-white text-sm font-bold uppercase tracking-widest mb-2">Technical Excellence</p>
                <h3 className="text-white text-3xl font-display font-bold">In-House Manufacturing</h3>
              </div>
            </div>

            {/* Right Side: Inquiry Form */}
            <div className="lg:w-1/2">
              <div className="max-w-xl">
                <h3 className="text-4xl font-display font-bold text-[#020617] mb-4">Start an Inquiry</h3>
                <p className="text-slate-500 mb-12">Tell us about your project and our lead consultant will get back to you within 24 hours.</p>
                
                <form className="space-y-10">
                  <div className="relative">
                    <input type="text" id="name" className="peer w-full bg-transparent border-b border-slate-200 py-4 outline-none focus:border-accent transition-all placeholder-transparent" placeholder="Full Name" />
                    <label htmlFor="name" className="absolute left-0 -top-3 text-xs font-bold uppercase tracking-widest text-slate-400 peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-placeholder-shown:font-normal peer-placeholder-shown:tracking-normal transition-all peer-focus:-top-3 peer-focus:text-xs peer-focus:font-bold peer-focus:tracking-widest peer-focus:text-accent">Full Name</label>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="relative">
                      <input type="email" id="email" className="peer w-full bg-transparent border-b border-slate-200 py-4 outline-none focus:border-accent transition-all placeholder-transparent" placeholder="Email Address" />
                      <label htmlFor="email" className="absolute left-0 -top-3 text-xs font-bold uppercase tracking-widest text-slate-400 peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-placeholder-shown:font-normal peer-placeholder-shown:tracking-normal transition-all peer-focus:-top-3 peer-focus:text-xs peer-focus:font-bold peer-focus:tracking-widest peer-focus:text-accent">Email Address</label>
                    </div>
                    <div className="relative">
                      <input type="tel" id="phone" className="peer w-full bg-transparent border-b border-slate-200 py-4 outline-none focus:border-accent transition-all placeholder-transparent" placeholder="Phone Number" />
                      <label htmlFor="phone" className="absolute left-0 -top-3 text-xs font-bold uppercase tracking-widest text-slate-400 peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-placeholder-shown:font-normal peer-placeholder-shown:tracking-normal transition-all peer-focus:-top-3 peer-focus:text-xs peer-focus:font-bold peer-focus:tracking-widest peer-focus:text-accent">Phone Number</label>
                    </div>
                  </div>
                  <div className="relative">
                    <select id="type" className="peer w-full bg-transparent border-b border-slate-200 py-4 outline-none focus:border-accent transition-all appearance-none text-slate-600">
                      <option>Hospitality Project</option>
                      <option>Healthcare/Hospital</option>
                      <option>Premium Residential</option>
                      <option>Educational Institution</option>
                    </select>
                    <label htmlFor="type" className="absolute left-0 -top-3 text-xs font-bold uppercase tracking-widest text-slate-400">Project Type</label>
                  </div>
                  <div className="relative">
                    <textarea id="message" rows={4} className="peer w-full bg-transparent border-b border-slate-200 py-4 outline-none focus:border-accent transition-all placeholder-transparent" placeholder="Project Brief" defaultValue={""} />
                    <label htmlFor="message" className="absolute left-0 -top-3 text-xs font-bold uppercase tracking-widest text-slate-400 peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-placeholder-shown:font-normal peer-placeholder-shown:tracking-normal transition-all peer-focus:-top-3 peer-focus:text-xs peer-focus:font-bold peer-focus:tracking-widest peer-focus:text-accent">Project Brief</label>
                  </div>

                  <button className="w-full bg-[#020617] text-white py-5 rounded-2xl font-bold text-lg hover:bg-accent transition-all shadow-xl flex items-center justify-center gap-3">
                    Start My Project <Send size={20} />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Bar & Map */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16">
            <div className="lg:w-1/3">
              <h4 className="text-2xl font-display font-bold text-[#020617] mb-8">Connectivity</h4>
              <p className="text-slate-500 mb-12 leading-relaxed">Follow our journey and explore our latest interior transformations across India.</p>
              
              <div className="space-y-6">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-300">Social Channels</p>
                <div className="flex gap-6">
                  {[
                    { name: 'Pinterest', icon: <PinterestIcon size={24} />, href: '#' },
                    { name: 'Instagram', icon: <InstagramIcon size={24} />, href: '#' },
                    { name: 'Facebook', icon: <FacebookIcon size={24} />, href: '#' },
                    { name: 'YouTube', icon: <YoutubeIcon size={24} />, href: '#' }
                  ].map((social, idx) => (
                    <a 
                      key={idx} 
                      href={social.href} 
                      className="text-slate-400 hover:text-accent transition-all transform hover:-translate-y-1"
                      title={social.name}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
                <div className="pt-8">
                  <p className="text-lg font-bold text-[#020617]">@VOOMETDESIGN</p>
                </div>
              </div>
            </div>

            <div className="lg:w-2/3">
              <div className="w-full h-[500px] rounded-[3rem] bg-slate-100 overflow-hidden relative shadow-2xl border border-slate-100">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3882.880918712613!2d77.5312788!3d13.2954752!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDE3JzQzLjciTiA3N8KwMzEnNTIuNiJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin" 
                  className="w-full h-full border-0 grayscale"
                  allowFullScreen={true} 
                  loading="lazy"
                ></iframe>
                <div className="absolute inset-0 pointer-events-none border-[20px] border-white/10 rounded-[3rem]" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
