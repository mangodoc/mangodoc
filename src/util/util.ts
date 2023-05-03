import config from "../config/config";
import { marked } from "marked";
import VueUtil from "./vue";
import Global from "./global";
import flag from "../store/flag";
import navMap from "../store/nav";
import Lifecycle from "../enum/plugin";
import local from "../store/local";
import store from "../store/store";

/**
 * 工具类
 * 
 * @author mangomei
 * @since 2023-05-02 17:48
 */
class Util {
    /**
     * 获取hash值
     * @returns 页面hash值
     */
    static getHash(){
        let hash = window.location.hash;
        if(!hash){
            window.location.hash = "#/";
            hash = "#/";
        }
        hash = hash.split("?")[0];
        return hash;
    }
    /**
     * 判断是否进入封面
     * @returns 是否进入封面
     */
    static check(): boolean {
        let hash = this.getHash();
        return (hash == "" || hash == "#/")&& this.getConfigOrDefault(Global.COVER_PAGE) ? true :false;
    }
    /**
     * 通过key获取配置，先取window.$mangodoc上的，如果没有则获取默认配置项
     * @param key 属性key
     * @returns 属性value
     */
    static getConfigOrDefault(key: string): any{
        let obj: any = config;
        return window.$mangodoc[key] ? window.$mangodoc[key] : obj[key];
    }
    /**
     * 将md转换为html
     * @param markdown md内容
     * @returns html内容
     */
    static md2html(markdown: string): string{
        return marked.parse(markdown);
    }
    /**
     * 渲染vue
     * @param condition 条件
     * @param el vue的div元素选择器
     */
    static renderVue(condition: Function,el: string,localVue: any,callback?: Function){
        let that = this;
        VueUtil.create(condition, {
            el: el,
            data(){
                return that.getVueData(localVue);
            },
            methods: localVue ? localVue.methods : {},
            mounted(){
                if(callback){
                    callback();
                }
            }
        });
    }

    static getVueData(localVue: any){
        let data = {};
        if(localVue){
            data = Object.assign({}, localVue.data(), {
                menuOpens: this.getConfigOrDefault(Global.MENU_OPENS)
            });
        }else{
            data = {
                menuOpens: this.getConfigOrDefault(Global.MENU_OPENS)
            }
        }
        return data;
    }

    static appendHtml(el: string,html: string){
        $(el).html(html);
    }

    static callHook(config: any,hookName: Lifecycle,data?: any,callback?: Function): any{
        if(config.plugins){
            let final = data;
            // 调用hook
            for(let plugin of config.plugins){
                if(plugin[hookName]){
                    if(callback){
                        plugin[hookName](data,function(res: any){
                            data = res;
                            final = data;
                        });
                    }else{
                        final = plugin[hookName](data);
                    }
                }
            }
            if(callback){
                callback(final);
            }else{
                return final;
            }
        }
    }

    static setStore(key: string,value: any){
        store.set(key,value);
    }

    static getStore(key: string): any{
        return store.get(key);
    }

    static setFlag(key: string){
        flag.set(key,true);
    }

    static getFlag(key: string): boolean{
        return flag.get(key);
    }

    static setNavMap(key: string,value: any){
        navMap.set(key,value);
    }

    static getNavMap(key: string){
        return navMap.get(key);
    }

    static setLocal(key: string,value: any){
        local.set(key,value);
    }

    static getLocal(key: string){
        return local.get(key);
    }

    static getConfig(key: string){
        return Util.getConfigOrDefault(key);
    }

    // 关闭加载提示
    static hideLoading(){
        $("#fullscreen-loading").hide();
    }
    // 显示加载提示
    static showLoading(){
        $("#fullscreen-loading").show();
    }
}

export default Util;