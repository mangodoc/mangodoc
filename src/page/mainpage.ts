import Fetch from "../util/fetch"
import LocalUtil from "../util/local";
import Util from "../util/util";
import plugin from "../plugins/index";
import Retry from "../util/retry";
import Lifecycle from "../enum/plugin";
import Layout from "../enum/layout";

/**
 * 主框架页
 * @author mangomei
 * @since 2023-05-02 22:28
 */
class MainPage implements Page{
    /**
     * 主配置，window.$mangodoc
     */
    static config: any = null;
    /**
     * 获取url路径
     * @returns url路径
     */
    getUrl(): string {
        let hash = Util.getHash();
        let url = hash.replace("#","");
        if(url === "/"){
            url = "/README.md";
        }else{
            url = url + ".md";
        }
        url = "docs" + url;
        return url;
    }
    /**
     * 合并配置并获取
     * @returns 合并后的配置
     */
    getConfig(){
        // 合并插件列表
        if(MainPage.config == null){
            window.$mangodoc.plugins = plugin.list();
            MainPage.config = window.$mangodoc;
        }
        return MainPage.config;
    }

    render(): void {
        let config = this.getConfig();
        // 调用生命周期 beforeEach
        Util.callHook(config,Lifecycle.init);
        let url = this.getUrl();
        // 获取资源
        Fetch.execute(url,(md: any)=>{
            // 调用生命周期 beforeEach
            md = Util.callHook(config,Lifecycle.beforeEach,md);
            // 转换
            let html = Util.md2html(md);
            html = LocalUtil.handleLocalStyle(html,url);
            let result = LocalUtil.handleLocalScript(html);
            // 调用生命周期 afterEach
            Util.callHook(config,Lifecycle.afterEach,result[0],function(resultHtml: string){
                // 将 HTML 显示在页面上
                let retry = new Retry();
                retry.handle(function(){
                    return document.getElementById(Layout.container) ? true : false;
                },()=>{
                    let appEl: any = document.getElementById(Layout.container);
                    appEl.innerHTML = resultHtml;
                    // 调用后置处理
                    // 调用生命周期 doneEach
                    Util.callHook(config,Lifecycle.doneEach);
                    // 调用生命周期 mounted
                    Util.callHook(config,Lifecycle.mounted);
                    // 关闭加载提示
                    Util.hideLoading();
                    // 记录old hash
                    Util.setLocal("oldHash",Util.getHash());
                    // 渲染为vue
                    let retry = new Retry();
                    retry.handle(()=>Util.getFlag(Layout.aside) && Util.getFlag(Layout.nav) && Util.getFlag(Layout.layout),()=>{
                        Util.renderVue(()=>true,"#"+Layout.app,result[1]);
                    })
                })
            });
        });
    }

    watch(){
        let config = this.getConfig();
        // 监听地址栏变化
        window.onpopstate = function(event) {
            // 调用事件
            Util.callHook(config,Lifecycle.onpopstate,event);
        };

        // 监听文档ready
        document.addEventListener("DOMContentLoaded", function(event) { 
            Util.callHook(config,Lifecycle.ready);
        });

        // 监听resize
        window.addEventListener(Lifecycle.resize, function() {
            Util.callHook(config,Lifecycle.resize);
        });
    }
}

export default MainPage;