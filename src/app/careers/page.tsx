// @crafted-by: Sahil Sheikh | IG: @sahil_sheikh78 | Unauthorized use prohibited
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, Zap, Factory, Globe, ChevronDown, Upload, Send, Sparkles, User, Mail, Phone } from "lucide-react";
import Image from "next/image";

const culture = [
  {
    title: "Innovation-First",
    desc: "Work with real-time 3D visualization and state-of-the-art tech-driven execution processes.",
    icon: <Zap className="w-8 h-8" />
  },
  {
    title: "In-House Power",
    desc: "Gain hands-on experience in our 100% in-house fabrication units for bespoke woodwork and technical execution.",
    icon: <Factory className="w-8 h-8" />
  },
  {
    title: "Pan-India Reach",
    desc: "Opportunity to contribute to diverse architectural projects from Gorakhpur to Bangalore.",
    icon: <Globe className="w-8 h-8" />
  }
];

const jobs = [
  {
    id: "snr-designer",
    title: "Senior Interior Designer",
    location: "Bangalore / Hybrid",
    desc: "Expert in 3D rendering and luxury residential/hospitality sectors. Minimum 5+ years experience required."
  },
  {
    id: "site-supervisor",
    title: "Site In-Charge / Supervisor",
    location: "PAN India Execution Site",
    desc: "Managing end-to-end execution and vendor coordination. Strong technical knowledge of construction and interiors required."
  },
  {
    id: "graphic-designer",
    title: "Graphic Designer",
    location: "Remote / Bangalore",
    desc: "Creating brand assets and visual walkthroughs. Proficiency in Adobe Suite and motion graphics is a plus."
  }
];

export default function CareersPage() {
  const [activeJob, setActiveJob] = useState<string | null>(null);

  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="relative pt-40 pb-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069" 
            alt="Careers Background" 
            fill 
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#020617]/80" />
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-center gap-3 text-white/70 mb-6">
              <Briefcase size={20} />
              <span className="text-sm md:text-base font-black uppercase tracking-[0.25em]">Careers at VoometDesign</span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white mb-8 leading-[1.1]">
              Build the Future <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">of Interiors with Us.</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/70 max-w-2xl mx-auto leading-relaxed mb-12">
              Join a team of 20+ years of legacy where precision meets creativity. We are always looking for visionary designers and technical experts to define modern lifestyles.
            </p>
            <button 
              onClick={() => document.getElementById('open-positions')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-[#020617] px-10 py-5 rounded-2xl font-bold text-lg hover:bg-slate-100 transition-all shadow-xl hover:-translate-y-1"
            >
              View Open Positions
            </button>
          </motion.div>
        </div>
      </section>

      {/* Why Join Us? */}
      <section className="-mt-16 relative z-20 pb-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {culture.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-8 flex flex-col items-center text-center gap-6 border border-slate-100 hover:-translate-y-2 transition-transform duration-300 group"
              >
                <div className="w-16 h-16 bg-slate-50 border border-slate-100 rounded-full flex items-center justify-center group-hover:bg-[#020617] group-hover:border-[#020617] text-[#020617] group-hover:text-white transition-colors duration-300">
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-lg font-display font-bold text-[#020617] mb-3">{item.title}</h4>
                  <p className="text-base text-slate-600 font-medium leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section id="open-positions" className="py-24 bg-[#020617] text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-sm font-bold text-white/50 uppercase tracking-[0.2em] mb-4">Opportunities</h2>
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white">Current Open Positions</h3>
            </div>

            <div className="space-y-4">
              {jobs.map((job) => (
                <div key={job.id} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-colors">
                  <button
                    onClick={() => setActiveJob(activeJob === job.id ? null : job.id)}
                    className="w-full p-6 md:p-8 flex items-center justify-between text-left"
                  >
                    <div>
                      <h4 className="text-xl md:text-2xl font-bold text-white mb-2">{job.title}</h4>
                      <div className="flex items-center gap-2 text-white/60 text-sm font-bold uppercase tracking-widest">
                        <Globe size={16} /> {job.location}
                      </div>
                    </div>
                    <ChevronDown className={`text-white/50 w-6 h-6 transition-transform duration-300 ${activeJob === job.id ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {activeJob === job.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                      >
                        <div className="px-6 md:px-8 pb-8">
                          <p className="text-white/70 mb-8 leading-relaxed text-lg border-t border-white/10 pt-6 mt-2">{job.desc}</p>
                          <button 
                            onClick={() => document.getElementById('apply-now')?.scrollIntoView({ behavior: 'smooth' })}
                            className="bg-white text-[#020617] px-8 py-4 rounded-xl font-bold hover:bg-slate-200 transition-all shadow-md flex items-center gap-2 w-full md:w-auto justify-center"
                          >
                            Apply for this position <Briefcase size={18} />
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="apply-now" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white border border-slate-100 rounded-[3rem] shadow-2xl flex flex-col lg:flex-row overflow-hidden">
              {/* Left Side: Image and Info */}
              <div className="lg:w-5/12 relative min-h-[500px] flex flex-col justify-end p-10 lg:p-12 overflow-hidden">
                <Image 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80" 
                  alt="Career at VoometDesign" 
                  fill 
                  className="object-cover absolute inset-0 z-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/80 to-transparent z-10" />
                <div className="relative z-20 text-white">
                  <h3 className="text-4xl font-display font-bold mb-4">Start Your <br /> Journey.</h3>
                  <p className="text-white/70 mb-8 text-lg">
                    Submit your details and portfolio. Our HR team will review your application and get in touch if you are a good fit.
                  </p>
                  
                  <div className="grid grid-cols-1 gap-4">
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl flex items-center gap-4 hover:bg-white/20 transition-all cursor-default">
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                        <Mail className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-white/50 mb-1">HR Email</p>
                        <p className="font-bold text-base">shiraz@VoometDesign.com</p>
                      </div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl flex items-center gap-4 hover:bg-white/20 transition-all cursor-default">
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                        <Phone className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-white/50 mb-1">HR Hotline</p>
                        <p className="font-bold text-base">+91 9845014279</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side: Form */}
              <div className="lg:w-7/12 p-10 lg:p-16 bg-white">
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 block">Full Name *</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400"><User size={18} /></div>
                        <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3.5 outline-none focus:border-[#020617] focus:ring-1 focus:ring-[#020617] transition-all text-slate-900 placeholder:text-slate-400 font-medium" placeholder="John Doe" />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 block">Email Address *</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400"><Mail size={18} /></div>
                        <input type="email" className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3.5 outline-none focus:border-[#020617] focus:ring-1 focus:ring-[#020617] transition-all text-slate-900 placeholder:text-slate-400 font-medium" placeholder="john@example.com" />
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 block">Phone Number *</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400"><Phone size={18} /></div>
                        <input type="tel" className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3.5 outline-none focus:border-[#020617] focus:ring-1 focus:ring-[#020617] transition-all text-slate-900 placeholder:text-slate-400 font-medium" placeholder="+91 98765 43210" />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 block">Position *</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400"><Briefcase size={18} /></div>
                        <select className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3.5 outline-none focus:border-[#020617] focus:ring-1 focus:ring-[#020617] transition-all text-slate-900 font-medium appearance-none">
                          <option>Senior Interior Designer</option>
                          <option>Site Supervisor</option>
                          <option>Graphic Designer</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 block">Resume / Portfolio Link *</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400"><Upload size={18} /></div>
                      <input type="url" placeholder="Google Drive, Behance, or Portfolio URL" className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3.5 outline-none focus:border-[#020617] focus:ring-1 focus:ring-[#020617] transition-all text-slate-900 placeholder:text-slate-400 font-medium" />
                    </div>
                  </div>

                  <button className="w-full bg-[#020617] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#324A61] transition-all shadow-xl flex items-center justify-center gap-3 mt-4 active:scale-[0.98]">
                    Submit Application <Send size={20} />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
