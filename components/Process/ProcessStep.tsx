'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import styles from './Process.module.css';

interface ProcessStepProps {
  number: string;
  title: string;
  description: string;
  accent: string;
  image: string;
  speed?: number;
}

export default function ProcessStep({
  number,
  title,
  description,
  accent,
  image,
  speed = 12
}: ProcessStepProps) {
  const itemRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const marqueeInnerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);
  const [repetitions, setRepetitions] = useState(4);

  const animationDefaults = { duration: 0.6, ease: 'expo.out' };

  const findClosestEdge = (mouseX: number, mouseY: number, width: number, height: number) => {
    const distMetric = (x: number, y: number, x2: number, y2: number) => {
      const xDiff = x - x2;
      const yDiff = y - y2;
      return xDiff * xDiff + yDiff * yDiff;
    };
    const topEdgeDist = distMetric(mouseX, mouseY, width / 2, 0);
    const bottomEdgeDist = distMetric(mouseX, mouseY, width / 2, height);
    return topEdgeDist < bottomEdgeDist ? 'top' : 'bottom';
  };

  useEffect(() => {
    const calculateRepetitions = () => {
      if (!marqueeInnerRef.current) return;

      const marqueeContent = marqueeInnerRef.current.querySelector(`.${styles.marqueePart}`) as HTMLElement | null;
      if (!marqueeContent) return;

      const contentWidth = marqueeContent.offsetWidth;
      if (contentWidth === 0) return;

      const viewportWidth = window.innerWidth;
      const needed = Math.ceil(viewportWidth / contentWidth) + 2;
      setRepetitions(Math.max(4, needed));
    };

    calculateRepetitions();
    window.addEventListener('resize', calculateRepetitions);
    return () => window.removeEventListener('resize', calculateRepetitions);
  }, [title]);

  useEffect(() => {
    const setupMarquee = () => {
      if (!marqueeInnerRef.current) return;

      const marqueeContent = marqueeInnerRef.current.querySelector(`.${styles.marqueePart}`) as HTMLElement | null;
      if (!marqueeContent) return;

      const contentWidth = marqueeContent.offsetWidth;
      if (contentWidth === 0) return;

      if (animationRef.current) {
        animationRef.current.kill();
      }

      animationRef.current = gsap.to(marqueeInnerRef.current, {
        x: -contentWidth,
        duration: speed,
        ease: 'none',
        repeat: -1
      });
    };

    const timer = setTimeout(setupMarquee, 50);

    return () => {
      clearTimeout(timer);
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, [title, repetitions, speed]);

  const handleMouseEnter = (ev: React.MouseEvent<HTMLDivElement>) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const x = ev.clientX - rect.left;
    const y = ev.clientY - rect.top;
    const edge = findClosestEdge(x, y, rect.width, rect.height);

    gsap.timeline({ defaults: animationDefaults })
      .set(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0)
      .set(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0)
      .to([marqueeRef.current, marqueeInnerRef.current], { y: '0%' }, 0);
  };

  const handleMouseLeave = (ev: React.MouseEvent<HTMLDivElement>) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const x = ev.clientX - rect.left;
    const y = ev.clientY - rect.top;
    const edge = findClosestEdge(x, y, rect.width, rect.height);

    gsap.timeline({ defaults: animationDefaults })
      .to(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0)
      .to(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0);
  };

  return (
    <div
      ref={itemRef}
      className={styles.step}
      style={{ '--step-accent': accent } as React.CSSProperties}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.stepLeft}>
        <span className={styles.stepNumber}>{number}</span>
      </div>
      <div className={styles.stepRight}>
        <h3 className={`${styles.stepTitle} display-md`}>{title}</h3>
        <p className={`${styles.stepDesc} body-lg`}>{description}</p>
      </div>
      <div className={styles.stepLine} aria-hidden="true"></div>

      {/* Marquee Flowing Menu Overlay */}
      <div
        className={styles.marquee}
        ref={marqueeRef}
        style={{ backgroundColor: '#ffffff' }}
      >
        <div className={styles.marqueeInnerWrap}>
          <div className={styles.marqueeInner} ref={marqueeInnerRef} aria-hidden="true">
            {[...Array(repetitions)].map((_, idx) => (
              <div className={styles.marqueePart} key={idx} style={{ color: '#0a0a0a' }}>
                <span className={styles.marqueeText}>{title}</span>
                <div className={styles.marqueeImg} style={{ backgroundImage: `url(${image})` }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
