import util from "./util";
import plugin from "./plugins/index"
import $ from "jquery"
// 定义全局对象navMap
window.navMap = {};
let url = util.getUrl();
console.info(url);
// 定义基础配置
let config = {
    plugins : plugin.list()
}
// 合并config 和 $mangodoc
config = Object.assign({}, config, window.$mangodoc);
console.info(config);
// 调用生命周期 beforeEach
util.callHook(config,"init");
// 开始渲染
util.render(url,config,function(){
    setTimeout(function(){
        // 检测屏幕宽度，并设置aside
        window.asideInitFn();
    },100); 
});

// 监听地址栏变化
window.onpopstate = function(event) {
    util.render(util.getUrl(),config);
    // 变化页面标题
    $("title").text(window.navMap[window.location.hash]);
};

// 监听文档ready
document.addEventListener("DOMContentLoaded", function(event) { 
    util.callHook(config,"ready");
});

window.addEventListener('resize', function() {
    window.asideInitFn();
});

// 绑定到window.$mangodoc
window.$mangodoc = config;
