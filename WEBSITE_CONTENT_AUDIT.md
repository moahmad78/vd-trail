# 🌐 VOOMET DESIGN & FABRICATION — COMPLETE CODEBASE CONTENT AUDIT

> **Document Version:** 1.0.0  
> **Target Codebase:** `VD-WEB` (Next.js 15 App Router + Prisma + TypeScript + Tailwind CSS)  
> **Audited By:** Antigravity Deep Exploration Agent  
> **Status:** Production-Verified Codebase Audit  

---

## 📑 TABLE OF CONTENTS
1. [Executive Summary & Technical Stack](#1-executive-summary--technical-stack)
2. [Global Architecture & Layout Systems](#2-global-architecture--layout-systems)
3. [Hierarchical Sitemap & Routing Tree](#3-hierarchical-sitemap--routing-tree)
4. [Public Facing Pages Audit](#4-public-facing-pages-audit)
   - [4.1 Homepage (`/`)](#41-homepage-)
   - [4.2 About Us (`/about`)](#42-about-us-about)
   - [4.3 Services Hub (`/services`)](#43-services-hub-services)
   - [4.4 Aluminium Systems (`/services/aluminium-systems`)](#44-aluminium-systems-servicesaluminium-systems)
   - [4.5 UPVC Systems (`/services/upvc-systems`)](#45-upvc-systems-servicesupvc-systems)
   - [4.6 Dynamic Service Showcase (`/services/[...slug]`)](#46-dynamic-service-showcase-servicesslug)
   - [4.7 Design Gallery (`/designs`)](#47-design-gallery-designs)
   - [4.8 Project Case Study (`/work/[slug]`)](#48-project-case-study-workslug)
   - [4.9 Blog & Insights Hub (`/blog`)](#49-blog--insights-hub-blog)
   - [4.10 Individual Blog Article (`/blog/[slug]`)](#410-individual-blog-article-blogslug)
   - [4.11 Contact & Studio Consultation (`/contact`)](#411-contact--studio-consultation-contact)
   - [4.12 Frequently Asked Questions (`/faq`)](#412-frequently-asked-questions-faq)
   - [4.13 Careers & Open Positions (`/careers`)](#413-careers--open-positions-careers)
   - [4.14 Privacy Policy (`/privacy`)](#414-privacy-policy-privacy)
   - [4.15 Terms of Service (`/terms`)](#415-terms-of-service-terms)
   - [4.16 Bangalore Hub (`/interior-designer-bangalore`)](#416-bangalore-hub-interior-designer-bangalore)
   - [4.17 Bangalore Hyper-Local Neighborhoods (`/interior-designer-bangalore/[area]`)](#417-bangalore-hyper-local-neighborhoods-interior-designer-bangalorearea)
5. [Internal CRM & Administration Portals](#5-internal-crm--administration-portals)
   - [5.1 Employee/Admin Authentication (`/login`)](#51-employeeadmin-authentication-login)
   - [5.2 Executive Lead Portal (`/lead`)](#52-executive-lead-portal-lead)
   - [5.3 Admin CRM & Performance Dashboard (`/adminlead`)](#53-admin-crm--performance-dashboard-adminlead)
   - [5.4 Admin Staff Directory & Credential Management (`/admin/users`)](#54-admin-staff-directory--credential-management-adminusers)
   - [5.5 Executive Mock Portal (`/mock-portal`)](#55-executive-mock-portal-mock-portal)
6. [Data Models & Schema Reference (Prisma)](#6-data-models--schema-reference-prisma)
7. [API Endpoints & Server Action Directory](#7-api-endpoints--server-action-directory)
8. [Form Inventory & Conversion Matrix](#8-form-inventory--conversion-matrix)

---

## 1. EXECUTIVE SUMMARY & TECHNICAL STACK

Voomet Design (`VD-WEB`) is an ultra-premium turnkey architectural, interior design, and industrial fabrication web application. The platform incorporates a public brand experience, interactive project galleries, local SEO engines, and an enterprise real-time Lead Management CRM with Web Push notifications.

### Core Technology Stack
* **Framework:** Next.js 15+ (App Router)
* **Frontend Library:** React 19, TypeScript
* **Styling:** Tailwind CSS, Custom Utility CSS Variables, Modular Glassmorphism
* **Animations:** Framer Motion, Canvas Confetti, CSS Infinite Marquees
* **Database & ORM:** PostgreSQL, Prisma ORM
* **State Management:** React Context API (`QuoteContext.tsx`), Real-time polling
* **Icons:** `lucide-react`
* **PWA & Notifications:** Service Worker Push Notifications (`/sw.js`, Web Push API)

---

## 2. GLOBAL ARCHITECTURE & LAYOUT SYSTEMS

### 2.1 Root Layout (`src/app/layout.tsx`)
* **Metadata & SEO:** Title template `%s | Voomet Design`, Canonical URL generation, OpenGraph tags, Google Tag Manager (`GTM-58S34VLF`).
* **Providers:**
  * `QuoteProvider` (`src/contexts/QuoteContext.tsx`): Controls modal visibility, voucher countdown, and promo codes.
  * `SmoothScroll`: Lenis-based momentum scrolling.
  * `CustomCursor`: Custom magnetic cursor overlay.
* **Global Overlays:**
  * `GlobalHeader` (Conditional `Navbar` wrapper via `GlobalVisibility.tsx`).
  * `GlobalFooter` (Conditional `Footer` wrapper via `GlobalVisibility.tsx`).
  * `QuoteModal`: Global lead capture consultation modal.
  * `WelcomePopup`: 8-second delayed swipe-to-reveal discount banner.
  * `WhatsAppButton`: Floating direct contact conversion widget.

### 2.2 Global Navigation (`src/components/Navbar.tsx`)
* **Visual Styling:** Translucent glassmorphism (`backdrop-blur-md bg-white/90`), sticky top positioning, brand logo.
* **Navigation Links & Mega-Menu:**
  1. **Spaces We Design (Dropdown):**
     * Residential Interiors (`/services/residential-interiors`)
     * Commercial Interiors (`/services/commercial-interiors`)
     * Boutique Hotels (`/services/boutique-hotels`)
     * Service Apartments (`/services/service-apartments`)
     * PG Accommodations (`/services/pg-accommodation`)
     * Educational Institutions (`/services/educational-institutions`)
  2. **Our Expertises (Dropdown):**
     * Aluminium Systems (`/services/aluminium-systems`)
     * UPVC Systems (`/services/upvc-systems`)
     * Facades & Glazing (`/services/facades-glazing`)
  3. **Designs / Portfolio:** `/designs`
  4. **Our Story (About):** `/about`
  5. **Insights (Blog):** `/blog`
  6. **Contact Us:** `/contact`
* **CTA Button:** *"Free 3D Layout Consultation"* (Triggers `QuoteModal`).
* **Mobile Drawer:** Slide-out full-screen navigation with nested accordion accordions for sub-services.

### 2.3 Global Footer (`src/components/Footer.tsx`)
* **4-Column Layout:**
  * **Col 1 (Brand Profile):** Voomet Design logo, legacy statement ("Over 20+ years of turning architectural blueprints into bespoke luxury spaces"), copyright notice.
  * **Col 2 (Services):** Direct links to Residential, Commercial, Hospitality, Educational, Aluminium, and UPVC systems.
  * **Col 3 (Company & Resources):** Links to About Us, Designs Portfolio, Blog, FAQs, Careers, Privacy Policy, Terms of Service.
  * **Col 4 (Studio Contact & Cities Served):**
    * *Where We Work:* Bengaluru (HQ), Doddaballapura (Industrial Unit), Gorakhpur, Delhi NCR.
    * Direct Contact: Phone (`+91 9845014279`), Email (`info@voometdesign.com`).
* **Social Media Handles:** Instagram, LinkedIn, Facebook, YouTube.

---

## 3. HIERARCHICAL SITEMAP & ROUTING TREE

```
VD-WEB (App Root)
├── / (Home)
├── /about (Our Story & Turnkey Legacy)
├── /services (Services Hub)
│   ├── /services/aluminium-systems (Dedicated High-Tech Facade & Window System)
│   ├── /services/upvc-systems (Dedicated Soundproof UPVC Engineering)
│   └── /services/[...slug] (Dynamic Architectural Sector Catch-All)
│       ├── /services/residential-interiors
│       ├── /services/commercial-interiors
│       ├── /services/boutique-hotels
│       ├── /services/service-apartments
│       ├── /services/pg-accommodation
│       ├── /services/educational-institutions
│       └── /services/facades-glazing
├── /designs (Interactive Portfolio & Design Gallery)
├── /work/[slug] (Individual Deep-Dive Project Case Studies)
│   ├── /work/apps-for-bharat
│   ├── /work/zluri
│   ├── /work/qpiai
│   ├── /work/pw-brigade
│   ├── /work/juego
│   ├── /work/orbit
│   ├── /work/littlegym
│   └── /work/happey
├── /blog (Design Intelligence & Architectural Insights)
│   └── /blog/[slug] (Individual Technical Blog Post)
├── /contact (Studio Consultation & Location Map)
├── /faq (Frequently Asked Questions)
├── /careers (Job Opportunities & Talent Application)
├── /privacy (Privacy Policy)
├── /terms (Terms of Service)
├── /interior-designer-bangalore (Bangalore Regional Landing Page)
│   └── /interior-designer-bangalore/[area] (Hyper-Local SEO Pages)
│       ├── /interior-designer-bangalore/whitefield
│       ├── /interior-designer-bangalore/indiranagar
│       ├── /interior-designer-bangalore/koramangala
│       ├── /interior-designer-bangalore/hsr-layout
│       ├── /interior-designer-bangalore/jayanagar
│       ├── /interior-designer-bangalore/sadashivanagar
│       ├── /interior-designer-bangalore/yelahanka
│       └── /interior-designer-bangalore/bellandur
│
├── /login (Staff & Admin PIN Authentication Portal)
├── /lead (Executive CRM Dashboard)
├── /adminlead (Administrator Master CRM & Analytics Engine)
├── /admin/users (Administrator User & Staff Management)
└── /mock-portal (Standalone Mock Demonstration Portal)
```

---

## 4. PUBLIC FACING PAGES AUDIT

---

### 4.1 Homepage (`/`)
* **Route:** `/`
* **File:** `src/app/page.tsx`
* **Purpose:** High-impact landing page establishing brand authority, luxury craftsmanship, in-house fabrication capabilities, and project portfolio.

#### Sections Breakdown (Top to Bottom):
1. **Hero Section (`src/components/Hero.tsx`)**
   * *Content:* Video background (`/video/hero/herovideo.mp4`), badge: *"Bespoke Architectural Interiors"*, Main Heading: *"Crafting Spaces That Define Modern Luxury"*, dynamic rotating subtitle ("Bespoke Residential", "Luxury Hospitality", "Corporate HQ", "Institutional Spaces").
   * *CTAs:* "Explore Our Works" (scrolls to portfolio) and "Schedule Free Consultation" (opens `QuoteModal`).
2. **Our Story & Legacy (`src/components/OurStory.tsx`)**
   * *Content:* 20+ years legacy narrative, awards badge, expandable key metric counters: `200+ Projects Completed`, `20+ Years Legacy`, `100% In-House Woodwork & Fabrication`, `Pan-India Footprint`.
3. **Client Marquee (`src/components/BrandsSection.tsx`)**
   * *Content:* Infinite marquee of marquee corporate clients: Apps for Bharat, Zluri, QpiAI, Physics Wallah, Juego Studios, Orbit, The Little Gym, Happey, etc.
4. **Experimental Expertise Accordion (`src/components/ExperimentalExpertise.tsx`)**
   * *Content:* Interactive expanding accordion featuring 6 core capabilities: Residential, Commercial, Hospitality, Education, Aluminium Systems, UPVC Engineering.
5. **Project Highlights Portfolio (`src/components/ProjectHighlightsV2.tsx`)**
   * *Content:* Shuffled blueprint masonry gallery with category filter chips (All, Residential, Hospitality, Education, Commercial).
   * *Interaction:* Image click opens dedicated project page (`/work/[slug]`) or lightbox view.
6. **In-House Fabrication Unit (`src/components/AssociateCompany.tsx`)**
   * *Content:* Dedicated feature on **ALTECH Enterprises** (Voomet's associate industrial manufacturing and heavy fabrication plant in Doddaballapura).
7. **Cinematic Closing CTA (`src/components/CTAV4.tsx`)**
   * *Content:* Interactive CAD blueprint canvas background, headline: *"Ready to Transform Your Space?"*, subtitle: *"Get a complimentary 3D site survey and estimate worth ₹10,000"*, CTA button triggering `QuoteModal`.

---

### 4.2 About Us (`/about`)
* **Route:** `/about`
* **File:** `src/app/about/page.tsx`, `src/app/about/layout.tsx`
* **Purpose:** Comprehensive narrative on Voomet Design’s 20-year history, leadership, architectural philosophy, in-house factories, and 4-step turnkey execution pipeline.

#### Sections Breakdown (Top to Bottom):
1. **Cinematic Video Hero:** Autoplaying background video with dark overlay and bold headline: *"Two Decades of Crafting Iconic Spaces."*
2. **Legacy Narrative (2-Column):** Deep dive into founding vision, transition from master carpentry to full-scale architectural turnkey fit-out firm.
3. **Chronological Milestone Timeline:** Vertical timeline tracking milestones from 2004 (Founding) through 2026 (Full Pan-India Industrial Expansion).
4. **"What We Do" Capabilities (6-Card Grid):** Detailed cards covering Residential Architecture, Commercial HQ, Luxury Hospitality, Institutional Campuses, Aluminium Facades, UPVC Systems.
5. **"Why Choose Us" Value Pillars (4-Column):**
   * 100% In-House Factory Fabrication
   * Fixed Timelines & Milestone-based Turnkey
   * Direct Material Sourcing (Zero Middlemen)
   * 10-Year Structural & Finish Warranty
6. **4-Step Execution Blueprint:**
   * Step 1: *Consult & 3D Spatial Audit*
   * Step 2: *Detailed 2D/3D Design & BOQ Finalization*
   * Step 3: *Off-Site Factory Milling & Civil Prep*
   * Step 4: *On-Site Assembly, Quality Audit & Handover*
7. **Leadership & Craftsmanship Showcase:** Profiles of leadership, technical design leads, master carpenters, and site engineers.
8. **Awards & Industry Recognition:** Accreditations, safety certificates, and design awards.
9. **Direct Studio Contact Form (`src/components/ContactSection.tsx`):** Full contact form and map.

---

### 4.3 Services Hub (`/services`)
* **Route:** `/services`
* **File:** `src/app/services/page.tsx`
* **Purpose:** Comprehensive catalog of all interior design, structural glazing, and architectural services offered across India.

#### Sections Breakdown (Top to Bottom):
1. **Hero Header:** AutoCAD blueprint watermark, title: *"Comprehensive Architectural & Interior Services"*, subtitle explaining turnkey end-to-end scope.
2. **Sticky Category Navigation Bar (`src/components/StickyServiceNav.tsx`):** Quick jump links to Residential, Commercial, Hospitality, Education, Aluminium, UPVC.
3. **Heavy-Duty Sector Deep Dives:** Detailed breakdown of each sector with high-res photography, deliverable lists, and direct links to specialized sub-pages.
4. **The Voomet Design Difference Grid (`src/components/VoometDesignDifference.tsx`):** Engineering tolerances, factory-controlled joinery, acoustic testing benchmarks.
5. **Client Testimonials Carousel (`src/components/ServiceTestimonials.tsx`):** Verified client quotes, company names, and project scopes.
6. **Technical Consultation CTA:** Link to schedule project estimation.

---

### 4.4 Aluminium Systems (`/services/aluminium-systems`)
* **Route:** `/services/aluminium-systems`
* **File:** `src/app/services/aluminium-systems/page.tsx`
* **Purpose:** Technical presentation of heavy-duty, slimline, thermal-break aluminium doors, windows, and structural facades.

#### Sections Breakdown (Top to Bottom):
1. **Hero Section:** Video background showcasing slimline sliding mechanisms, heading: *"High-Performance Slimline Aluminium Systems"*.
2. **Core Technical Advantages (4-Card Matrix):** Polyamide Thermal Break, 20mm Slim Interlock Sightlines, Up to 400kg Gliding Load Capacity, Wind Load Resistance up to 3500 Pa.
3. **Engineering Specifications Grid:** Alloy 6063-T6 specifications, Anodized/PVDF coating standards, Double Glazed Unit (DGU) with Argon gas, Acoustic insulation down to 35dB.
4. **Product Line Solutions (9 Systems):** Minimalist Sliding, Lift & Slide Doors, Casement Windows, Tilt & Turn Systems, Structural Glazing, Glass Railings, Curtain Walls, Bi-fold Accordion Doors, Louver Systems.
5. **6-Step Manufacturing & Installation Pipeline:** Extrusion inspection -> CNC cutting -> Corner crimping -> EPDM sealing -> Glass glazing -> On-site laser leveling.
6. **Aluminium Inquiry Quotation Form (`src/components/AluminiumInquiryForm.tsx`):** Specialized lead form with parameters like project type, profile thickness, glass specs, and square footage. Submits to `/api/contact` with `type: "aluminium_inquiry"`.

---

### 4.5 UPVC Systems (`/services/upvc-systems`)
* **Route:** `/services/upvc-systems`
* **File:** `src/app/services/upvc-systems/page.tsx`
* **Purpose:** Technical presentation of European-standard lead-free UPVC window and door systems designed for tropical climates and zero-noise environments.

#### Sections Breakdown (Top to Bottom):
1. **Hero Header:** High-res image banner, heading: *"Precision-Engineered UPVC Window & Door Systems"*.
2. **Why Choose UPVC:** 100% Lead-free multi-chamber profiles, Anti-UV compound formulation, Fusion-welded joints, Galvanized steel reinforcement.
3. **6 UPVC Product Line Cards:** Sliding Windows, Casement Doors, Villa Windows with Grill & Mesh, Arch Windows, Slide & Fold Partitions, Tilt & Turn Systems.
4. **Material Advantage Badges:** Zero Termite Degradation, Class 1 Fire Retardant, Dust & Rain Proof Multi-point Locking, 40+ Year Lifespan.
5. **Execution Workflow:** Precision digital site survey -> Factory welded sash assembly -> Multipoint hardware installation -> Foam & silicone weather sealing.
6. **UPVC Inquiry Form (`src/components/UpvcInquiryForm.tsx`):** Dedicated form submitting to `/api/contact` with `type: "upvc_inquiry"`.

---

### 4.6 Dynamic Service Showcase (`/services/[...slug]`)
* **Route:** `/services/[...slug]`
* **File:** `src/app/services/[...slug]/page.tsx`
* **Supported Slugs:**
  * `residential-interiors` (Luxury Villas, Apartments, Penthouses)
  * `commercial-interiors` (Corporate HQ, Agile Workspaces, Tech Hubs)
  * `boutique-hotels` (Lobbies, Luxury Suites, Fine Dining Restaurants)
  * `service-apartments` (Turnkey Short-stay & Long-stay Fit-outs)
  * `pg-accommodation` (High-density Student & Executive Hostels)
  * `educational-institutions` (Campuses, Audio-Visual Studios, Classrooms)
  * `facades-glazing` (Structural Curtain Walls & Commercial Facades)
* **Purpose:** Tailored sector page dynamically rendering specific specifications, delivery timelines, curated image galleries, client logos, and specialized inquiry forms.

#### Sections Structure:
1. **Dynamic Hero:** Context-specific background image, sector badge, and title.
2. **Key Metrics Banner:** Typical Area Scope (e.g. 5,000 - 50,000+ sq ft), Average Turnkey Timeline (e.g. 45 - 90 Days), Warranty Coverage (10 Years).
3. **Scope & Engineering Deliverables (Grid):** Detailed bulleted list of civil, MEP, millwork, and automation deliverables for that sector.
4. **Sector Gallery Integration:**
   * `ResidentialGallery.tsx` (34 curated project photos)
   * `HospitalityGallery.tsx` (24 curated project photos)
   * `EducationGallery.tsx` (23 curated project photos)
   * `CommercialGallery.tsx` (20 curated project photos)
5. **Interactive Lightbox:** Full-screen modal with zoom, navigation arrows, and keyboard support.
6. **Sector-Specific Quotation Form (`src/components/SystemInquiryForm.tsx`):** Specialized dynamic lead capture form.
7. **Closing CTA (`CTAV4.tsx`).**

---

### 4.7 Design Gallery (`/designs`)
* **Route:** `/designs`
* **File:** `src/app/designs/page.tsx`, `src/app/designs/layout.tsx`
* **Purpose:** Full-scale filterable portfolio showcasing real projects executed across India.

#### Sections Breakdown:
1. **Portfolio Header:** Heading: *"Our Design Portfolio"*, subtitle: *"Explore our residential, commercial, educational, and hospitality projects across India"*.
2. **Project Filter Navigation:** Filter chips for *All, Residential, Hospitality, Education, Commercial*.
3. **Masonry Project Grid (`src/components/ProjectHighlightsV2Client.tsx`):**
   * Displays 8 flagship projects with metadata: Title, Subtitle, Category badge, Area, and Hero Photo.
   * Hover animation: Smooth zoom-in with overlay badge and link to `/work/[slug]`.
   * Load More button for progressive loading.

---

### 4.8 Project Case Study (`/work/[slug]`)
* **Route:** `/work/[slug]`
* **File:** `src/app/work/[slug]/page.tsx`, `src/app/work/[slug]/layout.tsx`
* **Data Source:** `src/data/projectsData.ts` (Contains 8 detailed case studies)
* **Purpose:** Comprehensive architectural breakdown of an individual project.

#### Featured Projects in Database:
1. `apps-for-bharat` — *Apps for Bharat Headquarters* (8,200 sq ft tech office)
2. `zluri` — *Zluri Office of the Future* (12,500 sq ft workspace)
3. `qpiai` — *QpiAI Quantum Tech Lab* (9,000 sq ft research facility)
4. `pw-brigade` — *Physics Wallah Ed-Tech Campus* (15,000 sq ft campus & AV studios)
5. `juego` — *Juego Gaming & Animation Studio* (6,500 sq ft dark-themed studio)
6. `orbit` — *Orbit Executive Corporate HQ* (11,000 sq ft luxury office)
7. `littlegym` — *The Little Gym Children's Center* (4,500 sq ft safe active facility)
8. `happey` — *Happey Modern Fintech Office* (10,200 sq ft agile workplace)

#### Page Sections (Top to Bottom):
1. **Hero Banner:** Full-width hero photography with glassmorphism badge, project title, descriptor, and "Back to Designs" button.
2. **Split-Layout Architectural Details:**
   * **Left Column (Specifications):** Project Narrative, Lead Designer (`Sahil Sheikh` / Design Team), Architecture Firm, Exact Area (Sq Ft / m²), Materials Used (e.g. Italian Marble, Acoustic Fabric, BWR Marine Plywood), and Feature Checklist.
   * **Right Column (Media):** 2x2 High-Resolution Photo Gallery with click-to-expand Lightbox and Embedded 4K Project Video Player.
3. **Mobile Auto-Scroll Carousel:** Touch-friendly horizontal scroll on mobile viewports.

---

### 4.9 Blog & Insights Hub (`/blog`)
* **Route:** `/blog`
* **File:** `src/app/blog/page.tsx`, `src/app/blog/layout.tsx`
* **Data Source:** `src/data/blogData.ts` (8 technical design articles)
* **Purpose:** Architectural thought leadership, material guides, acoustic engineering articles, and BOQ transparency guides.

#### Sections Breakdown:
1. **Category Filter Tabs:** *All, Residential, Hospitality, Educational, Aluminium Systems*.
2. **Featured Hero Article:** Prominent featured article card with image, reading time, author, snippet, and CTA.
3. **Secondary Articles Grid:** 2-column card grid displaying post cover, tags, publishing date, and author.
4. **Sticky Sidebar (Right Column):**
   * *Explore Pillars:* Category badges with active counters.
   * *Trending Insights:* Quick links to top 3 articles.
   * *VoometDesign Blueprints Newsletter:* Email capture widget for monthly BOQ templates and design blueprints.

---

### 4.10 Individual Blog Article (`/blog/[slug]`)
* **Route:** `/blog/[slug]`
* **File:** `src/app/blog/[slug]/page.tsx`
* **Purpose:** Full-length editorial article formatted with markdown parser, metric keywords, and related reading suggestions.

#### Page Structure:
1. **Article Header:** Dark theme hero with breadcrumb navigation (`JOURNAL / [Category]`), article title, publication date, and author name.
2. **Article Body (Left Column):**
   * *Search Engine Metric Tags:* Hashtag-style keyword badges (e.g. `#Classroom-Ergonomics`, `#Acoustic-Isolation`).
   * *Formatted Prose:* Formatted `<h2>`, `<h3>`, bulleted lists, and technical diagrams.
   * *Return Navigation Link:* Quick return button to `/blog`.
3. **Sticky Sidebar (Right Column):**
   * High-res featured banner image.
   * Related Insights card (2 dynamically filtered posts from the same category).
   * Newsletter Subscription Box.

---

### 4.11 Contact & Studio Consultation (`/contact`)
* **Route:** `/contact`
* **File:** `src/app/contact/page.tsx`, `src/components/ContactHero.tsx`, `src/components/ContactSection.tsx`
* **Purpose:** Primary lead generation and physical studio locator page.

#### Sections Breakdown:
1. **Contact Hero (`src/components/ContactHero.tsx`):**
   * Video background (Desktop) / High-res image (Mobile) with dark navy gradient overlay.
   * Headline: *"Let's Create Something Extraordinary. Designed Around Your Vision."*
   * Animated smooth-scroll indicator linking directly to inquiry form.
2. **Studio Details & Inquiry Section (`src/components/ContactSection.tsx`):**
   * **Left Side (Studio Directory & Map):**
     * Direct Phone: `+91 9845014279`
     * Direct Email: `info@voometdesign.com`
     * Registered Studio Address: *No. 166, Obandehalli Industrial Area, Doddaballapura, Bengaluru, Karnataka 561203*
     * Embedded Google Maps Iframe showing exact factory location.
   * **Right Side (Comprehensive Consultation Form):**
     * Fields: Full Name, Phone Number, Email, City / Project Location, Property Type (Residential, Commercial, Hospitality, Educational), Approximate Area (Sq Ft), Project Brief / Message.
     * Honey-pot anti-spam field (`botField`).
     * Submits to `/api/contact` -> Creates `Lead` record -> Triggers push notification to staff.

---

### 4.12 Frequently Asked Questions (`/faq`)
* **Route:** `/faq`
* **File:** `src/app/faq/page.tsx`, `src/app/faq/layout.tsx`
* **Purpose:** Direct answers to client questions regarding timelines, bespoke woodwork, 3D survey costs, materials, and Pan-India delivery.

#### Featured FAQs (Framer Motion Accordion):
1. *What types of sectors do you specialize in?* (Residential, Hospitality, Educational, Commercial).
2. *Do you provide bespoke woodwork?* (100% in-house factory joinery).
3. *Do you provide turnkey solutions?* (End-to-end 2D/3D design, procurement, civil execution, handover).
4. *Is the initial 3D layout consultation complimentary?* (Yes, complimentary 3D site survey worth ₹10,000).
5. *Do you handle projects outside of Bangalore?* (Pan-India delivery from Gorakhpur to Bangalore).
6. *What materials do you use for high-end interiors?* (Italian marble, architectural veneers, marine plywood, polyamide thermal break aluminium).
7. *Can I see a 3D visualization of my project before work starts?* (Real-time 3D walkthroughs provided).

---

### 4.13 Careers & Open Positions (`/careers`)
* **Route:** `/careers`
* **File:** `src/app/careers/page.tsx`, `src/app/careers/layout.tsx`
* **Purpose:** Talent acquisition hub detailing company culture, open roles, and direct resume submission.

#### Sections Breakdown:
1. **Careers Hero:** Headline: *"Build the Future of Interiors with Us."*, subtitle on 20-year legacy and engineering precision.
2. **Company Culture Pillars:** *Innovation-First* (3D tools), *In-House Power* (Factory exposure), *Pan-India Reach*.
3. **Open Positions Accordion:**
   * *Senior Interior Designer* (Bangalore / Hybrid — 5+ years experience).
   * *Site In-Charge / Supervisor* (PAN India Execution Sites).
   * *Graphic Designer* (Remote / Bangalore).
4. **Application Submission Form:**
   * Fields: Full Name, Email Address, Phone Number, Position Applied For, Resume / Portfolio URL Link (Google Drive/Behance).
   * Submits to `/api/contact` with `type: "career_application"`.

---

### 4.14 Privacy Policy (`/privacy`)
* **Route:** `/privacy`
* **File:** `src/app/privacy/page.tsx`
* **Purpose:** Legal document explaining data collection, floor plan confidentiality, data security, and user rights.
* **Sections:**
  1. Information We Collect (Name, Phone, Email, Location, Property Sq Ft).
  2. How We Use Your Data (BOQ pricing, 3D quotes, WhatsApp updates).
  3. Data Security & Storage (Confidential storage, zero third-party selling).
  4. Contact & Opt-Out (`legal@voometdesign.com`).

---

### 4.15 Terms of Service (`/terms`)
* **Route:** `/terms`
* **File:** `src/app/terms/page.tsx`
* **Purpose:** Legal contract governing website use, design proposals, milestone billing, and intellectual property.
* **Sections:**
  1. Acceptance of Terms.
  2. Scope of Services (Turnkey architectural & interior design deliverables).
  3. Payment, Execution & Client Requisitions (Milestone payments, down-payment triggers).
  4. Intellectual Property (Ownership of 3D renders, CAD drawings, blueprints).
  5. Limitation of Liability (Manufacturer material warranties pass-through).

---

### 4.16 Bangalore Hub (`/interior-designer-bangalore`)
* **Route:** `/interior-designer-bangalore`
* **File:** `src/app/interior-designer-bangalore/page.tsx`
* **Purpose:** Regional landing page targeting high-intent local Bangalore search queries for luxury interior architecture.

#### Sections Breakdown:
1. **Hero Header:** Headline: *"Luxury Interior Design in Bangalore"*.
2. **"Why Choose a Local Bangalore Studio?" (3-Card Grid):** Seamless Project Management (BBMP regulations), Premium Local Sourcing, In-House Manufacturing (Doddaballapura plant).
3. **Neighborhoods We Serve (Grid of 8 Cards):** Direct links to Whitefield, Indiranagar, Koramangala, HSR Layout, Jayanagar, Sadashivanagar, Yelahanka, Bellandur.
4. **Closing CTA (`CTAV4.tsx`).**

---

### 4.17 Bangalore Hyper-Local Neighborhoods (`/interior-designer-bangalore/[area]`)
* **Route:** `/interior-designer-bangalore/[area]`
* **File:** `src/app/interior-designer-bangalore/[area]/page.tsx`
* **Data Source:** `src/data/bangaloreAreas.ts`
* **Purpose:** Dedicated programmatic SEO pages with schema structured data (`LocalBusiness`, `FAQPage`) for 8 Bangalore neighborhoods.

#### Supported Neighborhoods & Profiles:
1. `whitefield`: IT Hub & Premium Gated Communities / Villas.
2. `indiranagar`: Cosmopolitan Heritage Bungalows & Boutique Retail.
3. `koramangala`: Sprawling Luxury Mansions & Tech HQ Offices.
4. `hsr-layout`: Modern Planned Homes & Smart Home Automations.
5. `jayanagar`: Heritage Restorations & Traditional Woodwork Fusion.
6. `sadashivanagar`: Ultra-Luxury Palatial Estates & Imported Italian Marble.
7. `yelahanka`: Expansive North Bangalore Villas & Indoor-Outdoor Sanctuaries.
8. `bellandur`: High-Rise Tech Corridor Luxury Apartments.

#### Structured Features per Page:
* Custom Hero with neighborhood photography.
* Specialized Lifestyle & Architectural Narrative.
* 3 Hyper-Local Advantages (e.g. compliance with specific gated communities).
* Neighborhood FAQ Accordion with JSON-LD Schema markup.
* Closing CTA (`CTAV4.tsx`).

---

## 5. INTERNAL CRM & ADMINISTRATION PORTALS

---

### 5.1 Employee/Admin Authentication (`/login`)
* **Route:** `/login`
* **File:** `src/app/login/page.tsx`
* **Purpose:** Secure credential & role-based authentication portal for staff members and administrators.
* **Layout:** Standalone dark mode UI (`GlobalVisibility.tsx` hides standard Navbar & Footer).
* **Role Switcher:** Toggle between **Admin** and **Employee**.
* **Form Action:** Sends `POST` request to `/api/auth` containing `username`, `password`, `role`.
* **Routing Redirection:**
  * Role `admin` -> Redirects to `/adminlead`
  * Role `employee` -> Redirects to `/lead`

---

### 5.2 Executive Lead Portal (`/lead`)
* **Route:** `/lead`
* **File:** `src/app/lead/page.tsx`, `lead-management/components/ExecutiveDashboard.tsx`
* **Purpose:** Dedicated sales execution portal for employees to track assigned leads, claim available leads from the central pool, log call notes, set reminder alarms, and initiate lead transfers.

#### Key Features & Components:
1. **Live Header:** Employee name/avatar, Push Alert toggle (`/api/user/push-subscription`), In-app notifications bell dropdown, and Logout button.
2. **KPI Metric Filter Cards (Interactive):**
   * *Total Assigned Leads*
   * *New Leads*
   * *Not Responding*
   * *Not Reachable*
   * *Callback Next Week*
   * *Follow Up Next Month*
   * *Converted / Active Projects*
3. **Assigned Leads Table:**
   * Columns: Lead Name, Mobile, Requirement/Service, Source (Website, Google Ads, Meta, Referral), Status dropdown, and Actions (*Release to Pool*, *Open Details*).
   * Live Instant Search and Date Filter Presets (*Today, This Week, This Month, All Time*).
4. **Available Leads Pool (Unassigned Leads):**
   * Real-time pool of new unassigned incoming leads.
   * Auto-expands when new leads enter the system.
   * One-click **"Claim Lead"** button (assigns lead to current employee, creates `LeadActivity` record, notifies Admin).
5. **Auto-Trigger Modal:** When a new lead is assigned to the active user while idle, the lead detail modal opens automatically with an audio/toast alert.
6. **Lead Detail Modal (`LeadDetailModal.tsx`):**
   * Full lead profile editing (Name, Mobile, Email, Project Location, Requirement, Status, Source).
   * **Real-time Activity Log:** Audit trail of claim events, assignment transfers, status changes, and pin events in natural Hindi/English (e.g. *"Admin ne ye lead Sahil ko assign kiya"*).
   * **Internal WhatsApp/Chat Timeline:** Post internal messages, client meeting minutes, and file attachments (images, PDFs, BOQ sheets).
   * **Reminder Scheduler:** Set specific date/time for call-back alerts (synced with cron worker `/api/cron/check-reminders`).
   * **Lead Transfer Request:** Initiate transfer to another staff member with mandatory reason notes.

---

### 5.3 Admin CRM & Performance Dashboard (`/adminlead`)
* **Route:** `/adminlead`
* **File:** `src/app/adminlead/page.tsx`, `lead-management/components/AdminDashboard.tsx`
* **Purpose:** Master administrative control center for lead triage, staff performance tracking, marketing channel analytics, bulk assignments, CSV exports, and system settings.

#### Navigation Tabs:
1. **Master Leads Tab (`leads`):**
   * Filter leads by Date, Source, Service Sector, Project Location, Status, Assigned Employee.
   * **Bulk Actions Multi-Select:** Select multiple leads via checkboxes -> Bulk Reassign to any employee or Bulk Trash/Delete.
   * **Quick Add Lead Modal (`AddLeadModal.tsx`):** Manually insert offline leads, walk-ins, or phone inquiries.
   * **Export Engine (`ExportModal.tsx`):** Export filtered datasets to formatted CSV/Excel spreadsheets.
2. **Employee Performance Tab (`performance`):**
   * Metrics per team member: Total Leads Handled, Conversion Rate (%), Average Response Time, Active vs Stale Leads.
   * Detailed breakdown of lead status distribution per employee.
3. **Marketing Source Analytics Tab (`sources`):**
   * Breakdown of lead acquisition channels: Website organic, Google Search Ads, Instagram Ads, Facebook Meta Ads, WhatsApp Direct, Client Referrals.
   * ROI & Conversion percentages per channel.
4. **Settings & Customization Modal (`SettingsModal.tsx`):**
   * Update admin profile details and profile avatar.
   * Configure auto-distribution rules for incoming leads.

---

### 5.4 Admin Staff Directory (`/admin/users`)
* **Route:** `/admin/users`
* **File:** `src/app/admin/users/page.tsx`
* **Purpose:** Centralized employee directory and credential management portal.
* **Features:**
  * Complete list of registered staff members with Avatar, Name, Email, Username, Role (Admin, Manager, Team Member), and Account Creation Date.
  * **"Change Password" Modal:** Administrative override enabling admins to reset/overwrite employee passwords securely via `PATCH /api/employees`.

---

### 5.5 Executive Mock Portal (`/mock-portal`)
* **Route:** `/mock-portal`
* **File:** `src/app/mock-portal/page.tsx`
* **Purpose:** Standalone client-side simulated dashboard used for UI/UX testing, feature demos, and staging environment verification without live database mutations.

---

## 6. DATA MODELS & SCHEMA REFERENCE (PRISMA)

The PostgreSQL database schema is defined in `prisma/schema.prisma`:

### 6.1 `Lead` Model
| Field | Type | Description |
|---|---|---|
| `id` | `String (cuid)` | Unique Primary Key |
| `name` | `String` | Client full name |
| `mobileNumber` | `String` | Client contact number |
| `email` | `String?` | Client email address |
| `projectLocation` | `String?` | City or neighborhood (e.g. Bangalore, Whitefield) |
| `approxArea` | `String?` | Approximate area in sq ft |
| `requirement` | `String?` | Service sector requested |
| `submissionSource` | `String?` | Form identifier (e.g. `homepage_hero`, `contact_page`) |
| `source` | `String?` | Marketing origin (e.g. `Website`, `Google Ads`, `Meta`) |
| `isGoogleAds` | `Boolean` | Flag for Google Ads campaign traffic |
| `status` | `String` | Default: `"New Lead"` |
| `handledBy` | `String?` | Assigned employee name or `"Unassigned"` |
| `isPinned` | `Boolean` | Pinned status flag |
| `isTrashed` | `Boolean` | Soft delete flag |
| `reminderDateTime` | `DateTime?` | Scheduled callback timestamp |
| `createdAt` | `DateTime` | Record creation timestamp |
| `updatedAt` | `DateTime` | Last update timestamp |

### 6.2 `LeadActivity` Model
* Logs every state mutation, claim, transfer, status change, and pin action for complete accountability.
* Fields: `id`, `leadId` (Relation to `Lead`), `type`, `fromUser`, `toUser`, `details`, `createdAt`.

### 6.3 `LeadTransfer` Model
* Tracks formal handovers between employees.
* Fields: `id`, `leadId`, `fromEmployee`, `toEmployee`, `reason`, `status` (`PENDING`, `ACCEPTED`, `REJECTED`), `createdAt`, `updatedAt`.

### 6.4 `LeadMessage` Model
* Internal chat and timeline notes attached to a lead.
* Fields: `id`, `leadId`, `sender`, `text`, `attachmentUrl`, `attachmentType`, `createdAt`.

### 6.5 `User` Model
* System accounts for authentication and role permissions.
* Fields: `id`, `name`, `email`, `username` (Unique), `password` (Hashed), `avatarUrl`, `role` (`Admin`, `Manager`, `Employee`), `createdAt`, `updatedAt`.

### 6.6 `AdminAuditLog` Model
* Security audit trail of administrative modifications.
* Fields: `id`, `action`, `performedBy`, `targetEntity`, `details`, `createdAt`.

### 6.7 `Notification` & `PushSubscription` Models
* In-app bell alerts and browser Web Push tokens for real-time mobile/desktop notifications.

---

## 7. API ENDPOINTS & SERVER ACTION DIRECTORY

| Method | Endpoint | Description & Side Effects |
|---|---|---|
| `POST` | `/api/auth` | Validates username/password, verifies role, and sets session cookie. |
| `POST` | `/api/contact` | Receives all public form submissions, creates `Lead` and `LeadActivity`, creates in-app `Notification`, and broadcasts Web Push alerts. |
| `POST` | `/api/consultation` | Receives instant quote requests from `QuoteModal` and applies discount voucher tags. |
| `GET` | `/api/lead` | Fetches filtered leads (Supports queries: `employee`, `unassigned`, `status`, `source`). |
| `POST` | `/api/lead` | Manually creates a new lead from Admin Dashboard. |
| `GET` | `/api/lead/[id]` | Retrieves detailed lead profile including full activity logs and message timeline. |
| `PATCH` | `/api/lead/[id]` | Updates lead fields, status, notes, reminder dates, or handledBy assignment. |
| `DELETE` | `/api/lead/[id]` | Soft-deletes (trashes) or permanently deletes a lead. |
| `POST` | `/api/lead-transfer` | Initiates, accepts, or rejects a lead transfer request. |
| `GET` | `/api/employees` | Retrieves list of all active staff members and their roles. |
| `PATCH` | `/api/employees` | Updates employee profile or forces administrative password reset. |
| `GET` | `/api/user/profile` | Fetches active authenticated user session data. |
| `POST` | `/api/user/push-subscription` | Saves or removes browser Web Push subscription endpoints. |
| `GET` | `/api/notifications` | Fetches recent in-app system notifications for active user. |
| `POST` | `/api/upload` | Handles file/document uploads for lead attachments and BOQ sheets. |
| `GET` | `/api/cron/check-reminders` | Background cron worker that checks pending lead reminders and dispatches push alerts. |

---

## 8. FORM INVENTORY & CONVERSION MATRIX

| Form Component | Located On | Fields Captured | Target Endpoint | Payload `type` / Tags |
|---|---|---|---|---|
| `QuoteModal.tsx` | Global Header Button / CTA | Name, Phone, Email, Location, Service, Area Sq Ft, Promo Code | `/api/contact` | `type: "quote_modal"`, `promoCode: "VOOMET2026"` |
| `ContactSection.tsx` | `/contact`, `/about` | Name, Phone, Email, Location, Sector, Area Sq Ft, Project Brief | `/api/contact` | `type: "general_inquiry"` |
| `AluminiumInquiryForm.tsx` | `/services/aluminium-systems` | Name, Phone, Email, Profile Specs, Glass DGU Specs, Sq Ft | `/api/contact` | `type: "aluminium_inquiry"` |
| `UpvcInquiryForm.tsx` | `/services/upvc-systems` | Name, Phone, Email, Window Type, Glass Type, Approximate Area | `/api/contact` | `type: "upvc_inquiry"` |
| `SystemInquiryForm.tsx` | `/services/[...slug]` | Name, Phone, Email, Sector Specifics, Area, Delivery Timeline | `/api/contact` | `type: "sector_inquiry"` |
| `Careers Application` | `/careers` | Name, Email, Phone, Position, Portfolio URL Link | `/api/contact` | `type: "career_application"` |
| `Newsletter Subscription` | `/blog`, `/blog/[slug]` | Email Address | Client Newsletter State | Blueprint Network |

---

## 9. SUMMARY OF AUDIT FINDINGS

1. **Architecture Integrity:** The application follows clean architectural separation between public marketing routes (`src/app/(public)`), dynamic programmatic SEO pages (`[...slug]`, `[area]`), and authenticated CRM operations (`/lead`, `/adminlead`).
2. **Real-Time Data Pipeline:** All client form touchpoints feed directly into a centralized PostgreSQL database via Prisma, triggering instant audit logs and push notifications to staff.
3. **Design & Conversion Systems:** Every page includes clear visual hierarchy, bespoke photography, technical specifications, and frictionless conversion modals (`QuoteModal`, `WelcomePopup`, `WhatsAppButton`).

---
*End of Audit Document — Voomet Design & Fabrication (`VD-WEB`)*
