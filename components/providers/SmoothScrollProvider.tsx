'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initGSAPLenis, destroyGSAPLenis } from '@/lib/gsap-config';
import Lenis from 'lenis';

// A persistent client-side cache to retain scroll positions across navigations
const scrollPositions: { [key: string]: number } = {};

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Standardize manual scroll restoration to prevent browser jumping
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const lenis = initGSAPLenis();
    lenisRef.current = lenis;

    let isUserScrolling = false;
    const setUserScroll = () => {
      isUserScrolling = true;
    };

    // Listen to user scroll triggers
    window.addEventListener('wheel', setUserScroll, { passive: true });
    window.addEventListener('touchmove', setUserScroll, { passive: true });
    window.addEventListener('keydown', setUserScroll, { passive: true });

    // Cache the scroll position only if it is user-initiated or positive.
    // This ignores the Next.js automatic scroll-to-top reset (to 0) before route changes.
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (isUserScrolling || currentScroll > 0) {
        scrollPositions[window.location.pathname] = currentScroll;
      }
      isUserScrolling = false;
    };

    window.addEventListener('scroll', handleScroll);

    const handleDocumentClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      if (anchor) {
        const href = anchor.getAttribute('href');
        if (href && (href === '#work' || href === '/#work' || href.endsWith('#work'))) {
          // Only prevent default and scroll if we are already on the home page
          if (window.location.pathname === '/' && lenis) {
            e.preventDefault();
            const offset = window.innerHeight * 0.4;
            lenis.scrollTo('#work', { offset });
          }
        }
      }
    };

    document.addEventListener('click', handleDocumentClick);

    // If initial load contains #work, scroll to it with offset
    if (window.location.hash === '#work' && lenis) {
      setTimeout(() => {
        const offset = window.innerHeight * 0.4;
        lenis.scrollTo('#work', { offset, immediate: true });
      }, 300);
    }

    return () => {
      destroyGSAPLenis(lenis);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', setUserScroll);
      window.removeEventListener('touchmove', setUserScroll);
      window.removeEventListener('keydown', setUserScroll);
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  // Listen to route changes to restore the saved scroll position
  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;

    const savedPosition = scrollPositions[pathname] || 0;

    // Restore scroll position
    lenis.scrollTo(savedPosition, { immediate: true });
    ScrollTrigger.refresh();

    // Re-verify after layout rendering cycle completes at multiple intervals
    const intervals = [50, 150, 300, 600, 1000];
    const timers = intervals.map((delay) =>
      setTimeout(() => {
        lenis.scrollTo(savedPosition, { immediate: true });
        ScrollTrigger.refresh();
      }, delay)
    );

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [pathname]);

  return <>{children}</>;
}
