let index = 1;
import util from "../util";

function renderSidebarItem(list,init){
    let html = "";
    if(init){
        html = `
            <el-menu
                default-active="1"
                class="el-menu-vertical-demo">
        `;
    }
    for(let item of list){
        if(!item.children){
            html += `<el-menu-item index="${index}"><i class="${item.icon}"></i><a class="nav-a" href="${item.href}" target="${item.target}">${item.title}</a></el-menu-item>`
            if(item.href.startsWith("#")){
                window.navMap[item.href] = item.title;
            }
        }else {
            let itemHtml = renderSidebarItem(item.children,false);
            html += `
                <el-submenu index="${index}">
                    <template slot="title">
                        <i class="${item.icon}"></i>
                        <span>${item.title}</span>
                    </template>
                    ${itemHtml}
                </el-submenu>
            `;
        }
        index = index+1;
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
        elSide.style.width = util.getSideWidth();
        elSide.id = "aside";
        fetch("docs/_sidebar.json?t="+Math.random())
        .then(response => response.text())
        .then(json => {
            let sidebarList = JSON.parse(json);
            let html = renderSidebarItem(sidebarList,true);
            // console.info("sidebar html:"+html);
            elSide.innerHTML = html;
            let pageEl = document.getElementById("page");
            pageEl.insertBefore(elSide,pageEl.firstChild);
            var el = document.createElement("a");
            // title
            el.id = "title";
            el.href = "#/";
            el.target = "_self";
            let version = window.$mangodoc.version;
            if(version){
                el.innerHTML = `<el-badge value="v${version}" class="version-item">${window.$mangodoc.title}</el-badge>`;
            }else{
                el.innerHTML = `${window.$mangodoc.title}`;
            }
            elSide.insertBefore(el,elSide.firstChild);
            util.setFlag("aside");
            console.info("aside finish!");
        });
    }
}