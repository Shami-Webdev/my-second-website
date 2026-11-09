"use strict";

const menuButton = document.querySelector(".menu-toggle");
const siteNav = document.querySelector("#site-nav");
const navLinks = document.querySelectorAll("#site-nav a");
const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");
const yearElement = document.querySelector("#year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

if (menuButton && siteNav) {
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";

    menuButton.setAttribute("aria-expanded", String(!isOpen));
    siteNav.classList.toggle("is-open", !isOpen);
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      menuButton.setAttribute("aria-expanded", "false");
      siteNav.classList.remove("is-open");
    });
  });

  document.addEventListener("click", (event) => {
    const clickedInsideMenu =
      siteNav.contains(event.target) || menuButton.contains(event.target);

    if (!clickedInsideMenu) {
      menuButton.setAttribute("aria-expanded", "false");
      siteNav.classList.remove("is-open");
    }
  });
}

if (contactForm && formStatus) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!contactForm.reportValidity()) {
      return;
    }

    formStatus.textContent =
      "Thanks! This is a demo form, so no message was sent or saved.";

    contactForm.reset();
  });
}
const revealItems = document.querySelectorAll(
  ".section-heading, .service-card, .about-visual, .about-copy, .price-card, .contact-form"
);

revealItems.forEach((item) => {
  item.classList.add("reveal");
});

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealItems.forEach((item) => {
  revealObserver.observe(item);
});
const backToTopButton = document.querySelector("#back-to-top");

if (backToTopButton) {
  window.addEventListener("scroll", () => {
    backToTopButton.classList.toggle("is-visible", window.scrollY > 400);
  });

  backToTopButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}