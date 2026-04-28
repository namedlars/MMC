/* =========================================================================
   MOMENTUM COMBAT CLUB — interactions
   ========================================================================= */

(() => {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Year in footer ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Logo image loader (swap SVG fallback when WebP loads) ---------- */
  document.querySelectorAll('.logo__img').forEach(img => {
    if (img.complete && img.naturalWidth > 0) {
      img.classList.add('is-loaded');
    } else {
      img.addEventListener('load', () => img.classList.add('is-loaded'));
      img.addEventListener('error', () => {/* keep SVG fallback */});
    }
  });

  /* ---------- Magnetic accent buttons (cursor-light only, no pull) ---------- */
  document.querySelectorAll('.btn--accent').forEach(btn => {
    btn.addEventListener('pointermove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      btn.style.setProperty('--mx', x + '%');
      btn.style.setProperty('--my', y + '%');
    });
  });

  /* ---------- Mobile nav toggle ---------- */
  const toggle = document.getElementById('navToggle');
  const nav    = document.getElementById('primaryNav');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
      document.body.style.overflow = open ? 'hidden' : '';
    });

    nav.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (!link || !nav.classList.contains('is-open')) return;
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Menü öffnen');
      document.body.style.overflow = '';
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  /* ---------- Sticky header + scroll-progress + hero content fade ---------- */
  const header      = document.getElementById('siteHeader');
  const progress    = document.getElementById('scrollProgress');
  const heroContent = document.querySelector('.hero__content');
  if (header || progress || heroContent) {
    let scrolled = false;
    let ticking  = false;
    const onScroll = () => {
      ticking = false;
      const y = window.scrollY;

      if (header) {
        const next = y > 8;
        if (next !== scrolled) {
          scrolled = next;
          header.classList.toggle('is-scrolled', scrolled);
        }
      }

      if (progress) {
        const docH = document.documentElement.scrollHeight - window.innerHeight;
        const ratio = docH > 0 ? Math.min(y / docH, 1) : 0;
        progress.style.transform = `scaleX(${ratio})`;
      }

      if (heroContent) {
        const vh = window.innerHeight;
        const fade = Math.max(0, 1 - (y / (vh * 0.6)));
        heroContent.style.opacity = fade.toFixed(3);
        heroContent.style.transform = `translateY(${y * 0.18}px)`;
      }
    };
    onScroll();
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(onScroll);
        ticking = true;
      }
    }, { passive: true });
  }

  /* ---------- Hero video resilience ----------
     Try local poster first; if missing, keep the Unsplash fallback that's already set.
     Hide video element gracefully if all sources fail. */
  const heroVideoWrap = document.querySelector('.hero__video');
  const heroVideo     = heroVideoWrap?.querySelector('video');
  if (heroVideo) {
    const localPoster = heroVideo.dataset.posterLocal;
    if (localPoster) {
      const probe = new Image();
      probe.onload  = () => heroVideo.setAttribute('poster', localPoster);
      probe.onerror = () => {/* keep current Unsplash poster */};
      probe.src = localPoster;
    }

    const fallbackPoster = heroVideo.getAttribute('poster');
    const useStaticBg = () => {
      if (!heroVideoWrap) return;
      const url = heroVideo.getAttribute('poster') || fallbackPoster;
      if (!url) return;
      heroVideoWrap.style.backgroundImage = `url("${url}")`;
      heroVideoWrap.style.backgroundSize = 'cover';
      heroVideoWrap.style.backgroundPosition = 'center';
      heroVideo.style.display = 'none';
    };

    heroVideo.addEventListener('error', useStaticBg);
    heroVideo.querySelectorAll('source').forEach(src => {
      src.addEventListener('error', () => {
        src.dataset.failed = '1';
        const remaining = Array.from(heroVideo.querySelectorAll('source'))
          .filter(s => s.dataset.failed !== '1');
        if (remaining.length === 0) useStaticBg();
      });
    });

    const tryPlay = () => {
      const p = heroVideo.play();
      if (p && typeof p.catch === 'function') p.catch(() => {});
    };
    if (heroVideo.readyState >= 2) tryPlay();
    else heroVideo.addEventListener('loadeddata', tryPlay, { once: true });
  }

  /* ---------- Hero parallax — composited transform only ---------- */
  if (heroVideoWrap && !prefersReducedMotion) {
    let ticking = false;
    let scrollingClassActive = false;
    let resetTimer;

    const updateParallax = () => {
      const y = window.scrollY;
      const max = window.innerHeight;
      ticking = false;
      if (y > max) {
        if (scrollingClassActive) {
          heroVideoWrap.classList.remove('is-scrolling');
          scrollingClassActive = false;
        }
        return;
      }
      heroVideoWrap.style.transform = `translateY(${y * 0.25}px) scale(${1 + y * 0.0003})`;
    };

    window.addEventListener('scroll', () => {
      if (!scrollingClassActive) {
        heroVideoWrap.classList.add('is-scrolling');
        scrollingClassActive = true;
      }
      clearTimeout(resetTimer);
      resetTimer = setTimeout(() => {
        heroVideoWrap.classList.remove('is-scrolling');
        scrollingClassActive = false;
      }, 200);

      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    }, { passive: true });
  }

  /* ---------- FAQ accordion (delegated) ---------- */
  const faqList = document.querySelector('.faq__list');
  if (faqList) {
    faqList.addEventListener('click', (e) => {
      const btn = e.target.closest('.faq__q');
      if (!btn) return;
      const item = btn.closest('.faq__item');
      if (!item) return;
      const open = item.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', String(open));
    });
  }

  /* ---------- Reveal on scroll ---------- */
  const revealObserver = 'IntersectionObserver' in window
    ? new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' })
    : null;

  document.querySelectorAll(
    '.section__head, .section__chapter, .card, .price, .review, .ig-tile, .achievements li, .coach__quote, .gymdesk, .schedule__note, .cta-final__inner, .manifesto__inner, .coach__visual, .reviews__summary, .tutorial, .success, .tutorials__more'
  ).forEach(el => {
    el.classList.add('reveal');
    if (revealObserver) revealObserver.observe(el);
    else el.classList.add('is-in');
  });

  /* ---------- Stat counters (with overshoot for impact) ---------- */
  const animateCounter = (el, target, duration = 2200) => {
    const valueEl = el.querySelector('.stat__value');
    if (!valueEl) return;
    const start = performance.now();
    // Slight overshoot, then settle. Caps at target so we never display higher.
    const tick = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      // Overshoot phase 0 to 0.85, settle phase 0.85 to 1
      let value;
      if (progress < 0.85) {
        value = (eased / 0.85) * target * 1.08;
      } else {
        const settle = (progress - 0.85) / 0.15;
        const settleEased = 1 - Math.pow(1 - settle, 2);
        value = target * 1.08 - settleEased * (target * 0.08);
      }
      valueEl.textContent = String(Math.min(target, Math.floor(value)));
      if (progress < 1) requestAnimationFrame(tick);
      else valueEl.textContent = String(target);
    };
    requestAnimationFrame(tick);
  };

  const statObserver = 'IntersectionObserver' in window
    ? new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          const target = parseInt(entry.target.dataset.counter, 10);
          if (!isNaN(target)) animateCounter(entry.target, target);
          statObserver.unobserve(entry.target);
        });
      }, { threshold: 0.5 })
    : null;

  document.querySelectorAll('.stat[data-counter]').forEach(stat => {
    if (statObserver) statObserver.observe(stat);
    else {
      const target = parseInt(stat.dataset.counter, 10);
      const valueEl = stat.querySelector('.stat__value');
      if (valueEl && !isNaN(target)) valueEl.textContent = String(target);
    }
  });

  /* ---------- Contact form (demo) ---------- */
  const form    = document.getElementById('contactForm');
  const success = document.getElementById('contactSuccess');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      let valid = true;
      form.querySelectorAll('[required]').forEach(field => {
        if (field.type === 'checkbox') {
          if (!field.checked) valid = false;
        } else if (!field.value.trim()) {
          valid = false;
          field.style.borderColor = 'var(--accent)';
          setTimeout(() => { field.style.borderColor = ''; }, 2000);
        }
      });

      if (!valid) return;

      const submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.style.opacity = '0.7';
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<span>Wird gesendet ...</span>';

      setTimeout(() => {
        form.reset();
        if (success) {
          success.hidden = false;
          success.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        submitBtn.disabled = false;
        submitBtn.style.opacity = '';
        submitBtn.innerHTML = originalText;

        setTimeout(() => { if (success) success.hidden = true; }, 6000);
      }, 900);
    });
  }

  /* ---------- Smooth scroll (delegated) ---------- */
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;
    const id = link.getAttribute('href');
    if (id.length <= 1) return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    const headerH = header ? header.offsetHeight : 76;
    const top = target.getBoundingClientRect().top + window.pageYOffset - headerH - 16;
    window.scrollTo({ top, behavior: 'smooth' });
  });

})();
