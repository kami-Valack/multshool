"use client";

import React, { useState } from "react";
import SplashScreen from "@/components/SplashScreen/Splash";
import Welcome from "./welcome/page";

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}
      {!showSplash && (
        <main>
          <Welcome />
        </main>
      )}
    </>
  );
}
