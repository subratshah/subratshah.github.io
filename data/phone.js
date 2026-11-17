// Mock content shown on the phone for each screen. Placeholder values: replace with your own.
// profile (intro/timeline) and contact are built from data/site.js; stack lists the stack group names from data/site.js.
// Don't use real product, app, person or internal names for work projects here.
window.PHONE_DATA = {
  status: { time: '11:11' },

  // case 1: ai plugin marketplace (content taken from the subrat-ai and interview-prep repos)
  cli: {
    terminal: [
      { k: 'cmd', x: '$ plugin install subrat-ai' },
      { k: 'out', x: '✓ resolved subrat-ai@3.2.0' },
      { k: 'out', x: '✓ 39 skills · hooks enabled' },
      { k: 'out', x: '✓ hosts: claude · codex · cursor' },
      { k: 'cmd', x: '$ /test-improve', gap: true },
      { k: 'out', x: '→ reading acceptance criteria' },
      { k: 'out', x: '→ 4 unit tests scaffolded' },
      { k: 'done', x: 'done in 3.2s' }
    ],
    title: 'subrat-ai',
    count: '39 skills',
    // skills shown in the list (all from the subrat-ai plugin)
    plugins: [
      { name: 'captain', ver: 'route to the smallest safe workflow', installed: true },
      { name: 'plan-spec', ver: 'write a decision-complete spec', installed: true },
      { name: 'plan-lld', ver: 'low-level design before code', installed: true },
      { name: 'commit-strategy', ver: 'group and stage commits', installed: true },
      { name: 'fact-check', ver: 'verify claims against sources', installed: true }
    ]
  },

  // case 2: feed redesign
  feed: {
    title: 'Feed',
    tabs: ['All', 'Friends', 'You'],
    posts: [
      { name: 'Suman', meta: '2h · friends', text: 'Dinner at the new place', likes: 12, sending: true, image: true },
      { name: 'Aman', meta: '2h · friends', text: 'Paid back for concert tickets', likes: 4 },
      { name: 'Aayushman', meta: '2h · friends', text: 'Weekend trip split, thanks all', likes: 7 }
    ]
  },

  // case 3: split p2p
  split: {
    title: '← Split payment',
    totalLabel: 'total',
    total: '₹2,400',
    avatars: 4,
    addLabel: '+ add',
    evenly: 'Split evenly',
    rows: [['Suman', '₹600'], ['Aman', '₹600'], ['Aayushman', '₹600']],
    payLabel: 'pay with',
    methods: ['Balance', 'Card', 'Bank'],
    button: 'Request ₹1,800'
  },

  // case 4: checkout & app-to-app (price is a rough placeholder, not a quote)
  checkout: {
    title: 'Checkout',
    tag: 'secure',
    item: { name: 'Nike Training Shoes', sub: 'qty 1 · size UK 9', price: '₹9,995' },
    lines: [['Subtotal', '₹9,995'], ['Shipping', 'Free'], ['Taxes', 'incl. GST']],
    total: ['Total', '₹9,995'],
    primary: 'Pay with wallet app ↗',
    secondary: 'Pay with card',
    sheet: { tag: 'app switch', title: 'Opening wallet app…', note: "You'll return here after approving. Eligibility checked.", cancel: 'Cancel', ok: 'Continue' }
  },

  // case 5: widget + compose
  widget: {
    time: '11:11',
    ampm: 'PM',
    date: 'Tue, 17 Nov',
    title: 'My vehicle',
    state: '● locked',
    charge: 'charge 73% · 423 km',
    pct: 73,
    actions: ['Unlock', 'Start', 'Locate'],
    apps: ['Phone', 'Maps', 'Mail', 'Photos']
  },

  // case 6: modularization
  modules: {
    title: 'Build scan',
    badge: '5x faster',
    before: ['before', '4m 10s'],
    after: ['after', '50s'],
    caption: 'incremental build · per module',
    // [module, total bar %, rebuilt bar %, rebuilt?]
    rows: [[':app', 30, 8, true], [':feature:vehicle', 90, 18, true], [':feature:trips', 70, 14, true], [':feature:account', 60, 12, true], [':core:network', 40, 0, false], [':core:di', 30, 0, false]],
    note: 'Only changed feature modules rebuild. Features plug in via Hilt and event-based navigation.'
  },

  // case 7: consolidation & caching
  cache: {
    title: 'Vehicle status',
    badge: 'IN',
    banner: 'Offline · showing cached data from 2 min ago',
    tabs: ['IN', 'EU', 'US', '+4'],
    tiles: [['Fuel', '64%'], ['Odometer', '18,240 km'], ['Tyres', 'OK'], ['Doors', 'Locked']],
    tileNote: 'cached',
    // [label, value, good?]
    checks: [['Room cache', 'hit', true], ['Primary API', 'timeout', false], ['Fallback API', 'ok', true]],
    footer: '1 app target · 7 regions · 40% faster loads'
  },

  // stack screen (names come from data/site.js)
  stack: { title: 'Skill stack' },

  // education & awards screen (rows come from data/site.js)
  credentials: { title: 'Education & projects' },

  // contact screen
  contact: { sub: 'open to remote', button: 'Contact' }
};
