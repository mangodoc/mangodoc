import $ from "jquery";
import Util from "../../util/util";
import Layout from "../../enum/layout";
import Global from "../../util/global";

function renderNavItem(list: Array<any>): string {
    let html = "";
    for(let item of list){
        if(!item.children){
            if(item.level == 2){
                html += `<el-dropdown-item><a class="nav-a" href="${item.href}" target="${item.target}">`;
                if(item.icon) html += `<i class="${item.icon} theme-color"></i>`;
                html += `${item.title}</a></el-dropdown-item>`;
            }else if(item.level == 1){
                html += `<a class="nav-a" href="${item.href}" target="${item.target}">`;
                if(item.icon) html += `<i class="${item.icon} theme-color"></i>`;
                html += `${item.title}</a>`;
            }
            if(item.href.startsWith("#")) Util.setNavMap(item.href, item.title);
        }else {
            let ih = renderNavItem(item.children);
            html += `<el-dropdown><span class="el-dropdown-link">${item.title}<i class="el-icon-arrow-down el-icon--right"></i></span><el-dropdown-menu slot="dropdown">${ih}</el-dropdown-menu></el-dropdown>`;
        }
    }
    return html;
}

export default {
    ready(){
        var el = document.createElement("el-header");
        el.id = Layout.header;
        fetch("docs/_navbar.json?t="+Math.random())
        .then(response => response.text())
        .then(json => {
            let navList = JSON.parse(json);
            let html = renderNavItem(navList);
            let oper = `<i id='${Layout.oper}' class='el-icon-menu oper' onclick='window.operFn()'></i>`;
            el.innerHTML = oper + html;

            let mainEl: any = document.getElementById("page");
            if (mainEl) mainEl.insertBefore(el, mainEl.firstChild);

            if(window.$mangodoc.repo){
                let h = `<a class="nav-a" href="${window.$mangodoc.repo}" target="_blank"><i class="el-icon-cloudy theme-color"></i>仓库</a> <span class="version">v${window.$mangodoc.version}</span>`;
                let span = document.createElement('span');
                span.innerHTML = h;
                let header: any = document.getElementById(Layout.header);
                if (header) header.appendChild(span);
            }

            var logoEl = document.createElement("a");
            logoEl.id = "title";
            logoEl.href = "#/";
            logoEl.target = "_self";
            let logo = Util.getConfig("logo");
            let titleHtml = `<img id="logo" src="${logo}"/>${window.$mangodoc.title}`;
            logoEl.innerHTML = titleHtml;
            el.insertBefore(logoEl, el.firstChild);

            Util.setFlag(Layout.nav);
            console.info("[warm] nav finish");
        });
    },
    mounted(){}
}

window.operFn = function(){
    var v = document.getElementById('aside');
    if (!v) return;
    if (window.innerWidth <= 500) {
        document.body.classList.toggle('sidebar-open');
    } else {
        v.style.display = v.style.display === 'none' ? '' : 'none';
    }
}
