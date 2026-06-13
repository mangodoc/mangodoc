import Layout from "../../enum/layout";
import Global from "../../util/global";
import Util from "../../util/util";
import VueUtil from "../../util/vue";

let active = {
    index: "1",
    title: "主页"
};
const hashToIndex: Record<string, string> = {};
function buildHashIndexMap(list: Array<any>) {
    for (const item of list) {
        if (!item.children) {
            if (item.href && item.index) hashToIndex[item.href] = item.index;
        } else {
            buildHashIndexMap(item.children);
        }
    }
}
function renderSidebarItem(list: Array<any>,init: boolean){
    let html = "";
    if(init){
        html = `
            <el-menu
                :default-active="activeIndex"
                class="el-menu-vertical-demo"
                :default-openeds="menuOpens">
        `;
    }
    for(let item of list){
        if(!item.children){
            html += `<el-menu-item index="${item.index}"><a class="nav-a" href="${item.href}" target="${item.target}">${item.title}</a></el-menu-item>`
            if(item.href.startsWith("#")){
                Util.setNavMap(item.href, item.title);
            }
        }else {
            let itemHtml = renderSidebarItem(item.children, false);
            html += `
                <el-submenu index="${item.index}">
                    <template slot="title">
                        <span>${item.title}</span>
                    </template>
                    ${itemHtml}
                </el-submenu>
            `;
        }
    }
    if(init){
        html += `</el-menu>`;
    }
    return html;
}

function updateActiveMenu() {
    const aside = document.getElementById(Layout.aside);
    if (!aside) return;
    const currentHash = Util.getHash();
    if (!currentHash || currentHash === "#/") return;

    const selectors = [".el-menu-item", "el-menu-item"];
    let theIndex: string | null = null;
    let theTitle: string | null = null;
    let targetItem: HTMLElement | null = null;

    for (const selector of selectors) {
        const items = aside.querySelectorAll<HTMLElement>(selector);
        for (const item of items) {
            const link = item.querySelector<HTMLAnchorElement>("a.nav-a");
            if (link && link.getAttribute("href") === currentHash) {
                theIndex = hashToIndex[currentHash] || item.getAttribute("index");
                theTitle = Util.getNavMap(currentHash);
                targetItem = item;
                break;
            }
        }
        if (targetItem) break;
    }
    if (!theIndex || !targetItem) return;
    if (theTitle) window.document.title = theTitle;

    const allItems = aside.querySelectorAll<HTMLElement>(".el-menu-item, el-menu-item");
    allItems.forEach(el => el.classList.remove("is-active"));
    targetItem.classList.add("is-active");

    const vm = VueUtil.getVm();
    if (vm) {
        vm.activeIndex = theIndex;

        const openIndices: string[] = [];
        let parent = targetItem.parentElement;
        while (parent && parent !== aside) {
            if (parent.tagName === "EL-SUBMENU" || parent.classList.contains("el-submenu")) {
                const idx = parent.getAttribute("index");
                if (idx) openIndices.push(idx);
            }
            parent = parent.parentElement;
        }
        if (openIndices.length) {
            vm.menuOpens = [...new Set([...(vm.menuOpens || []), ...openIndices])];
        }
    }
}

export default {
    _hashHandler: null as ((() => void) | null),
    ready(){
        console.info("[cool] aside ready");
        var elSide = document.createElement("el-aside");
        elSide.setAttribute("width",Util.getConfigOrDefault(Global.ASIDE_WIDTH) + "px");
        elSide.id = Layout.aside;
        fetch("docs/_sidebar.json?t="+Math.random())
        .then(response => response.text())
        .then(json => {
            if (document.getElementById(Layout.aside)) return;
            let sidebarList = JSON.parse(json);
            buildHashIndexMap(sidebarList);
            let theActive = Util.getActiveMenu(sidebarList);
            if (theActive) {
                window.document.title = theActive.title;
                active = theActive;
            }
            let html = renderSidebarItem(sidebarList, true);
            elSide.innerHTML = html;
            let pageEl: any = document.getElementById(Layout.main);
            pageEl.insertBefore(elSide,pageEl.firstChild);
            Util.setFlag(Layout.aside);
            setTimeout(() => updateActiveMenu(), 0);
            console.info("[cool] aside finish!");
        });

        if (!this._hashHandler) {
            this._hashHandler = () => updateActiveMenu();
            window.addEventListener("hashchange", this._hashHandler);
            window.addEventListener("popstate", this._hashHandler);
        }
    },
    mounted(){
        updateActiveMenu();
    }
}
