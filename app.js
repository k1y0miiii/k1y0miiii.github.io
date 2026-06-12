(function () {
  'use strict';

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(pointer: fine)').matches;

  /* ============================== i18n ============================== */

  const I18N = {
    en: {
      title: 'k1y0mi — Maxim Chumakov · backend & fullstack developer',
      nav_about: 'About', nav_skills: 'Skills', nav_work: 'Work', nav_contact: 'Contact',
      hero_l1: 'Backend developer', hero_l2: 'who went', hero_hl: 'fullstack.',
      hero_lede: 'I’m <b>Maxim Chumakov</b> — <b>k1y0mi</b> on the internet. Python and <b>Django</b> are home base: APIs, data, business logic. Over the past year I’ve worked <b>fullstack</b>, owning features end to end, UI included. On the side I build ML models, LLM tooling and systems software — and I like shipping results I can measure.',
      cta_touch: 'Get in touch', cta_work: 'See the work ↓', cta_gh: 'Full profile ↗',
      sig_1: 'fullstack, end to end', sig_2: 'public projects shipped',
      sig_3: 'tokens cut (JTF)', sig_4: 'cheaper web lookups (MCP)',
      k_about: 'about', h_about: 'What I do',
      lede_about: 'Backend is my core — Python and Django — and this past year I’ve gone fullstack, shipping features from the database to the screen. Around that, I take on hard, measurable problems: ML models, LLM-efficiency tooling and systems software.',
      cap1_h: 'Backend &amp; fullstack',
      cap1_p: 'My day-to-day: <b>Python / Django</b> — REST APIs, data models, business logic, auth. For the last year, fullstack too — owning features end to end, frontend included.',
      cap2_h: 'AI / ML',
      cap2_p: 'Classifiers and detectors — fine-tuned transformers and classic ML, calibrated and honestly evaluated on hard test splits.',
      cap3_h: 'LLM tooling',
      cap3_p: 'Formats, skills and MCP servers that cut token cost for agents — lossless, round-trippable, measured with tiktoken.',
      cap4_h: 'Systems &amp; security',
      cap4_p: 'Lower-level work too: a terminal web browser, CLI tools, an encrypted messenger, intrusion detection and BadUSB tooling.',
      bs_1: 'calibrated detector', bs_2: 'tokens vs JSON', bs_3: 'fewer tokens / lookup',
      k_skills: 'toolbox', h_skills: 'Languages &amp; stack', stack_infra: 'Infra &amp; tooling',
      k_work: 'proof', h_work: 'Selected work',
      lede_work: 'A sample of what I’ve built, as evidence for the above. Filter by domain — everything links to source. <a class="inline-link" href="https://github.com/k1y0miiii" target="_blank" rel="noopener">Full list on GitHub →</a>',
      f_all: 'All', f_sec: 'Security', f_sys: 'Systems', f_tools: 'Tools', f_llm: 'LLM tooling',
      l_diploma: 'Python · diploma',
      p_detector: 'Detects whether Russian text is human-written or LLM-generated. Statistical features (v1) plus fine-tuned ruBert transformers (v2–v4), calibrated to FPR ≤ 3%. Service / CLI / TUI, fully local.',
      p_glyph: 'A web browser that runs in your terminal. Fetches over HTTP(S), parses HTML with html5ever, applies a subset of CSS, lays it out as text. Tabs, forms, session restore — no JS engine, intentionally fast.',
      p_jtf: 'JTF — a lossless, compact JSON encoding for LLMs. −33% tokens vs JSON, round-trippable. Builds on the TOON idea.',
      p_gmcp: 'MCP server giving Claude web search &amp; fetch as plain text, rendered through glyph. Roughly 8× fewer tokens per lookup.',
      p_jts: 'Claude Code skill + PostToolUse hook: reads JSON as compact JTF automatically, saving tokens. Ships a Cursor rule too.',
      p_ids: 'Network intrusion detection on the NSL-KDD benchmark. RandomForest / GradientBoosting / LogReg, binary &amp; multiclass, honest metrics on a hard test split.',
      p_gv: 'Open-source anonymous messenger: encrypted chat, shared database access, desktop GUI. Built around user control over data.',
      p_fz: 'BadUSB scripts for Flipper Zero — utilities and demos for security testing and automation. For legal, ethical use only.',
      p_fdg: 'Synthetic / test-data generator built on Faker, with a multilingual UI and a stylish CLI banner.',
      k_contact: 'contact', h_contact: 'Let’s talk.',
      lede_contact: 'Open to backend and fullstack roles, and to interesting collaborations. The fastest way to reach me is email or Telegram.',
      copy_hint: '⧉ copy', toast_copied: 'copied ✓',
      nf_status: 'open to work',
      foot_note: 'Backend &amp; fullstack developer — Python · Django · JavaScript · C++ · Shell.<br>No frameworks were harmed making this site.'
    },
    ru: {
      title: 'k1y0mi — Максим Чумаков · backend & fullstack разработчик',
      nav_about: 'Обо мне', nav_skills: 'Стек', nav_work: 'Проекты', nav_contact: 'Контакты',
      hero_l1: 'Backend-разработчик,', hero_l2: 'который вырос в', hero_hl: 'фуллстек.',
      hero_lede: 'Я <b>Максим Чумаков</b> — в сети <b>k1y0mi</b>. Моя база — Python и <b>Django</b>: API, данные, бизнес-логика. Последний год работаю <b>фуллстек</b> — веду фичи целиком, включая UI. Параллельно делаю ML-модели, LLM-тулинг и системный софт — и люблю результат, который можно измерить.',
      cta_touch: 'Написать мне', cta_work: 'Смотреть работы ↓', cta_gh: 'Полный профиль ↗',
      sig_1: 'фуллстек, от и до', sig_2: 'публичных проектов',
      sig_3: 'срезано токенов (JTF)', sig_4: 'дешевле веб-запросов (MCP)',
      k_about: 'обо мне', h_about: 'Чем я занимаюсь',
      lede_about: 'Ядро — бэкенд: Python и Django. Последний год — фуллстек: фичи от базы данных до экрана. Вокруг этого берусь за сложные измеримые задачи: ML-модели, оптимизацию токенов для LLM и системный софт.',
      cap1_h: 'Бэкенд и фуллстек',
      cap1_p: 'Моя повседневная работа: <b>Python / Django</b> — REST API, модели данных, бизнес-логика, авторизация. Последний год — ещё и фуллстек: веду фичи целиком, включая фронтенд.',
      cap2_h: 'AI / ML',
      cap2_p: 'Классификаторы и детекторы — файнтюн трансформеров и классический ML, откалиброванные и честно оценённые на сложных тест-сплитах.',
      cap3_h: 'LLM-тулинг',
      cap3_p: 'Форматы, скиллы и MCP-серверы, которые сокращают расход токенов у агентов — без потерь, обратимо, измерено через tiktoken.',
      cap4_h: 'Системы и безопасность',
      cap4_p: 'Есть и низкоуровневое: терминальный браузер, CLI-инструменты, шифрованный мессенджер, обнаружение вторжений и BadUSB-тулинг.',
      bs_1: 'откалиброванный детектор', bs_2: 'токенов против JSON', bs_3: 'меньше токенов на запрос',
      k_skills: 'инструменты', h_skills: 'Языки и стек', stack_infra: 'Инфра и тулинг',
      k_work: 'доказательства', h_work: 'Избранные работы',
      lede_work: 'Часть того, что я построил — как доказательство сказанного выше. Фильтруй по направлению — всё ведёт на исходники. <a class="inline-link" href="https://github.com/k1y0miiii" target="_blank" rel="noopener">Полный список на GitHub →</a>',
      f_all: 'Все', f_sec: 'Безопасность', f_sys: 'Системы', f_tools: 'Инструменты', f_llm: 'LLM-тулинг',
      l_diploma: 'Python · диплом',
      p_detector: 'Определяет, написан русский текст человеком или LLM. Статистические признаки (v1) плюс файнтюн ruBert (v2–v4), калибровка до FPR ≤ 3%. Сервис / CLI / TUI, полностью локально.',
      p_glyph: 'Веб-браузер, работающий в терминале. Ходит по HTTP(S), парсит HTML через html5ever, применяет подмножество CSS, верстает текстом. Вкладки, формы, восстановление сессии — без JS-движка, намеренно быстрый.',
      p_jtf: 'JTF — компактная кодировка JSON для LLM без потерь. −33% токенов против JSON, полностью обратима. Развивает идею TOON.',
      p_gmcp: 'MCP-сервер, дающий Claude веб-поиск и загрузку страниц чистым текстом через glyph. Примерно в 8× меньше токенов на запрос.',
      p_jts: 'Скилл для Claude Code + PostToolUse-хук: автоматически читает JSON как компактный JTF, экономя токены. В комплекте правило для Cursor.',
      p_ids: 'Обнаружение сетевых вторжений на бенчмарке NSL-KDD. RandomForest / GradientBoosting / LogReg, бинарная и мультикласс, честные метрики на сложном тест-сплите.',
      p_gv: 'Open-source анонимный мессенджер: шифрованный чат, общий доступ к базе, десктоп-GUI. Построен вокруг контроля пользователя над данными.',
      p_fz: 'BadUSB-скрипты для Flipper Zero — утилиты и демо для тестирования безопасности и автоматизации. Только для легального, этичного использования.',
      p_fdg: 'Генератор синтетических / тестовых данных на базе Faker — мультиязычный UI и стильный CLI-баннер.',
      k_contact: 'контакты', h_contact: 'Поговорим.',
      lede_contact: 'Открыт к бэкенд- и фуллстек-вакансиям и интересным совместным проектам. Быстрее всего — почта или Telegram.',
      copy_hint: '⧉ копировать', toast_copied: 'скопировано ✓',
      nf_status: 'открыт к работе',
      foot_note: 'Backend &amp; fullstack разработчик — Python · Django · JavaScript · C++ · Shell.<br>При создании сайта ни один фреймворк не пострадал.'
    }
  };

  let lang = localStorage.getItem('lang') || 'en';
  if (!I18N[lang]) lang = 'en';

  function applyLang(next) {
    lang = next;
    const dict = I18N[lang];
    document.documentElement.lang = lang;
    document.title = dict.title;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      if (dict[key] == null) return;
      el.innerHTML = dict[key];
      if (el.classList.contains('glitch')) el.dataset.text = el.textContent;
    });
    document.querySelectorAll('[data-lang-opt]').forEach(b =>
      b.classList.toggle('on', b.dataset.langOpt === lang));
    localStorage.setItem('lang', lang);
  }

  document.getElementById('langToggle').addEventListener('click', () => {
    applyLang(lang === 'en' ? 'ru' : 'en');
  });
  if (lang !== 'en') applyLang(lang);

  /* ============================ typed hero =========================== */

  const typedEl = document.getElementById('typed');
  const heroReveals = document.querySelectorAll('.hero .reveal');
  const CMD = 'whoami';

  function revealHero() { heroReveals.forEach(el => el.classList.add('in')); }

  if (prefersReduced) {
    typedEl.textContent = CMD;
    revealHero();
  } else {
    heroReveals[0].classList.add('in'); // the terminal line itself
    let i = 0;
    setTimeout(function type() {
      typedEl.textContent = CMD.slice(0, ++i);
      if (i < CMD.length) setTimeout(type, 85);
      else setTimeout(revealHero, 180);
    }, 350);
  }

  /* ========================= reveal on scroll ======================== */

  document.querySelectorAll('#grid .proj').forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = (Math.min(i, 7) * 0.05) + 's';
  });

  const revealEls = [...document.querySelectorAll('.reveal')].filter(el => !el.closest('.hero'));
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

  /* ========================= count-up numbers ======================== */

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

  /* =========================== domain filter ========================= */

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

  /* ====================== token-field background ===================== */

  const canvas = document.getElementById('field');
  if (canvas && !prefersReduced && window.innerWidth >= 768) {
    const ctx = canvas.getContext('2d');
    const GLYPHS = '{}:";[]>#·•01λ▸'.split('');
    let parts = [], W = 0, H = 0, raf = 0, mx = 0.5;

    function init() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
      const n = Math.min(70, Math.round(W * H / 26000));
      parts = Array.from({ length: n }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        v: 0.12 + Math.random() * 0.3,
        s: 10 + Math.random() * 5,
        g: GLYPHS[Math.random() * GLYPHS.length | 0],
        lime: Math.random() < 0.12,
        a: 0.05 + Math.random() * 0.09,
        ph: Math.random() * Math.PI * 2,
        d: 0.4 + Math.random() * 0.6   // depth for parallax
      }));
    }

    function frame(t) {
      ctx.clearRect(0, 0, W, H);
      const px = (mx - 0.5) * 14;
      for (const p of parts) {
        p.y -= p.v;
        if (p.y < -20) { p.y = H + 20; p.x = Math.random() * W; }
        const wob = Math.sin(t / 2600 + p.ph) * 6;
        ctx.globalAlpha = p.a;
        ctx.fillStyle = p.lime ? '#c6f24e' : '#e9ede4';
        ctx.font = p.s + 'px "JetBrains Mono", monospace';
        ctx.fillText(p.g, p.x + wob + px * p.d, p.y);
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(frame);
    }

    window.addEventListener('mousemove', e => { mx = e.clientX / W; }, { passive: true });
    let rto;
    window.addEventListener('resize', () => { clearTimeout(rto); rto = setTimeout(init, 200); });
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) cancelAnimationFrame(raf);
      else raf = requestAnimationFrame(frame);
    });

    init();
    raf = requestAnimationFrame(frame);
  }

  /* =========================== custom cursor ========================= */

  const cur = document.getElementById('cursor');
  if (cur && finePointer && !prefersReduced) {
    document.body.classList.add('has-cursor');
    let cx = -100, cy = -100, tx = -100, ty = -100;
    window.addEventListener('mousemove', e => { tx = e.clientX; ty = e.clientY; }, { passive: true });
    (function follow() {
      cx += (tx - cx) * 0.32;
      cy += (ty - cy) * 0.32;
      cur.style.left = cx + 'px';
      cur.style.top = cy + 'px';
      requestAnimationFrame(follow);
    })();
    document.addEventListener('mouseover', e => {
      if (e.target.closest('a, button')) cur.classList.add('hov');
    });
    document.addEventListener('mouseout', e => {
      if (e.target.closest('a, button')) cur.classList.remove('hov');
    });
  }

  /* ======================== context-window HUD ======================= */

  const hudFill = document.getElementById('hudFill');
  const hudPct = document.getElementById('hudPct');
  const hudTok = document.getElementById('hudTok');
  if (hudFill) {
    let ticking = false;
    function updateHud() {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
      const pct = Math.round(p * 100);
      hudFill.style.width = pct + '%';
      hudPct.textContent = pct + '%';
      hudTok.textContent = (Math.round(p * 148) * 100).toLocaleString('en-US') + ' tok';
      hudPct.style.color = pct >= 99 ? '#c6f24e' : '';
      ticking = false;
    }
    window.addEventListener('scroll', () => {
      if (!ticking) { ticking = true; requestAnimationFrame(updateHud); }
    }, { passive: true });
    updateHud();
  }

  /* =========================== copy e-mail =========================== */

  const copyBtn = document.getElementById('copyMail');
  const toast = document.getElementById('toast');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const mail = copyBtn.dataset.mail;
      const done = () => {
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 1600);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(mail).then(done, () => { location.href = 'mailto:' + mail; });
      } else {
        location.href = 'mailto:' + mail;
      }
    });
  }

  /* ========================== footer uptime ========================== */

  const up = document.getElementById('uptime');
  if (up) {
    const days = Math.floor((Date.now() - new Date('2026-06-12T00:00:00Z')) / 864e5);
    up.textContent = days < 1 ? 'fresh deploy ⚡' : days + 'd';
  }
})();
