
const navToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });
}

const currentPage = window.location.pathname.split("/").pop() || "index.html";
document.querySelectorAll(".nav-links a").forEach((link) => {
  if (link.getAttribute("href") === currentPage) {
    link.classList.add("active");
  }
});

const revealItems = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: 0.12 });

revealItems.forEach((item) => observer.observe(item));

const form = document.getElementById("commitmentForm");
const input = document.getElementById("commitmentInput");
const saved = document.getElementById("savedCommitment");

function showCommitment() {
  const value = localStorage.getItem("attentionCommitment");
  if (saved && value) {
    saved.textContent = `Saved commitment: ${value}`;
  }
}

if (form && input) {
  showCommitment();
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const value = input.value.trim();
    if (!value) {
      saved.textContent = "Write one small commitment first.";
      return;
    }
    localStorage.setItem("attentionCommitment", value);
    showCommitment();
    input.value = "";
  });
}
