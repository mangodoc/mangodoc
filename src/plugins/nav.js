import $ from "jquery";
function renderNavItem(list){
    let html = "";
    for(let item of list){
        if(!item.children){
            if(item.level == 2){
                html += `<el-dropdown-item><a class="nav-a" href="${item.href}" target="${item.target}">${item.title}</a></el-dropdown-item>`;
            }else if(item.level == 1){
                html += `<a class="nav-a" href="${item.href}" target="${item.target}">${item.title}</a>`;
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
        console.info("nav ready");
        var el = document.createElement("el-header");
        el.id = "header";
        fetch("docs/_navbar.json")
        .then(response => response.text())
        .then(json => {
            let navList = JSON.parse(json);
            console.info(navList);
            let html = renderNavItem(navList);
            console.info("nav:"+html);
            let oper = `<i id='oper' class='el-icon-s-operation oper' onclick='window.operFn()'></i>`
            el.innerHTML = oper + html;
            let mainEl = document.getElementById("main");
            mainEl.insertBefore(el,mainEl.firstChild);
            document.getle
            new Vue({
                el: '#vue'
            })
            $("#aside").width(250);
        });
    }
}

window.asideInitFn = function(){
    let screenWidth = window.innerWidth;
    // console.log('当前屏幕宽度：' + screenWidth + 'px');
    if(screenWidth < 500){
        $("#aside").hide();
    }else{
        $("#aside").show();
    }
    
}
window.operFn = function(){
    let v = $("#aside");
    let width = v.width();
    width = width == 0 ? 250 : 0;
    v.width(width);
    if(width == 0){
        v.hide();
    }else{
        v.show();
    }

}
//$mgdoc.plugins = [].concat(install, $mgdoc.plugins);