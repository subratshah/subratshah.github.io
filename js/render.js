// Data -> HTML strings. No state here; app.js decides what to show.
(function () {
  var S = window.SITE, CASES = window.CASES, SUBS = window.SUBS;

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; });
  }
  function map(a, f) { return a.map(f).join(''); }

  // Sub-sections that have text, numbered by position. Index and page both use this.
  function subsFor(c) {
    return SUBS.filter(function (s) { return c.sections[s.key]; })
      .map(function (s, i) { return { key: s.key, label: s.label, id: c.id + '-' + s.key, num: String(i + 1) }; });
  }

  // Contact icons (simple inline SVGs, brand-tinted). Keyed by the `label` in data/site.js.
  var ICONS = {
    email: ['#4aa3ff', '<svg viewBox="0 0 24 24"><rect x="8" y="5" width="15" height="14" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M8.5 6.5l7 6 7-6" fill="none" stroke="currentColor" stroke-width="1.6"/><rect x="1" y="7" width="12" height="10" rx="1.5" fill="currentColor"/><circle cx="7" cy="12" r="2.6" fill="none" stroke="#101215" stroke-width="1.6"/></svg>'],
    linkedin: ['#4a9eea', '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"/></svg>'],
    github: ['#e8e8e3', '<svg viewBox="0 0 16 16"><path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>'],
    location: ['#ea4335', '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z"/></svg>']
  };
  // Android mascot, used as the profile image on every phone screen.
  var ANDY = '<svg viewBox="0 0 24 24" aria-hidden="true"><g fill="#3ddc84"><path d="M6.4 9.2a5.6 5.6 0 0111.2 0z"/><path d="M6.4 10.1h11.2v5.7a1.6 1.6 0 01-1.6 1.6H8a1.6 1.6 0 01-1.6-1.6z"/><rect x="3.4" y="10.1" width="2" height="5.8" rx="1"/><rect x="18.6" y="10.1" width="2" height="5.8" rx="1"/><rect x="8.6" y="15.6" width="2.2" height="4.8" rx="1.1"/><rect x="13.2" y="15.6" width="2.2" height="4.8" rx="1.1"/></g><path d="M8.9 4.5L7.8 2.7M15.1 4.5l1.1-1.8" stroke="#3ddc84" stroke-width=".8" stroke-linecap="round" fill="none"/><circle cx="9.7" cy="7.2" r=".6" fill="#0b0c0e"/><circle cx="14.3" cy="7.2" r=".6" fill="#0b0c0e"/></svg>';
  function icon(key) {
    var i = ICONS[key];
    return i ? '<i class="ico" style="color:' + i[0] + '" aria-hidden="true">' + i[1] + '</i>' : '';
  }
  function link(c) {
    var ext = /^https?:/.test(c.href) ? ' target="_blank" rel="noopener"' : '';
    return '<a href="' + esc(c.href) + '"' + ext + '>' + esc(c.value) + '</a>';
  }

  function resumeBtn(cls, text) {
    return S.resume ? '<a class="' + cls + '" href="' + esc(S.resume) + '" download="Subrat Shah Resume.pdf">' + text + '</a>' : '';
  }

  function caseHTML(c) {
    var adr = c.adr;
    return '<article class="case" data-sec="' + c.id + '">' +
      '<div class="meta">case-' + c.n + ' · ' + c.org + ' · ' + c.year + ' · ' + esc(c.role) + '</div>' +
      '<h2>' + esc(c.title) + '</h2>' +
      '<div class="case-metrics">' + map(c.metrics, function (m) { return '<span>' + esc(m) + '</span>'; }) + '</div>' +
      '<dl class="adr"><dt>shipped</dt><dd>' + esc(adr.shipped) + '</dd>' +
      '<dt>decision</dt><dd>' + esc(adr.decision) + '</dd>' +
      (adr.tradeoff ? '<dt>tradeoff</dt><dd>' + esc(adr.tradeoff) + '</dd>' : '') + '</dl>' +
      map(subsFor(c), function (s) {
        var arch = s.key === 'architecture' ?
          '<div class="layers">' + map(c.layers, function (l) { return '<div class="layer">' + esc(l) + '</div>'; }) +
          '<div class="cross">' + map(c.cross, function (x) { return '<div>cross-cut · ' + esc(x) + '</div>'; }) + '</div></div>' : '';
        return '<div class="subsec" data-k="' + s.key + '" data-sec="' + s.id + '"><div class="label">' + s.label + '</div>' + arch +
          '<p class="body">' + esc(c.sections[s.key]) + '</p></div>';
      }) + '</article>';
  }

  function mainHTML() {
    var intro =
      '<section class="sec" data-sec="intro">' +
        '<div class="about" data-sec="intro-about"><div class="meta">' + esc(S.eyebrow) + '</div>' +
          '<h1 class="headline">' + esc(S.headline) + '</h1><p class="lede">' + esc(S.lede) + '</p></div>' +
        '<div class="metrics" data-sec="intro-metrics">' + map(S.metrics, function (m) {
          return '<div class="metric"><b>' + esc(m.v) + '</b><span>' + esc(m.l) + '</span></div>'; }) + '</div>' +
        '<div class="subsec" data-sec="intro-signals"><div class="label">1.3 / capability signals</div><div class="cards signals">' +
          map(S.signals, function (s) { return '<div class="card"><b>' + esc(s.name) + '</b><span>' + esc(s.text) + '</span></div>'; }) + '</div></div>' +
        '<div class="subsec" data-sec="intro-howiwork"><div class="label">1.4 / how i work</div><div class="stack">' +
          map(S.principles, function (p, i) { return '<div class="principle"><i>' + (i + 1) + '</i><span>' + esc(p) + '</span></div>'; }) + '</div></div>' +
      '</section>';

    var timeline =
      '<section class="sec" style="gap:14px" data-sec="timeline"><div class="label">2 / experience</div><div class="spine">' +
      map(S.timeline, function (t) {
        var chips = map(CASES.filter(function (c) { return c.org === t.org; }), function (c) {
          return '<a class="chip" href="#' + c.id + '" data-go="' + c.id + '">' + esc(c.short) + ' →</a>'; });
        var levels = t.levels ? '<div class="meta" style="margin-top:6px">growth</div><ol class="levels">' + map(t.levels, function (l) { return '<li><i></i><span>' + esc(l) + '</span></li>'; }) + '</ol>' : '';
        return '<div class="job"><i class="node"></i><div class="meta">' + esc(t.when) + '</div><div class="what">' + esc(t.what) + '</div>' + levels +
          (chips ? '<div class="chips">' + chips + '</div>' : '') +
          (t.notes ? '<ul class="notes">' + map(t.notes, function (n) { return '<li><b>' + esc(n.t) + '</b> ' + esc(n.x) + '</li>'; }) + '</ul>' : '') + '</div>';
      }) + '</div></section>';

    // skill stack: one comfortable row per group (name left, items right), no boxes
    var stack =
      '<section class="sec ruled" data-sec="stack"><div class="label">3 / skill stack</div><div class="stackrows">' +
      map(S.stack, function (g, i) {
        return '<div class="srow" data-sec="stack-' + i + '"><b>' + esc(g.name) + '</b><span>' + esc(g.items) + '</span></div>'; }) + '</div></section>';

    var contact =
      '<section class="sec ruled" data-sec="contact"><div class="label">5 / contact</div>' +
      '<h2 class="cta">Get in touch.</h2><div class="cta-sub">' + esc(S.where) + '</div><div class="contacts">' +
      map(S.contact, function (c) {
        return '<div class="contact-row" data-sec="contact-' + c.label + '"><span>' + icon(c.label) + c.label + '</span>' +
          (c.href ? link(c) : '<span>' + esc(c.value) + '</span>') + '<em>→</em></div>'; }) + '</div>' +
      '<div class="updated">last updated ' + esc(S.updated) + '</div></section>';

    var C = S.credentials;
    function rows(list) { return map(list, function (e) { return '<span class="when">' + esc(e.when) + '</span><div><span class="what">' + esc(e.what) + '</span><div class="meta">' + esc(e.where) + '</div></div>'; }); }
    function links(p) { return p.links.length ? '<span class="links">' + map(p.links, function (l) { return '<a href="' + esc(l.href) + '" target="_blank" rel="noopener">' + esc(l.label) + ' ↗</a>'; }) + '</span>' : ''; }
    var edu =
      '<section class="sec ruled" data-sec="edu"><div class="label">4 / education &amp; projects</div>' +
        '<div class="subsec" data-k="education" data-sec="edu-degree"><div class="label">education</div><div class="timeline">' + rows(C.education) + '</div></div>' +
        '<div class="subsec" data-k="awards" data-sec="edu-awards"><div class="label">awards</div><div class="timeline">' + rows(C.awards) + '</div></div>' +
        '<div class="subsec" data-k="projects" data-sec="edu-projects"><div class="label">projects</div><div class="projlist">' +
          map(C.projects, function (p) { return '<div class="proj-item"><div><b>' + esc(p.what) + '</b>' + (p.detail ? '<span>' + esc(p.detail) + '</span>' : '') + '</div>' + links(p) + '</div>'; }) + '</div></div>' +
      '</section>';

    return intro + timeline + map(CASES, caseHTML) + stack + edu + contact;
  }

  window.R = {
    esc: esc, map: map, icon: icon, andy: ANDY, subsFor: subsFor, mainHTML: mainHTML,
    // screens live in js/phone-screens.js (loaded after this file)
    phoneHTML: function (kind) { var P = window.PHONE_SCREENS; return (P[kind] || P.profile)(); },
    resumeBtn: resumeBtn
  };
})();
