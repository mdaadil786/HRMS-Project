(function () {
  const U = window.CC_UTILS;
  const D = window.CC_DATA;

  function chart(type, labels, values, label) {
    return `<canvas class="module-chart" data-chart="${type}" data-labels='${JSON.stringify(labels)}' data-values='${JSON.stringify(values)}' role="img" aria-label="${U.escapeHtml(label)}"></canvas>`;
  }

  function workforceRows() {
    return D.workforce.map((item) => `
      <div class="workforce-row">
        <div><strong>${U.escapeHtml(item.label)}</strong><span>${U.number(item.value)} employees</span></div>
        <span class="status-badge status-badge--${item.tone}">${U.escapeHtml(item.status)}</span>
        ${U.progress(item.value, item.total, `${item.label} ${U.percent(item.value, item.total)} percent`)}
        <b>${U.percent(item.value, item.total)}%</b>
      </div>
    `).join("");
  }

  function recentEmployees() {
    const rows = D.employees.slice(0, 6).map((employee) => `
      <tr>
        <td>${U.avatar(employee)}</td>
        <td>${U.escapeHtml(employee.id)}</td>
        <td><strong>${U.escapeHtml(employee.name)}</strong></td>
        <td>${U.escapeHtml(employee.department)}</td>
        <td>${U.escapeHtml(employee.designation)}</td>
        <td>${U.badge(employee.workMode)}</td>
        <td>${U.badge(employee.attendance)}</td>
        <td>${U.date(employee.joiningDate)}</td>
      </tr>
    `);
    return U.table(["Profile", "Employee ID", "Name", "Department", "Designation", "Work Mode", "Attendance", "Joining Date"], rows, { compact: true });
  }

  function renderCalendar() {
    const eventMap = new Map(D.calendar.map((event) => [event.day, event]));
    let markup = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => `<b>${day}</b>`).join("");
    for (let i = 0; i < 3; i += 1) markup += "<span></span>";
    for (let day = 1; day <= 31; day += 1) {
      const event = eventMap.get(day);
      const label = event ? `${day}, ${event.label}` : String(day);
      markup += `<button class="${event ? `has-event event--${event.type}` : ""}" type="button" aria-label="${U.escapeHtml(label)}">${day}</button>`;
    }
    return markup;
  }

  function announcementComposer() {
    return `
      <form class="announcement-composer" id="announcementComposer">
        <label><span>Upload Images</span><input id="announcementImages" type="file" accept="image/*" multiple></label>
        <label><span>Title</span><input id="announcementTitle" type="text" required placeholder="Announcement title"></label>
        <label><span>Description</span><textarea id="announcementDescription" required rows="3" placeholder="Write a concise company update"></textarea></label>
        <div class="composer-grid">
          <label><span>Department</span><select id="announcementDepartment"><option>People Operations</option><option>Recruitment</option><option>Operations</option><option>Finance</option><option>Engineering</option></select></label>
          <label><span>Visibility</span><select id="announcementVisibility"><option>All employees</option><option>Managers</option><option>Department only</option></select></label>
        </div>
        <label><span>Tags</span><input id="announcementTags" type="text" placeholder="Benefits, Town Hall"></label>
        <button class="button" type="submit">Publish</button>
      </form>
    `;
  }

  function announcementFeed() {
    return `<div class="announcement-feed" id="announcementFeed">${D.announcementFeed.map((item) => announcementCard(item)).join("")}</div>`;
  }

  function announcementCard(item) {
    const images = item.images.map((image, index) => `
      <img src="${U.escapeHtml(image)}" alt="${U.escapeHtml(item.title)} image ${index + 1}" class="${index === 0 ? "active" : ""}" loading="eager">
    `).join("");
    const controls = item.images.length > 1 ? `
      <div class="carousel-actions">
        <button class="icon-button icon-button--small js-carousel" type="button" data-direction="-1" aria-label="Previous announcement image"><i class="fa-solid fa-chevron-left"></i></button>
        <button class="icon-button icon-button--small js-carousel" type="button" data-direction="1" aria-label="Next announcement image"><i class="fa-solid fa-chevron-right"></i></button>
      </div>
    ` : "";

    return `
      <article class="announcement-post" data-current="0">
        <header>
          <span class="brand-mark announcement-logo">${U.escapeHtml(item.companyLogo)}</span>
          <span class="avatar avatar--small">${U.escapeHtml(item.avatar)}</span>
          <div><strong>${U.escapeHtml(item.author)}</strong><small>${U.escapeHtml(item.department)} - ${U.escapeHtml(item.date)}</small></div>
          <span class="department-logo">${U.escapeHtml(item.departmentLogo)}</span>
        </header>
        <div class="announcement-media">${images}${controls}</div>
        <h3>${U.escapeHtml(item.title)}</h3>
        <p>${U.escapeHtml(item.description)}</p>
        <div class="announcement-tags">${item.tags.map((tag) => `<span>${U.escapeHtml(tag)}</span>`).join("")}</div>
        <footer>
          <span><i class="fa-solid fa-thumbs-up"></i>${U.number(item.likes)}</span>
          <span><i class="fa-solid fa-comment"></i>${U.number(item.comments)}</span>
          <span><i class="fa-solid fa-share"></i>${U.number(item.shares)}</span>
          <button class="button button--ghost" type="button" data-announcement-view="${U.escapeHtml(item.title)}">View Details</button>
        </footer>
      </article>
    `;
  }

  window.CCModules = window.CCModules || {};
  window.CCModules.dashboard = {
    title: "Dashboard",
    render() {
      return `
        ${U.pageHeader("Executive HR Dashboard", `Welcome back, Sarah. ${D.company.approvals} approvals, ${D.company.interviewsToday} interviews, and ${D.company.payrollReadiness}% payroll readiness need attention today.`, {
          label: "Organization",
          value: D.company.name,
          caption: "Global People Operations"
        })}
        ${U.metricCards(D.metrics)}
        <section class="dashboard-grid">
          <article class="card stat-card">
            <div class="section-heading"><div><p class="eyebrow">Live Availability</p><h2>Workforce Status</h2></div><span class="status-badge status-badge--success">Live</span></div>
            <div class="workforce-list">${workforceRows()}</div>
          </article>
          <article class="card chart-card chart-card--wide">
            <div class="section-heading"><div><p class="eyebrow">Headcount</p><h2>Employee Growth</h2></div><select class="control-select" aria-label="Growth period"><option>2026</option><option>2025</option></select></div>
            ${chart("line", ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"], [362, 371, 385, 396, 409, 418, 428], "Employee growth chart")}
          </article>
          <article class="card chart-card"><div class="section-heading"><div><p class="eyebrow">Today</p><h2>Attendance Summary</h2></div></div>${chart("bar", D.attendance.summary.map((x) => x.label), D.attendance.summary.map((x) => x.value), "Attendance summary chart")}</article>
          <article class="card chart-card"><div class="section-heading"><div><p class="eyebrow">Teams</p><h2>Employee Statistics</h2></div></div>${chart("doughnut", ["Engineering", "Sales", "Marketing", "People", "Finance", "Ops"], [148, 74, 56, 38, 44, 68], "Department distribution chart")}</article>
          <article class="card chart-card"><div class="section-heading"><div><p class="eyebrow">Hiring</p><h2>Recruitment Summary</h2></div></div>${chart("pipeline", [], D.recruitment.pipeline, "Recruitment pipeline chart")}</article>
          
        </section>
        <section class="quick-actions"><div class="section-heading"><div><p class="eyebrow">Command Center</p><h2>Quick Actions</h2></div></div>${U.quickActions([
          { label: "Add Employee", icon: "fa-user-plus", tone: "purple" },
          { label: "Approve Leave", icon: "fa-calendar-check", tone: "amber" },
          { label: "Run Payroll", icon: "fa-money-bill-transfer", tone: "red" },
          { label: "Publish Job Opening", icon: "fa-briefcase", tone: "green" },
          { label: "Generate Reports", icon: "fa-file-export", tone: "blue" },
          { label: "Company Announcement", icon: "fa-bullhorn", tone: "teal" }
        ])}</section>
        <section class="content-grid">
          <article class="card employee-card"><div class="section-heading"><div><p class="eyebrow">Directory</p><h2>Recent Employees</h2></div></div>${recentEmployees()}</article>
          <aside class="right-panel">
            <article class="card"><div class="section-heading"><div><p class="eyebrow">Notifications</p><h2>Recent Activity</h2></div></div>${U.renderList(D.notifications)}</article>
            <article class="card"><div class="section-heading"><div><p class="eyebrow">Events</p><h2>Upcoming Events</h2></div></div>${U.renderList(D.events.map((event) => ({ label: event.label, meta: `${event.date} - ${event.type}`, icon: "fa-calendar-days", tone: "blue" })))}</article>
            <article class="card announcement-card"><div class="section-heading"><div><p class="eyebrow">Announcements</p><h2>Company Updates</h2></div></div>${announcementComposer()}${announcementFeed()}</article>
            <article class="card calendar-card"><div class="section-heading"><div><p class="eyebrow">Calendar</p><h2>July 2026</h2></div></div><div class="calendar-widget">${renderCalendar()}</div></article>
          </aside>
        </section>
      `;
    },
    afterRender(root) {
      U.bindActionToasts(root);
      window.CC_CHARTS.render(root);
      bindAnnouncements(root);
    }
  };

  function bindAnnouncements(root) {
    const feed = root.querySelector("#announcementFeed");
    feed?.addEventListener("click", (event) => {
      const carouselButton = event.target.closest(".js-carousel");
      if (carouselButton) {
        const post = carouselButton.closest(".announcement-post");
        const images = [...post.querySelectorAll(".announcement-media img")];
        const next = (Number(post.dataset.current) + Number(carouselButton.dataset.direction) + images.length) % images.length;
        images.forEach((image, index) => image.classList.toggle("active", index === next));
        post.dataset.current = String(next);
        return;
      }

      const viewButton = event.target.closest("[data-announcement-view]");
      if (viewButton) {
        window.CC_APP.showToast(`View ${viewButton.dataset.announcementView} is ready`);
      }
    });

    const form = root.querySelector("#announcementComposer");
    form?.addEventListener("submit", (event) => {
      event.preventDefault();
      const title = root.querySelector("#announcementTitle").value.trim();
      const description = root.querySelector("#announcementDescription").value.trim();
      if (!title || !description) return;
      const tags = root.querySelector("#announcementTags").value.split(",").map((tag) => tag.trim()).filter(Boolean);
      const files = [...root.querySelector("#announcementImages").files];
      const images = files.length
        ? files.map((file) => URL.createObjectURL(file))
        : ["assets/images/announcement-collaboration.svg"];
      const department = root.querySelector("#announcementDepartment").value;
      const item = {
        id: `ann-${Date.now()}`,
        author: "Sarah Spencer",
        department,
        date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        title,
        description,
        tags: tags.length ? tags : [department],
        likes: 0,
        comments: 0,
        shares: 0,
        avatar: "SS",
        departmentLogo: department.split(" ").map((word) => word[0]).join("").slice(0, 2).toUpperCase(),
        companyLogo: "CC",
        images
      };
      D.announcementFeed.unshift(item);
      root.querySelector("#announcementFeed").insertAdjacentHTML("afterbegin", announcementCard(item));
      form.reset();
      window.CC_APP.showToast("Announcement published");
    });
  }
})();
