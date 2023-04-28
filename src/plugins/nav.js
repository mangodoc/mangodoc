import $ from "jquery";
import util from "../util";
import Config from "../config";

function renderNavItem(list){
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
                window.navMap[item.href] = item.title;
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
        el.id = "header";
        fetch("docs/_navbar.json?t="+Math.random())
        .then(response => response.text())
        .then(json => {
            let navList = JSON.parse(json);
            // console.info(navList);
            let html = renderNavItem(navList);
            // console.info("nav:"+html);
            let oper = `<i id='oper' class='el-icon-d-arrow-left oper' onclick='window.operFn()'></i>`
            el.innerHTML = oper + html;
            let mainEl = document.getElementById("main");
            mainEl.insertBefore(el,mainEl.firstChild);
            // 处理repo
            if(window.$mangodoc.repo){
                let html = `
                    <a class="nav-a" href="${window.$mangodoc.repo}" target="_blank"><i class="el-icon-cloudy theme-color"></i>仓库</a>         
                `;
                let span = document.createElement('span');
                span.innerHTML = html;
                let header = document.getElementById("header");
                header.appendChild(span);
            }
            $("#aside").width(util.getSideWidth());
            if(screen.width < Config.smallWidth){
                $("#oper").removeClass("el-icon-d-arrow-left").addClass("el-icon-d-arrow-right");
            }
            util.setFlag("nav");
            console.info("nav finish");
        });
    },
    mounted(){
        
    }
}

window.operFn = function(){
    let v = $("#aside");
    if (v.is(':visible')) {
        $("#oper").removeClass("el-icon-d-arrow-left").addClass("el-icon-d-arrow-right");
        v.hide(); 
    } else {
        $("#oper").removeClass("el-icon-d-arrow-right").addClass("el-icon-d-arrow-left");
        v.show();
    }
}