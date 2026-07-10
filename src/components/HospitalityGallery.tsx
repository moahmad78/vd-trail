import ServiceGallery from "./ServiceGallery";

const IMAGES = [
  "/Design/hospitality/h1.jpeg",
  "/Design/hospitality/h2.jpeg",
  "/Design/hospitality/h3.jpeg",
  "/Design/hospitality/h4.jpeg",
  "/Design/hospitality/h5.jpeg",
  "/Design/hospitality/h7.jpeg",
  "/Design/hospitality/h8.jpeg",
  "/Design/hospitality/h9.jpeg",
  "/Design/hospitality/h10.jpeg",
  "/Design/hospitality/h11.jpeg",
  "/Design/hospitality/h12.jpeg",
  "/Design/hospitality/h13.jpeg",
  "/Design/hospitality/h14.jpeg",
  "/Design/hospitality/h15.png",
  "/Design/hospitality/h16.png",
  "/Design/hospitality/h17.png",
  "/Design/hospitality/h18.png",
  "/Design/hospitality/h19.png"
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
