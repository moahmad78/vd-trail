"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Shield, Star, Award, Loader2 } from "lucide-react";

export default function PremiumConsultation() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, type: "premium_consultation" })
      });

      if (response.ok) {
        setIsSuccess(true);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const checklistItems = [
    "20+ Years of Industry Experience",
    "In-house Execution",
    "250+ Happy Customers",
    "Complete Turnkey Interior Solutions",
    "3D Design & Material Visualization Before Execution",
    "On-Time Delivery with Quality Assurance",
    "End-to-End Execution",
    "PAN India Service"
  ];

  return (
    <section className="w-full bg-[#f8f9fa] py-20 px-6 md:px-12">
      <div className="max-w-[1440px] mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col lg:flex-row w-full bg-white rounded-[32px] overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.08)] min-h-[620px] lg:max-h-[700px]"
        >
          {/* Left Column - Trust & Brand Story */}
          <div className="w-full lg:w-[48%] relative p-[28px] md:p-[40px] lg:p-[56px_60px] flex flex-col justify-center">
            {/* Background Image & Overlay */}
            <div className="absolute inset-0 z-0">
              <img loading="lazy"
                src="/images/Services-card/residential.webp" 
                alt="Premium Interior Design" 
                className="w-full h-full object-cover"
              />
              <div 
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(90deg, rgba(7,22,51,0.95) 0%, rgba(7,22,51,0.92) 30%, rgba(7,22,51,0.82) 50%, rgba(7,22,51,0.62) 68%, rgba(7,22,51,0.28) 82%, rgba(7,22,51,0.00) 100%)"
                }}
              />
            </div>

            <div className="relative z-20 text-white h-full flex flex-col justify-center">
              <span className="text-[12px] uppercase tracking-[0.15em] font-semibold text-white/80 mb-6 block">
                Bangalore's Trusted Interior Design Studio

              </span>
              
              <h3 className="text-[28px] font-[600] mb-[24px]">Transforming Spaces. Creating Experiences.
</h3>
              
              <p className="text-[18px] font-[400] leading-[1.7] text-[rgba(255,255,255,0.92)] max-w-[500px] mb-[32px]">
                Modern Interior Design for Residential & Hospitality Spaces.
              </p>
              
              <p className="text-[16px] font-[300] leading-[1.9] text-[rgba(255,255,255,0.78)] max-w-[500px] mb-[40px]">
                From concept to completion, we deliver functional, elegant, and timeless interiors tailored to your vision and budget.
              </p>

              <div>
                <h3 className="text-[28px] font-[600] mb-[24px]">Why Choose Us?</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-[18px] gap-x-[32px]">
                  {checklistItems.map((item, index) => (
                    <div key={index} className="flex items-start gap-3 max-w-[260px]">
                      <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-[#D4AF37]/20 flex items-center justify-center">
                        <Check className="w-[18px] h-[18px] text-[#D4AF37]" strokeWidth={3} />
                      </div>
                      <span className="text-[16px] font-[400] leading-[1.7] text-[rgba(255,255,255,0.92)]">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Consultation Form */}
          <div className="w-full lg:w-[52%] p-[28px] md:p-[40px] lg:p-[56px_60px] flex flex-col justify-center bg-white relative z-10">
            {isSuccess ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-20"
              >
                <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="w-10 h-10 text-green-500" strokeWidth={2.5} />
                </div>
                <h3 className="text-[28px] font-bold text-[#071633] mb-4">Thank You!</h3>
                <p className="text-[#6E7D9B] text-[16px]">
                  Our design team will contact you within one business day.
                </p>
              </motion.div>
            ) : (
              <>
                <h3 className="text-[30px] md:text-[36px] font-bold text-[#071633] tracking-tight mb-2">
                  Start Your Interior Journey
                </h3>
                <p className="text-[#071633]/80 text-[16px] mb-2 font-medium">
                  Book a Free Design Consultation with Our Experts.
                </p>
                <p className="text-[#6E7D9B] text-[13px] mb-8 flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" /> Free consultation • We respond within one business day.
                </p>

                <form onSubmit={handleSubmit} className="space-y-[16px]">
                  <input type="text" name="botField" className="hidden" tabIndex={-1} autoComplete="off" />
                  {/* Row 1 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px]">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="name" className="text-[13px] font-semibold text-[#071633] ml-1">Full Name</label>
                      <input 
                        type="text" 
                        id="name"
                        name="name"
                        required
                        className="w-full h-[52px] px-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#071633] focus:ring-1 focus:ring-[#071633] outline-none transition-all placeholder:text-slate-400 text-[15px]"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="mobileNumber" className="text-[13px] font-semibold text-[#071633] ml-1">Phone Number</label>
                      <input 
                        type="tel" 
                        id="mobileNumber"
                        name="mobileNumber"
                        required
                        pattern="[0-9\+\-\s]+"
                        className="w-full h-[52px] px-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#071633] focus:ring-1 focus:ring-[#071633] outline-none transition-all placeholder:text-slate-400 text-[15px]"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>

                  {/* Row 2 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px]">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="email" className="text-[13px] font-semibold text-[#071633] ml-1">Email Address</label>
                      <input 
                        type="email" 
                        id="email"
                        name="email"
                        required
                        pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                        className="w-full h-[52px] px-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#071633] focus:ring-1 focus:ring-[#071633] outline-none transition-all placeholder:text-slate-400 text-[15px]"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="projectLocation" className="text-[13px] font-semibold text-[#071633] ml-1">City</label>
                      <input 
                        type="text" 
                        id="projectLocation"
                        name="projectLocation"
                        required
                        className="w-full h-[52px] px-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#071633] focus:ring-1 focus:ring-[#071633] outline-none transition-all placeholder:text-slate-400 text-[15px]"
                        placeholder="Bangalore"
                      />
                    </div>
                  </div>

                  {/* Row 3 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px]">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="requirement" className="text-[13px] font-semibold text-[#071633] ml-1">Requirement</label>
                      <select 
                        id="requirement"
                        name="requirement"
                        required
                        defaultValue=""
                        className="w-full h-[52px] px-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#071633] focus:ring-1 focus:ring-[#071633] outline-none transition-all text-[#071633] text-[15px] appearance-none"
                      >
                        <option value="" disabled>Select Requirement</option>
                        <option value="Residential">Residential</option>
                        <option value="Hospitality">Hospitality</option>
                        <option value="Educational">Educational</option>
                        <option value="Commercial">Commercial</option>
                        <option value="UPVC">UPVC</option>
                        <option value="Technical Solutions">Technical Solutions</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="areaSqft" className="text-[13px] font-semibold text-[#071633] ml-1">Approx. Area (sqft) *</label>
                      <input 
                        type="number"
                        id="areaSqft"
                        name="areaSqft"
                        required
                        className="w-full h-[52px] px-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#071633] focus:ring-1 focus:ring-[#071633] outline-none transition-all placeholder:text-slate-400 text-[15px]"
                        placeholder="Enter total area in sqft (e.g., 1200)"
                      />
                    </div>
                  </div>

                  {/* Row 4 */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="projectDetails" className="text-[13px] font-semibold text-[#071633] ml-1">Additional Project Details</label>
                    <textarea 
                      id="projectDetails"
                      name="projectDetails"
                      className="w-full min-h-[90px] p-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#071633] focus:ring-1 focus:ring-[#071633] outline-none transition-all placeholder:text-slate-400 text-[15px] resize-y"
                      placeholder="Tell us a bit about your space and what you're looking for..."
                    />
                  </div>

                  {/* CTA */}
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full h-[60px] mt-[24px] bg-[#071633] text-white font-semibold rounded-full hover:-translate-y-[2px] hover:shadow-[0_10px_30px_rgba(7,22,51,0.2)] active:scale-[0.98] transition-all duration-300 disabled:opacity-70 flex items-center justify-center"
                  >
                    {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Get Free Design Consultation"}
                  </button>

                  {/* Trust Strip */}
                  <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mt-6 opacity-75">
                    <div className="flex items-center gap-1.5 text-[#071633]">
                      <Star className="w-4 h-4 text-[#D4AF37]" />
                      <span className="text-[12px] font-semibold">20+ Years Experience</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[#071633]">
                      <Shield className="w-4 h-4 text-[#D4AF37]" />
                      <span className="text-[12px] font-semibold">300+ Projects Delivered</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[#071633]">
                      <Award className="w-4 h-4 text-[#D4AF37]" />
                      <span className="text-[12px] font-semibold">Free Consultation</span>
                    </div>
                  </div>
                </form>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
