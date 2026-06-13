export default {
    init(){
        console.info("[cool] demo init");
    },
    beforeEach(content: string){
        console.info("[cool] demo beforeEach");
        return content;
    },
    afterEach(html: string,next: any){
        next(html);
    },
    doneEach(){
        console.info("[cool] demo doneEach");
    },
    mounted(){
        console.info("[cool] demo mounted");
    },
    ready(){
        console.info("[cool] demo ready");
    },
    onpopstate(event: Event){

    },
    resize(){

    }
}
