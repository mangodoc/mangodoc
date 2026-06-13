export default {
    init(){
        console.info("[cool] demo init");
    },
    beforeEach(content: string){
        return content;
    },
    afterEach(html: string,next: any){
        next(html);
    },
    doneEach(){
    },
    mounted(){
    },
    ready(){
    }
}
