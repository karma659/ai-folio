(() => {
  const menu = document.getElementById("navbarNav");
  const toggle = document.querySelector('[data-target="#navbarNav"]');
  if (!menu || !toggle) return;

  const sectionHashes = new Set(["#skills", "#projects"]);
  const links = [...menu.querySelectorAll("a.nav-link")];

  const updateCurrentSection = () => {
    const currentHash = sectionHashes.has(window.location.hash) ? window.location.hash : "";
    links.forEach((link) => {
      const active = link.pathname === window.location.pathname && link.hash === currentHash;
      link.closest(".nav-item").classList.toggle("active", active);
      if (active) link.setAttribute("aria-current", currentHash ? "location" : "page");
      else link.removeAttribute("aria-current");

      const currentLabel = link.querySelector(".sr-only");
      if (currentLabel) currentLabel.hidden = !active;
    });
  };

  menu.addEventListener("click", (event) => {
    const link = event.target.closest("a.nav-link");
    if (!link || link.origin !== window.location.origin || link.pathname !== window.location.pathname) return;
    if (sectionHashes.has(link.hash) && toggle.getAttribute("aria-expanded") === "true") {
      if (window.jQuery && window.jQuery.fn.collapse) {
        const collapse = window.jQuery(menu);
        if (menu.classList.contains("collapsing")) {
          collapse.one("shown.bs.collapse", () => collapse.collapse("hide"));
        } else collapse.collapse("hide");
      } else toggle.click();
    }
  });

  window.addEventListener("hashchange", updateCurrentSection);
  updateCurrentSection();
})();
