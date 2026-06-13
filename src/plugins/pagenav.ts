import Util from "../util/util";
import Layout from "../enum/layout";

let cachedList: Array<{ title: string; href: string }> | null = null;

function flattenSidebar(list: Array<any>): Array<{ title: string; href: string }> {
  let result: Array<{ title: string; href: string }> = [];
  for (const item of list) {
    if (!item.children) {
      if (item.href) result.push({ title: item.title, href: item.href });
    } else {
      result = result.concat(flattenSidebar(item.children));
    }
  }
  return result;
}

function renderNavHtml(prev: { title: string; href: string } | null, next: { title: string; href: string } | null): string {
  return `
    <div class="page-nav">
      <div class="page-nav-prev">
        ${prev ? `<a href="${prev.href}">← ${prev.title}</a>` : ''}
      </div>
      <div class="page-nav-next">
        ${next ? `<a href="${next.href}">${next.title} →</a>` : ''}
      </div>
    </div>
  `;
}

export default {
  _styleAdded: false,

  ready() {
    if (this._styleAdded) return;
    this._styleAdded = true;
    const style = document.createElement('style');
    style.id = 'pagenav-style';
    style.textContent = `
      .page-nav {
        display: flex;
        justify-content: space-between;
        margin-top: 16px;
        padding-top: 16px;
        border-top: 1px solid rgba(128,128,128,0.2);
      }
      .page-nav a {
        text-decoration: none;
        font-size: 14px;
        padding: 8px 16px;
        border-radius: 6px;
        transition: background 0.2s;
      }
      .page-nav a:hover {
        background: rgba(128,128,128,0.1);
      }
      .page-nav-next {
        margin-left: auto;
      }
    `;
    document.head.appendChild(style);
  },

  _appendNav() {
    const container = document.getElementById(Layout.container);
    if (!container) return;
    if (!cachedList) return;
    const currentHash = Util.getHash();
    const idx = cachedList.findIndex(p => p.href === currentHash);
    if (idx === -1) return;

    const existing = container.querySelector('.page-nav');
    if (existing) existing.remove();

    const prev = idx > 0 ? cachedList[idx - 1] : null;
    const next = idx < cachedList.length - 1 ? cachedList[idx + 1] : null;
    if (!prev && !next) return;

    const wrapper = document.createElement('div');
    wrapper.innerHTML = renderNavHtml(prev, next);
    const navEl = wrapper.firstElementChild;
    if (!navEl) return;

    let insertBeforeEl: Element | null = null;
    const updateCfg = window.$mangodoc?.updateTime;
    if (updateCfg) {
      const prefix = updateCfg.prefix || '最后修改时间为';
      for (let i = 0; i < container.children.length; i++) {
        const child = container.children[i];
        if (child.textContent?.includes(prefix)) {
          insertBeforeEl = child;
          break;
        }
      }
    }
    if (insertBeforeEl) {
      container.insertBefore(navEl, insertBeforeEl);
    } else {
      container.appendChild(navEl);
    }
  },

  doneEach() {
    if (Util.getHash() === "#/") return;
    if (cachedList) {
      setTimeout(() => this._appendNav(), 0);
      return;
    }
    fetch("docs/_sidebar.json?t=" + Math.random())
      .then(r => r.text())
      .then(json => {
        try {
          cachedList = flattenSidebar(JSON.parse(json));
        } catch (e) {
          return;
        }
        setTimeout(() => this._appendNav(), 0);
      });
  },
};
