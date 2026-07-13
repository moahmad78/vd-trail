import ServiceGallery from "./ServiceGallery";

const IMAGES = Array.from({ length: 34 }, (_, i) => `/Design/resedential/r${i + 1}.webp`);

export default function ResidentialGallery() {
  return (
    <ServiceGallery
      images={IMAGES}
      categoryTitle="Gallery"
      mainHeading="Our Residential Projects"
      altPrefix="Residential Interior Design by Voomet Design"
    />
  );
}
