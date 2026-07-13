import ServiceGallery from "./ServiceGallery";

const IMAGES = [
  "/Design/hospitality/h1.webp",
  "/Design/hospitality/h2.webp",
  "/Design/hospitality/h3.webp",
  "/Design/hospitality/h4.webp",
  "/Design/hospitality/h5.webp",
  "/Design/hospitality/h7.webp",
  "/Design/hospitality/h8.webp",
  "/Design/hospitality/h9.webp",
  "/Design/hospitality/h10.webp",
  "/Design/hospitality/h11.webp",
  "/Design/hospitality/h12.webp",
  "/Design/hospitality/h13.webp",
  "/Design/hospitality/h14.webp",
  "/Design/hospitality/h15.webp",
  "/Design/hospitality/h16.webp",
  "/Design/hospitality/h17.webp",
  "/Design/hospitality/h18.webp",
  "/Design/hospitality/h19.webp"
];

export default function HospitalityGallery() {
  return (
    <ServiceGallery
      images={IMAGES}
      categoryTitle="Gallery"
      mainHeading="Our Hospitality Projects"
      altPrefix="Hospitality Interior Design by Voomet Design"
    />
  );
}
