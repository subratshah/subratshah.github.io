// Wires data -> DOM and keeps one piece of state: `active` (a data-sec id).
(function () {
  var CASES = window.CASES, S = window.SITE, R = window.R;
  var main = document.getElementById('main');
  var index = document.getElementById('index');
  var nav = document.getElementById('nav');
  var screen = document.getElementById('phoneScreen');
  var phone = document.getElementById('phone');
  var caption = document.getElementById('caption');
  var active = '', kind = '', els = {};

  main.innerHTML = R.mainHTML();
  // Desktop: every top-level block is a full-height page. One text/spacing scale (--ms) is used everywhere: the largest
  // at which the tallest page still fits the window, so type size stays consistent from page to page.
  function fitText() {
    var root = document.documentElement.style, pages = main.querySelectorAll(':scope > section, :scope > article'), j;
    if (window.innerWidth < 900) { root.removeProperty('--ms'); return; }
    var limit = main.clientHeight - 2, lo = 0.75, hi = 1.1, i;
    for (j = 0; j < pages.length; j++) pages[j].style.minHeight = '0';
    function tallest(v) { var t = 0; root.setProperty('--ms', v); for (var k = 0; k < pages.length; k++) t = Math.max(t, pages[k].offsetHeight); return t; }
    for (i = 0; i < 8; i++) { var mid = (lo + hi) / 2; if (tallest(mid) <= limit) lo = mid; else hi = mid; }
    lo = +lo.toFixed(3);
    while (tallest(lo) > limit && lo > 0.75) lo = +(lo - 0.01).toFixed(3); // wrapping is not perfectly monotonic
    for (j = 0; j < pages.length; j++) pages[j].style.minHeight = '';
  }
  var fitTimer;
  window.addEventListener('resize', function () { clearTimeout(fitTimer); fitTimer = setTimeout(fitText, 150); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitText);
  fitText();
  document.getElementById('statusTime').textContent = window.PHONE_DATA.status.time;
  document.getElementById('whoName').textContent = S.name;
  document.getElementById('whoRole').textContent = S.title;
  document.getElementById('whoMeta').textContent = S.where;
  document.getElementById('navResume').innerHTML = R.resumeBtn('btn-ac', '↓ download résumé');

  function caseOf(a) { return /^c\d/.test(a) ? CASES.filter(function (c) { return c.id === a.split('-')[0]; })[0] : null; }

  // The index tree: which rows exist for the active id.
  function rows(a) {
    var out = [], c = caseOf(a), inTimeline = a === 'timeline' || !!c;
    // `go` = the section to scroll to when the row is clicked (defaults to its own id).
    function row(id, label, lvl, on, go) { out.push({ id: id, label: label, lvl: lvl, on: on, go: go || id }); }
    function group(pre, num, label, kids) {
      row(pre, num + ' ' + label, 0, a === pre);
      if (a === pre || a.indexOf(pre + '-') === 0) kids.forEach(function (k, i) { row(k.id, num + '.' + (i + 1) + ' ' + k.label, 1, a === k.id); });
    }
    group('intro', '1', 'intro', [{ id: 'intro-about', label: 'about' }, { id: 'intro-metrics', label: 'companies' }, { id: 'intro-signals', label: 'signals' }, { id: 'intro-howiwork', label: 'how i work' }]);
    row('timeline', '2 experience', 0, a === 'timeline');
    if (inTimeline) {
      // company (level 1) -> case study (level 2); a company jumps to its first case
      ['paypal', 'ford'].forEach(function (org) {
        var mine = CASES.filter(function (x) { return x.org === org; });
        row('org-' + org, org, 1, false, mine[0].id);
        mine.forEach(function (x) { row(x.id, x.short, 2, !!c && c.id === x.id); });
      });
    }
    group('stack', '3', 'skill stack', S.stack.map(function (g, i) { return { id: 'stack-' + i, label: g.name }; }));
    row('edu', '4 education & projects', 0, a === 'edu' || a.indexOf('edu-') === 0);
    group('contact', '5', 'contact', S.contact.map(function (k) { return { id: 'contact-' + k.label, label: k.label }; }));
    return out;
  }

  // Reuse existing row elements so only newly revealed rows animate in.
  function renderNav(a) {
    var keep = {}, prev = null;
    rows(a).forEach(function (r) {
      var el = els[r.id];
      if (!el) {
        el = document.createElement('a');
        el.className = 'row l' + r.lvl + ' enter';
        el.style.setProperty('--lvl', r.lvl);
        el.textContent = r.label;
        el.href = '#' + r.go;
        el.setAttribute('data-go', r.go);
        el.addEventListener('animationend', function () { el.classList.remove('enter'); });
        els[r.id] = el;
      }
      el.classList.toggle('on', r.on);
      if (r.on) el.setAttribute('aria-current', 'location'); else el.removeAttribute('aria-current');
      keep[r.id] = 1;
      var want = prev ? prev.nextSibling : index.firstChild;
      if (el !== want) index.insertBefore(el, want);
      prev = el;
    });
    Object.keys(els).forEach(function (id) { if (!keep[id]) { els[id].remove(); delete els[id]; } });
  }

  function renderPhone(a) {
    var c = caseOf(a), inContact = a === 'contact' || a.indexOf('contact-') === 0;
    var inStack = a === 'stack' || a.indexOf('stack-') === 0;
    var inEdu = /^(edu|ap)(-|$)/.test(a);
    var next = c ? c.phone : inContact ? 'contact' : inStack ? 'stack' : inEdu ? 'credentials' : 'profile';
    var sub = c && a.indexOf('-') > 0 ? a.split('-')[1] : '';
    var subLabel = (window.SUBS.filter(function (s) { return s.key === sub; })[0] || {}).label;
    phone.setAttribute('data-sub', sub);
    caption.textContent = 'preview · ' + (c ? c.short + (subLabel ? ' · ' + subLabel : '') : (next === 'stack' ? 'skill stack' : next));
    if (next === kind) return;
    var first = !kind;
    kind = next;
    if (first) { screen.innerHTML = R.phoneHTML(kind); return; }
    screen.classList.add('out');
    setTimeout(function () { screen.innerHTML = R.phoneHTML(kind); screen.classList.remove('out'); }, 100);
  }

  // Index updates at once. The phone waits until the section has stayed active for 150ms, so scrolling
  // past sections doesn't flash intermediate screens. A click passes now=true: its target is final.
  var phoneTimer;
  function setActive(a, now) {
    if (a === active) return;
    active = a;
    renderNav(a);
    clearTimeout(phoneTimer);
    if (now) renderPhone(a); else phoneTimer = setTimeout(function () { renderPhone(a); }, 150);
    try { history.replaceState(null, '', '#' + a); } catch (e) { /* file:// or sandboxed frame */ }
  }

  function go(id, smooth) {
    if (!Spy.has(id)) return;
    setActive(id, true);
    Spy.go(id, smooth);
    nav.classList.remove('open');
  }

  document.addEventListener('click', function (e) {
    var t = e.target.closest ? e.target.closest('[data-go]') : null;
    if (!t) return;
    e.preventDefault();
    go(t.getAttribute('data-go'), true);
  });
  document.getElementById('navToggle').addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    this.setAttribute('aria-expanded', open);
  });
  window.addEventListener('hashchange', function () { go(location.hash.slice(1), false); });

  Spy.init(main, function (a) { setActive(a, false); });
  var start = location.hash.slice(1);
  setActive('intro', true);
  if (start && start !== 'intro') go(start, false);
})();
