/* ── script.js ─────────────────────────────────────────────────── */

/* ── NAV SCROLL ──────────────────────────────────────────────────── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
  document.getElementById('scrollTop').classList.toggle('show', window.scrollY > 400);
  animateSkillBars();
});

/* ── HAMBURGER ───────────────────────────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});
mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

/* ── SCROLL TO TOP ───────────────────────────────────────────────── */
document.getElementById('scrollTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ── SMOOTH SCROLL for nav links ─────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ── REVEAL ON SCROLL ────────────────────────────────────────────── */
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, idx) => {
    if (entry.isIntersecting) {
      // Stagger siblings in the same grid parent
      const siblings = Array.from(entry.target.parentElement.querySelectorAll('.reveal:not(.visible)'));
      const delay = siblings.indexOf(entry.target) * 80;
      setTimeout(() => entry.target.classList.add('visible'), delay);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

reveals.forEach(el => revealObserver.observe(el));

/* ── TYPED TEXT ──────────────────────────────────────────────────── */
const phrases = [
  'engaging blog posts.',
  'SEO-optimised articles.',
  'compelling website copy.',
  'scroll-stopping captions.',
  'research-backed content.',
  'AI-polished writing.',
];
let phraseIdx = 0, charIdx = 0, deleting = false, typedEl = document.getElementById('typed');

function type() {
  if (!typedEl) return;
  const current = phrases[phraseIdx];
  if (!deleting) {
    typedEl.textContent = current.substring(0, charIdx + 1);
    charIdx++;
    if (charIdx === current.length) { deleting = true; setTimeout(type, 1800); return; }
  } else {
    typedEl.textContent = current.substring(0, charIdx - 1);
    charIdx--;
    if (charIdx === 0) { deleting = false; phraseIdx = (phraseIdx + 1) % phrases.length; }
  }
  setTimeout(type, deleting ? 50 : 80);
}
setTimeout(type, 800);

/* ── ANIMATED COUNTERS ───────────────────────────────────────────── */
let countersStarted = false;
function startCounters() {
  if (countersStarted) return;
  const counters = document.querySelectorAll('.counter');
  if (!counters.length) return;
  const heroRect = counters[0].closest('section')?.getBoundingClientRect();
  if (!heroRect || heroRect.top > window.innerHeight) return;
  countersStarted = true;
  counters.forEach(counter => {
    const target = parseInt(counter.dataset.target, 10);
    const duration = 1800;
    const step = target / (duration / 16);
    let current = 0;
    const tick = () => {
      current += step;
      counter.textContent = Math.min(Math.round(current), target);
      if (current < target) requestAnimationFrame(tick);
    };
    tick();
  });
}
window.addEventListener('scroll', startCounters);
window.addEventListener('load', startCounters);

/* ── SKILL BARS ──────────────────────────────────────────────────── */
let barsAnimated = false;
function animateSkillBars() {
  if (barsAnimated) return;
  const section = document.getElementById('skills');
  if (!section) return;
  const rect = section.getBoundingClientRect();
  if (rect.top < window.innerHeight - 100) {
    barsAnimated = true;
    document.querySelectorAll('.skill-fill').forEach(fill => {
      const w = fill.dataset.width;
      setTimeout(() => fill.style.width = w + '%', 200);
    });
  }
}

/* ── PORTFOLIO FILTER ────────────────────────────────────────────── */
const filterBtns = document.querySelectorAll('.filter-btn');
const portCards  = document.querySelectorAll('.portfolio-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    portCards.forEach(card => {
      const cats = card.dataset.cat || '';
      if (filter === 'all' || cats.includes(filter)) {
        card.classList.remove('hidden');
        card.style.animation = 'fadeInUp .4s ease forwards';
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

/* ── CONTACT FORM ────────────────────────────────────────────────── */
const form  = document.getElementById('contactForm');
const toast = document.getElementById('toast');

form?.addEventListener('submit', e => {
  e.preventDefault();
  const btn = form.querySelector('button[type="submit"]');
  btn.textContent = 'Sending…';
  btn.disabled = true;
  setTimeout(() => {
    btn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Message';
    btn.disabled = false;
    form.reset();
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 4000);
  }, 1400);
});

/* ── ACTIVE NAV HIGHLIGHT ─────────────────────────────────────────── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = link.getAttribute('href') === '#' + entry.target.id ? 'var(--accent)' : '';
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

/* ── CSS FADE-IN KEYFRAMES (injected dynamically) ────────────────── */
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(style);
