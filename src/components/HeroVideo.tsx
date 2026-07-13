"use client";
import { useState, useRef, useEffect } from "react";

export default function HeroVideo() {
  const [isReady, setIsReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && videoRef.current.readyState >= 3) {
      setIsReady(true);
    }
  }, []);

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      {...({ fetchPriority: "high" } as any)}
      onCanPlayThrough={() => setIsReady(true)}
      className={`absolute inset-0 w-full h-full object-cover z-10 motion-reduce:hidden transition-opacity duration-700 ease-in-out ${
        isReady ? "opacity-100" : "opacity-0"
      }`}
    >
      <source src="/video/hero/herovideo.webm" type="video/webm" />
      <source src="/video/hero/herovideo.mp4" type="video/mp4" />
    </video>
  );
}
