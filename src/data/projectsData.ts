export interface ProjectData {
  id: string;
  title: string;
  descriptor: string;
  description: string;
  heroImage: string;
  location: string;
  projectScope: string[];
  challenges: string;
  solutions: string;
  completedWork: string[];
  specs: {
    firm: string;
    leadDesigner: string;
    area: string;
    materials: string;
    timeline?: string;
  };
  features: string[];
  gallery: string[];
  videoUrl?: string;
}

export const projectsData: ProjectData[] = [
  {
    id: "apps-for-bharat",
    title: "APPS FOR BHARAT",
    descriptor: "VIBRANT STARTUP HEADQUARTERS",
    description: "Designed to reflect a modern, vibrant tech culture while staying deeply rooted in Indian cultural motifs. The Apps for Bharat headquarters is an open-plan office space featuring thematic meeting rooms, an expansive central collaboration zone, and ergonomic workstations designed for maximum agility and team synergy.",
    heroImage: "/assets/work/filter-grid/apps-for-bharat.webp",
    location: "Koramangala, Bengaluru",
    projectScope: [
      "Turnkey Interior Fit-Out",
      "Acoustic Engineering & Sound Masking",
      "Custom Modular Joinery & Workstations",
      "MEP, Lighting & Electrical Grid Setup",
      "Central Collaborative Pantry & Town Hall"
    ],
    challenges: "Balancing high-density engineering workstations with open collaborative lounges while maintaining acoustic quietness for continuous product sprint calls in a busy tech corridor.",
    solutions: "Engineered zoned micro-neighborhoods using double-glazed acoustic glass partitions, biophilic living dividers, and custom sound-dampening ceiling baffles to absorb ambient speech frequencies.",
    completedWork: [
      "Open Agile Workstation Floor (120+ Seats)",
      "4 Themed Acoustic Meeting Pods",
      "Executive Strategy & Boardroom Suite",
      "Town-Hall Collaborative Cafeteria",
      "Biometric Access Reception & Brand Wall"
    ],
    specs: {
      firm: "VoometDesign",
      leadDesigner: "Sahil Sheikh",
      area: "8,200 Sq. Ft. / 760 m²",
      materials: "Exposed Brick, Natural Wood, Concrete Finish, Acoustic Fabric",
      timeline: "Fast-Track Turnkey Delivery"
    },
    features: ["Custom breakout zones", "Ergonomic agile seating", "Themed meeting pods", "Open collaborative pantry", "Biophilic design elements"],
    gallery: [
      "/assets/work/filter-grid/apps-for-bharat.webp",
      "/assets/work/filter-grid/apps-for-bharat.webp",
      "/assets/work/filter-grid/apps-for-bharat.webp",
      "/assets/work/filter-grid/apps-for-bharat.webp"
    ],
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
  },
  {
    id: "zluri",
    title: "ZLURI",
    descriptor: "OFFICE OF THE FUTURE",
    description: "Zluri's office is an expansive, light-filled environment tailored for a hyper-growth tech firm. It seamlessly blends raw industrial aesthetics with premium, refined finishes. The layout encourages both deep focus and spontaneous collaboration through intelligently zoned neighborhoods and state-of-the-art acoustic treatments.",
    heroImage: "/assets/work/filter-grid/zluri.webp",
    location: "HSR Layout, Bengaluru",
    projectScope: [
      "Full Design & Build Fit-Out",
      "Structural Glass Demountable Partitions",
      "Modular Ergonomic Workstation benchtops",
      "HVAC Air Balancing & Smart Lighting Automation"
    ],
    challenges: "Accommodating rapid employee headcount growth without sacrificing natural daylight penetration across the floor plate or creating thermal heat pockets.",
    solutions: "Engineered perimeter daylight routing with open-plenum ceiling heights, linear LED task lighting, and movable acoustic baffle arrays between departmental pods.",
    completedWork: [
      "Modular Benching Workstations (160+ Desks)",
      "High-Definition Video Conference Boardrooms",
      "Soundproof Phone Booths for Sales Calls",
      "Central Wellness & Recreation Hub",
      "Dedicated Tier-1 Server Room with FM-200 Fire Suppression"
    ],
    specs: {
      firm: "VoometDesign",
      leadDesigner: "Design Team",
      area: "12,500 Sq. Ft. / 1,160 m²",
      materials: "Glass, Steel, Premium Laminates, Acoustic Panels",
      timeline: "Turnkey Milestone Handover"
    },
    features: ["Unique lighting installations", "Integrated modular workstations", "Movable acoustic features", "Smart conference rooms"],
    gallery: [
      "/assets/work/filter-grid/zluri.webp",
      "/assets/work/filter-grid/zluri.webp",
      "/assets/work/filter-grid/zluri.webp",
      "/assets/work/filter-grid/zluri.webp"
    ],
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
  },
  {
    id: "qpiai",
    title: "QPIAI",
    descriptor: "QUANTUM TECH LAB",
    description: "A highly sophisticated workspace built for one of the leading quantum computing companies. The QpiAI office requires specialized infrastructural support, clean lines, and an atmosphere of extreme focus. Minimalist design choices highlight the cutting-edge work happening within the facility.",
    heroImage: "/assets/work/filter-grid/qpiai.webp",
    location: "Indiranagar, Bengaluru",
    projectScope: [
      "High-Tech R&D Workspace Architecture",
      "Anti-Static Clean Room Infrastructure",
      "Precision MEP & Dual-Grid Power Backup",
      "Acoustic Decoupling & Vibration Isolation"
    ],
    challenges: "Deep-tech computational labs requiring stringent temperature stability, zero-vibration flooring, and clean minimalist aesthetics for international delegations.",
    solutions: "Installed industrial-grade polished concrete with anti-static underlay, custom matte black steel frames, and precision climate-controlled server zones.",
    completedWork: [
      "Quantum Computing Research Lab",
      "Executive Presentation Suite",
      "Silent Focus Pods for Researchers",
      "Concealed Cable-Managed Workstations",
      "Secure Biometric Airlock Entrance"
    ],
    specs: {
      firm: "VoometDesign",
      leadDesigner: "Technical Design Group",
      area: "9,000 Sq. Ft. / 836 m²",
      materials: "Polished Concrete, Matte Black Metal, LED Linear Profiles",
      timeline: "Turnkey Precision Execution"
    },
    features: ["Specialized lab environments", "High-security access zones", "Minimalist workstation layout", "Advanced HVAC systems"],
    gallery: [
      "/assets/work/filter-grid/qpiai.webp",
      "/assets/work/filter-grid/qpiai.webp",
      "/assets/work/filter-grid/qpiai.webp",
      "/assets/work/filter-grid/qpiai.webp"
    ],
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
  },
  {
    id: "pw-brigade",
    title: "PHYSICS WALLAH",
    descriptor: "ED-TECH CAMPUS & STUDIOS",
    description: "Physics Wallah's dynamic campus blends high-tech recording studios with expansive, vibrant team floors. The design language speaks to their energetic educational brand, using bold brand colors balanced against neutral, sound-absorbing architectural elements.",
    heroImage: "/assets/work/filter-grid/pw.webp",
    location: "Brigade Road / Central Bengaluru",
    projectScope: [
      "Turnkey Institutional & Studio Fit-Out",
      "Broadcast Recording Studio Soundproofing",
      "Town-Hall Lecture & Assembly Arena",
      "High-Traffic Student Circulation Design"
    ],
    challenges: "Creating recording studios with near-zero decibel bleed in a busy commercial district while simultaneously accommodating high-traffic educator movements.",
    solutions: "Constructed floating floor studio boxes with triple-layer acoustic gypsum wall assemblies, decoupled door seals, and low-velocity silent HVAC ducting.",
    completedWork: [
      "6 Professional Soundproof Broadcast Studios",
      "Central Educator Team Hub",
      "Large-Capacity Town-Hall Arena",
      "Digital Editing & Production Suites",
      "High-Durability Student Reception Lounge"
    ],
    specs: {
      firm: "VoometDesign",
      leadDesigner: "Creative Studio",
      area: "15,000 Sq. Ft. / 1,393 m²",
      materials: "Acoustic Baffles, Brand Vinyls, Toughened Glass",
      timeline: "Scheduled Vacation Delivery"
    },
    features: ["Soundproof recording studios", "Large town-hall seating", "Vibrant brand integration", "Dynamic collaboration walls"],
    gallery: [
      "/assets/work/details-canvas/pw-brigade/2.webp",
      "/assets/work/details-canvas/pw-brigade/3.png",
      "/assets/work/details-canvas/pw-brigade/4.webp",
      "/assets/work/details-canvas/pw-brigade/5.webp"
    ],
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
  },
  {
    id: "juego",
    title: "JUEGO",
    descriptor: "GAMING & ANIMATION STUDIO",
    description: "An incredibly creative, dark-themed studio designed specifically for game developers and 3D animators. Lighting control is paramount here, with indirect RGB accents highlighting the industrial ceilings while maintaining zero glare on the artists' high-resolution monitors.",
    heroImage: "/assets/work/filter-grid/juego.webp",
    location: "Marathahalli - Outer Ring Road, Bengaluru",
    projectScope: [
      "Creative Gaming & Animation Studio Architecture",
      "Zero-Glare Ambient Lighting Design",
      "High-Draw Dual Power Infrastructure",
      "Custom Factory Millwork & Themed Lounges"
    ],
    challenges: "Artists and 3D animators working on color-critical monitors required complete elimination of screen glare and ambient reflections while keeping the space energetic.",
    solutions: "Engineered custom indirect RGBW cove illumination, matte-black non-reflective architectural coatings, and dark walnut joinery with neon accent wayfinding.",
    completedWork: [
      "Color-Critical Animation Bays",
      "Game QA & Testing Lounge",
      "High-Bandwidth Render Farm Server Hub",
      "Creative Brainstorming Amphitheatre",
      "Dark-Themed Reception Corridor"
    ],
    specs: {
      firm: "VoometDesign",
      leadDesigner: "Design Team",
      area: "6,500 Sq. Ft. / 603 m²",
      materials: "Dark Wood Finishes, Exposed Ceiling, Neon Accents",
      timeline: "Turnkey Delivery"
    },
    features: ["Zero-glare studio lighting", "High-capacity server rooms", "Creative brainstorming lounges", "Custom gaming setups"],
    gallery: [
      "/assets/work/details-canvas/juego/1.webp",
      "/assets/work/details-canvas/juego/1.webp",
      "/assets/work/details-canvas/juego/1.webp",
      "/assets/work/details-canvas/juego/1.webp"
    ],
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
  },
  {
    id: "orbit",
    title: "ORBIT",
    descriptor: "EXECUTIVE CORPORATE HQ",
    description: "A timeless, ultra-premium corporate environment. Orbit's headquarters uses rich textures, warm lighting, and classic architectural symmetry to project stability and trust. The space includes an impressive executive suite and a grand reception lobby.",
    heroImage: "/assets/work/filter-grid/orbit.webp",
    location: "MG Road / CBD, Bengaluru",
    projectScope: [
      "Prestige Executive Headquarters Fit-Out",
      "Imported Italian Marble Cladding",
      "Custom Architectural Millwork & Panelling",
      "Executive Boardroom Automation"
    ],
    challenges: "Executing bespoke veneer and bookmatched Italian marble panelling with strict tolerance limits in an active corporate business tower.",
    solutions: "Pre-cut and polished stone off-site with waterjet precision, utilizing dust-controlled mechanical dry-cladding systems on-site.",
    completedWork: [
      "Double-Height Executive Reception",
      "24-Seat Automated Boardroom with Concealed AV",
      "Managing Director's Suite & Private Lounge",
      "Fine-Dining Corporate Dining Room",
      "VIP Holding Suites"
    ],
    specs: {
      firm: "VoometDesign",
      leadDesigner: "Luxury Interiors Team",
      area: "11,000 Sq. Ft. / 1,021 m²",
      materials: "Italian Marble, Walnut Veneers, Brass Accents",
      timeline: "Turnkey Executive Delivery"
    },
    features: ["Grand reception lobby", "Executive boardroom", "Premium lounge spaces", "Custom millwork"],
    gallery: [
      "/assets/work/filter-grid/orbit.webp",
      "/assets/work/filter-grid/orbit.webp",
      "/assets/work/filter-grid/orbit.webp",
      "/assets/work/filter-grid/orbit.webp"
    ],
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
  },
  {
    id: "littlegym",
    title: "THE LITTLE GYM",
    descriptor: "CHILDREN'S FITNESS CENTER",
    description: "A bright, playful, and incredibly safe environment tailored for children's physical development. The design prioritizes child safety standards with padded flooring, curved edges, and an uplifting, colorful aesthetic that energizes the space.",
    heroImage: "/assets/work/filter-grid/littlegym.webp",
    location: "Whitefield, Bengaluru",
    projectScope: [
      "Child Fitness & Early Development Center",
      "Impact-Absorbing Safety Flooring",
      "Rounded Radius Structural Millwork",
      "Parent Viewing Observation Lounge"
    ],
    challenges: "Ensuring 100% compliance with international child physical safety benchmarks, anti-pinch doors, non-toxic coatings, and high-impact structural anchoring.",
    solutions: "Custom-fabricated all cabinetry with curved radius edges, lead-free zero-VOC coatings, safety door dampers, and high-density foam cushioned flooring.",
    completedWork: [
      "Multi-Activity Gymnastics Arena",
      "Glass-Partitioned Parent Viewing Gallery",
      "Safe Child Check-In Desk & Cubby Wall",
      "Sanitized Toddler Activity Zone",
      "Child-Safe Restroom Facilities"
    ],
    specs: {
      firm: "VoometDesign",
      leadDesigner: "Retail & Spaces Team",
      area: "4,500 Sq. Ft. / 418 m²",
      materials: "Impact-absorbing Foam, Vinyl Flooring, Child-safe Paint",
      timeline: "Child-Safe Turnkey Fit-Out"
    },
    features: ["Specialized gym equipment zones", "Parent viewing lounge", "Safe curved-edge millwork", "Vibrant color zoning"],
    gallery: [
      "/assets/work/filter-grid/littlegym.webp",
      "/assets/work/filter-grid/littlegym.webp",
      "/assets/work/filter-grid/littlegym.webp",
      "/assets/work/filter-grid/littlegym.webp"
    ],
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
  },
  {
    id: "happey",
    title: "HAPPEY",
    descriptor: "MODERN FINTECH OFFICE",
    description: "Happey's office reflects the fast-paced, secure, and innovative nature of the fintech industry. The layout seamlessly integrates high-density workstations with private focus rooms and vibrant cafe areas, supporting a diverse range of working styles.",
    heroImage: "/assets/work/filter-grid/happey.webp",
    location: "Bellandur, Bengaluru",
    projectScope: [
      "Fintech Commercial Workplace Fit-Out",
      "Secure Server & IT Infrastructure Setup",
      "Modular Benching Workstations & Acoustic Pods",
      "Employee Cafeteria & Town Hall Arena"
    ],
    challenges: "Fast-track delivery for a rapidly expanding fintech team with strict regulatory data-security requirements and versatile open collaboration zones.",
    solutions: "Deployed factory-built modular workstations, rapid-assembly acoustic demountable partitions, and zoned access security turnstiles.",
    completedWork: [
      "Open Fintech Trading & Tech Floor",
      "4 Executive Meeting Rooms",
      "Acoustic Solo Calling Pods",
      "Full-Service Pantry & Breakout Lounge",
      "CCTV & Biometric Monitored Network Room"
    ],
    specs: {
      firm: "VoometDesign",
      leadDesigner: "Corporate Interiors Team",
      area: "10,200 Sq. Ft. / 947 m²",
      materials: "Acoustic Ceiling Tiles, Carpet Planks, Toughened Glass",
      timeline: "Fast-Track Handover"
    },
    features: ["High-density benching", "Private focus phone-booths", "Large town-hall cafeteria", "Secure server infrastructure"],
    gallery: [
      "/assets/work/details-canvas/happey/2.webp",
      "/assets/work/details-canvas/happey/2.webp",
      "/assets/work/details-canvas/happey/2.webp",
      "/assets/work/details-canvas/happey/2.webp"
    ],
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
  }
];
