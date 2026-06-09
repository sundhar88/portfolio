'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import styles from './Nav.module.css';
import { getLenis } from '@/lib/gsap-config';

const navLinks = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
];

export default function Nav() {
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  // Scroll shrink effect & body scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(window.scrollY > 80);
      if (isScrolled) {
        document.body.classList.add('body-scrolled');
      } else {
        document.body.classList.remove('body-scrolled');
      }
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.classList.remove('body-scrolled');
    };
  }, []);

  // Nav entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        navRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 1.5, ease: 'power3.out' }
      );
    });
    return () => ctx.revert();
  }, []);

  // Menu open/close animation
  useEffect(() => {
    if (!overlayRef.current || !menuRef.current) return;

    const links = menuRef.current.querySelectorAll(`.${styles.menuLink}`);
    const meta = menuRef.current.querySelectorAll(`.${styles.menuMeta}`);
    const lenis = getLenis();

    if (menuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('nav-menu-open');
      if (lenis) lenis.stop();

      tlRef.current = gsap.timeline();
      tlRef.current
        .to(overlayRef.current, {
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
          duration: 0.7,
          ease: 'power4.inOut',
        })
        .fromTo(
          links,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.08, duration: 0.6, ease: 'power3.out' },
          '-=0.3'
        )
        .fromTo(
          meta,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.05, duration: 0.5, ease: 'power3.out' },
          '-=0.4'
        );
    } else {
      document.body.style.overflow = '';
      document.body.classList.remove('nav-menu-open');
      if (lenis) lenis.start();

      if (tlRef.current) {
        tlRef.current.kill();
      }
      gsap.to(overlayRef.current, {
        clipPath: 'polygon(0 0, 100% 0, 100% 0%, 0 0%)',
        duration: 0.5,
        ease: 'power4.inOut',
      });
    }

    return () => {
      document.body.style.overflow = '';
      document.body.classList.remove('nav-menu-open');
      if (lenis) lenis.start();
    };
  }, [menuOpen]);

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}
        id="main-nav"
      >
        <div className={styles.navInner}>
          <Link href="/" className={styles.logo} aria-label="Sundhar M — Home">
            <span className={styles.logoName}>Sundhar M</span>
            <span className={styles.logoDot} aria-hidden="true">●</span>
          </Link>

          <div className={styles.navRight}>
            <span className={`${styles.navLocation} label`}>Chennai, IN</span>
            <button
              className={`${styles.menuBtn} ${menuOpen ? styles.active : ''}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              <span className={styles.menuBtnLine}></span>
              <span className={styles.menuBtnLine}></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Fullscreen Menu Overlay */}
      <div
        ref={overlayRef}
        className={styles.menuOverlay}
        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 0%, 0 0%)' }}
        aria-hidden={!menuOpen}
        data-lenis-prevent
      >
        <div ref={menuRef} className={styles.menuInner}>
          <nav className={styles.menuLinks} aria-label="Main navigation">
            {navLinks.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                className={styles.menuLink}
                onClick={handleLinkClick}
                data-index={`0${i + 1}`}
              >
                <span className={styles.menuLinkIndex}>0{i + 1}</span>
                <span className={styles.menuLinkText}>{link.label}</span>
                <span className={styles.menuLinkArrow} aria-hidden="true">↗</span>
              </a>
            ))}
          </nav>

          <div className={styles.menuFooter}>
            <div className={styles.menuMeta}>
              <span className="label">Available for work</span>
              <span className={styles.availDot}></span>
            </div>
            <div className={styles.menuSocials}>
              {[
                { label: 'LinkedIn', href: 'https://linkedin.com/in/sundharm' },
                { label: 'Dribbble', href: 'https://dribbble.com/sundhar88' },
                { label: 'Behance', href: 'https://behance.net/sundhardesigns' },
                { label: 'GitHub', href: 'https://github.com/sundhar88' },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.menuSocialLink} ${styles.menuMeta}`}
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
