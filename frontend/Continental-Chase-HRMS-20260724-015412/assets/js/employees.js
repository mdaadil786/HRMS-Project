(function () {
  const U = window.CC_UTILS;
  const D = window.CC_DATA;
  const state = { page: 1, pageSize: 7, sortKey: "joiningDate", sortDirection: "desc", query: "", department: "All" };

  function departments() {
    return ["All", ...new Set(D.employees.map((employee) => employee.department))];
  }

  function filtered() {
    return D.employees
      .filter((employee) => state.department === "All" || employee.department === state.department)
      .filter((employee) => Object.values(employee).join(" ").toLowerCase().includes(state.query.toLowerCase()))
      .sort((a, b) => {
        const result = a[state.sortKey] > b[state.sortKey] ? 1 : a[state.sortKey] < b[state.sortKey] ? -1 : 0;
        return state.sortDirection === "asc" ? result : -result;
      });
  }

  function tableRows(items) {
    return items.map((employee) => `
      <tr>
        <td>${U.avatar(employee)}</td>
        <td>${U.escapeHtml(employee.id)}</td>
        <td><strong>${U.escapeHtml(employee.name)}</strong></td>
        <td>${U.escapeHtml(employee.department)}</td>
        <td>${U.escapeHtml(employee.designation)}</td>
        <td>${U.escapeHtml(employee.manager)}</td>
        <td>${U.badge(employee.status)}</td>
        <td>${U.badge(employee.workMode)}</td>
        <td>${U.badge(employee.attendance)}</td>
        <td>${U.date(employee.joiningDate)}</td>
        <td><button class="button button--ghost js-preview" type="button" data-id="${employee.id}">Preview</button></td>
      </tr>
    `).join("");
  }

  function draw(root) {
    const employees = filtered();
    const pages = Math.max(Math.ceil(employees.length / state.pageSize), 1);
    state.page = Math.min(state.page, pages);
    const start = (state.page - 1) * state.pageSize;
    root.querySelector("#employeeRows").innerHTML = tableRows(employees.slice(start, start + state.pageSize));
    root.querySelector("#employeePageInfo").textContent = `Showing ${employees.length ? start + 1 : 0}-${Math.min(start + state.pageSize, employees.length)} of ${employees.length}`;
    root.querySelector("#employeePrev").disabled = state.page === 1;
    root.querySelector("#employeeNext").disabled = state.page === pages;
  }

  function preview(root, employee) {
    root.querySelector("#employeePreview").innerHTML = `
      <div class="profile-preview">
        <div class="avatar">${U.escapeHtml(employee.initials)}</div>
        <div><h3>${U.escapeHtml(employee.name)}</h3><p>${U.escapeHtml(employee.designation)} - ${U.escapeHtml(employee.department)}</p></div>
        <dl>
          <div><dt>Manager</dt><dd>${U.escapeHtml(employee.manager)}</dd></div>
          <div><dt>Status</dt><dd>${U.badge(employee.status)}</dd></div>
          <div><dt>Salary Band</dt><dd>${U.escapeHtml(employee.salaryBand)}</dd></div>
          <div><dt>Leave Balance</dt><dd>${employee.leaveBalance} days</dd></div>
          <div><dt>Joining Date</dt><dd>${U.date(employee.joiningDate)}</dd></div>
        </dl>
      </div>
    `;
  }

  window.CCModules = window.CCModules || {};
  window.CCModules.employees = {
    title: "Employees",
    render() {
      const filters = departments().map((department) => `<option>${U.escapeHtml(department)}</option>`).join("");
      return `
        ${U.pageHeader("Employee Directory", "Find employees, inspect profile details, and manage employment status from one operational view.", { label: "Directory", value: `${D.employees.length} sample employees`, caption: "Spring Boot ready schema" })}
        ${U.metricCards([
          { label: "Active Employees", value: 12, delta: "Across 8 departments", tone: "green", icon: "fa-users" },
          { label: "Probation", value: 1, delta: "One review due", tone: "amber", icon: "fa-user" },
          { label: "Notice Period", value: 1, delta: "Offboarding in progress", tone: "red", icon: "fa-door-open" },
          { label: "Average Leave Balance", value: "15.1 days", delta: "Healthy utilization", tone: "blue", icon: "fa-calendar-check" }
        ])}
        <section class="content-grid">
          <article class="card employee-card">
            <div class="section-heading">
              <div><p class="eyebrow">Directory</p><h2>Employees</h2></div>
              <div class="toolbar">
                <label class="table-search"><i class="fa-solid fa-magnifying-glass"></i><input id="employeeSearch" type="search" placeholder="Search employee"></label>
                <select class="control-select" id="departmentFilter" aria-label="Filter by department">${filters}</select>
              </div>
            </div>
            <div class="table-wrap">
              <table class="employee-table">
                <thead><tr>
                  <th>Profile</th><th><button class="sort-button" data-sort="id">Employee ID</button></th><th><button class="sort-button" data-sort="name">Name</button></th><th>Department</th><th>Designation</th><th>Manager</th><th>Status</th><th>Work Mode</th><th>Attendance</th><th><button class="sort-button" data-sort="joiningDate">Joining Date</button></th><th>Action</th>
                </tr></thead>
                <tbody id="employeeRows"></tbody>
              </table>
            </div>
            <div class="pagination"><span id="employeePageInfo"></span><div><button class="button button--ghost" id="employeePrev" type="button">Prev</button><button class="button button--ghost" id="employeeNext" type="button">Next</button></div></div>
          </article>
          <aside class="right-panel">
            <article class="card" id="employeePreview"></article>
            <article class="card"><div class="section-heading"><div><p class="eyebrow">Actions</p><h2>Quick Actions</h2></div></div>${U.quickActions([{ label: "Add Employee", icon: "fa-user-plus", tone: "purple" }, { label: "Upload Documents", icon: "fa-folder-open", tone: "blue" }, { label: "Export Directory", icon: "fa-file-export", tone: "green" }])}</article>
          </aside>
        </section>
      `;
    },
    afterRender(root) {
      draw(root);
      preview(root, filtered()[0]);
      root.querySelector("#employeeSearch").addEventListener("input", (event) => { state.query = event.target.value; state.page = 1; draw(root); });
      root.querySelector("#departmentFilter").addEventListener("change", (event) => { state.department = event.target.value; state.page = 1; draw(root); });
      root.querySelectorAll(".sort-button").forEach((button) => button.addEventListener("click", () => {
        state.sortDirection = state.sortKey === button.dataset.sort && state.sortDirection === "asc" ? "desc" : "asc";
        state.sortKey = button.dataset.sort;
        draw(root);
      }));
      root.querySelector("#employeePrev").addEventListener("click", () => { state.page -= 1; draw(root); });
      root.querySelector("#employeeNext").addEventListener("click", () => { state.page += 1; draw(root); });
      root.addEventListener("click", (event) => {
        const button = event.target.closest(".js-preview");
        if (button) preview(root, D.employees.find((employee) => employee.id === button.dataset.id));
      });
      U.bindActionToasts(root);
    }
  };
})();
