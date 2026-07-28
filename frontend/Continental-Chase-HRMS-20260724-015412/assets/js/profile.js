(function () {
  const U = window.CC_UTILS;
  const D = window.CC_DATA;

  function infoItem(label, value, icon) {
    return `
      <div class="profile-detail-item">
        <span class="profile-detail-icon">${U.icon(icon, label)}</span>
        <div>
          <span>${U.escapeHtml(label)}</span>
          <strong>${U.escapeHtml(value)}</strong>
        </div>
      </div>
    `;
  }

  function field(label, value) {
    return `
      <div class="profile-field">
        <span>${U.escapeHtml(label)}</span>
        <strong>${U.escapeHtml(value)}</strong>
      </div>
    `;
  }

  function infoCard(eyebrow, title, icon, fields) {
    return `
      <article class="card profile-info-card">
        <div class="section-heading profile-card-heading">
          <div>
            <p class="eyebrow">${U.escapeHtml(eyebrow)}</p>
            <h2><span class="tone tone--blue">${U.icon(icon, title)}</span>${U.escapeHtml(title)}</h2>
          </div>
        </div>
        <div class="profile-field-grid">
          ${fields.map((item) => field(item.label, item.value)).join("")}
        </div>
      </article>
    `;
  }

  window.CCModules = window.CCModules || {};

  window.CCModules.profile = {
    title: "My Profile",

    render() {
      const p = D.profile;
      const joiningDate = U.date(p.joiningDate);

      return `
        ${U.pageHeader("My Profile", "View and manage your Continental Chase employee profile.", {
          label: "Employee",
          value: p.employeeId,
          caption: p.department
        })}

        <section class="profile-page" aria-label="Employee profile">
          <article class="card profile-hero-card">
            <div class="profile-hero">
              <div class="profile-hero-main">
                <div class="profile-avatar-large" aria-hidden="true">${U.escapeHtml(p.initials)}</div>
                <div class="profile-hero-copy">
                  <p class="eyebrow">Continental Chase</p>
                  <h2>${U.escapeHtml(p.name)}</h2>
                  <p class="profile-designation">${U.escapeHtml(p.designation)}</p>
                  <div class="profile-hero-tags">
                    <span>${U.escapeHtml(p.department)}</span>
                    <span>${U.escapeHtml(p.employeeId)}</span>
                  </div>
                </div>
              </div>
              <button class="button" id="editProfile" type="button">
                <i class="fa-solid fa-pen" aria-hidden="true"></i>
                Edit Profile
              </button>
            </div>

            <div class="profile-detail-grid" aria-label="Profile contact summary">
              ${infoItem("Email", p.email, "fa-envelope")}
              ${infoItem("Phone", p.phone, "fa-phone")}
              ${infoItem("Location", p.location, "fa-location-dot")}
              ${infoItem("Joining Date", joiningDate, "fa-calendar-days")}
            </div>
          </article>

          <div class="profile-card-grid">
            ${infoCard("Personal", "Personal Information", "fa-user", [
              { label: "Full Name", value: p.name },
              { label: "Date of Birth", value: p.dob },
              { label: "Gender", value: p.gender },
              { label: "Blood Group", value: p.bloodGroup },
              { label: "Nationality", value: p.nationality },
              { label: "Marital Status", value: p.maritalStatus }
            ])}

            ${infoCard("Employment", "Employment Details", "fa-briefcase", [
              { label: "Employee ID", value: p.employeeId },
              { label: "Designation", value: p.designation },
              { label: "Department", value: p.department },
              { label: "Reporting Manager", value: p.manager },
              { label: "Joining Date", value: joiningDate },
              { label: "Employment Type", value: p.employmentType }
            ])}

            ${infoCard("Payroll", "Financial Information", "fa-money-check-dollar", [
              { label: "Salary Band", value: "Executive Band" },
              { label: "Pay Cycle", value: "Monthly" },
              { label: "Payment Method", value: "Direct Deposit" },
              { label: "Tax Region", value: "United States" },
              { label: "Benefits Plan", value: "Continental Plus" },
              { label: "Payroll Status", value: "Active" }
            ])}

            ${infoCard("Safety", "Emergency Contact", "fa-user-check", [
              { label: "Contact Name", value: "Michael Spencer" },
              { label: "Relationship", value: "Spouse" },
              { label: "Phone", value: "+1 (555) 918-2046" },
              { label: "Email", value: "michael.spencer@example.com" },
              { label: "Address", value: "New York, NY" },
              { label: "Priority", value: "Primary Contact" }
            ])}
          </div>
        </section>
      `;
    },

    afterRender(root) {
      root.querySelector("#editProfile").addEventListener("click", () => {
        alert("Edit Profile feature coming soon.");
      });
    }
  };
})();
