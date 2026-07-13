"use client";

import ServiceGallery from "./ServiceGallery";

const IMAGES = [
  "/Design/commercial/1.webp",
  "/Design/commercial/1.webp",
  "/Design/commercial/10.webp",
  "/Design/commercial/11.webp",
  "/Design/commercial/117.webp",
  "/Design/commercial/12.webp",
  "/Design/commercial/120.webp",
  "/Design/commercial/121.webp",
  "/Design/commercial/124.webp",
  "/Design/commercial/126.webp",
  "/Design/commercial/128.webp",
  "/Design/commercial/14.webp",
  "/Design/commercial/15.webp",
  "/Design/commercial/16.webp",
  "/Design/commercial/2.webp",
  "/Design/commercial/22.webp",
  "/Design/commercial/26.webp",
  "/Design/commercial/29.webp",
  "/Design/commercial/3.webp",
  "/Design/commercial/32.webp",
  "/Design/commercial/36.webp",
  "/Design/commercial/4.webp",
  "/Design/commercial/40.webp",
  "/Design/commercial/5.webp",
  "/Design/commercial/5.webp",
  "/Design/commercial/54.webp",
  "/Design/commercial/56.webp",
  "/Design/commercial/6.webp",
  "/Design/commercial/60.webp",
  "/Design/commercial/63.webp",
  "/Design/commercial/68.webp",
  "/Design/commercial/7.webp",
  "/Design/commercial/76.webp",
  "/Design/commercial/9.webp",
  "/Design/commercial/9.webp"
];

export default function CommercialGallery() {
  return (
    <ServiceGallery
      images={IMAGES}
      categoryTitle="Gallery"
      mainHeading="Our Commercial Projects"
      altPrefix="Commercial Interior Design by Voomet Design"
    />
  );
}
