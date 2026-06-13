import Layout from "../enum/layout";
import Fetch from "../util/fetch"
import Global from "../util/global";
import LocalUtil from "../util/local";
import Util from "../util/util";
import Lifecycle from "../enum/plugin";
import VueUtil from "../util/vue";
import MainPage from "./mainpage";
import store from "../store/store";

class CoverPage implements Page{
    private static popstateHandler: any = null;
    private static hashchangeHandler: any = null;

    render(): void {
        let config = this.getConfig();
        Util.callHook(config, Lifecycle.init);
        let url = this.getCoverUrl();
        console.info("coverpage url " + url)
        this.setupPopstate(config);
        Fetch.execute(url, (md: any) => {
            md = Util.callHook(config, Lifecycle.beforeEach, md);
            let html = Util.md2html(md);
            html = LocalUtil.handleLocalStyle(html, url);
            let result = LocalUtil.handleLocalScript(html);
            Util.callHook(config, Lifecycle.afterEach, result[0], function(resultHtml: string) {
                const app = document.getElementById(Layout.app);
                if (app && !store.get('_savedLayout')) {
                    Util.hideLoading();
                    store.set('_savedLayout', app.innerHTML);
                }
                Util.appendHtml("#" + Layout.app, resultHtml);
                Util.callHook(config, Lifecycle.doneEach);
                VueUtil.destroyVm();
                Util.resetFlag(Layout.app);
                Util.renderVue(() => true, result[1], function() {
                    Util.callHook(config, Lifecycle.mounted);
                });
                Util.hideLoading();
                Util.setFlag("coverpage");
            });
        });
    }

    private getConfig(): any {
        let config = MainPage.getInstance().getConfig();
        return config;
    }

    private getCoverUrl(): string {
        let url = Util.getConfigOrDefault(Global.COVER_PATH);
        url = Util.getConfigOrDefault(Global.CONTEXT) + url;
        return url;
    }

    private setupPopstate(config: any): void {
        if (CoverPage.popstateHandler) {
            window.removeEventListener('popstate', CoverPage.popstateHandler);
        }
        if (CoverPage.hashchangeHandler) {
            window.removeEventListener('hashchange', CoverPage.hashchangeHandler);
        }
        CoverPage.popstateHandler = function(event: PopStateEvent) {
            Util.callHook(config, Lifecycle.onpopstate, event);
        };
        CoverPage.hashchangeHandler = function() {
            Util.callHook(config, Lifecycle.onpopstate);
        };
        window.addEventListener('popstate', CoverPage.popstateHandler);
        window.addEventListener('hashchange', CoverPage.hashchangeHandler);
    }
}

export default CoverPage;