(function () {
  const U = window.CC_UTILS;
  const D = window.CC_DATA;

  window.CCModules = window.CCModules || {};
  window.CCModules.performance = {
    title: "Performance",
    render() {
      const kpis = D.performance.departmentKpis.map((item) => `<tr><td>${item.department}</td><td>${item.score}</td><td>${item.goals}%</td><td>${U.progress(item.score, 100, `${item.department} KPI`)}</td></tr>`);
      const goals = D.performance.goals.map((item) => `<div class="pipeline-row"><span>${U.escapeHtml(item.owner)}</span>${U.progress(item.progress, 100, item.goal)}<strong>${item.progress}%</strong></div><p class="subtle">${U.escapeHtml(item.goal)}</p>`).join("");
      return `
        ${U.pageHeader("Performance", "Track department KPIs, review cycles, goals, and top performers.", { label: "Review Cycle", value: "Q3 check-in", caption: "81% manager completion" })}
        ${U.metricCards([{ label: "Average KPI Score", value: 85, delta: "+3 vs Q2", tone: "green", icon: "fa-chart-line" }, { label: "Goals On Track", value: "84%", delta: "Across active teams", tone: "blue", icon: "fa-calendar-check" }, { label: "Reviews Open", value: 38, delta: "Due by Aug 15", tone: "amber", icon: "fa-folder-open" }, { label: "Top Performers", value: 24, delta: "Eligible for awards", tone: "purple", icon: "fa-award" }])}
        <section class="dashboard-grid">
          <article class="card chart-card"><div class="section-heading"><div><p class="eyebrow">Distribution</p><h2>Performance Distribution</h2></div></div><canvas class="module-chart" data-chart="bar" data-labels='["Needs","Developing","Strong","Exceeds","Elite"]' data-values='${JSON.stringify(D.performance.distribution)}' aria-label="Performance distribution"></canvas></article>
          <article class="card card--spacious"><div class="section-heading"><div><p class="eyebrow">Goals</p><h2>Active Goals</h2></div></div><div class="pipeline">${goals}</div></article>
          <article class="card card--spacious"><div class="section-heading"><div><p class="eyebrow">Reviews</p><h2>Review History</h2></div></div>${U.renderList(D.performance.reviews.map((item) => ({ label: item.name, meta: `${item.due} - ${item.status}`, icon: "fa-calendar-check", tone: "blue" })))}</article>
        </section>
        <section class="content-grid"><article class="card employee-card"><div class="section-heading"><div><p class="eyebrow">Department KPIs</p><h2>Department KPI Health</h2></div></div>${U.table(["Department", "KPI Score", "Goal Completion", "Progress"], kpis)}</article><aside class="right-panel"><article class="card"><div class="section-heading"><div><p class="eyebrow">Recognition</p><h2>Top Performers</h2></div></div>${U.renderList(D.performance.topPerformers.map((name) => ({ label: name, meta: "High impact contributor", icon: "fa-award", tone: "green" })))}</article></aside></section>
      `;
    },
    afterRender(root) {
      window.CC_CHARTS.render(root);
    }
  };
})();
