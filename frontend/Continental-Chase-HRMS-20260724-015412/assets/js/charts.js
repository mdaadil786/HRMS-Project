(function () {
  function cssVar(name) {
    return getComputedStyle(document.body).getPropertyValue(name).trim() ||
      getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  }

  function palette() {
    return [
      cssVar("--accent"),
      cssVar("--success"),
      cssVar("--warning"),
      cssVar("--danger"),
      cssVar("--tone-purple-text"),
      cssVar("--tone-slate-text")
    ];
  }

  function setup(canvas) {
    const rect = canvas.getBoundingClientRect();
    const scale = window.devicePixelRatio || 1;
    canvas.width = Math.max(rect.width, 280) * scale;
    canvas.height = Math.max(rect.height, 180) * scale;
    const ctx = canvas.getContext("2d");
    ctx.setTransform(scale, 0, 0, scale, 0, 0);
    ctx.clearRect(0, 0, rect.width, rect.height);
    ctx.font = "12px Poppins, Segoe UI, sans-serif";
    ctx.lineCap = "round";
    return { ctx, width: rect.width, height: rect.height };
  }

  function grid(ctx, width, height) {
    ctx.strokeStyle = "rgba(148,163,184,0.22)";
    ctx.lineWidth = 1;
    for (let i = 0; i < 4; i += 1) {
      const y = 22 + ((height - 56) / 3) * i;
      ctx.beginPath();
      ctx.moveTo(34, y);
      ctx.lineTo(width - 14, y);
      ctx.stroke();
    }
  }

  function line(canvas, labels, values, color = cssVar("--accent")) {
    const { ctx, width, height } = setup(canvas);
    const min = Math.min(...values);
    const max = Math.max(...values);
    grid(ctx, width, height);
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.beginPath();
    values.forEach((value, index) => {
      const x = 38 + ((width - 62) / Math.max(values.length - 1, 1)) * index;
      const y = height - 34 - ((value - min) / Math.max(max - min, 1)) * (height - 68);
      if (index === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();
    ctx.fillStyle = color;
    values.forEach((value, index) => {
      const x = 38 + ((width - 62) / Math.max(values.length - 1, 1)) * index;
      const y = height - 34 - ((value - min) / Math.max(max - min, 1)) * (height - 68);
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fill();
    });
    labels.forEach((label, index) => {
      const x = 30 + ((width - 62) / Math.max(labels.length - 1, 1)) * index;
      ctx.fillStyle = cssVar("--muted");
      ctx.fillText(String(label).slice(0, 8), x, height - 9);
    });
  }

  function bars(canvas, labels, values, colors = palette()) {
    const { ctx, width, height } = setup(canvas);
    const max = Math.max(...values);
    const left = 34;
    const plotWidth = width - 54;
    const gap = Math.max(8, plotWidth / values.length * 0.18);
    const barWidth = Math.max((plotWidth - gap * (values.length - 1)) / values.length, 12);
    grid(ctx, width, height);
    values.forEach((value, index) => {
      const barHeight = (value / max) * (height - 72);
      const x = left + index * (barWidth + gap);
      const y = height - 32 - barHeight;
      ctx.fillStyle = colors[index % colors.length];
      roundRect(ctx, x, y, barWidth, barHeight, 7);
      ctx.fill();
      ctx.fillStyle = cssVar("--muted");
      ctx.fillText(String(labels[index]).slice(0, 7), x, height - 9);
    });
  }

  function doughnut(canvas, labels, values, colors = palette()) {
    const { ctx, width, height } = setup(canvas);
    const total = values.reduce((sum, value) => sum + value, 0);
    const centerX = width * 0.38;
    const centerY = height * 0.48;
    const radius = Math.min(width, height) * 0.29;
    let start = -Math.PI / 2;
    values.forEach((value, index) => {
      const angle = value / total * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, start, start + angle);
      ctx.closePath();
      ctx.fillStyle = colors[index % colors.length];
      ctx.fill();
      start += angle;
    });
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 0.58, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = cssVar("--text");
    ctx.font = "700 22px Poppins, Segoe UI, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(String(total), centerX, centerY + 7);
    ctx.textAlign = "left";
    ctx.font = "12px Poppins, Segoe UI, sans-serif";
    labels.slice(0, 5).forEach((label, index) => {
      const y = 36 + index * 24;
      ctx.fillStyle = colors[index % colors.length];
      ctx.fillRect(width * 0.68, y, 9, 9);
      ctx.fillStyle = cssVar("--muted");
      ctx.fillText(label, width * 0.72, y + 9);
    });
  }

  function radar(canvas, labels, values, color = cssVar("--warning")) {
    const { ctx, width, height } = setup(canvas);
    const max = Math.max(...values);
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) * 0.34;
    ctx.strokeStyle = "rgba(148,163,184,0.24)";
    for (let ring = 1; ring <= 4; ring += 1) {
      polygon(ctx, labels.length, centerX, centerY, radius * ring / 4);
      ctx.stroke();
    }
    ctx.beginPath();
    values.forEach((value, index) => {
      const angle = -Math.PI / 2 + index / values.length * Math.PI * 2;
      const r = value / max * radius;
      const x = centerX + Math.cos(angle) * r;
      const y = centerY + Math.sin(angle) * r;
      if (index === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.closePath();
    ctx.fillStyle = cssVar("--tone-amber-bg");
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.fill();
    ctx.stroke();
  }

  function pipeline(canvas, values) {
    const labels = ["Applied", "Screen", "Interview", "Offer", "Join"];
    bars(canvas, labels, values, [cssVar("--accent"), cssVar("--tone-blue-text"), cssVar("--success"), cssVar("--warning"), cssVar("--tone-slate-text")]);
  }

  function polygon(ctx, points, centerX, centerY, radius) {
    ctx.beginPath();
    for (let index = 0; index < points; index += 1) {
      const angle = -Math.PI / 2 + index / points * Math.PI * 2;
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;
      if (index === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
  }

  function roundRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.arcTo(x + width, y, x + width, y + height, radius);
    ctx.arcTo(x + width, y + height, x, y + height, radius);
    ctx.arcTo(x, y + height, x, y, radius);
    ctx.arcTo(x, y, x + width, y, radius);
    ctx.closePath();
  }

  function render(root = document) {
    root.querySelectorAll("canvas[data-chart]").forEach((canvas) => {
      const type = canvas.dataset.chart;
      const values = JSON.parse(canvas.dataset.values);
      const labels = JSON.parse(canvas.dataset.labels || "[]");
      if (type === "line") line(canvas, labels, values);
      if (type === "bar") bars(canvas, labels, values);
      if (type === "doughnut") doughnut(canvas, labels, values);
      if (type === "radar") radar(canvas, labels, values);
      if (type === "pipeline") pipeline(canvas, values);
    });
  }

  let resizeTimer;
  window.addEventListener("resize", () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => render(document.getElementById("viewRoot")), 120);
  });

  window.CC_CHARTS = { render, line, bars, doughnut, radar, pipeline };
})();
