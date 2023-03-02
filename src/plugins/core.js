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
        console.info("core ready");
        let template = `
            <el-container id="main">
        `;
        template += `
            <el-main><div id="app"></div></el-main>
        `; 
        if(window.$mgdoc.footer){
            template += `<el-footer id="footer">${window.$mgdoc.footer}</el-footer>`;
        }
        template += `
            </el-container>
        `;
        var pageEl = document.createElement("el-container");
        pageEl.id = "page"
        pageEl.innerHTML = template;
        let vue = document.getElementById("vue");
        vue.appendChild(pageEl);
    }
}

//$mgdoc.plugins = [].concat(install, $mgdoc.plugins);