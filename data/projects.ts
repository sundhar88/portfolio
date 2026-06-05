// Project data — 8 unique case studies
// Highly accessible and premium accent colors

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
    slug: 'clarity-ds',
    title: 'Clarity DS',
    subtitle: 'Building a unified design language across 12 product teams',
    type: ['Design System', 'Component Library'],
    year: '2024',
    duration: '6 months',
    role: 'Lead Product Designer',
    tags: ['Figma', 'Design Tokens', 'Accessibility', 'Documentation'],
    accentColor: '#6366F1', // Accessible Indigo
    outcomes: ['Reduced design debt by 60%', 'Improved release velocity by 40%', 'WCAG AA compliant'],
    coverGradient: 'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)',
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
    slug: 'orbit-revamp',
    title: 'Orbit Revamp',
    subtitle: 'Redesigning a SaaS dashboard to increase user retention by 35%',
    type: ['Product Revamp', 'UX Research'],
    year: '2023',
    duration: '4 months',
    role: 'Product Designer',
    tags: ['User Research', 'Prototyping', 'Analytics', 'SaaS'],
    accentColor: '#14B8A6', // Accessible Teal
    outcomes: ['35% increase in retention', 'NPS improved from 23 to 61', 'Support tickets down 28%'],
    coverGradient: 'linear-gradient(135deg, #14B8A6 0%, #0D9488 100%)',
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
    slug: 'access-first',
    title: 'Access First',
    subtitle: 'Bringing a fintech platform to full WCAG 2.1 AA compliance',
    type: ['Accessibility', 'Design System'],
    year: '2023',
    duration: '3 months',
    role: 'Product Designer',
    tags: ['Accessibility', 'WCAG', 'Audit', 'Fintech'],
    accentColor: '#EC4899', // Accessible Rose Pink
    outcomes: ['Full WCAG 2.1 AA', 'Improved satisfaction for 100K+ users', 'Zero critical violations'],
    coverGradient: 'linear-gradient(135deg, #EC4899 0%, #D946EF 100%)',
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
    slug: 'nova-mobile',
    title: 'Nova Mobile',
    subtitle: 'Redesigning a mobile-first experience to reduce time-to-action',
    type: ['Product Revamp', 'Mobile Design'],
    year: '2022',
    duration: '5 months',
    role: 'Lead Product Designer',
    tags: ['Mobile', 'iOS', 'Android', 'Prototyping', 'Motion'],
    accentColor: '#06B6D4', // Accessible Cyan
    outcomes: ['50% reduction in time-to-action', '4.7★ App Store rating', 'Featured by Apple'],
    coverGradient: 'linear-gradient(135deg, #06B6D4 0%, #0891B2 100%)',
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
  {
    id: '05',
    slug: 'apex-portal',
    title: 'Apex Portal',
    subtitle: 'Streamlining developer workflows and API integration hubs',
    type: ['Web Platform', 'Developer Tools'],
    year: '2024',
    duration: '4 months',
    role: 'Staff Designer',
    tags: ['API Design', 'DX', 'Developer Tools', 'React'],
    accentColor: '#F59E0B', // Accessible Amber
    outcomes: ['API integration time cut by 75%', 'Active developers up 120%', 'Zero support backlog'],
    coverGradient: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
    description:
      'Re-architecting the developer console and API playground to lower onboarding hurdles and enhance integration reliability.',
    challenge:
      'Developers struggled with outdated documentation and complex manual setup steps, causing over 40% of integrations to be abandoned mid-way.',
    solution:
      'Designed interactive sandbox playgrounds, self-documenting code snippets, and custom dashboard monitoring to track API health.',
    impact: [
      { metric: '75%', value: '75', label: 'Integration time saved' },
      { metric: '120%', value: '120', label: 'Developer growth' },
      { metric: '99.9%', value: '99', label: 'Sandbox uptime' },
      { metric: '0', value: '0', label: 'Onboarding support backlog' },
    ],
  },
  {
    id: '06',
    slug: 'zenith-pay',
    title: 'Zenith Pay',
    subtitle: 'Reimagining mobile peer-to-peer money transfers safely',
    type: ['Fintech App', 'Interaction Design'],
    year: '2023',
    duration: '6 months',
    role: 'Lead UX Designer',
    tags: ['Security', 'Biometrics', 'Micro-interactions', 'Payments'],
    accentColor: '#10B981', // Accessible Emerald
    outcomes: ['Transaction volume doubled', 'Fraud claims reduced by 80%', '98% transaction success rate'],
    coverGradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
    description:
      'Designing an ultra-secure and seamless P2P payment flow that eliminates user anxiety during large-sum transfers.',
    challenge:
      'High anxiety around money transfers led to visual double-checking and low transaction conversion, combined with rising support ticket numbers.',
    solution:
      'Developed real-time recipient verification prompts, smart biometric authorization overlays, and dynamic receipt micro-animations.',
    impact: [
      { metric: '2.0x', value: '2', label: 'Transaction volume growth' },
      { metric: '80%', value: '80', label: 'Fewer fraud reports' },
      { metric: '98%', value: '98', label: 'Transaction success rating' },
      { metric: '0.1s', value: '0', label: 'Instant biometric validation' },
    ],
  },
  {
    id: '07',
    slug: 'equinox-ai',
    title: 'Equinox AI',
    subtitle: 'Visualizing predictive machine learning models in real-time',
    type: ['AI Platform', 'Data Visualization'],
    year: '2024',
    duration: '5 months',
    role: 'Principal UI/UX Designer',
    tags: ['AI/ML', 'Data Viz', 'D3.js', 'Complex Systems'],
    accentColor: '#8B5CF6', // Accessible Violet
    outcomes: ['Decisions accelerated by 50%', 'Complex chart errors down 90%', 'NPS increased by 38 points'],
    coverGradient: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
    description:
      'Building responsive D3 visualizations to explain machine learning inference paths to risk analysts.',
    challenge:
      'Analyst teams mistrusted AI predictions because the models functioned as "black boxes" with no visual explanation of decision metrics.',
    solution:
      'Designed a multi-dimensional scatterplot matrix and hierarchical explainability diagrams that break down predictive weighting.',
    impact: [
      { metric: '50%', value: '50', label: 'Faster model analysis' },
      { metric: '90%', value: '90', label: 'Fewer chart misinterpretations' },
      { metric: '+38', value: '38', label: 'NPS improvement score' },
      { metric: '10M+', value: '10', label: 'Daily data points rendered' },
    ],
  },
  {
    id: '08',
    slug: 'pulse-health',
    title: 'Pulse Health',
    subtitle: 'Creating a supportive wearable interface for cardiac wellness',
    type: ['Healthcare', 'Wearable Design'],
    year: '2023',
    duration: '4 months',
    role: 'Product Designer',
    tags: ['Healthtech', 'Wearables', 'Accessibility', 'IoT'],
    accentColor: '#EF4444', // Accessible Coral Red
    outcomes: ['Patient compliance increased by 45%', 'Daily active usage up 92%', 'Class II FDA cleared'],
    coverGradient: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
    description:
      'Designing an intuitive mobile and smartwatch pairing interface to track cardiovascular exercises under doctor supervision.',
    challenge:
      'Elderly heart patients found the tracking controls too small, confusing to pair, and highly stressful during alert warnings.',
    solution:
      'Introduced high-contrast oversized touch zones, vibration-guided UI transitions, and an optimistic color-feedback palette.',
    impact: [
      { metric: '45%', value: '45', label: 'Higher therapy adherence' },
      { metric: '92%', value: '92', label: 'Daily app engagements' },
      { metric: 'FDA', value: 'FDA', label: 'Class II software clearance' },
      { metric: 'Zero', value: '0', label: 'Sync disconnect tickets' },
    ],
  },
];

export const getProjectBySlug = (slug: string): Project | undefined =>
  projects.find((p) => p.slug === slug);
