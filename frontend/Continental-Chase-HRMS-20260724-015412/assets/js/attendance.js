(function () {
  const U = window.CC_UTILS;
  const D = window.CC_DATA;
  const attendanceSummary = {
    clockIn: null,
    clockInAt: null,
    clockOut: null,
    clockOutAt: null,
    breakStartedAt: null,
    breakMs: 0,
    status: "Not Checked In"
  };
  const tableState = {
    filter: "all",
    search: "",
    department: "all",
    date: new Date().toISOString().slice(0, 10),
    selectedId: null
  };
  const filters = [
    { key: "all", label: "All Employees" },
    { key: "present", label: "Present" },
    { key: "late", label: "Late" },
    { key: "absent", label: "Absent" },
    { key: "on-leave", label: "On Leave" },
    { key: "remote", label: "Remote" },
    { key: "office", label: "Office" },
    { key: "field-visit", label: "Field Visit" },
    { key: "missing-check-in", label: "Missing Check-In" },
    { key: "overtime", label: "Overtime" },
    { key: "regularized", label: "Regularized" }
  ];

  function formatTime(date) {
    return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
  }

  function timeInputToDisplay(value) {
    if (!value) return "-";
    const [hours, minutes] = value.split(":").map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return formatTime(date);
  }

  function displayToTimeInput(value) {
    if (!value || value === "-") return "";
    const date = new Date(`Jan 1, 2026 ${value}`);
    if (Number.isNaN(date.getTime())) return "";
    return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
  }

  function hoursBetween(startValue, endValue) {
    if (!startValue || !endValue) return "0h";
    const [startHours, startMinutes] = startValue.split(":").map(Number);
    const [endHours, endMinutes] = endValue.split(":").map(Number);
    const start = startHours * 60 + startMinutes;
    const end = endHours * 60 + endMinutes;
    const diff = Math.max(end - start, 0);
    return `${Math.floor(diff / 60)}h ${String(diff % 60).padStart(2, "0")}m`;
  }

  function activeBreakMs(now) {
    return attendanceSummary.breakStartedAt ? now - attendanceSummary.breakStartedAt : 0;
  }

  function workingHours() {
    if (!attendanceSummary.clockInAt) return "00h 00m";
    const now = new Date();
    const end = attendanceSummary.clockOutAt || now;
    const diff = Math.max(end - attendanceSummary.clockInAt - attendanceSummary.breakMs - activeBreakMs(now), 0);
    const hours = Math.floor(diff / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    return `${String(hours).padStart(2, "0")}h ${String(minutes).padStart(2, "0")}m`;
  }

  function actionState() {
    const checkedIn = Boolean(attendanceSummary.clockInAt);
    const checkedOut = Boolean(attendanceSummary.clockOutAt);
    const onBreak = Boolean(attendanceSummary.breakStartedAt);
    return {
      clockIn: checkedIn,
      clockOut: !checkedIn || checkedOut || onBreak,
      break: !checkedIn || checkedOut || onBreak,
      resume: !onBreak || checkedOut
    };
  }

  function compactSummary() {
    const disabled = actionState();
    return `
      <section class="attendance-summary card" aria-label="Today's attendance summary">
        <div><span>Clock In</span><strong>${attendanceSummary.clockIn || "--"}</strong></div>
        <div><span>Clock Out</span><strong>${attendanceSummary.clockOut || "--"}</strong></div>
        <div><span>Working Hours</span><strong id="workingHoursValue">${workingHours()}</strong></div>
        <div><span>Today's Date</span><strong>${new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</strong></div>
        <div><span>Status</span><strong id="attendanceStatusValue">${U.badge(attendanceSummary.status)}</strong></div>
        <div class="attendance-actions" aria-label="Attendance actions">
          <button class="button" type="button" data-attendance-action="clock-in" ${disabled.clockIn ? "disabled" : ""}>Clock In</button>
          <button class="button button--ghost" type="button" data-attendance-action="clock-out" ${disabled.clockOut ? "disabled" : ""}>Clock Out</button>
          <button class="button button--ghost" type="button" data-attendance-action="break" ${disabled.break ? "disabled" : ""}>Break</button>
          <button class="button button--ghost" type="button" data-attendance-action="resume" ${disabled.resume ? "disabled" : ""}>Resume</button>
        </div>
      </section>
    `;
  }

  function regularizationsRemaining(record) {
    return Math.max(record.regularizationsMax - record.regularizationsUsed, 0);
  }

  function isMissingPunch(record) {
    return ["Missing Check-In", "Missing Check-Out"].includes(record.status);
  }

  function normalized(value) {
    return String(value).toLowerCase().replace(/\s+/g, "-");
  }

  function matchesFilter(record, key) {
    if (key === "all") return true;
    if (key === "remote" || key === "office") return normalized(record.mode) === key;
    if (key === "field-visit") return normalized(record.mode) === key || normalized(record.status) === key;
    if (key === "missing-check-in") return isMissingPunch(record);
    return normalized(record.status) === key;
  }

  function filteredRecords() {
    const search = tableState.search.toLowerCase();
    return D.attendance.today.filter((record) => {
      const searchMatch = !search || [record.name, record.id, record.department, record.mode, record.status].some((value) => String(value).toLowerCase().includes(search));
      const departmentMatch = tableState.department === "all" || record.department === tableState.department;
      return matchesFilter(record, tableState.filter) && searchMatch && departmentMatch;
    });
  }

  function countFor(key) {
    return D.attendance.today.filter((record) => matchesFilter(record, key)).length;
  }

  function summaryCount(key) {
    return D.attendance.today.filter((record) => matchesFilter(record, key)).length;
  }

  function attendanceSummaryCards() {
    const items = [
      { label: "Present", value: summaryCount("present"), tone: "green", icon: "fa-user-check" },
      { label: "Late", value: summaryCount("late"), tone: "orange", icon: "fa-clock" },
      { label: "Absent", value: summaryCount("absent"), tone: "red", icon: "fa-user-xmark" },
      { label: "On Leave", value: summaryCount("on-leave"), tone: "amber", icon: "fa-plane-departure" },
      { label: "Missing Check-In", value: summaryCount("missing-check-in"), tone: "slate", icon: "fa-clock" },
      { label: "Regularized Today", value: summaryCount("regularized"), tone: "teal", icon: "fa-calendar-check" }
    ];

    return `
      <section class="attendance-table-summary" aria-label="Attendance table summary">
        ${items.map((item) => `
          <article class="kpi-card">
            <span class="metric-icon tone tone--${item.tone}">${U.icon(item.icon, item.label)}</span>
            <div class="metric-copy"><p>${U.escapeHtml(item.label)}</p><strong>${item.value}</strong><span class="metric-change">Today</span></div>
          </article>
        `).join("")}
      </section>
    `;
  }

  function filterBar() {
    return `
      <div class="attendance-filter-pills" role="list" aria-label="Attendance filters">
        ${filters.map((filter) => `
          <button class="filter-pill ${tableState.filter === filter.key ? "active" : ""}" type="button" data-attendance-filter="${filter.key}" role="listitem">
            ${U.escapeHtml(filter.label)} <span>${countFor(filter.key)}</span>
          </button>
        `).join("")}
      </div>
    `;
  }

  function tableControls() {
    const departments = [...new Set(D.attendance.today.map((record) => record.department))].sort();
    return `
      <div class="attendance-table-controls">
        <label class="table-search"><i class="fa-solid fa-magnifying-glass" aria-hidden="true"></i><span class="sr-only">Search attendance employees</span><input id="attendanceSearch" type="search" value="${U.escapeHtml(tableState.search)}" placeholder="Employee Search"></label>
        <select class="control-select" id="attendanceDepartment" aria-label="Department Filter">
          <option value="all">All Departments</option>
          ${departments.map((department) => `<option value="${U.escapeHtml(department)}" ${tableState.department === department ? "selected" : ""}>${U.escapeHtml(department)}</option>`).join("")}
        </select>
        <input class="control-input" id="attendanceDate" type="date" value="${U.escapeHtml(tableState.date)}" aria-label="Date Filter">
        <button class="button button--ghost" type="button" id="attendanceExport"><i class="fa-solid fa-file-export" aria-hidden="true"></i> Export</button>
      </div>
    `;
  }

  function actionCell(record) {
    if (!isMissingPunch(record)) return `<span class="subtle">No action</span>`;
    if (regularizationsRemaining(record) <= 0) return `<span class="table-badge table-badge--muted">Regularization Limit Reached</span>`;
    return `<button class="button button--ghost button--small" type="button" data-regularize="${U.escapeHtml(record.id)}">Regularize</button>`;
  }

  function tableMarkup() {
    const rows = filteredRecords().map((record) => `
      <tr>
        <td><strong>${U.escapeHtml(record.name)}</strong><small>${U.escapeHtml(record.id)}</small></td>
        <td>${U.escapeHtml(record.department)}</td>
        <td>${U.badge(record.mode)}</td>
        <td>${U.escapeHtml(record.checkIn)}</td>
        <td>${U.escapeHtml(record.checkOut)}</td>
        <td>${U.badge(record.status)}</td>
        <td>${U.escapeHtml(record.hours)}</td>
        <td><strong>${regularizationsRemaining(record)} / ${record.regularizationsMax}</strong></td>
        <td>${actionCell(record)}</td>
      </tr>
    `);

    return U.table(["Employee", "Department", "Mode", "Check-in", "Check-out", "Status", "Hours", "Regularizations Remaining", "Action"], rows);
  }

  function auditHistory() {
    return `
      <section class="card regularization-audit">
        <div class="section-heading"><div><p class="eyebrow">Audit History</p><h2>Recent Regularizations</h2></div></div>
        <div class="regularization-list">
          ${D.attendance.regularizations.map((item) => `
            <article class="regularization-item">
              <span class="tone tone--teal">${U.icon("fa-calendar-check", "Regularized")}</span>
              <div>
                <strong>${U.escapeHtml(item.employee)}</strong>
                <span>Regularized by ${U.escapeHtml(item.by)}</span>
                <p><b>Reason:</b> ${U.escapeHtml(item.reason)}</p>
                <small>${U.escapeHtml(item.date)} • ${U.escapeHtml(item.time)}</small>
              </div>
              ${U.badge(item.status)}
            </article>
          `).join("")}
        </div>
      </section>
    `;
  }

  function attendanceOperations() {
    return `
      ${attendanceSummaryCards()}
      <section class="card employee-card">
        <div class="section-heading"><div><p class="eyebrow">Today</p><h2>Attendance Table</h2></div></div>
        ${filterBar()}
        ${tableControls()}
        ${tableMarkup()}
      </section>
      ${auditHistory()}
    `;
  }

  function regularizationModal() {
    return `
      <div class="modal-backdrop" id="attendanceRegularizationModal" hidden>
        <form class="regularization-modal" id="regularizationForm" aria-label="Attendance regularization form">
          <div class="section-heading"><div><p class="eyebrow">Attendance</p><h2>Regularize Attendance</h2></div></div>
          <div class="modal-grid">
            <label><span>Employee Name</span><input id="regularizeEmployee" type="text" disabled></label>
            <label><span>Attendance Date</span><input id="regularizeDate" type="date" disabled></label>
            <label><span>Reason</span><input id="regularizeReason" type="text" required placeholder="Reason for correction"></label>
            <label><span>Correct Check-In Time</span><input id="regularizeCheckIn" type="time" required></label>
            <label><span>Correct Check-Out Time</span><input id="regularizeCheckOut" type="time" required></label>
            <label class="modal-field-wide"><span>Comments</span><textarea id="regularizeComments" rows="3" placeholder="Add HR comments"></textarea></label>
          </div>
          <div class="modal-actions">
            <button class="button button--ghost" type="button" data-modal-cancel>Cancel</button>
            <button class="button" type="submit">Approve</button>
          </div>
        </form>
      </div>
    `;
  }

  function refreshSummary(root) {
    const summary = root.querySelector(".attendance-summary");
    if (!summary) return;
    const replacement = document.createElement("div");
    replacement.innerHTML = compactSummary().trim();
    summary.replaceWith(replacement.firstElementChild);
    bindAttendanceActions(root);
  }

  function renderOperations(root) {
    const operations = root.querySelector("#attendanceOperations");
    operations.innerHTML = attendanceOperations();
    bindAttendanceTable(root);
  }

  function startAttendanceTimer(root) {
    window.clearInterval(window.__ccAttendanceTimer);
    if (!attendanceSummary.clockInAt || attendanceSummary.clockOutAt) return;
    window.__ccAttendanceTimer = window.setInterval(() => {
      const hoursValue = root.querySelector("#workingHoursValue");
      if (hoursValue) hoursValue.textContent = workingHours();
    }, 1000);
  }

  function bindAttendanceActions(root) {
    root.querySelectorAll("[data-attendance-action]").forEach((button) => {
      button.addEventListener("click", () => {
        const action = button.dataset.attendanceAction;
        const now = new Date();

        if (action === "clock-in" && !attendanceSummary.clockInAt) {
          attendanceSummary.clockInAt = now;
          attendanceSummary.clockIn = formatTime(now);
          attendanceSummary.status = "Present";
        }

        if (action === "break" && attendanceSummary.clockInAt && !attendanceSummary.breakStartedAt && !attendanceSummary.clockOutAt) {
          attendanceSummary.breakStartedAt = now;
          attendanceSummary.status = "On Break";
        }

        if (action === "resume" && attendanceSummary.breakStartedAt && !attendanceSummary.clockOutAt) {
          attendanceSummary.breakMs += now - attendanceSummary.breakStartedAt;
          attendanceSummary.breakStartedAt = null;
          attendanceSummary.status = "Present";
        }

        if (action === "clock-out" && attendanceSummary.clockInAt && !attendanceSummary.clockOutAt) {
          attendanceSummary.clockOutAt = now;
          attendanceSummary.clockOut = formatTime(now);
          attendanceSummary.status = "Completed";
        }

        refreshSummary(root);
        startAttendanceTimer(root);
        window.CC_APP.showToast(`${button.textContent.trim()} recorded`);
      });
    });
  }

  function openRegularizationModal(root, record) {
    tableState.selectedId = record.id;
    const modal = root.querySelector("#attendanceRegularizationModal");
    modal.hidden = false;
    root.querySelector("#regularizeEmployee").value = record.name;
    root.querySelector("#regularizeDate").value = tableState.date;
    root.querySelector("#regularizeReason").value = "";
    root.querySelector("#regularizeCheckIn").value = displayToTimeInput(record.checkIn) || "09:00";
    root.querySelector("#regularizeCheckOut").value = displayToTimeInput(record.checkOut) || "18:00";
    root.querySelector("#regularizeComments").value = "";
    root.querySelector("#regularizeReason").focus();
  }

  function closeRegularizationModal(root) {
    const modal = root.querySelector("#attendanceRegularizationModal");
    modal.hidden = true;
    tableState.selectedId = null;
  }

  function bindAttendanceTable(root) {
    root.querySelectorAll("[data-attendance-filter]").forEach((button) => {
      button.addEventListener("click", () => {
        tableState.filter = button.dataset.attendanceFilter;
        renderOperations(root);
      });
    });

    root.querySelector("#attendanceSearch")?.addEventListener("input", (event) => {
      tableState.search = event.target.value;
      renderOperations(root);
      root.querySelector("#attendanceSearch")?.focus();
    });

    root.querySelector("#attendanceDepartment")?.addEventListener("change", (event) => {
      tableState.department = event.target.value;
      renderOperations(root);
    });

    root.querySelector("#attendanceDate")?.addEventListener("change", (event) => {
      tableState.date = event.target.value;
    });

    root.querySelector("#attendanceExport")?.addEventListener("click", () => window.CC_APP.showToast("Attendance export queued"));

    root.querySelectorAll("[data-regularize]").forEach((button) => {
      button.addEventListener("click", () => {
        const record = D.attendance.today.find((item) => item.id === button.dataset.regularize);
        if (record) openRegularizationModal(root, record);
      });
    });
  }

  function bindRegularizationModal(root) {
    root.querySelector("[data-modal-cancel]")?.addEventListener("click", () => closeRegularizationModal(root));
    root.querySelector("#attendanceRegularizationModal")?.addEventListener("click", (event) => {
      if (event.target.id === "attendanceRegularizationModal") closeRegularizationModal(root);
    });
    root.querySelector("#regularizationForm")?.addEventListener("submit", (event) => {
      event.preventDefault();
      const record = D.attendance.today.find((item) => item.id === tableState.selectedId);
      if (!record || regularizationsRemaining(record) <= 0) return;

      const reason = root.querySelector("#regularizeReason").value.trim();
      const comments = root.querySelector("#regularizeComments").value.trim();
      const checkIn = root.querySelector("#regularizeCheckIn").value;
      const checkOut = root.querySelector("#regularizeCheckOut").value;
      record.checkIn = timeInputToDisplay(checkIn);
      record.checkOut = timeInputToDisplay(checkOut);
      record.hours = hoursBetween(checkIn, checkOut);
      record.status = "Regularized";
      record.regularizationsUsed += 1;
      D.attendance.regularizations.unshift({
        employee: record.name,
        by: "Sarah Spencer",
        reason: comments || reason,
        date: "Today",
        time: formatTime(new Date()),
        status: "Approved"
      });

      closeRegularizationModal(root);
      renderOperations(root);
      window.CC_APP.showToast("Attendance regularized");
    });
  }

  window.CCModules = window.CCModules || {};
  window.CCModules.attendance = {
    title: "Attendance",
    render() {
      return `
        ${U.pageHeader("Attendance Management", "Monitor today's attendance, exceptions, work modes, and workforce trends.", { label: "Today", value: "83% present", caption: "18 late check-ins under review" })}
        ${compactSummary()}
        <section class="dashboard-grid">
          <article class="card chart-card"><div class="section-heading"><div><p class="eyebrow">Weekly</p><h2>Attendance Trend</h2></div></div><canvas class="module-chart" data-chart="line" data-labels='["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]' data-values='${JSON.stringify(D.attendance.weeklyTrend)}' aria-label="Weekly attendance trend"></canvas></article>
          <article class="card chart-card"><div class="section-heading"><div><p class="eyebrow">Monthly</p><h2>Monthly Attendance</h2></div></div><canvas class="module-chart" data-chart="bar" data-labels='["Aug","Sep","Oct","Nov","Dec","Jan","Feb","Mar","Apr","May","Jun","Jul"]' data-values='${JSON.stringify(D.attendance.monthly)}' aria-label="Monthly attendance chart"></canvas></article>
          <article class="card card--spacious"><div class="section-heading"><div><p class="eyebrow">Activity</p><h2>Recent Attendance Activity</h2></div></div>${U.renderList(D.attendance.activity.map((item) => ({ label: item, meta: "Today", icon: "fa-user-check", tone: "blue" })))}</article>
        </section>
        <div id="attendanceOperations">${attendanceOperations()}</div>
        ${regularizationModal()}
      `;
    },
    afterRender(root) {
      window.clearInterval(window.__ccAttendanceTimer);
      bindAttendanceActions(root);
      bindAttendanceTable(root);
      bindRegularizationModal(root);
      startAttendanceTimer(root);
      window.CC_CHARTS.render(root);
    }
  };
})();
