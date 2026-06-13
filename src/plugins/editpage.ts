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

    setTimeout(() => {
      const container = document.getElementById(Layout.container);
      if (!container) return;

      const wcContainer = container.querySelector(".word-count-container");
      if (!wcContainer) return;

      let link = wcContainer.querySelector<HTMLAnchorElement>(".cool-edit-page");
      if (link) {
        link.href = editUrl;
        return;
      }

      link = document.createElement("a");
      link.className = "cool-edit-page";
      link.href = editUrl;
      link.target = "_blank";
      link.rel = "noopener";
      link.innerHTML = '<i class="el-icon-edit-outline"></i> 编辑此页';

      (wcContainer as HTMLElement).style.display = "flex";
      (wcContainer as HTMLElement).style.alignItems = "center";
      (wcContainer as HTMLElement).style.justifyContent = "flex-end";
      (wcContainer as HTMLElement).style.gap = "16px";
      wcContainer.appendChild(link);
    }, 0);
  }
};
