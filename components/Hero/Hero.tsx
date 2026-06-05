'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Hero.module.css';
import LiquidEther from './LiquidEther';

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
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

      // Canvas background fades out as user scrolls
      if (sceneRef.current) {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: 'top top',
          end: '80% top',
          scrub: 1.5,
          onUpdate: (self) => {
            if (sceneRef.current) {
              gsap.set(sceneRef.current, {
                opacity: 1 - self.progress,
              });
            }
          },
        });
      }

      // Content parallax — slides up gently on scroll
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          gsap.set(containerRef.current, {
            y: self.progress * 60,
          });
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className={styles.hero} id="hero" aria-label="Hero section">
      {/* Background Graphic Placeholder — fades on scroll independently */}
      <div ref={sceneRef} className={styles.sceneWrapper} aria-hidden="true">
        <LiquidEther
          colors={['#0000ff', '#0050ef', '#00aba9']}
          mouseForce={22}
          cursorSize={80}
          isViscous={true}
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.5}
          isBounce={false}
          autoDemo={true}
          autoSpeed={0.4}
          autoIntensity={1.8}
        />
      </div>

      {/* Content */}
      <div className={`${styles.content} container`}>
        {/* Top meta row */}
        <div className={styles.topMeta}>
          <span ref={taglineRef} className={`${styles.labelTag} label`}>
            Product Designer
          </span>
        </div>

        {/* Main headline - Your Name */}
        <div className={styles.headlineWrap}>
          <h1 ref={headlineRef} className={`${styles.headline} display-xl`}>
            Sundhar M.
          </h1>
        </div>

        {/* Subtitle */}
        <div className={styles.subtitleWrap}>
          <p ref={subtitleRef} className={`${styles.subtitle} body-lg`}>
            I design systems and products that are precise, accessible, and quietly powerful.
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
        <span className={`${styles.borderLabel} label`}>© 2025</span>
        <span className={`${styles.borderLabel} label`}>Chennai, IN</span>
      </div>
    </section>
  );
}
