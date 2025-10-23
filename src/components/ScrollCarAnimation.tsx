// src/components/ScrollCarAnimation.tsx
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
    if (carRef.current) {
      // Анимация только позиции HTML контейнера
      gsap.to(carRef.current, {
        x: 0, // Оставляем контейнер в центре
        y: 0,
        duration: 2,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            setScrollProgress(progress);
            onScrollProgress?.(progress);
          }
        }
      });
    }
  }, [onScrollProgress]);

  return (
    <div 
      ref={carRef} 
      className="fixed-canvas"
    >
      {children}
    </div>
  );
}