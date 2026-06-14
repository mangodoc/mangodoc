import Util from "../util/util";
import Layout from "../enum/layout";

let cachedSidebar: Array<any> | null = null;
let sidebarPromise: Promise<void> | null = null;

function loadSidebar(): Promise<void> {
  if (sidebarPromise) return sidebarPromise;
  sidebarPromise = fetch("docs/_sidebar.json?t=" + Math.random())
    .then(r => r.text())
    .then(json => {
      try { cachedSidebar = JSON.parse(json); } catch (_) { cachedSidebar = []; }
    })
    .catch(() => { cachedSidebar = []; });
  return sidebarPromise;
}

function findBreadcrumb(
  items: Array<any>,
  hash: string,
  trail: Array<{ title: string; href: string | null }> = []
): Array<{ title: string; href: string | null }> | null {
  for (const item of items) {
    const currentTrail = [...trail, { title: item.title, href: item.href || null }];
    if (item.href && item.href === hash) {
      return currentTrail;
    }
    if (item.children) {
      const result = findBreadcrumb(item.children, hash, currentTrail);
      if (result) return result;
    }
  }
  return null;
}

function renderBreadcrumb(items: Array<{ title: string; href: string | null }>): string {
  const parts = items.map((item, i) => {
    if (i === items.length - 1) {
      return `<span class="breadcrumb-current">${esc(item.title)}</span>`;
    }
    if (item.href) {
      return `<a class="breadcrumb-link" href="${item.href}">${esc(item.title)}</a>`;
    }
    return `<span class="breadcrumb-parent">${esc(item.title)}</span>`;
  });
  return `<nav class="mangodoc-breadcrumb">${parts.join('<span class="breadcrumb-sep">&gt;</span>')}</nav>`;
}

function esc(s: string): string {
  const d = document.createElement("div");
  d.appendChild(document.createTextNode(s));
  return d.innerHTML;
}

export default {
  _styleAdded: false,

  ready() {
    if (this._styleAdded) return;
    this._styleAdded = true;
    const style = document.createElement("style");
    style.id = "breadcrumb-style";
    style.textContent = `
      .mangodoc-breadcrumb {
        padding: 10px 16px;
        font-size: 13px;
        color: var(--cool-text-muted, #888);
        border-bottom: 1px solid rgba(128,128,128,0.12);
        margin-bottom: 8px;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 4px;
        line-height: 1.6;
      }
      .breadcrumb-link {
        color: var(--cool-text-secondary, #666);
        text-decoration: none;
        transition: color 0.2s;
      }
      .breadcrumb-link:hover {
        color: var(--theme-color, #409EFF);
        text-decoration: underline;
      }
      .breadcrumb-parent {
        color: var(--cool-text-muted, #888);
      }
      .breadcrumb-current {
        color: var(--cool-text-primary, #333);
        font-weight: 500;
      }
      .breadcrumb-sep {
        margin: 0 2px;
        opacity: 0.5;
        user-select: none;
      }
    `;
    document.head.appendChild(style);
  },

  doneEach() {
    if (Util.getHash() === "#/") return;

    setTimeout(() => {
      const container = document.getElementById(Layout.container);
      if (!container) return;

      loadSidebar().then(() => {
        if (!cachedSidebar || cachedSidebar.length === 0) return;

        const hash = Util.getHash();
        const trail = findBreadcrumb(cachedSidebar, hash);
        if (!trail || trail.length <= 1) return;

        const existing = container.querySelector(".mangodoc-breadcrumb");
        if (existing) existing.remove();

        const nav = document.createElement("div");
        nav.innerHTML = renderBreadcrumb(trail);
        const breadcrumbEl = nav.firstElementChild;
        if (!breadcrumbEl) return;

        let topBar = container.querySelector<HTMLElement>(".cool-top-bar");
        if (!topBar) {
          topBar = document.createElement("div");
          topBar.className = "cool-top-bar";
          container.insertBefore(topBar, container.firstChild);
        }
        topBar.appendChild(breadcrumbEl);

        const wordCount = container.querySelector(".word-count-container");
        if (wordCount && wordCount.parentElement !== topBar) {
          topBar.appendChild(wordCount);
        }

      });
    }, 0);
  }
};
