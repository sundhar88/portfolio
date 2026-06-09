'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Contact.module.css';

const socials = [
  { label: 'LinkedIn', href: 'https://linkedin.com/in/sundharm', shortLabel: 'LI' },
  { label: 'Dribbble', href: 'https://dribbble.com/sundhar88', shortLabel: 'Dr' },
  { label: 'Behance', href: 'https://behance.net/sundhardesigns', shortLabel: 'Be' },
  { label: 'GitHub', href: 'https://github.com/sundhar88', shortLabel: 'GH' },
];

const EMAIL = 'sundhar.pvt1@gmail.com';

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const emailRef = useRef<HTMLAnchorElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      // Headline reveal
      if (headlineRef.current) {
        const split = new SplitText(headlineRef.current, { type: 'chars' });
        ScrollTrigger.create({
          trigger: headlineRef.current,
          start: 'top 75%',
          onEnter: () => {
            gsap.fromTo(
              split.chars,
              { y: '100%', opacity: 0 },
              { y: '0%', opacity: 1, stagger: 0.03, duration: 0.8, ease: 'power3.out' }
            );
          },
          once: true,
        });
      }

      // CTA elements
      if (ctaRef.current) {
        ScrollTrigger.create({
          trigger: ctaRef.current,
          start: 'top 80%',
          onEnter: () => {
            gsap.fromTo(
              ctaRef.current!.children,
              { y: 30, opacity: 0 },
              { y: 0, opacity: 1, stagger: 0.1, duration: 0.7, ease: 'power3.out' }
            );
          },
          once: true,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Email scramble effect
  const handleEmailEnter = () => {
    if (!emailRef.current) return;
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@._';
    let iteration = 0;
    const interval = setInterval(() => {
      if (!emailRef.current) return;
      emailRef.current.innerText = EMAIL.split('')
        .map((char, index) => {
          if (index < iteration) return EMAIL[index];
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join('');

      if (iteration >= EMAIL.length) clearInterval(interval);
      iteration += 1;
    }, 35);
  };

  return (
    <section ref={sectionRef} id="contact" className={`${styles.contact} section`}>
      {/* Top border glow */}
      <div className={styles.topGlow} aria-hidden="true"></div>

      <div className="container">
        {/* Header */}
        <div className={styles.sectionHeader}>
          <span className={`${styles.sectionLabel} label`}>005 — Contact</span>
          <div className="divider"></div>
        </div>

        {/* Big headline */}
        <div className={styles.headlineWrap}>
          <h2 ref={headlineRef} className={`${styles.headline} display-xl`}>
            Let&apos;s work<br />
            together.
          </h2>
        </div>

        {/* CTA block */}
        <div ref={ctaRef} className={styles.ctaBlock}>
          <p className={`${styles.ctaText} body-lg`}>
            Open to full-time product design roles, consulting engagements, and design system initiatives. Based in Chennai — available globally.
          </p>

          <a
            ref={emailRef}
            href={`mailto:${EMAIL}`}
            className={styles.emailLink}
            onMouseEnter={handleEmailEnter}
            aria-label="Send email to Sundhar"
            id="contact-email"
          >
            {EMAIL}
          </a>

          <div className={styles.actions}>
            <a
              href={`mailto:${EMAIL}`}
              className={`${styles.ctaBtn} btn btn-primary`}
              id="contact-cta-btn"
            >
              Get in touch
              <span aria-hidden="true">→</span>
            </a>
            <a
              href="/resume.pdf"
              download
              className={`${styles.resumeBtn} btn btn-outline`}
              id="contact-resume-btn"
            >
              Download Resume
            </a>
          </div>
        </div>

        {/* Footer */}
        <footer className={styles.footer}>
          <div className={styles.footerLeft}>
            <span className={styles.footerName}>Sundhar M</span>
            <span className="label">Product Designer · Chennai, IN</span>
          </div>

          <nav className={styles.socials} aria-label="Social links">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label={s.label}
                id={`social-${s.label.toLowerCase()}`}
              >
                <span className={styles.socialShort}>{s.shortLabel}</span>
                <span className={styles.socialLabel}>{s.label}</span>
              </a>
            ))}
          </nav>

          <div className={styles.footerRight}>
            <span className="label">© 2026 · Built with vibes</span>
          </div>
        </footer>
      </div>
    </section>
  );
}
