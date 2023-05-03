/**
 * 插件生命周期枚举
 * 
 * @author mangomei
 * @since 2023-05-03 11:39
 */
enum Lifecycle {
    init = "init",
    beforeEach = "beforeEach",
    afterEach = "afterEach",
    doneEach = "doneEach",
    ready = "ready",
    mounted = "mounted",
    onpopstate = "onpopstate",
    resize = "resize"
}
export default Lifecycle;