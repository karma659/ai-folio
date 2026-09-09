(() => {
  "use strict";

  // Filtering is progressive: every project stays available without JavaScript.
  const toolbar = document.querySelector(".project-toolbar");
  if (toolbar) {
    const filters = [...toolbar.querySelectorAll("[data-filter]")];
    const cards = [...document.querySelectorAll(".library-grid .portfolio-card")];
    const count = toolbar.querySelector(".project-count");
    toolbar.hidden = false;
    filters.forEach((button) => {
      button.addEventListener("click", () => {
        const category = button.dataset.filter;
        filters.forEach((filter) => filter.setAttribute("aria-pressed", String(filter === button)));
        let visible = 0;
        cards.forEach((card) => {
          card.hidden = category !== "all" && card.dataset.projectCategory !== category;
          if (!card.hidden) visible += 1;
        });
        count.textContent = `${visible} ${visible === 1 ? "project" : "projects"}`;
      });
    });
  }

  const studio = document.querySelector("[data-signal-studio]");
  if (!studio) return;
  const canvas = studio.querySelector("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
  const pauseButton = studio.querySelector(".motion-toggle");
  const description = studio.querySelector(".studio-description");
  const modeButtons = [...studio.querySelectorAll("[data-signal-mode]")];
  const descriptions = {
    signal: "Finding structure in a field of signals.",
    regime: "Different patterns. A changing market landscape.",
    allocation: "Many components. One connected system.",
  };
  let mode = "signal";
  let width = 0;
  let height = 0;
  let time = 0;
  let previousFrame = 0;
  let frame = null;
  let paused = false;
  let inView = true;
  let pointer = 0;

  function project(x, y, z) {
    const angle = -0.34 + pointer * 0.13;
    const rx = x * Math.cos(angle) - z * Math.sin(angle);
    const rz = x * Math.sin(angle) + z * Math.cos(angle);
    const scale = Math.min(width / 480, height / 280);
    return [width / 2 + rx * scale, height * 0.49 + (y * 0.86 + rz * 0.38) * scale];
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);
    // This is generative art, not market data or a performance chart.
    const rows = 20;
    const columns = 34;
    const points = [];
    for (let row = 0; row < rows; row += 1) {
      points[row] = [];
      for (let col = 0; col < columns; col += 1) {
        let x = (col - (columns - 1) / 2) * 11;
        let z = (row - (rows - 1) / 2) * 11;
        let y;
        if (mode === "signal") {
          const distance = Math.sqrt(x * x * 0.7 + z * z);
          y = Math.sin(distance / 33 - time * 0.6) * 27 + Math.cos(x / 62 + time * 0.25) * 28;
        } else if (mode === "regime") {
          y = Math.sin(x / 40 + time * 0.3) * Math.cos(z / 42 - time * 0.2) * 62;
        } else {
          const theta = (col / (columns - 1)) * Math.PI * 2;
          const phi = (row / (rows - 1)) * Math.PI * 2;
          const radius = 105 + 37 * Math.cos(phi);
          x = radius * Math.cos(theta + time * 0.15);
          z = radius * Math.sin(theta + time * 0.15);
          y = 37 * Math.sin(phi);
        }
        const p = project(x, y, z);
        points[row][col] = p;
        if (col > 0) {
          const before = points[row][col - 1];
          ctx.beginPath();
          ctx.moveTo(before[0], before[1]);
          ctx.lineTo(p[0], p[1]);
          ctx.strokeStyle = "rgba(170,226,143,0.23)";
          ctx.lineWidth = 0.65;
          ctx.stroke();
        }
        if (row > 0) {
          const before = points[row - 1][col];
          ctx.beginPath();
          ctx.moveTo(before[0], before[1]);
          ctx.lineTo(p[0], p[1]);
          ctx.strokeStyle = "rgba(132,203,174,0.16)";
          ctx.lineWidth = 0.55;
          ctx.stroke();
        }
        const emphasis = (col + row * 3) % 17 === 0;
        ctx.beginPath();
        ctx.arc(p[0], p[1], emphasis ? 2 : 1, 0, Math.PI * 2);
        ctx.fillStyle = emphasis ? "#d4ff9e" : "rgba(153,218,154,0.64)";
        ctx.fill();
      }
    }
  }

  function shouldAnimate() {
    return !paused && !reducedMotion.matches && inView && !document.hidden;
  }

  function tick(timestamp) {
    frame = null;
    if (!shouldAnimate()) return;
    if (timestamp - previousFrame >= 32) {
      time += Math.min((timestamp - previousFrame) / 1000, 0.05);
      previousFrame = timestamp;
      draw();
    }
    frame = window.requestAnimationFrame(tick);
  }

  function syncAnimation() {
    if (frame !== null) window.cancelAnimationFrame(frame);
    frame = null;
    pauseButton.disabled = reducedMotion.matches;
    pauseButton.textContent = reducedMotion.matches ? "Motion off" : paused ? "Play" : "Pause";
    pauseButton.setAttribute("aria-pressed", String(paused || reducedMotion.matches));
    pauseButton.setAttribute(
      "aria-label",
      reducedMotion.matches ? "Animation disabled by reduced motion preference" : paused ? "Play visualization" : "Pause visualization"
    );
    draw();
    if (shouldAnimate()) {
      previousFrame = performance.now();
      frame = window.requestAnimationFrame(tick);
    }
  }

  function resize() {
    const bounds = canvas.getBoundingClientRect();
    width = bounds.width;
    height = bounds.height;
    const density = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * density);
    canvas.height = Math.round(height * density);
    ctx.setTransform(density, 0, 0, density, 0, 0);
    draw();
  }

  modeButtons.forEach((button) =>
    button.addEventListener("click", () => {
      mode = button.dataset.signalMode;
      modeButtons.forEach((item) => item.setAttribute("aria-pressed", String(item === button)));
      description.textContent = descriptions[mode];
      draw();
    })
  );
  pauseButton.addEventListener("click", () => {
    paused = !paused;
    syncAnimation();
  });
  studio.addEventListener(
    "pointermove",
    (event) => {
      if (!finePointer.matches || reducedMotion.matches || paused) return;
      const bounds = studio.getBoundingClientRect();
      pointer = (event.clientX - bounds.left) / bounds.width - 0.5;
    },
    { passive: true }
  );
  studio.addEventListener(
    "pointerleave",
    () => {
      pointer = 0;
    },
    { passive: true }
  );
  document.addEventListener("visibilitychange", syncAnimation);
  reducedMotion.addEventListener("change", syncAnimation);
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        syncAnimation();
      },
      { threshold: 0.05 }
    ).observe(studio);
  }
  if ("ResizeObserver" in window) new ResizeObserver(resize).observe(canvas);
  else window.addEventListener("resize", resize, { passive: true });
  studio.classList.add("is-ready");
  studio.querySelector(".studio-controls").hidden = false;
  resize();
  syncAnimation();
})();
