import Layout from "../../enum/layout";
import Global from "../../util/global";
import Util from "../../util/util";
// 默认值
let active = {
    index: "1",
    title: "主页"
};

function renderSidebarItem(list: Array<any>,init: boolean) {
    let html = "";
    if(init){
        html = `
            <el-menu
                default-active="${active.index}"
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
export default {
    ready(){
        console.info("aside ready");
        var elSide = document.createElement("el-aside");
        elSide.setAttribute("width",Util.getConfigOrDefault(Global.ASIDE_WIDTH) + "px");
        elSide.id = Layout.aside;
        fetch("docs/_sidebar.json?t="+Math.random())
        .then(response => response.text())
        .then(json => {
            let sidebarList = JSON.parse(json);
            active = Util.getActiveMenu(sidebarList);
            if (active) {
                window.document.title = active.title;
            }
            let html = renderSidebarItem(sidebarList, true);
            // console.info("sidebar html:"+html);
            elSide.innerHTML = html;
            let pageEl: any = document.getElementById(Layout.main);
            pageEl.insertBefore(elSide,pageEl.firstChild);
            Util.setFlag(Layout.aside);
            console.info("aside finish!");
        });
    }
}