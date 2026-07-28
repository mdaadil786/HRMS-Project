(function () {
  const routeOrder = ["dashboard", "employees", "attendance", "leave", "payroll", "recruitment", "performance", "reports", "settings" , "profile"];

  function routeFromHash() {
    const route = window.location.hash.replace("#/", "");
    return routeOrder.includes(route) ? route : "dashboard";
  }

  function setActive(route) {
    document.querySelectorAll(".nav-item[data-route]").forEach((item) => {
      const active = item.dataset.route === route;
      item.classList.toggle("active", active);
      if (active) item.setAttribute("aria-current", "page");
      else item.removeAttribute("aria-current");
    });
  }

  function renderRoute(route) {
    const module = window.CCModules[route] || window.CCModules.dashboard;
    const root = document.getElementById("viewRoot");
    window.clearInterval(window.__ccAttendanceTimer);
    root.innerHTML = module.render();
    setActive(route);
    document.title = `${module.title} | Continental Chase`;
    if (module.afterRender) module.afterRender(root);
    root.querySelector("h1")?.focus?.();
  }

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".nav-item[data-route]").forEach((item) => {
      item.addEventListener("click", () => {
        const route = item.dataset.route;
        if (window.location.hash !== `#/${route}`) window.location.hash = `#/${route}`;
        else renderRoute(route);
      });
    });

    window.addEventListener("hashchange", () => renderRoute(routeFromHash()));
    renderRoute(routeFromHash());
  });
})();
