// Project data — placeholder case studies
// Replace with real project data when ready

export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  type: string[];
  year: string;
  duration: string;
  role: string;
  tags: string[];
  accentColor: string;
  outcomes: string[];
  coverGradient: string;
  description: string;
  challenge: string;
  solution: string;
  impact: { metric: string; value: string; label: string }[];
}

export const projects: Project[] = [
  {
    id: '01',
    slug: 'design-system-01',
    title: 'Clarity DS',
    subtitle: 'Building a unified design language across 12 product teams',
    type: ['Design System', 'Component Library'],
    year: '2024',
    duration: '6 months',
    role: 'Lead Product Designer',
    tags: ['Figma', 'Design Tokens', 'Accessibility', 'Documentation'],
    accentColor: '#0000FF',
    outcomes: ['Reduced design debt by 60%', 'Improved release velocity by 40%', 'WCAG AA compliant'],
    coverGradient: 'linear-gradient(135deg, #0000FF 0%, #0050EF 100%)',
    description:
      'A comprehensive design system built from first principles, aligning 12 cross-functional product teams under a single, scalable visual language.',
    challenge:
      'With over 12 product teams operating independently, the product had accumulated significant visual inconsistency and technical debt. Components were duplicated, design decisions were undocumented, and accessibility was an afterthought.',
    solution:
      'Audited all existing components, established a semantic token architecture, built a living documentation site, and introduced a contribution model that allowed teams to extend the system without fragmenting it.',
    impact: [
      { metric: '60%', value: '60', label: 'Reduction in design debt' },
      { metric: '40%', value: '40', label: 'Faster release cycles' },
      { metric: '12', value: '12', label: 'Teams aligned' },
      { metric: 'AA', value: 'AA', label: 'WCAG compliance' },
    ],
  },
  {
    id: '02',
    slug: 'product-revamp-01',
    title: 'Orbit Revamp',
    subtitle: 'Redesigning a SaaS dashboard to increase user retention by 35%',
    type: ['Product Revamp', 'UX Research'],
    year: '2023',
    duration: '4 months',
    role: 'Product Designer',
    tags: ['User Research', 'Prototyping', 'Analytics', 'SaaS'],
    accentColor: '#00ABA9',
    outcomes: ['35% increase in retention', 'NPS improved from 23 to 61', 'Support tickets down 28%'],
    coverGradient: 'linear-gradient(135deg, #00ABA9 0%, #0050EF 100%)',
    description:
      'A complete UX overhaul of a B2B analytics dashboard, transforming a cluttered, data-heavy interface into an intuitive, insight-first experience.',
    challenge:
      'Users were churning within the first 30 days. The existing interface overwhelmed new users with raw data, lacked clear hierarchy, and required extensive onboarding just to accomplish basic tasks.',
    solution:
      'Conducted 24 user interviews, mapped key job-to-be-done flows, introduced progressive disclosure patterns, and rebuilt the information architecture around the most frequent user tasks.',
    impact: [
      { metric: '35%', value: '35', label: 'Retention increase' },
      { metric: '61', value: '61', label: 'NPS score (up from 23)' },
      { metric: '28%', value: '28', label: 'Fewer support tickets' },
      { metric: '24', value: '24', label: 'User interviews' },
    ],
  },
  {
    id: '03',
    slug: 'accessibility-audit-01',
    title: 'Access First',
    subtitle: 'Bringing a fintech platform to full WCAG 2.1 AA compliance',
    type: ['Accessibility', 'Design System'],
    year: '2023',
    duration: '3 months',
    role: 'Product Designer',
    tags: ['Accessibility', 'WCAG', 'Audit', 'Fintech'],
    accentColor: '#FF0097',
    outcomes: ['Full WCAG 2.1 AA', 'Improved satisfaction for 100K+ users', 'Zero critical violations'],
    coverGradient: 'linear-gradient(135deg, #FF0097 0%, #A200FF 100%)',
    description:
      'An end-to-end accessibility audit and remediation project for a fintech platform serving over 100,000 users, including a large segment of visually impaired customers.',
    challenge:
      'The platform had never been audited for accessibility. A regulatory requirement triggered an urgent need to identify and remediate hundreds of accessibility violations across web and mobile.',
    solution:
      'Led a systematic audit using automated tools and manual testing with assistive technologies. Produced a prioritized remediation roadmap, created accessible component specifications, and trained the engineering team on accessible development patterns.',
    impact: [
      { metric: '100K+', value: '100', label: 'Users impacted positively' },
      { metric: '0', value: '0', label: 'Critical violations remaining' },
      { metric: '89%', value: '89', label: 'Satisfaction score' },
      { metric: '2.1', value: '2', label: 'WCAG AA achieved' },
    ],
  },
  {
    id: '04',
    slug: 'product-revamp-02',
    title: 'Nova Mobile',
    subtitle: 'Redesigning a mobile-first experience to reduce time-to-action',
    type: ['Product Revamp', 'Mobile Design'],
    year: '2022',
    duration: '5 months',
    role: 'Lead Product Designer',
    tags: ['Mobile', 'iOS', 'Android', 'Prototyping', 'Motion'],
    accentColor: '#0050EF',
    outcomes: ['50% reduction in time-to-action', '4.7★ App Store rating', 'Featured by Apple'],
    coverGradient: 'linear-gradient(135deg, #0050EF 0%, #00ABA9 100%)',
    description:
      'A ground-up redesign of a consumer mobile application focused on reducing friction, improving discoverability, and creating a delightful motion design language.',
    challenge:
      'Users found the core action buried 4 taps deep. Task completion rates were below 40%, and the app had accumulated a 3.1 star rating with hundreds of "too complicated" reviews.',
    solution:
      'Restructured the information architecture around a single primary action, introduced a gesture-first navigation model, and designed a comprehensive motion system that guides users through state changes.',
    impact: [
      { metric: '50%', value: '50', label: 'Faster time-to-action' },
      { metric: '4.7★', value: '4', label: 'App Store rating' },
      { metric: '92%', value: '92', label: 'Task completion rate' },
      { metric: '↑38%', value: '38', label: 'Daily active users' },
    ],
  },
];

export const getProjectBySlug = (slug: string): Project | undefined =>
  projects.find((p) => p.slug === slug);
