(() => {
  const page = document.body;
  const hasFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
  const allowsMotion = window.matchMedia("(prefers-reduced-motion: no-preference)");

  if (!page.classList.contains("tech-portfolio") || !hasFinePointer.matches || !allowsMotion.matches) return;

  let animationFrame;

  window.addEventListener(
    "pointermove",
    (event) => {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(() => {
        page.style.setProperty("--tech-pointer-x", `${event.clientX}px`);
        page.style.setProperty("--tech-pointer-y", `${event.clientY}px`);
      });
    },
    { passive: true }
  );
})();
