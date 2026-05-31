'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import styles from './About.module.css';

const stats = [
  { value: '4+', label: 'Years of experience' },
  { value: '20+', label: 'Products shipped' },
  { value: '35%', label: 'Avg. retention lift' },
  { value: '12', label: 'Teams aligned' },
];

const skills = [
  'Design Systems',
  'Product Strategy',
  'UX Research',
  'Interaction Design',
  'Accessibility',
  'Prototyping',
  'Design Tokens',
  'User Testing',
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const textBlockRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      // Paragraph line reveals
      const paras = textBlockRef.current?.querySelectorAll('p');
      paras?.forEach((p) => {
        const split = new SplitText(p, { type: 'lines', linesClass: styles.lineClip });
        ScrollTrigger.create({
          trigger: p,
          start: 'top 80%',
          onEnter: () => {
            gsap.fromTo(
              split.lines,
              { y: '100%', opacity: 0 },
              { y: '0%', opacity: 1, stagger: 0.08, duration: 0.8, ease: 'power3.out' }
            );
          },
          once: true,
        });
      });

      // Stat count-up animations
      const statNums = statsRef.current?.querySelectorAll(`.${styles.statValue}`);
      statNums?.forEach((el) => {
        ScrollTrigger.create({
          trigger: el,
          start: 'top 85%',
          onEnter: () => {
            gsap.fromTo(
              el,
              { y: 30, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }
            );
          },
          once: true,
        });
      });

      // Skills tags stagger
      const tags = sectionRef.current?.querySelectorAll(`.${styles.skillTag}`);
      if (tags) {
        ScrollTrigger.create({
          trigger: statsRef.current,
          start: 'top 75%',
          onEnter: () => {
            gsap.fromTo(
              tags,
              { y: 20, opacity: 0, scale: 0.95 },
              { y: 0, opacity: 1, scale: 1, stagger: 0.06, duration: 0.5, ease: 'power3.out' }
            );
          },
          once: true,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className={`${styles.about} section`}>
      <div className="container">
        {/* Section label */}
        <div className={styles.sectionHeader}>
          <span className={`${styles.sectionLabel} label`}>002 — About</span>
          <div className="divider"></div>
        </div>

        <div className={styles.grid}>
          {/* Left — Sticky title */}
          <div ref={stickyRef} className={styles.stickyTitle}>
            <h2 className={`${styles.title} display-md`}>
              Designing<br />
              with<br />
              <span className={styles.titleBlue}>intention.</span>
            </h2>
            <div className={styles.portraitBox} aria-hidden="true">
              <div className={styles.portraitInner}>
                <span className={styles.portraitText}>S</span>
              </div>
            </div>
          </div>

          {/* Right — Scrollable content */}
          <div className={styles.scrollContent}>
            <div ref={textBlockRef} className={styles.textBlock}>
              <p className="body-lg">
                I&apos;m Sundhar M, a Product Designer based in Chennai, India. I believe the best design is the kind users never notice — it just works, seamlessly and accessibly.
              </p>
              <p className="body-lg">
                My practice sits at the intersection of design systems thinking and human-centered UX. I specialise in reducing complexity: whether that&apos;s untangling a fragmented component library or rethinking a product flow that&apos;s bleeding users.
              </p>
              <p className="body-lg">
                Before launching into a solution, I spend time with the problem. I research, audit, question assumptions, and then design with precision. The result is work that lasts — not work that trends.
              </p>
            </div>

            {/* Skills */}
            <div className={styles.skillsBlock}>
              <span className={`${styles.skillsLabel} label`}>Capabilities</span>
              <div className={styles.skillTags}>
                {skills.map((skill) => (
                  <span key={skill} className={`${styles.skillTag} tag`}>{skill}</span>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div ref={statsRef} className={styles.stats}>
              {stats.map((stat) => (
                <div key={stat.label} className={styles.stat}>
                  <span className={`${styles.statValue} display-md`}>{stat.value}</span>
                  <span className={`${styles.statLabel} label`}>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
