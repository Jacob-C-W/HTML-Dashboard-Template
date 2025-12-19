/**
 * HTML-Dashboard-Template
 * Version 2.0
 * File: core/js/config.example.js
 *
 * This file defines a single global config object used by all pages.
 * It is intentionally generic and safe to publish.
 *
 * Usage:
 *   - For your own environment, copy this file to `config.js`
 *   - Edit the values (business name, quick links, etc.)
 *   - In your HTML, include: <script src="js/config.js"></script>
 */

/* -----------------------------------------------------------------------
   1. GLOBAL CONFIG OBJECT
   ----------------------------------------------------------------------- */

window.DASHBOARD_CONFIG = {
  /**
   * Basic identity for the dashboard instance.
   * These appear in the sidebar header and footer.
   */
  business: "Example Business",        // e.g. "HomeNet", "ExampleCorp"
  environment: "Env",                  // e.g. "Lab", "Prod", "Test"
  orgName: "Example Org Name",        // e.g. "Network Engineering Group"
  useCase: "Short description of usage", // e.g. "Network dashboard template",

  /**
   * Quick links shown in the left sidebar.
   *
   * This is intentionally generic: you can point these to anything:
   * - monitoring tools
   * - documentation
   * - ticketing systems
   * - home router / NAS / etc.
   */
  quickLinks: [
    // Replace these placeholders with your actual links.
    { label: "Example Link 1", url: "https://example.com" },
    { label: "Example Link 2", url: "https://example.org" },
    { label: "Example Link 3", url: "https://example.net" }
  ]
};


/* -----------------------------------------------------------------------
   2. HELPER: APPLY CONFIG TO A PAGE
   ----------------------------------------------------------------------- */

/**
 * applyDashboardConfig
 *
 * Called from each HTML page to:
 * - Fill in sidebar labels (business, environment, org, use case)
 * - Optionally set page title/subtitle in the main content area
 * - Populate the quick-links list
 *
 * Arguments:
 *   options (object, optional):
 *     - pageTitle:    string (shown in main header)
 *     - pageSubtitle: string (shown below main header)
 */
window.applyDashboardConfig = function applyDashboardConfig(options = {}) {
  const cfg = window.DASHBOARD_CONFIG || {};

  const pageTitle = options.pageTitle || "Dashboard Home";
  const pageSubtitle =
    options.pageSubtitle || "Reusable template for tools, map, and docs.";

  // ----- Sidebar text elements -----
  const businessEl = document.getElementById("sidebar-business");
  const envEl = document.getElementById("sidebar-environment");
  const orgEl = document.getElementById("sidebar-org");
  const useCaseEl = document.getElementById("sidebar-usecase");

  if (businessEl) businessEl.textContent = cfg.business || "Business";
  if (envEl) envEl.textContent = cfg.environment || "Env";
  if (orgEl) orgEl.textContent = cfg.orgName || "Org Name";
  if (useCaseEl) useCaseEl.textContent = cfg.useCase || "Use case";

  // ----- Main header text elements -----
  const pageTitleEl = document.getElementById("page-title");
  const pageSubtitleEl = document.getElementById("page-subtitle");

  if (pageTitleEl) pageTitleEl.textContent = pageTitle;
  if (pageSubtitleEl) pageSubtitleEl.textContent = pageSubtitle;

  // ----- Quick links in sidebar -----
  const quickListEl = document.getElementById("sidebar-quick-links");

  if (quickListEl) {
    quickListEl.innerHTML = "";

    const links = Array.isArray(cfg.quickLinks) ? cfg.quickLinks : [];

    if (links.length === 0) {
      // Show a gentle placeholder if no links are defined.
      const li = document.createElement("li");
      const span = document.createElement("span");
      span.textContent = "No quick links defined. Edit DASHBOARD_CONFIG.quickLinks.";
      span.className = "text-small text-muted";
      li.appendChild(span);
      quickListEl.appendChild(li);
      return;
    }

    links.forEach((item) => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      const dot = document.createElement("span");
      const labelSpan = document.createElement("span");

      dot.className = "sidebar-link-dot";
      labelSpan.textContent = item.label;

      a.href = item.url || "#";
      a.target = "_blank";
      a.rel = "noopener noreferrer";

      a.appendChild(dot);
      a.appendChild(labelSpan);

      li.appendChild(a);
      quickListEl.appendChild(li);
    });
  }
};
