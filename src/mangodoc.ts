export {}
/**
 * window下的全局定义
 * 
 * @author mangomei
 * @since 2023-05-02 18:15
 */
declare global {
    interface Window {
        $mangodoc: any;
        $mangodocApi: any;
        $pageconfig: any;
        Vue: any;
        navMap: any;
        operFn: Function;
    }
}