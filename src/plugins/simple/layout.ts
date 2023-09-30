import App from "../../app";
import Layout from "../../enum/layout";
import Util from "../../util/util";
export default {
    // init(){
    //     console.info("core init");
    // },
    // beforeEach(content){
    //     console.info("core beforeEach");
    //     return content;
    // },
    // afterEach(html,next){
    //     next(html);
    // },
    // doneEach(){
    //     console.info("core doneEach");
    // },
    // mounted(){
    //     console.info("core mounted");
    // },
    ready(){
        // console.info("core ready");
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
        vue.appendChild(pageEl);
        Util.setFlag(Layout.layout);
        console.info("layout finish!");
    },
    onpopstate(){
        // 如果是锚点，则不加载资源，因为是同一个页面
        let app = new App();
        app.start();
        // 变化页面标题
        $("title").text(Util.getNavMap(window.location.hash));
        if(Util.getHash() == "#/"){
            window.location.reload();
        }
    }
}
