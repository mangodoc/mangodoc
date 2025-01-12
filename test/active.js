function getActiveMenu(list, hash) {
    let activeMenu = null;
    for(let item of list){
        if(!item.children) {
            if (hash === item.href) {
                return item;
            }
        } else {
            activeMenu = getActiveMenu(item.children, hash);
            // 说明找到了，则退出
            if (activeMenu != null) {
                return activeMenu
            }
        }
    }
    return activeMenu;
}

listStr = '[{"title":"主页","href":"#/README","target":"_self","level":1,"icon":"el-icon-s-home","index":"1"},{"title":"入门","level":1,"icon":"el-icon-s-home","index":"2","children":[{"title":"快速开始","href":"#/guide/quickstart","target":"_self","level":2,"icon":"el-icon-tickets","index":"2-1"},{"title":"封面","href":"#/guide/cover","target":"_self","level":2,"icon":"el-icon-tickets","index":"2-2"}]},{"title":"定制化","level":1,"icon":"el-icon-s-home","index":"3","children":[{"title":"配置参数","href":"#/config/configitem","target":"_self","level":2,"icon":"el-icon-tickets","index":"3-1"},{"title":"API接口","href":"#/config/api","target":"_self","level":2,"icon":"el-icon-tickets","index":"3-2"}]},{"title":"示例","level":1,"icon":"el-icon-star-on","index":"4","children":[{"title":"示例","href":"#/demo/demo","target":"_self","level":2,"icon":"el-icon-s-tools","index":"4-1"},{"title":"elementui示例","href":"#/demo/elementui","target":"_self","level":2,"icon":"el-icon-s-tools","index":"4-2"}]},{"title":"内容","level":1,"icon":"el-icon-star-on","index":"5","children":[{"title":"主流前端","href":"#/doc/all","target":"_self","level":2,"icon":"el-icon-s-promotion","index":"5-1"},{"title":"网络模型","href":"#/doc/network","target":"_self","level":2,"icon":"el-icon-s-tools","index":"5-2"},{"title":"知识总结","href":"#/doc/summary","target":"_self","level":2,"icon":"el-icon-s-tools","index":"5-3"}]},{"title":"待办列表","href":"#/doc/todo","target":"_self","level":1,"icon":"el-icon-tickets","index":"6"}]';
list = JSON.parse(listStr);
hash = "#/config/configitem11";
item = getActiveMenu(list, hash);
console.info(item);