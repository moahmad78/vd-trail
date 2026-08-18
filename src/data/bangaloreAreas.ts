export interface AreaData {
  id: string;
  name: string;
  type: string;
  description: string;
  heroImage: string;
  characteristics: string[];
  faq: { question: string; answer: string }[];
}

export const BANGALORE_AREAS: Record<string, AreaData> = {
  whitefield: {
    id: "whitefield",
    name: "Whitefield",
    type: "IT Hub & Premium Residential",
    description: "Whitefield represents the perfect blend of Bangalore's rapid tech evolution and luxury residential living. Whether you are moving into a premium high-rise apartment near ITPL or designing a bespoke independent villa in a gated community, VoometDesign brings world-class interior execution right to your doorstep.",
    heroImage: "/Design/residential/81.webp",
    characteristics: [
      "Extensive experience with strict gated community guidelines",
      "Modern contemporary and minimalist design styles",
      "Seamless execution for tech professionals with busy schedules"
    ],
    faq: [
      {
        question: "Do you handle interior design for gated communities in Whitefield?",
        answer: "Yes, we are highly experienced in adhering to the strict working hours, debris disposal rules, and material entry protocols of Whitefield's premium gated communities."
      },
      {
        question: "What is the typical timeline for an apartment interior in this area?",
        answer: "For a standard 3BHK or 4BHK premium apartment in Whitefield, our turnkey execution takes approximately 60-90 days, depending on the complexity of custom woodwork and civil alterations."
      }
    ]
  },
  indiranagar: {
    id: "indiranagar",
    name: "Indiranagar",
    type: "Cosmopolitan & High-Street",
    description: "Indiranagar is synonymous with Bangalore's vibrant, cosmopolitan lifestyle. From independent luxury bungalows nestled in quiet tree-lined avenues to chic commercial spaces and high-end boutique hotels, our design approach for Indiranagar focuses on sophisticated aesthetics, optimal space utilization, and timeless elegance.",
    heroImage: "/Design/hospitality/h12.webp",
    characteristics: [
      "Expertise in renovating older independent houses",
      "Luxury commercial and boutique hospitality fit-outs",
      "Sophisticated, eclectic, and transitional design themes"
    ],
    faq: [
      {
        question: "Can you renovate older independent houses in Indiranagar?",
        answer: "Absolutely. We specialize in retrofitting and completely transforming older independent properties into modern luxury homes while retaining their structural integrity."
      },
      {
        question: "Do you design commercial and hospitality spaces here?",
        answer: "Yes, Indiranagar is a prime commercial hub. We have extensive experience designing premium boutique hotels, high-end retail, and modern office spaces."
      }
    ]
  },
  koramangala: {
    id: "koramangala",
    name: "Koramangala",
    type: "Upscale Residential & Commercial Hub",
    description: "Known for its sprawling luxury residences, leafy boulevards, and dynamic commercial presence, Koramangala demands a very high standard of interior finishing. Our team specializes in crafting bespoke spaces that reflect the affluent and fast-paced character of this iconic Bangalore neighborhood.",
    heroImage: "/Design/residential/r112.webp",
    characteristics: [
      "Bespoke interiors for large, luxury independent homes",
      "High-end corporate office and startup headquarter designs",
      "Premium material sourcing and flawless finish quality"
    ],
    faq: [
      {
        question: "How do you manage high-end luxury residential projects in Koramangala?",
        answer: "We provide an end-to-end turnkey service. You get a dedicated project manager, access to imported luxury materials, and a design team that understands sophisticated palates."
      },
      {
        question: "Do you undertake commercial interior projects in this area?",
        answer: "Yes, we design high-performance, branded workspaces and retail environments tailored to Koramangala's vibrant commercial landscape."
      }
    ]
  },
  "hsr-layout": {
    id: "hsr-layout",
    name: "HSR Layout",
    type: "Modern Planned Neighborhood",
    description: "As one of Bangalore's most meticulously planned neighborhoods, HSR Layout features wide roads and premium residential plots. We design interiors that complement this structured elegance, focusing on smart home integrations, contemporary layouts, and highly functional spaces for modern families and startup offices.",
    heroImage: "/Design/commercial/121.webp",
    characteristics: [
      "Contemporary interior styling for modern constructions",
      "Smart home integration and highly functional layouts",
      "Agile workspace designs for the local startup ecosystem"
    ],
    faq: [
      {
        question: "Do you provide smart home automation in your designs?",
        answer: "Yes, we seamlessly integrate advanced smart home technologies—including lighting, climate control, and security—into our interior designs for homes in HSR Layout."
      },
      {
        question: "Can you design a modern office space in HSR Layout?",
        answer: "HSR is a major startup hub, and we specialize in designing energetic, collaborative, and highly functional office interiors that boost productivity."
      }
    ]
  },
  jayanagar: {
    id: "jayanagar",
    name: "Jayanagar",
    type: "Heritage & Traditional Premium",
    description: "Jayanagar retains the classic charm of old Bangalore while embracing modern luxury. Our interior designs here often feature a beautiful fusion of traditional Indian elements and contemporary comfort. Whether restoring an ancestral home or designing a new premium apartment, we honor the area's rich heritage.",
    heroImage: "/Design/residential/r111.webp",
    characteristics: [
      "Fusion of traditional Indian aesthetics with modern luxury",
      "Extensive use of premium natural woods and stone",
      "Renovation and modernization of heritage properties"
    ],
    faq: [
      {
        question: "Can you incorporate traditional Indian elements into a modern design?",
        answer: "Yes, we excel at 'transitional' design—blending traditional elements like carved teakwood, brass accents, and traditional motifs with clean, modern architectural lines."
      },
      {
        question: "Do you handle civil alterations for older homes?",
        answer: "Yes, our turnkey services include safe and compliant civil alterations to modernize the layout of older properties in Jayanagar."
      }
    ]
  },
  sadashivanagar: {
    id: "sadashivanagar",
    name: "Sadashivanagar",
    type: "Ultra-Luxury Elite Residential",
    description: "As one of Bangalore's most exclusive and elite neighborhoods, Sadashivanagar requires nothing short of perfection. We deliver ultra-luxury interior architecture, focusing on imported materials, bespoke furniture design, and palatial spatial planning that meets the exacting standards of the city's most discerning residents.",
    heroImage: "/Design/residential/80.webp",
    characteristics: [
      "Ultra-luxury palatial interior design",
      "Imported materials, Italian marble, and custom chandeliers",
      "Absolute privacy and dedicated VIP project management"
    ],
    faq: [
      {
        question: "What is your approach to ultra-luxury interiors in Sadashivanagar?",
        answer: "We focus on exclusivity. From sourcing rare Italian marbles to custom-designing every piece of furniture, we ensure your home is a unique masterpiece."
      },
      {
        question: "Do you provide 3D walkthroughs before execution?",
        answer: "Yes, for our premium projects, we provide highly realistic, immersive 3D renders and VR walkthroughs so you can experience the space before we build it."
      }
    ]
  },
  yelahanka: {
    id: "yelahanka",
    name: "Yelahanka",
    type: "Sprawling Villas & New Developments",
    description: "With its vast open spaces and premium new villa developments, Yelahanka is the frontier of modern luxury living in North Bangalore. We specialize in designing expansive villa interiors that blur the lines between indoor and outdoor living, creating resort-like sanctuaries for our clients.",
    heroImage: "/Design/residential/r114.webp",
    characteristics: [
      "Expansive villa and townhouse interior design",
      "Indoor-outdoor living concepts and landscape integration",
      "Modern, airy, and resort-style interior aesthetics"
    ],
    faq: [
      {
        question: "Do you design interiors for large villas in North Bangalore?",
        answer: "Yes, designing expansive villas is one of our core specialties. We handle everything from double-height living rooms to custom home theaters and landscape integration."
      },
      {
        question: "How do you manage projects in new developments?",
        answer: "We coordinate directly with builders during the handover phase to streamline civil changes, saving you time and avoiding rework."
      }
    ]
  },
  bellandur: {
    id: "bellandur",
    name: "Bellandur",
    type: "Tech Corridor & Premium Apartments",
    description: "Situated in the heart of Bangalore's bustling IT corridor, Bellandur is home to premium high-rises and busy professionals. Our designs here prioritize smart space utilization, stress-free turnkey execution, and contemporary aesthetics that provide a relaxing retreat from the fast-paced city life.",
    heroImage: "/Design/residential/81.webp",
    characteristics: [
      "Premium apartment interior optimization",
      "Zero-headache turnkey execution for busy professionals",
      "Sleek, modern, and highly functional design themes"
    ],
    faq: [
      {
        question: "I have a busy schedule. Can you manage the entire project?",
        answer: "Absolutely. Our turnkey service is designed for busy professionals. We handle design, procurement, approvals, and execution, providing you with regular digital updates."
      },
      {
        question: "Can you optimize space in compact premium apartments?",
        answer: "Yes, we use intelligent spatial planning, modular multi-functional furniture, and strategic lighting to make any apartment feel spacious and luxurious."
      }
    ]
  }
};
