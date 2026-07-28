(function () {
  const U = window.CC_UTILS;
  const D = window.CC_DATA;

  window.CCModules = window.CCModules || {};
  window.CCModules.payroll = {
    title: "Payroll",
    render() {
      const summary = D.payroll.summary.map((item, index) => ({ label: item.label, value: index === 3 ? item.value : U.currency(item.value), delta: item.context, tone: ["blue", "green", "red", "amber"][index], icon: "fa-money-check-dollar" }));
      const payslips = D.payroll.payslips.map((item) => `<tr><td>${item.period}</td><td>${item.processed}</td><td>${item.exceptions}</td><td>${U.badge(item.status)}</td><td><button class="button button--ghost" type="button" data-toast="Export ${item.period} payslips">Export</button></td></tr>`);
      return `
        ${U.pageHeader("Payroll Management", "Track payroll cost, exceptions, deductions, bonuses, and payslip history.", { label: "Upcoming Payroll", value: "Jul 28, 2026", caption: "Cutoff closes in 4 days" })}
        ${U.metricCards(summary)}
        <section class="dashboard-grid">
          <article class="card chart-card chart-card--wide"><div class="section-heading"><div><p class="eyebrow">Monthly</p><h2>Monthly Payroll</h2></div></div><canvas class="module-chart" data-chart="line" data-labels='["Jan","Feb","Mar","Apr","May","Jun","Jul"]' data-values='${JSON.stringify(D.payroll.monthly)}' aria-label="Monthly payroll trend"></canvas></article>
          <article class="card chart-card"><div class="section-heading"><div><p class="eyebrow">Bands</p><h2>Salary Distribution</h2></div></div><canvas class="module-chart" data-chart="bar" data-labels='["B1","B2","B3","B4","B5","B6"]' data-values='${JSON.stringify(D.payroll.distribution)}' aria-label="Salary band distribution"></canvas></article>
        </section>
        <section class="card employee-card"><div class="section-heading"><div><p class="eyebrow">Payslips</p><h2>Payslip History</h2></div></div>${U.table(["Period", "Processed", "Exceptions", "Status", "Action"], payslips)}</section>
      `;
    },
    afterRender(root) {
      window.CC_CHARTS.render(root);
      U.bindActionToasts(root);
    }
  };
})();
