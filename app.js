const menuToggle = document.querySelector('[data-menu-toggle]');
const mobileMenu = document.getElementById('mobile-menu');
const revealItems = document.querySelectorAll('.reveal:not(.is-visible)');
const searchForm = document.getElementById('search-bar');

if (menuToggle && mobileMenu) {
  const setMenu = (open) => {
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    mobileMenu.hidden = !open;
  };

  setMenu(false);

  menuToggle.addEventListener('click', () => {
    setMenu(menuToggle.getAttribute('aria-expanded') !== 'true');
  });

  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setMenu(false));
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 920) setMenu(false);
  });
}

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      });
    },
    { threshold: 0.12 }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

if (searchForm) {
  searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const button = searchForm.querySelector('.search-button');
    if (!button) return;

    const originalText = button.textContent;
    button.disabled = true;
    button.textContent = 'Coming soon';

    window.setTimeout(() => {
      button.textContent = originalText;
      button.disabled = false;
    }, 1400);
  });
}
