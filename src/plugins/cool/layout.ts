import Layout from "../../enum/layout";
import Util from "../../util/util";
import VueUtil from "../../util/vue";
import MainPage from "../../page/mainpage";
import CoverPage from "../../page/coverpage";
import store from "../../store/store";
import Lifecycle from "../../enum/plugin";

let _popstateBusy = false;

export default {
    ready(){
        if (document.getElementById(Layout.page)) return;
        let template = `
            <el-container id="${Layout.main}">
            <el-container>
        `;
        template += `
            <el-main id='${Layout.content}'><div id="${Layout.fullscreenLoading}" class="fullscreen-loading"></div><div id="${Layout.container}"></div></el-main>
        `; 
        if(window.$mangodoc.footer){
            template += `<el-footer id="${Layout.footer}">${window.$mangodoc.footer}</el-footer>`;
        }
        template += `
            </el-container>
            </el-container>
        `;
        var pageEl = document.createElement("el-container");
        pageEl.id = Layout.page;
        pageEl.innerHTML = template;
        let vue: any = document.getElementById(Layout.app);
        vue.appendChild(pageEl);
        Util.setFlag(Layout.layout);
        console.info("[cool] layout finish!");
    },
    onpopstate(){
        if (_popstateBusy) return;
        _popstateBusy = true;
        setTimeout(() => { _popstateBusy = false; }, 300);

        console.info("[cool] layout onpopstate");
        if (Util.getHash() == "#/" && Util.getConfig('coverPage')) {
            new CoverPage().render();
            return;
        }
        if (!document.getElementById(Layout.container)) {
            VueUtil.destroyVm();
            Util.resetFlag(Layout.app);
            Util.resetFlag("coverpage");
            const app = document.getElementById(Layout.app);
            const saved = store.get('_savedLayout');
            if (app && saved) {
                app.innerHTML = saved;
                store.set('_savedLayout', null);
                const config = MainPage.getInstance().getConfig();
                Util.callHook(config, Lifecycle.ready);
            }
        }
        MainPage.rerender();
        $("title").text(Util.getNavMap(window.location.hash));
    }
}
