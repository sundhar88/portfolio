'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Process.module.css';
import ProcessStep from './ProcessStep';

const steps = [
  {
    number: '01',
    title: 'Understand',
    description:
      'Before sketching a single frame, I immerse myself in the problem space. User interviews, heuristic audits, competitive analysis — I collect signal until the real problem becomes undeniable.',
    accent: '#0000FF',
    image: '/understand_step_bg.png',
  },
  {
    number: '02',
    title: 'Define',
    description:
      'I synthesize research into clear problem statements and measurable success criteria. A well-defined problem is half the solution. I document assumptions explicitly so we can test them.',
    accent: '#00ABA9',
    image: '/define_step_bg.png',
  },
  {
    number: '03',
    title: 'Design',
    description:
      'Exploration is fast and wide. Lo-fi wireframes, multiple divergent concepts, rapid prototyping. I design to think — not to present. The polish comes after we\'ve validated the direction.',
    accent: '#0050EF',
    image: '/design_step_bg.png',
  },
  {
    number: '04',
    title: 'Test',
    description:
      'Real users, real feedback. Usability sessions, A/B tests, accessibility audits. I treat design artifacts as hypotheses — the test results are the truth.',
    accent: '#FF0097',
    image: '/test_step_bg.png',
  },
  {
    number: '05',
    title: 'Ship',
    description:
      'Design doesn\'t end at handoff. I collaborate closely with engineers through implementation, maintain design system parity, and measure impact post-launch. Shipping is the beginning.',
    accent: '#0000FF',
    image: '/ship_step_bg.png',
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      const stepEls = sectionRef.current?.querySelectorAll(`.${styles.step}`);

      stepEls?.forEach((step, i) => {
        gsap.fromTo(
          step,
          { x: -60, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: step,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
            delay: i * 0.05,
          }
        );
      });

      // Number highlights on scroll
      stepEls?.forEach((step) => {
        const num = step.querySelector(`.${styles.stepNumber}`);
        ScrollTrigger.create({
          trigger: step,
          start: 'top 60%',
          end: 'bottom 40%',
          onEnter: () => gsap.to(num, { color: 'var(--white)', duration: 0.4 }),
          onLeave: () => gsap.to(num, { color: 'rgba(255,255,255,0.05)', duration: 0.4 }),
          onEnterBack: () => gsap.to(num, { color: 'var(--white)', duration: 0.4 }),
          onLeaveBack: () => gsap.to(num, { color: 'rgba(255,255,255,0.05)', duration: 0.4 }),
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="process" className={`${styles.process} section`}>
      <div className="container">
        {/* Header */}
        <div className={styles.sectionHeader}>
          <span className={`${styles.sectionLabel} label`}>003 — Process</span>
          <div className="divider"></div>
        </div>

        <div className={styles.intro}>
          <h2 className={`${styles.title} display-lg`}>
            How I<br />
            <span className={styles.titleStroke}>work.</span>
          </h2>
          <p className={`${styles.introText} body-lg`}>
            Design is a discipline, not a service. My process is rigorous, iterative, and always anchored to real user needs.
          </p>
        </div>

        <div className={styles.steps}>
          {steps.map((step) => (
            <ProcessStep key={step.number} {...step} />
          ))}
        </div>
      </div>
    </section>
  );
}
