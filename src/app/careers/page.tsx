"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, Zap, Factory, Globe, ChevronDown, Upload, Send, Sparkles } from "lucide-react";

const culture = [
  {
    title: "Innovation-First",
    desc: "Work with real-time 3D visualization and state-of-the-art tech-driven execution processes.",
    icon: <Zap className="w-8 h-8 text-accent" />
  },
  {
    title: "In-House Power",
    desc: "Gain hands-on experience in our 100% in-house fabrication units for bespoke woodwork and technical execution.",
    icon: <Factory className="w-8 h-8 text-accent" />
  },
  {
    title: "Pan-India Reach",
    desc: "Opportunity to contribute to diverse architectural projects from Gorakhpur to Bangalore.",
    icon: <Globe className="w-8 h-8 text-accent" />
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
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50/50 -z-10 rounded-l-[10rem]" />
        <div className="container mx-auto px-6">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 text-accent mb-6"
            >
              <Briefcase size={20} />
              <span className="text-sm font-bold uppercase tracking-widest">Careers at Voomet</span>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-display font-bold text-[#020617] mb-8 leading-tight"
            >
              Build the Future <br /> of Interiors with Us.
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-slate-500 mb-12 max-w-2xl leading-relaxed"
            >
              Join a team of 20+ years of legacy where precision meets creativity. We are always looking for visionary designers and technical experts to define modern lifestyles.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <button 
                onClick={() => document.getElementById('open-positions')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-[#020617] text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-accent transition-all shadow-2xl shadow-primary/20"
              >
                View Open Positions
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Join Us? */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {culture.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="p-10 rounded-[3rem] bg-slate-50 border border-slate-100 hover:border-accent/20 transition-all group"
              >
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-display font-bold text-[#020617] mb-4">{item.title}</h3>
                <p className="text-slate-500 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section id="open-positions" className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-sm font-bold text-accent uppercase tracking-widest mb-4">Opportunities</h2>
              <h3 className="text-4xl md:text-5xl font-display font-bold text-[#020617]">Current Open Positions</h3>
            </div>

            <div className="space-y-6">
              {jobs.map((job) => (
                <div key={job.id} className="bg-white rounded-[2rem] border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-all">
                  <button
                    onClick={() => setActiveJob(activeJob === job.id ? null : job.id)}
                    className="w-full p-8 flex items-center justify-between text-left"
                  >
                    <div>
                      <h4 className="text-xl font-bold text-[#020617] mb-1">{job.title}</h4>
                      <p className="text-sm text-accent font-bold uppercase tracking-widest">{job.location}</p>
                    </div>
                    <ChevronDown className={`text-slate-300 transition-transform duration-300 ${activeJob === job.id ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {activeJob === job.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                      >
                        <div className="px-8 pb-8">
                          <p className="text-slate-500 mb-8 leading-relaxed">{job.desc}</p>
                          <button 
                            onClick={() => document.getElementById('apply-now')?.scrollIntoView({ behavior: 'smooth' })}
                            className="text-[#020617] font-bold border-b-2 border-[#020617] pb-1 hover:text-accent hover:border-accent transition-all"
                          >
                            Apply for this position
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
          <div className="max-w-5xl mx-auto">
            <div className="bg-[#020617] text-white rounded-[4rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row">
              <div className="lg:w-2/5 p-12 lg:p-20 bg-accent text-primary flex flex-col justify-between">
                <div>
                  <h3 className="text-4xl font-display font-bold mb-8">Start Your <br /> Journey.</h3>
                  <p className="text-primary/70 mb-12 text-lg">
                    Submit your details and portfolio. Our HR team will review your application and get in touch if you are a good fit.
                  </p>
                  
                  <div className="space-y-6">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-primary/50 mb-1">HR Email</p>
                      <p className="font-bold text-lg">shiraz@voomet.com</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-primary/50 mb-1">HR Hotline</p>
                      <p className="font-bold text-lg">+91 9845014279</p>
                    </div>
                  </div>
                </div>
                <div className="mt-20 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Sparkles size={24} className="text-primary" />
                  </div>
                  <p className="font-bold text-sm">Join the Elite Interior Squad.</p>
                </div>
              </div>

              <div className="lg:w-3/5 p-12 lg:p-20">
                <form className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-white/40">Full Name</label>
                      <input type="text" className="w-full bg-white/5 border-b border-white/10 py-4 outline-none focus:border-accent transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-white/40">Email Address</label>
                      <input type="email" className="w-full bg-white/5 border-b border-white/10 py-4 outline-none focus:border-accent transition-all" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-white/40">Phone Number</label>
                      <input type="tel" className="w-full bg-white/5 border-b border-white/10 py-4 outline-none focus:border-accent transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-white/40">Position</label>
                      <select className="w-full bg-transparent border-b border-white/10 py-4 outline-none focus:border-accent transition-all appearance-none text-white/60">
                        <option className="bg-primary">Senior Interior Designer</option>
                        <option className="bg-primary">Site Supervisor</option>
                        <option className="bg-primary">Graphic Designer</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <label className="text-xs font-bold uppercase tracking-widest text-white/40 block">Resume / Portfolio Link</label>
                    <div className="relative group">
                      <input type="text" placeholder="Drive or Portfolio URL" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 outline-none focus:border-accent transition-all" />
                      <Upload className="absolute right-6 top-4 text-white/20 group-hover:text-accent transition-colors" size={20} />
                    </div>
                  </div>

                  <button className="w-full bg-accent text-primary py-5 rounded-2xl font-bold text-lg hover:bg-white transition-all shadow-xl flex items-center justify-center gap-3 active:scale-95 transform">
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
