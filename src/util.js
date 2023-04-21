import { marked } from "marked";
import Config from "./config";
import $ from "jquery";
// 标志位
let flag = {};
// 内存块，存储数据
let store = {};
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
        // 是否开启总是刷新，默认为false
        if(window.$mangodoc.alwaysRefresh){
            url += "?t="+Math.random();
        }
        // 读取 Markdown 文件
        fetch(url)
        .then(response => {
            const lastModified = response.headers.get('last-modified');
            this.setStore("updateTime",lastModified);
            return response.text();
        })
        .then(markdown => {
            let that = this;
            // 调用生命周期 beforeEach
            markdown = this.callHook(config,"beforeEach",markdown);
            // console.info("final markdown:"+markdown);
            // 将 Markdown 转换为 HTML
            let html = marked.parse(markdown);
            html = handleLocalStyle(html,url);
            let result = handleLocalScript(html);
            // 调用生命周期 afterEach
            this.callHook(config,"afterEach",result[0],function(resultHtml){
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
                        that.createVueApp(result[1]);
                    });
                    if(callback){
                        callback();
                    }
                });
            });
        });
    },
    createVueApp(localVue){
        // 未渲染vue 
        if(!flag["vue"]){
            new Vue({
                el: '#vue',
                data(){
                    return getVueData(localVue);
                },
                methods: localVue ? localVue.methods : {},
                mounted(){
                    //callMounted();
                }
            });
            this.setFlag("vue");
            console.info("create vue app")
        }else{
            // 是localVue
            if(localVue){
                new Vue({
                    el: '#app',
                    data(){
                        return getVueData(localVue);
                    },
                    methods: localVue ? localVue.methods : {},
                    mounted(){
                        //callMounted();
                    }
                });
                console.info("create local app")
            }
        }
    },
    getSideWidth(){
        return window.$mangodoc.sideWidth ? window.$mangodoc.sideWidth : Config.sideWidth;
    },
    setFlag(key){
        flag[key] = true;
    },
    getFlag(key){
        return flag[key];
    },
    setStore(key,value){
        store[key] = value;
    },
    getStore(key){
        return store[key];
    },
    getConfig(key){
        return Config[key];
    }
}

function getVueData(localVue){
    let data = {};
    if(localVue){
        data = Object.assign({}, localVue.data(), {
            menuOpens: menuOpens()
        });
    }else{
        data = {
            menuOpens: menuOpens()
        }
    }
    return data;
}

function menuOpens(){
    let menuOpens = Config.menuOpens;
    if(window.$mangodoc.menuOpens){
        menuOpens = window.$mangodoc.menuOpens;
    }
    return menuOpens;
}

// 处理md转为html后里的style，只支持最后一个style
function handleLocalStyle(html,id){
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
        style[0].id = id;
        if(!document.getElementById(id)){
            document.head.insertBefore(style[0], document.querySelector("head style, head link[rel*='stylesheet']"));
        }
    }
    return html;
}
// 处理md转为html后里的script，只支持最后一个script
function handleLocalScript(html){
    let $html = $(`<div>${html}</div>`);
    let scripts = $html.find("script");
    let script = null;
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
    let v = flag["aside"] && flag["nav"] && flag["layout"];
    if(v){
        callback();
    }else if (retryCountVue < MAX_RETRY_TIMES) {
        retryCountVue++;
        setTimeout(handleVue, 200,callback);
    } else {
        console.error("获取app的div元素失败，请重试！");
    }
}
