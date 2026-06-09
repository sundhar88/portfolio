'use client';

import { useRef } from 'react';
import styles from './About.module.css';
import LogoLoop from '../LogoLoop/LogoLoop';

const stats = [
  { value: '6+', label: 'Years of experience' },
  { value: '20+', label: 'Products shipped' },
  { value: '35%', label: 'Avg. retention lift' },
  { value: '10+', label: 'Teams aligned' },
];

const FigmaIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, width: '14px', height: '14px' }}
  >
    <path d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.014-4.49-4.49S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.02 3.019 3.02h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117V8.981H8.148zM8.172 24c-2.489 0-4.515-2.014-4.515-4.49s2.014-4.49 4.49-4.49h4.588v4.441c0 2.503-2.047 4.539-4.563 4.539zm-.024-7.51a3.023 3.023 0 0 0-3.019 3.019c0 1.665 1.365 3.019 3.044 3.019 1.705 0 3.093-1.376 3.093-3.068v-2.97H8.148zm7.704 0h-.098c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h.098c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.49-4.49 4.49zm-.097-7.509c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h.098c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-.098z" />
  </svg>
);

const skills = [
  { name: 'Design Systems', iconType: 'simple', iconName: 'figma' },
  { name: 'Product Strategy', iconType: 'material', iconName: 'insights' },
  { name: 'UX Research', iconType: 'material', iconName: 'psychology' },
  { name: 'Interaction Design', iconType: 'material', iconName: 'ads_click' },
  { name: 'Accessibility', iconType: 'material', iconName: 'accessibility_new' },
  { name: 'Prototyping', iconType: 'material', iconName: 'deployed_code' },
  { name: 'Design Tokens', iconType: 'material', iconName: 'token' },
  { name: 'User Testing', iconType: 'material', iconName: 'groups' },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

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
          <div className={styles.stickyTitle}>
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
            <div className={styles.textBlock}>
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
              <div className={styles.skillsLoopContainer}>
                <LogoLoop
                  logos={skills.map((skill) => ({
                    node: (
                      <div className={`${styles.skillTag} tag`}>
                        {skill.iconType === 'simple' && skill.iconName === 'figma' && (
                          <FigmaIcon />
                        )}
                        {skill.iconType === 'material' && (
                          <span className="material-symbols-rounded">{skill.iconName}</span>
                        )}
                        <span>{skill.name}</span>
                      </div>
                    ),
                    title: skill.name,
                  }))}
                  speed={40}
                  direction="left"
                  logoHeight={36}
                  gap={16}
                  hoverSpeed={0}
                  scaleOnHover={false}
                  fadeOut={true}
                  fadeOutColor="var(--black)"
                  ariaLabel="Design capabilities"
                />
              </div>
            </div>

            {/* Stats */}
            <div className={styles.stats}>
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
