"use client";

import ServiceGallery from "./ServiceGallery";

const IMAGES = [
  "/Design/commercial/1.jpg",
  "/Design/commercial/1.webp",
  "/Design/commercial/10.webp",
  "/Design/commercial/11.jpg",
  "/Design/commercial/117.jpg",
  "/Design/commercial/12.jpg",
  "/Design/commercial/120.jpg",
  "/Design/commercial/121.jpg",
  "/Design/commercial/124.jpg",
  "/Design/commercial/126.jpg",
  "/Design/commercial/128.jpg",
  "/Design/commercial/14.webp",
  "/Design/commercial/15.webp",
  "/Design/commercial/16.webp",
  "/Design/commercial/2.webp",
  "/Design/commercial/22.jpg",
  "/Design/commercial/26.jpg",
  "/Design/commercial/29.jpg",
  "/Design/commercial/3.webp",
  "/Design/commercial/32.jpg",
  "/Design/commercial/36.jpg",
  "/Design/commercial/4.webp",
  "/Design/commercial/40.jpg",
  "/Design/commercial/5.jpg",
  "/Design/commercial/5.webp",
  "/Design/commercial/54.jpg",
  "/Design/commercial/56.jpg",
  "/Design/commercial/6.webp",
  "/Design/commercial/60.jpg",
  "/Design/commercial/63.jpg",
  "/Design/commercial/68.jpg",
  "/Design/commercial/7.jpg",
  "/Design/commercial/76.jpg",
  "/Design/commercial/9.jpg",
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
