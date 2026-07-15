export interface Testimonial {
  name: string;
  designation: string;
  location: string;
  rating: number;
  text: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Sahil Sheikh",
    designation: "Residential Project Client",
    location: "Bangalore",
    rating: 5,
    text: "Working with the team was an absolute pleasure. They translated our vision into a stunning residential design with flawless execution. The entire experience was incredibly smooth and hassle-free from start to finish."
  },
  {
    name: "Darshan",
    designation: "Residential Project Client",
    location: "Bangalore",
    rating: 5,
    text: "We are beyond thrilled with the high-quality finish of our new villa. They delivered the project right on time, and the spatial layout they designed has completely transformed how we experience our home."
  },
  {
    name: "Inchara",
    designation: "Residential Project Client",
    location: "Bangalore",
    rating: 5,
    text: "The aesthetic interior and structural details of our new home are simply breathtaking. The team coordination was excellent throughout the project, ensuring every corner was crafted to perfection."
  },
  {
    name: "Manish",
    designation: "Residential Project Client",
    location: "Bangalore",
    rating: 5,
    text: "They delivered premium execution while remaining incredibly budget-friendly. Their transparency throughout the residential construction and focus on structural reliability gave us complete peace of mind."
  }
];
