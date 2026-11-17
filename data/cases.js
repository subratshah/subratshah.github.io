// Case studies. Text comes from .agents/content/portfolio-source.md (PayPal) and the résumé (Ford).
// Sub-sections without text are skipped in the page and the index.
// Keep contribution wording (primary owner / co-owner / contributor / coordinator) and don't claim a full production rollout for the feed redesign.

window.SUBS = [
  { key: 'context', label: 'context' },
  { key: 'myrole', label: 'my role' },
  { key: 'constraints', label: 'constraints' },
  { key: 'architecture', label: 'architecture' },
  { key: 'rollout', label: 'rollout' },
  { key: 'outcome', label: 'outcome' },
  { key: 'next', label: 'next' }
];

window.CASES = [
  {
    org: 'paypal', year: '2026', role: 'creator', title: 'AI plugin marketplace', short: 'ai plugins', phone: 'cli',
    metrics: ['50+ engineers', '6 teams', '75% less setup effort', '30% faster lead time'],
    layers: ['distribution · versioned marketplace', 'install · one-command cli', 'plugins · permission-scoped skills', 'scaffolding · acceptance criteria → unit tests'],
    cross: ['agent-host portability', 'usage analytics'],
    adr: {
      shipped: '2026 H1 · in progress',
      decision: 'Domain-scoped, versioned packages with least-privilege metadata and one-command install; generated test starting points rather than opaque end-to-end code replacement.',
      tradeoff: 'Adoption needed versioning and declared permissions, and productivity claims stay scoped to measured setup work.'
    },
    sections: {
      context: 'Engineering teams needed reusable AI workflows that could be discovered, installed, governed, and applied to repetitive implementation setup rather than remaining isolated personal scripts.',
      myrole: 'Built a versioned internal distribution model for reusable AI workflows, created acceptance-criteria-driven unit-test scaffolding, and enabled selected cross-platform implementation through shared specifications and AI assistance.',
      constraints: 'Adoption required versioning, domain boundaries, declared permissions, predictable installation, and practical workflows that preserved human review. Productivity claims also needed to stay scoped to measured setup work.',
      architecture: 'Used domain-scoped packages, least-privilege metadata, explicit versioning, one-command installation, and generated test starting points rather than opaque end-to-end code replacement.',
      rollout: 'Distribution model implemented and merged for internal engineering use. A pilot made the tooling portable across native agent hosts; broader portability adoption is still in progress.',
      outcome: 'Made reusable AI workflows easier and safer to adopt and improved consistency in test setup. Cut cross-platform setup effort 75% and feature lead time 30%, adopted by 50+ engineers across 6 teams.',
      next: 'Widen portability beyond the completed pilot across native agent hosts, and keep measuring setup effort per workflow.'
    }
  },
  {
    org: 'paypal', year: '2026', role: 'android tech lead', title: 'Venmo feed redesign', short: 'feed redesign', phone: 'feed',
    metrics: ['5 sprints', '4 staged ramps', '0 rollbacks', '11 card types'],
    layers: ['ui · compose card renderers (11)', 'state · reactive store, optimistic update + rollback', 'domain · feed + reactions use cases', 'data · repository, api, cache'],
    cross: ['feature flags', 'analytics (15 props)'],
    adr: {
      shipped: '2026 H1',
      decision: 'Layered feature modules, navigation owned at the host boundary, optimistic updates with rollback, and isolated feature gates.',
      tradeoff: 'Optimistic actions can fail, so state needs a rollback path, and features had to be enableable independently.'
    },
    sections: {
      context: 'Venmo needed to replace a central Android experience while preserving independent delivery, accessibility, measurement, and controlled release behavior.',
      myrole: 'Led Android architecture and co-owned implementation from platform foundations through interaction features, analytics, accessibility, feature controls, observability integration, and release readiness.',
      constraints: 'A new modular interface, several interaction paths, reactive state, navigation integration, analytics, accessibility, and rollout dependencies all had to land together. A safe design also had to tolerate failed optimistic actions.',
      architecture: 'Separated the experience into layered feature modules, kept navigation ownership at the host boundary, used reactive state with optimistic updates and rollback, isolated feature gates, and paired the implementation with analytics, accessibility, and monitoring.',
      rollout: 'Coordinated ramp health reviews under explicit monitoring and approval controls, and advanced through 4 staged ramps with 0 rollbacks.',
      outcome: 'Reached code completion and sign-off with a metrics-driven rollout path, then advanced through the staged ramps with no rollbacks.',
      next: 'Reuse the same health signals and approval gates for follow-up feed releases.'
    }
  },
  {
    org: 'paypal', year: '2025', role: 'mobile hld owner', title: 'Venmo split P2P', short: 'split p2p', phone: 'split',
    metrics: ['25% lower abandonment', '3 payment methods', 'guarded rollout'],
    layers: ['ui · reusable, accessible split components', 'flow · split journey state', 'domain · payment-method selection', 'data · payments api'],
    cross: ['crash attribution', 'rollout guardrails'],
    adr: {
      shipped: '2025 H2',
      decision: 'Reusable, accessible components over established service boundaries, with feature controls and staged rollout designed in from the start.',
      tradeoff: 'Method-specific behavior had to fit one consistent interface while keeping enough control for testing and gradual release.'
    },
    sections: {
      context: 'Venmo needed one coherent mobile split-payment experience across multiple payment methods rather than parallel, inconsistent implementations.',
      myrole: 'Primary owner of the mobile high-level design. Contributed to implementation completion, resolved follow-up quality issues, and defined observability and ramp guardrails. This was shared delivery, not sole end-to-end ownership.',
      constraints: 'The design had to reuse existing services, support a consistent and accessible interface, manage method-specific behavior, and create enough control for testing and gradual release.',
      architecture: 'Designed reusable interface components, reused established service boundaries, and included accessibility and test strategy from the start.',
      rollout: 'Defined feature controls, staged rollout, crash attribution, analytics validation, segmentation, and pause criteria.',
      outcome: 'Completed the mobile modernization with follow-up defect resolution. The release approach made quality signals and investigation thresholds visible before broader exposure, and split-payment abandonment fell 25%.',
      next: 'Reuse the split components and guardrails for other multi-party payment journeys.'
    }
  },
  {
    org: 'paypal', year: '2025', role: 'senior engineer', title: 'Native checkout & app-to-app', short: 'checkout', phone: 'checkout',
    metrics: ['modular client layers', 'return / cancel / eligibility paths'],
    layers: ['ui · checkout screens', 'routing · app-switch deep links', 'client · shared checkout layer', 'data · api integration'],
    cross: ['test bed', 'eligibility checks'],
    adr: {
      shipped: '2025 H1',
      decision: 'Explicit return and cancellation paths, centralized eligibility routing, and shared data kept apart from feature-specific layers.',
      tradeoff: 'Unfinished experiment and rollout work stays separate from the completed flow logic, so release claims cover completed work only.'
    },
    sections: {
      context: 'A high-volume mobile checkout journey needed stronger Android foundations and support for switching securely between applications across eligible payment paths.',
      myrole: 'Implemented Android checkout foundations across API integration and modular client layers, reviewed adjacent changes, enabled app-to-app flow behavior and test-bed support, and primarily owned the completed routing design.',
      constraints: 'The flow crossed API, shared-data, navigation, return, cancellation, eligibility, and test-environment boundaries, and routing behavior needed to be explicit.',
      architecture: 'Defined explicit return and cancellation paths, centralized eligibility routing, separated shared data from feature-specific layers, and kept a testable boundary around the completed flow logic.',
      rollout: 'Core enablement and validation infrastructure are complete. Later experiment and rollout work is excluded from this claim.',
      outcome: 'Established reusable checkout capabilities and validation infrastructure, and reduced ambiguity in cross-application routing.',
      next: 'Build on the shared checkout layer for further eligible payment paths once the experiment work lands.'
    }
  },
  {
    org: 'ford', year: '2023', role: 'senior engineer', title: 'Home-screen widget & Compose', short: 'widget + compose', phone: 'widget',
    metrics: ['first android widget', '10+ screens to compose'],
    layers: ['widget · app widget host', 'ui · compose screens', 'nav · compose navigation', 'data · vehicle status repository'],
    cross: ['design system', 'ui tests'],
    adr: {
      shipped: '2023',
      decision: 'App Widgets for the home-screen widget, and Jetpack Compose with Compose Navigation for the screens that moved off XML Views.'
    },
    sections: {
      context: 'The vehicle app had never had a home-screen widget, a top customer request, and its screens were still built on XML Views.',
      myrole: 'Shipped the first Android home-screen widget and migrated 10+ screens from XML Views to Jetpack Compose with Compose Navigation.',
      architecture: 'A widget host on App Widgets, Compose screens with Compose Navigation, and a vehicle-status repository behind both.',
      outcome: 'The first home-screen widget shipped, and 10+ screens now run on Jetpack Compose.'
    }
  },
  {
    org: 'ford', year: '2021', role: 'software engineer', title: 'Modularization', short: 'modularization', phone: 'modules',
    metrics: ['5x faster incremental builds', 'parallel squads'],
    layers: ['app · shell', 'features · plug-and-play modules', 'di · dagger-hilt graph', 'nav · event-based navigation'],
    cross: ['build config', 'ownership boundaries'],
    adr: {
      shipped: '2021',
      decision: 'Plug-and-play Dagger-Hilt feature modules connected through event-based navigation (micro-frontends).'
    },
    sections: {
      myrole: 'Cut incremental build times 5x with plug-and-play Dagger-Hilt feature modules and event-based navigation (micro-frontends).',
      architecture: 'An app shell hosting feature modules that plug in through a Dagger-Hilt graph and talk to each other through navigation events.',
      outcome: 'Incremental builds ran 5x faster.'
    }
  },
  {
    org: 'ford', year: '2020', role: 'software engineer', title: 'Regional consolidation & caching', short: 'consolidation', phone: 'cache',
    metrics: ['7+ variants → 1 target', '40% faster loads'],
    layers: ['app · single target', 'config · regional di modules', 'cache · room + rxjava, offline-first', 'network · fallback apis'],
    cross: ['region flags', 'e2e tests'],
    adr: {
      shipped: '2020',
      decision: 'One app target with regional behavior supplied through a dependency-injection rework, plus offline-first Room and RxJava caching.'
    },
    sections: {
      myrole: 'Merged 7+ regional build variants into one app target through a dependency-injection rework, and added offline-first Room + RxJava caching.',
      architecture: 'A single app target, regional dependency-injection modules, an offline-first Room cache, and fallback APIs behind it.',
      outcome: '7+ regional variants became one app target, and loads were 40% faster.'
    }
  }
].map(function (c, i) { c.n = i + 1; c.id = 'c' + (i + 1); return c; });
