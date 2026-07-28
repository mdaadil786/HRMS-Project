(function () {
  const numberFormatter = new Intl.NumberFormat("en-US");
  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  });

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function badgeTone(value) {
    const key = String(value).toLowerCase().replace(/\s+/g, "-");
    if (["active", "present", "approved", "completed", "open"].includes(key)) return "success";
    if (["remote", "hybrid", "client-visit", "scheduled", "interviewing"].includes(key)) return "blue";
    if (["office"].includes(key)) return "cyan";
    if (["field-visit"].includes(key)) return "purple";
    if (["late", "overtime"].includes(key)) return "orange";
    if (["on-leave", "probation", "draft", "screening"].includes(key)) return "warning";
    if (["missing-check-in", "missing-check-out"].includes(key)) return "muted";
    if (["regularized"].includes(key)) return "teal";
    if (["absent", "rejected", "notice"].includes(key)) return "danger";
    return "muted";
  }

  function icon(name, label) {
    return `<i class="fa-solid ${escapeHtml(name)}" aria-hidden="true"></i><span class="sr-only">${escapeHtml(label || name)}</span>`;
  }

  function avatar(item) {
    return `<span class="avatar avatar--small" aria-hidden="true">${escapeHtml(item.initials || item.photo || item.name.slice(0, 2))}</span>`;
  }

  function badge(value) {
    return `<span class="table-badge table-badge--${badgeTone(value)}">${escapeHtml(value)}</span>`;
  }

  function progress(value, max, label) {
    return `<progress class="progress-meter" value="${Number(value)}" max="${Number(max)}" aria-label="${escapeHtml(label)}"></progress>`;
  }

  function pageHeader(title, copy, meta) {
    return `
      <section class="page-header">
        <div>
          <p class="eyebrow">Continental Chase</p>
          <h1>${escapeHtml(title)}</h1>
          <p>${escapeHtml(copy)}</p>
        </div>
        <div class="org-card">
          <span>${escapeHtml(meta.label)}</span>
          <strong>${escapeHtml(meta.value)}</strong>
          <small>${escapeHtml(meta.caption)}</small>
        </div>
      </section>
    `;
  }

  function metricCards(items) {
    return `
      <section class="kpi-grid" aria-label="Summary metrics">
        ${items.map((metric) => `
          <article class="kpi-card">
            <span class="metric-icon tone tone--${escapeHtml(metric.tone || "blue")}">${icon(metric.icon || "fa-chart-line", metric.label)}</span>
            <div class="metric-copy">
              <p>${escapeHtml(metric.label)}</p>
              <strong>${typeof metric.value === "number" ? numberFormatter.format(metric.value) : escapeHtml(metric.value)}</strong>
              <span class="metric-change">${escapeHtml(metric.delta || metric.context || "")}</span>
            </div>
          </article>
        `).join("")}
      </section>
    `;
  }

  function quickActions(actions) {
    return `
      <div class="action-grid">
        ${actions.map((action) => `
          <button class="action-card" type="button" data-toast="${escapeHtml(action.label)}">
            <span class="tone tone--${escapeHtml(action.tone || "blue")}">${icon(action.icon || "fa-plus", action.label)}</span>
            <strong>${escapeHtml(action.label)}</strong>
          </button>
        `).join("")}
      </div>
    `;
  }

  function table(headers, rows, options = {}) {
    return `
      <div class="table-wrap">
        <table class="employee-table ${options.compact ? "employee-table--compact" : ""}">
          <thead><tr>${headers.map((header) => `<th>${header}</th>`).join("")}</tr></thead>
          <tbody>${rows.join("")}</tbody>
        </table>
      </div>
    `;
  }

  function renderList(items, className = "activity-list") {
    return `<div class="${className}">${items.map((item) => `
      <div class="activity-item">
        <span class="tone tone--${escapeHtml(item.tone || "blue")}">${icon(item.icon || "fa-chart-line", item.label)}</span>
        <div><strong>${escapeHtml(item.label)}</strong><small>${escapeHtml(item.meta || item.date || "")}</small></div>
      </div>
    `).join("")}</div>`;
  }

  function bindActionToasts(root) {
    root.querySelectorAll("[data-toast]").forEach((button) => {
      button.addEventListener("click", () => window.CC_APP.showToast(`${button.dataset.toast} is ready`));
    });
  }

  window.CC_UTILS = {
    escapeHtml,
    number: (value) => numberFormatter.format(value),
    currency: (value) => currencyFormatter.format(value),
    date: (value) => new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    percent: (value, total) => Math.round((value / total) * 100),
    badgeTone,
    badge,
    icon,
    avatar,
    progress,
    pageHeader,
    metricCards,
    quickActions,
    table,
    renderList,
    bindActionToasts
  };
})();
