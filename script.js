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
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      if (entry.target.classList.contains("skill")) {
        entry.target.classList.add("animated");
      }
    });
  },
  { threshold: 0.18 }
);

revealItems.forEach((item) => observer.observe(item));

window.addEventListener("pointermove", (event) => {
  const x = Math.round((event.clientX / window.innerWidth) * 100);
  const y = Math.round((event.clientY / window.innerHeight) * 100);
  ambient.style.background = `
    radial-gradient(circle at ${x}% ${y}%, rgba(255, 209, 102, 0.18), transparent 0 180px),
    radial-gradient(circle at ${100 - x}% ${100 - y}%, rgba(88, 230, 255, 0.12), transparent 0 220px)
  `;
});
