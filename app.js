const menuToggle = document.querySelector("[data-menu-toggle]");
const mobileMenu = document.getElementById("mobile-menu");
const revealItems = document.querySelectorAll(".reveal");
const searchForm = document.getElementById("search-bar");

if (menuToggle && mobileMenu) {
  const closeMenu = () => {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open menu");
    mobileMenu.hidden = true;
  };

  const openMenu = () => {
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Close menu");
    mobileMenu.hidden = false;
  };

  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    isOpen ? closeMenu() : openMenu();
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 920) closeMenu();
  });
}

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      });
    },
    { threshold: 0.12 }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

if (searchForm) {
  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const button = searchForm.querySelector(".search-button");
    if (!button) return;

    const originalText = button.textContent;
    button.disabled = true;
    button.textContent = "Coming soon";

    window.setTimeout(() => {
      button.textContent = originalText;
      button.disabled = false;
    }, 1400);
  });
}
