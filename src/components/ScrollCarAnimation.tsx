'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollCarAnimationProps {
  children: React.ReactNode;
  onScrollProgress?: (progress: number) => void;
}

export default function ScrollCarAnimation({ children, onScrollProgress }: ScrollCarAnimationProps) {
  const carRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (!carRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(carRef.current, {
        y: 0,
        scrollTrigger: {
          trigger: '#scroll-container', // 👈 your stable scroll area
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const progress = self.progress;
            setScrollProgress(progress);
            onScrollProgress?.(progress);
          },
        },
      });
    });

    return () => ctx.revert();
  }, [onScrollProgress]);

  return (
    <div ref={carRef} className="fixed-canvas">
      {children}
    </div>
  );
}
