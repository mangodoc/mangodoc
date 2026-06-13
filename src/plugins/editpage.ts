import Util from "../util/util";
import Layout from "../enum/layout";

function generateEditUrl(): string | null {
  const repo = window.$mangodoc.repo;
  if (!repo) return null;

  const hash = Util.getHash();
  let path = hash.replace("#", "");
  if (path === "/") {
    path = "/README.md";
  } else {
    path += ".md";
  }
  path = "docs" + path;

  const branch = window.$mangodoc.editBranch || "master";
  return `${repo}/edit/${branch}/${path}`;
}

export default {
  doneEach() {
    const editUrl = generateEditUrl();
    if (!editUrl) return;

    const container = document.getElementById(Layout.container);
    if (!container) return;

    const existing = container.querySelector(".cool-edit-page");
    if (existing) existing.remove();

    const el = document.createElement("div");
    el.className = "cool-edit-page";
    el.innerHTML = `<a href="${editUrl}" target="_blank" rel="noopener"><i class="el-icon-edit-outline"></i> 编辑此页</a>`;

    const pageNav = container.querySelector(".page-nav");
    if (pageNav) {
      container.insertBefore(el, pageNav);
    } else {
      container.appendChild(el);
    }
  }
};
