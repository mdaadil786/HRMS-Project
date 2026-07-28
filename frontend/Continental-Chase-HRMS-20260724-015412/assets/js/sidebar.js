(function () {
  document.addEventListener("DOMContentLoaded", () => {
    const sidebar = document.getElementById("sidebar");
    const toggle = document.getElementById("sidebarToggle");
    const mobileQuery = window.matchMedia("(max-width: 1080px)");

    function setCollapsed(collapsed) {
      sidebar.classList.toggle("collapsed", collapsed);
      document.body.classList.toggle("sidebar-collapsed", collapsed);
      toggle.setAttribute("aria-expanded", String(!collapsed));
      toggle.setAttribute("aria-label", collapsed ? "Expand sidebar" : "Collapse sidebar");
    }

    if (mobileQuery.matches) setCollapsed(true);

    toggle.addEventListener("click", () => {
      sidebar.classList.toggle("collapsed");
      document.body.classList.toggle("sidebar-collapsed");
      const collapsed = sidebar.classList.contains("collapsed");
      toggle.setAttribute("aria-expanded", String(!collapsed));
      toggle.setAttribute("aria-label", collapsed ? "Expand sidebar" : "Collapse sidebar");
    });
  });
})();
