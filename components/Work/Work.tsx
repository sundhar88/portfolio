'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '@/data/projects';
import styles from './Work.module.css';

export default function Work() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      const cards = cardsRef.current?.querySelectorAll(`.${styles.card}`);

      // Cards stagger in on scroll
      if (cards) {
        ScrollTrigger.create({
          trigger: cardsRef.current,
          start: 'top 80%',
          onEnter: () => {
            gsap.fromTo(
              cards,
              { y: 60, opacity: 0 },
              { y: 0, opacity: 1, stagger: 0.12, duration: 0.8, ease: 'power3.out' }
            );
          },
          once: true,
        });
      }

      // Section title reveal
      const title = sectionRef.current?.querySelector(`.${styles.titleLarge}`);
      if (title) {
        ScrollTrigger.create({
          trigger: title,
          start: 'top 85%',
          onEnter: () => {
            gsap.fromTo(
              title,
              { x: -60, opacity: 0 },
              { x: 0, opacity: 1, duration: 0.9, ease: 'power3.out' }
            );
          },
          once: true,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Card 3D tilt on hover
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, cardEl: HTMLDivElement) => {
    const rect = cardEl.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(cardEl, {
      rotateX: -y * 8,
      rotateY: x * 8,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = (cardEl: HTMLDivElement) => {
    gsap.to(cardEl, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: 'power3.out',
    });
  };

  return (
    <section ref={sectionRef} id="work" className={`${styles.work} section`}>
      <div className="container">
        {/* Section header */}
        <div className={styles.sectionHeader}>
          <span className={`${styles.sectionLabel} label`}>001 — Selected Work</span>
          <div className="divider"></div>
          <span className={`${styles.count} label`}>{projects.length} projects</span>
        </div>

        {/* Large display title */}
        <h2 className={`${styles.titleLarge} display-xl`}>Work</h2>

        {/* Cards Grid */}
        <div ref={cardsRef} className={styles.cardsGrid}>
          {projects.map((project, index) => (
            <Link
              key={project.slug}
              href={`/work/${project.slug}`}
              className={styles.cardLink}
              id={`work-card-${project.id}`}
            >
              <div
                className={styles.card}
                onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
                onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
                style={{ '--accent': project.accentColor } as React.CSSProperties}
              >
                {/* Card visual */}
                <div className={styles.cardVisual}>
                  <div
                    className={styles.cardGradient}
                    style={{ background: project.coverGradient }}
                  ></div>
                  <div className={styles.cardIndex}>{project.id}</div>
                  <div className={styles.cardArrow} aria-hidden="true">↗</div>
                </div>

                {/* Card info */}
                <div className={styles.cardInfo}>
                  <div className={styles.cardTop}>
                    <div className={styles.cardTags}>
                      {project.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className={`${styles.cardTag} tag`}>{tag}</span>
                      ))}
                    </div>
                    <span className={`${styles.cardYear} label`}>{project.year}</span>
                  </div>

                  <div className={styles.cardBottom}>
                    <h3 className={`${styles.cardTitle} display-md`}>{project.title}</h3>
                    <p className={`${styles.cardSubtitle} body-sm`}>{project.subtitle}</p>
                  </div>

                  <div className={styles.cardOutcome}>
                    <span className="label" style={{ color: 'var(--muted)' }}>Key outcome</span>
                    <span className={styles.outcomeText}>{project.outcomes[0]}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
