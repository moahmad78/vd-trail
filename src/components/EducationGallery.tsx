import ServiceGallery from "./ServiceGallery";

const IMAGES = [
  ...Array.from({ length: 15 }, (_, i) => `/Design/education/e${i + 1}.jpeg`),
  ...Array.from({ length: 10 }, (_, i) => `/Design/education/e${i + 17}.jpeg`),
  ...Array.from({ length: 13 }, (_, i) => `/Design/education/e${i + 28}.jpeg`)
];

export default function EducationGallery() {
  return (
    <ServiceGallery
      images={IMAGES}
      categoryTitle="Gallery"
      mainHeading="Our Educational Projects"
      altPrefix="Educational Space Interior Design by Voomet Design"
    />
  );
}
