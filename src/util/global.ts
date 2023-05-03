/**
 * 全局常量
 * 
 * @author mangomei
 * @since 2023-05-02 18:36
 */
abstract class Global{
    /**
     * 总是刷新
     */
    static ALWAYS_REFRESH: string = "alwaysRefresh";
    // 更新时间
    static UPDATE_TIME: string = "updateTime";
    // 最大重试次数
    static MAX_RETRY_TIMES: number = 30;
    // 封面就绪
    static FLAG_COVER_PAGE: string = "coverpage";
    // 封面路径
    static COVER_PATH: string = "coverPath";
    // 封面
    static COVER_PAGE: string = "coverPage";
    // 菜单打开集合
    static MENU_OPENS: string = "menuOpens";
    // logo
    static LOGO: string = "logo";
    // aside width
    static ASIDE_WIDTH: string = "sideWidth";
    // 小屏幕宽度
    static SMALL_WIDTH: string = "smallWidth";
}

export default Global;