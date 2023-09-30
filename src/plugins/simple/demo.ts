export default {
    init(){
        console.info("demo init");
    },
    beforeEach(content: string){
        console.info("demo beforeEach");
        return content;
    },
    afterEach(html: string,next: any){
        // console.info("demo afterEach:"+html);
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
    },
    onpopstate(event: Event){

    },
    resize(){

    }
}
