import { marked } from "marked";
import Config from "./config";
// 标志位
let flag = {};
export default {
    callHook(config,hookName,data,callback){
        if(config.plugins){
            let final = data;
            // 调用hook
            for(let plugin of config.plugins){
                if(plugin[hookName]){
                    if(callback){
                        plugin[hookName](data,function(res){
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
    },
    checkUrl(){
        // 如果新的hash和旧的相同，则不重复请求页面
        let hash = this.getHash();
        if(hash == window.oldHash){
            console.info("in same page not request");
            return true;
        }
        return false;
    },
    getHash(){
        let hash = window.location.hash;
        if(!hash){
            window.location.hash = "#/";
            hash = "#/";
        }
        hash = hash.split("?")[0];
        return hash;
    },
    getUrl(){
        let hash = this.getHash();
        let url = hash.replace("#","");
        if(url === "/"){
            url = "/README.md";
        }else{
            url = url + ".md";
        }
        url = "docs" + url;
        return url;
    },
    render(url,config,callback){
        if(this.checkUrl()){
            return ;
        }
        $("#fullscreen-loading").show();
        console.info(url);
        // 读取 Markdown 文件
        fetch(url)
        .then(response => response.text())
        .then(markdown => {
            let that = this;
            // 调用生命周期 beforeEach
            markdown = this.callHook(config,"beforeEach",markdown);
            // console.info("final markdown:"+markdown);
            // 将 Markdown 转换为 HTML
            const html = marked.parse(markdown);
            // 调用生命周期 afterEach
            this.callHook(config,"afterEach",html,function(resultHtml){
                // 将 HTML 显示在页面上
                handleAppEl(function(appEl){
                    appEl.innerHTML = resultHtml;
                    // 调用后置处理
                    // 调用生命周期 doneEach
                    that.callHook(config,"doneEach");
                    // 调用生命周期 mounted
                    that.callHook(config,"mounted");
                    // 关闭加载提示
                    $("#fullscreen-loading").hide();
                    // 记录old hash
                    window.oldHash = that.getHash();
                    // 渲染为vue
                    handleVue(function(){
                        that.createVueApp();
                    });
                    if(callback){
                        callback();
                    }
                });
            });
        });
    },
    createVueApp(){
        new Vue({
            el: '#vue',
            data(){
                return {
                    
                }
            }
        });
        console.info("create vue app")
    },
    getSideWidth(){
        return window.$mangodoc.sideWdith ? window.$mangodoc.sideWdith : Config.sideWidth;
    },
    setFlag(key){
        flag[key] = true;
    }

}
// 最大重试次数
const MAX_RETRY_TIMES = 20;
let retryCount = 0;

function handleAppEl(callback){
    let appEl = document.getElementById('app');
    if (appEl) {
        // div元素存在，执行你的代码逻辑
        callback(appEl);
    } else if (retryCount < MAX_RETRY_TIMES) {
        // div元素不存在，等待一秒后重试
        retryCount++;
        setTimeout(handleAppEl, 200,callback);
    } else {
        // div元素不存在且超过最大重试次数，执行你的备选代码逻辑
        console.error("获取app的div元素失败，请重试！");
    }
}

let retryCountVue = 0;
function handleVue(callback){
    let v = flag["aside"] && flag["nav"];
    if(v){
        callback();
    }else if (retryCountVue < MAX_RETRY_TIMES) {
        retryCountVue++;
        setTimeout(handleVue, 200,callback);
    } else {
        console.error("获取app的div元素失败，请重试！");
    }
}
