import { marked } from "marked";

export default {
    ready(){
        console.info("nav ready");
        var el = document.createElement("el-header");
        el.id = "header";
        if(window.$mgdoc.loadNavbar){
            fetch("docs/_navbar.md")
            .then(response => response.text())
            .then(markdown => {
                const html = marked.parse(markdown);
                el.innerHTML = html;
                let mainEl = document.getElementById("main");
                mainEl.insertBefore(el,mainEl.firstChild);
                new Vue({
                    el: '#vue'
                })
            });
        }
    }
}

//$mgdoc.plugins = [].concat(install, $mgdoc.plugins);