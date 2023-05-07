import Layout from "../enum/layout";
import Fetch from "../util/fetch"
import Global from "../util/global";
import LocalUtil from "../util/local";
import Util from "../util/util";

/**
 * 封面页
 * 
 * @author mangomei
 * @since 2023-05-02 17:42
 */
class CoverPage implements Page{

    render(): void {
        // 获取资源
        let url = Util.getConfigOrDefault(Global.COVER_PATH);
        Fetch.execute(url,(md: any)=>{
            // 转换
            let html = Util.md2html(md);
            html = LocalUtil.handleLocalStyle(html,url);
            let result = LocalUtil.handleLocalScript(html);
            let condition = false;
            Util.appendHtml("#"+Layout.app,result[0]);
            // 设置封面就绪
            condition = true;
            // 渲染vue
            Util.renderVue(()=>condition,result[1]);
        });
    }

}

export default CoverPage;