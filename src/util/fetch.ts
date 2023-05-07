import Util from "./util";
import Global from "./global";

/**
 * 获取资源工具
 * 
 * @author mangomei
 * @since 2023-05-02 17:51
 */
class Fetch {
    /**
     * 过滤url 
     * 如果新的hash和旧的相同，则不重复请求页面
     * 
     * @returns 如果是重复请求则过滤掉，返回true
     */
    private static filteUrl(): boolean{
        let hash = Util.getHash();
        if(hash == Util.getLocal("oldHash")){
            console.info("in same page not request");
            return true;
        }
        return false;
    }
    /**
     * 获取资源
     * 
     * @param url 资源地址
     * @param callback 回调函数
     */
    static execute(url: string,callback: Function){
        if(this.filteUrl()){
            return ;
        }
        // 显示loading
        Util.showLoading();
        // 是否开启总是刷新，默认为false
        if(Util.getConfigOrDefault(Global.ALWAYS_REFRESH)){
            url += "?t="+Math.random();
        }
        // 读取 Markdown 文件
        fetch(url)
        .then(response => {
            this.handleResponse(response);
            return response.text();
        })
        .then(markdown => {
            // 将获取到的md内容回调返回
            callback(markdown);
        });
    }
    /**
     * 处理响应，记录修改时间
     * 
     * @param response 响应
     */
    private static handleResponse(response: any){
        // 处理头信息
        let lastModified = response.headers.get('last-modified');
        if(!lastModified){
            // 如果为空，则获取date属性
            lastModified = response.headers.get('date');
        }
        Util.setStore(Global.UPDATE_TIME,lastModified);
    }
}

export default Fetch;