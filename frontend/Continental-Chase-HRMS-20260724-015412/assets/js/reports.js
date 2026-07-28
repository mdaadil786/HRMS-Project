(function () {
  const U = window.CC_UTILS;
  const D = window.CC_DATA;

  window.CCModules = window.CCModules || {};
  window.CCModules.reports = {
    title: "Reports",
    render() {
      const rows = D.reports.map((report) => `<tr><td><strong>${report.name}</strong></td><td>${report.owner}</td><td>${report.updated}</td><td>${report.format}</td><td><button class="button button--ghost" type="button" data-toast="Export ${report.name}">Export</button></td></tr>`);
      return `
        ${U.pageHeader("Reports & Analytics", "Export trusted attendance, payroll, hiring, department, headcount, and workforce reports.", { label: "Exports", value: "PDF, Excel, CSV", caption: "Role-based access ready" })}
        ${U.metricCards([{ label: "Attendance Reports", value: 18, delta: "12 scheduled", tone: "blue", icon: "fa-clock" }, { label: "Payroll Reports", value: 7, delta: "3 finance-only", tone: "green", icon: "fa-money-check-dollar" }, { label: "Hiring Reports", value: 9, delta: "Weekly summaries", tone: "amber", icon: "fa-briefcase" }, { label: "Department Reports", value: 14, delta: "Managers subscribed", tone: "purple", icon: "fa-folder-open" }])}
        <section class="content-grid"><article class="card employee-card"><div class="section-heading"><div><p class="eyebrow">Reports</p><h2>Report Library</h2></div><div class="toolbar"><button class="button button--ghost" type="button" data-toast="Export all reports">Export All</button><button class="button" type="button" data-toast="Schedule report">Schedule</button></div></div>${U.table(["Report", "Owner", "Updated", "Formats", "Action"], rows)}</article><aside class="right-panel"><article class="card chart-card"><div class="section-heading"><div><p class="eyebrow">Usage</p><h2>Report Downloads</h2></div></div><canvas class="module-chart" data-chart="bar" data-labels='["Attendance","Payroll","Hiring","Dept"]' data-values='[42,28,19,33]' aria-label="Report downloads"></canvas></article></aside></section>
      `;
    },
    afterRender(root) {
      U.bindActionToasts(root);
      window.CC_CHARTS.render(root);
    }
  };
})();
