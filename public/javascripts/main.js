// main.js - Downtown Donuts front-end interactions

document.addEventListener("DOMContentLoaded", () => {
  setupNavToggle();
  setupMenuFilters();
  setupCommentEnhancements();
});

function setupNavToggle() {
  const toggle = document.querySelector(".dd-nav-toggle");
  const links = document.querySelector(".dd-nav-links");
  if (!toggle || !links) return;

  toggle.addEventListener("click", () => {
    links.classList.toggle("dd-nav-links--open");
  });
}

function setupMenuFilters() {
  const filterContainer = document.querySelector("[data-js='menu-filters']");
  if (!filterContainer) return;

  const chips = Array.from(filterContainer.querySelectorAll(".dd-chip"));
  const sections = Array.from(document.querySelectorAll(".dd-menu-section"));

  filterContainer.addEventListener("click", (evt) => {
    const button = evt.target.closest("button[data-filter]");
    if (!button) return;

    const filter = button.getAttribute("data-filter");

    chips.forEach((chip) =>
      chip.classList.toggle("dd-chip--active", chip === button)
    );

    sections.forEach((section) => {
      const cat = section.getAttribute("data-category");
      section.style.display =
        filter === "all" || filter === cat ? "" : "none";
    });
  });
}

function setupCommentEnhancements() {
  const form = document.querySelector("[data-js='comment-form']");
  if (!form) return;

  // Tiny UX touch: show remaining character count (optional)
  const textarea = form.querySelector("textarea[name='comment']");
  const counter = document.createElement("div");
  counter.style.fontSize = "0.78rem";
  counter.style.marginTop = "0.15rem";
  counter.style.opacity = "0.8";
  let maxChars = 400;
  textarea.parentElement.appendChild(counter);

  const updateCounter = () => {
    const remaining = maxChars - textarea.value.length;
    counter.textContent = `${Math.max(remaining, 0)} characters remaining`;
  };

  textarea.setAttribute("maxlength", maxChars.toString());
  textarea.addEventListener("input", updateCounter);
  updateCounter();
}
