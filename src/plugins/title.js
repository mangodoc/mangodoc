export default {
    init(){
        console.info("title init");
    },
    beforeEach(content){
        console.info("title beforeEach:"+content);
        return content;
    },
    afterEach(html,next){
        html = "<h2>添加的标题</h2>" + html;
        console.info("title afterEach:"+html);
        next(html);
    },
    doneEach(){
        console.info("title doneEach");
    },
    mounted(){
        console.info("title mounted");
    },
    ready(){
        console.info("title ready");
    }
}

//$mgdoc.plugins = [].concat(install, $mgdoc.plugins);