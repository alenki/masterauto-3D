"use client";

import { useEffect, ReactNode } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// register the plugin once
gsap.registerPlugin(ScrollTrigger);

export default function LenisProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({});

    // Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
    // Keep a stable reference to the GSAP callback so we can remove it later
    const rafCallback = (time: number) => {
      // gsap.ticker gives seconds; lenis.raf expects milliseconds
      lenis.raf(time * 1000);
    };

    // When Lenis emits scroll, update ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Add the callback to GSAP's ticker
    gsap.ticker.add(rafCallback);

    // Avoid GSAP lag smoothing interfering with timing
    gsap.ticker.lagSmoothing(0);

    return () => {
      // Remove ScrollTrigger listener
      lenis.off("scroll", ScrollTrigger.update);

      // Remove the exact raf callback from GSAP ticker
      gsap.ticker.remove(rafCallback);

      // Destroy Lenis instance
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
