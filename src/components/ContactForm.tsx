// @crafted-by: Sahil Sheikh | IG: @sahil_sheikh78 | Unauthorized use prohibited
"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";

const ContactForm = () => {
  return (
    <section id="contact" className="py-12 bg-white dark:bg-slate-dark">
      <div className="container mx-auto px-6">
        <div className="bg-slate-50 dark:bg-slate-900 rounded-[3rem] overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800">
          <div className="flex flex-col lg:flex-row">
            {/* Info Side */}
            <div className="lg:w-2/5 bg-[#020617] p-12 lg:p-20 text-white flex flex-col justify-between">
              <div>
                <h3 className="text-4xl font-display font-bold mb-8">Let's Discuss <br /> Your Project</h3>
                <p className="text-white/70 mb-12 text-lg">
                  Ready to transform your space? Fill out the form and our design consultants will get back to you within 24 hours.
                </p>
                
                <div className="space-y-8">
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-[#020617]">
                      <Phone size={24} />
                    </div>
                    <div>
                      <p className="text-sm font-bold uppercase tracking-widest text-white/50">Call Us</p>
                      <p className="font-bold">+91 9845014279</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-[#020617]">
                      <Mail size={24} />
                    </div>
                    <div>
                      <p className="text-sm font-bold uppercase tracking-widest text-white/50">Email</p>
                      <p className="font-bold">shiraz@VoometDesign.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-[#020617]">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <p className="text-sm font-bold uppercase tracking-widest text-white/50">Studio</p>
                      <p className="font-bold text-base">No. 166, Obandehalli Industrial Area, Doddaballapura, Bangalore, Karnataka.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-20 pt-12 border-t border-white/10">
                <p className="text-base font-medium italic text-gold">"Architecture is a visual art, and the buildings speak for themselves."</p>
              </div>
            </div>

            {/* Form Side */}
            <div className="lg:w-3/5 p-12 lg:p-20">
              <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-base font-bold uppercase tracking-widest text-slate-400">Full Name</label>
                  <input 
                    type="text" 
                    placeholder="John Doe"
                    className="w-full bg-white dark:bg-slate-800 border-b-2 border-slate-200 dark:border-slate-700 focus:border-gold outline-none py-4 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-base font-bold uppercase tracking-widest text-slate-400">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="john@example.com"
                    className="w-full bg-white dark:bg-slate-800 border-b-2 border-slate-200 dark:border-slate-700 focus:border-gold outline-none py-4 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-base font-bold uppercase tracking-widest text-slate-400">Project Type</label>
                  <select className="w-full bg-white dark:bg-slate-800 border-b-2 border-slate-200 dark:border-slate-700 focus:border-gold outline-none py-4 transition-all appearance-none">
                    <option>Residential</option>
                    <option>Hospitality (Hotel)</option>
                    <option>Education (School/College)</option>
                    <option>Bespoke Woodwork</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-base font-bold uppercase tracking-widest text-slate-400">Estimated Area (Sq. Ft)</label>
                  <input 
                    type="number" 
                    placeholder="e.g. 1500"
                    className="w-full bg-white dark:bg-slate-800 border-b-2 border-slate-200 dark:border-slate-700 focus:border-gold outline-none py-4 transition-all"
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-base font-bold uppercase tracking-widest text-slate-400">Message</label>
                  <textarea 
                    rows={4}
                    placeholder="Tell us about your dream space..."
                    className="w-full bg-white dark:bg-slate-800 border-b-2 border-slate-200 dark:border-slate-700 focus:border-gold outline-none py-4 transition-all resize-none"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gold text-slate-dark font-bold py-5 rounded-2xl flex items-center justify-center gap-3 shadow-xl hover:shadow-gold/20 transition-all"
                  >
                    Send Inquiry <Send size={20} />
                  </motion.button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
