(function () {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // stagger project + stack cards into the reveal system
  document.querySelectorAll('#grid .proj').forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = (Math.min(i, 7) * 0.05) + 's';
  });

  // reveal on scroll
  const revealEls = document.querySelectorAll('.reveal');
  if (prefersReduced) {
    revealEls.forEach(el => el.classList.add('in'));
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });
    revealEls.forEach(el => io.observe(el));
  }

  // count-up numbers
  function animateCount(el) {
    const target = parseFloat(el.dataset.countup);
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    if (prefersReduced) { el.textContent = prefix + target + suffix; return; }
    const dur = 1100, start = performance.now();
    (function tick(now) {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = prefix + Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    })(start);
  }
  const cio = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { animateCount(e.target); cio.unobserve(e.target); }
    });
  }, { threshold: 0.6 });
  document.querySelectorAll('[data-countup]').forEach(el => cio.observe(el));

  // domain filter
  const grid = document.getElementById('grid');
  const filters = document.getElementById('filters');
  if (filters && grid) {
    filters.addEventListener('click', (ev) => {
      const btn = ev.target.closest('.filt');
      if (!btn) return;
      filters.querySelectorAll('.filt').forEach(b => {
        b.classList.toggle('active', b === btn);
        b.setAttribute('aria-selected', b === btn ? 'true' : 'false');
      });
      const cat = btn.dataset.cat;
      grid.querySelectorAll('.proj').forEach(p => {
        p.classList.toggle('hide', !(cat === 'all' || p.dataset.cat === cat));
      });
    });
  }
})();
