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
        // 读取 Markdown 文件
        fetch(url)
        .then(response => response.text())
        .then(markdown => {
            let that = this;
            // 调用生命周期 beforeEach
            markdown = this.callHook(config,"beforeEach",markdown);
            console.info("final markdown:"+markdown);
            // 将 Markdown 转换为 HTML
            const html = marked.parse(markdown);
            // 调用生命周期 afterEach
            this.callHook(config,"afterEach",html,function(resultHtml){
                // 将 HTML 显示在页面上
                console.info("final html:"+resultHtml);
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
    },
    htmlToJson(html,root) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        const body = doc.querySelector(root);
      
        function parseNode(node) {
          const obj = {};
          obj.nodeName = node.nodeName.toLowerCase();
      
          const attrs = node.attributes;
          if (attrs) {
            obj.attrs = {};
            for (let i = 0; i < attrs.length; i++) {
              const attr = attrs[i];
              obj.attrs[attr.nodeName] = attr.nodeValue;
            }
          }
      
          const children = node.childNodes;
          if (children) {
            obj.children = [];
            for (let i = 0; i < children.length; i++) {
              const child = children[i];
              if (child.nodeType === Node.TEXT_NODE) {
                obj.content = child.nodeValue;
              } else if (child.nodeType === Node.ELEMENT_NODE) {
                obj.children.push(parseNode(child));
              }
            }
          }
          return obj;
        }
        return parseNode(body);
    }
}