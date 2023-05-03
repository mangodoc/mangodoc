import Global from "./global";
import Retry from "./retry";

/**
 * vue工具类
 * 
 * @author mangomei
 * @since 2023-05-02 21:44
 */
class VueUtil {
    // vue实例
    private static vm: any = null;
    /**
     * 创建vue实例
     * @param condition 条件
     * @param options vue选项
     */
    static create(condition: Function,options: any){
        let retry = new Retry();
        retry.handle(condition,()=>{
            this.vm = new window.Vue(options);
        });
    }
    /**
     * 获取vm
     * @returns vm
     */
    static getVm(){
        return this.vm;
    }
}

export default VueUtil;