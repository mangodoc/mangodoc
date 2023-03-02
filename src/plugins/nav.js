import { marked } from "marked";
import $ from "jquery";
export default {
    ready(){
        console.info("nav ready");
        var el = document.createElement("el-header");
        el.id = "header";
        fetch("docs/_navbar.md")
        .then(response => response.text())
        .then(markdown => {
            const html = marked.parse(markdown);
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
window.operFn = function(){
    let width = $("#aside").width();
    width = width == 0 ? 250 : 0;
    $("#aside").width(width);
}
//$mgdoc.plugins = [].concat(install, $mgdoc.plugins);