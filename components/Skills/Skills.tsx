'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Skills.module.css';

const tiles = [
  { label: 'Figma', type: 'primary', size: 'large' },
  { label: 'Design\nSystems', type: 'blue', size: 'tall' },
  { label: 'UX Research', type: 'secondary', size: 'normal' },
  { label: 'Prototyping', type: 'primary', size: 'normal' },
  { label: 'Accessibility\nWCAG 2.1', type: 'accent-cyan', size: 'wide' },
  { label: 'Motion\nDesign', type: 'secondary', size: 'normal' },
  { label: 'Tokens', type: 'primary', size: 'normal' },
  { label: 'User\nTesting', type: 'blue', size: 'normal' },
  { label: 'Information\nArchitecture', type: 'secondary', size: 'wide' },
  { label: 'iOS &\nAndroid', type: 'primary', size: 'normal' },
  { label: 'HTML/CSS', type: 'accent-magenta', size: 'normal' },
  { label: 'Framer', type: 'secondary', size: 'normal' },
  { label: 'Notion', type: 'primary', size: 'normal' },
  { label: 'Workshop\nFacilitation', type: 'blue', size: 'wide' },
];

const tools = [
  { label: 'Figma', icon: '◈' },
  { label: 'Framer', icon: '◉' },
  { label: 'Notion', icon: '◻' },
  { label: 'Jira', icon: '◆' },
  { label: 'Miro', icon: '◈' },
  { label: 'Maze', icon: '◉' },
  { label: 'Lottie', icon: '◻' },
  { label: 'Zeplin', icon: '◆' },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const tilesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      const tiles = tilesRef.current?.querySelectorAll(`.${styles.tile}`);

      if (tiles) {
        ScrollTrigger.create({
          trigger: tilesRef.current,
          start: 'top 75%',
          onEnter: () => {
            gsap.fromTo(
              tiles,
              { scale: 0.85, opacity: 0, y: 30 },
              {
                scale: 1,
                opacity: 1,
                y: 0,
                stagger: {
                  each: 0.07,
                  grid: 'auto',
                  from: 'start',
                },
                duration: 0.6,
                ease: 'power3.out',
              }
            );
          },
          once: true,
        });
      }

      // Tools row
      const toolEls = sectionRef.current?.querySelectorAll(`.${styles.toolItem}`);
      if (toolEls) {
        ScrollTrigger.create({
          trigger: `.${styles.toolsRow}`,
          start: 'top 85%',
          onEnter: () => {
            gsap.fromTo(
              toolEls,
              { x: -20, opacity: 0 },
              { x: 0, opacity: 1, stagger: 0.07, duration: 0.5, ease: 'power2.out' }
            );
          },
          once: true,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="skills" className={`${styles.skills} section`}>
      <div className="container">
        {/* Header */}
        <div className={styles.sectionHeader}>
          <span className={`${styles.sectionLabel} label`}>004 — Skills</span>
          <div className="divider"></div>
        </div>

        <div className={styles.titleRow}>
          <h2 className={`${styles.title} display-lg`}>
            The toolkit.
          </h2>
          <p className={`${styles.subtitle} body-lg`}>
            From research to pixel — a practical range of skills built across products, platforms, and teams.
          </p>
        </div>

        {/* Metro Tile Grid */}
        <div ref={tilesRef} className={styles.tileGrid} aria-label="Skills tiles">
          {tiles.map((tile, i) => (
            <div
              key={i}
              className={`${styles.tile} ${styles[`tile-${tile.type}`]} ${styles[`tile-${tile.size}`]}`}
              style={{ opacity: 0 }}
            >
              <span className={styles.tileLabel}>{tile.label}</span>
            </div>
          ))}
        </div>

        {/* Tools Row */}
        <div className={styles.toolsRow} aria-label="Tools used">
          <span className={`${styles.toolsLabel} label`}>Tools</span>
          <div className={styles.toolsList}>
            {tools.map((tool) => (
              <div key={tool.label} className={styles.toolItem}>
                <span className={styles.toolIcon} aria-hidden="true">{tool.icon}</span>
                <span className={styles.toolLabel}>{tool.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
