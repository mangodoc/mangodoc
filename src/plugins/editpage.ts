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

function addFooterLink(editUrl: string) {
  const container = document.getElementById(Layout.container);
  if (!container) return;

  let el = container.querySelector<HTMLElement>(".cool-edit-page");
  if (el) {
    el.querySelector("a")!.href = editUrl;
    return;
  }

  el = document.createElement("div");
  el.className = "cool-edit-page";
  el.innerHTML = `<a href="${editUrl}" target="_blank" rel="noopener"><i class="el-icon-edit-outline"></i> 编辑此页</a>`;

  const pageNav = container.querySelector(".page-nav");
  if (pageNav) {
    container.insertBefore(el, pageNav);
  } else {
    container.appendChild(el);
  }
}

function addHeaderLink(editUrl: string) {
  const header = document.getElementById(Layout.header);
  if (!header) return;

  header.querySelectorAll(".cool-edit-header").forEach(el => el.remove());

  const link = document.createElement("a");
  link.className = "cool-edit-header";
  link.href = editUrl;
  link.target = "_blank";
  link.rel = "noopener";
  link.innerHTML = '<i class="el-icon-edit-outline"></i> 编辑';

  const version = header.querySelector(".version");
  if (version && version.parentElement) {
    version.parentElement.insertBefore(link, version);
    version.parentElement.insertBefore(document.createTextNode(" "), version);
  } else {
    header.appendChild(link);
  }
}

export default {
  doneEach() {
    const editUrl = generateEditUrl();
    if (!editUrl) return;

    addFooterLink(editUrl);
    addHeaderLink(editUrl);
  }
};
