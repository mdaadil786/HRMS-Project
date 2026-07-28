(function () {
  const U = window.CC_UTILS;
  const D = window.CC_DATA;

  function approvalCards() {
    return D.leave.requests.map((request) => `
      <div class="leave-item">
        ${U.avatar(request)}
        <div><strong>${U.escapeHtml(request.employee)}</strong><span>${U.escapeHtml(request.type)} - ${U.escapeHtml(request.dates)}</span><small>${U.escapeHtml(request.reason)} - Manager: ${U.escapeHtml(request.manager)}</small></div>
        <div class="approval-actions"><button class="icon-button icon-button--approve" type="button" aria-label="Approve ${U.escapeHtml(request.employee)}">OK</button><button class="icon-button icon-button--reject" type="button" aria-label="Reject ${U.escapeHtml(request.employee)}">No</button></div>
      </div>
    `).join("");
  }

  window.CCModules = window.CCModules || {};
  window.CCModules.leave = {
    title: "Leave",
    render() {
      const history = D.leave.history.map((item) => `<tr><td>${U.escapeHtml(item.employee)}</td><td>${U.escapeHtml(item.type)}</td><td>${item.date}</td><td>${U.badge(item.status)}</td></tr>`);
      const balanceCards = [
        { type: "Casual Leave", accent: "var(--success)" },
        { type: "Earned Leave", accent: "var(--accent)" },
        { type: "Sick Leave", accent: "var(--warning)" },
        { type: "Unpaid Leave", accent: "var(--danger)" }
      ].map((item) => {
        const balance = D.leave.balances.find((entry) => entry.type === item.type);
        const total = balance ? balance.total : 0;
        const used = balance ? balance.used : 0;
        const remaining = Math.max(total - used, 0);
        return `
          <article class="card leave-balance-card" style="--card-accent:${item.accent}">
            <p class="leave-balance-label">${U.escapeHtml(item.type)}</p>
            <strong class="leave-balance-value">${remaining}</strong>
            <small class="leave-balance-subtitle">of ${total} days</small>
          </article>
        `;
      }).join("");

      return `
        ${U.pageHeader("Leave Management", "Review balances, approve requests, and understand leave utilization across the organization.", { label: "Pending Approvals", value: String(D.leave.requests.length), caption: "Average approval age: 6 hours" })}
        <div class="leave-balance-grid">${balanceCards}</div>
        <section class="leave-management-grid">
          <div class="panel-stack">
            <article class="card card--spacious"><div class="section-heading"><div><p class="eyebrow">Approvals</p><h2>Pending Approvals</h2></div></div><div class="leave-list">${approvalCards()}</div></article>
          </div>
          <aside class="panel-stack">
            <article class="card card--spacious calendar-card"><div class="section-heading"><div><p class="eyebrow">Calendar</p><h2>Leave Calendar</h2></div></div><div class="calendar-widget">${[...Array(31)].map((_, i) => `<button class="${[18,19,24,25,26,29].includes(i + 1) ? "has-event event--leave" : ""}" type="button">${i + 1}</button>`).join("")}</div></article>
            <article class="card card--spacious leave-history-card"><div class="section-heading"><div><p class="eyebrow">History</p><h2>Leave History</h2></div></div>${U.table(["Employee", "Type", "Date", "Status"], history, { compact: true })}</article>
          </aside>
        </section>
      `;
    },
    afterRender(root) {
      root.querySelectorAll(".icon-button--approve, .icon-button--reject").forEach((button) => {
        button.addEventListener("click", () => window.CC_APP.showToast(button.classList.contains("icon-button--approve") ? "Leave approved" : "Leave rejected"));
      });
    }
  };
})();
