const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('[data-menu-toggle]');
const mobileMenu = document.querySelector('#mobile-menu');

const onScroll = () => {
  header?.setAttribute('data-scrolled', window.scrollY > 10 ? 'true' : 'false');
};

onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isOpen));
    mobileMenu.hidden = isOpen;
    menuToggle.setAttribute('aria-label', isOpen ? 'Open menu' : 'Close menu');
  });

  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Open menu');
      mobileMenu.hidden = true;
    });
  });
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

document.querySelector('.search-bar')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const button = event.currentTarget.querySelector('.search-button');
  const original = button.textContent;
  button.textContent = 'Coming soon';
  button.disabled = true;
  setTimeout(() => {
    button.textContent = original;
    button.disabled = false;
  }, 1400);
});
