const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
const revealItems = document.querySelectorAll(".reveal");
const skills = document.querySelectorAll(".skill");
const ambient = document.querySelector(".ambient");

menuButton.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  document.body.classList.toggle("menu-open", isOpen);
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".nav a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    document.body.classList.remove("menu-open");
    menuButton.setAttribute("aria-expanded", "false");
  });
});

skills.forEach((skill) => {
  const level = skill.dataset.level;
  skill.style.setProperty("--level", `${level}%`);
  skill.querySelector("strong").dataset.percent = `${level}%`;
});

const observer = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      if (entry.target.classList.contains("skill")) {
        entry.target.classList.add("animated");
      }
      obs.unobserve(entry.target);
    });
  },
  { threshold: 0, rootMargin: "0px 0px -20px 0px" }
);

revealItems.forEach((item) => observer.observe(item));

// Fallback check to guarantee visibility on mobile browsers
function checkRevealInView() {
  const windowH = window.innerHeight || document.documentElement.clientHeight;
  revealItems.forEach((item) => {
    if (!item.classList.contains("visible")) {
      const rect = item.getBoundingClientRect();
      if (rect.top < windowH + 60 && rect.bottom > -60) {
        item.classList.add("visible");
        if (item.classList.contains("skill")) {
          item.classList.add("animated");
        }
      }
    }
  });
}
window.addEventListener("scroll", checkRevealInView, { passive: true });
window.addEventListener("resize", checkRevealInView, { passive: true });
setTimeout(checkRevealInView, 500);
setTimeout(checkRevealInView, 1500);

window.addEventListener("pointermove", (event) => {
  const x = Math.round((event.clientX / window.innerWidth) * 100);
  const y = Math.round((event.clientY / window.innerHeight) * 100);
  ambient.style.background = `
    radial-gradient(circle at ${x}% ${y}%, rgba(255, 209, 102, 0.18), transparent 0 180px),
    radial-gradient(circle at ${100 - x}% ${100 - y}%, rgba(88, 230, 255, 0.12), transparent 0 220px)
  `;
});

// Blog memory photo thumbnail switcher
document.querySelectorAll(".thumb-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".thumb-btn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const targetImg = document.getElementById("featured-memory-img");
    const targetCap = document.getElementById("featured-memory-cap");
    if (targetImg && btn.dataset.src) {
      targetImg.src = btn.dataset.src;
      if (btn.dataset.cap && targetCap) {
        targetCap.textContent = btn.dataset.cap;
      }
    }
  });
});

// Lightbox modal functionality
const lightbox = document.getElementById("lightbox-modal");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxCap = document.getElementById("lightbox-caption");
const lightboxClose = document.getElementById("lightbox-close");

if (lightbox && lightboxImg) {
  document.querySelectorAll("[data-lightbox]").forEach((el) => {
    el.addEventListener("click", () => {
      const src =
        el.dataset.src ||
        el.getAttribute("src") ||
        (el.querySelector("img") && el.querySelector("img").src);
      const cap =
        el.dataset.cap ||
        el.getAttribute("alt") ||
        (el.querySelector("figcaption") && el.querySelector("figcaption").textContent) ||
        (el.querySelector(".item-title") && el.querySelector(".item-title").textContent) ||
        "";
      if (src) {
        lightboxImg.src = src;
        lightboxCap.textContent = cap;
        lightbox.classList.add("active");
        document.body.style.overflow = "hidden";
      }
    });
  });

  const closeLightbox = () => {
    lightbox.classList.remove("active");
    document.body.style.overflow = "";
  };

  if (lightboxClose) {
    lightboxClose.addEventListener("click", closeLightbox);
  }
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.classList.contains("active")) {
      closeLightbox();
    }
  });
}

