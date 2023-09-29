import util from "../../util";

function renderSidebarItem(list,init){
    let html = "";
    if(init){
        html = `
            <el-menu
                default-active="1"
                class="el-menu-vertical-demo"
                :default-openeds="menuOpens">
        `;
    }
    for(let item of list){
        if(!item.children){
            html += `<el-menu-item index="${item.index}"><a href="${item.href}" target="${item.target}">${item.title}</a></el-menu-item>`
            if(item.href.startsWith("#")){
                window.navMap[item.href] = item.title;
            }
        }else {
            let itemHtml = renderSidebarItem(item.children,false);
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
        // console.info("aside ready");
        var elSide = document.createElement("el-aside");
        elSide.setAttribute("width",util.getConfigOrDefault("sideWidth") + "px");
        elSide.id = "aside";
        fetch("docs/_sidebar.json?t="+Math.random())
        .then(response => response.text())
        .then(json => {
            let sidebarList = JSON.parse(json);
            let html = renderSidebarItem(sidebarList,true);
            // console.info("sidebar html:"+html);
            elSide.innerHTML = html;
            let pageEl = document.getElementById("main");
            pageEl.insertBefore(elSide,pageEl.firstChild);
            util.setFlag("aside");
            console.info("aside finish!");
        });
    }
}