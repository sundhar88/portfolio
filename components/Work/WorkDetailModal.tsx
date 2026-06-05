'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { getProjectBySlug } from '@/data/projects';
import { getLenis } from '@/lib/gsap-config';
import gsap from 'gsap';
import styles from './WorkDetailModal.module.css';

interface WorkDetailModalProps {
  slug: string;
  onClose: () => void;
}

export default function WorkDetailModal({ slug, onClose }: WorkDetailModalProps) {
  const project = getProjectBySlug(slug);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  const handleClose = useCallback(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        onClose();
      },
    });
    tl.to(contentRef.current, { y: 40, opacity: 0, duration: 0.3, ease: 'power3.inOut' });
    tl.to(overlayRef.current, { opacity: 0, duration: 0.25, ease: 'power2.inOut' }, '-=0.15');
  }, [onClose]);

  useEffect(() => {
    setMounted(true);
    // Lock background scroll behavior
    document.body.style.overflow = 'hidden';
    document.body.classList.add('modal-open');

    // Modal entrance animation
    let ctx: gsap.Context | null = null;
    if (overlayRef.current && contentRef.current) {
      ctx = gsap.context(() => {
        const tl = gsap.timeline();
        tl.fromTo(
          overlayRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.35, ease: 'power2.out' }
        );
        tl.fromTo(
          contentRef.current,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' },
          '-=0.15'
        );
      });
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      if (ctx) ctx.revert();
      document.body.style.overflow = '';
      document.body.classList.remove('modal-open');
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mounted, handleClose]);

  if (!project) return null;
  if (!mounted) return null;

  return createPortal(
    <div
      ref={overlayRef}
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} Case Study`}
      data-lenis-prevent
    >
      {/* Fixed Close Button */}
      <button className={styles.closeButton} onClick={handleClose} aria-label="Close Case Study">
        <span className="material-symbols-rounded">close</span>
      </button>

      <div ref={contentRef} className={styles.modalContent}>
        <article className={styles.article}>
          {/* Hero banner */}
          <header
            className={styles.hero}
            style={{ background: project.coverGradient }}
          >
            <div className={`${styles.heroContent} container`}>
              <div className={styles.heroBreadcrumb}>
                <span className="label" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                  {project.type.join(' · ')}
                </span>
              </div>
              <h1 className={`${styles.heroTitle} display-xl`}>{project.title}</h1>
              <p className={`${styles.heroSubtitle} body-lg`}>{project.subtitle}</p>

              <div className={styles.heroMeta}>
                <div className={styles.metaItem}>
                  <span>Year</span>
                  <strong>{project.year}</strong>
                </div>
                <div className={styles.metaItem}>
                  <span>Duration</span>
                  <strong>{project.duration}</strong>
                </div>
                <div className={styles.metaItem}>
                  <span>Role</span>
                  <strong>{project.role}</strong>
                </div>
              </div>
            </div>
          </header>

          {/* Content */}
          <div className={`${styles.body} container`}>
            {/* Overview */}
            <section className={styles.section}>
              <h2 className={`${styles.sectionTitle} display-md`}>Overview</h2>
              <p className="body-lg">{project.description}</p>
            </section>

            {/* Impact metrics */}
            <section className={styles.section}>
              <h2 className={`${styles.sectionTitle} display-md`}>Impact</h2>
              <div className={styles.impactGrid}>
                {project.impact.map((item) => (
                  <div key={item.label} className={styles.impactCard}>
                    <span className={styles.impactMetric}>{item.metric}</span>
                    <span className={`${styles.impactLabel} label`}>{item.label}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Challenge */}
            <section className={styles.section}>
              <div className={styles.twoCol}>
                <div>
                  <h2 className={`${styles.sectionTitle} display-md`}>The Challenge</h2>
                  <p className="body-lg">{project.challenge}</p>
                </div>
                <div>
                  <h2 className={`${styles.sectionTitle} display-md`}>The Solution</h2>
                  <p className="body-lg">{project.solution}</p>
                </div>
              </div>
            </section>

            {/* Visual placeholder */}
            <section className={styles.section}>
              <div className={styles.casePlaceholder} style={{ background: project.coverGradient }}>
                <span className="label" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  Project visuals — coming soon
                </span>
              </div>
            </section>

            {/* Outcomes */}
            <section className={styles.section}>
              <h2 className={`${styles.sectionTitle} display-md`}>Outcomes</h2>
              <ul className={styles.outcomeList}>
                {project.outcomes.map((outcome) => (
                  <li key={outcome} className={styles.outcomeItem}>
                    <span className={styles.outcomeDot} aria-hidden="true">●</span>
                    <span className="body-lg">{outcome}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Tags */}
            <div className={styles.tagsRow}>
              {project.tags.map((tag) => (
                <span key={tag} className="tag tag-blue">{tag}</span>
              ))}
            </div>
          </div>
        </article>
      </div>
    </div>,
    document.body
  );
}
