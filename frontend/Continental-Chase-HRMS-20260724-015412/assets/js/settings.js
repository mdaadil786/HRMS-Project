(function () {
  const U = window.CC_UTILS;

  function renderNavItem(id, label, iconName, isActive) {
    return `
      <button class="settings-nav__item ${isActive ? "is-active" : ""}" type="button" data-target="${U.escapeHtml(id)}" aria-pressed="${isActive}">
        <span class="settings-nav__icon">${U.icon(iconName, label)}</span>
        <span>${U.escapeHtml(label)}</span>
      </button>
    `;
  }

  function renderFieldRow(title, copy, control, actionLabel, actionToast) {
    const actionMarkup = actionLabel
      ? `<button class="button button--ghost settings-row__action" type="button" data-toast="${U.escapeHtml(actionToast || actionLabel)}">${U.escapeHtml(actionLabel)}</button>`
      : "";

    return `
      <div class="settings-row">
        <div class="settings-row__copy">
          <strong>${U.escapeHtml(title)}</strong>
          <span>${U.escapeHtml(copy)}</span>
        </div>
        <div class="settings-row__control">
          ${control ? `<div class="settings-row__value">${control}</div>` : ""}
          ${actionMarkup}
        </div>
      </div>
    `;
  }

  function renderToggleRow(title, copy, checked) {
    return `
      <div class="settings-row">
        <div class="settings-row__copy">
          <strong>${U.escapeHtml(title)}</strong>
          <span>${U.escapeHtml(copy)}</span>
        </div>
        <div class="settings-row__control">
          <label class="switch" aria-label="${U.escapeHtml(title)}">
            <input class="switch__input" type="checkbox" ${checked ? "checked" : ""}>
            <span class="switch__track"><span class="switch__thumb"></span></span>
          </label>
        </div>
      </div>
    `;
  }

  function renderPanel(id, eyebrow, title, summary, content, isActive) {
    return `
      <section class="settings-panel card ${isActive ? "is-active" : ""}" id="panel-${U.escapeHtml(id)}" data-panel="${U.escapeHtml(id)}" ${isActive ? "" : "hidden"}>
        <div class="settings-panel__header">
          <div>
            <p class="eyebrow">${U.escapeHtml(eyebrow)}</p>
            <h2>${U.escapeHtml(title)}</h2>
          </div>
          <p class="settings-panel__summary">${U.escapeHtml(summary)}</p>
        </div>
        <div class="settings-panel__body">
          ${content}
        </div>
      </section>
    `;
  }

  window.CCModules = window.CCModules || {};
  window.CCModules.settings = {
    title: "Settings",
    render() {
      const profileAvatar = U.avatar({ initials: "SS", name: "Sarah Spencer" });

      return `
        ${U.pageHeader("Settings", "Configure your account, notifications, security, and workspace preferences.", { label: "Company", value: "Continental Chase", caption: "Enterprise HR workspace" })}
        <section class="settings-shell">
          <aside class="settings-sidebar card" aria-label="Settings sections">
            <div class="settings-sidebar__intro">
              <p class="eyebrow">Preferences</p>
              <h2>Workspace settings</h2>
            </div>
            <nav class="settings-nav" aria-label="Settings sections">
              ${renderNavItem("account", "Account", "fa-user", true)}
              ${renderNavItem("notifications", "Notifications", "fa-bell", false)}
              ${renderNavItem("security", "Security", "fa-shield-halved", false)}
              ${renderNavItem("appearance", "Appearance", "fa-palette", false)}
            </nav>
          </aside>

          <div class="settings-content">
            ${renderPanel(
              "account",
              "Account",
              "Profile details",
              "Keep your profile information current for teammates and approvals.",
              `
                <div class="settings-field settings-field--profile">
                  <div class="settings-row__copy">
                    <strong>Profile Picture</strong>
                    <span>Upload a photo that appears in HR workflows and approvals.</span>
                  </div>
                  <div class="settings-row__control">
                    <div class="settings-avatar-preview">
                      ${profileAvatar}
                      <span class="settings-row__value">Sarah Spencer</span>
                    </div>
                    <div class="settings-row__actions">
                      <button class="button button--ghost" type="button" data-toast="Upload photo">Upload</button>
                      <button class="button button--ghost" type="button" data-toast="Remove photo">Remove</button>
                    </div>
                  </div>
                </div>
                ${renderFieldRow("Full Name", "Sarah Spencer", "Sarah Spencer", "Edit", "Edit full name")}
                ${renderFieldRow("Email Address", "sarah.spencer@continentalchase.com", "sarah.spencer@continentalchase.com", "Change", "Change email")}
                ${renderFieldRow("Phone Number", "+1 (234) 555-0199", "+1 (234) 555-0199", "Edit", "Edit phone number")}
                ${renderFieldRow("Language", "English (United States)", "English", "Change", "Change language")}
                ${renderFieldRow("Time Zone", "Eastern Time (UTC-5)", "Eastern Time", "Change", "Change time zone")}
              `,
              true
            )}

            ${renderPanel(
              "notifications",
              "Notifications",
              "Communication preferences",
              "Choose how HR updates and reminders are delivered to you.",
              `
                ${renderToggleRow("Email Notifications", "Receive updates about approvals, payroll, and company announcements.", true)}
                ${renderToggleRow("Push Notifications", "Get instant alerts on mobile and desktop devices.", true)}
                ${renderToggleRow("Attendance Reminders", "Stay informed before shifts and absence deadlines.", true)}
                ${renderToggleRow("Leave Approval Alerts", "Receive a prompt when leave requests need your review.", true)}
                ${renderToggleRow("Payroll Notifications", "Get notified when payroll schedules or exceptions change.", false)}
                ${renderToggleRow("Birthday & Anniversary Notifications", "Celebrate team milestones with timely reminders.", true)}
              `,
              false
            )}

            ${renderPanel(
              "security",
              "Security",
              "Protect your account",
              "Manage access, alerts, and the devices connected to your HR workspace.",
              `
                ${renderFieldRow("Change Password", "Keep your credentials strong and rotated regularly.", "", "Change", "Change password")}
                ${renderFieldRow("Two-Factor Authentication", "Strengthen sign-in with a verification code.", "Enabled", "Manage", "Manage MFA")}
                ${renderFieldRow("Login Alerts", "Notify me whenever a new device signs in.", "Enabled", "Edit", "Edit alerts")}
                ${renderFieldRow("Active Sessions", "Review the devices currently signed in to your account.", "3 active sessions", "Review", "Review sessions")}
              `,
              false
            )}

            ${renderPanel(
              "appearance",
              "Appearance",
              "Personalize the workspace",
              "Adjust how the HR console looks and feels to suit your workflow.",
              `
                ${renderFieldRow("Theme selector", "Choose the visual theme for the dashboard experience.", `<select class="control-select" aria-label="Theme selector"><option value="corporate-blue" selected>Corporate Blue</option><option value="executive-purple">Executive Purple</option><option value="emerald-green">Emerald Green</option><option value="slate-gray">Slate Gray</option><option value="sunset-orange">Sunset Orange</option><option value="dark-mode">Dark Mode</option><option value="baby-pink">Baby Pink</option></select>`, "Apply", "Apply theme")}
                ${renderToggleRow("Compact Sidebar", "Reduce the sidebar footprint to keep more room for content.", false)}
                ${renderFieldRow("Font Size", "Choose the text display density for readability.", `<select class="control-select" aria-label="Font size"><option selected>Medium</option><option>Small</option><option>Large</option></select>`, "Save", "Save font size")}
              `,
              false
            )}
          </div>
        </section>
      `;
    },
    afterRender(root) {
      const navButtons = root.querySelectorAll(".settings-nav__item");
      const panels = root.querySelectorAll(".settings-panel");

      navButtons.forEach((button) => {
        button.addEventListener("click", () => {
          const target = button.dataset.target;
          navButtons.forEach((item) => {
            const active = item === button;
            item.classList.toggle("is-active", active);
            item.setAttribute("aria-pressed", String(active));
          });

          panels.forEach((panel) => {
            const active = panel.dataset.panel === target;
            panel.classList.toggle("is-active", active);
            panel.hidden = !active;
          });
        });
      });

      U.bindActionToasts(root);
    }
  };
})();
