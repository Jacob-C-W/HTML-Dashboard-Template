// Global configuration for this dashboard project.
// Edit this file once per org / environment.

window.DASHBOARD_CONFIG = {
  // Org-level info (shared across all pages)
  business: "Test",
  environment: "Test",
  orgName: "Test Org",
  useCase: "Example usage",

  // Shared quick links (show up in the sidebar on every page)
  quickLinks: [
    { label: "Google", url: "https://www.google.com" },
    { label: "YouTube", url: "https://www.youtube.com" },
    { label: "GitHub", url: "https://github.com" },
    { label: "ChatGPT", url: "https://chatgpt.com/" },
  ],
};

/**
 * Apply shared config to the current page.
 *
 * pageOptions lets each page override:
 *  - pageTitle (main H1)
 *  - pageSubtitle (subheading)
 *
 * Example:
 *   applyDashboardConfig({
 *     pageTitle: "Maps Overview",
 *     pageSubtitle: "Select a group..."
 *   });
 */
window.applyDashboardConfig = function (pageOptions = {}) {
  const base = window.DASHBOARD_CONFIG || {};
  const cfg = {
    ...base,
    pageTitle: pageOptions.pageTitle || base.pageTitle,
    pageSubtitle: pageOptions.pageSubtitle || base.pageSubtitle,
  };

  // Basic text fields
  const logoEl = document.getElementById("logo-text");
  const envEl = document.getElementById("env-label");
  const orgEl = document.getElementById("org-name");
  const useEl = document.getElementById("use-case");
  const titleEl = document.getElementById("page-title");
  const subtitleEl = document.getElementById("page-subtitle");

  if (logoEl) logoEl.textContent = cfg.business || "Test";
  if (envEl) envEl.textContent = cfg.environment || "Test";
  if (orgEl) orgEl.textContent = cfg.orgName || "Test Org";
  if (useEl) useEl.textContent = cfg.useCase || "Example usage";
  if (titleEl && cfg.pageTitle) titleEl.textContent = cfg.pageTitle;
  if (subtitleEl && cfg.pageSubtitle) subtitleEl.textContent = cfg.pageSubtitle;

  // Quick links
  const quickList = document.getElementById("quick-links");
  if (quickList) {
    // Remove any placeholder
    const placeholder = quickList.querySelector(".no-js-placeholder");
    if (placeholder) quickList.removeChild(placeholder);

    quickList.innerHTML = ""; // Clear existing

    if (Array.isArray(cfg.quickLinks) && cfg.quickLinks.length > 0) {
      cfg.quickLinks.forEach((item) => {
        const li = document.createElement("li");
        const a = document.createElement("a");

        const dot = document.createElement("span");
        dot.className = "sidebar-link-dot";

        const labelSpan = document.createElement("span");
        labelSpan.textContent = item.label;

        a.href = item.url;
        a.target = "_blank";
        a.rel = "noopener noreferrer";

        a.appendChild(dot);
        a.appendChild(labelSpan);
        li.appendChild(a);
        quickList.appendChild(li);
      });
    } else {
      const li = document.createElement("li");
      const span = document.createElement("span");
      span.textContent = "No quick links defined.";
      span.style.fontSize = "0.8rem";
      span.style.color = "var(--text-muted)";
      li.appendChild(span);
      quickList.appendChild(li);
    }
  }
};
