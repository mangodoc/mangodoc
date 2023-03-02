import { marked } from "marked";

export default {
    ready(){
        console.info("aside ready");
        var elSide = document.createElement("el-aside");
        elSide.id = "aside";;
        fetch("docs/_sidebar.md")
        .then(response => response.text())
        .then(markdown => {
            const html = marked.parse(markdown);
            elSide.innerHTML = html;
            let pageEl = document.getElementById("page");
            pageEl.insertBefore(elSide,pageEl.firstChild);
            var el = document.createElement("h2");
            // title
            el.id = "title";
            el.innerHTML = `${window.$mgdoc.title}`;
            elSide.insertBefore(el,elSide.firstChild);
        });
        
    }
}

//$mgdoc.plugins = [].concat(install, $mgdoc.plugins);