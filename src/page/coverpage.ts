import Fetch from "../util/fetch"
import Global from "../util/global";
import LocalUtil from "../util/local";
import Util from "../util/util";

/**
 * 封面页
 * @author mangomei
 * @since 2023-05-02 17:42
 */
class CoverPage implements Page{

    render(): void {
        // 获取资源
        Fetch.execute(Util.getConfigOrDefault(Global.COVER_PATH),(md: any)=>{
            // 转换
            let html = Util.md2html(md);
            let result = LocalUtil.handleLocalScript(html);
            Util.appendHtml("#app",result[0]);
            // 设置封面就绪
            Util.setFlag(Global.FLAG_COVER_PAGE);
            // 渲染vue
            Util.renderVue(()=>true,"#app",result[1]);
        });
    }

}

export default CoverPage;