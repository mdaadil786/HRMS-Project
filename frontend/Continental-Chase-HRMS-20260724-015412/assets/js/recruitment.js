(function () {
  const U = window.CC_UTILS;
  const D = window.CC_DATA;

  window.CCModules = window.CCModules || {};
  window.CCModules.recruitment = {
    title: "Recruitment",
    render() {
      const positions = D.recruitment.positions.map((job) => `<tr><td><strong>${U.escapeHtml(job.title)}</strong></td><td>${job.department}</td><td>${job.location}</td><td>${U.badge(job.stage)}</td><td>${job.candidates}</td></tr>`);
      const candidates = D.recruitment.candidates.map((candidate) => `<tr><td><strong>${U.escapeHtml(candidate.name)}</strong></td><td>${U.escapeHtml(candidate.role)}</td><td>${candidate.source}</td><td>${U.badge(candidate.stage)}</td><td>${candidate.score}</td></tr>`);
      return `
        ${U.pageHeader("Recruitment", "Manage open positions, candidate progress, interviews, and offer outcomes.", { label: "Open Positions", value: String(D.recruitment.positions.length), caption: "245 candidates in active pipeline" })}
        ${U.metricCards([{ label: "Candidates", value: 245, delta: "98 in screening", tone: "blue", icon: "fa-users" }, { label: "Interviews Today", value: 3, delta: "All panels confirmed", tone: "green", icon: "fa-calendar-check" }, { label: "Offers Sent", value: 16, delta: "7 accepted this month", tone: "amber", icon: "fa-briefcase" }, { label: "Time to Fill", value: "31 days", delta: "-4 days vs Q2", tone: "purple", icon: "fa-chart-line" }])}
        <section class="dashboard-grid">
          <article class="card chart-card"><div class="section-heading"><div><p class="eyebrow">Pipeline</p><h2>Hiring Pipeline</h2></div></div><canvas class="module-chart" data-chart="pipeline" data-values='${JSON.stringify(D.recruitment.pipeline)}' aria-label="Hiring pipeline"></canvas></article>
          <article class="card chart-card"><div class="section-heading"><div><p class="eyebrow">Offers</p><h2>Offer Statistics</h2></div></div><canvas class="module-chart" data-chart="bar" data-labels='["Sent","Accepted","Declined","Expired"]' data-values='${JSON.stringify(D.recruitment.offers)}' aria-label="Offer statistics"></canvas></article>
          <article class="card card--spacious"><div class="section-heading"><div><p class="eyebrow">Today</p><h2>Interview Schedule</h2></div></div>${U.renderList(D.recruitment.interviews.map((item) => ({ label: item.candidate, meta: `${item.time} - ${item.panel}`, icon: "fa-calendar-days", tone: "blue" })))}</article>
        </section>
        <section class="content-grid"><article class="card employee-card"><div class="section-heading"><div><p class="eyebrow">Roles</p><h2>Open Positions</h2></div></div>${U.table(["Role", "Department", "Location", "Stage", "Candidates"], positions)}</article><aside class="right-panel"><article class="card"><div class="section-heading"><div><p class="eyebrow">Applicants</p><h2>Recent Applicants</h2></div></div>${U.table(["Candidate", "Role", "Source", "Stage", "Score"], candidates, { compact: true })}</article></aside></section>
      `;
    },
    afterRender(root) {
      window.CC_CHARTS.render(root);
    }
  };
})();
