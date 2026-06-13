import Layout from "../enum/layout";
import Retry from "./retry";
import Util from "./util";

/**
 * vue工具类
 * 
 * @author mangomei
 * @since 2023-05-02 21:44
 */
class VueUtil {
    /**
     * vue实例
     */ 
    private static vm: any = null;

    /**
     * 局部vue实例
     */
    private static localVm: any = null;

    /**
     * 销毁所有vue实例，用于封面页到内容页的切换
     */
    static destroyVm(){
        if (this.vm) {
            this.vm.$destroy();
            this.vm = null;
        }
        if (this.localVm) {
            this.localVm.$destroy();
            this.localVm = null;
        }
    }

    /**
     * 创建vue实例
     * @param condition 条件
     * @param localVue 本地vue
     * @param options vue选项
     */
    static create(condition: Function,localVue: any,options: any){
        let retry = new Retry();
        retry.handle(condition,()=>{
            if(!Util.getFlag(Layout.app)){
                options.el = "#" + Layout.app;
                this.vm = new window.Vue(options);
                Util.setFlag(Layout.app);
                console.info("create app vue");
            }else{
                if(localVue){
                    if (this.localVm) {
                        this.localVm.$destroy();
                        this.localVm = null;
                    }
                    options.el = "#" + Layout.container;
                    this.localVm = new window.Vue(options);
                    console.info("create local vue");
                }
            }
        });
    }

    /**
     * 获取vm
     * @returns vm
     */
    static getVm(){
        return this.vm;
    }
    /**
     * 获取局部vue示例
     * @returns localVm
     */
    static getLocalVm(){
        return this.localVm;
    }
}

export default VueUtil;