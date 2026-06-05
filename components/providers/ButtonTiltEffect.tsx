'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function ButtonTiltEffect() {
  const activeBtnRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const applyTilt = (btn: HTMLElement, e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      gsap.to(btn, {
        rotateX: -y * 18,
        rotateY: x * 18,
        scale: 1.05,
        transformPerspective: 600,
        duration: 0.3,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    };

    const resetTilt = (btn: HTMLElement) => {
      gsap.to(btn, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        duration: 0.4,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Select elements matching .btn, button (except hamburger menu toggles), role="button", mailto links, or footer social links
      const btn = target.closest(
        '.btn, button:not([class*="menuBtn"]), [role="button"], a[href^="mailto:"], [class*="socialLink"]'
      ) as HTMLElement | null;

      if (!btn) {
        if (activeBtnRef.current) {
          resetTilt(activeBtnRef.current);
          activeBtnRef.current = null;
        }
        return;
      }

      if (activeBtnRef.current && activeBtnRef.current !== btn) {
        resetTilt(activeBtnRef.current);
      }

      activeBtnRef.current = btn;
      applyTilt(btn, e);
    };

    const handleMouseLeave = () => {
      if (activeBtnRef.current) {
        resetTilt(activeBtnRef.current);
        activeBtnRef.current = null;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('scroll', handleMouseLeave, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', handleMouseLeave);
    };
  }, []);

  return null;
}
