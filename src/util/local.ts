import { Md5 } from 'ts-md5'

class LocalUtil{
    static handleLocalScript(html: string): Array<any>{
        let localVue = null;
        let scriptRegex = /<script[^>]*>([\s\S]*?)<\/script>/g;
        let scripts: string[] = [];
        let match;
        while ((match = scriptRegex.exec(html)) !== null) {
            scripts.push(match[1]);
        }
        html = html.replace(scriptRegex, '');
        if (scripts.length > 0) {
            let lastScript = scripts[scripts.length - 1];
            localVue = (new Function('return ' + lastScript.trim()))();
        }
        return [html, localVue];
    }

    static handleLocalStyle(html: string, url: string){
        let styleRegex = /<style[^>]*>([\s\S]*?)<\/style>/g;
        let styles: string[] = [];
        let match;
        while ((match = styleRegex.exec(html)) !== null) {
            styles.push(match[1]);
        }
        html = html.replace(styleRegex, '');
        if (styles.length > 0) {
            let styleContent = styles[styles.length - 1];
            let styleEl = document.createElement('style');
            styleEl.id = Md5.hashStr(url);
            styleEl.textContent = styleContent;
            if (!document.getElementById(styleEl.id)){
                document.head.insertBefore(styleEl, document.querySelector("head style, head link[rel*='stylesheet']"));
            }
        }
        return html;
    }
}

export default LocalUtil;
