"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function SplashScreen({
  onFinish,
}: {
  onFinish: () => void;
}) {
  const [showImage, setShowImage] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const imageTimer = setTimeout(() => setShowImage(true), 300);
    const fadeTimer = setTimeout(() => setFadeOut(true), 2600);
    const endTimer = setTimeout(() => onFinish(), 3000);

    return () => {
      clearTimeout(imageTimer);
      clearTimeout(fadeTimer);
      clearTimeout(endTimer);
    };
  }, [onFinish]);

  return (
    <div
      className={`relative h-screen w-full bg-white
      transition-opacity duration-500 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* SPLASH IMAGE */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 ${
          showImage ? "opacity-100" : "opacity-0"
        }`}
      >
        <Image
          src="/balsamsplash.jpg"
          alt="Splash"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
}
