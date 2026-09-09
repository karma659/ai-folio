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
  const display = studio.querySelector(".signal-display");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const pauseButton = studio.querySelector(".motion-toggle");
  const description = studio.querySelector(".studio-description");
  const readout = studio.querySelector(".studio-readout");
  const modeButtons = [...studio.querySelectorAll("[data-signal-mode]")];
  const descriptions = {
    signal: "Shape the field with your pointer. Click to inject a signal.",
    regime: "Explore shifting regimes. Every impulse changes the landscape.",
    allocation: "Rotate a connected system. Disturb it to see risk propagate.",
  };
  const palettes = {
    signal: {
      row: "rgba(181, 245, 138, 0.29)",
      column: "rgba(107, 211, 170, 0.2)",
      point: "rgba(161, 225, 160, 0.72)",
      bright: "#d4ff9e",
    },
    regime: {
      row: "rgba(112, 232, 218, 0.28)",
      column: "rgba(181, 245, 138, 0.18)",
      point: "rgba(116, 218, 198, 0.72)",
      bright: "#c8fff2",
    },
    allocation: {
      row: "rgba(211, 235, 149, 0.27)",
      column: "rgba(105, 204, 180, 0.2)",
      point: "rgba(192, 228, 151, 0.7)",
      bright: "#efffb5",
    },
  };
  let mode = "signal";
  let width = 0;
  let height = 0;
  let time = 0;
  let previousFrame = 0;
  let frame = null;
  let paused = false;
  let inView = true;
  let impulseCount = 0;
  let pulses = [];
  let sparks = [];
  const pointer = {
    x: 0.5,
    y: 0.5,
    targetX: 0.5,
    targetY: 0.5,
    strength: 0,
    targetStrength: 0,
    velocity: 0,
  };

  function clamp(value, minimum, maximum) {
    return Math.min(Math.max(value, minimum), maximum);
  }

  function project(x, y, z) {
    const angle = -0.34 + (pointer.x - 0.5) * 0.48 * pointer.strength;
    const rx = x * Math.cos(angle) - z * Math.sin(angle);
    const rz = x * Math.sin(angle) + z * Math.cos(angle);
    const scale = Math.min(width / 480, height / 280);
    const verticalShift = (pointer.y - 0.5) * 24 * pointer.strength;
    return [width / 2 + rx * scale, height * 0.49 + verticalShift + (y * 0.86 + rz * 0.38) * scale];
  }

  function interactionHeight(columnRatio, rowRatio) {
    const dx = columnRatio - pointer.x;
    const dy = rowRatio - pointer.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const focus = Math.exp(-(distance * distance) / 0.024) * pointer.strength;
    let displacement = Math.cos(distance * 24 - time * 4.2) * focus * (30 + pointer.velocity * 20);

    pulses.forEach((pulse) => {
      const age = time - pulse.started;
      const pulseDistance = Math.sqrt((columnRatio - pulse.x) ** 2 + (rowRatio - pulse.y) ** 2);
      const radius = age * 0.46;
      const ring = Math.exp(-((pulseDistance - radius) ** 2) / 0.0018);
      displacement += ring * pulse.force * 42 * Math.max(0, 1 - age / 2.2);
    });
    return displacement;
  }

  function drawPulseEffects() {
    pulses.forEach((pulse) => {
      const age = time - pulse.started;
      const alpha = Math.max(0, 0.72 - age * 0.34);
      ctx.beginPath();
      ctx.arc(pulse.x * width, pulse.y * height, 12 + age * 88, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(202, 255, 158, ${alpha})`;
      ctx.lineWidth = Math.max(0.5, 1.8 - age * 0.5);
      ctx.stroke();
    });

    sparks.forEach((spark) => {
      const age = time - spark.started;
      const progress = age / spark.life;
      const x = spark.x * width + Math.cos(spark.angle) * spark.speed * age;
      const y = spark.y * height + Math.sin(spark.angle) * spark.speed * age;
      ctx.beginPath();
      ctx.arc(x, y, Math.max(0.4, 1.8 * (1 - progress)), 0, Math.PI * 2);
      ctx.fillStyle = `rgba(212, 255, 158, ${Math.max(0, 1 - progress)})`;
      ctx.fill();
    });
  }

  function drawPointerFocus() {
    if (pointer.strength < 0.025) return;
    const x = pointer.x * width;
    const y = pointer.y * height;
    const radius = 12 + pointer.velocity * 7;
    ctx.save();
    ctx.setLineDash([3, 4]);
    ctx.strokeStyle = `rgba(212, 255, 158, ${0.25 + pointer.strength * 0.35})`;
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.beginPath();
    ctx.arc(x, y, 2.2 + pointer.velocity * 1.4, 0, Math.PI * 2);
    ctx.fillStyle = "#d4ff9e";
    ctx.fill();
    ctx.restore();
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);
    // This is generative art, not market data or a performance chart.
    const rows = 20;
    const columns = 34;
    const points = [];
    const palette = palettes[mode];
    for (let row = 0; row < rows; row += 1) {
      points[row] = [];
      for (let col = 0; col < columns; col += 1) {
        const columnRatio = col / (columns - 1);
        const rowRatio = row / (rows - 1);
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
        y += interactionHeight(columnRatio, rowRatio);
        const p = project(x, y, z);
        points[row][col] = p;
        if (col > 0) {
          const before = points[row][col - 1];
          ctx.beginPath();
          ctx.moveTo(before[0], before[1]);
          ctx.lineTo(p[0], p[1]);
          ctx.strokeStyle = palette.row;
          ctx.lineWidth = 0.65;
          ctx.stroke();
        }
        if (row > 0) {
          const before = points[row - 1][col];
          ctx.beginPath();
          ctx.moveTo(before[0], before[1]);
          ctx.lineTo(p[0], p[1]);
          ctx.strokeStyle = palette.column;
          ctx.lineWidth = 0.55;
          ctx.stroke();
        }
        const emphasis = (col + row * 3) % 17 === 0;
        ctx.beginPath();
        ctx.arc(p[0], p[1], emphasis ? 2.2 + pointer.velocity * 0.35 : 1, 0, Math.PI * 2);
        ctx.fillStyle = emphasis ? palette.bright : palette.point;
        ctx.fill();
      }
    }
    drawPulseEffects();
    drawPointerFocus();
  }

  function shouldAnimate() {
    return !paused && !reducedMotion.matches && inView && !document.hidden;
  }

  function tick(timestamp) {
    frame = null;
    if (!shouldAnimate()) return;
    if (timestamp - previousFrame >= 32) {
      time += Math.min((timestamp - previousFrame) / 1000, 0.05);
      pointer.x += (pointer.targetX - pointer.x) * 0.12;
      pointer.y += (pointer.targetY - pointer.y) * 0.12;
      pointer.strength += (pointer.targetStrength - pointer.strength) * 0.1;
      pointer.velocity *= 0.9;
      pulses = pulses.filter((pulse) => time - pulse.started < 2.25);
      sparks = sparks.filter((spark) => time - spark.started < spark.life);
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
    studio.classList.toggle("is-paused", paused || reducedMotion.matches);
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

  function setPointer(event) {
    const bounds = display.getBoundingClientRect();
    const x = clamp((event.clientX - bounds.left) / bounds.width, 0, 1);
    const y = clamp((event.clientY - bounds.top) / bounds.height, 0, 1);
    const movement = Math.hypot(x - pointer.targetX, y - pointer.targetY);
    pointer.velocity = Math.min(1.5, pointer.velocity + movement * 9);
    pointer.targetX = x;
    pointer.targetY = y;
    pointer.targetStrength = 1;
    display.style.setProperty("--signal-x", `${Math.round(x * 100)}%`);
    display.style.setProperty("--signal-y", `${Math.round(y * 100)}%`);
    readout.textContent = `X ${String(Math.round(x * 99)).padStart(2, "0")} · Y ${String(Math.round(y * 99)).padStart(2, "0")} · I ${String(
      impulseCount
    ).padStart(2, "0")}`;
  }

  function sendImpulse(x = pointer.targetX, y = pointer.targetY, force = 1) {
    impulseCount = (impulseCount + 1) % 100;
    pulses.push({ x, y, force, started: time });
    for (let index = 0; index < 18; index += 1) {
      sparks.push({
        x,
        y,
        angle: (Math.PI * 2 * index) / 18 + Math.random() * 0.22,
        speed: 34 + Math.random() * 48,
        life: 0.55 + Math.random() * 0.7,
        started: time,
      });
    }
    pointer.targetX = x;
    pointer.targetY = y;
    pointer.targetStrength = 1;
    pointer.velocity = Math.max(pointer.velocity, 1.15);
    readout.textContent = `X ${String(Math.round(x * 99)).padStart(2, "0")} · Y ${String(Math.round(y * 99)).padStart(2, "0")} · I ${String(
      impulseCount
    ).padStart(2, "0")}`;
    draw();
  }

  modeButtons.forEach((button) =>
    button.addEventListener("click", () => {
      mode = button.dataset.signalMode;
      modeButtons.forEach((item) => item.setAttribute("aria-pressed", String(item === button)));
      description.textContent = descriptions[mode];
      sendImpulse(0.5, 0.5, 0.72);
    })
  );
  pauseButton.addEventListener("click", () => {
    paused = !paused;
    syncAnimation();
  });
  display.addEventListener(
    "pointerenter",
    (event) => {
      if (reducedMotion.matches) return;
      studio.classList.add("is-engaged");
      setPointer(event);
    },
    { passive: true }
  );
  display.addEventListener(
    "pointermove",
    (event) => {
      if (reducedMotion.matches || paused) return;
      setPointer(event);
    },
    { passive: true }
  );
  display.addEventListener("pointerdown", (event) => {
    if (reducedMotion.matches || paused) return;
    setPointer(event);
    studio.classList.add("is-interacting");
    sendImpulse(pointer.targetX, pointer.targetY, 1);
  });
  display.addEventListener(
    "pointerleave",
    () => {
      pointer.targetStrength = 0;
      studio.classList.remove("is-engaged", "is-interacting");
    },
    { passive: true }
  );
  display.addEventListener(
    "pointerup",
    () => {
      studio.classList.remove("is-interacting");
    },
    { passive: true }
  );
  display.addEventListener(
    "pointercancel",
    () => {
      studio.classList.remove("is-interacting");
    },
    { passive: true }
  );
  display.addEventListener("keydown", (event) => {
    if ((event.key !== "Enter" && event.key !== " ") || reducedMotion.matches || paused) return;
    event.preventDefault();
    sendImpulse(0.5, 0.5, 1);
  });
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
