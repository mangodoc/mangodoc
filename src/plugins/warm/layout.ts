import App from "../../app";
import $ from "jquery";
import Layout from "../../enum/layout";
import Util from "../../util/util";

export default {
    ready(){
        let template = `
            <el-container id="${Layout.main}">
            <el-container>
        `;
        template += `
            <el-main id='${Layout.content}'><div id="${Layout.fullscreenLoading}" class="fullscreen-loading"></div><div id="${Layout.container}"></div></el-main>
        `;
        if(window.$mangodoc.footer){
            template += `<el-footer id="${Layout.footer}">${window.$mangodoc.footer}</el-footer>`;
        }
        template += `
            </el-container>
            </el-container>
        `;
        var pageEl = document.createElement("el-container");
        pageEl.id = Layout.page;
        pageEl.innerHTML = template;
        let vue: any = document.getElementById(Layout.app);
        if (vue) vue.appendChild(pageEl);
        Util.setFlag(Layout.layout);
        console.info("[warm] layout finish");
    },
    onpopstate(){
        let app = new App();
        app.start();
        $("title").text(Util.getNavMap(window.location.hash));
        if(Util.getHash() == "#/") window.location.reload();
    }
}
