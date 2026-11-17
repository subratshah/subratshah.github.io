// Scroll-spy + page navigation for the <main> column (only main scrolls).
// Spy rule (same as the design reference): the active id is the last [data-sec] whose top is within 120px of the viewport top.
// Desktop (>= 900px): every top-level block is a full-height page. Wheel and keys move exactly one page at a time with an
// eased animation (the browser's own snap scrolling felt jumpy); touch still uses CSS scroll-snap.
(function () {
  var main, going = false, settle, queued = false, onChange, animId = 0, lockUntil = 0;
  var calm = window.matchMedia('(prefers-reduced-motion: reduce)');

  function find(id) { return main.querySelector('[data-sec="' + id + '"]'); }
  function pages() { return main.querySelectorAll(':scope > section, :scope > article'); }
  function desktop() { return window.innerWidth >= 900; }

  function current() {
    var cur = 'intro', top = main.scrollTop;
    var els = main.querySelectorAll('[data-sec]');
    for (var i = 0; i < els.length; i++) if (els[i].offsetTop - top <= 120) cur = els[i].getAttribute('data-sec');
    if (top + main.clientHeight >= main.scrollHeight - 2) cur = 'contact';
    return cur;
  }

  // While a click-scroll is in flight the target is already active; ignore every section it passes through
  // and hand control back to the spy once scrolling has been quiet for `ms`.
  function settleAfter(ms) {
    clearTimeout(settle);
    settle = setTimeout(function () { going = false; main.style.scrollSnapType = ''; }, ms);
  }

  var ease = function (t) { return t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; };

  // Eased scroll of <main>; snapping and the spy are paused while it runs.
  function animateTo(top, id) {
    var from = main.scrollTop, dist = top - from, my = ++animId;
    if (!dist) return;
    going = true; clearTimeout(settle);
    main.style.scrollSnapType = 'none';
    if (id) onChange(id);
    var ms = calm.matches ? 0 : Math.min(750, 380 + Math.abs(dist) * 0.06), t0 = performance.now();
    lockUntil = Date.now() + ms + 350; // swallow trackpad inertia after the move
    function step(now) {
      if (my !== animId) return; // a newer move took over
      var k = ms ? Math.min(1, (now - t0) / ms) : 1;
      main.scrollTop = from + dist * ease(k);
      if (k < 1) requestAnimationFrame(step);
      else { main.scrollTop = top; setTimeout(function () { if (my === animId) { going = false; main.style.scrollSnapType = ''; } }, 60); }
    }
    requestAnimationFrame(step);
  }

  function pageIndex() {
    var ps = pages(), best = 0, d = 1e9, top = main.scrollTop;
    for (var i = 0; i < ps.length; i++) { var x = Math.abs(ps[i].offsetTop - top); if (x < d) { d = x; best = i; } }
    return best;
  }
  // Move one page; returns false when the page is taller than the window (let the browser scroll inside it).
  function step(dir) {
    var ps = pages(), i = pageIndex(), p = ps[i];
    if (p.offsetHeight > main.clientHeight + 2) {
      var inside = dir > 0 ? main.scrollTop + main.clientHeight < p.offsetTop + p.offsetHeight - 2 : main.scrollTop > p.offsetTop + 2;
      if (inside) return false;
    }
    var t = ps[Math.max(0, Math.min(ps.length - 1, i + dir))];
    if (t !== p || Math.abs(main.scrollTop - p.offsetTop) > 2) animateTo(t.offsetTop, t.getAttribute('data-sec'));
    return true;
  }

  window.Spy = {
    init: function (el, cb) {
      main = el; onChange = cb;
      main.addEventListener('scroll', function () {
        if (going) { if (!animId || Date.now() > lockUntil) settleAfter(150); return; }
        if (!queued) { queued = true; requestAnimationFrame(function () { queued = false; onChange(current()); }); }
      }, { passive: true });
      main.addEventListener('wheel', function (e) {
        if (!desktop() || e.ctrlKey || Math.abs(e.deltaY) < 4) return;
        if (Date.now() < lockUntil) { e.preventDefault(); return; }
        if (step(e.deltaY > 0 ? 1 : -1)) e.preventDefault();
      }, { passive: false });
      document.addEventListener('keydown', function (e) {
        if (!desktop() || e.altKey || e.ctrlKey || e.metaKey || /^(INPUT|TEXTAREA|SELECT)$/.test((e.target || {}).tagName)) return;
        var d = { ArrowDown: 1, PageDown: 1, ' ': e.shiftKey ? -1 : 1, ArrowUp: -1, PageUp: -1 }[e.key];
        if (e.key === 'Home' || e.key === 'End') { var ps = pages(), t = ps[e.key === 'Home' ? 0 : ps.length - 1]; animateTo(t.offsetTop, t.getAttribute('data-sec')); e.preventDefault(); return; }
        if (d && Date.now() >= lockUntil && step(d)) e.preventDefault();
        else if (d && Date.now() < lockUntil) e.preventDefault();
      });
    },
    has: function (id) { return !!find(id); },
    go: function (id, smooth) {
      var el = find(id);
      if (!el) return false;
      if (desktop()) {
        var page = el.closest('main > section, main > article') || el;
        if (smooth) animateTo(page.offsetTop); else { animId++; main.style.scrollSnapType = 'none'; main.scrollTop = page.offsetTop; going = true; settleAfter(200); }
        return true;
      }
      going = true;
      main.style.scrollSnapType = 'none';
      settleAfter(400);
      main.scrollTo({ top: el.offsetTop - 24, behavior: smooth && !calm.matches ? 'smooth' : 'auto' });
      return true;
    }
  };
})();
