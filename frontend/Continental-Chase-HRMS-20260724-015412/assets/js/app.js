(function () {
  window.CC_APP = {
    showToast(message) {
      const toast = document.getElementById("toast");
      toast.textContent = message;
      toast.classList.add("visible");
      window.clearTimeout(window.__ccToastTimer);
      window.__ccToastTimer = window.setTimeout(() => toast.classList.remove("visible"), 2200);
    },

    setCurrentDate() {
      const dateElement = document.getElementById("currentDate");
      const now = new Date();
      dateElement.dateTime = now.toISOString();
      dateElement.textContent = now.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric"
      });
    },

    initTheme() {
      const select = document.getElementById("themeSelect");
      const stored = localStorage.getItem("continental-chase-theme") || "corporate-blue";
      this.applyTheme(stored);
      select.value = stored;

      select.addEventListener("change", () => {
        this.applyTheme(select.value);
        localStorage.setItem("continental-chase-theme", select.value);
        window.CC_CHARTS?.render(document.getElementById("viewRoot"));
      });
    },

    applyTheme(theme) {
      document.body.dataset.theme = theme;
    },

    initProfileMenu() {
      const button = document.getElementById("profileButton");
      const dropdown = document.getElementById("profileDropdown");

      button.addEventListener("click", () => {
        const expanded = button.getAttribute("aria-expanded") === "true";
        button.setAttribute("aria-expanded", String(!expanded));
        dropdown.classList.toggle("visible", !expanded);
      });

      document.addEventListener("click", (event) => {
        if (!button.contains(event.target) && !dropdown.contains(event.target)) {
          button.setAttribute("aria-expanded", "false");
          dropdown.classList.remove("visible");
        }
      });
    },

    initGlobalSearch() {
      const input = document.getElementById("globalSearch");
      input.addEventListener("keydown", (event) => {
        if (event.key === "Enter" && input.value.trim()) {
          this.showToast(`Search queued for "${input.value.trim()}"`);
        }
      });
    },

    initLoadingScreen() {
      window.setTimeout(() => {
        document.body.classList.add("loaded");
        document.getElementById("loadingScreen").setAttribute("hidden", "");
      }, 220);
    },

    init() {
      this.setCurrentDate();
      this.initTheme();
      this.initProfileMenu();
      this.initGlobalSearch();
      this.initLoadingScreen();
    }
  };

  document.addEventListener("DOMContentLoaded", () => window.CC_APP.init());
})();
