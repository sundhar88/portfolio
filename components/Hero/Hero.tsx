'use client';

import { useEffect, useRef, Suspense } from 'react';
import dynamic from 'next/dynamic';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Hero.module.css';

const HeroScene = dynamic(() => import('./HeroScene'), {
  ssr: false,
  loading: () => <div className={styles.scenePlaceholder} />,
});

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const taglineRef = useRef<HTMLSpanElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });

      // Animate tagline label
      if (taglineRef.current) {
        tl.fromTo(
          taglineRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
        );
      }

      // Split headline into characters
      if (headlineRef.current) {
        const split = new SplitText(headlineRef.current, {
          type: 'chars',
          charsClass: styles.char,
        });

        tl.fromTo(
          split.chars,
          { y: '110%', opacity: 0, rotateX: -40 },
          {
            y: '0%',
            opacity: 1,
            rotateX: 0,
            duration: 0.9,
            stagger: 0.04,
            ease: 'power4.out',
          },
          '-=0.3'
        );
      }

      // Subtitle
      if (subtitleRef.current) {
        const splitSub = new SplitText(subtitleRef.current, {
          type: 'lines',
          linesClass: styles.lineWrap,
        });

        tl.fromTo(
          splitSub.lines,
          { y: '100%', opacity: 0 },
          {
            y: '0%',
            opacity: 1,
            duration: 0.7,
            stagger: 0.1,
            ease: 'power3.out',
          },
          '-=0.5'
        );
      }

      // Meta info
      if (metaRef.current) {
        tl.fromTo(
          metaRef.current.children,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
          },
          '-=0.4'
        );
      }

      // Scroll indicator
      if (scrollIndicatorRef.current) {
        tl.fromTo(
          scrollIndicatorRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
          '-=0.3'
        );
      }

      // Scroll out animation — hero fades as user scrolls
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          gsap.set(containerRef.current, {
            y: self.progress * 80,
            opacity: 1 - self.progress * 0.6,
          });
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className={styles.hero} id="hero" aria-label="Hero section">
      {/* Three.js Background Scene */}
      <div className={styles.sceneWrapper} aria-hidden="true">
        <Suspense fallback={<div className={styles.scenePlaceholder} />}>
          <HeroScene />
        </Suspense>
      </div>

      {/* Content */}
      <div className={`${styles.content} container`}>
        {/* Label */}
        <span ref={taglineRef} className={`${styles.labelTag} label`}>
          Product Designer
        </span>

        {/* Main headline */}
        <div className={styles.headlineWrap}>
          <h1 ref={headlineRef} className={`${styles.headline} display-xl`}>
            Less,<br />but better.
          </h1>
        </div>

        {/* Subtitle */}
        <div className={styles.subtitleWrap}>
          <p ref={subtitleRef} className={`${styles.subtitle} body-lg`}>
            I design systems and products that are<br />
            precise, accessible, and quietly powerful.
          </p>
        </div>

        {/* Meta row */}
        <div ref={metaRef} className={styles.meta}>
          <a href="#work" className={`${styles.ctaBtn} btn btn-primary`} id="hero-cta">
            View Work
            <span aria-hidden="true">↓</span>
          </a>
          <a href="/resume.pdf" download className={`${styles.resumeBtn} btn btn-outline`} id="hero-resume">
            Download CV
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div ref={scrollIndicatorRef} className={styles.scrollIndicator} aria-label="Scroll to explore">
        <div className={styles.scrollLine}></div>
        <span className={`${styles.scrollLabel} label`}>Scroll</span>
      </div>

      {/* Bottom border */}
      <div className={styles.heroBorder} aria-hidden="true">
        <span className={`${styles.borderLabel} label`}>© 2024</span>
        <span className={`${styles.borderLabel} label`}>Chennai, IN</span>
      </div>
    </section>
  );
}
