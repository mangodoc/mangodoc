import util from "./util";
import plugin from "./plugins/index";

// 定义全局对象navMap
window.navMap = {};
let url = util.getUrl();
// 合并插件列表
window.$mangodoc.plugins = plugin.list();
// 合并config 和 $mangodoc
// config = Object.assign({}, window.$mangodoc, config );
let config = window.$mangodoc;
console.info(config);
// 调用生命周期 beforeEach
util.callHook(config,"init");
// 开始渲染
util.render(url,config,function(){
    
});

// 监听地址栏变化
window.onpopstate = function(event) {
    // 调用事件
    util.callHook(config,"onpopstate",event);
};

// 监听文档ready
document.addEventListener("DOMContentLoaded", function(event) { 
    util.callHook(config,"ready");
});

// 监听resize
window.addEventListener('resize', function() {
    util.callHook(config,"resize");
});
