// Phone screens (hi-fi). Content comes from data/phone.js (and data/site.js for profile/contact).
// data-hl marks the part tied to a case sub-section; css/phone.css outlines it while that sub-section is active.
(function () {
  var S = window.SITE, D = window.PHONE_DATA, R = window.R, E = R.esc, map = R.map;

  function bar(t, r) { return '<div class="p-bar">' + E(t) + (r ? '<small>' + r + '</small>' : '<span></span>') + '</div>'; }
  function line(a, b) { return '<div class="p-line"><span>' + E(a) + '</span><em>' + E(b) + '</em></div>'; }
  function av(px) { return '<span class="p-av" style="width:' + px + 'px;height:' + px + 'px">' + R.andy + '</span>'; }
  function tabs(list, cls, on) { return list.map(function (t, i) { return '<span' + (i === (on || 0) ? ' class="on"' : '') + '>' + E(t) + '</span>'; }).join(''); }

  window.PHONE_SCREENS = {
    profile: function () {
      return '<div class="p-center" style="display:flex;flex-direction:column;align-items:center;gap:4px;padding:2px 0 2px">' +
        av(48) + '<b style="font-size:12px;color:var(--fg)">' + E(S.name) + '</b>' +
        '<span style="font-size:9px;color:var(--p-tx)">' + E(S.role) + '</span></div>' +
        '<div class="p-grid2">' + map(S.metrics, function (m) { return '<div class="p-card" style="gap:2px;padding:8px"><span class="p-num">' + E(m.v) + '</span><span class="p-tx">' + E(m.l) + '</span></div>'; }) + '</div>' +
        '<div>' + map(S.signals, function (s) { return line(s.name, '›'); }) + '</div>' +
        (S.resume ? '<div class="p-btn" style="margin-top:auto">Download résumé</div>' : '');
    },

    contact: function () {
      var d = D.contact;
      return bar('Contact') +
        '<div class="p-center" style="display:flex;flex-direction:column;align-items:center;gap:4px;padding:10px 0 6px">' +
        av(48) + '<b style="font-size:12px;color:var(--fg)">' + E(S.name) + '</b>' +
        '<span style="font-size:9px;color:var(--p-tx)">' + E(d.sub) + '</span></div>' +
        map(S.contact, function (c) {
          return '<div class="p-card p-flat">' + R.icon(c.label) + '<div class="p-col"><span class="p-tx">' + c.label + '</span><span class="p-name" style="overflow-wrap:anywhere">' + E(c.value) + '</span></div>' + (c.href ? '<span class="p-tx">›</span>' : '') + '</div>';
        }) + '<div class="p-btn" style="margin-top:4px">' + E(d.button) + '</div>';
    },

    cli: function () {
      var d = D.cli;
      return '<div class="p-card" style="padding:0;overflow:hidden" data-hl="architecture"><div class="p-row" style="padding:5px 7px;border-bottom:1px solid var(--ln)">' +
        '<i class="p-dot" style="width:5px;height:5px;background:var(--ln2)"></i><i class="p-dot" style="width:5px;height:5px;background:var(--ln2)"></i><i class="p-dot" style="width:5px;height:5px;background:var(--ln2)"></i><span class="p-tx" style="margin-left:4px">terminal</span></div>' +
        '<div class="p-term">' + map(d.terminal, function (l) {
          var st = l.gap ? ' style="margin-top:5px"' : '';
          return l.k === 'cmd' ? '<b' + st + '>' + E(l.x) + '</b>' : l.k === 'done' ? '<u>' + E(l.x) + '</u>' : '<span>' + E(l.x) + '</span>';
        }) + '</div></div>' +
        bar(d.title, E(d.count)) +
        '<div style="display:flex;flex-direction:column;gap:5px" data-hl="outcome">' + map(d.plugins, function (p) {
          return '<div class="p-card p-flat"><span class="p-img" style="width:20px;height:20px"></span><div class="p-col"><span class="p-name">' + E(p.name) +
            '</span><span class="p-tx">' + E(p.ver) + '</span></div><span class="p-pill' + (p.installed ? '' : ' on') + '">' + (p.installed ? 'installed' : 'install') + '</span></div>';
        }) + '</div>';
    },

    feed: function () {
      var d = D.feed;
      function post(p, i) {
        var card = '<div class="p-card"><div class="p-row">' + av(20) + '<div class="p-col"><span class="p-name">' + E(p.name) + '</span><span class="p-tx">' + E(p.meta) + '</span></div>' +
          (p.sending ? '<span class="p-sending">sending…</span>' : '') + '</div><span class="p-txt">' + E(p.text) + '</span>' +
          (p.image ? '<div class="p-img" style="height:54px"></div>' : '') +
          '<div class="p-row" style="gap:10px"><span class="p-tx">♥ ' + E(p.likes) + '</span><span class="p-tx">comment</span><span class="p-tx" style="margin-left:auto">share</span></div></div>';
        return p.sending ? '<div data-hl="constraints">' + card + '</div>' : card;
      }
      return bar(d.title) + '<div class="p-row">' + d.tabs.map(function (t, i) { return '<span class="p-pill' + (i ? '' : ' on') + '" style="font-size:9px;padding:3px 9px">' + E(t) + '</span>'; }).join('') + '</div>' +
        '<div style="display:flex;flex-direction:column;gap:7px" data-hl="architecture">' + map(d.posts, post) + '</div>';
    },

    split: function () {
      var d = D.split, dots = '';
      for (var i = 0; i < d.avatars; i++) dots += av(24);
      return bar(d.title) +
        '<div class="p-center" style="display:flex;flex-direction:column;gap:2px;padding:6px 0"><span class="p-tx">' + E(d.totalLabel) + '</span><b style="font-size:22px;color:var(--fg)">' + E(d.total) + '</b></div>' +
        '<div class="p-row" style="justify-content:center;gap:4px">' + dots + '<span class="p-tx" style="margin-left:4px">' + E(d.addLabel) + '</span></div>' +
        '<div class="p-card p-flat" style="justify-content:space-between;padding:6px 8px"><span style="font-size:9px;color:var(--fg)">' + E(d.evenly) + '</span><span class="p-pill on" style="width:24px;height:13px;padding:0"></span></div>' +
        '<div data-hl="architecture">' + map(d.rows, function (r) { return line(r[0], r[1]); }) + '</div>' +
        '<span class="p-tx">' + E(d.payLabel) + '</span><div class="p-tiles" data-hl="constraints">' + tabs(d.methods) + '</div>' +
        '<div class="p-btn" data-hl="rollout" style="margin-top:4px">' + E(d.button) + '</div>';
    },

    checkout: function () {
      var d = D.checkout, s = d.sheet;
      return bar(d.title, E(d.tag)) +
        '<div class="p-card p-flat"><span class="p-img" style="width:34px;height:34px"></span><div class="p-col"><span class="p-name">' + E(d.item.name) + '</span><span class="p-tx">' + E(d.item.sub) + '</span></div><span class="p-name">' + E(d.item.price) + '</span></div>' +
        '<div data-hl="outcome">' + map(d.lines, function (r) { return '<div class="p-line" style="border:0;padding:4px 2px;color:var(--p-tx)"><span>' + E(r[0]) + '</span><span>' + E(r[1]) + '</span></div>'; }) +
        '<div class="p-line" style="border-top:1px solid var(--ln2);border-bottom:0;font-weight:700;font-size:10px"><span>' + E(d.total[0]) + '</span><span style="color:var(--fg)">' + E(d.total[1]) + '</span></div></div>' +
        '<div class="p-btn">' + E(d.primary) + '</div><div class="p-ghost">' + E(d.secondary) + '</div>' +
        '<div class="p-sheet" data-hl="architecture"><span class="p-tx" style="color:var(--ac)">' + E(s.tag) + '</span><b style="font-size:10px;color:var(--fg)">' + E(s.title) + '</b>' +
        '<span class="p-note">' + E(s.note) + '</span><div class="p-grid2"><span class="p-ghost" style="padding:7px;font-size:8.5px">' + E(s.cancel) + '</span><span class="p-btn" style="padding:7px;font-size:8.5px">' + E(s.ok) + '</span></div></div>';
    },

    widget: function () {
      var d = D.widget;
      return '<div class="p-wall"><div class="p-center" style="display:flex;flex-direction:column;gap:2px;padding-top:6px"><div><b style="font-size:40px;font-weight:400;color:var(--fg);letter-spacing:-.02em">' + E(d.time) + '</b><span style="font-size:11px;margin-left:4px;color:var(--p-tx)">' + E(d.ampm) + '</span></div><span class="p-tx">' + E(d.date) + '</span></div>' +
        '<div class="p-card p-widget" data-hl="architecture" style="margin-top:auto"><div class="p-row"><b style="font-size:9.5px;color:var(--fg);flex:1">' + E(d.title) + '</b><span style="font-size:7.5px;color:var(--ac)">' + E(d.state) + '</span></div>' +
        '<div class="p-row" style="gap:8px"><span class="p-img" style="width:62px;height:30px"></span><div class="p-col" style="gap:3px"><span class="p-tx">' + E(d.charge) + '</span><div class="p-track"><i style="width:' + +d.pct + '%;background:var(--ac)"></i></div></div></div>' +
        '<div class="p-tiles">' + tabs(d.actions, '', 1) + '</div></div>' +
        '<div class="p-apps">' + map(d.apps, function (a) { return '<div><span></span>' + E(a) + '</div>'; }) + '</div></div>';
    },

    stack: function () {
      // drawn as a layer stack: one full-width layer per group, shading deepens toward the base
      var d = D.stack;
      return bar(d.title, S.stack.length + ' layers') +
        '<div class="p-layers">' + map(S.stack, function (g, i) {
          return '<div class="p-layer" style="background:color-mix(in oklch,var(--ac) ' + (5 + i * 4) + '%,var(--bg2));border-color:color-mix(in oklch,var(--ac) ' + (28 + i * 7) + '%,var(--bg2))"><b>' + E(g.name) + '</b><span>' + E(g.items.split(', ').slice(0, 3).join(' · ')) + '</span></div>';
        }) + '</div>';
    },

    credentials: function () {
      var C = S.credentials, d = D.credentials;
      return bar(d.title) +
        '<span class="p-tx">education</span>' + map(C.education, function (e) {
          return '<div class="p-card"><span class="p-name">' + E(e.what) + '</span><span class="p-tx">' + E(e.where) + '</span><span class="p-tx">' + E(e.when) + '</span></div>'; }) +
        '<span class="p-tx" style="margin-top:4px">awards</span>' + map(C.awards, function (e) {
          return '<div class="p-card p-flat"><span class="p-pill on">' + E(e.when) + '</span><div class="p-col"><span class="p-name">' + E(e.what) + '</span><span class="p-tx">' + E(e.where) + '</span></div></div>'; }) +
        '<span class="p-tx" style="margin-top:4px">projects</span>' + map(C.projects, function (e) {
          return '<div class="p-line"><span>' + E(e.what) + '</span><em>›</em></div>'; });
    },

    modules: function () {
      var d = D.modules;
      return bar(d.title, '<span style="color:var(--ac)">' + E(d.badge) + '</span>') +
        '<div class="p-card p-grid2 p-center" style="gap:6px" data-hl="outcome"><div style="display:flex;flex-direction:column"><span class="p-tx">' + E(d.before[0]) + '</span><b style="font-size:15px;color:var(--fg)">' + E(d.before[1]) + '</b></div><div style="display:flex;flex-direction:column"><span class="p-tx">' + E(d.after[0]) + '</span><b style="font-size:15px;color:var(--ac)">' + E(d.after[1]) + '</b></div></div>' +
        '<span class="p-tx">' + E(d.caption) + '</span><div class="p-bars" data-hl="architecture">' +
        map(d.rows, function (r) { return '<div class="p-bar-row"><div><code>' + E(r[0]) + '</code><span style="color:' + (r[3] ? 'var(--ac)' : 'var(--p-tx)') + '">' + (r[3] ? 'rebuilt' : 'cached') + '</span></div><div class="p-track"><i style="width:' + +r[1] + '%"></i><i style="width:' + +r[2] + '%"></i></div></div>'; }) + '</div>' +
        '<div class="p-card p-note">' + E(d.note) + '</div>';
    },

    cache: function () {
      var d = D.cache;
      return bar(d.title, E(d.badge)) + '<div class="p-offline">' + E(d.banner) + '</div>' +
        '<div class="p-tabs">' + tabs(d.tabs) + '</div>' +
        '<div class="p-grid2">' + map(d.tiles, function (t) {
          return '<div class="p-card" style="gap:3px"><span class="p-tx">' + E(t[0]) + '</span><b style="font-size:11px;color:var(--fg)">' + E(t[1]) + '</b><span style="font-size:7px;color:var(--p-tx)">' + E(d.tileNote) + '</span></div>'; }) + '</div>' +
        '<div data-hl="architecture">' + map(d.checks, function (c) {
          return '<div class="p-line" style="font-size:8.5px"><span>' + E(c[0]) + '</span><span style="color:' + (c[2] ? 'var(--ac)' : 'var(--p-tx)') + '">' + E(c[1]) + '</span></div>'; }) + '</div>' +
        '<div class="p-note p-center" data-hl="outcome">' + E(d.footer) + '</div>';
    }
  };
})();
