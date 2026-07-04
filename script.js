// Reveal-on-scroll for elements with .reveal class
const reveals = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
reveals.forEach(r => io.observe(r));

// Timeline staggered reveal
const timelineSteps = document.querySelectorAll('.timeline__step');
timelineSteps.forEach((step, i) => {
  step.style.transitionDelay = `${i * 0.15}s`;
});

// Nav shadow on scroll
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    nav.style.boxShadow = '0 4px 20px rgba(61, 28, 0, 0.08)';
  } else {
    nav.style.boxShadow = 'none';
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

  // In production this posts to Petpooja/Interakt CRM API.
  // For now: local confirmation + WhatsApp deep link.
  const message = encodeURIComponent(`Hi Mishra Ji! I'm ${name} and I want on the list. My number is +91${phone}.`);
  const whatsappURL = `https://wa.me/919999999999?text=${message}`;

  // Show inline success then redirect
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
