/**
 * 配置类
 * 
 * @author mangomei
 * @since 2023-05-02 17:58
 */
class Config {
    // 主题颜色，默认#409EFF
    themeColor: string = "#409EFF";
    // 默认主题
    theme: String = "default";
    // 默认主题填充比例
    themePadding: String = "10%";
    // 左侧栏宽度，默认200px
    sideWidth: number = 200;
    // 最新宽度，宽度超过500px为大屏
    smallWidth: number = 500;
    // logo， 默认logo
    logo: string = "static/icon/favicon-32x32.png";
    // 左侧开启菜单，默认为空
    menuOpens: Array<string> = [""];
    // 是否开启封面页，默认false
    coverPage: boolean = false;
    // 默认的封面路径
    coverPath: string = "/docs/coverpage.md";
    // 默认总是刷新
    alwaysRefresh: boolean = true;
}

let config = new Config();
export default config;