import Util from "./util/util";

// 暴露函数接口给外部插件使用
export default {
    // 配置层
    getConfig: Util.getConfig,
    // 状态层
    setFlag: Util.setFlag,
    getFlag: Util.getFlag,
    // 存储层
    setStore: Util.setStore,
    getStore: Util.getStore
}
