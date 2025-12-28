"use client";

import { useState } from "react";
import SplashScreen from "./components/splashscreen";
import HotelSection from "./components/hotelsection";

export default function Page() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      {showSplash ? (
        <SplashScreen onFinish={() => setShowSplash(false)} />
      ) : (
        <HotelSection />
      )}
    </>
  );
}
