'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '@/data/projects';
import styles from './Work.module.css';
import WorkDetailModal from './WorkDetailModal';

// Roundabout 3D Path Calculation
const getCardPathTransform = (t: number, width: number, radius: number) => {
  const startX = -width * 1.25;
  const endX = width * 1.25;

  if (t < 0) {
    return { x: startX, z: -400, rotateY: 90, opacity: 0, scale: 0.4 };
  }
  if (t > 1) {
    return { x: endX, z: -400, rotateY: -90, opacity: 0, scale: 0.4 };
  }

  let x = 0;
  let z = 0;
  let rotateY = 0;
  let opacity = 0;
  let scale = 1;

  if (t < 0.2) {
    // 1. Entry: from left to the merge point on the circle (-radius, 0)
    const u = t / 0.2;
    const easeU = 1 - Math.pow(1 - u, 3); // Ease-out
    x = startX * (1 - easeU) + (-radius) * easeU;
    z = -400 * (1 - easeU); // start in depth
    rotateY = 90 * easeU; // turns to merge angle
    opacity = easeU;
    scale = 0.4 + 0.6 * easeU;
  } else if (t <= 0.8) {
    // 2. Circle / Roundabout: spin 1 time (semi-circle from left to right)
    const u = (t - 0.2) / 0.6;

    // We start at left (angle = PI) and end at right (angle = 0)
    const startAngle = Math.PI;
    const endAngle = 0;
    const angle = startAngle + u * (endAngle - startAngle);

    x = radius * Math.cos(angle);
    z = radius * Math.sin(angle);
    rotateY = (angle * 180) / Math.PI - 90;
    opacity = 1;
    scale = 1;
  } else {
    // 3. Exit: from the exit point (+radius, 0) to off-screen right
    const u = (t - 0.8) / 0.2;
    const easeU = Math.pow(u, 3); // Ease-in
    x = radius * (1 - easeU) + endX * easeU;
    z = -400 * easeU; // recedes in depth
    rotateY = -90 * (1 - easeU); // turns profile/exit
    opacity = 1 - easeU;
    scale = 1 - 0.6 * easeU;
  }

  return { x, z, rotateY, opacity, scale };
};

export default function Work() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const wheelRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeProjectSlug, setActiveProjectSlug] = useState<string | null>(null);
  const [visibleCardsCount, setVisibleCardsCount] = useState(4);
  const [isMobile, setIsMobile] = useState(false);
  const fluidLineRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const media = window.matchMedia('(max-width: 768px)');
    const listener = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsMobile(e.matches);
    };
    media.addEventListener('change', listener);
    listener(media);
    return () => media.removeEventListener('change', listener);
  }, []);

  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      setActiveProjectSlug(null);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const openProjectModal = (slug: string) => {
    setActiveProjectSlug(slug);
    window.history.pushState({ modal: true }, '', `/work/${slug}`);
  };

  const closeProjectModal = () => {
    setActiveProjectSlug(null);
    if (window.location.pathname.startsWith('/work/')) {
      window.history.back();
    }
  };

  // We map the 8 unique projects directly
  const uniqueProjects = projects.map((project, index) => ({
    ...project,
    uniqueId: `${project.slug}-${index}`,
    displayIndex: index,
  }));

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
      if (!cards.length || !sectionRef.current) return;

      const mm = gsap.matchMedia();

      // Desktop & Tablet (>= 769px): Pinned 3D roundabout + fluid line
      mm.add("(min-width: 769px)", () => {
        let lastActiveIndex = 0;

        // Position cards off-screen left immediately on mount to prevent layout flash
        const initWidth = window.innerWidth;
        const initCardWidth = Math.min(290, Math.max(170, initWidth * 0.2));
        const initRadius = initCardWidth * 2.2;
        cards.forEach((card, index) => {
          const cardT = 0 - (index * 0.08);
          const { x, z, rotateY, opacity, scale } = getCardPathTransform(cardT, initWidth, initRadius);
          gsap.set(card, {
            x: x,
            z: z,
            rotateY: rotateY,
            opacity: opacity,
            scale: scale,
          });
        });

        // Create main timeline
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=200%', // duration of scroll pin (increased to slow down card rotation speed)
            pin: true,
            scrub: 1, // smooth scrubbing based on scroll position
            onUpdate: (self) => {
              const p = self.progress; // 0 to 1
              // Map self.progress (0 to 1) to global progress range [0, 1.6]
              const globalProgress = p * 1.6;

              const width = window.innerWidth;
              const cardWidth = Math.min(290, Math.max(170, width * 0.2));
              const radius = cardWidth * 2.2;

              let maxZ = -Infinity;
              let activeIdx = 0;

              cards.forEach((card, index) => {
                // Spacing offset between cards is 0.08
                const cardT = globalProgress - (index * 0.08);
                const { x, z, rotateY, opacity, scale } = getCardPathTransform(cardT, width, radius);

                gsap.set(card, {
                  x: x,
                  z: z,
                  rotateY: rotateY,
                  opacity: opacity,
                  scale: scale,
                });

                // The active card is the one on the circle (phase 2) closest to the viewer (max Z)
                if (cardT >= 0.2 && cardT <= 0.8) {
                  if (z > maxZ) {
                    maxZ = z;
                    activeIdx = index;
                  }
                }
              });

              // Only update React state when activeIndex changes to avoid thrashing
              if (activeIdx !== lastActiveIndex) {
                lastActiveIndex = activeIdx;
                setActiveIndex(activeIdx);
              }
            },
          },
        });

        const pathEl = fluidLineRef.current;
        if (pathEl) {
          const length = pathEl.getTotalLength();
          const segmentLength = length * 0.7; // 70% of path is the visible line segment
          const gapLength = length + segmentLength; // mathematically prevents wrap-around
          pathEl.style.strokeDasharray = `${segmentLength} ${gapLength}`;
          gsap.set(pathEl, { strokeDashoffset: segmentLength });

          tl.to(pathEl, {
            strokeDashoffset: -length,
            ease: 'none',
          }, 0);
        }

        // Section title reveal
        const title = sectionRef.current?.querySelector(`.${styles.titleLarge}`);
        if (title) {
          gsap.fromTo(
            title,
            { x: -60, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.9,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: title,
                start: 'top 85%',
                once: true,
              },
            }
          );
        }
      });

      // Mobile (<= 768px): Smooth vertical list with simple fade-up transitions
      mm.add("(max-width: 768px)", () => {
        // Reset active index to first card
        setActiveIndex(0);

        // Section title reveal (simpler mobile y-axis movement)
        const title = sectionRef.current?.querySelector(`.${styles.titleLarge}`);
        if (title) {
          gsap.fromTo(
            title,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: title,
                start: 'top 90%',
                once: true,
              },
            }
          );
        }

        // Lightweight fade-in on scroll for each stacked card wrapper
        cards.forEach((card) => {
          gsap.fromTo(
            card,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              }
            }
          );
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile, visibleCardsCount]);

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    if (cursorRef.current && cursorRef.current.parentElement) {
      const parentRect = cursorRef.current.parentElement.getBoundingClientRect();
      const cursorX = e.clientX - parentRect.left;
      const cursorY = e.clientY - parentRect.top;

      gsap.set(cursorRef.current, {
        x: cursorX,
        y: cursorY,
      });

      gsap.to(cursorRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, cardEl: HTMLDivElement, index: number) => {
    const rect = cardEl.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    // Apply card 3D tilt rotation
    gsap.to(cardEl, {
      rotateX: -y * 15,
      rotateY: x * 15,
      scale: 1.03,
      transformPerspective: 1000,
      duration: 0.3,
      ease: 'power2.out',
    });

    // Animate custom cursor to mouse position relative to sticky parent
    if (cursorRef.current && cursorRef.current.parentElement) {
      const parentRect = cursorRef.current.parentElement.getBoundingClientRect();
      const cursorX = e.clientX - parentRect.left;
      const cursorY = e.clientY - parentRect.top;

      gsap.to(cursorRef.current, {
        x: cursorX,
        y: cursorY,
        duration: 0.1,
        overwrite: 'auto',
        ease: 'power2.out',
      });
    }
  };

  const handleMouseLeave = (cardEl: HTMLDivElement, index: number) => {

    gsap.to(cardEl, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.5,
      ease: 'power3.out',
    });

    if (cursorRef.current) {
      gsap.to(cursorRef.current, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  };

  // Helper to calculate circular distance for styling
  const getCircularDistance = (a: number, b: number) => {
    const diff = Math.abs(a - b);
    return Math.min(diff, 8 - diff);
  };

  return (
    <section ref={sectionRef} id="work" className={`${styles.work} section`}>
      <div className={styles.stickyContainer}>
        {/* Background Fluid Line SVG */}
        <svg className={styles.fluidLineSvg} viewBox="0 0 1920 1080" preserveAspectRatio="none" aria-hidden="true">
          <path
            ref={fluidLineRef}
            d="M 0,0 C 200,900 450,50 750,850 C 1050,150 1300,950 1550,100 C 1750,850 1850,450 1920,540"
            stroke="var(--blue)"
            strokeWidth="64"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>

        {/* Custom Follower Cursor */}
        <div ref={cursorRef} className={styles.customCursor}>
          <span>See<br />Project</span>
        </div>

        <div className="container">
          {/* Section header */}
          <div className={styles.sectionHeader}>
            <span className={`${styles.sectionLabel} label`}>001 — Selected Work</span>
            <div className="divider"></div>
            <span className={`${styles.count} label`}>8 projects</span>
          </div>

          {/* Large display title */}
          <h2 className={`${styles.titleLarge} display-xl`}>Work</h2>
        </div>

        {/* Circle Gallery */}
        <div ref={containerRef} className={styles.galleryContainer}>
          <div ref={wheelRef} className={styles.wheel}>
            {uniqueProjects
              .slice(0, isMobile ? visibleCardsCount : uniqueProjects.length)
              .map((project, index) => {
              const isActive = index === activeIndex;
              const distance = getCircularDistance(index, activeIndex);
              const isAdjacent = distance === 1;
              const angle = index * 45; // 8 items space evenly at 45 degrees

              return (
                <div
                  key={project.uniqueId}
                  ref={(el) => {
                    cardsRef.current[index] = el;
                  }}
                  className={`${styles.wheelCardWrapper} ${isActive ? styles.active : ''
                    } ${isAdjacent ? styles.adjacent : ''} ${distance > 1 ? styles.inactiveFar : ''}`}
                  style={{
                    '--rotation': `${angle}deg`,
                    '--accent': project.accentColor,
                  } as React.CSSProperties}
                >
                  <a
                    href={`/work/${project.slug}`}
                    className={styles.cardLink}
                    id={`work-card-${project.uniqueId}`}
                    onClick={(e) => {
                      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
                      e.preventDefault();
                      openProjectModal(project.slug);
                    }}
                  >
                    {/* Inner tilt card to prevent CSS layout conflicts */}
                    <div
                      className={styles.cardInner}
                      onMouseEnter={(e) => handleMouseEnter(e, index)}
                      onMouseMove={(e) => handleMouseMove(e, e.currentTarget, index)}
                      onMouseLeave={(e) => handleMouseLeave(e.currentTarget, index)}
                    >
                      {/* Card visual */}
                      <div className={styles.cardVisual}>
                        <div
                          className={styles.cardGradient}
                          style={{ background: project.coverGradient }}
                        ></div>
                        <div className={styles.cardIndex}>{project.id}</div>
                        <div className={styles.cardArrow} aria-hidden="true">
                          ↗
                        </div>
                      </div>

                      {/* Card info */}
                      <div className={styles.cardInfo}>
                        <div className={styles.cardTop}>
                          <div className={styles.cardTags}>
                            {project.tags.slice(0, 2).map((tag) => (
                              <span key={tag} className={`${styles.cardTag} tag`}>
                                {tag}
                              </span>
                            ))}
                          </div>
                          <span className={`${styles.cardYear} label`}>{project.year}</span>
                        </div>

                        <div className={styles.cardBottom}>
                          <h3 className={`${styles.cardTitle} display-md`}>{project.title}</h3>
                          <p className={`${styles.cardSubtitle} body-sm`}>
                            {project.subtitle}
                          </p>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              );
            })}
          </div>

          {/* Load More Button for Mobile responsive viewport */}
          {visibleCardsCount < uniqueProjects.length && (
            <div className={styles.loadMoreWrapper}>
              <button
                className="btn btn-outline"
                onClick={() => {
                  setVisibleCardsCount(uniqueProjects.length);
                  setTimeout(() => {
                    ScrollTrigger.refresh();
                  }, 100);
                }}
              >
                Load More
              </button>
            </div>
          )}
        </div>
      </div>

      {activeProjectSlug && (
        <WorkDetailModal slug={activeProjectSlug} onClose={closeProjectModal} />
      )}
    </section>
  );
}
