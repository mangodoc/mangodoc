import Fetch from "../util/fetch"
import LocalUtil from "../util/local";
import Util from "../util/util";
import Theme from "../theme";
import Lifecycle from "../enum/plugin";
import Layout from "../enum/layout";

/**
 * 主框架页
 * 
 * @author mangomei
 * @since 2023-05-02 22:28
 */
class MainPage implements Page{
    static config: any = null;
    private static instance: MainPage | null = null;
    private static popstateHandler: any = null;
    private static readyHandler: any = null;
    private static resizeHandler: any = null;

    static getInstance(): MainPage {
        if (!MainPage.instance) {
            MainPage.instance = new MainPage();
        }
        return MainPage.instance;
    }

    static rerender(): void {
        const instance = MainPage.getInstance();
        instance.render();
    }

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

    getConfig(){
        if(MainPage.config == null){
            window.$mangodoc.plugins = new Theme().current().list();
            MainPage.config = window.$mangodoc;
        }
        return MainPage.config;
    }

    render(): void {
        let config = this.getConfig();
        Util.callHook(config,Lifecycle.init);
        let url = this.getUrl();
        Fetch.execute(url,(md: any)=>{
            md = Util.callHook(config,Lifecycle.beforeEach,md);
            let html = Util.md2html(md);
            html = LocalUtil.handleLocalStyle(html,url);
            let result = LocalUtil.handleLocalScript(html);
            Util.callHook(config,Lifecycle.afterEach,result[0],function(resultHtml: string){
                let container = document.getElementById(Layout.container);
                if (!container) {
                    Util.hideLoading();
                    return;
                }
                container.innerHTML = resultHtml;
                Util.callHook(config,Lifecycle.doneEach);
                Util.callHook(config,Lifecycle.mounted);
                Util.hideLoading();
                Util.setLocal("oldHash",Util.getHash());
                Util.renderVue(()=>Util.getFlag(Layout.aside) && Util.getFlag(Layout.nav) && Util.getFlag(Layout.layout),result[1]);
            });
        });
    }

    watch(){
        let config = this.getConfig();

        if (MainPage.popstateHandler) {
            window.removeEventListener('popstate', MainPage.popstateHandler);
        }
        if (MainPage.readyHandler) {
            document.removeEventListener('DOMContentLoaded', MainPage.readyHandler);
        }
        if (MainPage.resizeHandler) {
            window.removeEventListener('resize', MainPage.resizeHandler);
        }

        MainPage.popstateHandler = function(event: PopStateEvent) {
            Util.callHook(config,Lifecycle.onpopstate,event);
        };
        MainPage.readyHandler = function() {
            Util.callHook(config,Lifecycle.ready);
        };
        MainPage.resizeHandler = Util.throttle(function() {
            Util.callHook(config,Lifecycle.resize);
        }, 150);

        window.addEventListener('popstate', MainPage.popstateHandler);
        document.addEventListener('DOMContentLoaded', MainPage.readyHandler);
        window.addEventListener('resize', MainPage.resizeHandler);
    }
}

export default MainPage;