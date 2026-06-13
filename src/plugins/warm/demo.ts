export default {
    init(){ console.info("[warm] demo init"); },
    beforeEach(content: string){ return content; },
    afterEach(html: string, next: any){ next(html); },
    doneEach(){ console.info("[warm] doneEach"); },
    mounted(){ console.info("[warm] mounted"); },
    ready(){ console.info("[warm] ready"); },
    onpopstate(){},
    resize(){}
}
