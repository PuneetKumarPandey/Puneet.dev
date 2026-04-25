"use client";

import { useState, useCallback } from "react";
import PageLoader from "@/components/ui/PageLoader";
import PageTransition from "@/components/layout/PageTransition";
import Navbar from "@/components/navigation/Navbar";
import Hero from "@/components/sections/Hero";
import Philosophy from "@/components/sections/Philosophy";
import Capabilities from "@/components/sections/Capabilities";
import Systems from "@/components/sections/Systems";
import Vision from "@/components/sections/Vision";
import Contact from "@/components/sections/Contact";

export default function HomePage() {
  const [loaded, setLoaded] = useState(false);

  const handleLoadComplete = useCallback(() => {
    setLoaded(true);
  }, []);

  return (
    <>
      {/* Page loader — blocks content until dismissed */}
      <PageLoader onComplete={handleLoadComplete} />

      {/* Main content — mounts but is invisible under the loader */}
      {loaded && (
        <PageTransition>
          <Navbar />
          <Hero />
          <Philosophy />
          <Capabilities />
          <Systems />
          <Vision />
          <Contact />
        </PageTransition>
      )}
    </>
  );
}
