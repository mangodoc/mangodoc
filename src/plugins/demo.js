export default {
    init(){
        console.info("demo init");
    },
    beforeEach(content){
        console.info("demo beforeEach");
        return content;
    },
    afterEach(html,next){
        console.info("demo afterEach:"+html);
        next(html);
    },
    doneEach(){
        console.info("demo doneEach");
    },
    mounted(){
        console.info("demo mounted");
    },
    ready(){
        console.info("demo ready");
    }
}

//$mgdoc.plugins = [].concat(install, $mgdoc.plugins);