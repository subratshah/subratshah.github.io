// Site-wide copy. Edit here, no build step needed (only index.html needs `node scripts/compose-html.mjs` if the shell changes).
window.SITE = {
  name: 'Subrat Shah',
  wordmark: 'subrat.shah',
  title: 'Senior Android Engineer',
  where: 'Hyderabad · open to remote',
  role: 'Senior Android Engineer · Hyderabad',
  eyebrow: '// senior android engineer · hyderabad',
  headline: 'Senior Software Engineer delivering at Staff-level scope.',
  lede: 'I am a mobile engineer who combines deep Android architecture with dependable execution across ambiguous, cross-team initiatives. I lead technical direction, carry complex work from design through safe rollout, and build reusable AI and developer-productivity systems that increase engineering leverage without overstating individual ownership.',
  // Download buttons are hidden while empty. To publish a résumé: add resume.pdf (it is gitignored for now) and set this to 'resume.pdf'.
  resume: '',
  // Hand-edit when you change the page.
  updated: '2026-11',
  // companies, newest first (shown in place of metrics)
  metrics: [
    { v: 'PayPal', l: '2025 — 2026' },
    { v: 'Ford', l: 'Feb 2019 — Dec 2024' },
    { v: 'Infosys', l: 'Aug 2018 — Jan 2019' }
  ],
  signals: [
    { name: 'mobile architecture', text: 'Designs modular Android systems with clear state, navigation, accessibility, analytics, and integration boundaries.' },
    { name: 'delivery leadership', text: 'Turns ambiguous initiatives into executable tracks and carries them through implementation, review, release readiness, and measured rollout.' },
    { name: 'ai productivity', text: 'Builds reusable, permission-aware AI workflows and test tooling that reduce repetitive setup while preserving engineering judgment.' },
    { name: 'cross-team influence', text: 'Improves review practices, makes dependencies visible, mentors engineers across platforms, and aligns technical decisions across system boundaries.' }
  ],
  principles: [
    'Decompose ambiguous journeys into independently deliverable tracks.',
    'Pair architecture decisions with observability, testing, and rollout controls.',
    'Build reusable leverage instead of repeating manual setup.',
    'Make cross-team dependencies and review capacity visible.',
    'Treat documentation as an execution interface.'
  ],
  timeline: [
    {
      when: '2025 — 2026', what: 'Senior SWE · PayPal', org: 'paypal',
      notes: [
        { t: 'payment recommendations', x: 'Mapped authentication tiers, token expiry/refresh and request/response semantics before a recommendation integration; added instrumentation exposing state-dependent risks early.' },
        { t: 'technical leadership', x: 'Raised PR throughput 25% by fixing approval-retention friction and documenting review norms; reviewed 28 PRs and HLD/LLD/ADRs for 6 teammates; mentored 8+ engineers in a cross-platform upskilling program; added CI traceability; led cross-system contract discovery.' }
      ]
    },
    {
      when: '2019 — 2024', what: 'Ford', org: 'ford',
      // newest first; the résumé gives Software Engineer → Senior Software Engineer, the junior stage is from you. Add years here if you want them shown.
      levels: ['senior software engineer', 'software engineer · mid-level', 'junior developer · joined Feb 2019'],
      notes: [
        { t: 'india launch', x: 'Launched the connected-car app for the Indian market with region-specific features and end-to-end testing.' },
        { t: 'quality & mentorship', x: 'Held the bug rate under 2% through unit and UI test coverage, intern coaching and code-kata sessions; promoted from Software Engineer to Senior Software Engineer.' }
      ]
    },
    {
      when: 'Aug 2018 — Jan 2019', what: 'Systems Engineer · Infosys', org: 'infosys',
      notes: [
        { t: 'sap abap', x: 'Developed SAP ABAP reports, enhancements and customizations for Materials Management (MM) client projects. Mysore.' }
      ]
    }
  ],
  // one group per résumé Skills row
  stack: [
    { name: 'languages & ui', items: 'Kotlin, Java, Python, Groovy, Jetpack Compose, Compose Navigation, Views (XML), Design Systems, Accessibility' },
    { name: 'architecture', items: 'Mobile System Design, MVVM, MVI, Clean Architecture, Modularization, Micro-frontends, Dagger-Hilt, SDKs, HLD/LLD' },
    { name: 'android & data', items: 'Android SDK, Jetpack, Coroutines/Flow, RxJava, Room, DataStore, WorkManager, LiveData, Retrofit/OkHttp' },
    { name: 'performance', items: 'Baseline Profiles, App Startup, ANR & Jank, Offline-First Caching, Crashlytics, Datadog, Analytics, A/B Testing' },
    { name: 'testing & apis', items: 'Unit & UI Testing, JUnit, Espresso, Mockito, Perfecto, SonarQube, Charles Proxy, Postman, REST APIs, GraphQL' },
    { name: 'build & release', items: 'Gradle, CI/CD, GitHub Actions, Jenkins, Concourse, Harness, Play Console, Feature Flags, Staged Rollouts' },
    { name: 'ai tooling', items: 'Claude Code, Codex, GitHub Copilot, Cursor, Agentic Development, Agent Skills, AI-Assisted SDLC' },
    { name: 'domains', items: 'Payments/Fintech, Automotive, Technical Leadership, Mentoring, Code Reviews, Cross-Functional, Agile/Scrum' }
  ],
  credentials: {
    education: [{ when: 'Jul 2014 — Jun 2018', what: 'Bachelor of Technology', where: 'Vellore Institute of Technology · Vellore' }],
    awards: [
      { when: 'Jun 2025', what: 'AI Workflow Enabler Award', where: 'PayPal' },
      { when: 'Mar 2023', what: 'Code Kata Presenter Award', where: 'Ford' }
    ],
    projects: [
      { what: 'AI Agent-Agnostic Plugin Marketplace', detail: 'Personal open-source project that inspired the internal PayPal plugin marketplace.', links: [{ label: 'github', href: 'https://github.com/subratshah/subrat-ai' }] },
      { what: 'Interview Prep', detail: 'Single-page app for senior mobile and SWE interview preparation.', links: [{ label: 'github', href: 'https://github.com/subratshah/interview-prep' }, { label: 'live', href: 'https://subratshah.github.io/interview-prep/' }] },
      { what: 'Unified Project Intelligence Tracker', detail: 'GitHub, Jira, Slack, Confluence', links: [] }
    ]
  },
  contact: [
    { label: 'email', value: 'subrat.shah@outlook.com', href: 'mailto:subrat.shah@outlook.com' },
    { label: 'linkedin', value: 'linkedin.com/in/subratshah', href: 'https://linkedin.com/in/subratshah' },
    { label: 'github', value: 'github.com/subratshah', href: 'https://github.com/subratshah' },
    { label: 'location', value: 'Hyderabad, India · open to remote', href: 'https://www.google.com/maps/search/?api=1&query=Hyderabad%2C+India' }
  ]
};
