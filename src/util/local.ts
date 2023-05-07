import $ from "jquery";
import { Md5 } from 'ts-md5'
/**
 * 本地html处理工具
 * 
 * @author mangomei
 * @since 2023-05-02 22:40
 */
class LocalUtil{
    /**
     * 处理html中的script，只支持最右一个script
     * 
     * @param html 转换后的html内容
     * @returns 删除掉script后的html内容
     */
    static handleLocalScript(html: string): Array<any>{
        let $html = $(`<div>${html}</div>`);
        let scripts = $html.find("script");
        let script: any = null;
        // 取最后一个script
        scripts.each(function(){
            script = $(this);
        });
        if(!script){
            return [html,null];
        }
        let localVue = eval(script.text());
        $html.find("script").remove();
        html = $html.html();
        return [html,localVue];
    }

    /**
     * 处理md转为html后里的style，只支持最后一个style
     * 
     * @param html html内容
     * @param url 标识符，目前用md5(url)作为id
     * @returns 处理后的html
     */
    static handleLocalStyle(html: string,url: string){
        if(html.indexOf("<style>") == 1){
            return html;
        }
        let $html = $(`<div>${html}</div>`);
        let styles = $html.find("style");
        let style = null;
        // 取最后一个style
        styles.each(function(){
            style = $(this);
        });
        $html.find("style").remove();
        html = $html.html();
        if(style){
            let id = url;
            (<any>style[0]).id = Md5.hashStr(url);
            if(!document.getElementById(id)){
                document.head.insertBefore(style[0], document.querySelector("head style, head link[rel*='stylesheet']"));
            }
        }
        return html;
    }
}

export default LocalUtil;
