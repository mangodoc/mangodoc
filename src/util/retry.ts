import Global from "./global";
/**
 * 重试工具类
 * 
 * @author mangomei
 * @since 2023-05-02 21:59
 */
class Retry{
    // 重试次数
    private retryCount: number = 0;
    constructor(){
        this.retryCount = 0;
    }
    /**
     * 重试处理逻辑
     * @param condition 条件
     * @param callback 回调函数
     */
    handle(condition: Function,callback: Function){
        // console.info(`开始尝试：${condition()},${this.retryCount}`)
        if(condition()){
            callback();
        }else if (this.retryCount < Global.MAX_RETRY_TIMES) {
            this.retryCount++;
            setTimeout(()=>{
                this.handle(condition, callback);
            }, 200);
        } else {
            console.error("延迟重试失败！");
        }
    }
}

export default Retry;