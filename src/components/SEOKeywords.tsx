import React from "react";

const locations = [
  "Interior Designer in Bengaluru", "Interior Designer in Gorakhpur", "Interior Designer in Maharajganj", "Interior Designer in Mumbai",
  "Interior Designer in Delhi", "Interior Designer in Pune", "Interior Designer in Hyderabad", "Interior Designer in Chennai",
  "Interior Designer in Kolkata", "Interior Designer in Ahmedabad", "Interior Designer in Surat", "Interior Designer in Jaipur",
  "Interior Designer in Lucknow", "Interior Designer in Kanpur", "Interior Designer in Varanasi", "Interior Designer in Indore",
  "Interior Designer in Bhopal", "Interior Designer in Patna", "Interior Designer in Vadodara", "Interior Designer in Ghaziabad",
  "Interior Designer in Ludhiana", "Interior Designer in Agra", "Interior Designer in Nashik", "Interior Designer in Faridabad",
  "Interior Designer in Meerut", "Interior Designer in Rajkot", "Interior Designer in Kalyan-Dombivli", "Interior Designer in Vasai-Virar",
  "Interior Designer in Srinagar", "Interior Designer in Aurangabad", "Interior Designer in Dhanbad", "Interior Designer in Amritsar",
  "Interior Designer in Navi Mumbai", "Interior Designer in Allahabad", "Interior Designer in Ranchi", "Interior Designer in Howrah",
  "Interior Designer in Jabalpur", "Interior Designer in Gwalior", "Interior Designer in Vijayawada", "Interior Designer in Jodhpur",
  "Interior Designer in Madurai", "Interior Designer in Raipur", "Interior Designer in Kota", "Interior Designer in Guwahati",
  "Interior Designer in Chandigarh", "Interior Designer in Solapur", "Interior Designer in Hubli-Dharwad", "Interior Designer in Bareilly",
  "Interior Designer in Moradabad", "Interior Designer in Mysore", "Interior Designer in Gurgaon", "Interior Designer in Noida"
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

const searchHooks = [
  "Modern Office Design Trends 2026", "Luxury CEO Office Ideas", "Best Color Combinations for Offices", "Small Office Space Saving Tips",
  "Eco-Friendly Materials for Interiors", "Benefits of In-House Technical Execution", "How to Design a High-Tech Hospital",
  "Classroom Design for Student Engagement", "3D Interior Rendering Services", "Cost-Effective Commercial Interiors",
  "Modern Living Room Trends", "Luxury Master Bedroom Decor", "Modular Kitchen vs Carpenter Made", "Bespoke Furniture vs Ready Made",
  "Soundproofing Solutions for Cabin", "Biophilic Design Benefits", "Creative Reception Wall Ideas", "False Ceiling Trends 2026",
  "Wall Panel Materials Guide", "Smart Home Automation Tips", "Turnkey vs Non-Turnkey Projects", "Interior Design Checklist for Startups",
  "Creative Library Layouts", "Modern Pantry Design Ideas", "Minimalist Home Office Setup", "Industrial Style Cafe Decor",
  "Luxury Hotel Suite Interior", "Clinic Hygiene Standards in Design", "Office Lighting Guide", "Best Flooring for High Traffic",
  "Space Management in Small Apartments", "Modern Staircase Design", "Outdoor Decking Solutions", "Custom Furniture Manufacturing",
  "Interior Design Cost per Sq Ft", "How to Choose an Interior Designer", "Importance of 2D Layout Planning", "VR Walkthroughs in Design",
  "Bespoke Interior Trends", "High-Performance Technical Interiors", "Architectural Design Principles", "Color Psychology in Healthcare",
  "Modern Retail Display Ideas", "Commercial Kitchen Design", "Luxury Walk-in Closets", "Kids Room Design Ideas",
  "Sustainable Office Furniture", "Open Desk vs Private Cabin", "Importance of Ventilation in Design", "Trending Ceiling Textures"
];

const SEOKeywords = () => {
  return (
    <footer className="bg-white border-t border-slate-100 py-12">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto space-y-16">
          
          {/* Section 1: Locations */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-6 border-b border-slate-100 pb-2 inline-block">
              PAN-India Locations
            </h4>
            <div className="flex flex-wrap items-center gap-y-3">
              {locations.map((loc, idx) => (
                <React.Fragment key={idx}>
                  <span className="text-[12px] text-slate-600 hover:text-accent transition-colors cursor-default leading-relaxed">
                    {loc}
                  </span>
                  {idx < locations.length - 1 && (
                    <span className="text-[12px] font-bold text-slate-300 mx-3">•</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Section 2: Categories */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-6 border-b border-slate-100 pb-2 inline-block">
              Specialized Design Categories
            </h4>
            <div className="flex flex-wrap items-center gap-y-3">
              {categories.map((cat, idx) => (
                <React.Fragment key={idx}>
                  <span className="text-[12px] text-slate-600 hover:text-accent transition-colors cursor-default leading-relaxed">
                    {cat}
                  </span>
                  {idx < categories.length - 1 && (
                    <span className="text-[12px] font-bold text-slate-300 mx-3">•</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Section 3: Search Hooks */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-6 border-b border-slate-100 pb-2 inline-block">
              Popular Search Hooks & Blogs
            </h4>
            <div className="flex flex-wrap items-center gap-y-3">
              {searchHooks.map((hook, idx) => (
                <React.Fragment key={idx}>
                  <span className="text-[12px] text-slate-600 hover:text-accent transition-colors cursor-default leading-relaxed">
                    {hook}
                  </span>
                  {idx < searchHooks.length - 1 && (
                    <span className="text-[12px] font-bold text-slate-300 mx-3">•</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="pt-16 text-center border-t border-slate-50">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em]">
              Voomet Design & Fabrication Private Limited • High-Performance Architectural Excellence • Serving 50+ Cities Nationwide
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SEOKeywords;
