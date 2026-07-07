// Reveal-on-scroll for elements with .reveal class
const reveals = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
reveals.forEach(r => io.observe(r));

// Timeline staggered reveal
document.querySelectorAll('.timeline__step').forEach((step, i) => {
  step.style.transitionDelay = `${i * 0.12}s`;
});

// Promise staggered reveal
document.querySelectorAll('.promise__item').forEach((item, i) => {
  item.style.transitionDelay = `${i * 0.08}s`;
});

// Nav: transparent over hero, solid + shadow once scrolled past it
const nav = document.querySelector('.nav');
const toTopBtn = document.querySelector('.to-top');
const hero = document.querySelector('.hero');
function updateNav() {
  const y = window.scrollY;
  const heroBottom = hero ? hero.offsetHeight - 80 : window.innerHeight * 0.7;
  const scrolled = y > heroBottom;
  nav.classList.toggle('nav--scrolled', scrolled);
  nav.style.boxShadow = scrolled ? '0 4px 20px rgba(61, 28, 0, 0.10)' : 'none';
  if (toTopBtn) toTopBtn.classList.toggle('visible', y > 400);
}
window.addEventListener('scroll', updateNav, { passive: true });
window.addEventListener('resize', updateNav);
updateNav();

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Hamburger menu toggle
function toggleMenu() {
  const links = document.getElementById('navLinks');
  const burger = document.querySelector('.nav__burger');
  links.classList.toggle('open');
  burger.classList.toggle('active');
  burger.setAttribute('aria-label', links.classList.contains('open') ? 'Close menu' : 'Open menu');
}
function closeMenu() {
  document.getElementById('navLinks').classList.remove('open');
  document.querySelector('.nav__burger').classList.remove('active');
}
// Close menu on outside click
document.addEventListener('click', (e) => {
  const nav = document.querySelector('.nav');
  const links = document.getElementById('navLinks');
  if (links.classList.contains('open') && !nav.contains(e.target)) {
    closeMenu();
  }
});

// WhatsApp opt-in handler
function handleJoin(e) {
  e.preventDefault();
  const form = e.target;
  const phone = form.phone.value.trim();
  const name = form.name.value.trim();

  if (phone.length !== 10) {
    alert('Please enter a valid 10-digit WhatsApp number.');
    return false;
  }

  const message = encodeURIComponent(`Hi Mishra Ji! I'm ${name} and I want on the list. My number is +91${phone}.`);
  const whatsappURL = `https://wa.me/919999999999?text=${message}`;

  const btn = form.querySelector('.join__btn');
  const originalText = btn.textContent;
  btn.textContent = 'Opening WhatsApp...';
  btn.style.background = 'var(--green)';
  btn.style.color = 'var(--cream)';

  setTimeout(() => {
    window.open(whatsappURL, '_blank');
    btn.textContent = 'You\'re on the list! ✓';
    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.background = '';
      btn.style.color = '';
      form.reset();
    }, 2500);
  }, 800);

  return false;
}
