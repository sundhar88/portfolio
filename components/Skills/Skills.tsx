'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Skills.module.css';
import LogoLoop from '@/components/LogoLoop/LogoLoop';

const tiles = [
  { label: 'Figma', type: 'primary', size: 'large', iconType: 'simple', iconName: 'figma' },
  { label: 'Design\nSystems', type: 'blue', size: 'tall', iconType: 'material', iconName: 'schema' },
  { label: 'UX Research', type: 'secondary', size: 'normal', iconType: 'material', iconName: 'psychology' },
  { label: 'Prototyping', type: 'primary', size: 'normal', iconType: 'material', iconName: 'deployed_code' },
  { label: 'Accessibility\nWCAG 2.1', type: 'accent-cyan', size: 'wide', iconType: 'material', iconName: 'accessibility_new' },
  { label: 'Motion\nDesign', type: 'secondary', size: 'normal', iconType: 'material', iconName: 'animation' },
  { label: 'Tokens', type: 'primary', size: 'normal', iconType: 'material', iconName: 'token' },
  { label: 'User\nTesting', type: 'blue', size: 'normal', iconType: 'material', iconName: 'groups' },
  { label: 'Information\nArchitecture', type: 'secondary', size: 'wide', iconType: 'material', iconName: 'account_tree' },
  { label: 'iOS &\nAndroid', type: 'primary', size: 'normal', iconType: 'material', iconName: 'devices' },
  { label: 'HTML/CSS', type: 'accent-magenta', size: 'normal', iconType: 'material', iconName: 'code' },
  { label: 'Framer', type: 'secondary', size: 'normal', iconType: 'simple', iconName: 'framer' },
  { label: 'Notion', type: 'primary', size: 'normal', iconType: 'simple', iconName: 'notion' },
  { label: 'Workshop\nFacilitation', type: 'blue', size: 'wide', iconType: 'material', iconName: 'forum' },
];

const FigmaIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.014-4.49-4.49S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.02 3.019 3.02h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117V8.981H8.148zM8.172 24c-2.489 0-4.515-2.014-4.515-4.49s2.014-4.49 4.49-4.49h4.588v4.441c0 2.503-2.047 4.539-4.563 4.539zm-.024-7.51a3.023 3.023 0 0 0-3.019 3.019c0 1.665 1.365 3.019 3.044 3.019 1.705 0 3.093-1.376 3.093-3.068v-2.97H8.148zm7.704 0h-.098c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h.098c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.49-4.49 4.49zm-.097-7.509c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h.098c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-.098z" />
  </svg>
);

const FramerIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z" />
  </svg>
);

const NotionIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.139c-.093-.514.28-.887.747-.933zM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.447-1.632z" />
  </svg>
);

const JiraIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.571 11.513H0a5.218 5.218 0 0 0 5.232 5.215h2.13v2.057A5.215 5.215 0 0 0 12.575 24V12.518a1.005 1.005 0 0 0-1.005-1.005zm5.723-5.756H5.736a5.215 5.215 0 0 0 5.215 5.214h2.129v2.058a5.218 5.218 0 0 0 5.215 5.214V6.758a1.001 1.001 0 0 0-1.001-1.001zM23.013 0H11.455a5.215 5.215 0 0 0 5.215 5.215h2.129v2.057A5.215 5.215 0 0 0 24 12.483V1.005A1.001 1.001 0 0 0 23.013 0Z" />
  </svg>
);

const MiroIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.392 0H13.9L17 4.808 10.444 0H6.949l3.102 6.3L3.494 0H0l3.05 8.131L0 24h3.494L10.05 6.985 6.949 24h3.494L17 5.494 13.899 24h3.493L24 3.672 17.392 0z" />
  </svg>
);

const LottieIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.928 0H6.072A6.076 6.076 0 0 0 0 6.073v11.854A6.076 6.076 0 0 0 6.073 24h11.854A6.076 6.076 0 0 0 24 17.927V6.073A6.076 6.076 0 0 0 17.927 0m1.42 7.013a1.4 1.4 0 0 1-.26.39c-.11.11-.24.2-.39.26-.14.06-.3.09-.45.09-2.511 0-3.482 1.53-4.792 4.042l-.8 1.51c-1.231 2.382-2.762 5.323-6.894 5.323-.31 0-.62-.12-.84-.35a1.188 1.188 0 0 1 .84-2.031c2.511 0 3.482-1.53 4.792-4.042l.8-1.51c1.231-2.382 2.762-5.323 6.894-5.323q.24 0 .45.09c.14.06.27.15.39.26.11.11.2.24.26.39a1.17 1.17 0 0 1 0 .9" />
  </svg>
);

const DovetailIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M6.75 0 1.5 3l5.25 3v6L12 9V3Zm0 12L1.5 15l5.25 3v6L12 21v-6Zm10.5-6L12 8.966 17.25 12v6l5.25-3V9Z" />
  </svg>
);

const GoogleAnalyticsIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.84 2.9982v17.9987c.0086 1.6473-1.3197 2.9897-2.967 2.9984a2.9808 2.9808 0 01-.3677-.0208c-1.528-.226-2.6477-1.5558-2.6105-3.1V3.1204c-.0369-1.5458 1.0856-2.8762 2.6157-3.1 1.6361-.1915 3.1178.9796 3.3093 2.6158.014.1201.0208.241.0202.3619zM4.1326 18.0548c-1.6417 0-2.9726 1.331-2.9726 2.9726C1.16 22.6691 2.4909 24 4.1326 24s2.9726-1.3309 2.9726-2.9726-1.331-2.9726-2.9726-2.9726zm7.8728-9.0098c-.0171 0-.0342 0-.0513.0003-1.6495.0904-2.9293 1.474-2.891 3.1256v7.9846c0 2.167.9535 3.4825 2.3505 3.763 1.6118.3266 3.1832-.7152 3.5098-2.327.04-.1974.06-.3983.0593-.5998v-8.9585c.003-1.6474-1.33-2.9852-2.9773-2.9882z" />
  </svg>
);

const FormbricksIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M8.658 0a5.714 5.714 0 0 0-5.715 5.714v1.532h14.49a3.623 3.623 0 0 0 0-7.246ZM2.943 8.377v7.246h14.49a3.623 3.623 0 0 0 0-7.246zm0 8.377v3.623a3.623 3.623 0 0 0 7.246 0v-3.623z" />
  </svg>
);

const ClaudeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="m4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z" />
  </svg>
);

const GeminiIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.04 19.32Q12 21.51 12 24q0-2.49.93-4.68.96-2.19 2.58-3.81t3.81-2.55Q21.51 12 24 12q-2.49 0-4.68-.93a12.3 12.3 0 0 1-3.81-2.58 12.3 12.3 0 0 1-2.58-3.81Q12 2.49 12 0q0 2.49-.96 4.68-.93 2.19-2.55 3.81a12.3 12.3 0 0 1-3.81 2.58Q2.49 12 0 12q2.49 0 4.68.96 2.19.93 3.81 2.55t2.55 3.81" />
  </svg>
);

const AntigravityIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L4 12h5v8h6v-8h5L12 2zm0 3.8L16.2 10H13v8h-2v-8H7.8L12 5.8zM4 22h16v-2H4v2z" />
  </svg>
);

const tools = [
  { label: 'Figma', iconType: 'simple', iconName: 'figma' },
  { label: 'Framer', iconType: 'simple', iconName: 'framer' },
  { label: 'Notion', iconType: 'simple', iconName: 'notion' },
  { label: 'Jira', iconType: 'simple', iconName: 'jira' },
  { label: 'Miro', iconType: 'simple', iconName: 'miro' },
  { label: 'Lottie', iconType: 'simple', iconName: 'lottie' },
  { label: 'Dovetail', iconType: 'simple', iconName: 'dovetail' },
  { label: 'Google Analytics', iconType: 'simple', iconName: 'googleanalytics' },
  { label: 'Formbricks', iconType: 'simple', iconName: 'formbricks' },
  { label: 'Claude', iconType: 'simple', iconName: 'claude' },
  { label: 'Gemini', iconType: 'simple', iconName: 'gemini' },
  { label: 'NotebookLM', iconType: 'material', iconName: 'menu_book' },
  { label: 'Antigravity', iconType: 'simple', iconName: 'antigravity' },
];

const renderIcon = (type: string, name: string) => {
  if (type === 'material') {
    return <span className="material-symbols-rounded">{name}</span>;
  }
  switch (name) {
    case 'figma': return <FigmaIcon />;
    case 'framer': return <FramerIcon />;
    case 'notion': return <NotionIcon />;
    case 'jira': return <JiraIcon />;
    case 'miro': return <MiroIcon />;
    case 'lottie': return <LottieIcon />;
    case 'dovetail': return <DovetailIcon />;
    case 'googleanalytics': return <GoogleAnalyticsIcon />;
    case 'formbricks': return <FormbricksIcon />;
    case 'claude': return <ClaudeIcon />;
    case 'gemini': return <GeminiIcon />;
    case 'antigravity': return <AntigravityIcon />;
    default: return null;
  }
};

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

      // Tools row fade-in
      const toolsContainer = sectionRef.current?.querySelector(`.${styles.toolsListContainer}`);
      if (toolsContainer) {
        ScrollTrigger.create({
          trigger: `.${styles.toolsRow}`,
          start: 'top 85%',
          onEnter: () => {
            gsap.fromTo(
              toolsContainer,
              { y: 15, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }
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
              <div className={styles.tileIcon} aria-hidden="true">
                {renderIcon(tile.iconType, tile.iconName)}
              </div>
              <span className={styles.tileLabel}>{tile.label}</span>
            </div>
          ))}
        </div>

        {/* Tools Row with Scrolling Loop */}
        <div className={styles.toolsRow} aria-label="Tools used">
          <span className={`${styles.toolsLabel} label`}>Tools</span>
          <div className={styles.toolsListContainer}>
            <LogoLoop
              logos={tools.map((tool) => ({
                node: (
                  <div className={styles.toolItem}>
                    <span className={styles.toolIcon} aria-hidden="true">
                      {renderIcon(tool.iconType, tool.iconName)}
                    </span>
                    <span className={styles.toolLabel}>{tool.label}</span>
                  </div>
                ),
                title: tool.label
              }))}
              speed={45}
              direction="left"
              logoHeight={24}
              gap={32}
              hoverSpeed={0}
              scaleOnHover={false}
              fadeOut={true}
              fadeOutColor="var(--black)"
              ariaLabel="Tools and technologies used"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
