import config from "../config/config";
import { marked } from "marked";
import VueUtil from "./vue";
import Global from "./global";
import flag from "../store/flag";
import navMap from "../store/nav";
import Lifecycle from "../enum/plugin";
import local from "../store/local";
import store from "../store/store";
import Layout from "../enum/layout";

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
        return (hash == "" || hash == "#/") && this.getConfigOrDefault(Global.COVER_PAGE) ? true :false;
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
    static renderVue(condition: Function,localVue: any,callback?: Function){
        let that = this;
        VueUtil.create(condition, localVue, {
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
    /**
     * 组装vue的data数据
     * @param localVue 本地md里的script对象
     * @returns 组合后的data数据
     */
    private static getVueData(localVue: any){
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
    /**
     * 将html内容设置到选择器的元素中
     * @param el 选择器
     * @param html html内容
     */
    static appendHtml(el: string,html: string){
        $(el).html(html);
    }
    /**
     * 调用插件的生命周期
     * @param config 合并后的window.$mangodoc配置
     * @param hookName 调用的生命周期 @see Lifecycle
     * @param data 调用生命周期时传递的参数
     * @param callback 生命周期调用完后回调
     * @returns 经过一系列插件生命周期处理后的数据
     */
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
    /**
     * 设置到store中
     * @param key 属性key
     * @param value 属性值
     */
    static setStore(key: string,value: any){
        store.set(key,value);
    }
    /**
     * 从store中获取属性值
     * @param key 属性key
     * @returns 属性值
     */
    static getStore(key: string): any{
        return store.get(key);
    }
    /**
     * 设置flag中的属性，值为true
     * @param key 属性key
     */
    static setFlag(key: string){
        flag.set(key,true);
    }
    /**
     * 获取flag中的属性值
     * @param key 属性key
     * @returns 属性值，为true，或者false
     */
    static getFlag(key: string): boolean{
        return flag.get(key);
    }
    /**
     * 设置navMap中的属性
     * @param key 属性key
     * @param value 属性值
     */
    static setNavMap(key: string,value: any){
        navMap.set(key,value);
    }
    /**
     * 获取navMap中的属性值
     * @param key 属性key
     * @returns 属性值
     */
    static getNavMap(key: string){
        return navMap.get(key);
    }
    /**
     * 设置local中的属性
     * @param key 属性key
     * @param value 属性值
     */
    static setLocal(key: string,value: any){
        local.set(key,value);
    }
    /**
     * 获取local中的属性值
     * @param key 属性key
     * @returns 属性值
     */
    static getLocal(key: string){
        return local.get(key);
    }
    /**
     * 获取配置项
     * @param key 属性值
     * @returns 配置项，先取$mangodoc中的，在取Config中的
     */
    static getConfig(key: string){
        return Util.getConfigOrDefault(key);
    }

    // 关闭加载提示
    static hideLoading(){
        $("#" + Layout.fullscreenLoading).hide();
    }
    // 显示加载提示
    static showLoading(){
        $("#" + Layout.fullscreenLoading).show();
    }
}

export default Util;