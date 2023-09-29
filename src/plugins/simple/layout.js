import util from "../../util";
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
            <el-container id="main">
            <el-container id="container">
        `;
        template += `
            <el-main id='content'><div id="fullscreen-loading" class="fullscreen-loading"></div><div id="app"></div></el-main>
        `; 
        if(window.$mangodoc.footer){
            template += `<el-footer id="footer">${window.$mangodoc.footer}</el-footer>`;
        }
        template += `
            </el-container>
            </el-container>
        `;
        var pageEl = document.createElement("el-container");
        pageEl.id = "page"
        pageEl.innerHTML = template;
        let vue = document.getElementById("vue");
        vue.appendChild(pageEl);
        util.setFlag("layout");
        console.info("layout finish!");
    },
    onpopstate(){
        // 如果是锚点，则不加载资源，因为是同一个页面
        util.render(util.getUrl(),window.$mangodoc);
        // 变化页面标题
        $("title").text(window.navMap[window.location.hash]);
    }
}
