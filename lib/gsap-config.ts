'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { Flip } from 'gsap/Flip';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import Tempus from 'tempus';
import Lenis from 'lenis';

// Register all GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, SplitText, Flip, DrawSVGPlugin);
}

let lenisInstance: Lenis | null = null;

export function getLenis(): Lenis | null {
  return lenisInstance;
}

export function initGSAPLenis() {
  if (typeof window === 'undefined') return null;

  // Create Lenis instance
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    smoothWheel: true,
  });

  lenisInstance = lenis;

  // Remove GSAP's default ticker
  gsap.ticker.remove(gsap.updateRoot);

  // Add Lenis + GSAP to Tempus unified loop
  Tempus.add((time: number) => {
    lenis.raf(time);
    gsap.updateRoot(time / 1000);
  }, { priority: 0 });

  // Connect Lenis scroll to ScrollTrigger
  lenis.on('scroll', ScrollTrigger.update);

  return lenis;
}

export function destroyGSAPLenis(lenis: Lenis | null) {
  if (!lenis) return;
  lenis.destroy();
  lenisInstance = null;
  ScrollTrigger.getAll().forEach((st) => st.kill());
}

// Hook for component-level GSAP animations
export function useGSAPContext(callback: (context: gsap.Context) => void, deps: React.DependencyList = []) {
  const ctx = useRef<gsap.Context | null>(null);

  useEffect(() => {
    ctx.current = gsap.context(callback);
    return () => {
      ctx.current?.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ctx;
}

// Utility: split text into chars for animation
export function splitChars(element: Element | null) {
  if (!element) return null;
  return new SplitText(element, { type: 'chars,words,lines' });
}

// Utility: animate chars in stagger
export function animateCharsIn(
  chars: Element[],
  options: { delay?: number; duration?: number; stagger?: number } = {}
) {
  const { delay = 0, duration = 0.8, stagger = 0.03 } = options;

  return gsap.fromTo(
    chars,
    { y: '110%', opacity: 0, rotateX: -30 },
    {
      y: '0%',
      opacity: 1,
      rotateX: 0,
      duration,
      stagger,
      delay,
      ease: 'power4.out',
    }
  );
}

// Utility: fade + slide up on scroll
export function scrollFadeUp(
  element: Element | string,
  options: { start?: string; end?: string; delay?: number } = {}
) {
  const { start = 'top 85%', end = 'bottom 20%', delay = 0 } = options;

  return gsap.fromTo(
    element,
    { y: 60, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.9,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: element as Element,
        start,
        end,
        toggleActions: 'play none none reverse',
      },
    }
  );
}
