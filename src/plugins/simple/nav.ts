import $ from "jquery";
import Util from "../../util/util";
import Layout from "../../enum/layout";
import Global from "../../util/global";

function renderNavItem(list: Array<any>){
    let html = "";
    for(let item of list){
        if(!item.children){
            if(item.level == 2){
                html += `<el-dropdown-item><a class="nav-a" href="${item.href}" target="${item.target}">`;
                if(item.icon){
                    html += `<i class="${item.icon} theme-color"></i>`;
                }
                html += `${item.title}</a></el-dropdown-item>`;
            }else if(item.level == 1){
                html += `<a class="nav-a" href="${item.href}" target="${item.target}">`;
                if(item.icon){
                    html += `<i class="${item.icon} theme-color"></i>`;
                }
                html += `${item.title}</a>`;
            }
            
            if(item.href.startsWith("#")){
                Util.setNavMap(item.href,item.title);
            }
        }else {
            let itemHtml = renderNavItem(item.children);
            html += `
                <el-dropdown>
                    <span class="el-dropdown-link">
                    ${item.title}<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                    ${itemHtml}
                    </el-dropdown-menu>
                </el-dropdown>
            `;
        }
    }
    return html;
}
export default {
    ready(){
        // console.info("nav ready");
        var el = document.createElement("el-header");
        el.id = Layout.header;
        fetch("docs/_navbar.json?t="+Math.random())
        .then(response => response.text())
        .then(json => {
            let navList = JSON.parse(json);
            // console.info(navList);
            let html = renderNavItem(navList);
            // console.info("nav:"+html);
            let oper = `<i id='${Layout.oper}' class='el-icon-menu oper' onclick='window.operFn()'></i>`
            el.innerHTML = oper + html;
            let mainEl: any = document.getElementById("page");
            mainEl.insertBefore(el,mainEl.firstChild);
            // 处理repo
            if(window.$mangodoc.repo){
                let html = `
                    <a class="nav-a" href="${window.$mangodoc.repo}" target="_blank"><i class="el-icon-cloudy theme-color"></i>仓库</a> 
                    <span class="version">v${window.$mangodoc.version}</span>    
                `;
                let span = document.createElement('span');
                span.innerHTML = html;
                let header: any = document.getElementById(Layout.header);
                header.appendChild(span);
            }
            var logoEl = document.createElement("a");
            // title
            logoEl.id = "title";
            logoEl.href = "#/";
            logoEl.target = "_self";
            let logo = Util.getConfig("logo");
            let titleHtml = `<img id="logo" src="${logo}"/>${window.$mangodoc.title}`;
            logoEl.innerHTML = titleHtml;
            el.insertBefore(logoEl,el.firstChild);
            Util.setFlag(Layout.nav);
            console.info("nav finish");
        });
    },
    mounted(){
        
    }
}

window.operFn = function(){
    let v = $("#aside");
    if (v.is(':visible')) {
        v.hide(); 
    } else {
        v.show();
    }
}