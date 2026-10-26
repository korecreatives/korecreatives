// ── Cursor blob ───────────────────────────────────────
const blob = document.getElementById('blob');
if (blob) {
  window.addEventListener('mousemove', e => {
    blob.style.left = e.clientX + 'px';
    blob.style.top  = e.clientY + 'px';
  });
}

// ── Scroll reveal ─────────────────────────────────────
const revealEls = document.querySelectorAll('.reveal');
if (revealEls.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => observer.observe(el));
}

// ── Nav background on scroll ───────────────────────────
const nav = document.querySelector('nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.style.background = window.scrollY > 60 ? 'rgba(27,29,54,0.92)' : 'rgba(27,29,54,0.6)';
  }, { passive: true });
}

// ── Mobile menu ─────────────────────────────────────────
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
if (burger && mobileMenu) {
  burger.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('open');
    burger.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open);
  });
  document.querySelectorAll('.mobile-link').forEach(a => {
    a.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      burger.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    });
  });
}

// ── About pill tabs ─────────────────────────────────────
document.querySelectorAll('.pill').forEach(pill => {
  pill.addEventListener('click', () => {
    document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
    pill.classList.add('active');
    document.querySelectorAll('.pill-panel').forEach(p => p.classList.remove('active'));
    document.getElementById(pill.dataset.panel).classList.add('active');
  });
});

// ── Our Service horizontal carousel ─────────────────────
const osTrack = document.getElementById('osTrack');
const osNext = document.getElementById('osNext');
const osPrev = document.getElementById('osPrev');
if (osTrack && osNext && osPrev) {
  osNext.addEventListener('click', () => osTrack.scrollBy({ left: 340, behavior: 'smooth' }));
  osPrev.addEventListener('click', () => osTrack.scrollBy({ left: -340, behavior: 'smooth' }));
}

// ── Service tabs (overview cards + tab buttons both control panels) ──
function showPanel(id) {
  document.querySelectorAll('.detail-panel').forEach(p => p.classList.remove('active'));
  const target = document.getElementById(id);
  if (target) target.classList.add('active');
  document.querySelectorAll('.service-tab').forEach(t => t.classList.toggle('active', t.dataset.panel === id));
}
document.querySelectorAll('.service-tab').forEach(tab => {
  tab.addEventListener('click', () => showPanel(tab.dataset.panel));
});
document.querySelectorAll('.service-card').forEach(card => {
  card.addEventListener('click', () => {
    showPanel(card.dataset.target);
    const detail = document.getElementById('servicedetail');
    if (detail) detail.scrollIntoView({ behavior: 'smooth' });
  });
});

// ── Portfolio filters ───────────────────────────────────
document.querySelectorAll('.pf-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.pf-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.project-card').forEach(card => {
      const tags = card.dataset.tags || '';
      card.style.display = (filter === 'all' || tags.includes(filter)) ? 'flex' : 'none';
    });
  });
});

// ── Testimonial carousel ────────────────────────────────
const testiTrack = document.getElementById('testiTrack');
if (testiTrack) {
  const slides = document.querySelectorAll('.testi-slide');
  const dotsWrap = document.getElementById('testiDots');
  let testiIndex = 0;
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'testi-dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => goToSlide(i));
    dotsWrap.appendChild(dot);
  });
  function goToSlide(i) {
    testiIndex = (i + slides.length) % slides.length;
    testiTrack.style.transform = `translateX(-${testiIndex * 100}%)`;
    document.querySelectorAll('.testi-dot').forEach((d, di) => d.classList.toggle('active', di === testiIndex));
  }
  document.getElementById('testiNext').addEventListener('click', () => goToSlide(testiIndex + 1));
  document.getElementById('testiPrev').addEventListener('click', () => goToSlide(testiIndex - 1));
  let testiAuto = setInterval(() => goToSlide(testiIndex + 1), 6000);
  document.querySelector('.testi-wrap').addEventListener('mouseenter', () => clearInterval(testiAuto));
  document.querySelector('.testi-wrap').addEventListener('mouseleave', () => { testiAuto = setInterval(() => goToSlide(testiIndex + 1), 6000); });
}

// ── Hero / stats counters ──────────────────────────────────
const statEls = document.querySelectorAll('.hero-stat-num');
if (statEls.length) {
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10);
      const suffix = el.querySelector('span').outerHTML;
      let current = 0;
      const step = Math.max(1, Math.round(target / 40));
      const tick = () => {
        current = Math.min(target, current + step);
        el.innerHTML = current + suffix;
        if (current < target) requestAnimationFrame(tick);
      };
      tick();
      statObserver.unobserve(el);
    });
  }, { threshold: 0.5 });
  statEls.forEach(el => statObserver.observe(el));
}

// ── Showreel play button (toast) ────────────────────────
const toast = document.getElementById('toast');
const playReel = document.getElementById('playReel');
if (toast && playReel) {
  playReel.addEventListener('click', () => {
    toast.textContent = 'Reel coming soon — check back shortly';
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2600);
  });
}

// ── Contact form (Start a Project) ──────────────────────
const projectForm = document.getElementById('projectForm');
if (projectForm && toast) {
  projectForm.addEventListener('submit', (e) => {
    e.preventDefault();
    toast.textContent = "Thanks — we'll be in touch within 1 business day";
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3200);
    projectForm.reset();
  });
}
