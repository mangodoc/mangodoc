/**
 * 配置类
 * 
 * @author mangomei
 * @since 2023-05-02 17:58
 */
class Config {
    // 主题颜色，默认#409EFF
    themeColor: String = "#409EFF";
    // 默认主题
    theme: String = "default";
    // 默认主题填充比例
    themePadding: String = "10%";
    // 左侧栏宽度，默认200px
    sideWidth: number = 200;
    // 最新宽度，宽度超过500px为大屏
    smallWidth: number = 500;
    // logo， 默认logo
    logo: String = "static/icon/favicon-32x32.png";
    // 左侧开启菜单，默认为空
    menuOpens: Array<string> = [""];
    // 是否开启封面页，默认false
    coverPage: boolean = false;
    // 默认的封面路径
    coverPath: String = "/docs/coverpage.md";
    // 默认总是刷新
    alwaysRefresh: boolean = true;
    // 上下文配置，默认为空
    context: String = "";
    // iconfont配置，默认使用内置图标
    iconfont: {
        url: "",
        prefix: "iconfont"
    } = {
        url: "",
        prefix: "iconfont"
    };
    // 是否启用深色模式（cool 主题）：true=深色, false=浅色, 不设置=跟随系统
    darkMode: any = null;
    // 是否启用粒子背景（cool 主题），默认开启
    particles: boolean = true;
    // 粒子数量
    particlesCount: number = 50;
    // 粒子移动速度
    particlesSpeed: number = 0.3;
    // 浮动目录，默认开启（cool 主题）
    floatToc: boolean = true;
}

let config = new Config();
export default config;
