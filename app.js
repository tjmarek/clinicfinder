const root = document.documentElement;
const toggle = document.querySelector('[data-theme-toggle]');
const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('[data-menu-toggle]');
const mobileMenu = document.querySelector('#mobile-menu');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
let theme = prefersDark.matches ? 'dark' : 'light';

const applyTheme = (value) => {
  theme = value;
  root.setAttribute('data-theme', value);
  if (toggle) {
    toggle.setAttribute('aria-label', `Switch to ${value === 'dark' ? 'light' : 'dark'} mode`);
  }
};

applyTheme(theme);

prefersDark.addEventListener('change', (event) => {
  if (!root.hasAttribute('data-user-theme')) {
    applyTheme(event.matches ? 'dark' : 'light');
  }
});

if (toggle) {
  toggle.addEventListener('click', () => {
    root.setAttribute('data-user-theme', 'true');
    applyTheme(theme === 'dark' ? 'light' : 'dark');
  });
}

const onScroll = () => {
  header?.setAttribute('data-scrolled', window.scrollY > 20 ? 'true' : 'false');
};

onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isOpen));
    mobileMenu.hidden = isOpen;
  });

  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menuToggle.setAttribute('aria-expanded', 'false');
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

document.querySelector('.search-strip')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const button = event.currentTarget.querySelector('.cta-button');
  const original = button.textContent;
  button.textContent = 'Coming soon';
  button.disabled = true;
  setTimeout(() => {
    button.textContent = original;
    button.disabled = false;
  }, 1400);
});
