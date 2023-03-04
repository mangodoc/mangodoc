import { marked } from "marked";

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
                        data = plugin[hookName](data);
                    }
                }
            }
            if(callback){
                callback(final);
            }else{
                return data;
            }
        }
    },
    getUrl(){
        let hash = window.location.hash;
        if(!hash){
            window.location.hash = "#/";
            hash = "#/";
        }
        hash = hash.split("?")[0];
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
                // console.info("final html:"+resultHtml);
                document.getElementById('app').innerHTML = resultHtml;
                // 调用生命周期 doneEach
                that.callHook(config,"doneEach");
                // 调用生命周期 mounted
                that.callHook(config,"mounted");
                if(callback){
                    callback();
                }
            });
        });
    }
}