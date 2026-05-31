'use client';

import { useEffect, useRef } from 'react';
import { initGSAPLenis, destroyGSAPLenis } from '@/lib/gsap-config';
import Lenis from 'lenis';

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    lenisRef.current = initGSAPLenis();
    return () => {
      destroyGSAPLenis(lenisRef.current);
    };
  }, []);

  return <>{children}</>;
}
