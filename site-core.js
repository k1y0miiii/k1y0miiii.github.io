/* ============================================================
   k1y0mi — shared core for both redesign directions
   i18n dictionary (EN/RU) + typed hero + reveal + count-up +
   project filter + copy-email + uptime. Direction-specific
   chrome (cursor, HUD, canvas, meters) lives in each page.
   ============================================================ */
(function () {
  'use strict';

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const I18N = {
    en: {
      title: 'k1y0mi — Maxim Chumakov · backend engineer',
      nav_about: 'About', nav_exp: 'Experience', nav_skills: 'Stack', nav_work: 'Work', nav_contact: 'Contact',
      hero_role: 'Backend engineer',
      hero_l1: 'Backend engineer', hero_l2: 'who ships', hero_hl: 'production systems — solo.',
      hero_lede: 'I’m <b>Maxim Chumakov</b> — <b>k1y0mi</b>. In ~1 year of commercial work I designed and shipped <b>four multi-tenant production platforms solo</b> — from DB schema and API to deploy and load testing. Async stack (FastAPI, async SQLAlchemy, aiogram 3), LLM integration, ~30 Linux servers under management. Plus a real LLM-efficiency tooling track on the side.',
      cta_touch: 'Get in touch', cta_cv: 'Download CV', cta_work: 'See the work', cta_gh: 'Full profile',
      sig_1: 'commercial backend', sig_2: 'production platforms, solo', sig_3: 'projects on GitHub',
      k_about: 'about', h_about: 'What I do',
      lede_about: 'I’m a backend engineer — Python at the core: Django 5, DRF, FastAPI, async SQLAlchemy, PostgreSQL, Redis. I design multi-tenant systems and own them from DB schema to deploy and load testing. Around that, a real LLM-efficiency tooling track, plus ML and systems work.',
      cap1_h: 'Backend engineering',
      cap1_p: 'My core: <b>Python — Django 5, DRF, FastAPI</b>. Multi-tenant data models, REST APIs, auth and RBAC, an async stack, deploy and k6 load testing — features owned from DB schema to production.',
      cap2_h: 'AI / ML',
      cap2_p: 'Classifiers and detectors — fine-tuned transformers and classic ML, calibrated and honestly evaluated on hard test splits.',
      cap3_h: 'LLM tooling',
      cap3_p: 'Formats, skills and MCP servers that cut token cost for agents — lossless, round-trippable, measured with tiktoken.',
      cap4_h: 'Systems &amp; security',
      cap4_p: 'Lower-level work too: a terminal web browser, CLI tools, an encrypted messenger, intrusion detection and BadUSB tooling.',
      k_exp: 'experience', h_exp: 'Where I’ve shipped',
      lede_exp: 'Commercial backend work — production systems with real users, owned end to end.',
      exp_role: 'Backend / Full-Stack Developer (contract)',
      exp_meta: 'Nik-A Tech (ex-iQnix Tech), remote · May 2025 — present',
      exp_body: 'Sole or lead developer of <b>four production platforms</b> plus the company CMS and site. Took over the entire codebase from a departed developer. Introduced Git (the code was edited directly on prod before) and <b>k6 load testing</b> as a pre-release practice. Administer <b>~30 Linux servers</b> across client deployments — provisioning, deploy, DNS/SMTP.',
      k_skills: 'toolbox', h_skills: 'Languages &amp; stack',
      lang_py_note: '— Django, DRF, FastAPI, async', lang_bash_note: '— scripting, server admin',
      stack_core: 'Backend <em>core</em>', stack_load: 'Load testing', stack_llm: 'LLM tooling', stack_also: 'Also',
      k_work: 'proof', h_work: 'Selected work',
      lede_work: 'Four production platforms first — commercial, built solo. Then open-source and side projects, filterable by domain — everything there links to source.',
      work_full: 'Full list on GitHub →',
      work_prod: 'Production', work_prod_note: 'commercial · closed source',
      work_oss: 'Open-source / side projects', work_oss_note: 'source + live demos',
      pp_smart_n: 'COP-UPK — multi-tenant SaaS',
      pp_smart: 'Designed and built solo in ~2.5 months before the admissions season. 200+ routes, now used by 4 universities/colleges, 20–30 staff users, 500+ applications per campaign. RBAC across 5 roles, multi-step forms with conditional logic, isolated per-tenant deploy. DOCX generation engine: each org uploads its own templates and maps placeholders via a settings UI — no developer in the loop. Online-exam module: Judge0 code sandbox + LLM-as-judge grading on self-hosted models.',
      pp_mydns_n: 'MyDNS — distributed DNS-propagation service',
      pp_mydns: 'Master-master replication across 4 geo-nodes with no message broker: signal-based event log, UUID idempotency, last-write-wins conflict resolution, cursor-based sync, HMAC node authentication. Parallel resolving through 25 global resolvers with a d3-geo world map.',
      pp_max_n: 'MAX — messenger integration gateway',
      pp_max: 'Single integration point with the MAX messenger for all company projects. Self-service onboarding: bot creation, API endpoint issuance with instructions; routing, delivery and centralized message tracking. Multi-tenant: SHA-256 client-key hashing, HMAC-signed callbacks, retry-delivery queue.',
      pp_sao_n: 'COP-SAO — online exam platform',
      pp_sao: 'A standalone exam and test platform — a lighter spin-off of the COP-UPK online-exam module, focused only on running exams and tests. Custom django_perf profiling package; solved migration edge cases (NULL-distinct in PostgreSQL) and multi-worker gunicorn state desync.',
      f_all: 'All', f_sec: 'Security', f_sys: 'Systems', f_tools: 'Tools', f_llm: 'LLM tooling',
      live_playground: 'live playground', live_demo: 'live demo',
      link_demo: 'Try the live demo', link_model: 'Model on HF ↗', link_source: 'Source ↗',
      link_playground: 'Try the playground',
      p_tokendiet: 'See what your JSON costs in tokens and dollars across models — then put it on a diet. A live playground backed by a reproducible benchmark (JTF cuts ~40% losslessly).',
      p_detector: 'Detects whether Russian text is human-written or LLM-generated. Statistical features (v1) plus fine-tuned ruBert transformers (v2–v4), calibrated to FPR ≤ 3%. Service / CLI / TUI, fully local.',
      p_glyph: 'A web browser that runs in your terminal. Fetches over HTTP(S), parses HTML with html5ever, applies a subset of CSS, lays it out as text. Tabs, forms, session restore — no JS engine, intentionally fast.',
      p_jtf: 'JTF — a lossless, compact JSON encoding for LLMs (−33% tokens, round-trippable). Formal spec + Python &amp; JS reference libs + cross-language conformance.',
      p_gmcp: 'MCP server giving Claude web search &amp; fetch as plain text, rendered through glyph. Roughly 8× fewer tokens per lookup.',
      p_jts: 'Claude Code skill + PostToolUse hook: reads JSON as compact JTF automatically, saving tokens. Ships a Cursor rule too.',
      p_ids: 'Network intrusion detection on the NSL-KDD benchmark. RandomForest / GradientBoosting / LogReg, binary &amp; multiclass, honest metrics on a hard test split.',
      p_gv: 'Open-source anonymous messenger: encrypted chat, shared database access, desktop GUI. Built around user control over data.',
      p_fz: 'BadUSB scripts for Flipper Zero — utilities and demos for security testing and automation. For legal, ethical use only.',
      p_fdg: 'Synthetic / test-data generator built on Faker, with a multilingual UI and a stylish CLI banner.',
      k_contact: 'contact', h_contact: 'Let’s talk.',
      lede_contact: 'Open to backend roles (middle, Python), and to interesting collaborations. The fastest way to reach me is email or Telegram.',
      resume_head: 'download résumé', resume_en_note: 'global / relocation', resume_ru_note: 'Russian market',
      copy_hint: 'copy', toast_copied: 'copied to clipboard',
      nf_status: 'open to work', avail: 'Available for work',
      foot_note: 'Backend engineer — Python · Django · FastAPI · async SQLAlchemy · PostgreSQL · Redis.<br>No frameworks were harmed making this site.'
    },
    ru: {
      title: 'k1y0mi — Максим Чумаков · backend-инженер',
      nav_about: 'Обо мне', nav_exp: 'Опыт', nav_skills: 'Стек', nav_work: 'Проекты', nav_contact: 'Контакты',
      hero_role: 'Backend-инженер',
      hero_l1: 'Backend-инженер,', hero_l2: 'который доводит', hero_hl: 'системы до прода — solo.',
      hero_lede: 'Я <b>Максим Чумаков</b> — <b>k1y0mi</b>. За ~1 год коммерческой работы я в одиночку спроектировал и запустил <b>четыре мультитенантные прод-платформы</b> — от схемы БД и API до деплоя и нагрузочного тестирования. Асинхронный стек (FastAPI, async SQLAlchemy, aiogram 3), интеграция LLM, ~30 Linux-серверов под управлением. Плюс отдельный трек по LLM-эффективности.',
      cta_touch: 'Написать мне', cta_cv: 'Скачать резюме', cta_work: 'Смотреть работы', cta_gh: 'Полный профиль',
      sig_1: 'коммерческий backend', sig_2: 'production-платформы, solo', sig_3: 'проектов на GitHub',
      k_about: 'обо мне', h_about: 'Чем я занимаюсь',
      lede_about: 'Я backend-инженер — в основе Python: Django 5, DRF, FastAPI, async SQLAlchemy, PostgreSQL, Redis. Проектирую мультитенантные системы и веду их от схемы БД до деплоя и нагрузочного тестирования. Вдобавок — отдельный трек по LLM-эффективности, ML и системный софт.',
      cap1_h: 'Backend-разработка',
      cap1_p: 'Основа: <b>Python — Django 5, DRF, FastAPI</b>. Мультитенантные модели данных, REST API, авторизация и RBAC, асинхронный стек, деплой и нагрузочное тестирование k6 — фичи целиком, от схемы БД до прода.',
      cap2_h: 'AI / ML',
      cap2_p: 'Классификаторы и детекторы — файнтюн трансформеров и классический ML, откалиброванные и честно оценённые на сложных тест-сплитах.',
      cap3_h: 'LLM-тулинг',
      cap3_p: 'Форматы, скиллы и MCP-серверы, которые сокращают расход токенов у агентов — без потерь, обратимо, измерено через tiktoken.',
      cap4_h: 'Системы и безопасность',
      cap4_p: 'Есть и низкоуровневое: терминальный браузер, CLI-инструменты, шифрованный мессенджер, обнаружение вторжений и BadUSB-тулинг.',
      k_exp: 'опыт', h_exp: 'Где я работал',
      lede_exp: 'Коммерческий бэкенд — прод-системы с реальными пользователями, которые я веду целиком.',
      exp_role: 'Backend / Full-Stack разработчик (контракт)',
      exp_meta: 'Nik-A Tech (ex-iQnix Tech), удалённо · май 2025 — настоящее время',
      exp_body: 'Единственный или ведущий разработчик <b>четырёх прод-платформ</b> плюс CMS и сайт компании. Принял всю кодовую базу от ушедшего разработчика. Внедрил Git (раньше код правили прямо на проде) и <b>нагрузочное тестирование k6</b> как практику перед релизом. Администрирую <b>~30 Linux-серверов</b> на клиентских деплоях — провижининг, деплой, DNS/SMTP.',
      k_skills: 'инструменты', h_skills: 'Языки и стек',
      lang_py_note: '— Django, DRF, FastAPI, async', lang_bash_note: '— скрипты, админка серверов',
      stack_core: 'Бэкенд <em>ядро</em>', stack_load: 'Нагрузочное', stack_llm: 'LLM-тулинг', stack_also: 'Ещё',
      k_work: 'доказательства', h_work: 'Избранные работы',
      lede_work: 'Сначала четыре прод-платформы — коммерческие, собраны соло. Затем open-source и пет-проекты с фильтром по направлению — там всё ведёт на исходники.',
      work_full: 'Полный список на GitHub →',
      work_prod: 'Продакшн', work_prod_note: 'коммерческое · закрытый код',
      work_oss: 'Open-source / пет-проекты', work_oss_note: 'исходники + живые демо',
      pp_smart_n: 'COP-UPK — мультитенантный SaaS',
      pp_smart: 'Спроектирован и собран соло за ~2.5 месяца до приёмной кампании. 200+ маршрутов, сейчас используют 4 вуза/колледжа, 20–30 сотрудников, 500+ заявок за кампанию. RBAC на 5 ролей, многошаговые формы с условной логикой, изолированный деплой под каждого арендатора. Движок генерации DOCX: каждая организация загружает свои шаблоны и сопоставляет плейсхолдеры через UI настроек — без участия разработчика. Модуль онлайн-экзаменов: песочница кода Judge0 + оценка LLM-as-judge на self-hosted моделях.',
      pp_mydns_n: 'MyDNS — распределённый сервис DNS-пропагации',
      pp_mydns: 'Master-master репликация между 4 гео-нодами без брокера сообщений: событийный лог на сигналах, идемпотентность по UUID, разрешение конфликтов last-write-wins, курсорная синхронизация, HMAC-аутентификация нод. Параллельный резолвинг через 25 глобальных резолверов с картой мира на d3-geo.',
      pp_max_n: 'MAX — шлюз интеграции с мессенджером',
      pp_max: 'Единая точка интеграции с мессенджером MAX для всех проектов компании. Self-service онбординг: создание бота, выдача API-эндпоинта с инструкцией; маршрутизация, доставка и централизованный трекинг сообщений. Мультитенантность: хеширование клиентских ключей SHA-256, HMAC-подпись колбэков, очередь повторной доставки.',
      pp_sao_n: 'COP-SAO — платформа онлайн-экзаменов',
      pp_sao: 'Отдельная платформа для сдачи экзаменов и тестов — облегчённая версия экзаменационного модуля из COP-UPK, заточенная только под проведение экзаменов. Собственный пакет профилирования django_perf; решены краевые случаи миграций (NULL-distinct в PostgreSQL) и рассинхрон состояния gunicorn между воркерами.',
      f_all: 'Все', f_sec: 'Безопасность', f_sys: 'Системы', f_tools: 'Инструменты', f_llm: 'LLM-тулинг',
      live_playground: 'живое демо', live_demo: 'живое демо',
      link_demo: 'Открыть демо', link_model: 'Модель на HF ↗', link_source: 'Исходники ↗',
      link_playground: 'Открыть плейграунд',
      p_tokendiet: 'Смотри, во сколько токенов и долларов обходится твой JSON по разным моделям — и посади его на диету. Живой плейграунд на воспроизводимом бенчмарке (JTF режет ~40% без потерь).',
      l_diploma: 'Python · диплом',
      p_detector: 'Определяет, кто написал русский текст — человек или LLM. Статистические признаки (v1) плюс файнтюн ruBert (v2–v4), калибровка до FPR ≤ 3%. Сервис / CLI / TUI, полностью локально.',
      p_glyph: 'Веб-браузер, работающий в терминале. Ходит по HTTP(S), парсит HTML через html5ever, применяет подмножество CSS, верстает текстом. Вкладки, формы, восстановление сессии — без JS-движка, намеренно быстрый.',
      p_jtf: 'JTF — компактная кодировка JSON для LLM без потерь (−33% токенов, полностью обратима). Формальная спецификация + референс-либы Python и JS + cross-language conformance.',
      p_gmcp: 'MCP-сервер, дающий Claude веб-поиск и загрузку страниц чистым текстом через glyph. Примерно в 8× меньше токенов на запрос.',
      p_jts: 'Скилл для Claude Code + PostToolUse-хук: автоматически читает JSON как компактный JTF, экономя токены. В комплекте правило для Cursor.',
      p_ids: 'Обнаружение сетевых вторжений на бенчмарке NSL-KDD. RandomForest / GradientBoosting / LogReg, бинарная и мультикласс, честные метрики на сложном тест-сплите.',
      p_gv: 'Open-source анонимный мессенджер: шифрованный чат, общий доступ к базе, десктоп-GUI. В основе — контроль пользователя над своими данными.',
      p_fz: 'BadUSB-скрипты для Flipper Zero — утилиты и демо для тестирования безопасности и автоматизации. Только для легального, этичного использования.',
      p_fdg: 'Генератор синтетических / тестовых данных на базе Faker — мультиязычный UI и стильный CLI-баннер.',
      k_contact: 'контакты', h_contact: 'Поговорим.',
      lede_contact: 'Открыт к backend-вакансиям (middle, Python) и интересным совместным проектам. Быстрее всего — почта или Telegram.',
      resume_head: 'скачать резюме', resume_en_note: 'зарубежный рынок', resume_ru_note: 'рынок РФ',
      copy_hint: 'копировать', toast_copied: 'скопировано',
      nf_status: 'открыт к работе', avail: 'Открыт к работе',
      foot_note: 'Backend-инженер — Python · Django · FastAPI · async SQLAlchemy · PostgreSQL · Redis.<br>При создании сайта ни один фреймворк не пострадал.'
    }
  };

  let lang = localStorage.getItem('lang') || 'en';
  if (!I18N[lang]) lang = 'en';

  const sfx = el => (lang === 'ru' && el.dataset.suffixRu != null)
    ? el.dataset.suffixRu : (el.dataset.suffix || '');

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
    // keep counters showing the final value with the right-language suffix even
    // if the count-up observer hasn't fired yet (otherwise RU keeps the EN suffix)
    document.querySelectorAll('[data-countup]').forEach(el => {
      el.textContent = (el.dataset.prefix || '') + el.dataset.countup + sfx(el);
    });
    document.querySelectorAll('[data-lang-opt]').forEach(b =>
      b.classList.toggle('on', b.dataset.langOpt === lang));
    localStorage.setItem('lang', lang);
  }

  function initCommon(opts) {
    opts = opts || {};

    /* language toggle */
    const lt = document.getElementById('langToggle');
    if (lt) lt.addEventListener('click', () => applyLang(lang === 'en' ? 'ru' : 'en'));
    if (lang !== 'en') applyLang(lang);

    /* reveal helper — sets final state inline (always visible), animates as enhancement */
    const reduced = prefersReduced;
    function show(el, delay) {
      el.classList.add('in');
      el.style.opacity = '1';
      el.style.transform = 'none';
      if (!reduced && el.animate) {
        el.animate(
          [{ opacity: 0, transform: 'translateY(22px)' }, { opacity: 1, transform: 'none' }],
          { duration: 680, delay: delay || 0, easing: 'cubic-bezier(.2,.7,.2,1)', fill: 'backwards' }
        );
      }
    }

    /* typed hero — only the prompt line shows first; the rest reveals once typing finishes */
    const typedEl = document.getElementById('typed');
    const heroReveals = [...document.querySelectorAll('.hero .reveal')];
    const CMD = opts.cmd || 'whoami';
    const termLine = typedEl ? typedEl.closest('.reveal') : null;
    const revealRest = () => heroReveals.filter(el => el !== termLine).forEach((el, i) => show(el, i * 75));
    if (typedEl) {
      if (prefersReduced) { typedEl.textContent = CMD; show(termLine, 0); revealRest(); }
      else {
        if (termLine) show(termLine, 0);
        let i = 0;
        setTimeout(function type() {
          typedEl.textContent = CMD.slice(0, ++i);
          if (i < CMD.length) setTimeout(type, 78);
          else setTimeout(revealRest, 260);
        }, 420);
      }
    } else { heroReveals.forEach((el, i) => show(el, i * 75)); }

    /* reveal on scroll */
    document.querySelectorAll('#grid .proj').forEach(el => el.classList.add('reveal'));
    const revealEls = [...document.querySelectorAll('.reveal')].filter(el => !el.closest('.hero'));
    if (reduced) revealEls.forEach(el => show(el, 0));
    else {
      const io = new IntersectionObserver(es => es.forEach(e => {
        if (e.isIntersecting) { show(e.target, 0); io.unobserve(e.target); }
      }), { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
      revealEls.forEach(el => io.observe(el));
    }

    /* count-up */
    function animateCount(el) {
      const target = parseFloat(el.dataset.countup);
      const prefix = el.dataset.prefix || '';
      if (prefersReduced) { el.textContent = prefix + target + sfx(el); el.dataset.done = '1'; return; }
      const dur = 1100, start = performance.now();
      (function tick(now) {
        const p = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = prefix + Math.round(target * eased) + sfx(el);
        if (p < 1) requestAnimationFrame(tick);
        else el.dataset.done = '1';
      })(start);
    }
    const cio = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { animateCount(e.target); cio.unobserve(e.target); }
    }), { threshold: 0.6 });
    document.querySelectorAll('[data-countup]').forEach(el => cio.observe(el));

    /* project filter */
    const grid = document.getElementById('grid');
    const filters = document.getElementById('filters');
    if (filters && grid) {
      filters.addEventListener('click', ev => {
        const btn = ev.target.closest('.filt');
        if (!btn) return;
        filters.querySelectorAll('.filt').forEach(b => {
          b.classList.toggle('active', b === btn);
          b.setAttribute('aria-selected', b === btn ? 'true' : 'false');
        });
        const cat = btn.dataset.cat;
        grid.querySelectorAll('.proj').forEach(p =>
          p.classList.toggle('hide', !(cat === 'all' || p.dataset.cat === cat)));
      });
    }

    /* copy email */
    const copyBtn = document.getElementById('copyMail');
    const toast = document.getElementById('toast');
    if (copyBtn) copyBtn.addEventListener('click', () => {
      const mail = copyBtn.dataset.mail;
      const done = () => { if (toast) { toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 1700); } };
      if (navigator.clipboard && navigator.clipboard.writeText)
        navigator.clipboard.writeText(mail).then(done, () => { location.href = 'mailto:' + mail; });
      else location.href = 'mailto:' + mail;
    });

    /* uptime */
    const up = document.getElementById('uptime');
    if (up) {
      const days = Math.floor((Date.now() - new Date('2026-06-12T00:00:00Z')) / 864e5);
      up.textContent = days < 1 ? 'fresh deploy' : days + 'd';
    }

    /* meters — generic width animation (each page styles the track) */
    const meters = document.querySelectorAll('[data-meter]');
    if (meters.length) {
      const set = (m, v) => {
        const fill = m.querySelector('.meter-fill');
        const pct = m.querySelector('.meter-pct');
        if (fill) fill.style.width = v + '%';
        if (pct) pct.textContent = v + '%';
      };
      if (prefersReduced) meters.forEach(m => set(m, parseInt(m.dataset.meter, 10)));
      else {
        const mio = new IntersectionObserver(es => es.forEach(e => {
          if (!e.isIntersecting) return;
          const m = e.target, target = parseInt(m.dataset.meter, 10);
          const dur = 1100, start = performance.now();
          (function tick(now) {
            const p = Math.min((now - start) / dur, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            set(m, Math.round(target * eased));
            if (p < 1) requestAnimationFrame(tick);
          })(start);
          mio.unobserve(m);
        }), { threshold: 0.5 });
        meters.forEach(m => mio.observe(m));
      }
    }
  }

  window.SITE = { I18N, initCommon, get lang() { return lang; } };
})();
