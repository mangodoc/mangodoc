import util from "./util";
// 暴露函数接口给外部插件使用
export default {
    getConfig: util.getConfig,
    setFlag: util.setFlag,
    getFlag: util.getFlag
}