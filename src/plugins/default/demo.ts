export default {
    init(){
        console.info("demo init");
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
