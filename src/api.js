import util from "./util";
// 暴露函数接口给外部插件使用
export default {
    // 配置层
    getConfig: util.getConfig,
    // 状态层
    setFlag: util.setFlag,
    getFlag: util.getFlag,
    // 存储层
    setStore: util.setStore,
    getStore: util.getStore
}