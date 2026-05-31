import { notFound } from 'next/navigation';
import Link from 'next/link';
import { projects, getProjectBySlug } from '@/data/projects';
import Nav from '@/components/Nav/Nav';
import styles from './work.module.css';

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug);
  if (!project) return {};
  return {
    title: `${project.title} — Sundhar M`,
    description: project.subtitle,
  };
}

export default function WorkDetailPage({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();

  return (
    <main>
      <Nav />
      <article className={styles.article}>
        {/* Hero banner */}
        <header
          className={styles.hero}
          style={{ background: project.coverGradient }}
        >
          <div className={`${styles.heroContent} container`}>
            <div className={styles.heroBreadcrumb}>
              <Link href="/#work" className={styles.back}>
                ← Back to Work
              </Link>
              <span className="label">{project.type.join(' · ')}</span>
            </div>
            <h1 className={`${styles.heroTitle} display-xl`}>{project.title}</h1>
            <p className={`${styles.heroSubtitle} body-lg`}>{project.subtitle}</p>

            <div className={styles.heroMeta}>
              <div className={styles.metaItem}>
                <span className="label">Year</span>
                <strong>{project.year}</strong>
              </div>
              <div className={styles.metaItem}>
                <span className="label">Duration</span>
                <strong>{project.duration}</strong>
              </div>
              <div className={styles.metaItem}>
                <span className="label">Role</span>
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

          {/* Case study placeholder image areas */}
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

          {/* Navigation to other projects */}
          <nav className={styles.projectNav} aria-label="Project navigation">
            <Link href="/#work" className={styles.allProjects}>
              ← All Projects
            </Link>
          </nav>
        </div>
      </article>
    </main>
  );
}
